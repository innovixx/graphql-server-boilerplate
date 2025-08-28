import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TestCountOrderByAggregateInputObjectSchema } from './TestCountOrderByAggregateInput.schema';
import { TestMaxOrderByAggregateInputObjectSchema } from './TestMaxOrderByAggregateInput.schema';
import { TestMinOrderByAggregateInputObjectSchema } from './TestMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => TestCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => TestMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => TestMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const TestOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.TestOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.TestOrderByWithAggregationInput>;
export const TestOrderByWithAggregationInputObjectZodSchema = makeSchema();
