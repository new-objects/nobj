import inquirer from 'inquirer';
import { settings } from './settings.js';

export async function askProjectName() {
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
