import { useState, useCallback, useRef, useEffect } from "react";
import type { AlgorithmData, AlgorithmStep } from "../types/algorithm";
import { DEFAULT_SPEED, SPEED_MIN, SPEED_MAX } from "../constants";

interface UsePlayerReturn {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  currentData: AlgorithmStep | null;
  algorithmName: string;
  code: string;
  goToStart: () => void;
  goToEnd: () => void;
  prevStep: () => void;
  nextStep: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  jumpToStep: (step: number) => void;
}

export function usePlayer(data: AlgorithmData | null): UsePlayerReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState(DEFAULT_SPEED);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSteps = data?.steps?.length ?? 0;
  const currentData = data?.steps?.[currentStep] ?? null;
  const algorithmName = data?.name ?? "";
  const code = data?.code ?? "";

  // 切换数据时重置
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [data?.id]);

  // 播放逻辑
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, totalSteps]);

  const goToStart = useCallback(() => setCurrentStep(0), []);
  const goToEnd = useCallback(() => setCurrentStep(Math.max(0, totalSteps - 1)), [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
  }, [totalSteps]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const setSpeed = useCallback((val: number) => {
    setSpeedState(Math.max(SPEED_MIN, Math.min(SPEED_MAX, val)));
  }, []);

  const jumpToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)));
  }, [totalSteps]);

  return {
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    currentData,
    algorithmName,
    code,
    goToStart,
    goToEnd,
    prevStep,
    nextStep,
    togglePlay,
    setSpeed,
    jumpToStep,
  };
}
