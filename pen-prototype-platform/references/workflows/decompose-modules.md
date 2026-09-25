# Decompose modules workflow

Run this workflow between reading the input and selecting templates. It turns requirements, HTML, `.pen` sketches or a prompt into a module plan: which pages, drawers, modals and panels exist, what each one contains, and which template carries it.

The plan is a file, not a mental model. `pen-antd doc build` refuses to create Frames from anything that has not passed `pen-antd plan validate`.

## 1. Extract the facts

Read the routed input reference, then pull out only:

- **actors and permissions** — who sees an entry point, who may operate;
- **tasks and data** — what the user completes, on which objects and fields;
- **interactions and feedback** — where an action happens and what follows it.

Ignore document heading order and incidental styling from HTML or sketches. Record anything you had to assume so it can be reviewed.

## 2. Decide the modules

For every user task decide the surface it happens on, using the detection table in `patterns/module-decomposition.md`:

| kind | Detection signal |
| --- | --- |
| `page` | top-level menu, own route, a full screen |
| `drawer` | the requirement keeps the user in place: 抽屉 / 右侧滑出 / maintain in the same drawer |
| `modal` | the requirement interrupts: 弹窗 / 二次确认 / 居中提示 |
| `panel` | a page region that must be reviewed on its own Frame |

An action and its confirmation are two modules: the edit lives in a drawer, the publish confirmation lives in a modal. Never hide a modal inside the drawer it confirms.

## 3. Give every module a structure

List the regions in visual order with a role from the vocabulary (`shell/header/navigation/catalog/filters/list/table/form/detail/overlay/actions/footer/content/preview/feedback/custom`), a business label and the constraints that matter. Then add:

- `goal` — one sentence; a module without a goal does not belong in the plan;
- `requirementRefs` — the section, feature id or acceptance criteria it implements;
- `states` — default, loading, empty, error, disabled, dirty, publishing…;
- `components` — the library components it instantiates.

## 4. Bind templates

Run [select-templates](select-templates.md) first; the catalog is the only source of template identity.

1. Prefer one whole template per module.
2. For shell + content, use `{ "outer": "<shell>", "inner": "<content>", "slot": "<replaceable part of the outer>" }`.
3. When the catalog has no template for the kind — modals today — set `custom: true` with a `customReason`; the build step writes a placeholder Frame that lists the required regions instead of pretending the skeleton is complete.
4. When only part of a template is reused, say what is kept and what is replaced in `notes`.

## 5. Validate the plan

```sh
pen-antd plan validate --plan <plan.json>
```

The validator checks the Plan against the active Kit: module ids, kinds, structure roles, template existence, kind/category compatibility, nested slot existence, and component names. Fix every error before building — a failing plan is not workable around.

```sh
pen-antd plan digest --plan <plan.json> --out <plan.md>
```

The digest is the human review artifact: modules, kinds, template bindings, structures, assumptions and validation result.

## 6. Build the Frames

```sh
pen-antd plan target --plan <plan.json>            # where the prototype will be written
pen-antd doc build --plan <plan.json> [--open]
```

The default output path is derived from the plan's `source`: `<requirement-dir>/<requirement-name>.pen`. If the user supplied a filename or destination, pass it through `--name` or `--path` and keep the requested name exactly.

When that file already exists:

- if this plan produced it, the build replaces its own Frames in place — that is the idempotent path, no question needed;
- otherwise `doc build` stops with `OUTPUT_EXISTS` and lists three choices, and **the user picks**: `--on-conflict replace` (overwrite), `--on-conflict rename` (append `-2`, `-3`, …), or a custom name/path (`--name` / `--path`). Never choose for them.

This reads template identities from the Kit catalog (no MCP needed), bootstraps the document, and creates modules through Pen MCP:

- template-backed `Page · <title>` / `Drawer · <title>` / `Panel · <title>` modules are top-level editable Frames copied through MCP from the selected Kit template, initially sized to the outer template resolution; their width stays fixed and their height may grow after content is filled, never below the template height;
- nested templates replace the outer template's declared slot and reflow with `fill_container` instead of being scaled;
- custom modules become named placeholder Frames listing goal, reason, structure and components, then must be filled before delivery;
- a `Plan Notes` Frame records the source, module list and assumptions.

Modules are laid out by kind: pages in the first row, then drawers, then modals, then panels. Verify with `pen-antd pen call --tool execute` (`Print` the top-level node names) or by opening the document.

## 7. Verify and hand off

- the plan passed validation and its digest was written next to it;
- every module from step 2 exists with the expected name and kind; template-backed modules have `type:"frame"`, the planned structure, and imported refs for reusable controls after saving and reopening;
- nested content landed inside the outer template's slot, not beside it;
- `custom` placeholders are visible and explain themselves;
- the module list still covers every `requirementRefs` entry gathered in steps 1–3.

Record in the handoff: plan path, document path, module count by kind, templates used, custom modules with reasons, and anything the Kit cannot cover yet.
