# feat: 添加 Dashboard Builder 技能

## 概述

此 PR 添加了一个新的 Dashboard Builder 技能，用于构建全栈仪表板应用程序。该技能使用 React/Next.js + shadcn/ui + Tailwind CSS + Recharts + Express 技术栈，支持可定制的数据源。非常适合数据可视化仪表板、商业智能界面、监控系统、KPI 显示和分析平台。

## 变更内容

### 新增文件

1. **README.md** - 添加了 Dashboard Builder 技能的说明，包括位置和关键特性
2. **skills/dashboard-builder/SKILL.md** - 详细技能定义文档，包含各种仪表板组件、动画效果、CSS 样式和资源引用
3. **skills/dashboard-builder/QUICKSTART.md** - 快速入门指南，包含项目结构、初始化步骤和开发说明
4. **skills/dashboard-builder/DATA_INTEGRATION.md** - 数据集成指南，介绍如何连接不同数据源和 API 集成
5. **skills/dashboard-builder/ADDITIONAL_COMPONENTS.md** - 为大屏幕仪表板设计的额外组件，包括状态监控器、数据表、仪表图等
6. **skills/dashboard-builder/package.json** - 项目依赖配置文件
7. **skills/dashboard-builder/setup-and-run.sh** - 自动化设置和运行脚本
8. **skills/dashboard-builder/references/big-screen-ui.md** - 大屏幕 UI 设计指南
9. **skills/dashboard-builder/references/data-api-integration.md** - 数据 API 集成参考文档
10. **skills/dashboard-builder/references/recharts-patterns.md** - Recharts 图表模式参考

### 详细功能

- **仪表板组件**：包括 KPI 卡片、趋势图表、数据表、仪表图、饼图、状态监控器等
- **动画效果**：使用 Framer Motion 实现的多种动画效果
- **大屏幕优化**：专门针对大屏幕显示的 UI 设计和布局
- **数据集成**：支持 REST API、GraphQL、数据库等多种数据源
- **自动化脚本**：一键创建项目、安装依赖、启动开发服务器
- **主题支持**：专业的深色主题设计
- **响应式设计**：支持不同屏幕尺寸的响应式布局

## 技术栈

- React/Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Framer Motion
- Lucide React

## 使用方法

1. 可以使用自动化脚本快速创建新项目：
   ```bash
   ./setup-and-run.sh
   ```

2. 或者手动设置：
   - 创建 Next.js 应用
   - 安装所需的依赖
   - 添加 shadcn/ui 组件
   - 配置仪表板组件

## 测试

此技能包含全面的文档和示例组件，便于用户快速上手。所有组件都经过验证，确保在仪表板环境中正常工作。