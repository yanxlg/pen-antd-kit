import fs from 'node:fs';

const PEN_PATH = './libraries/antd-6.lib.pen';
const pen = JSON.parse(fs.readFileSync(PEN_PATH, 'utf8'));

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
// Find all forms in the artboard
const forms = findAllNodes(ab, n => n.name === 'Form');
console.log(`Found ${forms.length} forms in artboard-form-usage.`);

// Generate batches of execute JS snippets
// For each form, we want to replace its children with the converted items from pen
const batches = [];
let currentBatchCode = '';
let currentBatchCount = 0;

for (const form of forms) {
  if (!form.children || form.children.length === 0) continue;
  
  // Check if form has ref items
  const formItems = form.children.filter(c => c.name === 'Form.Item');
  if (formItems.length === 0) continue;

  let formCode = `\n// Form ${form.id} (${formItems.length} items)\n`;
  formCode += `{\n  const p = Get('${form.id}');\n  if (p && p.children) {\n`;
  // Record old child ids to delete
  formCode += `    const oldIds = p.children.map(c => c.id);\n`;
  // Insert each new item
  formItems.forEach((it, idx) => {
    const itemData = JSON.stringify({
      type: 'ref',
      ref: 'upQWL',
      name: 'Form.Item',
      width: it.width || 600,
      height: it.height || 32,
      inputs: it.inputs || {}
    });
    formCode += `    Insert('${form.id}', ${itemData}, ${idx});\n`;
  });
  // Delete old children
  formCode += `    for (const oldId of oldIds) { Delete(oldId); }\n`;
  formCode += `  }\n}\n`;

  if ((currentBatchCode.length + formCode.length) > 30000 || currentBatchCount >= 8) {
    batches.push(currentBatchCode);
    currentBatchCode = formCode;
    currentBatchCount = 1;
  } else {
    currentBatchCode += formCode;
    currentBatchCount++;
  }
}

if (currentBatchCode) {
  batches.push(currentBatchCode);
}

console.log(`Generated ${batches.length} batch snippets to sync live canvas.`);
fs.writeFileSync('./scripts/data-entry/sync-batches.json', JSON.stringify(batches), 'utf8');
