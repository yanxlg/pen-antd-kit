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

const cardIds = ['AdLBf', 'N1Mp4', 'YQmDT', 'CbXFV', 'ex5Kr'];
const cards = cardIds.map(id => findNode(pen, id));

// Write to a temporary file that we can use
fs.writeFileSync('./scripts/data-entry/cards-to-sync.json', JSON.stringify(cards), 'utf8');
console.log('Written cards-to-sync.json');
