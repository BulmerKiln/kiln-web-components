/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

// Makes dist/ a publishable npm package: it writes dist/package.json, with the
// entry paths rewritten from the root package.json (./dist/... -> ./...) and
// without the `@bulmerkiln/source` condition other workspaces use to read src/, and
// copies the license files. Dependencies and peerDependencies are copied
// across: peers are what the consumer owns a single copy of (React, Tailwind,
// which compiles theme.css); dependencies are the other packages vite.config.ts
// keeps external. Every bare import left in dist/ is checked against them, so
// an undeclared one fails this build rather than the consumer's.
import { cpSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");
const workspace = path.resolve(root, "../..");

const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

const strip = (p) => p.replace(/^\.\/dist\//, "./");

const distPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  license: pkg.license,
  repository: pkg.repository,
  type: pkg.type,
  main: strip(pkg.main),
  module: strip(pkg.module),
  types: strip(pkg.types),
  exports: {
    ".": {
      import: strip(pkg.exports["."].import),
      types: strip(pkg.exports["."].types),
    },
    "./icons": {
      import: strip(pkg.exports["./icons"].import),
      types: strip(pkg.exports["./icons"].types),
    },
    // The workspace points theme.css at src/ for other workspaces; dist has its own copy.
    "./theme.css": "./theme.css",
  },
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
  engines: pkg.engines,
  publishConfig: pkg.publishConfig,
};

// "@scope/name/sub/path" -> "@scope/name"; "name/sub" -> "name".
const packageName = (specifier) =>
  specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/");

const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);
// Module-level `import … from "x"`, `export … from "x"` and `import "x"`,
// where x is a bare package specifier (not a relative path).
const importPattern =
  /^\s*(?:import|export)\b[^;]*?\bfrom\s*["']([@a-z][\w./@-]*)["']|^\s*import\s*["']([@a-z][\w./@-]*)["']/gm;
const undeclared = new Set();
for (const entry of readdirSync(path.join(root, "dist"), {
  recursive: true,
  withFileTypes: true,
})) {
  if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
  const code = readFileSync(path.join(entry.parentPath, entry.name), "utf8");
  for (const match of code.matchAll(importPattern)) {
    const name = packageName(match[1] ?? match[2]);
    if (!declared.has(name)) undeclared.add(name);
  }
}
if (undeclared.size > 0) {
  throw new Error(
    `dist imports packages package.json doesn't declare: ${[...undeclared].join(", ")}. ` +
      "Add them to dependencies (or peerDependencies).",
  );
}

writeFileSync(
  path.join(root, "dist", "package.json"),
  `${JSON.stringify(distPkg, null, 2)}\n`,
);
for (const file of ["LICENSE", "NOTICE"]) {
  cpSync(path.join(workspace, file), path.join(root, "dist", file));
}
cpSync(path.join(root, "README.md"), path.join(root, "dist", "README.md"));
