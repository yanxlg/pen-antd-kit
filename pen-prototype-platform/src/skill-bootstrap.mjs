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

This file only carries the stable entry protocol. Component knowledge, standards, and workflow references live in a versioned bundle that is refreshed at the start of every task.

1. Refresh the bundle. \`npx\` downloads the latest CLI automatically; the command is TTL-cached and safe to rerun:

   \`\`\`sh
   npx -y @pen-kit/antd@latest references update
   \`\`\`

2. Read the returned \`skillPath\` completely and follow that versioned Skill as the source of truth for this task.
3. Run every later CLI command from that Skill with the same runner: \`npx -y @pen-kit/antd <command>\`, or \`pen-antd <command>\` when the CLI is installed globally.
4. If the update command fails or reports \`"stale": true\`, continue with the local bundle from \`pen-antd skill path\` and mention the stale version in the handoff.

Do not cache or copy the versioned workflow into this bootstrap. The indirection is what lets knowledge updates land without reinstalling this Skill.
`;
  await writeFile(resolve(target, "SKILL.md"), content, "utf8");
  return { target, skillPath: resolve(target, "SKILL.md"), mode: "bootstrap" };
}
