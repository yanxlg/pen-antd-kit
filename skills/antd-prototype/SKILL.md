---
name: antd-prototype
description: Use this skill whenever a user asks to create, revise, or review a product prototype in pen.dev/Pencil with Ant Design, antd, enterprise admin UI, forms, tables, dashboards, settings pages, dialogs, or reusable design-system components. It selects Ant Design 6 components from the bundled registry, applies Ant Design tokens and states, creates reusable Pencil instances, and records enough metadata for React + TypeScript + antd code generation. Do not draw an existing Ant Design component as arbitrary shapes when a registry component exists.
compatibility: Requires pen.dev/Pencil MCP or a Pencil workspace and the bundled Ant Design 6 resource files. Code export targets React 18 + antd 6.4.x.
---

# Ant Design 6 prototype workflow

Use `libraries/antd-6.lib.pen` and the versioned Inspector Schema (`registry/inspector.antd-6.6.4.json`) as the source of truth for product prototypes. Prefer `Antd/Live/...` Script components: their `canvas-components/*.js` files declare real Pencil input controls and rerender native layers when a property changes. Use the static `Antd/...` browser-imported component only when a hand-editable snapshot is required. Use `registry/props.antd-6.6.4.json` when the exact TypeScript type is needed and `registry/components.json` for offline category defaults.

## Required workflow

1. Read `references/component-selection.md` before choosing components.
2. Read `references/interaction-states.md` when the request contains behavior, forms, tables, dialogs, loading, empty, error, permission, or responsive states.
3. Read `references/registry-sync.md` when exact or uncommon Props are needed, or when the requested version differs from 6.6.4.
4. Read `references/code-contract.md` when the user asks for code, implementation handoff, or export-ready design.
5. Read `registry/state-matrix.antd-6.6.4.json` and select every state relevant to the requested components; do not validate only the default state.
6. For a normal prototype, insert the matching `Antd/Live/{category}/{Component}` component. Change its Script inputs in the properties panel and verify that the canvas changes (at minimum default, disabled, loading/checked/open/error where applicable).
7. For pixel-level fidelity or a state not yet mapped by a live script, start `pnpm serve:samples`, open the real Antd render URL in Pen's Browser, and use Browser Import on the exact `#sample-{Component}` selector. The browser page is the source of visual truth; never substitute a generic hand-drawn shape when a sample exists.
8. Open or import `libraries/antd-6.lib.pen` and preserve the component origin link. Use “Convert to layers” only as the final handoff when manual edits are needed.
8. After each import, take a Pen screenshot and compare it with the browser screenshot at the same state. Check control geometry, SVG/icon visibility, borders, radii, typography, overlays, clipping, and spacing. Fix the sample or import rule and re-import when they differ.
9. Use `registry/inspector.antd-6.6.4.json` to decide whether a property is a string, enum, boolean, number, structured editor, or runtime-only field. Do not expose runtime-only callbacks as pretend visual controls.
10. Record the component name, `antdVersion`, manifest path, edited props, state, and token references in the component metadata or an adjacent design note.
11. Use Ant Design Token variables for color, typography, spacing, borders, and radii. Do not introduce one-off values when an existing token expresses the intent.
12. Produce the requested screen plus the states that change user decisions. At minimum, include default, loading, empty, error, and permission states for data-driven screens.
13. End with a compact handoff note listing components, important Props, unresolved runtime behavior, and the intended React component structure.

When editing a saved `.pen` file outside a native Inspector, use the Script component inputs first. `scripts/apply-antd-props.mjs` is metadata-only and must not be described as a visual update mechanism.

## Component rules

- Mandatory: read `references/component-instance-rule.md` when editing Usage or Components. Every demonstrated control must be a reusable component instance. Preserve instance-valued properties separately from children; Button accepts `{icon: IconInstance, children: "Label"}`. Native composite masters are supported; script inputs alone cannot encode instance-valued properties.

- Use the exact component name from `references/component-catalog.md`.
- Prefer composition and Slots for `Card`, `Space`, `Form`, `Table`, `Modal`, and `Drawer`.
- Model arrays such as `Table.columns`, `Table.dataSource`, `Select.options`, `Menu.items`, and `Form` fields as structured records, never as comma-separated text when exportability matters.
- Use finite presets for callback Props such as `render`, `itemRender`, and `dropdownRender`; label unsupported arbitrary code as runtime-only.
- Use the icon registry and an `@ant-design/icons` name for icons. Do not use arbitrary emoji as a production icon.
- Keep overlays as separate state frames connected to a trigger/state note. Do not pretend a Portal is ordinary page flow.
- For design system artboards (`Usage`, `Principles`, `Components`), strictly follow `references/principles-artboard-spec.md`, `references/usage-artboard-spec.md`, `references/components-artboard-spec.md`, and `references/iframe-examples-spec.md`. Principles artboards must use semantic row containers with left-aligned list items, preventing text centering and image overlapping. Usage artboards must strictly use Flexbox `layout: "vertical", gap: 16` for example columns, completely eliminating redundant spacer nodes to guarantee uniform 16px vertical card spacing, and replace any blank iframe demos with non-iframe high-fidelity preview windows populated with real imported component layers. Components artboards must strictly enforce uniform 1728px width, 1664px card width at x: 32 with 24px vertical card gap, full orthogonal variant/state coverage, and 1:1 node bounding box synchronization.

## Output contract

Every prototype delivery must contain:

- a `.pen` document or edits to the current `.pen` document;
- reusable instances from the Ant Design library;
- token/theme references;
- named state frames whenever behavior changes;
- a handoff note using `references/code-contract.md`;
- an explicit list of unsupported or runtime-only Props.

## Quality gate

Before finishing, verify that no supported Ant Design component was replaced by a hand-drawn approximation, all data-driven states requested by the product are present, labels and fields have readable content, and each component can be mapped back to a registry entry.
