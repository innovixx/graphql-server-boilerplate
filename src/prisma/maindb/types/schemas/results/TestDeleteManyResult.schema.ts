import { z } from 'zod';
export const TestDeleteManyResultSchema = z.object({
  count: z.number()
});