import type { Test } from '../../../../databases/maindb/client/index.js';
import { PaginatedDocsSchema, QueryParamsSchema, type PaginatedDocs, type QueryParams } from '../../../lib/types.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { DB_RECORDS_LIMIT } from '../../../lib/constants.js';
import { convertQuerySortToPrismaOrderBy } from '../../../utils/convertQuerySortToPrismaOrderBy/index.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { TestResultSchema } from '../../../prisma/maindb/types/schemas/variants/result/Test.result.js';

type Props = QueryParams

export const getTests = async ({
	limit,
	offset,
	select,
	sortBy,
	where,
}: Props): Promise<PaginatedDocs<Test>> => {
	const total = await maindb.test.count({
		...(where ? { where } : {}),
	});

	const items = await maindb.test.findMany({
		...(where ? { where } : {}),
		skip: offset,
		take: limit || DB_RECORDS_LIMIT,
		orderBy: convertQuerySortToPrismaOrderBy(sortBy),
		...(select ? { select } : {}),
	});

	return {
		items,
		total,
	};
};

export const generateOpenApiSchema: Record<string, unknown> = buildOpenApiPath({
	path: '/test',
	method: 'get',
	summary: 'Get tests',
	bodyZod: QueryParamsSchema,
	responseZod: PaginatedDocsSchema(TestResultSchema),
});
