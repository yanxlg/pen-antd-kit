import assert from 'node:assert/strict';
import fs from 'node:fs';
import { renderNavigation } from './render.mjs';

const pen = JSON.parse(fs.readFileSync(new URL('../../libraries/antd-6.lib.pen', import.meta.url), 'utf8'));
const metrics = JSON.parse(fs.readFileSync(new URL('../fonts/divider-metrics.json', import.meta.url), 'utf8'))['400'];

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children || []) {
    const match = find(child, predicate);
    if (match) return match;
  }
  return undefined;
}

function walk(node, result = []) {
  result.push(node);
  for (const child of node.children || []) walk(child, result);
  return result;
}

const usage = find(pen, (node) => node.id === 'artboard-breadcrumb-usage');
assert(usage, 'Breadcrumb Usage artboard must exist');
const nodes = walk(usage);
const cards = nodes.filter((node) => node.name?.startsWith('Breadcrumb example · '));
const instances = nodes.filter((node) => node.type === 'script' && node.scriptUri === '../canvas-components/Breadcrumb.js');
assert.equal(cards.length, 8, 'Usage must contain the eight official example cards');
assert.equal(instances.length, 9, 'Usage must contain nine Breadcrumb instances');
assert.equal(nodes.filter((node) => node.type === 'ref' && node.name?.startsWith('Breadcrumb instance · ')).length, 0, 'Usage must not use ineffective ref input overrides');
assert.equal(nodes.filter((node) => /code-box-actions|edit-button/i.test(`${node.name || ''} ${node.context || ''}`)).length, 0, 'Official action and edit controls must be removed');

for (const card of cards) {
  assert.equal(card.layout, 'vertical');
  assert.deepEqual(card.padding, [42, 24, 51, 24]);
  assert(card.children.every((node) => node.type === 'script' && node.scriptUri === '../canvas-components/Breadcrumb.js'));
}

const rendered = new Map();
for (const instance of instances) {
  const output = renderNavigation('Breadcrumb', {
    ...instance.inputs,
    items: JSON.parse(instance.inputs.items),
    classNames: JSON.parse(instance.inputs.classNames),
    styles: JSON.parse(instance.inputs.styles),
  }, instance.width === 'fill_container' ? 774 : instance.width, instance.height, metrics);
  assert(output.length > 0, `${instance.name} must render`);
  assert(output.every((node) => node.type !== 'ref' && node.context === undefined), `${instance.name} must render without DOM nodes`);
  rendered.set(instance.name, output);
}

const dropdown = instances.find((node) => node.name.includes('drop down menu'));
assert(JSON.parse(dropdown.inputs.items)[2].menu.items.length === 3, 'Dropdown example must use the menu property');
const independent = instances.find((node) => node.name.includes('Separator Independently'));
assert.deepEqual(JSON.parse(independent.inputs.items).filter((item) => item.type === 'separator').map((item) => item.separator), [':', '/', '/']);
const styled = instances.filter((node) => node.name.includes('Custom semantic dom styling'));
assert.equal(styled.length, 2);
assert.equal(styled[0].height, 40);
assert.equal(styled[1].height, 40);

const outputFor = (part) => rendered.get([...rendered.keys()].find((name) => name.includes(part)));
const contents = (part) => outputFor(part).filter((node) => node.name === 'Content').map((node) => node.content);
assert.deepEqual(contents('Basic Usage'), ['Home', '/', 'Application Center', '/', 'Application List', '/', 'An Application']);
assert.deepEqual(contents('With Params'), ['Users', '/', '1']);
assert.deepEqual(contents('Bread crumbs with drop down menu'), ['Ant Design', '/', 'Component', '/', 'General', '/', 'Button']);
assert(outputFor('Bread crumbs with drop down menu').some((node) => node.inputs?.name === 'DownOutlined'));
assert.deepEqual(contents('Debug Routes'), ['Home', '/', 'User']);
assert(outputFor('Debug Routes').some((node) => node.inputs?.name === 'DownOutlined'));
assert.deepEqual(contents('With an Icon'), ['', '/', 'Application List', '/', 'Dashboard', '/', 'Application']);
assert.equal(outputFor('With an Icon').filter((node) => node.name === 'Icon').length, 3);
assert.deepEqual(contents('Configuring the Separator'), ['Home', '>', 'Application Center', '>', 'Application List', '>', 'An Application']);
assert.deepEqual(contents('Configuring the Separator Independently'), ['Location', ':', 'Application Center', '/', 'Application List', '/', 'An Application']);
assert.equal(outputFor('Object').find((node) => node.name === 'Breadcrumb root').stroke, '#f0f0f0');
assert.equal(outputFor('Function').find((node) => node.name === 'Breadcrumb root').stroke, '#F5EFFF');

const primarySignatures = instances.slice(0, 7).map((instance) => JSON.stringify(rendered.get(instance.name)));
assert.equal(new Set(primarySignatures).size, 7, 'Every official example must produce a distinct rendered tree');

assert.equal(pen.children.some((node) => node.id === 'XoD5y'), false, 'Temporary official import must be removed after component replacement');
assert.equal(usage.metadata?.officialVersion, '6.6.5');
console.log('PASS: Breadcrumb Usage has 8 official cards, 9 internal component instances, and no DOM previews or official action controls.');
