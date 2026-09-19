# Ant Design 官方组件全量清单与核对基准 (Official Component Catalog)

> **数据来源**：[Ant Design 官方组件总览 (v6.6.4)](https://ant.design/components/overview-cn/)  
> **数据落盘文件**：[`registry/antd-official-components.json`](file:///Users/yanxianliang/overseas/pen-antd-kit/registry/antd-official-components.json)  
> **更新时间**：2026-09-17  
> **统计口径**：基础组件 **7 组 / 73 项**；重型组件（Pro Components）**1 组 / 6 项**。

---

## 一、官方分类总览统计

| 序号 | 分组名称 (中文) | 分组名称 (英文) | 官方组件数量 | 核心职责与设计范畴 |
| :---: | :--- | :--- | :---: | :--- |
| **01** | **通用** | General | **4** | 基础视觉交互、文字排版、动作触发与入口 |
| **02** | **布局** | Layout | **7** | 栅格系统、多栏自适应、弹性间距、分割与瀑布流 |
| **03** | **导航** | Navigation | **7** | 路由引导、面包屑、步骤指示、菜单、页签与分页 |
| **04** | **数据录入** | Data Entry | **18** | 表单、选择器、日期时间、级联、滑动与各类输入组件 |
| **05** | **数据展示** | Data Display | **21** | 表格、卡片、列表、走马灯、树、描述列表、头像与标签 |
| **06** | **反馈** | Feedback | **11** | 模态弹窗、抽屉、提示气泡、进度指示、骨架屏与轻提示 |
| **07** | **其他** | Other | **5** | 固钉、全局配置容器、流光装饰与工具包 |
| **—** | **基础组件合计** | **Base Components** | **73** | **Ant Design 6.x 标准 UI 核心资产库** |
| **08** | **重型组件** | Pro Components | **6** | 复杂业务级自适应场景（高级表格、高级表单等） |

---

## 二、全量分组及组件清单

### 01 通用 / General (4 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **Button** | 按钮 | `button` | [button-cn](https://ant.design/components/button-cn) | 已完成 Live 组件重构 |
| **FloatButton** | 悬浮按钮 | `float-button` | [float-button-cn](https://ant.design/components/float-button-cn) | 包含单按钮、组合、BackTop |
| **Icon** | 图标 | `icon` | [icon-cn](https://ant.design/components/icon-cn) | `@ant-design/icons` 独立资产包 |
| **Typography** | 排版 | `typography` | [typography-cn](https://ant.design/components/typography-cn) | Title, Text, Paragraph |

---

### 02 布局 / Layout (7 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **Divider** | 分割线 | `divider` | [divider-cn](https://ant.design/components/divider-cn) | 水平 / 垂直 / 标题 |
| **Flex** | 弹性布局 | `flex` | [flex-cn](https://ant.design/components/flex-cn) | Flexbox 对齐与间距 |
| **Grid** | 栅格 | `grid` | [grid-cn](https://ant.design/components/grid-cn) | Row & Col 24 栅格体系 |
| **Layout** | 布局 | `layout` | [layout-cn](https://ant.design/components/layout-cn) | Header, Sider, Content, Footer |
| **Masonry** | 瀑布流 | `masonry` | [masonry-cn](https://ant.design/components/masonry-cn) | `v6.0.0` 新增 |
| **Space** | 间距 | `space` | [space-cn](https://ant.design/components/space-cn) | 包含 Space.Compact 紧凑模式 |
| **Splitter** | 分隔面板 | `splitter` | [splitter-cn](https://ant.design/components/splitter-cn) | 可拖拽伸缩布局 |

---

### 03 导航 / Navigation (7 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **Anchor** | 锚点 | `anchor` | [anchor-cn](https://ant.design/components/anchor-cn) | 滚动监听与跳转 |
| **Breadcrumb** | 面包屑 | `breadcrumb` | [breadcrumb-cn](https://ant.design/components/breadcrumb-cn) | 路径与层级层级指示 |
| **Dropdown** | 下拉菜单 | `dropdown` | [dropdown-cn](https://ant.design/components/dropdown-cn) | 气泡悬浮折叠动作 |
| **Menu** | 导航菜单 | `menu` | [menu-cn](https://ant.design/components/menu-cn) | 顶部水平 / 侧边内嵌 / 折叠 |
| **Pagination** | 分页 | `pagination` | [pagination-cn](https://ant.design/components/pagination-cn) | 页码切换与条数控制 |
| **Steps** | 步骤条 | `steps` | [steps-cn](https://ant.design/components/steps-cn) | 横向 / 纵向任务流程 |
| **Tabs** | 标签页 | `tabs` | [tabs-cn](https://ant.design/components/tabs-cn) | 页面卡片与内容分段 |

---

### 04 数据录入 / Data Entry (18 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **AutoComplete** | 自动完成 | `auto-complete` | [auto-complete-cn](https://ant.design/components/auto-complete-cn) | 搜索补全 |
| **Cascader** | 级联选择 | `cascader` | [cascader-cn](https://ant.design/components/cascader-cn) | 多层级选项树 |
| **Checkbox** | 多选框 | `checkbox` | [checkbox-cn](https://ant.design/components/checkbox-cn) | 单个 / 多项组合 / 半选 |
| **ColorPicker** | 颜色选择器 | `color-picker` | [color-picker-cn](https://ant.design/components/color-picker-cn) | 取色板与预设色 |
| **DatePicker** | 日期选择框 | `date-picker` | [date-picker-cn](https://ant.design/components/date-picker-cn) | 日期、月、周、范围 |
| **Form** | 表单 | `form` | [form-cn](https://ant.design/components/form-cn) | 排版、收集与校验 |
| **Input** | 输入框 | `input` | [input-cn](https://ant.design/components/input-cn) | 文本、搜索、密码、OTP |
| **InputNumber** | 数字输入框 | `input-number` | [input-number-cn](https://ant.design/components/input-number-cn) | 步进与范围控制 |
| **Mentions** | 提及 | `mentions` | [mentions-cn](https://ant.design/components/mentions-cn) | `@` 用户/标签提及 |
| **Radio** | 单选框 | `radio` | [radio-cn](https://ant.design/components/radio-cn) | 圆圈 / 按钮样式组 |
| **Rate** | 评分 | `rate` | [rate-cn](https://ant.design/components/rate-cn) | 星级评价与自定义字符 |
| **Select** | 选择器 | `select` | [select-cn](https://ant.design/components/select-cn) | 单选、多选、标签态 |
| **Slider** | 滑动输入条 | `slider` | [slider-cn](https://ant.design/components/slider-cn) | 单滑块 / 双滑块范围 |
| **Switch** | 开关 | `switch` | [switch-cn](https://ant.design/components/switch-cn) | 状态切换与加载 |
| **TimePicker** | 时间选择框 | `time-picker` | [time-picker-cn](https://ant.design/components/time-picker-cn) | 时分秒选择器 |
| **Transfer** | 穿梭框 | `transfer` | [transfer-cn](https://ant.design/components/transfer-cn) | 双栏穿梭数据转移 |
| **TreeSelect** | 树选择 | `tree-select` | [tree-select-cn](https://ant.design/components/tree-select-cn) | 树形折叠选择控件 |
| **Upload** | 上传 | `upload` | [upload-cn](https://ant.design/components/upload-cn) | 按钮点击 / 拖拽 / 图片墙 |

---

### 05 数据展示 / Data Display (21 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **Avatar** | 头像 | `avatar` | [avatar-cn](https://ant.design/components/avatar-cn) | 图像、字符、Group 组 |
| **Badge** | 徽标数 | `badge` | [badge-cn](https://ant.design/components/badge-cn) | 数字、红点、状态角标 |
| **Calendar** | 日历 | `calendar` | [calendar-cn](https://ant.design/components/calendar-cn) | 完整月历与年历面板 |
| **Card** | 卡片 | `card` | [card-cn](https://ant.design/components/card-cn) | 栅格卡片与 Meta 结构 |
| **Carousel** | 走马灯 | `carousel` | [carousel-cn](https://ant.design/components/carousel-cn) | 轮播展示与切换 |
| **Collapse** | 折叠面板 | `collapse` | [collapse-cn](https://ant.design/components/collapse-cn) | 手风琴与折叠收纳 |
| **Descriptions** | 描述列表 | `descriptions` | [descriptions-cn](https://ant.design/components/descriptions-cn) | 键值详情规格展示 |
| **Empty** | 空状态 | `empty` | [empty-cn](https://ant.design/components/empty-cn) | 缺省提示与插画 |
| **Image** | 图片 | `image` | [image-cn](https://ant.design/components/image-cn) | 预览、遮罩与缩放 |
| **List** | 列表 | `list` | [list-cn](https://ant.design/components/list-cn) | `已废弃` (建议迁移 Listy) |
| **Listy** | 虚拟列表 | `listy` | [listy-cn](https://ant.design/components/listy-cn) | `v6.6.0` 官方全新推荐虚拟列表 |
| **Popover** | 气泡卡片 | `popover` | [popover-cn](https://ant.design/components/popover-cn) | 浮层卡片面板 |
| **QRCode** | 二维码 | `qr-code` | [qr-code-cn](https://ant.design/components/qr-code-cn) | 动态二维码与过期蒙层 |
| **Segmented** | 分段控制器 | `segmented` | [segmented-cn](https://ant.design/components/segmented-cn) | 滑块分段切换 |
| **Statistic** | 统计数值 | `statistic` | [statistic-cn](https://ant.design/components/statistic-cn) | 大数字指标与倒计时 |
| **Table** | 表格 | `table` | [table-cn](https://ant.design/components/table-cn) | 排序、筛选、固定列、分页 |
| **Tag** | 标签 | `tag` | [tag-cn](https://ant.design/components/tag-cn) | 状态标签与可关闭徽章 |
| **Timeline** | 时间轴 | `timeline` | [timeline-cn](https://ant.design/components/timeline-cn) | 纵向事件时间线 |
| **Tooltip** | 文字提示 | `tooltip` | [tooltip-cn](https://ant.design/components/tooltip-cn) | 气泡简单文字提示 |
| **Tour** | 漫游式引导 | `tour` | [tour-cn](https://ant.design/components/tour-cn) | 步骤高亮蒙层漫游 |
| **Tree** | 树形控件 | `tree` | [tree-cn](https://ant.design/components/tree-cn) | 树形层级、拖拽、复选 |

---

### 06 反馈 / Feedback (11 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **Alert** | 警告提示 | `alert` | [alert-cn](https://ant.design/components/alert-cn) | 静态警告横幅 (4 色) |
| **Drawer** | 抽屉 | `drawer` | [drawer-cn](https://ant.design/components/drawer-cn) | 侧边滑出面板 |
| **Message** | 全局提示 | `message` | [message-cn](https://ant.design/components/message-cn) | 顶部全局轻量反馈 |
| **Modal** | 对话框 | `modal` | [modal-cn](https://ant.design/components/modal-cn) | 居中确认遮罩弹窗 |
| **Notification** | 通知提醒框 | `notification` | [notification-cn](https://ant.design/components/notification-cn) | 侧边浮层通知框 |
| **Popconfirm** | 气泡确认框 | `popconfirm` | [popconfirm-cn](https://ant.design/components/popconfirm-cn) | 气泡二次确认 |
| **Progress** | 进度条 | `progress` | [progress-cn](https://ant.design/components/progress-cn) | 条形与环形进度条 |
| **Result** | 结果 | `result` | [result-cn](https://ant.design/components/result-cn) | 403 / 404 / 500 / 操作成功 |
| **Skeleton** | 骨架屏 | `skeleton` | [skeleton-cn](https://ant.design/components/skeleton-cn) | 占位加载动画 |
| **Spin** | 加载中 | `spin` | [spin-cn](https://ant.design/components/spin-cn) | 旋转加载菊花 |
| **Watermark** | 水印 | `watermark` | [watermark-cn](https://ant.design/components/watermark-cn) | 安全防泄漏水印覆盖 |

---

### 07 其他 / Other (5 项)
| 组件名称 (英文) | 中文名称 | Slug 标识 | 官网文档地址 | 状态 / 标注 |
| :--- | :--- | :--- | :--- | :--- |
| **Affix** | 固钉 | `affix` | [affix-cn](https://ant.design/components/affix-cn) | 滚动吸顶/吸底固定 |
| **App** | 包裹组件 | `app` | [app-cn](https://ant.design/components/app-cn) | 上下文统一消费容器 |
| **BorderBeam** | 边框流光 | `border-beam` | [border-beam-cn](https://ant.design/components/border-beam-cn) | `v6.4.0` 动效边框 |
| **ConfigProvider** | 全局化配置 | `config-provider` | [config-provider-cn](https://ant.design/components/config-provider-cn) | 统一主题与国际化 |
| **Util** | 工具类 | `_util` | [_util-cn](https://ant.design/components/_util-cn) | 官方底层能力说明 |

---

### 08 重型组件 / Pro Components (6 项，扩展库规划)
| 组件名称 (英文) | 中文名称 | 官网文档地址 | 属性规划 |
| :--- | :--- | :--- | :--- |
| **ProLayout** | 高级布局 | [ProLayout](https://procomponents.ant.design/components/layout) | 复杂管理后台自适应侧栏/顶栏 |
| **ProForm** | 高级表单 | [ProForm](https://procomponents.ant.design/components/form) | 预置各类搜索与联动表单 |
| **ProTable** | 高级表格 | [ProTable](https://procomponents.ant.design/components/table) | 内置搜索工具条与表格容器 |
| **ProDescriptions** | 高级定义列表 | [ProDescriptions](https://procomponents.ant.design/components/descriptions) | 联动取值与格式化详情卡 |
| **ProList** | 高级列表 | [ProList](https://procomponents.ant.design/components/list) | 复杂图文与多选卡片列表 |
| **EditableProTable** | 可编辑表格 | [EditableProTable](https://procomponents.ant.design/components/editable-table) | 行级实时增删改查表格 |
