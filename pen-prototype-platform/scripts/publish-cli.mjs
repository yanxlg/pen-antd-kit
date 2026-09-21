#!/usr/bin/env node
// Publishes the CLI as a public npm package.
// Dry-run by default; --execute performs the upload. Auth is handled by npm itself
// (OIDC trusted publishing in CI, or `npm login` / ~/.npmrc locally). CI needs no
// npm token once the package has a trusted publisher registered on npmjs.com.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { parseArgs } from "../src/args.mjs";
import { platformRoot } from "../src/paths.mjs";

const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;
const defaultRegistry = "https://registry.npmjs.org/";

function runNpm(args) {
  const result = spawnSync("npm", args, { cwd: platformRoot, encoding: "utf8" });
  if (result.error?.code === "ENOENT") throw new Error("npm is required to publish the CLI");
  const output = `${result.stdout || ""}${result.stderr || ""}`.trim();
  if (result.status !== 0) throw new Error(`npm ${args[0]} failed: ${output}`);
  return output;
}

export async function publishCliPackage({ execute = false, tag = "latest", registry, otp } = {}) {
  const manifest = JSON.parse(await readFile(resolve(platformRoot, "package.json"), "utf8"));
  const { name, version, bin, publishConfig } = manifest;

  if (!/^@[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(name || "")) {
    throw new Error(`package name must be scoped, for example @owner/pen-antd (received ${name})`);
  }
  if (!semverPattern.test(version || "")) throw new Error(`package version must be SemVer (received ${version})`);
  if (!bin || Object.keys(bin).length === 0) throw new Error("package.json must declare a bin entry");
  if (publishConfig?.access !== "public") throw new Error("publishConfig.access must be public");

  const publishRegistry = registry || publishConfig?.registry || defaultRegistry;
  if (!/^https:\/\/\S+$/.test(publishRegistry)) throw new Error(`Invalid registry: ${publishRegistry}`);

  const refName = process.env.GITHUB_REF_NAME;
  if (refName?.startsWith("cli-v") && refName.slice(5) !== version) {
    throw new Error(`tag ${refName} does not match package.json version ${version}`);
  }

  const args = ["publish", "--registry", publishRegistry, "--tag", tag, "--access", "public"];
  if (otp) args.push(`--otp=${otp}`);
  if (!execute) args.push("--dry-run");

  return {
    mode: execute ? "execute" : "dry-run",
    name,
    version,
    tag,
    registry: publishRegistry,
    output: runNpm(args),
  };
}

const { options } = parseArgs(process.argv.slice(2));
const result = await publishCliPackage({
  execute: Boolean(options.execute),
  tag: options.tag || "latest",
  registry: options.registry,
  otp: options.otp,
});
process.stdout.write(`${JSON.stringify({ ok: true, ...result }, null, 2)}\n`);
