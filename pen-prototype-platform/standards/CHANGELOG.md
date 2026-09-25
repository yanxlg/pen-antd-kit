# 设计规范变更记录

## 1.0.0 - 2026-09-23

- 内置桌面模板及交付页面统一使用 `1920×1080` 基准；页面宽度固定为 `1920`、高度至少 `1080`，业务内容超过时按内容边界增高，不缩放或裁切。禁止窄屏页面和响应式状态。

## 0.9.2 - 2026-09-23

- 明确客户端只安装薄 Skill；Kit 内的原型流程归入 `references/guide.md` 与按需参考资料，不再打包第二个 `SKILL.md`。
- 明确模板实例验收：完整后台页面必须保留 Kit 的 App Shell `ref`；普通 Frame 的名称、上下文或元数据不能代替真实模板实例。
- 将模板选择、模块构建与交付流程统一为 MCP 实例化、槽位填充、保存重开后回读 `type/ref`、位置尺寸与裁切。
- 更正导入运行说明：保存后检查绝对 `imports` 与实例覆盖；MCP 超时先确认操作是否落地并重开目标文档，再考虑重启应用。
- 校验器允许通过 MCP 把内层模板放入导入 App Shell 的槽位；生成脚本按解析后的槽位 id 定位，默认每次处理一个模板模块并立即回读其 `type/ref`。

## 0.9.0 - 2026-09-22

- 新增 `foundations/canvas-write-policy.md`：**原型的设计内容只能通过 Pen MCP 生成和更新，禁止用代码读写 `.pen` 产出画面**。设计内容包含页面/抽屉/弹窗/面板 Frame、其内部节点、交互态与一切会改变画布外观的修改。
- 定义唯一例外（bootstrap）：MCP 没有对应操作的部分才允许 CLI 写文件——创建空文档、写 `imports`、注入库/模板定义（`Library Templates` / `Library Anchors`）、写 `Plan Notes`。除此之外的写入都算违规。
- 明确执行顺序：`plan validate` → `doc bootstrap` → 打开文档 → 生成 `execute` 脚本 → 经 MCP 执行 → 回读校验；MCP 不可用是阻塞（先自检、重启 Pen、排查残留连接，仍不可用则报告），不得改用写文件交付；`--via file` 仅限测试与故障排查。
- 验收要求：交付说明需列出生成/更新原型用到的 MCP 调用、bootstrap 写入清单，以及回读证据。

### 0.9.1 - 2026-09-22

- 收窄 bootstrap 到**只写空文档 + `imports`**：不再注入模板定义、不再注入组件锚点、不再写 `Plan Notes`。这些全部改为由 `execute` 脚本经 MCP 生成。
- 生成方式改为按需实例化：`Insert(document, {type:"ref", ref:"antd:<模板帧id>"})` 直接实例化库内模板帧（实测可行），嵌套用 `Replace(<实例>/<槽位路径>, {type:"ref", ref:"antd:<内层模板帧id>"})`；真正需要落地的内容再由 MCP `Copy`/`Insert` 后修改。
- 清理与读取约束：Pen 1.2.13 只支持 `Get(nodeId, …)`（全文档读取直接报错），旧帧清理改为按上次执行记录的节点 id 逐个 `Delete`；实例密集的批次会超 60s 预算，默认每批 3 个模块。

## 0.8.0 - 2026-09-22

- 明确输出约定：原型文件名与目录**由需求文档决定**——`<需求文档目录>/<需求文档名>.pen`。`doc build` 不再要求 `--path`，`plan target` 可先查看将写入的路径。
- 同名文件冲突处理：本 plan 上次生成的文件原地重建（幂等）；其它文件一律返回 `OUTPUT_EXISTS` 并给出三个选项——替换（`--on-conflict replace`）/ 自动重命名（`--on-conflict rename`，追加 `-2`、`-3`…）/ 自定义（`--name`、`--path`），由用户决定，生成流程不得代为选择。

## 0.7.0 - 2026-09-22

