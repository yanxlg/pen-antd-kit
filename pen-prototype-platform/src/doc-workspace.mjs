import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { homedir, platform } from "node:os";
import { promisify } from "node:util";
import { inspectTemplate } from "./registry.mjs";

const run = promisify(execFile);

// Components a prototype task needs, plus the ids every script component
// resolves internally (icons, empty states, spinners).
export const coreComponents = [
  "nXLz3", "QYpZY", "acxPC", "VoQE7", "iQ5uU", "jSd6E", "SiWnx", "DQZzq",
  "cpj9Y", "Y9L6l", "w7rZw", "LSKNJ", "V5YhmT", "tnuK6", "HYXCo", "EVKFO",
  "rS4lY", "b0w4Mx", "LG38Z", "uhW9Y", "n9gmO", "rZqkn", "H0DThz", "puR2r",
  "antd-icon-live-origin", "antd-typography-live-origin",
];

export function resolveComponents({ components }) {
  return components
    ? String(components).split(",").map((id) => id.trim()).filter(Boolean)
    : coreComponents;
}

// `--template` names a pattern, board id or template name from the Kit catalog;
// this component-only document receives its component dependencies, not the page.
export async function resolveTemplateComponents({ kitRoot, components, template }) {
  const base = resolveComponents({ components });
  if (!template) return base;
  const entry = await inspectTemplate(kitRoot, template);
  return [...new Set([...base, ...(entry.components || []).map((component) => component.id)])];
}

const emptyDocument = () => ({
  version: "2.17",
  themes: { mode: ["light", "dark"], density: ["regular", "compact"] },
  children: [],
});

export function penHome() {
  return resolve(homedir(), ".pen-antd");
}

export async function resolveKitRoot(kitRoot) {
  if (kitRoot) return resolve(kitRoot);
  try {
    const current = JSON.parse(await readFile(resolve(penHome(), "current.json"), "utf8"));
    if (current.kitRoot) return resolve(current.kitRoot);
  } catch {
    // fall through to the explicit error below
  }
  throw new Error("No active Kit. Run `pen-antd references update` first.");
}

function indexNodes(node, map) {
  if (!node || typeof node !== "object") return map;
  if (Array.isArray(node)) {
    for (const item of node) indexNodes(item, map);
    return map;
  }
  if (typeof node.id === "string") map.set(node.id, node);
  for (const value of Object.values(node)) {
    if (value && typeof value === "object") indexNodes(value, map);
  }
  return map;
}

// A script component references sibling components from inside its .js source
// (Tree.js renders `ref: 'cpj9Y'`), which never appears in the document JSON.
async function scriptRefs(node, libraryDir) {
  if (typeof node.scriptUri !== "string") return [];
  let source;
  try {
    source = await readFile(resolve(libraryDir, node.scriptUri), "utf8");
  } catch {
    return [];
  }
  // Component sources write both `ref: 'x'` and `"ref": "x"`, so the key must
  // not be required to be quoted.
  return [...source.matchAll(/["']?ref["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);
}

function inlineRefs(node) {
  const refs = [];
  const walk = (value) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) return value.forEach(walk);
    if (typeof value.ref === "string") refs.push(value.ref);
    Object.values(value).forEach(walk);
  };
  walk(node.children ?? []);
  return refs;
}

// Script components load their source through a path relative to the file that
// declares them, so copying a node into another document keeps a path that
// points nowhere. Rewrite every script/font URI relative to the target document.
export function rebaseUris(node, fromDir, toDir) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((item) => rebaseUris(item, fromDir, toDir));
  for (const key of ["scriptUri", "fontUri", "imageUri"]) {
    if (typeof node[key] === "string" && !/^[a-z]+:|^\//i.test(node[key])) {
      node[key] = relative(toDir, resolve(fromDir, node[key]));
    }
  }
  for (const value of Object.values(node)) {
    if (value && typeof value === "object") rebaseUris(value, fromDir, toDir);
  }
}

export async function buildComponentClosure({ kitRoot, components = coreComponents }) {
  const libraryPath = resolve(kitRoot, "libraries/antd-6.lib.pen");
  const library = JSON.parse(await readFile(libraryPath, "utf8"));
  const libraryDir = dirname(libraryPath);
  const byId = indexNodes(library.children ?? [], new Map());

  const wanted = new Set(components);
  const queue = [...wanted];
  while (queue.length) {
    const id = queue.pop();
    const node = byId.get(id);
    if (!node || node.__seen) continue;
    node.__seen = true;
    const deps = [...(await scriptRefs(node, libraryDir)), ...inlineRefs(node)];
    for (const dep of deps) {
      if (!wanted.has(dep) && byId.has(dep)) {
        wanted.add(dep);
        queue.push(dep);
      }
    }
  }
  for (const node of byId.values()) delete node.__seen;

  const missing = [...wanted].filter((id) => !byId.has(id));
  return { library, byId, libraryDir, ids: [...wanted].filter((id) => byId.has(id)), missing };
}

