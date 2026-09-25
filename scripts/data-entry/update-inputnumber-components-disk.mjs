import fs from 'node:fs';

const penPath = './libraries/antd-6.lib.pen';
const raw = fs.readFileSync(penPath, 'utf8');
const pen = JSON.parse(raw);

const de = pen.children.find(c => c.id === 'layer-data-entry');
if (!de) throw new Error('layer-data-entry not found');

const sec = de.children.find(c => c.id === 'section-inputnumber');
if (!sec) throw new Error('section-inputnumber not found');

const board = sec.children.find(c => c.id === 'artboard-inputnumber-components');
if (!board) throw new Error('artboard-inputnumber-components not found');

// Helper to find and extract master node
function extractNode(parent, id) {
  if (!parent.children) return null;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (child.id === id) {
      parent.children.splice(i, 1);
      return child;
    }
    const found = extractNode(child, id);
    if (found) return found;
  }
  return null;
}

const master_SiWnx = extractNode(board, 'SiWnx');
if (!master_SiWnx) {
  throw new Error('Could not find master SiWnx node!');
}
console.log('Successfully extracted master SiWnx node.');

// Remove all existing cards from board, only keep top title header
const compHeader = board.children.find(c => c.id === 'gJ9qB' || (c.content && c.content.includes('Components')));
board.children = compHeader ? [compHeader] : [];

// Helper to generate IDs
let idSeq = 3000;
const genId = prefix => prefix + '_' + (++idSeq);

// Generators
const cardFrame = (id, name, y, height) => ({
  type: 'frame',
  id,
  name,
  x: 32,
  y,
  width: 1664,
  height,
  layout: 'none',
  cornerRadius: 8,
  fill: '#FFFFFF',
  stroke: '#E8E8E8',
  strokeWidth: 1,
  children: []
});

const titleNodes = (title, subtitle) => [
  { type: 'text', id: genId('t'), name: 'Card Title', x: 24, y: 20, fill: '#000000E0', content: title, fontFamily: 'Inter', fontSize: 16, fontWeight: '600' },
  { type: 'text', id: genId('sub'), name: 'Card Subtitle', x: 24, y: 46, fill: '#00000073', content: subtitle, fontFamily: 'Inter', fontSize: 12, fontWeight: 'normal' }
];

const colH = (name, x, y = 78) => ({
  type: 'text', id: genId('col'), name: 'Col Header ' + name, x, y, fill: '#0000008A', content: name, fontFamily: 'Inter', fontSize: 13, fontWeight: '600'
});

const rowH = (name, y) => ({
  type: 'text', id: genId('row'), name: 'Row Header ' + name, x: 24, y: y + 6, fill: '#000000A6', content: name, fontFamily: 'Inter', fontSize: 13, fontWeight: '500'
});

const labelText = (text, x, y) => ({
  type: 'text', id: genId('lbl'), name: 'Section Label ' + text, x, y, fill: '#000000A6', content: text, fontFamily: 'Inter', fontSize: 13, fontWeight: '600'
});

const instance = (masterRef, name, x, y, width, height, inputs) => ({
  type: 'ref',
  id: genId('inst'),
  ref: masterRef,
  name: name,
  x,
  y,
  width,
  height,
  inputs,
  metadata: { type: 'antd-component-instance', antd: { component: 'InputNumber', category: 'Data Entry', version: '6.6.4', example: name } }
});

// ==========================================
// Card 1: Standard Variants & Status Matrix
// ==========================================
const card1 = cardFrame('card-inputnumber-standard', 'Card · Standard Variants & Statuses', 160, 480);
card1.children.push(...titleNodes(
  '1. Standard Variants & Status Matrix',
  'Deconstruct standard variants (Outlined, Filled, Borderless, Underlined) across Normal, Value, Focused, Warning, Error, and Disabled states'
));

const c1Cols = [
  { variant: 'outlined', label: 'Outlined (Default)', x: 180 },
  { variant: 'filled', label: 'Filled', x: 550 },
  { variant: 'borderless', label: 'Borderless', x: 920 },
  { variant: 'underlined', label: 'Underlined', x: 1290 }
];
for (const c of c1Cols) card1.children.push(colH(c.label, c.x));

// Row 1 Normal: master SiWnx at Col 1
master_SiWnx.x = 180;
master_SiWnx.y = 115;
master_SiWnx.width = 320;
master_SiWnx.height = 32;
master_SiWnx.inputs = { placeholder: 'Enter number', value: '', variant: 'outlined' };

