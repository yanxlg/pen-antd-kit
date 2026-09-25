import fs from 'node:fs';

const pen = JSON.parse(fs.readFileSync('./libraries/antd-6.lib.pen', 'utf8'));

function findNode(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const c of node.children) {
      const res = findNode(c, id);
      if (res) return res;
    }
  }
  return null;
}

function findAllNodes(node, predicate, list = []) {
  if (predicate(node)) list.push(node);
  if (node.children) {
    for (const c of node.children) {
      findAllNodes(c, predicate, list);
    }
  }
  return list;
}

// Inspect Card 1: AdLBf
const card1 = findNode(pen, 'AdLBf');
console.log('Card 1 (AdLBf) items:');
const formItems = findAllNodes(card1, n => n.name === 'Form.Item');

for (const fi of formItems) {
  console.log(`\nItem ID: ${fi.id}`);
  const texts = findAllNodes(fi, n => n.type === 'text');
  const refs = findAllNodes(fi, n => n.type === 'ref');
  console.log('  texts:', texts.map(t => t.content));
  console.log('  refs:', refs.map(r => ({ name: r.name, ref: r.ref, inputs: r.inputs })));
}
