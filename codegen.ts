import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: './src/**/*.graphql',
	generates: {
		'src/graphql/generated/schema.ts': {
			plugins: ['typescript'],
		},
	},
	overwrite: true,
};

export default config;