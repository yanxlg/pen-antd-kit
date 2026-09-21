import fs from 'node:fs';

const penUrl = new URL('../../libraries/antd-6.lib.pen', import.meta.url);
const document = JSON.parse(fs.readFileSync(penUrl, 'utf8'));

const find = (node, id) => {
  if (node?.id === id) return node;
  for (const child of node?.children ?? []) {
    const match = find(child, id);
    if (match) return match;
  }
  return undefined;
};

const replaceNode = (id, replacement) => {
  const visit = (node) => {
    const index = node?.children?.findIndex((child) => child.id === id) ?? -1;
    if (index >= 0) {
      node.children[index] = { id, ...replacement };
      return true;
    }
    return (node?.children ?? []).some(visit);
  };
  if (!visit(document)) throw new Error(`Missing Cascader Usage node: ${id}`);
};

const metadata = (component, example) => ({
  type: 'antd-component-instance',
  antd: { component, category: 'Data Entry', version: '6.6.4', example },
});
const options = '[{"value":"zhejiang","label":"Zhejiang","children":[{"value":"hangzhou","label":"Hangzhou","children":[{"value":"west-lake","label":"West Lake"},{"value":"xiaoshan","label":"Xiaoshan"}]}]},{"value":"jiangsu","label":"Jiangsu","children":[{"value":"nanjing","label":"Nanjing"},{"value":"suzhou","label":"Suzhou"}]}]';
const cascaderInputs = {
  placeholder: 'Please select',
  value: '[]',
  options,
  size: 'medium',
  status: 'default',
  disabled: false,
  open: false,
  variant: 'underlined',
};

const defaultValueDemo = find(document, 'X08r02');
if (!defaultValueDemo) throw new Error('Missing Cascader Default value demo');
defaultValueDemo.inputs = {
  ...defaultValueDemo.inputs,
  placeholder: 'Please select',
  value: '["zhejiang","hangzhou","west-lake"]',
  options,
};

const customRenderDemo = find(document, 'Ehfbs');
if (!customRenderDemo) throw new Error('Missing Cascader Custom render demo');
customRenderDemo.inputs = {
  ...customRenderDemo.inputs,
  placeholder: 'Please select',
  value: '["zhejiang","hangzhou","west-lake"]',
  displayValue: 'Zhejiang / Hangzhou / West Lake (752100)',
  displayLinkText: '752100',
  options,
};

replaceNode('taGuQ', {
  type: 'ref',
  ref: 'F9Vfg',
  name: 'Cascader · Underlined',
  width: 184,
  height: 32,
  inputs: cascaderInputs,
  metadata: metadata('Cascader', 'Variants · Underlined'),
});

replaceNode('h7TxfD', {
  type: 'ref',
  ref: 'H0DThz',
  name: 'Radio.Group · Placement',
  width: 381,
  height: 32,
  inputs: {
    options: JSON.stringify([
      { label: 'topLeft', value: 'topLeft', width: 80 },
      { label: 'topRight', value: 'topRight', width: 88 },
      { label: 'bottomLeft', value: 'bottomLeft', width: 104 },
      { label: 'bottomRight', value: 'bottomRight', width: 112 },
    ]),
    value: 'topLeft',
    optionType: 'button',
    buttonStyle: 'outline',
    disabled: false,
    block: false,
  },
  metadata: metadata('Radio.Group', 'Cascader placement'),
});

const panel = (name, multiple, panelOptions = options) => ({
  type: 'ref',
  ref: 'F3IF3s',
  name,
  width: 111,
  height: 180,
  inputs: {
    options: panelOptions,
    value: '[]',
    multiple,
    disabled: false,
    direction: 'ltr',
    primaryColor: '#1677FF',
  },
  metadata: metadata('Cascader.Panel', name.replace('Cascader.Panel · ', 'Panel ')),
});

replaceNode('RrYbV', panel('Cascader.Panel · Single', false));
replaceNode('wGU5i', panel('Cascader.Panel · Multiple', true));
replaceNode('TPdHc', panel('Cascader.Panel · Empty', false, '[]'));

const usage = find(document, 'artboard-cascader-usage');
if (!usage) throw new Error('Missing Cascader Usage artboard');

fs.writeFileSync(penUrl, JSON.stringify(document));
console.log('Applied Cascader Usage fixes: variant, placement group, and three panel states.');
