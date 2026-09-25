import assert from "node:assert/strict";
import test from "node:test";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { resolveContext } from "../src/context-router.mjs";
import { platformRoot } from "../src/paths.mjs";

test("routes Markdown management requirements progressively", () => {
  const result = resolveContext({ input: "requirements.md", prompt: "用户权限管理列表" });
  assert.equal(result.workflow, "create");
  assert.equal(result.inputKind, "markdown");
  assert.equal(result.pattern, "list-page");
  assert.ok(result.mustRead.includes("inputs/markdown.md"));
  assert.ok(result.mustRead.includes("patterns/list-page.md"));
  assert.ok(result.mustRead.includes("workflows/decompose-modules.md"));
  assert.ok(result.mustRead.includes("pen-mcp-runtime.md"));
  assert.ok(!result.mustRead.includes("patterns/dashboard.md"));
  assert.equal(result.standardsRoot, "../standards");
  assert.ok(result.standardsMustRead.includes("patterns/module-decomposition.md"));
  assert.ok(result.standardsMustRead.includes("patterns/list-query.md"));
  assert.ok(!result.standardsMustRead.includes("patterns/forms-overlays.md"));
});

test("routes Pen input to revision", () => {
  const result = resolveContext({ input: "rough.pen", prompt: "统一组件库" });
  assert.equal(result.workflow, "revise");
  assert.ok(result.mustRead.includes("workflows/revise.md"));
});

test("loads both list and editor standards for a composite management page", () => {
  const result = resolveContext({ input: "requirement.md", prompt: "配置清单与编辑抽屉" });
  assert.ok(result.standardsMustRead.includes("patterns/list-query.md"));
  assert.ok(result.standardsMustRead.includes("patterns/forms-overlays.md"));
});

test("routed paths resolve from the Kit reference guide", async () => {
  const context = resolveContext({ input: "requirements.md", prompt: "用户权限管理列表" });
  const referenceRoot = resolve(platformRoot, "references");
  for (const path of [...context.mustRead, ...context.optionalRead]) {
    await access(resolve(referenceRoot, path));
  }
  for (const path of context.standardsMustRead) {
    await access(resolve(referenceRoot, context.standardsRoot, path));
  }
});
