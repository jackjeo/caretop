# Caretop 凯普软件官方网站

集产品展示、博客、论坛、工单系统于一体的品牌官网。

## 🏗️ 技术架构

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | Nuxt 3 + Vue 3 | SSR 模式，响应式设计 |
| 后端 | Go + Gin | 高性能 RESTful API |
| 数据库 | PostgreSQL 15+ | 关系型数据存储 |
| 缓存 | Redis | Session 和数据缓存 |
| 部署 | Docker Compose | 一键部署全容器化 |

## 📁 项目结构

```
caretop/
├── backend/              # Go 后端服务
│   ├── config/           # 配置文件
│   ├── database/         # 数据库迁移
│   ├── handlers/         # HTTP 处理器
│   ├── middleware/       # 中间件
│   ├── models/           # 数据模型
│   ├── routes/           # 路由定义
│   ├── utils/            # 工具函数
│   ├── docs/             # 后端文档
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/             # Nuxt 前端
│   ├── assets/          # 静态资源
│   ├── components/       # Vue 组件
│   ├── composables/     # 组合式函数
│   ├── layouts/         # 页面布局
│   ├── pages/           # 页面路由
│   ├── public/          # 公共资源
│   ├── docs/            # 前端文档
│   ├── nuxt.config.ts
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── docs/                # 项目文档
│   └── Caretop_SRS.md   # 产品需求规格书
│
├── docker-compose.yml    # 一键部署配置
└── README.md
```

## 🚀 快速部署

### 环境要求

- Docker 20.10+
- Docker Compose 2.0+

### 一键部署

```bash
# 克隆项目
git clone https://github.com/jackjeo/caretop.git
cd caretop

# 启动所有服务
docker compose up -d

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 访问服务

| 服务 | 地址 | 说明 |
|------|------|------|
| 网站首页 | http://localhost:3000 | 前端入口 |
| API 接口 | http://localhost:8080 | 后端 REST API |
| 数据库 | localhost:5432 | PostgreSQL |
| 缓存 | localhost:6379 | Redis |

### 停止服务

```bash
docker compose down      # 停止容器
docker compose down -v  # 停止并删除数据卷
```

## 📦 手动构建（可选）

```bash
# 只构建后端镜像
docker build -t caretop-api ./backend

# 只构建前端镜像
docker build -t caretop-frontend ./frontend
```

## 🌐 功能模块

- **产品展示** — MindLink / HenryIway / Remote Desktop 三大产品
- **博客系统** — 产品动态、技术文章发布
- **论坛系统** — 用户交流社区
- **工单系统** — Bug 反馈、功能建议、技术支持
- **用户体系** — 注册/登录/个人中心
- **管理后台** — 全站内容管理

## 📄 文档

- [产品需求规格书](./docs/Caretop_SRS.md)

## 🔧 开发指南

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

### 后端开发

```bash
cd backend
cp .env.example .env
go mod download
go run main.go
```

## 📄 许可证

MIT License

---

**版权所有 凯普软件 | https://www.katop.com**
