# Ant Design 组件库执行与校验规范指南 (Component Execution & Verification Guide)

> **版本**：v1.0.0  
> **适用范围**：`libraries/antd-6.lib.pen` 全量 70+ 组件的生成、Live Canvas Component 脚本实现、画板排版以及像素级验收。  
> **根基准**：对齐 Ant Design 官方最新发布版（v6.x）规范及视觉度量。

---

## 一、概述与核心原则

本项目旨在将 `libraries/antd-6.lib.pen` 打造成与 Ant Design 官方规范 1:1 绝对对齐的顶级专业级设计库。为了杜绝低质粗糙的静态切图拼接和脆弱的硬编码，所有组件必须基于以下三大核心原则进行构建：

1. **真实组件实例与明确属性绑定**：Usage / Examples 与 Components 中的演示必须引用可复用母体，不能直接绘制替代。母体可采用原生组合节点或叶子 Script 渲染器。Button 的 `icon` 属性持有 Icon 实例，`children` 属性持有字符串或富文本节点，二者独立。详见 `skills/antd-prototype/references/component-instance-rule.md`。
2. **物理像素绝对居中与字体度量学**：杜绝盲目依靠眼球猜测或粗暴全局偏移，必须深入字体底层 Linebox、Cap-Height 与回退字体（Fallback SC）基线模型，实现跨中英文双语环境下的绝对居中。
3. **三画板标准工业级布局**：每个组件均由标准化且具备严密数学节奏的 `Principles`、`Usage`、`Components` 三大画板组成，严禁存在游离浮空节点与破坏栅格的 spacer 伪节点。

---

## 二、Live Canvas Component 运行机制与核心约束

Pencil 画布组件（`type: "script"`）在执行渲染函数时运行在沙箱环境中，必须严格遵守以下执行规范与硬性限制：

### 1. 图元输出硬约束（红线禁令）
* **根 Inspector 与组件引用**：复合组件使用根 Script 的 `@input` 声明属性，组件值使用 `ref` 输入；返回的嵌套组件仍为真正 `ref`，禁止复制路径替代。不能仅在内部 Surface 声明属性。生成层的 ID 不是持久覆盖存储；属性引起固有尺寸变化时同步更新宿主尺寸。
* **主动承担布局计算**：由于无法依赖浏览器 Flexbox 或 AutoLayout，所有子元素（图标、文字、描边、虚线路径、分割线）的绝对坐标 `(x, y)` 以及宽高必须由脚本通过几何数学实时计算。

### 2. 编辑器外框与实例尺寸 1:1 同步
* **外框依赖约束**：Pencil 画布中选中实例时的蓝色高亮外框（Selection Bounding Box）取决于父层实例节点的 `node.width` 与 `node.height`。
* **显式写入规则**：画板中所有引用 Master 的实例节点（`type: "ref"`），其实际宽高必须显式赋予与组件当前 Props 渲染结果完全一致的数值，严禁依赖默认尺寸导致高亮框错位。

### 3. 组件缓存刷新机制
当底层 `/canvas-components/*.js` 脚本被修改后，必须通过 MCP 更新母体节点（如 `antd-button-live-origin`）的元数据时间戳以强制 Pencil 刷新全局实例缓存：
```javascript
Update("antd-button-live-origin", {
  metadata: {
    type: "antd-component",
    antd: {
      component: "Button",
      version: "6.4.3",
      updatedAt: Date.now() // 触发热更新
    }
  }
});
```

---

## 三、文本与字形纵向居中治理体系（物理居中定律）

文本在按钮或输入框中“上下看起来不居中”是组件库最容易出现的致命缺陷。在治理 Button 过程中总结出的**字形基线回退补偿法则**必须作为所有文本容器组件的标准实现：

### 1. 根因剖析：西文与中文的行盒基线落差
* **西文字体（Inter）**：大写字母高度（Cap-Height）大约占字号的 72%，字母底部严格对齐西文基线（Latin Baseline），字母上方与行盒顶部有固定比例留白。
* **中文方块字（PingFang SC）**：`Inter` 字体不包含中文字形，macOS 会自动调用苹方作为 Fallback 字体。由于中文方块字占据整个 Em-Square 区域，其排版重心和基线在西文字体内天然下沉约 **1.0px ~ 1.3px**。
* **冲突表现**：
  * 若将坐标固定为 `textY = 5`（适配英文），中文方块字（如 `步`、`确定`）会明显偏下 1px。
  * 若粗暴全局减去 1px 改为 `textY = 4`，纯英文大写（如 `Outlined`、`Primary`）则会严重顶格偏上 1px。

### 2. 标准计算模型：字符集自适应基线补偿
在计算文本 `y` 坐标时，必须按字符集进行判定与分流：

```javascript
// 1. 标准行高与基准坐标计算
const textLineHeight = Math.round(fontSize * 1.57);
const baseTextY = Math.round((finalBtnH - fontSize * 1.57) / 2);

// 2. 核心补全条件：检测是否包含 CJK 字符（回退方块字）
const hasCJK = /[\u4e00-\u9fa5]/.test(visualLabel);

// 3. 分流补偿计算：
// - 纯英文/拉丁字母：使用 baseTextY（32px 高度下为 5，保持 Outlined 留白完美对称）
// - 包含汉字字符：使用 baseTextY - 1（32px 高度下为 4，抵消苹方回退字形的自然下沉）
const textY = hasCJK ? (baseTextY - 1) : baseTextY;
```

