import globals from "globals";
import jsLint from "@eslint/js";
import tsLint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";
import { readFile } from "node:fs/promises";

/**
 * https://blog.csdn.net/sayUonly/article/details/123482912
 * 自动导入的配置
 */
const autoImportFile = new URL("./.eslintrc-auto-import.json", import.meta.url);
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, "utf8"));

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      "*.sh",
      "node_modules",
      "*.md",
      "*.woff",
      "*.ttf",
      ".vscode",
      ".idea",
      "dist",
      "/public",
      "/docs",
      ".husky",
      ".local",
      "/bin",
      ".eslintrc.cjs",
      "prettier.config.js",
      "src/assets",
      "tailwind.config.js"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,vue}"]
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tsLint.parser
      }
    }
  },
  {
    languageOptions: {
      globals: {
        // 自动导入的配置 undef
        ...autoImportGlobals.globals,
        DialogOption: "readonly",
        LayoutSetting: "readonly"
      }
    },
    plugins: { prettier },
    rules: {
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-unused-vars": "off",
      // "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      // "@typescript-eslint/no-unused-expressions": "off",
      "vue/multi-word-component-names": "off",
      // "vue/valid-define-props": "off",
      "vue/no-v-model-argument": "off",
      // "prefer-rest-params": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-multiple-empty-lines": ["error", { max: 1 }] // 禁止多行空格
    }
  }
];
