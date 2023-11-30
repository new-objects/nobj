import inquirer from 'inquirer';
import { settings } from './settings.js';
import { templateRepos } from './templates.js';

const formatForDisplay = repos => {
  return Object.entries(repos).map(([key, { url, inactive }]) => {
    const label = inactive ? `${key} (deprecated)` : key;
    return { name: label, value: repos[key] }; // Returning the original repo object as the value
  });
};

const allAvailableTemplates = Object.keys(templateRepos);

export async function selectProjectTemplate() {
  const selectedTemplate = process.argv[3];
  if (selectedTemplate && allAvailableTemplates.includes(selectedTemplate)) {
    settings.projectTemplate = templateRepos[selectedTemplate];
  } else {
    const answer = await inquirer.prompt({
      name: 'selectedTemplate',
      type: 'list',
      message: 'Choose your template: ',
      choices: formatForDisplay(templateRepos),
    });
    settings.projectTemplate = answer.selectedTemplate;
  }
}
