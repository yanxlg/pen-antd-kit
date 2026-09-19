# Icon

`Icon.js` renders native Pen paths from the installed `@ant-design/icons-svg` definitions. Regenerate it with `node scripts/generate-icon-canvas.mjs`; verify with `node scripts/verify-icon-canvas.mjs`.

- `name`: exact official export, such as `HeartOutlined`, `HeartFilled`, or `HeartTwoTone`. Unknown exports raise an error.
- `fontSize`: icon size in pixels, corresponding to React `style.fontSize`. Official icons use a 1em square. Set the host instance width and height to the same value for matching selection bounds.
- `color`: React `style.color` / SVG `currentColor` for single-color icons.
- `twoToneColor`: primary color, or a JSON string containing `[primary, secondary]`. When secondary is omitted, the official Ant Design color algorithm calculates it.
- `rotate`: clockwise degrees around the icon center.

The canvas property matrix contains static phase previews of the React `spin` property. This script has no animation clock and does not expose a nonfunctional `spin` input. React `className`, event handlers, custom React components, and iconfont loading belong to the application runtime.

The Components catalog contains 842 instances of the live Icon master, grouped by Outlined, Filled, and Two-tone, then by category. The property matrix follows the catalog, including reusable masters for the official custom SVG and iconfont artwork. All 20 icons in the five Usage examples are component instances: 11 reference the live Icon master and 9 reference the custom SVG/iconfont masters. Version badges are omitted. Principles contains the imported official Icon design guidance with paired text and illustrations.

Sources: https://ant.design/components/icon/ and https://ant.design/docs/spec/icon/.
