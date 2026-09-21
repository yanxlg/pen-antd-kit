import { cp, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathExists, readJson, sha256, writeJson } from "./io.mjs";
import { validateStandards } from "./standards-validator.mjs";

const sourceEntries = ["canvas-components", "registry"];
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;

function inferTemplate(node) {
  const text = `${node.id || ""} ${node.name || ""}`.toLowerCase();
  let category = "general";
  const capabilities = [];
  if (/dashboard|大盘|监控/.test(text)) {
    category = "dashboard";
    capabilities.push("metrics", "charts", "monitoring");
  } else if (/user|用户|permission|权限/.test(text)) {
    category = "management-list";
    capabilities.push("search", "table", "batch-actions");
  } else if (/form|表单|申请|wizard|step/.test(text)) {
    category = "form";
    capabilities.push("steps", "validation", "submission");
  }
  return {
    id: node.id,
    name: node.name || node.id,
    category,
    capabilities,
    source: { file: "libraries/antd-6.lib.pen", nodeId: node.id },
  };
}

function findNode(root, id) {
  if (!root || typeof root !== "object") return undefined;
  if (root.id === id) return root;
  for (const child of root.children || []) {
    const match = findNode(child, id);
    if (match) return match;
  }
  return undefined;
}

export async function extractTemplates(libraryPath) {
  const document = JSON.parse(await readFile(libraryPath, "utf8"));
  const container = findNode(document, "layer-templates-pages")
    || (document.children || []).find((node) => /template|模板/i.test(node.name || ""));
  return (container?.children || []).map(inferTemplate);
}

async function copyRequired(sourceRoot, kitRoot) {
  for (const entry of sourceEntries) {
    const source = resolve(sourceRoot, entry);
    if (!(await pathExists(source))) throw new Error(`Required source is missing: ${source}`);
    await cp(source, resolve(kitRoot, entry), { recursive: true });
  }
  const sourceLibrary = resolve(sourceRoot, "libraries/antd-6.lib.pen");
  if (!(await pathExists(sourceLibrary))) throw new Error(`Required source is missing: ${sourceLibrary}`);
  await mkdir(resolve(kitRoot, "libraries"), { recursive: true });
  await cp(sourceLibrary, resolve(kitRoot, "libraries/antd-6.lib.pen"));
}

export async function buildKit({ sourceRoot, output, version, quality = "candidate", platformRoot }) {
  if (!sourceRoot || !output || !version) throw new Error("kit build requires --source-root, --output, and --version");
  if (!semverPattern.test(version)) throw new Error("Kit version must be SemVer");
  const outputRoot = resolve(output);
  await mkdir(outputRoot, { recursive: true });
  const temporaryRoot = await mkdtemp(resolve(tmpdir(), "pen-antd-build-"));
  try {
    const standards = await validateStandards(resolve(platformRoot, "standards"));
    const kitRoot = resolve(temporaryRoot, "kit");
    await mkdir(kitRoot, { recursive: true });
    await copyRequired(resolve(sourceRoot), kitRoot);
    await cp(resolve(platformRoot, "skills"), resolve(kitRoot, "skills"), { recursive: true });
    await cp(resolve(platformRoot, "rules"), resolve(kitRoot, "rules"), { recursive: true });
    await cp(resolve(platformRoot, "schemas"), resolve(kitRoot, "schemas"), { recursive: true });
    await cp(resolve(platformRoot, "standards"), resolve(kitRoot, "standards"), { recursive: true });

    const sourcePackage = await readJson(resolve(sourceRoot, "package.json"));
    const libraryPath = resolve(kitRoot, "libraries/antd-6.lib.pen");
    const libraryDigest = await sha256(libraryPath);
    const templates = await extractTemplates(libraryPath);
    await writeJson(resolve(kitRoot, "registry/templates.json"), { schemaVersion: 1, templates });
    const embeddedRelease = {
      schemaVersion: 1,
      kitVersion: version,
      antdVersion: sourcePackage.dependencies?.antd || sourcePackage.devDependencies?.antd || "unknown",
      quality: { status: quality },
      library: { id: "antd-6", path: "libraries/antd-6.lib.pen", sha256: libraryDigest },
      standards: { version: standards.version, path: "standards/index.md", manifest: "standards/manifest.json" },
    };
    await writeJson(resolve(kitRoot, "release.json"), embeddedRelease);

    const archiveName = `pen-antd-kit-${version}.tar.gz`;
    const archivePath = resolve(outputRoot, archiveName);
    const archived = spawnSync("tar", ["-czf", archivePath, "-C", kitRoot, "."], { encoding: "utf8" });
    if (archived.status !== 0) throw new Error(`Unable to create kit archive: ${archived.stderr.trim()}`);
    const archiveDigest = await sha256(archivePath);
    const releasePath = resolve(outputRoot, `release-${version}.json`);
    await writeJson(releasePath, {
      ...embeddedRelease,
      artifact: { type: "tar.gz", url: `./${archiveName}`, sha256: archiveDigest },
    });
    return { kitVersion: version, archivePath, releasePath, sha256: archiveDigest, templates: templates.length };
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}
