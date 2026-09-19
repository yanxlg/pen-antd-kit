import fs from 'fs';

const penPath = './libraries/antd-6.lib.pen';
const raw = fs.readFileSync(penPath, 'utf8');
const pen = JSON.parse(raw);

function makeId(prefix = 'u') {
  return prefix + '_' + Math.random().toString(36).substr(2, 6);
}

function findNode(nodes, id) {
  if (!nodes) return null;
  const list = Array.isArray(nodes) ? nodes : [nodes];
  for (const n of list) {
    if (!n) continue;
    if (n.id === id) return n;
    if (n.children) {
      const res = findNode(n.children, id);
      if (res) return res;
    }
  }
  return null;
}

const general = pen.children.find(c => c.id === 'layer-general');
if (!general) {
  console.error('layer-general not found!');
  process.exit(1);
}

console.log('=== Step 1: Upgrading FloatButton Components & Live Origin ===');
const fbSection = general.children.find(c => c.id === 'section-floatbutton');
const fbComps = fbSection.children.find(c => c.id === 'artboard-floatbutton-components');

// Set Components artboard to 1728px
fbComps.width = 1728;
fbComps.height = 1680;
fbComps.layout = 'vertical';
fbComps.padding = 32;
fbComps.gap = 24;

// Create reusable live origin for FloatButton
const fbLiveOrigin = {
  type: 'script',
  id: 'antd-floatbutton-live-origin',
  name: 'Antd/Live/FloatButton',
  reusable: true,
  metadata: {
    type: 'antd-component',
    antd: {
      component: 'FloatButton',
      category: 'General',
      version: '6.4.3',
      props: {},
      tokens: {}
    }
  },
  width: 40,
  height: 40,
  scriptUri: '../canvas-components/FloatButton.js',
  inputs: {
    shape: 'circle',
    type: 'default',
    icon: '',
    description: '',
    content: '',
    badge: 0,
    badgeDot: false,
    disabled: false,
    isBackTop: false,
    state: 'normal'
  }
};

function createFloatBtn(name, inputs, extra = {}) {
  const isSquare = inputs.shape === 'square';
  const hasContent = Boolean(inputs.content || inputs.description);
  let w = 40;
  let h = 40;
  if (hasContent) {
    const rawContent = String(inputs.content || inputs.description);
    h = rawContent.length > 2 ? 64 : 56;
  }
  return {
    type: 'ref',
    ref: 'antd-floatbutton-live-origin',
    id: makeId('fb'),
    name: name || `FloatBtn · ${inputs.content || inputs.icon || inputs.shape || 'Default'}`,
    width: extra.width || w,
    height: extra.height || h,
    inputs: { ...inputs },
    ...extra
  };
}

function makeMatrixCard(id, title, desc, rows) {
  return {
    type: 'frame',
    id: id || makeId('c'),
    name: `Card · ${title}`,
    width: 'fill_container',
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#0505050F',
    strokeWidth: 1,
    strokeAlignment: 'inner',
    layout: 'vertical',
    padding: [24, 28, 24, 28],
    gap: 16,
    children: [
      {
        type: 'frame',
        id: makeId('header'),
        name: 'Card Header',
        layout: 'vertical',
        gap: 4,
        children: [
          { type: 'text', id: makeId('t'), content: title, fill: '#000000E0', fontFamily: 'Inter', fontSize: 16, fontWeight: '600' },
          { type: 'text', id: makeId('d'), content: desc, fill: '#00000073', fontFamily: 'Inter', fontSize: 12 }
        ]
      },
      ...rows
    ]
  };
}

function makeRow(label, items) {
  return {
    type: 'frame',
    id: makeId('row'),
    name: `Row · ${label}`,
    layout: 'horizontal',
    gap: 20,
    alignItems: 'center',
    children: [
      { type: 'text', id: makeId('lbl'), content: label, fill: '#1677FF', fontFamily: 'Inter', fontSize: 13, fontWeight: '500', width: 140 },
      ...items
    ]
  };
}