card1.children.push(rowH('Normal', 115));
card1.children.push(master_SiWnx);
card1.children.push(instance('SiWnx', 'InputNumber · Normal filled', 550, 115, 320, 32, { placeholder: 'Filled input', variant: 'filled' }));
card1.children.push(instance('SiWnx', 'InputNumber · Normal borderless', 920, 115, 320, 32, { placeholder: 'Borderless input', variant: 'borderless' }));
card1.children.push(instance('SiWnx', 'InputNumber · Normal underlined', 1290, 115, 320, 32, { placeholder: 'Underlined input', variant: 'underlined' }));

// Row 2 Value
card1.children.push(rowH('Value', 175));
for (const col of c1Cols) {
  card1.children.push(instance('SiWnx', 'InputNumber · Value ' + col.variant, col.x, 175, 320, 32, { value: 99, variant: col.variant }));
}

// Row 3 Focused
card1.children.push(rowH('Focused', 235));
for (const col of c1Cols) {
  card1.children.push(instance('SiWnx', 'InputNumber · Focused ' + col.variant, col.x, 235, 320, 32, { value: 99, focused: true, variant: col.variant }));
}

// Row 4 Warning
card1.children.push(rowH('Warning', 295));
for (const col of c1Cols) {
  card1.children.push(instance('SiWnx', 'InputNumber · Warning ' + col.variant, col.x, 295, 320, 32, { value: 99, status: 'warning', variant: col.variant }));
}

// Row 5 Error
card1.children.push(rowH('Error', 355));
for (const col of c1Cols) {
  card1.children.push(instance('SiWnx', 'InputNumber · Error ' + col.variant, col.x, 355, 320, 32, { value: 99, status: 'error', variant: col.variant }));
}

// Row 6 Disabled
card1.children.push(rowH('Disabled', 415));
for (const col of c1Cols) {
  card1.children.push(instance('SiWnx', 'InputNumber · Disabled ' + col.variant, col.x, 415, 320, 32, { value: 99, disabled: true, variant: col.variant }));
}

// ==========================================
// Card 2: Size & Mode Matrix
// ==========================================
const card2 = cardFrame('card-inputnumber-sizes', 'Card · Sizes & Modes Matrix', 664, 340);
card2.children.push(...titleNodes(
  '2. Size & Mode Matrix (Large, Middle, Small)',
  'Visual presentation of Large (40px), Middle (32px), and Small (24px) across standard, currency prefix, spinner, and suffix configurations'
));

const c2Cols = [
  { name: 'Standard Input', x: 180 },
  { name: 'Prefix Currency (¥)', x: 550 },
  { name: 'Digit Spinner Mode', x: 920 },
  { name: 'Suffix Unit (RMB)', x: 1290 }
];
for (const c of c2Cols) card2.children.push(colH(c.name, c.x));

const sizeRows = [
  { name: 'Large (40px)', size: 'large', h: 40, y: 115 },
  { name: 'Middle (32px)', size: 'middle', h: 32, y: 180 },
  { name: 'Small (24px)', size: 'small', h: 24, y: 236 }
];
for (const r of sizeRows) {
  card2.children.push(rowH(r.name, r.y));
  card2.children.push(instance('SiWnx', 'InputNumber · ' + r.size + ' standard', 180, r.y, 320, r.h, { size: r.size, value: 100 }));
  card2.children.push(instance('SiWnx', 'InputNumber · ' + r.size + ' currency', 550, r.y, 320, r.h, { size: r.size, prefix: '¥', value: 100 }));
  card2.children.push(instance('SiWnx', 'InputNumber · ' + r.size + ' spinner', 920, r.y, 320, r.h, { size: r.size, mode: 'spinner', value: 3 }));
  card2.children.push(instance('SiWnx', 'InputNumber · ' + r.size + ' suffix', 1290, r.y, 320, r.h, { size: r.size, suffix: 'RMB', value: 100 }));
}

// ==========================================
// Card 3: Prefix, Suffix & Addons
// ==========================================
const card3 = cardFrame('card-inputnumber-addons', 'Card · Prefix, Suffix & Addons', 1028, 280);
card3.children.push(...titleNodes(
  '3. Prefix, Suffix & Addons',
  'Comprehensive showcase of currency prefix, unit suffix, protocol addons, and prefix icons'
));

// Section 1
card3.children.push(labelText('Prefix Icons & Currency', 40, 84));
card3.children.push(instance('SiWnx', 'InputNumber · Prefix Icon', 40, 110, 480, 32, { prefixIcon: 'ClockCircleOutlined', value: 60, suffix: 'min' }));
card3.children.push(instance('SiWnx', 'InputNumber · Currency ¥', 40, 158, 480, 32, { prefix: '¥', value: '998.00' }));
card3.children.push(instance('SiWnx', 'InputNumber · Currency $ Formatter', 40, 206, 480, 32, { prefix: '$', value: 1250, formatter: true }));

