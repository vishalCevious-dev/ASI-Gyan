import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcFile = process.argv[2] || '.env';
const src = path.join(root, 'apps', 'backend', srcFile);
const dest = path.join(root, '.env');

if (!fs.existsSync(src)) {
  console.error(`[copy-env] Source not found: ${path.relative(root, src)}`);
  process.exit(1);
}

try {
  fs.copyFileSync(src, dest);
  console.log(`[copy-env] Copied ${path.relative(root, src)} -> ${path.relative(root, dest)}`);
} catch (err) {
  console.error('[copy-env] Failed:', err);
  process.exit(1);
}

