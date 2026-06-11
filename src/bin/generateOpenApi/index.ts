#!/usr/bin/env tsx
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-bitwise */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/**
 * Generates src/openapi.json from all registered REST endpoints.
 * Run via: pnpm generate:openapi
 *
 * Uses the TypeScript compiler API to extract EndpointHandler<T, R> type
 * arguments from every handler and converts them to JSON Schema, producing
 * a fully typed OpenAPI 3.0 document.
 */

import ts from 'typescript';
import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { toTitleCase } from '../../utils/changeCase/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '../../../');

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE MANIFEST
// Discovers every REST route by parsing src/endpoints/index.ts and each
// mounted child router file.
// ─────────────────────────────────────────────────────────────────────────────

interface RouteEntry {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
	apiPath: string;
	handlerFile: string; // relative to ROOT
	handlerExport: string;
	tags: string[];
}

interface MountedRouter {
	mountPath: string;
	routerIdentifier: string;
	routerFile: string; // relative to ROOT
	tags: string[];
}

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']);

function buildTagFromMountPath(mountPath: string): string {
	const trimmed = mountPath.replace(/^\/+|\/+$/g, '');
	if (!trimmed) return 'Endpoints';
	return toTitleCase(trimmed);
}

function normalizeJoinedPath(basePath: string, childPath: string): string {
	const base = basePath.replace(/\/+$/g, '');
	const child = childPath.replace(/^\/+/, '');
	return `/api${base}/${child}`.replace(/\/{2,}/g, '/');
}

function readSourceFile(filePath: string): ts.SourceFile | null {
	if (!ts.sys.fileExists(filePath)) return null;
	return ts.createSourceFile(filePath, readFileSync(filePath, 'utf-8'), ts.ScriptTarget.Latest, true);
}

function resolveSourceModulePath(fromFile: string, specifier: string): string | null {
	if (!specifier.startsWith('.')) return null;

	const unresolved = resolve(dirname(fromFile), specifier);
	const withoutExt = unresolved.replace(/\.(mjs|cjs|js|jsx|ts|tsx)$/i, '');
	const candidates = [
		`${withoutExt}.ts`,
		`${withoutExt}.tsx`,
		resolve(withoutExt, 'index.ts'),
		resolve(withoutExt, 'index.tsx'),
		unresolved,
	];

	for (const candidate of candidates) {
		if (ts.sys.fileExists(candidate)) {
			return relative(ROOT, candidate).replace(/\\/g, '/');
		}
	}

	return null;
}

function getImportIdentifierMap(sf: ts.SourceFile): Map<string, string> {
	const identifierToPath = new Map<string, string>();

	for (const statement of sf.statements) {
		if (!ts.isImportDeclaration(statement)) continue;
		if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;
		const specifier = statement.moduleSpecifier.text;
		const resolvedPath = resolveSourceModulePath(sf.fileName, specifier);
		if (!resolvedPath) continue;

		const importClause = statement.importClause;
		if (!importClause) continue;

		if (importClause.name) {
			identifierToPath.set(importClause.name.text, resolvedPath);
		}

		if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
			for (const element of importClause.namedBindings.elements) {
				identifierToPath.set(element.name.text, resolvedPath);
			}
		}
	}

	return identifierToPath;
}

function extractRouterIdentifier(node: ts.Expression): string | null {
	if (ts.isIdentifier(node)) {
		return node.text;
	}

	if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
		return node.expression.text;
	}

	return null;
}

function extractHandlerExport(node: ts.Expression): string | null {
	if (ts.isCallExpression(node) && node.arguments.length && ts.isIdentifier(node.arguments[0])) {
		return node.arguments[0].text;
	}

	if (ts.isIdentifier(node)) {
		return node.text;
	}

	return null;
}

