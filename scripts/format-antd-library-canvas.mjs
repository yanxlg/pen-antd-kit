import { readFile, writeFile } from 'node:fs/promises';

const filePath = new URL('../libraries/antd-6.lib.pen', import.meta.url);
const pen = JSON.parse(await readFile(filePath, 'utf8'));

// Map existing 71 components
const compMap = new Map();
const collectComps = (node) => {
  if (node.metadata?.type === 'antd-component' && node.metadata?.antd?.component) {
    compMap.set(node.metadata.antd.component, node);
  }
  for (const child of node.children ?? []) collectComps(child);
};
for (const child of pen.children) collectComps(child);

// Column & Category definitions
const colDefinitions = [
  {
    colX: 80,
    sections: [
      {
        title: 'General · 通用',
        components: ['Button', 'FloatButton', 'Typography'],
      },
      {
        title: 'Navigation · 导航',
        components: ['Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs', 'Anchor'],
      },
      {
        title: 'Feedback · 基础反馈',
        components: ['Alert', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark', 'Popconfirm'],
      },
    ],
  },
  {
    colX: 640,
    sections: [
      {
        title: 'Data Entry · 数据录入',
        components: [
          'Input', 'InputNumber', 'AutoComplete', 'Mentions',
          'Select', 'Cascader', 'TreeSelect',
          'Checkbox', 'Radio', 'Switch', 'Rate', 'Slider',
          'DatePicker', 'TimePicker', 'ColorPicker',
          'Transfer', 'Upload', 'Form',
        ],
      },
    ],
  },
  {
    colX: 1200,
    sections: [
      {
        title: 'Data Display · 数据展示',
        components: [
          'Avatar', 'Badge', 'Tag', 'Segmented',
          'Card', 'Collapse', 'Descriptions', 'List', 'Table',
          'Calendar', 'Carousel', 'Image', 'QRCode', 'Statistic',
          'Timeline', 'Tooltip', 'Tour', 'Tree', 'Empty', 'Popover',
        ],
      },
    ],
  },
  {
    colX: 1760,
    sections: [
      {
        title: 'Overlays · 弹出浮层',
        components: ['Modal', 'Drawer'],
      },
      {
        title: 'Layout · 布局',
        components: ['Divider', 'Flex', 'Grid', 'Layout', 'Masonry', 'Row', 'Col', 'Space', 'Splitter'],
      },
      {
        title: 'Other · 全局与配置',
        components: ['Affix', 'App', 'BackTop', 'BorderBeam'],
      },
    ],
  },
];

const artboardChildren = [];
let maxCalculatedHeight = 0;

for (const col of colDefinitions) {
  let curY = 80;
  for (const sec of col.sections) {
    const secSafeId = sec.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

    // Section Category Title (rendered directly on canvas)
    artboardChildren.push({
      type: 'text',
      id: `sec-title-${secSafeId}`,
      name: `Category · ${sec.title}`,
      x: col.colX,
      y: curY,
      content: sec.title,
      fill: '#1677FF',
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
    });

    // Subtle Section Divider
    artboardChildren.push({
      type: 'rectangle',
      id: `sec-line-${secSafeId}`,
      name: 'Divider',
      x: col.colX,
      y: curY + 28,
      width: 480,
      height: 1,
      fill: '#F0F0F0',
    });

    curY += 44;

    // Component Frames placed directly with (x, y) coordinates
    for (const compName of sec.components) {
      const compNode = compMap.get(compName);
      if (compNode) {
        compNode.x = col.colX;
        compNode.y = curY;
        compNode.width = 480;
        artboardChildren.push(compNode);
        curY += (compNode.height || 64) + 24;
      }
    }

    curY += 28;
  }
  if (curY > maxCalculatedHeight) maxCalculatedHeight = curY;
}

// Single Root Artboard (exact same structure as official shadcn: design system components)
const artboardHeight = Math.ceil((maxCalculatedHeight + 100) / 100) * 100;
const masterArtboard = {
  type: 'frame',
  id: 'antd-design-system-canvas',
  name: 'antd: design system components',
  x: 0,
  y: 0,
  width: 2320,
  height: artboardHeight,
  fill: '#FFFFFF',
  clip: true,
  layout: 'none',
  children: artboardChildren,
};

const updatedPen = {
  version: pen.version || '2.17',
  themes: pen.themes || { mode: ['light', 'dark'], density: ['regular', 'compact'] },
  variables: pen.variables,
  fileToken: pen.fileToken || 'antd-6-all-components-20260915',
  children: [masterArtboard],
};

await writeFile(filePath, `${JSON.stringify(updatedPen, null, 2)}\n`);
console.log(`Successfully built official-style Artboard (${masterArtboard.width}x${masterArtboard.height}) with ${artboardChildren.length} direct nodes!`);
