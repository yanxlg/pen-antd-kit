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

console.log('=== Step 1: Building Section Icon ===');

// 1. Live Origin for Icon
const iconLiveOrigin = {
  type: 'script',
  id: 'antd-icon-live-origin',
  name: 'Antd/Live/Icon',
  reusable: true,
  metadata: {
    type: 'antd-component',
    antd: {
      component: 'Icon',
      category: 'General',
      version: '6.4.3',
      props: {},
      tokens: {}
    }
  },
  width: 16,
  height: 16,
  scriptUri: '../canvas-components/Icon.js',
  inputs: {
    name: 'search',
    size: 16,
    color: '#000000E0',
    twoToneColor: '',
    rotate: 0,
    spin: false
  }
};

function createIcon(name, inputs, extra = {}) {
  const sz = inputs.size || 16;
  return {
    type: 'ref',
    ref: 'antd-icon-live-origin',
    id: makeId('ico'),
    name: name || `Icon · ${inputs.name || 'search'}`,
    width: sz,
    height: sz,
    inputs: { ...inputs },
    ...extra
  };
}

function makeDemoCard(id, title, desc, previewContent) {
  return {
    type: 'frame',
    id: id || makeId('card'),
    name: `Card · ${title}`,
    width: 'fill_container',
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#0505050F',
    strokeWidth: 1,
    strokeAlignment: 'inner',
    layout: 'vertical',
    padding: 1,
    children: [
      {
        type: 'frame',
        id: makeId('prev_sec'),
        name: 'Preview Section',
        width: 'fill_container',
        fill: '#FFFFFF',
        cornerRadius: [8, 8, 0, 0],
        stroke: '#0505050F',
        strokeWidth: { bottom: 1 },
        strokeAlignment: 'inner',
        layout: 'horizontal',
        padding: [32, 28, 32, 28],
        gap: 24,
        alignItems: 'center',
        children: previewContent
      },
      {
        type: 'frame',
        id: makeId('meta_sec'),
        name: 'Meta Section',
        width: 'fill_container',
        layout: 'vertical',
        padding: [16, 24, 16, 24],
        gap: 4,
        children: [
          { type: 'text', id: makeId('t'), content: title, fill: '#000000E0', fontFamily: 'Inter', fontSize: 14, fontWeight: '600' },
          { type: 'text', id: makeId('d'), content: desc, fill: '#00000073', fontFamily: 'Inter', fontSize: 13 }
        ]
      }
    ]
  };
}

// 4 Official Pure Usage Cards (剔除长文档与搜索器)
const usageCard1 = makeDemoCard(
  'icon-usage-basic',
  'Basic · 基本用法',
  '通过 @ant-design/icons 引入标准图标。使用 spin 属性实现旋转动画，使用 rotate 属性设置旋转角度。',
  [
    createIcon('HomeOutlined', { name: 'home', size: 24 }),
    createIcon('SettingFilled', { name: 'setting', size: 24 }),
    createIcon('SmileOutlined', { name: 'smile', size: 24 }),
    createIcon('SyncOutlined (Spin)', { name: 'sync', size: 24, color: '#1677FF' }),
    createIcon('SmileOutlined (Rotate 180)', { name: 'smile', size: 24, rotate: 180 }),
    createIcon('LoadingOutlined', { name: 'loading', size: 24, color: '#1677FF' })
  ]
);

const usageCard2 = makeDemoCard(
  'icon-usage-twotone',
  'Two-tone & Colorful · 双色与彩色图标',
  '双色图标可以自定义主题色 twoToneColor，同时支持各种状态与情感主题表达。',
  [
    createIcon('SmileTwoTone', { name: 'smile', size: 24, twoToneColor: '#1677FF' }),
    createIcon('HeartTwoTone Pink', { name: 'heart', size: 24, twoToneColor: '#EB2F96' }),
    createIcon('CheckCircleTwoTone Green', { name: 'check-circle', size: 24, twoToneColor: '#52C41A' })
  ]
);

const usageCard3 = makeDemoCard(
  'icon-usage-custom',
  'Custom SVG Icon · 自定义矢量图标',
  '利用 Icon 组件的 component 属性自定义 SVG 渲染，支持尺寸与颜色透传。',
  [
    createIcon('Custom Heart Hotpink', { name: 'heart', size: 24, color: '#FF1493' }),
    createIcon('Custom Star Yellow', { name: 'star', size: 28, color: '#FAAD14' }),
    createIcon('Custom Search Blue', { name: 'search', size: 24, color: '#1677FF' })
  ]
);

