// @ts-nocheck
/**
 * Prisma Zod Generator - Single File (inlined)
 * Auto-generated. Do not edit.
 */

import { z } from 'zod';
// File: TransactionIsolationLevel.schema.ts

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable'])

// File: TestScalarFieldEnum.schema.ts

export const TestScalarFieldEnumSchema = z.enum(['id', 'text', 'createdAt', 'updatedAt'])

// File: SortOrder.schema.ts

export const SortOrderSchema = z.enum(['asc', 'desc'])

// File: QueryMode.schema.ts

export const QueryModeSchema = z.enum(['default', 'insensitive'])

// File: TestWhereInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectZodSchema), z.string()]).optional(),
  text: z.union([z.lazy(() => StringFilterObjectZodSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectZodSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectZodSchema), z.date()]).optional()
}).strict();
export const TestWhereInputObjectZodSchema = makeSchema();


// File: TestOrderByWithRelationInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestOrderByWithRelationInputObjectZodSchema = makeSchema();


// File: TestWhereUniqueInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const TestWhereUniqueInputObjectZodSchema = makeSchema();


// File: TestOrderByWithAggregationInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => TestCountOrderByAggregateInputObjectZodSchema).optional(),
  _max: z.lazy(() => TestMaxOrderByAggregateInputObjectZodSchema).optional(),
  _min: z.lazy(() => TestMinOrderByAggregateInputObjectZodSchema).optional()
}).strict();
export const TestOrderByWithAggregationInputObjectZodSchema = makeSchema();


// File: TestScalarWhereWithAggregatesInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectZodSchema), z.string()]).optional(),
  text: z.union([z.lazy(() => StringWithAggregatesFilterObjectZodSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectZodSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectZodSchema), z.date()]).optional()
}).strict();
export const TestScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();


// File: TestCreateInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  text: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const TestCreateInputObjectZodSchema = makeSchema();


// File: TestUncheckedCreateInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  text: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const TestUncheckedCreateInputObjectZodSchema = makeSchema();


// File: TestUpdateInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional()
}).strict();
export const TestUpdateInputObjectZodSchema = makeSchema();


// File: TestUncheckedUpdateInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional()
}).strict();
export const TestUncheckedUpdateInputObjectZodSchema = makeSchema();


// File: TestCreateManyInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  text: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const TestCreateManyInputObjectZodSchema = makeSchema();


// File: TestUpdateManyMutationInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional()
}).strict();
export const TestUpdateManyMutationInputObjectZodSchema = makeSchema();


// File: TestUncheckedUpdateManyInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  text: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectZodSchema)]).optional()
}).strict();
export const TestUncheckedUpdateManyInputObjectZodSchema = makeSchema();


// File: StringFilter.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterObjectZodSchema)]).optional()
}).strict();
export const StringFilterObjectZodSchema = makeSchema();


// File: DateTimeFilter.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterObjectZodSchema)]).optional()
}).strict();
export const DateTimeFilterObjectZodSchema = makeSchema();


// File: TestCountOrderByAggregateInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestCountOrderByAggregateInputObjectZodSchema = makeSchema();


// File: TestMaxOrderByAggregateInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestMaxOrderByAggregateInputObjectZodSchema = makeSchema();


// File: TestMinOrderByAggregateInput.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  text: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TestMinOrderByAggregateInputObjectZodSchema = makeSchema();


// File: StringWithAggregatesFilter.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterObjectZodSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectZodSchema).optional(),
  _min: z.lazy(() => NestedStringFilterObjectZodSchema).optional(),
  _max: z.lazy(() => NestedStringFilterObjectZodSchema).optional()
}).strict();
export const StringWithAggregatesFilterObjectZodSchema = makeSchema();


// File: DateTimeWithAggregatesFilter.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterObjectZodSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectZodSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterObjectZodSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterObjectZodSchema).optional()
}).strict();
export const DateTimeWithAggregatesFilterObjectZodSchema = makeSchema();


// File: StringFieldUpdateOperationsInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().optional()
}).strict();
export const StringFieldUpdateOperationsInputObjectZodSchema = makeSchema();


// File: DateTimeFieldUpdateOperationsInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.date().optional()
}).strict();
export const DateTimeFieldUpdateOperationsInputObjectZodSchema = makeSchema();


// File: NestedStringFilter.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(makeSchema)]).optional()
}).strict();
export const NestedStringFilterObjectZodSchema = makeSchema();


// File: NestedDateTimeFilter.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(makeSchema)]).optional()
}).strict();
export const NestedDateTimeFilterObjectZodSchema = makeSchema();


