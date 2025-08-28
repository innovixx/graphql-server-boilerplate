import { Router } from 'express';
import { testsRouter } from './test/index.js';

export const endpointsRouter = (): Router => {
	const router = Router();

	if (process.env.NODE_ENV !== 'production') {
		router.use('/tests', testsRouter());
	}

	return router;
};
