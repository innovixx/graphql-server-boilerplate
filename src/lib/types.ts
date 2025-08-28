import type { Request, Response } from 'express';
import { z } from 'zod';

export const validOperators = [
	'equals',
	'contains',
	'not_equals',
	'in',
	'not_in',
	'exists',
	'greater_than',
	'greater_than_equal',
	'less_than',
	'less_than_equal',
] as const;

export const OperatorSchema = z.enum(validOperators);
export type Operator = z.infer<typeof OperatorSchema>;

// eslint-disable-next-line no-use-before-define
export const JsonArraySchema: z.ZodType<unknown[]> = z.lazy(() => z.array(JsonValueSchema));
// eslint-disable-next-line no-use-before-define
export const JsonObjectSchema: z.ZodType<object> = z.lazy(() => z.record(z.string(), JsonValueSchema));
export const JsonValueSchema: z.ZodType<unknown> = z.lazy(() => z.union([JsonArraySchema, JsonObjectSchema, z.unknown()]));

export type JsonValue = z.infer<typeof JsonValueSchema>;
export type JsonArray = z.infer<typeof JsonArraySchema>;

export const WhereFieldSchema = z.object(
	Object.fromEntries(validOperators.map((op) => [op, JsonValueSchema.optional()])),
);
export type WhereField = z.infer<typeof WhereFieldSchema>;

export const WhereSchema: z.ZodType<unknown> = z.lazy(() => z.record(
	z.union([
		z.string(),
		z.literal('and'),
		z.literal('or'),
	]),
	z.union([z.array(WhereSchema), WhereFieldSchema]),
));
export type Where = z.infer<typeof WhereSchema>;

export const SelectIncludeTypeSchema: z.ZodType<unknown> = z.lazy(() => z.record(z.string(), z.union([SelectIncludeTypeSchema, z.literal(true)])));
export type SelectIncludeType = z.infer<typeof SelectIncludeTypeSchema>;

export const QueryParamsSchema = z.object({
	limit: z.number().optional(),
	offset: z.number().optional(),
	sortBy: z.string().optional(),
	where: WhereSchema.optional(),
	select: SelectIncludeTypeSchema.optional(),
});
export type QueryParams = z.infer<typeof QueryParamsSchema>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function PaginatedDocsSchema<T extends z.ZodTypeAny>(itemSchema: T) {
	return z.object({
		total: z.number(),
		items: z.array(itemSchema),
	});
}
export type PaginatedDocs<T> = {
	total: number;
	items: T[];
};

export type EndpointHandler<T, R> = (
	data: T,
	req: Request,
	res: Response
) => Promise<R> | void;
