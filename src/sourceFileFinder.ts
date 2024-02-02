import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import {Config} from './types';

export class SourceFileFinder {
  constructor(private readonly config: Config) {}

  async findSourceFiles(): Promise<string[]> {
    const entries = await fs.readdir(this.config.sourcePath, {
      recursive: true,
      withFileTypes: true
    });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const rel = path.relative(this.config.sourcePath, entry.path);
        return path.join(rel, entry.name);
      })
      .filter((entryPath) => {
        const isExcluded = this.config.exclude.some((excludedPath) =>
          entryPath.startsWith(excludedPath)
        );
        const isCode = entryPath.endsWith('.ts') || entryPath.endsWith('.js');
        return !isExcluded && isCode;
      });
  }
}
