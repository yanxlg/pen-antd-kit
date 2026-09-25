import { resolve } from "node:path";
import { defaultRepo, githubChannelUrl } from "./config.mjs";
import { pathExists, readJson, writeJson } from "./io.mjs";
import { stateHome } from "./paths.mjs";
import { resolveRelease } from "./release-resolver.mjs";
import { currentReferencePath } from "./skill-bootstrap.mjs";

export const DEFAULT_TTL_MINUTES = 60;

async function readCurrent(currentPath) {
  if (!(await pathExists(currentPath))) return undefined;
  try {
    return await readJson(currentPath);
  } catch {
    return undefined;
  }
}

async function describe(kitRoot, kitVersion, channel) {
  return { channel, kitVersion, kitRoot, referencePath: await currentReferencePath(kitRoot) };
}

function withinTtl(checkedAt, ttlMinutes) {
  const age = Date.now() - Date.parse(checkedAt || "");
  return Number.isFinite(age) && age >= 0 && age < ttlMinutes * 60_000;
}

export async function updateReferences({
  source,
  repo,
  channelFile,
  ttl = DEFAULT_TTL_MINUTES,
  force = false,
  home,
}) {
  const root = stateHome(home);
  const currentPath = resolve(root, "current.json");
  const current = await readCurrent(currentPath);

  if (source) {
    const kitRoot = resolve(source);
    const releasePath = resolve(kitRoot, "release.json");
    if (!(await pathExists(releasePath))) {
      throw new Error(`--source must be a Kit root containing release.json: ${kitRoot}`);
    }
    const release = await readJson(releasePath);
    const checkedAt = new Date().toISOString();
    await writeJson(currentPath, { channel: "local", kitVersion: release.kitVersion, kitRoot, checkedAt });
    return {
      ...(await describe(kitRoot, release.kitVersion, "local")),
      updated: true,
      stale: false,
      source: "local",
      checkedAt,
    };
  }

  const requestedChannel = channelFile || githubChannelUrl(repo || defaultRepo());

  if (!force && current?.kitRoot && (await pathExists(current.kitRoot)) && withinTtl(current.checkedAt, ttl)) {
    return {
      ...(await describe(current.kitRoot, current.kitVersion, current.channel)),
      updated: false,
      stale: false,
      source: "cache",
      checkedAt: current.checkedAt,
      channelUrl: requestedChannel,
    };
  }

  try {
    const resolved = await resolveRelease({ channelFile: requestedChannel, home, force });
    const installed = await readJson(currentPath);
    installed.checkedAt = new Date().toISOString();
    await writeJson(currentPath, installed);
    return {
      ...(await describe(installed.kitRoot, installed.kitVersion, installed.channel)),
      updated: resolved.installed,
      stale: false,
      source: "remote",
      checkedAt: installed.checkedAt,
      channelUrl: requestedChannel,
    };
  } catch (error) {
    if (current?.kitRoot && (await pathExists(current.kitRoot))) {
      return {
        ...(await describe(current.kitRoot, current.kitVersion, current.channel)),
        updated: false,
        stale: true,
        source: "fallback",
        checkedAt: current.checkedAt,
        channelUrl: requestedChannel,
        warning: `References update failed; using local Kit ${current.kitVersion}. ${error.message}`,
      };
    }
    throw error;
  }
}
