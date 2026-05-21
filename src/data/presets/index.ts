import type { AlgorithmData } from "../../types/algorithm";
import bubbleSort from "./bubble-sort";

/** 所有预设算法数据，key 为 algorithmId */
const presetDataMap: Record<string, AlgorithmData> = {
  "bubble-sort": bubbleSort,
};

export function getPresetData(id: string): AlgorithmData | undefined {
  return presetDataMap[id];
}

export function getAllPresetMeta() {
  return Object.values(presetDataMap).map(({ id, name, category }) => ({
    id,
    name,
    category,
    description: "",
  }));
}

export default presetDataMap;
