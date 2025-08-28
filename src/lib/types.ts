import type { JsonObject } from '../../databases/maindb/client/runtime/library.js';

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

export type Operator = (typeof validOperators)[number]

export type JsonValue = JsonArray | JsonObject | unknown
export type JsonArray = Array<JsonValue>
export type WhereField = {
	[key in Operator]?: JsonValue
}

export type Where = {
	[key: string | 'and' | 'or']: Where[] | WhereField
}

export type SelectIncludeType = {
	[k: string]: SelectIncludeType | true
}

export type QueryParams = {
	limit?: number;
	offset?: number;
	sortBy?: string;
	where?: Where;
	select?: SelectIncludeType;
}

export type PaginatedDocs<T> = {
	total: number
	items: T[]
}
