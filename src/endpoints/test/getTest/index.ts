import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { PaginatedDocsSchema, type EndpointHandler } from '../../../lib/types.js';
import { GetTestInputSchema, type GetTestInput } from './types.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { TestSchema } from '../../../zod/maindb/types/index.js';

type Props = GetTestInput

export const getTest: EndpointHandler<Props, Test> = async ({
	id,
}) => {
	const record = await maindb.test.findUnique({
		where: {
			id,
		},
	});

	if (!record) {
		throw new Error('test not found');
	}

	return record;
};

export const generateOpenApiSchema: Record<string, unknown> = buildOpenApiPath({
	path: '/tests/get-test',
	method: 'get',
	summary: 'Get test',
	queryZod: GetTestInputSchema,
	responseZod: PaginatedDocsSchema(TestSchema),
});
