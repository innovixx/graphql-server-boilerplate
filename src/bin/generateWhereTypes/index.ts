#!/usr/bin/env tsx
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { generateWhereTypes } from '@innovixx/api-kit/codegen';
import { Prisma } from '../../../databases/maindb/client/index.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../');

const { models } = (Prisma as unknown as {
	dmmf: { datamodel: { models: Parameters<typeof generateWhereTypes>[0]['models'] } };
}).dmmf.datamodel;

const result = generateWhereTypes({
	models,
	schemaPath: resolve(ROOT, 'databases/maindb/schema.prisma'),
	graphqlOutputPath: resolve(ROOT, 'src/graphql/typeDefs/where/index.graphql'),
	typesOutputPath: resolve(ROOT, 'src/lib/generated/where.ts'),
	prismaClientImportPath: '../../../databases/maindb/client/index.js',
	whereFieldModeImportPath: '@innovixx/api-kit',
	generatorCommand: 'pnpm generate:where-types',
});

process.stdout.write(
	`✅  Generated typed where inputs\n    ${result.modelCount} models  |  ${result.scalarFilterCount} scalar filters  |  ${result.enumFilterCount} enum filters\n`,
);
