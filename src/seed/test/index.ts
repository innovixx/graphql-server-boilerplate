import { logger } from '../../lib/logger';
import { maindb } from '../../prisma';

export const seedTest = async () => {
  await maindb.test.create({
    data: {
      text: 'Hello World',
    },
  });

  logger.info('Test seeded successfully');
};
