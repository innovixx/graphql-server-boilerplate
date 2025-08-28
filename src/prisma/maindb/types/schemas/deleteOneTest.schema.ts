import { z } from 'zod';
import { TestSelectObjectSchema } from './objects/TestSelect.schema';
import { TestWhereUniqueInputObjectSchema } from './objects/TestWhereUniqueInput.schema';

export const TestDeleteOneSchema = z.object({ select: TestSelectObjectSchema.optional(),  where: TestWhereUniqueInputObjectSchema  })