function parseMountedRouters(): MountedRouter[] {
	const endpointsIndexPath = resolve(ROOT, 'src/endpoints/index.ts');
	const sf = readSourceFile(endpointsIndexPath);
	if (!sf) {
		console.warn('[warn] Failed to read src/endpoints/index.ts');
		return [];
	}

	const importMap = getImportIdentifierMap(sf);
	const mounts: MountedRouter[] = [];

	const visit = (node: ts.Node): void => {
		if (ts.isCallExpression(node)
			&& ts.isPropertyAccessExpression(node.expression)
			&& ts.isIdentifier(node.expression.expression)
			&& node.expression.expression.text === 'router'
			&& node.expression.name.text === 'use'
			&& node.arguments.length >= 2
			&& ts.isStringLiteral(node.arguments[0])) {
			const mountPath = node.arguments[0].text;
			const routerIdentifier = extractRouterIdentifier(node.arguments[1]!);
			if (!routerIdentifier) {
				ts.forEachChild(node, visit);
				return;
			}

			const routerFile = importMap.get(routerIdentifier);
			if (!routerFile) {
				console.warn(`[warn] Could not resolve router import for ${routerIdentifier} in src/endpoints/index.ts`);
				ts.forEachChild(node, visit);
				return;
			}

			mounts.push({
				mountPath,
				routerIdentifier,
				routerFile,
				tags: [buildTagFromMountPath(mountPath)],
			});
		}

		ts.forEachChild(node, visit);
	};

	ts.forEachChild(sf, visit);

	return mounts;
}

function parseRoutesFromMountedRouter(mountedRouter: MountedRouter): RouteEntry[] {
	const routerAbsPath = resolve(ROOT, mountedRouter.routerFile);
	const sf = readSourceFile(routerAbsPath);
	if (!sf) {
		console.warn(`[warn] Failed to read mounted router file: ${mountedRouter.routerFile}`);
		return [];
	}

	const importMap = getImportIdentifierMap(sf);
	const collectedRoutes: RouteEntry[] = [];

	const visit = (node: ts.Node): void => {
		if (!ts.isCallExpression(node)
			|| !ts.isPropertyAccessExpression(node.expression)
			|| !ts.isIdentifier(node.expression.expression)
			|| node.expression.expression.text !== 'router') {
			ts.forEachChild(node, visit);
			return;
		}

		const methodName = node.expression.name.text.toLowerCase();
		if (!HTTP_METHODS.has(methodName)) {
			ts.forEachChild(node, visit);
			return;
		}

		if (node.arguments.length < 2 || !ts.isStringLiteral(node.arguments[0])) {
			ts.forEachChild(node, visit);
			return;
		}

		const routePath = node.arguments[0].text;
		const handlerExport = extractHandlerExport(node.arguments[1]!);
		if (!handlerExport) {
			ts.forEachChild(node, visit);
			return;
		}

		const handlerFile = importMap.get(handlerExport);
		if (!handlerFile) {
			console.warn(`[warn] Could not resolve handler import for ${handlerExport} in ${mountedRouter.routerFile}`);
			ts.forEachChild(node, visit);
			return;
		}

		collectedRoutes.push({
			method: methodName.toUpperCase() as RouteEntry['method'],
			apiPath: normalizeJoinedPath(mountedRouter.mountPath, routePath),
			handlerFile,
			handlerExport,
			tags: mountedRouter.tags,
		});

		ts.forEachChild(node, visit);
	};

	ts.forEachChild(sf, visit);

	return collectedRoutes;
}

function buildRoutesManifest(): RouteEntry[] {
	const mountedRouters = parseMountedRouters();
	const routes = mountedRouters.flatMap((mountedRouter) => parseRoutesFromMountedRouter(mountedRouter));
	routes.sort((a, b) => {
		if (a.apiPath === b.apiPath) return a.method.localeCompare(b.method);
		return a.apiPath.localeCompare(b.apiPath);
	});
	return routes;
}

const routes = buildRoutesManifest();

// ─────────────────────────────────────────────────────────────────────────────
// TYPESCRIPT COMPILER SETUP
// ─────────────────────────────────────────────────────────────────────────────

const tsconfigPath = resolve(ROOT, 'tsconfig.json');
const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ROOT);
const program = ts.createProgram(parsedConfig.fileNames, {
	...parsedConfig.options,
	skipLibCheck: true,
});
const checker = program.getTypeChecker();

// ─────────────────────────────────────────────────────────────────────────────
// HANDLER TYPE EXTRACTION
// Finds the exported handler const, gets its call signature, and returns
// the input type (first parameter) and the unwrapped output type.
// ─────────────────────────────────────────────────────────────────────────────

