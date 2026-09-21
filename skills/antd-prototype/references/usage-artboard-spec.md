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

## 六、修复红线：只修尺寸与位置，不删官方内容

几何越界提示（`partially clipped` / `fully clipped`）只允许通过**调整尺寸和位置**消除，严禁通过删除节点来消除。

### 1. 严禁删除与官方示例对应的节点
- 卡片标题 chip、说明文本、示例行、组合控件都属于官方示例内容，**不得以「多余」「垃圾」「重复」为由删除**。
- 判定节点是否多余前，必须先打开官方页面核对对应 demo 的真实结构（行数、组合方式）。典型反例：Input「形态变体」官方为 **5 行**，第 5 行为 `Input.Search` 组合（filled 输入框 + 紧贴的 32×32 图标按钮），并非多余行；「自定义语义化 DOM 样式」的标题 chip 也不是残留节点。
- 官方示例行数 = 画板示例行数。少一行即视为缺陷。

### 2. 越界的正确修法
| 越界形态 | 正确修法 | 错误修法 |
| :--- | :--- | :--- |
| 实例宽度大于行容器（如 818 > 774） | 实例 `width: "fill_container"`，由容器约束 | 删除该行 |
| Preview 区块比卡片宽（自适应 hug） | Preview 与其内部 frame/ref 逐层改 `fill_container` | 删除区块 |
| 标题 chip 处于 y=-15 被标记裁剪 | 保持 y=-15（横跨分隔线是规范要求，见上文），不动 | 删除 chip 或把 y 改成 0 |
| 输入框 + 按钮组合行总宽超容器 | 输入框 `fill_container` + 按钮固定 32px | 删掉按钮 |

### 3. `fill_container` 使用限制
`fill_container` 只在父级为 flexbox（父节点有 `layout: vertical/horizontal`）时有效：

- 绝对定位容器（`layout: "none"`，如标题 chip、`layoutPosition: "absolute"` 的节点）**必须使用固定宽度**，用 `fill_container` 会塌陷为 0 宽并被判 `fully clipped`。
- 标题 chip 固定宽度 = 标题文字实测宽度 + 16px（内框 = 文字宽度），高度 30、`y: -15`、`cornerRadius: [6,6,0,0]`，内框 `y: 4`、高 28。
- 遍历子树批量设置 `fill_container` 时，必须排除 `layout: "none"` 的容器与其绝对定位子节点。

### 4. 图标型按钮必须显式传 `icon`
画板上 `children` 为空且 `hasIcon: true` 的按钮不会自动渲染图标，必须显式设置 `icon`（如 `icon: "SearchOutlined"`）。官方对应位置（Search 示例、Compact Style、形态变体第 5 行）均为放大镜图标，缺失即视为缺陷。

---

## 七、根因判定：组件实现 / 实例属性 / 画板结构

判定「画板与官方不一致」的根因必须按顺序取证，禁止凭观感下结论：

1. **官方源码基线**：拉 `https://raw.githubusercontent.com/ant-design/ant-design/<版本 tag>/components/<component>/demo/*.tsx`，版本以 `registry/props.antd-*.json` 为准（如 6.6.4）；同时读 `index.zh-CN.md` / `index.en-US.md` 取**非 debug 示例清单与标题**——只有非 debug 示例才进 Usage 画板。
2. **画板实例实况**：逐个 ref 实例读 `inputs` 与实例框 `width/height`（`Get(id,{depth:0})`）。注意卡片标题 chip 在 meta 区内部（`layout:'none'`、`y:-15`），不在卡片直属子节点里。
3. **组件脚本能力**：读 `canvas-components/<Component>.js` 的 `@input` 声明与实现，确认该 prop 是否被支持。
4. **官方运行时几何**（涉尺寸/圆角/间距争议时必做）：用 Pen 内置浏览器打开 `https://ant.design/components/<comp>-cn`，再 `return-element` 取目标元素的 DOM + computed style。demo 卡 id 形如 `#input-demo-search-input`（`<comp>-demo-<demoName>`），**不是** `#components-input-demo-*`；嵌套结构可直接查 `.ant-space-compact`、`.ant-input-search`、`.ant-input-search-btn`、`.ant-space-addon`。computed style 里能直接读到 `width` / `border-*-radius` / `margin-right: -1px`，比在截图上目测可靠得多。`Search.tsx` 这类渲染逻辑则以 `https://raw.githubusercontent.com/ant-design/ant-design/<version>/components/input/Search.tsx` 为准。

