import type { EndpointHandler } from '../../../lib/types.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { CreateTestInputSchema, type CreateTestInput } from './types.js';
import type { Test } from '../../../../databases/maindb/client/index.js';
import { TestSchema } from '../../../zod/maindb/types/index.js';

type Props = CreateTestInput

export const createTest: EndpointHandler<Props, Test> = async ({ input }: Props): Promise<Test> => {
	const item = await maindb.test.create({
		data: {
			text: input.text,
		},
	});

	return item;
};

export const generateOpenApiSchema: Record<string, unknown> = buildOpenApiPath({
	path: '/tests/create-test',
	method: 'post',
	summary: 'Create a new test',
	bodyZod: CreateTestInputSchema,
	responseZod: TestSchema,
});
