#!/usr/bin/env node

//                        .oPYo. 8       o                 o
//                        8    8 8                         8
// odYo. .oPYo. o   o   o 8    8 8oPYo. o8 .oPYo. .oPYo.  o8P .oPYo.
// 8' `8 8oooo8 Y. .P. .P 8    8 8    8  8 8oooo8 8    '   8  Yb..
// 8   8 8.     `b.d'b.d' 8    8 8    8  8 8.     8    .   8    'Yb.
// 8   8 `Yooo'  `Y' `Y'  `YooP' `YooP'  8 `Yooo' `YooP'   8  `YooP'
// ..::..:.....:::..::..:::.....::.....::8 :.....::.....:::..::.....:
// :::::::::::::::::::::::::::::::::::::oP ::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::..:::::::::::::::::::::::::::
// author: mi-skam date: 17.10.2023

import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { $ } from 'execa';

const templateRepos = {
  'vanilla ': 'new-objects/template-vite-vanilla',
  'vanilla-tailwindcss': 'new-objects/template-vite-vanilla-tailwind',
  'vanilla-pixi5': 'new-objects/template-vite-pixi5',
  'nodejs (backend)': 'new-objects/template-nodejs',
};
const projectTypes = Object.keys(templateRepos);

const settings = {
  template: '',
  projectName: '',
  projectType: '',
};

const sleep = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

async function welcome() {
  const welcomeTitle = chalkAnimation.rainbow(
    '@new-objects/cli - creating new objects since 2023',
  );
  await sleep();
  welcomeTitle.stop();
}

async function askProjectName() {
  const answer = await inquirer.prompt({
    name: 'project_name',
    type: 'input',
    message: 'Project name: ',
    default() {
      return 'nobj-project';
    },
  });
  settings.projectName = answer.project_name;
}

async function projectType() {
  const answer = await inquirer.prompt({
    name: 'project_type',
    type: 'list',
    message: 'Choose your template: ',
    choices: projectTypes,
  });
  settings.projectType = answer.project_type;
}

async function doesDirectoryExist(directoryPath) {
  try {
    const stats = await stat(directoryPath);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      // The directory does not exist.
      return false;
    }
    throw error; // For other errors, rethrow the error.
  }
}

async function downloadRepo() {
  if (!settings.projectType) {
    throw new Error('No project type specified');
  }
  // make sure repo doesn't exist
  const isDir = await doesDirectoryExist(settings.projectName);
  if (isDir) {
    return;
  }
  const repo = templateRepos[settings.projectType];
  const result =
    await $`git clone --depth=1 https://github.com/${repo} ${settings.projectName}`;
  console.log(result.stdout);
}

async function fixRepo() {
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

welcome()
  .then(askProjectName)
  .then(projectType)
  .then(downloadRepo)
  .then(fixRepo);