// Section 2
card3.children.push(labelText('Addon Before & After Slots', 580, 84));
card3.children.push(instance('SiWnx', 'InputNumber · Addon Before', 580, 110, 480, 32, { addonBefore: '+86', value: 18888888888 }));
card3.children.push(instance('SiWnx', 'InputNumber · Addon Both', 580, 158, 480, 32, { addonBefore: 'https://', addonAfter: '.com', value: 1000 }));
card3.children.push(instance('SiWnx', 'InputNumber · Addon After', 580, 206, 480, 32, { addonAfter: 'USD', value: 50 }));

// Section 3
card3.children.push(labelText('Suffix & Units', 1120, 84));
card3.children.push(instance('SiWnx', 'InputNumber · Unit RMB', 1120, 110, 480, 32, { suffix: 'RMB', value: 100 }));
card3.children.push(instance('SiWnx', 'InputNumber · Unit % Formatter', 1120, 158, 480, 32, { suffix: '%', value: 100, formatter: true }));
card3.children.push(instance('SiWnx', 'InputNumber · Both Affix', 1120, 206, 480, 32, { prefix: '$', suffix: 'USD', value: 88 }));

// ==========================================
// Card 4: Advanced Modes, Precision & Validation
// ==========================================
const card4 = cardFrame('card-inputnumber-features', 'Card · Modes, Precision & Range', 1332, 290);
card4.children.push(...titleNodes(
  '4. Advanced Modes, Precision & Validation',
  'Showcase step spinner, high precision decimals (stringMode), thousandths/percentage formatters, and out-of-range validation'
));

// Col 1: Spinner
card4.children.push(labelText('Step Spinner Mode', 40, 84));
card4.children.push(instance('SiWnx', 'InputNumber · Spinner Outlined', 40, 110, 370, 32, { mode: 'spinner', variant: 'outlined', value: 3, min: 1, max: 10 }));
card4.children.push(instance('SiWnx', 'InputNumber · Spinner Filled', 40, 158, 370, 32, { mode: 'spinner', variant: 'filled', value: 5, min: 1, max: 10 }));
card4.children.push(instance('SiWnx', 'InputNumber · Spinner Disabled', 40, 206, 370, 32, { mode: 'spinner', disabled: true, value: 3 }));

// Col 2: High precision
card4.children.push(labelText('High Precision & Decimals', 450, 84));
card4.children.push(instance('SiWnx', 'InputNumber · High Precision stringMode', 450, 110, 370, 32, { value: '1.00000000000001', step: '0.00000000000001', stringMode: true }));
card4.children.push(instance('SiWnx', 'InputNumber · Precision 2', 450, 158, 370, 32, { value: '99.90', precision: 2 }));
card4.children.push(instance('SiWnx', 'InputNumber · Precision 3', 450, 206, 370, 32, { value: '100.000', precision: 3 }));

// Col 3: Formatter
card4.children.push(labelText('Number Formatter', 860, 84));
card4.children.push(instance('SiWnx', 'InputNumber · Formatter Currency $', 860, 110, 370, 32, { value: 1000, prefix: '$', formatter: true }));
card4.children.push(instance('SiWnx', 'InputNumber · Formatter Percentage %', 860, 158, 370, 32, { value: 100, suffix: '%', formatter: true }));
card4.children.push(instance('SiWnx', 'InputNumber · Formatter Currency ¥', 860, 206, 370, 32, { value: 1000000, prefix: '¥', formatter: true }));

// Col 4: Out of Range
card4.children.push(labelText('Out of Range Validation', 1270, 84));
card4.children.push(instance('SiWnx', 'InputNumber · Out of Range Upper', 1270, 110, 370, 32, { min: 1, max: 10, value: 99 }));
card4.children.push(instance('SiWnx', 'InputNumber · Out of Range Lower', 1270, 158, 370, 32, { min: 0, max: 100, value: -5 }));
card4.children.push(instance('SiWnx', 'InputNumber · Status Warning', 1270, 206, 370, 32, { status: 'warning', value: 99 }));

// Append all 4 cards to artboard
board.children.push(card1, card2, card3, card4);
board.height = 1680;

// Save to disk
fs.writeFileSync(penPath, JSON.stringify(pen, null, 2), 'utf8');
console.log('Successfully updated artboard-inputnumber-components with 100% English titles, subtitles, and labels!');
