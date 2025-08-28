import { z } from 'zod';
import { TestSelectObjectSchema } from './objects/TestSelect.schema';
import { TestUpdateInputObjectSchema } from './objects/TestUpdateInput.schema';
import { TestUncheckedUpdateInputObjectSchema } from './objects/TestUncheckedUpdateInput.schema';
import { TestWhereUniqueInputObjectSchema } from './objects/TestWhereUniqueInput.schema';

export const TestUpdateOneSchema = z.object({ select: TestSelectObjectSchema.optional(),  data: z.union([TestUpdateInputObjectSchema, TestUncheckedUpdateInputObjectSchema]), where: TestWhereUniqueInputObjectSchema  })