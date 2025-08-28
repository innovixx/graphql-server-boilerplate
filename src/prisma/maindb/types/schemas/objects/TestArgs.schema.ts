import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';
import { TestSelectObjectSchema } from './TestSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => TestSelectObjectSchema).optional()
}).strict();
export const TestArgsObjectSchema = makeSchema();
export const TestArgsObjectZodSchema = makeSchema();
