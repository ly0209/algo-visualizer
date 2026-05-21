import type { AlgorithmData } from "../../types/algorithm";

const bubbleSortData: AlgorithmData = {
  id: "bubble-sort",
  name: "冒泡排序",
  category: "sorting",
  language: "C",
  code: `void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  steps: [
    {
      step: 0, line: 1,
      description: "函数开始，数组 [5,3,8,1,2]，长度 n=5",
      variables: { arr: [5, 3, 8, 1, 2], n: 5, i: null, j: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5 },
          { id: 1, value: 3 },
          { id: 2, value: 8 },
          { id: 3, value: 1 },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 1, line: 2,
      description: "外层循环 i=0，开始第一轮冒泡",
      variables: { arr: [5, 3, 8, 1, 2], n: 5, i: 0, j: null },
      graph_state: {
        nodes: [
          { id: 0, value: 5, highlight: true },
          { id: 1, value: 3 },
          { id: 2, value: 8 },
          { id: 3, value: 1 },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 2, line: 4,
      description: "比较 arr[0]=5 和 arr[1]=3，5>3，需要交换",
      variables: { arr: [5, 3, 8, 1, 2], n: 5, i: 0, j: 0 },
      graph_state: {
        nodes: [
          { id: 0, value: 5, highlight: true, swap: true },
          { id: 1, value: 3, highlight: true, swap: true },
          { id: 2, value: 8 },
          { id: 3, value: 1 },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1, color: "#ef4444" }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 3, line: 6,
      description: "交换：5 和 3 互换位置",
      variables: { arr: [3, 5, 8, 1, 2], n: 5, i: 0, j: 0 },
      graph_state: {
        nodes: [
          { id: 0, value: 3, highlight: true },
          { id: 1, value: 5, highlight: true },
          { id: 2, value: 8 },
          { id: 3, value: 1 },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 4, line: 3,
      description: "内层循环 j=1，比较 arr[1]=5 和 arr[2]=8",
      variables: { arr: [3, 5, 8, 1, 2], n: 5, i: 0, j: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5, highlight: true },
          { id: 2, value: 8, highlight: true },
          { id: 3, value: 1 },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2, color: "#ef4444" },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 5, line: 4,
      description: "5<8，不交换，继续",
      variables: { arr: [3, 5, 8, 1, 2], n: 5, i: 0, j: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5 },
          { id: 2, value: 8 },
          { id: 3, value: 1 },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 6, line: 3,
      description: "内层循环 j=2，比较 arr[2]=8 和 arr[3]=1",
      variables: { arr: [3, 5, 8, 1, 2], n: 5, i: 0, j: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5 },
          { id: 2, value: 8, highlight: true, swap: true },
          { id: 3, value: 1, highlight: true, swap: true },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3, color: "#ef4444" }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 7, line: 6,
      description: "交换：8 和 1 互换",
      variables: { arr: [3, 5, 1, 8, 2], n: 5, i: 0, j: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5 },
          { id: 2, value: 1, highlight: true },
          { id: 3, value: 8, highlight: true },
          { id: 4, value: 2 },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 8, line: 3,
      description: "j=3，比较 arr[3]=8 和 arr[4]=2",
      variables: { arr: [3, 5, 1, 8, 2], n: 5, i: 0, j: 3 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5 },
          { id: 2, value: 1 },
          { id: 3, value: 8, highlight: true, swap: true },
          { id: 4, value: 2, highlight: true, swap: true },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4, color: "#ef4444" },
        ],
      },
    },
    {
      step: 9, line: 6,
      description: "交换：8 和 2 互换，第一轮结束，最大值 8 已冒泡到末尾",
      variables: { arr: [3, 5, 1, 2, 8], n: 5, i: 0, j: 3 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5 },
          { id: 2, value: 1 },
          { id: 3, value: 2 },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 10, line: 2,
      description: "第二轮开始 i=1，只需比较前 3 个元素",
      variables: { arr: [3, 5, 1, 2, 8], n: 5, i: 1, j: null },
      graph_state: {
        nodes: [
          { id: 0, value: 3, highlight: true },
          { id: 1, value: 5 },
          { id: 2, value: 1 },
          { id: 3, value: 2 },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 11, line: 3,
      description: "j=0，比较 arr[0]=3 和 arr[1]=5，不交换",
      variables: { arr: [3, 5, 1, 2, 8], n: 5, i: 1, j: 0 },
      graph_state: {
        nodes: [
          { id: 0, value: 3, highlight: true },
          { id: 1, value: 5, highlight: true },
          { id: 2, value: 1 },
          { id: 3, value: 2 },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1, color: "#ef4444" }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 12, line: 3,
      description: "j=1，比较 arr[1]=5 和 arr[2]=1，需要交换",
      variables: { arr: [3, 5, 1, 2, 8], n: 5, i: 1, j: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 5, highlight: true, swap: true },
          { id: 2, value: 1, highlight: true, swap: true },
          { id: 3, value: 2 },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2, color: "#ef4444" },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 13, line: 6,
      description: "交换：5 和 1 互换",
      variables: { arr: [3, 1, 5, 2, 8], n: 5, i: 1, j: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 1, highlight: true },
          { id: 2, value: 5, highlight: true },
          { id: 3, value: 2 },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 14, line: 3,
      description: "j=2，比较 arr[2]=5 和 arr[3]=2，需要交换",
      variables: { arr: [3, 1, 5, 2, 8], n: 5, i: 1, j: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 1 },
          { id: 2, value: 5, highlight: true, swap: true },
          { id: 3, value: 2, highlight: true, swap: true },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3, color: "#ef4444" }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 15, line: 6,
      description: "交换：5 和 2 互换",
      variables: { arr: [3, 1, 2, 5, 8], n: 5, i: 1, j: 2 },
      graph_state: {
        nodes: [
          { id: 0, value: 3 },
          { id: 1, value: 1 },
          { id: 2, value: 2, highlight: true },
          { id: 3, value: 5, highlight: true, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 16, line: 2,
      description: "第三轮开始 i=2",
      variables: { arr: [3, 1, 2, 5, 8], n: 5, i: 2, j: null },
      graph_state: {
        nodes: [
          { id: 0, value: 3, highlight: true },
          { id: 1, value: 1 },
          { id: 2, value: 2 },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 17, line: 3,
      description: "j=0，比较 arr[0]=3 和 arr[1]=1，需要交换",
      variables: { arr: [3, 1, 2, 5, 8], n: 5, i: 2, j: 0 },
      graph_state: {
        nodes: [
          { id: 0, value: 3, highlight: true, swap: true },
          { id: 1, value: 1, highlight: true, swap: true },
          { id: 2, value: 2 },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1, color: "#ef4444" }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 18, line: 6,
      description: "交换：3 和 1 互换",
      variables: { arr: [1, 3, 2, 5, 8], n: 5, i: 2, j: 0 },
      graph_state: {
        nodes: [
          { id: 0, value: 1, highlight: true },
          { id: 1, value: 3, highlight: true },
          { id: 2, value: 2 },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 19, line: 3,
      description: "j=1，比较 arr[1]=3 和 arr[2]=2，需要交换",
      variables: { arr: [1, 3, 2, 5, 8], n: 5, i: 2, j: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 1 },
          { id: 1, value: 3, highlight: true, swap: true },
          { id: 2, value: 2, highlight: true, swap: true },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2, color: "#ef4444" },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 20, line: 6,
      description: "交换：3 和 2 互换",
      variables: { arr: [1, 2, 3, 5, 8], n: 5, i: 2, j: 1 },
      graph_state: {
        nodes: [
          { id: 0, value: 1 },
          { id: 1, value: 2, highlight: true },
          { id: 2, value: 3, highlight: true, color: "#22c55e" },
          { id: 3, value: 5, color: "#22c55e" },
          { id: 4, value: 8, color: "#22c55e" },
        ],
        edges: [
          { from: 0, to: 1 }, { from: 1, to: 2 },
          { from: 2, to: 3 }, { from: 3, to: 4 },
        ],
      },
    },
    {
      step: 21, line: 8,
      description: "排序完成！数组已有序 [1,2,3,5,8]",
      variables: { arr: [1, 2, 3, 5, 8], n: 5, i: 3, j: null },
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

export default bubbleSortData;
