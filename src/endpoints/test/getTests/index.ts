import { convertQuerySortToPrismaOrderBy, sanitizeLimit, sanitizeWhitelistedSelect, sanitizeWhitelistedWhere } from '@innovixx/api-kit';
import type { EndpointHandler, PaginatedDocs, QueryParams, SelectIncludeType } from '@innovixx/api-kit';
import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';

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

	const sanitizedSelect = sanitizeWhitelistedSelect(select?.items as SelectIncludeType, {});

	const items = await maindb.test.findMany({
		where: sanitizedWhere,
		skip: offset,
		take: sanitizeLimit(limit),
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
