# Usage 画板 Examples 示例卡片栅格与间距规范

**强制规则**：Usage / Examples 与 Components 的组件演示必须使用共享脚本的独立组件实例，不得直接绘制替代。属性可以持有组件实例；不得将 `icon` 属性混入 `children`。详见 [组件实例规则](component-instance-rule.md)。

本文档规定 Ant Design 组件库 `Usage · 使用场景与示例` 画板中 `Examples`（代码演示示例）区域的容器架构、栅格双列布局、卡片上下间距标准及质量检验规范。

## 官方来源与实例替换（强制）

先通过 Pen Browser 从组件的官方页面导入真实 Examples；确认卡片正文已加载，不能导入 skeleton 或空 iframe。保留官方示例标题、说明、图片、组合内容和示例范围，再在原卡片预览中逐个替换为对应的独立组件实例。不得用自行挑选或简化的 catalog 演示重建 Usage，并将其称为官方导入。保留来源 URL、选择器和导入节点记录。移除文档操作条、版本标签，交互枚举按本文规则平铺。

---

## 一、问题背景与产生原因

在之前的组件库画板维护与 DOM 示例导入过程中，Examples 区域中的示例卡片垂直排列存在以下两类严重缺陷：

1. **混用手动 `spacer` 伪节点**：
   - 依赖插入无语义的空矩形 `<div class="spacer" height="16">` 来充当间距。
   - 在进行非 iframe 化重构、替换或新增卡片时，极易遗漏 spacer，导致新卡片与相邻卡片之间间距为 `0px`（互相紧挨）。
2. **容器 `gap` 配置混乱**：
   - 有的列容器设置了 `gap: 16`，有的列未设置 `gap`（默认为 0）。
   - 当在已有 `gap: 16` 的列容器中再次残留 `spacer (16px)` 时，卡片之间的间距被放大为 `32px`。
   - 最终呈现出：**左列间距 16px、右列部分 0px、部分 16px、部分 32px** 的严重参差不齐。

---

## 二、核心架构与布局规范（强制执行）

### 1. 彻底废除 `spacer` 伪节点
* **红线要求**：在 Examples 列容器及其子卡片之间，**严格禁止插入任何名为 `spacer` 的空节点**。
* 所有已存在的 `name: "spacer"` 节点必须全部清除。

### 2. 原生 Flexbox 容器间距控制（Single Source of Truth）
所有卡片间距必须 100% 由父级 Flexbox 容器的 `gap` 属性原生控制：

| 容器层级 | 容器类型 | Layout | Gap 属性 | 尺寸规范 | 职责说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Examples 栅格容器** | `div` / `section` | `horizontal` (默认) | **`gap: 16`** | `width: "fill_container"` | 承载左、右两列，提供双列之间的水平间距 (16px) |
| **栅格列容器 (Col 1 & Col 2)** | `section` / `div` | **`layout: "vertical"`** | **`gap: 16`** | `width: "fill_container"` | 承载各自的示例卡片，提供卡片上下严格一致的垂直间距 (16px) |
| **示例卡片 (Card)** | `section` / `div` | `layout: "vertical"` | 自适应 | `width: "fill_container"` | 具体示例单元，包含演示区（Preview）与描述区（Meta） |

### 3. 单列布局规范
官方页面的列数、示例顺序及宽度关系优先，不能把所有组件强制套成双列。Flex 等官方单列页面必须保留全宽单列。仅在官方页面使用双列时使用上面的双列结构。
对于未采用双列、仅为单列纵向排列的组件（如部分简单组件）：
* 单列容器必须显式配置：`layout: "vertical"`, `gap: 16`，`width: "fill_container"`。
* 内部所有示例卡片顺序直属其下，间距严格统一为 16px。

---

## 三、示例卡片规范结构参考

```text
Usage Content (frame, x: 32, y: 160, width: 1664)
├── Header 区域 (Title, Description, Quick Reference)
└── Examples 栅格容器 (frame, layout: horizontal, gap: 16, width: fill_container)
    ├── Col 1 (frame, layout: vertical, gap: 16, width: fill_container)
    │   ├── Example Card 1 (section)
    │   ├── Example Card 2 (section)
    │   └── Example Card 3 (section)
    └── Col 2 (frame, layout: vertical, gap: 16, width: fill_container)
        ├── Example Card 4 (section)
        ├── Example Card 5 (section)
        └── Example Card 6 (section)
```

---

## 四、全库自动化巡检与修复流程

