import type { AlgorithmCategoryInfo } from "../types/algorithm";

/** 算法分类配置 */
export const ALGORITHM_CATEGORIES: AlgorithmCategoryInfo[] = [
  { id: "sorting", label: "排序", icon: "📊" },
  { id: "searching", label: "搜索", icon: "🔍" },
  { id: "data-structure", label: "数据结构", icon: "🔗" },
  { id: "graph", label: "图论", icon: "🌐" },
];

/** 分类中文名映射 */
export const CATEGORY_LABEL: Record<string, string> = {
  sorting: "排序算法",
  searching: "搜索算法",
  "data-structure": "数据结构",
  graph: "图论算法",
};

/** 播放器默认速度（ms/步） */
export const DEFAULT_SPEED = 800;
export const SPEED_MIN = 200;
export const SPEED_MAX = 2000;
