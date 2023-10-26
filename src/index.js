#!/usr/bin/env node
import { askProjectName } from './askProjectName.js';
import { projectType } from './projectType.js';
import { downloadRepo } from './downloadRepo.js';
import { fixRepo } from './fixRepo.js';
import { welcome } from './welcome.js';
import { version } from '../package.json';

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

if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log(version);
  process.exit(0);
}

welcome()
  .then(askProjectName)
  .then(projectType)
  .then(downloadRepo)
  .then(fixRepo);
