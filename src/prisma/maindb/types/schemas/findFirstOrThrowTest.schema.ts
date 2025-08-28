import { Prisma } from '../../../../../databases/maindb/client';
import { z } from 'zod';
import { TestOrderByWithRelationInputObjectSchema } from './objects/TestOrderByWithRelationInput.schema';
import { TestWhereInputObjectSchema } from './objects/TestWhereInput.schema';
import { TestWhereUniqueInputObjectSchema } from './objects/TestWhereUniqueInput.schema';
import { TestScalarFieldEnumSchema } from './enums/TestScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TestFindFirstOrThrowSelectSchema: z.ZodType<Prisma.TestSelect> = z.object({
    id: z.boolean().optional(),
    text: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TestSelect>;

export const TestFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    text: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const TestFindFirstOrThrowSchema: z.ZodType<Prisma.TestFindFirstOrThrowArgs> = z.object({ select: TestFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([TestOrderByWithRelationInputObjectSchema, TestOrderByWithRelationInputObjectSchema.array()]).optional(), where: TestWhereInputObjectSchema.optional(), cursor: TestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.TestScalarFieldEnum), z.nativeEnum(Prisma.TestScalarFieldEnum).array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TestFindFirstOrThrowArgs>;

export const TestFindFirstOrThrowZodSchema = z.object({ select: TestFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([TestOrderByWithRelationInputObjectSchema, TestOrderByWithRelationInputObjectSchema.array()]).optional(), where: TestWhereInputObjectSchema.optional(), cursor: TestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.TestScalarFieldEnum), z.nativeEnum(Prisma.TestScalarFieldEnum).array()]).optional() }).strict();