import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

// Initialize FlatCompat with the recommended ESLint config
const compat = new FlatCompat({
	baseDirectory: import.meta.url, // Use 'import.meta.url' for ES module
	recommendedConfig: js.configs.recommended, // Passing the recommended config
});

export default [
	js.configs.recommended, // Use ESLint's recommended JavaScript config
	...compat.config({
		extends: ['eslint:recommended', 'plugin:react/recommended'], // Your specific configurations
		parserOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
		},
		env: {
			browser: true,
			es2021: true,
			node: true,
		},
		settings: {
			react: {
				version: 'detect', // Automatically detect the react version
			},
		},
		rules: {
			'no-console': 'warn', // Custom rules
			'react/prop-types': 'off',
		},
	}),
];
