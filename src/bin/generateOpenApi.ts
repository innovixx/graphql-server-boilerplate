
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpointsDir = path.join(__dirname, '../endpoints');
const testEndpointsDir = path.join(endpointsDir, 'test');
type OpenApiType = {
	openapi: string;
	info: Record<string, unknown>;
	servers: Array<Record<string, unknown>>;
	paths: Record<string, unknown>;
	components: Record<string, unknown>;
};

const openApi: OpenApiType = {
	openapi: '3.0.3',
	info: {
		title: 'Example API',
		description: 'Auto-generated OpenAPI documentation.',
		version: '1.0.0',
	},
	servers: [{ url: 'http://localhost:9000/api' }],
	paths: {},
	components: {},
};

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
					// Dynamically determine tag from first path segment
					let tag = '';
					// eslint-disable-next-line no-useless-escape
					const match = endpointPath.match(/^\/([^\/]+)/);
					if (match && match[1]) {
						tag = match[1].charAt(0).toUpperCase() + match[1].slice(1);
					}
					// Add tags to each method
					if (typeof endpointMethods === 'object' && endpointMethods !== null) {
						Object.entries(endpointMethods as Record<string, any>).forEach(([_, methodObj]) => {
							if (typeof methodObj === 'object' && methodObj !== null) {
								if (!methodObj.tags) {
									// eslint-disable-next-line no-param-reassign
									methodObj.tags = [tag];
								} else if (!methodObj.tags.includes(tag)) {
									methodObj.tags.push(tag);
								}
							}
						});
					}
					if (!openApi.paths[endpointPath]) {
						openApi.paths[endpointPath] = endpointMethods;
					} else if (typeof openApi.paths[endpointPath] === 'object' && typeof endpointMethods === 'object') {
						openApi.paths[endpointPath] = {
							...openApi.paths[endpointPath] as object,
							...endpointMethods as object,
						};
					}
				});
			}
		}),
	);
	fs.writeFileSync(
		path.join(__dirname, '../openapi.json'),
		JSON.stringify(openApi, null, 2),
	);
}

main();
