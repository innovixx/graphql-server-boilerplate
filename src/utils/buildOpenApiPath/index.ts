import { createSchema } from 'zod-openapi';
import type { ZodType } from 'zod';

type OpenApiSchemaProps = {
	path: string;
	method: string;
	summary?: string;
	queryZod?: ZodType;
	bodyZod?: ZodType;
	responseZod?: ZodType;
	secure?: boolean;
};

function getBodyContent(bodyZod: ZodType): Record<string, unknown> {
	const { schema } = createSchema(bodyZod, { io: 'input', schemaComponents: {} });

	function hasFileField(obj: unknown, path: string[] = []): boolean {
		if (obj && typeof obj === 'object') {
			if ('properties' in obj && typeof obj.properties === 'object') {
				// eslint-disable-next-line guard-for-in, no-restricted-syntax
				for (const key in obj.properties) {
					const prop = (obj.properties as Record<string, unknown>)[key];
					// Debug log for each property
					if (
						prop
						&& typeof prop === 'object'
						&& !('$ref' in prop)
						&& (prop as { type?: string; format?: string }).type === 'string'
						&& (prop as { type?: string; format?: string }).format === 'binary'
					) {
						return true;
					}
					// Recursively check nested objects
					if (hasFileField(prop, [...path, key])) {
						return true;
					}
				}
			}
		}
		return false;
	}

	const hasFile = hasFileField(schema);
	if (hasFile) {
		return {
			'multipart/form-data': { schema },
			'application/json': { schema },
		};
	}
	return {
		'application/json': { schema },
	};
}


export function buildOpenApiPath({
	path,
	method,
	summary,
	queryZod,
	bodyZod,
	responseZod,
	secure,
}: OpenApiSchemaProps): Record<string, unknown> {
	const operation: Record<string, unknown> = {
		summary,
		tags: [path.replace(/^\//, '').split('/')[0]],
		responses: {
			200: {
				description: 'Successful response',
				content: {
					'application/json': {
						schema: responseZod
							? createSchema(responseZod, { io: 'output', schemaComponents: {} }).schema
							: {},
					},
				},
			},
		},
		...(secure && { security: [{ ViewerCsrfToken: [] }] }),
	};

	if (queryZod) {
		const { schema } = createSchema(queryZod, { io: 'input', schemaComponents: {} });
		if (schema && typeof schema === 'object' && 'properties' in schema) {
			operation.parameters = Object.entries((schema as { properties: Record<string, unknown> }).properties).map(
				([name, propSchema]) => {
					// For where, select, cursor: treat as single object parameter
					if (['where', 'select', 'cursor'].includes(name)) {
						return {
							in: 'query',
							name,
							schema: {
								type: 'object',
								properties: (propSchema && typeof propSchema === 'object' && 'properties' in propSchema)
									? (propSchema as { properties: Record<string, unknown> }).properties
									: {},
							},
							style: 'deepObject',
							explode: true,
							description: `Pass a JSON object for ${name}`,
						};
					}
					// For other params, keep default
					return {
						in: 'query',
						name,
						schema: propSchema,
					};
				},
			);
		}
	}

	if (bodyZod) {
		operation.requestBody = {
			content: getBodyContent(bodyZod),
		};
	}

	return {
		[path]: {
			[method]: operation,
		},
	};
}
