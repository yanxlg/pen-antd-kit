import fs from 'node:fs';

const penPath = './libraries/antd-6.lib.pen';
const raw = fs.readFileSync(penPath, 'utf8');
const pen = JSON.parse(raw);

const de = pen.children.find(c => c.id === 'layer-data-entry');
if (!de) throw new Error('layer-data-entry not found');

const sec = de.children.find(c => c.id === 'section-input');
if (!sec) throw new Error('section-input not found');

const board = sec.children.find(c => c.id === 'artboard-input-components');
if (!board) throw new Error('artboard-input-components not found');

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

const master_iQ5uU = extractNode(board, 'iQ5uU');
const master_jSd6E = extractNode(board, 'jSd6E');
const master_W4V5K = extractNode(board, 'W4V5K');
const master_C8cDZ = extractNode(board, 'C8cDZ');
const master_QmpsX = extractNode(board, 'QmpsX');
const master_R98Eei = extractNode(board, 'R98Eei');

if (!master_iQ5uU || !master_jSd6E || !master_W4V5K || !master_C8cDZ || !master_QmpsX || !master_R98Eei) {
  throw new Error('Could not find all master nodes!');
}

console.log('Successfully extracted all 6 master nodes.');

// Remove Qi8t6 (old definition container)
const qiIdx = board.children.findIndex(c => c.id === 'Qi8t6');
if (qiIdx !== -1) {
  board.children.splice(qiIdx, 1);
  console.log('Removed old Qi8t6 container.');
}

// Helper to generate IDs
let idSeq = 1000;
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
  metadata: { type: 'antd-component-instance', antd: { component: name.split(' · ')[0], category: 'Data Entry', version: '6.6.4', example: name } }
});

// Card 1
const card1 = cardFrame('card-input-standard', 'Card · Standard Variants & Statuses', 160, 440);
card1.children.push(...titleNodes('1. 核心变体与交互状态交叉表 (Standard Variants & Statuses)', '解构官方三大经典形态（Outlined、Filled、Borderless、Underlined）在 Normal、Value、Warning、Error、Disabled 状态下的视觉呈现'));

const c1Cols = [
  { variant: 'outlined', label: 'Outlined (Default)', x: 180 },
  { variant: 'filled', label: 'Filled', x: 550 },
  { variant: 'borderless', label: 'Borderless', x: 920 },
  { variant: 'underlined', label: 'Underlined', x: 1290 }
];
for (const c of c1Cols) card1.children.push(colH(c.label, c.x));

// Row 1 Normal: master iQ5uU at Col 1
master_iQ5uU.x = 180;
master_iQ5uU.y = 115;
master_iQ5uU.width = 320;
master_iQ5uU.height = 32;
master_iQ5uU.inputs = { placeholder: '请输入内容', value: '', variant: 'outlined' };

card1.children.push(rowH('Normal', 115));
card1.children.push(master_iQ5uU);
card1.children.push(instance('iQ5uU', 'Input · Normal filled', 550, 115, 320, 32, { placeholder: 'Filled 输入框', variant: 'filled' }));
card1.children.push(instance('iQ5uU', 'Input · Normal borderless', 920, 115, 320, 32, { placeholder: 'Borderless 输入框', variant: 'borderless' }));
card1.children.push(instance('iQ5uU', 'Input · Normal underlined', 1290, 115, 320, 32, { placeholder: 'Underlined 输入框', variant: 'underlined' }));

// Row 2 Value
card1.children.push(rowH('Value', 175));
for (const col of c1Cols) card1.children.push(instance('iQ5uU', 'Input · Value ' + col.variant, col.x, 175, 320, 32, { value: 'Ant Design', variant: col.variant }));

// Row 3 Warning
card1.children.push(rowH('Warning', 235));
for (const col of c1Cols) card1.children.push(instance('iQ5uU', 'Input · Warning ' + col.variant, col.x, 235, 320, 32, { value: 'Warning input', status: 'warning', variant: col.variant }));

