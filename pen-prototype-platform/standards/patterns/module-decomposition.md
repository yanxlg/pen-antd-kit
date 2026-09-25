# 输入到模块

## 1. 这一步解决什么

生成任何 Frame 之前，先把输入（需求、HTML、`.pen` 草图、口头描述）拆成**模块清单**，并写清楚每个模块是什么、里面有什么、由哪个模板承载。

模块是画布上一个可独立命名的顶层 Frame。它对应一个用户任务，而不是文档里的一个标题：需求文档的章节层级、HTML 的 DOM 层级都不能直接当模块结构。

产物是一份 `prototype-plan.json`（结构见 `schemas/prototype-plan.schema.json`），它同时是人类评审的对象和 `pen-antd doc build` 的唯一输入。没有通过 `pen-antd plan validate` 的 plan 不允许进入生成。

## 2. 抽取三件事

读输入时只抽三类事实，其余（章节顺序、原型中的偶然样式）不进入模块定义：

| 类别 | 抽什么 | 落成 plan 里的字段 |
| --- | --- | --- |
| 角色与权限 | 谁能看到入口、谁能操作 | `structure[].note`、`states`、模块是否需要 `feedback` |
| 任务与数据 | 用户要完成什么、依赖哪些对象与字段 | `goal`、`structure[].label`、`components` |
| 交互与反馈 | 操作发生在哪里、成功后失败后发生什么 | `kind`、`states`、模块间跳转关系 |

每个模块必须能追回到输入的哪一段（章节号、功能编号或验收标准），记在 `requirementRefs`。追不回去的区域要么是自建，要么不该存在。

## 3. 模块类型判定

`kind` 决定 Frame 命名前缀、可绑定的模板类别，以及它在画布上的分区。判定看**交互发生的位置**，不看内容多少：

| kind | 判定信号 | 反例 |
| --- | --- | --- |
| `page` | 一级菜单、独立路由、可被直接访问的完整页面 | 页面内的内容区不是 page |
| `drawer` | 需求写「抽屉」「右侧滑出」「在同一抽屉维护」，不离开当前列表上下文 | 页面内的分栏面板不是 drawer |
| `modal` | 需求写「弹窗」「二次确认」「居中提示」，中断当前流程并要求选择 | 行内校验提示不是 modal |
| `panel` | 独立成 Frame 的页内区域，需要单独评审（如跨页复用的复杂面板） | 已由页面模板承载的 Tab 不单独建 panel |

一条需求里的同一个动作可能产生两个模块：编辑发生在 drawer，发布确认发生在 modal。不要把确认弹窗塞进抽屉 Frame 里隐藏掉。

## 4. 每个模块必须写清的内容

| 字段 | 要求 |
| --- | --- |
| `id` | 稳定、可读、小写点分：`<域>.<对象>` 或 `<域>.<对象>.<形态>`，如 `app-config.edit-drawer` |
| `title` | 出现在 Frame 名上，用业务名，不用「页面1」 |
| `goal` | 一句话说清用户在这里做什么；写不出 goal 的模块不该存在 |
| `requirementRefs` | 需求章节 / 功能编号 / 验收标准编号 |
| `template` | 承载它的模板；`{outer, inner, slot}` 表示内层模板填进外层的可替换槽 |
| `structure` | 模块内部区域，按视觉顺序排列，role 取规范词汇表 |
| `components` | 模块会实例化的组件名，必须在 Kit registry 中存在 |
| `states` | 需要表现的交互态：`default/loading/empty/error/disabled/dirty/publishing/...` |
| `custom` + `customReason` | 没有模板覆盖时置 `true`，并写明为什么 |
| `notes` | 复用或替换说明，例如「复用抽屉外壳，body 换成表格」 |

`structure` 的 role 词汇表：`shell / header / navigation / catalog / filters / list / table / form / detail / overlay / actions / footer / content / preview / feedback / custom`。role 描述职责，`label` 写具体内容（「模块树」「发布历史表格」），`note` 写业务约束（「操作列固定右侧」「发布中置灰」）。

## 5. 模板绑定

绑定前必须先跑模板选择流程（见 `patterns/template-composition.md`），模板只能来自当前 Kit 目录：

1. 一个模块首选**一个完整模板**；
2. 需要外壳 + 内容时用 `{outer, inner, slot}` 嵌套，`slot` 取外层模板的可替换项名称；
3. 模板目录里没有对应的 `kind` 时（例如当前 Kit 没有弹窗模板），把模块标成 `custom` 并写明原因，画布上生成占位 Frame 记录它的结构清单，不得假装已覆盖；
4. 只复用模板的一部分时，在 `notes` 写清保留与替换了什么。

`kind` 与模板类别的对应关系由校验器强制：`page` 可用 `shell/list/split/detail/form/general`，`drawer` 只能用 `detail/form/drawer`，`modal` 目录内暂无模板，必须 `custom`。

## 6. 命名与画布布局

- **输出文件按需求文档取名、放在需求文档所在目录**：`<需求文档目录>/<需求文档名>.pen`。不要自造路径或名字；需要别的名字时用 `pen-antd doc build --name <文件名>`，需要别的目录用 `--path`。
- 该路径已存在同名 `.pen` 时：若是本 plan 上一次生成的文件，直接原地重建（幂等）；若是别的文件，`doc build` 返回 `OUTPUT_EXISTS` 并列出三个选项——替换 / 自动重命名（追加 `-2`、`-3`…）/ 自定义名字或路径，**由用户选**，不得替用户决定。
- Frame 名固定为 `Page · <title>` / `Drawer · <title>` / `Modal · <title>` / `Panel · <title>`。
- 画布按 kind 分区，行内按 plan 顺序从左到右：页面一行、抽屉一行、弹窗一行、面板一行；行间距固定，便于评审时逐行看。
- 初始尺寸取最外层模板的 `resolution`；根节点宽度始终固定为模板宽度，高度至少为模板高度，内容更多时完成填充后按内容边界增高。嵌套进槽位的模板以 `fill_container` 重排，不缩放，保持结构与间距。
- Plan 的来源、模块清单和假设写入 `Plan Notes` Frame，和页面放在同一文档里。
- 组件来源默认是导入：文档写 `imports: { antd: ~/.pen/libraries/antd-6.lib.pen }`，只把被导入组件内部依赖的兄弟组件放进 `Library Anchors`；生成前由 CLI 检查并同步该目录。

## 7. 验收

- `pen-antd plan validate --plan <plan.json>` 通过，无 error；
- 每个模块的 `structure` 覆盖了它 `requirementRefs` 里的全部字段与操作；
- 模板已提供的区域没有被声明为自建；标记 `custom` 的模块都有理由；
- 生成的 Frame 名、kind 与 plan 一致，页面/抽屉/弹窗各自成行。
- 文档的 `imports` 指向存在的公共库文件（`pen-antd library status --path <file>` 报 `libraryReady: true`）；被 Pen 丢弃的实例覆盖已摊平或记入 Notes。

已知的目录缺口（例如缺少弹窗模板）要留在 `customReason` 里，作为后续扩充模板库的输入，不要在规范里写死。
