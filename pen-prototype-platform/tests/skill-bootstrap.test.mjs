import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { installBootstrapSkill } from "../src/skill-bootstrap.mjs";

test("installs only the stable bootstrap layer", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "pen-skill-test-"));
  const result = await installBootstrapSkill(root);
  const content = await readFile(result.skillPath, "utf8");
  assert.match(content, /pen-antd resolve/);
  assert.match(content, /pen-antd skill path/);
  assert.doesNotMatch(content, /# List page/);
});
