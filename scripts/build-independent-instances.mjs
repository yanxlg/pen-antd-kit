import fs from 'node:fs';
import {materialize} from './runtime/independent-instances.mjs';
const root = new URL('../', import.meta.url);
const read = path => JSON.parse(fs.readFileSync(new URL(path, root), 'utf8'));
const captured = read('registry/canvas-instance-bindings.json');
const layout = read('registry/layout-composition.json');
const icons = read('registry/icon-component-values.json');
export const bindings = {...captured};
for (const [id, value] of Object.entries(layout.values)) bindings[id] = {...captured[id], ...value, type:value.ref?'ref':'script'};
for (const [id, inputs] of Object.entries(icons)) bindings[id] = {type:'script',name:'Icon',scriptUri:'../canvas-components/Icon.js',inputs};
export function buildIndependentInstances() {
  const files = new Set(Object.values(bindings).map(n=>n.scriptUri).filter(Boolean));
  for (const uri of files) {
    const path = new URL(uri.replace('../',''), root);
    let source = fs.readFileSync(path, 'utf8');
    const start = '// BEGIN COMPONENT IMPLEMENTATION\n', end = '\n// END COMPONENT IMPLEMENTATION';
    if (source.includes(start)) source = source.split(start)[1].split(end)[0];
    const header = source.match(/^\/\*\*[\s\S]*?\*\//)?.[0] || '';
    const schema = header.replace(/: ref\b/g, ': string');
    source = source.replace(/: ref\b/g, ': string');
    if (!/type:\s*['"]ref['"]/.test(source)) {
      fs.writeFileSync(path,source);
      continue;
    }
    const general=/\/(Button|FloatButton(?:\.group)?|Badge(?:\.wrapper)?)\.js$/.test(uri);
    const bundled=general?Object.fromEntries(Object.entries(bindings).filter(([,node])=>node.scriptUri)):bindings;
    fs.writeFileSync(path, schema+'\nconst __output = (() => {\n'+start+source+end+'\n})();\nconst __bindings = '+JSON.stringify(bundled)+';\n'+materialize.toString()+'\nreturn __output.map(node => materialize(node, __bindings));\n');
  }
  console.log('Built '+files.size+' independent shared component renderers.');
}
if (process.argv[1] === new URL(import.meta.url).pathname) buildIndependentInstances();
