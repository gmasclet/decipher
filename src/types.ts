export interface Config {
  sourcePath: string;
  outputPath: string;
  exclude: string[];
}

export interface SourceFile {
  id: string;
  imports: string[];
}

export interface Node {
  reference: string;
  category: string;
  properties: Map<string, string>;
}

export interface Edge {
  type: string;
  source: Node;
  target: Node;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}
