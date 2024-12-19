// TODO: investigate parser import error
// eslint-disable-next-line import/no-unresolved
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['databases'],
  },
  ...compat.extends(
    '@innovixx/eslint-config/configs/base',
    '@innovixx/eslint-config/configs/react',
    '@innovixx/eslint-config/configs/typescript',
  ),
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      sourceType: 'module',
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-tabs': 0,
      'react/require-default-props': 0,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
