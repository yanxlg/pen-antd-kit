import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { describeAllTemplates, describeTemplate, inspectComponent, matchTemplates } from "../src/registry.mjs";
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
    schemaVersion: 2,
    templates: [
      {
        id: "user-list",
        name: "User Management",
        pattern: "standard-list",
        category: "list",
        capabilities: ["table", "search"],
        summary: { useWhen: "Managing one primary dataset", includes: "Filters, table, pagination" },
        declaredFeatures: ["Filter Bar", "Data Table"],
        frame: { id: "frame-1", name: "Frame · User List", width: 1440, height: 900, resolution: "1440x900" },
      },
      { id: "dashboard", name: "Dashboard", pattern: "dashboard", category: "dashboard", capabilities: ["charts"] },
    ],
  });
  const component = await inspectComponent(root, "button");
  assert.equal(component.component.name, "Button");
  const templates = await matchTemplates(root, "user table");
  assert.equal(templates[0].id, "user-list");
});

test("matching reads the template summary and declared features", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-registry-match-"));
  await mkdir(resolve(root, "registry"), { recursive: true });
  await writeJson(resolve(root, "registry/templates.json"), {
    schemaVersion: 2,
    templates: [
      {
        id: "split",
        name: "Split Tabs Page",
        pattern: "split-tabs",
        category: "split",
        capabilities: ["tabs", "table"],
        summary: { useWhen: "A persistent catalog drives multiple workspaces" },
        declaredFeatures: ["Module Catalog", "Data Table"],
        frame: { id: "frame-2", name: "Frame · Split Tabs", resolution: "2160x1914" },
      },
      {
        id: "shell",
        name: "App Shell",
        pattern: "admin-app-shell",
        category: "shell",
        capabilities: ["navigation"],
        summary: { useWhen: "A full host shell is required" },
        declaredFeatures: ["Brand Area", "Side Navigation"],
        frame: { id: "frame-3", name: "Frame · Admin App Shell", resolution: "1440x900" },
      },
    ],
  });
  const catalog = await matchTemplates(root, "左右分栏 配置目录 表格");
  assert.equal(catalog[0].id, "split");
  const shell = await matchTemplates(root, "后台外壳 导航");
  assert.equal(shell[0].id, "shell");
});

test("describe renders a digest the agent can act on", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-registry-describe-"));
  await mkdir(resolve(root, "registry"), { recursive: true });
  await writeJson(resolve(root, "registry/templates.json"), {
    schemaVersion: 2,
    templates: [
      {
        id: "form-drawer",
        name: "Drawer Form",
        pattern: "drawer-form",
        category: "form",
        capabilities: ["form", "drawer"],
        summary: { useWhen: "Creating or editing a complex record in context", includes: "Form fields, footer actions" },
        declaredFeatures: ["Drawer Header", "Form Fields", "Footer Actions"],
        frame: { id: "frame-4", name: "Frame · Form Drawer", resolution: "1920x1080" },
        slots: [{ path: "frame-4/body", id: "body", name: "Body Slot", instruction: "Replace with the record form" }],
        components: [{ id: "DQZzq", name: "Button" }],
      },
    ],
  });
  const { template, digest } = await describeTemplate(root, "drawer-form");
  assert.equal(template.frame.id, "frame-4");
  assert.match(digest, /pattern: drawer-form/);
  assert.match(digest, /use-when: Creating or editing/);
  assert.match(digest, /declared features: Drawer Header, Form Fields, Footer Actions/);
  assert.match(digest, /frame-4\/body \| Body Slot \| Replace with the record form/);
  const all = await describeAllTemplates(root);
  assert.equal(all.templates.length, 1);
  assert.match(all.digest, /Drawer Form/);
});
