import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  text: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const TestCreateInputObjectSchema: z.ZodType<Prisma.TestCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TestCreateInput>;
export const TestCreateInputObjectZodSchema = makeSchema();
