import type { NextFunction, Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';

export const restPostHandler = (
	postFn: EndpointHandler<any, any>,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const result = await postFn(req.body, req, res);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
