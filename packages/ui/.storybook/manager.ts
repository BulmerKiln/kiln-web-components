/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Storybook's own UI follows the operating system; the toolbar themes the canvas.
addons.setConfig({
  theme: create({
    base: dark ? "dark" : "light",
    brandTitle: "Bulmer Kiln UI",
    fontBase: '"Geist", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Fira Code", ui-monospace, monospace',
  }),
});
