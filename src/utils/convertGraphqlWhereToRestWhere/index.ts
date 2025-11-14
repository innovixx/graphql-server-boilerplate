import { validOperators, type Where, type WhereField } from '../../lib/types.js';

const convertWhereField = (whereField: Record<string, string | number | boolean>): WhereField => {
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
			(result as Record<string, string>).mode = mode;
		}
	}
	return result;
};

export const convertGraphqlWhereToRestWhere = (where: Record<string, unknown>): Where => {
	const result: Where = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key in where) {
		if (key === 'and' || key === 'or') {
			const capitalizedKey = key.toUpperCase();
			(result as Record<string, unknown>)[capitalizedKey] = (where[key] as Array<Record<string, unknown>>).map((subWhere) => convertGraphqlWhereToRestWhere(subWhere));
		} else if (key === 'field') {
			if ((where as Record<string, unknown>).value !== undefined) {
				(result as Record<string, unknown>)[where[key] as string] = convertWhereField((where as Record<string, unknown>).value as Record<string, string | number | boolean>);
			}
			if ((where as Record<string, unknown>).relation) {
				const relationFilters: Record<string, unknown> = {};
				Object.keys((where as Record<string, unknown>).relation as Record<string, unknown>).forEach((relOp) => {
					const relation = (where as Record<string, unknown>).relation as Record<string, unknown>;
					if (relation[relOp]) {
						relationFilters[relOp] = convertGraphqlWhereToRestWhere(relation[relOp] as Record<string, unknown>);
					}
				});
				(result as Record<string, unknown>)[where[key] as string] = {
					...((result as Record<string, unknown>)[where[key] as string] || {}),
					...relationFilters,
				};
			}
		}
	}
	return result;
};
