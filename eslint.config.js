import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([globalIgnores(['dist']), {
  files: ['src/**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    reactX.configs['recommended-typescript'],
    reactDom.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],
  plugins: {
    imports: importPlugin,
  },
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-misused-promises': [ 'error', { checksVoidReturn: true } ],
    'react-refresh/only-export-components': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-x/no-array-index-key': 'off',
    'import/no-dynamic-require': 'warn',
    'import/no-nodejs-modules': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'warn',
      {
        groups: [ 'external', 'builtin', 'internal', 'sibling', 'parent', 'index' ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
      },
    ],
    quotes: ['warn', 'single', { avoidEscape: true }]
  },
}, {
  files: ['.storybook/**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
    ecmaVersion: 2020,
    globals: globals.browser,
  },
}, ...storybook.configs["flat/recommended"]])
