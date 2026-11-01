/// <reference types="vitest/config" />
/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { defineConfig } from "vite";
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
const external = ["react", "react-dom", "@headlessui/react", "@floating-ui/react"];

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
              "src/utils/storyColors.ts",
              "src/utils/StoryRouterLink.tsx",
            ],
            tsconfigPath: "./tsconfig.app.json",
          }),
        ]
      : []),
  ],
  // public/ is Storybook's (its staticDirs); the package ships none of it.
  publicDir: false,
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    lib: {
      entry: {
        index: path.resolve(dirname, "src/index.ts"),
        "icons/index": path.resolve(dirname, "src/icons/index.ts"),
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
