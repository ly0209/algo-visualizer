interface Props {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPrev: () => void;
  onNext: () => void;
  onPlayToggle: () => void;
  onGoToStart: () => void;
  onGoToEnd: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function ControlBar({
  currentStep, totalSteps, isPlaying, speed,
  onPrev, onNext, onPlayToggle, onGoToStart, onGoToEnd, onSpeedChange,
}: Props) {
  const btnClass =
    "rounded-lg px-3 py-2 text-sm font-medium transition duration-150 select-none active:scale-95";

  return (
    <div className="space-y-3">
      {/* 进度条 */}
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-xs text-gray-400 w-16 text-right">
          {currentStep + 1} / {totalSteps}
        </span>
        <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-200"
            style={{ width: `${totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center gap-2">
        <button className={`${btnClass} bg-gray-100 text-gray-600 hover:bg-gray-200`} onClick={onGoToStart} title="跳到开头">
          ⏮
        </button>
        <button className={`${btnClass} bg-gray-100 text-gray-600 hover:bg-gray-200`} onClick={onPrev} title="上一步">
          ◀
        </button>
        <button
          className={`${btnClass} px-6 ${
            isPlaying
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={onPlayToggle}
          title={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className={`${btnClass} bg-gray-100 text-gray-600 hover:bg-gray-200`} onClick={onNext} title="下一步">
          ▶
        </button>
        <button className={`${btnClass} bg-gray-100 text-gray-600 hover:bg-gray-200`} onClick={onGoToEnd} title="跳到末尾">
          ⏭
        </button>
      </div>

      {/* 速度滑块 */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <span>慢</span>
        <input
          type="range"
          min={200}
          max={2000}
          step={100}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-28 accent-blue-500"
        />
        <span>快</span>
        <span className="ml-2 w-12 text-right">{(speed / 1000).toFixed(1)}s</span>
      </div>
    </div>
  );
}
