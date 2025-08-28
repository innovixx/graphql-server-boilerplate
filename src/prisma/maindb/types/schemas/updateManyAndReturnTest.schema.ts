import { z } from 'zod';
import { TestSelectObjectSchema } from './objects/TestSelect.schema';
import { TestUpdateManyMutationInputObjectSchema } from './objects/TestUpdateManyMutationInput.schema';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';

export const TestUpdateManyAndReturnSchema = z.object({ select: TestSelectObjectSchema.optional(), data: TestUpdateManyMutationInputObjectSchema, where: TestWhereInputObjectSchema.optional()  }).strict()