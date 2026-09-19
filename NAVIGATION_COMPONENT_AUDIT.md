# Navigation component contract

Ant Design 6.6.4. Layout was accepted by the user on 2026-09-18; Navigation follows its document and instance structure.

| Component | Canonical definition | Official Usage examples | Columns |
|---|---|---:|---:|
| Anchor | ca84t | 9 | 1 |
| Breadcrumb | btoUX | 8 | 2 |
| Dropdown | ScSFh | 17 | 2 |
| Menu | jaNIi | 11 | 1 |
| Pagination | Y9L6l | 13 | 1 |
| Steps | p8qrv | 13 | 1 |
| Tabs | acxPC | 16 | 1 |

Each definition is reusable and lives in its own Components frame. Every other instance owns its props and invokes the same script file; it does not depend on a mounted canvas node. Structured `items`, menu models, semantic `classNames` / `styles`, and component-valued props are serialized JSON. Breadcrumb renders its item icons as Icon component instances and applies the official item, last-item, and separator colors. Anchor and Breadcrumb render their semantic styles inside the component instance. Button icons use Icon descriptors in the `icon` prop; plain button text uses `children`. Dropdown trigger content contains a Button instance or an ordinary link with an Icon instance; its popup contains a Menu instance. Official split-button and loading examples nest Button and Dropdown inside `Space.Compact`, which owns the shared border and outer-corner treatment. Pagination nests Select and Input; Anchor's embedded demos nest Row, Col and Anchor.

Usage retains the imported official descriptions, example order and column counts. Example card titles intersect their separator at its vertical center. Action strips, visible version labels and property tables are omitted. Container heights follow their content. Anchor's five iframe demos are represented by editable instances built from the official example source.

Principles come from [Navigation design guidance](https://ant.design/docs/spec/navigation/) for Menu, Breadcrumb, Tabs, Steps and Pagination, and the [Dropdown design guidance](https://ant.design/docs/spec/data-entry/#dropdown) excerpt for Dropdown. Anchor has no separate Principles page. The Navigation article was measured at a 2400 × 1978 viewport, with a 1788px article area. Thirteen original illustrations are stored under `libraries/images/navigation-*.png` at their original resolutions; they are displayed at the official aspect ratio and size. Paragraph widths account for illustrations floated on the right.

## Verification

- `npm run verify:navigation`: fresh execution of the Navigation canvas instances, 453 render snapshots at three widths, and browser geometry/style comparisons against installed Ant Design 6.6.4, including nested Anchor geometry, Breadcrumb icons, both Breadcrumb semantic-style examples, and Dropdown compact-trigger propagation.
- `npm run verify:instances`: independent composition and persistence regression checks.
- Canvas exports reviewed for Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs and the Principles illustrations. Frame sizing is refreshed by `scripts/navigation/reflow.pencil.js` through Pencil MCP.
- Current node IDs and owned props: `registry/navigation-instance-snapshots.json`. Import sources: `registry/navigation-official-imports.json`. Illustration provenance: `registry/navigation-principles-assets.json`.

Canvas instances show editable states. Browser history, scroll tracking, DOM selection, drag sorting, sticky positioning, callback functions and React event handlers execute in React applications, not in the canvas. The drag-sort and sticky-tab examples retain their captured initial display; the source extraction report records their external runtime dependencies.

## Maintenance

`npm run generate:navigation` regenerates the seven shared scripts and the nested Radio/Switch support used by these examples. `npm run generate:canvas` includes this generation stage. The migration/install snippets document the initial transformation and contain historical IDs; do not rerun them against the completed canvas. Apply subsequent edits through Pencil MCP and refresh the snapshot registry.
