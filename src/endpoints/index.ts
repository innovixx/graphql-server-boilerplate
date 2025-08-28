import { Router } from 'express';
import { testsRouter } from './test/index.js';

export const endpointsRouter = (): Router => {
	const router = Router();
	router.use('/tests', testsRouter());

	return router;
};