interface HandlerTypes {
	inputType: ts.Type | null;
	outputType: ts.Type;
}

function extractHandlerTypes(route: RouteEntry): HandlerTypes | null {
	const filePath = resolve(ROOT, route.handlerFile);
	const sf = program.getSourceFile(filePath);
	if (!sf) {
		console.warn(`[warn] Source file not found: ${route.handlerFile}`);
		return null;
	}

	for (const stmt of sf.statements) {
		if (!ts.isVariableStatement(stmt)) continue;
		for (const decl of stmt.declarationList.declarations) {
			if (!ts.isIdentifier(decl.name) || decl.name.text !== route.handlerExport) continue;

			const type = checker.getTypeAtLocation(decl);
			const sigs = type.getCallSignatures();
			if (!sigs.length) return null;
			const sig = sigs[0];

			// Input: first parameter
			const params = sig.getParameters();
			let inputType: ts.Type | null = null;
			if (params.length) {
				const p = params[0];
				const pDecl = p.valueDeclaration ?? p.declarations?.[0];
				if (pDecl) {
					inputType = checker.getTypeOfSymbolAtLocation(p, pDecl);
					// Treat unknown/any as no input
					if (inputType.flags & (ts.TypeFlags.Unknown | ts.TypeFlags.Any)) {
						inputType = null;
					}
				}
			}

			// Output: unwrap `Promise<R> | void`
			let ret = sig.getReturnType();
			if (ret.isUnion()) {
				ret = ret.types.find((t) => !(t.flags & ts.TypeFlags.Void)) ?? ret;
			}
			if (ret.symbol?.getName() === 'Promise') {
				const args = checker.getTypeArguments(ret as ts.TypeReference);
				if (args[0]) ret = args[0];
			}

			return { inputType, outputType: ret };
		}
	}

	console.warn(`[warn] Handler export "${route.handlerExport}" not found in ${route.handlerFile}`);
	return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON SCHEMA GENERATOR
// Recursively converts a ts.Type to an OpenAPI-compatible JSON Schema object.
// Named types are collected in `definitions` and referenced via $ref.
// ─────────────────────────────────────────────────────────────────────────────

// Names that are skipped as $ref candidates (too generic or internal to Prisma)
const SKIP_REF_NAMES = new Set([
	'Object', 'Function', 'Array', 'Promise', 'ReadonlyArray',
	'Record', 'Partial', 'Required', 'Readonly', 'Pick', 'Omit',
	'__type', '__object', 'T',
]);

// Prisma namespace prefixes that should be inlined rather than referenced
const PRISMA_PREFIXES = ['Prisma.', '$Prisma.', 'Prisma__', '$Result.', '$Enums.'];

function isPrismaInternal(name: string): boolean {
	return PRISMA_PREFIXES.some((p) => name.startsWith(p));
}

const definitions: Record<string, object> = {};
// Track types currently being generated to break recursion
const inProgress = new Set<string>();

function typeToSchema(type: ts.Type, depth = 0): object {
	if (depth > 12) return {};

	const { flags } = type;

	// ── Primitives ──────────────────────────────────────────────────────────
	if (flags & ts.TypeFlags.String) return { type: 'string' };
	if (flags & ts.TypeFlags.Number) return { type: 'number' };
	if (flags & ts.TypeFlags.Boolean) return { type: 'boolean' };
	if (flags & ts.TypeFlags.Null) return { nullable: true };
	if (flags & ts.TypeFlags.Undefined) return { nullable: true };
	if (flags & (ts.TypeFlags.Unknown | ts.TypeFlags.Any)) return {};
	if (flags & ts.TypeFlags.Void) return {};
	if (flags & ts.TypeFlags.Never) return {};

	// ── Boolean literal (true / false) ──────────────────────────────────────
	if (flags & ts.TypeFlags.BooleanLiteral) return { type: 'boolean' };

	// ── String literal ───────────────────────────────────────────────────────
	if (type.isStringLiteral()) return { type: 'string', enum: [type.value] };

	// ── Number literal ───────────────────────────────────────────────────────
	if (type.isNumberLiteral()) return { type: 'number', enum: [type.value] };

	// ── Union ─────────────────────────────────────────────────────────────────
	if (type.isUnion()) {
		const members = type.types;

		// boolean (true | false)
		if (members.every((t) => !!(t.flags & ts.TypeFlags.BooleanLiteral))) {
			return { type: 'boolean' };
		}

		// String enum: all string literals
		if (members.every((t) => t.isStringLiteral())) {
			return {
				type: 'string',
				enum: members.map((t) => (t as ts.StringLiteralType).value),
			};
		}

		// Nullable: T | null  /  T | undefined  /  T | null | undefined
		const nullish = members.filter((t) => t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined));
		const nonNull = members.filter((t) => !(t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)));
		if (nullish.length && nonNull.length === 1) {
			return { ...typeToSchema(nonNull[0]!, depth), nullable: true };
		}

		return { anyOf: nonNull.map((t) => typeToSchema(t, depth + 1)) };
	}

	// ── Date ─────────────────────────────────────────────────────────────────
	if (type.symbol?.getName() === 'Date') return { type: 'string', format: 'date-time' };

	// ── Built-in String (capital S) ──────────────────────────────────────────
	if (type.symbol?.getName() === 'String') return { type: 'string' };

	// ── Array ────────────────────────────────────────────────────────────────
	if (checker.isArrayType(type)) {
		const args = checker.getTypeArguments(type as ts.TypeReference);
		return { type: 'array', items: args[0] ? typeToSchema(args[0], depth + 1) : {} };
	}

	// ── Named type → $ref ────────────────────────────────────────────────────
	const symbol = type.aliasSymbol ?? type.getSymbol();
	if (symbol) {
		const name = symbol.getName();

		if (!SKIP_REF_NAMES.has(name) && !isPrismaInternal(name)) {
			const typeArgs = type.aliasTypeArguments;

			// For generic instantiations (e.g. PaginatedDocs<Job>), check if all
			// type arguments have usable names. If any argument is an anonymous
			// Prisma resolved type (__type), inline the concrete schema instead.
			if (typeArgs?.length) {
				const argNames = typeArgs.map((a) => {
					const sym = a.aliasSymbol ?? a.getSymbol();
					const n = sym?.getName();
					return n && n !== '__type' && n !== '__object' && !n.startsWith('$') ? n : null;
				});
				if (argNames.some((n) => n === null)) {
					// Inline concrete schema — type args are anonymous (e.g. Prisma resolved types)
					return buildPropertiesSchema(type, depth + 1);
				}
				// All type args are named — use a compound $ref
				const refName = `${name}_${argNames.join('_')}`;
				if (inProgress.has(refName)) {
					return { $ref: `#/components/schemas/${refName}` };
				}
				if (!definitions[refName]) {
					inProgress.add(refName);
					definitions[refName] = buildPropertiesSchema(type, depth + 1);
					inProgress.delete(refName);
				}
				return { $ref: `#/components/schemas/${refName}` };
			}

			// Non-generic named type — use a simple $ref
			if (inProgress.has(name)) {
				return { $ref: `#/components/schemas/${name}` };
			}
			if (!definitions[name]) {
				inProgress.add(name);
				definitions[name] = buildObjectOrEnumSchema(symbol, type, depth + 1);
				inProgress.delete(name);
			}
			return { $ref: `#/components/schemas/${name}` };
		}
	}

	// ── Inline object ────────────────────────────────────────────────────────
	return buildPropertiesSchema(type, depth);
}