在新建组件画板或执行组件标准化重构时，必须运行以下标准化检查脚本：

```javascript
// 检查并标准化 Examples 容器列
function normalizeExampleColumn(columnNodeId) {
  const col = Get(columnNodeId, { depth: 1 });
  // 1. 清除所有 spacer 节点
  const spacers = (col.children || []).filter(c => c.name === "spacer");
  for (const s of spacers) {
    Delete(s.id);
  }
  // 2. 统一强制设置垂直布局与 gap: 16
  Update(columnNodeId, {
    layout: "vertical",
    gap: 16
  });
}
```

### 巡检验收清单 (Checklist)
- [ ] 列容器内 `spacer` 节点数量为 **0**。
- [ ] 列容器显式具备 `layout: "vertical"` 与 `gap: 16`。
- [ ] 双列父级容器显式具备 `gap: 16`。
- [ ] 示例卡片高度由内容决定，上下垂直相邻卡片之间的像素级间距恒等于 **16px**。

---

## 五、多模式示例卡片平铺（Flatten）规范

在 Ant Design 官网文档中，部分复杂示例（如 `iconPlacement` 图标位置、`size` 尺寸等）在网页端采用 `Radio.Group` 或 `Segmented` 提供交互式切换。但在设计系统与原型画板中，这类多模式示例必须遵循以下拍平原则：

### 1. 严格禁止保留切换按钮与无语义分割线
- **红线要求**：示例卡片内**严禁包含模拟切换按钮**（如 `[ start | end ]`、`[ Large | Medium | Small ]` 单选组合）以及伴随的 `Preview` 伪分割线。
- 静态画板无法提供点击切换交互，保留切换按钮会导致其他模式被隐藏，失去设计参考价值。

### 2. 全部模式平铺展示（Flatten All Modes）
- 该示例涵盖的所有枚举模式/状态，必须**在同一个 Example 卡片的预览区内全部平铺呈现**：
  - **图标位置（Icon Placement）**：同时展示 `iconPlacement="start"`（图标位于文本前）与 `iconPlacement="end"`（图标位于文本后）两套完整按钮集合。
  - **按钮尺寸（Size）**：同时展示 `size="large"`（40px）、`size="middle"`（32px）与 `size="small"`（24px）三档完整的按钮与图标组合。

### 3. 分组标签与结构标准
- 预览区容器统一设置：`padding: 24`，`gap: 20`（或 `24`），`layout: "vertical"`。
- 每个模式分组上方必须配有标准化的小标签与说明文本：
  - 标签样式：圆角 4px、浅蓝背景 `#f0f5ff`、边框 `#adc6ff`、主题色字 `#1677ff`（例如 `iconPlacement="start"`、`size="large"`）。
  - 说明文本：`fontSize: 13`，字色 `#8c8c8c`，标明规格尺寸与核心特性（如 `40px 高度 · 字号 16px · 圆角 8px`）。
- 分组内部按语义行排列（如基础按钮行、图标及图形按钮行），保持整齐优雅。


## 官方标题间距与示例标题

保留官方各级标题的独立上下间距，不得用统一 gap 替代。Flex 的 H2 为 38.4/14.4 px，H3 为 28.8/10.8 px。示例卡标题横跨演示区与说明区的边线，需按实际分隔线中心计算位置并保留不裁剪容器；不能为消除几何越界提示将其改为 y=0，导致标题与说明拥挤。说明区 padding 为 18/24/12/24。

标题验收必须同时检查外框和文字：1px 内描边中心为 meta 顶部 -0.5px；28px 标题框 y=-14.5px。文字明确设置 textAlignVertical=middle、lineHeight=1、固定 28px 高度；切换字体后重新测量宽度，避免换行。不能仅检查标题外框中心。


该规则适用于全部 Usage，而非仅 Flex。导入的标题框若为 24px，文字高度也必须为 24px；位置按实际分隔线中心减去标题框高度的一半计算，不可硬套 -14.5px。旧式平铺导入须同时调整背景与文字相对独立线条的中心；组件引用、官方示例内容与列数必须保留。扁平矢量或图片内的标题不能视为可编辑文字修复，应单独记录为待重新导入。

导入正文标题时移除空的链接锚点占位框（常见为 24px 宽的 `a` 矩形）。这些是网页悬停锚点，不应占用画布文档流。验收 H2/H3 文字左边界与 Usage 标题、示例卡片左边界一致；正文列表保留其语义缩进。
