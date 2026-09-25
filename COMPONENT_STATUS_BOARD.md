# Ant Design 组件库落地与对齐状态跟踪看板 (Component Status Board)

> **基准版本**：`antd@6.6.4`  
> **数据基准源**：[`registry/antd-official-components.json`](registry/antd-official-components.json)（官方 7 组 73 项基础组件 + 6 项 Pro 重型组件）  
> **设计库文件**：`libraries/antd-6.lib.pen`  
> **更新时间**：2026-09-18  
> **状态口径**：
> - 🟢 **已完成 (Completed)**：具备 1:1 Live 脚本组件或高保真可复用节点，通过双语居中、物理度量、全状态覆盖及三画板验收。
> - 🟡 **进行中 / 待优化 (In Progress)**：已有基础画板或静态节点，但存在缺少可复用 Master、三画板未标准化（如宽度非 1728px）、或待迁移为 Live 组件。
> - 🔴 **未开始 / 缺失 (Missing)**：画布中完全缺失对应 section / artboards 详情区或独立资产。
> - ⚪ **特殊能力项 (Special / N/A)**：非独立 UI 图元（如工具类 Util、Pro 扩展组件规划等）。

---

## 一、全局宏观进度看板 (Overall Progress)

```
[基础组件完成度]
🟢 已完成 (Completed):       9 / 73  (12.3%)   [Icon、Typography、Layout 全部 7 项]
🟡 进行中 (In Progress):    60 / 73  (82.2%)   [已有画板/节点，待三画板标准化与对齐验收]
🔴 缺失项 (Missing):         4 / 73   (5.5%)   [Message, Notification, Listy, Util]
─────────────────────────────────────────────────────────────────────────────
官方基础组件总数: 73 项 (另有 Pro 扩展重型组件 6 项规划)
```

---

## 二、01 通用 / General (4 项) · 2 项已完成，Button 属性面板修复已验证，FloatButton 待验收

> **维护说明**：`Button` 保留已验收的视觉规格，按用户要求维护原生组件嵌套；`FloatButton`、`Typography`、`Icon` 已完成标准画板、母体脚本与实例建设。`Icon`、`Typography` 于 2026-09-18 经用户确认完成，退出待优化队列；后续修改须保留已有验收结果与组件实例结构。

| 组件名称 | 中文名称 | 当前交付类型 | 画板状态 (P / U / C) | 状态 | 详细诊断与后续行动项 |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Button** | 按钮 | **根 Script + Inspector 属性 + Icon ref** | ✅ 1728 / ✅ 1728 / ✅ 1728 | 🟡 **属性面板修复已验证** | Usage / Components 共 379 个根实例；icon 为组件引用属性，children 为字符串，富文本通过内容组件引用保留。根 children、icon、disabled 已在编辑器操作验证，75 项组合检查通过；完整画布截图导出超时，未据此声明视觉验收完成。见 [Button 契约](canvas-components/Button.md) 和 [审计](GENERAL_INSTANCE_AUDIT.md)。 |
| **Icon** | 图标 | **Live Script** (`Icon.js`) | ✅ 1728 / ✅ 1728 / ✅ 1728 | 🟢 **已完成** | 1. Principles 从官方 https://ant.design/docs/spec/icon/ 导入，语义双栏图文配对；<br>2. Usage 保留 5 个官方示例，20 个图标全部引用组件实例；<br>3. Components 包含 842 个 Live Icon 实例（无版本标签），按 Outlined（445）、Filled（249）、Two-tone（148）分组，各组保留分类，属性矩阵位于目录下方；<br>4. Live 脚本使用已安装官方包的 848 个 SVG 定义及双色算法，属性为精确导出名、fontSize（对应 style.fontSize）、color、twoToneColor、rotate；spin 仅展示静态阶段图；<br>5. 三画板宽 1728px，80px 标题位于 (32,32)，内容位于 (32,160)；几何、颜色、布局与截图已核验；`pnpm verify:icon` 通过 848 个官方 SVG 定义及颜色、双色、尺寸、旋转检查。 |
| **Typography** | 排版 | **Live Script** (`Typography.js`) | ✅ 1728 / ✅ 1728 / ✅ 1728 | 🟢 **已完成** | 1. Components 与 Usage 共 113 个组件实例，保留属性矩阵并补齐背景、动作状态和宽度矩阵；<br>2. 统一生成器与运行模板，使用官方图标、主题 token 及 Pencil 支持的 Inter / Roboto Mono 字体，修复背景宽度、文字装饰、编辑/复制图标及 Expand/Collapse 位置、换行与省略；<br>3. 修复示例卡片标题居中和内容裁切；<br>4. `pnpm verify:typography` 通过 41 个官方浏览器几何/溢出案例及 15 个 Pencil 实测文字宽度检查，并完成画布近景复核；字体契约和 runtime-only 限制见 [Typography 说明](canvas-components/Typography.md)。 |
| **FloatButton** | 悬浮按钮 | **根 Script + Icon ref + Group/Menu** | ⚪ 官网无设计项不建 / ✅ 1728 / ✅ 1728 | 🟡 **待验收** | 保留双列 Usage、Components 矩阵和 Badge → FloatButton → Icon 引用结构；根脚本声明 shape/type/content/state/icon，Badge 父级声明 count/dot/children。39 项官方实现对比通过；根属性面板与 Badge 实例交互已验证，保存重开后状态与嵌套图标正确。见 [FloatButton 契约](canvas-components/FloatButton.md)。 |

