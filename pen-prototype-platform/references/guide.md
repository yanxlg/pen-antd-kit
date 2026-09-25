# Ant Design Pen prototype workflow

This is versioned Kit reference material, not an installed or independently discoverable skill. The installed `antd-prototype` bootstrap skill loads this guide after `references update`.

Produce a usable product prototype in Pen using the managed Ant Design library. The library is the source of component instances; templates are visual composition references, not code-generation contracts.

**Hard rule — canvas writes go through MCP.** Every piece of the prototype — module Frames, their contents, states and later edits — is created and updated through Pen MCP (`execute`). Do not produce or modify canvas content by reading/writing `.pen` files with code. Bootstrap may create an empty document and set its document-level `imports`; these are the only file-write exceptions. See [canvas-write-policy](../standards/foundations/canvas-write-policy.md). When MCP is unavailable, that is a blocker to report, not a reason to fall back to file editing.

CLI commands below are written as `pen-antd <command>`. When the CLI is not installed globally, use `npx -y @pen-kit/antd <command>` instead.

## Non-negotiable order

1. Ensure the active Kit with `pen-antd references update` unless the caller supplied an exact Kit root. The command is TTL-cached and safe to rerun; it returns the Kit root and this guide's `referencePath`.
2. Resolve only the context needed for the task:

   ```sh
   pen-antd context resolve --input <input-path> --prompt "<short requirement>"
   ```

3. Read every file in `mustRead` relative to this guide's directory. Read `optionalRead` only when the task needs it.
4. Resolve the standards directory from `standardsRoot`, then read only `standardsMustRead`. The standards [entrypoint](../standards/index.md) defines routing and priority; do not load its provenance reference during normal generation.
5. Run `pen-antd library prepare` before creating any nodes.
6. Turn the input into modules by running [decompose-modules](workflows/decompose-modules.md): decide which pages, drawers, modals and panels exist and what each one contains, then write the plan to a file. Do not start designing before the module list exists.
7. Select and compose templates for those modules by running [select-templates](workflows/select-templates.md). Discover them from the active Kit — never from memory or from a name in the standards:

   ```sh
   pen-antd template describe --all --depth 2
   pen-antd template match --query "<requirement summary>"
   pen-antd template describe --id <id> --depth 3
   ```

   Record the binding per module in the plan from step 6.

8. Validate the plan, bootstrap the document, and surface the module Frames through MCP:

   ```sh
   pen-antd plan validate --plan <plan.json>
   pen-antd plan target   --plan <plan.json>          # 输出路径：需求文档同目录同名 .pen
   pen-antd doc build --plan <plan.json> --open      # 只写空文档 + imports，然后经 MCP 产出全部模块 Frame
   ```

   By default the prototype is named after the requirement document and written next to it (`<requirement-dir>/<requirement-name>.pen`). An explicit user filename or directory takes precedence: pass `--name` or `--path` exactly as requested (for example `原型.pen` in the requirement directory). If that target already contains another document, `doc build` exits with the choices replace, auto-rename, or a custom path; do not silently choose a different filename. Rebuilding this plan's own document updates it in place through MCP.

   The CLI writes only what MCP cannot: an empty document plus the `imports` entry pointing at the shared component library in `~/.pen`. It reads the selected template from the Kit, expands its structural overrides, and inserts a **normal editable Frame** through MCP. Reusable controls inside that Frame remain `antd:<component id>` instances. Put nested content in the catalogued content region; use `Insert` for custom modules and notes. A Frame whose name merely resembles a template, but whose structure and component refs do not match the selected Kit template, does not satisfy this rule. Keep MCP batches small and record the returned ids.

9. Verify the library is reachable in that document with `pen-antd library status --path <file.pen>`. Do not create nodes while `libraryReady` is false; repair the import before continuing.
10. Inspect individual components and templates on demand. Never load the whole registry into context.
11. Fill each module through Pen MCP, working module by module against the plan's `structure`, `states` and `components`. Read [pen-mcp-runtime](pen-mcp-runtime.md) before the first canvas call.
    Before filling a content region, decide whether a current Kit template supplies it. If not, map each reusable control to its Kit id and insert an imported `antd:<id>` ref. A live `script` copied from `canvas-components` is not equivalent to a library instance, even when its metadata names the library.
12. Apply the standards [quality gate](../standards/quality/review-checklist.md). Save, reopen, and verify every template-backed page is an editable `type:"frame"`, its planned content region exists, and reusable controls inside remain working `antd:` refs. Inspect layout bounds and screenshots at the planned viewports before handoff.
    Also audit each content region after reopening: template ancestry or `type:"ref"` + the expected `antd:<component id>` for every reusable control, with configured data and states intact. `libraryReady` and visual inspection do not prove this.

   Use `1920×1080` as the desktop template and initial page size: keep every delivered page root exactly `1920` wide and at least `1080` high. Increase only the height through MCP when content needs more room; recheck descendants and neighboring page positions. Do not create or retain narrow-screen pages or responsive-state frames, including `760px` variants.

## Library gate

Treat `library prepare` as a hard preflight, not an informational check.

The default is import mode: `pen-antd library shared` materializes the active Kit into `~/.pen`, and every document imports `antd` from that absolute path. The document stays small and follows the Kit instead of freezing a copy of it.

