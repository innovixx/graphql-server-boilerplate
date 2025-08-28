import type { Prisma } from '../../../../../databases/maindb/client';
import { z } from 'zod';
import { TestOrderByWithRelationInputObjectSchema } from './objects/TestOrderByWithRelationInput.schema';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';
import { TestWhereUniqueInputObjectSchema } from './objects/TestWhereUniqueInput.schema';
import { TestCountAggregateInputObjectSchema } from './objects/TestCountAggregateInput.schema';

export const TestCountSchema: z.ZodType<Prisma.TestCountArgs> = z.object({ orderBy: z.union([TestOrderByWithRelationInputObjectSchema, TestOrderByWithRelationInputObjectSchema.array()]).optional(), where: TestWhereInputObjectSchema.optional(), cursor: TestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TestCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.TestCountArgs>;

export const TestCountZodSchema = z.object({ orderBy: z.union([TestOrderByWithRelationInputObjectSchema, TestOrderByWithRelationInputObjectSchema.array()]).optional(), where: TestWhereInputObjectSchema.optional(), cursor: TestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TestCountAggregateInputObjectSchema ]).optional() }).strict();