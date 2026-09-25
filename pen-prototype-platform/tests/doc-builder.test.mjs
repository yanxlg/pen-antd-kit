import assert from "node:assert/strict";
import { existsSync, mkdtempSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildFromPlan } from "../src/doc-builder.mjs";
import { fixturePlan, kitFixture } from "./kit-fixture.mjs";

function scratch() {
  return mkdtempSync(join(tmpdir(), "pen-doc-"));
}

const sharedHome = (dir) => join(dir, "pen-home");

function findNode(node, predicate) {
  if (!node || typeof node !== "object") return undefined;
  if (Array.isArray(node)) {
    for (const item of node) {
      const match = findNode(item, predicate);
      if (match) return match;
    }
    return undefined;
  }
  if (predicate(node)) return node;
  for (const [key, value] of Object.entries(node)) {
    if (key === "id" || !value || typeof value !== "object") continue;
    const match = findNode(value, predicate);
    if (match) return match;
  }
  return undefined;
}

test("buildFromPlan writes one Frame per module and lays them out by kind", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    const result = await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));

    const page = document.children.find((child) => child.name === "Page · 配置列表");
    const drawer = document.children.find((child) => child.name === "Drawer · 编辑配置");
    const modal = document.children.find((child) => child.name === "Modal · 发布确认");

    assert.ok(page && drawer && modal);
    assert.deepEqual([page.x, page.y, page.width, page.height], [0, 0, 1440, 900]);
    assert.equal(page.context.includes("template=admin-app-shell"), true);
    assert.equal(drawer.width, 1600);
    assert.equal(drawer.y > page.y, true, "drawers start below the page row");
    assert.equal(modal.y > drawer.y, true, "modals start below the drawer row");
    assert.equal(modal.stroke.color, "#FFA940", "custom modules get a placeholder frame");

    assert.equal(document.children.some((child) => child.id === "plan-notes"), true);
    assert.equal(document.children.some((child) => child.id === "library-sources"), false, "import mode keeps no component copies");
    assert.equal(document.imports.antd, join(sharedHome(dir), "libraries/antd-6.lib.pen"));
    assert.equal(existsSync(document.imports.antd), true, "the shared library is materialized");

    const result_ = result.modules.find((module) => module.id === "config.publish-confirm");
    assert.equal(result_.placeholder, true);
    assert.equal(result.library.mode, "import");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("outer template resolution sets the initial fixed width and minimum height", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");
  const libraryPath = join(kitRoot, "libraries/templates.pen");

  try {
    const library = JSON.parse(await readFile(libraryPath, "utf8"));
    const shell = library.children[0].children.find((board) => board.id === "BOARD_SHELL");
    const sourceFrame = shell.children.find((node) => node.id === "FRAME_SHELL");
    sourceFrame.reusable = true;
    sourceFrame.context =
      "prototype-template; pattern=admin-app-shell; viewport=desktop; resolution=1500x950";
    await writeFile(libraryPath, JSON.stringify(library));

    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));
    const page = document.children.find((child) => child.name === "Page · 配置列表");
    assert.deepEqual([page.width, page.height], [1500, 950]);
    assert.equal(page.reusable, undefined, "a copied page is not a component definition");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("nested templates replace the outer slot and reflow instead of scaling", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));
    const page = document.children.find((child) => child.name === "Page · 配置列表");

    const content = findNode(page, (node) => node.name === "Page · 配置列表 · Content");
    assert.ok(content, "inner template lands inside the shell");
    assert.equal(content.width, "fill_container");
    assert.equal(content.height, "fill_container");
    assert.equal(content.context.includes("reflow=true"), true);

    const leftover = findNode(page, (node) => node.name === "页面内容容器占位 · 可替换");
    assert.equal(leftover, undefined, "the replaced slot is gone");

    const aside = findNode(content, (node) => node.name === "aside");
    assert.ok(aside, "the inner template keeps its own structure");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("module copies get their own ids so two modules can share a template", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    const plan = fixturePlan({
      modules: [
        fixturePlan().modules[1],
        { ...fixturePlan().modules[1], id: "config.create-drawer", title: "新建配置" },
      ],
    });
    await buildFromPlan({ via: "file", path, plan, kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));

    const frames = document.children.filter((child) => child.name.startsWith("Drawer ·"));
    assert.equal(frames.length, 2);
    const ids = frames.map((frame) => frame.id);
    assert.notEqual(ids[0], ids[1]);
    for (const frame of frames) {
      assert.equal(findNode(frame, (node) => node.type === "ref" && node.ref === "C_TABLE")?.id, undefined);
      assert.ok(findNode(frame, (node) => node.name === "Drawer · Form"));
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a plan that fails validation is never built", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    await assert.rejects(
      () => buildFromPlan({ via: "file", path, plan: fixturePlan({ modules: [{ ...fixturePlan().modules[1], template: "nope" }] }), kitRoot }),
      /Plan is not buildable/,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("rebuilding the same plan replaces its frames instead of duplicating them", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const first = JSON.parse(await readFile(path, "utf8"));
    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const second = JSON.parse(await readFile(path, "utf8"));

    const count = (document) => document.children.filter((child) => /^(Page|Drawer|Modal|Panel) · /.test(child.name || "")).length;
    assert.equal(count(first), 3);
    assert.equal(count(second), 3);
    assert.equal(second.children.filter((child) => child.id === "plan-notes").length, 1);
    assert.equal(second.imports.antd, first.imports.antd, "the import survives a rebuild");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("import mode namespaces every library reference and drops local copies", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));
    const page = document.children.find((child) => child.name === "Page · 配置列表");

    const table = findNode(page, (node) => node.type === "ref" && String(node.ref).includes("C_TABLE"));
    assert.equal(table.ref, "antd:C_TABLE");
    assert.equal(findNode(page, (node) => node.type === "ref" && node.ref === "C_TABLE"), undefined);

    const library = JSON.parse(await readFile(document.imports.antd, "utf8"));
    assert.equal(library.version, "2.18");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("embed mode still carries the component closure inside the document", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    const result = await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, library: "embed", home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));

    assert.equal(result.library.mode, "embed");
    assert.equal(document.imports, undefined);
    assert.ok(document.children.find((child) => child.id === "library-sources"));
    const page = document.children.find((child) => child.name === "Page · 配置列表");
    assert.equal(findNode(page, (node) => node.ref === "C_TABLE") !== undefined, true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("import mode materializes structural overrides in copied templates", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));
    const page = document.children.find((child) => child.name === "Page · 配置列表");

    assert.equal(findNode(page, (node) => node.descendants !== undefined), undefined);
    const flattened = findNode(page, (node) => node.name === "Content Padding · Fixed 16px");
    assert.ok(flattened, "the instance override survives as a plain frame");
    assert.equal(flattened.padding, 16, "the override keeps its own layout");
    assert.ok(findNode(flattened, (node) => node.name === "Page · 配置列表 · Content"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("non-reusable dependencies stay local instead of going through the import", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const path = join(dir, "prototype.pen");

  try {
    await buildFromPlan({ via: "file", path, plan: fixturePlan(), kitRoot, home: sharedHome(dir) });
    const document = JSON.parse(await readFile(path, "utf8"));
    const anchors = document.children.find((child) => child.id === "library-anchors");

    assert.ok(anchors, "dependency anchors are injected");
    assert.deepEqual(anchors.children.map((child) => child.id), ["C_ORIGIN"]);
    assert.equal(anchors.children[0].reusable, undefined, "anchors are plain nodes");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
