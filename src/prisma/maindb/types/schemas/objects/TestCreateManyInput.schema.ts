import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  text: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const TestCreateManyInputObjectSchema: z.ZodType<Prisma.TestCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.TestCreateManyInput>;
export const TestCreateManyInputObjectZodSchema = makeSchema();
