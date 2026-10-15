import type { EndpointHandler } from '@innovixx/api-kit';
import { maindb } from '../../../prisma/maindb/index.js';
import { type DeleteTestInput } from './types.js';

type Props = DeleteTestInput


export const deleteTest: EndpointHandler<Props, Boolean> = async ({ id }: Props) => {
	await maindb.test.delete({
		where: {
			id,
		},
	});

	return true;
};
