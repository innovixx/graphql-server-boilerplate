import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { testsRouter } from './test/index.js';
import swaggerRouter from '../routes/swagger.js';

export const endpointsRouter = (): Router => {
	const router = Router();

	if (process.env.NODE_ENV !== 'production') {
		router.use('/', swaggerRouter);
		router.use('/tests', testsRouter());
	}

	router.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
		res.status(500).json({
			error: {
				// eslint-disable-next-line no-nested-ternary
				message: typeof err === 'string'
					? err
					: err instanceof Error
						? err.message
						: 'Internal Server Error',
			},
		});
	});

	return router;
};
