# Ant Design Pencil Kit

团队共享的 Ant Design 6.6.4 pen.dev 资源包，包含静态真实渲染组件、Code on Canvas 实时组件、Props/Token Registry、产品原型 Skill 和示例。

## 使用

1. 在 pen.dev 的 Libraries 中导入 `libraries/antd-6.lib.pen`。Button 与 FloatButton 使用原生嵌套组件；Icon、Typography 等使用 Live Script；`Antd/Live/...` 组件链接到 `canvas-components/*.js`，属性面板改值会立即重新生成原生 Pen 图层。`Antd/...` 是真实浏览器导入的静态图层，适合需要手工微调的最终画面。
2. 在 Agent Composer 中选择 `skills/antd-prototype/SKILL.md` 所在目录。
3. 打开 `examples/user-management.pen` 参考产品原型结构。

复杂组件的 API 数据见 `registry/props.antd-6.6.4.json`，Inspector 控件协议见 `registry/inspector.antd-6.6.4.json`。实时渲染脚本在 `canvas-components/`，生成/更新脚本使用 `scripts/generate-canvas-components.mjs`。

Button 的 Icon / children 结构与代码映射见 [Button 说明](canvas-components/Button.md)。Components 与 Usage 的 380 个 Button 实例使用原生子节点，纯文本映射为字符串 children，富文本保留独立 Text 节点。运行 `pnpm verify:button` 校验；根目录 `pnpm verify` 仍包含历史静态快照/矩阵约束，不能代替当前画布的 MCP 树检查。

### 设计原则画板（Principles）排版规范
Principles 画板统一采用标准宽度 1728px，标题固定位于 (32, 32)，字号 80。内容容器（位于 32, 160，宽 1664px）全面采用流式垂直 Auto-Layout（`layout: "vertical"`, `gap: 56`）。针对官方规范的双栏图文结构，采用语义化水平 Row 容器（左列文字宽 1120px，右列图解宽 496px），实现行级强绑定，彻底根除绝对定位导致的纵向脱节与图文重叠问题；列表项 `li` 严格使用 `alignItems: "start", justifyContent: "flex-start"`，杜绝文字悬空居中。详见 `skills/antd-prototype/references/principles-artboard-spec.md`。

### 组件库标准与执行校验规范

Icon 的图标目录按 Outlined、Filled、Two-tone 收纳于 Components，属性矩阵位于目录下方；Usage 保留官方示例，Principles 对应官方图标设计页。`fontSize` 对应官方 `style.fontSize`（像素），不是 `size` 属性。Live SVG 来源、属性契约及静态动画预览限制见 [Icon 说明](canvas-components/Icon.md)；运行 `pnpm generate:icon` 生成，`pnpm verify:icon` 校验。

Typography 的实现、字体度量、状态输入及运行时边界见 [Typography 说明](canvas-components/Typography.md)。运行 `pnpm generate:typography` 生成，`pnpm verify:typography` 对照官方浏览器渲染校验。

库中所有 Live Canvas 组件的实现原理、字形物理居中算法、紧凑模式以及画板排版呼吸规范，详见根目录统一文档：[Ant Design 组件库执行与校验规范指南](COMPONENT_EXECUTION_AND_VERIFICATION.md)。

全量 7 组 73 项官方组件的当前交付状态、画板尺寸规格与推进看板，详见：[Ant Design 组件库落地与对齐状态跟踪看板](COMPONENT_STATUS_BOARD.md)。

## 校验

```bash
pnpm install
pnpm verify
```

运行时依赖为 Ant Design 6.6.4，Props/Inspector Registry 包含 148 个条目（含子组件与服务）。当前 Pen 快照使用 `.pen` Schema 2.17，含 71 个详情区、65 个静态可复用节点和 1 个 Live 节点；缺口见 [官网组件对齐清单](docs/antd-official-component-alignment.md)。依赖升级不会自动升级已有静态画板。`pnpm generate:pen` 默认不会覆盖真实渲染资源；只有明确传入 `--overwrite-canonical` 才会覆盖 canonical Library。

## 真实组件渲染源

`pnpm serve:samples` 会启动本地 Ant Design 6.6.4 组件目录，`scripts/samples/catalog.js` 为每个组件提供真实 React 渲染样例。更新 Antd 版本时，先在 Pen 中通过官方 Browser Import 导入各组件，再执行运行态截图回归。

`registry/state-matrix.antd-6.6.4.json` 收录 72 个组件的 229 个状态案例。使用 `pnpm generate:matrix` 重新生成，使用 `pnpm verify:render` 检查每个案例都有对应的真实 React 渲染分支；运行态回归还需在 Pen Browser 中打开矩阵 URL 并对导入图层截图。

## 版本策略

Git tag 与 Ant Design 版本保持一致，例如 `v6.6.4`。升级时重新生成 Registry、组件库并执行 `pnpm verify`，再进行 pen.dev 实际打开和截图回归。

General 的根属性面板与组件引用契约见 [审计](GENERAL_INSTANCE_AUDIT.md)。
Button / FloatButton / Badge 的属性由根 Script 声明；实例必须保留 `ref`、
显式 `scriptUri` 和完整输入。Icon 值注册表更新后运行 `pnpm generate:icon-bindings`。
