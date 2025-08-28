import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.TestOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.TestOrderByWithRelationInput>;
export const TestOrderByWithRelationInputObjectZodSchema = makeSchema();
