import { z } from 'zod';
import { TestCreateManyInputObjectSchema } from './objects/TestCreateManyInput.schema';

export const TestCreateManySchema = z.object({ data: z.union([ TestCreateManyInputObjectSchema, z.array(TestCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })