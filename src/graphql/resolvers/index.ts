import merge from 'lodash.merge';
import { testResolvers } from './test/index.js';

export const resolvers = merge(
  testResolvers,
);
