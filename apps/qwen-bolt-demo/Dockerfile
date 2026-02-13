# =============================================================================
# 阶段 1: 构建阶段
# =============================================================================
FROM node:20-slim AS builder

WORKDIR /app

# 更换 apt 软件源（解决内网无法访问 deb.debian.org 问题）
RUN sed -i 's/http:\/\/deb.debian.org/https:\/\/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources \
    && sed -i 's/http:\/\/security.debian.org/https:\/\/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources

# 设置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com/

# 先复制依赖文件，利用 Docker 缓存层
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，构建需要）
RUN npm install

# 复制项目所有源代码
COPY . .

# 构建 Next.js 应用（生成 .next 目录）
RUN npm run build

# =============================================================================
# 阶段 2: 运行阶段（精简镜像）
# =============================================================================
FROM node:20-slim AS runner

WORKDIR /app

# 更换 apt 软件源
RUN sed -i 's/http:\/\/deb.debian.org/https:\/\/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources \
    && sed -i 's/http:\/\/security.debian.org/https:\/\/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# 设置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com/

# 只复制生产运行所需的文件
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/next.config.ts ./next.config.ts

# 暴露端口
EXPOSE 3000

# 启动命令：使用自定义 server.js 启动 Next.js
# server.js 提供了 COOP/COEP headers 支持（WebContainer 需要）
CMD ["node", "server.js"]
