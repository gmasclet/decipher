import {ReferenceProvider} from './referenceProvider';
import {Edge, Graph, Node, SourceFile} from './types';

export class GraphBuilder {
  constructor(private readonly referenceProvider: ReferenceProvider) {}

  buildGraph(files: SourceFile[]): Graph {
    const nodes = files.map((file) => ({
      reference: this.referenceProvider.get(),
      category: 'file',
      properties: new Map([['name', file.id]])
    }));
    const edges: Edge[] = [];
    for (const file of files) {
      for (const imp of file.imports) {
        edges.push({
          type: 'IMPORT',
          source: this.resolveNode(nodes, file.id),
          target: this.resolveNode(nodes, imp)
        });
      }
    }
    return {
      nodes: nodes,
      edges: edges
    };
  }

  private resolveNode(nodes: Node[], name: string): Node {
    const node = nodes.find((n) => n.properties.get('name') === name);
    if (node === undefined) {
      throw new Error(`Could not resolve node "${name}"`);
    }
    return node;
  }
}
