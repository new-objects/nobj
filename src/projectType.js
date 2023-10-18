import inquirer from 'inquirer';
import { settings } from './settings.js';
import { templateRepos } from './templates.js';

const projectTypes = Object.keys(templateRepos);

export async function projectType() {
  const answer = await inquirer.prompt({
    name: 'project_type',
    type: 'list',
    message: 'Choose your template: ',
    choices: projectTypes,
  });
  settings.projectType = answer.project_type;
}
