/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

// styles.css ships as source, like @bulmerkiln/design's theme.css: it points
// the consuming app's Tailwind build at this package's components. This copies
// it into dist/ after `vite build`.
import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");

mkdirSync(path.join(root, "dist"), { recursive: true });
cpSync(path.join(root, "src/styles.css"), path.join(root, "dist/styles.css"));
