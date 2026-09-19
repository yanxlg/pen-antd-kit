# FloatButton canvas composition

FloatButton has root Script inputs and emits a shared Icon component reference.
A badged button is wrapped by the Badge Script component:

```text
Badge instance
├── children reference → FloatButton instance
│   ├── surface and content
│   └── icon reference → Icon instance
└── Badge Indicator instance
```

Both Usage and Components use these masters. Usage retains fourteen official
demo topics arranged in two columns. Group/Menu masters emit FloatButton refs.

## Creating instances

```js
const button = floatButtonInstance({
  shape: 'circle',
  icon: iconInstance('QuestionCircleOutlined'),
});
const badged = badgeInstance(
  {count: 12, offset: floatButtonBadgeOffset('circle', false)},
  {type: 'ref', ref: persistedFloatButtonValueId, width: 40, height: 40},
);
```

Factories live in `scripts/floatbutton-composition.mjs`; resolve IDs through
`registry/canvas-composition.json`. Ref inputs select persisted component values,
not arbitrary inline override trees. Badge remains the parent. The Inspector
exposes Badge count/dot/color/overflow/offsets on that parent. FloatButton exposes
shape/type/content/state and its Icon component picker on its root.

`FloatButton.js` renders surface/content/focus/progress and the Icon ref;
`Icon.js` owns glyph geometry. `Badge.wrapper.js` composes the child and shared
`Badge.js` Indicator. Generated descendant IDs are transient: edit root inputs or
the referenced value component. Never detach refs into copied paths.

Circle/square buttons are 40px wide and at least 40px tall. Icon-only glyphs are
18px; content glyphs are 14px with a 2px gap. Content uses Inter 12px with 13.8px
line height. Factories compute host dimensions; changing content or group
placement in the Inspector also requires matching host dimensions. Scripts do
not resize their host. Group/Menu controls describe the fixed three-item demos;
they are not the complete dynamic React children API.

## React handoff

Map the canvas Icon reference to `icon={<IconName />}`. A canvas Badge parent can
map to FloatButton's official `badge` configuration; do not render it twice.
Hover/menu/progress are sampled canvas states. Event handlers, scrolling and
animations belong to the application. Omit canvas-only inputs (`state`,
`groupPosition`, fixed group icon slots) from Ant Design props.

## Generation and verification

`pnpm generate:floatbutton` builds the root renderer and measured styles.
`pnpm generate:badge` builds the indicator and wrapper renderers from
`scripts/templates/`. `pnpm verify:floatbutton` compares 39 cases against the
installed Ant Design implementation and checks Badge → FloatButton → Icon refs.
Current interactive acceptance is recorded in `GENERAL_INSTANCE_AUDIT.md`.

## Pencil input replacement

Pencil replaces the complete `inputs` object on a generated ref; it does not merge
it with the referenced value. `registry/icon-component-values.json` records the
Icon value inputs read through MCP. Renderers copy those inputs before applying
button font size/color, so named glyphs and rotation/two-tone settings are retained.
After editing or adding a referenced Icon value, refresh this registry through
MCP and run `pnpm generate:icon-bindings`. Arbitrary unsynchronized value edits
are not live inherited by this platform representation.
