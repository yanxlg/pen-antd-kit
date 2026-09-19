# General component instance audit

Updated 2026-09-18. Button, Icon, Typography and FloatButton demonstrations use independent script nodes with shared implementation files. Supporting Badge, Input, Tooltip and custom icons also use independent instances. The Icon catalog is preserved.

Each canonical definition remains in its owning Components frame. Other occurrences own their properties; no General scene refs remain. Button icon is a component-valued property independent of string children. Rich content is a local node tree. Badge owns a FloatButton instance, which owns an Icon instance. These component-valued properties serialize source and input descriptors through Pencil's scalar string fields; they are not native Inspector component pickers.

Button autoInsertSpace changes the rendered spacing of eligible Chinese labels without changing children. Definitions expose root scalar properties; generated children regenerate with the owning instance. Changing intrinsic dimensions can require adjusting the host dimensions.

Verification: 75 Button combinations, 18 autoInsertSpace comparisons, and 39 FloatButton geometry/composition cases pass. `pnpm verify:instances` additionally covers fresh runtimes and persistence round trips for nested Badge/FloatButton/Icon and Layout compositions with no document access. MCP reports 1469 General script nodes and zero scene refs.

The library is saved. Native editor viewport/reopen visual acceptance is still unverified due to screenshot timeout and unavailable focused native navigation. This audit does not certify every official API or all auxiliary native imported controls elsewhere in the library.

Current rules: [component-instance-rule.md](skills/antd-prototype/references/component-instance-rule.md).
