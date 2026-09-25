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

// Cards 5, 6, 8, 36
const cardIds = ['N1Mp4', 'YQmDT', 'CbXFV', 'ex5Kr'];
const details = {};

for (const cid of cardIds) {
  const card = findNode(pen, cid);
  if (!card) continue;
  const preview = card.children[0];
  
  function simplify(n) {
    const res = {
      id: n.id,
      name: n.name,
      type: n.type,
    };
    if (n.ref) res.ref = n.ref;
    if (n.content) res.content = n.content;
    if (n.inputs) res.inputs = n.inputs;
    if (n.children) res.children = n.children.map(simplify);
    return res;
  }
  
  details[cid] = {
    title: card.name,
    preview: simplify(preview)
  };
}

fs.writeFileSync('./scripts/data-entry/cards-sample-detail.json', JSON.stringify(details, null, 2), 'utf8');
console.log('Sample card details written to ./scripts/data-entry/cards-sample-detail.json');
