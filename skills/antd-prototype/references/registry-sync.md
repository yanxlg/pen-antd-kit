# Registry synchronization

Ant Design's official `@ant-design/cli` is the canonical API metadata source. The checked-in `registry/components.json` is the offline design registry and contains the component origins plus the Props most useful in an Inspector. When a task needs an exact API table, a new Ant Design minor version, or a less common component, refresh the entry from the official CLI before designing.

```bash
npx -y @ant-design/cli@latest info Button --version 6.6.4 --format json
npx -y @ant-design/cli@latest info Table --version 6.6.4 --detail --format json
npx -y @ant-design/cli@latest token --version 6.6.4 --format json
```

Keep the version pinned to the project's installed `antd` version. Preserve the CLI's `type`, `default`, `since`, `deprecated`, and `subComponentProps` fields when adding a complete API entry. Do not silently treat a runtime callback as a visual design control; classify it as runtime-only in the component manifest.

The official CLI extracts component APIs and token metadata from the Ant Design source and supports versioned snapshots. This avoids hand-maintaining a second, potentially stale copy of the complete API surface.
