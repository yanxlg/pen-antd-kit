# Independent component instances

Usage, Examples and Components demonstrations must use independent script instances of the actual component, with `type: "script"`, the shared `scriptUri`, and instance-owned `inputs`. Do not draw lookalike controls or depend on a canvas `ref` target remaining mounted.

Each component has one canonical definition in its own Components frame. Other occurrences share its implementation file, not its scene node or rendered descendants. Changing the shared implementation updates all instances. Do not publish separate definitions for presets or example states. Do not display property matrices or content banks.

Nested components must also be independent script instances. Images, text and ordinary demo content belong locally to the consuming example. Component-valued properties preserve API semantics: Button `icon` is separate from `children`; Badge owns FloatButton as its child.

Pencil inputs are scalar. Component-valued inputs therefore serialize a node descriptor containing `type`, `scriptUri`, and complete `inputs` into a string. Ordinary rich content serializes a local node tree. Use the composition factories; do not supply canvas node IDs. The renderer materializes these payloads into nested, selectable script instances. The scalar Inspector field is a serialization field, not a native component picker.

`registry/canvas-instance-bindings.json` stores imported content snapshots used at build time. Its keys are configuration identities, not runtime canvas lookups. `scripts/build-independent-instances.mjs` bundles the bindings and resolves nested content without document access. Regenerate the independent renderers after changing a component generator or captured content. Never read or write encrypted `.pen` data through filesystem scripts.

## Acceptance

Verify root properties update their own instance, nested components preserve their own inputs, and no renderer emits a scene `ref`. Run `pnpm verify:instances` to render nested compositions in fresh runtimes without document access and compare persistence round trips. Also check pan-away/return and reopen behavior in Pencil; structural checks alone do not certify the editor lifecycle or full visual fidelity.

Canonical definitions may implement primitive geometry. Documentation headings, captions, preview backgrounds and browser chrome are ordinary presentation nodes. Keep one implementation source per component and preserve the official imported Usage content.