---

## 三、02 布局 / Layout (7 项) · 已完成

2026-09-18 用户确认 Layout Group 已完成。七项保留官方 Usage、独立脚本实例和对应官方 Principles；Row / Col 归入 Grid。详见 [Layout 审计](LAYOUT_COMPONENT_AUDIT.md)。

| 组件名称 | 中文名称 | 当前交付类型 | 状态 | 已实现内容 |
| :--- | :--- | :--- | :---: | :--- |
| **Divider** | 分割线 | Script + 实例 | 🟢 用户已验收 | 方向、线型、标题位置、plain、间距；v6 orientation / titlePlacement 语义 |
| **Flex** | 弹性布局 | Script + 嵌套实例 | 🟢 用户已验收 | 方向、justify、align、gap、wrap、嵌套 Flex / Button |
| **Grid** | 栅格 | Row / Col Script + 实例 | 🟢 用户已验收 | 24 列、gutter、offset、order、对齐、响应式快照；共享官方 Grid 原则 |
| **Layout** | 布局 | Script + 子组件实例 | 🟢 用户已验收 | Header / Sider / Content / Footer、折叠宽度、主题；官方 Principles 图文配对 |
| **Masonry** | 瀑布流 | Script + 内容实例 | 🟢 用户已验收 | 最短列分配、多列、双轴间距、固定列、动态内容快照 |
| **Space** | 间距 | Script + 嵌套实例 | 🟢 用户已验收 | 尺寸、方向、对齐、换行、Divider separator、Compact / Addon / Input / Button |
| **Splitter** | 分隔面板 | Script + Panel 实例 | 🟢 用户已验收 | 方向、比例、禁用调整、折叠快照、三面板及嵌套 Splitter |


---

## 四、03 导航 / Navigation (7 项) · 已更新，待用户验收

遵循 Layout 规范：每项在 Components 中仅一个可复用定义；Usage 和配置样例使用独立脚本实例。官方页面共 87 个示例，六个 Principles 画板，13 张原始插图。无属性矩阵、版本标签或示例操作条。详见 [Navigation 审计](NAVIGATION_COMPONENT_AUDIT.md)。

| 组件名称 | 中文名称 | 当前交付类型 | 状态 | 官方 Usage |
| :--- | :--- | :--- | :---: | :--- |
| **Anchor** | 锚点 | Script + 独立实例 | 🟡 待用户验收 | 9 个官方示例；垂直、水平、嵌套、偏移与语义样式已按 6.6.4 对齐 |
| **Breadcrumb** | 面包屑 | Script + 独立实例 | 🟡 待用户验收 | 8 个官方示例；图标均为 Icon 实例，路由菜单、颜色与语义样式已对齐 |
| **Dropdown** | 下拉菜单 | Script + 独立实例 | 🟡 待用户验收 | 17 个官方示例；分组按钮与 Loading 示例使用 Space.Compact，嵌套 Button/Dropdown/Icon 状态已对齐 |
| **Menu** | 导航菜单 | Script + 独立实例 | 🟡 待用户验收 | 11 个官方示例 |
| **Pagination** | 分页 | Script + 独立实例 | 🟡 待用户验收 | 13 个官方示例 |
| **Steps** | 步骤条 | Script + 独立实例 | 🟡 待用户验收 | 13 个官方示例 |
| **Tabs** | 标签页 | Script + 独立实例 | 🟡 待用户验收 | 16 个官方示例 |

---

## 五、04 数据录入 / Data Entry (18 项)

