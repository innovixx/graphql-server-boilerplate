import { z } from 'zod';
import { TestUpdateManyMutationInputObjectSchema } from './objects/TestUpdateManyMutationInput.schema';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';

export const TestUpdateManySchema = z.object({ data: TestUpdateManyMutationInputObjectSchema, where: TestWhereInputObjectSchema.optional()  })