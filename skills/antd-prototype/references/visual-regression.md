# Ant Design visual regression workflow

Use this workflow whenever a component looks generic, an icon/arrow is missing, a checkbox/radio state is wrong, or an overlay is misplaced.

## Source of truth

The source is a real React render from the installed `antd@6.6.4` package, served by `pnpm serve:samples`. Pen does not run React in the canvas; Browser Import converts the selected browser DOM into editable layers. Therefore every state that must be visible in Pen must be rendered before import.

## State matrix

Read `registry/state-matrix.antd-6.6.4.json`. For each selected component:

1. Open the component URL in the Pen Browser.
2. Render the requested state and freeze transient UI when needed (open overlays, loading indicators, hover-only controls).
3. Capture a browser screenshot of `#sample-{Component}`.
4. Import that exact selector into the canonical Library.
5. Capture the imported Pen component at the same scale.
6. Compare control bounds, text metrics, border/radius, icon path visibility, popup placement, clipping, and spacing.
7. Fix the React sample or a narrowly scoped import correction, then repeat.

## Known conversion traps

- Antd hover-only controls (notably InputNumber handlers) are invisible unless the sample explicitly freezes them visible.
- SVG icons can import with a path but no visible geometry; inspect the imported path and compare against the browser screenshot.
- Portal content (Modal, Drawer, Popover, Tooltip, Dropdown, Tour, Message, Notification) needs an in-sample container so it is captured inside the selected element.
- CSS pseudo-elements and animations are not reliable import targets; replace them with explicit, semantically named DOM children in the render sample before importing.
- Do not “fix” a mismatch by changing the Pen layer alone if the browser source is wrong; otherwise the next regeneration will regress.
- Principles 设计原则画板排版陷阱：DOM/Figma 导入时无序列表 `li` 容易被赋予 `justifyContent: "center"` 造成文字悬空居中；无约束绝对定位（`layout: "none"`）导致双栏图文纵向脱节漂移与重叠。必须严格执行 `references/principles-artboard-spec.md` 规范。
- Examples/Usage 画板 Iframe 示例陷阱：官方网站中的视口固定组件（FloatButton）、滚动关联组件（Anchor）、全视口布局（Layout）采用 `<iframe>` 渲染，直接导入会生成空白 `#E4E4E7` 占位框。严禁保留空白 iframe，必须按 `references/iframe-examples-spec.md` 规范替换为非 Iframe 高保真窗口容器，并导入真实组件图层。

## Completion gate

Do not call a component visually complete until the browser sample has no render error, the imported Pen screenshot has no clipping/overflow, zero blank iframe placeholder frames remain across all layers (per `references/iframe-examples-spec.md`), Principles artboard adheres to `references/principles-artboard-spec.md` with zero centered/overlapping bullet text, and the component appears once under the correct official category in the Components panel.
