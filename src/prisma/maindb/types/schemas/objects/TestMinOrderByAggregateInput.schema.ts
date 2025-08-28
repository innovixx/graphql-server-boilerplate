import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TestMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TestMinOrderByAggregateInput>;
export const TestMinOrderByAggregateInputObjectZodSchema = makeSchema();
