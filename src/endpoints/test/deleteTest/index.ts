import { maindb } from '../../../prisma/maindb/index.js';
import { TestResultSchema } from '../../../prisma/maindb/types/schemas/variants/result/Test.result.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';
import { DeleteTestInputSchema, type DeleteTestInput } from './types.js';

type Props = DeleteTestInput


export const deleteTest = async ({ id }: Props): Promise<Boolean> => {
	await maindb.test.delete({
		where: {
			id,
		},
	});

	return true;
};

export const generateOpenApiSchema: Record<string, unknown> = buildOpenApiPath({
	path: '/tests/delete-test',
	method: 'delete',
	summary: 'Delete a test',
	bodyZod: DeleteTestInputSchema,
	responseZod: TestResultSchema,
});
