import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { buildComponentClosure, coreComponents, createDocument, openInPen, rebaseUris, resolveKitRoot } from "./doc-workspace.mjs";
import { LIBRARY_ALIAS, prepareSharedLibrary, sharedAssetPath, sharedLibraryPath, sharedHome } from "./library-store.mjs";
import { runInstancesScript } from "./mcp-script.mjs";
import { defaultPrototypePath, documentMatchesPlan, resolvePrototypePath } from "./output-path.mjs";
import { callPenTool } from "./pen-mcp.mjs";
import { loadPlan, moduleFrameName, validatePlan } from "./prototype-plan.mjs";
import { listTemplates } from "./registry.mjs";

// Turns a validated plan into editable canvas Frames. Template data is read
// from the Kit; normal generation sends the prepared structure to Pen MCP.

const bandOrder = ["page", "drawer", "modal", "panel"];
const bandGap = 160;
const rowGap = 220;
const notesOrigin = { x: -4200, y: 0 };

export const LIBRARY_MODES = ["import", "embed"];
export const WRITE_MODES = ["mcp", "file"];

// Pen cannot enumerate the document, so the ids of the frames this plan
// created are recorded next to it and reused for cleanup on the next run.
const instancesSidecar = (target) => `${target}.instances.json`;

async function readInstanceIds(target) {
  try {
    const sidecar = JSON.parse(await readFile(instancesSidecar(target), "utf8"));
    return Array.isArray(sidecar.ids) ? sidecar.ids : [];
  } catch {
    return [];
  }
}

function blankDocument(library) {
  return {
    version: library.version || "2.18",
    themes: library.themes,
    variables: library.variables,
    children: [],
  };
}

function libraryIdIndex(library) {
  const ids = new Set();
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (typeof node.id === "string") ids.add(node.id);
    for (const value of Object.values(node)) if (value && typeof value === "object") walk(value);
  };
  walk(library.children || []);
  return ids;
}

// Only reusable entries are exposed through the import. Helper nodes such as
// the icon and typography origins are not component instances, so documents
// keep them locally.
function libraryComponentIds(library) {
  const ids = new Set();
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (typeof node.id === "string" && node.reusable === true) ids.add(node.id);
    for (const value of Object.values(node)) if (value && typeof value === "object") walk(value);
  };
  walk(library.children || []);
  return ids;
}

function libraryScriptOrigins(library) {
  const origins = new Map();
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (node.type === "script" && node.reusable === true && typeof node.scriptUri === "string") {
      if (origins.has(node.scriptUri)) origins.set(node.scriptUri, null);
      else origins.set(node.scriptUri, node.id);
    }
    for (const value of Object.values(node)) if (value && typeof value === "object") walk(value);
  };
  walk(library.children || []);
  return origins;
}

function libraryOrigins(library) {
  const origins = new Map();
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (node.reusable === true && typeof node.id === "string") origins.set(node.id, node);
    for (const value of Object.values(node)) if (value && typeof value === "object") walk(value);
  };
  walk(library.children || []);
  return origins;
}

function collectBareRefs(node, ids) {
  ids = ids || new Set();
  if (!node || typeof node !== "object") return ids;
  if (Array.isArray(node)) {
    for (const item of node) collectBareRefs(item, ids);
    return ids;
  }
  if (node.type === "ref" && typeof node.ref === "string" && !node.ref.includes(":")) ids.add(node.ref);
  for (const [key, value] of Object.entries(node)) {
    if (key === "id" || !value || typeof value !== "object") continue;
    collectBareRefs(value, ids);
  }
  return ids;
}

function collectImportedComponentIds(node, ids = new Set()) {
  if (!node || typeof node !== "object") return ids;
  if (Array.isArray(node)) {
    for (const child of node) collectImportedComponentIds(child, ids);
    return ids;
  }
  if (node.type === "ref" && typeof node.ref === "string" && node.ref.startsWith(`${LIBRARY_ALIAS}:`)) {
    ids.add(node.ref.slice(LIBRARY_ALIAS.length + 1));
  }
  for (const child of node.children || []) collectImportedComponentIds(child, ids);
  return ids;
}

