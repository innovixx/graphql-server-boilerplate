/* eslint-disable @typescript-eslint/no-explicit-any */
import { validOperators, type Where, type WhereField } from '../../lib/types.js';

const convertWhereField = (whereField: any): WhereField => {
	const result: WhereField = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key of validOperators) {
		if (whereField[key] !== undefined) {
			result[key] = whereField[key];
		}
	}
	return result;
};

export const covertGraphqlWhereToRestWhere = (where: any): Where => {
	const result: Where = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key in where) {
		if (key === 'and' || key === 'or') {
			result[key] = where[key].map((subWhere: any) => covertGraphqlWhereToRestWhere(subWhere));
		} else if (key === 'field') {
			result[where[key]] = convertWhereField(where.value);
		}
	}
	return result;
};
