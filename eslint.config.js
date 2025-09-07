import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ignores: ["dist", "node_modules", "*.min.js", "public"], // <-- 这里替代 .eslintignore
    languageOptions: { globals: globals.browser },
    plugins: { js, reactHooks: pluginReactHooks },
    extends: ["js/recommended"],
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-var": "error",
      "no-multiple-empty-lines": ["warn", { max: 1 }],
      "no-unexpected-multiline": "error",
      "no-useless-escape": "off",
      eqeqeq: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true }],
      "arrow-body-style": ["error", "as-needed"],
      "prefer-const": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "no-console": "warn",
      "no-debugger": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);