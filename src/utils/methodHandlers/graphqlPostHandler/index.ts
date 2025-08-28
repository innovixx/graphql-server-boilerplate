import type { Request, Response } from 'express';
import type { EndpointHandler } from '../../../lib/types.js';

export const graphqlPostHandler = (
	postFn: EndpointHandler<any, any>,
) => async (_: any, args: any, context: { req: Request; res: Response }): Promise<any> => {
	const req = context?.req;
	const res = context?.res;
	return postFn(args, req, res);
};
