import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { DB_RECORDS_DEFAULT_LIMIT, DB_RECORDS_MAX_LIMIT } from '../../../lib/constants.js';
import { convertQuerySortToPrismaOrderBy } from '../../../utils/convertQuerySortToPrismaOrderBy/index.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import type { EndpointHandler, PaginatedDocs, QueryParams } from '../../../lib/types.js';
import { PaginatedDocsSchema, QueryParamsSchema } from '../../../lib/types.js';
import { TestFindManyResultSchema } from '../../../prisma/maindb/types/schemas.js';

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
		take: Math.min(limit || DB_RECORDS_DEFAULT_LIMIT, DB_RECORDS_MAX_LIMIT),
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
	responseZod: PaginatedDocsSchema(TestFindManyResultSchema),
});
