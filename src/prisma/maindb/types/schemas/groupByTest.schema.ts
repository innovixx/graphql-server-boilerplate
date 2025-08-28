import { z } from 'zod';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';
import { TestOrderByWithAggregationInputObjectSchema } from './objects/TestOrderByWithAggregationInput.schema';
import { TestScalarWhereWithAggregatesInputObjectSchema } from './objects/TestScalarWhereWithAggregatesInput.schema';
import { TestScalarFieldEnumSchema } from './enums/TestScalarFieldEnum.schema';
import { TestCountAggregateInputObjectSchema } from './objects/TestCountAggregateInput.schema';
import { TestMinAggregateInputObjectSchema } from './objects/TestMinAggregateInput.schema';
import { TestMaxAggregateInputObjectSchema } from './objects/TestMaxAggregateInput.schema';

export const TestGroupBySchema = z.object({ where: TestWhereInputObjectSchema.optional(), orderBy: z.union([TestOrderByWithAggregationInputObjectSchema, TestOrderByWithAggregationInputObjectSchema.array()]).optional(), having: TestScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(TestScalarFieldEnumSchema), _count: z.union([ z.literal(true), TestCountAggregateInputObjectSchema ]).optional(), _min: TestMinAggregateInputObjectSchema.optional(), _max: TestMaxAggregateInputObjectSchema.optional() })