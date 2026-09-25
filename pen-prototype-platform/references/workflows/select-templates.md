# Select templates workflow

Templates are discovered from the active Kit at run time. Never select a template from memory, from a previous task, or from a name in the standards — the Kit ships its template file and catalog together, and the catalog is the only thing that knows what they contain.

Run this workflow before building any page. It answers three questions in order: what templates exist, which ones apply, and which parts of them to compose.

## 1. Read the catalog

```sh
pen-antd template describe --all --depth 2
```

This prints one digest per template: `pattern`, `category`, `resolution`, frame id, `use-when`, `includes`, `capabilities`, `declared features`, and the components it uses. Skim all of them; the list is short and it is the only place where the available vocabulary of page shapes is defined.

## 2. Match candidates

```sh
pen-antd template match --query "<one-sentence requirement summary>"
```

Treat the result as a candidate list, not a decision. Matching is keyword based and will miss a template whose summary uses different words for the same region.

## 3. Read what each candidate actually contains

```sh
pen-antd template describe --id <id> --depth 3
```

Read the digest, not just the id:

- `use-when` / `includes` — the template's own statement of when it applies;
- `declared features` — the regions the template author annotated; treat this as the list of capabilities the template provides;
- `replaceable parts` — paths plus their `instruction`. These are the only nodes designed to be swapped, and the instruction says how;
- `structure` — the skeleton, with roles such as `sider`, `header`, `navigation`, `content`, `overlay`, `table`, `form`;
- `components` — which library components the template already instantiates.

If `use-when` does not describe the requirement and no declared feature covers a region the requirement needs, the candidate is a partial match at best.

## 4. Decompose the requirement into regions

Break the page into regions before choosing anything:

| Region | Signals in the requirement |
| --- | --- |
| shell | standalone admin app, host identity, global navigation, header actions |
| navigation | persistent catalog, module tree, section switcher driving the content |
| filters | query conditions, search fields, status filters, reset |
| list | primary dataset, table, pagination, row actions |
| form | create or edit, field groups, validation, submit and cancel |
| detail | read-only view of one record, field lists, history |
| overlay | drawer or modal over a source page, mask, footer actions |

## 5. Compose the plan

Assign every region to a template and, when relevant, to a part of it:

1. **Whole template first.** If one template covers the page, use it as a whole. Do not reassemble its regions by hand.
2. **Compose in the content region.** Copy the shell skeleton, then place the selected content template's editable structure in its content region. Keep the template's layout and imported controls when adapting it.
3. **Reuse a region by copying the template and deleting the rest,** when only one region applies — for example a filter bar or a drawer body. Keep the reused region's own structure, spacing, and component instances.
4. **Build from components only when no template covers the region,** and record that region as custom in the Notes.
   For every custom region, list the controls it contains and map each available Ant Design control to a current Kit component id. A layout Frame is not a substitute for a filter-bar/table/Tabs template, and a copied live `script` with `metadata.source` is not an imported component instance.
5. **Default retention.** Every declared feature of a used template stays unless the requirement explicitly excludes it, the host already provides it, or the task is business content only. "The requirement did not mention it" is never a reason to drop it.
6. **The outermost template fixes page width and minimum height; nesting reflows, it does not scale.** Start at the desktop `1920×1080` resolution. Keep the width fixed at `1920`, and grow the root height after filling content if needed. A wider or taller inner template does not change the outer page width or dictate its height: set the reused region's width to `fill_container` so it reflows in the slot, then measure the resulting content bounds. Never scale a template frame to make it fit.

Write the plan before building, one line per region:

```text
shell        -> admin-app-shell (UvpAV) frame f4rW6H, keep all declared features
content      -> split-tabs (GpMuP) frame l0UmSc, reuse aside catalog + tabs + filters + table
edit overlay -> drawer-form (C0P3Wo) frame ckiVf, reuse drawer + form + footer actions
detail       -> no template; built from components (read-only field list + history tabs)
```

## 6. Instantiate through Pen MCP

