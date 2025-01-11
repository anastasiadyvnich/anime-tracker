import globals from 'globals';
import pluginJs from '@eslint/js';
import cypress from 'cypress';

const { jest } = globals;

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.js'],
        ...pluginJs.configs.recommended,
        languageOptions: {
            sourceType: 'commonjs',
            globals: { ...globals.node, ...jest },
        },
        rules: { 'no-unused-vars': ['error', { caughtErrors: 'none' }] },
    },
    {
        ignores: ['cypress/**/*', 'cypress.config.js'],
    }
];