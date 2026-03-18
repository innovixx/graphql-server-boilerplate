import type { Request, Response } from 'express';

export const validOperators = [
	'equals',
	'contains',
	'not_equals',
	'has',
	'in',
	'not_in',
	'not',
	'exists',
	'gt',
	'gte',
	'lt',
	'lte',
] as const;

export type Operator = typeof validOperators[number];

export type JsonValue = JsonArray | JsonObject | unknown;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type WhereField = Partial<Record<Operator, JsonValue | undefined>>;
export type Where = Record<string, WhereField | Where[]>;

export type SelectIncludeType = { [key: string]: true | SelectIncludeType };

export type QueryParams = {
	limit?: number;
	offset?: number;
	sortBy?: string;
	where?: Where;
	select?: SelectIncludeType;
};


export type PaginatedDocs<T> = {
	total: number;
	items: T[];
};

export type EndpointHandler<T, R> = (
	data: T,
	req: Request,
	res: Response
) => Promise<R> | void;
