import { resolve } from "node:path";
import { pathExists, readJson } from "./io.mjs";
import { extractTemplates, renderTemplateDigest } from "./template-catalog.mjs";

// The catalog is generated when the Kit is built. A catalog older than
// schemaVersion 2 only carries names, so re-derive it from the template file instead
// of shipping a digest the agent cannot act on.
const minimumCatalogVersion = 2;

function normalizeEntries(collection) {
  if (Array.isArray(collection)) return collection;
  return Object.entries(collection || {}).map(([id, value]) => ({ id, ...value }));
}

export async function inspectComponent(kitRoot, requestedName) {
  const registry = await readJson(resolve(kitRoot, "registry/components.json"));
  const entries = normalizeEntries(registry.components);
  const component = entries.find((entry) =>
    [entry.id, entry.name].filter(Boolean).some((value) => value.toLowerCase() === requestedName.toLowerCase()),
  );
  if (!component) throw new Error(`Unknown component: ${requestedName}`);
  return { library: registry.library, version: registry.version, component };
}

export async function listTemplates(kitRoot) {
  const path = resolve(kitRoot, "registry/templates.json");
  const templatePath = resolve(kitRoot, "libraries/templates.pen");
  const libraryPath = resolve(kitRoot, "libraries/antd-6.lib.pen");
  if (await pathExists(path)) {
    const registry = await readJson(path);
    const version = Number(registry.schemaVersion || 0);
    if (version >= minimumCatalogVersion && (registry.templates || []).length) return registry.templates;
  }
  if (await pathExists(templatePath) && await pathExists(libraryPath)) return extractTemplates(templatePath, libraryPath);
  return [];
}

function findTemplate(templates, requested) {
  const wanted = String(requested || "").toLowerCase();
  return templates.find((entry) =>
    [entry.id, entry.name, entry.pattern].filter(Boolean).some((value) => String(value).toLowerCase() === wanted),
  );
}

export async function inspectTemplate(kitRoot, requestedId) {
  const templates = await listTemplates(kitRoot);
  const template = findTemplate(templates, requestedId);
  if (!template) throw new Error(`Unknown template: ${requestedId}`);
  return template;
}

export async function describeTemplate(kitRoot, requestedId, { depth = 3 } = {}) {
  const template = await inspectTemplate(kitRoot, requestedId);
  return { template, digest: renderTemplateDigest(template, { depth }) };
}

export async function describeAllTemplates(kitRoot, { depth = 2 } = {}) {
  const templates = await listTemplates(kitRoot);
  const digests = templates.map((template) => renderTemplateDigest(template, { depth }));
  return { templates, digest: digests.join("\n\n") };
}

// Template lookups accept patterns, board ids or template names and resolve
// each one to its editable source Frame and declared component dependencies.
export async function resolveTemplateFrames(kitRoot, requested) {
  const templates = await listTemplates(kitRoot);
  if (!templates.length) throw new Error("No templates are available in the active Kit");
  const requestedNames = String(requested || "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  const available = templates.map((entry) => entry.pattern || entry.id).join(", ");
  return requestedNames.map((name) => {
    const template = findTemplate(templates, name);
    if (!template) throw new Error(`Unknown template: ${name}. Available: ${available}`);
    if (!template.frame?.id) throw new Error(`Template ${template.id} declares no source Frame`);
    return { template, frameId: template.frame.id };
  });
}

export async function resolveTemplateFrame(kitRoot, requested) {
  const [frame] = await resolveTemplateFrames(kitRoot, requested);
  return frame;
}

export async function matchTemplates(kitRoot, query) {
  const templates = await listTemplates(kitRoot);
  const normalizedQuery = String(query || "").toLowerCase();
  const tokens = normalizedQuery.split(/\s+|[,，、]/).filter(Boolean);
  const aliases = [
    { pattern: /用户|权限|成员|管理/, values: ["user", "permission", "management", "table"] },
    { pattern: /列表|表格/, values: ["list", "table", "standard-list"] },
    { pattern: /申请|表单|步骤|向导|编辑|新建/, values: ["form", "steps", "wizard", "drawer-form"] },
    { pattern: /详情|查看|只读/, values: ["detail", "drawer-detail"] },
    { pattern: /抽屉|弹层|浮层/, values: ["drawer", "overlay"] },
    { pattern: /左右|分栏|目录|树/, values: ["split", "split-tabs", "navigation", "catalog"] },
    { pattern: /外壳|框架|布局|导航|后台/, values: ["shell", "admin-app-shell", "navigation"] },
    { pattern: /大盘|看板|监控|指标|图表/, values: ["dashboard", "monitoring", "metrics", "charts"] },
    { pattern: /设置|配置/, values: ["settings"] },
  ];
  for (const alias of aliases) if (alias.pattern.test(normalizedQuery)) tokens.push(...alias.values);
  return templates
    .map((template) => {
      const summary = template.summary || {};
      const haystack = [
        template.id,
        template.name,
        template.pattern,
        template.category,
        ...(template.capabilities || []),
        ...(template.declaredFeatures || []),
        summary.description,
        summary.useWhen,
        summary.includes,
      ].filter(Boolean).join(" ").toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { template, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.template);
}
