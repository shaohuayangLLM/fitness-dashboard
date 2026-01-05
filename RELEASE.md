# 版本归档与回滚指南

## 📌 当前版本：v1.0.0（稳定生产版本）

**发布时间：** 2026-01-05
**Git Tag：** v1.0.0
**部署环境：** https://fitness.ainside.cn

---

## ✅ 功能特性

### 数据可视化
- ✅ 311条完整跑步记录（2021-2026）
- ✅ 4个交互式ECharts图表
  - 心率趋势图（平均心率 + 最大心率）
  - 距离趋势图（柱状图 + 渐变色）
  - 卡路里趋势图（面积图 + 红色渐变）
  - 步数趋势图（柱状图 + 绿色渐变）

### 时间维度
- ✅ 按月统计
- ✅ 按年统计
- ✅ 按周统计

### 技术特性
- ✅ 响应式设计（支持桌面端和移动端）
- ✅ 纯JavaScript（无构建工具依赖）
- ✅ ECharts 5.x 图表库
- ✅ Vercel CDN全球加速

---

## 🗂️ 项目结构

```
fitness-dashboard/
├── index.html                    # 主页面
├── vercel.json                   # Vercel配置
├── .gitignore                    # Git忽略文件
├── data/
│   ├── fitness-stats.json       # 汇总统计数据
│   └── running-records.json     # 311条详细记录（136KB）
├── js/
│   ├── data-processor.js        # 数据聚合处理
│   └── charts.js                # ECharts图表初始化
└── content/
    └── fitness/                 # 原始数据目录（已废弃）
```

---

## 🔄 版本历史

| 版本 | 日期 | 说明 | Tag |
|------|------|------|-----|
| v1.0.0 | 2026-01-05 | 稳定生产版本 | `v1.0.0` |

### 主要变更
- **数据文件迁移**：从 `content/fitness/` 移至根目录 `data/`
- **Vercel配置优化**：简化 `vercel.json`，确保静态文件正确部署
- **Git忽略优化**：添加 `.DS_Store` 等系统文件
- **域名配置**：成功配置 `fitness.ainside.cn`

---

## 🔙 回滚指南

### 方法1：使用Git Tag回滚（推荐）

```bash
# 1. 进入项目目录
cd /Users/ysh/Manual\ Library/ClaudeCode/fitness-dashboard

# 2. 查看所有可用版本
git tag -l

# 3. 回滚到 v1.0.0
git checkout v1.0.0

# 4. 确认版本
git log -1 --oneline

# 5. 如果需要重新部署
vercel --prod
```

### 方法2：使用Git Commit回滚

```bash
# 1. 查看提交历史
git log --oneline

# 2. 找到目标commit（例如：c8921ee）
git checkout c8921ee

# 3. 创建回滚分支（可选）
git checkout -b rollback-to-v1.0.0

# 4. 推送到GitHub
git push origin rollback-to-v1.0.0
```

### 方法3：从GitHub Releases下载

1. 访问：https://github.com/shaohuayangllm/fitness-dashboard/releases
2. 找到 `v1.0.0` release
3. 下载源代码zip文件
4. 解压并部署到Vercel

---

## 🚀 部署信息

### Vercel配置
- **项目名称**：fitness-dashboard
- **工作区**：shaohuayangllms-projects
- **框架**：Static（静态站点）
- **Node版本**：24.x
- **构建命令**：无需（纯静态）
- **输出目录**：根目录（`/`）

### 域名配置
- **自定义域名**：fitness.ainside.cn
- **DNS记录**：A记录 → 76.76.21.21
- **DNS服务商**：阿里云DNS
- **SSL证书**：自动管理（Vercel）

### 环境变量
- **生产环境**：无特殊环境变量
- **开发环境**：无特殊环境变量

---

## 📊 数据统计

### 运动数据汇总
- **总跑步次数**：311次
- **总距离**：1,710.44 公里
- **总时长**：164小时48分48秒
- **总卡路里**：85,604 千卡
- **总步数**：1,820,314 步

### 时间跨度
- **最早记录**：2021-05-21
- **最新记录**：2026-01-03
- **数据跨度**：约4年7个月

---

## 🔧 维护指南

### 更新数据

1. **导出新数据**（小米运动健康）
2. **运行转换脚本**：
   ```bash
   python3 /tmp/convert_running_data.py
   ```
3. **提交更改**：
   ```bash
   git add data/
   git commit -m "更新运动数据"
   git push
   ```
4. **自动部署**：Vercel会自动部署最新代码

### 创建新版本

```bash
# 1. 更新代码后，创建新tag
git tag -a v1.0.1 -m "Fitness Dashboard v1.0.1 - 描述变更"

# 2. 推送tag到GitHub
git push origin v1.0.1

# 3. 在GitHub创建Release
# 访问：https://github.com/shaohuayangllm/fitness-dashboard/releases/new
```

---

## 📞 技术支持

### 相关链接
- **GitHub仓库**：https://github.com/shaohuayangllm/fitness-dashboard
- **Vercel控制台**：https://vercel.com/shaohuayangllms-projects/fitness-dashboard
- **生产环境**：https://fitness.ainside.cn
- **Vercel部署**：https://fitness-dashboard-shaohuayangllms-projects.vercel.app

### 备份与恢复

**备份当前版本：**
```bash
# 导出完整代码
git archive v1.0.0 --format=zip --output=fitness-dashboard-v1.0.0-backup.zip

# 或导出数据文件
zip fitness-data-backup-$(date +%Y%m%d).zip data/*.json
```

**恢复数据文件：**
```bash
# 从备份恢复
unzip fitness-data-backup-20260105.zip -d data/
```

---

## ⚠️ 注意事项

1. **数据文件大小**：`running-records.json` 约136KB，包含311条记录
2. **Vercel限制**：免费版单个文件最大25MB，当前数据远低于限制
3. **DNS传播**：域名配置后可能需要10-30分钟全球生效
4. **浏览器缓存**：更新后建议清除浏览器缓存（Ctrl+Shift+R / Cmd+Shift+R）
5. **Git LFS**：当前不需要，数据文件都小于Git限制

---

**文档更新时间**：2026-01-05
**维护人员**：Claude Code & 杨绍华
