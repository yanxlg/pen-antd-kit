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
const typoSection = general.children.find(c => c.id === 'section-typography');

console.log('=== Step 1: Standardizing Typography Components Artboard to 1728px ===');
const typoComps = typoSection.children.find(c => c.id === 'artboard-typography-components');
typoComps.width = 1728;
typoComps.height = 2380;
typoComps.layout = 'vertical';
typoComps.padding = 32;
typoComps.gap = 24;

// Create reusable live origin for Typography
const typoLiveOrigin = {
  type: 'script',
  id: 'antd-typography-live-origin',
  name: 'Antd/Live/Typography',
  reusable: true,
  metadata: {
    type: 'antd-component',
    antd: {
      component: 'Typography',
      category: 'General',
      version: '6.4.3',
      props: {},
      tokens: {}
    }
  },
  width: 280,
  height: 38,
  scriptUri: '../canvas-components/Typography.js',
  inputs: {
    component: 'Title',
    content: 'Ant Design 排版体系',
    level: '1',
    type: 'default',
    strong: false,
    italic: false,
    underline: false,
    delete: false,
    code: false,
    mark: false,
    keyboard: false,
    disabled: false,
    copyable: false,
    editable: false,
    ellipsis: false,
    color: ''
  }
};

function createTypo(name, inputs, extra = {}) {
  let w = 240;
  let h = 24;
  if (inputs.component === 'Title') {
    switch (String(inputs.level)) {
      case '1': h = 46; w = 320; break;
      case '2': h = 38; w = 280; break;
      case '3': h = 32; w = 240; break;
      case '4': h = 28; w = 220; break;
      case '5': h = 24; w = 200; break;
      default: h = 46; w = 320;
    }
  } else if (inputs.component === 'Paragraph') {
    h = 44;
    w = 600;
  }
  return {
    type: 'ref',
    ref: 'antd-typography-live-origin',
    id: makeId('typo'),
    name: name || `Typo · ${inputs.component || 'Text'}`,
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

function makeRow(label, items, extra = {}) {
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
    ],
    ...extra
  };
}

// 4 Standard 1664px Specification Matrix Cards for Typography
const typoMatrixCard1 = makeMatrixCard(
  'typo-matrix-titles',
  'Title Levels Matrix · 标题层级与字阶系统',
  '严格遵循 Ant Design 6.x 动态秩序与五级标题字阶标尺（h1: 38px/46px, h2: 30px/38px, h3: 24px/32px, h4: 20px/28px, h5: 16px/24px）',
  [
    makeRow('Level 1 (38px)', [
      createTypo('h1. Ant Design', { component: 'Title', level: '1', content: 'h1. Ant Design · 页面主标题' })
    ]),
    makeRow('Level 2 (30px)', [
      createTypo('h2. Ant Design', { component: 'Title', level: '2', content: 'h2. Ant Design · 模块标题' })
    ]),
    makeRow('Level 3 (24px)', [
      createTypo('h3. Ant Design', { component: 'Title', level: '3', content: 'h3. Ant Design · 区块标题' })
    ]),
    makeRow('Level 4 (20px)', [
      createTypo('h4. Ant Design', { component: 'Title', level: '4', content: 'h4. Ant Design · 卡片级标题' })
    ]),
    makeRow('Level 5 (16px)', [
      createTypo('h5. Ant Design', { component: 'Title', level: '5', content: 'h5. Ant Design · 列表/分组副标题' })
    ])
  ]
);