| 根因 | 判据 | 修复位置 |
| :-- | :-- | :-- |
| **组件实现缺口** | 实例已按官方配好 prop，但脚本不读取 / 无法渲染 | `canvas-components/*.js` |
| **实例属性配置** | 脚本支持该能力，实例 `inputs` 与官方 props 不符 | 画板实例 `Update` |
| **画板结构** | 官方存在的行 / 标题 / 描述缺失，或组件被错误建模 | 画板 `Insert` / `Copy` / `Move` |

### 1. 尺寸类属性（size / rows / autoSize）由实例框高决定，不在脚本内
`size` 只改变脚本内部几何（large 40 / middle 32 / small 24），**实例框 `height` 才是实际渲染高度**；框高与 size 不匹配时内容会被裁切。TextArea 每行 = 22px + 上下 padding 8px + 边框 2px。多行实例启用 `showCount` 时，实例高 = 官方 textarea 高 + 22（计数行在框下方，与 antd 一致）。

### 2. 脚本内渲染 antd 图标必须内联 path，禁止返回 ref
Schema 2.18 脚本**没有** `materialize` / `__bindings` 包装（那是 2.11 的 Button / Space 才有的写法），返回 `{type:'ref', ref:'antd-icon-live-origin'}` 无法解析，会导致整篇文档渲染卡死——典型表现是所有 `TakeScreenshot` 都超时到 55s 上限。
正确写法参见 `Typography.js`：

```javascript
const icons={"XxxOutlined":{"viewBox":[64,64,896,896],"paths":["M..."]}};
const icon=(name,x,y,size,fill)=>{const g=icons[name];if(!g)return;for(const p of g.paths)nodes.push({type:'path',name,x,y,width:size,height:size,viewBox:g.viewBox,geometry:p,fill});};
```

path 数据取自 `ant-design/ant-design-icons` 仓库 `packages/icons-svg/svg/{outlined|filled|two-tone}/*.svg`，**或直接抄本仓库 `canvas-components/icons/<Name>.js` 里由官方 export 生成的 `definition`**（最省事且不会抄到被改过的假数据 —— `Input.Search.js` 曾内联过一条被改过的 `LoadingOutlined`，viewBox 都不对）。

> **pen 的路径渲染不支持 `a` / `A`（椭圆弧）命令**。官方 loading 类图标（`LoadingOutlined` 等，圆弧 varied）的 `d` 里含 `a r r 0 0 0 ...`，直接贴进去只会渲出一小段残线。必须先转成等价三次贝塞尔：90° 圆弧取控制点长度 `k·r`（`k = 0.5522847498`），扫在上面的官方 loading 圆环（viewBox `0 0 1024 1024`，圆心 512,512，内径 440 / 外径 512、两端 `r=36` 圆头）可用这段 M/C/Z 表示：
>
> ```
> M512 72C755.01 72 952 268.99 952 512C952 531.88 968.12 548 988 548C1007.88 548 1024 531.88 1024 512C1024 229.23 794.77 0 512 0C492.12 0 476 16.12 476 36C476 55.88 492.12 72 512 72Z
> ```
>
> 校验方式：`Export` scale=8 后把该区域打 ASCII 点阵，应是一条 **1~2px 粗的 90° 细圆弧**（@14px 时线宽 72/1024·14 ≈ 1px），不是粗圆环。

### 3. 新增节点必须触发重排；成组节点优先 Copy 现成子树
插入到 flex 父级的节点会残留旧坐标（父级自身可能已重排，但子树仍是旧值并持续报 `clipped`）。解法：`Move(id, parent, index)` 让父级重新布局。**卡片 meta 区（标题 chip + 描述）这类成组结构，直接 `Copy(同类卡片的 meta 节点, 目标卡片)` 复制现成子树再改文字**，比逐个 `Insert` 稳定得多。
卡片本体还需与同类卡一致：`fill:"#FFFFFF"`、`stroke:"#0505050f"`、`strokeWidth:1`、`cornerRadius:8`、`padding:1`、`strokeAlignment:"inner"`；meta 区 `cornerRadius:[0,0,6,6]`，chip `x:16 y:-15 h:30 radius[6,6,0,0]` + 内框 `x:8 y:4 h:28`，描述容器 `padding:[18,24,12,24]`、文字 `AlibabaSans 14`、`lineHeight:2`。

