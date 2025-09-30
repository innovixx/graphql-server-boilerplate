/* eslint-disable @typescript-eslint/no-explicit-any */
import { validOperators, type Where, type WhereField } from '../../lib/types.js';

const convertWhereField = (whereField: any): WhereField => {
	const result: WhereField = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key of validOperators) {
		if (whereField[key] !== undefined) {
			if (key === 'not_equals') {
				result.not = { equals: whereField[key] };
			} else {
				result[key] = whereField[key];
			}
		}
	}
	if (whereField.mode !== undefined) {
		const { mode } = whereField;
		if (mode === 'default' || mode === 'insensitive') {
			(result as any).mode = mode;
		}
	}
	return result;
};

export const covertGraphqlWhereToRestWhere = (where: any): Where => {
	const result: Where = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key in where) {
		if (key === 'and' || key === 'or') {
			const capitalizedKey = key.toUpperCase();
			(result as any)[capitalizedKey] = where[key].map((subWhere: any) => covertGraphqlWhereToRestWhere(subWhere));
		} else if (key === 'field') {
			if (where.value !== undefined) {
				(result as any)[where[key]] = convertWhereField(where.value);
			}
			if (where.relation) {
				const relationFilters: Record<string, any> = {};
				Object.keys(where.relation).forEach((relOp) => {
					if (where.relation[relOp]) {
						relationFilters[relOp] = covertGraphqlWhereToRestWhere(where.relation[relOp]);
					}
				});
				(result as any)[where[key]] = {
					...(result as any)[where[key]] || {},
					...relationFilters,
				};
			}
		}
	}
	return result;
};
