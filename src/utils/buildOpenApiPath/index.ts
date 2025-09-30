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

export function buildOpenApiPath({
	path,
	method,
	summary,
	queryZod,
	bodyZod,
	responseZod,
	secure,
}: OpenApiSchemaProps): Record<string, unknown> {
	let parameters: Array<Record<string, unknown>> = [];
	if (queryZod) {
		const queryOpenApi = queryZod ? createSchema(queryZod, { io: 'input', schemaComponents: {} }).schema : undefined;
		if (
			typeof queryOpenApi === 'object'
			&& queryOpenApi !== null
			&& 'type' in queryOpenApi
			&& queryOpenApi.type === 'object'
			&& 'properties' in queryOpenApi
		) {
			const required = Array.isArray(queryOpenApi.required) ? queryOpenApi.required : [];
			parameters = Object.entries(queryOpenApi.properties as Record<string, unknown>).map(([name, schema]) => {
				if (name === 'where') {
					// Reference the shared OpenAPI parameter for 'where'
					return {
						$ref: '#/components/parameters/Where',
					};
				}
				if (name === 'select') {
					// Reference the shared OpenAPI parameter for 'select'
					return {
						$ref: '#/components/parameters/Select',
					};
				}
				if (name === 'sortBy') {
					// Reference the shared OpenAPI parameter for 'select'
					return {
						$ref: '#/components/parameters/SortBy',
					};
				}
				// If schema is a complex type (object or array), treat as optional string
				if (
					schema
					&& typeof schema === 'object'
					&& 'type' in schema
					&& ((schema as Record<string, unknown>).type === 'object' || (schema as Record<string, unknown>).type === 'array')
				) {
					return {
						name,
						in: 'query',
						required: false,
						schema: { type: 'string' },
					};
				}
				// Remove $ref if present in schema
				if (schema && typeof schema === 'object' && '$ref' in (schema as object)) {
					const { $ref, ...rest } = schema as Record<string, unknown>;
					return {
						name,
						in: 'query',
						required: required.includes(name),
						schema: rest,
					};
				}
				return {
					name,
					in: 'query',
					required: required.includes(name),
					schema,
				};
			});
		}
	}
	const bodySchema = bodyZod ? createSchema(bodyZod, { io: 'input', schemaComponents: {} }).schema : undefined;
	const responseSchema = responseZod ? createSchema(responseZod, { io: 'output', schemaComponents: {} }).schema : undefined;
	const requestBody = bodySchema
		? {
			content: {
				'application/json': {
					schema: (bodySchema && typeof bodySchema === 'object' && '$ref' in bodySchema)
						? Object.fromEntries(Object.entries(bodySchema).filter(([k]) => k !== '$ref'))
						: bodySchema,
				},
			},
		}
		: undefined;

	const openApiResponses = {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: (responseSchema && typeof responseSchema === 'object' && '$ref' in responseSchema)
						? Object.fromEntries(Object.entries(responseSchema).filter(([k]) => k !== '$ref'))
						: responseSchema,
				},
			},
		},
	};

	return {
		[path]: {
			[method]: {
				summary,
				...(parameters.length ? { parameters } : {}),
				...(requestBody ? { requestBody } : {}),
				responses: openApiResponses,
				...(secure ? { security: [{ ViewerCsrfToken: [] }] } : {}),
			},
		},
	};
}
