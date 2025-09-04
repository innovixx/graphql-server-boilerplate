import type { NextFunction, Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';
import { parseQueryParams } from '../../parseQueryString/index.js';

export const restHandler = (
	Fn: EndpointHandler<any, any>,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		let result;
		if (req.body) {
			result = await Fn(req.body, req, res);
		} else {
			const params = parseQueryParams(req.query);
			result = await Fn(params, req, res);
		}

		res.status(200).json(result);
		next();
	} catch (error) {
		next(error);
	}
};