const usageCard4 = makeDemoCard(
  'icon-usage-iconfont',
  'Use iconfont.cn · 阿里矢量图标库集成',
  '通过 createFromIconfontCN 方便使用 iconfont.cn 上定义的图标，并支持 CSS 颜色设置。',
  [
    createIcon('IconFont Logout', { name: 'arrow-right', size: 24, color: '#000000E0' }),
    createIcon('IconFont Brand Blue', { name: 'home', size: 24, color: '#1877F2' }),
    createIcon('IconFont Edit', { name: 'edit', size: 24, color: '#722ED1' })
  ]
);

const artboardIconUsage = {
  type: 'frame',
  id: 'artboard-icon-usage',
  name: 'Usage · 使用场景与示例',
  x: 0,
  y: 90,
  width: 1728,
  height: 1200,
  fill: '#FFFFFF',
  cornerRadius: 8,
  stroke: '#E8E8E8',
  strokeWidth: 1,
  layout: 'vertical',
  padding: 32,
  gap: 24,
  children: [
    {
      type: 'text',
      id: 'icon-u-title',
      fill: '#000000',
      content: 'Usage',
      fontFamily: 'Inter',
      fontSize: 80,
      fontWeight: '700'
    },
    {
      type: 'frame',
      id: 'icon-u-content',
      name: 'Usage Content',
      width: 'fill_container',
      layout: 'vertical',
      gap: 20,
      children: [
        usageCard1,
        usageCard2,
        usageCard3,
        usageCard4
      ]
    }
  ]
};

// 4 Specification Matrix Cards for Icon Components
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
    gap: 24,
    alignItems: 'center',
    children: [
      { type: 'text', id: makeId('lbl'), content: label, fill: '#1677FF', fontFamily: 'Inter', fontSize: 13, fontWeight: '500', width: 140 },
      ...items
    ]
  };
}

const compCard1 = makeMatrixCard(
  'icon-matrix-direction',
  'Directional & Universal Icons · 方向指示与通用类高频图标',
  '覆盖方向指示、箭头导航与通用功能矢量图标',
  [
    makeRow('Navigation Arrows', [
      createIcon('ArrowLeft', { name: 'arrow-left', size: 20 }),
      createIcon('ArrowRight', { name: 'arrow-right', size: 20 }),
      createIcon('Search', { name: 'search', size: 20 }),
      createIcon('Home', { name: 'home', size: 20 }),
      createIcon('User', { name: 'user', size: 20 })
    ]),
    makeRow('Action Icons', [
      createIcon('Edit', { name: 'edit', size: 20 }),
      createIcon('Delete', { name: 'delete', size: 20 }),
      createIcon('Check', { name: 'check', size: 20 }),
      createIcon('Close', { name: 'close', size: 20 }),
      createIcon('Sync', { name: 'sync', size: 20 })
    ])
  ]
);

const compCard2 = makeMatrixCard(
  'icon-matrix-sizes',
  'Size Steps Matrix · 尺寸阶梯矩阵',
  '14px (小标签/行内微标)、16px (正文基准)、20px (中号按钮/标题)、24px (大号卡片图标)、32px (展示型大标)',
  [
    makeRow('Scale 14 ~ 32px', [
      createIcon('Size 14px', { name: 'home', size: 14 }),
      createIcon('Size 16px', { name: 'home', size: 16 }),
      createIcon('Size 20px', { name: 'home', size: 20 }),
      createIcon('Size 24px', { name: 'home', size: 24 }),
      createIcon('Size 32px', { name: 'home', size: 32 })
    ])
  ]
);

const compCard3 = makeMatrixCard(
  'icon-matrix-colors',
  'Semantic Status & Theme Colors · 语义色彩与主题规范',
  '支持系统默认文字色、品牌色 Primary、成功色 Success、警告色 Warning、错误色 Error 以及禁用态 Disabled',
  [
    makeRow('Semantic Colors', [
      createIcon('Default', { name: 'check-circle', size: 22, color: '#000000E0' }),
      createIcon('Primary', { name: 'check-circle', size: 22, color: '#1677FF' }),
      createIcon('Success', { name: 'check-circle', size: 22, color: '#52C41A' }),
      createIcon('Warning', { name: 'check-circle', size: 22, color: '#FAAD14' }),
      createIcon('Error', { name: 'check-circle', size: 22, color: '#FF4D4F' }),
      createIcon('Disabled', { name: 'check-circle', size: 22, color: 'rgba(0, 0, 0, 0.25)' })
    ])
  ]
);

