import { mkdir, writeFile } from 'node:fs/promises';

const components = [
  'Affix','Alert','Anchor','App','AutoComplete','Avatar','BackTop','Badge','BorderBeam','Breadcrumb','Button','Calendar','Card','Carousel','Cascader','Checkbox','Col','Collapse','ColorPicker','DatePicker','Descriptions','Divider','Drawer','Dropdown','Empty','Flex','FloatButton','Form','Grid','Image','Input','InputNumber','Layout','List','Listy','Masonry','Mentions','Menu','Message','Modal','Notification','Pagination','Popconfirm','Popover','Progress','QRCode','Radio','Rate','Result','Row','Segmented','Select','Skeleton','Slider','Space','Spin','Splitter','Statistic','Steps','Switch','Table','Tabs','Tag','TimePicker','Timeline','Tooltip','Tour','Transfer','Tree','TreeSelect','Typography','Upload','Watermark'
].map((name) => name.trim()).filter(Boolean);

const colors = {
  primary: '#1677FF',
  text: '#000000E0',
  secondary: '#000000A6',
  tertiary: '#00000073',
  placeholder: '#00000040',
  surface: '#FFFFFF',
  fill: '#00000005',
  border: '#D9D9D9',
};

const categoryFor = (name) => {
  if (['Button', 'FloatButton', 'Typography'].includes(name)) return 'General';
  if (['Col', 'Divider', 'Flex', 'Grid', 'Layout', 'Masonry', 'Row', 'Space', 'Splitter'].includes(name)) return 'Layout';
  if (['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'].includes(name)) return 'Navigation';
  if (['AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form', 'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload'].includes(name)) return 'Data Entry';
  if (['Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions', 'Empty', 'Image', 'List', 'Listy', 'Popover', 'QRCode', 'Segmented', 'Statistic', 'Table', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree'].includes(name)) return 'Data Display';
  if (['Alert', 'Drawer', 'Message', 'Modal', 'Notification', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'].includes(name)) return 'Feedback';
  return 'Other';
};

const text = (id, name, content, fill = '$antd-colorText', size = 14, weight) => ({
  type: 'text', id, name, content, fill, fontFamily: 'Inter', fontSize: size, ...(weight ? { fontWeight: weight } : {}),
});

const rect = (id, fill, width, height, radius = 4) => ({ type: 'frame', id, width, height, fill, cornerRadius: radius });

const contentFor = (name, index) => {
  const id = `antd-${name.toLowerCase()}-${index}`;
  if (name === 'Button') return [text(`${id}-label`, 'Label', '主要操作', '#FFFFFF', 14, '600')];
  if (['Input', 'InputNumber', 'AutoComplete', 'Mentions'].includes(name)) return [text(`${id}-placeholder`, 'Placeholder', '请输入内容', '$antd-colorTextPlaceholder')];
  if (name === 'Select' || name === 'TreeSelect' || name === 'Cascader') return [text(`${id}-value`, 'Value', name === 'TreeSelect' ? '选择节点' : '请选择', '$antd-colorTextPlaceholder'), text(`${id}-arrow`, 'Arrow', name === 'Cascader' ? '›' : '⌄', '$antd-colorTextTertiary', 14)];
  if (name === 'Checkbox') return [rect(`${id}-box`, '#FFFFFF', 16, 16, 3), text(`${id}-label`, 'Label', '选项', '$antd-colorText')];
  if (name === 'Radio') return [rect(`${id}-dot`, '$antd-colorPrimary', 16, 16, 999), text(`${id}-label`, 'Label', '选项', '$antd-colorText')];
  if (name === 'Switch') return [rect(`${id}-track`, '$antd-colorPrimary', 44, 22, 999), text(`${id}-label`, 'Label', '开启', '$antd-colorText')];
  if (name === 'Tag') return [text(`${id}-label`, 'Label', '标签', '$antd-colorPrimary')];
  if (name === 'Progress') return [rect(`${id}-track`, '#F5F5F5', 190, 8, 999), rect(`${id}-bar`, '$antd-colorPrimary', 126, 8, 999), text(`${id}-label`, 'Label', '66%', '$antd-colorTextSecondary', 12)];
  if (name === 'Alert') return [text(`${id}-label`, 'Label', '这是一条提示信息', '$antd-colorText')];
  if (name === 'Badge') return [text(`${id}-label`, 'Label', '徽标内容', '$antd-colorText'), rect(`${id}-dot`, '$antd-colorError', 8, 8, 999)];
  if (name === 'Rate') return [text(`${id}-stars`, 'Stars', '★★★★★', '#FAAD14', 18)];
  if (name === 'Slider') return [rect(`${id}-track`, '#F5F5F5', 220, 4, 999), rect(`${id}-bar`, '$antd-colorPrimary', 120, 4, 999), rect(`${id}-thumb`, '$antd-colorPrimary', 14, 14, 999)];
  if (name === 'Pagination') return [text(`${id}-pages`, 'Pages', '‹  1  2  3  ›', '$antd-colorText')];
  if (name === 'Divider') return [];
  return [text(`${id}-label`, 'Label', `${name} 示例`, '$antd-colorText')];
};

const visualFor = (name, index) => {
  const id = `antd-${name.toLowerCase()}-${index}`;
  const row = (n, label = '列表项') => ({ type: 'frame', id: `${id}-row-${n}`, width: 248, height: 24, layout: 'horizontal', alignItems: 'center', gap: 8, children: [rect(`${id}-row-${n}-dot`, '$antd-colorPrimary', 6, 6, 999), text(`${id}-row-${n}-text`, 'Text', `${label} ${n + 1}`, '$antd-colorText')] });
  if (name === 'Table') return { width: 280, height: 120, layout: 'vertical', gap: 4, padding: 8, children: [text(`${id}-head`, 'Header', '名称          状态          操作', '$antd-colorTextSecondary', 12, '600'), row(0, '数据行'), row(1, '数据行'), row(2, '数据行')] };
  if (name === 'List') return { width: 280, height: 104, layout: 'vertical', gap: 4, padding: 12, children: [text(`${id}-head`, 'Header', '列表标题', '$antd-colorText', 14, '600'), text(`${id}-items`, 'Items', '列表项一\n列表项二\n列表项三', '$antd-colorTextSecondary')] };
  if (name === 'Descriptions') return { width: 280, height: 104, layout: 'vertical', gap: 6, padding: 12, children: [text(`${id}-title`, 'Title', '详细信息', '$antd-colorText', 14, '600'), text(`${id}-pairs`, 'Pairs', '姓名：张三     状态：正常\n创建时间：今天', '$antd-colorTextSecondary', 12)] };
  if (name === 'Menu') return { width: 280, height: 104, layout: 'vertical', gap: 4, padding: 8, children: [text(`${id}-item1`, 'Item', '▣  首页', '$antd-colorPrimary'), text(`${id}-item2`, 'Item', '▤  数据管理', '$antd-colorText'), text(`${id}-item3`, 'Item', '⚙  设置', '$antd-colorText')] };
  if (name === 'Tree') return { width: 280, height: 104, layout: 'vertical', gap: 4, padding: 12, children: [text(`${id}-nodes`, 'Nodes', '⌄  根节点\n   ├─ 子节点一\n   └─ 子节点二', '$antd-colorText')] };
  if (name === 'Tabs') return { width: 280, height: 56, layout: 'vertical', gap: 8, padding: [8, 12], children: [text(`${id}-tabs`, 'Tabs', '概览    详情    设置', '$antd-colorText'), rect(`${id}-active`, '$antd-colorPrimary', 40, 2, 0)] };
  if (name === 'Steps') return { width: 280, height: 56, layout: 'horizontal', gap: 8, padding: [8, 12], children: [rect(`${id}-one`, '$antd-colorPrimary', 20, 20, 999), rect(`${id}-line1`, '#D9D9D9', 48, 2, 0), rect(`${id}-two`, '#D9D9D9', 20, 20, 999), rect(`${id}-line2`, '#D9D9D9', 48, 2, 0), rect(`${id}-three`, '#D9D9D9', 20, 20, 999)] };
  if (['Card', 'Calendar', 'Image', 'Empty', 'Result'].includes(name)) return { width: 280, height: 112, layout: 'vertical', gap: 8, padding: 16, children: [text(`${id}-title`, 'Title', name === 'Empty' ? '暂无数据' : `${name} 标题`, '$antd-colorText', 16, '600'), text(`${id}-body`, 'Body', '这里展示组件内容和辅助信息', '$antd-colorTextSecondary')] };
  if (['Modal', 'Drawer', 'Popover', 'Popconfirm', 'Tooltip'].includes(name)) return { width: 280, height: 112, layout: 'vertical', gap: 8, padding: 16, fill: '$antd-colorBgContainer', effect: { type: 'shadow', shadowType: 'outer', blur: 16, offset: { x: 0, y: 4 }, color: '#00000026' }, children: [text(`${id}-title`, 'Title', `${name} 标题`, '$antd-colorText', 16, '600'), text(`${id}-body`, 'Body', '确认操作或查看详细信息', '$antd-colorTextSecondary')] };
  if (['Alert', 'Notification', 'Message'].includes(name)) return { width: 280, height: 56, padding: [0, 12], fill: '#FFFBE6', stroke: '#FFE58F', children: [text(`${id}-message`, 'Message', '这是一条提示信息', '$antd-colorText')] };
  if (['Layout', 'Row', 'Col', 'Grid', 'Flex', 'Space', 'Masonry', 'Splitter'].includes(name)) return { width: 280, height: 80, layout: 'horizontal', gap: 8, padding: 12, fill: '#F5F5F5', children: [rect(`${id}-a`, '#D6E4FF', 76, 48, 4), rect(`${id}-b`, '#ADC6FF', 76, 48, 4), rect(`${id}-c`, '#85A5FF', 76, 48, 4)] };
  if (['Affix', 'BackTop', 'FloatButton'].includes(name)) return { width: 280, height: 64, layout: 'horizontal', justifyContent: 'center', alignItems: 'center', children: [rect(`${id}-button`, '$antd-colorPrimary', 40, 40, 999), text(`${id}-icon`, 'Icon', '↑', '#FFFFFF', 18, '600')] };
  if (name === 'Avatar') return { width: 280, height: 64, layout: 'horizontal', justifyContent: 'center', alignItems: 'center', children: [rect(`${id}-avatar`, '#D6E4FF', 40, 40, 999), text(`${id}-initial`, 'Initial', 'A', '$antd-colorPrimary', 16, '600')] };
  if (name === 'Calendar') return { width: 280, height: 160, layout: 'vertical', gap: 8, padding: 12, children: [text(`${id}-month`, 'Month', '2026年9月                 ‹  ›', '$antd-colorText', 14, '600'), text(`${id}-week`, 'Week', '一  二  三  四  五  六  日', '$antd-colorTextSecondary', 12), text(`${id}-days`, 'Days', ' 1   2   3   4   5   6   7\n 8   9  10  11  12  13  14', '$antd-colorText')] };
  if (name === 'Carousel') return { width: 280, height: 104, layout: 'vertical', gap: 8, padding: 12, children: [rect(`${id}-slide`, '#D6E4FF', 256, 56, 4), text(`${id}-dots`, 'Dots', '●  ○  ○  ○', '$antd-colorPrimary', 12)] };
  if (name === 'Collapse') return { width: 280, height: 104, layout: 'vertical', gap: 4, children: [text(`${id}-header`, 'Header', '⌄  面板标题', '$antd-colorText', 14, '600'), text(`${id}-content`, 'Content', '面板内容区域', '$antd-colorTextSecondary')] };
  if (name === 'ColorPicker') return { width: 280, height: 48, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-swatch`, '#1677FF', 24, 24, 4), text(`${id}-hex`, 'Hex', '#1677FF', '$antd-colorText')] };
  if (name === 'InputNumber') return { width: 280, height: 40, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center', padding: [0, 8], children: [text(`${id}-minus`, 'Minus', '−', '$antd-colorTextSecondary'), text(`${id}-value`, 'Value', '1', '$antd-colorText'), text(`${id}-plus`, 'Plus', '+', '$antd-colorTextSecondary')] };
  if (name === 'DatePicker' || name === 'TimePicker') return { width: 280, height: 40, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center', padding: [0, 12], children: [text(`${id}-value`, 'Value', name === 'DatePicker' ? '请选择日期' : '请选择时间', '$antd-colorTextPlaceholder'), text(`${id}-icon`, 'Icon', '▣', '$antd-colorTextTertiary')] };
  if (name === 'Dropdown') return { width: 280, height: 80, layout: 'vertical', gap: 4, padding: 8, children: [text(`${id}-trigger`, 'Trigger', '下拉菜单⌄', '$antd-colorText'), text(`${id}-item1`, 'Item', '菜单项一', '$antd-colorText'), text(`${id}-item2`, 'Item', '菜单项二', '$antd-colorText')] };
  if (name === 'QRCode') return { width: 280, height: 112, layout: 'horizontal', justifyContent: 'center', alignItems: 'center', children: [rect(`${id}-code`, '#000000', 72, 72, 0), text(`${id}-label`, 'Label', '扫码查看', '$antd-colorTextSecondary', 12)] };
  if (name === 'Skeleton') return { width: 280, height: 88, layout: 'vertical', gap: 8, padding: 12, children: [rect(`${id}-line1`, '#F0F0F0', 180, 12, 4), rect(`${id}-line2`, '#F0F0F0', 240, 12, 4), rect(`${id}-line3`, '#F0F0F0', 120, 12, 4)] };
  if (name === 'Spin') return { width: 280, height: 64, layout: 'horizontal', justifyContent: 'center', alignItems: 'center', children: [text(`${id}-spinner`, 'Spinner', '◌', '$antd-colorPrimary', 28)] };
  if (name === 'Statistic') return { width: 280, height: 80, layout: 'vertical', gap: 4, padding: 12, children: [text(`${id}-title`, 'Title', '总用户数', '$antd-colorTextSecondary', 12), text(`${id}-value`, 'Value', '12,345', '$antd-colorText', 24, '600')] };
  if (name === 'Timeline') return { width: 280, height: 112, layout: 'vertical', gap: 6, padding: 12, children: [text(`${id}-events`, 'Events', '●  创建订单\n│  处理中\n●  已完成', '$antd-colorPrimary')] };
  if (name === 'Transfer') return { width: 280, height: 104, layout: 'horizontal', gap: 8, padding: 8, children: [rect(`${id}-left`, '#F5F5F5', 104, 80, 4), text(`${id}-arrows`, 'Arrows', '›\n‹', '$antd-colorPrimary', 18, '600'), rect(`${id}-right`, '#F5F5F5', 104, 80, 4)] };
  if (name === 'Typography') return { width: 280, height: 80, layout: 'vertical', gap: 4, padding: 12, children: [text(`${id}-heading`, 'Heading', '标题文本', '$antd-colorText', 20, '600'), text(`${id}-paragraph`, 'Paragraph', '这是一段正文内容', '$antd-colorTextSecondary')] };
  if (name === 'Upload') return { width: 280, height: 96, layout: 'vertical', gap: 4, justifyContent: 'center', alignItems: 'center', stroke: '$antd-colorPrimary', strokeWidth: 1, children: [text(`${id}-icon`, 'Icon', '⇧', '$antd-colorPrimary', 20), text(`${id}-text`, 'Text', '点击或拖拽文件到此处', '$antd-colorTextSecondary', 12)] };
  if (name === 'Watermark') return { width: 280, height: 96, layout: 'horizontal', justifyContent: 'center', alignItems: 'center', children: [text(`${id}-mark`, 'Mark', '示例水印  示例水印', '$antd-colorTextTertiary', 16)] };
  if (name === 'Anchor') return { width: 280, height: 88, layout: 'vertical', gap: 6, padding: 12, children: [text(`${id}-link1`, 'Link', '概览', '$antd-colorPrimary'), text(`${id}-link2`, 'Link', 'API 参考', '$antd-colorTextSecondary'), text(`${id}-link3`, 'Link', '示例代码', '$antd-colorTextSecondary')] };
  if (name === 'AutoComplete') return { width: 280, height: 40, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center', padding: [0, 12], children: [text(`${id}-value`, 'Value', '搜索或输入内容', '$antd-colorTextPlaceholder'), text(`${id}-icon`, 'Icon', '⌕', '$antd-colorTextTertiary', 18)] };
  if (name === 'BorderBeam') return { width: 280, height: 64, stroke: '$antd-colorPrimary', strokeWidth: 2, cornerRadius: 8, children: [text(`${id}-label`, 'Label', '边框动画区域', '$antd-colorText')] };
  if (name === 'App') return { width: 280, height: 96, layout: 'vertical', gap: 8, padding: 12, fill: '$antd-colorBgContainer', stroke: '$antd-colorBorder', strokeWidth: 1, children: [text(`${id}-header`, 'Header', 'App 上下文', '$antd-colorText', 14, '600'), text(`${id}-body`, 'Body', '消息、通知、弹窗与主题上下文', '$antd-colorTextSecondary', 12), rect(`${id}-action`, '$antd-colorPrimary', 88, 24, 4)] };
  if (name === 'Form') return { width: 280, height: 112, layout: 'vertical', gap: 6, padding: 12, children: [text(`${id}-label1`, 'Label', '用户名', '$antd-colorTextSecondary', 12), rect(`${id}-input1`, '#FFFFFF', 248, 28, 4), text(`${id}-label2`, 'Label', '密码', '$antd-colorTextSecondary', 12), rect(`${id}-input2`, '#FFFFFF', 248, 28, 4)] };
  if (name === 'Mentions') return { width: 280, height: 40, layout: 'horizontal', alignItems: 'center', padding: [0, 12], children: [text(`${id}-value`, 'Value', '@提及成员', '$antd-colorTextPlaceholder')] };
  if (name === 'Segmented') return { width: 280, height: 40, layout: 'horizontal', gap: 4, padding: 4, fill: '#F5F5F5', children: [rect(`${id}-active`, '#FFFFFF', 80, 28, 4), text(`${id}-a`, 'Option', '选项一', '$antd-colorText'), text(`${id}-b`, 'Option', '选项二', '$antd-colorTextSecondary')] };
  if (name === 'Tour') return { width: 280, height: 104, layout: 'vertical', gap: 6, padding: 12, effect: { type: 'shadow', shadowType: 'outer', blur: 12, offset: { x: 0, y: 4 }, color: '#00000026' }, children: [text(`${id}-title`, 'Title', '功能引导', '$antd-colorText', 14, '600'), text(`${id}-body`, 'Body', '跟随步骤了解页面功能', '$antd-colorTextSecondary', 12), text(`${id}-next`, 'Next', '下一步  ›', '$antd-colorPrimary', 12)] };
  return {};
};

const frameFor = (name, index) => ({
  type: 'frame',
  id: `antd-${name.toLowerCase()}-${index}`,
  name: `Antd/${categoryFor(name)}/${name}`,
  x: (index % 6) * 320,
  y: Math.floor(index / 6) * 80,
  reusable: true,
  metadata: { type: 'antd-component', antd: { component: name, category: categoryFor(name), version: '6.6.4', props: {}, tokens: {} } },
  width: 280,
  height: name === 'Divider' ? 1 : 40,
  fill: name === 'Button' ? '$antd-colorPrimary' : name === 'Alert' ? '#FFFBE6' : '$antd-colorBgContainer',
  cornerRadius: name === 'Divider' ? 0 : '$antd-borderRadius',
  stroke: name === 'Button' || name === 'Divider' ? undefined : name === 'Alert' ? '#FFE58F' : '$antd-colorBorder',
  strokeWidth: name === 'Button' || name === 'Divider' ? undefined : 1,
  layout: name === 'Divider' ? undefined : 'horizontal',
  gap: 8,
  padding: name === 'Divider' ? undefined : [0, 12],
  alignItems: name === 'Divider' ? undefined : 'center',
  justifyContent: name === 'Divider' ? undefined : 'space_between',
  children: contentFor(name, index),
  ...visualFor(name, index),
});

const variables = {
  'antd-colorPrimary': { type: 'color', value: colors.primary },
  'antd-colorSuccess': { type: 'color', value: '#52C41A' },
  'antd-colorWarning': { type: 'color', value: '#FAAD14' },
  'antd-colorError': { type: 'color', value: '#FF4D4F' },
  'antd-colorText': { type: 'color', value: colors.text },
  'antd-colorTextSecondary': { type: 'color', value: colors.secondary },
  'antd-colorTextTertiary': { type: 'color', value: colors.tertiary },
  'antd-colorTextPlaceholder': { type: 'color', value: colors.placeholder },
  'antd-colorBgContainer': { type: 'color', value: colors.surface },
  'antd-colorFillAlter': { type: 'color', value: colors.fill },
  'antd-colorBorder': { type: 'color', value: colors.border },
  'antd-borderRadius': { type: 'number', value: 6 },
  'antd-borderRadiusLG': { type: 'number', value: 8 },
  'antd-fontSize': { type: 'number', value: 14 },
  'antd-controlHeight': { type: 'number', value: 32 },
};

const themedVariables = { ...variables };
themedVariables['antd-colorPrimary'] = { type: 'color', value: [
  { value: '#1677FF', theme: { mode: 'light' } },
  { value: '#1668DC', theme: { mode: 'dark' } },
] };
themedVariables['antd-colorBgContainer'] = { type: 'color', value: [
  { value: '#FFFFFF', theme: { mode: 'light' } },
  { value: '#141414', theme: { mode: 'dark' } },
] };
themedVariables['antd-colorText'] = { type: 'color', value: [
  { value: '#000000E0', theme: { mode: 'light' } },
  { value: '#FFFFFFD9', theme: { mode: 'dark' } },
] };
themedVariables['antd-colorBorder'] = { type: 'color', value: [
  { value: '#D9D9D9', theme: { mode: 'light' } },
  { value: '#424242', theme: { mode: 'dark' } },
] };
themedVariables['antd-controlHeight'] = { type: 'number', value: [
  { value: 32, theme: { density: 'regular' } },
  { value: 24, theme: { density: 'compact' } },
] };

const profile = (name) => {
  const groups = {
    general: ['className', 'style'],
    dataEntry: ['size', 'disabled', 'status', 'variant'],
    dataDisplay: ['className', 'style'],
    layout: ['className', 'style', 'size'],
    feedback: ['className', 'style', 'closable'],
    navigation: ['className', 'style', 'disabled'],
  };
  const category = ['Button', 'Typography', 'Icon'].includes(name) ? 'general'
    : ['Input', 'InputNumber', 'AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Mentions', 'Radio', 'Rate', 'Segmented', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload', 'Form'].includes(name) ? 'dataEntry'
      : ['Row', 'Col', 'Grid', 'Layout', 'Header', 'Sider', 'Content', 'Footer', 'Space', 'Flex', 'Divider', 'Splitter'].includes(name) ? 'layout'
        : ['Alert', 'Drawer', 'Modal', 'Message', 'Notification', 'Popconfirm', 'Popover', 'Progress', 'Result', 'Skeleton', 'Spin', 'Tour'].includes(name) ? 'feedback'
          : ['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'].includes(name) ? 'navigation' : 'dataDisplay';
  const extras = {
    Button: [
      'type', 'color', 'variant', 'shape', 'size', 'danger', 'ghost', 'block',
      'loading', 'icon', 'iconPlacement', 'iconPosition', 'children', 'href',
      'target', 'htmlType', 'autoInsertSpace', 'disabled', 'state',
      'rootClassName', 'prefixCls', 'classNames', 'styles', '_skipSemantic',
    ],
    Input: ['placeholder', 'allowClear', 'prefix', 'suffix', 'maxLength', 'value'],
    Select: ['options', 'mode', 'allowClear', 'showSearch', 'placeholder', 'value'],
    Table: ['columns', 'dataSource', 'rowKey', 'pagination', 'rowSelection', 'loading', 'scroll', 'sticky'],
    Form: ['name', 'layout', 'initialValues', 'onFinish', 'rules', 'disabled'],
    Modal: ['open', 'title', 'onOk', 'onCancel', 'footer', 'width', 'centered', 'destroyOnHidden'],
    Drawer: ['open', 'title', 'onClose', 'placement', 'width', 'size', 'footer'],
    Menu: ['items', 'mode', 'selectedKeys', 'openKeys', 'onClick'],
    Tabs: ['items', 'activeKey', 'defaultActiveKey', 'type', 'onChange'],
    DatePicker: ['value', 'defaultValue', 'format', 'picker', 'showTime', 'disabledDate'],
    Upload: ['action', 'fileList', 'beforeUpload', 'onChange', 'multiple', 'accept'],
  };
  return { category: categoryFor(name), props: [...(groups[category] ?? groups.dataDisplay), ...(extras[name] ?? ['children'])] };
};

await mkdir(new URL('../libraries/', import.meta.url), { recursive: true });
const outputName = 'antd-6.lib.pen';
if (process.argv.includes('--overwrite-canonical')) await writeFile(new URL(`../libraries/${outputName}`, import.meta.url), `${JSON.stringify({
  version: '2.17',
  children: components.map(frameFor),
  themes: { mode: ['light', 'dark'], density: ['regular', 'compact'] },
  variables: themedVariables,
  fileToken: 'antd-6-all-components-20260915',
}, null, 2)}\n`);
await mkdir(new URL('../registry/', import.meta.url), { recursive: true });
await writeFile(new URL('../registry/components.json', import.meta.url), `${JSON.stringify({
  library: 'antd',
  version: '6.6.4',
  components: Object.fromEntries(components.map((name) => [name, { name, ...profile(name), manifest: `antd/${name}` }])),
  tokenBindings: Object.fromEntries(Object.keys(variables).map((name) => [name.replace('antd-', ''), `$${name}`])),
  codegen: { framework: 'react-typescript', package: 'antd', iconsPackage: '@ant-design/icons' },
}, null, 2)}\n`);
console.log(process.argv.includes('--overwrite-canonical')
  ? `generated ${components.length} seed component origins in libraries/${outputName}`
  : `prepared ${components.length} seed component definitions; canonical browser-rendered library was not overwritten`);
