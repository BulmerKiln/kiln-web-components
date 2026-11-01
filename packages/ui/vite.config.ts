/// <reference types="vitest/config" />
/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { defaultClientConditions, defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname = import.meta.dirname;

/*
 * Packages the library imports but doesn't bundle. Each must be declared in
 * package.json (peerDependencies or dependencies); postbuild-package.mjs fails
 * the build if dist/ imports one that isn't.
 */
const external = [
  "react",
  "react-dom",
  "@bulmerkiln/design",
  "@headlessui/react",
  "@lexical",
  "lexical",
  "shiki",
];

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // Only needed to emit .d.ts for the published package. Under `storybook
    // dev` or vitest it rebuilds the whole TS program on every change.
    ...(command === "build"
      ? [
          dts({
            include: ["src"],
            exclude: [
              "src/**/*.stories.ts",
              "src/**/*.stories.tsx",
            ],
            tsconfigPath: "./tsconfig.app.json",
          }),
        ]
      : []),
  ],
  // @bulmerkiln/design resolves to its src/ in this workspace (its
  // `@bulmerkiln/source` condition), so ui builds and tests against it without
  // building it first. The name is ours: Lexical publishes a plain `source`
  // condition to its TypeScript, which would be compiled in place of its dist/.
  resolve: { conditions: ["@bulmerkiln/source", ...defaultClientConditions] },
  // Storybook's static files come from @bulmerkiln/design; the package ships none.
  publicDir: false,
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    lib: {
      entry: {
        index: path.resolve(dirname, "src/index.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rolldownOptions: {
      // vite-plugin-dts is most of the build time by design; the warning is noise.
      checks: { pluginTimings: false },
      external: (id) =>
        external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        assetFileNames: "[name][extname]",
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          // One iframe per worker instead of per story file, so axe-core and
          // the Storybook annotations load once per worker. Stories remount
          // per test, so no state is shared.
          isolate: false,
        },
      },
    ],
  },
}));
