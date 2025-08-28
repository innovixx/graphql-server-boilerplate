import { z } from 'zod';
export const TestFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));