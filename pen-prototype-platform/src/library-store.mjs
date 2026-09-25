import { existsSync } from "node:fs";
import { cp, lstat, mkdir, readFile, readlink, rm, symlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { sha256 } from "./io.mjs";

// Documents import the library by path, so that path has to be stable across
// projects of one user. Every Kit is exposed through a shared home (`~/.pen` by
// default) that mirrors the Kit's own layout, because the library resolves its
// assets relative to itself: `fonts/...`, `images/...`, `../canvas-components/`.
//
//   ~/.pen/libraries/antd-6.lib.pen   ← imported by every generated document
//   ~/.pen/libraries/fonts|images|…   ← resolved relative to the library file
//   ~/.pen/canvas-components/         ← resolved through `../canvas-components/`
//   ~/.pen/library.json               ← which Kit produced it, and its digest
//
// Pen resolves imported component ids from a physical library file. The
// libraries directory is copied so imports work even when the Kit lives behind
// a symlink; canvas script assets can still be linked.

export const LIBRARY_ALIAS = "antd";
export const LIBRARY_FILE = "libraries/antd-6.lib.pen";
const LIBRARY_ASSET_DIRS = ["canvas-components"];
// Bumped when the layout of the shared home changes, so an older prepare is
// rebuilt instead of reported as up to date.
const MANIFEST_VERSION = 3;

export function sharedHome({ home } = {}) {
  return resolve(home || process.env.PEN_HOME || join(homedir(), ".pen"));
}

export function sharedLibraryPath(options = {}) {
  return join(sharedHome(options), LIBRARY_FILE);
}

export async function readSharedLibrary(options = {}) {
  const manifestPath = join(sharedHome(options), "library.json");
  const libraryPath = sharedLibraryPath(options);
  if (!existsSync(libraryPath)) return undefined;
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {
    manifest = {};
  }
  return { home: sharedHome(options), libraryPath, alias: manifest.alias || LIBRARY_ALIAS, ...manifest };
}

async function libraryVersion(path) {
  const head = (await readFile(path)).subarray(0, 256).toString("utf8");
  return /"version"\s*:\s*"([^"]+)"/.exec(head)?.[1];
}

async function kitVersion(kitRoot) {
  try {
    const release = JSON.parse(await readFile(join(kitRoot, "release.json"), "utf8"));
    return release.kitVersion || release.version;
  } catch {
    return kitRoot.split("/").pop();
  }
}

// A directory link keeps every relative reference inside the library working
// without duplicating the Kit; copying is the fallback where links are not
// available.
async function linkOrCopy(from, to) {
  const current = await lstat(to).catch(() => undefined);
  if (current?.isSymbolicLink()) {
    const linked = resolve(dirname(to), await readlink(to));
    if (linked === resolve(from) && existsSync(to)) return "unchanged";
  }
  if (current) await rm(to, { recursive: true, force: true });
  try {
    await symlink(resolve(from), to, "dir");
    return "linked";
  } catch {
    await cp(from, to, { recursive: true });
    return "copied";
  }
}

export async function prepareSharedLibrary({ kitRoot, home, force = false } = {}) {
  const root = sharedHome({ home });
  const source = resolve(kitRoot);
  const sourceLibrary = join(source, LIBRARY_FILE);
  if (!existsSync(sourceLibrary)) throw new Error(`Kit at ${source} has no ${LIBRARY_FILE}`);

  const digest = await sha256(sourceLibrary);
  const existing = await readSharedLibrary({ home });
  if (!force && existing?.manifestVersion === MANIFEST_VERSION && existing?.sha256 === digest && existing.sourceKitRoot === source) {
    return { ...existing, changed: false };
  }

  await mkdir(root, { recursive: true });
  const libraryDirectory = join(root, "libraries");
  await rm(libraryDirectory, { recursive: true, force: true });
  await cp(join(source, "libraries"), libraryDirectory, { recursive: true });
  const assets = { libraries: "copied" };
  for (const asset of LIBRARY_ASSET_DIRS) {
    const from = join(source, asset);
    if (!existsSync(from)) continue;
    assets[asset] = await linkOrCopy(from, join(root, asset));
  }

  const manifest = {
    manifestVersion: MANIFEST_VERSION,
    alias: LIBRARY_ALIAS,
    libraryPath: join(root, LIBRARY_FILE),
    libraryVersion: await libraryVersion(sourceLibrary),
    kitVersion: await kitVersion(source),
    sourceKitRoot: source,
    sha256: digest,
    preparedAt: new Date().toISOString(),
    assets,
    assetMode: Object.values(assets).includes("linked") ? "link" : "copy",
  };
  await writeFile(join(root, "library.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return { home: root, changed: true, ...manifest };
}

// The shared home mirrors the Kit root, so a relative reference that points
// inside the Kit can be rewritten to the equivalent path under the shared home.
export function sharedAssetPath(uri, { fromDir, kitRoot, home }) {
  if (typeof uri !== "string" || /^[a-z]+:|^\//i.test(uri)) return uri;
  const absolute = resolve(fromDir, uri);
  const insideKit = relative(resolve(kitRoot), absolute);
  if (insideKit.startsWith("..")) return absolute;
  return join(sharedHome({ home }), insideKit);
}
