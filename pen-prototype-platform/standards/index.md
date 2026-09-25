# Pen Ant Design 原型设计规范

本目录是 Pen 原型的规范事实源。规范约束的是信息架构、交互状态、布局和视觉质量；组件外观与可用变体以当前 Kit 中的 Ant Design library 为准，模板只提供页面构图参考。

## 渐进式读取

先判断页面类型，再只读取需要的文件：

| 场景 | 必读文件 |
| --- | --- |
| 所有原型 | `foundations/canvas-write-policy.md`、`foundations/environment-layout.md`、`states/feedback-permissions.md`、`quality/review-checklist.md` |
| 把输入拆成页面/抽屉/弹窗模块 | 先读 `patterns/module-decomposition.md` |
| 任何需要选择或组合模板的页面 | 先读 `patterns/template-composition.md` |
| 后台管理页面（默认使用完整 App Shell） | 再读 `patterns/admin-app-shell.md` |
| 选择列表、分栏多 Tab、详情抽屉或表单抽屉模板 | 再读 `patterns/page-templates.md` |
| 列表、运营管理、配置清单 | 再读 `patterns/list-query.md` |
| 新建、编辑、详情、复杂配置 | 再读 `patterns/forms-overlays.md` |
| 目录 + 内容复合页 | 同时读取 `patterns/page-templates.md`、`patterns/list-query.md` 和 `patterns/forms-overlays.md` |
| 追溯规则来源，不参与日常生成 | `reference/fintechgrowthui-evidence.md` |

不要一次加载全部规范。`manifest.json` 是版本和文件清单的机器可读入口，`prototype-quality.json` 是发布校验与原型验收的稳定契约。

生成顺序固定为：输入 → 模块清单（`patterns/module-decomposition.md`）→ 模板绑定（`patterns/template-composition.md`）→ 生成 Frame。模块清单写成 `prototype-plan.json` 并通过 `pen-antd plan validate`；`pen-antd doc build` 只接受通过校验的 plan。

**写入门禁**：原型的设计内容一律通过 Pen MCP 生成与更新，禁止用代码读写 `.pen` 产出画面；CLI 的文件写入仅限空文档和文档级 `imports`。判定与例外清单见 `foundations/canvas-write-policy.md`。

## 规则优先级

发生冲突时按以下顺序裁定：

1. 明确的业务需求与已确认交互；
2. 当前 Kit 的组件能力和 token；
3. 本规范的页面模式与质量要求；
4. `.pen` 模板中的示例构图；
5. 输入 HTML 或草图里的偶然样式。

模板和历史页面不能覆盖业务事实，也不能成为缺失状态、权限和异常流程的理由。

规范里标记为“默认保留”的内容（例如 App Shell 的外壳功能）只在需求显式排除时才让位于需求；需求没有提到，视为保留。

模板清单以 Kit 内 `registry/templates.json` 为准，规范不列举模板 id；选择流程见 `patterns/template-composition.md`。

## 版本原则

- `standardsVersion` 使用 SemVer。修正措辞且不改变验收结果升 patch；新增兼容规则升 minor；改变既有原型判断或迁移要求升 major。
- 每次修改规范必须同步更新 `manifest.json`、`CHANGELOG.md`，并运行 `npm run standards:validate`。
- 规范、references、library 和模板按同一个 Kit 发布；薄 Skill 单独安装在客户端，不随 Kit 打包。客户端只切换通过质量门禁的不可变 Kit，不在本地拼装不同版本。
- 已发布版本不覆盖；回滚通过 stable channel 指回上一个 GitHub Release。
