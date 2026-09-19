# Data Display Components

Components 画板包含 21 个组件条目、37 个唯一主/子组件定义、119 个状态展示。第一个状态承载唯一组件定义，其余状态使用该定义的实例；子组件定义只在所属 Components 中登记一次。

| 组件 | 当前 Components 状态数 | 展示范围 |
| --- | ---: | --- |
| Avatar | 6 | 文字、图标、形状、尺寸、字长、Avatar.Group |
| Badge | 8 | 数字、溢出、红点、零值、颜色、Ribbon |
| Calendar | 4 | 卡片月历、年份、全屏尺寸、周数 |
| Card | 6 | 标题、尺寸、边框、加载、Meta、Grid |
| Carousel | 6 | 指示器、箭头、指示器位置、初始页 |
| Collapse | 7 | 展开、收起、尺寸、透明、箭头位置、禁用、Panel |
| Descriptions | 6 | 列数、边框、方向、尺寸、Item |
| Empty | 3 | 默认、简洁、自定义说明 |
| Image | 4 | 图片、预览配置、占位、PreviewGroup |
| List | 7 | 边框、分割线、加载、网格、Item、Item.Meta |
| Listy | 4 | 列表数据、行样式、视口尺寸 |
| Popover | 3 | 标题、无标题、内容 |
| QRCode | 6 | 实际编码、加载、过期、扫描、颜色、边框 |
| Segmented | 7 | 选项、尺寸、禁用、方向、形状、宽度 |
| Statistic | 6 | 数值、精度、前后缀、加载、Timer、Countdown |
| Table | 7 | 尺寸、边框、表头、加载、Column、ColumnGroup |
| Tag | 9 | 语义色、关闭、边框、CheckableTag |
| Timeline | 6 | 方向、位置、倒序、Item |
| Tooltip | 3 | 提示内容、颜色 |
| Tour | 4 | 步骤内容、完成按钮、强调样式 |
| Tree | 7 | 连接线、勾选、整行、禁用、图标、DirectoryTree |

## 结构约束

- 状态配置维护在 `scripts/data-display/components-plan.mjs`；`build-components.mjs` 生成 MCP 执行脚本，不直接读写 `.pen` 文件。
- Components 不展示属性矩阵、版本标签或官网示例操作栏。
- Icon、Avatar、Pagination、Image、List.Item、List.Item.Meta 的嵌套通过组件实例表达，不能用相似图形替代。
- Badge 的指示器需要越过子内容的右上边界，Badge 必须保持 `clip: false`。它在几何检查中产生的越界记录不等于实际裁切；需检查完整外层卡片截图。
- 修改 renderer 会影响引用它的 Usage；状态画板本身不是官网 Usage 的替代品。
- 本画板验证静态设计状态，不代表滚动、计时、点击、预览弹层等浏览器交互已由 Pen 实现。

## 验证

执行 `node scripts/data-display/verify-renderers.mjs`：检查所有脚本语法、关键属性效果、嵌套引用以及 118 个脚本配置的运行结果；Avatar.Group 使用原生 Frame 和 Avatar 实例，由画布检查。

执行 `npm run verify:composition`：检查已登记的组件组合规则。

画布检查覆盖全部 21 个 Components，核对唯一性、实例结构、画板高度和完整画板截图。Badge 的 6 个指示器属于有意越界；其外层截图可见完整数字/红点。以上是 Components 状态验收，不能据此声称全部官网 Usage 或每项 Ant Design API 已经完整实现。

官方范围依据：[Ant Design 组件总览](https://ant.design/components/overview/)。渲染尺寸与属性参考项目安装的 `antd@6.6.4` 源码和各组件官网文档。QRCode 使用 Ant Design 依赖的 `@rc-component/qrcode` 编码器，保留源码版权标记。
