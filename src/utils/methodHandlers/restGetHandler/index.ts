import type { NextFunction, Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';
import { parseQueryParams } from '../../parseQueryString/index.js';

export const restGetHandler = (
	getFn: EndpointHandler<any, any>,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const params = parseQueryParams(req.query);
	const records = await getFn(params, req, res);
	res.status(200).json(records);
	next();
};
