#!/bin/bash
# ScriptAI 一键部署脚本

set -e

echo "🚀 ScriptAI 部署脚本"
echo "=================="
echo ""

# 检查 Git
if ! command -v git &> /dev/null; then
    echo "❌ 未安装 Git，请先安装"
    exit 1
fi

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "❌ 未安装 Docker，请先安装"
    exit 1
fi

echo "✅ 环境检查通过"
echo ""

# 推送代码
echo "📤 推送代码到 GitHub..."
git push origin master

echo ""
echo "✅ 代码推送成功！"
echo ""
echo "📋 下一步："
echo "1. 访问 https://vercel.com/new 部署前端"
echo "2. 访问 https://railway.app 部署后端"
echo "3. 详见 DEPLOY.md 文档"
echo ""
