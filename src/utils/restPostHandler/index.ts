/* eslint-disable indent */

import type { NextFunction, Request, Response } from 'express';

export const restPostHandler = <T, R>(
	postFn: (data: T) => Promise<R>,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const result = await postFn(req.body);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
