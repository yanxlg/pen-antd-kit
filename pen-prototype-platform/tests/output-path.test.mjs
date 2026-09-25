import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { defaultPrototypePath, documentMatchesPlan, nextAvailablePath, prototypeNameFor, resolvePrototypePath } from "../src/output-path.mjs";

function scratch() {
  return mkdtempSync(join(tmpdir(), "pen-out-"));
}

test("the prototype is named after the requirement document and sits next to it", async () => {
  const dir = scratch();
  const source = join(dir, "APP配置运营管理 & 配置清单_需求.md");
  await writeFile(source, "# requirement");

  try {
    const plan = { source, modules: [] };
    assert.equal(defaultPrototypePath({ plan }), join(dir, "APP配置运营管理 & 配置清单_需求.pen"));
    assert.equal(prototypeNameFor(source), "APP配置运营管理 & 配置清单_需求");
    assert.equal(defaultPrototypePath({ plan, name: "APP配置运营管理-原型" }), join(dir, "APP配置运营管理-原型.pen"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("an existing file of another plan asks the user instead of guessing", async () => {
  const dir = scratch();
  const source = join(dir, "req.md");
  const target = join(dir, "req.pen");
  await writeFile(source, "# req");
  await writeFile(target, JSON.stringify({ version: "2.18", children: [] }));

  try {
    const plan = { source, modules: [{ id: "a.list" }] };
    assert.throws(
      () => resolvePrototypePath({ plan }),
      (error) => {
        assert.equal(error.code, "OUTPUT_EXISTS");
        assert.equal(error.conflict.askUser, true);
        assert.deepEqual(error.conflict.options.map((option) => option.mode), ["replace", "rename", "custom"]);
        return true;
      },
    );
    assert.equal(resolvePrototypePath({ plan, onConflict: "replace" }).action, "replaced");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("rename picks the next free numeric suffix", async () => {
  const dir = scratch();
  const source = join(dir, "req.md");
  const target = join(dir, "req.pen");
  await writeFile(source, "# req");
  await writeFile(target, "{}");
  await writeFile(join(dir, "req-2.pen"), "{}");

  try {
    const plan = { source, modules: [] };
    const first = resolvePrototypePath({ plan, onConflict: "rename" });
    assert.equal(first.path, join(dir, "req-3.pen"));
    assert.equal(nextAvailablePath(target), join(dir, "req-3.pen"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("rebuilding a document this plan already produced does not look like a clash", async () => {
  const dir = scratch();
  const source = join(dir, "req.md");
  const target = join(dir, "req.pen");
  await writeFile(source, "# req");

  const plan = { source, modules: [{ id: "app.list" }] };
  const document = {
    version: "2.18",
    children: [{ id: "mod-app-list-1", type: "frame", context: "module; id=app.list; kind=page; template=split-tabs" }],
  };
  try {
    assert.equal(documentMatchesPlan(document, plan), true);
    assert.equal(documentMatchesPlan(document, { source, modules: [{ id: "other" }] }), false);

    await writeFile(target, JSON.stringify(document));
    const result = resolvePrototypePath({ plan, samePlan: documentMatchesPlan(document, plan) });
    assert.equal(result.path, target);
    assert.equal(result.action, "rebuilt");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a plan without a local source has to be told where to write", async () => {
  const dir = scratch();
  try {
    assert.throws(() => defaultPrototypePath({ plan: { source: "https://example.com/req.md" } }), /not a local file/);
    const explicit = resolvePrototypePath({ plan: { source: "" }, path: join(dir, "custom.pen") });
    assert.equal(explicit.path, join(dir, "custom.pen"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
