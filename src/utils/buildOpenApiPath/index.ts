type OpenApiSchemaProps = {
	path: string;
	method: string;
	summary: string;
	responses: Record<string, unknown>;
};


export function buildOpenApiPath({ path, method, summary, responses }: OpenApiSchemaProps): Record<string, unknown> {
	return {
		[path]: {
			[method]: {
				summary,
				responses,
			},
		},
	};
}