- 画布默认改为**导入库**：`pen-antd library shared` 把当前 Kit 物化到公共目录 `~/.pen`（`libraries/antd-6.lib.pen` + `canvas-components/` + `fonts/` + `library.json` 摘要），生成文档时写 `imports: { antd: <绝对路径> }`，不再默认复制组件闭包。`--library embed` 保留旧的嵌入方式。
- 明确生成时必须先检查并同步该目录：`doc build` 每次运行都会比对 Kit 库的 SHA-256，变化才刷新（`--refresh-library` 强制）；`~/.pen/libraries` 与 `~/.pen/canvas-components` 是指向当前 Kit 的符号链接，保持库自身的相对资源（`fonts/`、`images/`、`../canvas-components/`）可达，不做 100MB 级拷贝。
- 记录实测规则（Pen 1.2.13）：① 必须用绝对路径，相对路径会静默丢弃实例覆盖；② 只有 `reusable` 的库条目可被导入；③ 被导入组件内部 `ref` 的兄弟组件必须在文档内存在，落到 `Library Anchors`；④ Pen 保存时会删除导入实例上的 `descendants` 覆盖，生成时改为把覆盖里的结构 frame 摊平成普通节点。
- 目录缺口（无弹窗模板）与实例覆盖的损失都要记录在 plan 与 Notes，不得用「渲染成默认态」冒充完成。

## 0.6.0 - 2026-09-22

- 新增 `patterns/module-decomposition.md`：输入（需求 / HTML / `.pen` 草图）先拆成模块清单，再谈模板与画面。定义 `page / drawer / modal / panel` 四类模块的判定信号、每个模块必须写清的字段（goal、requirementRefs、structure、components、states、template、custom 理由）、role 词汇表、命名与画布分区规则。
- 模块清单成为生成前置产物：`prototype-plan.json`（`schemas/prototype-plan.schema.json`），必须通过 `pen-antd plan validate` 才能被 `pen-antd doc build` 接受；校验覆盖模板存在性、kind 与模板类别兼容性、嵌套槽位存在性、组件名有效性。
- 明确模板读取方式：模板来自 Kit 内 library JSON 的目录（`pen-antd template describe`），不需要 Pen MCP；MCP 只用于画布写入与回读。
- 画布上按 kind 分区（页面 / 抽屉 / 弹窗 / 面板各一行），Frame 名固定 `Page ·`、`Drawer ·`、`Modal ·`、`Panel · <title>`，尺寸取模板 `resolution`，嵌套模板改为 `fill_container` 重排。
- 记录运行约束：模板实例较多的文档中，全文档 `Get`、整页截图会超出工具时间预算并卡住 Pen 文档服务，需按最小节点查询/截图并重启 Pen 恢复（见 Kit 的 `references/pen-mcp-runtime.md`）。

## 0.5.0 - 2026-09-22

- 新增 `patterns/template-composition.md`：模板选择与组合的通用规则，适用于所有页面。
- 明确模板目录由 Kit 构建时从 library 生成（`registry/templates.json`），规范不列举模板 id；新增或改版模板无需改规范或 CLI。
- 强制选择流程：`template describe --all` → `template match` → `template describe --id`，按区域（外壳/导航/筛选/列表/表单/详情/覆层）组合模板，方案写入 Notes。
- 明确组合优先级：整体复用 > 嵌套（外壳槽位承载内容模板）> 部分复用 > 组件自建；模板默认保留标注功能，裁剪须有显式依据。
- App Shell 默认沿用规则改为该通用规则在外壳上的具体化。

## 0.4.0 - 2026-09-22

- 明确后台页面默认沿用完整 App Shell：引用 `Frame · Admin App Shell`，只替换 `Page Body Slot`，不重画页面壳。
- 明确外壳标注的功能默认全量保留，只有需求显式排除、宿主已提供或只要业务内容时才裁剪，裁剪项须记录在 Notes。
- 在模板选择顺序与验收清单中加入“默认使用 App Shell、裁剪须有依据”的判定。

## 0.3.0 - 2026-09-20

- 新增标准列表页、左右分栏多 Tab、详情抽屉和表单抽屉模板的选择与使用规则。
- 四类模板改为直接导入 `fintechgrowthui` 的真实页面或交互状态，并在画布中横向排列。
- 明确 Ant Design 组件默认不设置 `size`，仅在需求明确要求特定密度或尺寸时覆盖。
- 明确所有表格操作列必须置于末尾并设置 `fixed: "right"`。

## 0.2.0 - 2026-09-20

- 新增后台应用外壳模板规范，明确适用场景、固定布局、可替换项和生成流程。
- 明确 Header Flex、App Source Switcher、语言、RTL、用户入口及内容占位的职责和顺序。
- 在模板画布中加入对应区域的 Sticky Note 说明。

## 0.1.0 - 2026-09-20

- 建立 Pen 原型规范入口、机器清单和质量契约。
- 从 fintechgrowthui 提炼环境与布局、列表查询、表单浮层、状态权限和质量门禁。
- 明确规范、原型流程资料、library 与模板以同一个 Kit 版本发布。
