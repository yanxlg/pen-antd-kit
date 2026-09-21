import { resolve } from "node:path";
import { pathExists, readJson } from "./io.mjs";
import { extractTemplates } from "./kit-builder.mjs";
import { currentSkillPath } from "./skill-bootstrap.mjs";

export async function doctor(kitRoot) {
  const checks = [];
  const development = await pathExists(resolve(kitRoot, "pen-prototype-platform"));
  const releasePath = development
    ? resolve(kitRoot, "pen-prototype-platform/releases/development/release.json")
    : resolve(kitRoot, "release.json");
  checks.push({ name: "release manifest", ok: await pathExists(releasePath) });
  for (const relativePath of ["libraries/antd-6.lib.pen", "registry/components.json"]) {
    checks.push({ name: relativePath, ok: await pathExists(resolve(kitRoot, relativePath)) });
  }
  try {
    checks.push({
      name: "templates are indexed or extractable",
      ok: (await extractTemplates(resolve(kitRoot, "libraries/antd-6.lib.pen"))).length > 0,
    });
  } catch {
    checks.push({ name: "templates are indexed or extractable", ok: false });
  }
  try {
    checks.push({ name: "versioned Skill", ok: Boolean(await currentSkillPath(kitRoot)) });
  } catch {
    checks.push({ name: "versioned Skill", ok: false });
  }
  if (await pathExists(releasePath)) {
    const release = await readJson(releasePath);
    checks.push({ name: "release.schemaVersion", ok: release.schemaVersion === 1 });
    checks.push({ name: "release.library.path", ok: typeof release.library?.path === "string" });
  }
  return { ok: checks.every((check) => check.ok), kitRoot, checks };
}
