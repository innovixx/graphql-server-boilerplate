import type { Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';
import { covertGraphqlWhereToRestWhere } from '../../covertGraphqlWhereToRestWhere/index.js';
import { getPrismaSelectFromInfo } from '../parsePrismaSelectFromInfo/index.js';


export const graphqlHandler = (
	getFn: EndpointHandler<any, any>,
) => async (_: any, args: any, context: { req: Request; res: Response }, info?: any): Promise<any> => {
	const req = context?.req;
	const res = context?.res;

	let result;

	if (info.operation.operation === 'query') {
		const select = info ? getPrismaSelectFromInfo(info) : undefined;
		const params = {
			...(typeof args === 'object' && args !== null ? args : {}),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			where: covertGraphqlWhereToRestWhere((args as any)?.where),
			select,
		};

		result = getFn(params, req, res);
	} else {
		result = getFn(args, req, res);
	}

	return result;
};
