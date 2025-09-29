#!/usr/bin/env node
/*
  Rewrites relative imports in apps/backend/src to use the 'src/*' alias.
  Examples:
    ../../middlewares/auth.middleware -> src/middlewares/auth.middleware

  Safe rules:
  - Only rewrites specifiers that start with './' or '../'
  - Only rewrites if the resolved target is under the src root
  - Preserves extension-less specifiers (removes .ts/.tsx/.js/.d.ts)
  - Keeps 'index' omission (i.e., maps folder/index.ts -> folder)
*/
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(projectRoot, "src");

/** Recursively get .ts files (excluding type declarations and test snapshots) */
function listTsFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listTsFiles(full));
    } else if (entry.isFile()) {
      if (/\.ts$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
        results.push(full);
      }
    }
  }
  return results;
}

function tryResolveModule(fromFile, spec) {
  // Resolve like TS/Node would for TS sources
  const base = path.resolve(path.dirname(fromFile), spec);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.js"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function toAliasPath(absFile) {
  const relFromSrc = path.relative(srcRoot, absFile).replace(/\\/g, "/");
  // drop extension
  const noExt = relFromSrc.replace(/\.(ts|tsx|js|d\.ts)$/i, "");
  // drop trailing /index
  const withoutIndex = noExt.replace(/\/(index)$/i, "");
  return `src/${withoutIndex}`;
}

function rewriteFile(file) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  // regexes for import/export/require/dynamic import
  const patterns = [
    // import ... from '...'
    {
      re: /(import\s+[^'";]+?from\s*['"])(\.\.?\/[^'";]+)(['"])/g,
      type: "import",
    },
    // export ... from '...'
    {
      re: /(export\s+[^'";]+?from\s*['"])(\.\.?\/[^'";]+)(['"])/g,
      type: "export",
    },
    // dynamic import('...')
    { re: /(import\(\s*['"])(\.\.?\/[^'";]+)(['"]\s*\))/g, type: "dynamic" },
    // require('...')
    { re: /(require\(\s*['"])(\.\.?\/[^'";]+)(['"]\s*\))/g, type: "require" },
  ];

  for (const { re } of patterns) {
    content = content.replace(re, (m, p1, spec, p3) => {
      const resolved = tryResolveModule(file, spec);
      if (!resolved) return m;
      // Only rewrite if under srcRoot
      if (!path.resolve(resolved).startsWith(srcRoot)) return m;
      const alias = toAliasPath(resolved);
      changed = true;
      return `${p1}${alias}${p3}`;
    });
  }

  if (changed) fs.writeFileSync(file, content);
  return changed;
}

function main() {
  const files = listTsFiles(srcRoot);
  let count = 0;
  for (const f of files) {
    if (rewriteFile(f)) count++;
  }
  console.log(`Updated ${count} files to use 'src/*' alias.`);
}

if (require.main === module) {
  main();
}

