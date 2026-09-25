# Library preflight

Run this after Kit resolution and before prototype generation.

1. Execute `pen-antd library prepare` and confirm the library file exists with the expected SHA-256.
2. Create the working document and open it in Pen:

   ```sh
   pen-antd doc new --path <file.pen>
   ```

3. Verify with `pen-antd library status --path <file.pen>`. Create no nodes while `libraryReady` is false; rerun `doc new` to repair the document.
4. Only then create component instances through Pen MCP.

This gate belongs between download and generation because newly created instances must reference components that the document can already resolve. Running it after generation would leave detached or substituted components.

## How documents get their components

Pen exposes no MCP operation to import or register a library, and `execute` only writes to a document that is already open in the editor. Each prototype document therefore carries its own component sources:

- `doc new` copies the closure the task needs — requested components plus every id their scripts resolve internally, such as icon and empty-state origins — into an off-canvas `Library Sources` frame, preserving ids so script components keep resolving their internal references.
- Copying only the closure keeps documents small. A full library copy is tens of megabytes and breaks provenance.
- Opening the document is `open -a Pen <file>` on macOS. Pen does not reread a file it already has open, so inject the library before opening, or open a path it has not loaded yet.

Do not automate Pen's private files, preferences, or internal database. Those are undocumented and unsafe upgrade surfaces.
