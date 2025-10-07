/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';
import { covertGraphqlWhereToRestWhere } from '../../covertGraphqlWhereToRestWhere/index.js';
import { getPrismaSelectFromInfo } from '../parsePrismaSelectFromInfo/index.js';


export const graphqlHandler = (
	getFn: EndpointHandler<any, any>,
	maxDepth?: number,
) => async (_: any, args: any, context: { req: Request; res: Response }, info?: any): Promise<any> => {
	const req = context?.req;
	const res = context?.res;

	let result;

	if (info.operation.operation === 'query') {
		const select = info ? getPrismaSelectFromInfo(info, maxDepth) : undefined;

		const params = {
			...(typeof args === 'object' && args !== null ? args : {}),

			where: covertGraphqlWhereToRestWhere((args as any)?.where),
			cursor: (args as any)?.cursor,
			select,
		};

		result = getFn(params, req, res);
	} else {
		result = getFn(args, req, res);
	}

	return result;
};
