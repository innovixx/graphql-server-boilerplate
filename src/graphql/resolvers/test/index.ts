import type { IResolvers } from '@graphql-tools/utils';
import { maindb } from '../../../prisma/index.js';

export const testResolvers: IResolvers = {
  Query: {
    test: async (_: unknown, __: unknown, ___: unknown): Promise<string> => {
      try {
        const test = await maindb.test.findFirst();

        if (!test) {
          throw new Error('Test not found');
        }

        return test.text;
      } catch (err) {
        throw new Error(`Failed to query test: ${err}`);
      }
    },
  },
};
