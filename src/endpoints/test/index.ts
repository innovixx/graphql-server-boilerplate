import { Router } from 'express';
import type { IResolvers } from '@graphql-tools/utils';
import { restGetHandler } from '../../utils/restGetHandler/index.js';
import { getTests } from './getTests/index.js';
import { graphqlGetHandler } from '../../utils/graphqlGetHandler/index.js';
import { restPostHandler } from '../../utils/restPostHandler/index.js';
import { createTest } from './createTest/index.js';
import { graphqlPostHandler } from '../../utils/graphqlPostHandler/index.js';


export const testsRouter = (): Router => {
	const router = Router();

	router.get('/', restGetHandler(getTests));
	router.post('/', restPostHandler(createTest));

	return router;
};

export const testResolvers: IResolvers = {
	Query: {
		tests: graphqlGetHandler(getTests),
	},
	Mutation: {
		createTest: graphqlPostHandler(createTest),
	},
};
