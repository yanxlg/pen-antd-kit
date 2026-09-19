import assert from 'node:assert/strict';
import fs from 'node:fs';
import { dataEntryComponents, componentDefaults, componentSizes, componentVariants } from './config.mjs';

function validateNodes(name, state, nodes) {
  assert(Array.isArray(nodes), `${name}.${state} did not return a node array`);
  if (name !== 'Upload') assert(nodes.length > 0, `${name}.${state} renders no nodes`);
  for (const node of nodes) {
    for (const key of ['x', 'y', 'width', 'height']) assert(Number.isFinite(node[key]), `${name}.${state}.${key} is invalid`);
    assert(['rectangle', 'ellipse', 'text', 'path', 'script'].includes(node.type), `${name}.${state} renders unsupported node type ${node.type}`);
    if (node.type === 'path') {
      assert(typeof node.geometry === 'string' && node.geometry.length > 0, `${name}.${state} path is missing geometry`);
      assert(Array.isArray(node.viewBox) && node.viewBox.length === 4, `${name}.${state} path is missing viewBox`);
    }
    if (node.type === 'script') {
      assert(node.scriptUri, `${name}.${state} nested script is missing scriptUri`);
      const nested = new URL(node.scriptUri.replace('../canvas-components/', '../../canvas-components/'), import.meta.url);
      assert(fs.existsSync(nested), `${name}.${state} nested renderer does not exist: ${node.scriptUri}`);
    }
  }
}

for (const name of dataEntryComponents) {
  const file = new URL(`../../canvas-components/${name}.js`, import.meta.url);
  assert(fs.existsSync(file), `${name} renderer is missing`);
  const source = fs.readFileSync(file, 'utf8');
  assert(source.includes('@schema 2.18'), `${name} has no editable property schema`);
  const render = new Function('pencil', source);
  const [width, height] = componentSizes[name];
  validateNodes(name, 'Default', render({ input: componentDefaults[name], width, height }));
  for (const [state, overrides] of componentVariants[name]) {
    validateNodes(name, state, render({ input: { ...componentDefaults[name], ...overrides }, width, height }));
  }
  assert(componentVariants[name].length >= 3, `${name} needs representative configured instances`);
}

const checkboxSource = fs.readFileSync(new URL('../../canvas-components/Checkbox.js', import.meta.url), 'utf8');
const renderCheckbox = new Function('pencil', checkboxSource);
const checked = renderCheckbox({ input: { children: 'Checkbox', checked: true }, width: 160, height: 32 });
assert(checked.some(node => node.type === 'path' && node.geometry && node.viewBox), 'Checkbox checked mark must be a valid Pencil path');
const mixed = renderCheckbox({ input: { children: 'Checkbox', indeterminate: true }, width: 160, height: 32 });
assert.equal(mixed[0].fill, '#FFFFFF', 'Indeterminate Checkbox keeps the official white outer box');
assert.equal(mixed[1].width, 8, 'Indeterminate Checkbox uses the official centered 8px mark');
const disabledChecked = renderCheckbox({ input: { children: 'Checkbox', checked: true, disabled: true }, width: 160, height: 32 });
assert.equal(disabledChecked[0].fill, '#F5F5F5', 'Disabled checked Checkbox uses the official disabled fill');

const inputNumberSource = fs.readFileSync(new URL('../../canvas-components/InputNumber.js', import.meta.url), 'utf8');
const renderInputNumber = new Function('pencil', inputNumberSource);
const basicNumber = renderInputNumber({ input: { value: 3, size: 'middle', variant: 'outlined' }, width: 160, height: 32 });
assert.equal(basicNumber.length, 2, 'Normal InputNumber must not show hover-only controls');
assert.equal(basicNumber[0].cornerRadius, 6, 'Middle InputNumber radius must match Ant Design');
const smallNumber = renderInputNumber({ input: { value: 3, size: 'small', variant: 'outlined' }, width: 160, height: 24 });
assert.equal(smallNumber[0].height, 24);
assert.equal(smallNumber[0].cornerRadius, 4);
const largeNumber = renderInputNumber({ input: { value: 3, size: 'large', variant: 'outlined' }, width: 160, height: 40 });
assert.equal(largeNumber[0].height, 40);
assert.equal(largeNumber[0].cornerRadius, 8);
const spinnerNumber = renderInputNumber({ input: { value: 3, mode: 'spinner', variant: 'outlined' }, width: 160, height: 32 });
assert(spinnerNumber.some(node => node.type === 'text' && node.content === '−'));
assert(spinnerNumber.some(node => node.type === 'text' && node.content === '+'));
const disabledErrorNumber = renderInputNumber({ input: { value: 3, disabled: true, status: 'error', variant: 'outlined' }, width: 160, height: 32 });
assert.equal(disabledErrorNumber[0].stroke, '#D9D9D9', 'Disabled InputNumber must override status border');
const installer = fs.readFileSync(new URL('./install.pencil.js', import.meta.url), 'utf8');
assert(installer.includes("type:'ref',ref:masterId"), 'Components states must reference the canonical component');
assert(!installer.includes('Replace(preview.id'), 'The generator must not overwrite Usage imported from official pages');
console.log(`Verified ${dataEntryComponents.length} Data Entry renderers and variant configurations.`);
