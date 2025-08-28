/* eslint-disable indent */

import type { NextFunction, Request, Response } from 'express';

export const restPostHandler = <R>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	postFn: (data: { input: any }) => Promise<R>,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const result = await postFn({
			input: req.body,
		});
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
