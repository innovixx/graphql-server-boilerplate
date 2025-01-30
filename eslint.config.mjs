import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
export default [
  ...compat.extends(
    '@innovixx',
  ),
  {
    rules: {
      'react/prop-types': 'off',
      'react/react-jsx-in-scope': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-tabs': 0,
      'react/require-default-props': 'off',
    },
  },
];
