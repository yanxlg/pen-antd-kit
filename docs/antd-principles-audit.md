# Ant Design Principles 双源审计

审计日期：2026-09-19。

覆盖审计来源：

- [Ant Design Open Source 社区 Figma](https://www.figma.com/design/OgKQLl70AG1WVdL9CYAizL/Ant-Design-Open-Source--Community-?node-id=479-19&p=f)（仅用于确认哪些组件需要 Principles，不作为内容来源）
- [Button Design](https://ant.design/docs/spec/buttons/)
- [Data Entry Design](https://ant.design/docs/spec/data-entry/)
- [Data Display Design](https://ant.design/docs/spec/data-display/)
- [Navigation Design · Global Rules](https://ant.design/docs/spec/navigation/)
- [Navigation Design · Research](https://ant.design/docs/spec/research-navigation/)
- [Message and Feedback Design](https://ant.design/docs/spec/research-message-and-feedback/)
- 现有专项设计页：Layout、Icon、Typography、Form、Empty、List、Table、Result 等。

## Figma 最低覆盖线

社区 Figma 的 59 个组件页中，以下 17 项明确存在 `Principles` 或 `Principle` 顶层内容：

`Button`、`Icon`、`Typography`、`Layout`、`Dropdown`、`Menu`、`PageHeader`、`Checkbox`、`DatePicker`、`Form`、`Input`、`Radio`、`Slider`、`Switch`、`Transfer`、`Upload`、`Result`。

Pen 当前缺失数为 **0**。`PageHeader` 已作为设计规范资产保留；它不重新加入 Ant Design 6 的运行时组件目录。

## 官网 Design 页面额外覆盖

官网共享 Design 页面还对下列当前组件给出明确章节，因此 Pen 在 Figma 最低覆盖线之外继续保留 Principles：

- Navigation：`Anchor`、`BackTop`、`Breadcrumb`、`Carousel`、`Pagination`、`Steps`、`Tabs`、`Tree`。
- Data Display：`Card`、`Collapse`、`Table`、`Timeline`。
- Feedback：`Alert`、`Message`、`Modal`、`Notification`。
- 专项设计页：`Empty`、`Grid`、`List`。

合并去重后，Pen 共有 **36 个组件或设计资产**包含 Principles。每个新增画板都在内容容器的 `context` 中保存官网来源 URL；可视区域只保留官网原有的标题、图片、说明和 Note 顺序。插图使用 Ant Design 官方文档资源，并保存到项目的 `assets/principles`，避免远程图片失效。`Select` 与 `InputNumber` 不再把 Dropdown、Slider 的规范章节复制为自己的 Principles，因为官网没有对应的独立章节。

## 验收规则

1. Figma 只用于确认组件是否存在 Principles；Figma 中存在 Principles 的组件，Pen 必须存在对应 Principles。
2. Principles 的结构、文字、图片和顺序只以当前 Ant Design 官网 Design 页面为准，不从 Figma 复制内容，也不摘要改写官网原文。
3. 官网共享 Design 页面中出现明确组件章节时，可以新增 Principles，因此 Pen 可以多于 Figma。
4. `PageHeader` 只保留官网 Navigation Design 中的设计规范，不作为 Ant Design 6 可实例化组件恢复。
5. 官网远程插图必须保存为本地项目资产，避免图片失效。
6. 新增或更新 Principles 后必须重新计算组件 section、所属 group 的宽高和横向间距，并检查相邻 section 不重叠。
