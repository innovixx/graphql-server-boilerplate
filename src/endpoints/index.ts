import { Router } from 'express';
import { testEndpoints } from './test/index.js';

export const endpointsRouter = (): Router => {
	const router = Router();
	router.use('/tests', (req, res, next) => testEndpoints()(req, res, next));

	return router;
};
