import { Router } from 'express';
import type { IResolvers } from '@graphql-tools/utils';
import { restGetHandler } from '../../utils/methodHandlers/restGetHandler/index.js';
import { getTests } from './getTests/index.js';
import { restPostHandler } from '../../utils/methodHandlers/restPostHandler/index.js';
import { createTest } from './createTest/index.js';
import { graphqlPostHandler } from '../../utils/methodHandlers/graphqlPostHandler/index.js';
import { graphqlGetHandler } from '../../utils/methodHandlers/graphqlGetHandler/index.js';
import { updateTest } from './updateTest/index.js';


export const testsRouter = (): Router => {
	const router = Router();

	router.get('/get-tests', restGetHandler(getTests));
	router.post('/create-test', restPostHandler(createTest));
	router.put('/update-test', restPostHandler(updateTest));

	return router;
};

export const testResolvers: IResolvers = {
	Query: {
		tests: graphqlGetHandler(getTests),
	},
	Mutation: {
		createTest: graphqlPostHandler(createTest),
		updateTest: graphqlPostHandler(updateTest),
	},
};
