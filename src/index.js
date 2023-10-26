#!/usr/bin/env node
import { askProjectName } from './askProjectName.js';
import { projectType } from './projectType.js';
import { downloadRepo } from './downloadRepo.js';
import { fixRepo } from './fixRepo.js';
import { welcome } from './welcome.js';
import { readFile } from 'node:fs/promises';
import { templateRepos } from './templates.js';

//                        .oPYo. 8       o                 o
//                        8    8 8                         8
// odYo. .oPYo. o   o   o 8    8 8oPYo. o8 .oPYo. .oPYo.  o8P .oPYo.
// 8' `8 8oooo8 Y. .P. .P 8    8 8    8  8 8oooo8 8    '   8  Yb..
// 8   8 8.     `b.d'b.d' 8    8 8    8  8 8.     8    .   8    'Yb.
// 8   8 `Yooo'  `Y' `Y'  `YooP' `YooP'  8 `Yooo' `YooP'   8  `YooP'
// ..::..:.....:::..::..:::.....::.....::8 :.....::.....:::..::.....:
// :::::::::::::::::::::::::::::::::::::oP ::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::..:::::::::::::::::::::::::::
// author: mi-skam

const packageJson = await readFile(
  new URL('../package.json', import.meta.url),
  'utf-8',
);
const { version: VERSION } = JSON.parse(packageJson);

if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log(VERSION);
  process.exit(0);
} else if (process.argv.includes('--list') || process.argv.includes('-l')) {
  console.log('Available templates:');
  for (const template in templateRepos) {
    console.log(template);
  }
  process.exit(0);
}

welcome()
  .then(askProjectName)
  .then(projectType)
  .then(downloadRepo)
  .then(fixRepo);