function localizeComponentRefs(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach(localizeComponentRefs);
  if (node.type === "ref" && node.ref?.startsWith(`${LIBRARY_ALIAS}:`)) {
    node.ref = node.ref.slice(LIBRARY_ALIAS.length + 1);
  }
  for (const child of node.children || []) localizeComponentRefs(child);
}

// Imported components resolve their own internal `ref`s against the document,
// not against the library, so the document still has to carry those sibling
// components — as plain nodes with their original ids. Everything the page
// references directly stays in the library and is used through the import.
async function injectLibraryAnchors({ document, kitRoot, referenced, imported, home }) {
  if (!referenced.size) return [];
  const closure = await buildComponentClosure({ kitRoot, components: [...referenced] });
  const anchors = closure.ids.filter((id) => !imported.has(`${LIBRARY_ALIAS}:${id}`));
  if (!anchors.length) return [];
  const nodes = anchors.map((id) => {
    const node = structuredClone(closure.byId.get(id));
    const rewrite = (value) => {
      if (!value || typeof value !== "object") return;
      if (Array.isArray(value)) return value.forEach(rewrite);
      for (const key of ["scriptUri", "fontUri", "imageUri"]) {
        if (typeof value[key] === "string") {
          value[key] = sharedAssetPath(value[key], { fromDir: closure.libraryDir, kitRoot, home });
        }
      }
      for (const child of Object.values(value)) if (child && typeof child === "object") rewrite(child);
    };
    rewrite(node);
    return node;
  });
  document.children = (document.children || []).filter((child) => child?.id !== "library-anchors");
  document.children.push({
    type: "frame",
    id: "library-anchors",
    name: "Library Anchors",
    x: -40000,
    y: 1200,
    width: 200,
    height: 200,
    layout: "vertical",
    gap: 24,
    children: nodes,
  });
  return anchors;
}

// Import mode: the document keeps no component copies, so every reference into
// the library has to be namespaced with the import alias, and every script/font
// path has to point at the shared home that the library was materialized into.
function rewriteForImport(node, context) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) rewriteForImport(item, context);
    return;
  }
  if (node.type === "script" && typeof node.scriptUri === "string") {
    const originId = context.scriptOrigins.get(node.scriptUri);
    if (originId && !node.reusable) {
      node.type = "ref";
      node.ref = `${LIBRARY_ALIAS}:${originId}`;
      delete node.scriptUri;
      context.imported.add(node.ref);
      context.referenced.add(originId);
    }
  }
  if (node.type === "ref" && typeof node.ref === "string" && !node.ref.includes(":")) {
    if (context.libraryComponents.has(node.ref)) {
      node.ref = `${LIBRARY_ALIAS}:${node.ref}`;
      context.imported.add(node.ref);
    }
  }
  for (const key of ["scriptUri", "fontUri", "imageUri"]) {
    if (typeof node[key] === "string") node[key] = sharedAssetPath(node[key], context);
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "id" || !value || typeof value !== "object") continue;
    rewriteForImport(value, context);
  }
}

// A copied template owns its layout. Expand only instances that carry nested
// structural overrides; leaf controls without descendants remain library refs.
function materializeTemplateOverrides(node, origins) {
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map((child) => materializeTemplateOverrides(child, origins));
  if (node.type === "ref" && node.descendants) {
    const source = origins.get(node.ref);
    if (!source || !["frame", "script"].includes(source.type)) throw new Error(`Cannot copy overridden component ${node.ref || node.name}`);
    const frame = source.type === "frame" ? structuredClone(source) : { type: "frame", children: [] };
    frame.type = "frame";
    delete frame.reusable;
    for (const [key, value] of Object.entries(node)) {
      if (!["type", "ref", "descendants"].includes(key)) frame[key] = structuredClone(value);
    }
    for (const [targetId, override] of Object.entries(node.descendants)) {
      const spot = locateNode(frame.children ?? [], targetId);
      if (!spot && override.type && source.type === "script") {
        frame.children.push(structuredClone(override));
        continue;
      }
      if (!spot) throw new Error(`Template override target ${targetId} is missing in ${node.ref}`);
      if (override.type) {
        spot.container[spot.key] = structuredClone(override);
      } else {
        spot.container[spot.key] = { ...spot.container[spot.key], ...structuredClone(override) };
      }
    }
    return materializeTemplateOverrides(frame, origins);
  }
  const result = { ...node };
  if (node.children) result.children = materializeTemplateOverrides(node.children, origins);
  return result;
}

