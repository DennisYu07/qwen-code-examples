# Qwen Bolt Demo 开发文档

## 项目概述

Qwen Bolt Demo 是一个基于 AI 的在线代码生成与预览平台，灵感来自 Bolt.new。用户通过自然语言描述需求，AI 自动生成完整的 Web 项目代码，并在浏览器内实时运行和预览。

### 核心特性

- 🤖 **AI 代码生成** — 通过自然语言对话生成完整项目
- 🌐 **浏览器内运行** — 基于 WebContainer，无需服务端执行环境
- 💻 **实时代码编辑** — CodeMirror 6 编辑器，支持语法高亮
- 👁️ **实时预览** — 自动启动开发服务器，iframe 内预览
- 🖥️ **集成终端** — xterm.js 终端，支持多 Tab
- 🌙 **主题切换** — 亮色/暗色主题，全局统一
- 🌍 **国际化** — 中文/英文双语支持
- 💾 **历史记录** — IndexedDB 持久化聊天和文件

---

## 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 15 (App Router) |
| **语言** | TypeScript |
| **样式** | Tailwind CSS |
| **AI SDK** | @qwen-code/sdk |
| **浏览器运行时** | @webcontainer/api |
| **终端** | @xterm/xterm + jsh |
| **代码编辑器** | CodeMirror 6 |
| **主题** | next-themes |
| **国际化** | i18next + react-i18next |
| **图标** | Lucide React |
| **持久化** | IndexedDB |

---

## 项目结构

```
apps/qwen-bolt-demo/
├── src/
│   ├── app/                          # Next.js App Router 页面
│   │   ├── api/                      # API 路由
│   │   │   ├── chat/route.ts         # 聊天 API（SSE 流式响应）
│   │   │   ├── download/route.ts     # 项目下载 API
│   │   │   ├── preview/route.ts      # 预览代理 API
│   │   │   └── terminal/route.ts     # 终端 API（已废弃）
│   │   ├── workspace/page.tsx        # 工作区页面
│   │   ├── layout.tsx                # 根布局（Provider 嵌套）
│   │   ├── page.tsx                  # 首页
│   │   └── globals.css               # 全局样式
│   │
│   ├── components/                   # 组件
│   │   ├── workspace/                # 工作区子组件
│   │   │   ├── ChatHeader.tsx        # 聊天区头部
│   │   │   ├── ChatInput.tsx         # 聊天输入框
│   │   │   ├── MessageList.tsx       # 消息列表
│   │   │   ├── CodePanel.tsx         # 代码面板
│   │   │   ├── PreviewPanel.tsx      # 预览面板
│   │   │   ├── ViewModeToggle.tsx    # 视图切换（Code/Preview）
│   │   │   └── index.ts             # 统一导出
│   │   ├── CodeRenderer/            # 代码渲染器
│   │   │   ├── CodeEditorPanel.tsx   # CodeMirror 编辑器
│   │   │   ├── FileTree.tsx          # 文件树组件
│   │   │   ├── lightTheme.ts        # 亮色编辑器主题
│   │   │   └── ...
│   │   ├── Terminal/index.tsx        # 终端组件（xterm.js）
│   │   ├── TerminalPanel.tsx         # 终端面板（多 Tab）
│   │   ├── ChatHistorySidebar.tsx    # 聊天历史侧边栏
│   │   ├── FileAttachment.tsx        # 文件上传组件
│   │   ├── ThemeToggle.tsx           # 主题切换按钮
│   │   ├── ThemeProvider.tsx         # 主题 Provider
│   │   ├── LanguageSwitcher.tsx      # 语言切换器
│   │   ├── ModelSelector.tsx         # 模型选择器
│   │   ├── ModelConfigSettings.tsx   # 模型配置设置
│   │   ├── ContextSettings.tsx       # 上下文设置（知识库/文件）
│   │   ├── MarkdownRenderer.tsx      # Markdown 渲染器
│   │   ├── PlanMessage.tsx           # 计划消息组件
│   │   ├── SummaryMessage.tsx        # 总结消息组件
│   │   ├── TokenDisplay.tsx          # Token 用量显示
│   │   ├── I18nProvider.tsx          # 国际化 Provider
│   │   └── ui/Tooltip.tsx            # 通用 Tooltip
│   │
│   ├── contexts/                     # React Context
│   │   ├── ProjectContext.tsx        # 项目设置（模型配置、知识库、文件）
│   │   ├── TokenContext.tsx          # Token 用量统计
│   │   ├── EditorContext.tsx         # 编辑器设置
│   │   └── NotificationContext.tsx   # 通知管理
│   │
│   ├── hooks/                        # 自定义 Hooks
│   │   ├── useChat.ts               # 聊天管理
│   │   ├── useFiles.ts              # 文件管理（WebContainer FS）
│   │   ├── useDevServer.ts          # 开发服务器管理
│   │   ├── useWebContainer.ts       # WebContainer 实例
│   │   ├── useResizablePanel.ts     # 可拖拽面板
│   │   └── useSound.ts             # 音效
│   │
│   ├── lib/                          # 工具库
│   │   ├── webcontainer.ts          # WebContainer 单例启动
│   │   ├── chat-persistence.ts      # IndexedDB 聊天持久化
│   │   ├── file-utils.ts            # 文件工具（树转换、ZIP 下载）
│   │   ├── prompt-builder.ts        # Prompt 构建器
│   │   └── i18n.ts                  # i18next 初始化
│   │
│   └── locales/                      # 国际化翻译文件
│       ├── en/translation.json      # 英文
│       └── zh/translation.json      # 中文
│
├── Dockerfile                        # Docker 多阶段构建
├── docker-compose.yml                # Docker Compose 配置
├── server.js                         # 自定义 Next.js 服务器
├── next.config.ts                    # Next.js 配置（COOP/COEP）
├── tailwind.config.ts                # Tailwind CSS 配置
├── tsconfig.json                     # TypeScript 配置
└── package.json                      # 依赖管理
```