// 4 Standard 1664px Specification Matrix Cards for FloatButton
const fbMatrixCard1 = makeMatrixCard(
  'fb-matrix-basic',
  'Basic Variants & States · 基础变体与交互状态',
  '支持 Circle (圆形默认 40×40) 与 Square (方形 R8 40×40)，具备 Default 与 Primary 两种类型及 Normal/Hover/Active/Disabled 交互态',
  [
    makeRow('Circle Default', [
      createFloatBtn('Default Normal', { shape: 'circle', type: 'default', state: 'normal' }),
      createFloatBtn('Default Hover', { shape: 'circle', type: 'default', state: 'hover' }),
      createFloatBtn('Default Active', { shape: 'circle', type: 'default', state: 'active' }),
      createFloatBtn('Default Disabled', { shape: 'circle', type: 'default', disabled: true })
    ]),
    makeRow('Circle Primary', [
      createFloatBtn('Primary Normal', { shape: 'circle', type: 'primary', state: 'normal' }),
      createFloatBtn('Primary Hover', { shape: 'circle', type: 'primary', state: 'hover' }),
      createFloatBtn('Primary Active', { shape: 'circle', type: 'primary', state: 'active' }),
      createFloatBtn('Primary Disabled', { shape: 'circle', type: 'primary', disabled: true })
    ]),
    makeRow('Square Primary', [
      createFloatBtn('Square Primary Normal', { shape: 'square', type: 'primary', state: 'normal' }),
      createFloatBtn('Square Primary Hover', { shape: 'square', type: 'primary', state: 'hover' }),
      createFloatBtn('Square Primary Active', { shape: 'square', type: 'primary', state: 'active' }),
      createFloatBtn('Square Primary Disabled', { shape: 'square', type: 'primary', disabled: true })
    ])
  ]
);

const fbMatrixCard2 = makeMatrixCard(
  'fb-matrix-content',
  'Icons & Text-only Content · 图标与图文/纯文本描述',
  '全量对齐官方 FileTextOutlined 缺省图标、问号、客服耳机等常用矢量，并规范纯文本两行居中与图文混排自适应高度',
  [
    makeRow('Icon Shapes', [
      createFloatBtn('Default FileText', { shape: 'circle', type: 'default' }),
      createFloatBtn('Question Circle', { shape: 'circle', type: 'primary', icon: 'question' }),
      createFloatBtn('CustomerService Circle', { shape: 'circle', type: 'primary', icon: 'customer-service' }),
      createFloatBtn('CustomerService Square', { shape: 'square', type: 'primary', icon: 'customer-service' }),
      createFloatBtn('Sync Square', { shape: 'square', type: 'default', icon: 'sync' })
    ]),
    makeRow('Content & Descriptions', [
      createFloatBtn('Square Icon + HELP INFO', { shape: 'square', type: 'default', icon: 'file-text', content: 'HELP INFO' }),
      createFloatBtn('Square Text-only HELP INFO', { shape: 'square', type: 'default', content: 'HELP INFO' }),
      createFloatBtn('Square Icon + HELP', { shape: 'square', type: 'default', icon: 'file-text', content: 'HELP' }),
      createFloatBtn('Square Text-only HELP', { shape: 'square', type: 'default', content: 'HELP' })
    ])
  ]
);

const fbMatrixCard3 = makeMatrixCard(
  'fb-matrix-badges',
  'Badge & BackTop · 徽标角标提示与回到顶部',
  '支持小红点 dot、独立数字、99+ 截断角标；BackTop 默认内置 VerticalAlignTopOutlined 矢量置顶图标',
  [
    makeRow('Badge Dot & Count', [
      createFloatBtn('Badge Dot', { shape: 'circle', type: 'default', badgeDot: true }),
      createFloatBtn('Badge Count 5', { shape: 'circle', type: 'default', badge: 5 }),
      createFloatBtn('Badge Count 12', { shape: 'circle', type: 'default', badge: 12 }),
      createFloatBtn('Badge Overflow 99+', { shape: 'circle', type: 'default', badge: 123 })
    ]),
    makeRow('BackTop (Scroll To Top)', [
      createFloatBtn('BackTop Circle', { shape: 'circle', type: 'default', isBackTop: true }),
      createFloatBtn('BackTop Square', { shape: 'square', type: 'default', isBackTop: true }),
      createFloatBtn('BackTop Primary', { shape: 'circle', type: 'primary', isBackTop: true })
    ])
  ]
);

fbComps.children = [
  {
    type: 'text',
    id: 'floatbutton-c-title',
    fill: '#000000',
    content: 'Components',
    fontFamily: 'Inter',
    fontSize: 80,
    fontWeight: '700'
  },
  fbLiveOrigin,
  fbMatrixCard1,
  fbMatrixCard2,
  fbMatrixCard3
];
console.log('FloatButton Components artboard upgraded successfully!');

console.log('=== Step 2: Replacing Usage Artboard FloatButtons with Live Refs ===');
const fbUsage = fbSection.children.find(c => c.id === 'artboard-floatbutton-usage');
const ryQhM = fbUsage.children[1].children[1].children[0];
const col0 = ryQhM.children[0];
const col1 = ryQhM.children[1];

