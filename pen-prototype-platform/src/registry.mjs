import { resolve } from "node:path";
import { pathExists, readJson } from "./io.mjs";
import { extractTemplates } from "./kit-builder.mjs";

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
  if (await pathExists(path)) {
    const registry = await readJson(path);
    return registry.templates || [];
  }
  return extractTemplates(resolve(kitRoot, "libraries/antd-6.lib.pen"));
}

export async function inspectTemplate(kitRoot, requestedId) {
  const templates = await listTemplates(kitRoot);
  const template = templates.find((entry) => entry.id === requestedId || entry.name === requestedId);
  if (!template) throw new Error(`Unknown template: ${requestedId}`);
  return template;
}

export async function matchTemplates(kitRoot, query) {
  const templates = await listTemplates(kitRoot);
  const normalizedQuery = query.toLowerCase();
  const tokens = normalizedQuery.split(/\s+|[,，、]/).filter(Boolean);
  const aliases = [
    { pattern: /用户|权限|成员|管理/, values: ["user", "permission", "management", "table"] },
    { pattern: /列表|表格/, values: ["list", "table"] },
    { pattern: /申请|表单|步骤|向导/, values: ["form", "steps", "wizard"] },
    { pattern: /大盘|看板|监控|指标|图表/, values: ["dashboard", "monitoring", "metrics", "charts"] },
    { pattern: /设置|配置/, values: ["settings"] },
  ];
  for (const alias of aliases) if (alias.pattern.test(normalizedQuery)) tokens.push(...alias.values);
  return templates
    .map((template) => {
      const haystack = [template.id, template.name, template.category, ...(template.capabilities || [])].join(" ").toLowerCase();
      return { template, score: tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0) };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.template);
}
