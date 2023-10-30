import { doesDirectoryExist } from '../src/downloadRepo';
import { promises as fs } from 'fs';
import path from 'path';
import { assert, describe, expect, it } from 'vitest';

describe('doesDirectoryExist', () => {
  it('should return true if the directory exists', async () => {
    const directoryPath = path.resolve(__dirname);
    const result = await doesDirectoryExist(directoryPath);
    expect(result).toBe(true);
  });

  it('should return false if the directory does not exist', async () => {
    const directoryPath = path.resolve(__dirname, 'nonexistent');
    const result = await doesDirectoryExist(directoryPath);
    expect(result).toBe(false);
  });
});
