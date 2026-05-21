import { useState } from "react";
import { parseArrayInput, randomArray } from "../../services/stepGenerator";

interface Props {
  onApply: (arr: number[]) => void;
  disabled?: boolean;
}

const MAX_LENGTH = 15;
const MIN_LENGTH = 2;

export default function CustomArrayInput({ onApply, disabled }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const nums = parseArrayInput(input);
    if (!nums) {
      setError("请输入有效的数字，用逗号或空格分隔");
      return;
    }
    if (nums.length < MIN_LENGTH) {
      setError(`至少需要 ${MIN_LENGTH} 个数字`);
      return;
    }
    if (nums.length > MAX_LENGTH) {
      setError(`最多 ${MAX_LENGTH} 个数字`);
      return;
    }
    setError("");
    onApply(nums);
  };

  const handleRandom = () => {
    const len = Math.floor(Math.random() * (8 - 3 + 1)) + 3; // 3~8
    const arr = randomArray(len);
    setInput(arr.join(", "));
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 flex items-center gap-2">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        自定义数组
      </div>
      <div className="p-3 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="例：9, 4, 7, 2, 6, 1"
            disabled={disabled}
            className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-mono text-gray-700 placeholder-gray-300 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50"
          />
          <button
            onClick={handleApply}
            disabled={disabled}
            className="shrink-0 rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:active:scale-100"
          >
            生成
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleRandom}
            disabled={disabled}
            className="text-xs text-blue-500 hover:text-blue-600 hover:underline disabled:opacity-50 disabled:no-underline"
          >
            🎲 随机生成
          </button>
          <span className="text-[11px] text-gray-400">
            2~{MAX_LENGTH} 个数字
          </span>
        </div>
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
