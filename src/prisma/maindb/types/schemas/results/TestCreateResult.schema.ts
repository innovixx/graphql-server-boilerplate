import { z } from 'zod';
export const TestCreateResultSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});