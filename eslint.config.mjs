// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default [
  // Ignore build & static output
  { ignores: ["node_modules/**", ".next/**", "dist/**", "build/**", "public/**"] },

  // Base JS recommendations
  js.configs.recommended,

  // Apply to our source files only
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // (We can enable type-aware later by adding "project")
      },
      // Browser + Node + Workers = covers fetch/Request/Headers + process/console
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.worker,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: { react: { version: "detect" } },
    rules: {
      // Turn OFF base rules that conflict with TS versions
      "no-undef": "off",
      "no-unused-vars": "off",

      // Use TS versions instead
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // React/Next niceties
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Light a11y for now
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
];