function buildObjectOrEnumSchema(symbol: ts.Symbol, type: ts.Type, depth: number): object {
	// String enum (TypeScript enum or union of string literals via aliasSymbol)
	if (type.isUnion() && type.types.every((t) => t.isStringLiteral())) {
		return {
			type: 'string',
			enum: type.types.map((t) => (t as ts.StringLiteralType).value),
		};
	}
	// Enum (TypeScript enum declaration)
	if (type.flags & ts.TypeFlags.Enum || symbol.flags & ts.SymbolFlags.RegularEnum) {
		const declaredType = checker.getDeclaredTypeOfSymbol(symbol);
		if (declaredType.isUnion()) {
			return {
				type: 'string',
				enum: declaredType.types
					.filter((t) => t.isStringLiteral())
					.map((t) => (t as ts.StringLiteralType).value),
			};
		}
	}
	// Array alias (e.g. TenantSetting[])
	if (checker.isArrayType(type)) {
		const args = checker.getTypeArguments(type as ts.TypeReference);
		return { type: 'array', items: args[0] ? typeToSchema(args[0], depth) : {} };
	}
	// Object / interface / type alias
	return buildPropertiesSchema(checker.getDeclaredTypeOfSymbol(symbol), depth);
}

function buildPropertiesSchema(type: ts.Type, depth: number): object {
	const props = checker.getPropertiesOfType(type);
	if (!props.length) return { type: 'object' };

	const properties: Record<string, object> = {};
	const required: string[] = [];

	for (const prop of props) {
		const name = prop.getName();
		// Skip internal / private members
		if (name.startsWith('_') || name.startsWith('$')) continue;

		const pDecl = prop.valueDeclaration ?? prop.declarations?.[0];
		if (!pDecl) continue;

		const propType = checker.getTypeOfSymbolAtLocation(prop, pDecl);
		properties[name] = typeToSchema(propType, depth + 1);

		if (!(prop.flags & ts.SymbolFlags.Optional)) {
			required.push(name);
		}
	}

	return {
		type: 'object',
		properties,
		...(required.length ? { required } : {}),
	};
}