// 1. Basic (b3QBa6) -> Preview MAuqV
const pBasic = findNode(col0, 'MAuqV');
if (pBasic) {
  pBasic.children = [
    createFloatBtn('FloatBtn · Basic Default', { shape: 'circle', type: 'default' }, { layoutPosition: 'absolute', x: 758, y: 296 })
  ];
}

// 2. Shape (r4yVJ) -> Preview t0I3xk -> Z1N2VY
const pShape = findNode(col0, 'Z1N2VY');
if (pShape) {
  pShape.children = [
    createFloatBtn('FloatBtn · Circle CustomerService', { shape: 'circle', type: 'primary', icon: 'customer-service' }, { layoutPosition: 'absolute', x: 688, y: 296 }),
    createFloatBtn('FloatBtn · Square CustomerService', { shape: 'square', type: 'primary', icon: 'customer-service' }, { layoutPosition: 'absolute', x: 758, y: 296 })
  ];
}

// 3. Tooltip (mrZsa) -> Preview yaJHH
const pTooltip = findNode(col0, 'yaJHH');
if (pTooltip) {
  pTooltip.children = [
    createFloatBtn('FloatBtn · Tooltip Top', { shape: 'circle', type: 'default' }, { layoutPosition: 'absolute', x: 758, y: 236 }),
    createFloatBtn('FloatBtn · Tooltip Documents', { shape: 'circle', type: 'default' }, { layoutPosition: 'absolute', x: 758, y: 296 })
  ];
}

// 4. Menu mode (K9hjtD) -> Preview G8oSaE
const pMenu = findNode(col0, 'G8oSaE');
if (pMenu) {
  pMenu.children = [
    {
      type: 'frame',
      id: makeId('menu_group_hover'),
      name: 'Group · Hover',
      layoutPosition: 'absolute',
      x: 688,
      y: 184,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Menu Item 1', { shape: 'circle', type: 'default', icon: 'file-text' }),
        createFloatBtn('Menu Item 2', { shape: 'circle', type: 'default', icon: 'comment' }),
        createFloatBtn('Menu Main Trigger', { shape: 'circle', type: 'primary', icon: 'customer-service' })
      ]
    },
    {
      type: 'frame',
      id: makeId('menu_group_click'),
      name: 'Group · Click',
      layoutPosition: 'absolute',
      x: 758,
      y: 184,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Menu Item 1', { shape: 'circle', type: 'default', icon: 'file-text' }),
        createFloatBtn('Menu Item 2', { shape: 'circle', type: 'default', icon: 'comment' }),
        createFloatBtn('Menu Main Trigger', { shape: 'circle', type: 'primary', icon: 'customer-service' })
      ]
    }
  ];
}

// 5. BackTop (W1hU7s) -> Preview BX1mx
const pBackTop = findNode(col0, 'BX1mx');
if (pBackTop) {
  // Retain Hint texts
  const hints = pBackTop.children.filter(c => c.name === 'Hint' || c.type === 'text');
  pBackTop.children = [
    ...hints,
    createFloatBtn('FloatBtn · BackTop Circle', { shape: 'circle', type: 'default', isBackTop: true }, { layoutPosition: 'absolute', x: 688, y: 296 }),
    createFloatBtn('FloatBtn · BackTop Square', { shape: 'square', type: 'default', isBackTop: true }, { layoutPosition: 'absolute', x: 758, y: 296 })
  ];
}

// 6. Badge (DQN3u) -> Preview oyNny
const pBadge = findNode(col0, 'oyNny');
if (pBadge) {
  pBadge.children = [
    createFloatBtn('FloatBtn · Badge Dot', { shape: 'circle', type: 'default', badgeDot: true }, { layoutPosition: 'absolute', x: 618, y: 296 }),
    {
      type: 'frame',
      id: makeId('badge_grp_1'),
      name: 'Group · Badge 5',
      layoutPosition: 'absolute',
      x: 688,
      y: 240,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Badge 5 Blue', { shape: 'circle', type: 'default', badge: 5, primaryColor: '#1677FF' }),
        createFloatBtn('Badge 5 Normal', { shape: 'circle', type: 'default', badge: 5 })
      ]
    },
    {
      type: 'frame',
      id: makeId('badge_grp_2'),
      name: 'Group · Badge 12 & Overflow',
      layoutPosition: 'absolute',
      x: 758,
      y: 184,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Badge 12', { shape: 'circle', type: 'default', badge: 12 }),
        createFloatBtn('Badge 123 Overflow', { shape: 'circle', type: 'default', badge: 123 }),
        createFloatBtn('Badge BackTop', { shape: 'circle', type: 'default', isBackTop: true })
      ]
    }
  ];
}

