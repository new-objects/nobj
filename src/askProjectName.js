import inquirer from 'inquirer';
import { settings } from './settings.js';

export async function askProjectName() {
  const projectName = process.argv[2];
  if (projectName) {
    settings.projectName = projectName;
  } else {
    const answer = await inquirer.prompt({
      name: 'chosenName',
      type: 'input',
      message: 'Project name: ',
      default() {
        return 'nobj-project';
      },
    });
    settings.projectName = answer.chosenName;
  }
}
