
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
	const querySchema = queryZod ? createSchema(queryZod, { io: 'input', schemaComponents: {} }).schema : {};
	const bodySchema = bodyZod ? createSchema(bodyZod, { io: 'input', schemaComponents: {} }).schema : {};
	const responseSchema = responseZod ? createSchema(responseZod, { io: 'output', schemaComponents: {} }).schema : {};
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
				...(querySchema ? { querySchema } : {}),
				...(requestBody ? { requestBody } : {}),
				responses: openApiResponses,
			},
		},
	};
}