### 4. Input 能力清单（对齐 antd 6.6.4 后）
`prefixIcon` / `suffixIcon`（传 antd 图标名，如 `UserOutlined`）、`showCount` + `countMax` + `countStrategy`（`length` | `runes`，emoji 按 1 计）、`password`（自动渲染 `EyeInvisibleOutlined`）、`otp` + `otpLength` / `otpSeparator` / `otpMask`；清除图标用 `CloseCircleFilled`、搜索态按钮用 `SearchOutlined`。suffix 区顺序按 antd 为 `[清除][后缀文本][后缀图标][眼睛][字数]`。

### 5. 实例值的原则
实例 props 以官方 demo 为准；仅当官方初始值会让示例要展示的对象完全不可见时（例如 `allowClear` 需要 `value` 才显示清除图标），才补充「展示态」的值，并在交付说明中标注该有意偏离。

### 6. `Space.Compact` / `Space.Addon` 组合必须用真实实例
官方 demo 出现 `<Space.Compact><Space.Addon>https://</Space.Addon><Search/></Space.Compact>` 时，**必须实例化库中的 `Space.Compact` / `Space.Addon` 定义，禁止手绘一个带圆角的矩形冒充 Addon**。

- Compact 的子槽容器固定为 `layout:'horizontal'`、`gap:-1`、`height:32`；`gap:-1` 的作用是抵消相邻的两个 1px 描边，形成 antd 的 collapsed border。
- **`Input.Search` 内部永远有一个按钮**。antd 6 源码（`components/input/Search.tsx`）的渲染是 `<Compact><Input/>{button}</Compact>`，`button` 恒存在：无 `enterButton` 时是 `<Button color="default" icon={<SearchOutlined/>}/>`（32×32 方形文字按钮），有 `enterButton` 时是 primary 实心按钮。所以「第三行右侧那个圆角框」不是多余节点，就是 Search 自己的按钮。
- **圆角归属由「整段 Search 在外层 Compact 中的位置」决定，与有没有 enterButton 无关**：
  - 输入框：`[TL, TR, BR, BL]`，左侧圆角 ⟸ 外层 `start` 或 `none`，**右侧恒为 0**（其右侧永远挨着自带的按钮）；
  - 按钮：左侧恒为 0（挨着输入框），右侧圆角 ⟸ 外层 `end` 或 `none`。
  - 即 `inputRadius = [outerStart ? r : 0, 0, 0, outerStart ? r : 0]`、`btnRadius = [0, outerEnd ? r : 0, outerEnd ? r : 0, 0]`，`outerStart = placement∈{start,none}`、`outerEnd = placement∈{end,none}`。
  - **反例（踩过）**：把「输入框右侧是否圆角」绑在 `hasButton`（有没有 `enterButton` 文字）上 —— 于是无 enterButton 的 `end` 场景给输入框加了右圆角，交界处出现「输入框圆角 + 3px 白缝 + 按钮圆角」，看起来像两个脱开的控件。
- 按钮与输入框的描边用 1px 重叠（`btnX = inputW - 1`，等价于 antd 的 `margin-right:-1px`）合并成一列。
- 校验：交界处只应有 **一列 1px 描边**（`#D9D9D9`），左为 Addon 背景 `#F5F5F5`（`#0000000A` 叠白）、右为输入框白底。出现两列描边、白缝或圆角缺口即为失败。**量测方法：沿控件顶边（`y = rowTop`）扫一条线**——圆角缺陷只在顶/底边暴露（中线处描边本就重合，看不出来）。

### 7. 脚本文本对齐必须给 `textGrowth:"fixed-width"`
`textAlign:"center"` 仅在 `textGrowth` 为 `fixed-width` / `fixed-width-height` 时生效；默认的 `textGrowth:"auto"` 会忽略 `width`，居中静默失效 —— 这是 `enterButton` 标签左对齐的根因。`Button.js` 的既有写法就是 `textGrowth:'fixed-width' + textAlign:'center'`，新脚本照抄即可。

