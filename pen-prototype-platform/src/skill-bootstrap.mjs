import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathExists } from "./io.mjs";

export async function currentReferencePath(kitRoot) {
  const developmentPath = resolve(kitRoot, "pen-prototype-platform/references/guide.md");
  if (await pathExists(developmentPath)) return developmentPath;
  const path = resolve(kitRoot, "references/guide.md");
  if (await pathExists(path)) return path;
  throw new Error(`Kit reference guide is missing: ${path}`);
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

This is the only installed skill. Component knowledge, standards, and workflow references live in a versioned Kit bundle that is refreshed at the start of every task; the Kit does not contain another skill.

1. Refresh the bundle. \`npx\` downloads the latest CLI automatically; the command is TTL-cached and safe to rerun:

   \`\`\`sh
   npx -y @pen-kit/antd@latest references update
   \`\`\`

2. Read the returned \`referencePath\` completely and follow that versioned workflow guide for this task. Resolve its linked references relative to the guide's directory.
3. Run later CLI commands from the guide with the same runner: \`npx -y @pen-kit/antd <command>\`, or \`pen-antd <command>\` when the CLI is installed globally.
4. If the update command fails or reports \`"stale": true\`, continue with the local guide from \`pen-antd references path\` and mention the stale version in the handoff.

Do not cache or copy the versioned references into this skill. The indirection lets knowledge updates land without reinstalling it.
`;
  await writeFile(resolve(target, "SKILL.md"), content, "utf8");
  return { target, skillPath: resolve(target, "SKILL.md"), mode: "bootstrap" };
}
