import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { atomicReplace, materialize, pathExists, readJson, resolveLocation, sha256, writeJson } from "./io.mjs";
import { stateHome } from "./paths.mjs";

async function loadJsonLocation(location, basePath = process.cwd()) {
  if (/^https?:\/\//.test(location)) {
    const response = await fetch(location);
    if (!response.ok) throw new Error(`Unable to fetch JSON: ${response.status} ${location}`);
    return { value: await response.json(), source: location };
  }
  const path = resolveLocation(location, basePath);
  return { value: JSON.parse(await readFile(path, "utf8")), source: path };
}

function validateRelease(release, channel) {
  if (release.schemaVersion !== 1) throw new Error("Unsupported release schema");
  if (!release.kitVersion || !release.artifact?.type || !release.artifact?.url || !release.standards?.version) {
    throw new Error("Invalid release manifest");
  }
  if (channel === "stable" && release.quality?.status !== "passed") {
    throw new Error("Stable channel refuses a release that has not passed quality gates");
  }
}

export async function resolveRelease({ channelFile, home, force = false }) {
  const channelResult = await loadJsonLocation(channelFile);
  const channel = channelResult.value;
  if (channel.schemaVersion !== 1 || !channel.releaseUrl) throw new Error("Invalid channel manifest");

  const releaseLocation = resolveLocation(channel.releaseUrl, channelResult.source);
  const releaseResult = await loadJsonLocation(releaseLocation, channelResult.source);
  const release = releaseResult.value;
  validateRelease(release, channel.channel);

  const root = stateHome(home);
  const kitRoot = resolve(root, "kits", release.kitVersion);
  const currentPath = resolve(root, "current.json");

  if (release.artifact.type === "directory") {
    const directory = resolveLocation(release.artifact.url, releaseResult.source);
    if (!(await pathExists(directory))) throw new Error(`Kit directory does not exist: ${directory}`);
    await writeJson(currentPath, { channel: channel.channel, kitVersion: release.kitVersion, kitRoot: directory });
    return { channel: channel.channel, kitVersion: release.kitVersion, kitRoot: directory, installed: false };
  }

  if (release.artifact.type !== "tar.gz") throw new Error(`Unsupported artifact type: ${release.artifact.type}`);
  if (!release.artifact.sha256) throw new Error("tar.gz release is missing artifact.sha256");
  if (!force && (await pathExists(kitRoot))) {
    await writeJson(currentPath, { channel: channel.channel, kitVersion: release.kitVersion, kitRoot });
    return { channel: channel.channel, kitVersion: release.kitVersion, kitRoot, installed: false };
  }

  const temporaryRoot = await mkdtemp(resolve(tmpdir(), "pen-antd-resolve-"));
  try {
    const archiveLocation = resolveLocation(release.artifact.url, releaseResult.source);
    const archive = resolve(temporaryRoot, basename(new URL(archiveLocation, "file:///").pathname) || "kit.tar.gz");
    await materialize(archiveLocation, archive);
    const actualDigest = await sha256(archive);
    if (actualDigest !== release.artifact.sha256) {
      throw new Error(`Artifact checksum mismatch: expected ${release.artifact.sha256}, received ${actualDigest}`);
    }

    const staging = resolve(temporaryRoot, "kit");
    await mkdir(staging, { recursive: true });
    const extracted = spawnSync("tar", ["-xzf", archive, "-C", staging], { encoding: "utf8" });
    if (extracted.status !== 0) throw new Error(`Unable to extract kit: ${extracted.stderr.trim()}`);
    await atomicReplace(staging, kitRoot);
    await writeJson(currentPath, { channel: channel.channel, kitVersion: release.kitVersion, kitRoot });
    return { channel: channel.channel, kitVersion: release.kitVersion, kitRoot, installed: true };
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

export async function readCurrentKit({ home }) {
  const current = await readJson(resolve(stateHome(home), "current.json"));
  return current.kitRoot;
}
