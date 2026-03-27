# ScriptAI 部署指南

## 🚀 快速部署方案

### 方案一：Vercel + Railway（推荐）

#### 1. 前端部署到 Vercel

**步骤：**

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库 `stevenryanrobot/ScriptAI`
3. 配置构建设置：
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `out`
4. 添加环境变量：
   ```
   NEXT_PUBLIC_API_URL=https://你的后端地址.railway.app
   ```
5. 点击 Deploy

**或者使用 Vercel CLI：**
```bash
npm i -g vercel
cd apps/web
vercel login
vercel --prod
```

---

#### 2. 后端部署到 Railway

**步骤：**

1. 访问 https://railway.app/
2. 点击「New Project」→「Deploy from GitHub repo」
3. 选择 `ScriptAI` 仓库
4. 配置服务：
   - **Root Directory:** `apps/api`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. 添加环境变量：
   ```
   ARK_API_KEY=196f2871-a6ee-4644-8d31-0c01e0ce06d6
   ARK_MODEL=doubao-seed-2-0-mini-260215
   DATABASE_URL=postgresql://...
   REDIS_URL=redis://...
   ```
6. 添加 PostgreSQL 插件（Railway 内置）
7. 添加 Redis 插件（Railway 内置）
8. 点击 Deploy

---

#### 3. 数据库迁移

部署后运行：
```bash
# 在 Railway 的 API 服务中执行
prisma migrate deploy
```

---

### 方案二：自有服务器 Docker 部署

#### 1. 准备服务器

- 系统：Ubuntu 20.04+ / Debian 11+
- 配置：2 核 4G 起
- 域名（可选）：scriptai.example.com

#### 2. 安装 Docker

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
```

#### 3. 克隆项目

```bash
git clone https://github.com/stevenryanrobot/ScriptAI.git
cd ScriptAI
```

#### 4. 配置环境变量

```bash
cp .env.example .env
nano .env
# 修改：
# ARK_API_KEY=196f2871-a6ee-4644-8d31-0c01e0ce06d6
# ARK_MODEL=doubao-seed-2-0-mini-260215
```

#### 5. 启动服务

```bash
docker compose up -d
```

#### 6. 数据库迁移

```bash
docker compose exec api prisma migrate deploy
```

#### 7. 配置 Nginx（可选，用于 HTTPS）

```nginx
server {
    listen 80;
    server_name scriptai.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

### 方案三：Zeabur 一键部署（最简单）

1. 访问 https://zeabur.com/
2. 登录 GitHub
3. 点击「Deploy from GitHub」
4. 选择 `ScriptAI` 仓库
5. 自动识别前后端并部署
6. 配置环境变量
7. 完成！

---

## 🔑 环境变量清单

### 前端 (apps/web)
| 变量 | 值 | 说明 |
|------|-----|------|
| `NEXT_PUBLIC_API_URL` | 后端地址 | API 服务地址 |

### 后端 (apps/api)
| 变量 | 值 | 说明 |
|------|-----|------|
| `ARK_API_KEY` | `196f2871-a6ee-4644-8d31-0c01e0ce06d6` | 火山引擎 API 密钥 |
| `ARK_MODEL` | `doubao-seed-2-0-mini-260215` | AI 模型 |
| `DATABASE_URL` | PostgreSQL 连接串 | 数据库 |
| `REDIS_URL` | Redis 连接串 | 缓存 |

---

## ✅ 部署验证

部署完成后访问：
- 前端：https://你的域名
- API 健康检查：https://你的后端地址/health
- API 文档：https://你的后端地址/docs

---

## 🐛 常见问题

### 前端 404
- 检查 `NEXT_PUBLIC_API_URL` 是否正确
- 确认 Vercel 构建目录是 `apps/web`

### 后端连接数据库失败
- 检查 `DATABASE_URL` 格式
- 确认 PostgreSQL 插件已添加

### AI 生成失败
- 检查 `ARK_API_KEY` 是否正确
- 确认火山引擎账户有余额

---

**需要帮助？** 告诉我你选择的方案，我帮你一步步配置！
