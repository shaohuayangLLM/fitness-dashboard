# 快速回滚指南

## 🚨 紧急回滚（3种方法）

### 方法1：Git Tag（最简单）⭐
```bash
cd /Users/ysh/Manual\ Library/ClaudeCode/fitness-dashboard
git checkout v1.0.0
vercel --prod
```

### 方法2：从备份恢复
```bash
cd /Users/ysh/Manual\ Library/ClaudeCode/fitness-dashboard
unzip backups/fitness-dashboard-v1.0.0-*.zip -d /tmp/restore
cd /tmp/restore
vercel --prod
```

### 方法3：GitHub Release
1. 访问：https://github.com/shaohuayangllm/fitness-dashboard/releases
2. 下载 v1.0.0 源代码
3. 解压并部署到Vercel

---

## 📦 创建新备份

```bash
cd /Users/ysh/Manual\ Library/ClaudeCode/fitness-dashboard
./backup.sh
```

---

## 📋 查看所有版本

```bash
# 查看Git tags
git tag -l

# 查看本地备份
ls -lh backups/

# 查看GitHub Releases
# https://github.com/shaohuayangllm/fitness-dashboard/releases
```

---

## 📖 详细文档

完整的版本信息和维护指南请查看：[RELEASE.md](./RELEASE.md)

---

**最后更新**：2026-01-05
**当前版本**：v1.0.0
**生产环境**：https://fitness.ainside.cn
