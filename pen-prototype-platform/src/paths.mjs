import os from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirectory = dirname(fileURLToPath(import.meta.url));

export const platformRoot = resolve(sourceDirectory, "..");

export function stateHome(override) {
  return resolve(override || process.env.PEN_ANTD_HOME || resolve(os.homedir(), ".pen-antd"));
}

export function defaultChannelFile() {
  return resolve(platformRoot, "channels/development.json");
}

export function defaultKitRoot() {
  return resolve(platformRoot, "fixtures/development-kit");
}
