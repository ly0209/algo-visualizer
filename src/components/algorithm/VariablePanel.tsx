import type { VariableSnapshot } from "../../types/algorithm";

interface Props {
  variables: VariableSnapshot;
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return "—";
  if (Array.isArray(val)) return `[${val.join(", ")}]`;
  if (typeof val === "string") return `"${val}"`;
  return String(val);
}

function isActiveVariable(key: string, val: unknown): boolean {
  // 像 i, j, left, right, mid 这类循环/指针变量非空时高亮
  const pointerKeys = ["i", "j", "k", "left", "right", "mid", "low", "high", "pivot", "index", "minIdx"];
  return pointerKeys.includes(key) && val !== null && val !== undefined;
}

export default function VariablePanel({ variables }: Props) {
  const entries = Object.entries(variables);

  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 flex items-center gap-2">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 12h6m-3-3v6m-7 7h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        变量监视
      </div>
      <div className="divide-y divide-gray-50">
        {entries.map(([key, val]) => (
          <div
            key={key}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-mono ${
              isActiveVariable(key, val) ? "bg-blue-50" : ""
            }`}
          >
            <span className={`shrink-0 font-medium ${
              isActiveVariable(key, val) ? "text-blue-600" : "text-gray-500"
            }`}>
              {key}
            </span>
            <span className="text-gray-300">=</span>
            <span className={`truncate ${
              isActiveVariable(key, val) ? "text-blue-700 font-semibold" : "text-gray-700"
            }`}>
              {formatValue(val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