// 7. Type (rgNFZ) -> Preview pg5F7
const pType = findNode(col1, 'pg5F7');
if (pType) {
  pType.children = [
    createFloatBtn('FloatBtn · Question Default', { shape: 'circle', type: 'default', icon: 'question' }, { layoutPosition: 'absolute', x: 688, y: 296 }),
    createFloatBtn('FloatBtn · Question Primary', { shape: 'circle', type: 'primary', icon: 'question' }, { layoutPosition: 'absolute', x: 758, y: 296 })
  ];
}

// 8. Content / Description (vf7D8) -> Preview nd2Az
const pContent = findNode(col1, 'nd2Az');
if (pContent) {
  pContent.children = [
    createFloatBtn('FloatBtn · Square HELP INFO with Icon', { shape: 'square', type: 'default', icon: 'file-text', content: 'HELP INFO' }, { layoutPosition: 'absolute', x: 618, y: 272 }),
    createFloatBtn('FloatBtn · Square HELP INFO Text-only', { shape: 'square', type: 'default', content: 'HELP INFO' }, { layoutPosition: 'absolute', x: 688, y: 272 }),
    createFloatBtn('FloatBtn · Square HELP with Icon', { shape: 'square', type: 'default', icon: 'file-text', content: 'HELP' }, { layoutPosition: 'absolute', x: 758, y: 280 })
  ];
}

// 9. Group (R0z5nT) -> Preview SRdEY
const pGroup = findNode(col1, 'SRdEY');
if (pGroup) {
  pGroup.children = [
    {
      type: 'frame',
      id: makeId('group_circle'),
      name: 'Group · Circle',
      layoutPosition: 'absolute',
      x: 688,
      y: 184,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Group Circle Question', { shape: 'circle', type: 'default', icon: 'question' }),
        createFloatBtn('Group Circle FileText', { shape: 'circle', type: 'default' }),
        createFloatBtn('Group Circle BackTop', { shape: 'circle', type: 'default', isBackTop: true })
      ]
    },
    {
      type: 'frame',
      id: makeId('group_square'),
      name: 'Group · Square',
      layoutPosition: 'absolute',
      x: 758,
      y: 128,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Group Square Question', { shape: 'square', type: 'default', icon: 'question' }),
        createFloatBtn('Group Square FileText', { shape: 'square', type: 'default' }),
        createFloatBtn('Group Square Sync', { shape: 'square', type: 'default', icon: 'sync' }),
        createFloatBtn('Group Square BackTop', { shape: 'square', type: 'default', isBackTop: true })
      ]
    }
  ];
}

// 10. Controlled mode (XVIoO) -> Preview ZBYu9
const pControlled = findNode(col1, 'ZBYu9');
if (pControlled) {
  const switchBtn = pControlled.children.find(c => c.id === 'p8sQ1');
  pControlled.children = [
    switchBtn || { type: 'frame', id: makeId('switch'), layoutPosition: 'absolute', x: 24, y: 24, width: 44, height: 22, fill: '#1677FF', cornerRadius: 100 },
    {
      type: 'frame',
      id: makeId('controlled_grp_1'),
      name: 'Controlled Group 1',
      layoutPosition: 'absolute',
      x: 688,
      y: 184,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Ctrl Item 1', { shape: 'square', type: 'default', icon: 'question' }),
        createFloatBtn('Ctrl Item 2', { shape: 'square', type: 'default', icon: 'sync' }),
        createFloatBtn('Ctrl Item 3', { shape: 'square', type: 'primary', isBackTop: true })
      ]
    },
    {
      type: 'frame',
      id: makeId('controlled_grp_2'),
      name: 'Controlled Group 2',
      layoutPosition: 'absolute',
      x: 758,
      y: 184,
      width: 40,
      layout: 'vertical',
      gap: 16,
      children: [
        createFloatBtn('Ctrl Item A', { shape: 'circle', type: 'default', icon: 'question' }),
        createFloatBtn('Ctrl Item B', { shape: 'circle', type: 'default', icon: 'sync' }),
        createFloatBtn('Ctrl Item C', { shape: 'circle', type: 'primary', isBackTop: true })
      ]
    }
  ];
}

// 11. Draggable (YOv1R) -> Preview dFQLm
const pDraggable = findNode(col1, 'dFQLm');
if (pDraggable) {
  pDraggable.children = [
    createFloatBtn('FloatBtn · Draggable Default', { shape: 'circle', type: 'default' }, { layoutPosition: 'absolute', x: 391, y: 160 })
  ];
}

console.log('FloatButton Usage artboard replaced with Live Refs successfully!');

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log('Updated libraries/antd-6.lib.pen for FloatButton!');
