import type { AlgorithmData } from "../../types/algorithm";

const quickSortData: AlgorithmData = {
  id: "quick-sort",
  name: "快速排序",
  category: "sorting",
  language: "C",
  code: `void quick_sort(int arr[], int low, int high) {
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
}`,
  steps: [
    {
      step: 0, line: 1,
      description: "函数调用：quick_sort(arr, 0, 4) 数组 [5,3,8,1,2]",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: null, i: null, j: null, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3 },
          { id: 2, value: 8 }, { id: 3, value: 1 }, { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 1, line: 2,
      description: "low(0) < high(4)，进入分区排序",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: null, i: null, j: null, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3 },
          { id: 2, value: 8 }, { id: 3, value: 1 }, { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 2, line: 3,
      description: "选择 pivot = arr[4] = 2，作为基准值",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: null, j: null, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3 },
          { id: 2, value: 8 }, { id: 3, value: 1 },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 3, line: 4,
      description: "i = low - 1 = -1，指向小于 pivot 的区域的末尾",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: -1, j: null, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3 },
          { id: 2, value: 8 }, { id: 3, value: 1 },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 4, line: 5,
      description: "j=0，arr[0]=5 > pivot(2)，无需交换",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: -1, j: 0, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5, highlight: true },
          { id: 1, value: 3 }, { id: 2, value: 8 }, { id: 3, value: 1 },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 5, line: 5,
      description: "j=1，arr[1]=3 > pivot(2)，无需交换",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: -1, j: 1, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3, highlight: true },
          { id: 2, value: 8 }, { id: 3, value: 1 },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 6, line: 5,
      description: "j=2，arr[2]=8 > pivot(2)，无需交换",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: -1, j: 2, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3 },
          { id: 2, value: 8, highlight: true }, { id: 3, value: 1 },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 7, line: 6,
      description: "j=3，arr[3]=1 <= pivot(2)，需要交换！",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: -1, j: 3, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 }, { id: 1, value: 3 },
          { id: 2, value: 8 },
          { id: 3, value: 1, highlight: true },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 8, line: 7,
      description: "i++ -> i=0，准备交换 arr[0] 和 arr[3]",
      variables: { arr: [5, 3, 8, 1, 2], low: 0, high: 4, pivot: 2, i: 0, j: 3, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5, swap: true },
          { id: 1, value: 3 }, { id: 2, value: 8 },
          { id: 3, value: 1, swap: true },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 9, line: 10,
      description: "交换完成：5<->1，数组变为 [1, 3, 8, 5, 2]",
      variables: { arr: [1, 3, 8, 5, 2], low: 0, high: 4, pivot: 2, i: 0, j: null, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1, highlight: true },
          { id: 1, value: 3 }, { id: 2, value: 8 }, { id: 3, value: 5 },
          { id: 4, value: 2, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 10, line: 13,
      description: "遍历结束，将 pivot(2) 放到正确位置：交换 arr[1] <-> arr[4]",
      variables: { arr: [1, 3, 8, 5, 2], low: 0, high: 4, pivot: 2, i: 0, j: null, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1 }, { id: 1, value: 3, swap: true },
          { id: 2, value: 8 }, { id: 3, value: 5 },
          { id: 4, value: 2, color: "#a855f7", swap: true },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 11, line: 16,
      description: "pivot(2) 已归位！pi=1。左侧 [1] < pivot，右侧 [3,8,5] > pivot",
      variables: { arr: [1, 2, 8, 5, 3], low: 0, high: 4, pivot: 2, i: 0, pi: 1, j: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#a855f7" },
          { id: 2, value: 8 }, { id: 3, value: 5 }, { id: 4, value: 3 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 12, line: 17,
      description: "递归左半部分 quick_sort(arr, 0, 0)，只有一个元素，返回",
      variables: { arr: [1, 2, 8, 5, 3], low: 0, high: 0, pivot: null, i: null, j: null, pi: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#a855f7" },
          { id: 2, value: 8 }, { id: 3, value: 5 }, { id: 4, value: 3 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 13, line: 18,
      description: "递归右半部分 quick_sort(arr, 2, 4)，处理子数组 [8,5,3]",
      variables: { arr: [1, 2, 8, 5, 3], low: 2, high: 4, pivot: null, i: null, j: null, pi: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 8, highlight: true },
          { id: 3, value: 5, highlight: true },
          { id: 4, value: 3, highlight: true },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 14, line: 3,
      description: "选择 pivot = arr[4] = 3，作为子数组基准值",
      variables: { arr: [1, 2, 8, 5, 3], low: 2, high: 4, pivot: 3, i: null, j: null, pi: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 8 }, { id: 3, value: 5 },
          { id: 4, value: 3, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 15, line: 5,
      description: "j=2，arr[2]=8 > pivot(3)，无需交换",
      variables: { arr: [1, 2, 8, 5, 3], low: 2, high: 4, pivot: 3, i: 1, j: 2, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 8, highlight: true }, { id: 3, value: 5 },
          { id: 4, value: 3, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 16, line: 5,
      description: "j=3，arr[3]=5 > pivot(3)，无需交换",
      variables: { arr: [1, 2, 8, 5, 3], low: 2, high: 4, pivot: 3, i: 1, j: 3, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 8 }, { id: 3, value: 5, highlight: true },
          { id: 4, value: 3, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 17, line: 13,
      description: "遍历结束，将 pivot(3) 放到正确位置：交换 arr[2] <-> arr[4]",
      variables: { arr: [1, 2, 8, 5, 3], low: 2, high: 4, pivot: 3, i: 1, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 8, swap: true }, { id: 3, value: 5 },
          { id: 4, value: 3, color: "#a855f7", swap: true },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 18, line: 16,
      description: "pivot(3) 已归位！pi=2。数组变为 [1,2,3,5,8]",
      variables: { arr: [1, 2, 3, 5, 8], low: 2, high: 4, pivot: 3, i: 1, pi: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#a855f7" },
          { id: 3, value: 5 }, { id: 4, value: 8 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 19, line: 17,
      description: "递归左半部分 quick_sort(arr, 2, 1)，范围无效，返回",
      variables: { arr: [1, 2, 3, 5, 8], low: 2, high: 1, pi: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#22c55e" },
          { id: 3, value: 5 }, { id: 4, value: 8 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 20, line: 18,
      description: "递归右半部分 quick_sort(arr, 3, 4)，处理子数组 [5,8]",
      variables: { arr: [1, 2, 3, 5, 8], low: 3, high: 4, pivot: null, i: null, j: null, pi: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#22c55e" },
          { id: 3, value: 5, highlight: true },
          { id: 4, value: 8, highlight: true },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 21, line: 3,
      description: "选择 pivot = arr[4] = 8",
      variables: { arr: [1, 2, 3, 5, 8], low: 3, high: 4, pivot: 8, i: null, j: null, pi: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#22c55e" },
          { id: 3, value: 5 },
          { id: 4, value: 8, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 22, line: 6,
      description: "j=3，arr[3]=5 <= pivot(8)，i++，交换 arr[3] <-> arr[3]（自身交换）",
      variables: { arr: [1, 2, 3, 5, 8], low: 3, high: 4, pivot: 8, i: 2, j: 3, pi: null },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#22c55e" },
          { id: 3, value: 5, highlight: true },
          { id: 4, value: 8, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 23, line: 16,
      description: "pivot(8) 已归位！pi=4。左右子数组均为单个元素",
      variables: { arr: [1, 2, 3, 5, 8], low: 3, high: 4, pivot: 8, i: 3, pi: 4 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#22c55e" },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#a855f7" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 24, line: 19,
      description: "排序完成！数组已有序 [1, 2, 3, 5, 8]",
      variables: { arr: [1, 2, 3, 5, 8] },
      graph_state: {
        nodes: [
          { id: 0, value: 1, color: "#22c55e" },
          { id: 1, value: 2, color: "#22c55e" },
          { id: 2, value: 3, color: "#22c55e" },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
  ],
};

export default quickSortData;
