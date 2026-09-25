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
if (!ab) {
  console.error('Artboard iwqbf not found!');
  process.exit(1);
}

// Find ALL Form.Item nodes directly or indirectly under ab
const formItems = findAllNodes(ab, n => n.name === 'Form.Item');
console.log(`Found ${formItems.length} total Form.Item nodes in artboard-form-usage.`);

let totalConverted = 0;
let totalSkipped = 0;

for (const fi of formItems) {
  if (fi.type === 'ref' && fi.ref === 'upQWL') {
    totalSkipped++;
    continue;
  }
  
  // Extract text and status
  const allTexts = findAllNodes(fi, n => n.type === 'text');
  let isRequired = false;
  let hasColon = false;
  let labelText = '';
  let helpText = '';
  let validateStatus = '';

  // Check for validation status / error
  for (const t of allTexts) {
    const c = String(t.content).trim();
    if (t.fill === '#ff4d4f' && c.length > 2 && c !== '*') {
      helpText = c;
      validateStatus = 'error';
    } else if (c.includes('warning') || t.fill === '#faad14') {
      helpText = c;
      validateStatus = 'warning';
    }
  }

  // Find label frame specifically
  const labelFrame = findNode(fi, n => n.name === 'label' || (n.context === 'label'));
  let detectedLabelW = 88;

  if (labelFrame) {
    if (typeof labelFrame.width === 'number' && labelFrame.width > 20) {
      detectedLabelW = Math.round(labelFrame.width);
    }
    const labelTexts = findAllNodes(labelFrame, n => n.type === 'text');
    for (const t of labelTexts) {
      const c = String(t.content).trim();
      if (c === '*') isRequired = true;
      else if (c === ':') hasColon = true;
      else if (c.startsWith('*')) {
        isRequired = true;
        labelText = c.replace(/^\*\s*/, '');
      } else if (c.endsWith(':')) {
        hasColon = true;
        labelText = c.replace(/\s*:$/, '');
      } else if (c.length > 0) {
        labelText = c;
      }
    }
  } else {
    for (const t of allTexts) {
      const c = String(t.content).trim();
      if (c === '*') isRequired = true;
      else if (c === ':') hasColon = true;
      else if (!labelText && c.length > 0 && !c.includes('Please') && !c.includes('Select') && t.fill !== '#ff4d4f' && t.name !== 'Icon') {
        labelText = c;
      }
    }
  }

  // Extract refs (controls)
  const refs = findAllNodes(fi, n => n.type === 'ref');
  let childrenPayload = '';
  if (refs.length === 1) {
    const r = refs[0];
    const cleanRef = {
      type: 'ref',
      ref: r.ref,
      name: r.name,
      width: r.width,
      height: r.height,
      ...(r.inputs ? { inputs: r.inputs } : {})
    };
    childrenPayload = JSON.stringify(cleanRef);
  } else if (refs.length > 1) {
    const cleanRefs = refs.map(r => ({
      type: 'ref',
      ref: r.ref,
      name: r.name,
      width: r.width,
      height: r.height,
      ...(r.inputs ? { inputs: r.inputs } : {})
    }));
    childrenPayload = JSON.stringify(cleanRefs);
  }

  // Detect wrapperOffset
  let wrapperOffset = 0;
  if (fi.padding && Array.isArray(fi.padding) && fi.padding[3] > 10) {
    wrapperOffset = Math.round(fi.padding[3]);
  } else if (!labelText && refs.length > 0) {
    const firstChild = fi.children && fi.children[0];
    if (firstChild && firstChild.padding && firstChild.padding[3] > 10) {
      wrapperOffset = Math.round(firstChild.padding[3]);
    }
  }

  if (wrapperOffset >= 180 && wrapperOffset <= 220) {
    wrapperOffset = 200;
    if (detectedLabelW < 180) detectedLabelW = 200;
  }

  let layout = 'horizontal';
  if (fi.height > 50 && labelText) {
    layout = 'vertical';
  }

  // Transform in-place
  fi.type = 'ref';
  fi.ref = 'upQWL';
  fi.inputs = {
    label: labelText,
    required: isRequired,
    colon: hasColon || Boolean(labelText),
    layout: layout,
    labelWidth: detectedLabelW,
    ...(wrapperOffset ? { wrapperOffset } : {}),
    ...(validateStatus ? { validateStatus } : {}),
    ...(helpText ? { help: helpText } : {}),
    children: childrenPayload
  };
  fi.metadata = {
    type: 'antd-component-instance',
    antd: {
      component: 'Form.Item',
      category: 'Data Entry',
      version: '6.6.4'
    }
  };

  // Remove frame properties
  delete fi.children;
  delete fi.context;
  delete fi.padding;
  delete fi.alignItems;
  delete fi.justifyContent;
  delete fi.gap;
  delete fi.layout;
  delete fi.clip;

  totalConverted++;
}

console.log(`Conversion complete! Converted ${totalConverted} Form.Item nodes to ref instances (Previously converted: ${totalSkipped}).`);

fs.writeFileSync(PEN_PATH, JSON.stringify(pen, null, 2), 'utf8');
console.log(`Saved updated pen file: ${PEN_PATH}`);
