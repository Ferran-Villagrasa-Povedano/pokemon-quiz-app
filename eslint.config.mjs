// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginExpo from 'eslint-plugin-expo';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-native': pluginReactNative,
      expo: pluginExpo,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReactNative.configs.recommended.rules,
      ...pluginExpo.configs.recommended.rules,
      'react-native/no-inline-styles': 'off',
      'react-native/no-unused-styles': 'warn',
      'prettier/prettier': 'error', // Runs Prettier as an ESLint rule
    },
  },
  prettier, // Ensures ESLint rules don't conflict with Prettier
];
