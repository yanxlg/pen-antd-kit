import fs from 'node:fs';

const masters = JSON.parse(fs.readFileSync('./scripts/data-entry/master-components-catalog.json', 'utf8'));

const targets = [
  'Form', 'Form.Item', 'Input', 'Input.TextArea', 'InputNumber',
  'Select', 'Cascader', 'TreeSelect', 'Checkbox', 'Radio', 'Radio.Group', 'Radio.Button',
  'Switch', 'Slider', 'DatePicker', 'DatePicker.RangePicker', 'TimePicker',
  'Rate', 'Upload', 'ColorPicker', 'Button', 'Mentions'
];

console.log('Key Component Masters:');
for (const t of targets) {
  const found = masters.filter(m => m.name === t || (m.name.startsWith(t) && !m.name.startsWith('Icon')));
  if (found.length > 0) {
    found.forEach(f => console.log(`  ${t.padEnd(20)} => id: ${f.id.padEnd(10)} name: ${f.name.padEnd(20)} (${f.board})`));
  } else {
    console.log(`  ${t.padEnd(20)} => NOT FOUND directly`);
  }
}
