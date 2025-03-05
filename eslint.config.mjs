import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["warn", { code: 200 }],
      "prefer-arrow-callback": ["warn"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
      "no-console": ["off"],
      "eol-last": ["error", "always"],
      "quote-props": ["error", "as-needed"],
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["warn", { code: 200 }],
      "prefer-arrow-callback": ["warn"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
      "no-console": ["off"],
      "eol-last": ["error", "always"],
      "quote-props": ["error", "as-needed"],
    },
  },
];