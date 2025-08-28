import { z } from 'zod';
import { TestSelectObjectSchema } from './objects/TestSelect.schema';
import { TestWhereUniqueInputObjectSchema } from './objects/TestWhereUniqueInput.schema';
import { TestCreateInputObjectSchema } from './objects/TestCreateInput.schema';
import { TestUncheckedCreateInputObjectSchema } from './objects/TestUncheckedCreateInput.schema';
import { TestUpdateInputObjectSchema } from './objects/TestUpdateInput.schema';
import { TestUncheckedUpdateInputObjectSchema } from './objects/TestUncheckedUpdateInput.schema';

export const TestUpsertSchema = z.object({ select: TestSelectObjectSchema.optional(),  where: TestWhereUniqueInputObjectSchema, create: z.union([ TestCreateInputObjectSchema, TestUncheckedCreateInputObjectSchema ]), update: z.union([ TestUpdateInputObjectSchema, TestUncheckedUpdateInputObjectSchema ])  })