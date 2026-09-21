# Feedback / Other：Usage 与 Components

范围：Alert、Drawer、Message、Modal、Notification、Popconfirm、Progress、Result、Skeleton、Spin、Watermark；Affix、App、BackTop、BorderBeam。ConfigProvider、Util 不在此范围。

## 画布结构

- 15 个 Usage 页保留官网的说明和示例顺序。示例区通过 Pen 原生浏览器导入；133 张示例卡片。
- 15 个 Components 页展示 77 个状态。21 个组件及子组件定义各保留一份，定义位于对应 Components；其它展示使用实例。
- Alert.ErrorBoundary、Skeleton.Button/Avatar/Input/Image/Node 独立定义。BackTop 嵌套 FloatButton.BackTop → FloatButton → Icon。
- 容器通过 children 传递节点树；App、Affix、Watermark、BorderBeam 不内置特定示例内容。BorderBeam 的 Card 示例嵌套 Card 实例；Popconfirm 的触发按钮嵌套 Button 实例。
- Principles、Usage、Components 按此顺序排列；本次未改动 Principles 内容。

## 示例区规则

- 保留官网示例内容、说明、列顺序及示例数量，不能用自拟少量案例替代。
- 不展示编辑图标、底部开发操作区、文档版本标签或属性矩阵。
- 示例标题文字框高 28，中心与分隔线重合；左右留白 8。不是按文字基线对齐。
- 导入 iframe 时还需导入其中的实际示例，并替换组件；不能保留灰色 iframe 占位。
- 组件定义、实例和示例都位于主 Frame 内；容器高度随内容更新。

## 验证

- 已逐页查看这 15 个 Usage 与 15 个 Components 的画布截图，并对发现的问题复核。
- MCP 结构检查：133 个示例标题；21 个定义、21 个唯一组件名；Usage 没有原生 button 图层、iframe 占位、文档操作栏、独立版本标签。嵌套 children 中的原生按钮也已转换。
- `node scripts/feedback-other/verify.mjs`：通过 22 个渲染器输出检查，以及 Progress 0%、圆形进度、Drawer 方向、Drawer/Modal 关闭能力、Skeleton 行数、组件嵌套和 Result 插图资源回归断言。Drawer Usage 收敛为 6 个有设计价值的交互场景，Modal Usage 收敛为 4 个；调用方式、生命周期、挂载容器和销毁逻辑等纯功能示例不进入设计资源。Components 各用 16 个实例覆盖位置、尺寸、Mask、Loading、Footer、关闭入口和操作文案等 UI 属性。
- `npm run verify:composition`：通过。
- `npm run verify:floatbutton`：失败。该现有脚本仍要求 FloatButton 输出内置 `Badge surface`，与当前 Badge 父组件组合结构不一致；不能把它计为通过。本次未修改该旧断言。

这些是设计画布的静态展示，不是浏览器交互验收。滚动定位、点击弹出、倒计时及动画的运行时行为不由截图验证覆盖。Skeleton 的 active 和 BorderBeam 流光展示静态帧。

## 来源与复核工具

官网页面：`https://ant.design/components/<slug>/`；BorderBeam 使用 `border-beam`；BackTop 对照 FloatButton 页的 BackTop 示例。

`artifacts/feedback-other/imports.json` 记录导入来源和画布节点；各 `*-official.json` 保留官网控件信息。采集和回归脚本位于 `scripts/feedback-other/`。Progress 的布局采集包含官网控件坐标、进度值及渐变颜色，不从截图猜测。