const typoMatrixCard2 = makeMatrixCard(
  'typo-matrix-text-types',
  'Text Semantic Types & States · 正文语义色彩与禁用态',
  '满足 WCAG AAA 级无障碍阅读对比度标准，支持 Default (88%)、Secondary (45%)、Success、Warning、Danger 及 Disabled 禁用态',
  [
    makeRow('Semantic Types', [
      createTypo('Text Default', { component: 'Text', type: 'default', content: 'Ant Design (default)' }),
      createTypo('Text Secondary', { component: 'Text', type: 'secondary', content: 'Ant Design (secondary)' }),
      createTypo('Text Success', { component: 'Text', type: 'success', content: 'Ant Design (success)' }),
      createTypo('Text Warning', { component: 'Text', type: 'warning', content: 'Ant Design (warning)' }),
      createTypo('Text Danger', { component: 'Text', type: 'danger', content: 'Ant Design (danger)' })
    ]),
    makeRow('Interactive States', [
      createTypo('Text Disabled', { component: 'Text', disabled: true, content: 'Ant Design (disabled)' }),
      createTypo('Link Default', { component: 'Link', content: 'Ant Design (Link)' }),
      createTypo('Link Disabled', { component: 'Link', disabled: true, content: 'Ant Design (Link Disabled)' })
    ])
  ]
);

const typoMatrixCard3 = makeMatrixCard(
  'typo-matrix-modifiers',
  'Modifiers & Syntax · 排版修饰样式与语法语义',
  '包含行内代码块 code、快捷键 keyboard、高亮 mark、加粗 strong、斜体 italic、下划线 underline 及删除线 delete',
  [
    makeRow('Inline Code & Mark', [
      createTypo('Code Tag', { component: 'Text', code: true, content: 'npm i ant-design' }),
      createTypo('Keyboard Tag', { component: 'Text', keyboard: true, content: 'Ctrl + C' }),
      createTypo('Mark Highlight', { component: 'Text', mark: true, content: 'Ant Design (mark)' })
    ]),
    makeRow('Text Formatting', [
      createTypo('Text Strong', { component: 'Text', strong: true, content: 'Ant Design (bold)' }),
      createTypo('Text Italic', { component: 'Text', italic: true, content: 'Ant Design (italic)' }),
      createTypo('Text Underline', { component: 'Text', underline: true, content: 'Ant Design (underline)' }),
      createTypo('Text Delete', { component: 'Text', delete: true, content: 'Ant Design (delete)' })
    ])
  ]
);

const typoMatrixCard4 = makeMatrixCard(
  'typo-matrix-interactive',
  'Interactive Features & Paragraphs · 复制/编辑交互与多行文本',
  '提供一键复制 copyable、实时行内编辑 editable 交互，以及段落 Paragraph 文本流规范',
  [
    makeRow('Copyable & Editable', [
      createTypo('Editable Text', { component: 'Text', editable: true, content: 'This is an editable text.' }),
      createTypo('Copyable Text', { component: 'Text', copyable: true, content: 'This is a copyable text.' }),
      createTypo('Editable + Copyable', { component: 'Text', editable: true, copyable: true, content: 'Copyable & Editable Text' })
    ]),
    makeRow('Paragraph Block', [
      createTypo('Paragraph Regular', {
        component: 'Paragraph',
        content: 'Ant Design，一套深入企业级中后台体验设计的企业级设计语言与产品解决方案，以动态秩序与五大排版原则贯穿系统。'
      })
    ])
  ]
);

typoComps.children = [
  {
    type: 'text',
    id: 'typography-c-title',
    fill: '#000000',
    content: 'Components',
    fontFamily: 'Inter',
    fontSize: 80,
    fontWeight: '700'
  },
  typoLiveOrigin,
  typoMatrixCard1,
  typoMatrixCard2,
  typoMatrixCard3,
  typoMatrixCard4
];
console.log('Typography Components artboard rebuilt and standardized to 1728px!');

console.log('=== Step 2: Fixing Usage Artboard Double Header & Overlapping Issues ===');
const typoUsage = typoSection.children.find(c => c.id === 'artboard-typography-usage');
const uc = typoUsage.children[1]; // Usage Content (dRmh3)
const ne = uc.children[1]; // neDej cards container

