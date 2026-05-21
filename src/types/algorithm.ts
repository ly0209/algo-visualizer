/* ===== 算法执行步骤 ===== */

/** 单个节点的状态 */
export interface GraphNode {
  id: number;
  value: number | string;
  label?: string;
  highlight?: boolean;
  swap?: boolean;
  visited?: boolean;
  color?: string;
}

/** 节点间的连线 */
export interface GraphEdge {
  from: number;
  to: number;
  label?: string;
  color?: string;
  dashed?: boolean;
}

/** 每一步的图状态 */
export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/** 变量快照 */
export interface VariableSnapshot {
  [key: string]: unknown;
}

/** 单步执行数据 */
export interface AlgorithmStep {
  step: number;
  line: number;
  description: string;
  variables: VariableSnapshot;
  graph_state: GraphState;
}

/** 完整算法数据 */
export interface AlgorithmData {
  id: string;
  name: string;
  category: AlgorithmCategory;
  language: string;
  code: string;
  steps: AlgorithmStep[];
}

/** 算法分类 */
export type AlgorithmCategory =
  | "sorting"
  | "searching"
  | "data-structure"
  | "graph";

/** 算法分类信息 */
export interface AlgorithmCategoryInfo {
  id: AlgorithmCategory;
  label: string;
  icon: string;
}

/** 算法元信息（列表用） */
export interface AlgorithmMeta {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
}
