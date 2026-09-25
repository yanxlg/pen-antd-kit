import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { parseArgs, requireOption } from "./args.mjs";
import { resolveContext } from "./context-router.mjs";
import { buildFromPlan } from "./doc-builder.mjs";
import { createDocument, libraryStatus, openInPen } from "./doc-workspace.mjs";
import { doctor } from "./doctor.mjs";
import { buildKit } from "./kit-builder.mjs";
import { publishGitHubRelease } from "./github-publisher.mjs";
import { prepareLibrary } from "./library-preflight.mjs";
import { prepareSharedLibrary } from "./library-store.mjs";
import { defaultPrototypePath } from "./output-path.mjs";
import { callPenTool, listPenTools } from "./pen-mcp.mjs";
import { defaultChannelFile, platformRoot } from "./paths.mjs";
import { describeAllTemplates, describeTemplate, inspectComponent, inspectTemplate, listTemplates, matchTemplates } from "./registry.mjs";
import { readCurrentKit, resolveRelease } from "./release-resolver.mjs";
import { updateReferences } from "./references-update.mjs";
import { currentReferencePath, installBootstrapSkill } from "./skill-bootstrap.mjs";
import { validateStandards } from "./standards-validator.mjs";
import { loadPlan, renderPlanDigest, validatePlan } from "./prototype-plan.mjs";

