import type { Test } from '../../../databases/maindb/client/index.js';
import type { PaginatedDocs, QueryParams } from '../../lib/types.js';
import { covertGraphqlWhereToRestWhere } from '../covertGraphqlWhereToRestWhere/index.js';

export const graphqlGetHandler = (
	getFn: (params: QueryParams) => Promise<PaginatedDocs<Test>>,
) => async (_: unknown, args: QueryParams): Promise<PaginatedDocs<Test>> => {
	const params = {
		...args,
		where: covertGraphqlWhereToRestWhere(args.where),
	};
	return getFn(params);
};
