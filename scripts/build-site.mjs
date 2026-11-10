import { cpSync, existsSync, mkdirSync, realpathSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = realpathSync(fileURLToPath(new URL('..', import.meta.url)));
const publishDirectory = join(root, 'dist');
const publicPaths = [
  'index.html',
  'main.css',
  'mobile.css',
  'mobile2.css',
  'desktop.css',
  'script.js',
  '_redirects',
  'Toheeb_Husain_Cyber_CV.pdf',
  'Respond and Recover from a Cloud Data Breach Report.pdf',
  'imgs',
  'Vids',
];

if (existsSync(publishDirectory)) {
  if (realpathSync(publishDirectory) !== publishDirectory) {
    throw new Error('The publish directory must be inside the site workspace.');
  }
  rmSync(publishDirectory, { recursive: true });
}

mkdirSync(publishDirectory);
for (const path of publicPaths) {
  cpSync(join(root, path), join(publishDirectory, path), { recursive: true });
}
