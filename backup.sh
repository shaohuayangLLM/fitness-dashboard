#!/bin/bash

# Fitness Dashboard 备份脚本
# 用于快速备份当前版本的代码和数据

set -e

VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "no-tag")
DATE=$(date +%Y%m%d-%H%M%S)
PROJECT_DIR="/Users/ysh/Manual Library/ClaudeCode/fitness-dashboard"
BACKUP_DIR="$PROJECT_DIR/backups"

# 创建备份目录
mkdir -p "$BACKUP_DIR"

echo "================================"
echo "🔄 Fitness Dashboard 备份脚本"
echo "================================"
echo ""
echo "当前版本: $VERSION"
echo "备份时间: $(date)"
echo "备份目录: $BACKUP_DIR"
echo ""

# 1. 备份完整代码（Git归档）
echo "📦 [1/4] 备份完整代码..."
git archive HEAD --format=zip --output="$BACKUP_DIR/fitness-dashboard-$VERSION-$DATE.zip"
echo "   ✅ 代码备份完成"

# 2. 备份数据文件
echo "📊 [2/4] 备份数据文件..."
zip -q "$BACKUP_DIR/fitness-data-$DATE.zip" \
    "$PROJECT_DIR/data/fitness-stats.json" \
    "$PROJECT_DIR/data/running-records.json"
echo "   ✅ 数据备份完成"

# 3. 备份版本信息
echo "📝 [3/4] 生成版本信息..."
cat > "$BACKUP_DIR/backup-info-$DATE.txt" << EOF
Fitness Dashboard 备份信息
===========================
备份时间: $(date)
Git版本: $VERSION
Git Commit: $(git rev-parse HEAD)
Git分支: $(git branch --show-current)

文件清单:
$(ls -lh "$PROJECT_DIR/data/")

部署信息:
- 生产环境: https://fitness.ainside.cn
- Vercel项目: fitness-dashboard
- 工作区: shaohuayangllms-projects
EOF
echo "   ✅ 版本信息已生成"

# 4. 清理旧备份（保留最近10个）
echo "🧹 [4/4] 清理旧备份..."
cd "$BACKUP_DIR"
ls -t *.zip | tail -n +11 | xargs rm -f 2>/dev/null || true
echo "   ✅ 旧备份已清理"

echo ""
echo "================================"
echo "✅ 备份完成！"
echo "================================"
echo ""
echo "备份文件："
ls -lh "$BACKUP_DIR" | grep "$DATE" | awk '{print "  " $9 " - " $5}'
echo ""
echo "💡 恢复方法："
echo "   unzip $BACKUP_DIR/fitness-dashboard-$VERSION-$DATE.zip"
echo ""
