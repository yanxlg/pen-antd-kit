import assert from "node:assert/strict";
import test from "node:test";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { extractTemplates, renderTemplateDigest } from "../src/template-catalog.mjs";
import { listTemplates, resolveTemplateFrame } from "../src/registry.mjs";

const board = {
  id: "BOARD1",
  type: "frame",
  name: "Split Tabs Page · 左右分栏多 Tab 模板",
  children: [
    { id: "t1", type: "text", name: "Description · 模板描述", content: "Catalog, tabs, filters and table." },
    { id: "t2", type: "text", name: "适用场景内容", content: "A persistent catalog drives multiple workspaces" },
    { id: "t3", type: "text", name: "功能内容", content: "Catalog search, tabs, filters, table, pagination" },
    { id: "n1", type: "note", name: "Note · Module Catalog" },
    { id: "n2", type: "note", name: "Note · Data Table" },
    {
      id: "FRAME1",
      type: "frame",
      name: "Frame · Split Tabs",
      width: 2160,
      height: 1914,
      context: "prototype-template; pattern=split-tabs; viewport=desktop; resolution=2160x1914",
      children: [
        {
          id: "aside1",
          type: "frame",
          name: "aside",
          width: 290,
          children: [{ id: "slot1", type: "frame", name: "Catalog Slot · 可替换", context: "Replace with the module tree" }],
        },
        { id: "ref1", type: "ref", ref: "C_TABLE", name: "Table · Configs" },
      ],
    },
  ],
};

const library = {
  version: "2.17",
  children: [{ id: "C_TABLE", type: "script", name: "Table", scriptUri: "canvas-components/Table.js" }],
};
const templateDocument = { version: "2.17", children: [{ id: "layer-templates-pages", type: "frame", name: "Templates & Pages", children: [board] }] };

async function kitFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "pen-template-catalog-"));
  await mkdir(resolve(root, "libraries"), { recursive: true });
  await writeFile(resolve(root, "libraries/antd-6.lib.pen"), JSON.stringify(library));
  await writeFile(resolve(root, "libraries/templates.pen"), JSON.stringify(templateDocument));
  return root;
}

test("extractTemplates derives the catalog from the template board", async () => {
  const root = await kitFixture();
  const templates = await extractTemplates(resolve(root, "libraries/templates.pen"), resolve(root, "libraries/antd-6.lib.pen"));
  assert.equal(templates.length, 1);
  const [template] = templates;
  assert.equal(template.pattern, "split-tabs");
  assert.equal(template.category, "split");
  assert.equal(template.frame.id, "FRAME1");
  assert.equal(template.frame.resolution, "2160x1914");
  assert.equal(template.summary.useWhen, "A persistent catalog drives multiple workspaces");
  assert.deepEqual(template.declaredFeatures, ["Module Catalog", "Data Table"]);
  assert.equal(template.slots.length, 1);
  assert.equal(template.slots[0].instruction, "Replace with the module tree");
  assert.deepEqual(template.components, [{ id: "C_TABLE", name: "Table" }]);
  assert.equal(template.parts.some((part) => part.role === "sider"), true);
  assert.equal(template.capabilities.includes("table"), true);
});

test("digest exposes pattern, features and replaceable parts", async () => {
  const root = await kitFixture();
  const templates = await extractTemplates(resolve(root, "libraries/templates.pen"), resolve(root, "libraries/antd-6.lib.pen"));
  const digest = renderTemplateDigest(templates[0], { depth: 3 });
  assert.match(digest, /pattern: split-tabs/);
  assert.match(digest, /use-when: A persistent catalog/);
  assert.match(digest, /declared features: Module Catalog, Data Table/);
  assert.match(digest, /FRAME1\/aside1\/slot1 \| Catalog Slot · 可替换 \| Replace with the module tree/);
  assert.match(digest, /Table \(C_TABLE\)/);
});

test("a Kit without a catalog still resolves templates from the template file", async () => {
  const root = await kitFixture();
  const templates = await listTemplates(root);
  assert.equal(templates.length, 1);
  const { frameId } = await resolveTemplateFrame(root, "split-tabs");
  assert.equal(frameId, "FRAME1");
  const byName = await resolveTemplateFrame(root, "Split Tabs Page · 左右分栏多 Tab 模板");
  assert.equal(byName.frameId, "FRAME1");
  await assert.rejects(() => resolveTemplateFrame(root, "nope"), /Unknown template/);
});
