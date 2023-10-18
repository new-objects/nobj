import { stat } from 'node:fs/promises';
import { $ } from 'execa';
import { templateRepos } from './templates.js';
import { settings } from './settings.js';

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
export async function downloadRepo() {
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
