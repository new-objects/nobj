import { readFile, writeFile, rm } from 'node:fs/promises';
import { $ } from 'execa';
import { settings } from './settings.js';

const filesToBeFixed = [`vite.config.js`, `package.json`];

export async function fixRepo() {
  for (const f of filesToBeFixed) {
    const fileContent = await readFile(`${settings.projectName}/${f}`, 'utf-8');
    const newFileContent = fileContent.replace(
      /template-[^"/]+/g,
      settings.projectName,
    );
    await writeFile(`${settings.projectName}/${f}`, newFileContent, 'utf-8');
  }
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
