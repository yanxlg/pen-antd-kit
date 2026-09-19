# React + Ant Design handoff contract

Target React 18 and `antd@6.6.4`. Generate or hand off code from the component metadata, never from a screenshot.

## Required mapping

```text
Pencil library instance → antd component import
Pencil Props            → typed JSX Props
Pencil Slot             → children / ReactNode prop
Pencil state frame      → controlled state or demo fixture
Pencil token variable   → ConfigProvider theme token
Pencil structured data  → typed arrays or records
```

The generated code may include one `ConfigProvider` at the page or application boundary. It must not leak editor-only fields such as `pencilEditor`, slot hints, placeholder borders, or registry metadata into product components.

For `Table`, generate typed `columns` and `dataSource`; for `Form`, generate typed field names and validation rules; for `Modal` and `Drawer`, generate `open` plus close/submit handlers. Use an explicit finite preset for unsupported render callbacks.

The handoff must list:

1. Ant Design version and imports.
2. Components and significant Props.
3. Theme tokens and algorithms.
4. Data and state assumptions.
5. Runtime-only items requiring developer implementation.


## Inspector-backed composition

Usage and Components must use the semantic reusable component. General roots
use Script inputs so selecting an instance exposes its controls. A `ref` input
holds a persisted component value and provides a component picker; metadata and
context alone do not create Inspector controls.

Button `icon` is independent of `children`. Map its Icon ref to the React `icon`
prop. Plain `children` is a string; `childrenContent` references ordered rich Text
nodes and maps to React children, never to a `childrenContent` prop.

Badge is the FloatButton parent, with a child ref and a shared Indicator ref.
FloatButton contains a true Icon ref. Group/Menu demos contain FloatButton refs.
Map the Badge wrapper to the official `badge` configuration when using the
internal Ant Design Badge, without duplicating the badge.

Read `registry/canvas-composition.json` and the Button/FloatButton documents for
current IDs and factories. Generated descendants have transient IDs. Persist
edits through root inputs or referenced value masters. When a property changes
intrinsic dimensions, update the host dimensions with the factory; render scripts
cannot resize their own host. Never flatten references into drawing layers.
