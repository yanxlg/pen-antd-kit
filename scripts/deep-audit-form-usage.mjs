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

const formUsage = findNode(pen, 'artboard-form-usage');
const iwqbf = findNode(formUsage, 'iwqbf');

function findCardTitle(card) {
  if (!card.children || card.children.length < 2) return '(unknown)';
  const metaSection = card.children[1];
  let title = '';
  function searchTitle(n) {
    if (n.type === 'text' && (n.fontSize === 14 || n.fontSize === 16) && !title) {
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

// In each card preview, find all form items (label + control)
const audit = [];
let idx = 0;

for (const child of iwqbf.children) {
  if (child.name === 'spacer') continue;
  idx++;
  const title = findCardTitle(child);
  const preview = child.children[0];
  
  // Find all label and control pairs
  const items = [];
  
  function scanItems(node) {
    // If node has label
    let label = '';
    function findLabel(n) {
      if (n.name === 'label' || n.context === 'label') {
        // get text content
        const texts = [];
        function getTexts(tn) {
          if (tn.type === 'text' && tn.content && tn.content !== '*' && tn.content !== ':') {
            texts.push(tn.content.trim());
          }
          if (tn.children) tn.children.forEach(getTexts);
        }
        getTexts(n);
        label = texts.join(' ');
      }
      if (!label && n.children) {
        for (const c of n.children) findLabel(c);
      }
    }
    findLabel(node);
    
    // Find controls in this node
    const controls = [];
    function findControls(n) {
      if (n.type === 'ref') {
        controls.push({
          id: n.id,
          name: n.name,
          ref: n.ref,
          inputs: n.inputs
        });
      } else if (n.name && /slider|rate|colorpicker|upload|select|tree|cascader|radio|checkbox|switch/i.test(n.name) && n.name !== 'label' && n.name !== 'Icon') {
        controls.push({
          id: n.id,
          name: n.name,
          type: n.type,
          isDom: true
        });
      }
      if (n.children) {
        for (const c of n.children) findControls(c);
      }
    }
    findControls(node);
    
    if (label || controls.length > 0) {
      items.push({
        label,
        controls
      });
    }
  }

  // Find form node in preview
  function findForm(n) {
    if (n.name === 'form' || n.context === 'form') {
      return n;
    }
    if (n.children) {
      for (const c of n.children) {
        const f = findForm(c);
        if (f) return f;
      }
    }
    return n;
  }

  const formNode = findForm(preview);
  // Each top child of formNode is typically a row
  if (formNode && formNode.children) {
    formNode.children.forEach(row => scanItems(row));
  }

  audit.push({
    index: idx,
    id: child.id,
    title,
    itemCount: items.length,
    items
  });
}

fs.writeFileSync('./scripts/data-entry/deep-audit.json', JSON.stringify(audit, null, 2), 'utf8');

console.log(`Audited ${audit.length} cards.`);
for (const a of audit) {
  const mismatched = [];
  a.items.forEach(it => {
    const lbl = it.label.toLowerCase();
    it.controls.forEach(ctrl => {
      if (lbl.includes('password') && ctrl.name === 'Input' && ctrl.ref !== 'C8cDZ') {
        mismatched.push(`Label "${it.label}" uses Input instead of Input.Password`);
      } else if (lbl.includes('select') && !lbl.includes('tree') && ctrl.name === 'Input') {
        mismatched.push(`Label "${it.label}" uses Input instead of Select`);
      } else if (lbl.includes('treeselect') && ctrl.name === 'Input') {
        mismatched.push(`Label "${it.label}" uses Input instead of TreeSelect`);
      } else if (lbl.includes('cascader') && ctrl.name === 'Input') {
        mismatched.push(`Label "${it.label}" uses Input instead of Cascader`);
      } else if (lbl.includes('inputnumber') && ctrl.name === 'Input') {
        mismatched.push(`Label "${it.label}" uses Input instead of InputNumber`);
      } else if (ctrl.isDom) {
        mismatched.push(`Label "${it.label || '(no label)'}" has raw DOM: ${ctrl.name}`);
      }
    });
  });
  if (mismatched.length > 0) {
    console.log(`\nCard ${a.index}: [${a.id}] "${a.title}" has ${mismatched.length} component issues:`);
    mismatched.forEach(m => console.log(`  - ${m}`));
  }
}
