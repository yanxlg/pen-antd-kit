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
  assert.match(content, /references update/);
  assert.match(content, /referencePath/);
  assert.match(content, /references path/);
  assert.doesNotMatch(content, /versioned Skill|skillPath/);
  assert.match(content, /npx -y @pen-kit\/antd@latest/);
  assert.doesNotMatch(content, /# List page/);
});
