import fs from 'node:fs';

const penPath = './libraries/antd-6.lib.pen';
const raw = fs.readFileSync(penPath, 'utf8');
const pen = JSON.parse(raw);

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

const formUsage = findNode(pen, 'artboard-form-usage');
if (!formUsage) {
  console.error('artboard-form-usage not found');
  process.exit(1);
}

// Find iwqbf (the container of cards)
const iwqbf = findNode(formUsage, 'iwqbf');
if (!iwqbf) {
  console.error('iwqbf not found');
  process.exit(1);
}

function findCardTitle(card) {
  // Title is usually inside a text node with fontSize 14 in the description section
  // Typically card has 2 main sections: preview section and meta section
  if (!card.children || card.children.length < 2) return '(unknown)';
  const metaSection = card.children[1];
  let title = '';
  function searchTitle(n) {
    if (n.type === 'text' && (n.fontSize === 14 || n.fontSize === 16) && !title) {
      // Exclude asterisks or short punctuation
      if (n.content && n.content.trim() !== '*' && n.content.trim() !== ':') {
        title = n.content.trim();
        return;
      }
    }
    if (n.children) {
      for (const ch of n.children) searchTitle(ch);
    }
  }
  searchTitle(metaSection);
  return title || card.name;
}

function inspectPreviewElements(previewNode) {
  const elements = [];
  function walk(n, path = '') {
    const curPath = path ? `${path} > ${n.name || n.type}` : (n.name || n.type);
    if (n.type === 'ref') {
      elements.push({
        type: 'ref',
        name: n.name,
        ref: n.ref,
        inputs: n.inputs,
        path: curPath
      });
    } else if (n.type === 'image' || n.type === 'svg' || (n.name && /input|select|button|switch|checkbox|radio|slider|picker|cascader|rate|upload/i.test(n.name) && n.type !== 'ref')) {
      elements.push({
        type: n.type,
        name: n.name,
        context: n.context,
        path: curPath
      });
    }
    if (n.children) {
      for (const ch of n.children) walk(ch, curPath);
    }
  }
  walk(previewNode);
  return elements;
}

const report = [];
let cardIndex = 0;

for (const child of iwqbf.children) {
  if (child.name === 'spacer') continue;
  cardIndex++;
  const title = findCardTitle(child);
  const preview = child.children ? child.children[0] : null;
  const elements = preview ? inspectPreviewElements(preview) : [];
  
  // Count ref vs non-ref
  const refCount = elements.filter(e => e.type === 'ref').length;
  const domCount = elements.filter(e => e.type !== 'ref').length;
  
  report.push({
    index: cardIndex,
    id: child.id,
    title,
    refCount,
    domCount,
    elements
  });
}

console.log(`Analyzed ${report.length} cards in Form Usage.`);
console.log('Summary of DOM vs Ref elements per card:');
for (const r of report) {
  console.log(`\nCard ${r.index}: [${r.id}] "${r.title}" (refs: ${r.refCount}, raw DOM/controls: ${r.domCount})`);
  const uniqueRefs = [...new Set(r.elements.filter(e => e.type === 'ref').map(e => `${e.name} (ref=${e.ref})`))];
  const doms = r.elements.filter(e => e.type !== 'ref').map(e => `${e.type}:${e.name || e.context}`);
  if (uniqueRefs.length > 0) {
    console.log(`  Refs used: ${uniqueRefs.join(', ')}`);
  }
  if (doms.length > 0) {
    console.log(`  Raw DOM controls: ${doms.slice(0, 10).join(', ')}${doms.length > 10 ? ' ... and ' + (doms.length - 10) + ' more' : ''}`);
  }
}

// Write full report to JSON for precise mapping
fs.writeFileSync('./scripts/data-entry/form-usage-analysis.json', JSON.stringify(report, null, 2), 'utf8');
console.log('\nFull detailed analysis saved to ./scripts/data-entry/form-usage-analysis.json');