| 组件名称 | 中文名称 | 当前交付类型 | 状态 | 优化行动项 |
| :--- | :--- | :--- | :---: | :--- |
| **AutoComplete** | 自动完成 | 仅展示 | 🟡 待补齐Master | 缺可复用节点，补齐浮层建议卡 |
| **Cascader** | 级联选择 | 静态 Frame | 🟡 待验收 | 多列联动浮层与选择高亮 |
| **Checkbox** | 多选框 | 静态 Frame | 🟡 待验收 | 选中、未选、半选及组排版 |
| **ColorPicker** | 颜色选择器 | 静态 Frame | 🟡 待验收 | 预设色、透明度调节面板 |
| **DatePicker** | 日期选择框 | 静态 Frame | 🟡 待验收 | 日期/月份/年份/时间范围选择 |
| **Form** | 表单 | 静态 Frame | 🟡 待验收 | 垂直/水平排版与校验报错提示 |
| **Input** | 输入框 | 静态 Frame | 🟡 待优化 | 基础/前缀/后缀/密码/OTP/文本域 |
| **InputNumber** | 数字输入框 | **Live Script** (`InputNumber.js`) + 独立实例 | 🟢 **已完成** | 官方 14 个示例通过原生 import 完整恢复，包含步进器微调器、Spinner、Formatter、前后缀图标、四形态变体与状态。通过 Data Entry 自动化检验与视觉复核。 |
| **Mentions** | 提及 | 静态 Frame | 🟡 待验收 | `@` 唤出列表与选中 |
| **Radio** | 单选框 | 静态 Frame | 🟡 待验收 | 单选圆点与单选按钮组合（Radio.Group） |
| **Rate** | 评分 | 静态 Frame | 🟡 待验收 | 半星、整星与只读态 |
| **Select** | 选择器 | 静态 Frame | 🟡 待优化 | 单选、多选 Tag 与展开面板 |
| **Slider** | 滑动输入条 | 静态 Frame | 🟡 待验收 | 单滑块、双范围滑块与刻度线 |
| **Switch** | 开关 | 静态 Frame | 🟡 待验收 | 开/关、加载中与禁用态 |
| **TimePicker** | 时间选择框 | 仅展示 | 🟡 待补齐Master | 缺可复用节点，时分秒列排版 |
| **Transfer** | 穿梭框 | 静态 Frame | 🟡 待验收 | 左右双列穿梭与搜索框 |
| **TreeSelect** | 树选择 | 仅展示 | 🟡 待补齐Master | 缺可复用节点，树形多选下拉 |
| **Upload** | 上传 | 静态 Frame | 🟡 待验收 | 按钮上传、图片墙与拖拽上传 |

---

## 六、05 数据展示 / Data Display (21 项)

| 组件名称 | 中文名称 | 当前交付类型 | 状态 | 优化行动项 |
| :--- | :--- | :--- | :---: | :--- |
| **Avatar** | 头像 | 静态 Frame | 🟡 待验收 | 字符、图标、图片与 Avatar.Group |
| **Badge** | 徽标数 | 静态详情页 + 根 Script wrapper / Indicator | 🟡 待验收 | General 使用的 Badge 父组件已提供 count、dot、children 引用、color、overflowCount、showZero 和 offset 控件；详情页其他变体不在本轮 Inspector 修复范围。 |
| **Calendar** | 日历 | 静态 Frame | 🟡 待验收 | 全屏日历与侧边卡片日历 |
| **Card** | 卡片 | 静态 Frame | 🟡 待验收 | 基础卡片、栅格卡片与封面图 |
| **Carousel** | 走马灯 | 静态 Frame | 🟡 待验收 | 轮播指示点与切换箭头 |
| **Collapse** | 折叠面板 | 静态 Frame | 🟡 待验收 | 手风琴模式与嵌套面板 |
| **Descriptions** | 描述列表 | 静态 Frame | 🟡 待验收 | 横向/纵向带边框键值表格 |
| **Empty** | 空状态 | 静态 Frame | 🟡 待验收 | 默认缺省插画与自定义说明 |
| **Image** | 图片 | 静态 Frame | 🟡 待验收 | 预览遮罩与加载占位 |
| **List** | 列表 | 静态 Frame | 🟡 已废弃 | 标记官方废弃态，保留兼容示例 |
| **Listy** | 虚拟列表 | 缺失 | 🔴 待补齐 | Antd 6.6.0 官方主推新虚拟列表组件 |
| **Popover** | 气泡卡片 | 静态 Frame | 🟡 待验收 | 浮层卡片面板与箭头指示 |
| **QRCode** | 二维码 | 静态 Frame | 🟡 待验收 | 基础二维码与失效刷新蒙层 |
| **Segmented** | 分段控制器 | 静态 Frame | 🟡 待验收 | 文字/图标滑动分段控件 |
| **Statistic** | 统计数值 | 静态 Frame | 🟡 待验收 | 数值与倒计时卡片 |
| **Table** | 表格 | 静态 Frame | 🟡 待优化 | 排序、筛选、固定表头/列与分页表格 |
| **Tag** | 标签 | 静态 Frame | 🟡 待验收 | 彩色预设色与可关闭标签 |
| **Timeline** | 时间轴 | 静态 Frame | 🟡 待验收 | 节点状态色与交替排列 |
| **Tooltip** | 文字提示 | 静态 Frame | 🟡 待验收 | 纯黑提示气泡与多方向 |
| **Tour** | 漫游式引导 | 静态 Frame | 🟡 待验收 | 引导卡片与目标高亮蒙层 |
| **Tree** | 树形控件 | 静态 Frame | 🟡 待验收 | 展开折叠与复选框勾选树 |

