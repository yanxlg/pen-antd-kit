import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
const source = await readFile(new URL('../node_modules/antd/es/index.d.ts', import.meta.url), 'utf8');
const expected = [...source.matchAll(/^export \{ default as (\w+) \}/gm)]
  .map((match) => match[1])
  .filter((name) => !['message', 'notification', 'theme', 'version'].includes(name));
const pen = await readJson('libraries/antd-6.lib.pen');
const registry = await readJson('registry/props.antd-6.6.4.json');
const inspector = await readJson('registry/inspector.antd-6.6.4.json');
const findComponents = (node) => {
  const list = [];
  if (node.metadata?.type === 'antd-component' && node.metadata?.antd?.component) {
    list.push(node);
  }
  for (const child of node.children ?? []) {
    list.push(...findComponents(child));
  }
  return list;
};
const componentNodes = pen.children.flatMap(findComponents);
// Matrix cells are intentionally tagged as selectable Antd instances too;
// only reusable canonical origins count toward the library's component total.
const origins = componentNodes.filter((node) => node.reusable === true).map((node) => node.metadata.antd.component);
const registered = Object.keys(registry.components);
const missing = expected.filter((name) => !origins.includes(name) || !registered.includes(name));
const missingMetadata = componentNodes.filter((node) => node.metadata?.type !== 'antd-component' || !node.metadata?.antd?.component).map((node) => node.name);
const invalidTopLevelPosition = pen.children.filter((node) => typeof node.x !== 'number' || typeof node.y !== 'number').map((node) => node.name);
const invalidSlots = [];
const invalidIds = [];
const buttonMatrixNodes = [];
const walkFormat = (node) => {
  if (node.id?.includes('/')) invalidIds.push(node.id);
  if (node.type === 'frame' && node.slot !== undefined && node.slot !== false && !Array.isArray(node.slot)) invalidSlots.push(node.id);
  if (
    node.type === 'script'
    && node.scriptUri === '../canvas-components/Button.js'
    && node.reusable !== true
    && node.metadata?.antd?.component === 'Button'
    && node.inputs?.state
  ) buttonMatrixNodes.push(node);
  for (const child of node.children ?? []) walkFormat(child);
};
for (const node of pen.children) walkFormat(node);
const emptyProps = expected.filter((name) => name !== 'Grid' && (!registry.components[name] || registry.components[name].props.length === 0));
const missingInspector = expected.filter((name) => !inspector.components[name] || inspector.components[name].props.length !== registry.components[name].props.length);
const buttonOrigin = componentNodes.find((node) => node.metadata?.antd?.component === 'Button' && node.reusable === true);
const requiredButtonInputs = ['type', 'color', 'variant', 'size', 'shape', 'danger', 'ghost', 'block', 'loading', 'disabled', 'state'];
const forbiddenButtonInputs = ['label', 'target', 'primaryColor'];
const invalidButtonScripts = buttonMatrixNodes.filter((node) =>
  node.type !== 'script'
  || node.scriptUri !== '../canvas-components/Button.js'
  || requiredButtonInputs.some((input) => !(input in (node.inputs ?? {})))
  || forbiddenButtonInputs.some((input) => input in (node.inputs ?? {}))
).map((node) => node.id);
const invalidButtonOrigin = !buttonOrigin
  || buttonOrigin.type !== 'script'
  || buttonOrigin.name !== 'Antd/Live/Button'
  || buttonOrigin.scriptUri !== '../canvas-components/Button.js'
  || requiredButtonInputs.some((input) => !(input in (buttonOrigin.inputs ?? {})))
  || forbiddenButtonInputs.some((input) => input in (buttonOrigin.inputs ?? {}));
const buttonShapes = [...new Set(buttonMatrixNodes.map((node) => node.inputs.shape))].sort();
const expectedButtonShapes = ['circle', 'default', 'round', 'square'];
if (pen.version !== '2.17' || missing.length || missingMetadata.length || invalidTopLevelPosition.length || invalidSlots.length || invalidIds.length || emptyProps.length || missingInspector.length || origins.length !== expected.length || buttonMatrixNodes.length !== 1200 || invalidButtonScripts.length || invalidButtonOrigin || JSON.stringify(buttonShapes) !== JSON.stringify(expectedButtonShapes)) {
  throw new Error(JSON.stringify({ version: pen.version, missing, missingMetadata, invalidTopLevelPosition, invalidSlots, invalidIds, emptyProps, missingInspector, originCount: origins.length, expectedCount: expected.length, buttonMatrixCount: buttonMatrixNodes.length, buttonShapes, invalidButtonScripts, invalidButtonOrigin }));
}
console.log(`Ant Design ${registry.version}: ${origins.length} components, complete origins, Props registry, and Inspector Schema`);
