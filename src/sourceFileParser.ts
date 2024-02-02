import * as path from 'node:path';

import {TypescriptParser} from 'typescript-parser';

import {Config, SourceFile} from './types';

export class SourceFileParser {
  constructor(private readonly config: Config) {}

  async parseSourceFiles(filePaths: string[]): Promise<SourceFile[]> {
    const files = await new TypescriptParser().parseFiles(
      filePaths.map((p) => path.join(this.config.sourcePath, p)),
      this.config.sourcePath
    );

    return files.map((file) => ({
      id: this.removeIndex(file.identifier),
      imports: file.imports
        .filter((imp) => imp.libraryName.startsWith('.') && !imp.libraryName.endsWith('.json'))
        .map((imp) =>
          this.removeIndex(
            '/' +
              path.relative(this.config.sourcePath, path.join(file.parsedPath.dir, imp.libraryName))
          )
        )
    }));
  }

  private removeIndex(identifier: string) {
    if (identifier.endsWith('/index')) {
      return identifier.substring(0, identifier.length - 6);
    }
    return identifier;
  }
}
