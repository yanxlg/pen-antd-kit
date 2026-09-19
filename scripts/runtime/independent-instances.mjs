// Component payloads contain source + props, never a live canvas dependency.
export function materialize(node, bindings, trail = []) {
  if (!node || typeof node !== 'object') return node;
  let result = {...node};
  if (result.type === 'ref') {
    const key = result.ref;
    if (trail.includes(key)) throw new Error('Circular component content: ' + key);
    let target = bindings[key];
    if (!target && typeof key === 'string' && key.startsWith('{')) target = JSON.parse(key);
    if (!target && result.scriptUri) target = {type: 'script', scriptUri: result.scriptUri};
    if (!target) throw new Error('Unresolved component content: ' + key);
    target = materialize(target, bindings, [...trail, key]);
    const {ref, type, descendants, ...overrides} = result;
    result = {...target, ...overrides, type: target.scriptUri ? 'script' : target.type};
    if (target.inputs !== undefined || overrides.inputs !== undefined) {
      // Only self-contained property payloads receive explicit parent overrides.
      // Named bindings already carry a complete input object, not a delta from a demo master.
      result.inputs = typeof key === 'string' && key.startsWith('{')
        ? {...target.inputs, ...overrides.inputs}
        : overrides.inputs === undefined ? target.inputs : overrides.inputs;
    }
    if (descendants && Object.keys(descendants).length) throw new Error('Native descendant overrides need explicit materialization');
  }
  delete result.id;
  delete result.reusable;
  delete result.ref;
  // Parent component props apply only to scripts, never native canvas nodes.
  if (result.type !== 'script') delete result.inputs;
  if (result.children) result.children = result.children.map(child => materialize(child, bindings, trail));
  return result;
}

export function ownInputs(inputs, bindings, trail = []) {
  return Object.fromEntries(Object.entries(inputs || {}).map(([key, value]) => {
    if (typeof value !== 'string' || !bindings[value]) return [key, value];
    if (trail.includes(value)) throw new Error('Circular property: ' + value);
    const node = materialize(bindings[value], bindings);
    const clean = node.scriptUri ? {type:'script', name:node.name || key, scriptUri:node.scriptUri, inputs:ownInputs(node.inputs, bindings, [...trail,value])} : node;
    return [key, JSON.stringify(clean)];
  }));
}
