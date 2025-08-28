import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const TestSelectObjectSchema: z.ZodType<Prisma.TestSelect> = makeSchema() as unknown as z.ZodType<Prisma.TestSelect>;
export const TestSelectObjectZodSchema = makeSchema();