### 8. 像素级校验：Export 产物必须先与白底合成
`Export(...,'png')` 写出的是 **RGBA**。直接 `Image.open(p).convert('RGB')` 会把 `alpha=0` 的透明区压成 `#000000`，看上去像「整块黑板」，从而误判为渲染崩坏。必须先合成：

```python
img = Image.alpha_composite(Image.new("RGBA", img.size, (255,255,255,255)), img.convert("RGBA")).convert("RGB")
```

另外：从右侧量测按钮内文字是否居中时，`suffix` 图标与 `enterButton` 同为 `#1677FF`，会污染蓝色 bbox；应只在距右边缘 90px 内取色，或避开图标区后再取 min/max。

### 9. 宽度必须逐项显式配置，禁止一律 `fill_container`
官方 demo 里每一行的宽度都是**具体数字**，不随画板卡片宽度变化。实例框宽一律写成显式 px（`fill_container` 只在官方确实是 100% 宽时使用），并逐行对齐官方。

**取官方几何的方法**：用内置浏览器打开官方文档页，按行读 computed style——
`#input-demo-search-input .ant-space-item:nth-child(N) > .ant-input-search`（第 3 行取 `.ant-space-compact`）。每次只查一个选择器，整段 demo 的 DOM 会超出上下文。

**Input「Search box」官方实测（antd 6.6.4）**：

| 行 | 源码 | 总宽 | 高 | 内部构成 |
|:--|:--|--:|--:|:--|
| 1 | `<Search style={{width:200}}/>` | 200 | 32 | input 169 + 按钮 32 − 1 |
| 2 | `<Search allowClear style={{width:200}}/>` | 200 | 32 | affix 169 + 按钮 32 − 1 |
| 3 | `<Compact><Addon>https://</Addon><Search/></Compact>` | 301.3 | 32 | Addon 76.3 + Search 226（affix 195 + 按钮 32 − 1）− 1 |
| 4 | `<Search enterButton/>` | 302.7 | 32 | input 257.7 + 按钮 46 − 1 |
| 5 | `<Search allowClear enterButton="Search" size="large"/>` | 302.7 | 40 | affix 220 + 按钮 83.7 − 1 |
| 6 | 第 5 行 + `suffix` | 302.7 | 40 | affix 220（input 176 + suffix 16 + 4） + 按钮 83.7 − 1 |

其中只有前两行的 200 是源码写死的；第 3~6 行官方都是 `width: 100%` —— **这个值随官网容器变**（同一 DOM 在不同视口量到 300.3 / 302.7 / 307.2 / 836 都在发生），没有唯一官方像素值。

**画板口径（已与用户确认）**：`width: 100%` 的行一律 **撑满卡片内容区（774）**；源码写死的行照抄数字（如 200）；`inline-flex` 的 fit-content 行（如 `Space.Compact`）按内容计算（Addon 76.3 + Search 225 − 1 = **300.3**）。不要给全宽行钉一个 ~300 的固定值 —— 官网截图里它们撑满整个 demo 区，钉短了观感就偏。

**按钮宽度的三条规则**（覆盖 `Button` 的 `padding: 0 15px` + 1px 描边）：

- 有 `enterButton` 文字 → `文字宽 + 32`（large 的 "Search" = 51.7 + 32 = 83.7）；
- `enterButton={true}`（只有图标）→ **不套用 `ant-btn-icon-only`**，仍是 `图标 14/16 + 32` = 46 / 48，不是正方形 32；
- 无 `enterButton` → `ant-btn-icon-only`，`width = height`（32 / 40 / 24）。

**输入框与按钮的矩形归属**：两者在共享的那 1px 描边上重叠（antd 的 `margin-right:-1px`）。按官方取值——输入框 `W − btnW + 1`、按钮 `btnW`、按钮 x = `W − btnW`——这样两个矩形的宽度能与官方逐个对上（169 / 32、257.7 / 46、220 / 83.7），总宽仍恒等于 W。

**水平内边距**：`middle` 与带 affix wrapper 的 `large` 均为 `11 + 1px 描边 = 12`；裸输入框的 `large` 与 `small` 为 `7 + 1 = 8`。suffix 区右对齐到距右边缘 `11 + 1 = 12`（清除图标 12px 宽 → x = `输入框宽 − 24`）。

