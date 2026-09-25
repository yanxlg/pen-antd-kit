import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathExists, readJson } from "./io.mjs";
import { readSharedLibrary, sharedLibraryPath } from "./library-store.mjs";
import { listTemplates } from "./registry.mjs";

// A plan is the contract between input analysis and canvas generation. The
// input step decides which modules exist (pages, drawers, modals, panels) and
// what each one contains; the build step turns that decision into Frames with
// templates from the active Kit. Nothing in between may invent a module.

export const MODULE_KINDS = ["page", "drawer", "modal", "panel"];

export const STRUCTURE_ROLES = [
  "shell",
  "header",
  "navigation",
  "catalog",
  "filters",
  "list",
  "table",
  "form",
  "detail",
  "overlay",
  "actions",
  "footer",
  "content",
  "preview",
  "feedback",
  "custom",
];

const kindLabels = { page: "Page", drawer: "Drawer", modal: "Modal", panel: "Panel" };

// Which catalog categories may back which module kind. A page may be any page
// shape; a drawer has to be a detail/form overlay; a modal has no template in
// the catalog yet, so it must be declared custom.
const kindPolicy = {
  page: { categories: ["shell", "list", "split", "detail", "form", "general"], templateRequired: true },
  panel: { categories: ["split", "list", "detail", "form", "general"], templateRequired: true },
  drawer: { categories: ["detail", "form", "drawer"], templateRequired: true },
  modal: { categories: [], templateRequired: false },
};

export function moduleFrameName(module) {
  return `${kindLabels[module.kind] || "Module"} · ${module.title}`;
}

export function templateRequested(template) {
  if (!template) return undefined;
  return typeof template === "string" ? template : template.outer;
}

