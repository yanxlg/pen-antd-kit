import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Offline stand-in for the parts of the quality gate that do not need Pen:
// module coverage, frame naming, import resolution and reference hygiene.

const [planPath, docPath] = process.argv.slice(2);
const plan = JSON.parse(readFileSync(resolve(planPath), "utf8"));
const doc = JSON.parse(readFileSync(resolve(docPath), "utf8"));

const walk = (node, visit) => {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((item) => walk(item, visit));
  visit(node);
  for (const [key, value] of Object.entries(node)) {
    if (key === "id" || !value || typeof value !== "object") continue;
    walk(value, visit);
  }
};

const frames = (doc.children || []).filter((child) => /^(Page|Drawer|Modal|Panel) · /.test(child.name || ""));
const byKind = {};
for (const frame of frames) {
  const kind = /(?:^|;\s*)kind=([a-z]+)/.exec(frame.context || "")?.[1] || "unknown";
  byKind[kind] = (byKind[kind] || 0) + 1;
}

const planIds = new Set(plan.modules.map((module) => module.id));
const frameIds = new Set(frames.map((frame) => /(?:^|;\s*)id=([a-z0-9.-]+)/.exec(frame.context || "")?.[1]).filter(Boolean));
const missing = [...planIds].filter((id) => !frameIds.has(id));
const extra = [...frameIds].filter((id) => !planIds.has(id));

let refs = 0;
let bareRefs = 0;
let descendants = 0;
let scriptUris = new Set();
walk(doc.children, (node) => {
  if (typeof node.ref === "string") {
    refs += 1;
    if (!node.ref.includes(":")) bareRefs += 1;
  }
  if (node.descendants) descendants += 1;
  if (typeof node.scriptUri === "string") scriptUris.add(node.scriptUri);
});

const anchors = (doc.children || []).find((child) => child.id === "library-anchors");
const notes = (doc.children || []).find((child) => child.id === "plan-notes");
const aliases = Object.keys(doc.imports || {});

console.log(`frames: ${frames.length} (${Object.entries(byKind).map(([kind, count]) => `${kind} ${count}`).join(", ")})`);
console.log(`plan coverage: missing ${missing.length}${missing.length ? ` → ${missing.slice(0, 5).join(", ")}` : ""}, extra ${extra.length}`);
console.log(`imports: ${aliases.join(", ") || "(none)"} → ${doc.imports?.[aliases[0]] || "-"}`);
console.log(`refs: ${refs} (bare ${bareRefs}), descendants blocks: ${descendants}, scriptUris: ${[...scriptUris].length}`);
console.log(`library-anchors: ${anchors ? anchors.children.length : 0}, plan-notes: ${notes ? "present" : "missing"}`);
console.log(`custom modules in plan: ${plan.modules.filter((module) => module.custom).length}`);
