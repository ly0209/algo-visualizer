/** 通用异步状态 */
export type AsyncStatus = "idle" | "loading" | "success" | "error";

/** 通用 API 响应 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/** 播放器控制状态 */
export interface PlayerState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
}