function frameSize(frame, resolution) {
  const [rx, ry] = String(resolution || "").split("x").map(Number);
  const width = typeof frame?.width === "number" ? frame.width : undefined;
  const height = typeof frame?.height === "number" ? frame.height : undefined;
  return { width: rx || width || 1440, height: ry || height || 900 };
}

function collectIds(node, ids = new Set()) {
  if (!node || typeof node !== "object") return ids;
  if (Array.isArray(node)) {
    for (const item of node) collectIds(item, ids);
    return ids;
  }
  if (typeof node.id === "string") ids.add(node.id);
  for (const value of Object.values(node)) collectIds(value, ids);
  return ids;
}

// Two modules may reuse the same template, so every copy needs its own ids.
// Only ids defined inside the copied subtree are remapped; `ref` targets that
// point at library components must stay untouched or the closure breaks.
function rekeySubtree(node, prefix) {
  const mapping = new Map();
  let counter = 0;
  for (const id of collectIds(node)) {
    counter += 1;
    mapping.set(id, `${prefix}-${counter}`);
  }
  const rewrite = (value) => {
    if (!value || typeof value !== "object") return value;
    if (Array.isArray(value)) return value.map(rewrite);
    if (typeof value.id === "string" && mapping.has(value.id)) value.id = mapping.get(value.id);
    if (typeof value.ref === "string" && mapping.has(value.ref)) value.ref = mapping.get(value.ref);
    if (typeof value.path === "string" && mapping.has(value.path)) value.path = mapping.get(value.path);
    if (value.descendants && typeof value.descendants === "object") {
      value.descendants = Object.fromEntries(
        Object.entries(value.descendants).map(([key, entry]) => [mapping.get(key) || key, rewrite(entry)]),
      );
    }
    for (const key of Object.keys(value)) {
      if (key === "descendants") continue;
      const entry = value[key];
      if (entry && typeof entry === "object") value[key] = rewrite(entry);
    }
    return value;
  };
  rewrite(node);
  return { node, rootId: node.id };
}

function rekeyCopiedTemplate(node, prefix) {
  let counter = 0;
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) return value.forEach(visit);
    if (value.descendants) throw new Error(`Copied template still contains instance overrides at ${value.name || value.id}`);
    if (typeof value.type === "string" && typeof value.id === "string") {
      counter += 1;
      value.id = `${prefix}-${counter}`;
      if (value.type === "frame") delete value.reusable;
    }
    for (const child of value.children || []) visit(child);
  };
  visit(node);
  return { node, rootId: node.id };
}

function findNodeById(node, id) {
  if (!node || typeof node !== "object") return undefined;
  if (Array.isArray(node)) {
    for (const item of node) {
      const match = findNodeById(item, id);
      if (match) return match;
    }
    return undefined;
  }
  if (node.id === id) return node;
  for (const value of Object.values(node)) {
    if (!value || typeof value !== "object") continue;
    const match = findNodeById(value, id);
    if (match) return match;
  }
  return undefined;
}

// Template slots are ordinary frames inside `children`, but a shell exposes its
// content slot as an instance override inside a `descendants` map. Both are
// valid containers, so locate against the whole node graph.
function locateNode(node, id) {
  if (!node || typeof node !== "object") return undefined;
  if (Array.isArray(node)) {
    for (let index = 0; index < node.length; index += 1) {
      if (node[index]?.id === id) return { container: node, key: index };
      const hit = locateNode(node[index], id);
      if (hit) return hit;
    }
    return undefined;
  }
  for (const [key, value] of Object.entries(node)) {
    if (!value || typeof value !== "object") continue;
    if (!Array.isArray(value) && value.id === id) return { container: node, key };
    const hit = locateNode(value, id);
    if (hit) return hit;
  }
  return undefined;
}

function templateFrame(library, frameId) {
  const source = findNodeById({ children: library.children }, frameId);
  if (!source) throw new Error(`Template frame ${frameId} is missing from the Kit library`);
  return source;
}

