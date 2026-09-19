# Ant Design 设计原则画板（Principles Artboard）排版规范

本规范用于指导和约束 Ant Design 组件库设计画板中 `Principles · 设计原则` 画板（`artboard-*-principles`）的标准化重构与生成，确保视觉对齐 Ant Design 官方文档规范，杜绝图文重叠、文字悬空居中、坐标脱节等排版缺陷。

---

## 一、核心缺陷复盘与根因分析（Root Cause）

在早期 DOM 导入或 Figma 转换的 Principles 画板中，普遍存在以下三项严重排版错误：

### 1. 列表项错误继承居中对齐（`justifyContent: "center"`）
- **现象**：所有以 `◦` 开头的无序列表项（如设计原则要点、图标按钮说明、Header/Body/Footer 区域说明、按钮标签动词规范等）脱离正常的靠左阅读流，突兀地悬空在画板正中央（x ≈ 700px~800px 处）。
- **根因**：原导入器在生成 `li` 容器 frame 时，将属性错误设置成了 `justifyContent: "center"` 与 `alignItems: "center"`，且容器宽度设为了全宽（`width: 1664`），导致 flex 容器内部的 bullet marker 与文字块被强行水平居中分散。

### 2. 双栏打散与无关联绝对定位导致纵向脱节重叠
- **现象**：画板向下延伸后，左侧正文与右侧配图严重错位，甚至图片与正文直接交叉碰撞、文字浮在图片上方或跨小节覆盖。
- **根因**：
  1. 原画板顶层内容容器（`k5EorS`）使用了 `layout: "none"`（绝对定位）。
  2. 导入切片错误：官方网页原本水平对应的图文被切成了独立的左列文本组和右列图片组，但切片断点发生错位（例如小节 A 的标题留在上一帧，正文落入下一帧，而小节配图落入右侧不同的 `y` 坐标）。
  3. 左侧文本总高与右侧图片总高不一致，由于缺少行级绑定机制，两列在全局绝对坐标上随着垂直距离递增而发生严重纵向漂移和层叠冲突。

### 3. 子卡片文本宽度写死溢出
- **现象**：Do & Don't 等双列小卡片内部文字或 spacer 宽度设成了 1664px，导致文字向右横向突破 236px 的卡片边界，与相邻元素重叠。

---

## 二、标准化规格与容器体系（Layout Hierarchy）

Principles 画板必须遵循以下层级结构与布局属性：

```
artboard-*-principles (width: 1728, height: 自适应, layout: none)
  ├── Principles Title (x: 32, y: 32, fontSize: 80, fontWeight: 700, fill: #000000)
  └── Principles Content (x: 32, y: 160, width: 1664, layout: "vertical", gap: 48~56, alignItems: "start")
        ├── Section 1 (单栏或双栏行容器)
        ├── Section 2 (单栏或双栏行容器)
        └── ...
```

### 1. 画板与外壳规格
- **画板宽度**：统一为 `1728px`。
- **画板标题**：固定文本节点，位于 `(32, 32)`，内容为 `"Principles"`，`fontSize: 80`，`fontFamily: 'Inter'`，`fontWeight: '700'`，`fill: '#000000'`。
- **内容主容器**：位于 `(32, 160)`，`width: 1664`，必须使用垂直 Flex 流：
  - `layout: "vertical"`
  - `gap: 48` 或 `56`
  - `alignItems: "start"`
  - `justifyContent: "flex-start"`
  - **严禁使用 `layout: "none"` 作为内容容器的布局模式！**

### 2. 双栏小节行容器（Two-Column Row Pattern）
当小节包含文本说明与对应配图时，必须封装为一个**行级绑定的双栏容器**：
- **Row 容器属性**：
  - `layout: "horizontal"`
  - `width: 1664`
  - `gap: 48`
  - `alignItems: "start"`
  - `justifyContent: "flex-start"`
- **左侧文本列（Text Column）**：
  - `layout: "vertical"`
  - `width: 1120`
  - `gap: 16`
  - `alignItems: "start"`
  - `justifyContent: "flex-start"`
- **右侧配图列（Media/Cards Column）**：
  - `layout: "vertical"`
  - `width: 496`
  - `gap: 16`
  - `alignItems: "start"`
  - `justifyContent: "flex-start"`

> **绝对禁令**：严禁将左侧所有文字打包为一个大框、右侧所有图片打包为另一个大框！必须在每一个语义小节粒度使用 Row 容器，使左侧说明与右侧图片在同一垂直高度强绑定。

