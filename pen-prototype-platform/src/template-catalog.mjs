import { readFile } from "node:fs/promises";

// Templates ship as documentation boards in their own Pen file: the board node
// carries the description, the `Frame · ...` child is the reusable subtree, and
// both carry annotations (`Note · X`, `... · Replaceable`, `context`) that say
// what each part is for. The catalog is derived from that board at build time so
// a new template becomes usable without touching the CLI or the standards.

const patternCategory = {
  "admin-app-shell": "shell",
  "standard-list": "list",
  "split-tabs": "split",
  "drawer-detail": "detail",
  "drawer-form": "form",
};

function indexById(node, map = new Map()) {
  if (!node || typeof node !== "object") return map;
  if (Array.isArray(node)) {
    for (const item of node) indexById(item, map);
    return map;
  }
  if (typeof node.id === "string" && !map.has(node.id)) map.set(node.id, node);
  for (const child of node.children || []) indexById(child, map);
  return map;
}

function walkBoard(node, visit, path = "", depth = 0) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) walkBoard(item, visit, path, depth);
    return;
  }
  const next = node.id ? (path ? `${path}/${node.id}` : node.id) : path;
  visit(node, next, depth);
  for (const child of node.children || []) walkBoard(child, visit, next, depth + 1);
  const descendants = node.descendants;
  if (descendants && typeof descendants === "object") {
    for (const value of Object.values(descendants)) walkBoard(value, visit, next, depth + 1);
  }
}

function boardTexts(board) {
  const texts = [];
  walkBoard(board, (node) => {
    if (node.type === "text" && typeof node.content === "string") texts.push(node);
  });
  const pick = (pattern) => {
    const hit = texts.find((node) => pattern.test(node.name || "") && /内容|content/i.test(node.name || ""))
      || texts.find((node) => pattern.test(node.name || ""));
    return hit ? hit.content.trim() : undefined;
  };
  return {
    description: pick(/模板描述|description/i),
    useWhen: pick(/场景|scenario|use-when/i),
    includes: pick(/功能|includes|functions/i),
    setup: pick(/使用方式|setup|usage/i),
  };
}

function parseFrameMeta(context) {
  const meta = { flags: [] };
  for (const part of String(context || "").split(";")) {
    const [key, value] = part.split("=").map((item) => item.trim());
    if (!key) continue;
    if (!value) meta.flags.push(key);
    else meta[key.replace(/^-(.)/, (_, c) => c.toUpperCase())] = value;
  }
  return meta;
}

function isInstruction(context) {
  return typeof context === "string" && context.trim().length > 0 && !/^prototype-template/.test(context.trim());
}

function inferRole(node, name) {
  const text = String(name || "").toLowerCase();
  if (/sider|aside/.test(text)) return "sider";
  if (/drawer|mask|overlay/.test(text)) return "overlay";
  if (/header/.test(text)) return "header";
  if (/footer/.test(text)) return "footer";
  if (/nav|menu|tree|catalog/.test(text)) return "navigation";
  if (/content|body|main/.test(text)) return "content";
  if (/form/.test(text)) return "form";
  if (/table/.test(text)) return "table";
  if (/filter|search/.test(text)) return "filters";
  if (node.type === "ref") return "component";
  if (text === "section" || text === "div") return "section";
  return node.type || "node";
}

function inferCapabilities({ pattern, components, features }) {
  const capabilities = new Set();
  if (pattern) capabilities.add(pattern);
  const names = components.map((entry) => entry.name.toLowerCase()).join(" ");
  if (/table/.test(names)) capabilities.add("table");
  if (/select|input/.test(names)) capabilities.add("filters");
  if (/pagination/.test(names)) capabilities.add("pagination");
  if (/tabs/.test(names)) capabilities.add("tabs");
  if (/drawer/.test(names)) capabilities.add("drawer");
  if (/form/.test(names)) capabilities.add("form");
  if (/menu|tree|sider|layout\.sider/.test(names)) capabilities.add("navigation");
  if (/button/.test(names)) capabilities.add("actions");
  for (const feature of features) {
    const text = feature.toLowerCase();
    if (/table/.test(text)) capabilities.add("table");
    if (/filter|search/.test(text)) capabilities.add("filters");
    if (/pagination/.test(text)) capabilities.add("pagination");
    if (/tab/.test(text)) capabilities.add("tabs");
    if (/mask|drawer/.test(text)) capabilities.add("overlay");
    if (/form|field/.test(text)) capabilities.add("form");
    if (/preview/.test(text)) capabilities.add("preview");
    if (/language|locale|i18n/.test(text)) capabilities.add("languages");
    if (/menu|navigation|catalog/.test(text)) capabilities.add("navigation");
  }
  return [...capabilities];
}

function describePart(node, path, role) {
  return {
    path,
    id: node.id,
    name: node.name || node.id,
    role,
    ...(node.width !== undefined ? { width: node.width } : {}),
    ...(node.height !== undefined ? { height: node.height } : {}),
  };
}

