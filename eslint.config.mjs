import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { compilerOptions: { paths = {} } = {} } = fs.existsSync("./tsconfig.json");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/types/*", "schema.json"],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"],
    plugins: ["unused-imports"],
    parser: "@typescript-eslint/parser",
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-use-before-define": "off",
      "react/no-danger": "off",
      "@next/next/no-document-import-in-page": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
      "import/extensions": 0,
      "react/jsx-props-no-spreading": 0,
      "import/prefer-default-export": 0,
      "import/no-unresolved": 0,
      "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
      "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
      "arrow-body-style": ["error", "as-needed"],
      "react/require-default-props": 0,
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "jsx-a11y/anchor-is-valid": 0,
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            ["external", "type"],
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: Object.keys(paths).map((aliastPath) => ({
            pattern: `${aliastPath}*/*`,
            group: "internal",
          })),
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: [],
        },
      ],
      "no-restricted-exports": "off",
      "unused-imports/no-unused-imports": "error",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "_+",
          varsIgnorePattern: "_+",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "_+",
          varsIgnorePattern: "_+",
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
          "ts-nocheck": "allow-with-description",
        },
      ],
      "no-underscore-dangle": [
        "error",
        {
          allow: [
            "_ref",
            "_type",
            "_id",
            "__typename",
            "__filename",
            "__dirname",
            "_key",
            "__IS_STORYBOOK",
            "_original",
            "_uid",
          ],
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info"],
        },
      ],
      "react/no-array-index-key": "off",
      "import/no-cycle": [2, { maxDepth: 1 }],
      "react/no-unstable-nested-components": "off",
      "func-names": "off",
    },
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          project: "./tsconfig.json",
        },
        plugins: ["@typescript-eslint"],
        extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
        rules: {
          "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
          "@typescript-eslint/no-explicit-any": "warn",
        },
      },
    ],
  }),
];

export default eslintConfig;
