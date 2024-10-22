import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

const config = [
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
    settings: {
      react: {
        version: "detect"
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

// Conditionally add react-hooks rules if the plugin is available
try {
  const pluginHooks = await import("eslint-plugin-react-hooks");
  config[0].plugins = {
    react: pluginReact,
    "react-hooks": pluginHooks.default
  };
  config[0].rules = {
    ...config[0].rules,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  };
} catch (error) {
  console.warn("eslint-plugin-react-hooks not found, skipping hooks-related rules");
}

export default config;