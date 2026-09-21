#!/usr/bin/env node
import { resolve } from "node:path";
import { parseArgs, requireOption } from "../src/args.mjs";
import { publishGitHubRelease } from "../src/github-publisher.mjs";
import { platformRoot } from "../src/paths.mjs";

const { options } = parseArgs(process.argv.slice(2));
const result = await publishGitHubRelease({
  sourceRoot: resolve(requireOption(options, "source-root")),
  output: resolve(options.output || "dist/github-release"),
  version: requireOption(options, "version"),
  repo: requireOption(options, "repo"),
  execute: Boolean(options.execute),
  platformRoot,
});
process.stdout.write(`${JSON.stringify({ ok: true, ...result }, null, 2)}\n`);
