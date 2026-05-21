import type { AlgorithmData, AlgorithmStep, GraphNode } from "../types/algorithm";

const BUBBLE_SORT_CODE = `void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`;

function buildGraph(arr: number[], overrides: Partial<GraphNode>[] = []): AlgorithmStep["graph_state"] {
  const nodes: GraphNode[] = arr.map((v, id) => ({
    id,
    value: v,
    ...(overrides[id] || {}),
  }));
  const edges = nodes.slice(0, -1).map((_, i) => ({ from: i, to: i + 1 }));
  return { nodes, edges };
}

function highlightPair(arr: number[], j: number, sortedUntil: number): Partial<GraphNode>[] {
  return arr.map((_, id) => {
    const base: Partial<GraphNode> = {};
    if (id >= sortedUntil) base.color = "#22c55e";
    if (id === j || id === j + 1) base.highlight = true;
    return base;
  });
}

export function generateBubbleSortSteps(inputArr: number[]): AlgorithmData {
  const n = inputArr.length;
  const arr = [...inputArr];
  let stepIdx = 0;
  const steps: AlgorithmStep[] = [];

  const push = (line: number, desc: string, vars: Record<string, unknown>, nodes: Partial<GraphNode>[]) => {
    const edges = nodes.slice(0, -1).map((_, i) => {
      const isComparing = nodes[i]?.highlight && nodes[i + 1]?.highlight;
      return { from: i, to: i + 1, ...(isComparing ? { color: "#ef4444" } : {}) };
    });
    steps.push({
      step: stepIdx++, line, description: desc,
      variables: vars,
      graph_state: { nodes: arr.map((v, id) => ({ id, value: v, ...(nodes[id] || {}) })), edges },
    });
  };

  // Step 0: Init
  push(1, `函数开始，数组 [${arr}]，长度 n=${n}`, { arr: [...arr], n, i: null, j: null }, []);

  for (let i = 0; i < n - 1; i++) {
    const sortedUntil = n - i;
    // Outer loop
    push(2, `外层循环 i=${i}，第 ${i + 1} 轮冒泡`, { arr: [...arr], n, i, j: null },
      arr.map((_, id) => ({ highlight: id === 0, ...(id >= sortedUntil ? { color: "#22c55e" } : {}) }))
    );

    for (let j = 0; j < n - 1 - i; j++) {
      // Inner loop: compare arr[j] vs arr[j+1]
      push(3, `内层循环 j=${j}，比较 arr[${j}]=${arr[j]} 和 arr[${j+1}]=${arr[j+1]}`,
        { arr: [...arr], n, i, j }, highlightPair(arr, j, sortedUntil)
      );

      if (arr[j] > arr[j + 1]) {
        // Need swap
        push(4, `${arr[j]} > ${arr[j+1]}，需要交换`, { arr: [...arr], n, i, j },
          arr.map((_, id) => ({
            highlight: id === j || id === j + 1,
            swap: id === j || id === j + 1,
            ...(id >= sortedUntil ? { color: "#22c55e" } : {}),
          }))
        );

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        push(6, `交换：arr[${j}]=${arr[j]} 和 arr[${j+1}]=${arr[j+1]} 互换`,
          { arr: [...arr], n, i, j },
          arr.map((_, id) => ({
            highlight: id === j || id === j + 1,
            ...(id >= sortedUntil ? { color: "#22c55e" } : {}),
          }))
        );
      } else {
        // No swap needed
        push(4, `${arr[j]} < ${arr[j+1]}，不交换，继续`,
          { arr: [...arr], n, i, j },
          arr.map((_, id) => (id >= sortedUntil ? { color: "#22c55e" } : {}))
        );
      }
    }
  }

  // Done
  push(8, `排序完成！数组已有序 [${arr}]`, { arr: [...arr], n, i: n - 1, j: null },
    arr.map(() => ({ color: "#22c55e" }))
  );

  return {
    id: `bubble-sort-${Date.now()}`,
    name: "冒泡排序（自定义）",
    category: "sorting",
    language: "C",
    code: BUBBLE_SORT_CODE,
    steps,
  };
}

/** 生成随机数组 */
export function randomArray(length: number, max = 99): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
}

/** 解析用户输入的数组字符串 */
export function parseArrayInput(input: string): number[] | null {
  const nums = input
    .split(/[,，\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);
  if (nums.length < 2 || nums.some(isNaN)) return null;
  return nums;
}
