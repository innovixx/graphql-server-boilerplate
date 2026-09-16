import { convertQuerySortToPrismaOrderBy, sanitizeWhitelistedSelect, sanitizeWhitelistedWhere, type EndpointHandler, type PaginatedDocs, type QueryParams } from '@innovixx/api-kit';
import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { DB_RECORDS_DEFAULT_LIMIT, DB_RECORDS_MAX_LIMIT } from '../../../lib/constants.js';

type Props = QueryParams

export const getTests: EndpointHandler<Props, PaginatedDocs<Test>> = async ({
	limit,
	offset,
	select,
	sortBy,
	where,
}) => {
	const sanitizedWhere = {
		...sanitizeWhitelistedWhere(where, {}),
	};

	const sanitizedSelect = sanitizeWhitelistedSelect(select, {});

	const items = await maindb.test.findMany({
		where: sanitizedWhere,
		skip: offset,
		take: Math.min(limit || DB_RECORDS_DEFAULT_LIMIT, DB_RECORDS_MAX_LIMIT),
		orderBy: convertQuerySortToPrismaOrderBy(sortBy),
		select: sanitizedSelect,
	});

	const total = await maindb.test.count({
		where: sanitizedWhere,
	});

	return {
		items,
		total,
	};
};
