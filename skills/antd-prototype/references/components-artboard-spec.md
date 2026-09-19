# Components 画板规格与变体矩阵规范 (Components Artboard Spec)

**强制规则**：Usage / Examples 与 Components 的组件演示必须引用真实可复用组件实例，不得直接绘制替代。属性可以持有组件实例；不得将 `icon` 属性混入 `children`。详见 [组件实例规则](component-instance-rule.md)。

本文档规定 Ant Design 组件库 `Components · 变体规格矩阵` 画板的整体架构、边距对齐标准、卡片划分原则以及状态全量交叉覆盖规范。

---

## 一、画板基础规格与边距基准

为了保证组件库三大核心画板（`Principles`、`Usage`、`Components`）在画板树和画布视口中的绝对一致与整齐，所有组件的 Components 画板必须严格遵守以下物理基准：

| 属性 | 规格参数 | 规范说明 |
| :--- | :--- | :--- |
| **画板宽度 (Artboard Width)** | `1728px` | 全画板统一宽度（与 Principles / Usage 保持一致） |
| **主标题位置与字号** | `x: 32, y: 32`，`fontSize: 80, fontWeight: "700"` | 统一为 `"Components"` 大标题 |
| **卡片水平起始坐标** | `x: 32` | 左右留白各 32px（$32 + 1664 + 32 = 1728	ext{px}$） |
| **卡片统一宽度** | `width: 1664px` | 严格禁止卡片宽度参差不齐 |
| **卡片上下垂直间距** | `gap: 24px` | 相邻卡片纵向间距严格统一为 24px |
| **卡片起始 Y 轴** | `y: 160` | 首张卡片紧接大标题下方，顶部留白统一 |

---

## 二、Button 变体矩阵卡片架构

Button 组件作为设计系统的基础交互核心，共分为 **7 张全景卡片**，完整覆盖 Ant Design 6.4.3 官方全量属性组合：

### 1. Card 1：基础变体与状态矩阵 (Standard Variants & States)
* **包含变体（6 种）**：Primary (Solid), Default (Outlined), Dashed, Filled, Text, Link
* **交互状态（5 种）**：Normal, Hover / Focus, Active, Disabled, Loading
* **母体收纳**：正式 Master 组件（ID 从 `registry/canvas-composition.json` 读取）作为 Card 1 第一个元素（Primary Normal）正式入驻，画布上不留任何游离浮空节点。

### 2. Card 2：危险模式变体与状态矩阵 (Danger Variants & States)
* **包含变体（6 种）**：Danger Solid, Danger Outlined, Danger Dashed, Danger Filled, Danger Text, Danger Link
* **交互状态（5 种）**：Normal, Hover / Focus, Active, Disabled, Loading
* **规范要求**：全量交叉 `danger: true` 在各类背景、描边与悬浮激活态下的红色系主题反应。

### 3. Card 3：尺寸与形状矩阵 (Sizes & Shapes Matrix)
* **尺寸规格（3 级）**：
  * `Large (40px)`：文本 16px，图标 16px（圆角 8px）
  * `Middle (32px)`：文本 14px，图标 14px（圆角 6px）
  * `Small (24px)`：文本 14px，图标 12px（圆角 4px）
* **形状规格（3 种）**：
  * `Default`：标准圆角矩形
  * `Round`：胶囊全圆角（`cornerRadius = height / 2`）
  * `Circle`：正圆形图标按钮（`width = height`，四周 padding 均等绝对居中）

### 4. Card 4：预设色彩变体矩阵 (Preset Colors Matrix)
* **色系覆盖**：采样 Ant Design 13 种预设色中最具代表性的 6 种色彩（Purple, Cyan, Green, Orange, Magenta, Volcano）。
* **变体映射**：Solid, Outlined, Filled, Text 及 Disabled 状态。

### 5. Card 5：扩展特性 (Icons, Auto Space & Block)
* **图标位置**：`iconPlacement: "start"` vs `iconPlacement: "end"`
* **中文字符自动空格**：`autoInsertSpace: true`（"确 定"）vs `autoInsertSpace: false`（"确定"）
* **通栏自适应**：`block: true` 全宽按钮（适应容器 100% 宽度）

### 6. Card 6：深色背景幽灵按钮矩阵 (Ghost Variants & Dark Mode)
* **背景底色**：Ant Design 经典深蓝 Navy `#001529`（圆角 8px，边框 `#112a45`）。
* **透明背景与反色反白**：
  * Primary Ghost, Default Ghost, Dashed Ghost, Danger Solid Ghost, Danger Dashed Ghost
  * 完整覆盖 Normal, Hover / Focus, Active, Disabled, Loading
  * Disabled 状态在深色背景下采用官方标准 `#FFFFFF40` 半透明反白描边与文本。

### 7. Card 7：紧凑按钮组合 (Compact Button Groups & Space.Compact)
* **组合规范**：
  * 相邻按钮边框重合（水平偏移 -1px，避免 2px 双边框）
  * 左侧按钮：`compactPlacement: "start"`（右侧直角）
  * 中间按钮：`compactPlacement: "middle"`（双侧直角）
  * 右侧按钮：`compactPlacement: "end"`（左侧直角）
* **经典场景呈现**：
  * 文本动作组：`[ 复制 Copy ] [ 粘贴 Paste ] [ 剪切 Cut ]`
  * 图标工具栏：`[ ⯬ 靠左 ] [ ⯮ 居中 ] [ ⯯ 靠右 ]`
  * 主操作拆分下拉：`[ 保存并提交 (Primary) ] [ ⌄ ]`
  * 分段切换：`[ 日视图 ] [ 周视图 ] [ 月视图 ] [ 年视图 ]`
  * 步骤与流程：`[ < 上一步 ] [ 第 2 / 5 步 ] [ 下一步 > ]`
  * 跨尺寸紧凑组合：Large 40px Stepper 及 Small 24px Toolbar

---

## 三、实例宿主节点尺寸同步规范（强制执行）

* **原理约束**：Pencil 编辑器的蓝色选中外框（Selection Bounding Box）取决于图层节点的 `node.width` 与 `node.height`。
* **规则要求**：画板中的所有组件实例节点，其实际尺寸必须显式写入 `width` 与 `height`，且数值必须与底层组件脚本动态渲染的视觉边界**1:1 完全一致**，严禁留空或继承母体默认尺寸造成外框错位。
