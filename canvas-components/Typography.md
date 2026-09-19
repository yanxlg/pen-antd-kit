# Typography canvas contract

`Typography.js` and its four named exports are generated from
`scripts/templates/Typography.runtime.js`. Run `pnpm generate:typography` after
editing the template. The general canvas generator delegates to this generator.
Do not edit generated files directly.

The renderer uses Ant Design's installed theme tokens and official SVG icon
paths. Typography examples and the property matrix in `antd-6.lib.pen` reference
the reusable `antd-typography-live-origin` component.

## Properties and sizing

- `component`: Text, Title, Paragraph or Link. `level` selects Title levels 1–5:
  38/46, 30/38, 24/32, 20/28 and 16/24 px; body text uses 14/22 px.
- `type`, `disabled`, `strong`, `italic`, `underline`, `delete`, `code`, `mark`,
  `keyboard` correspond to the official text properties. Decorations can nest.
- The host width is the available layout width, not a Typography `size` prop.
  Text wraps at that width. Set instance height to the rendered line count times
  line height; the script cannot resize its parent.
- Typography is transparent. Put surface colors on the surrounding frame.
  `theme` selects light/dark text and action tokens. Decoration backgrounds hug
  the text run; they do not fill the host.
- `ellipsis` and `rows` control truncation. Text/Link are single-row;
  Paragraph/Title can use multiple rows. `suffix`, `expandable`, `expanded` and
  `symbol` represent the corresponding ellipsis configuration.
- `editable`, `editing`, `editIcon`, `enterIcon`, `editTrigger`, `copyable`,
  `copied`, `copyIcon`, `copiedIcon`, `actionsPlacement` and `state` flatten
  the official action configuration and visible states into primitive inputs.
  Editing uses the host width/height as the textarea bounds.
- `color` accepts a hex override. Link does not gain an underline unless requested.

## Measurement and runtime limits

Canvas text uses Pencil-supported Inter and Roboto Mono. Arial and Menlo are
not supported by Pencil and silently fall back to a different face; never use
their browser metrics for canvas layout. The font files and OFL licenses in
`scripts/fonts` are loaded before both generation and browser verification;
these correspond to a ConfigProvider font token override. They are not the
platform-dependent default system font stack. The generator measures Latin glyph
advances, kerning, baselines and decoration boxes in Chrome. Native Pencil
widths for the reported background/action/ellipsis cases are stored in
`scripts/fonts/pencil-typography-widths.json` and checked by the verifier. CJK ideographs use full-em
advance and the canvas font fallback. Complex shaping, emoji sequences and other
scripts still depend on the host font engine and need visual review.

Browser callbacks, clipboard writes, asynchronous copy content, tooltips and live
editing are runtime-only. Canvas inputs display their visual states. Paragraph
and heading margins belong to the surrounding auto layout, not the script's
inline line box. Very narrow frames must still fit the action group.

## Verification

`pnpm verify:typography` renders installed Ant Design in Chrome and compares
inline background bounds, action geometry and colors, then checks multiline
ellipsis, wrapping, state rendering, schema-compatible primitives and exports.
Both generation and verification require Google Chrome. Usage card titles use
centered auto layout at the divider; content and master instances are visible in
Components. Background and width matrices provide close-up regression scenes.

Sources: [Typography API and demos](https://ant.design/components/typography/),
installed `antd/es/typography` and `@ant-design/icons-svg` packages.