#### 常见规格的标准坐标对照表：
| 容器高度 (Height) | 字号 (FontSize) | 纯英文坐标 `textY` | 中文/CJK 坐标 `textY` | 视觉对称性验证（400% 缩放） |
| :--- | :--- | :--- | :--- | :--- |
| **Large (40px)** | 16px | `7` | `6` | 上下留白误差 $\le 0.25\text{px}$ |
| **Middle (32px)** | 14px | `5` | `4` | 上下留白误差 $\le 0.1\text{px}$ |
| **Small (24px)** | 14px | `1` | `0` | 上下留白误差 $\le 0.25\text{px}$ |

---

## 四、矢量图形、图标与紧凑模式治理

### 1. 箭头符号文本治理（Arrow Governance）
在用户输入 `< 上一步` 或 `下一步 >` 时，ASCII 字符 `<` 和 `>` 在西文字体中的几何重心显著偏低，与中文字符并排时会导致严重高低错落。
* **治理方案**：脚本必须对输入内容进行前后缀扫描，将 `<`、`>` 自动剥离，转化为 Ant Design 官方标准矢量图标 `LeftOutlined` / `RightOutlined`，分别进行垂直几何居中：
  ```javascript
  const iconY = Math.round((finalBtnH - iconSize) / 2);
  ```

### 2. 紧凑组合边框重合（Compact Collapsed Borders）
在 `Space.Compact` 或 `Button.Group` 容器中：
* **边框重合**：相邻按钮通过水平偏移 `-1px` 避免出现 `2px` 粗边框。
* **圆角定向削平**：根据 `compactPlacement`（`start` / `middle` / `end`）将相邻侧的圆角设置为 `0`。
* **实底分割线**：针对 Solid 变体无边框的紧凑按钮，中间必须自动补齐 `1px` 半透明微分割线（`#4096FF` 或 `#FFFFFF33`）。

### 3. 矢量虚线路径算法（Dashed Path）
针对 Dashed 变体，由于 Pencil 图元不支持原生 CSS `stroke-dasharray`，必须通过数学算法动态生成沿着圆角矩形连续分布的 SVG 封闭微线段路径，保证角部圆弧过渡自然。

---

## 五、画板布局与视觉呼吸感规范 (Layout Rhythm)

组件三大画板必须严格遵循工业级栅格标准，杜绝拥挤和杂乱：

### 1. 画板基础规格
* **全画板统一宽度**：`1728px`（左右统一留白 32px）。
* **卡片宽度**：统一为 `1664px`，严禁参差不齐。
* **卡片垂直间距**：相邻卡片 `gap` 严格保持 **24px**。
* **母体归属**：组件 Master 母体（如 `antd-button-live-origin`）作为 Card 1 第一个元素入驻，画布上不留任何游离浮空节点。

### 2. 卡片内部分隔线与呼吸感规范
以 `Sizes & Shapes Matrix` 卡片为例，区段横向分隔线必须严格保持舒适的呼吸留白：
* **分隔线上方间距（内容底部 $\rightarrow$ 分隔线）**：统一为 **24px**，赋予上一区块完整的空间收尾。
* **分隔线下方间距（分隔线 $\rightarrow$ 标题 Badge）**：统一为 **20px**，标题标签绝不能紧贴或压在横线上。
* **卡片内部行距（Row Gap）**：矩阵行之间统一保持 **16px** 间距。
* **卡片底部内边距**：保留 **20px ~ 24px** 的安全留白。

```
┌──────────────────────────────────────────────────────────┐
│  Row: Large · Circle (底部 y = 262)                     │
│                                                          │
│  [ 空白间距 24px ]                                       │
│  ──────────────────────────────────────────────────────  │  <-- Size Sep (y = 286)
│  [ 空白间距 20px ]                                       │
│                                                          │
│  MIDDLE (32px · DEFAULT) (y = 306)                       │
│  [ 间距 18px ]                                           │
│  Row: Middle · Default (y = 324)                         │
└──────────────────────────────────────────────────────────┘
```

---

## 六、组件全流程校验与验收清单 (Verification Checklist)

在宣告任何组件开发或重构完成前，必须执行以下标准化质检流程：

### 1. 自动化校验流程
1. **MCP 属性自检**：调用 `execute` 读取画板节点树，确认无游离节点、无非法 `spacer` 节点、所有 `ref` 实例宽高显式同步。
2. **截屏即时审查**：调用 `TakeScreenshot([nodeId])` 输出渲染截图，肉眼检查无溢出、无截断、无重叠。
3. **高倍微距测量**：在 400% 缩放下，对关键字形（英文无下沉字母 `O`、中文方块字 `步/确`）的上边框内间距与下边框内间距进行测量，确保两端差值 $< 0.5\text{px}$。

### 2. 终审验收 Checklist（8 项铁律）
- [ ] **变体全覆盖**：Primary / Default / Dashed / Filled / Text / Link 全变体齐全。
- [ ] **交互状态全覆盖**：Normal / Hover / Active / Disabled / Loading 状态完整呈现。
- [ ] **双色环境支持**：浅色主题与深色主题（Ghost）对比度与文字反白正确。
- [ ] **双语居中合规**：纯英文与纯中文在各尺寸下物理上下留白对称，未发生顶格或下沉。
- [ ] **紧凑模式完整**：`start`、`middle`、`end` 圆角削平与边框合并正确，无 2px 粗边。
- [ ] **呼吸留白合规**：区段分隔线上方 $\ge 20\text{px}$、下方 $\ge 18\text{px}$，行距稳定在 16px。
- [ ] **高亮选框同步**：实例节点实际尺寸与动态视觉尺寸 1:1 一致，选框无错位。
- [ ] **文档与资产收纳**：Master 节点归位在 Card 1，相关设计规范同步至根目录文档。
