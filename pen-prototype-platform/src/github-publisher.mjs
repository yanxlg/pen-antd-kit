import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { buildKit } from "./kit-builder.mjs";
import { readJson, writeJson } from "./io.mjs";
import { validateStandards } from "./standards-validator.mjs";

const repoPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function runGh(args) {
  const result = spawnSync("gh", args, { encoding: "utf8" });
  if (result.error?.code === "ENOENT") throw new Error("GitHub CLI (gh) is required for --execute");
  if (result.status !== 0) throw new Error(`GitHub release failed: ${(result.stderr || result.stdout).trim()}`);
}

export async function prepareGitHubRelease({ sourceRoot, output, version, repo, platformRoot, quality = "candidate" }) {
  if (!repoPattern.test(repo || "")) throw new Error("--repo must use owner/repository format");
  const outputRoot = resolve(output);
  await mkdir(outputRoot, { recursive: true });
  const built = await buildKit({ sourceRoot, output: outputRoot, version, quality, platformRoot });
  const tag = `kit-v${version}`;
  const archiveName = basename(built.archivePath);
  const releaseName = basename(built.releasePath);
  const assetBase = `https://github.com/${repo}/releases/download/${tag}`;
  const release = await readJson(built.releasePath);
  release.artifact.url = `${assetBase}/${archiveName}`;
  await writeJson(built.releasePath, release);

  const channelPath = resolve(outputRoot, "channel-stable.json");
  await writeJson(channelPath, {
    schemaVersion: 1,
    channel: "stable",
    releaseUrl: `${assetBase}/${releaseName}`,
  });

  const notesPath = resolve(outputRoot, `notes-${version}.md`);
  await writeFile(
    notesPath,
    `# Pen Ant Design Kit ${version}\n\nStandards ${release.standards.version}; Ant Design ${release.antdVersion}; quality status ${release.quality.status}.\n`,
    "utf8",
  );

  return {
    tag,
    repo,
    archivePath: built.archivePath,
    releasePath: built.releasePath,
    channelPath,
    notesPath,
    channelUrl: `https://github.com/${repo}/releases/latest/download/channel-stable.json`,
    standardsVersion: release.standards.version,
  };
}

export async function publishGitHubRelease(options) {
  if (options.execute) {
    const standards = await validateStandards(resolve(options.platformRoot, "standards"));
    if (standards.status !== "passed") {
      throw new Error(`GitHub stable release requires passed standards; current status is ${standards.status}`);
    }
  }
  const prepared = await prepareGitHubRelease({ ...options, quality: options.execute ? "passed" : "candidate" });
  if (!options.execute) return { ...prepared, published: false, mode: "dry-run" };
  runGh([
    "release",
    "create",
    prepared.tag,
    prepared.archivePath,
    prepared.releasePath,
    prepared.channelPath,
    "--repo",
    prepared.repo,
    "--title",
    `Pen Ant Design Kit ${options.version}`,
    "--notes-file",
    prepared.notesPath,
    "--verify-tag",
    "--latest",
  ]);
  return { ...prepared, published: true, mode: "execute" };
}