// File: NestedStringWithAggregatesFilter.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(makeSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectZodSchema).optional(),
  _min: z.lazy(() => NestedStringFilterObjectZodSchema).optional(),
  _max: z.lazy(() => NestedStringFilterObjectZodSchema).optional()
}).strict();
export const NestedStringWithAggregatesFilterObjectZodSchema = makeSchema();


// File: NestedIntFilter.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().int().optional(),
  in: z.number().int().array().optional(),
  notIn: z.number().int().array().optional(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  not: z.union([z.number().int(), z.lazy(makeSchema)]).optional()
}).strict();
export const NestedIntFilterObjectZodSchema = makeSchema();


// File: NestedDateTimeWithAggregatesFilter.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(makeSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectZodSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterObjectZodSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterObjectZodSchema).optional()
}).strict();
export const NestedDateTimeWithAggregatesFilterObjectZodSchema = makeSchema();


// File: TestCountAggregateInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  text: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const TestCountAggregateInputObjectZodSchema = makeSchema();


// File: TestMinAggregateInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  text: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const TestMinAggregateInputObjectZodSchema = makeSchema();


// File: TestMaxAggregateInput.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  text: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const TestMaxAggregateInputObjectZodSchema = makeSchema();


// File: TestSelect.schema.ts


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const TestSelectObjectZodSchema = makeSchema();


// File: TestArgs.schema.ts

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => TestSelectObjectZodSchema).optional()
}).strict();
export const TestArgsObjectZodSchema = makeSchema();


// File: findUniqueTest.schema.ts

export const TestFindUniqueSchema = z.object({ select: TestSelectObjectZodSchema.optional(), where: TestWhereUniqueInputObjectZodSchema })

// File: findUniqueOrThrowTest.schema.ts

export const TestFindUniqueOrThrowSchema = z.object({ select: TestSelectObjectZodSchema.optional(), where: TestWhereUniqueInputObjectZodSchema })

// File: findFirstTest.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TestFindFirstSelectZodSchema__findFirstTest_schema = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();

export const TestFindFirstZodSchema = z.object({ select: TestFindFirstSelectZodSchema__findFirstTest_schema.optional(), orderBy: z.union([TestOrderByWithRelationInputObjectZodSchema, TestOrderByWithRelationInputObjectZodSchema.array()]).optional(), where: TestWhereInputObjectZodSchema.optional(), cursor: TestWhereUniqueInputObjectZodSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.TestScalarFieldEnum), z.nativeEnum(Prisma.TestScalarFieldEnum).array()]).optional() }).strict();

// File: findFirstOrThrowTest.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TestFindFirstOrThrowSelectZodSchema__findFirstOrThrowTest_schema = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();

export const TestFindFirstOrThrowZodSchema = z.object({ select: TestFindFirstOrThrowSelectZodSchema__findFirstOrThrowTest_schema.optional(), orderBy: z.union([TestOrderByWithRelationInputObjectZodSchema, TestOrderByWithRelationInputObjectZodSchema.array()]).optional(), where: TestWhereInputObjectZodSchema.optional(), cursor: TestWhereUniqueInputObjectZodSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.TestScalarFieldEnum), z.nativeEnum(Prisma.TestScalarFieldEnum).array()]).optional() }).strict();

// File: findManyTest.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TestFindManySelectZodSchema__findManyTest_schema = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();

export const TestFindManyZodSchema = z.object({ select: TestFindManySelectZodSchema__findManyTest_schema.optional(), orderBy: z.union([TestOrderByWithRelationInputObjectZodSchema, TestOrderByWithRelationInputObjectZodSchema.array()]).optional(), where: TestWhereInputObjectZodSchema.optional(), cursor: TestWhereUniqueInputObjectZodSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([z.nativeEnum(Prisma.TestScalarFieldEnum), z.nativeEnum(Prisma.TestScalarFieldEnum).array()]).optional() }).strict();

// File: countTest.schema.ts

export const TestCountZodSchema = z.object({ orderBy: z.union([TestOrderByWithRelationInputObjectZodSchema, TestOrderByWithRelationInputObjectZodSchema.array()]).optional(), where: TestWhereInputObjectZodSchema.optional(), cursor: TestWhereUniqueInputObjectZodSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([z.literal(true), TestCountAggregateInputObjectZodSchema]).optional() }).strict();

// File: createOneTest.schema.ts

export const TestCreateOneSchema = z.object({ select: TestSelectObjectZodSchema.optional(), data: z.union([TestCreateInputObjectZodSchema, TestUncheckedCreateInputObjectZodSchema]) })

// File: createManyTest.schema.ts

