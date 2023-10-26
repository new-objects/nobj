import { readFile } from 'node:fs/promises';
import { templateRepos } from './templates.js';

const packageJson = await readFile(
  new URL('../package.json', import.meta.url),
  'utf-8',
);
const { version: VERSION } = JSON.parse(packageJson);

export function handleCmdOptions() {
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
}
