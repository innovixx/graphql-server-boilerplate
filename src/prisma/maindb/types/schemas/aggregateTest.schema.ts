import { z } from 'zod';
import { TestOrderByWithRelationInputObjectSchema } from './objects/TestOrderByWithRelationInput.schema';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';
import { TestWhereUniqueInputObjectSchema } from './objects/TestWhereUniqueInput.schema';
import { TestCountAggregateInputObjectSchema } from './objects/TestCountAggregateInput.schema';
import { TestMinAggregateInputObjectSchema } from './objects/TestMinAggregateInput.schema';
import { TestMaxAggregateInputObjectSchema } from './objects/TestMaxAggregateInput.schema';

export const TestAggregateSchema = z.object({ orderBy: z.union([TestOrderByWithRelationInputObjectSchema, TestOrderByWithRelationInputObjectSchema.array()]).optional(), where: TestWhereInputObjectSchema.optional(), cursor: TestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), TestCountAggregateInputObjectSchema ]).optional(), _min: TestMinAggregateInputObjectSchema.optional(), _max: TestMaxAggregateInputObjectSchema.optional() })