export function describeBoard(board, index) {
  const texts = boardTexts(board);
  const features = [];
  const components = new Map();
  walkBoard(board, (node) => {
    if (node.type === "note" && typeof node.name === "string") {
      const label = node.name.replace(/^Note\s*·\s*/i, "").trim();
      if (label && !features.includes(label)) features.push(label);
    }
  });

  const frame = (board.children || []).find((child) => child?.type === "frame" && /(?:^|;)\s*pattern=/.test(child.context || ""))
    || (board.children || []).find((child) => /^Frame\s*·/i.test(child?.name || ""))
    || (board.children || []).find((child) => /frame/i.test(child?.type || ""));
  if (!frame) return undefined;

  const meta = parseFrameMeta(frame.context);
  const slots = [];
  const parts = [];
  walkBoard(frame, (node, path, depth) => {
    const name = node.name || "";
    if (node.slot !== undefined || /replaceable|slot|占位|可替换/i.test(name)) {
      slots.push({
        path,
        id: node.id,
        name,
        ...(isInstruction(node.context) ? { instruction: node.context.trim() } : {}),
      });
    }
    if (depth <= 3 && (node.type === "frame" || node.type === "ref" || node.type === "script")) {
      parts.push(describePart(node, path, inferRole(node, name)));
    }
    if (node.type === "ref" && typeof node.ref === "string") {
      const componentId = node.ref.replace(/^antd:/, "");
      const target = index.get(componentId);
      if (target && !components.has(componentId)) {
        components.set(componentId, { id: componentId, name: target.name || componentId });
      }
    }
  });

  const componentList = [...components.values()];
  const pattern = typeof meta.pattern === "string" ? meta.pattern : undefined;
  const category = patternCategory[pattern]
    || (/drawer/.test(`${board.name} ${pattern}`) ? "drawer" : "general");

  return {
    id: board.id,
    name: board.name || board.id,
    ...(pattern ? { pattern } : {}),
    category,
    capabilities: inferCapabilities({ pattern, components: componentList, features }),
    summary: texts,
    declaredFeatures: features,
    frame: {
      id: frame.id,
      name: frame.name,
      width: frame.width,
      height: frame.height,
      ...(meta.resolution ? { resolution: meta.resolution } : {}),
      ...(meta.viewport ? { viewport: meta.viewport } : {}),
      ...(meta.flags?.length ? { flags: meta.flags } : {}),
    },
    slots,
    parts: parts.filter((part, position) => parts.findIndex((other) => other.path === part.path) === position),
    components: componentList,
    source: { file: "libraries/templates.pen", nodeId: board.id },
  };
}

function findNode(node, id) {
  if (!node || typeof node !== "object") return undefined;
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const match = findNode(child, id);
    if (match) return match;
  }
  return undefined;
}

export async function extractTemplates(templatePath, componentLibraryPath) {
  const document = JSON.parse(await readFile(templatePath, "utf8"));
  const componentLibrary = JSON.parse(await readFile(componentLibraryPath, "utf8"));
  const index = indexById(componentLibrary.children ?? []);
  const container = findNode(document, "layer-templates-pages")
    || (document.children || []).find((node) => /template|模板/i.test(node.name || ""));
  return (container?.children || [])
    .map((board) => describeBoard(board, index))
    .filter(Boolean);
}

export function renderTemplateDigest(template, { depth = 3 } = {}) {
  const lines = [];
  lines.push(`# ${template.name} (${template.id})`);
  const header = [
    template.pattern ? `pattern: ${template.pattern}` : undefined,
    `category: ${template.category}`,
    template.frame?.resolution ? `resolution: ${template.frame.resolution}` : undefined,
    template.frame ? `frame: ${template.frame.id} (${template.frame.name}${typeof template.frame.width === "number" ? ` ${template.frame.width}×${template.frame.height}` : ""})` : undefined,
  ].filter(Boolean);
  lines.push(header.join(" | "));
  const summary = template.summary || {};
  for (const [key, label] of [["description", "description"], ["useWhen", "use-when"], ["includes", "includes"], ["setup", "setup"]]) {
    if (summary[key]) lines.push(`${label}: ${summary[key]}`);
  }
  if (template.capabilities?.length) lines.push(`capabilities: ${template.capabilities.join(", ")}`);
  if (template.declaredFeatures?.length) lines.push(`declared features: ${template.declaredFeatures.join(", ")}`);
  if (template.components?.length) {
    lines.push(`components: ${template.components.map((entry) => `${entry.name} (${entry.id})`).join(", ")}`);
  }
  if (template.slots?.length) {
    lines.push("replaceable parts:");
    for (const slot of template.slots) {
      lines.push(`  - ${slot.path} | ${slot.name}${slot.instruction ? ` | ${slot.instruction}` : ""}`);
    }
  }
  if (template.parts?.length) {
    lines.push("structure:");
    for (const part of template.parts) {
      const level = part.path.split("/").length - 1;
      if (level > depth) continue;
      const size = [part.width, part.height].filter((value) => value !== undefined).join("×");
      lines.push(`${"  ".repeat(level + 1)}- ${part.path} | ${part.name} | ${part.role}${size ? ` | ${size}` : ""}`);
    }
  }
  return lines.join("\n");
}
