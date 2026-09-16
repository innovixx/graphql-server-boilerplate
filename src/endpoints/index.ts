import { fileURLToPath } from 'url';
import { Router } from 'express';
import path from 'path';
import { createErrorMiddleware } from '@innovixx/api-kit';
import { testsRouter } from './test/index.js';
import swaggerRouter from '../routes/swagger.js';
import { logger } from '../lib/logger/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const endpointsRouter = (): Router => {
	const router = Router();

	router.use('/', swaggerRouter);
	router.use('/openapi.json', (_req, res) => {
		res.sendFile(path.resolve(__dirname, '../openapi.json'));
	});

	if (process.env.NODE_ENV !== 'production') {
		router.use('/tests', testsRouter());
	}

	router.use(createErrorMiddleware({
		onError: (err) => logger.error(String(err)),
		exposeInternalErrors: process.env.NODE_ENV === 'development',
	}));

	return router;
};
