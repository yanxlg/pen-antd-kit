# Examples 画板 Iframe 示例非 Iframe 化转换规范

本文档规定 Ant Design 组件库 `Usage` / `Examples` 画板中 `iframe` 示例的排查、导入、非 iframe 化重构规范。

---

## 一、问题背景与产生原因

在 Ant Design 官方文档网站中，涉及以下特性的演示示例均采用 `<iframe src="/~demos/{demo-slug}">` 独立隔离渲染：
1. **视口固定定位（Fixed Positioning）**：如 `FloatButton`（悬浮按钮）、`Affix`（固钉）；
2. **滚动监听与视口关联（Scroll Context）**：如 `Anchor`（锚点导航）、`Form`（滑动到校验错误处）；
3. **整体视口布局容器（Viewport Shell）**：如 `Layout`（固定头部、固定侧边栏等）。

当使用 DOM 导入工具提取页面内容时，由于浏览器同源策略及 DOM 遍历限制，导入器遇到 `<iframe>` 标签时无法自动深入其内部，导致在画布上生成空白占位矩形（层级名称为 `iframe`，填充色 `#E4E4E7`，内部仅有居中的 `"iframe"` 文本）。

---

## 二、非 Iframe 化视觉规范与容器架构

严禁在画板中保留任何空白或占位 `iframe`。所有示例必须转换为**高保真非 Iframe 浏览器窗口容器**，并将官方真实组件图层精准导入放置。

### 1. 容器层级架构

有两种常见的容器表现形式，根据父级结构选择：

#### 方案 A：复用官方已有的 Mock 窗口栏（首选）
在文档导入时，官方 demo 的 `.acss-y31wgj` 容器通常已包含顶部模拟窗口栏：
- 父级卡片（`div`）：`strokeWidth: { top: 28 }`，包含左上角 3 颗 macOS 圆点（`x: 14, y: 10.5`）与白色地址栏（`x: 77, y: 5.6`）。
- **处理方式**：直接替换卡片内 index 为 1 的 `iframe` 节点，替换为 `Demo Content` 图层（`clip: true`，宽度与高度匹配），切勿在内部重复添加二次 Window Bar。

#### 方案 B：独立 Demo Preview 窗口（无外层窗口栏时使用）
若外层缺少模拟窗口栏，需构建完整的 `Demo Preview` 容器：
- 外层容器：`type: "frame", name: "Demo Preview", fill: "#ffffff", cornerRadius: 8, clip: true, stroke: "#f0f0f0"`
- Window Bar（顶部高度 28px）：
  - `height: 28, fill: "#f5f5f5", cornerRadius: [8, 8, 0, 0], layout: "horizontal", gap: 6, alignItems: "center", padding: [0, 12]`
  - 三色按钮：红 `#ff4d4f`、黄 `#faad14`、绿 `#52c41a`（尺寸 8x8，圆角 4px）。
- Demo Content：承载真实组件图层。

---

## 三、官方独立 Demo URL 路由规则与提取流程

Ant Design 官方独立 demo 的路由格式如下：
```
https://ant.design/~demos/{demo-slug}
```

### 1. 命名与映射规律
| 组件 | 示例名称 | Demo Slug (URL) | 备注 |
| :--- | :--- | :--- | :--- |
| **FloatButton** | Basic | `float-button-demo-basic` | 单按钮悬浮 |
| | Type | `float-button-demo-type` | 默认与 primary 按钮 |
| | Shape | `float-button-demo-shape` | 圆形与方形 |
| | Content | `float-button-demo-content` | 带文字描述 |
| | Tooltip | `float-button-demo-tooltip` | 气泡提示 |
| | Group | `float-button-demo-group` | 按钮组 |
| | Menu mode | `float-button-demo-group-menu` | 展开菜单模式 |
| | Controlled | `float-button-demo-controlled` | 受控展开/关闭 |
| | Placement | `float-button-demo-placement` | 四向相对定位 |
| | Draggable | `float-button-demo-draggable` | 可拖拽位置 |
| | BackTop | `float-button-demo-back-top` | 回到顶部按钮 |
| | Progress ring | `float-button-demo-progress-ring` | 环形进度条 |
| | Badge | `float-button-demo-badge` | 带徽标数/小红点 |
| | Semantic | `float-button-demo-style-class` | 语义化自定义样式 |
| **Anchor** | Basic | `anchor-demo-basic` | 双栏联动基础示例 |
| | Horizontal | `anchor-demo-horizontal` | 水平锚点导航 |
| | Target Offset | `anchor-demo-targetoffset` | 偏移量定位 (全小写) |
| | Replace History | `anchor-demo-replace` | 替换历史记录 |
| | Semantic | `anchor-demo-style-class` | 语义化自定义样式 |
| **Form** | Slide to Error | `form-demo-slide-to-error` | 表单校验滚动定位 |
| **Layout** | Sider / Fixed | `layout-demo-sider` 等 | 典型栅格布局 |

