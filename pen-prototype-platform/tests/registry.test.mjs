import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { inspectComponent, matchTemplates } from "../src/registry.mjs";
import { writeJson } from "../src/io.mjs";

test("returns compact component and template records", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-registry-test-"));
  await mkdir(resolve(root, "registry"), { recursive: true });
  await writeJson(resolve(root, "registry/components.json"), {
    library: "antd-6",
    version: "6.6.4",
    components: { Button: { name: "Button", category: "General", props: ["type"] } },
  });
  await writeJson(resolve(root, "registry/templates.json"), {
    schemaVersion: 1,
    templates: [
      { id: "user-list", name: "User Management", category: "management-list", capabilities: ["table", "search"] },
      { id: "dashboard", name: "Dashboard", category: "dashboard", capabilities: ["charts"] }
    ],
  });
  const component = await inspectComponent(root, "button");
  assert.equal(component.component.name, "Button");
  const templates = await matchTemplates(root, "user table");
  assert.equal(templates[0].id, "user-list");
});
