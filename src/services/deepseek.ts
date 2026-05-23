/**
 * DeepSeek API Service
 */
export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
export interface DeepSeekResponse {
  id: string;
  model: string;
  choices: { index: number; message: DeepSeekMessage; finish_reason: 'stop' | 'length' }[];
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}
function getConfig() {
  return {
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY as string | undefined,
    baseUrl: (import.meta.env.VITE_DEEPSEEK_BASE_URL as string) || 'https://api.deepseek.com',
    model: (import.meta.env.VITE_DEEPSEEK_MODEL as string) || 'deepseek-chat',
  };
}
export interface ChatParams {
  messages: DeepSeekMessage[];
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
}
export async function chat(params: ChatParams): Promise<DeepSeekResponse> {
  const { apiKey, baseUrl, model } = getConfig();
  if (!apiKey) throw new Error('Please set VITE_DEEPSEEK_API_KEY');
  const { messages, temperature = 0.7, maxTokens = 2048, signal } = params;
  const url = baseUrl + '/v1/chat/completions';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens, stream: false }),
    signal,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: 'HTTP ' + res.status } }));
    throw new Error(err.error?.message || 'Request failed');
  }
  return res.json();
}
export interface StreamChatParams extends ChatParams {
  onChunk: (text: string) => void;
  onDone?: (fullText: string) => void;
  onError?: (err: Error) => void;
}
export async function streamChat(params: StreamChatParams): Promise<string> {
  const { apiKey, baseUrl, model } = getConfig();
  if (!apiKey) throw new Error('Please set VITE_DEEPSEEK_API_KEY');
  const { messages, temperature = 0.7, maxTokens = 2048, signal, onChunk, onDone, onError } = params;
  const url = baseUrl + '/v1/chat/completions';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens, stream: true }),
    signal,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: 'HTTP ' + res.status } }));
    const e = new Error(err.error?.message || 'Request failed');
    onError?.(e); throw e;
  }
  const reader = res.body?.getReader();
  if (!reader) { const e = new Error('No response stream'); onError?.(e); throw e; }
  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content ?? '';
          fullText += content;
          onChunk(content);
        } catch { /* skip malformed chunk */ }
      }
    }
  } catch (err) {
    const wrapped = err instanceof Error ? err : new Error(String(err));
    onError?.(wrapped); throw wrapped;
  }
  onDone?.(fullText);
  return fullText;
}