// Row 4 Error
card1.children.push(rowH('Error', 295));
for (const col of c1Cols) card1.children.push(instance('iQ5uU', 'Input · Error ' + col.variant, col.x, 295, 320, 32, { value: 'Error input', status: 'error', variant: col.variant }));

// Row 5 Disabled
card1.children.push(rowH('Disabled', 355));
for (const col of c1Cols) card1.children.push(instance('iQ5uU', 'Input · Disabled ' + col.variant, col.x, 355, 320, 32, { value: 'Disabled input', disabled: true, variant: col.variant }));

// Card 2
const card2 = cardFrame('card-input-sizes', 'Card · Sizes Matrix', 624, 340);
card2.children.push(...titleNodes('2. 尺寸规格矩阵 (Sizes Matrix)', '展示 Large (40px)、Middle (32px)、Small (24px) 三种标准尺寸在基础形态、带图标、带前后缀标签下的适配规则'));

const c2Cols = [
  { name: 'Standard Input', x: 180 },
  { name: 'Prefix / Suffix Icon', x: 550 },
  { name: 'Addon Before / After', x: 920 },
  { name: 'AllowClear & Value', x: 1330 }
];
for (const c of c2Cols) card2.children.push(colH(c.name, c.x));

const sizeRows = [
  { name: 'Large (40px)', size: 'large', h: 40, y: 115 },
  { name: 'Middle (32px)', size: 'middle', h: 32, y: 180 },
  { name: 'Small (24px)', size: 'small', h: 24, y: 240 }
];
for (const r of sizeRows) {
  card2.children.push(rowH(r.name, r.y));
  card2.children.push(instance('iQ5uU', 'Input · ' + r.size + ' standard', 180, r.y, 320, r.h, { size: r.size, placeholder: r.size + ' size' }));
  card2.children.push(instance('iQ5uU', 'Input · ' + r.size + ' with icons', 550, r.y, 320, r.h, { size: r.size, placeholder: 'User info', prefixIcon: 'UserOutlined', suffixIcon: 'InfoCircleOutlined' }));
  card2.children.push(instance('iQ5uU', 'Input · ' + r.size + ' with addons', 920, r.y, 380, r.h, { size: r.size, value: 'ant.design', addonBefore: 'https://', addonAfter: '.com' }));
  card2.children.push(instance('iQ5uU', 'Input · ' + r.size + ' allowClear', 1330, r.y, 300, r.h, { size: r.size, value: 'Clearable content', allowClear: true }));
}

// Card 3
const card3 = cardFrame('card-input-addons', 'Card · Prefix, Suffix & Addons', 988, 300);
card3.children.push(...titleNodes('3. 前缀/后缀与复合标签 (Prefix, Suffix & Addons)', '覆盖图标前后缀、货币/单位前后缀、前后置标签以及字数统计与一键清除的全量特性呈现'));

card3.children.push(labelText('图标前后缀 (Prefix & Suffix Icons)', 40, 84));
card3.children.push(instance('iQ5uU', 'Input · Prefix & Suffix Icons', 40, 110, 480, 32, { prefixIcon: 'UserOutlined', suffixIcon: 'InfoCircleOutlined', placeholder: '请输入用户名或工号' }));

card3.children.push(labelText('货币与单位前后缀 (Currency & Unit)', 580, 84));
card3.children.push(instance('iQ5uU', 'Input · Currency & Unit', 580, 110, 480, 32, { prefix: '¥', suffix: 'RMB', value: '100' }));

card3.children.push(labelText('网络协议前后置标签 (URL Addons)', 1120, 84));
card3.children.push(instance('iQ5uU', 'Input · URL Addons', 1120, 110, 480, 32, { addonBefore: 'https://', addonAfter: '.com', value: 'ant.design' }));

