import assert from "node:assert/strict";
import test from "node:test";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { buildKit } from "../src/kit-builder.mjs";
import { platformRoot } from "../src/paths.mjs";
import { pathExists, readJson, writeJson } from "../src/io.mjs";
import { updateReferences } from "../src/references-update.mjs";

async function kitSource(root) {
  const source = resolve(root, "source");
  await mkdir(resolve(source, "libraries"), { recursive: true });
  await mkdir(resolve(source, "registry"), { recursive: true });
  await mkdir(resolve(source, "canvas-components"), { recursive: true });
  await writeJson(resolve(source, "package.json"), { dependencies: { antd: "6.6.4" } });
  await writeJson(resolve(source, "registry/components.json"), { library: "antd-6", version: "6.6.4", components: {} });
  await writeFile(resolve(source, "canvas-components/README.txt"), "fixture", "utf8");
  await writeJson(resolve(source, "libraries/antd-6.lib.pen"), { children: [] });
  await writeJson(resolve(source, "libraries/templates.pen"), { children: [] });
  return source;
}

test("uses a local Kit directory supplied with --source", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-refs-local-"));
  const source = await kitSource(root);
  const built = await buildKit({ sourceRoot: source, output: resolve(root, "output"), version: "1.0.0", quality: "passed", platformRoot });
  await mkdir(resolve(root, "kit"), { recursive: true });
  const { spawnSync } = await import("node:child_process");
  const extracted = spawnSync("tar", ["-xzf", built.archivePath, "-C", resolve(root, "kit")], { encoding: "utf8" });
  assert.equal(extracted.status, 0);

  const result = await updateReferences({ source: resolve(root, "kit"), home: resolve(root, "home") });
  assert.equal(result.source, "local");
  assert.equal(result.stale, false);
  assert.equal(result.kitVersion, "1.0.0");
  assert.equal(await pathExists(result.referencePath), true);
  assert.equal(result.referencePath, resolve(result.kitRoot, "references/guide.md"));
});

test("installs the release Kit, then serves it from cache within the TTL", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-refs-remote-"));
  const source = await kitSource(root);
  const output = resolve(root, "output");
  await buildKit({ sourceRoot: source, output, version: "2.0.0", quality: "passed", platformRoot });
  const channelFile = resolve(output, "stable.json");
  await writeJson(channelFile, { schemaVersion: 1, channel: "stable", releaseUrl: "./release-2.0.0.json" });
  const home = resolve(root, "home");

  const installed = await updateReferences({ channelFile, home });
  assert.equal(installed.source, "remote");
  assert.equal(installed.updated, true);
  assert.equal(installed.kitVersion, "2.0.0");
  assert.equal(await pathExists(installed.referencePath), true);
  assert.equal(installed.referencePath, resolve(installed.kitRoot, "references/guide.md"));

  const cached = await updateReferences({ channelFile, home });
  assert.equal(cached.source, "cache");
  assert.equal(cached.updated, false);

  const forced = await updateReferences({ channelFile, home, ttl: 0 });
  assert.equal(forced.source, "remote");
  assert.equal(forced.updated, false);
});

test("falls back to the local Kit and reports stale when the update fails", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-refs-fallback-"));
  const source = await kitSource(root);
  const output = resolve(root, "output");
  await buildKit({ sourceRoot: source, output, version: "3.0.0", quality: "passed", platformRoot });
  const channelFile = resolve(output, "stable.json");
  await writeJson(channelFile, { schemaVersion: 1, channel: "stable", releaseUrl: "./release-3.0.0.json" });
  const home = resolve(root, "home");

  await updateReferences({ channelFile, home });
  await writeJson(channelFile, { schemaVersion: 1, channel: "stable", releaseUrl: "./missing-release.json" });

  const stale = await updateReferences({ channelFile, home, force: true });
  assert.equal(stale.source, "fallback");
  assert.equal(stale.stale, true);
  assert.equal(stale.kitVersion, "3.0.0");
  assert.match(stale.warning, /3\.0\.0/);

  await assert.rejects(
    () => updateReferences({ channelFile, home: resolve(root, "cold-home"), force: true }),
    /Unable to fetch JSON|does not exist|ENOENT/,
  );
});