Before copying an App Shell, cross-check the current PRD/navigation and permission matrix, the original `.pen`, and any product-page HTML or PDF in the requirement material. Classify each name as host system, business module, requirement/solution title, or documentation-site title. A PRD title or documentation-site brand is not proof of the host system. Record evidence and conflicts, then build one shared shell-data plan: `hostSystemName`, `moduleName`, `menuItems`, per-page `selectedKeys`/`openKeys` and breadcrumb path, plus `displayName = hostSystemName + "管理员"`. Breadcrumb begins with the host system, then the module. Details, tabs, actions, and out-of-scope features are not independent menu entries unless the requirement explicitly makes them so. If host/module identity or menu cannot be verified, ask for confirmation instead of using library demo text or silently choosing one conflicting source. After copying, update the brand name, Breadcrumb, Menu inputs, Avatar initial, and user text in each page; keep reusable controls as imported refs.

```sh
pen-antd plan validate --plan <plan.json>
pen-antd doc build --plan <plan.json> --open
```

`doc build` bootstraps the empty document and its component-library import. It reads each selected template from the Kit and uses `execute` to insert an editable Frame at the document root. Its name or metadata is provenance only; verify its actual structure and imported controls.

- Use the catalogued paths to update replaceable parts. Keep the shell's Sider, Header, Content, and spacing structure intact while adapting business data.
- Put the business page inside the copied shell's Page Body region. Copy the selected inner template as editable content, or `Move` an existing body into that region. Large `Get(..., {depth:99})` plus `Replace` calls can time out; moving an existing body is both smaller and preserves its components.
- Read component Example and Components scenarios before configuring a library component. Use its supported inputs, states, and sizing instead of drawing a visual imitation.
- For each custom region, insert available controls as `{type:"ref", ref:"antd:<component id>"}` and configure their supported inputs through MCP. Keep ordinary Frames for layout or genuinely Kit-unsupported business visuals. When adapting an existing page, migrate one region at a time: add the candidate imported instance, save and reopen the document, and read it back at its intended nested path before removing the old control. A successful in-memory `Insert` response alone does not prove persistence.
- After filling each page, inspect the rendered content's bottom edge. Keep the root width fixed at `1920`; if content extends below `1080`, use MCP `Update` to set root height at least to the content bottom plus the template's bottom spacing. Recheck the shell background, Sider and content container extend to the new bottom, then move later rows/pages if the taller page would overlap them.
- Do not create or retain narrow-screen or responsive-state pages. A collapsed Sider may be an interaction state within the `1920` desktop page, but must not change the page width.
- Keep each MCP call scoped to one page or one concern. After a timeout, query the known node id before retrying; the edit may already have landed.

## 7. Record and verify

Put the plan on the page Notes, including:

- each template used, by pattern and id;
- the App Shell data plan and cross-checked sources (host system versus module, menu hierarchy, per-page active path, fixed admin display name), including any source conflict;
- which parts were reused and which were dropped, with the justification for every drop;
- regions with no template, marked as custom.
- a per-region component map for custom content: control name, Kit component id, resulting instance id, or the reason no library component applies.

Before handoff, save and reopen the file. For each template-backed page, read the known root id at depth 0 and confirm `type:"frame"`; then inspect the planned shell structure, content region, and component refs. Check the brand name and Breadcrumb first item against `hostSystemName`, the second item against `moduleName`, the Menu tree/active path, Avatar and `${hostSystemName}管理员` display name against the shared plan, plus dimensions, coordinates, clipping and overlap. A screenshot of each distinct page or state should confirm what the structural read cannot. Any dropped feature must trace to an explicit requirement statement.
For each content region, read its structure and component-bearing descendants after save/reopen: every reusable control must read back as `type:"ref"` with the expected `antd:` id and retain its configured content. Verify the exact nested path, not just the document root. Count any unaccounted `script` or hand-drawn equivalent as a failed component-provenance check. `libraryReady`, screenshots, and `metadata.source` alone do not satisfy this check.
