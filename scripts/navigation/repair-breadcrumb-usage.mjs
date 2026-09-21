import fs from 'node:fs';

const penPath = new URL('../../libraries/antd-6.lib.pen', import.meta.url);
const pen = JSON.parse(fs.readFileSync(penPath, 'utf8'));

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children || []) {
    const match = find(child, predicate);
    if (match) return match;
  }
  return undefined;
}

function walk(node, result = []) {
  result.push(node);
  for (const child of node.children || []) walk(child, result);
  return result;
}

const usage = find(pen, (node) => node.id === 'artboard-breadcrumb-usage');
if (!usage) throw new Error('Breadcrumb Usage artboard was not found.');

const officialImport = pen.children.find(
  (node) => node.context === 'div' && Math.abs(Number(node.width) - 1787.98) < 0.1 && Math.abs(Number(node.height) - 1046.56) < 0.2,
);

const emptyObject = '{}';
const examples = [
  {
    title: 'Basic Usage',
    items: [{ title: 'Home' }, { title: 'Application Center', href: '' }, { title: 'Application List', href: '' }, { title: 'An Application' }],
    separator: '/',
  },
  {
    title: 'With Params',
    items: [{ title: 'Users' }, { title: '1', href: '' }],
    separator: '/',
  },
  {
    title: 'Bread crumbs with drop down menu',
    items: [
      { title: 'Ant Design' },
      { title: 'Component', href: '' },
      { title: 'General', href: '', menu: { items: [{ key: '1', label: 'General' }, { key: '2', label: 'Layout' }, { key: '3', label: 'Navigation' }] } },
      { title: 'Button' },
    ],
    separator: '/',
  },
  {
    title: 'Debug Routes',
    items: [
      { title: 'Home', href: '#/home' },
      { title: 'User', href: '#/home/user', menu: { items: [{ key: '/user1', label: 'User1' }, { key: '/user2', label: 'User2' }] } },
    ],
    separator: '/',
  },
  {
    title: 'With an Icon',
    items: [
      { title: '', href: '', icon: 'HomeOutlined' },
      { title: 'Application List', href: '', icon: 'UserOutlined' },
      { title: 'Dashboard', href: '', icon: 'LineChartOutlined' },
      { title: 'Application' },
    ],
    separator: '/',
  },
  {
    title: 'Configuring the Separator',
    items: [{ title: 'Home' }, { title: 'Application Center', href: '' }, { title: 'Application List', href: '' }, { title: 'An Application' }],
    separator: '>',
  },
  {
    title: 'Configuring the Separator Independently',
    items: [
      { title: 'Location' },
      { type: 'separator', separator: ':' },
      { title: 'Application Center', href: '' },
      { type: 'separator', separator: '/' },
      { title: 'Application List', href: '' },
      { type: 'separator', separator: '/' },
      { title: 'An Application' },
    ],
    separator: '',
  },
];

const previewByTitle = new Map();
for (const node of walk(usage)) {
  const prefix = 'Breadcrumb example · ';
  if (node.name?.startsWith(prefix)) previewByTitle.set(node.name.slice(prefix.length), node);
}

function breadcrumbComponent(id, name, config, height = 22) {
  return {
    id,
    type: 'script',
    scriptUri: '../canvas-components/Breadcrumb.js',
    name: `Breadcrumb instance · ${name}`,
    width: 'fill_container',
    height,
    inputs: {
      items: JSON.stringify(config.items),
      separator: config.separator,
      classNames: config.classNames || emptyObject,
      styles: config.styles || emptyObject,
    },
    metadata: {
      type: 'antd-component-instance',
      antd: {
        component: 'Breadcrumb',
        category: 'Navigation',
        source: 'https://ant.design/components/breadcrumb/',
        example: config.example,
      },
    },
  };
}

for (const config of examples) {
  const preview = previewByTitle.get(config.title);
  if (!preview) throw new Error(`Missing Breadcrumb preview: ${config.title}`);
  const priorId = preview.children?.[0]?.id || `breadcrumb-${config.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
  preview.layout = 'vertical';
  preview.padding = [42, 24, 51, 24];
  preview.gap = 16;
  preview.height = 115;
  preview.children = [breadcrumbComponent(priorId, config.title, { ...config, example: `breadcrumb-demo-${config.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}` })];
}

const styledPreview = previewByTitle.get('Custom semantic dom styling');
if (!styledPreview) throw new Error('Missing styled Breadcrumb preview.');
const styled = [
  {
    items: [{ title: 'Ant Design' }, { title: 'Component', href: '' }],
    separator: '/',
    classNames: JSON.stringify({ root: 'custom-root', item: 'custom-item', separator: 'custom-separator' }),
    styles: JSON.stringify({ root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 }, item: { color: '#1890ff' }, separator: { color: '#00000073' } }),
    example: 'breadcrumb-demo-style-class-object',
  },
  {
    items: [{ title: 'Ant Design' }, { title: 'Component', href: '' }, { title: 'Breadcrumb' }],
    separator: '/',
    classNames: JSON.stringify({ root: 'custom-root', item: 'custom-item', separator: 'custom-separator' }),
    styles: JSON.stringify({ root: { border: '1px solid #F5EFFF', padding: 8, borderRadius: 4 }, item: { color: '#8F87F1' }, separator: { color: '#00000073' } }),
    example: 'breadcrumb-demo-style-class-function',
  },
];
styledPreview.layout = 'vertical';
styledPreview.padding = [42, 24, 51, 24];
styledPreview.gap = 16;
styledPreview.height = 189;
styledPreview.children = [
  breadcrumbComponent(styledPreview.children?.[0]?.id || 'breadcrumb-style-object', 'Custom semantic dom styling · Object', styled[0], 40),
  breadcrumbComponent('breadcrumb-style-function', 'Custom semantic dom styling · Function', styled[1], 40),
];

usage.name = 'Usage · 使用场景与示例';
usage.metadata = {
  ...(usage.metadata || {}),
  officialSource: 'https://ant.design/components/breadcrumb/',
  officialVersion: '6.6.5',
  importedSelector: '.demo-wrapper',
  implementation: 'internal Breadcrumb component instances only',
};

if (officialImport) pen.children = pen.children.filter((node) => node !== officialImport);
fs.writeFileSync(penPath, `${JSON.stringify(pen, null, 2)}\n`);

const usageNodes = walk(usage);
const components = usageNodes.filter((node) => node.type === 'script' && node.scriptUri === '../canvas-components/Breadcrumb.js');
const previewDom = usageNodes.filter((node) => /^Breadcrumb instance ·/.test(node.name || '') && node.type !== 'script');
console.log(JSON.stringify({
  cards: previewByTitle.size,
  breadcrumbInstances: components.length,
  previewDom: previewDom.length,
  removedOfficialImport: !officialImport || !pen.children.includes(officialImport),
  officialImportId: officialImport?.id || null,
}, null, 2));
