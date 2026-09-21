import { resolve } from "node:path";
import { parseArgs, requireOption } from "./args.mjs";
import { resolveContext } from "./context-router.mjs";
import { doctor } from "./doctor.mjs";
import { buildKit } from "./kit-builder.mjs";
import { publishGitHubRelease } from "./github-publisher.mjs";
import { prepareLibrary } from "./library-preflight.mjs";
import { defaultChannelFile, platformRoot } from "./paths.mjs";
import { inspectComponent, inspectTemplate, listTemplates, matchTemplates } from "./registry.mjs";
import { readCurrentKit, resolveRelease } from "./release-resolver.mjs";
import { currentSkillPath, installBootstrapSkill } from "./skill-bootstrap.mjs";
import { validateStandards } from "./standards-validator.mjs";

const usage = `pen-antd commands:
  resolve [--channel-file PATH] [--home PATH] [--force]
  context resolve --input PATH [--prompt TEXT]
  component inspect NAME [--kit-root PATH]
  template list|inspect|match [VALUE] [--kit-root PATH]
  library prepare [--kit-root PATH] [--capabilities-file PATH]
  skill install --target SKILLS_ROOT
  skill path [--kit-root PATH]
  doctor [--kit-root PATH]
  standards validate [--standards-root PATH]
  kit build --source-root PATH --output PATH --version VERSION [--quality candidate|passed]
  kit publish-github --source-root PATH --output PATH --version VERSION --repo OWNER/REPO [--execute]
`;

async function selectedKitRoot(options) {
  if (typeof options["kit-root"] === "string") return resolve(options["kit-root"]);
  return readCurrentKit({ home: options.home });
}

function output(value) {
  process.stdout.write(`${JSON.stringify({ ok: true, ...value }, null, 2)}\n`);
}

export async function main(argv) {
  const { positional, options } = parseArgs(argv);
  const [command, action, value] = positional;
  if (!command || options.help || command === "help") {
    process.stdout.write(usage);
    return;
  }

  if (command === "resolve") {
    const requestedChannel = options["channel-file"] || defaultChannelFile();
    const result = await resolveRelease({
      channelFile: /^https?:\/\//.test(requestedChannel) ? requestedChannel : resolve(requestedChannel),
      home: options.home,
      force: Boolean(options.force),
    });
    output(result);
    return;
  }

  if (command === "context" && action === "resolve") {
    output({ context: resolveContext({ input: requireOption(options, "input"), prompt: options.prompt || "" }) });
    return;
  }

  if (command === "component" && action === "inspect") {
    if (!value) throw new Error("component inspect requires a component name");
    output(await inspectComponent(await selectedKitRoot(options), value));
    return;
  }

  if (command === "template") {
    const kitRoot = await selectedKitRoot(options);
    if (action === "list") output({ templates: await listTemplates(kitRoot) });
    else if (action === "inspect") {
      if (!value) throw new Error("template inspect requires a template id");
      output({ template: await inspectTemplate(kitRoot, value) });
    } else if (action === "match") {
      if (!value && !options.query) throw new Error("template match requires a query");
      output({ templates: await matchTemplates(kitRoot, value || options.query) });
    } else throw new Error(`Unknown template action: ${action || "(missing)"}`);
    return;
  }

  if (command === "library" && action === "prepare") {
    output(await prepareLibrary({
      kitRoot: await selectedKitRoot(options),
      capabilitiesFile: options["capabilities-file"] ? resolve(options["capabilities-file"]) : undefined,
    }));
    return;
  }

  if (command === "skill" && action === "install") {
    output(await installBootstrapSkill(requireOption(options, "target")));
    return;
  }

  if (command === "skill" && action === "path") {
    output({ skillPath: await currentSkillPath(await selectedKitRoot(options)) });
    return;
  }

  if (command === "doctor") {
    const result = await doctor(await selectedKitRoot(options));
    output(result);
    if (!result.ok) process.exitCode = 2;
    return;
  }

  if (command === "standards" && action === "validate") {
    output({ standards: await validateStandards(resolve(options["standards-root"] || resolve(platformRoot, "standards"))) });
    return;
  }

  if (command === "kit" && action === "build") {
    output(await buildKit({
      sourceRoot: requireOption(options, "source-root"),
      output: requireOption(options, "output"),
      version: requireOption(options, "version"),
      quality: options.quality || "candidate",
      platformRoot,
    }));
    return;
  }

  if (command === "kit" && action === "publish-github") {
    output(await publishGitHubRelease({
      sourceRoot: requireOption(options, "source-root"),
      output: requireOption(options, "output"),
      version: requireOption(options, "version"),
      repo: requireOption(options, "repo"),
      execute: Boolean(options.execute),
      platformRoot,
    }));
    return;
  }

  throw new Error(`Unknown command: ${positional.join(" ")}\n${usage}`);
}
