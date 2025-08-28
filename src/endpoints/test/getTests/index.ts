import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { DB_RECORDS_LIMIT } from '../../../lib/constants.js';
import { convertQuerySortToPrismaOrderBy } from '../../../utils/convertQuerySortToPrismaOrderBy/index.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { TestResultSchema } from '../../../prisma/maindb/types/schemas/variants/result/Test.result.js';
import type { EndpointHandler, PaginatedDocs, QueryParams } from '../../../lib/types.js';
import { PaginatedDocsSchema, QueryParamsSchema } from '../../../lib/types.js';

type Props = QueryParams

export const getTests: EndpointHandler<Props, PaginatedDocs<Test>> = async ({
	limit,
	offset,
	select,
	sortBy,
	where,
}) => {
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
	path: '/tests/get-tests',
	method: 'get',
	summary: 'Get tests',
	queryZod: QueryParamsSchema,
	responseZod: PaginatedDocsSchema(TestResultSchema),
});
