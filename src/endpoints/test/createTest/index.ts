import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { TestResultSchema } from '../../../prisma/maindb/types/schemas/variants/result/Test.result.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { CreateTestInputSchema, type CreateTestInput } from './types.js';

type Props = {
	input: CreateTestInput
}


export const createTest = async ({
	input,
}: Props): Promise<Test> => {
	const item = await maindb.test.create({
		data: {
			text: input.text,
		},
	});

	return item;
};

export const generateOpenApiSchema: Record<string, unknown> = buildOpenApiPath({
	path: '/tests',
	method: 'post',
	summary: 'Create a new test',
	bodyZod: CreateTestInputSchema,
	responseZod: TestResultSchema,
});