- `pen-antd doc build` runs `library shared` automatically before writing imports and skips the copy when the Kit digest is unchanged; `pen-antd library shared --force` refreshes it by hand.
- `pen-antd library status --path <file.pen>` reports the import alias, the resolved path and whether it exists, or falls back to local id coverage for documents built with `--library embed`.
- Components an imported component references internally, plus non-reusable helper nodes, may require local anchors: the import resolves only the referenced entry itself. Treat missing dependencies as a failed library preflight.
- `--library embed` copies the whole closure into a `Library Sources` frame instead. Use it when a template depends on instance overrides the import cannot carry.

Read [pen-mcp-runtime](pen-mcp-runtime.md) before changing how the library is attached: the four rules there are what keep imported instances rendering with their real data.

## Input routing

- Markdown: extract actors, jobs, data, actions, states, constraints, and acceptance criteria. Do not mirror document headings mechanically.
- HTML: infer information architecture and behavior; replace incidental styling with Kit tokens and components.
- `.pen`: preserve valid intent, normalize component usage and layout, and avoid rebuilding unaffected areas.
- Plain requirements: make the smallest reversible assumptions and record them on a Notes artboard.

Use the routed input reference for detailed rules, then run [decompose-modules](workflows/decompose-modules.md) to turn the facts into modules. The module plan — not the input document — is what the rest of the workflow builds from.

## Template policy

Templates are maintained as UI in `libraries/templates.pen` and are catalogued into `registry/templates.json` when the Kit is built. Read them with `pen-antd template describe`, which parses that file and resolves component names from `libraries/antd-6.lib.pen` — not through Pen MCP. The catalog is the source of truth for each template's `pattern`, `use-when`, `includes`, declared features, replaceable parts with instructions, structure, and components.

Follow [select-templates](workflows/select-templates.md). In short:

1. Read the whole catalog with `pen-antd template describe --all`.
2. Match candidates with `pen-antd template match --query "<summary>"`.
3. Read each candidate with `pen-antd template describe --id <id> --depth 3` before deciding.
4. Decompose the requirement into regions and assign a template — or a named part of one — to every region.
5. Prefer a whole template; nest a content template inside a shell's content slot; copy-and-trim only for single-region reuse.
6. Keep every declared feature by default. Remove one only when the requirement explicitly excludes it, the host already provides it, or the task is business content only; record each removal with its justification in Notes.
7. When no template covers a region, compose from library components and mark the region as custom in Notes.

Templates do not require paired application code in this prototype-only chain. Do not rely on remembered template ids: a Kit update can add, rename, or reshape them.

## Component policy

- Query a component only when needed: `pen-antd component inspect <name>`.
- Instantiate components from the verified library; do not draw imitations for components that exist.
- Prefer documented variants and states.
- Bind spacing, color, typography, radius, and elevation to Kit tokens where Pen supports them.
- Use custom shapes only for domain-specific visuals not represented by the library.

## Page construction

For each page:

1. Define the user goal and primary action.
2. Select the closest page pattern, then the templates that cover its regions.
3. Establish the shell and content slots from the composition plan, then navigation, content hierarchy, and the fixed `1920` desktop width.
4. Add realistic content and data density.
5. Add required interaction states: default, loading, empty, error, disabled, and success where applicable.
6. Add annotations only where behavior cannot be inferred from the UI.

The routed standards are normative for layout and interaction. The current library remains normative for component geometry and supported variants. If a template conflicts with either, adapt or skip the template.

## Canvas editing constraints

- In import mode, copy each selected template's layout into an editable Frame. Keep its reusable controls as imported `antd:` refs, and update the catalogued replaceable paths inside the copy.
- When revising an existing ordinary page into an App Shell, copy the shell structure, move the existing page body into its content slot, verify it there, then remove the obsolete page root. This retains the original business content and library components.
- Adapt template data through the replaceable parts the catalog reports (application name, menu, breadcrumb, app switcher, avatar, user name), not by redrawing the region.
- Query known ids with shallow `Get` first. Use scoped visitor reads for bounds and screenshot one completed page or small region at a time; avoid a single whole-document render — see [pen-mcp-runtime](pen-mcp-runtime.md).
- Keep each `execute` batch small. Instance-heavy batches can time out even though the edits still land, so verify with `Get` on the specific subtree before repeating work.
- Size table columns so that `width - 32` fits the longest cell text: the component scales columns to the table width, and oversized text wraps or clips.

## Quality gate

Before handoff, verify:

- every required user task has a discoverable path;
- component instances originate from the expected library;
- each template-backed top-level page is an editable Frame with the planned structure and content region after save and reopen; its reusable controls remain imported refs rather than visual imitations;
- content sits inside the template's replaceable slot, and shell navigation, breadcrumb, brand, and header remain template descendants;
- page composition follows the selected pattern without unnecessary custom styling;
- default and exceptional states are represented;
- content is realistic enough to expose layout problems;
- alignment, spacing, type hierarchy, contrast, and viewport behavior are coherent;
- no unresolved placeholder, broken reference, clipped content, or accidental overlap remains.

Use screenshots or Pen inspection for visual review. Check the viewports and hard failures in `../standards/prototype-quality.json`. Fix observed issues before reporting completion.

## Context budget

Keep progressive disclosure intact:

- this file holds orchestration and invariants;
- references hold task-specific guidance;
- CLI queries return compact records;
- `.pen`, component manifests, and registries stay on disk unless a precise fragment is needed.

Do not paste full registries, full HTML sources, or the entire library document into the conversation.

## Handoff

Report the Pen file, pages created or changed, Kit version, library verification result, assumptions, and any intentionally unmodeled behavior. Do not imply application code was generated.
