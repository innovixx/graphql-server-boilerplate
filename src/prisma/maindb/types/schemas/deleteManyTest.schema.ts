import { z } from 'zod';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';

export const TestDeleteManySchema = z.object({ where: TestWhereInputObjectSchema.optional()  })