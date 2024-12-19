import { logger } from '../../lib/logger/index.js';
import { maindb } from '../../prisma/index.js';

export const seedTest = async () => {
  await maindb.test.create({
    data: {
      text: 'Hello World',
    },
  });

  logger.info('Test seeded successfully');
};
