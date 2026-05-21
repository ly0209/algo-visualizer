import { useState } from "react";
import { Link } from "react-router-dom";

export default function CustomCode() {
  const [code, setCode] = useState("");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 min-h-screen">
      {/* 导航 */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline">
          <span>←</span>
          <span>返回首页</span>
        </Link>
      </div>

      {/* 标题 */}
      <div className="mb-8 text-center">
        <span className="text-3xl">🤖</span>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">AI 自定义代码</h1>
        <p className="mt-1 text-gray-500">
          粘贴你的 C/C++ 代码，AI 自动分析并生成可视化执行轨迹
        </p>
      </div>

      {/* 代码输入 */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">粘贴 C/C++ 代码</label>
          <span className="text-xs text-gray-400">建议不超过 100 行</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-64 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 resize-none"
          placeholder={`// 在此粘贴你的 C/C++ 代码...\n// 例如：冒泡排序\nvoid bubble_sort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}`}
        />
      </div>

      {/* 按钮组 */}
      <div className="flex flex-wrap gap-3">
        <button
          disabled={!code.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-200 transition hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>✨</span>
          <span>AI 分析并生成可视化</span>
        </button>
        <button
          onClick={() => setCode("")}
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          清空
        </button>
      </div>

      {/* 提示信息 */}
      <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
        <p className="mb-2 flex items-center gap-1.5 font-medium">
          <span>💡</span>
          <span>使用提示</span>
        </p>
        <ul className="ml-5 list-disc space-y-1 text-yellow-600">
          <li>目前支持 <strong>C / C++</strong> 语言</li>
          <li>请确保代码包含完整的函数定义，不要依赖外部库</li>
          <li>建议一次只分析一个算法函数</li>
          <li>生成结果仅供参考，建议结合预设算法学习</li>
        </ul>
      </div>
    </div>
  );
}
