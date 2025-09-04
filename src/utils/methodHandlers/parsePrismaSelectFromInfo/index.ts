import type { GraphQLResolveInfo } from 'graphql';
import type { ResolveTree } from 'graphql-parse-resolve-info';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { DB_SELECT_MAX_LEVEL } from '../../../lib/constants.js';

export function getPrismaSelectFromInfo(
	info: GraphQLResolveInfo,
): unknown {
	const parsedInfo = parseResolveInfo(info);
	if (!parsedInfo || !parsedInfo.fieldsByTypeName) return {};

	function buildSelect(tree: ResolveTree, level: number): Record<string, any> {
		const select: Record<string, any> = {};
		if (level > DB_SELECT_MAX_LEVEL) return select;
		// eslint-disable-next-line no-restricted-syntax
		for (const [fieldName, fieldTree] of Object.entries(tree.fieldsByTypeName[Object.keys(tree.fieldsByTypeName)[0]])) {
			if (
				fieldTree.fieldsByTypeName
				&& Object.keys(fieldTree.fieldsByTypeName).length > 0
				&& level < DB_SELECT_MAX_LEVEL
			) {
				select[fieldName] = { select: buildSelect(fieldTree, level + 1) };
			} else {
				select[fieldName] = true;
			}
		}
		return select;
	}

	let select = buildSelect(parsedInfo as ResolveTree, 0);

	if (
		select
		&& typeof select === 'object'
		&& 'items' in select
		&& select.items
		&& typeof select.items === 'object'
		&& 'select' in select.items
	) {
		select = select.items.select as Record<string, unknown>;
	}

	return select;
}
