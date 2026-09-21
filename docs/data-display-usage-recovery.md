# Data Display Usage 验收状态

Components 的状态数量、组件定义检查和 renderer 单测不能证明 Usage 与官网一致。

## 已核对：Avatar

官网来源：https://ant.design/components/avatar/

Usage 示例通过 Pen 原生浏览器重新导入。7 张卡片：Basic、Autoset Font Size、Avatar.Group、Responsive Size、Type、With Badge、maxCount includes overflow。

- Basic 为两行、每行五个尺寸。
- 保留官网左对齐、实际例子内容、图片和颜色。
- Avatar.Group 使用既有唯一组件定义的实例，并逐个配置 Avatar 子实例和重叠位置。
- Badge 为 Avatar 的父组件；数量和红点分别配置。
- 图像资源来自官网示例，画布使用本地资源。
- 复核完整 Usage、Basic、Type、Avatar.Group、With Badge 截图。
- `node scripts/data-display/verify-renderers.mjs` 通过；这项测试不代替其余 Usage 的视觉审核。

## 其余 Data Display Usage

剩余页面已完成原生导入与主要实例替换。验收区分静态画布恢复、嵌套实例结构和浏览器交互；组件实例存在不代表对应官网案例完整，静态截图不能证明所有交互状态一致。

任何后续修改必须保留已验收页面，限制写入目标为当前待修页面。更新共享 renderer 后，还需重新检查引用它的已验收 Usage。整组替换不能只凭组件定义或实例数量通过验收。

当前工具记录未能确定简化结构由哪一次写入产生，不能声称已找到具体覆盖操作，也不能声称回滚到了某个历史版本。

## Badge 恢复

重新通过 Pen 原生 import 导入 https://ant.design/components/badge/ 的 `.demo-wrapper`，保留 12 个官方示例的说明和两列布局。恢复状态、彩色徽标、Ribbon 列表、Standalone、动态控制及 semantic styling；徽标使用 Badge 实例，Ribbon 内嵌 Card 实例，动态控制使用 Space.Compact、Button 和 Switch。删除版本徽标、标题编辑图标和操作条。截图检查 Basic、Status、Ribbon、Dynamic、Standalone、Colorful、semantic styling；同时回查 Avatar Basic / Group。

检查中修正 Avatar 空字符串被回退成 A、Badge small 高度、Ribbon 文案宽度及 Card 小尺寸高度。其余页面尚未完成，不能由本项推断整组验收通过。

## Tag 恢复

通过 Pen 原生 import 重新导入 https://ant.design/components/tag/ 当前 9 个官方示例，保留 filled/solid/outlined、状态、图标、可选、多选和语义样式案例。Tag 与 CheckableTag 使用官方配色和实例尺寸；新增官方 `Tag.CheckableTagGroup` 唯一定义，并以它组合四处选项组。官网组件签名同时核对 `node_modules/antd/es/tag/index.d.ts` 和 `CheckableTagGroup.d.ts`。Basic、Status、Colorful、Icon、Checkable 和 semantic styling 已截图检查。

## Empty 恢复

从官网原生导入 6 个示例。默认/简化/自定义插图取自导入的官网矢量图层。支持空 description、ReactNode 说明、嵌套 Button 和 styles；ConfigProvider 示例中的 Select、TreeSelect、Cascader、Transfer、Table、Switch 已替换实例，保留其官方空数据状态。未新增 ConfigProvider 定义。截图对照官网复核 Basic、Customize、semantic styling 和 ConfigProvider 示例。

`node scripts/data-display/verify-renderers.mjs`、`node scripts/data-entry/verify.mjs` 已通过；尚未恢复的页面仍不得视为通过。

### Segmented and Card — native imports restored
- Segmented: 13 official example cards, 19 configured Segmented instances; rich labels include Avatar instances, icons use Icon instances. Added intrinsic item sizing and semantic styles. Replaced the dynamic action with Button.
- Card: 11 official example cards imported. Card instances contain Card.Meta, Card.Grid, inner Card, Icon actions, and Button extras. Repaired header extra alignment and wide layouts. Tab content uses Tabs instances.
- Renderer verification: `node scripts/data-display/verify-renderers.mjs` passes 118 states after these changes. This is not a statement that the remaining Usage pages have passed visual review.

