import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

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
    rules: {
      // Disable all rules from pluginJs.configs.recommended
      ...Object.fromEntries(
        Object.keys(pluginJs.configs.recommended.rules || {}).map(rule => [rule, "off"])
      ),
      // Disable all rules from pluginReact.configs.flat.recommended
      ...Object.fromEntries(
        Object.keys(pluginReact.configs.flat.recommended.rules || {}).map(rule => [rule, "off"])
      ),
      // Only enable parsing errors
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];
// {
//   "plugins": ["react-hooks"],
//   "rules": {
//     "react-hooks/exhaustive-deps": "warn"
//   }
// }