card3.children.push(labelText('一键清除按钮 (Allow Clear)', 40, 174));
card3.children.push(instance('iQ5uU', 'Input · Allow Clear', 40, 200, 480, 32, { allowClear: true, value: '点击右侧清除图标可快速清空' }));

card3.children.push(labelText('字符计数器 (Character Count)', 580, 174));
card3.children.push(instance('iQ5uU', 'Input · Character Count', 580, 200, 480, 32, { showCount: true, maxLength: 20, value: 'Ant Design 6.0' }));

card3.children.push(labelText('前置协议标签 (Addon Before)', 1120, 174));
card3.children.push(instance('iQ5uU', 'Input · Addon Before', 1120, 200, 480, 32, { addonBefore: 'http://', value: 'mysite' }));

// Card 4
const card4 = cardFrame('card-input-specialized', 'Card · Search, Password & OTP Sub-components', 1312, 450);
card4.children.push(...titleNodes('4. 专用输入框子组件 (Search, Password, OTP)', 'Input.Search 搜索框、Input.Password 密码框、Input.OTP 验证码专用子组件的完整形态与交互状态'));

card4.children.push(labelText('Input.Search 搜索框：基础图标 / 文本按钮 / 主题按钮 / 加载中', 40, 84));
master_W4V5K.x = 40;
master_W4V5K.y = 110;
master_W4V5K.width = 360;
master_W4V5K.height = 32;
master_W4V5K.inputs = { placeholder: 'input search text' };
card4.children.push(master_W4V5K);
card4.children.push(instance('W4V5K', 'Input.Search · Text button', 440, 110, 380, 32, { enterButton: 'Search', placeholder: 'input search text' }));
card4.children.push(instance('W4V5K', 'Input.Search · Primary button', 860, 110, 380, 32, { enterButton: 'true', placeholder: 'input search text' }));
card4.children.push(instance('W4V5K', 'Input.Search · Loading', 1280, 110, 340, 32, { enterButton: 'true', loading: true, placeholder: 'searching...' }));

card4.children.push(labelText('Input.Password 密码框：默认掩码 / 明文可见 / 校验错误 / 禁用状态', 40, 194));
master_C8cDZ.x = 40;
master_C8cDZ.y = 220;
master_C8cDZ.width = 360;
master_C8cDZ.height = 32;
master_C8cDZ.inputs = { value: 'password123', visibilityToggle: true };
card4.children.push(master_C8cDZ);
card4.children.push(instance('C8cDZ', 'Input.Password · Visible', 440, 220, 380, 32, { value: 'password123', visibilityToggle: true }));
card4.children.push(instance('C8cDZ', 'Input.Password · Error', 860, 220, 380, 32, { value: 'wrong_pwd', status: 'error' }));
card4.children.push(instance('C8cDZ', 'Input.Password · Disabled', 1280, 220, 340, 32, { value: 'disabled_pwd', disabled: true }));

card4.children.push(labelText('Input.OTP 验证码输入：6位标准 / 4位短码 / 掩码模式 / 错误与禁用', 40, 304));
master_QmpsX.x = 40;
master_QmpsX.y = 330;
master_QmpsX.width = 320;
master_QmpsX.height = 32;
master_QmpsX.inputs = { length: 6, value: '123456' };
card4.children.push(master_QmpsX);
card4.children.push(instance('QmpsX', 'Input.OTP · 4 Digits', 400, 330, 220, 32, { length: 4, value: '8888' }));
card4.children.push(instance('QmpsX', 'Input.OTP · Masked', 660, 330, 320, 32, { length: 6, mask: '•', value: '654321' }));
card4.children.push(instance('QmpsX', 'Input.OTP · Error', 1020, 330, 320, 32, { length: 6, status: 'error', value: '123' }));
card4.children.push(instance('QmpsX', 'Input.OTP · Disabled', 1380, 330, 240, 32, { length: 6, disabled: true, value: '123456' }));

