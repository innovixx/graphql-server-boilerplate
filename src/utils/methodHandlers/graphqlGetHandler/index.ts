import type { Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';
import { covertGraphqlWhereToRestWhere } from '../../covertGraphqlWhereToRestWhere/index.js';

export const graphqlGetHandler = (
	getFn: EndpointHandler<any, any>,
) => async (_: any, args: any, context: { req: Request; res: Response }): Promise<any> => {
	const params = {
		...(typeof args === 'object' && args !== null ? args : {}),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		where: covertGraphqlWhereToRestWhere((args as any)?.where),
	};
	const req = context?.req;
	const res = context?.res;
	return getFn(params, req, res);
};
