/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

// theme.css ships as source, not compiled CSS: each consuming app's own
// Tailwind build compiles it, so the utilities the app uses are generated from
// the app's own sources as well as this package's. This copies it into dist/
// after `vite build`, with the font files it references.
import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");

mkdirSync(path.join(root, "dist"), { recursive: true });
cpSync(path.join(root, "src/theme.css"), path.join(root, "dist/theme.css"));
cpSync(path.join(root, "src/fonts"), path.join(root, "dist/fonts"), {
  recursive: true,
});
