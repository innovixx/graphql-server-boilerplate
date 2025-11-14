import type { NextFunction, Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';
import { parseQueryParams } from '../../parseQueryString/index.js';

export const restHandler = <
    TParams = unknown,
    TResult = unknown
>(
		Fn: EndpointHandler<TParams, TResult>,
	) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			let result;
			if (req.body && Object.keys(req.body).length > 0) {
				result = await Fn(req.body, req, res);
			} else {
				const params = parseQueryParams(req.query) as TParams;
				result = await Fn(params, req, res);
			}

			res.status(200).json(result);
			next();
		} catch (error) {
			next(error);
		}
	};