export async function libraryStatus({ path, kitRoot, components, template }) {
  const target = resolve(path);
  const document = JSON.parse(await readFile(target, "utf8"));

  // A document either imports the library by path or carries the components
  // itself; both are valid and the status has to say which one it found.
  const imports = document.imports || {};
  const aliases = Object.keys(imports);
  if (aliases.length) {
    const resolvedImports = aliases.map((alias) => {
      const location = imports[alias];
      const absolute = /^([a-z]+:|\/)/i.test(location) ? location : resolve(dirname(target), location);
      return { alias, location, absolute, exists: existsSync(absolute) };
    });
    const used = new Set();
    (function collect(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) {
        node.forEach(collect);
        return;
      }
      if (typeof node.ref === "string" && node.ref.includes(":")) used.add(node.ref.split(":")[0]);
      for (const value of Object.values(node)) if (value && typeof value === "object") collect(value);
    })(document.children);
    const missing = resolvedImports
      .filter((entry) => !entry.exists || (used.size > 0 && !used.has(entry.alias)))
      .map((entry) => entry.alias);
    return {
      path: target,
      mode: "import",
      imports: resolvedImports,
      referencedAliases: [...used],
      libraryReady: missing.length === 0,
      missing,
      ...(missing.length ? { nextAction: "pen-antd library shared" } : {}),
    };
  }

  const present = indexNodes(document.children ?? [], new Map());
  const wanted = await resolveTemplateComponents({
    kitRoot: kitRoot ?? (await resolveKitRoot(kitRoot)),
    components,
    template,
  });
  const available = wanted.filter((id) => present.has(id));
  const missing = wanted.filter((id) => !present.has(id));
  return {
    path: target,
    mode: "embed",
    libraryReady: missing.length === 0,
    available: available.length,
    missing,
    ...(missing.length
      ? { nextAction: `pen-antd doc new --path ${path}${template ? ` --template ${template}` : ""}` }
      : {}),
  };
}

export async function createDocument({ path, kitRoot, components, template, open: openAfter = true }) {
  const target = resolve(path);
  const kit = await resolveKitRoot(kitRoot);
  const { library, byId, libraryDir, ids, missing } = await buildComponentClosure({
    kitRoot: kit,
    components: await resolveTemplateComponents({ kitRoot: kit, components, template }),
  });

  let document;
  try {
    document = JSON.parse(await readFile(target, "utf8"));
  } catch {
    await mkdir(dirname(target), { recursive: true });
    document = emptyDocument();
  }

  const present = indexNodes(document.children ?? [], new Map());
  const targetDir = dirname(target);
  const injected = [];
  for (const id of ids) {
    if (present.has(id)) continue;
    const node = structuredClone(byId.get(id));
    rebaseUris(node, libraryDir, targetDir);
    injected.push(node);
  }

  const existingFrame = (document.children ?? []).find((c) => c?.id === "library-sources");
  const sourceFrame = {
    type: "frame",
    id: "library-sources",
    name: "Library Sources",
    x: -40000,
    y: 0,
    width: 200,
    height: 200,
    layout: "vertical",
    gap: 24,
    ...existingFrame,
    children: [...(existingFrame?.children ?? []), ...injected],
  };
  document.children = [...(document.children ?? []).filter((c) => c?.id !== "library-sources"), sourceFrame];
  document.variables = { ...(library.variables ?? {}), ...(document.variables ?? {}) };
  document.themes = document.themes ?? library.themes;
  document.fonts = document.fonts ?? library.fonts;

  await writeFile(target, `${JSON.stringify(document, null, 2)}\n`);

  const result = {
    path: target,
    kitVersion: kit.split("/").pop(),
    injected: injected.length,
    alreadyPresent: ids.length - injected.length,
    missing,
  };

  if (openAfter) Object.assign(result, await openInPen({ path: target }));
  return result;
}

export async function openInPen({ path }) {
  const target = resolve(path);
  if (platform() !== "darwin") {
    return { opened: false, manualAction: `Open ${target} in Pen, then continue.` };
  }
  await run("open", ["-a", "Pen", target]);
  return { opened: true, app: "Pen", path: target };
}
