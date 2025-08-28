import type { Handler } from 'express';
import type { IResolvers } from '@graphql-tools/utils';
import { createGetRestHandler } from '../../utils/createGetRestHandler/index.js';
import { getTests } from './getTests/index.js';
import { createGetGraphqlResolver } from '../../utils/createGetGraphqlResolver/index.js';

export const testEndpoints = (): Handler => (req, res, next) => {
	switch (req.method) {
		case 'GET': {
			createGetRestHandler(getTests)(req, res, next);
			break;
		}
		default: {
			res.status(405).send('Method Not Allowed');
			break;
		}
	}
};

export const testResolvers: IResolvers = {
	Query: {
		tests: createGetGraphqlResolver(getTests),
	},
};
