import { PrismaClient as MainDBPrismaClient } from '../../databases/maindb/client/index.js';

export const maindb = new MainDBPrismaClient({
  errorFormat: 'minimal',
  log: [
    { emit: 'event', level: 'query' },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});