> [!TIP]
> 当 URL slug 不确定时，在浏览器中加载组件主页（如 `https://ant.design/components/anchor`），通过 Pencil `browser` 工具查询右侧目录 `div.ant-anchor-wrapper a` 的 `href`，或读取 `iframe.iframe-demo` 的 `src` 属性获取确切路径。

---

## 四、各组件排布与位置规范

### 1. FloatButton（悬浮按钮）
- 容器规格：宽度 `822.33`，高度 `360`，背景 `#fafafa`，`clip: true`，`layout: "none"`。
- 定位规则：
  - 常规单按钮：放置在右下角，`x: 758, y: 296`。
  - 双按钮/并排展示：前置按钮 `x: 688, y: 296`，后置按钮 `x: 758, y: 296`。
  - 纵向组合/带描述按钮：保持右对齐，根据自身高度向上推移计算 `y`。
  - 四向定位（Placement）：中心方块位于 `x: 361, y: 130`，四周按钮相对方块上下左右居中偏移。
  - 受控模式（Controlled）：控制开关 `Switch` 置于左上方 `x: 24, y: 24`，受控按钮置于右下角。
  - 滚动类按钮（BackTop / Progress ring）：由于页面未滚动时原生按钮具 `opacity: 0`，需配置真实可见的悬浮按钮组件，内置官方 `anticon-vertical-align-top` 矢量图标与进度描边。

### 2. Anchor（锚点导航）
- 容器规格：宽度 `1662.66`，高度 `200`，背景 `#ffffff`，`clip: true`。
- 定位规则：
  - 垂直常规（Basic / Replace / Semantic）：采用双栏横向布局（`layout: "horizontal"`）。
    - 左栏（内容模拟）：宽度 `1108.44`（66.7%），内含 Part 1、Part 2、Part 3 对应区块。
    - 右栏（锚点导航）：宽度 `554.22`（33.3%），内含真实 Anchor 链接图层，高亮当前活跃项。
  - 水平导航（Horizontal）：采用纵向布局（`layout: "vertical"`）。
    - 顶部导航条：高度 `38px`，水平排列锚点项。
    - 下方展示区：高度 `162px`，展示对应内容底色。
  - 顶部固定块（Target Offset）：
    - 顶部 Header 条：高度 `32px`，深色底（`#000000d9`），白色文字 "Fixed Top Block"。
    - 下方区域：左侧内容区 + 右侧锚点导航。

---

## 五、全量排查与验收脚本

在完成示例重构后，必须通过 Pencil MCP 的 `execute` 工具在全库各分层（`layer-general`, `layer-layout`, `layer-navigation`, `layer-data-entry`, `layer-data-display`, `layer-feedback`, `layer-other`）执行零残留检查：

```javascript
const remainingIframes = [];
const sections = [
  "layer-general", "layer-layout", "layer-navigation", 
  "layer-data-entry", "layer-data-display", "layer-feedback", "layer-other"
];

for (const sec of sections) {
  Get(sec, (node, ctx) => {
    if (node.name === "iframe" || (node.type === "text" && node.content === "iframe")) {
      remainingIframes.push({
        id: node.id,
        name: node.name,
        type: node.type,
        section: sec
      });
    }
  });
}

Print("Total remaining iframes:", remainingIframes.length);
if (remainingIframes.length > 0) {
  throw new Error("Found unresolved iframes: " + JSON.stringify(remainingIframes));
}
```

验收合格标准：
1. 全库排查脚本返回 `Total remaining iframes: 0`；
2. 画布上对应的 Usage 示例画板（如 `artboard-anchor-usage`, `artboard-floatbutton-usage` 等）截图校验无排版重叠、无溢出、无空白。