function planNotesFrame(plan, modules) {
  const lines = [
    `Prototype plan · ${plan.title || plan.source}`,
    `source: ${plan.source}`,
    ...modules.map((module) => `${module.kind} · ${module.frameName} ← ${module.template ? `${module.template.pattern || module.template.id} ${module.template.frameId}` : `custom: ${module.customReason}`}`),
    ...(plan.assumptions || []).map((assumption) => `assumption: ${assumption}`),
  ];
  return {
    type: "frame",
    id: "plan-notes",
    name: "Plan Notes",
    x: notesOrigin.x,
    y: notesOrigin.y,
    width: 760,
    height: 200,
    layout: "vertical",
    gap: 12,
    padding: 24,
    fill: "#FFFFFF",
    stroke: { type: "color", color: "#D9D9D9", thickness: 1 },
    cornerRadius: 8,
    children: lines.map((line, index) => ({
      type: "text",
      id: `plan-notes-${index + 1}`,
      name: index === 0 ? "Title" : "Line",
      content: line,
      fill: "$antd-colorText",
      fontFamily: "Inter",
      fontSize: index === 0 ? 16 : 12,
      ...(index === 0 ? { fontWeight: "600" } : {}),
    })),
  };
}

function customPlaceholderLines(module) {
  return [
    `${module.kind} · ${module.frameName}`,
    `goal: ${module.goal}`,
    `no template: ${module.customReason || "not covered by the Kit catalog"}`,
    `structure: ${(module.structure || []).map((region) => region.label || region.role).join(" → ") || "n/a"}`,
    `components: ${(module.components || []).join(", ") || "n/a"}`,
  ];
}

// Modules with no template still need a place on the canvas: the placeholder
// states what has to be built instead of pretending the skeleton is complete.
function customPlaceholder(module) {
  const lines = customPlaceholderLines(module);
  return {
    type: "frame",
    id: `mod-${String(module.id).replace(/[^a-z0-9]+/gi, "-")}`,
    name: moduleFrameName(module),
    width: 720,
    height: 240 + lines.length * 4,
    layout: "vertical",
    gap: 12,
    padding: 24,
    fill: "#FFFFFF",
    stroke: { type: "color", color: "#FFA940", thickness: 1 },
    cornerRadius: 8,
    context: ["module", `id=${module.id}`, `kind=${module.kind}`, "custom=true", "placeholder=true"].join("; "),
    children: lines.map((line, index) => ({
      type: "text",
      id: `mod-${String(module.id).replace(/[^a-z0-9]+/gi, "-")}-${index + 1}`,
      name: index === 0 ? "Title" : "Line",
      content: line,
      fill: index === 0 ? "$antd-colorText" : "$antd-colorTextSecondary",
      fontFamily: "Inter",
      fontSize: index === 0 ? 16 : 12,
      ...(index === 0 ? { fontWeight: "600" } : {}),
    })),
  };
}

