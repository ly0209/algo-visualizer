import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import { getPresetData } from "../data/presets";
import { generateBubbleSortSteps, generateQuickSortSteps } from "../services/stepGenerator";
import NodeGraph from "../components/algorithm/NodeGraph";
import CodePanel from "../components/algorithm/CodePanel";
import VariablePanel from "../components/algorithm/VariablePanel";
import CustomArrayInput from "../components/algorithm/CustomArrayInput";
import ControlBar from "../components/algorithm/ControlBar";
import { CATEGORY_LABEL } from "../constants";
import type { AlgorithmData } from "../types/algorithm";

export default function Player() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const presetData = algorithmId ? getPresetData(algorithmId) : undefined;

  // 当前算法数据：初始为预设，支持自定义
  const [algorithmData, setAlgorithmData] = useState<AlgorithmData | null>(presetData ?? null);

  // 当 presetData 变化时同步（如切换算法）
  useEffect(() => {
    setAlgorithmData(presetData ?? null);
  }, [presetData]);

  const player = usePlayer(algorithmData);

  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = leftWidth;
  }, [leftWidth]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - dragStartX.current;
      const newWidth = dragStartWidth.current + (dx / rect.width) * 100;
      setLeftWidth(Math.min(Math.max(newWidth, 20), 80));
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // 处理自定义数组
  const handleCustomArray = useCallback((arr: number[]) => {
    let newData: AlgorithmData;
    if (algorithmData?.id === "quick-sort") {
      newData = generateQuickSortSteps(arr);
    } else {
      // 默认为冒泡排序
      newData = generateBubbleSortSteps(arr);
    }
    setAlgorithmData(newData);
  }, [algorithmData?.id]);

  const isCustom = (algorithmData?.id?.startsWith("bubble-sort-") && algorithmData?.id !== "bubble-sort") ||
    (algorithmData?.id?.startsWith("quick-sort-") && algorithmData?.id !== "quick-sort");

  // 算法不存在
  if (!algorithmData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-500">未找到该算法</p>
        <Link to="/" className="text-blue-500 hover:underline">← 返回首页</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col px-3 py-3 md:px-4 md:py-4">
      {/* 顶栏 */}
      <div className="mb-3 flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
          <span>←</span>
          <span className="hidden sm:inline">返回</span>
        </Link>
        <div className="text-center">
          <h1 className="text-base font-semibold text-gray-800 md:text-lg">{player.algorithmName}</h1>
          <span className="text-xs text-gray-400">{CATEGORY_LABEL[algorithmData.category]}</span>
        </div>
        <div className="w-12" />
      </div>

      {/* 描述信息 */}
      {player.currentData && (
        <div className="mb-3 shrink-0 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2 text-sm text-blue-700">
          <span className="font-medium">步骤 {player.currentStep + 1}：</span>
          {player.currentData.description}
        </div>
      )}

      {/* 主区域 */}
      <div
        ref={containerRef}
        className="flex flex-1 flex-col gap-3 overflow-hidden lg:flex-row lg:gap-0"
      >
        {/* 左侧：自定义数组 + 代码 + 变量监视 + 控制栏 */}
        <section
          className="flex flex-col gap-3 overflow-hidden w-full"
          style={isDesktop ? { width: `${leftWidth}%` } : undefined}
        >
          {/* 自定义数组输入 */}
          <CustomArrayInput onApply={handleCustomArray} disabled={player.isPlaying} />

          {/* 代码面板 */}
          <div className="flex-1 min-h-[150px] rounded-xl lg:rounded-l-xl lg:rounded-r-none border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 flex items-center gap-2">
              <span>{algorithmData.language}</span>
              {isCustom && (
                <span className="ml-auto text-[11px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                  自定义数组
                </span>
              )}
            </div>
            <div className="h-[calc(100%-36px)]">
              <CodePanel code={player.code} currentLine={player.currentData?.line ?? -1} />
            </div>
          </div>

          {/* 变量监视面板 */}
          {player.currentData && (
            <VariablePanel variables={player.currentData.variables} />
          )}

          {/* 控制栏 */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <ControlBar
              currentStep={player.currentStep}
              totalSteps={player.totalSteps}
              isPlaying={player.isPlaying}
              speed={player.speed}
              onPrev={player.prevStep}
              onNext={player.nextStep}
              onPlayToggle={player.togglePlay}
              onGoToStart={player.goToStart}
              onGoToEnd={player.goToEnd}
              onSpeedChange={player.setSpeed}
            />
          </div>
        </section>

        {/* 可拖拽分隔条 */}
        <div
          className={`
            relative flex shrink-0 cursor-col-resize items-center justify-center
            ${isDragging ? "bg-blue-400" : "bg-gray-200 hover:bg-blue-300"}
            transition-colors duration-150
            w-[6px] mx-0
            hidden lg:flex
          `}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute flex flex-col gap-[3px]">
            <div className="h-[3px] w-[3px] rounded-full bg-white/80" />
            <div className="h-[3px] w-[3px] rounded-full bg-white/80" />
            <div className="h-[3px] w-[3px] rounded-full bg-white/80" />
          </div>
        </div>

        {/* 拖拽中全屏蒙层 */}
        {isDragging && (
          <div className="fixed inset-0 z-50 cursor-col-resize" />
        )}

        {/* 右侧：可视化内容 */}
        <section className="flex flex-1 flex-col overflow-hidden min-h-[180px] rounded-xl lg:rounded-r-xl lg:rounded-l-none border border-gray-200 bg-white p-4 shadow-sm">
          {player.currentData ? (
            <NodeGraph graphState={player.currentData.graph_state} />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              暂无数据
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
