import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { pathExists, readJson } from "./io.mjs";

const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;

function assertRelativeFile(path, label) {
  if (typeof path !== "string" || path.length === 0 || path.startsWith("/") || path.split(/[\\/]/).includes("..")) {
    throw new Error(`${label} must be a safe relative path`);
  }
}

async function requireFile(root, path, label) {
  assertRelativeFile(path, label);
  const absolute = resolve(root, path);
  const rootPrefix = `${resolve(root)}${sep}`;
  if (!absolute.startsWith(rootPrefix)) throw new Error(`${label} escapes the standards root`);
  if (!(await pathExists(absolute))) throw new Error(`${label} does not exist: ${path}`);
  return absolute;
}

export async function validateStandards(standardsRoot) {
  const root = resolve(standardsRoot);
  const manifestPath = resolve(root, "manifest.json");
  if (!(await pathExists(manifestPath))) throw new Error(`Standards manifest is missing: ${manifestPath}`);
  const manifest = await readJson(manifestPath);

  if (manifest.schemaVersion !== 1) throw new Error("Unsupported standards manifest schema");
  if (!semverPattern.test(manifest.standardsVersion || "")) throw new Error("standardsVersion must be SemVer");
  if (!["candidate", "passed"].includes(manifest.status)) throw new Error("standards status must be candidate or passed");
  if (!Array.isArray(manifest.runtimeDocuments) || manifest.runtimeDocuments.length === 0) {
    throw new Error("runtimeDocuments must contain at least one document");
  }

  const entrypointPath = await requireFile(root, manifest.entrypoint, "entrypoint");
  const entrypoint = await readFile(entrypointPath, "utf8");
  const ids = new Set();
  const documentPaths = new Set();
  for (const document of [...manifest.runtimeDocuments, ...(manifest.provenanceDocuments || [])]) {
    if (typeof document.id !== "string" || document.id.length === 0) throw new Error("Every standards document requires an id");
    if (ids.has(document.id)) throw new Error(`Duplicate standards document id: ${document.id}`);
    ids.add(document.id);
    if (documentPaths.has(document.path)) throw new Error(`Duplicate standards document path: ${document.path}`);
    documentPaths.add(document.path);
    const path = await requireFile(root, document.path, `document ${document.id}`);
    const content = await readFile(path, "utf8");
    if (!content.startsWith("# ")) throw new Error(`Standards document must start with an H1: ${document.path}`);
  }

  for (const document of manifest.runtimeDocuments) {
    if (!Array.isArray(document.appliesTo) || document.appliesTo.length === 0) {
      throw new Error(`Runtime document requires appliesTo: ${document.id}`);
    }
    if (!entrypoint.includes(`\`${document.path}\``)) {
      throw new Error(`Entrypoint does not route runtime document: ${document.path}`);
    }
  }

  const qualityPath = await requireFile(root, manifest.qualityProfile, "qualityProfile");
  const quality = await readJson(qualityPath);
  if (quality.schemaVersion !== 1 || !Array.isArray(quality.hardFailures) || quality.hardFailures.length === 0) {
    throw new Error("Invalid prototype quality profile");
  }

  const changelogPath = await requireFile(root, "CHANGELOG.md", "changelog");
  const changelog = await readFile(changelogPath, "utf8");
  if (!changelog.includes(`## ${manifest.standardsVersion} `)) {
    throw new Error(`CHANGELOG.md is missing version ${manifest.standardsVersion}`);
  }

  return {
    root,
    version: manifest.standardsVersion,
    status: manifest.status,
    entrypoint: entrypointPath,
    runtimeDocuments: manifest.runtimeDocuments.length,
    provenanceDocuments: (manifest.provenanceDocuments || []).length,
  };
}