export async function buildFromPlan({
  path,
  plan,
  planPath,
  kitRoot,
  library: mode = "import",
  home,
  via = "mcp",
  name,
  onConflict = "fail",
  refreshLibrary = false,
  open = false,
}) {
  if (!LIBRARY_MODES.includes(mode)) throw new Error(`Unknown library mode: ${mode}. Use import or embed.`);
  if (!WRITE_MODES.includes(via)) throw new Error(`Unknown write mode: ${via}. Use mcp or file.`);
  const resolvedPlan = plan || await loadPlan(planPath);
  const kit = await resolveKitRoot(kitRoot);

  // The prototype is named after the requirement it came from and lives in the
  // same directory; an existing stranger file is a question for the user, not a
  // decision for the builder.
  const candidate = path ? resolve(path) : defaultPrototypePath({ plan: resolvedPlan, name });
  const samePlan = existsSync(candidate)
    ? documentMatchesPlan(JSON.parse(await readFile(candidate, "utf8")), resolvedPlan)
    : false;
  const output = resolvePrototypePath({ plan: resolvedPlan, path: candidate, name, onConflict, samePlan });
  const target = output.path;
  const targetWasPresent = existsSync(target);

  const validation = await validatePlan({ plan: resolvedPlan, kitRoot: kit, library: mode });
  if (!validation.ok) {
    const detail = validation.errors.map((error) => `${error.code}${error.moduleId ? ` (${error.moduleId})` : ""}: ${error.message}`).join("; ");
    throw new Error(`Plan is not buildable: ${detail}`);
  }

  const templates = await listTemplates(kit);
  const byId = new Map(templates.map((template) => [template.id, template]));
  const libraryPath = resolve(kit, "libraries/antd-6.lib.pen");
  const templatePath = resolve(kit, "libraries/templates.pen");
  const library = JSON.parse(await readFile(libraryPath, "utf8"));
  const templateDocument = JSON.parse(await readFile(templatePath, "utf8"));
  const templateDir = dirname(templatePath);
  const targetDir = dirname(target);
  const store = mode === "import"
    ? await prepareSharedLibrary({ kitRoot: kit, home, force: refreshLibrary })
    : undefined;
  const libraryIds = mode === "import" ? libraryIdIndex(library) : undefined;
  const libraryComponents = mode === "import" ? libraryComponentIds(library) : undefined;
  const scriptOrigins = mode === "import" ? libraryScriptOrigins(library) : undefined;
  const origins = mode === "import" ? libraryOrigins(library) : undefined;

  const templatesUsed = new Set();
  for (const module of validation.modules) {
    if (module.template?.frameId) templatesUsed.add(module.template.frameId);
    if (module.nested?.frameId) templatesUsed.add(module.nested.frameId);
  }
  if (mode === "embed") {
    const componentIds = new Set(coreComponents);
    for (const frameId of templatesUsed) {
      collectImportedComponentIds(templateFrame(templateDocument, frameId), componentIds);
    }
    await createDocument({
      path: target,
      kitRoot: kit,
      components: [...componentIds].join(","),
      open: false,
    });
  }

  const document = mode === "embed" || (targetWasPresent && !(via === "mcp" && output.action === "replaced"))
    ? JSON.parse(await readFile(target, "utf8"))
    : blankDocument(library);
  const librarySources = (document.children || []).find((child) => child?.id === "library-sources");
  if (mode === "import") {
    // One stable absolute path in the shared home: every document in every
    // project imports the same file, and the CLI keeps it in sync with the Kit.
    document.imports = { ...(document.imports || {}), [LIBRARY_ALIAS]: store.libraryPath };
    document.variables = { ...(library.variables || {}), ...(document.variables || {}) };
    document.themes = document.themes ?? library.themes;
  }
  if (via === "mcp" && targetWasPresent && output.action === "rebuilt" && JSON.parse(await readFile(target, "utf8")).imports?.[LIBRARY_ALIAS] !== store.libraryPath) {
    throw new Error("Existing Pen document has a non-absolute or stale library import. Close it, repair only its document-level imports metadata, then reopen before rebuilding.");
  }
  // Re-running the build for the same plan replaces that plan's frames instead
  // of stacking a second copy of the skeleton on the canvas.
  const plannedIds = new Set(validation.modules.map((module) => module.id));
  document.children = (document.children || []).filter((child) => {
    if (["library-sources", "library-templates", "library-anchors", "plan-notes"].includes(child?.id)) return false;
    const context = typeof child?.context === "string" ? child.context : "";
    const match = /(?:^|;\s*)id=([a-z0-9.-]+)/.exec(context);
    return !(context.startsWith("module;") && match && plannedIds.has(match[1]));
  });

  const bands = new Map(bandOrder.map((kind) => [kind, []]));
  const built = [];
  const templateNodes = new Map();
  const referencedComponents = new Set();
  const importedComponents = new Set();
  for (const module of validation.modules) {
    if (!module.template?.frameId) {
      const placeholder = customPlaceholder(module);
      bands.get(module.kind)?.push({ node: placeholder, module });
      built.push({
        id: module.id,
        kind: module.kind,
        frameName: module.frameName,
        frameId: placeholder.id,
        placeholder: true,
        custom: module.custom,
        customReason: module.customReason,
        width: placeholder.width,
        height: placeholder.height,
        states: module.states,
      });
      continue;
    }
    const prefix = `mod-${module.id.replace(/[^a-z0-9]+/gi, "-")}`;
    // Compose first, then rekey once: the plan refers to slot ids from the
    // catalog, which are only valid before the copy gets its own ids.
    let node = structuredClone(templateFrame(templateDocument, module.template.frameId));
    delete node.reusable;

    if (module.nested?.frameId) {
      const slotNode = findNodeById(node, module.slot?.id);
      if (!slotNode) throw new Error(`Slot ${module.slot?.id} was not found inside template frame ${module.template.frameId}`);
      const inner = structuredClone(templateFrame(templateDocument, module.nested.frameId));
      delete inner.reusable;
      // Nested templates carry their own resolution; inside a slot they reflow
      // instead of scaling, so the copy fills the slot it replaces.
      inner.name = `${moduleFrameName(module)} · Content`;
      inner.width = "fill_container";
      inner.height = "fill_container";
      inner.context = [
        "module-content",
        `id=${module.id}`,
        `template=${module.nested.pattern || module.nested.id}`,
        `slot=${module.slot?.name || ""}`,
        "reflow=true",
      ].join("; ");
      const spot = locateNode(node, slotNode.id);
      if (spot) spot.container[spot.key] = inner;
      else node = inner;
    }

    node.name = moduleFrameName(module);
    node.context = [
      "module",
      `id=${module.id}`,
      `kind=${module.kind}`,
      `template=${module.template.pattern || module.template.id}`,
      `board=${module.template.id}`,
      ...(module.template.resolution ? [`resolution=${module.template.resolution}`] : []),
    ].join("; ");
    if (mode === "import") {
      node = materializeTemplateOverrides(node, origins);
      for (const id of collectBareRefs(node)) if (libraryIds.has(id)) referencedComponents.add(id);
      rewriteForImport(node, {
        libraryIds,
        libraryComponents,
        scriptOrigins,
        imported: importedComponents,
        referenced: referencedComponents,
        fromDir: templateDir,
        kitRoot: kit,
        home,
      });
      for (const id of collectImportedComponentIds(node)) {
        importedComponents.add(`${LIBRARY_ALIAS}:${id}`);
        referencedComponents.add(id);
      }
    } else {
      localizeComponentRefs(node);
      rebaseUris(node, templateDir, targetDir);
    }
    if (mode === "import") rekeyCopiedTemplate(node, prefix);
    else rekeySubtree(node, prefix);
    templateNodes.set(module.id, node);

    const size = frameSize(byId.get(module.template.id)?.frame, module.template.resolution);
    node.width = size.width;
    node.height = size.height;
    bands.get(module.kind)?.push({ node, module });
    built.push({
      id: module.id,
      kind: module.kind,
      frameName: module.frameName,
      frameId: node.id,
      template: module.template.pattern || module.template.id,
      nested: module.nested?.pattern,
      width: size.width,
      height: size.height,
      states: module.states,
      custom: module.custom,
    });
  }

  let cursorY = 0;
  for (const kind of bandOrder) {
    const band = bands.get(kind) || [];
    if (!band.length) continue;
    let cursorX = 0;
    let bandHeight = 0;
    for (const { node, module } of band) {
      node.x = cursorX;
      node.y = cursorY;
      cursorX += (typeof node.width === "number" ? node.width : 1440) + bandGap;
      bandHeight = Math.max(bandHeight, typeof node.height === "number" ? node.height : 900);
      const record = built.find((entry) => entry.id === module.id);
      if (record) Object.assign(record, { x: node.x, y: node.y });
    }
    cursorY += bandHeight + rowGap;
  }

  const notes = planNotesFrame(resolvedPlan, validation.modules);
  const viaMcp = via === "mcp";
  if (viaMcp) {
    // Bootstrap writes the canvas container and `imports` and nothing else:
    // every Frame is produced by Pen through the generated execute snippet.
  } else {
    document.children = [...document.children, ...bands.get("page").map((entry) => entry.node)];
    for (const kind of bandOrder.filter((entry) => entry !== "page")) {
      document.children.push(...(bands.get(kind) || []).map((entry) => entry.node));
    }
  }
  if (!viaMcp) document.children.push(notes);
  const anchors = mode === "import" && !viaMcp
    ? await injectLibraryAnchors({ document, kitRoot: kit, referenced: referencedComponents, imported: importedComponents, home })
    : [];
  if (mode === "embed" && librarySources) document.children.push(librarySources);

  // A same-plan MCP rebuild edits existing canvas nodes through execute.
  // Re-serializing the open document here would overwrite user edits from disk.
  if (!viaMcp || !targetWasPresent || output.action === "replaced") {
    await writeFile(target, `${JSON.stringify(document, null, 2)}\n`);
  }

  const result = {
    path: target,
    named: {
      from: resolvedPlan.source,
      existed: output.existed,
      ...(output.action ? { action: output.action } : {}),
      ...(output.renamedFrom ? { renamedFrom: output.renamedFrom } : {}),
    },
    kitVersion: kit.split("/").pop(),
    plan: resolvedPlan.title || resolvedPlan.source,
    library: mode === "import"
      ? {
        mode,
        alias: LIBRARY_ALIAS,
        path: store.libraryPath,
        changed: store.changed,
        libraryVersion: store.libraryVersion,
        anchors: anchors.length,
      }
      : { mode },
    modules: built,
    notesFrameId: notes.id,
    warnings: validation.warnings,
    via,
  };
  if (viaMcp) {
    // `execute` only writes to a document the editor has open.
    Object.assign(result, await openInPen({ path: target }));
    await new Promise((settle) => setTimeout(settle, 8000));
    const previousIds = await readInstanceIds(target);
    const byModule = new Map(validation.modules.map((module) => [module.id, module]));
    const run = await runInstancesScript({
      target,
      planTitle: resolvedPlan.title || resolvedPlan.source,
      previousIds,
      batchSize: Number(process.env.PEN_BATCH_SIZE) || 1,
      notes: {
        lines: [
          `Prototype plan · ${resolvedPlan.title || resolvedPlan.source}`,
          `source: ${resolvedPlan.source}`,
          ...validation.modules.map((module) => `${module.kind} · ${module.frameName} ← ${module.template ? `${module.template.pattern || module.template.id} ${module.template.frameId}` : `custom: ${module.customReason}`}`),
          ...(resolvedPlan.assumptions || []).map((assumption) => `assumption: ${assumption}`),
        ],
      },
      modules: built.map((entry) => ({
        id: entry.id,
        kind: entry.kind,
        frameName: entry.frameName,
        x: entry.x || 0,
        y: entry.y || 0,
        width: entry.width,
        height: entry.height,
        template: entry.template,
        nested: entry.nested,
        templateFrameId: byModule.get(entry.id)?.template?.frameId,
        templateNode: templateNodes.get(entry.id),
        innerFrameId: byModule.get(entry.id)?.nested?.frameId,
        slotPath: (byModule.get(entry.id)?.slot?.path || "").split("/").slice(1).join("/"),
        placeholderLines: byModule.get(entry.id)?.template ? undefined : customPlaceholderLines(byModule.get(entry.id)),
        context: [
          "module",
          `id=${entry.id}`,
          `kind=${entry.kind}`,
          `template=${entry.template || "custom"}`,
          ...(entry.nested ? [`nested=${entry.nested}`] : []),
        ].join("; "),
      })),
      callPenTool,
    });
    // Record what actually reached the canvas before deciding whether to fail,
    // so the next run can clean up exactly those nodes.
    await writeFile(
      instancesSidecar(target),
      `${JSON.stringify({ plan: resolvedPlan.source, updatedAt: new Date().toISOString(), ids: run.createdIds }, null, 2)}\n`,
      "utf8",
    );
    result.mcp = {
      tool: "execute",
      filePath: target,
      modules: built.length,
      previousIds: previousIds.length,
      createdIds: run.createdIds,
      errors: run.errors,
      text: typeof run.result?.text === "string" ? run.result.text.slice(0, 2000) : undefined,
    };
    result.script = run.script;
    if (run.errors.length) {
      const error = new Error(`MCP generation failed after ${run.createdIds.length}/${built.length} Frames: ${run.errors[0].split("\n")[0]}`);
      error.code = "MCP_GENERATION_FAILED";
      error.createdIds = run.createdIds;
      throw error;
    }
  } else if (open) {
    Object.assign(result, await openInPen({ path: target }));
  }
  return result;
}
