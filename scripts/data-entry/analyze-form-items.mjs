import fs from 'node:fs';

const pen = JSON.parse(fs.readFileSync('./libraries/antd-6.lib.pen', 'utf8'));

function findNode(node, predicate) {
  if (predicate(node)) return node;
  if (node.children) {
    for (const c of node.children) {
      const res = findNode(c, predicate);
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

const ab = findNode(pen, n => n.id === 'iwqbf');
const sections = ab.children.filter(c => c.name === 'section');

let totalFormItems = 0;
const itemSummaries = [];

for (const sec of sections) {
  const formItems = findAllNodes(sec, n => n.name === 'Form.Item');
  totalFormItems += formItems.length;
  for (const fi of formItems) {
    // Check if it's already a ref or a frame
    const isRef = fi.type === 'ref';
    // Extract label text
    const textNodes = findAllNodes(fi, n => n.type === 'text');
    const refNodes = findAllNodes(fi, n => n.type === 'ref');
    
    itemSummaries.push({
      secId: sec.id,
      itemId: fi.id,
      type: fi.type,
      ref: fi.ref,
      texts: textNodes.map(t => t.content),
      childRefs: refNodes.map(r => ({ name: r.name, ref: r.ref }))
    });
  }
}

console.log(`Total sections: ${sections.length}`);
console.log(`Total Form.Item nodes found: ${totalFormItems}`);
console.log(`Types breakdown:`, {
  refCount: itemSummaries.filter(s => s.type === 'ref').length,
  frameCount: itemSummaries.filter(s => s.type === 'frame').length
});
console.log(`First 8 Form.Item examples:`, JSON.stringify(itemSummaries.slice(0, 8), null, 2));
