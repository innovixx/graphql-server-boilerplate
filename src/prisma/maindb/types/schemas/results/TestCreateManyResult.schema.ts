import { z } from 'zod';
export const TestCreateManyResultSchema = z.object({
  count: z.number()
});