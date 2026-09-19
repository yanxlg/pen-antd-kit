# Ant Design 官网组件分组与 Pen 对齐清单

核对日期：2026-09-19。用途：作为后续补齐 `libraries/antd-6.lib.pen` 的目录、分组和验收依据。

## 1. 结论与版本边界

官网本次显示 **6.6.4**，基础目录为 **7 组、73 个条目**，另列 **6 个重型组件**。本项目明确不纳入 ConfigProvider 与 Util，因此当前验收范围为 **71 个官网条目**。[来源：官网组件总览](https://ant.design/components/overview-cn/)

本项目运行时、包版本和 Props/Inspector Registry 已升级至 `antd@6.6.4`（npm latest 核对于 2026-09-17）。Listy 已完成类型数据、真实渲染样例和 Pen 组件定义。

- **当前项目范围内无缺失目录入口。** Message、Notification、Listy 已补齐；ConfigProvider 与 Util 按项目范围明确排除。
- **Data Entry 的 18 个组件均已建立唯一 Live 定义。** 每个官方组件页先通过 Pen 浏览器的 `Import to Canvas` 导入 `.demo-wrapper`；Usage 保留官网示例卡、标题、说明和双栏顺序，预览控件再替换为唯一 Live 定义的 `ref` 实例。Components 中除唯一 `reusable: true` 定义外，所有状态展示也使用该定义的 `ref` 实例。
- **总览分组错误：Affix 放在导航，Masonry 放在其他。** 详情区和 Registry 的这两项分类已正确。
- **本地多出的一级项：BackTop。** Row/Col 已作为 Grid 的内部资产呈现；BackTop 不属于当前官网一级目录，回到顶部能力归入 FloatButton。
- **版本差异：Listy 自 6.6.0 提供；当前官网将 List 标为废弃。** 运行时版本门槛已满足，Pen 已完成 Listy；当前目录中仍保留 List 并标记其状态。[Listy 文档](https://ant.design/components/listy-cn/) · [List 文档](https://ant.design/components/list-cn/)

Data Entry 已完成 Pen 运行态导入、实例结构和画板尺寸核对。General、Layout、Navigation、Data Display、Feedback 与 Other 已按同一流程导入官网 Usage 并将预览替换为组件实例。Data Display、Feedback 与 Other 的旧静态变体矩阵已收敛为每项一个 Live 定义；Table 的 43 张官网示例卡统一引用唯一的 Live Table 定义。Principles 内容只以当前 Ant Design 官网 Design 页面为准；社区 Figma 仅用于确定最低覆盖范围。Figma 明确包含 Principles 的 17 项已经全部覆盖，官网共享 Design 页面中具有明确组件章节的内容也已经补入。ConfigProvider 与 Util 不在本项目范围内。

## 1.1 Usage / Components 强制处理规则

1. Usage 必须先使用 Pen 集成浏览器从对应 Ant Design 官方组件页执行 `Import to Canvas`，保留官网示例卡的标题、说明、顺序与双栏结构。
2. Usage 的 Example 卡片只保留示例预览、标题与说明；导入页面自带的底部操作区（`.code-box-actions`，包括代码、调试、外链等图标）必须删除。删除后同步收紧卡片、列、Usage Content 与主画板高度，不得留下空白占位。
3. Example 标题条不得保留官网文档的编辑按钮或铅笔图标。说明区顶部必须保留一条横跨卡片内容宽度的 `1px`、`#F0F0F0` 分割线。标题白色外框高度为 `30px`、`y = -15`；默认 `28px` 高的标题文字链接容器使用内部 `y = 0.25`。Alibaba Sans 的字形墨迹中心比容器几何中心低约 `1.25px`，因此必须按光学中心对齐分割线的 `0.5px` 中心，不能只对齐标题外框或文字容器。导入或更新 Usage 后执行 `scripts/normalize-usage-example-titles.pencil.js`，并确保 `remainingEditIcons`、`missingDividers`、`misalignedTitles`、`misalignedTitleText`、`dividerWidthMismatches` 均为 0。
4. 导入后的示例预览必须替换为对应可复用组件的 `ref` 实例；不得用矩形、文本或一次性脚本重新描画组件。
5. Components 只保留该组件的规范定义；状态和属性组合全部引用定义并通过属性配置。官方确有子组件时（如 Grid.Row/Col、Layout.Header/Content/Footer/Sider、Space.Compact）允许保留对应子定义。
6. 生成脚本只维护 Components 定义和实例，不覆盖已经从官网导入并完成实例化的 Usage。
7. 每次更新后检查 Usage 的实例数、直接脚本残留、Example 底部操作区、标题编辑按钮、标题分割线、标题外框对齐、标题文字光学中心对齐、容器裁切、画板高度与分组横向排布。Example 底部操作区、标题编辑按钮、缺失分割线、标题外框错位和标题文字错位必须均为 0。
8. Figma 只用于确定组件是否需要 Principles，不能作为 Principles 的内容来源。Figma 已有 Principles 的组件不得缺失；所有 Principles 的结构、文字、图片和顺序必须与当前 Ant Design 官网 `/docs/spec` 页面一致，不得摘要、改写或使用占位内容。官网共享 Design 页面可以带来额外 Principles；远程插图必须保存为项目资产后引用。
9. 每个组件详情区的横向 Frame 顺序固定为 `Principles → Usage → Components`，相邻 Frame 间距为 `40px`。没有 Principles 的组件使用 `Usage → Components`。新增或重新导入 Principles 时必须重排整个详情区，禁止把 Principles 直接追加在 Components 之后。可执行 `scripts/normalize-detail-frame-order.pencil.js` 统一修复并验收。
10. 组件库版本只允许显示在 `Components Overview`。General、Layout、Navigation、Data Entry、Data Display、Feedback、Other、Colors & Tokens 以及 Templates & Pages 中不得出现独立版本标签。官网示例正文中用于解释 API 支持范围的版本句子属于内容，应保留。导入或更新画板后执行 `scripts/remove-non-overview-version-labels.pencil.js`，并确保 `remainingVersionLabels` 为 0。

## 2. 官网分组与本地数量

组序、组内顺序均按官网总览。后续总览和详情导航使用同一顺序；附加的 Tokens、模板页单独放置，不计入组件覆盖率。

| 序号 | 官网分组 | 官网条目 | 本地详情区 | 官网条目已覆盖 | 缺少入口 | 本地额外一级项 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| 01 | 通用 General | 4 | 4 | 4 | — | — |
| 02 | 布局 Layout | 7 | 7 | 7 | — | — |
| 03 | 导航 Navigation | 7 | 7 | 7 | — | — |
| 04 | 数据录入 Data Entry | 18 | 18 | 18 | — | — |
| 05 | 数据展示 Data Display | 21 | 21 | 21 | — | — |
| 06 | 反馈 Feedback | 11 | 11 | 11 | — | — |
| 07 | 其他 Other（项目范围） | 3 | 4 | 3 | — | BackTop |
| 合计 | 项目范围 | **71** | **72** | **71** | **0** | **1** |

覆盖关系：`72 个本地详情区 − 1 个额外一级项 = 71 个项目范围内官网条目`。ConfigProvider 与 Util 不参与覆盖率。

## 3. 完整逐项对齐表

状态说明：**静态**＝该详情区存在 `reusable: true` 的非 Script 节点；**Live**＝存在可复用 Script 节点；**仅展示**＝有详情区但未发现 reusable 节点；**缺失**＝没有对应详情区。表中“后续最小检查范围”是本项目建议的制作/验收范围，并非声称现有 Pen 已覆盖这些内容，也不是官网所有 API 的穷举。对具体属性应继续查该行官网页面及目标版本类型。

定位规则：现有详情区 ID 为 `section-` 加组件名全小写，例如 `section-datepicker`；对应 Components 画板为 `artboard-datepicker-components`。缺失项的这些 ID 仅为后续建议，尚不存在。

### 01 通用 / General

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [Button 按钮](https://ant.design/components/button-cn/) | Live；无静态复用节点 | 类型、尺寸、形状、图标、危险态、加载态 |
| [FloatButton 悬浮按钮](https://ant.design/components/float-button-cn/) | 静态；待验收 | 单按钮、按钮组、展开组、回到顶部 |
| [Icon 图标](https://ant.design/components/icon-cn/) | Live；官网 Usage 已实例化 | 常用图标索引、线框/实底/双色、尺寸与颜色 |
| [Typography 排版](https://ant.design/components/typography-cn/) | 仅展示；缺复用节点 | 标题、正文、文本、链接、复制、编辑、省略 |

### 02 布局 / Layout

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [Divider 分割线](https://ant.design/components/divider-cn/) | 静态；待验收 | 水平、垂直、带文字 |
| [Flex 弹性布局](https://ant.design/components/flex-cn/) | 静态；待验收 | 横向、纵向、对齐、换行、间距 |
| [Grid 栅格](https://ant.design/components/grid-cn/) | 静态；待验收 | Row/Col、跨度、偏移、间隔、响应式 |
| [Layout 布局](https://ant.design/components/layout-cn/) | 静态；待验收 | Header、Sider、Content、Footer、折叠侧栏 |
| [Masonry 瀑布流](https://ant.design/components/masonry-cn/) | 静态；待验收 | 多列、不同高度、间距与重排示意 |
| [Space 间距](https://ant.design/components/space-cn/) | 静态；待验收 | 横向、纵向、换行、Compact 紧凑组合 |
| [Splitter 分隔面板](https://ant.design/components/splitter-cn/) | 静态；待验收 | 水平、垂直、可折叠、拖拽分隔示意 |

### 03 导航 / Navigation

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [Anchor 锚点](https://ant.design/components/anchor-cn/) | 静态；待验收 | 横向、纵向、当前项、滚动定位示意 |
| [Breadcrumb 面包屑](https://ant.design/components/breadcrumb-cn/) | 静态；待验收 | 基本路径、自定义分隔、下拉路径 |
| [Dropdown 下拉菜单](https://ant.design/components/dropdown-cn/) | 静态；待验收 | 触发器、展开浮层、选项、禁用项 |
| [Menu 导航菜单](https://ant.design/components/menu-cn/) | 静态；待验收 | 水平、垂直、内嵌、子菜单、选中与折叠 |
| [Pagination 分页](https://ant.design/components/pagination-cn/) | 静态；待验收 | 基础、简洁、尺寸切换、跳页、总数 |
| [Steps 步骤条](https://ant.design/components/steps-cn/) | 静态；待验收 | 水平、垂直、当前/完成/错误、点状 |
| [Tabs 标签页](https://ant.design/components/tabs-cn/) | 静态；待验收 | 线形、卡片、可编辑、位置、溢出 |

### 04 数据录入 / Data Entry

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [AutoComplete 自动完成](https://ant.design/components/auto-complete-cn/) | Live；官网 Usage 已实例化 | 输入框、建议展开、分组建议、禁用 |
| [Cascader 级联选择](https://ant.design/components/cascader-cn/) | Live；官网 Usage 已实例化 | 单选、多选、展开路径、搜索 |
| [Checkbox 多选框](https://ant.design/components/checkbox-cn/) | Live；官网 Usage 已实例化 | 未选、选中、半选、禁用、组合 |
| [ColorPicker 颜色选择器](https://ant.design/components/color-picker-cn/) | Live；官网 Usage 已实例化 | 触发器、展开面板、透明度、预设色 |
| [DatePicker 日期选择框](https://ant.design/components/date-picker-cn/) | Live；官网 Usage 已实例化 | 单日期、范围、日期时间、面板、禁用日期 |
| [Form 表单](https://ant.design/components/form-cn/) | Live；含官网 Principles | 布局、标签、必填、校验反馈、动态表单项 |
| [Input 输入框](https://ant.design/components/input-cn/) | Live；官网 Usage 已实例化 | 基础、搜索、密码、多行、OTP、前后缀 |
| [InputNumber 数字输入框](https://ant.design/components/input-number-cn/) | Live；官网 Usage 已实例化 | 步进、边界、格式化、前后缀、禁用 |
| [Mentions 提及](https://ant.design/components/mentions-cn/) | Live；官网 Usage 已实例化 | 输入、建议列表、多行与禁用 |
| [Radio 单选框](https://ant.design/components/radio-cn/) | Live；官网 Usage 已实例化 | 独立、组合、按钮式、选中与禁用 |
| [Rate 评分](https://ant.design/components/rate-cn/) | Live；官网 Usage 已实例化 | 整星、半星、只读、清除 |
| [Select 选择器](https://ant.design/components/select-cn/) | Live；官网 Usage 已实例化 | 单选、多选、标签、搜索、展开与无结果 |
| [Slider 滑动输入条](https://ant.design/components/slider-cn/) | Live；官网 Usage 已实例化 | 单值、范围、刻度、垂直、禁用 |
| [Switch 开关](https://ant.design/components/switch-cn/) | Live；官网 Usage 已实例化 | 开/关、大小、文字、加载、禁用 |
| [TimePicker 时间选择框](https://ant.design/components/time-picker-cn/) | Live；官网 Usage 已实例化 | 单值、范围、面板、12/24 小时、禁用 |
| [Transfer 穿梭框](https://ant.design/components/transfer-cn/) | Live；官网 Usage 已实例化 | 左右列表、选择、搜索、分页、禁用 |
| [TreeSelect 树选择](https://ant.design/components/tree-select-cn/) | Live；官网 Usage 已实例化 | 单选、多选、勾选、搜索、展开 |
| [Upload 上传](https://ant.design/components/upload-cn/) | Live；官网 Usage 已实例化 | 按钮、拖拽、图片墙、进度、成功与失败 |

Data Entry 验收基线：每个 Components 画板只有一个 `reusable: true` 定义，其他状态均为该定义的可配置 `ref` 实例；Usage 必须从对应的 Ant Design 官方组件页通过 Pen 原生 `Import to Canvas` 导入 `.demo-wrapper`，保留官网标题、说明、双列顺序和卡片尺寸，再将示例预览替换为组件实例。生成脚本只维护 Components，不重绘或覆盖已导入的 Usage。该分组只有 Form 对应独立设计规范页，Principles 来源为 [Form Page](https://ant.design/docs/spec/research-form/)。

### 05 数据展示 / Data Display

Components 的状态范围、实例约束和验证命令见 [Data Display Components](./data-display-components.md)。当前 21 个画板包含 119 个状态和 37 个唯一主/子组件定义；该状态覆盖不等于完整官网 Usage 或所有交互 API 的验收。

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [Avatar 头像](https://ant.design/components/avatar-cn/) | Live；唯一组件定义 | 图片、文字、图标、尺寸、头像组 |
| [Badge 徽标数](https://ant.design/components/badge-cn/) | Live；唯一组件定义 | 数字、溢出、红点、状态点、缎带 |
| [Calendar 日历](https://ant.design/components/calendar-cn/) | Live；唯一组件定义 | 月/年、全屏/卡片、选中、自定义单元格 |
| [Card 卡片](https://ant.design/components/card-cn/) | Live；唯一组件定义 | 标题与操作、封面、Meta、网格、加载 |
| [Carousel 走马灯](https://ant.design/components/carousel-cn/) | Live；唯一组件定义 | 指示器、箭头、横/纵方向、切换示意 |
| [Collapse 折叠面板](https://ant.design/components/collapse-cn/) | Live；唯一组件定义 | 展开/收起、手风琴、嵌套、简洁样式 |
| [Descriptions 描述列表](https://ant.design/components/descriptions-cn/) | Live；唯一组件定义 | 横/纵布局、边框、列数、跨列 |
| [Empty 空状态](https://ant.design/components/empty-cn/) | Live；含官网 Principles | 默认、简洁、自定义说明与操作 |
| [Image 图片](https://ant.design/components/image-cn/) | Live；唯一组件定义 | 加载、失败、单图预览、多图预览 |
| [List 列表](https://ant.design/components/list-cn/) | Live；含官网 Principles；官网已废弃 | 保留官网废弃标记；既有列表样例待评估 |
| [Listy 虚拟列表](https://ant.design/components/listy-cn/) | Live；7 张官网 Usage 已实例化 | 固定高度、虚拟滚动、分组、吸顶；版本门槛 6.6.0 |
| [Popover 气泡卡片](https://ant.design/components/popover-cn/) | Live；唯一组件定义 | 触发器、标题与内容、位置、展开 |
| [QRCode 二维码](https://ant.design/components/qr-code-cn/) | Live；唯一组件定义 | 默认、加载、过期、扫描完成 |
| [Segmented 分段控制器](https://ant.design/components/segmented-cn/) | Live；唯一组件定义 | 文字、图标、尺寸、选中、禁用 |
| [Statistic 统计数值](https://ant.design/components/statistic-cn/) | Live；唯一组件定义 | 基础、前后缀、精度、计时展示 |
| [Table 表格](https://ant.design/components/table-cn/) | Live；43 张官网 Usage 已实例化；含官网 Principles | 排序、筛选、选择、分页、展开、固定列、空/加载 |
| [Tag 标签](https://ant.design/components/tag-cn/) | Live；唯一组件定义 | 基础、语义色、图标、可关闭、可选择 |
| [Timeline 时间轴](https://ant.design/components/timeline-cn/) | Live；唯一组件定义 | 方向、位置、状态点、待完成 |
| [Tooltip 文字提示](https://ant.design/components/tooltip-cn/) | Live；唯一组件定义 | 触发器、方向、多行、颜色 |
| [Tour 漫游式引导](https://ant.design/components/tour-cn/) | Live；唯一组件定义 | 遮罩、高亮目标、步骤卡片、前后步 |
| [Tree 树形控件](https://ant.design/components/tree-cn/) | Live；唯一组件定义 | 展开、选择、勾选、半选、拖拽、异步示意 |

### 06 反馈 / Feedback

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [Alert 警告提示](https://ant.design/components/alert-cn/) | Live；唯一组件定义 | 四种语义、说明、关闭、横幅 |
| [Drawer 抽屉](https://ant.design/components/drawer-cn/) | Live；唯一组件定义 | 方向、尺寸、标题操作、遮罩、页脚 |
| [Message 全局提示](https://ant.design/components/message-cn/) | Live；9 张官网 Usage 已实例化；含官网 Principles | 成功/错误/信息/警告/加载、更新与堆叠 |
| [Modal 对话框](https://ant.design/components/modal-cn/) | Live；唯一组件定义 | 基础、确认、语义反馈、加载、自定义页脚 |
| [Notification 通知提醒框](https://ant.design/components/notification-cn/) | Live；12 张官网 Usage 已实例化；含官网 Principles | 标题说明、语义、操作、关闭、位置与堆叠 |
| [Popconfirm 气泡确认框](https://ant.design/components/popconfirm-cn/) | Live；唯一组件定义 | 触发器、确认/取消、位置、确认中 |
| [Progress 进度条](https://ant.design/components/progress-cn/) | Live；唯一组件定义 | 线形、圆形、仪表盘、分段、成功/异常 |
| [Result 结果](https://ant.design/components/result-cn/) | Live；含官网 Principles | 成功、信息、警告、错误、403/404/500 |
| [Skeleton 骨架屏](https://ant.design/components/skeleton-cn/) | Live；唯一组件定义 | 文字、头像、按钮、输入框、激活效果 |
| [Spin 加载中](https://ant.design/components/spin-cn/) | Live；唯一组件定义 | 尺寸、说明、容器内、全屏 |
| [Watermark 水印](https://ant.design/components/watermark-cn/) | Live；5 张官网 Usage 已实例化 | 文字、图片、多行、覆盖区域 |

### 07 其他 / Other

| 组件 / 官方文档 | Pen 现状 | 后续最小检查范围 |
| --- | --- | --- |
| [Affix 固钉](https://ant.design/components/affix-cn/) | Live；唯一组件定义 | 顶部/底部固定、容器、滚动前后示意 |
| [App 包裹组件](https://ant.design/components/app-cn/) | Live；唯一组件定义 | 上下文与反馈调用示例；无需独立装饰外框 |
| [BorderBeam 边框流光](https://ant.design/components/border-beam-cn/) | Live；8 张官网 Usage 已实例化 | 官方组件，6.4.0 起支持；children、color、count、duration、lineWidth、outset、size |
ConfigProvider 与 Util 已按项目范围排除，不创建详情区、总览卡或组件定义。

## 4. 特殊条目的落地方式

### Icon：独立图标资产集

Icon 虽在官网通用组中，但来自独立 `@ant-design/icons` 包，不应因不在 `antd` 顶层视觉导出列表中就漏掉。建议先提供常用图标检索页与可复用图标，按线框、实底、双色组织；保留真实导出名和包来源。无需把每个图标计成一个官网一级组件。[官方说明](https://ant.design/components/icon-cn/)

### Message / Notification：调用 API 与视觉资产分别建模

两者都有用户可见的浮层，应在反馈组提供可复用视觉状态与触发示例。代码映射分别指向 `message`、`notification`，不能虚构 `<Message />` 或 `<Notification />` 导出。交付时优先说明 Hooks 或 App 提供的实例调用方式。不能因服务调用方式就将它们排除在官网目录之外。[Message](https://ant.design/components/message-cn/) · [Notification](https://ant.design/components/notification-cn/)

### Grid / Row / Col：一个目录入口，多个构建资产

官网以 Grid 作为一级入口，实际栅格由 Row、Col 组合。Pen 可保留两个可复用节点，但总览卡片与覆盖统计只计算 Grid 一项。建议收进 `section-grid`，同步处理现有引用与生成器，避免反复生成额外目录。[Grid 文档](https://ant.design/components/grid-cn/)

### App 与项目范围排除项

App 保留官网入口和组合示例。ConfigProvider 与 Util 不属于本项目交付范围，不在 Pen 中创建入口、详情区或可复用组件。

### 重型组件：独立扩展范围

官网总览还提供以下 6 个 Pro Components 入口；它们不并入上述 73 项，也不应当作为当前 `antd@6.6.4` 基础库的漏项。当前基础 Registry 与组件详情区没有这些独立入口，业务模板页不等于已经完成 Pro 组件适配。[官网扩展入口](https://ant.design/components/overview-cn/)

| 条目 | 中文名 | 后续建议 |
| --- | --- | --- |
| ProLayout | 高级布局 | 基础组对齐后另建扩展库 |
| ProForm | 高级表单 | 同上 |
| ProTable | 高级表格 | 同上 |
| ProDescriptions | 高级定义列表 | 同上 |
| ProList | 高级列表 | 同上 |
| EditableProTable | 可编辑表格 | 同上 |

## 5. 本地证据与结构检查

当前补充项已经在 `libraries/antd-6.lib.pen` 中完成实例检查：

| 组件 | 官网 Usage 卡片 | Usage 中组件实例 | Components 定义 |
| --- | ---: | ---: | ---: |
| Message | 9 | 9 | 1 |
| Notification | 12 | 12 | 1 |
| Listy | 7 | 7 | 1 |
| Watermark | 5 | 5 | 1 |

Data Entry、Data Display、Feedback、Other 共 54 个详情区已完成 Usage 与 Principles 复核。当前 54 个 Usage 共使用 714 个 `ref` 实例，直接 Script 为 0、实例裁切为 0、Usage 外框溢出为 0、脚本编译/运行错误为 0、实例内文本重叠为 0。Badge 的 Indicator 已收进 Badge 实现，不再作为第二个组件定义出现在组件列表。

Data Display、Feedback、Other 的 36 个 Usage 必须保存真实 Pen 官网导入根，根节点 `context` 使用 `antd-official-import:<source>|<selector>` 记录来源；禁止用手工生成的相似卡片冒充 Import。当前 36 个 Usage 均已重新核对来源：34 个来自各自组件页的 `.demo-wrapper`，BackTop 来自 FloatButton 官网页的 `#float-button-demo-back-top`，Table 保留完整的 43 张官网示例卡。导入后共使用 398 个组件实例，Usage 直接 Script、底部操作区、标题编辑按钮、实例裁切均为 0。

Principles 当前按官网内容、Figma 覆盖提示的规则覆盖 **36 个组件或设计资产**：社区 Figma 59 个组件页中明确存在 `Principles`/`Principle` 的 17 项缺失数为 0；官网共享 Design 页面中具有明确组件章节的项目也已补入。新增 18 个官方 Principles 画板、28 张官方设计插图；官网来源 URL 存在内容容器的 `context` 中，可视内容按官网的标题、图片、说明和 Note 顺序排列，插图已保存到 `assets/principles` 并由 Pen 使用相对路径引用。`Select` 与 `InputNumber` 不复制 Dropdown、Slider 的章节，`PageHeader` 仅作为设计规范资产保留，不重新加入 Ant Design 6 的运行时组件目录。完整清单与来源见 [`docs/antd-principles-audit.md`](./antd-principles-audit.md)。QRCode、Tour、Spin、Affix、App 等没有上述官方依据的旧占位 Principles 已删除；BackTop 因官网 Navigation Design 页面存在明确章节，已补回正式 Principles。

本轮视觉修复包括：重新按实际内容计算 61 个 Usage/Principles 画板和 54 个详情区的高度；修复 Form Principles 旧手工稿与官网不一致的问题；恢复 Avatar、Calendar、Carousel、Empty、Image、QRCode 的固定比例，避免实例被示例占位框拉伸或压缩；修复 Drawer、Modal 中非法 `break` 导致的脚本编译错误，以及 App 中未定义组件名导致的运行异常。官网示例标题使用 `y = -15`、高度 30 的标题片，并按第 3 条的光学偏移与分割线居中。

官网导入完成后必须立即把导入根节点移动到目标 Usage/Principles，或在替换完成后删除。画布根层只允许 Components Overview、Templates & Pages、Colors & Tokens 和 7 个正式分组；禁止保留导入缓存、替换工作区或游离组件源。组件定义只能位于对应 Components，Usage 和其他示例位置只能创建指向该定义的实例。本轮已删除 28 个无引用的历史导入残留；根层节点恢复为 10 个正式主 Frame，全部 91 个 reusable 定义都位于 Components，2317 个实例引用断链为 0。

Data Entry 的 18 个 Components 已按官网当前示例重新核对。Upload 的按钮、Dragger、Picture Card、禁用状态及实例尺寸已修正；同时修复 Switch 的官方尺寸、ColorPicker 的默认/文字/尺寸触发器、Transfer 的搜索与单向模式、Slider 的范围和刻度、Rate 的数量与半星、TreeSelect/Cascader 的多选和展开层、Form 的布局/必填/错误状态、TimePicker 的 12 小时制与时间面板、Checkbox 的半选状态、InputNumber 的尺寸与禁用状态。验证结果：18 个 Components 各有且仅有 1 个 reusable 定义，82 个 Components 实例和 375 个 Usage 实例均无裁切、溢出、脚本错误或文本重叠。

Data Entry 渲染器验收必须执行默认值和 Components 中列出的每个配置状态，不能只检查默认状态。Path 节点必须同时提供 `geometry` 与四项 `viewBox`，嵌套 Script 必须指向存在的组件文件；运行 `pnpm verify:data-entry` 统一检查。Checkbox Group 等由多个实例组成的官网示例还要检查组合容器方向与边界，所有实例、组合容器的裁切数必须为 0。

Upload 的按钮模式必须使用真实的 Button 实例作为 Upload 定义的子节点，Button 的 `icon` 属性保存 Icon 实例配置（`UploadOutlined`），不得在 Upload 脚本中重画按钮、文字或上传图标。Upload 定义采用稳定的容器结构：Button 实例负责普通与禁用触发器，Upload 自身的渲染节点只负责 Dragger 和 Picture Card；Components 与 Usage 通过同一个 Upload 定义的实例覆盖启用状态和属性。这样可避免“脚本生成 Button 引用后再次实例化”造成的裁切，同时保留可点击、可识别的组件嵌套关系。

ConfigProvider 的详情区、总览卡、可复用定义和独立脚本已删除；Util 不创建。官网示例说明中出现的“ConfigProvider”文字属于示例正文，不作为目录入口或组件定义。

明确定位：

| 问题 | 本地证据 | 后续处理 |
| --- | --- | --- |
| Affix 总览分类错 | `layer-components-overview` 下 `ov-card-affix-11` 位于 Navigation 标题之后；详情在 `layer-other` | 总览移动到其他组 |
| Masonry 总览分类错 | `ov-card-masonry-70` 位于 Other 标题之后；详情在 `layer-layout` | 总览移动到布局组 |
| 生成后可能复发 | `scripts/generate-figma-design-system.mjs` 中总览数组仍将 Affix 放 Navigation、Masonry 放 Other | 实施时同步修改生成源 |
| 五项只有展示 | `section-typography`、`section-autocomplete`、`section-inputnumber`、`section-timepicker`、`section-treeselect` 内无 reusable 节点 | 把可用单元整理成组件源并测试实例引用 |
| Button 静态复用缺口 | 存在 `antd-button-live-origin`，但无静态 reusable 节点 | 若继续承诺静态与 Live 双交付，则补静态组件源 |
| 官方名称不一致 | TimePicker 当前“时间选择器”、DatePicker“日期选择器”、Splitter“折叠分割器”、BorderBeam“发光边框”、App“包裹器” | 目录统一为本文官网名称；内部资产名按需保留 |
| 文档与文件不符 | README 已按当前扫描更新；画板仍待新版验收 | 后续继续以实测更新 |

## 6. 建议执行顺序

### P0：先对齐目录和分组

- [x] 运行时采用 6.6.4；Message、Notification、Listy、Watermark 已接入当前 Pen。
- [ ] 总览、详情、Registry 和生成器统一使用 7 组官方顺序及中文名。
- [ ] 修正总览 Affix、Masonry 分类，组内顺序与第 3 节一致。
- [x] Row、Col 已收进 Grid；BackTop 暂作为本地额外一级项保留。
- [x] Icon、Message、Notification、Listy 已补齐目录、唯一组件定义和官网 Usage 实例；ConfigProvider、Util 按项目范围排除。
- [ ] List 标注官网废弃状态，不混淆运行时版本与既有 Pen 资产状态。

### P1：补实际可用的组件与状态

- [ ] 修复五项“仅展示”的复用缺口，明确 Button 静态与 Live 的交付范围。
- [ ] 每个目录项按第 3 节检查变体、关键子组件、展开浮层及异常状态。
- [ ] 对 Live 目标逐项检查 Script 挂载、Inspector 改值、重渲染和保存重开；不能以脚本文件存在代替接入验收。
- [ ] 使用目标 Ant Design 版本、固定视口与主题生成真实样例，对照 Pen 进行截图检查。

### P2：补设计说明与维护入口

- [ ] 补 Usage 与必要的 Principles，已有规范可共用，缺省项需明确不适用原因。
- [ ] 同步 `registry/components.json`、Props/Inspector Registry、状态矩阵与渲染样例。
- [ ] 同步 README 和 `skills/antd-prototype/references/component-catalog.md` 的数量与能力说明。
- [ ] 将重型组件列为独立扩展计划。

## 7. 单项验收标准

后续每个条目维护如下记录，不用单一“已完成”掩盖不同层面的缺口：

| 字段 | 通过条件 |
| --- | --- |
| 目录与分组 | 官网名、中文名、分组、排序一致；overview 与详情均可定位 |
| 版本与映射 | 记录目标版本、包名、实际导出或调用 API；新版本能力明确标记 |
| 组件资产 | 视觉项可实例化并编辑必要内容；能力项有说明/示例与不适用原因 |
| 变体与状态 | 第 3 节最小范围逐项确认；适用时覆盖默认、悬停、聚焦、禁用、加载、错误 |
| 弹层与组合 | 选择器、菜单、提示等同时覆盖触发器与展开状态；关键组合可复用 |
| Live（若承诺） | 实际 Script 挂载成功，属性变更有效，保存后重新打开正常 |
| 视觉 | 有相同主题/尺寸/视口下的官网或目标版本渲染对照；间距、文字、图标、颜色无明显偏差 |
| 交付说明 | 存在用途、组合方法、代码映射；运行时才能完成的交互明确描述 |

建议记录格式：`组件名 / 目标版本 / 目录状态 / 复用状态 / 变体状态 / Live 状态 / 视觉状态 / 节点 ID / 待办`。General、Layout、Navigation 之外的四个分组已完成 Usage/Principles 的结构检查、异常修复和代表性视觉复核；后续修改仍需重复本节检查。

## 8. 核对来源与维护

官网：以第 3 节逐项链接为入口，目录基线来自 [组件总览](https://ant.design/components/overview-cn/)。版本变化后需重新核对，不能把本文当成永久不变的目录。

本地核查文件：

- `package.json`：Ant Design 固定版本。
- `libraries/antd-6.lib.pen`：实际分组、画板、reusable 与 Script 节点。
- `registry/components.json`：类型与 Inspector 数据来源；项目目录范围以本文和 Pen 画布为准。
- `registry/props.antd-6.6.4.json`：目标版本属性及子项；不是官网导航目录。
- `scripts/generate-figma-design-system.mjs`：总览与详情的生成源。
- `README.md`、`skills/antd-prototype/references/component-catalog.md`：现有能力宣称与目录口径。

本次文档验收：项目范围内 71 个官网条目无缺口；General、Layout、Navigation 之外的 54 个 Usage 已全部实例化并通过溢出、裁切、脚本错误和文本重叠检查；7 个有官网独立规范页的 Principles 已完成来源与图片验证；ConfigProvider 与 Util 明确排除。

## 9. 组件嵌套与属性约束

- 组件只能暴露 Ant Design 的公开属性。`display="trigger"`、`group`、`button`、在基础 DatePicker/TimePicker 上增加 `range` 等示例选择器，不能用于把一个组件切换成另一个组件或整块示例。
- 官方复合 API 使用独立定义：`DatePicker.RangePicker`、`TimePicker.RangePicker`、`Checkbox.Group`、`Radio.Group`、`Radio.Button` 分开实现，基础组件不再承担这些渲染模式。
- 有内容插槽的控件使用官方属性名。Checkbox、Radio、Tag、Dropdown 的文字通过 `children` 传入；图标和结构化内容仍使用可识别的组件属性。
- Usage 通过真实实例组合。Message、Notification 的静态官网示例使用 Button 实例作为触发器；Badge 定义直接包含被包裹的子组件实例和独立指示器，不再把 FloatButton 序列化到 Badge 的字符串属性中。
- Data Display、Feedback、Other 的 Usage 必须保留官网 `.demo-wrapper` 导入根、卡片标题、说明、顺序和双列结构。导入后的预览内容按官网初始态替换：Message、Notification、Modal、Drawer、Popover、Popconfirm、Tooltip、Tour 使用 Button 实例作为触发器；Badge 使用 Avatar/Card 与 Badge 的嵌套实例；BorderBeam、Affix、App 使用 `children` 组件引用。不得为了让示例可见而把所有浮层强制设为打开态。
- 实例替换后必须重新校正预览容器尺寸。绝对布局的实例使用官网预览区内边距，自动布局的实例不得写入无效的 `x/y`；组件宽高不得沿用超出示例卡的定义尺寸。除 Overflow 专页外，Usage 不显示组件版本标签。
- 修改渲染器或生成器后运行 `npm run verify:composition`。该检查会拒绝已确认的私有渲染选择器，并验证必要的官方子组件定义已经登记。
