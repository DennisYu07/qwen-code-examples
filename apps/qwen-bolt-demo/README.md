# Qwen Bolt Demo

基于 Qwen Code SDK 的 AI 代码生成与预览平台，灵感来自 [Bolt.new](https://bolt.new)。

## ✨ 功能特性

- 🤖 **AI 代码生成** — 通过自然语言对话生成完整 Web 项目
- 🌐 **浏览器内运行** — 基于 WebContainer，无需服务端执行环境
- 💻 **实时代码编辑** — CodeMirror 6 编辑器，支持语法高亮
- 👁️ **实时预览** — 自动启动开发服务器，iframe 内预览
- 🖥️ **集成终端** — xterm.js 终端，支持多 Tab
- 📁 **文件上传** — 支持上传文件/文件夹，基于已有代码修改
- 🌙 **主题切换** — 亮色/暗色主题
- 🌍 **国际化** — 中文/英文双语
- 💾 **历史记录** — 自动保存聊天和代码到浏览器本地
- 📦 **项目下载** — 一键打包下载生成的项目

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### Docker 部署

```bash
# 构建镜像
docker build -t qwen-bolt-demo .

# 运行
docker run -d -p 3000:3000 --name qwen-bolt-demo qwen-bolt-demo

# 或使用 docker-compose
docker-compose up -d
```

### 使用导出的镜像

```bash
# 导入镜像
docker load -i qwen-bolt-demo.tar

# 运行
docker run -d -p 3000:3000 --name qwen-bolt-demo qwen-bolt-demo:latest
```

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 15 (App Router) |
| **语言** | TypeScript |
| **样式** | Tailwind CSS |
| **AI SDK** | @qwen-code/sdk |
| **浏览器运行时** | @webcontainer/api |
| **终端** | @xterm/xterm |
| **代码编辑器** | CodeMirror 6 |
| **主题** | next-themes |
| **国际化** | i18next |

## 📖 文档

- [**使用手册**](./USER_GUIDE.md) — 面向用户的功能说明和操作指南
- [**开发文档**](./DEVELOPMENT.md) — 面向开发者的架构设计和开发指南

## 🌐 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome 90+ | ✅ 完全支持 |
| Edge 90+ | ✅ 完全支持 |
| Safari | ⚠️ 部分支持 |
| Firefox | ❌ 不支持 |

> 推荐使用 Chrome 或 Edge 浏览器。

## 📄 License

MIT