const usage = `pen-antd commands:
  references update [--source PATH] [--repo OWNER/REPO] [--channel-file PATH] [--ttl MINUTES] [--force] [--home PATH]
  references path [--kit-root PATH]
  resolve [--channel-file PATH] [--home PATH] [--force]
  context resolve --input PATH [--prompt TEXT]
  component inspect NAME [--kit-root PATH]
  template list|inspect|describe|match [VALUE] [--all] [--depth N] [--kit-root PATH]
  doc new --path FILE [--no-open] [--kit-root PATH] [--components ID,ID] [--template PATTERN|ID|NAME]
  doc build --plan FILE [--path FILE] [--name NAME] [--on-conflict fail|replace|rename] [--via mcp|file] [--library import|embed] [--refresh-library] [--open] [--kit-root PATH]
  doc open --path FILE
  plan validate --plan FILE [--kit-root PATH]
  plan digest --plan FILE [--kit-root PATH] [--out FILE]
  plan target --plan FILE [--name NAME]
  pen tools [--server PATH] [--app NAME] [--agent NAME]
  pen call --tool NAME [--args JSON] [--args-file PATH] [--out DIR] [--server PATH] [--app NAME] [--agent NAME]
  library shared [--kit-root PATH] [--home PATH] [--force]
  library status --path FILE [--components ID,ID] [--template PATTERN|ID|NAME]
  library prepare [--kit-root PATH] [--capabilities-file PATH]
  skill install --target SKILLS_ROOT
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

  if (command === "references" && action === "update") {
    output(await updateReferences({
      source: options.source ? resolve(options.source) : undefined,
      repo: options.repo,
      channelFile: options["channel-file"] ? resolve(options["channel-file"]) : undefined,
      ttl: options.ttl === undefined ? undefined : Number(options.ttl),
      force: Boolean(options.force),
      home: options.home,
    }));
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
    } else if (action === "describe") {
      if (options.all) output(await describeAllTemplates(kitRoot, { depth: Number(options.depth) || 2 }));
      else {
        const requested = value || options.id || options.template;
        if (!requested) throw new Error("template describe requires a template id, or use --all");
        output(await describeTemplate(kitRoot, String(requested), { depth: Number(options.depth) || 3 }));
      }
    } else if (action === "match") {
      if (!value && !options.query) throw new Error("template match requires a query");
      output({ templates: await matchTemplates(kitRoot, value || options.query) });
    } else throw new Error(`Unknown template action: ${action || "(missing)"}`);
    return;
  }

  if (command === "doc" && action === "new") {
    output(await createDocument({
      path: requireOption(options, "path"),
      kitRoot: options["kit-root"],
      components: options.components ? String(options.components) : undefined,
      template: options.template ? String(options.template) : undefined,
      open: !options["no-open"],
    }));
    return;
  }

  if (command === "doc" && action === "open") {
    output(await openInPen({ path: requireOption(options, "path") }));
    return;
  }

  if (command === "doc" && action === "build") {
    try {
      output(await buildFromPlan({
        path: options.path ? String(options.path) : undefined,
        planPath: requireOption(options, "plan"),
        kitRoot: options["kit-root"],
        name: options.name ? String(options.name) : undefined,
        onConflict: options["on-conflict"] ? String(options["on-conflict"]) : undefined,
        via: options.via ? String(options.via) : undefined,
        library: options.library ? String(options.library) : undefined,
        home: options.home,
        refreshLibrary: Boolean(options["refresh-library"]),
        open: Boolean(options.open),
      }));
    } catch (error) {
      if (error.code !== "OUTPUT_EXISTS") throw error;
      process.stdout.write(`${JSON.stringify({ ok: false, error: error.message, conflict: error.conflict }, null, 2)}\n`);
      process.exitCode = 3;
      return;
    }
    return;
  }

  if (command === "plan" && action === "target") {
    const plan = await loadPlan(requireOption(options, "plan"));
    output({
      plan: resolve(options.plan),
      source: plan.source,
      target: defaultPrototypePath({ plan, name: options.name ? String(options.name) : undefined }),
    });
    return;
  }

  if (command === "plan" && (action === "validate" || action === "digest")) {
    const plan = await loadPlan(requireOption(options, "plan"));
    const validation = await validatePlan({ plan, kitRoot: await selectedKitRoot(options), library: options.library ? String(options.library) : undefined });
    const digest = renderPlanDigest(plan, validation);
    if (options.out && typeof options.out === "string") {
      const { writeFile, mkdir } = await import("node:fs/promises");
      const { dirname } = await import("node:path");
      await mkdir(dirname(resolve(options.out)), { recursive: true });
      await writeFile(resolve(options.out), `${digest}\n`, "utf8");
    }
    if (action === "digest") {
      output({ plan: resolve(options.plan), ok: validation.ok, digest, ...(options.out ? { out: resolve(options.out) } : {}) });
      if (!validation.ok) process.exitCode = 2;
      return;
    }
    output({
      plan: resolve(options.plan),
      ok: validation.ok,
      summary: validation.summary,
      errors: validation.errors,
      warnings: validation.warnings,
      modules: validation.modules.map((module) => ({
        id: module.id,
        kind: module.kind,
        frameName: module.frameName,
        template: module.template?.pattern,
        frameId: module.template?.frameId,
        nested: module.nested?.pattern,
        custom: module.custom,
      })),
    });
    if (!validation.ok) process.exitCode = 2;
    return;
  }

  if (command === "pen" && action === "tools") {
    output({
      server: options.server,
      app: options.app,
      agent: options.agent,
      tools: await listPenTools({ server: options.server, app: options.app, agent: options.agent }),
    });
    return;
  }

  if (command === "pen" && action === "call") {
    const argsFile = options["args-file"] ? resolve(String(options["args-file"])) : undefined;
    const args = argsFile
      ? JSON.parse(await readFile(argsFile, "utf8"))
      : options.args
        ? JSON.parse(String(options.args))
        : {};
    output(await callPenTool({
      tool: requireOption(options, "tool"),
      args,
      server: options.server,
      app: options.app,
      agent: options.agent,
      timeoutMs: options.timeout ? Number(options.timeout) : undefined,
      outputDir: options.out ? resolve(String(options.out)) : undefined,
    }));
    return;
  }

  if (command === "library" && action === "status") {
    output(await libraryStatus({
      path: requireOption(options, "path"),
      components: options.components ? String(options.components) : undefined,
      template: options.template ? String(options.template) : undefined,
    }));
    return;
  }

  if (command === "library" && action === "prepare") {
    output(await prepareLibrary({
      kitRoot: await selectedKitRoot(options),
      capabilitiesFile: options["capabilities-file"] ? resolve(options["capabilities-file"]) : undefined,
    }));
    return;
  }

  if (command === "library" && action === "shared") {
    output(await prepareSharedLibrary({
      kitRoot: await selectedKitRoot(options),
      home: options.home,
      force: Boolean(options.force),
    }));
    return;
  }

  if (command === "skill" && action === "install") {
    output(await installBootstrapSkill(requireOption(options, "target")));
    return;
  }

  if (command === "references" && action === "path") {
    output({ referencePath: await currentReferencePath(await selectedKitRoot(options)) });
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
