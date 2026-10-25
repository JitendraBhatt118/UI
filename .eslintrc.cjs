const path = require('path')

module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'vite.config.js'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			vite: {
				viteConfig: {
					resolve: {
						alias: {
							'@app': path.resolve(__dirname, 'src/app'),
							'@pages': path.resolve(__dirname, 'src/pages'),
							'@features': path.resolve(__dirname, 'src/features'),
							'@entities': path.resolve(__dirname, 'src/entities'),
							'@widgets': path.resolve(__dirname, 'src/widgets'),
							'@shared': path.resolve(__dirname, 'src/shared'),
						},
					},
				},
			},
			node: {
				extensions: ['.js', '.jsx'],
			},
		},
	},
	plugins: ['react', 'react-hooks', 'react-refresh', 'import', 'jsx-a11y', 'security'],
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
		'react/jsx-key': ['error', { checkFragmentShorthand: true }],
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'security/detect-object-injection': 'off',
		camelcase: ['error', { properties: 'never' }],
		'import/no-unresolved': 'error',
		'import/no-default-export': 'error',
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
				pathGroups: [
					{ pattern: 'react', group: 'builtin', position: 'before' },
					{ pattern: '@app/**', group: 'internal', position: 'after' },
					{ pattern: '@pages/**', group: 'internal', position: 'after' },
					{ pattern: '@features/**', group: 'internal', position: 'after' },
					{ pattern: '@entities/**', group: 'internal', position: 'after' },
					{ pattern: '@widgets/**', group: 'internal', position: 'after' },
					{ pattern: '@shared/**', group: 'internal', position: 'after' },
				],
				pathGroupsExcludedImportTypes: ['react'],
				'newlines-between': 'always',
				alphabetize: { order: 'asc', caseInsensitive: true },
			},
		],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		'no-var': 'error',
		'prefer-const': 'error',
		eqeqeq: ['error', 'always', { null: 'ignore' }],
		curly: ['error', 'all'],
	},
	overrides: [
		{
			files: ['src/pages/**/*.{js,jsx}'],
			rules: {
				'import/no-default-export': 'off',
				'import/prefer-default-export': 'error',
			},
		},
	],
}
