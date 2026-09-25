import assert from "node:assert/strict";
import { existsSync, lstatSync, mkdtempSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { prepareSharedLibrary, readSharedLibrary, sharedAssetPath, sharedLibraryPath } from "../src/library-store.mjs";
import { kitFixture } from "./kit-fixture.mjs";

function scratch() {
  return mkdtempSync(join(tmpdir(), "pen-store-"));
}

test("prepareSharedLibrary materializes the library and its assets under the shared home", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const home = join(dir, "pen");

  try {
    const result = await prepareSharedLibrary({ kitRoot, home });
    assert.equal(result.changed, true);
    assert.equal(result.alias, "antd");
    assert.equal(result.libraryPath, sharedLibraryPath({ home }));
    assert.equal(existsSync(result.libraryPath), true);
    assert.equal(lstatSync(result.libraryPath).isFile(), true);

    const document = JSON.parse(await readFile(result.libraryPath, "utf8"));
    assert.equal(document.version, "2.18");
    assert.equal(result.libraryVersion, "2.18");

    const manifest = await readSharedLibrary({ home });
    assert.equal(manifest.sha256, result.sha256);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("prepareSharedLibrary skips the copy when the Kit digest is unchanged", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const home = join(dir, "pen");

  try {
    const first = await prepareSharedLibrary({ kitRoot, home });
    const second = await prepareSharedLibrary({ kitRoot, home });
    assert.equal(first.changed, true);
    assert.equal(second.changed, false);

    const forced = await prepareSharedLibrary({ kitRoot, home, force: true });
    assert.equal(forced.changed, true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("prepareSharedLibrary refreshes when the Kit library changes", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const home = join(dir, "pen");

  try {
    await prepareSharedLibrary({ kitRoot, home });
    const libraryPath = join(kitRoot, "libraries/antd-6.lib.pen");
    const library = JSON.parse(await readFile(libraryPath, "utf8"));
    await writeFile(libraryPath, `${JSON.stringify({ ...library, version: "2.19" })}\n`);

    const refreshed = await prepareSharedLibrary({ kitRoot, home });
    assert.equal(refreshed.changed, true);
    assert.equal(refreshed.libraryVersion, "2.19");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("prepareSharedLibrary keeps the library's relative asset layout reachable", async () => {
  const kitRoot = await kitFixture();
  const dir = scratch();
  const home = join(dir, "pen");
  await mkdir(join(kitRoot, "canvas-components"), { recursive: true });
  // The library resolves `fonts/...` relative to itself, so the font lives next
  // to the library file, not at the Kit root.
  await mkdir(join(kitRoot, "libraries/fonts/ant.design"), { recursive: true });
  await writeFile(join(kitRoot, "canvas-components/Table.js"), "export default {}");
  await writeFile(join(kitRoot, "libraries/fonts/ant.design/one.woff2"), "font");

  try {
    const result = await prepareSharedLibrary({ kitRoot, home });
    assert.equal(result.assetMode, "link");
    assert.equal(existsSync(join(home, "canvas-components/Table.js")), true);
    assert.equal(existsSync(join(home, "libraries/fonts/ant.design/one.woff2")), true);

    const rewritten = sharedAssetPath("../canvas-components/Table.js", {
      fromDir: join(kitRoot, "libraries"),
      kitRoot,
      home,
    });
    assert.equal(rewritten, join(home, "canvas-components/Table.js"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("sharedAssetPath leaves absolute and remote references untouched", async () => {
  const kitRoot = await kitFixture();
  assert.equal(sharedAssetPath("https://example.com/a.js", { fromDir: kitRoot, kitRoot, home: "/tmp/pen" }), "https://example.com/a.js");
  assert.equal(sharedAssetPath("/opt/assets/a.js", { fromDir: kitRoot, kitRoot, home: "/tmp/pen" }), "/opt/assets/a.js");
});
