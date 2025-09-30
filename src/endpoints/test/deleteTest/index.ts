import { z } from 'zod';
import type { EndpointHandler } from '../../../lib/types.js';
import { maindb } from '../../../prisma/maindb/index.js';
import { DeleteTestInputSchema, type DeleteTestInput } from './types.js';
import { buildOpenApiPath } from '../../../utils/buildOpenApiPath/index.js';

type Props = DeleteTestInput


export const deleteTest: EndpointHandler<Props, Boolean> = async ({ id }: Props) => {
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
	responseZod: z.boolean(),
});