export async function loadPlan(path) {
  const target = resolve(path);
  try {
    return JSON.parse(await readFile(target, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read plan ${target}: ${error.message}`);
  }
}

async function loadComponentNames(kitRoot) {
  const path = resolve(kitRoot, "registry/components.json");
  if (!(await pathExists(path))) return undefined;
  const registry = await readJson(path);
  const entries = Array.isArray(registry.components)
    ? registry.components
    : Object.keys(registry.components || {});
  return new Set(entries.map((entry) => (typeof entry === "string" ? entry : entry.name)).filter(Boolean));
}

function findTemplate(templates, requested) {
  const wanted = String(requested || "").toLowerCase();
  return templates.find((entry) =>
    [entry.id, entry.name, entry.pattern].filter(Boolean).some((value) => String(value).toLowerCase() === wanted),
  );
}

function findSlot(template, name) {
  if (!name) return undefined;
  const wanted = String(name).toLowerCase();
  return (template.slots || []).find((slot) =>
    [slot.id, slot.name].filter(Boolean).some((value) => String(value).toLowerCase() === wanted),
  ) || (template.slots || []).find((slot) => String(slot.name || "").toLowerCase().includes(wanted));
}

// Validates a plan against the Kit catalog. The result is the only accepted
// input for `doc build`; a failing plan must be fixed, not worked around.
export async function validatePlan({ plan, kitRoot, library = "import" }) {
  const errors = [];
  const warnings = [];
  const fail = (code, message, moduleId) => errors.push({ code, message, ...(moduleId ? { moduleId } : {}) });

  if (!plan || typeof plan !== "object") {
    fail("PLAN_SHAPE", "Plan must be a JSON object");
    return { ok: false, errors, warnings, modules: [], summary: {} };
  }
  if (typeof plan.source !== "string" || !plan.source.trim()) {
    fail("PLAN_SOURCE", "Plan must name its input with a non-empty `source`");
  }
  if (!Array.isArray(plan.modules) || plan.modules.length === 0) {
    fail("PLAN_MODULES", "Plan must declare at least one module");
    return { ok: false, errors, warnings, modules: [], summary: {} };
  }
  if (plan.assumptions !== undefined && !Array.isArray(plan.assumptions)) {
    fail("PLAN_ASSUMPTIONS", "`assumptions` must be an array of strings");
  }

  const templates = await listTemplates(kitRoot);
  if (!templates.length) {
    fail("KIT_TEMPLATES", `No templates found in Kit at ${kitRoot}`);
  }
  const componentNames = await loadComponentNames(kitRoot);
  if (!componentNames) warnings.push({ code: "KIT_COMPONENTS", message: "Kit has no registry/components.json; component names were not checked" });

  // Documents import the library from the shared home, so the plan gate reports
  // whether that home is ready; `doc build` materializes or refreshes it.
  const shared = await readSharedLibrary({});
  if (!shared) {
    warnings.push({
      code: "SHARED_LIBRARY_MISSING",
      message: `No shared library at ${sharedLibraryPath({})}; doc build will materialize it from the active Kit before writing imports`,
    });
  }

  const seen = new Set();
  const modules = [];
  const usedTemplates = new Set();

  for (const [index, module] of (plan.modules || []).entries()) {
    const moduleId = typeof module?.id === "string" ? module.id : `#${index + 1}`;
    if (!module || typeof module !== "object") {
      fail("MODULE_SHAPE", "Module must be an object", moduleId);
      continue;
    }
    if (typeof module.id !== "string" || !/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(module.id)) {
      fail("MODULE_ID", "`id` must be lower-case dot/dash separated, e.g. `app-config.list`", moduleId);
    } else if (seen.has(module.id)) {
      fail("MODULE_ID_DUPLICATE", `Duplicate module id: ${module.id}`, moduleId);
    } else {
      seen.add(module.id);
    }
    if (!MODULE_KINDS.includes(module.kind)) {
      fail("MODULE_KIND", `\`kind\` must be one of ${MODULE_KINDS.join(", ")}`, moduleId);
    }
    if (typeof module.title !== "string" || !module.title.trim()) {
      fail("MODULE_TITLE", "`title` is required; it becomes the Frame name", moduleId);
    }
    if (typeof module.goal !== "string" || !module.goal.trim()) {
      fail("MODULE_GOAL", "`goal` is required: one sentence on what the user does here", moduleId);
    }
    if (!Array.isArray(module.structure) || module.structure.length === 0) {
      fail("MODULE_STRUCTURE", "`structure` is required: list every region the module must contain", moduleId);
    } else {
      for (const region of module.structure) {
        if (!STRUCTURE_ROLES.includes(region?.role)) {
          fail("MODULE_STRUCTURE_ROLE", `Unknown structure role \`${region?.role}\`; allowed: ${STRUCTURE_ROLES.join(", ")}`, moduleId);
        }
      }
    }

    const requested = templateRequested(module.template);
    let template;
    let nested;
    let slot;
    if (requested) {
      template = findTemplate(templates, requested);
      if (!template) {
        fail("TEMPLATE_UNKNOWN", `Unknown template \`${requested}\`; run \`pen-antd template describe --all\``, moduleId);
      } else {
        usedTemplates.add(template.pattern || template.id);
        const policy = kindPolicy[module.kind];
        if (policy && !policy.categories.includes(template.category)) {
          fail(
            "TEMPLATE_KIND",
            `Module kind \`${module.kind}\` cannot use \`${template.pattern || template.id}\` (category: ${template.category}); allowed categories: ${policy.categories.join(", ") || "none"}`,
            moduleId,
          );
        }
      }
      if (typeof module.template === "object" && module.template.inner) {
        nested = findTemplate(templates, module.template.inner);
        if (!nested) {
          fail("TEMPLATE_UNKNOWN", `Unknown nested template \`${module.template.inner}\``, moduleId);
        } else {
          usedTemplates.add(nested.pattern || nested.id);
        }
        if (template) {
          slot = findSlot(template, module.template.slot);
          if (!slot) {
            const names = (template.slots || []).map((entry) => entry.name).join(", ") || "none";
            fail(
              "TEMPLATE_SLOT",
              `Nested template needs a replaceable slot in \`${template.pattern || template.id}\`; \`${module.template.slot}\` not found. Available: ${names}`,
              moduleId,
            );
          }
        }
      }
    } else if (kindPolicy[module.kind]?.templateRequired && !module.custom) {
      fail("TEMPLATE_MISSING", `Module kind \`${module.kind}\` must bind a template (or declare \`kind\` differently)`, moduleId);
    }

    if (module.custom !== undefined && typeof module.custom !== "boolean") {
      fail("CUSTOM_FLAG", "`custom` must be a boolean", moduleId);
    }
    if (module.custom && !module.customReason) {
      fail("CUSTOM_REASON", "A custom module must explain why no template covers it", moduleId);
    }

    if (componentNames) {
      for (const component of module.components || []) {
        if (!componentNames.has(component)) {
          fail("COMPONENT_UNKNOWN", `Unknown component \`${component}\`; run \`pen-antd component inspect <name>\``, moduleId);
        }
      }
    }

    modules.push({
      id: module.id,
      kind: module.kind,
      title: module.title,
      goal: module.goal,
      states: module.states || [],
      requirementRefs: module.requirementRefs || [],
      structure: module.structure || [],
      components: module.components || [],
      custom: Boolean(module.custom),
      ...(module.customReason ? { customReason: module.customReason } : {}),
      ...(module.notes ? { notes: module.notes } : {}),
      ...(template
        ? {
          template: {
            requested,
            id: template.id,
            name: template.name,
            pattern: template.pattern,
            category: template.category,
            frameId: template.frame?.id,
            resolution: template.frame?.resolution,
          },
        }
        : {}),
      ...(nested
        ? { nested: { requested: module.template.inner, id: nested.id, pattern: nested.pattern, frameId: nested.frame?.id } }
        : {}),
      ...(slot ? { slot: { id: slot.id, name: slot.name, path: slot.path } } : {}),
      frameName: module.title ? moduleFrameName(module) : undefined,
    });
  }

  if (errors.length === 0 && modules.every((module) => module.kind === "page" || module.template || module.custom)) {
    const kinds = modules.reduce((acc, module) => ({ ...acc, [module.kind]: (acc[module.kind] || 0) + 1 }), {});
    warnings.push(...[]);
    return {
      ok: true,
      errors,
      warnings,
      modules,
      summary: {
        modules: modules.length,
        byKind: kinds,
        templates: [...usedTemplates],
        custom: modules.filter((module) => module.custom).map((module) => module.id),
        frames: modules.map((module) => module.frameName),
      },
    };
  }

  return {
    ok: false,
    errors,
    warnings,
    modules,
    summary: { modules: modules.length, templates: [...usedTemplates] },
  };
}

export function renderPlanDigest(plan, validation) {
  const lines = [];
  lines.push(`# Prototype plan · ${plan.title || plan.source || "untitled"}`);
  lines.push(`source: ${plan.source}`);
  if (plan.version) lines.push(`version: ${plan.version}`);
  if (validation?.summary?.modules !== undefined) {
    const kinds = Object.entries(validation.summary.byKind || {}).map(([kind, count]) => `${kind} ${count}`).join(" / ");
    lines.push(`modules: ${validation.summary.modules}${kinds ? ` (${kinds})` : ""}`);
  }
  lines.push("");
  for (const module of plan.modules || []) {
    const resolved = validation?.modules?.find((entry) => entry.id === module.id);
    const template = resolved?.template;
    lines.push(`## ${module.id} · ${module.kind} · ${module.title}`);
    lines.push(`goal: ${module.goal}`);
    if (module.requirementRefs?.length) lines.push(`requirement: ${module.requirementRefs.join(", ")}`);
    lines.push(
      `template: ${template
        ? `${template.pattern || template.id} (board ${template.id}, frame ${template.frameId}${template.resolution ? `, ${template.resolution}` : ""})`
        : resolved?.custom
          ? `custom — ${resolved.customReason || "no template"}`
          : "none"}`,
    );
    if (resolved?.nested) lines.push(`nested: ${resolved.nested.pattern || resolved.nested.id} (frame ${resolved.nested.frameId}) into slot ${resolved.slot?.name || "?"}`);
    if (module.notes) lines.push(`notes: ${module.notes}`);
    if (module.states?.length) lines.push(`states: ${module.states.join(", ")}`);
    if (module.components?.length) lines.push(`components: ${module.components.join(", ")}`);
    if (module.structure?.length) {
      lines.push("structure:");
      for (const region of module.structure) {
        lines.push(`  - ${region.role}${region.label ? ` (${region.label})` : ""}${region.note ? ` — ${region.note}` : ""}`);
      }
    }
    lines.push("");
  }
  if (plan.assumptions?.length) {
    lines.push("## assumptions");
    for (const assumption of plan.assumptions) lines.push(`- ${assumption}`);
    lines.push("");
  }
  if (validation) {
    lines.push(`## validation: ${validation.ok ? "passed" : "failed"}`);
    for (const error of validation.errors) lines.push(`- [${error.code}]${error.moduleId ? ` ${error.moduleId}` : ""} ${error.message}`);
    for (const warning of validation.warnings) lines.push(`- [warn ${warning.code}] ${warning.message}`);
  }
  return lines.join("\n");
}
