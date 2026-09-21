# Components 属性交叉展示

Data Display、Feedback、Other 的 35 个 Components 画板包含 65 组、496 个配置实例；原有 56 个主/子组件定义保留且唯一。交叉组合展示的是实际实例，不是 API 属性表。

## 规则

- 同一组展示至少两个相关属性维度，例如尺寸 × 形状 × 内容、类型 × 状态、方向 × 边框 × 尺寸。
- 可视属性较少的 App 使用不同 children 组件组合；Affix 使用滚动容器内的静态定位场景。滚动阈值、动画时间和交互效果不能仅凭静态画布验收。
- 每种组件和官方子组件只保留一个 reusable 定义。所有组合引用这些定义，以 inputs 和必要的子实例配置呈现。
- Badge 包裹 Avatar，Ribbon 包裹 Card；Avatar.Group、Image.PreviewGroup、Skeleton 子组件均使用现有组件定义。不得增加自定义 renderMode 来绘制组合。
- Components 生成器只整理 Components 内部展示和外部容器尺寸，不重新生成 Usage、Principles，不修改共享定义的属性。
- 不显示属性矩阵表、版本徽标、示例编辑按钮或操作工具栏。
- 实例按内容尺寸展示。Collapse 收起状态不能保留展开高度；Segmented、Tag 不得用过宽背景充当占位。

## 覆盖

| 组件 | 组合组数 | 配置实例数 | 交叉维度 |
| --- | ---: | ---: | --- |
| Avatar | 3 | 24 | Size × Shape × Content；Text length × Gap；Avatar.Group · Size × Shape |
| Badge | 4 | 30 | Count × Size；Zero × Visibility / Dot × Color；Status × Text；Badge.Ribbon · Placement × Color |
| Calendar | 1 | 8 | Fullscreen × Mode × Week numbers |
| Card | 2 | 12 | Size × Variant × Loading；Card.Meta × Card.Grid |
| Carousel | 2 | 12 | Dot placement × Arrows；Initial slide × Indicators |
| Collapse | 2 | 16 | Size × Surface × Expanded panels；Expand icon placement × Disabled |
| Descriptions | 2 | 18 | Layout × Border × Size；Columns × Colon |
| Empty | 1 | 8 | Image × Description × Action |
| Image | 2 | 8 | Image size × Preview；Image.PreviewGroup · Two images × Size |
| Listy | 2 | 6 | Viewport × Row height；Item composition × Viewport |
| Popover | 2 | 11 | Placement × Arrow；Title × Content |
| QRCode | 2 | 16 | Status × Border；Size × Error correction |
| Segmented | 2 | 18 | Size × Shape × Disabled；Orientation × Selection |
| Statistic | 2 | 9 | Precision × Loading；Prefix × Suffix |
| Table | 2 | 16 | Size × Border × Header；Loading × Pagination |
| Tag | 2 | 40 | Color × Variant × Closable；Tag.CheckableTag · Checked × Label |
| Timeline | 2 | 16 | Orientation × Mode × Variant；Order × Mode |
| Tooltip | 2 | 14 | Placement × Arrow；Color × Content |
| Tour | 1 | 6 | Step × Type |
| Tree | 3 | 16 | Checkable × Lines × Disabled；Block selection × Icons；Tree.DirectoryTree · Selection × Disabled |
| Alert | 2 | 24 | Type × Variant × Icon；Type × Description × Close |
| Drawer | 2 | 12 | Placement × Loading；Mask × Close button |
| Message | 1 | 10 | Type × Content length |
| Modal | 2 | 12 | Centered × Footer × Loading；Confirm loading × Close button |
| Notification | 1 | 16 | Type × Progress × Actions |
| Popconfirm | 1 | 8 | Placement × Cancel action |
| Progress | 2 | 30 | Type × Status × Info；Steps × Stroke caps |
| Result | 1 | 14 | Status × Actions |
| Skeleton | 4 | 29 | Avatar × Round × Paragraph rows；Skeleton.Button · Size × Shape；Skeleton.Avatar · Size × Shape；Skeleton.Input · Size × Active |
| Spin | 2 | 8 | Size × Tip × Nested content；Spinning × Content |
| Watermark | 2 | 10 | Rotation × Density；Text × Font |
| Affix | 1 | 4 | Offset edge × Offset distance |
| App | 1 | 3 | Children composition |
| BackTop | 1 | 4 | Visibility threshold × Duration · runtime properties |
| BorderBeam | 1 | 8 | Count × Color × Width |

## 维护与验证

配置唯一来源：`scripts/component-showcase/plan.mjs`。`build.mjs` 生成逐组件 MCP 执行脚本；必须经 Pen MCP 执行，不读取或写入加密 .pen 文件。旧 Data Display 生成入口委托此配置，不再维护独立的简单状态列表。

本轮执行：

- `node scripts/component-showcase/verify.mjs`：490 个脚本配置执行成功；另 6 个 Avatar.Group 原生实例由画布核验。检查配置声明、尺寸、嵌套引用及 Tag solid 文字可见性。
- `node scripts/data-display/verify-renderers.mjs`：298 个 Data Display 脚本配置及既有回归断言通过。
- `node scripts/feedback-other/verify.mjs`：22 个渲染器契约及回归断言通过。
- 画布确认 496 个组合展示、无失效引用，56 个主/子组件定义的序列化内容与修改前一致。逐组件抽查截图，修正 Ribbon 与 Card 标题重叠、Tag solid 同色文字、Collapse/Segmented/Tag 尺寸。
- Badge 指示器有 14 处设计性越界，外层展示区域完整可见；禁用子节点不计为显示裁切。未发现其余新增展示容器越界。

这些检查覆盖静态 Components 展示，不代表所有浏览器交互、动画或所有 props 的笛卡尔积已实现。
