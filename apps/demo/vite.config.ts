/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defaultClientConditions, defineConfig } from "vite";

// The libraries resolve to their src/ in this workspace (their `source`
// condition), so the demo runs against them without building them first.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { conditions: ["@bulmerkiln/source", ...defaultClientConditions] },
  publicDir: "../../packages/design/public",
});
