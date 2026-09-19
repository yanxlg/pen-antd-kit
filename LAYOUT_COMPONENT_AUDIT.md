# Layout component audit

Updated: 2026-09-18. Package reference: installed Ant Design 6.6.4.

## Official scope

The [official list](https://ant.design/components/overview/) contains seven Layout entries: Divider, Flex, Grid, Layout, Masonry, Space, Splitter. Row and Col are Grid primitives, not separate category sections. Grid itself exports utilities; there is no rendered `<Grid>` component.

[Layout design guidance](https://ant.design/docs/spec/layout/) is the Principles source. The Layout board contains the official article imported as editable layers in its original single-column flow. Grid has a focused Principles board containing the imported Grid Unit and Raster sections from that same source, preserving their single-column order, typography, spacing, full-width illustration, and numbered list. Its article width is 1787.98 px inside a 1852 × 1417 px board; canvas screenshot and clipping checks passed. No separate design page was found for Divider, Flex, Masonry, Space, or Splitter; these have Usage and Components boards.

Official component references: [Divider](https://ant.design/components/divider/), [Flex](https://ant.design/components/flex/), [Grid](https://ant.design/components/grid/), [Layout](https://ant.design/components/layout/), [Masonry](https://ant.design/components/masonry/), [Space](https://ant.design/components/space/), [Splitter](https://ant.design/components/splitter/).

## Current acceptance status

**Official Usage imports installed; full acceptance remains incomplete.** All seven Layout Usage boards retain official example cards: Divider 7, Flex 5, Grid 13, Layout 10, Masonry 5, Space 10, Splitter 11. Introductions and examples come from the official pages, not the curated catalog. `registry/layout-official-imports.json` records source URLs, card IDs, introduction IDs, capture hashes, and review status.

For pages whose React streaming boundaries remained hidden in the importer, `scripts/layout/capture-official.py` resolves the original server HTML, retains its styles and content, removes scripts, and sets the official base URL. The saved pages in `artifacts/official-layout/` are imported through Pencil's browser. Layout's Sider, Fixed Header, and Fixed Sider iframe contents were imported separately from their official embedded demo URLs.

Primary demo controls use Divider, Flex, Row/Col, Layout and its parts, Masonry, Space/Compact, and Splitter/Panel independent script instances. Space button examples additionally use Button instances with component-valued Icon properties. Some auxiliary imported Input, Select, Menu, Radio, Switch, and Slider controls remain native imported content. Their instance conversion, Grid flex/responsive property semantics, and custom semantic-style parity are outstanding; a root instance alone is not full nesting acceptance.

## Instance architecture

Each component has one canonical definition inside its own Components frame. Demonstrations are independent script nodes with shared implementation files and owned input values. They never depend on another canvas node remaining mounted. Component-valued inputs serialize source/props descriptors; images and ordinary rich content are local node trees. Nested Button, Icon, Badge, Layout parts and Splitter panels remain separate script instances.

Flex, Layout, Space and Splitter Components boards contain their definitions and visual state examples. Their obsolete content banks are removed. Their board heights are 2434, 3898, 2331 and 2372 px respectively. The Icon catalog and custom icons remain present. No property-reference tables are displayed.

`registry/canvas-instance-bindings.json` contains captured component/content data. `scripts/build-independent-instances.mjs` bundles the data into the shared scripts and materializes child nodes without a canvas lookup. Configuration identities in build registries are data keys, not live scene dependencies. `scripts/runtime/independent-instances.mjs` defines descriptor materialization and property ownership. Composition factories create independent script nodes. The package generation commands run the independent-instance build step.

Pencil scalar inputs carry component descriptors as serialized strings; the Inspector therefore exposes a serialization field instead of a native component picker for these properties. Root scalar component properties still regenerate their own instance. Host dimensions remain explicit; update the host when content changes its intrinsic dimensions. Never access encrypted `.pen` data through filesystem scripts.

## Canvas and official examples

Usage and Components boards are 1728 px wide. Layout and Grid Principles are 1852 px wide to contain the official 1787.98 px article without rescaling. Main titles use 80 px at (32,32); content starts at (32,160). Flex retains one 1664 px example column in official order with 16 px vertical gaps and official preview padding (42/24/50/24). Divider uses two columns; Grid, Layout, Space and Splitter retain their official single-column sequence. Masonry retains its imported columns. No version labels or example action strips are displayed. Splitter preview shadows are retained through the sceneEffect canvas styling input.

Grid uses one Row implementation and one Col implementation. Column labels and styles belong to each Row's configured Col instances. Layout owns Header/Sider/Content/Footer; Splitter owns Panel; Flex and Space own ordered child descriptors. The slot-based canvas API supports 24 Flex/Space children, 24 Row columns, three Splitter panels and 24 Masonry items. Arbitrary React callbacks, dragging, responsive media queries and scrolling behavior remain application behavior.

## Verification and limits

- MCP audit: zero stored scene refs across all seven component categories and import staging; General has 1469 script nodes and Layout has 449.
- Migration render audit: 2016 stored configurations, 3466 nested renders, no unresolved content.
- `npm run verify:instances`: 17 nested compositions (including all 19 compact form rows and 13 Layout Usage headers), 166 imported content trees and 256 fresh script runtimes; no live references, truncated vector paths or component inputs on native nodes, identical persistence round-trip output, and explicit checks against inherited demo slots.
- `pnpm verify:layout`: 172 state snapshots, 61 browser geometry comparisons, six imported Masonry scenes and the 24-button wrapping example.
- `pnpm verify:button`: 75 combinations and 18 autoInsertSpace comparisons.
- `pnpm verify:floatbutton`: 39 state, geometry and nested composition checks.

The library is saved. Native editor pan-away/return and reopen visual acceptance remain unverified: screenshot export timed out and focused native UI navigation was unavailable. Fresh-runtime tests establish source independence, not complete editor lifecycle or pixel parity. Auxiliary imported controls and outstanding official API parity listed above remain outside this runtime conversion.

## Flex combination acceptance

The official combination retains exactly two children in each Flex: image plus padded content, then level-3 Typography plus primary Button. Named component configurations replace demo-master inputs; only explicitly serialized component-valued properties merge parent overrides. Typography supports line breaking after hyphens, matching the supplied four-line heading. The card is 620 px wide, the image 273 px wide, the content inset 32 px, and the button 106.609375 px wide with the official link. The Card body clips the image to its inner rounded corners. `verify:instances` asserts child counts and heading lines to prevent demo-default leakage. Browser measurements use the installed official implementation and the original imported image; native canvas pixel parity remains unverified.

## Layout, Space and Masonry rendering constraints

Usage configurations own their complete child lists. Layout examples omit unused header/footer/sider slots; Space examples retain their imported child count; the six-item Masonry example contains exactly six items. Imported SVG controls in these examples use shared Icon instances with complete official paths. `registry/imported-icon-repairs.json` records the imported SVG identities. Header menu items fill the header height and center their labels without adding vertical padding to a full-height line box.

Header backgrounds stored as rectangles carry no frame-only layout properties; alignment belongs to container frames. The header fixtures verify this distinction for every Layout Usage header.

Compact size and placement overrides apply only to script instances. Native imported frames retain their own visual styles and never receive an `inputs` field. The compact form fixture verifies this contract recursively across all 19 rows.

Layout Principles imports the official `.markdown` article at a browser viewport of 2400 × 1978 CSS px. The article remains 1787.98 px wide, starts at (32,160), and retains official paragraph, heading, spacer, and image order. The enclosing board is 1852 × 5257 px. Ordered list markers are explicit text nodes; hidden heading permalink boxes do not consume layout width. The imported article and enclosing white board were inspected through canvas screenshots. Auxiliary controls and iframe viewport clipping in Usage still require native visual acceptance.

Common Scales retains both official illustrations: “The two arrays” and “Common Usages”. The arrays image uses `libraries/images/ant.design/layout-common-scales-arrays.png`; the usages image uses `libraries/images/ant.design/a3128ef4fbdf9c8e.png`. Both files match the official PNG bytes, retain their original aspect ratios, and have positive, unclipped canvas bounds. Both diagrams render in the full Principles canvas screenshot.

Layout artboards and component sections enclose their immediate content with 32 px bottom padding. Section heights follow the tallest enclosed artboard; the Layout category encloses all seven sections (28856 × 8146 px). Flex is 3920 px high, Space 4159 px, and Layout 7175 px. The hierarchy bounds check covers seven sections and sixteen artboards with no clipping at those levels.
