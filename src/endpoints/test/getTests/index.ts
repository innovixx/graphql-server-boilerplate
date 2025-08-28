import type { Test } from '../../../../databases/maindb/client/index.js';
import type { PaginatedDocs, QueryParams } from '../../../lib/types.js';
import { maindb } from '../../../prisma/index.js';
import { DB_RECORDS_LIMIT } from '../../../lib/constants.js';
import { convertQuerySortToPrismaOrderBy } from '../../../utils/convertQuerySortToPrismaOrderBy/index.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';

type Props = QueryParams


export const getTests = async ({
	limit,
	offset,
	select,
	sortBy,
	where,
}: Props): Promise<PaginatedDocs<Test>> => {
	const total = await maindb.test.count({
		where,
	});

	const items = await maindb.test.findMany({
		where,
		skip: offset,
		take: limit || DB_RECORDS_LIMIT,
		orderBy: convertQuerySortToPrismaOrderBy(sortBy),
		select,
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
	responses: {
		200: {
			description: 'Success',
		},
	},
});
