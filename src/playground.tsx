/* eslint-disable @typescript-eslint/no-unused-vars */
/* =============================================
   🧪 组件实验室
   在这里引入项目中的任意组件，独立查看渲染效果
   用法：修改下方的 return 内容即可切换组件
   ============================================= */

import CodePanel from "./components/algorithm/CodePanel";
import NodeGraph from "./components/algorithm/NodeGraph";
import ControlBar from "./components/algorithm/ControlBar";
import VariablePanel from "./components/algorithm/VariablePanel";
import CustomArrayInput from "./components/algorithm/CustomArrayInput";
import Loading from "./components/common/Loading";

/* ---- 给组件准备的示例数据 ---- */

const sampleCode = 
`void bubble_sort(int arr[], int n) {
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

const sampleGraph = {
  nodes: [
    { id: 0, value: 5, highlight: true, swap: true },
    { id: 1, value: 3, highlight: true, swap: true },
    { id: 2, value: 8 },
    { id: 3, value: 1 },
    { id: 4, value: 2, color: "#22c55e" },
  ],
  edges: [
    { from: 0, to: 1, color: "#ef4444" },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
  ],
};

const sampleVariables = { arr: [3, 5, 1, 8, 2], n: 5, i: 0, j: 2 };

/* =============================================
   在下方切换你想要查看的组件
   ============================================= */

export default function Playground() {
  return (
    <div className="p-12 space-y-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-xl font-bold">🧪 组件实验室</h1>
      <p className="text-sm text-gray-500">
        编辑 <code>src/playground.tsx</code> 切换下方显示的组件
      </p>

      {/* ── 在这里切换你要看的组件 ── */}
      <div className="h-[600px] w-full">
        <NodeGraph graphState={sampleGraph} />
      </div>
    </div>
  );
}