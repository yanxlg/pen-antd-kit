import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

export async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function sha256(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

export async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

export async function atomicReplace(stagingPath, finalPath) {
  await rm(finalPath, { recursive: true, force: true });
  await mkdir(dirname(finalPath), { recursive: true });
  await rename(stagingPath, finalPath);
}

export function resolveLocation(location, basePath) {
  if (/^https?:\/\//.test(location)) return location;
  if (location.startsWith("file:")) return fileURLToPath(location);
  return resolve(dirname(basePath), location);
}

export async function materialize(location, destination) {
  await mkdir(dirname(destination), { recursive: true });
  if (/^https?:\/\//.test(location)) {
    const response = await fetch(location);
    if (!response.ok) throw new Error(`Download failed: ${response.status} ${location}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    return destination;
  }
  const source = location.startsWith("file:") ? fileURLToPath(location) : location;
  await writeFile(destination, await readFile(source));
  return destination;
}

export function asFileUrl(path) {
  return pathToFileURL(path).href;
}
