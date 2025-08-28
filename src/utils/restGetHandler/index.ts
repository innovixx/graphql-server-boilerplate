import type { NextFunction, Request, Response } from 'express';
import type { Test } from '../../../databases/maindb/client/index.js';
import type { PaginatedDocs, QueryParams } from '../../lib/types.js';
import { parseQueryParams } from '../parseQueryString/index.js';

export const restGetHandler = (
	getFn: (params: QueryParams) => Promise<PaginatedDocs<Test>>,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const params = parseQueryParams(req.query);
	const records = await getFn(params);
	res.status(200).json(records);
	next();
};
