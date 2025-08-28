import merge from 'lodash.merge';
import type { IResolvers } from '@graphql-tools/utils';
import { testResolvers } from '../endpoints/test/index.js';

export const resolvers: IResolvers = merge(
	{} as IResolvers,
	testResolvers,
);
