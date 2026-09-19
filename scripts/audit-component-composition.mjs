import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../', import.meta.url);
const componentDir = new URL('canvas-components/', root);
const read = file => fs.readFileSync(new URL(file, componentDir), 'utf8');

// These flags used to make one component impersonate another official component
// or an example trigger. They are not part of the component contract.
const forbidden = new Map([
  ['Message.js', ['display', 'label']],
  ['Notification.js', ['display', 'label']],
  ['Checkbox.js', ['group', 'label']],
  ['Radio.js', ['group', 'button', 'label']],
  ['Tag.js', ['label']],
  ['Dropdown.js', ['label']],
  ['Switch.js', ['label']],
  ['DatePicker.js', ['range']],
  ['TimePicker.js', ['range']],
  ['Segmented.js', ['kind']],
  ['Upload.js', ['mode', 'label']],
  ['Upload.Dragger.js', ['mode', 'label']],
  ['FloatButton.group.js', ['mode']],
  ['TreeSelect.js', ['mode']],
  ['Cascader.js', ['mode']],
]);

const requiredFiles = [
  'DatePicker.RangePicker.js',
  'TimePicker.RangePicker.js',
  'Checkbox.Group.js',
  'Radio.Group.js',
  'Radio.Button.js',
];

const errors = [];
for (const [file, props] of forbidden) {
  const source = read(file);
  for (const prop of props) {
    if (new RegExp(`@input\\s+${prop}:`).test(source) || new RegExp(`\\bi\\.${prop}\\b`).test(source)) {
      errors.push(`${file}: private render selector "${prop}" must be represented by composition or an official subcomponent`);
    }
  }
}

for (const file of requiredFiles) {
  if (!fs.existsSync(new URL(file, componentDir))) errors.push(`${file}: missing official subcomponent renderer`);
}

const composition = JSON.parse(fs.readFileSync(new URL('registry/canvas-composition.json', root), 'utf8'));
for (const name of ['Badge', 'DatePicker.RangePicker', 'TimePicker.RangePicker']) {
  if (!composition.components?.[name]) errors.push(`canvas-composition.json: missing ${name} component id`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Component composition audit passed.');
