# Caretop Frontend

凯普软件官方网站前端服务 (Nuxt 3 + Vue 3)

## 技术栈

- **框架**: Nuxt 3 (SSR)
- **UI**: Vue 3 + TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide Icons

## 项目结构

```
caretop-frontend/
├── assets/         # 静态资源
├── components/     # Vue 组件
├── composables/    # 组合式函数
├── layouts/        # 页面布局
├── pages/          # 页面路由
├── public/         # 公共资源
├── docs/           # 项目文档
├── nuxt.config.ts
├── tailwind.config.js
├── Dockerfile
└── nginx.conf
```

## 快速开始

### 环境要求

- Node.js 18+
- npm / pnpm / yarn

### 本地运行

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

### 生产部署

```bash
# 构建
npm run build

# Docker 部署
docker-compose up -d
```

## 网站功能

- 产品展示 (MindLink / HenryIway / Remote Desktop)
- 博客系统
- 论坛系统
- 工单系统
- 用户体系
- 管理后台

## API 文档

- [产品需求规格书](./docs/Caretop_SRS.md)

## 许可证

MIT License
