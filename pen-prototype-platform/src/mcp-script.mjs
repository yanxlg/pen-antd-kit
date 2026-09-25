// Canvas content is produced by Pen, not by us. The document only carries an
// empty canvas plus its `imports` entry; template Frames and component refs
// are inserted by this `execute` snippet.
//
// Pen 1.2.13 notes that shape the code below:
//   - `execute` only writes to a document the editor already has open;
//   - only scoped reads work (`Get(nodeId, …)`); a whole-document visitor throws,
//     so cleanup uses the ids the previous run reported;
//   - instance-heavy batches exceed the per-call budget, so work is batched.

const textNode = (id, name, content, extra = {}) =>
  `Insert(${id}, {type:"text", name:${JSON.stringify(name)}, content:${JSON.stringify(content)}, fill:"$antd-colorText", fontFamily:"Inter"${extra}, textGrowth:"fixed-width", width:"fill_container"});`;

function renderCopiedTree(node, parent, lines, counter) {
  const name = node.name || node.type;
  const { id, children, descendants, ...properties } = node;
  if (descendants) throw new Error(`Copied template still has instance overrides at ${name}`);
  const variable = parent === "document" ? "frameId" : `copied${++counter.value}`;
  lines.push(`${variable} = Insert(${parent}, ${JSON.stringify({ ...properties, name })});`);
  for (const child of children || []) renderCopiedTree(child, variable, lines, counter);
}

export function renderInstancesScript({ modules, notes, planTitle, previousIds = [] }) {
  const lines = [];
  lines.push(`Print(${JSON.stringify(`instances: ${modules.length} modules from ${planTitle || "plan"}`)})`);
  lines.push("created = [];");
  if (previousIds.length) {
    lines.push(`const previous = ${JSON.stringify(previousIds)};`);
    lines.push("for (const id of previous) { try { Get(id, {depth:0}); Delete(id); } catch (e) {} }");
  }
  for (const module of modules) {
    if (module.template) {
      if (!module.templateNode || module.templateNode.type !== "frame") {
        throw new Error(`Template ${module.template} has no prepared Frame`);
      }
      renderCopiedTree(module.templateNode, "document", lines, { value: 0 });
    } else {
      const data = [
        `type:"frame"`,
        `name:${JSON.stringify(module.frameName)}`,
        `x:${module.x}`,
        `y:${module.y}`,
        `width:${module.width}`,
        `height:${module.height}`,
        `layout:"vertical"`,
        "gap:12",
        "padding:24",
        `fill:"#FFFFFF"`,
        `stroke:{type:"color", color:"#FFA940", thickness:1}`,
        "cornerRadius:8",
        `context:${JSON.stringify(module.context)}`,
        "placeholder:true",
      ].join(",");
      lines.push(`frameId = Insert(document, {${data}});`);
      for (const line of module.placeholderLines || []) {
        lines.push(textNode("frameId", "Line", line));
      }
    }
    lines.push("Update(frameId, {placeholder:false});");
    lines.push("created.push(frameId);");
  }
  if (notes) {
    const noteData = [
      `type:"frame"`,
      `name:"Plan Notes"`,
      `x:-4200`,
      `y:0`,
      `width:760`,
      `height:${120 + notes.lines.length * 20}`,
      `layout:"vertical"`,
      "gap:12",
      "padding:24",
      `fill:"#FFFFFF"`,
      `stroke:{type:"color", color:"#D9D9D9", thickness:1}`,
      "cornerRadius:8",
      `context:"plan-notes"`,
    ].join(",");
    lines.push(`notesId = Insert(document, {${noteData}});`);
    notes.lines.forEach((line, index) => {
      lines.push(textNode("notesId", index === 0 ? "Title" : "Line", line, index === 0 ? ', fontSize:16, fontWeight:"600"' : ", fontSize:12"));
    });
    lines.push("created.push(notesId);");
  }
  lines.push("Print('created-ids:' + JSON.stringify(created));");
  lines.push("Print('instances: done')");
  return lines.join("\n");
}

export function parseCreatedIds(text) {
  const match = /created-ids:(\[[^\]]*\])/.exec(String(text || ""));
  if (!match) return [];
  try {
    const ids = JSON.parse(match[1]);
    return Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function renderTemplateVerificationScript({ modules, ids }) {
  const checks = modules.flatMap((module, index) => module.template
    ? [{ id: ids[index], refs: collectImportedRefs(module.templateNode) }]
    : []);
  if (checks.some((check) => !check.id)) {
    throw new Error("Cannot verify a template Frame without its created id");
  }
  return `for (const check of ${JSON.stringify(checks)}) { const node = Get(check.id, {depth:0}); if (node?.type !== "frame") throw new Error("Template Frame mismatch: " + check.id); const refs = Get(check.id, n => n?.type === "ref" ? n.ref : undefined, {resolveInstances:false}); for (const ref of check.refs) if (!refs.includes(ref)) throw new Error("Missing imported component " + ref + " in " + check.id); } Print("verified-template-ids:" + JSON.stringify(${JSON.stringify(checks.map((check) => check.id))}));`;
}

function collectImportedRefs(node, refs = new Set()) {
  if (!node || typeof node !== "object") return [...refs];
  if (Array.isArray(node)) {
    for (const child of node) collectImportedRefs(child, refs);
    return [...refs];
  }
  if (node.type === "ref" && typeof node.ref === "string" && node.ref.startsWith("antd:")) refs.add(node.ref);
  for (const value of Object.values(node)) if (value && typeof value === "object") collectImportedRefs(value, refs);
  return [...refs];
}

export async function runInstancesScript({ target, modules, notes, planTitle, previousIds = [], callPenTool, batchSize = 1 }) {
  const scripts = [];
  const texts = [];
  const createdIds = [];
  const errors = [];
  const run = async (input, { required = true } = {}) => {
    try {
      const result = await callPenTool({ tool: "execute", args: { filePath: target, input } });
      if (result?.isError || !String(result?.text || "").startsWith("OK")) {
        throw new Error(result?.text || "Pen MCP execute did not confirm success");
      }
      scripts.push(input);
      texts.push(result?.text || "");
      createdIds.push(...parseCreatedIds(result?.text));
      return true;
    } catch (error) {
      if (required) {
        errors.push(error.message);
        return false;
      }
      return false;
    }
  };

  // Deleting a node that no longer exists is an error in Pen, and an error
  // fails the whole snippet, so cleanup is best effort and one id per call.
  for (const id of previousIds) {
    await run(`Delete(${JSON.stringify(id)});`, { required: false });
  }
  for (let index = 0; index < modules.length; index += batchSize) {
    const batch = modules.slice(index, index + batchSize);
    const before = createdIds.length;
    const ok = await run(renderInstancesScript({ modules: batch, planTitle }));
    if (!ok) break;
    const ids = createdIds.slice(before);
    if (ids.length !== batch.length) {
      errors.push(`MCP reported ${ids.length} created ids for ${batch.length} modules`);
      break;
    }
    if (batch.some((module) => module.template)) {
      const verified = await run(renderTemplateVerificationScript({ modules: batch, ids }));
      if (!verified) break;
    }
  }
  if (!errors.length && notes) await run(renderInstancesScript({ modules: [], notes, planTitle }));

  return { script: scripts.join("\n\n"), result: { text: texts.join("\n") }, createdIds, errors };
}
