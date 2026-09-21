import assert from "node:assert/strict";
import test from "node:test";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { prepareGitHubRelease } from "../src/github-publisher.mjs";
import { readJson, writeJson } from "../src/io.mjs";
import { platformRoot } from "../src/paths.mjs";

test("prepares immutable GitHub assets without publishing", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-github-release-test-"));
  const source = resolve(root, "source");
  await mkdir(resolve(source, "libraries"), { recursive: true });
  await mkdir(resolve(source, "registry"), { recursive: true });
  await mkdir(resolve(source, "canvas-components"), { recursive: true });
  await writeJson(resolve(source, "package.json"), { dependencies: { antd: "6.6.4" } });
  await writeJson(resolve(source, "registry/components.json"), { components: {} });
  await writeFile(resolve(source, "canvas-components/fixture.txt"), "fixture", "utf8");
  await writeJson(resolve(source, "libraries/antd-6.lib.pen"), { children: [] });

  const prepared = await prepareGitHubRelease({
    sourceRoot: source,
    output: resolve(root, "output"),
    version: "1.2.3",
    repo: "example/pen-antd-kit",
    platformRoot,
  });
  const release = await readJson(prepared.releasePath);
  const channel = await readJson(prepared.channelPath);
  assert.equal(prepared.tag, "kit-v1.2.3");
  assert.equal(release.quality.status, "candidate");
  assert.equal(release.standards.version, "0.3.0");
  assert.equal(release.artifact.url, "https://github.com/example/pen-antd-kit/releases/download/kit-v1.2.3/pen-antd-kit-1.2.3.tar.gz");
  assert.equal(channel.releaseUrl, "https://github.com/example/pen-antd-kit/releases/download/kit-v1.2.3/release-1.2.3.json");
});
