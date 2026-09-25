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
console.log(`Found ${sections.length} sections in artboard-form-usage.`);

// Inspect Card 1 (AdLBf) and Card 2 (Ujr5p)
for (let i = 0; i < Math.min(3, sections.length); i++) {
  const sec = sections[i];
  console.log(`\n================ Section ${i+1}: ${sec.name} (${sec.id}) ================`);
  function dumpTree(node, depth = 0) {
    const indent = '  '.repeat(depth);
    const info = [
      `[${node.name || 'unnamed'}]`,
      `type=${node.type}`,
      `id=${node.id}`,
      node.ref ? `ref=${node.ref}` : '',
      node.inputs ? `inputs=${JSON.stringify(node.inputs)}` : ''
    ].filter(Boolean).join(' ');
    console.log(`${indent}${info}`);
    if (node.children) {
      for (const child of node.children) {
        dumpTree(child, depth + 1);
      }
    }
  }
  dumpTree(sec);
}
