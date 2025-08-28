import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const TestUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.TestUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.TestUncheckedUpdateManyInput>;
export const TestUncheckedUpdateManyInputObjectZodSchema = makeSchema();
