import { readFile, writeFile } from 'node:fs/promises';
import { $ } from 'execa';
import { settings } from './settings.js';

export async function fixRepo() {
  // fix name property in package.json
  const packageJson = await readFile(
    `${settings.projectName}/package.json`,
    'utf-8',
  );
  const newPackageJson = packageJson.replace(
    /"name": "template-[^"]+"/,
    `"name": "${settings.projectName}"`,
  );
  await writeFile(
    `${settings.projectName}/package.json`,
    newPackageJson,
    'utf-8',
  );
  // remove git remote
  const $$ = $({ cwd: `${settings.projectName}` });
  try {
    await $$`git remote remove origin`;
  } catch {
    console.log('No remote origin found');
  }
}