---

## 架构设计

### 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                      浏览器端                            │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │  首页    │  │  工作区   │  │    WebContainer        │ │
│  │ page.tsx │→│workspace/ │  │  ┌──────────────────┐  │ │
│  │          │  │ page.tsx  │  │  │ Node.js 运行时   │  │ │
│  └──────────┘  └────┬─────┘  │  │ (npm install,    │  │ │
│                     │        │  │  dev server)     │  │ │
│              ┌──────┴──────┐ │  └──────────────────┘  │ │
│              │   Hooks     │ │  ┌──────────────────┐  │ │
│              │ useChat     │ │  │ jsh 终端         │  │ │
│              │ useFiles    │←→  │ (xterm.js 渲染)  │  │ │
│              │ useDevServer│ │  └──────────────────┘  │ │
│              └──────┬──────┘ └────────────────────────┘ │
│                     │                                    │
└─────────────────────┼────────────────────────────────────┘
                      │ SSE (Server-Sent Events)
┌─────────────────────┼────────────────────────────────────┐
│                 服务端 (Next.js)                          │
│              ┌──────┴──────┐                             │
│              │ /api/chat   │                             │
│              │ route.ts    │                             │
│              └──────┬──────┘                             │
│                     │                                    │
│              ┌──────┴──────┐                             │
│              │ Qwen Code   │                             │
│              │ SDK         │                             │
│              └─────────────┘                             │
└──────────────────────────────────────────────────────────┘
```

### 数据流

1. **用户输入** → 首页输入提示词 + 可选上传文件
2. **跳转工作区** → 携带 prompt 和文件跳转到 `/workspace`
3. **发送消息** → `useChat` 通过 SSE 调用 `/api/chat`
4. **AI 生成代码** → 服务端通过 Qwen Code SDK 生成代码，流式返回
5. **文件写入** → `useFiles` 将生成的文件写入 WebContainer FS
6. **自动启动** → AI 对话完成后，`useDevServer` 自动执行 `npm install && npm run dev`
7. **实时预览** → WebContainer 监听 `server-ready` 事件，iframe 加载预览 URL

### 关键设计决策

#### WebContainer 替代服务端执行

项目使用 `@webcontainer/api` 在浏览器内运行 Node.js 环境，而非在服务端执行用户代码。这带来以下优势：

- **安全性** — 用户代码在浏览器沙箱中运行，不影响服务端
- **无状态服务端** — 服务端只负责 AI 对话，不需要管理用户工作区
- **简化部署** — 不需要为每个用户分配服务端资源

**注意**：WebContainer 需要 COOP/COEP headers 才能工作，已在 `next.config.ts` 中配置：

```typescript
headers: [
  { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]
```

#### 终端与 Shell 事件机制

终端使用自定义事件进行通信：

- `bolt:shell-ready` — Shell 准备好接收命令时触发
- `bolt:run-command` — 向终端发送命令

只有 `isPrimary` 的终端实例会监听和触发这些事件，避免多终端 Tab 时重复执行。

#### 自动启动时序控制

`useDevServer` 的自动启动逻辑会等待以下条件全部满足：

1. WebContainer 已就绪
2. 文件中包含 `package.json`
3. AI 对话已完成（`isChatLoading === false`）

这避免了 npm install 和 AI 对话同时进行导致的资源竞争。

---

## 核心模块详解

### useChat Hook

管理聊天的核心 Hook，职责包括：

- 维护消息列表和输入状态
- 通过 SSE 与 `/api/chat` 通信
- 处理流式响应和文件写入事件
- 支持附件文件（`extraFiles` 参数）
- 自动保存/恢复聊天历史（IndexedDB）
- Token 用量统计

### useFiles Hook

文件管理 Hook，职责包括：

- 维护 `files` 状态（`Record<string, string>`）
- `updateFile(path, content)` — 同时更新 React 状态和 WebContainer FS
- `loadAllFiles()` — 从 WebContainer FS 递归读取所有文件
- 自动过滤 `node_modules`、`.git`、`.cache` 以及系统配置文件（`.npmrc`、`.env`）

### useDevServer Hook

开发服务器管理 Hook，职责包括：

- 将文件挂载到 WebContainer FS
- 写入 `.npmrc`（npm 镜像加速）和 `.env`（HOST 绑定）
- 自动检测 `package.json` 中的启动脚本
- 通过 `bolt:run-command` 事件向终端发送命令
- 监听 WebContainer 的 `server-ready` 事件获取预览 URL

### WebContainer 单例

`lib/webcontainer.ts` 使用 `globalThis` 确保 WebContainer 实例在 HMR 期间不会重复创建：

```typescript
WebContainer.boot({ workdirName: 'project' })
```

`workdirName: 'project'` 使终端路径显示为 `~/project` 而非随机哈希。

---

## 开发指南

### 环境要求

- **Node.js** >= 18
- **npm** >= 9

### 本地开发

```bash
# 安装依赖
cd apps/qwen-bolt-demo
npm install

# 启动开发服务器
npm run dev

# 访问
open http://localhost:3000
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（使用 server.js） |
| `npm run dev:next` | 启动 Next.js 原生开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint |

### 添加新组件

1. 在 `src/components/` 下创建组件文件
2. 如果需要国际化，在 `src/locales/en/translation.json` 和 `src/locales/zh/translation.json` 中添加翻译 key
3. 使用 `useTranslation()` Hook 获取翻译函数

### 添加新 API 路由

在 `src/app/api/` 下创建目录和 `route.ts` 文件，遵循 Next.js App Router 约定。

### 主题适配

- 使用 Tailwind 的 `dark:` 前缀适配暗色主题
- 终端组件使用 `useTheme()` 获取当前主题，动态切换 xterm 主题
- 避免在 SSR 阶段访问主题，使用 `mounted` 状态防止 hydration 不匹配

---

## 部署

### Docker 部署

项目使用多阶段构建，最终镜像只包含运行所需文件：

```bash
# 构建镜像
cd apps/qwen-bolt-demo
docker build -t qwen-bolt-demo .

# 运行
docker run -d -p 3000:3000 --name qwen-bolt-demo qwen-bolt-demo

# 或使用 docker-compose
docker-compose up -d
```

### 导出镜像

```bash
# 导出为 tar 文件
docker save -o qwen-bolt-demo.tar qwen-bolt-demo:latest

# 在目标机器导入
docker load -i qwen-bolt-demo.tar
docker run -d -p 3000:3000 --name qwen-bolt-demo qwen-bolt-demo:latest
```

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `NODE_ENV` | `production` | 运行环境 |
| `PORT` | `3000` | 服务端口 |
| `HOSTNAME` | `0.0.0.0` | 绑定地址 |
| `NEXT_TELEMETRY_DISABLED` | `1` | 禁用 Next.js 遥测 |

---

## 注意事项

1. **COOP/COEP Headers** — WebContainer 必须在跨域隔离环境下运行，`next.config.ts` 中已配置相关 headers。如果使用反向代理（如 Nginx），需要确保这些 headers 被正确传递。

2. **浏览器兼容性** — WebContainer 需要现代浏览器支持（Chrome 90+、Edge 90+、Firefox 不支持）。

3. **npm 镜像** — `useDevServer` 会自动在 WebContainer 中写入 `.npmrc` 配置淘宝镜像源，加速国内用户的 npm install。

4. **文件大小限制** — 上传的文件会通过 URL 参数和 Context 传递，过大的文件可能导致性能问题。
