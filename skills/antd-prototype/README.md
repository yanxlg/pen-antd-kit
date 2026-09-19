# antd-prototype skill

这是面向产品经理和设计代理的 Ant Design 6 Pencil 原型 Skill。

## 安装/使用

将 `skills/antd-prototype` 复制到 Codex/Claude 的 skills 目录，或在支持本地 Skill 的宿主中直接引用该目录。使用 Skill 时，将本仓库根目录作为当前工作区，使代理可以读取 `libraries/` 和 `registry/`。

触发示例：

- “用 Ant Design 画一个用户管理列表页”
- “在 pen.dev 中设计一个带表单校验和弹窗的设置页”
- “把这个原型按 antd 组件交给 React 开发”

参考示例：`examples/user-management.pen`。

## 文件职责

- `SKILL.md`：触发条件、工作流、通用质量门槛。
- `references/component-selection.md`：组件选择和产品意图映射。
- `references/interaction-states.md`：状态、交互和运行时边界。
- `references/code-contract.md`：React + antd 代码交付契约。
- `references/registry-sync.md`：使用 Ant Design 官方 CLI 获取完整、版本化 Props 和 Token 元数据。
- `evals/evals.json`：用于后续 Skill 评测和迭代的真实产品任务。
