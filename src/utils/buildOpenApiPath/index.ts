import { createSchema } from 'zod-openapi';
import type { ZodType } from 'zod';


type OpenApiSchemaProps = {
	path: string;
	method: string;
	summary: string;
	queryZod?: ZodType;
	bodyZod?: ZodType;
	responseZod?: ZodType;
};

export function buildOpenApiPath({
	path,
	method,
	summary,
	queryZod,
	bodyZod,
	responseZod,
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
			parameters = Object.entries(queryOpenApi.properties as Record<string, unknown>).map(([name, schema]) => ({
				name,
				in: 'query',
				required: required.includes(name),
				schema,
			}));
		}
	}
	const bodySchema = bodyZod ? createSchema(bodyZod, { io: 'input', schemaComponents: {} }).schema : undefined;
	const responseSchema = responseZod ? createSchema(responseZod, { io: 'output', schemaComponents: {} }).schema : undefined;
	const requestBody = bodySchema
		? {
			content: {
				'application/json': {
					schema: bodySchema,
				},
			},
		}
		: undefined;

	const openApiResponses = {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: responseSchema,
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
			},
		},
	};
}
