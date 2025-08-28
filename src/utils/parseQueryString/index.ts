import type { Request } from 'express';
import type { QueryParams } from '../../lib/types.js';
// Use Request['query'] as the type for query objects
type ReqQuery = Request['query'];

export const parseQueryParams = (query: ReqQuery): QueryParams => {
	const parsedQuery: QueryParams = query as QueryParams;

	parsedQuery.limit = parseInt(parsedQuery.limit as unknown as string, 10);
	parsedQuery.offset = parseInt(parsedQuery.offset as unknown as string, 10) || 0;
	if (parsedQuery.select) {
		const transformSelect = (obj: Record<string, unknown>): void => {
			// eslint-disable-next-line no-restricted-syntax
			for (const key in obj) {
				if (typeof obj[key] === 'string' && obj[key] === 'true') {
					// eslint-disable-next-line no-param-reassign
					obj[key] = true;
				} else if (typeof obj[key] === 'object' && obj[key] !== null) {
					transformSelect(obj[key] as Record<string, unknown>);
				}
			}
		};
		if (
			typeof parsedQuery.select === 'object'
			&& parsedQuery.select !== null
			&& !Array.isArray(parsedQuery.select)
		) {
			transformSelect(parsedQuery.select as Record<string, unknown>);
		}
	}

	return parsedQuery;
};
