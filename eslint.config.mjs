// filepath: /F:/www/api-vendas/eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,ts}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: pluginVue,
      prettier: prettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginVue.configs['flat/essential'].rules,
      'no-console': 'warn',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'lf',
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
];
