const tsEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const eslintImport = require("eslint-plugin-import");

module.exports = [
	{
		files: ["**/*.ts"], // Aplica esta configuración solo a archivos TypeScript
		languageOptions: {
			parser: tsParser, // Usa el parser de TypeScript
			ecmaVersion: "latest", // Usa la última versión de ECMAScript
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
		},
		settings: {
			"import/resolver": {
				typescript: true,
			},
		},
	},
];