**校验**：行宽看右边缘——同一列里的各行左边缘相同，右边缘应分别落在 `起始 x + 200 / 301.3 / 302.7`。注意导出图的卡片自身可能有描边/投影，沿整行扫 min/max x 会被卡片边框污染；应从行内某点向左右各自扫描第一个 ink 像素，或直接读文档的 `bounds`。

### 10. `loading` 态的 Search 按钮规则
官方 loading demo（`search-input-loading`）三行的 DOM 实测（antd 6.6.4）：

- **文案不丢**：`loading` 只是把 Button 的 icon 换成 spinner（`ant-btn-loading-icon`），`enterButton` 的文案照常渲染，布局为 `[spinner][gap 8px][文案]` 整体居中。脚本里绝不能在 loading 分支丢弃 `btnText`。
- **按钮宽度**：无 `enterButton` → icon-only 32，`enterButton={true}` → 46（同第 9 节规则），`enterButton="Search" size="large"` → `16 + 8 + 51.7 + 30 + 2 = 107.7`（有 spinner 时比纯文案宽 `icon + 8`）。
- **整钮降透明**：官方 `.ant-btn-loading { opacity: 0.65 }`（token `opacityLoading`）作用于整枚按钮（底色、描边、图标、文案一起），不是只降 spinner。脚本里对按钮的所有节点统一设 `opacity: 0.65`（`opacity` 是 schema 2.18 合法节点属性，`Switch.js`/`Divider.js` 已有先例）。合成后白底按钮的深色 spinner 实测 `#6D6D6D`（= `#000000E0` × 0.65 叠白），可作为校验锚点。
- **r1 的按钮是 default 色**：无 `enterButton` 时即使 loading 也是白底 + 深色 spinner（`ant-btn-color-default`），只有 `hasButton` 时才是 primary 蓝底白 spinner。
- 官方三行都是 `width: 100%` 填满 demo 容器（无写死宽度）；画板上与「Search box」卡约定一致，统一取 302.7。

### 11. `Input.TextArea` 官方几何
- **高度公式**：`rows * 22 + 10`（lineHeight 22、padding 4px 11px、border 1px×2）。rows=2→54、3→76、4→98、5→120。脚本里写 `rows*22+16` 是错的。
- **无默认 placeholder**：官方 TextArea 不填 placeholder 就什么都不渲染；脚本声明 `@input placeholder: string = ""` 且为空时跳过文本节点，**不要**兜底渲染「请输入多行内容」。
- **demo 间距**：textarea demo 两个 `<br/>` → 间隔 44px；autosize demo 的 `<div style={{margin:'24px 0'}}/>` → 间隔 48px。不要统一用卡的默认 gap 16。
- `autoSize={{minRows, maxRows}}` 的静态高度 = `minRows * 22 + 10`（初始未输入时按 minRows 渲染），实例 props 照抄官方源码（如 rows=2 对应 minRows:2）。

### 12. `Input.OTP` 官方几何
- **格子**：26.5×32（middle；small 24.5 / large 30.5），radius 6，paddingInline 4，columnGap 8；根容器 `inline-flex` **fit-content**，禁止被 `fill_container` 拉伸：6 格 = 199、8 格 = 268。
- **分隔符**：只在传了 `separator` prop 时渲染（默认无！），每个格子之间一个，7×22、颜色 `rgba(0,0,0,0.88)`，与格子之间同样隔 8px gap；带分隔符时 6 格总宽 = 274。官方「custom function separator」demo 按 index 交替蓝/红（`(i) => i&1 ? red : blue`）。
- **demo 副标题**是 `Typography Title level={5}`：fontSize 16、fontWeight 600、lineHeight 24、marginBottom 8（加上 Flex gap 16 → 标题与组件间隔 24）。画板里用 14/500 是错的。
- 官方 demo 所有 OTP 初始值为空，**不要**补 `value:"123456"`（mask 行同理，mask 只影响输入后的显示）。

### 13. `Update(id, {inputs})` 是整体替换，不是合并
pen 的 `Update` 传 `inputs` 时会**整对象替换**，漏写的字段会被清掉（例如只想改 `rows:2` 会把 `placeholder`/`autoSize` 一起抹掉）。改实例 props 必须把该实例的完整 inputs 一次性写全，改完用 `Get` 回读确认。


