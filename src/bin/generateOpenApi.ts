// Recursively remove $ref to non-existent schemas (e.g., __schema0, __schema1)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import type { ZodOpenApiPathItemObject, ZodOpenApiPathsObject } from 'zod-openapi';
import { createDocument } from 'zod-openapi';

function removePhantomRefs(obj: unknown): unknown {
	if (Array.isArray(obj)) {
		return obj.map(removePhantomRefs);
	}
	if (obj && typeof obj === 'object') {
		if ((obj as any).$ref && typeof (obj as any).$ref === 'string' && (obj as any).$ref.match(/^#\/components\/schemas\/__schema\d+$/)) {
			// Remove the $ref entirely (replace with empty schema)
			return {};
		}
		const newObj: { [key: string]: unknown } = {};
		// eslint-disable-next-line no-restricted-syntax
		for (const key of Object.keys(obj)) {
			newObj[key] = removePhantomRefs((obj as Record<string, unknown>)[key]);
		}
		return newObj;
	}
	return obj;
}

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpointsDir = path.join(__dirname, '../endpoints');
const testEndpointsDir = path.join(endpointsDir, 'test');

function findEndpointFiles(dir: string, excludeDir?: string): string[] {
	let results: string[] = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const filePath = path.join(dir, file);
		if (excludeDir && filePath.startsWith(excludeDir)) {
			return;
		}
		const stat = fs.statSync(filePath);
		if (stat && stat.isDirectory()) {
			results = results.concat(findEndpointFiles(filePath, excludeDir));
		} else if (file === 'index.ts') {
			results.push(filePath);
		}
	});
	return results;
}

async function main(): Promise<void> {
	let endpointFiles: string[];
	if (process.env.NODE_ENV === 'production') {
		endpointFiles = findEndpointFiles(endpointsDir, testEndpointsDir);
	} else {
		endpointFiles = findEndpointFiles(endpointsDir);
	}

	const paths: ZodOpenApiPathsObject = {};

	await Promise.all(
		endpointFiles.map(async (file) => {
			const mod = await import(file);
			let schema: Record<string, unknown> | undefined;
			if (typeof mod.generateOpenApiSchema === 'function') {
				schema = mod.generateOpenApiSchema();
			} else if (mod.generateOpenApiSchema && typeof mod.generateOpenApiSchema === 'object') {
				schema = mod.generateOpenApiSchema;
			}
			if (schema) {
				Object.entries(schema).forEach(([endpointPath, endpointMethods]) => {
					if (!paths[endpointPath]) {
						paths[endpointPath] = endpointMethods as ZodOpenApiPathItemObject;
					} else if (typeof paths[endpointPath] === 'object' && typeof endpointMethods === 'object') {
						paths[endpointPath] = {
							...paths[endpointPath] as object,
							...endpointMethods as object,
						};
					}
				});
			}
		}),
	);

	const openApiDoc = createDocument({
		openapi: '3.0.3',
		info: {
			title: 'Aether Cirrus API',
			description: 'This API provides public endpoints for Aether Cirrus.',
			version: '0.0.0',
		},
		servers: [{ url: `${process.env.SERVER_URL}/api` }],
		paths,
		components: {
			securitySchemes: {
				ViewerCsrfToken: {
					type: 'apiKey',
					in: 'header',
					name: 'X-API-KEY',
					description: 'An API key associated with a user account',
				},
			},
			schemas: {},
		},
	});

	// Remove phantom $ref schemas before writing
	const cleanedDoc = removePhantomRefs(openApiDoc);
	fs.writeFileSync(
		path.join(__dirname, '../openapi.json'),
		JSON.stringify(cleanedDoc, null, 2),
	);
}

main();
