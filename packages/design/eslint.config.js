/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

// Rendering raw HTML is how markup injection gets in.
const noRawHtml = {
  selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
  message: "Don't render raw HTML.",
};

// The component categories of .storybook/preview.tsx's storySort, then the component name.
const categories =
  "/^(Brand|Layout|Navigation|Controls|Feedback|Overlays|Data display)\\/[A-Z][A-Za-z]+$/";

export default tseslint.config(
  [
    globalIgnores(["dist", "storybook-static", "coverage"]),
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat["recommended-latest"],
        reactRefresh.configs.vite,
      ],
      languageOptions: {
        ecmaVersion: 2023,
        globals: globals.browser,
      },
      rules: {
        // `const { omitted, ...rest } = props` is how props are dropped before spreading.
        "@typescript-eslint/no-unused-vars": [
          "error",
          { ignoreRestSiblings: true },
        ],
        "no-restricted-syntax": [
          "error",
          noRawHtml,
        ],
      },
    },
    {
      // Every component story sits in one of the sidebar's categories, as
      // ordered in .storybook/preview.tsx.
      files: ["src/components/**/*.stories.tsx"],
      rules: {
        "no-restricted-syntax": [
          "error",
          noRawHtml,
          {
            selector: `ObjectExpression:has(> Property[key.name="component"]):not(:has(> Property[key.name="title"]))`,
            message:
              'Give the story a title: "<Category>/<Name>", with a category from .storybook/preview.tsx.',
          },
          {
            selector: `ObjectExpression:has(> Property[key.name="component"]) > Property[key.name="title"][value.value!=${categories}]`,
            message:
              "Use a category from .storybook/preview.tsx: Brand, Layout, Navigation, Controls, Feedback, Overlays or Data display.",
          },
        ],
      },
    },
    {
      // Storybook's preview exports its config beside decorators, and a
      // context module exports its provider with its hook, both by design.
      files: [".storybook/**/*.{ts,tsx}", "src/context/**/*.{ts,tsx}"],
      rules: { "react-refresh/only-export-components": "off" },
    },
  ],
  storybook.configs["flat/recommended"],
);
