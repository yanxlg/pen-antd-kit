import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { prepareLibrary } from "../src/library-preflight.mjs";
import { sha256, writeJson } from "../src/io.mjs";

async function fixture() {
  const root = await mkdtemp(resolve(tmpdir(), "pen-library-test-"));
  await mkdir(resolve(root, "libraries"), { recursive: true });
  const libraryPath = resolve(root, "libraries/antd-6.lib.pen");
  await writeFile(libraryPath, "{}", "utf8");
  await writeJson(resolve(root, "release.json"), {
    schemaVersion: 1,
    kitVersion: "1.0.0",
    library: { id: "antd-6", path: "libraries/antd-6.lib.pen", sha256: await sha256(libraryPath) },
  });
  return root;
}

test("imports through the document when Pen reports no MCP import capability", async () => {
  const result = await prepareLibrary({ kitRoot: await fixture() });
  assert.equal(result.stage, "before-prototype-generation");
  assert.equal(result.import.strategy, "document-import");
  assert.equal(result.import.automaticImportSupported, true);
  assert.equal(result.import.manualActionRequired, false);
  assert.equal(result.import.alias, "antd");
});

test("selects an explicit future Pen import capability", async () => {
  const root = await fixture();
  const capabilities = resolve(root, "capabilities.json");
  await writeJson(capabilities, { tools: [{ name: "library.import" }] });
  const result = await prepareLibrary({ kitRoot: root, capabilitiesFile: capabilities });
  assert.equal(result.import.automaticImportSupported, true);
  assert.equal(result.import.capability, "library.import");
});
