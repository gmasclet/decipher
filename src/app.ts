import {ConfigLoader} from './configLoader';
import {CypherGenerator} from './cypherGenerator';
import {GraphBuilder} from './graphBuilder';
import {OutputFileWriter} from './outputFileWriter';
import {ReferenceProvider} from './referenceProvider';
import {SourceFileFinder} from './sourceFileFinder';
import {SourceFileParser} from './sourceFileParser';

async function main(): Promise<void> {
  const config = await new ConfigLoader().loadConfig();
  const filePaths = await new SourceFileFinder(config).findSourceFiles();
  const files = await new SourceFileParser(config).parseSourceFiles(filePaths);
  const graph = new GraphBuilder(new ReferenceProvider()).buildGraph(files);
  const queries = new CypherGenerator().generateCypherQueries(graph);
  await new OutputFileWriter(config).writeOutputFile(queries);
}

main().catch(console.error);
