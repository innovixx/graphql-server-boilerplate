import baseConfig from '@innovixx/eslint-config/config/configs/base/index.mjs';
import reactConfig from '@innovixx/eslint-config/config/configs/react/index.mjs';
import typescriptConfig from '@innovixx/eslint-config/config/configs/typescript/index.mjs';
import { graphqlConfig } from '@innovixx/eslint-config/config/configs/graphql/index.mjs';

export default [
    baseConfig,
    reactConfig,
    typescriptConfig,
    ...graphqlConfig,
    {
        files: ['*.config.ts'],
        languageOptions: {
            parserOptions: {
                project: null,
            },
        },
    },
];