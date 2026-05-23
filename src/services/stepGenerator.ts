import type { AlgorithmData, AlgorithmStep, GraphNode } from "../types/algorithm";
// 冒泡排序
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
    name: "冒泡排序",
    category: "sorting",
    language: "C",
    code: BUBBLE_SORT_CODE,
    steps,
  };
}
// 快速排序
/** 生成随机数组 */

const QUICK_SORT_CODE = `void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        int pi = i + 1;
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}`;

/** 构建节点覆盖数组，范围内可操作，范围外已排序（绿色） */
function nodeOverrides(
  len: number,
  low: number,
  high: number,
  specials: Record<number, Partial<import("../types/algorithm").GraphNode>>
): Partial<import("../types/algorithm").GraphNode>[] {
  return Array.from({ length: len }, (_, id) => {
    if (id < low || id > high) return { color: "#22c55e" };
    return specials[id] || {};
  });
}

export function generateQuickSortSteps(inputArr: number[]): AlgorithmData {
  const n = inputArr.length;
  const arr = [...inputArr];
  let stepIdx = 0;
  const steps: AlgorithmStep[] = [];

  const push = (
    line: number,
    desc: string,
    vars: Record<string, unknown>,
    nodes: Partial<GraphNode>[]
  ) => {
    const edges = nodes.slice(0, -1).map((_, i) => {
      const isComparing = nodes[i]?.highlight && nodes[i + 1]?.highlight;
      return { from: i, to: i + 1, ...(isComparing ? { color: "#ef4444" } : {}) };
    });
    steps.push({
      step: stepIdx++,
      line,
      description: desc,
      variables: vars,
      graph_state: {
        nodes: arr.map((v, id) => ({ id, value: v, ...(nodes[id] || {}) })),
        edges,
      },
    });
  };

  push(1, `函数调用：quick_sort(arr, 0, ${n - 1})，数组 [${arr}]`,
    { arr: [...arr], low: 0, high: n - 1, pivot: null, i: null, j: null, pi: null },
    []);

  /** 递归模拟快速排序 */
  function simulate(low: number, high: number) {
    if (low >= high) {
      push(2, `low(${low}) < high(${high}) 不成立，返回`,
        { arr: [...arr], low, high, pivot: null, i: null, j: null, pi: null },
        nodeOverrides(n, low, high, {}));
      return;
    }

    push(2, `low(${low}) < high(${high})，进入分区排序`,
      { arr: [...arr], low, high, pivot: null, i: null, j: null, pi: null },
      nodeOverrides(n, low, high, {}));

    const pivot = arr[high];
    push(3, `选择 pivot = arr[${high}] = ${pivot}`,
      { arr: [...arr], low, high, pivot, i: null, j: null, pi: null },
      nodeOverrides(n, low, high, { [high]: { color: "#a855f7" } }));

    let i = low - 1;
    push(4, `i = low - 1 = ${i}`,
      { arr: [...arr], low, high, pivot, i, j: null, pi: null },
      nodeOverrides(n, low, high, { [high]: { color: "#a855f7" } }));

    for (let j = low; j < high; j++) {
      push(5, `j=${j}，arr[${j}]=${arr[j]}，比较与 pivot(${pivot}) 的大小`,
        { arr: [...arr], low, high, pivot, i, j, pi: null },
        nodeOverrides(n, low, high, { [j]: { highlight: true }, [high]: { color: "#a855f7" } }));

      if (arr[j] <= pivot) {
        i++;

        if (i !== j) {
          push(6, `arr[${j}] <= pivot(${pivot})，i++=${i}，交换 arr[${i}]<->arr[${j}]`,
            { arr: [...arr], low, high, pivot, i, j, pi: null },
            nodeOverrides(n, low, high, {
              [i]: { swap: true },
              [j]: { swap: true },
              [high]: { color: "#a855f7" },
            }));

          [arr[i], arr[j]] = [arr[j], arr[i]];

          push(10, `交换完成 → [${arr}]`,
            { arr: [...arr], low, high, pivot, i, j, pi: null },
            nodeOverrides(n, low, high, {
              [i]: { highlight: true },
              [j]: { highlight: true },
              [high]: { color: "#a855f7" },
            }));
        } else {
          push(6, `arr[${j}] <= pivot(${pivot})，i++=${i}（j==i，无需交换）`,
            { arr: [...arr], low, high, pivot, i, j, pi: null },
            nodeOverrides(n, low, high, { [j]: { highlight: true }, [high]: { color: "#a855f7" } }));
        }
      } else {
        push(6, `arr[${j}] > pivot(${pivot})，无需交换`,
          { arr: [...arr], low, high, pivot, i, j, pi: null },
          nodeOverrides(n, low, high, { [j]: { highlight: true }, [high]: { color: "#a855f7" } }));
      }
    }

    const pi = i + 1;
    if (pi !== high) {
      push(13, `遍历结束，将 pivot(${pivot}) 放到正确位置：交换 arr[${pi}]<->arr[${high}]`,
        { arr: [...arr], low, high, pivot, i, j: null, pi },
        nodeOverrides(n, low, high, {
          [pi]: { swap: true },
          [high]: { swap: true, color: "#a855f7" },
        }));

      [arr[pi], arr[high]] = [arr[high], arr[pi]];
    }

    push(16, `pivot(${pivot}) 已归位！pi=${pi}`,
      { arr: [...arr], low, high, pivot, i, j: null, pi },
      nodeOverrides(n, low, high, { [pi]: { color: "#a855f7" } }));

    // 左递归
    push(17, `递归左半部分 quick_sort(arr, ${low}, ${pi - 1})`,
      { arr: [...arr], low, high: pi - 1, pivot: null, i: null, j: null, pi },
      nodeOverrides(n, low, pi - 1, { [pi]: { color: "#a855f7" } }));
    simulate(low, pi - 1);

    // 右递归
    push(18, `递归右半部分 quick_sort(arr, ${pi + 1}, ${high})`,
      { arr: [...arr], low: pi + 1, high, pivot: null, i: null, j: null, pi },
      nodeOverrides(n, pi + 1, high, {}));
    simulate(pi + 1, high);
  }

  simulate(0, n - 1);

  // Done
  push(19, `排序完成！数组已有序 [${arr}]`,
    { arr: [...arr], low: null, high: null, pivot: null, i: null, j: null, pi: null },
    Array.from({ length: n }, () => ({ color: "#22c55e" })));

  return {
    id: `quick-sort-${Date.now()}`,
    name: "快速排序",
    category: "sorting",
    language: "C",
    code: QUICK_SORT_CODE,
    steps,
  };
}
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
