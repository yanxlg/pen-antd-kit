import { existsSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

// The prototype lives next to the requirement it came from, under the same
// name: `<requirement-dir>/<requirement-name>.pen`. Writing somewhere else is
// possible with --path, but the default never makes the caller invent a name.

export const CONFLICT_MODES = ["fail", "replace", "rename"];

const sourceExtensions = /\.(md|mdx|markdown|txt|html?|json|ya?ml)$/i;

export function prototypeNameFor(source, name) {
  if (name) return String(name).replace(/\.pen$/i, "");
  const stem = basename(String(source || "")).replace(sourceExtensions, "");
  return stem || "prototype";
}

export function nextAvailablePath(target) {
  const dir = dirname(target);
  const stem = basename(target, ".pen");
  for (let index = 2; index < 1000; index += 1) {
    const candidate = join(dir, `${stem}-${index}.pen`);
    if (!existsSync(candidate)) return candidate;
  }
  throw new Error(`Cannot find a free file name next to ${target}`);
}

export function defaultPrototypePath({ plan, name }) {
  const source = plan?.source;
  if (!source) throw new Error("Plan has no `source`; pass --path to name the prototype");
  if (/^https?:/i.test(source)) throw new Error(`Plan source is not a local file (${source}); pass --path`);
  const dir = dirname(resolve(source));
  if (!existsSync(dir)) throw new Error(`Requirement directory does not exist: ${dir}`);
  return join(dir, `${prototypeNameFor(source, name)}.pen`);
}

// `samePlan` marks a document this plan already produced: rebuilding it is the
// documented idempotent path and must not look like a name clash.
export function resolvePrototypePath({ plan, path, name, onConflict = "fail", samePlan = false }) {
  if (!CONFLICT_MODES.includes(onConflict)) {
    throw new Error(`Unknown --on-conflict mode: ${onConflict}. Use ${CONFLICT_MODES.join(", ")}.`);
  }
  const target = path ? resolve(path) : defaultPrototypePath({ plan, name });
  if (!existsSync(target)) return { path: target, existed: false };
  if (onConflict === "replace") return { path: target, existed: true, action: "replaced" };
  if (samePlan) return { path: target, existed: true, action: "rebuilt" };
  if (onConflict === "rename") {
    const renamed = nextAvailablePath(target);
    return { path: renamed, existed: true, action: "renamed", renamedFrom: target };
  }

  const error = new Error(`A different .pen file already exists at ${target}`);
  error.code = "OUTPUT_EXISTS";
  error.conflict = {
    target,
    askUser: true,
    options: [
      { mode: "replace", flag: "--on-conflict replace", description: `覆盖 ${basename(target)}` },
      { mode: "rename", flag: "--on-conflict rename", description: `自动重命名（下一个空位是 ${basename(nextAvailablePath(target))}）` },
      { mode: "custom", flags: ["--name <文件名>", "--path <完整路径>"], description: "用自定义名字或路径" },
    ],
  };
  throw error;
}

export function documentMatchesPlan(document, plan) {
  const ids = new Set((plan?.modules || []).map((module) => module.id));
  if (!ids.size) return false;
  return (document?.children || []).some((child) => {
    const context = typeof child?.context === "string" ? child.context : "";
    const match = /(?:^|;\s*)id=([a-z0-9.-]+)/.exec(context);
    return context.startsWith("module;") && match && ids.has(match[1]);
  });
}
