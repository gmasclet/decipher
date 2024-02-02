import {Edge, Graph, Node} from './types';

export class CypherGenerator {
  generateCypherQueries(graph: Graph): string[] {
    return [
      ...this.generateCreateNodeQueries(graph.nodes),
      ...this.generateCreateEdgeQueries(graph.edges)
    ];
  }

  private generateCreateNodeQueries(nodes: Node[]): string[] {
    return nodes.map((node) => {
      const properties = [...node.properties.entries()]
        .map(([key, value]) => `${key}: "${value}"`)
        .join(', ');

      return `CREATE (${node.reference}:${node.category} {${properties}})`;
    });
  }

  private generateCreateEdgeQueries(edges: Edge[]): string[] {
    return edges.map(
      (edge) => `CREATE (${edge.source.reference})-[:${edge.type}]->(${edge.target.reference})`
    );
  }
}
