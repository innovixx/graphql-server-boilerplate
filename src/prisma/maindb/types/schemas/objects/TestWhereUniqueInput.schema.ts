import { z } from 'zod';
import type { Prisma } from '../../../../../../databases/maindb/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const TestWhereUniqueInputObjectSchema: z.ZodType<Prisma.TestWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.TestWhereUniqueInput>;
export const TestWhereUniqueInputObjectZodSchema = makeSchema();
