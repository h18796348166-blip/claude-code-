# CAI生物力学研究网站

## 项目简介

这是一个专业的慢性踝关节不稳（Chronic Ankle Instability, CAI）下肢运动生物力学研究网站。网站采用Apple风格的极简设计，整合了疾病知识、临床评估、治疗方案和生物力学研究数据。

## 技术栈

- **HTML5**: 语义化标签，SEO优化
- **CSS3**: 现代样式，响应式设计
- **JavaScript (ES6+)**: 交互功能
- **ECharts 5.4.3**: 数据可视化

## 功能特性

### 1. 核心内容板块

- **疾病概述**: CAI定义、流行病学数据、IAC诊断标准
- **分类体系**: 机械性不稳（MAI）、功能性不稳（FAI）、混合型
- **病理生理学**: 发病机制、神经肌肉控制、本体感觉缺失
- **临床评估**: 症状体征、体格检查、影像学检查、功能评估量表
- **诊断与治疗**: 鉴别诊断、保守治疗、手术方案、康复计划
- **生物力学分析**: 研究方法、关键参数、数据可视化
- **文献资源**: 近5年高质量SCI文献（JCR Q1区）

### 2. 交互式数据可视化

使用ECharts实现5种交互式图表：

1. **步态周期关节角度曲线**: 对比正常vs CAI患者的踝关节背/跖屈模式
2. **地面反作用力对比**: 显示步态支撑期的力学差异
3. **肌电激活热图**: 展示步态周期中各肌肉的激活模式
4. **压力中心（COP）轨迹**: 可视化足底压力分布的动态变化
5. **患侧vs健侧对比**: 多维度生物力学参数雷达对比

### 3. 设计特点

- **Apple风格极简设计**: 大量留白，清晰的视觉层级
- **医疗蓝配色**: 专业、信赖感
- **响应式布局**: 完美适配桌面、平板、移动端
- **平滑交互**: 滚动动画、渐进式内容展示
- **无障碍设计**: 符合WCAG标准

## 文件结构

```
.
├── index.html          # 主页面
├── styles.css          # 样式表
├── script.js           # JavaScript逻辑
├── README.md           # 项目文档
└── LICENSE             # 许可证
```

## 使用方法

### 本地运行

1. 克隆或下载项目文件
2. 直接用浏览器打开 `index.html` 文件
3. 无需服务器，纯静态网站

### 在线部署

可以部署到以下平台：

- **GitHub Pages**: 免费静态网站托管
- **Netlify**: 一键部署，自动HTTPS
- **Vercel**: 快速部署，全球CDN
- **CloudFlare Pages**: 高性能静态托管

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 响应式断点

- 桌面端: > 768px
- 平板端: 480px - 768px
- 移动端: < 480px

## 性能优化

- **CSS**: 使用CSS变量，减少重复代码
- **JavaScript**: 事件委托，减少DOM操作
- **图表**: 按需加载，窗口resize时重绘
- **字体**: Google Fonts CDN，支持中英文
- **动画**: GPU加速的transform和opacity

## SEO优化

- 结构化数据（Schema.org MedicalWebPage）
- 语义化HTML标签
- Meta描述和关键词
- Open Graph标签（社交媒体分享）

## 内容来源说明

本网站内容基于以下权威来源：

- 国际踝关节联盟（International Ankle Consortium, IAC）诊断标准
- 近5年发表于AJSM、BJSM、JOSPT、Gait & Posture等顶级期刊的研究
- 临床生物力学研究的标准化测量方法

**免责声明**: 本网站内容仅供学术研究和教育参考，不构成医疗建议。具体诊疗请咨询专业医师。

## 定制化建议

### 1. 替换真实数据

当前图表使用模拟数据。如需展示真实研究数据：

1. 打开 `script.js`
2. 找到对应图表的初始化函数（如 `initGaitCycleChart`）
3. 替换数据数组为真实测量值

### 2. 添加新图表

```javascript
// 在 script.js 中添加新图表函数
function initNewChart() {
    const chartDom = document.getElementById('new-chart');
    const myChart = echarts.init(chartDom);

    const option = {
        // ECharts配置
    };

    myChart.setOption(option);
}

// 在 initializeCharts() 函数中调用
initializeCharts() {
    // ...
    initNewChart();
}
```

### 3. 修改配色方案

编辑 `styles.css` 中的CSS变量：

```css
:root {
    --primary-blue: #0071e3;     /* 主题蓝色 */
    --dark-blue: #0051a5;        /* 深蓝色 */
    --light-blue: #e8f4fd;       /* 浅蓝色 */
    /* ... */
}
```

### 4. 添加新文献

在 `index.html` 的文献板块添加新的 `.literature-item`:

```html
<div class="literature-item" data-category="biomechanics">
    <div class="lit-header">
        <span class="lit-badge q1">Q1</span>
        <span class="lit-journal">期刊名</span>
        <span class="lit-year">年份</span>
        <span class="lit-if">IF: X.X</span>
    </div>
    <h4 class="lit-title">文献标题</h4>
    <p class="lit-authors">作者列表</p>
    <p class="lit-summary">研究摘要</p>
    <div class="lit-citation">完整引用</div>
</div>
```

## 未来扩展建议

1. **多语言支持**: 添加英文版本
2. **数据库集成**: 连接后端API，动态加载文献
3. **用户交互**: 添加评论、收藏功能
4. **搜索功能**: 全站内容检索
5. **打印优化**: 增强打印样式，方便学术引用
6. **暗色模式**: 提供深色主题选项

## 开发者信息

- **项目创建**: 2024
- **技术支持**: 基于现代Web标准
- **维护状态**: 活跃维护中

## 许可证

仅供学术研究和教育用途。

---

**最后更新**: 2024年

**版本**: 1.0.0
