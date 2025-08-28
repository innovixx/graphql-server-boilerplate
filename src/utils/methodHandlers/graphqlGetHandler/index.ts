import type { Request, Response } from 'express';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
import type { EndpointHandler } from '../../../lib/types.js';
import { covertGraphqlWhereToRestWhere } from '../../covertGraphqlWhereToRestWhere/index.js';


function extractSelectFromInfo(info: unknown): Record<string, unknown> {
	let parsedInfo: any;
	if (info && typeof info === 'object' && 'fieldNodes' in info) {
		parsedInfo = parseResolveInfo(info as any);
	} else {
		parsedInfo = info;
	}
	if (!parsedInfo || !parsedInfo.fieldsByTypeName) return {};
	const typeFieldsObj = Object.values(parsedInfo.fieldsByTypeName)[0];
	if (!typeFieldsObj) return {};
	const typeFields = typeFieldsObj as { [key: string]: any };
	const select: Record<string, unknown> = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key of Object.keys(typeFields)) {
		const field = typeFields[key];
		if (field.fieldsByTypeName && Object.keys(field.fieldsByTypeName).length > 0) {
			select[key] = extractSelectFromInfo(field);
		} else {
			select[key] = true;
		}
	}
	return select;
}


export const graphqlGetHandler = (
	getFn: EndpointHandler<any, any>,
) => async (_: any, args: any, context: { req: Request; res: Response }, info?: any): Promise<any> => {
	let select = info ? extractSelectFromInfo(info) : undefined;
	if (select && typeof select === 'object' && 'total' in select && 'items' in select) {
		select = select.items as Record<string, unknown>;
	}

	const params = {
		...(typeof args === 'object' && args !== null ? args : {}),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		where: covertGraphqlWhereToRestWhere((args as any)?.where),
		select,
	};
	const req = context?.req;
	const res = context?.res;
	return getFn(params, req, res);
};
