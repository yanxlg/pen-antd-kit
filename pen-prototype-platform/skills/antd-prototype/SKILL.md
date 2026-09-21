---
name: antd-prototype
description: Create, revise, normalize, or review standard Ant Design prototypes in Pen from requirements, Markdown, HTML, or .pen sketches. Use when a task asks for Pen UI, an Ant Design prototype, a prototype quality review, or converting product requirements into a Pen design.
---

# Ant Design prototype for Pen

Produce a usable product prototype in Pen using the managed Ant Design library. The library is the source of component instances; templates are visual composition references, not code-generation contracts.

## Non-negotiable order

1. Resolve the active Kit with `pen-antd resolve` unless the caller supplied an exact Kit root.
2. Resolve only the context needed for the task:

   ```sh
   pen-antd context resolve --input <input-path> --prompt "<short requirement>"
   ```

3. Read every file in `mustRead` relative to this Skill directory. Read `optionalRead` only when the task needs it.
4. Resolve the standards directory from `standardsRoot`, then read only `standardsMustRead`. The standards [entrypoint](../../standards/index.md) defines routing and priority; do not load its provenance reference during normal generation.
5. Run `pen-antd library prepare` before creating any nodes.
6. Satisfy the library import gate. Do not generate a page while the required library is unavailable or unverified.
7. Inspect individual components and templates on demand. Never load the whole registry into context.
8. Create or revise the prototype through Pen MCP.
9. Apply the standards [quality gate](../../standards/quality/review-checklist.md), then review states, layout, visual hierarchy, and component provenance before handoff.

## Library gate

Treat `library prepare` as a hard preflight, not an informational check.

- If `automaticImportSupported` is true, use the capability reported by Pen, then verify the expected library id and digest.
- If `manualActionRequired` is true, stop before node creation and ask the user to import the exact `library.path` once through Pen Libraries.
- Never claim the library was imported merely because the `.pen` file was downloaded.
- Never copy the complete component library into the prototype as a fallback. That breaks library provenance and produces oversized documents.

The current Pen MCP surface may not expose a library import/register operation. Capability detection, rather than an assumed tool name, controls this behavior.

## Input routing

- Markdown: extract actors, jobs, data, actions, states, constraints, and acceptance criteria. Do not mirror document headings mechanically.
- HTML: infer information architecture and behavior; replace incidental styling with Kit tokens and components.
- `.pen`: preserve valid intent, normalize component usage and layout, and avoid rebuilding unaffected areas.
- Plain requirements: make the smallest reversible assumptions and record them on a Notes artboard.

Use the routed input reference for detailed rules.

## Template policy

Templates are maintained as UI inside the library `.pen` file. Use them to accelerate page composition only when the information architecture and main interaction pattern match.

1. Query candidates with `pen-antd template match <keywords>`.
2. Inspect a candidate with `pen-antd template inspect <id>`.
3. Reuse its layout grammar and appropriate regions.
4. Adapt content and flows to the requirement; do not force a poor match.
5. When no template matches, compose from library components and pattern rules.

Templates do not require paired application code in this prototype-only chain.

## Component policy

- Query a component only when needed: `pen-antd component inspect <name>`.
- Instantiate components from the verified library; do not draw imitations for components that exist.
- Prefer documented variants and states.
- Bind spacing, color, typography, radius, and elevation to Kit tokens where Pen supports them.
- Use custom shapes only for domain-specific visuals not represented by the library.

## Page construction

For each page:

1. Define the user goal and primary action.
2. Select the closest page pattern and optional template.
3. Establish shell, navigation, content hierarchy, and responsive intent.
4. Add realistic content and data density.
5. Add required interaction states: default, loading, empty, error, disabled, and success where applicable.
6. Add annotations only where behavior cannot be inferred from the UI.

The routed standards are normative for layout and interaction. The current library remains normative for component geometry and supported variants. If a template conflicts with either, adapt or skip the template.

## Quality gate

Before handoff, verify:

- every required user task has a discoverable path;
- component instances originate from the expected library;
- page composition follows the selected pattern without unnecessary custom styling;
- default and exceptional states are represented;
- content is realistic enough to expose layout problems;
- alignment, spacing, type hierarchy, contrast, and viewport behavior are coherent;
- no unresolved placeholder, broken reference, clipped content, or accidental overlap remains.

Use screenshots or Pen inspection for visual review. Check the viewports and hard failures in `../../standards/prototype-quality.json`. Fix observed issues before reporting completion.

## Context budget

Keep progressive disclosure intact:

- this file holds orchestration and invariants;
- references hold task-specific guidance;
- CLI queries return compact records;
- `.pen`, component manifests, and registries stay on disk unless a precise fragment is needed.

Do not paste full registries, full HTML sources, or the entire library document into the conversation.

## Handoff

Report the Pen file, pages created or changed, Kit version, library verification result, assumptions, and any intentionally unmodeled behavior. Do not imply application code was generated.
