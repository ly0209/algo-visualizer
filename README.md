# AlgoViz - 算法可视化平台

AI 驱动的算法可视化平台，帮助学生通过节点连线图直观理解算法执行过程。

## 功能

- 📊 预设常见考研算法（排序、搜索、数据结构、图论）
- 🤖 用户粘贴 C/C++ 代码，AI 自动分析生成可视化
- 📱 响应式设计，支持手机、平板、PC
- 🆓 公益免费，打开即用

## 技术栈

- **前端**: React 19 + TypeScript + Vite
- **样式**: Tailwind CSS
- **可视化**: D3.js / vis-network（待集成）
- **后端**: Python FastAPI（待搭建）
- **AI**: OpenAI / Claude API（待接入）

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
algo-visualizer/
├── src/
│   ├── components/       # 通用组件
│   │   ├── common/       # 通用 UI 组件
│   │   └── algorithm/    # 算法可视化组件
│   ├── pages/            # 页面组件
│   ├── hooks/            # 自定义 Hooks
│   ├── types/            # TypeScript 类型定义
│   ├── data/             # 预设算法 JSON 数据
│   │   └── presets/
│   ├── services/         # API 服务
│   ├── utils/            # 工具函数
│   ├── constants/        # 常量定义
│   └── styles/           # 全局样式
├── public/
├── tests/
└── ...
```
