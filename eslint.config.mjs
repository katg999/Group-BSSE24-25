import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginHooks from "eslint-plugin-react-hooks";  // Add this import

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginHooks
    },
    rules: {
      // Disable all rules from pluginJs.configs.recommended
      ...Object.fromEntries(
        Object.keys(pluginJs.configs.recommended.rules || {}).map(rule => [rule, "off"])
      ),
      // Disable all rules from pluginReact.configs.flat.recommended
      ...Object.fromEntries(
        Object.keys(pluginReact.configs.flat.recommended.rules || {}).map(rule => [rule, "off"])
      ),
      // Only enable parsing errors and hooks rules
      "no-unused-vars": "off",
      "no-undef": "off",
      "react-hooks/rules-of-hooks": "error",    // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn"     // Checks effect dependencies
    }
  }
];