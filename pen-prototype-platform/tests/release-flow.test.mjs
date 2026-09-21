import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { buildKit } from "../src/kit-builder.mjs";
import { platformRoot } from "../src/paths.mjs";
import { resolveRelease } from "../src/release-resolver.mjs";
import { pathExists, readJson, writeJson } from "../src/io.mjs";

test("builds, verifies, and installs an immutable Kit", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-release-test-"));
  const source = resolve(root, "source");
  const output = resolve(root, "output");
  await mkdir(resolve(source, "libraries"), { recursive: true });
  await mkdir(resolve(source, "registry"), { recursive: true });
  await mkdir(resolve(source, "canvas-components"), { recursive: true });
  await writeJson(resolve(source, "package.json"), { dependencies: { antd: "6.6.4" } });
  await writeJson(resolve(source, "registry/components.json"), { library: "antd-6", version: "6.6.4", components: {} });
  await writeFile(resolve(source, "canvas-components/README.txt"), "fixture", "utf8");
  await writeJson(resolve(source, "libraries/antd-6.lib.pen"), {
    children: [{
      id: "layer-templates-pages",
      name: "Templates",
      children: [{ id: "artboard-user-management", name: "User Management · 用户管理", children: [] }]
    }]
  });

  const built = await buildKit({ sourceRoot: source, output, version: "1.2.3", quality: "passed", platformRoot });
  assert.equal(built.templates, 1);
  const channel = resolve(output, "stable.json");
  await writeJson(channel, { schemaVersion: 1, channel: "stable", releaseUrl: "./release-1.2.3.json" });
  const installed = await resolveRelease({ channelFile: channel, home: resolve(root, "home") });
  assert.equal(installed.installed, true);
  const installedRelease = await readJson(resolve(installed.kitRoot, "release.json"));
  assert.equal(installedRelease.kitVersion, "1.2.3");
  assert.equal(installedRelease.standards.version, "0.3.0");
  assert.equal(await pathExists(resolve(installed.kitRoot, "standards/index.md")), true);
  assert.equal(await pathExists(resolve(installed.kitRoot, "skills/antd-prototype/SKILL.md")), true);
});
