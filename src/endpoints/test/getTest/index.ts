import { NotFoundError, sanitizeWhitelistedSelect, type EndpointHandler } from '@innovixx/api-kit';
import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { type GetTestInput } from './types.js';

type Props = GetTestInput

export const getTest: EndpointHandler<Props, Test> = async ({
	id,
	select,
}) => {
	const record = await maindb.test.findUnique({
		where: {
			id,
		},
		select: sanitizeWhitelistedSelect(select, {}),
	});

	if (!record) {
		throw new NotFoundError('test not found');
	}

	return record;
};
