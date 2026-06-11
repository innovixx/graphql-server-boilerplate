/* eslint-disable @typescript-eslint/no-explicit-any */
import { validOperators, type Where, type WhereField } from '../../lib/types.js';

export type WhereWhitelistType = {
	[key: string]: true | WhereWhitelistType;
};

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

const convertWhere = (where: any): Where => {
	const result: Where = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key in where) {
		if (key === 'and' || key === 'or') {
			const capitalizedKey = key.toUpperCase();
			(result as any)[capitalizedKey] = where[key].map((subWhere: any) => convertWhere(subWhere));
		} else if (key === 'field') {
			if (where.value !== undefined) {
				(result as any)[where[key]] = convertWhereField(where.value);
			}
			if (where.relation) {
				const relationFilters: Record<string, any> = {};
				Object.keys(where.relation).forEach((relOp) => {
					if (where.relation[relOp]) {
						relationFilters[relOp] = convertWhere(where.relation[relOp]);
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

const relationFilterKeys = new Set(['some', 'every', 'none', 'is', 'isNot']);
const logicalKeys = new Set(['AND', 'OR']);
const operatorKeys = new Set<string>([...validOperators, 'mode']);

const isRecord = (value: unknown): value is Record<string, unknown> => (
	typeof value === 'object' && value !== null && !Array.isArray(value)
);

const isScalarFieldFilter = (value: unknown): boolean => {
	if (!isRecord(value)) return true;
	const keys = Object.keys(value);
	if (keys.length === 0) return true;
	return keys.every((k) => operatorKeys.has(k));
};

const sanitizeWhereObject = (
	whereObject: Record<string, unknown>,
	whitelist: WhereWhitelistType,
	path: string[] = [],
): { sanitized: Record<string, unknown>; forbidden: string[] } => {
	const sanitized: Record<string, unknown> = {};
	const forbidden: string[] = [];

	Object.entries(whereObject).forEach(([key, value]) => {
		if (logicalKeys.has(key)) {
			if (Array.isArray(value)) {
				const nested = value.reduce<{ items: Record<string, unknown>[]; forbidden: string[] }>(
					(acc, item, index) => {
						if (isRecord(item)) {
							const nestedResult = sanitizeWhereObject(item, whitelist, [...path, `${key}[${index}]`]);
							acc.items.push(nestedResult.sanitized);
							acc.forbidden.push(...nestedResult.forbidden);
						}
						return acc;
					},
					{ items: [], forbidden: [] },
				);
				sanitized[key] = nested.items;
				forbidden.push(...nested.forbidden);
				return;
			}

			if (isRecord(value)) {
				const nestedResult = sanitizeWhereObject(value, whitelist, [...path, key]);
				sanitized[key] = nestedResult.sanitized;
				forbidden.push(...nestedResult.forbidden);
				return;
			}

			sanitized[key] = value;
			return;
		}

		if (operatorKeys.has(key)) {
			sanitized[key] = value;
			return;
		}

		if (relationFilterKeys.has(key)) {
			if (isRecord(value)) {
				const nestedResult = sanitizeWhereObject(value, whitelist, [...path, key]);
				sanitized[key] = nestedResult.sanitized;
				forbidden.push(...nestedResult.forbidden);
				return;
			}

			sanitized[key] = value;
			return;
		}

		const whitelistEntry = whitelist[key];
		if (!whitelistEntry) {
			if (isScalarFieldFilter(value)) {
				sanitized[key] = value;
				return;
			}
			forbidden.push([...path, key].join('.'));
			return;
		}

		if (whitelistEntry === true) {
			sanitized[key] = value;
			return;
		}

		if (isRecord(value)) {
			const nestedResult = sanitizeWhereObject(value, whitelistEntry, [...path, key]);
			sanitized[key] = nestedResult.sanitized;
			forbidden.push(...nestedResult.forbidden);
			return;
		}

		sanitized[key] = value;
	});

	return { sanitized, forbidden };
};

export const sanitizeWhitelistedWhere = (
	where: unknown,
	whitelist: WhereWhitelistType,
): Where => {
	const converted = convertWhere(where);
	const { sanitized, forbidden } = sanitizeWhereObject(converted, whitelist);
	const forbiddenFields = [...new Set(forbidden)];
	if (forbiddenFields.length > 0) {
		throw new Error(`Forbidden where fields: ${forbiddenFields.join(', ')}`);
	}
	return sanitized as Where;
};