### 3. 单栏横幅容器（Full-Width Banner Pattern）
对于全局全景图（如通用按钮类型概览）：
- 容器 `width: 1664`，`layout: "vertical"`，`gap: 20`，`alignItems: "start"`。
- 图片节点 `width: 1632`，`mode: "stretch"`。

---

## 三、排版与微组件规格

### 1. 文本对齐与列表排版规范
- **标题层级**：
  - H2: `fontSize: 24, fontWeight: '600', fill: '#000000e0', lineHeight: 1.4`
  - H3: `fontSize: 18, fontWeight: '500', fill: '#000000e0', lineHeight: 1.4`
  - H4: `fontSize: 16, fontWeight: '500', fill: '#000000e0', lineHeight: 1.4`
  - 正文 P: `fontSize: 14, fontWeight: 'normal', fill: '#000000e0', lineHeight: 1.6`
- **所有文本节点**：必须为 `textAlign: "left"`，开启 `textGrowth: "fixed-width"`。
- **列表项（`li`）规范**：
  - 容器必须为：`layout: "horizontal"`, `gap: 8`, `alignItems: "start"`, `justifyContent: "flex-start"`。
  - Bullet 标记：`content: '◦'`, `fontSize: 14`, `fill: '#595959'`, `width: 12`。
  - 内容文本：`fontSize: 14`, `lineHeight: 1.5`, `fill: '#000000e0'`, `textGrowth: "fixed-width"`。
  - **严禁任何 `justifyContent: "center"`！**

### 2. 右侧配图卡片规范

#### A. 单张全宽配图卡片（Single Media Card）
- 卡片容器：`width: 496`, `fill: "#f2f4f5"`, `padding: 16`, `cornerRadius: 6`, `layout: "vertical"`。
- 图片矩形：`width: 464`, `cornerRadius: 6`, `mode: "stretch"`。

#### B. Do & Don't 双列对比卡片（Do & Don't Pair Card）
- 组合容器：`width: 496`, `layout: "horizontal"`, `gap: 24`, `alignItems: "start"`, `justifyContent: "flex-start"`。
- 单个卡片（Do 列或 Don't 列）：
  - 容器：`width: 236`, `layout: "vertical"`, `gap: 8`。
  - 配图底框：`width: 236`, `fill: "#f2f4f5"`, `padding: 16`, `cornerRadius: 6`, `layout: "vertical"`。
  - 图片节点：`width: 204`, `mode: "stretch"`。
  - 底部状态色条：`width: 236`, `height: 3`。
    - **Do 色条**：`fill: "#1677ff"`
    - **Don't 色条**：`fill: "#ff4d4f"`
  - 徽标文字：`"Do"` 或 `"Don't"`, `fontSize: 12`, `fontWeight: '600'`.
  - 说明文字：`fontSize: 12`, `fill: "#000000a6"`, `width: 236`, `textGrowth: "fixed-width"`, `lineHeight: 1.5`。
  - **禁止在 236px 的卡片内部使用任何 width > 236 的 text 或 spacer！**

---

## 四、自适应高度更新与父级联动

重构或更新 Principles 内容后，必须同步联动更新外层画板和所属组件 Section 的高度：

```javascript
// 1. 获取内容区域最大底部坐标
let maxBottom = 0;
Get("Principles Content ID", (n, ctx) => {
  if (ctx && ctx.bounds) {
    let b = ctx.bounds.y + ctx.bounds.height;
    if (b > maxBottom) maxBottom = b;
  }
});

// 2. 更新 Principles 画板高度（顶部标题 160px + 内容高度 + 底部留白 64px）
const newArtboardH = Math.ceil(160 + maxBottom + 64);
Update("artboard-*-principles", { height: newArtboardH });

// 3. 联动更新 Section 高度
const sec = Get("section-*");
let maxSecH = 0;
for (const child of sec.children) {
  if (child.height && child.height > maxSecH) {
    maxSecH = child.height;
  }
}
Update("section-*", { height: maxSecH + 90 });
```

---

## 五、验收标准（Checklist）

每次生成或更新 Principles 画板后，必须执行以下校验：
- [ ] 截取 Principles 画板完整截图（`TakeScreenshot(["artboard-*-principles"])`）。
- [ ] 检查全画板所有无序列表项 `◦` 是否严格左对齐，不存在任何居中偏移。
- [ ] 检查左侧正文与右侧配图是否在每个小节严格水平对齐，不存在上下跨节漂移或图文重叠。
- [ ] 检查 Do & Don't 卡片宽度是否为精确的 236px，无横向文字溢出。
- [ ] 检查画板高度与所属组件 Section 高度是否自动包裹全部内容，无底部截断或过量空白。
