import { cp, mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathExists, readJson, sha256, writeJson } from "./io.mjs";
import { validateStandards } from "./standards-validator.mjs";
import { extractTemplates } from "./template-catalog.mjs";

const sourceEntries = ["canvas-components", "registry"];
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;

async function copyRequired(sourceRoot, kitRoot) {
  for (const entry of sourceEntries) {
    const source = resolve(sourceRoot, entry);
    if (!(await pathExists(source))) throw new Error(`Required source is missing: ${source}`);
    await cp(source, resolve(kitRoot, entry), { recursive: true });
  }
  const sourceLibrary = resolve(sourceRoot, "libraries/antd-6.lib.pen");
  const sourceTemplates = resolve(sourceRoot, "libraries/templates.pen");
  if (!(await pathExists(sourceLibrary))) throw new Error(`Required source is missing: ${sourceLibrary}`);
  if (!(await pathExists(sourceTemplates))) throw new Error(`Required source is missing: ${sourceTemplates}`);
  await mkdir(resolve(kitRoot, "libraries"), { recursive: true });
  await cp(sourceLibrary, resolve(kitRoot, "libraries/antd-6.lib.pen"));
  await cp(sourceTemplates, resolve(kitRoot, "libraries/templates.pen"));
  for (const entry of ["libraries/images", "libraries/fonts", "assets"]) {
    const from = resolve(sourceRoot, entry);
    if (await pathExists(from)) await cp(from, resolve(kitRoot, entry), { recursive: true });
  }
  for (const entry of await readdir(resolve(sourceRoot, "libraries"))) {
    if (/^embedded-image-.*\.png$/.test(entry)) {
      await cp(resolve(sourceRoot, "libraries", entry), resolve(kitRoot, "libraries", entry));
    }
  }
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
    await cp(resolve(platformRoot, "references"), resolve(kitRoot, "references"), { recursive: true });
    await cp(resolve(platformRoot, "rules"), resolve(kitRoot, "rules"), { recursive: true });
    await cp(resolve(platformRoot, "schemas"), resolve(kitRoot, "schemas"), { recursive: true });
    await cp(resolve(platformRoot, "standards"), resolve(kitRoot, "standards"), { recursive: true });

    const sourcePackage = await readJson(resolve(sourceRoot, "package.json"));
    const libraryPath = resolve(kitRoot, "libraries/antd-6.lib.pen");
    const libraryDigest = await sha256(libraryPath);
    const templatePath = resolve(kitRoot, "libraries/templates.pen");
    const templates = await extractTemplates(templatePath, libraryPath);
    await writeJson(resolve(kitRoot, "registry/templates.json"), { schemaVersion: 2, templates });
    const embeddedRelease = {
      schemaVersion: 1,
      kitVersion: version,
      antdVersion: sourcePackage.dependencies?.antd || sourcePackage.devDependencies?.antd || "unknown",
      quality: { status: quality },
      library: { id: "antd-6", path: "libraries/antd-6.lib.pen", sha256: libraryDigest },
      templates: { path: "libraries/templates.pen", sha256: await sha256(templatePath) },
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
