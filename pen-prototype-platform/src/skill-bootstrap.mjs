import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathExists } from "./io.mjs";

export async function currentSkillPath(kitRoot) {
  const developmentPath = resolve(kitRoot, "pen-prototype-platform/skills/antd-prototype/SKILL.md");
  if (await pathExists(developmentPath)) return developmentPath;
  const path = resolve(kitRoot, "skills/antd-prototype/SKILL.md");
  if (await pathExists(path)) return path;
  throw new Error(`Kit skill is missing: ${path}`);
}

export async function installBootstrapSkill(targetRoot) {
  const target = resolve(targetRoot, "antd-prototype");
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  const content = `---
name: antd-prototype
description: Generate or revise Pen prototypes from requirements, Markdown, HTML, or .pen sketches using the managed Ant Design Pen kit. Use for Pen UI prototyping, Ant Design prototype generation, or prototype review.
---

# Ant Design Pen prototype bootstrap

1. Run \`pen-antd resolve\` to resolve the active managed Kit.
2. Run \`pen-antd skill path\` and read the returned \`skillPath\` completely.
3. Follow that versioned Skill as the source of truth for this task.
4. Before creating any prototype nodes, run \`pen-antd library prepare\` and obey its import gate.

Do not cache or copy the versioned workflow into this bootstrap. The indirection is what allows Kit updates without reinstalling this Skill.
`;
  await writeFile(resolve(target, "SKILL.md"), content, "utf8");
  return { target, skillPath: resolve(target, "SKILL.md"), mode: "bootstrap" };
}