export const TestCreateManySchema = z.object({ data: z.union([TestCreateManyInputObjectZodSchema, z.array(TestCreateManyInputObjectZodSchema)]), skipDuplicates: z.boolean().optional() })

// File: createManyAndReturnTest.schema.ts

export const TestCreateManyAndReturnSchema = z.object({ select: TestSelectObjectZodSchema.optional(), data: z.union([TestCreateManyInputObjectZodSchema, z.array(TestCreateManyInputObjectZodSchema)]), skipDuplicates: z.boolean().optional() }).strict()

// File: deleteOneTest.schema.ts

export const TestDeleteOneSchema = z.object({ select: TestSelectObjectZodSchema.optional(), where: TestWhereUniqueInputObjectZodSchema })

// File: deleteManyTest.schema.ts

export const TestDeleteManySchema = z.object({ where: TestWhereInputObjectZodSchema.optional() })

// File: updateOneTest.schema.ts

export const TestUpdateOneSchema = z.object({ select: TestSelectObjectZodSchema.optional(), data: z.union([TestUpdateInputObjectZodSchema, TestUncheckedUpdateInputObjectZodSchema]), where: TestWhereUniqueInputObjectZodSchema })

// File: updateManyTest.schema.ts

export const TestUpdateManySchema = z.object({ data: TestUpdateManyMutationInputObjectZodSchema, where: TestWhereInputObjectZodSchema.optional() })

// File: updateManyAndReturnTest.schema.ts

export const TestUpdateManyAndReturnSchema = z.object({ select: TestSelectObjectZodSchema.optional(), data: TestUpdateManyMutationInputObjectZodSchema, where: TestWhereInputObjectZodSchema.optional() }).strict()

// File: upsertOneTest.schema.ts

export const TestUpsertSchema = z.object({ select: TestSelectObjectZodSchema.optional(), where: TestWhereUniqueInputObjectZodSchema, create: z.union([TestCreateInputObjectZodSchema, TestUncheckedCreateInputObjectZodSchema]), update: z.union([TestUpdateInputObjectZodSchema, TestUncheckedUpdateInputObjectZodSchema]) })

// File: aggregateTest.schema.ts

export const TestAggregateSchema = z.object({ orderBy: z.union([TestOrderByWithRelationInputObjectZodSchema, TestOrderByWithRelationInputObjectZodSchema.array()]).optional(), where: TestWhereInputObjectZodSchema.optional(), cursor: TestWhereUniqueInputObjectZodSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([z.literal(true), TestCountAggregateInputObjectZodSchema]).optional(), _min: TestMinAggregateInputObjectZodSchema.optional(), _max: TestMaxAggregateInputObjectZodSchema.optional() })

// File: groupByTest.schema.ts

export const TestGroupBySchema = z.object({ where: TestWhereInputObjectZodSchema.optional(), orderBy: z.union([TestOrderByWithAggregationInputObjectZodSchema, TestOrderByWithAggregationInputObjectZodSchema.array()]).optional(), having: TestScalarWhereWithAggregatesInputObjectZodSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(TestScalarFieldEnumSchema), _count: z.union([z.literal(true), TestCountAggregateInputObjectZodSchema]).optional(), _min: TestMinAggregateInputObjectZodSchema.optional(), _max: TestMaxAggregateInputObjectZodSchema.optional() })

// File: TestFindUniqueResult.schema.ts
export const TestFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));

// File: TestFindFirstResult.schema.ts
export const TestFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));

// File: TestFindManyResult.schema.ts
export const TestFindManyResultSchema = z.object({
  data: z.array(z.object({
    id: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  })),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  })
});

// File: TestCreateResult.schema.ts
export const TestCreateResultSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// File: TestCreateManyResult.schema.ts
export const TestCreateManyResultSchema = z.object({
  count: z.number()
});

// File: TestUpdateResult.schema.ts
export const TestUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));

// File: TestUpdateManyResult.schema.ts
export const TestUpdateManyResultSchema = z.object({
  count: z.number()
});

// File: TestUpsertResult.schema.ts
export const TestUpsertResultSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// File: TestDeleteResult.schema.ts
export const TestDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}));

// File: TestDeleteManyResult.schema.ts
export const TestDeleteManyResultSchema = z.object({
  count: z.number()
});

// File: TestAggregateResult.schema.ts
export const TestAggregateResultSchema = z.object({
  _count: z.object({
    id: z.number(),
    text: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    text: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    text: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
});

// File: TestGroupByResult.schema.ts
export const TestGroupByResultSchema = z.array(z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    text: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    text: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    text: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));

// File: TestCountResult.schema.ts
export const TestCountResultSchema = z.number();

// File: index.ts


// File: index.ts

