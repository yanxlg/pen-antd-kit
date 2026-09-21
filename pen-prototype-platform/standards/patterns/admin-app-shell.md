# 后台应用外壳模板

## 1. 适用场景

使用 `Admin App Shell · 后台应用基础布局` 的前提是页面需要完整应用外壳：

- 独立部署的后台管理应用；
- 交付物明确要求同时展示全局导航、应用身份和宿主操作；
- 需要验证侧栏折叠、语言或 RTL 等跨页面能力。

微前端默认只生成业务内容，不重复生成宿主已经提供的 Header、Sider、应用切换和用户入口。仅当需求明确要求完整上下文时才使用本模板。

## 2. 模板职责

模板画布必须在页面外壳上方提供独立说明区，至少包含：

- 模板名称；
- 适用场景和不适用场景；
- 提供的主要功能；
- “引用模板、替换数据、填充 Page Body Slot、验证状态”的使用流程。

说明区使用与组件章节一致的轻量层级：父节点透明，不增加说明卡背景；标题使用一级标题样式，描述使用次级文字，场景、功能和使用方式以简洁文本节点并列展示，不包装成额外卡片。

模板在 `.pen` 中必须组织为一个完整父节点，而不是散落在 `Templates & Pages` 下的并列对象：

```text
App Shell · 后台应用模板
├── Title · 标题
├── Description · 模板描述
├── Scenario · 适用场景
├── Functions · 核心功能
├── Usage · 使用方式
├── Frame · Admin App Shell
├── Association Lines · 关联线与定位点
└── Sticky Notes · 区域说明
```

复制、移动或发布模板时以 `App Shell · 后台应用模板` 为整体单位；实际页面生成仍引用其中的 `Frame · Admin App Shell`。

模板提供所有页面共享的固定结构：

| 区域 | 固定规则 | 功能 |
| --- | --- | --- |
| 画板 | 1440 × 900 | 提供统一桌面原型基线 |
| Sider | 宽 239px，白色背景，右侧次级分隔线 | 展示应用身份和应用内导航 |
| 品牌区 | 高 64px | 展示应用 Logo、应用名和应用下拉入口 |
| Header | 高 64px，水平内边距 24px | 承载页面位置和全局操作 |
| Header Flex | 左右分组，左侧 gap 16px，右侧 gap 8px | 保持不同文案长度下的稳定对齐 |
| Content | 灰色布局背景，内边距 16px | 表达宿主内容边界 |
| Page Body Slot | 白色、直角、填满剩余区域 | 页面生成时唯一需要替换的业务内容容器 |

## 3. 区域功能

### 3.1 Sider 与菜单

- 品牌区允许替换应用 Logo、应用名和下拉图标，不改变 64px 高度。
- 菜单必须使用 Kit 内的 Ant Design `Menu` 实例。
- 页面生成时替换 `items`、`selectedKeys` 和必要的菜单层级；保持 `mode=inline`、`theme=light`。
- 折叠状态必须同步更新 Sider 宽度、`inlineCollapsed` 和折叠图标，不能只隐藏菜单文字。

### 3.2 Header 左侧

- 使用 `Layout.Header`，内容必须套一层 `Flex` 组件。
- 左侧依次为侧栏折叠入口和 `Breadcrumb`。
- 面包屑反映当前应用与页面位置；页面生成时替换 `items`，不手绘分隔符。

### 3.3 Header 全局操作区

顺序固定为：

1. 当地时间；
2. `App Source Switcher`；
3. 语言或地区入口；
4. RTL 方向切换；
5. 用户头像；
6. 用户下拉入口。

要求：

- 组件名称统一使用 `App Source Switcher`，不得写成 `App Switcher`。
- 当地时间由运行页面提供动态数据。
- RTL 是独立操作，不与语言切换合并。
- 用户区域包含头像、显示名和下拉入口，生成页面时按业务上下文替换其内容。
- 纯图标入口必须有明确的可访问名称。

### 3.4 内容区域

- `Layout.Content` 外层固定保留 16px 灰色间距，用来区分宿主布局和页面内容容器。
- `Page Body Slot` 使用白色直角容器，不增加圆角、额外卡片边框或第二层同尺寸外边距。
- 生成列表、表单、详情或配置页面时，只替换 `Page Body Slot`，不得重建 Header、Sider 或 Content 间距。

## 4. 可替换项与固定项

可替换：

- Application Logo；
- App Name；
- `Menu.items`、`Menu.selectedKeys` 和菜单层级；
- `Breadcrumb.items`；
- `App Source Switcher` 的 value 与 options；
- 语言、RTL、用户头像和用户名等入口的状态或内容；
- `Page Body Slot`。

固定：

- 1440 × 900 基准画板；
- 239px Sider；
- 64px Header 和品牌区；
- Header 的 Flex 分组、24px 水平内边距及操作顺序；
- Content 的 16px 外层间距；
- 白色直角内容容器。

## 5. 生成流程

1. 确认页面属于独立应用或需求明确要求完整外壳。
2. 从 library 引用 `Admin App Shell · 后台应用基础布局`，不要照着截图重画。
3. 替换应用身份、菜单、面包屑和 App Source Switcher 数据。
4. 将业务页面放入 `Page Body Slot`，保留 Content 的 16px 间距。
5. 根据需求补充侧栏折叠、语言和 RTL 状态。
6. 检查 Header 左右分组是否对齐，以及长文案下是否发生遮挡或裁切。

## 6. Sticky Note 说明

模板旁侧的 Sticky Note 是区域索引，不承载完整规范。每张便签只包含“区域名称 + 一句话职责”，并使用关联线和定位点连接到模板中的实际区域。

需要标注：

- 品牌区；
- Header（包含左侧页面位置和右侧全局操作）；
- 应用菜单；
- 内容间距；
- 页面内容槽。

关联线使用低强调度颜色，不遮挡关键文案；定位点必须落在所描述的区域内。Sticky Note 和关联线不属于最终页面。复制模板生成页面时可以不复制说明，但不得改变模板说明区和规范列出的固定约束。

## 7. 验收清单

- Header 使用 `Layout.Header → Flex → 左右内容组`。
- 模板具有独立标题、适用场景、功能说明和使用流程。
- 每张 Sticky Note 只描述一个区域，并通过关联线连接到正确位置。
- Sider、Menu、Breadcrumb、Select、Avatar 和图标均引用 Kit 内组件。
- Header 操作顺序正确，RTL 入口存在，用户区域结构完整且内容可替换。
- App Source Switcher 命名正确。
- 内容区保留 16px 外层间距，内部为白色直角容器。
- 页面仅替换 Page Body Slot，没有重复生成应用外壳。
- 1440 × 900 下无裁切、溢出或缩放展示。
