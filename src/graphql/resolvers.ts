import merge from 'lodash.merge';
import { baseResolvers } from '@innovixx/api-kit';
import { testResolvers } from '../endpoints/test/index.js';

export const resolvers = merge(
	{},
	baseResolvers,
	testResolvers,
);
