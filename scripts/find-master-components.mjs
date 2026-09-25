import fs from 'node:fs';

const pen = JSON.parse(fs.readFileSync('./libraries/antd-6.lib.pen', 'utf8'));

// Find all canonical / master component definitions
// A master node is typically in a Components artboard, has scriptUri or has ref pointing to it
const masters = [];

function searchMasters(node, parentArtboard = '') {
  const curBoard = (node.type === 'frame' && node.name === 'Components') ? node.id : parentArtboard;
  
  if (node.scriptUri) {
    masters.push({
      id: node.id,
      name: node.name,
      scriptUri: node.scriptUri,
      board: curBoard
    });
  }
  
  if (node.children) {
    for (const c of node.children) {
      searchMasters(c, curBoard);
    }
  }
}

searchMasters(pen);

console.log(`Found ${masters.length} master component definitions:`);
masters.forEach(m => console.log(`- [${m.id}] ${m.name} -> ${m.scriptUri}`));

fs.writeFileSync('./scripts/data-entry/master-components-catalog.json', JSON.stringify(masters, null, 2), 'utf8');