// Fix 1: Card 0 (R4Lc9) - Remove huge document headers and make it clean "Basic Document Demo"
const card0 = findNode(ne, 'R4Lc9');
if (card0) {
  const p0 = card0.children[0]; // i1Nzs2
  p0.layout = 'vertical';
  p0.height = undefined;
  p0.padding = [32, 28, 32, 28];
  p0.gap = 16;
  p0.children = [
    createTypo('Doc H1', { component: 'Title', level: '1', content: 'Introduction · 排版介绍' }),
    createTypo('Doc P1', {
      component: 'Paragraph',
      content: '在企业级桌面应用开发过程中，排版规范直接决定了用户的阅读效率和信息获取体验。'
    }),
    createTypo('Doc H2', { component: 'Title', level: '2', content: 'Design Guidelines · 设计原则' }),
    createTypo('Doc P2', {
      component: 'Paragraph',
      content: '我们提供完善的字阶与行高比率、字体族推荐、文本语义色体系，保证清晰的信息层级传达。'
    })
  ];
}

// Fix 2: Card 3 (HVI8u) - Replace layout: "none" with vertical auto-layout to eliminate 15 overlapping layers!
const card3 = findNode(ne, 'HVI8u');
if (card3) {
  const p3 = card3.children[0]; // KuHGr
  p3.layout = 'vertical';
  p3.height = undefined;
  p3.padding = [32, 28, 32, 28];
  p3.gap = 14;
  p3.children = [
    createTypo('Editable Text 1', { component: 'Text', editable: true, content: 'This is an editable text.' }),
    createTypo('Editable Text Long', { component: 'Text', editable: true, content: 'This is a long editable text with customized suffix.' }),
    createTypo('Editable Custom Tooltip', { component: 'Text', editable: true, content: 'Custom Edit icon and replace tooltip text.' }),
    {
      type: 'frame',
      id: makeId('trigger_row'),
      name: 'Trigger Options Row',
      layout: 'horizontal',
      gap: 12,
      alignItems: 'center',
      children: [
        { type: 'text', id: makeId('t_trig'), content: 'Trigger edit with:', fill: '#000000E0', fontFamily: 'Inter', fontSize: 14 },
        {
          type: 'frame',
          id: makeId('opt_box'),
          layout: 'horizontal',
          gap: 16,
          alignItems: 'center',
          children: [
            createTypo('Option Icon', { component: 'Text', content: '☑ icon' }),
            createTypo('Option Text', { component: 'Text', content: '☑ text' })
          ]
        }
      ]
    },
    createTypo('Editable Title H1', { component: 'Title', level: '1', editable: true, content: 'h1. Ant Design' }),
    createTypo('Editable Title H2', { component: 'Title', level: '2', editable: true, content: 'h2. Ant Design' }),
    createTypo('Editable Title H3', { component: 'Title', level: '3', editable: true, content: 'h3. Ant Design' }),
    createTypo('Editable Title H4', { component: 'Title', level: '4', editable: true, content: 'h4. Ant Design' }),
    createTypo('Editable Title H5', { component: 'Title', level: '5', editable: true, content: 'h5. Ant Design' })
  ];
}

// Fix 3: Card 5 (Cugtz) - Replace layout: "none" with vertical auto-layout to fix button and text overlap
const card5 = findNode(ne, 'Cugtz');
if (card5) {
  const p5 = card5.children[0]; // FowiT
  p5.layout = 'vertical';
  p5.height = undefined;
  p5.padding = [32, 28, 32, 28];
  p5.gap = 14;
  p5.children = [
    {
      type: 'frame',
      id: makeId('row_switch'),
      name: 'Rows Switch Control',
      layout: 'horizontal',
      gap: 10,
      alignItems: 'center',
      children: [
        { type: 'frame', id: makeId('sw_pill'), width: 44, height: 22, fill: '#1677FF', cornerRadius: 100 },
        { type: 'text', id: makeId('sw_lbl'), content: 'Show expanded rows', fill: '#000000E0', fontFamily: 'Inter', fontSize: 13 }
      ]
    },
    createTypo('Ellipsis Text 1', {
      component: 'Paragraph',
      ellipsis: true,
      content: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.'
    }),
    createTypo('Ellipsis Text 2', {
      component: 'Paragraph',
      ellipsis: true,
      content: 'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause difficulties and duplication.'
    })
  ];
}

console.log('Typography Usage overlap & double headers fixed successfully!');

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log('Updated libraries/antd-6.lib.pen for Typography!');
