# Pen Ant Design 原型设计规范

本目录是 Pen 原型的规范事实源。规范约束的是信息架构、交互状态、布局和视觉质量；组件外观与可用变体以当前 Kit 中的 Ant Design library 为准，模板只提供页面构图参考。

## 渐进式读取

先判断页面类型，再只读取需要的文件：

| 场景 | 必读文件 |
| --- | --- |
| 所有原型 | `foundations/environment-layout.md`、`states/feedback-permissions.md`、`quality/review-checklist.md` |
| 独立后台应用、完整宿主外壳 | 再读 `patterns/admin-app-shell.md` |
| 选择列表、分栏多 Tab、详情抽屉或表单抽屉模板 | 再读 `patterns/page-templates.md` |
| 列表、运营管理、配置清单 | 再读 `patterns/list-query.md` |
| 新建、编辑、详情、复杂配置 | 再读 `patterns/forms-overlays.md` |
| 目录 + 内容复合页 | 同时读取 `patterns/page-templates.md`、`patterns/list-query.md` 和 `patterns/forms-overlays.md` |
| 追溯规则来源，不参与日常生成 | `reference/fintechgrowthui-evidence.md` |

不要一次加载全部规范。`manifest.json` 是版本和文件清单的机器可读入口，`prototype-quality.json` 是发布校验与原型验收的稳定契约。

## 规则优先级

发生冲突时按以下顺序裁定：

1. 明确的业务需求与已确认交互；
2. 当前 Kit 的组件能力和 token；
3. 本规范的页面模式与质量要求；
4. `.pen` 模板中的示例构图；
5. 输入 HTML 或草图里的偶然样式。

模板和历史页面不能覆盖业务事实，也不能成为缺失状态、权限和异常流程的理由。

## 版本原则

- `standardsVersion` 使用 SemVer。修正措辞且不改变验收结果升 patch；新增兼容规则升 minor；改变既有原型判断或迁移要求升 major。
- 每次修改规范必须同步更新 `manifest.json`、`CHANGELOG.md`，并运行 `npm run standards:validate`。
- 规范、Skill、library 和模板按同一个 Kit 发布。客户端只切换通过质量门禁的不可变 Kit，不在本地拼装不同版本。
- 已发布版本不覆盖；回滚通过 stable channel 指回上一个 GitHub Release。