// Expand an input type into OpenAPI query parameters
function buildQueryParameters(inputType: ts.Type): object[] {
	const props = checker.getPropertiesOfType(inputType);
	return props.flatMap((prop) => {
		const pDecl = prop.valueDeclaration ?? prop.declarations?.[0];
		if (!pDecl) return [];
		const propType = checker.getTypeOfSymbolAtLocation(prop, pDecl);
		const isOptional = !!(prop.flags & ts.SymbolFlags.Optional);

		// Complex types (objects, arrays) are JSON-serialised as strings when
		// passed as query parameters.
		const schema = typeToSchema(propType);
		const isComplex = ('properties' in schema) || ('items' in schema) || ('anyOf' in schema);

		return [{
			in: 'query',
			name: prop.getName(),
			required: !isOptional,
			schema: isComplex ? { type: 'string', description: 'JSON-encoded value' } : schema,
		}];
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// OPENAPI PATH ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────

const paths: Record<string, Record<string, object>> = {};
let skipped = 0;

for (const route of routes) {
	const types = extractHandlerTypes(route);
	if (!types) { skipped += 1; continue; }

	const { inputType, outputType } = types;

	const responseSchema = typeToSchema(outputType);

	const operation: Record<string, unknown> = {
		tags: route.tags,
		operationId: route.handlerExport,
		security: [{ bearerAuth: [] }],
		responses: {
			200: {
				description: 'Success',
				content: { 'application/json': { schema: responseSchema } },
			},
			401: { description: 'Unauthorized' },
			400: { description: 'Bad request' },
			500: { description: 'Internal server error' },
		},
	};

	if (route.method === 'GET') {
		if (inputType) {
			operation.parameters = buildQueryParameters(inputType);
		}
	} else {
		// POST / DELETE with body
		// eslint-disable-next-line no-lonely-if
		if (inputType) {
			operation.requestBody = {
				required: true,
				content: {
					'application/json': { schema: typeToSchema(inputType) },
				},
			};
		}
	}

	if (!paths[route.apiPath]) paths[route.apiPath] = {};
	paths[route.apiPath]![route.method.toLowerCase()] = operation;
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSEMBLE + WRITE
// ─────────────────────────────────────────────────────────────────────────────

const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8')) as { name: string; version: string; description?: string };

const openApiDoc = {
	openapi: '3.0.3',
	info: {
		title: pkg.name,
		version: pkg.version,
		description: pkg.description ?? '',
	},
	paths,
	components: {
		schemas: definitions,
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				description: 'Signed session token issued at /api/auth/login',
			},
		},
	},
};

const outPath = resolve(ROOT, 'src/openapi.json');
writeFileSync(outPath, JSON.stringify(openApiDoc, null, 2));

const pathCount = Object.keys(paths).length;
const schemaCount = Object.keys(definitions).length;
console.log('✅  Generated src/openapi.json');
console.log(`    ${pathCount} paths  |  ${schemaCount} component schemas  |  ${skipped} skipped`);
