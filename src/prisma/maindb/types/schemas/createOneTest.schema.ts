import { z } from 'zod';
import { TestSelectObjectSchema } from './objects/TestSelect.schema';
import { TestCreateInputObjectSchema } from './objects/TestCreateInput.schema';
import { TestUncheckedCreateInputObjectSchema } from './objects/TestUncheckedCreateInput.schema';

export const TestCreateOneSchema = z.object({ select: TestSelectObjectSchema.optional(),  data: z.union([TestCreateInputObjectSchema, TestUncheckedCreateInputObjectSchema])  })