import type { Test } from '../../../../databases/maindb/client/index.js';
import { maindb } from '../../../prisma/index.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import type { CreateTestInput } from './types.js';

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
	path: '/test',
	method: 'post',
	summary: 'Create a new test',
	responses: {
		200: {
			description: 'Success',
		},
	},
});
