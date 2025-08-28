import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TestCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TestCountOrderByAggregateInput>;
export const TestCountOrderByAggregateInputObjectZodSchema = makeSchema();
