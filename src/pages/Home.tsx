import { Link } from "react-router-dom";
import { ALGORITHM_CATEGORIES } from "../constants";
import presetDataMap from "../data/presets";

const algorithms = Object.values(presetDataMap).map(({ id, name, category }) => ({
  id, name, category,
}));

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 min-h-screen">
      {/* 页头 */}
      <header className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center justify-center gap-2">
          <span className="text-4xl">🔬</span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AlgoViz
          </h1>
        </div>
        <p className="mx-auto max-w-xl text-base text-gray-500">
          算法可视化平台 — 通过节点连线图，直观理解算法执行过程中数据的变化
        </p>
      </header>

      {/* 快捷入口 */}
      <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          to="/custom"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-white shadow-lg shadow-blue-200 transition hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span className="text-lg">🤖</span>
          <span className="font-medium">AI 自定义代码</span>
          <span className="text-sm opacity-80">→</span>
        </Link>
      </div>

      {/* 预设算法 */}
      <section>
        <h2 className="mb-6 text-center text-lg font-semibold text-gray-600">
          或者选择一个预设算法开始学习
        </h2>

        {ALGORITHM_CATEGORIES.map((cat) => {
          const items = algorithms.filter((a) => a.category === cat.id);
          if (items.length === 0) return null;
          return (
            <div key={cat.id} className="mb-8">
              <h3 className="mb-3 flex items-center gap-2 text-base font-medium text-gray-500">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {items.map((algo) => (
                  <Link
                    key={algo.id}
                    to={`/play/${algo.id}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5"
                  >
                    <div className="mb-2 text-2xl">{cat.icon}</div>
                    <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {algo.name}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 页脚 */}
      <footer className="mt-16 border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
        <p>AlgoViz — 公益免费 · 打开即用 · 研0练手项目</p>
      </footer>
    </div>
  );
}
