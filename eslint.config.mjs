// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Ignore build artifacts
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  },

  // Base JS/TS
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // good TS defaults
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  // Next.js plugin (the thing the warning wants)
  {
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // chill some noisy rules you saw earlier
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },

  // Project files we lint (source only)
  {
    files: ["src/**/*.{ts,tsx}"],
  },
];