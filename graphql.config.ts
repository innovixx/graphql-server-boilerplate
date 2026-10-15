import type { IGraphQLConfig } from '@graphql-eslint/eslint-plugin';

const config: IGraphQLConfig = {
	schema: [
		'src/graphql/typeDefs/**/*.graphql',
		'src/endpoints/**/*.graphql',
	],
};

export default config;