---

## 七、06 反馈 / Feedback (11 项)

| 组件名称 | 中文名称 | 当前交付类型 | 状态 | 优化行动项 |
| :--- | :--- | :--- | :---: | :--- |
| **Alert** | 警告提示 | 静态 Frame | 🟡 待验收 | 成功/警告/错误/信息 4 色横幅 |
| **Drawer** | 抽屉 | 静态 Frame | 🟡 待验收 | 上下左右滑出抽屉与遮罩 |
| **Message** | 全局提示 | 缺失 | 🔴 待补齐 | 顶部轻提示浮层（Success, Error, Info, Warning） |
| **Modal** | 对话框 | 静态 Frame | 🟡 待验收 | 居中弹窗、确认提示窗与拖拽弹窗 |
| **Notification** | 通知提醒框 | 缺失 | 🔴 待补齐 | 页面右上/右下角通知浮层卡片 |
| **Popconfirm** | 气泡确认框 | 静态 Frame | 🟡 待验收 | 问号提示、确认与取消按钮 |
| **Progress** | 进度条 | 静态 Frame | 🟡 待验收 | 线性进度、环形与仪表盘 |
| **Result** | 结果 | 静态 Frame | 🟡 待验收 | 403, 404, 500 与操作成功页 |
| **Skeleton** | 骨架屏 | 静态 Frame | 🟡 待验收 | 段落、头像与按钮占位动效 |
| **Spin** | 加载中 | 静态 Frame | 🟡 待验收 | 容器加载蒙层与单体菊花 |
| **Watermark** | 水印 | 静态 Frame | 🟡 待验收 | 文字倾斜全屏防截屏水印 |

---

## 八、07 其他 / Other (5 项)

| 组件名称 | 中文名称 | 当前交付类型 | 状态 | 优化行动项 |
| :--- | :--- | :--- | :---: | :--- |
| **Affix** | 固钉 | 静态 Frame | 🟡 待验收 | 滚动吸顶/吸底效果展示 |
| **App** | 包裹组件 | 静态 Frame | 🟡 待验收 | 上下文统一消费示例 |
| **BorderBeam** | 边框流光 | 静态 Frame | 🟡 待验收 | 6.4.0 新增动效边框 |
| **ConfigProvider** | 全局化配置 | 静态 Frame | 🟡 待验收 | 主题/国际化配置对照卡 |
| **Util** | 工具类 | 缺失 | ⚪ 特殊项 | 属于开发代码能力，不强制制作视觉图元 |

---

## 九、后续任务分步推进建议 (Next Steps)

1. **完成 FloatButton 本轮验收，并保留 General 组已完成成果**：Button 保留既有视觉规格及Icon / children 属性引用结构；Icon 与 Typography 已获用户确认完成，不再列为待建或待优化项。复用其三画板结构、组件实例和回归检查作为后续组件的参考。
2. **验收 Layout（布局）组**：七项已导入官方 Usage，主组件通过几何核验；辅助组件嵌套与视觉验收仍未完成。按 [Layout 审计](LAYOUT_COMPONENT_AUDIT.md) 复核官方原则来源、嵌套和画布运行时边界。
3. **后续组件验收**：遵循 [组件执行与校验规范](COMPONENT_EXECUTION_AND_VERIFICATION.md)，同时检查官方实现、Pencil 实际字体与图元尺寸、实例引用及画布近景，避免仅凭浏览器检查判定通过。

## Acceptance update

2026-09-18: The user confirmed the Layout group is finished. Navigation is the active group: Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, and Tabs. Preserve the accepted Layout implementation during Navigation work.
