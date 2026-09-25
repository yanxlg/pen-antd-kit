# Pen runtime: library import, template reading, canvas driving

## 1. The shared library home

Documents import the library by path, so the path has to be stable across projects. `pen-antd library shared` exposes the active Kit at `~/.pen` (override with `--home` or `PEN_HOME`):

```text
~/.pen/libraries → <kit>/libraries          ← the library and everything it resolves relative to itself
~/.pen/canvas-components → <kit>/canvas-components   ← target of `../canvas-components/*.js`
~/.pen/library.json                         ← alias, versions, SHA-256, link mode
```

The `libraries` directory is **copied from the Kit** so Pen can resolve imported component ids from a physical file. The `canvas-components` directory is linked when possible. The library resolves assets relative to itself — `fonts/ant.design/*.woff2`, `images/**`, `embedded-image-*.png`, `../canvas-components/*.js` — so the shared home mirrors the Kit's layout. A flat copy of `fonts/` at the shared root produces "Failed to load font" errors in Pen.

`doc build` runs this automatically before writing a document and skips the refresh when the Kit library digest is unchanged (`--refresh-library` forces it). A document then carries only:

```json
{ "imports": { "antd": "/Users/<you>/.pen/libraries/antd-6.lib.pen" } }
```

If the Kit directory moves or is pruned, the next `doc build` re-points the links; `pen-antd library status --path <file>` reports a missing import target as `libraryReady: false` with the repair command.

Rules verified against Pen 1.2.13 — breaking any of them makes instances render with library defaults or fail to resolve:

1. **Use the absolute path.** A relative path can load component definitions while silently ignoring instance overrides. Pen may rewrite the import to a relative path on save, so verify the persisted import and the rendered instance after saving and reopening. If the path changed, close the target document, repair only its document-level `imports` metadata, and reopen it before the next MCP canvas edit.
2. **Only reusable entries can be imported.** References to non-component helper nodes (the icon and typography origins) must stay in the document with their original ids; `doc build` injects them into a `Library Anchors` frame.
3. **Import resolves the referenced component only.** Anything that component references internally (`ref: 'Y9L6l'` inside `Table.js`) is looked up in the document, so those siblings have to exist there too — same `Library Anchors` frame.
4. **Verify imported controls after persistence.** The page skeleton is an editable Frame; reusable controls inside it remain imported refs. MCP `Update` on an imported control can survive a save, but a broken or relative import can make it render as a default. With Pen 1.2.13, nested imported refs behaved differently at different paths, so save, reopen, and read each required control at its exact depth before accepting the page.

Registering the library in Pen's Libraries panel is not required — the document's `imports` entry registers it (`Imported Libraries: antd-6.lib.pen`), but registering does not change the four rules above.

## 2. Reading templates does not need MCP

The template source is plain JSON at `<kitRoot>/libraries/templates.pen`, and the template catalog is derived from it at build time. Component names resolve against `<kitRoot>/libraries/antd-6.lib.pen`. Read templates with the catalog:

```sh
pen-antd template describe --all --depth 2
pen-antd template match --query "<requirement summary>"
pen-antd template describe --id <id> --depth 3
```

Why not MCP for this:

- the catalog is Kit-versioned and deterministic; MCP returns whatever the editor has open;
- the library is tens of MB — an MCP read would pull a large chunk of it into the conversation;
- `doc build` needs the same data to copy frames, and it runs without an editor.

Use MCP for reading back what is on the **canvas** (verifying generated Frames), not for reading the library.

## 3. Connecting to Pen

Pen ships the MCP server inside the app bundle:

```toml
[mcp_servers.pencil]
type = "stdio"
command = "/Applications/Pen.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64"
args = ["--app", "desktop", "--agent", "codex"]
```

- `--app desktop` is the Pen desktop app's name for this direct server configuration. A different value (for example a leftover integration directory name) fails with `transport not connected to app: <name>`.
- `--agent <name>` only labels the caller; document tools work with any name as long as the app is healthy.
- If a call returns "you are probably referencing the wrong .pen file" after ~60s, first check the active canvas path with `get_app_state`. A heavy render can leave one document service stuck even while another window responds. Save the target if it is dirty, close and reopen that document, then query one known id. Do not blindly resend the timed-out write: it may have landed. Restart Pen only if the document cannot be recovered by reopening it.

Verify without an editor restart:

```sh
pen-antd pen tools
pen-antd pen call --tool get_style --args '{}'
```

`pen-antd pen call` runs the same server over stdio, so MCP-driven steps are reproducible from the CLI.

## 4. The document tool API

Current Pen exposes document work through `execute`, a small JavaScript snippet:

```js
pageId = Insert(document, {type:"frame", name:"Page", x, y, width:1440, layout:"vertical", clip:true, placeholder:true})
Insert(pageId, {type:"text", name:"Title", textGrowth:"fixed-width", width:"fill_container", content:"APP 配置", fontSize:24, fill:"$antd-colorText"})
Update(pageId, {placeholder:false})
Print(Get(pageId, {depth:0}).type)
TakeScreenshot([someSmallNodeId])
```

- `Insert / Copy / Update / Replace / Move / Delete / Get / Print / TakeScreenshot / Export / FindEmptySpace / SetVariables / Generate` are the only functions.
- Variables survive between calls only as bare assignments (`pageId = Insert(...)`), never `const`/`let`.
- Never set `id` on nodes passed to `Insert`; Pen generates ids. The builder removes Kit ids from the copied Frame before sending it to MCP.
- Prefer `Get(path, {depth:0})` for identity and `Get(path, visit, {resolveInstances:true})` for scoped layout checks. A whole-document visitor may work, but its render cost grows sharply with imported templates.

For a template-backed page, the first read after insertion and again after save/reopen should prove its editable root and imported controls:

```js
const page = Get(pageId, {depth:0})
Print(page.id, page.type, page.x, page.y, page.width, page.height)
```

The expected root is `type:"frame"`. Read the content region, Menu and Breadcrumb and verify reusable controls are `antd:` refs; do not infer success from the root's name or `context`.

When migrating an existing page, moving its body into the copied shell avoids serializing and reinserting a deep subtree, but does not prove that new imported refs nested in the body will persist:

```js
shellId = Insert(document, preparedShellFrame)
slotId = Get(shellId, n => n?.name === "Page Body Slot · 页面内容插槽" ? n.id : undefined)[0]
Move(existingBodyId, slotId)
```

Save and reopen the candidate page, then verify the body and every required nested `ref` before deleting the old page root. Split insertion, input updates and cleanup into separate calls when a page is heavy. A timed-out write has an unknown outcome until the document is reopened and checked.

## 5. Known limits on template-heavy documents

A document holding several template instances — each with live script components such as `Table`, `Tabs`, `Drawer`, `Form` — is expensive to render:

- A whole-document traversal or a large multi-page screenshot can exceed the 60s tool budget and wedge the target document service.
- A single page screenshot can be useful after its structure is complete, but keep it to one page per call and avoid repeating it when the view has not changed.

Rules that keep the session usable:

1. Query known root ids with `depth:0`, then scoped subtrees with a visitor and `ctx.bounds`.
2. Check template identity, slot containment, position and size before taking a page screenshot. Inspect visual clipping only after the structural read.
3. Recover a stuck target by reopening that document and checking `get_app_state`; restart the application only when reopening fails.
4. Keep write batches small. A timeout is uncertain execution, so read the affected id before retrying or deleting anything.

`pen-antd doc build` writes Frames on disk without rendering, so the skeleton itself never depends on the editor staying responsive.
