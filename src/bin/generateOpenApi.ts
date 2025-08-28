// scripts/generateOpenApi.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpointsDir = path.join(__dirname, '../endpoints');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openApi: any = {
	openapi: '3.0.3',
	info: {
		title: 'Example API',
		description: 'Auto-generated OpenAPI documentation.',
		version: '1.0.0',
	},
	servers: [{ url: 'http://localhost:9000/api/rest' }],
	paths: {},
	components: { schemas: {} },
};

const parseEndpointFile = (filePath: string) => {
	const content = fs.readFileSync(filePath, 'utf-8');
	const useRegex = /router\.use\(['"`]([^'"`]+)['"`]/g;
	let match;
	const queryParams = [
		{ name: 'limit', in: 'query', schema: { type: 'integer' }, required: false },
		{ name: 'offset', in: 'query', schema: { type: 'integer' }, required: false },
		{ name: 'sortBy', in: 'query', schema: { type: 'string' }, required: false },
		{
			name: 'where',
			in: 'query',
			schema: { type: 'string' },
			required: false,
			description:
				'A JSON string representing filter conditions. Supports logical operators (and, or) and field operators (equals, contains, not_equals, in, not_in, exists, greater_than, greater_than_equal, less_than, less_than_equal). Example: { "name": { "contains": "foo" }, "and": [{ "active": { "equals": true } }] }',
		},
		{
			name: 'select',
			in: 'query',
			schema: { type: 'string' },
			required: false,
			description:
				'A JSON string specifying which fields to include in the result. Use field names as keys and true as values for inclusion. Supports nested selection. Example: { "id": true, "name": true, "profile": { "email": true } }',
		},
	];
	// eslint-disable-next-line no-cond-assign
	while ((match = useRegex.exec(content)) !== null) {
		const route = match[1];
		if (!openApi.paths[route]) openApi.paths[route] = {};
		openApi.paths[route].get = {
			summary: `${route}`,
			parameters: queryParams,
			responses: { 200: { description: 'Success' } },
		};
	}
};

const scanEndpoints = (dir: string) => {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			scanEndpoints(fullPath);
		} else if (file.endsWith('.ts')) {
			parseEndpointFile(fullPath);
		}
	});
};


scanEndpoints(endpointsDir);

fs.writeFileSync(
	path.join(__dirname, '../openapi.json'),
	JSON.stringify(openApi, null, 2),
);
