import * as fs from 'node:fs/promises';
import * as os from 'node:os';

import {Config} from './types';

export class OutputFileWriter {
  constructor(private readonly config: Config) {}

  async writeOutputFile(lines: string[]): Promise<void> {
    await fs.writeFile(this.config.outputPath, lines.join(os.EOL));
  }
}