// Card 5
const card5 = cardFrame('card-input-textarea', 'Card · Input.TextArea Matrix', 1786, 380);
card5.children.push(...titleNodes('5. 多行文本域 (Input.TextArea)', '支持多行输入、自适应高度、带清除按钮与字数统计的多行文本输入规格'));

card5.children.push(labelText('常用特性：标准 4 行 / 默认内容 / 字符统计 / 一键清除', 40, 84));
master_jSd6E.x = 40;
master_jSd6E.y = 110;
master_jSd6E.width = 380;
master_jSd6E.height = 98;
master_jSd6E.inputs = { placeholder: '请输入多行文本内容...', rows: 4 };
card5.children.push(master_jSd6E);
card5.children.push(instance('jSd6E', 'Input.TextArea · Value', 450, 110, 380, 98, { value: 'Ant Design 是蚂蚁集团的企业级产品设计体系...', rows: 4 }));
card5.children.push(instance('jSd6E', 'Input.TextArea · Character Count', 860, 110, 380, 98, { showCount: true, maxLength: 100, value: '已输入字符统计展示内容...', rows: 4 }));
card5.children.push(instance('jSd6E', 'Input.TextArea · AllowClear', 1270, 110, 350, 98, { allowClear: true, value: '支持右上角一键清除内容', rows: 4 }));

card5.children.push(labelText('变体与校验状态：Filled 变体 / Borderless 无边框 / Warning 警告 / Error 错误', 40, 228));
card5.children.push(instance('jSd6E', 'Input.TextArea · Filled', 40, 254, 380, 76, { variant: 'filled', rows: 3, placeholder: 'Filled 变体多行文本' }));
card5.children.push(instance('jSd6E', 'Input.TextArea · Borderless', 450, 254, 380, 76, { variant: 'borderless', rows: 3, placeholder: 'Borderless 变体多行文本' }));
card5.children.push(instance('jSd6E', 'Input.TextArea · Warning', 860, 254, 380, 76, { status: 'warning', rows: 3, value: '警告状态多行文本' }));
card5.children.push(instance('jSd6E', 'Input.TextArea · Error', 1270, 254, 350, 76, { status: 'error', rows: 3, value: '错误状态多行文本' }));

// Card 6
const card6 = cardFrame('card-input-group', 'Card · Input.Group Combinations', 2190, 240);
card6.children.push(...titleNodes('6. 输入框组合与紧凑布局 (Input.Group)', '解构多个输入组件紧凑组合时的边框贴合、圆角过渡与跨尺寸配合呈现'));

card6.children.push(labelText('组合模式：紧凑组合 (Compact) / 大尺寸紧凑 / 小尺寸紧凑 / 默认分散模式', 40, 84));
master_R98Eei.x = 40;
master_R98Eei.y = 110;
master_R98Eei.width = 380;
master_R98Eei.height = 32;
master_R98Eei.inputs = { compact: true, size: 'default' };
card6.children.push(master_R98Eei);
card6.children.push(instance('R98Eei', 'Input.Group · Large', 450, 110, 400, 40, { compact: true, size: 'large' }));
card6.children.push(instance('R98Eei', 'Input.Group · Small', 880, 110, 340, 24, { compact: true, size: 'small' }));
card6.children.push(instance('R98Eei', 'Input.Group · Non-compact', 1250, 110, 370, 32, { compact: false, size: 'default' }));

// Add all 6 cards to board
board.children.push(card1, card2, card3, card4, card5, card6);

const totalHeight = 2190 + 240 + 64; // 2494
board.height = totalHeight;
board.layout = 'none';

// Update section-input height
const usage = sec.children.find(c => c.id === 'artboard-input-usage');
const principles = sec.children.find(c => (c.name || '').startsWith('Principles'));
const maxH = Math.max(totalHeight, Number(usage?.height) || 0, Number(principles?.height) || 0) + 120;
sec.height = maxH;

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log('Successfully wrote updated Input Components artboard to antd-6.lib.pen!');
