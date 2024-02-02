import * as fs from 'node:fs/promises';

import {Config} from './types';

export class ConfigLoader {
  private readonly defaultConfig = {
    sourcePath: '.',
    outputPath: 'out.cypher',
    exclude: ['dist', 'node_modules', 'test', '.eslintrc.js', '.prettierrc.js']
  };

  async loadConfig(): Promise<Config> {
    try {
      const content = await fs.readFile('config.json', 'utf-8');
      return JSON.parse(content) as Config;
    } catch {
      await fs.writeFile('config.json', JSON.stringify(this.defaultConfig, undefined, 2));
      return this.defaultConfig;
    }
  }
}