### Statistic, Carousel, QRCode, Image
- Statistic: restored six official examples, including nested Card and Icon instances, status styling and all Timer samples.
- Carousel: restored six official examples with seven Carousel instances and a Radio.Group position selector. Fixed indicator centering and arrow direction.
- QRCode: restored eleven official examples with seventeen QRCode instances, icon image, statusRender children, Spin/Button/Compact/Segmented and Popover composition. QR values and error levels checked against upstream demo source.
- Image: restored twelve official examples; images and placeholders now use Image instances, three examples use Image.PreviewGroup with child Image instances. Replaced controls with Button and InputNumber. Images use imported assets; React logo captured from the official SVG. Renderer supports serialized placeholder children and semantic image styles.
- Do not run the old bulk Usage generators over repaired pages.

## 后续页面恢复与验证范围

以下页面均以 Pen 原生浏览器导入的官网示例为布局来源，再替换实例；未使用旧批量 Usage 生成器。

| 页面 | 本次恢复 |
| --- | --- |
| Collapse | 12 张示例卡片、17 个实例；Panel、图标、嵌套内容 |
| Descriptions | 8 张示例卡片、10 个实例；ReactNode 内容、Badge 状态 |
| Timeline | 16 个实例；横向、交替、标题、反向和控制项 |
| Calendar | 9 张示例卡片、11 个实例；日历事件使用 Badge，标题选择器使用 Select/Radio.Group |
| Listy | 7 张官网示例卡片；分组、虚拟列表、富内容及拖动示例 |
| Tooltip | 9 张卡片、51 个实例；触发元素、方向、颜色和关闭态 |
| Popover | 8 张卡片、33 个外层实例；hover/click 示例增加内层 Popover |
| Tour | 8 张官网卡片；关闭态 Tour、外部 Button、配置 Slider |
| Tree | 13 张卡片、14 个实例；DirectoryTree、Checkbox、Icon、禁用节点和自定义图标 |
| Table | 42 张官方卡片；原生整页导入截断后的卡片分别补导，表格内容和控制项替换实例 |

修复 Calendar 事件 Badge 的 status/text 缺失、共享 Checkbox/Radio 空标签回退、Table 排序图标错误。Table 虚拟列表导入正文缺失，按官网示例源码补入数据。修复替换实例继承源坐标导致的位移，以及卡片缩窄后固定宽度容器越界。

静态截图复核涵盖上述页面的代表性例子，并回查 Avatar Basic 与 Avatar.Group。删除被替换的旧 Usage 内容，未保留本次导入的浮动画布来源。

执行通过：
- `node scripts/data-display/verify-renderers.mjs`：111 个配置状态、所有组件脚本语法，以及 Badge 状态文本、Calendar 宽度、空标签、关闭浮层、Table 数据和 Tour cover 回归检查。
- `node scripts/data-entry/verify.mjs`：18 个渲染器及变体配置。

### 验证边界

以上属于静态画布恢复，不是全交互验收。Carousel 自动播放、Image 预览操作、Table 固定列滚动、Tree 尚未展开分支以及 Tour 的目标定位/遮罩交互未完成浏览器级验证。Table 中序列化的 ReactNode 内容和部分导入控件仍需进一步检查可编辑属性与全部子组件替换；不能把本记录解读为整组像素和行为均与官网完全一致。


Auto Shift 特殊来源：Tooltip 与 Popover 的整页导入不能穿透 iframe。分别打开官网 `/~demos/tooltip-demo-shift` 和 `/~demos/popover-demo-shift`，原生导入实际浮层并替换 Tooltip/Popover + Button 实例。保留演示窗口外框，移除 iframe 占位文字，按独立演示页使用 Roboto，复核两处最终截图。


## 组件收录范围

Library 不收录已废弃的组件。List、List.Item、List.Item.Meta 不在收录范围；Listy 是独立组件，不依赖 List 子组件。目录、Overview 和生成配置须与该范围一致。
