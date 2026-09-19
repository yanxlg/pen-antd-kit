# Button property contract

The reusable Button root is a Script with Inspector inputs. Usage and Components
reference that root; the renderer owns the surface, label and shared Icon ref.

`icon` and `children` are independent properties. `icon` is a Pencil `ref` input,
selected through the component picker. Plain `children` is a string. Changing
root state/color inputs regenerates the surface, label and Icon together.

```js
import {buttonInstance} from '../scripts/button-composition.mjs';
import {iconInstance} from '../scripts/floatbutton-composition.mjs';

const button = buttonInstance(
  {type: 'primary', icon: iconInstance('SaveOutlined'), children: 'Save'},
  {width: 90},
);
```

Pass the factory result to Pencil MCP `Insert`. Existing instances use `inputs`
overrides on the root. Resolve current master IDs from
`registry/canvas-composition.json`; remap dependencies when copying files.

## Rich content

Persist the ordered rich/mixed Text nodes in a reusable content component and
pass its ref as `childrenContent`. This canvas-only input maps to React `children`;
it is not an Ant Design API property. `children` supplies the measurement string
when rich content is present. Do not flatten styled nodes or put `icon` in them.

```js
buttonInstance({
  children: 'Save draft',
  childrenContent: {type: 'ref', ref: richContentComponentId},
});
```

`buttonChildren(instance)` returns the string or content ref. `buttonProps`
returns root properties with the Icon/content references. Referenced component
values must be persisted; arbitrary inline overrides cannot be stored in a ref
input. Edit the selected value component or create a separate reusable value.

## Layout and editing

Generated descendants remain component references, but their IDs are transient.
Edit root inputs and referenced value components, not generated drawing nodes.
Factories compute the root dimensions. A script renders inside its host and
cannot resize that host: when changing size or intrinsic content width, update
root dimensions as well. A fixed-width Button retains the chosen width;
`fill_container` uses the parent width. Loading is a static Icon preview.

## React mapping and verification

Map the root to `Button` from `antd`, the Icon reference to the named
`@ant-design/icons` export in `icon`, and string/rich content to `children`.
Omit editor-only inputs such as `childrenContent`, `state` and `compactPlacement`.

`pnpm verify:button` checks 75 type/size/state combinations and root label/state
updates, Icon references, rich content references, loading, icon-only and block
layout. Current interactive acceptance is recorded in `GENERAL_INSTANCE_AUDIT.md`.

## Pencil input replacement

Pencil replaces the complete `inputs` object on a generated ref; it does not merge
it with the referenced value. `registry/icon-component-values.json` records the
Icon value inputs read through MCP. Renderers copy those inputs before applying
button font size/color, so named glyphs and rotation/two-tone settings are retained.
After editing or adding a referenced Icon value, refresh this registry through
MCP and run `pnpm generate:icon-bindings`. Arbitrary unsynchronized value edits
are not live inherited by this platform representation.

## Chinese character spacing

`autoInsertSpace` defaults to true. For a plain label containing exactly two
Chinese characters (U+4E00–U+9FA5), a button without an explicit icon and outside
the text/link variants renders a space: `确定` → `确 定`. False renders `确定`.
The stored `children` string remains unchanged. The generated loading spinner
does not count as an explicit `icon`; an actual icon property does. Already-spaced,
longer and mixed-language labels remain unchanged. Automatic width accounts for
the inserted space; explicitly set button widths are retained.

`compactOrientation` is a canvas composition input for Space.Compact: horizontal retains the existing corner mapping; vertical preserves only the top corners of the first button and bottom corners of the last button. It maps to the parent Space.Compact orientation, not to a Button API prop.
