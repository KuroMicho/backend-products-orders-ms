const tsEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const eslintImport = require("eslint-plugin-import");

module.exports = [
	{
		files: ["**/*.ts"], // Aplica esta configuración solo a archivos TypeScript
		languageOptions: {
			parser: tsParser, // Usa el parser de TypeScript
			parserOptions: {
				ecmaVersion: "latest", // Usa la última versión de ECMAScript
				sourceType: "script",
				project: "./tsconfig.json", // Especifica tu tsconfig
			},
		},
		plugins: {
			"@typescript-eslint": tsEslint,
			import: eslintImport,
		},
		rules: {
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
			"@typescript-eslint/consistent-type-imports": "error", // Regla recomendada adicional
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true, // Intenta siempre resolver tipos TypeScript
				},
			},
		},
	},
];
