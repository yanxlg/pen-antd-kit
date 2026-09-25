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

// Transform Card 1 (AdLBf)
const card1 = findNode(pen, 'AdLBf');

// Form container in Card 1: c3Aduc
const formContainer = findNode(card1, 'c3Aduc');
console.log('Original form children count:', formContainer.children.length);

function convertFormItem(fiNode) {
  // 1. Texts
  const texts = findAllNodes(fiNode, n => n.type === 'text');
  let isRequired = false;
  let hasColon = false;
  let labelText = '';

  for (const t of texts) {
    const c = String(t.content).trim();
    if (c === '*') isRequired = true;
    else if (c === ':') hasColon = true;
    else if (c.startsWith('*')) {
      isRequired = true;
      labelText = c.replace(/^\*\s*/, '');
    } else if (c.endsWith(':')) {
      hasColon = true;
      labelText = c.replace(/\s*:$/, '');
    } else if (t.name === 'Username' || t.name === 'Password' || (fiNode.name && t.content && !t.content.includes(' '))) {
      labelText = c;
    }
  }

  // 2. Control ref
  const refs = findAllNodes(fiNode, n => n.type === 'ref');
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

  // 3. Wrapper offset
  let wrapperOffset = 0;
  if (fiNode.padding && Array.isArray(fiNode.padding) && fiNode.padding[3] > 10) {
    wrapperOffset = Math.round(fiNode.padding[3]);
  }

  // Return new Form.Item component ref node
  return {
    type: 'ref',
    id: fiNode.id,
    name: 'Form.Item',
    ref: 'upQWL',
    width: typeof fiNode.width === 'number' ? fiNode.width : 600,
    height: typeof fiNode.height === 'number' ? fiNode.height : 32,
    inputs: {
      label: labelText,
      required: isRequired,
      colon: hasColon || Boolean(labelText),
      layout: 'horizontal',
      labelWidth: 200,
      ...(wrapperOffset ? { wrapperOffset } : {}),
      children: childrenPayload
    },
    metadata: {
      type: 'antd-component-instance',
      antd: {
        component: 'Form.Item',
        category: 'Data Entry',
        version: '6.6.4'
      }
    }
  };
}

const newItems = formContainer.children.map(convertFormItem);
console.log('Converted items:');
for (const it of newItems) {
  console.log(`  id=${it.id}, label="${it.inputs.label}", req=${it.inputs.required}, off=${it.inputs.wrapperOffset || 0}`);
}

// Replace in memory
formContainer.children = newItems;

fs.writeFileSync('./scripts/data-entry/test-card1-converted.json', JSON.stringify(card1), 'utf8');
console.log('Done test convert Card 1');
