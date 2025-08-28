import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { TestResultSchema } from '../../../prisma/maindb/types/schemas/variants/result/Test.result.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { UpdateTestInputSchema, type UpdateTestInput } from './types.js';

type Props = UpdateTestInput


export const updateTest = async ({ id, input }: Props): Promise<Test> => {
	const item = await maindb.test.update({
		where: {
			id,
		},
		data: {
			text: input.text,
		},
	});

	return item;
};

export const generateOpenApiSchema: Record<string, unknown> = buildOpenApiPath({
	path: '/tests/update-test',
	method: 'put',
	summary: 'Update a test',
	bodyZod: UpdateTestInputSchema,
	responseZod: TestResultSchema,
});
