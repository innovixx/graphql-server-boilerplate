import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  text: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const TestCountAggregateInputObjectSchema: z.ZodType<Prisma.TestCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TestCountAggregateInputType>;
export const TestCountAggregateInputObjectZodSchema = makeSchema();
