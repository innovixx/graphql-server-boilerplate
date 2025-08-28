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
export const TestUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.TestUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.TestUncheckedUpdateInput>;
export const TestUncheckedUpdateInputObjectZodSchema = makeSchema();
