import type { Request, Response } from 'express';
import type { GraphQLResolveInfo } from 'graphql';
import type { EndpointHandler } from '../../../lib/types.js';
import { convertGraphqlWhereToRestWhere } from '../../convertGraphqlWhereToRestWhere/index.js';
import { getPrismaSelectFromInfo } from '../parsePrismaSelectFromInfo/index.js';

export const graphqlHandler = <
  Params = unknown,
  Result = unknown
>(
		getFn: EndpointHandler<Params, Result>,
		maxDepth?: number,
	) => async (
		_: unknown,
		args: Params & { where?: Record<string, unknown>; cursor?: unknown; [key: string]: unknown },
		context: { req: Request; res: Response },
		info?: GraphQLResolveInfo,
	): Promise<NonNullable<Result>> => {
		const req = context?.req;
		const res = context?.res;

		let result: Result | void;

		if (info && info.operation.operation === 'query') {
			const select = info ? getPrismaSelectFromInfo(info, maxDepth) : undefined;

			const params = {
				...(typeof args === 'object' && args !== null ? args : {}),
				where: convertGraphqlWhereToRestWhere(args.where ?? {}),
				cursor: args.cursor,
				select,
			} as Params;

			result = await getFn(params, req, res);
		} else {
			result = await getFn(args, req, res);
		}

		if (result === undefined || result === null) {
			throw new Error('Handler did not return a result');
		}

		return result as NonNullable<Result>;
	};
