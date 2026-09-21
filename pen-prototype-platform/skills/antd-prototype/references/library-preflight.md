# Library preflight

Run this after Kit resolution and before prototype generation.

1. Execute `pen-antd library prepare`.
2. Confirm the file exists and its SHA-256 matches the release manifest.
3. Inspect Pen's currently exposed MCP tools or capability snapshot.
4. If an explicit library import/register capability is reported, invoke that exact capability.
5. Otherwise ask for a one-time import of the reported file through Pen Libraries.
6. Verify the active library identity before creating nodes. A downloaded file alone is not an imported library.

This gate belongs between download and generation because newly created instances must reference an already-known library. Running it after generation would leave detached or substituted components.

Do not automate Pen's private files, preferences, or internal database. Those are undocumented and unsafe upgrade surfaces.
