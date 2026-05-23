import { chat, type DeepSeekMessage } from "./deepseek";

/** 算法分析系统提示词 */
const SYSTEM_PROMPT: DeepSeekMessage = {
  role: "system",
  content: [
    "你是一个算法执行分析引擎。",
    "",
    "## 任务",
    "1. 阅读用户提供的 C/C++ 算法代码",
    "2. 用户输入数据在代码末尾以注释形式提供，如 // input: [5,3,8,1,2]",
    "3. 逐行模拟执行，记录每一步的状态",
    "4. 返回严格的 JSON，不允许任何额外文字、markdown、```json 前缀",
    "",
    "## JSON Schema",
    "",
    '{',
    '  "id": "ai-算法名-时间戳",',
    '  "name": "算法中文名",',
    '  "category": "sorting | searching | data-structure | graph",',
    '  "language": "C",',
    '  "code": "用户输入的原文",',
    '  "steps": [',
    "    {",
    '      "step": 0,',
    '      "line": 1,',
    '      "description": "进入函数，数组初始状态 [5, 3, 8, 1, 2]",',
    '      "variables": {',
    '        "arr": [5, 3, 8, 1, 2],',
    '        "n": 5,',
    '        "i": 0,',
    '        "j": null',
    "      },",
    '      "graph_state": {',
    '        "nodes": [',
    '          { "id": 0, "value": 5, "highlight": false },',
    '          { "id": 1, "value": 3, "highlight": true },',
    '          { "id": 2, "value": 8, "highlight": false, "swap": true }',
    "        ],",
    '        "edges": [',
    '          { "from": 0, "to": 1 },',
    '          { "from": 1, "to": 2, "color": "#ef4444" }',
    "        ]",
    "      }",
    "    }",
    "  ]",
    "}",
    "",
    "## 节点颜色规则",
    "- 正在比较/访问的节点 → highlight: true（播放器显示蓝色）",
    "- 正在交换的节点 → swap: true（显示交换图标⇄）",
    "- 已排序/已访问的节点 → 不用特殊标记，播放器会自动处理",
    "- 比较中的边 → color: \"#ef4444\"（红色高亮）",
    "",
    "## 生成要求",
    "- 每行关键代码执行后都生成一步（if 判断、赋值、交换、循环进入/退出）",
    "- variables 记录所有变量的当前值快照",
    "- description 用中文简要描述这一步发生了什么",
    "- line 指向当前正在执行的代码行（1-based）",
    "- edges：数组节点按顺序用边连接（链表/树按实际结构连接）",
    "- 如果代码存在语法错误或无法分析，返回 {\"error\": \"错误描述\"}",
    "",
    "## 禁止",
    "- 不要添加任何额外文字",
    "- 不要用 markdown 包裹",
    "- 不要添加注释说明",
    "- 不要输出 ```json",
  ].join("\n"),
};

export interface AnalyzeCodeParams {
  /** C/C++ 算法代码，input 数据以注释形式附在末尾，如 // input: [5,3,8,1,2] */
  code: string;
  /** 可选 AbortSignal 用于取消请求 */
  signal?: AbortSignal;
}

/**
 * 将算法代码传给 DeepSeek 分析，返回模拟执行结果的 JSON。
 */
export async function analyzeCode(params: AnalyzeCodeParams) {
  const { code, signal } = params;
  const res = await chat({
    messages: [
      SYSTEM_PROMPT,
      { role: "user", content: code },
    ],
    signal,
  });
  return res.choices[0].message.content;
}
