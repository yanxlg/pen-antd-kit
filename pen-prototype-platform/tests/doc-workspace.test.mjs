import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import { createDocument, libraryStatus, resolveComponents } from "../src/doc-workspace.mjs";
import { resolveTemplateFrame } from "../src/registry.mjs";

const activeKit = resolve(import.meta.dirname, "../..");

function workspace() {
  return mkdtempSync(join(tmpdir(), "pen-doc-"));
}

test("createDocument injects the library closure into a new document", async (t) => {
  if (!activeKit) return t.skip("no local Kit available");
  const dir = workspace();
  const path = join(dir, "prototype.pen");
  try {
    const created = await createDocument({ path, kitRoot: activeKit, open: false });
    assert.equal(created.injected > 0, true);

    const status = await libraryStatus({ path });
    assert.equal(status.libraryReady, true);
    assert.deepEqual(status.missing, []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("createDocument is idempotent and keeps previously injected components", async (t) => {
  if (!activeKit) return t.skip("no local Kit available");
  const dir = workspace();
  const path = join(dir, "prototype.pen");
  try {
    await createDocument({ path, kitRoot: activeKit, open: false });
    const second = await createDocument({ path, kitRoot: activeKit, open: false });
    assert.equal(second.injected, 0);
    assert.equal(second.alreadyPresent > 0, true);

    const status = await libraryStatus({ path });
    assert.equal(status.libraryReady, true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("libraryStatus reports a missing library with the repair command", async () => {
  const dir = workspace();
  const path = join(dir, "empty.pen");
  try {
    await mkdir(dir, { recursive: true });
    await readFile(path).catch(() => null);
    const { writeFile } = await import("node:fs/promises");
    await writeFile(path, JSON.stringify({ version: "2.17", children: [] }));

    const status = await libraryStatus({ path });
    assert.equal(status.libraryReady, false);
    assert.equal(status.missing.length > 0, true);
    assert.match(status.nextAction, /doc new/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("createDocument with the app-shell template injects component dependencies", async (t) => {
  if (!activeKit) return t.skip("no local Kit available");
  const dir = workspace();
  const path = join(dir, "shell.pen");
  try {
    const created = await createDocument({ path, kitRoot: activeKit, template: "admin-app-shell", open: false });
    assert.deepEqual(created.missing, []);

    const document = JSON.parse(await readFile(path, "utf8"));
    const ids = new Set();
    (function index(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(index);
      if (typeof node.id === "string") ids.add(node.id);
      Object.values(node).forEach(index);
    })(document.children);
    assert.equal(ids.has("f4rW6H"), false);
    assert.equal(ids.has("ShznK"), true);

    const status = await libraryStatus({ path, kitRoot: activeKit, template: "admin-app-shell" });
    assert.equal(status.libraryReady, true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("any catalog template can supply component dependencies", async (t) => {
  if (!activeKit) return t.skip("no local Kit available");
  const dir = workspace();
  const path = join(dir, "drawer.pen");
  try {
    const created = await createDocument({ path, kitRoot: activeKit, template: "drawer-form", open: false });
    assert.deepEqual(created.missing, []);

    const document = JSON.parse(await readFile(path, "utf8"));
    const ids = new Set();
    (function index(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(index);
      if (typeof node.id === "string") ids.add(node.id);
      Object.values(node).forEach(index);
    })(document.children);
    const { frameId } = await resolveTemplateFrame(activeKit, "drawer-form");
    assert.equal(ids.has(frameId), false);
    assert.equal(ids.has("HYXCo"), true);

    const status = await libraryStatus({ path, kitRoot: activeKit, template: "drawer-form" });
    assert.equal(status.libraryReady, true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("resolveTemplateFrame rejects an unknown template", async (t) => {
  if (!activeKit) return t.skip("no local Kit available");
  await assert.rejects(() => resolveTemplateFrame(activeKit, "nope"), /Unknown template/);
});

test("resolveComponents keeps the requested component list", () => {
  assert.deepEqual(resolveComponents({ components: "a, b" }), ["a", "b"]);
});
