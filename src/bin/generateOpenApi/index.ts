#!/usr/bin/env tsx
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { generateOpenApi } from '@innovixx/api-kit/codegen';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../');

const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8')) as {
	name: string;
	version: string;
	description?: string;
};

const result = generateOpenApi({
	rootDir: ROOT,
	routersEntryFile: 'src/endpoints/index.ts',
	outputPath: resolve(ROOT, 'src/openapi.json'),
	info: {
		title: pkg.name,
		version: pkg.version,
		description: pkg.description ?? '',
	},
});

process.stdout.write(
	`✅  Generated src/openapi.json\n    ${result.pathCount} paths  |  ${result.schemaCount} component schemas  |  ${result.skipped} skipped\n`,
);
