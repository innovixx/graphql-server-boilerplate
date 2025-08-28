import { z } from 'zod';
import { TestSelectObjectSchema } from './objects/TestSelect.schema';
import { TestCreateManyInputObjectSchema } from './objects/TestCreateManyInput.schema';

export const TestCreateManyAndReturnSchema = z.object({ select: TestSelectObjectSchema.optional(), data: z.union([ TestCreateManyInputObjectSchema, z.array(TestCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()