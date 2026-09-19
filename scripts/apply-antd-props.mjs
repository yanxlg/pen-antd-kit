import { readFile, writeFile } from 'node:fs/promises';

const [, , file, component, ...args] = process.argv;
if (!file || !component) {
  console.error('Usage: node scripts/apply-antd-props.mjs <file.pen> <Component> [--id <nodeId>] [--props <json>] [--state <name>] [--tokens <json>]');
  process.exit(1);
}
const option = (name) => { const index = args.indexOf(name); return index === -1 ? undefined : args[index + 1]; };
const props = option('--props') ? JSON.parse(option('--props')) : {};
const tokens = option('--tokens') ? JSON.parse(option('--tokens')) : {};
const state = option('--state');
const targetId = option('--id');
const document = JSON.parse(await readFile(file, 'utf8'));
let changed = 0;
const visit = (node) => {
  if (!node || typeof node !== 'object') return;
  const matches = targetId
    ? node.id === targetId
    : (node.metadata?.antd?.component === component || node.name === `Antd/${component}` || node.name?.endsWith(`/${component}`));
  if (matches) {
    node.metadata = { ...(node.metadata ?? {}), type: 'antd-component', antd: { ...(node.metadata?.antd ?? {}), component, version: '6.6.4', props: { ...(node.metadata?.antd?.props ?? {}), ...props }, tokens: { ...(node.metadata?.antd?.tokens ?? {}), ...tokens }, ...(state ? { state } : {}) } };
    changed += 1;
  }
  for (const child of node.children ?? []) visit(child);
};
for (const child of document.children ?? []) visit(child);
if (!changed) throw new Error(`No Antd/${component} node found${targetId ? ` with id ${targetId}` : ''}`);
await writeFile(file, `${JSON.stringify(document, null, 2)}\n`);
console.log(`updated ${changed} ${component} node(s) in ${file}`);
