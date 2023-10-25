import { readFile, writeFile, rm } from 'node:fs/promises';
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
  // fix git
  const $$ = $({ cwd: `${settings.projectName}` });
  try {
    await rm(`${settings.projectName}/.git`, { recursive: true });
    await $$`git init -b main`;
    await $$`git add .`;
    await $$`git commit -m 'init'`;
  } catch (error) {
    console.log(error);
    console.log('No git repo found.');
  }
}
