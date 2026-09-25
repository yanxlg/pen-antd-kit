# Pencil / Ant Design 容器组件 (Slot Container) 与代码映射协议设计规范

本文档为 `pen-antd-kit` 中所有容器类组件（如 `Form`、`Form.Item`、`Card`、`Modal`、`Tabs`、`Drawer` 等）的 **标准架构规范**，确立了 **“视觉插槽（Visual Slot）” 与 “代码契约（Code Mapping Contract）” 的双轨制架构**。

后续在组件库开发、原型生成平台、以及 Design-to-Code（设计稿转 React TSX 代码）工具链中，所有容器类组件必须严格遵循本规范。

---

## 目录
1. [核心架构设计：双轨制分工 (Dual-Track Architecture)](#1-核心架构设计双轨制分工-dual-track-architecture)
2. [Pencil 原生 Slot Schema 规范](#2-pencil-原生-slot-schema-规范)
3. [容器与叶子组件的职责边界](#3-容器与叶子组件的职责边界)
4. [Form 与 Form.Item 标准实战模型](#4-form-与-formitem-标准实战模型)
5. [栅格布局 (labelCol & wrapperCol) 映射规则](#5-栅格布局-labelcol--wrappercol-映射规则)
6. [代码映射协议 (Code Mapping Protocol) 规范](#6-代码映射协议-code-mapping-protocol-规范)
7. [代码生成器 (Code Generator) 转译算法](#7-代码生成器-code-generator-转译算法)
8. [其他容器组件扩展清单与映射契约](#8-其他容器组件扩展清单与映射契约)
9. [工程化维护与防坑指南 (Gotchas)](#9-工程化维护与防坑指南-gotchas)

---

## 1. 核心架构设计：双轨制分工 (Dual-Track Architecture)

在 Pencil (pen.dev) 设计工具中，构建高保真原型并导出高质量 React 代码面临两大核心诉求：
1. **画布操作层（Design & Layout）**：图层树必须完全透明可展开、画布直接双击点选子控件、支持任意组件自由拖拽进插槽、双击原地编辑文字。
2. **代码生成层（Code Generation）**：导出的代码必须是纯正语义化的 Ant Design 组件调用（如 `<Form.Item name="username" label="Username" rules={[...]}>`），而不是低保真的 `div + flex`。

为彻底解决纯 Script 脚本组件“沙盒封闭点不进子节点”与纯 Frame“丢失业务代码属性”的矛盾，我们确立 **双轨制架构**：

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Form.Item 组件实例节点                           │
├───────────────────────────────────┬────────────────────────────────────┤
│   视觉与布局轨 (Visual Track)     │     代码契约轨 (Code Track)        │
│   基于 Pencil 原生 Frame + Slot   │     基于 metadata.antd.props       │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Label Container (固定宽/内容宽) │ • name: "username"                 │
│ • Required Mark (* 文本节点)      │ • label: "Username"                │
│ • Label Text (文本节点，可双击)   │ • rules: [{ required: true, ... }] │
│ • Control Slot (slot: [...])      │ • labelCol: { span: 8 }            │
│   └─ Input 组件实例               │ • wrapperCol: { span: 16 }         │
└───────────────────────────────────┴────────────────────────────────────┘
```

* **视觉层负责**：在 Canvas 上进行精确的 Flexbox 自动排版、图层高亮框、Slot 插槽渲染、画布双击交互。
* **契约层负责**：在 `metadata.antd.props` 中精确记录 Ant Design React 组件的全部逻辑配置，供代码生成引擎一键读取导出。

---

## 2. Pencil 原生 Slot Schema 规范

在 Pencil 的底层 `.pen` 数据模型中，容器插槽使用 Frame 节点的 `slot` 字段标记：

```ts
export interface Frame extends Rectangleish, CanHaveChildren, Layout {
  type: "frame";
  clip?: BooleanOrVariable;
  placeholder?: boolean;
  /** 
   * 将该 Frame 声明为可复用组件插槽。
   * 数组中的项为推荐放置的可复用子组件 Master ID（Suggested Components）。
   */
  slot?: false | string[];
}
```

* **Slot 特性**：
  * 当插槽内容为空时，Pencil 画布会自动呈现紫色斜线网格占位符（Slot Placeholder）；
  * 当实例在 `descendants` 中填充 `children: [...]` 时，占位符自动被真实控件替换；
  * 插槽内的所有组件在左侧 **Layers 图层面板中无缝展开**，支持多层级嵌套点选与穿透选中。

---

## 3. 容器与叶子组件的职责边界

| 组件层级 | 底层类型 | 典型代表 | 核心职责 |
| :--- | :--- | :--- | :--- |
| **原子叶子组件 (Leaf Component)** | `type: "script"` | `Input`, `Button`, `Switch`, `Select`, `DatePicker`, `Tag` 等 | **功能与状态末梢**。内部无需再承载外部子组件，通过脚本 `@input` 提供右侧面板专有的丰富配置项（如 placeholder, variant, size, status, disabled）。 |
| **布局容器组件 (Container Component)** | `type: "frame"` + `Slot` | `Form`, `Form.Item`, `Card`, `Modal`, `Tabs`, `Space`, `Drawer` | **原型的骨架与插槽**。必须是真正的 Pencil 文档树节点，保证生成出来的原型 100% 可自由二次编辑、拖拽换控件与增删结构。 |

---

## 4. Form 与 Form.Item 标准实战模型

### 4.1 母体组件（Master Component Origin）规范

#### ① `Form.Item` 母体 (`npYpT`)
* **根节点**：`type: "frame"`, `name: "Form.Item"`, `reusable: true`, `layout: "horizontal"`, `alignItems: "center"`, `gap: 16`, `width: 600`
* **Label 容器 (`FlQ2c`)**：`type: "frame"`, `name: "Label Container"`, `width: 100`, `height: 32`, `layout: "horizontal"`, `justifyContent: "end"`, `gap: 4`
  * `required` (`qOWm2`, text): 内容 `*`，颜色 `#ff4d4f`，字号 `14`
  * `label` (`O1MFk`, text): 内容 `Field Label:`，颜色 `#000000e0`，字号 `14`
* **children 插槽 (`CVtG8`)**：`type: "frame"`, `name: "children"`, `width: "fill_container"`, `layout: "horizontal"`
  * `slot: ["iQ5uU", "C8cDZ", "VoQE7", "jCYiD", "SiWnx", "rZqkn", "cpj9Y", "DQZzq"]`（推荐常用数据录入控件）
  * 默认放置一个基础 `Input` 实例，保证母体在组件库资产面板展示不塌陷。

#### ② `Form` 母体 (`oWtOf`)
* **根节点**：`type: "frame"`, `name: "Form"`, `reusable: true`, `layout: "vertical"`, `gap: 24`, `width: 600`
* **Form Items 插槽 (`tSaDV`)**：
  * `type: "frame"`, `name: "Form Items"`
  * `slot: ["npYpT"]`（指定建议组件为 `Form.Item`）
  * `layout: "vertical"`, `gap: 24`, `width: "fill_container"`
  * 默认放置两个标准的 `Form.Item` 演示项。

---

## 5. 栅格布局 (labelCol & wrapperCol) 映射规则

在 Ant Design 官方规范中，存在两种核心布局表现：

### 5.1 显式指定栅格列宽模式（如 Basic Usage / Form Methods）
在代码中配置了 `labelCol={{ span: 8 }}`、`wrapperCol={{ span: 16 }}`、`style={{ maxWidth: 600 }}`：
* **数学与栅格推导**：
  * 在标准 Form 宽度 `600px` 下，总列数为 24 列；
  * `labelCol={{ span: 8 }}` 占 $8 / 24 = 1/3$，精确对应 **`200px`**；
  * `wrapperCol={{ span: 16 }}` 占 $16 / 24 = 2/3$，精确对应 **`400px`**；
* **视觉呈现**：
  * Label Container（`FlQ2c`）统一设置 `width: 200`，文本**右对齐**（`justifyContent: "end"`），并带有 `8px` 右侧内边距（`padding: [0, 8, 0, 0]`）；
  * 右侧插槽（`CVtG8`）设为 `width: "fill_container"`，自动撑满剩余的 `400px`；
  * `Form.Item` 根容器设置 `gap: 0`，确保 Label 与 Wrapper 绝对对齐；
* **尾部表单项（带 offset）**：
  * Checkbox（如 Remember me）与 Button 组设置 `wrapperCol={{ offset: 8, span: 16 }}` 时，Label Container 保持相同的 `width: 200` 空占位：`FlQ2c: { width: 200, children: [] }`，使右侧控件自然与输入框起始线精确垂直对齐；
* **代码协议**：
  ```json
  "metadata": {
    "antd": {
      "component": "Form",
      "props": {
        "name": "basic",
        "labelCol": { "span": 8 },
        "wrapperCol": { "span": 16 },
        "style": { "maxWidth": 600 }
      }
    }
  }
  ```

### 5.2 非满幅栅格模式（如 Form disabled: labelCol 4 + wrapperCol 14）
在 Ant Design 官方 `Form disabled` 等组件展示示例中，配置了 `labelCol={{ span: 4 }}`、`wrapperCol={{ span: 14 }}`、`style={{ maxWidth: 600 }}`：
* **数学与栅格推导**：
  * 总列数为 24 列，Form 最大宽度为 `600px`；
  * `labelCol={{ span: 4 }}` 占 $4 / 24 = 1/6$，对应 **`100px`**；
  * `wrapperCol={{ span: 14 }}` 占 $14 / 24 = 7/12$，对应 **`350px`**；
  * 右侧自然留白 $6 / 24 = 150px$，形成非满幅输入区排版；
* **视觉呈现**：
  * 所有表单项的 `FlQ2c` 统一固定为 `width: 100`，文本右对齐（`justifyContent: "end"`）并带有 `8px` 右内边距；
  * 右侧插槽 `CVtG8` 设置为 `width: 350`，内部通用输入控件（如 Input, Select, TreeSelect, Cascader, DatePicker, TextArea 等）设置为 `width: "fill_container"`，整齐贴合 350px 栅格网格；
  * `Radio` 替换为标准的 `Radio.Group`（内含 Apple 和 Pear 选项）。

### 5.3 内容自适应模式（如 Form Layout）
在代码中未指定 `labelCol` / `wrapperCol` 时：
* **视觉呈现**：Label Container 宽度完全跟随文字长度自适应：
  ```json
  "descendants": {
    "FlQ2c": { "width": "fit_content", "justifyContent": "start" }
  }
  ```
  控件直接紧随 Label 之后；
* **尾部表单项（无 offset）**：尾部提交按钮无 offset 时，直接隐藏 Label Container：`FlQ2c: { enabled: false }`，按钮直接顶格靠左对齐；
* **代码协议**：`metadata.antd.props` 中不注入 `labelCol` 与 `wrapperCol`，代码生成器自动转出流式无约束排版。

---
### 5.3 垂直布局模式 (layout="vertical")
在 Ant Design 中，当 `Form` 或单个 `Form.Item` 设置了 `layout="vertical"` 时：
* **视觉呈现**：
  * `Form.Item` 根实例覆盖 Auto Layout 为纵向：`layout: "vertical", alignItems: "start", gap: 8`；
  * `Label Container` (`FlQ2c`) 覆盖为内容宽度并左对齐：`width: "fit_content", height: "fit_content", justifyContent: "start"`；
  * **冒号规则**：Ant Design 规定垂直布局下**默认不展示英文冒号 `:`**，文本节点内容不带冒号；
  * `children` 插槽 (`CVtG8`) 设置为占满下整行：`width: "fill_container"`。
* **代码协议**：
  ```json
  "metadata": {
    "antd": {
      "component": "Form.Item",
      "props": {
        "label": "vertical",
        "layout": "vertical"
      }
    }
  }
  ```
* **代码生成器判定逻辑**：
  代码生成器优先读取 `metadata.antd.props.layout === "vertical"`；若未显式声明，则通过检测物理布局属性 `node.layout === "vertical"` 自动反推导出 `layout="vertical"`，双重保障无损转译！

### 5.4 混合布局与全宽栅格比例模式 (Form mix layout: labelCol 4/24 & wrapperCol 20/24)
在 Ant Design 官方混合布局示例中，**整个示例只有一个 Form 组件（并非两个 Form）**，并且该 Form **占满父容器宽度**（`width: "fill_container"`），内部同时包含横向项、纵向项与分割线（`Divider`）：
* **单表单原则**：全宽展示区仅由一个 `<Form name="layout-multiple">` 承载，纵向项与横向项穿插在同一个表单实例中；
* **横向 4/24 与 20/24 栅格推导**：
  * 横向项配置 `labelCol={{ span: 4 }}`、`wrapperCol={{ span: 20 }}` 时，表示 Label 占 4/24（16.67%），右侧输入区占 20/24（83.33%）；
  * 在标准画布卡片容器（内容区宽 1598px）下：
    * `FlQ2c` (Label Container)：精确设置为 `width: 266`（即 `1598 * 4 / 24`），`justifyContent: "end"`, `padding: [0, 8, 0, 0]`；
    * `CVtG8` (children)：设置为 `width: "fill_container"`，自动撑满剩余的 `1332px`（即 `1598 * 20 / 24`）；
    * `Form.Item` 根实例设置 `gap: 0`，实现 Label 与 Wrapper 的绝对 4:20 比例分割；
* **代码协议**：
  ```json
  "metadata": {
    "antd": {
      "component": "Form.Item",
      "props": {
        "label": "horizontal",
        "name": "horizontal",
        "rules": [{ "required": true }],
        "labelCol": { "span": 4 },
        "wrapperCol": { "span": 20 }
      }
    }
  }
  ```

## 6. 代码映射协议 (Code Mapping Protocol) 规范

每个组件实例通过自身 `node.metadata.antd` 声明代码映射协议：

### 6.1 Form 实例节点协议
```json
{
  "type": "ref",
  "ref": "oWtOf",
  "name": "Form",
  "metadata": {
    "type": "antd-component",
    "antd": {
      "component": "Form",
      "version": "6.6.4",
      "props": {
        "name": "basic",
        "layout": "horizontal",
        "labelCol": { "span": 8 },
        "wrapperCol": { "span": 16 },
        "autoComplete": "off"
      }
    }
  }
}
```

### 6.2 Form.Item 实例节点协议
```json
{
  "type": "ref",
  "ref": "npYpT",
  "name": "Form.Item · Username",
  "metadata": {
    "type": "antd-component",
    "antd": {
      "component": "Form.Item",
      "version": "6.6.4",
      "props": {
        "name": "username",
        "label": "Username",
        "rules": [
          { "required": true, "message": "Please input your username!" }
        ]
      }
    }
  },
  "descendants": {
    "O1MFk": { "content": "Username:" },
    "qOWm2": { "enabled": true },
    "CVtG8": {
      "children": [
        {
          "type": "ref",
          "ref": "iQ5uU",
          "name": "Input",
          "inputs": { "placeholder": "Please enter username" }
        }
      ]
    }
  }
}
```

---

## 7. 代码生成器 (Code Generator) 转译算法

在将 `.pen` 画布实例转换为 React TSX 代码时，代码生成器采用 **双轨合并算法（Dual-Track Merge Strategy）**：

```ts
/**
 * 将 Form.Item 实例节点转换为 Ant Design React TSX
 */
export function generateFormItemJsx(node: PenRefNode): string {
  const antdMeta = node.metadata?.antd || {};
  const props = { ...(antdMeta.props || {}) };

  // 1. 动态优先原则：画布双击修改的文字高于静态元数据
  const visualLabel = node.descendants?.["O1MFk"]?.content;
  if (visualLabel) {
    props.label = visualLabel.replace(/:$/, "").trim();
  }

  // 2. 必填星号与校验规则同步
  if (node.descendants?.["qOWm2"]?.enabled === false) {
    props.required = false;
  }

  // 3. 递归解析插槽内的子控件 (children)
  const slotControls = node.descendants?.["CVtG8"]?.children || [];
  const childrenJsx = slotControls
    .map(child => generateComponentJsx(child))
    .join("\n      ");

  // 4. 拼装成标准的 TSX 字符串
  const propList = Object.entries(props)
    .filter(([key]) => key !== "rules" && key !== "children")
    .map(([key, val]) => typeof val === "string" ? `${key}="${val}"` : `${key}={${JSON.stringify(val)}}`)
    .join(" ");

  const rulesAttr = props.rules ? ` rules={${JSON.stringify(props.rules)}}` : "";

  return (
    `    <Form.Item ${propList}${rulesAttr}>\n` +
    `      ${childrenJsx}\n` +
    `    </Form.Item>`
  );
}
```

---

## 8. 其他容器组件扩展清单与映射契约

后续所有容器类组件均统一扩展此设计模式：

| 组件名称 | 视觉 Slot 结构 | `metadata.antd.props` 代码协议 | 典型子组件推荐 |
| :--- | :--- | :--- | :--- |
| **Card** | `Title / Extra Text` + `body: Slot` | `{ title: "Card title", bordered: true, size: "default" }` | Form, Table, List, Descriptions |
| **Modal** | `Header: Slot`<br>`Content: Slot`<br>`Footer: Slot` | `{ title: "Modal Title", open: true, okText: "OK", cancelText: "Cancel" }` | Form, Result, Button 组 |
| **Drawer** | `Header: Slot`<br>`Body: Slot`<br>`Footer: Slot` | `{ title: "Drawer Title", open: true, placement: "right", width: 378 }` | Form, Descriptions, Button 组 |
| **Tabs** | `TabBar: Frame`<br>`TabPane Content: Slot` | `{ activeKey: "1", items: [{ key: "1", label: "Tab 1" }] }` | 任意业务内容区 |
| **Space** | `children: Slot` | `{ direction: "horizontal", size: "middle", wrap: false }` | Button 组, Tag 组, Input 组 |
| **Collapse** | `Panel Header: Frame`<br>`Panel Content: Slot` | `{ defaultActiveKey: ["1"], items: [...] }` | 任意折叠内容区 |
| **Descriptions**| `Items: Slot`<br>每个 Item: `Label + Value: Slot` | `{ title: "User Info", bordered: true, column: 3 }` | Text, Tag, Badge, Link |

---

## 9. 工程化维护与防坑指南 (Gotchas)

1. **尺寸塌陷（Collapsed Size）预防**：
   * 任何 Slot 容器或其内部的子 Frame，如果无内容时会导致高度归零触发警告，**必须设置显式基线高度（如 `height: 32`）或 `fill_container`**。
2. **禁止在 `ref` 节点上执行 `Insert()`**：
   * Pencil 引擎规定 `ref` 实例的结构由母体决定，直接调用 `Insert(refId, ...)` 会报错。添加或替换子控件必须在 `descendants[slotId].children` 中挂载。
3. **按钮组必须嵌套 `Space`**：
   * 在表单底部或插槽中有多个操作按钮并排时，**禁止直接散装放入数组**，必须外包一层标准的 `Space`（`V5YhmT`）组件，确保 8px 间距与响应式折行正常。
4. **代码元数据与工具链同步**：
   * 使用工程脚本 `scripts/apply-antd-props.mjs` 批量注入或更新节点的 `metadata.antd.props`，保证设计稿在版本迭代中始终与 Ant Design 6.x API 100% 吻合。