const artboardIconComponents = {
  type: 'frame',
  id: 'artboard-icon-components',
  name: 'Components · 变体规格矩阵',
  x: 1768,
  y: 90,
  width: 1728,
  height: 1200,
  fill: '#FFFFFF',
  cornerRadius: 8,
  stroke: '#E8E8E8',
  strokeWidth: 1,
  layout: 'vertical',
  padding: 32,
  gap: 24,
  children: [
    {
      type: 'text',
      id: 'icon-c-title',
      fill: '#000000',
      content: 'Components',
      fontFamily: 'Inter',
      fontSize: 80,
      fontWeight: '700'
    },
    iconLiveOrigin,
    compCard1,
    compCard2,
    compCard3
  ]
};

const sectionIcon = {
  type: 'frame',
  id: 'section-icon',
  name: 'Icon · 图标',
  context: 'section',
  layout: 'none',
  width: 3536,
  height: 1300,
  children: [
    {
      type: 'frame',
      id: 'section-icon-banner',
      name: 'Sub-Title: Icon · 图标',
      layoutPosition: 'absolute',
      x: 0,
      y: 0,
      width: 3536,
      height: 64,
      fill: '#FAFAFA',
      stroke: '#F0F0F0',
      strokeWidth: 1,
      cornerRadius: 6,
      padding: [16, 24],
      layout: 'horizontal',
      alignItems: 'center',
      gap: 16,
      children: [
        { type: 'text', id: 'section-icon-t', content: 'Icon · 图标', fill: '#000000E0', fontFamily: 'Inter', fontSize: 26, fontWeight: '700' },
        { type: 'text', id: 'section-icon-desc', content: '语义化的矢量图形，支持单色、双色、自定义 SVG 与阿里矢量图标库扩展。', fill: '#00000073', fontFamily: 'Inter', fontSize: 13 }
      ]
    },
    artboardIconUsage,
    artboardIconComponents
  ]
};

console.log('=== Step 2: Arranging General Sections with Reasonable Layout & 240px Spacing ===');
// Order: Button -> Icon -> Typography -> FloatButton
const secButton = general.children.find(c => c.id === 'section-button');
const secTypography = general.children.find(c => c.id === 'section-typography');
const secFloatButton = general.children.find(c => c.id === 'section-floatbutton');

// Ensure section widths and coordinates
// 1. Button (w: 5264, x: 0)
secButton.x = 0;
secButton.y = 0;

// 2. Icon (w: 3536, gap: 240px -> x: 5264 + 240 = 5504)
sectionIcon.x = 5504;
sectionIcon.y = 0;

// 3. Typography (Banner w: 5264, Artboards: Principles 1728 + 40 + Usage 1728 + 40 + Comps 1728 = 5264)
// x: 5504 + 3536 + 240 = 9280
secTypography.x = 9280;
secTypography.y = 0;
secTypography.width = 5264;

// Adjust Typography artboards: Principles(0), Usage(1768), Components(3536)
const typoBanner = secTypography.children.find(c => c.id === 'section-typography-banner');
if (typoBanner) typoBanner.width = 5264;

const typoP = secTypography.children.find(c => c.id === 'artboard-typography-principles');
const typoU = secTypography.children.find(c => c.id === 'artboard-typography-usage');
const typoC = secTypography.children.find(c => c.id === 'artboard-typography-components');
if (typoP) { typoP.x = 0; typoP.y = 90; typoP.width = 1728; }
if (typoU) { typoU.x = 1768; typoU.y = 90; typoU.width = 1728; }
if (typoC) { typoC.x = 3536; typoC.y = 90; typoC.width = 1728; }

// 4. FloatButton (Banner w: 3536, Usage 1728 + Comps 1728 = 3500)
// x: 9280 + 5264 + 240 = 14784
secFloatButton.x = 14784;
secFloatButton.y = 0;
secFloatButton.width = 3536;

const fbBanner = secFloatButton.children.find(c => c.id === 'section-floatbutton-banner');
if (fbBanner) fbBanner.width = 3536;

const fbU = secFloatButton.children.find(c => c.id === 'artboard-floatbutton-usage');
const fbC = secFloatButton.children.find(c => c.id === 'artboard-floatbutton-components');
if (fbU) { fbU.x = 0; fbU.y = 90; fbU.width = 1728; }
if (fbC) { fbC.x = 1768; fbC.y = 90; fbC.width = 1728; }

// Reorder children of General layer: Button, Icon, Typography, FloatButton
general.children = [
  secButton,
  sectionIcon,
  secTypography,
  secFloatButton
];

// Update General layer total width
general.width = 14784 + 3536;
general.height = 10000;

console.log(`General layout successfully arranged! Total width: ${general.width}px.`);

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log('All updates written to libraries/antd-6.lib.pen!');
