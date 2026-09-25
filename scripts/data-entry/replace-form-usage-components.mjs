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

const iwqbf = findNode(formUsage, 'iwqbf');
if (!iwqbf) {
  console.error('iwqbf not found');
  process.exit(1);
}

// Master component references
const MASTERS = {
  Form: 'BcTMd',
  FormItem: 'upQWL',
  FormList: 'vHJPV',
  Input: 'iQ5uU',
  InputPassword: 'C8cDZ',
  InputTextArea: 'jSd6E',
  InputNumber: 'SiWnx',
  Select: 'VoQE7',
  Cascader: 'F9Vfg',
  TreeSelect: 'evXTy',
  Tree: 'QYpZY',
  Transfer: 'AddSG',
  UploadPictureCard: 's5u56',
  UploadDragger: 'hPPrP',
  ColorPicker: 'FUop2',
  Rate: 'TCEuq',
  Slider: 'N6xQH4',
  Switch: 'rZqkn',
  DatePicker: 'jCYiD',
  RangePicker: 'QmZCd',
  MonthPicker: 'avOxG',
  TimePicker: 'GPix8',
  Radio: 'wU1wC',
  RadioGroup: 'H0DThz',
  RadioButton: 'I4GAP',
  Checkbox: 'cpj9Y',
  CheckboxGroup: 'X3uk1',
  Button: 'DQZzq',
  Mentions: 'VIOgT'
};

const formMetadata = {
  type: 'antd-component-instance',
  antd: {
    component: 'Form',
    category: 'Data Entry',
    version: '6.6.4'
  }
};

const formItemMetadata = {
  type: 'antd-component-instance',
  antd: {
    component: 'Form.Item',
    category: 'Data Entry',
    version: '6.6.4'
  }
};

const formListMetadata = {
  type: 'antd-component-instance',
  antd: {
    component: 'Form.List',
    category: 'Data Entry',
    version: '6.6.4'
  }
};

let formsTransformed = 0;
let formItemsTransformed = 0;
let controlsReplaced = 0;

// Transform all form containers and row items
function transformTree(node) {
  if (node.name === 'form') {
    node.name = 'Form';
    node.metadata = formMetadata;
    formsTransformed++;
  }
  if (node.name === 'Form') {
    if (node.children) {
      for (const row of node.children) {
        if (row.type === 'frame') {
          const rowText = JSON.stringify(row);
          if (rowText.includes('Add field') || rowText.includes('Add passenger') || rowText.includes('Add Sub Item') || row.id === 'KtDOc') {
            row.name = 'Form.List';
            row.metadata = formListMetadata;
          } else {
            row.name = 'Form.Item';
            row.metadata = formItemMetadata;
          }
          formItemsTransformed++;
        }
      }
    }
  }
  if (node.children) {
    node.children.forEach(transformTree);
  }
}
transformTree(iwqbf);

// Specific control replacements
function replaceRef(nodeId, masterId, masterName, inputs = {}) {
  const node = findNode(iwqbf, nodeId);
  if (node) {
    node.type = 'ref';
    node.ref = masterId;
    node.name = masterName;
    node.inputs = { ...(node.inputs || {}), ...inputs };
    node.metadata = {
      type: 'antd-component-instance',
      antd: {
        component: masterName,
        category: 'Data Entry',
        version: '6.6.4'
      }
    };
    controlsReplaced++;
  }
}

// Card 1: Password
replaceRef('Y3WT4W', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Basic usage' });

// Card 2: Gender -> Select
replaceRef('fOBk7', MASTERS.Select, 'Select', { placeholder: 'Select a option and change input text above', options: 'male|female|other' });

// Card 6: Form variant
replaceRef('l8ooCh', MASTERS.InputNumber, 'InputNumber', { variant: 'filled', defaultValue: 3 });
replaceRef('XUP5w', MASTERS.Mentions, 'Mentions', { variant: 'filled' });
replaceRef('ZmH2k', MASTERS.Select, 'Select', { placeholder: 'Select', variant: 'filled', options: 'Demo' });
replaceRef('tpZFy', MASTERS.Cascader, 'Cascader', { placeholder: 'Cascader', variant: 'filled' });
replaceRef('dtfbr', MASTERS.TreeSelect, 'TreeSelect', { placeholder: 'TreeSelect', variant: 'filled' });

// Card 8: Form size
replaceRef('x3IH8e', MASTERS.Select, 'Select', { placeholder: 'Select', size: 'middle', options: 'Demo' });
replaceRef('fdbAQ', MASTERS.TreeSelect, 'TreeSelect', { placeholder: 'TreeSelect', size: 'middle' });
replaceRef('kF9u3', MASTERS.Cascader, 'Cascader', { placeholder: 'Cascader', size: 'medium' });
replaceRef('s8u0e', MASTERS.InputNumber, 'InputNumber', { size: 'middle', defaultValue: 3 });

// Card 11: Inline login password
replaceRef('bwZTc', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Password' });

// Card 13: Reset form Age
replaceRef('R9mXtf', MASTERS.InputNumber, 'InputNumber', { defaultValue: 18 });

// Card 19: Age -> InputNumber
replaceRef('fxEAd', MASTERS.InputNumber, 'InputNumber', { defaultValue: 20 });

// Card 21: Price currency -> Select
replaceRef('tjNsd', MASTERS.Select, 'Select', { defaultValue: 'rmb', options: 'rmb|dollar' });

// Card 24: Inline password
replaceRef('MrwnR', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Password' });

// Card 25: Login password
replaceRef('Th6iK', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Password' });

// Card 26: Registration Form
replaceRef('x3sRg', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Password' });
replaceRef('c2YblA', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Confirm Password' });
replaceRef('O9VQKU', MASTERS.Cascader, 'Cascader', { placeholder: 'Please select residence' });
replaceRef('Z4mGol', MASTERS.Select, 'Select', { defaultValue: '+86', options: '+86|+87' });
replaceRef('eqoEp', MASTERS.Select, 'Select', { placeholder: 'Select your gender', options: 'male|female|other' });

// Card 33: Dependencies
replaceRef('UC4sj', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Password' });
replaceRef('HMtLz', MASTERS.InputPassword, 'Input.Password', { placeholder: 'Confirm Password' });

console.log(`Transformed:`);
console.log(`- Forms: ${formsTransformed}`);
console.log(`- Form items / Form lists: ${formItemsTransformed}`);
console.log(`- Controls replaced: ${controlsReplaced}`);

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2), 'utf8');
console.log(`Successfully written synchronized data to ${penPath}`);
