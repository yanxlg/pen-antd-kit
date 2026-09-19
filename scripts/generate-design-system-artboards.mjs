import { readFile, writeFile } from 'node:fs/promises';

const libraryPath = new URL('../libraries/antd-6.lib.pen', import.meta.url);

// ==================== DESIGN SYSTEM TOKENS & HELPERS ====================
const themedVariables = {
  'antd-colorPrimary': { type: 'color', value: [{ value: '#1677FF', theme: { mode: 'light' } }, { value: '#1668DC', theme: { mode: 'dark' } }] },
  'antd-colorSuccess': { type: 'color', value: [{ value: '#52C41A', theme: { mode: 'light' } }, { value: '#49AA19', theme: { mode: 'dark' } }] },
  'antd-colorWarning': { type: 'color', value: [{ value: '#FAAD14', theme: { mode: 'light' } }, { value: '#D89614', theme: { mode: 'dark' } }] },
  'antd-colorError': { type: 'color', value: [{ value: '#FF4D4F', theme: { mode: 'light' } }, { value: '#DC4446', theme: { mode: 'dark' } }] },
  'antd-colorText': { type: 'color', value: [{ value: '#000000E0', theme: { mode: 'light' } }, { value: '#FFFFFFD9', theme: { mode: 'dark' } }] },
  'antd-colorTextSecondary': { type: 'color', value: [{ value: '#000000A6', theme: { mode: 'light' } }, { value: '#FFFFFFA6', theme: { mode: 'dark' } }] },
  'antd-colorTextTertiary': { type: 'color', value: [{ value: '#00000073', theme: { mode: 'light' } }, { value: '#FFFFFF73', theme: { mode: 'dark' } }] },
  'antd-colorTextPlaceholder': { type: 'color', value: [{ value: '#00000040', theme: { mode: 'light' } }, { value: '#FFFFFF40', theme: { mode: 'dark' } }] },
  'antd-colorBgContainer': { type: 'color', value: [{ value: '#FFFFFF', theme: { mode: 'light' } }, { value: '#141414', theme: { mode: 'dark' } }] },
  'antd-colorBgLayout': { type: 'color', value: [{ value: '#F5F5F5', theme: { mode: 'light' } }, { value: '#000000', theme: { mode: 'dark' } }] },
  'antd-colorFillAlter': { type: 'color', value: [{ value: '#00000005', theme: { mode: 'light' } }, { value: '#FFFFFF0A', theme: { mode: 'dark' } }] },
  'antd-colorBorder': { type: 'color', value: [{ value: '#D9D9D9', theme: { mode: 'light' } }, { value: '#424242', theme: { mode: 'dark' } }] },
  'antd-borderRadius': { type: 'number', value: 6 },
  'antd-borderRadiusLG': { type: 'number', value: 8 },
  'antd-fontSize': { type: 'number', value: 14 },
  'antd-controlHeight': { type: 'number', value: [{ value: 32, theme: { density: 'regular' } }, { value: 24, theme: { density: 'compact' } }] },
};

const text = (id, name, content, fill = '#000000E0', size = 14, weight, width) => ({
  type: 'text', id, name, content: String(content), fill, fontFamily: 'Inter', fontSize: size,
  ...(weight ? { fontWeight: String(weight) } : {}),
  ...(width ? { width } : {}),
});

const rect = (id, fill, width, height, radius = 6, stroke, strokeWidth = 1) => ({
  type: 'frame', id, width, height, fill, cornerRadius: radius,
  ...(stroke ? { stroke, strokeWidth } : {}),
});

const artboardHeader = (id, title, subtitle, badges = []) => ({
  type: 'frame',
  id: `${id}-banner`,
  name: 'Header Banner',
  x: 80,
  y: 60,
  width: 2200,
  height: 100,
  layout: 'vertical',
  gap: 12,
  children: [
    {
      type: 'frame',
      id: `${id}-title-row`,
      name: 'Title Row',
      width: 2200,
      height: 44,
      layout: 'horizontal',
      alignItems: 'center',
      gap: 16,
      children: [
        rect(`${id}-logo`, '#1677FF', 36, 36, 8),
        text(`${id}-title`, 'Title', title, '#000000E0', 28, '700'),
        ...badges.map((b, idx) => ({
          type: 'frame',
          id: `${id}-badge-${idx}`,
          name: 'Badge',
          height: 24,
          padding: [0, 10],
          cornerRadius: 12,
          fill: b.bg || '#E6F4FF',
          stroke: b.border || '#91CAFF',
          strokeWidth: 1,
          layout: 'horizontal',
          alignItems: 'center',
          children: [text(`${id}-badge-txt-${idx}`, 'Text', b.text, b.color || '#1677FF', 12, '600')],
        })),
      ],
    },
    text(`${id}-sub`, 'Subtitle', subtitle, '#00000073', 14),
  ],
});

const sectionHeader = (id, title, subtitle, width = 2200) => ({
  type: 'frame',
  id,
  name: `Section Header: ${title}`,
  width,
  height: 52,
  layout: 'vertical',
  gap: 4,
  children: [
    text(`${id}-title`, 'Title', title, '#1677FF', 18, '600'),
    rect(`${id}-divider`, '#F0F0F0', width, 1, 0),
  ],
});

const card = (id, title, width, height, children, meta) => ({
  type: 'frame',
  id,
  name: title,
  width,
  height,
  fill: '#FFFFFF',
  stroke: '#F0F0F0',
  strokeWidth: 1,
  cornerRadius: 8,
  padding: [16, 20],
  layout: 'vertical',
  gap: 12,
  ...(meta ? { metadata: meta } : {}),
  children: [
    text(`${id}-label`, 'Card Label', title, '#00000073', 12, '600'),
    ...children,
  ],
});

// Category classification
const categoryFor = (name) => {
  if (['Button', 'FloatButton', 'Typography'].includes(name)) return 'General';
  if (['Col', 'Divider', 'Flex', 'Grid', 'Layout', 'Masonry', 'Row', 'Space', 'Splitter'].includes(name)) return 'Layout';
  if (['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'].includes(name)) return 'Navigation';
  if (['AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form', 'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload'].includes(name)) return 'Data Entry';
  if (['Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions', 'Empty', 'Image', 'List', 'Popover', 'QRCode', 'Segmented', 'Statistic', 'Table', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree'].includes(name)) return 'Data Display';
  if (['Alert', 'Drawer', 'Modal', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'].includes(name)) return 'Feedback';
  return 'Other';
};

// ==================== CANONICAL COMPONENT VISUAL GENERATOR ====================
function createCanonicalVisual(name, index) {
  const id = `antd-${name.toLowerCase()}-${index}`;
  const cat = categoryFor(name);

  // Dedicated visual content for canonical components
  const content = [];
  let compWidth = 480;
  let compHeight = 40;
  let fill = '$antd-colorBgContainer';
  let stroke = '$antd-colorBorder';
  let strokeWidth = 1;
  let layout = 'horizontal';
  let padding = [0, 14];
  let alignItems = 'center';
  let justifyContent = 'space_between';

  if (name === 'Button') {
    fill = '$antd-colorPrimary';
    stroke = undefined;
    strokeWidth = undefined;
    justifyContent = 'center';
    content.push(text(`${id}-label`, 'Label', '主要按钮 Primary Button', '#FFFFFF', 14, '600'));
  } else if (name === 'FloatButton') {
    compHeight = 48;
    fill = '#FFFFFF';
    stroke = '#00000015';
    justifyContent = 'center';
    content.push(text(`${id}-icon`, 'Icon', '↑', '$antd-colorPrimary', 18, '700'));
  } else if (name === 'Typography') {
    compHeight = 64;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-title`, 'Title', 'Ant Design 界面语言规范', '$antd-colorText', 16, '600'));
    content.push(text(`${id}-sub`, 'Subtitle', '企业级产品设计与全栈研发规范', '$antd-colorTextSecondary', 12));
  } else if (['Input', 'AutoComplete', 'Mentions'].includes(name)) {
    content.push(text(`${id}-placeholder`, 'Placeholder', `${name} 输入框...`, '$antd-colorTextPlaceholder'));
  } else if (name === 'InputNumber') {
    content.push(text(`${id}-minus`, 'Minus', '−', '$antd-colorTextSecondary'));
    content.push(text(`${id}-val`, 'Value', '88', '$antd-colorText', 14, '600'));
    content.push(text(`${id}-plus`, 'Plus', '+', '$antd-colorTextSecondary'));
  } else if (['Select', 'Cascader', 'TreeSelect'].includes(name)) {
    content.push(text(`${id}-val`, 'Value', `请选择 ${name}`, '$antd-colorTextPlaceholder'));
    content.push(text(`${id}-arr`, 'Arrow', '⌄', '$antd-colorTextTertiary', 14));
  } else if (name === 'Checkbox') {
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(rect(`${id}-box`, '$antd-colorPrimary', 16, 16, 4));
    content.push(text(`${id}-txt`, 'Label', '多选项 Checkbox 选中态', '$antd-colorText'));
  } else if (name === 'Radio') {
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(rect(`${id}-dot`, '$antd-colorPrimary', 16, 16, 999));
    content.push(text(`${id}-txt`, 'Label', '单选框 Radio 选中态', '$antd-colorText'));
  } else if (name === 'Switch') {
    compHeight = 36;
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(rect(`${id}-track`, '$antd-colorPrimary', 44, 22, 999));
    content.push(text(`${id}-txt`, 'Label', '开启状态 Switch', '$antd-colorText'));
  } else if (name === 'DatePicker' || name === 'TimePicker') {
    content.push(text(`${id}-val`, 'Value', name === 'DatePicker' ? '2026-09-16' : '14:30:00', '$antd-colorText'));
    content.push(text(`${id}-icon`, 'Icon', '📅', '$antd-colorTextTertiary'));
  } else if (name === 'ColorPicker') {
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(rect(`${id}-swatch`, '#1677FF', 24, 24, 4));
    content.push(text(`${id}-hex`, 'Hex', '#1677FF', '$antd-colorText', 13, '600'));
  } else if (name === 'Slider') {
    layout = 'horizontal';
    alignItems = 'center';
    content.push(rect(`${id}-track`, '#F5F5F5', 400, 6, 999));
    content.push(rect(`${id}-thumb`, '$antd-colorPrimary', 14, 14, 999));
    content.push(text(`${id}-val`, 'Value', '70%', '$antd-colorPrimary', 12, '600'));
  } else if (name === 'Rate') {
    content.push(text(`${id}-stars`, 'Stars', '★★★★★', '#FAAD14', 18));
    content.push(text(`${id}-score`, 'Score', '5.0 分', '$antd-colorTextSecondary', 12));
  } else if (name === 'Upload') {
    compHeight = 72;
    layout = 'vertical';
    justifyContent = 'center';
    alignItems = 'center';
    stroke = '$antd-colorPrimary';
    content.push(text(`${id}-icon`, 'Icon', '☁', '$antd-colorPrimary', 20));
    content.push(text(`${id}-desc`, 'Desc', '点击或拖拽文件到此区域上传', '$antd-colorTextSecondary', 12));
  } else if (name === 'Transfer') {
    compHeight = 84;
    content.push(rect(`${id}-left`, '#FAFAFA', 200, 64, 6, '#E8E8E8'));
    content.push(text(`${id}-arr`, 'Arrows', '⇆', '$antd-colorPrimary', 18));
    content.push(rect(`${id}-right`, '#FAFAFA', 200, 64, 6, '#E8E8E8'));
  } else if (name === 'Form') {
    compHeight = 90;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-l1`, 'Label', '用户名：admin', '$antd-colorTextSecondary', 12));
    content.push(text(`${id}-l2`, 'Label', '密　码：••••••••', '$antd-colorTextSecondary', 12));
  } else if (name === 'Table') {
    compHeight = 110;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-th`, 'Header', '序号     名称             状态         操作', '$antd-colorTextSecondary', 12, '600'));
    content.push(text(`${id}-tr1`, 'Row 1', '01       订单服务         ● 运行中     编辑  删除', '$antd-colorText', 12));
    content.push(text(`${id}-tr2`, 'Row 2', '02       支付网关         ● 正常       编辑  删除', '$antd-colorText', 12));
  } else if (name === 'Card') {
    compHeight = 90;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-head`, 'Header', '卡片标题 · Card Title', '$antd-colorText', 14, '600'));
    content.push(text(`${id}-body`, 'Body', '卡片内容区域，展示结构化业务信息。', '$antd-colorTextSecondary', 12));
  } else if (name === 'List') {
    compHeight = 84;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-i1`, 'Item', '1. Ant Design 规范列表项一', '$antd-colorText', 12));
    content.push(text(`${id}-i2`, 'Item', '2. Ant Design 规范列表项二', '$antd-colorText', 12));
  } else if (name === 'Descriptions') {
    compHeight = 84;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-t`, 'Title', '用户信息描述', '$antd-colorText', 13, '600'));
    content.push(text(`${id}-p`, 'Pairs', '姓名：张三    手机：13800000000    部门：体验技术部', '$antd-colorTextSecondary', 11));
  } else if (name === 'Collapse') {
    compHeight = 72;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-h`, 'Header', '⌄ 折叠面板标题 (展开态)', '$antd-colorText', 13, '600'));
    content.push(text(`${id}-c`, 'Content', '面板展开后显示的信息详情', '$antd-colorTextSecondary', 12));
  } else if (name === 'Avatar') {
    compHeight = 56;
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(rect(`${id}-av`, '#D6E4FF', 40, 40, 999));
    content.push(text(`${id}-txt`, 'Name', 'Ant Design Avatar (用户头像)', '$antd-colorText'));
  } else if (name === 'Badge') {
    compHeight = 48;
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(text(`${id}-msg`, 'Text', '未读消息', '$antd-colorText'));
    content.push(rect(`${id}-dot`, '$antd-colorError', 18, 18, 999));
    content.push(text(`${id}-cnt`, 'Count', '8', '#FFFFFF', 11, '600'));
  } else if (name === 'Tag') {
    compHeight = 44;
    justifyContent = 'flex-start';
    layout = 'horizontal';
    content.push(rect(`${id}-tag1`, '#E6F4FF', 64, 26, 4, '$antd-colorPrimary'));
    content.push(text(`${id}-t1`, 'Text', '标签一', '$antd-colorPrimary', 12));
    content.push(rect(`${id}-tag2`, '#F6FFED', 64, 26, 4, '#52C41A'));
    content.push(text(`${id}-t2`, 'Text', '标签二', '#52C41A', 12));
  } else if (name === 'Segmented') {
    compHeight = 44;
    fill = '#F5F5F5';
    stroke = undefined;
    justifyContent = 'flex-start';
    content.push(rect(`${id}-act`, '#FFFFFF', 100, 30, 4));
    content.push(text(`${id}-a`, 'Opt', '日度数据', '$antd-colorText', 12, '600'));
    content.push(text(`${id}-b`, 'Opt', '月度数据', '$antd-colorTextSecondary', 12));
  } else if (name === 'Statistic') {
    compHeight = 72;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-st`, 'Title', '活跃指标 (DAU)', '$antd-colorTextSecondary', 12));
    content.push(text(`${id}-sv`, 'Value', '1,289,340', '$antd-colorText', 22, '700'));
  } else if (name === 'Breadcrumb') {
    content.push(text(`${id}-b1`, 'Item', '首页  /', '$antd-colorTextSecondary', 13));
    content.push(text(`${id}-b2`, 'Item', '组件中心  /', '$antd-colorTextSecondary', 13));
    content.push(text(`${id}-b3`, 'Item', '通用视图', '$antd-colorText', 13, '600'));
  } else if (name === 'Dropdown') {
    content.push(text(`${id}-label`, 'Label', '下拉操作菜单', '$antd-colorText', 14));
    content.push(text(`${id}-arrow`, 'Arrow', '⌄', '$antd-colorTextTertiary', 14));
  } else if (name === 'Menu') {
    compHeight = 84;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-m1`, 'Item', '▣  工作台概览', '$antd-colorPrimary', 13, '600'));
    content.push(text(`${id}-m2`, 'Item', '▤  资产管理中心', '$antd-colorText', 13));
  } else if (name === 'Pagination') {
    content.push(text(`${id}-pg`, 'Pages', '‹   1   [2]   3   4   5   ›   跳至 2 页', '$antd-colorText', 13));
  } else if (name === 'Steps') {
    content.push(text(`${id}-s1`, 'S1', '① 身份核验 ›', '$antd-colorPrimary', 13, '600'));
    content.push(text(`${id}-s2`, 'S2', '② 参数配置 ›', '$antd-colorPrimary', 13, '600'));
    content.push(text(`${id}-s3`, 'S3', '③ 确认完成', '$antd-colorTextTertiary', 13));
  } else if (name === 'Tabs') {
    compHeight = 48;
    content.push(text(`${id}-t1`, 'Tab', '[用户概览]', '$antd-colorPrimary', 14, '600'));
    content.push(text(`${id}-t2`, 'Tab', '安全设置', '$antd-colorText', 14));
    content.push(text(`${id}-t3`, 'Tab', '通知配置', '$antd-colorText', 14));
  } else if (name === 'Anchor') {
    content.push(text(`${id}-a1`, 'Link', '|  1. 设计语言规范', '$antd-colorPrimary', 13, '600'));
    content.push(text(`${id}-a2`, 'Link', '   2. 组件属性参数', '$antd-colorTextSecondary', 13));
  } else if (name === 'Alert') {
    fill = '#FFFBE6';
    stroke = '#FFE58F';
    content.push(text(`${id}-icon`, 'Icon', '⚠', '#FAAD14', 16));
    content.push(text(`${id}-msg`, 'Msg', '提示信息：当前组件规范已全量对齐 Ant Design 6.6.4', '$antd-colorText', 13));
  } else if (name === 'Modal') {
    compHeight = 96;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-head`, 'Head', '确认提示 (Modal Dialog)', '$antd-colorText', 14, '600'));
    content.push(text(`${id}-desc`, 'Desc', '确定要保存所有已配置的组件属性吗？', '$antd-colorTextSecondary', 12));
  } else if (name === 'Drawer') {
    compHeight = 80;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(text(`${id}-dh`, 'Head', '抽屉详情面板 (Drawer)', '$antd-colorText', 14, '600'));
    content.push(text(`${id}-db`, 'Body', '从右侧滑出的辅助配置抽屉', '$antd-colorTextSecondary', 12));
  } else if (name === 'Progress') {
    layout = 'horizontal';
    alignItems = 'center';
    content.push(rect(`${id}-bar`, '$antd-colorPrimary', 380, 8, 999));
    content.push(text(`${id}-pct`, 'Pct', '85%', '$antd-colorTextSecondary', 12, '600'));
  } else if (name === 'Result') {
    compHeight = 84;
    layout = 'vertical';
    justifyContent = 'center';
    alignItems = 'center';
    content.push(text(`${id}-ricon`, 'Icon', '✓ 操作成功', '#52C41A', 15, '600'));
    content.push(text(`${id}-rsub`, 'Sub', '提交成功，已完成 Ant Design 规范校验', '$antd-colorTextSecondary', 12));
  } else if (name === 'Skeleton') {
    compHeight = 72;
    layout = 'vertical';
    justifyContent = 'center';
    content.push(rect(`${id}-sk1`, '#F0F0F0', 200, 14, 4));
    content.push(rect(`${id}-sk2`, '#F0F0F0', 400, 12, 4));
  } else if (name === 'Spin') {
    compHeight = 56;
    justifyContent = 'center';
    content.push(text(`${id}-sp`, 'Spin', '◌ 加载中...', '$antd-colorPrimary', 14, '600'));
  } else if (name === 'Divider') {
    compHeight = 1;
    stroke = undefined;
    strokeWidth = undefined;
    fill = '#D9D9D9';
  } else if (['Flex', 'Grid', 'Layout', 'Masonry', 'Row', 'Col', 'Space', 'Splitter'].includes(name)) {
    compHeight = 64;
    fill = '#FAFAFA';
    layout = 'horizontal';
    alignItems = 'center';
    justifyContent = 'flex-start';
    content.push(rect(`${id}-box1`, '#D6E4FF', 100, 36, 4, '$antd-colorPrimary'));
    content.push(text(`${id}-lbl1`, 'Col 1', `${name} 栅格块 A`, '$antd-colorPrimary', 11));
    content.push(rect(`${id}-box2`, '#E6F4FF', 100, 36, 4, '$antd-colorPrimary'));
    content.push(text(`${id}-lbl2`, 'Col 2', `${name} 栅格块 B`, '$antd-colorPrimary', 11));
  } else {
    content.push(text(`${id}-lbl`, 'Label', `${name} 组件`, '$antd-colorText', 14));
    content.push(text(`${id}-ver`, 'Version', 'v6.6.4', '$antd-colorTextTertiary', 12));
  }

  // Canonical component frame
  return {
    type: 'frame',
    id,
    name: `Antd/${cat}/${name}`,
    reusable: true,
    metadata: {
      type: 'antd-component',
      antd: {
        component: name,
        category: cat,
        version: '6.6.4',
        props: {},
        tokens: {},
      },
    },
    width: compWidth,
    height: compHeight,
    fill,
    cornerRadius: name === 'Divider' ? 0 : '$antd-borderRadius',
    stroke,
    strokeWidth,
    layout: name === 'Divider' ? undefined : layout,
    gap: 10,
    padding: name === 'Divider' ? undefined : padding,
    alignItems: name === 'Divider' ? undefined : alignItems,
    justifyContent: name === 'Divider' ? undefined : justifyContent,
    children: content,
  };
}

// ==================== ARTBOARD 1: COMPONENTS OVERVIEW ====================
function buildOverviewArtboard() {
  const colDefinitions = [
    {
      colX: 80,
      sections: [
        { title: 'General · 通用', components: ['Button', 'FloatButton', 'Typography'] },
        { title: 'Navigation · 导航', components: ['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'] },
        { title: 'Feedback · 反馈', components: ['Alert', 'Drawer', 'Modal', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'] },
      ],
    },
    {
      colX: 640,
      sections: [
        {
          title: 'Data Entry · 数据录入',
          components: [
            'AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form',
            'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider',
            'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload',
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
            'Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions',
            'Empty', 'Image', 'List', 'Listy', 'Popover', 'QRCode', 'Segmented', 'Statistic',
            'Table', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree',
          ],
        },
      ],
    },
    {
      colX: 1760,
      sections: [
        { title: 'Layout · 布局', components: ['Col', 'Divider', 'Flex', 'Grid', 'Layout', 'Masonry', 'Row', 'Space', 'Splitter'] },
        { title: 'Other · 全局与配置', components: ['Affix', 'App', 'BackTop', 'BorderBeam'] },
      ],
    },
  ];

  const artboardChildren = [];
  artboardChildren.push(artboardHeader(
    'ov-header',
    'Ant Design 6 · Components Overview',
    'Official Ant Design 6.6.4 UI Kit · 71 Canonical Components · Complete TypeScript Types & Inspector Schema',
    [
      { text: 'v6.6.4 Stable', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' },
      { text: '71 Components', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' },
      { text: '1,333 Props', bg: '#FFF7E6', border: '#FFD591', color: '#FA8C16' },
      { text: 'Design System Kit', bg: '#F9F0FF', border: '#D3ADF7', color: '#722ED1' },
    ]
  ));

  let globalIndex = 0;
  let maxCalculatedY = 0;

  for (const col of colDefinitions) {
    let curY = 200;
    for (const sec of col.sections) {
      const secId = `ov-sec-${sec.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
      artboardChildren.push({
        type: 'text',
        id: `${secId}-title`,
        name: `Section: ${sec.title}`,
        x: col.colX,
        y: curY,
        content: sec.title,
        fill: '#1677FF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
      });
      artboardChildren.push({
        type: 'frame',
        id: `${secId}-line`,
        name: 'Divider',
        x: col.colX,
        y: curY + 28,
        width: 480,
        height: 1,
        fill: '#F0F0F0',
      });
      curY += 44;

      for (const compName of sec.components) {
        const compNode = createCanonicalVisual(compName, globalIndex++);
        compNode.x = col.colX;
        compNode.y = curY;
        artboardChildren.push(compNode);
        curY += (compNode.height || 40) + 20;
      }
      curY += 28;
    }
    if (curY > maxCalculatedY) maxCalculatedY = curY;
  }

  const artboardHeight = Math.max(4200, Math.ceil((maxCalculatedY + 120) / 100) * 100);
  return {
    type: 'frame',
    id: 'artboard-components-overview',
    name: 'antd: components overview',
    x: 0,
    y: 0,
    width: 2360,
    height: artboardHeight,
    fill: '#FFFFFF',
    cornerRadius: 12,
    clip: true,
    layout: 'none',
    children: artboardChildren,
  };
}

// ==================== ARTBOARD 2: GENERAL & NAVIGATION VARIANTS ====================
function buildGeneralNavArtboard() {
  const children = [];
  children.push(artboardHeader(
    'gn-header',
    'Ant Design 6 · General & Navigation Components (通用与导航)',
    'Full variant matrices: Button types/states/sizes/shapes, FloatButton, Typography H1-H5, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs, Anchor',
    [
      { text: 'General & Navigation', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' },
      { text: 'Full Variant Matrix', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' },
    ]
  ));

  let curY = 200;

  // 1. Button Full Matrix
  children.push({
    type: 'frame',
    id: 'sec-btn-matrix',
    name: 'Button 按钮全变体矩阵',
    x: 80,
    y: curY,
    width: 2200,
    height: 480,
    fill: '#FFFFFF',
    stroke: '#F0F0F0',
    strokeWidth: 1,
    cornerRadius: 12,
    padding: [24, 32],
    layout: 'vertical',
    gap: 20,
    children: [
      text('btn-sec-title', 'Title', 'Button 按钮 · 全状态与全形态矩阵', '#000000E0', 18, '600'),
      rect('btn-sec-line', '#F0F0F0', 2136, 1, 0),
      // Row 1: Types
      {
        type: 'frame', id: 'btn-row-types', name: 'Types', width: 2136, height: 40, layout: 'horizontal', gap: 16, alignItems: 'center',
        children: [
          text('lbl-t', 'L', '类型 (type):', '#00000073', 13, '600', 100),
          rect('btn-t1', '$antd-colorPrimary', 110, 36, 6),
          text('btn-t1-txt', 'T', '主要按钮', '#FFFFFF', 14, '500'),
          rect('btn-t2', '#FFFFFF', 110, 36, 6, '#D9D9D9'),
          text('btn-t2-txt', 'T', '默认按钮', '#000000E0', 14, '500'),
          rect('btn-t3', '#FFFFFF', 110, 36, 6, '$antd-colorPrimary'),
          text('btn-t3-txt', 'T', '虚线按钮', '$antd-colorPrimary', 14, '500'),
          rect('btn-t4', '#00000000', 100, 36, 6),
          text('btn-t4-txt', 'T', '文本按钮', '#000000E0', 14, '500'),
          rect('btn-t5', '#00000000', 100, 36, 6),
          text('btn-t5-txt', 'T', '链接按钮', '$antd-colorPrimary', 14, '500'),
          rect('btn-t6', '$antd-colorError', 120, 36, 6),
          text('btn-t6-txt', 'T', '危险主按钮', '#FFFFFF', 14, '500'),
          rect('btn-t7', '#FFFFFF', 120, 36, 6, '$antd-colorError'),
          text('btn-t7-txt', 'T', '危险次按钮', '$antd-colorError', 14, '500'),
        ],
      },
      // Row 2: States
      {
        type: 'frame', id: 'btn-row-states', name: 'States', width: 2136, height: 40, layout: 'horizontal', gap: 16, alignItems: 'center',
        children: [
          text('lbl-s', 'L', '状态 (state):', '#00000073', 13, '600', 100),
          rect('btn-s1', '#4096FF', 110, 36, 6),
          text('btn-s1-txt', 'T', '悬浮态 Hover', '#FFFFFF', 14, '500'),
          rect('btn-s2', '#0958D9', 110, 36, 6),
          text('btn-s2-txt', 'T', '激活态 Active', '#FFFFFF', 14, '500'),
          rect('btn-s3', '$antd-colorPrimary', 120, 36, 6),
          text('btn-s3-txt', 'T', '⌛ 加载 Loading', '#FFFFFF', 14, '500'),
          rect('btn-s4', '#0000000A', 110, 36, 6, '#D9D9D9'),
          text('btn-s4-txt', 'T', '禁用态 Disabled', '#00000040', 14, '500'),
          rect('btn-s5', '#00000000', 110, 36, 6, '$antd-colorPrimary'),
          text('btn-s5-txt', 'T', '幽灵态 Ghost', '$antd-colorPrimary', 14, '500'),
        ],
      },
      // Row 3: Sizes & Shapes
      {
        type: 'frame', id: 'btn-row-sizes', name: 'Sizes & Shapes', width: 2136, height: 44, layout: 'horizontal', gap: 16, alignItems: 'center',
        children: [
          text('lbl-sz', 'L', '尺寸与形状:', '#00000073', 13, '600', 100),
          rect('btn-sz-lg', '$antd-colorPrimary', 120, 40, 8),
          text('btn-sz-lg-t', 'T', '大尺寸 Large (40)', '#FFFFFF', 14, '500'),
          rect('btn-sz-md', '$antd-colorPrimary', 120, 32, 6),
          text('btn-sz-md-t', 'T', '中尺寸 Middle (32)', '#FFFFFF', 14, '500'),
          rect('btn-sz-sm', '$antd-colorPrimary', 110, 24, 4),
          text('btn-sz-sm-t', 'T', '小尺寸 Small (24)', '#FFFFFF', 12, '500'),
          rect('btn-sh-round', '$antd-colorPrimary', 130, 36, 999),
          text('btn-sh-round-t', 'T', '圆角按钮 Round', '#FFFFFF', 14, '500'),
          rect('btn-sh-cir', '$antd-colorPrimary', 36, 36, 999),
          text('btn-sh-cir-t', 'T', '🔍', '#FFFFFF', 14, '700'),
          rect('btn-sh-block', '$antd-colorPrimary', 300, 36, 6),
          text('btn-sh-block-t', 'T', '全宽块状按钮 (block: true)', '#FFFFFF', 14, '500'),
        ],
      },
      // Row 4: Icons & Groups
      {
        type: 'frame', id: 'btn-row-icons', name: 'Icons & Groups', width: 2136, height: 40, layout: 'horizontal', gap: 16, alignItems: 'center',
        children: [
          text('lbl-ic', 'L', '图标与按钮组:', '#00000073', 13, '600', 100),
          rect('btn-ic-pre', '$antd-colorPrimary', 130, 36, 6),
          text('btn-ic-pre-t', 'T', '🔍 搜索前缀', '#FFFFFF', 14, '500'),
          rect('btn-ic-suf', '$antd-colorPrimary', 130, 36, 6),
          text('btn-ic-suf-t', 'T', '下载文件 ⬇', '#FFFFFF', 14, '500'),
          // Group
          rect('btn-grp-1', '#FFFFFF', 90, 36, 0, '#D9D9D9'),
          text('btn-grp-1-t', 'T', '左对齐', '#000000E0', 13),
          rect('btn-grp-2', '#FFFFFF', 90, 36, 0, '#D9D9D9'),
          text('btn-grp-2-t', 'T', '居中', '#000000E0', 13),
          rect('btn-grp-3', '#FFFFFF', 90, 36, 0, '#D9D9D9'),
          text('btn-grp-3-t', 'T', '右对齐', '#000000E0', 13),
        ],
      },
    ],
  });

  curY += 510;

  // 2. FloatButton & Typography & Anchor
  children.push({
    type: 'frame',
    id: 'sec-float-typo',
    name: 'FloatButton & Typography',
    x: 80,
    y: curY,
    width: 2200,
    height: 400,
    layout: 'horizontal',
    gap: 32,
    children: [
      // FloatButton Card
      {
        type: 'frame', id: 'card-fb', name: 'FloatButton', width: 500, height: 400, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 12, padding: [24, 24], layout: 'vertical', gap: 16,
        children: [
          text('fb-title', 'T', 'FloatButton 悬浮按钮', '#000000E0', 16, '600'),
          rect('fb-line', '#F0F0F0', 452, 1, 0),
          {
            type: 'frame', id: 'fb-row-1', width: 452, height: 56, layout: 'horizontal', gap: 20, alignItems: 'center',
            children: [
              rect('fb-c1', '$antd-colorPrimary', 48, 48, 999),
              text('fb-c1-i', 'I', '↑', '#FFFFFF', 20, '700'),
              rect('fb-c2', '#FFFFFF', 48, 48, 999, '#E8E8E8'),
              text('fb-c2-i', 'I', '💬', '$antd-colorPrimary', 18),
              rect('fb-c3', '#FFFFFF', 48, 48, 8, '#E8E8E8'),
              text('fb-c3-i', 'I', '⚙', '$antd-colorPrimary', 18),
            ],
          },
          text('fb-sub', 'Sub', '支持圆角、方形、徽标数、Tooltip 及回到顶部 BackTop 功能', '#00000073', 13),
        ],
      },
      // Typography Card
      {
        type: 'frame', id: 'card-typo', name: 'Typography', width: 1668, height: 400, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 12, padding: [24, 32], layout: 'vertical', gap: 12,
        children: [
          text('typo-title', 'T', 'Typography 排版规范 (H1-H5, Text Types, Formats)', '#000000E0', 16, '600'),
          rect('typo-line', '#F0F0F0', 1604, 1, 0),
          text('h1', 'H1', 'H1 一级主标题 · 38px 优雅清晰', '#000000E0', 32, '700'),
          text('h2', 'H2', 'H2 二级标题 · 30px 层次分明', '#000000E0', 24, '600'),
          text('h3', 'H3', 'H3 三级标题 · 24px 结构化展示', '#000000E0', 18, '600'),
          text('h4', 'H4', 'H4 四级标题 · 20px 模块小标题', '#000000E0', 15, '600'),
          {
            type: 'frame', id: 'typo-row-types', width: 1604, height: 28, layout: 'horizontal', gap: 24,
            children: [
              text('tt-sec', 'T', '次要文本 Secondary', '#00000073', 14),
              text('tt-suc', 'T', '成功文本 Success', '#52C41A', 14),
              text('tt-war', 'T', '警告文本 Warning', '#FAAD14', 14),
              text('tt-dan', 'T', '危险文本 Danger', '#FF4D4F', 14),
              text('tt-dis', 'T', '禁用文本 Disabled', '#00000040', 14),
            ],
          },
          {
            type: 'frame', id: 'typo-row-fmt', width: 1604, height: 28, layout: 'horizontal', gap: 24, alignItems: 'center',
            children: [
              text('tf-str', 'T', '加粗 Strong', '#000000E0', 14, '700'),
              text('tf-del', 'T', '删除线 Delete', '#00000073', 14),
              text('tf-code', 'T', 'code 标签', '$antd-colorPrimary', 13),
              text('tf-kbd', 'T', '⌘ + K 快捷键', '#000000A6', 13),
              text('tf-mark', 'T', '高亮 Mark 标记', '#000000E0', 14),
            ],
          },
        ],
      },
    ],
  });

  curY += 430;

  // 3. Navigation: Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs
  children.push({
    type: 'frame',
    id: 'sec-nav-matrix',
    name: 'Navigation 导航套件矩阵',
    x: 80,
    y: curY,
    width: 2200,
    height: 750,
    fill: '#FFFFFF',
    stroke: '#F0F0F0',
    strokeWidth: 1,
    cornerRadius: 12,
    padding: [24, 32],
    layout: 'vertical',
    gap: 24,
    children: [
      text('nav-title', 'T', 'Navigation 导航组件全家桶 (Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs)', '#000000E0', 18, '600'),
      rect('nav-line', '#F0F0F0', 2136, 1, 0),
      // Breadcrumb & Dropdown row
      {
        type: 'frame', id: 'nav-row-bd', width: 2136, height: 48, layout: 'horizontal', gap: 48, alignItems: 'center',
        children: [
          text('nav-lbl-bc', 'L', 'Breadcrumb 面包屑:', '#00000073', 13, '600', 150),
          text('bc-val', 'V', '首页  /  应用中心  /  订单管理  /  订单详情 (当前页)', '$antd-colorText', 14),
          text('nav-lbl-dd', 'L', 'Dropdown 下拉菜单:', '#00000073', 13, '600', 150),
          rect('dd-btn', '#FFFFFF', 160, 36, 6, '#D9D9D9'),
          text('dd-btn-txt', 'T', '下拉操作菜单 ⌄', '$antd-colorText', 13),
        ],
      },
      // Menu Navbar Row
      {
        type: 'frame', id: 'nav-row-menu', width: 2136, height: 48, layout: 'horizontal', gap: 32, alignItems: 'center', fill: '#FAFAFA', padding: [0, 20], cornerRadius: 6,
        children: [
          text('menu-logo', 'L', 'ANT DESIGN', '$antd-colorPrimary', 14, '700'),
          text('menu-i1', 'I', '[ 首页概览 ]', '$antd-colorPrimary', 14, '600'),
          text('menu-i2', 'I', '数据分析', '$antd-colorText', 14),
          text('menu-i3', 'I', '资产中心', '$antd-colorText', 14),
          text('menu-i4', 'I', '系统设置 ⌄', '$antd-colorText', 14),
        ],
      },
      // Steps Row
      {
        type: 'frame', id: 'nav-row-steps', width: 2136, height: 64, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('steps-lbl', 'L', 'Steps 步骤条:', '#00000073', 13, '600', 150),
          rect('st-c1', '#52C41A', 28, 28, 999),
          text('st-c1-t', 'T', '✓', '#FFFFFF', 14, '700'),
          text('st-t1', 'T', '第一步：实名认证 (已完成)', '#000000E0', 14, '600'),
          rect('st-l1', '$antd-colorPrimary', 100, 2, 0),
          rect('st-c2', '$antd-colorPrimary', 28, 28, 999),
          text('st-c2-t', 'T', '2', '#FFFFFF', 14, '700'),
          text('st-t2', 'T', '第二步：系统参数配置 (处理中)', '$antd-colorPrimary', 14, '600'),
          rect('st-l2', '#D9D9D9', 100, 2, 0),
          rect('st-c3', '#F5F5F5', 28, 28, 999, '#D9D9D9'),
          text('st-c3-t', 'T', '3', '#00000040', 14, '700'),
          text('st-t3', 'T', '第三步：完成部署 (待处理)', '#00000040', 14),
        ],
      },
      // Tabs Row
      {
        type: 'frame', id: 'nav-row-tabs', width: 2136, height: 48, layout: 'horizontal', gap: 32, alignItems: 'center',
        children: [
          text('tabs-lbl', 'L', 'Tabs 标签页:', '#00000073', 13, '600', 150),
          text('tab-1', 'T', '[ 基本信息概览 ]', '$antd-colorPrimary', 14, '600'),
          text('tab-2', 'T', '安全与权限策略', '$antd-colorText', 14),
          text('tab-3', 'T', '消息推送通道', '$antd-colorText', 14),
          text('tab-4', 'T', '第三方平台集成', '$antd-colorText', 14),
        ],
      },
      // Pagination Row
      {
        type: 'frame', id: 'nav-row-pg', width: 2136, height: 48, layout: 'horizontal', gap: 20, alignItems: 'center',
        children: [
          text('pg-lbl', 'L', 'Pagination 分页:', '#00000073', 13, '600', 150),
          text('pg-tot', 'T', '共 1,280 条记录', '#00000073', 13),
          rect('pg-p1', '#FFFFFF', 32, 32, 4, '#D9D9D9'),
          text('pg-p1-t', 'T', '‹', '#000000E0', 14),
          rect('pg-p2', '#FFFFFF', 32, 32, 4, '#D9D9D9'),
          text('pg-p2-t', 'T', '1', '#000000E0', 13),
          rect('pg-p3', '$antd-colorPrimary', 32, 32, 4),
          text('pg-p3-t', 'T', '2', '#FFFFFF', 13, '600'),
          rect('pg-p4', '#FFFFFF', 32, 32, 4, '#D9D9D9'),
          text('pg-p4-t', 'T', '3', '#000000E0', 13),
          rect('pg-p5', '#FFFFFF', 32, 32, 4, '#D9D9D9'),
          text('pg-p5-t', 'T', '4', '#000000E0', 13),
          rect('pg-p6', '#FFFFFF', 32, 32, 4, '#D9D9D9'),
          text('pg-p6-t', 'T', '›', '#000000E0', 14),
          text('pg-size', 'T', '10 条/页 ⌄', '#000000E0', 13),
          text('pg-jump', 'T', '跳至  [ 2 ]  页', '#00000073', 13),
        ],
      },
    ],
  });

  return {
    type: 'frame',
    id: 'artboard-general-nav',
    name: 'antd: general & navigation',
    x: 2480,
    y: 0,
    width: 2360,
    height: 3800,
    fill: '#FFFFFF',
    cornerRadius: 12,
    clip: true,
    layout: 'none',
    children,
  };
}

// ==================== ARTBOARD 3: DATA ENTRY VARIANTS ====================
function buildDataEntryArtboard() {
  const children = [];
  children.push(artboardHeader(
    'de-header',
    'Ant Design 6 · Data Entry Components (数据录入)',
    'Full input controls: Input variants/status/sizes, Select single/multiple/search, Checkbox, Radio, Switch, DatePicker, Slider, Rate, ColorPicker, Transfer, Form',
    [
      { text: 'Data Entry', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' },
      { text: '18 Components', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' },
      { text: 'Clean Interactive Props', bg: '#FFF7E6', border: '#FFD591', color: '#FA8C16' },
    ]
  ));

  let curY = 200;

  // 1. Input Suite
  children.push({
    type: 'frame',
    id: 'sec-input-suite',
    name: 'Input 输入框全系',
    x: 80,
    y: curY,
    width: 2200,
    height: 520,
    fill: '#FFFFFF',
    stroke: '#F0F0F0',
    strokeWidth: 1,
    cornerRadius: 12,
    padding: [24, 32],
    layout: 'vertical',
    gap: 18,
    children: [
      text('in-title', 'T', 'Input 输入框 · 全尺寸、前缀后缀、校验状态与变体', '#000000E0', 18, '600'),
      rect('in-line', '#F0F0F0', 2136, 1, 0),
      // Row 1: Sizes
      {
        type: 'frame', id: 'in-row-sizes', width: 2136, height: 48, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('in-lbl-sz', 'L', '尺寸规格:', '#00000073', 13, '600', 100),
          rect('in-lg', '#FFFFFF', 300, 40, 8, '#D9D9D9'),
          text('in-lg-t', 'T', 'Large 大尺寸 (40px)', '#000000E0', 14),
          rect('in-md', '#FFFFFF', 300, 32, 6, '#D9D9D9'),
          text('in-md-t', 'T', 'Middle 中尺寸 (32px)', '#000000E0', 14),
          rect('in-sm', '#FFFFFF', 300, 24, 4, '#D9D9D9'),
          text('in-sm-t', 'T', 'Small 小尺寸 (24px)', '#000000E0', 12),
        ],
      },
      // Row 2: Status & Variants
      {
        type: 'frame', id: 'in-row-status', width: 2136, height: 44, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('in-lbl-st', 'L', '校验与变体:', '#00000073', 13, '600', 100),
          rect('in-err', '#FFFFFF', 260, 36, 6, '#FF4D4F'),
          text('in-err-t', 'T', '错误校验状态 (error)', '#FF4D4F', 13),
          rect('in-war', '#FFFFFF', 260, 36, 6, '#FAAD14'),
          text('in-war-t', 'T', '警告校验状态 (warning)', '#FAAD14', 13),
          rect('in-fill', '#00000005', 260, 36, 6),
          text('in-fill-t', 'T', '填充底色变体 (filled)', '#00000073', 13),
          rect('in-bl', '#00000000', 260, 36, 0),
          text('in-bl-t', 'T', '无边框变体 (borderless)', '$antd-colorPrimary', 13),
        ],
      },
      // Row 3: Prefix, Suffix, Password, Search
      {
        type: 'frame', id: 'in-row-features', width: 2136, height: 44, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('in-lbl-ft', 'L', '增强功能:', '#00000073', 13, '600', 100),
          rect('in-pre', '#FFFFFF', 260, 36, 6, '#D9D9D9'),
          text('in-pre-t', 'T', '👤 请输入账号', '#00000073', 13),
          rect('in-pwd', '#FFFFFF', 260, 36, 6, '#D9D9D9'),
          text('in-pwd-t', 'T', '••••••••••   👁', '#000000E0', 13),
          rect('in-search', '#FFFFFF', 300, 36, 6, '$antd-colorPrimary'),
          text('in-search-t', 'T', '搜索关键词...      [ 搜索 ]', '$antd-colorPrimary', 13),
          rect('in-clear', '#FFFFFF', 260, 36, 6, '#D9D9D9'),
          text('in-clear-t', 'T', '已输入内容        ✕', '#000000E0', 13),
        ],
      },
    ],
  });

  curY += 550;

  // 2. Select, Cascader, DatePicker, Slider, Switch, Checkbox, Radio, Rate
  children.push({
    type: 'frame',
    id: 'sec-pickers-matrix',
    name: '选择类与开关类组件',
    x: 80,
    y: curY,
    width: 2200,
    height: 680,
    fill: '#FFFFFF',
    stroke: '#F0F0F0',
    strokeWidth: 1,
    cornerRadius: 12,
    padding: [24, 32],
    layout: 'vertical',
    gap: 24,
    children: [
      text('pk-title', 'T', '选择器与交互控件 (Select, DatePicker, Switch, Checkbox, Radio, Slider, Rate)', '#000000E0', 18, '600'),
      rect('pk-line', '#F0F0F0', 2136, 1, 0),
      // Select row
      {
        type: 'frame', id: 'pk-row-sel', width: 2136, height: 44, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('pk-lbl-sel', 'L', 'Select 选择器:', '#00000073', 13, '600', 120),
          rect('sel-single', '#FFFFFF', 280, 36, 6, '#D9D9D9'),
          text('sel-single-t', 'T', '单选：北京市 ⌄', '#000000E0', 13),
          rect('sel-multi', '#FFFFFF', 460, 36, 6, '#D9D9D9'),
          text('sel-multi-t', 'T', '[React ✕]  [Vue ✕]  [Ant Design ✕]  ⌄', '$antd-colorPrimary', 13),
          rect('sel-dis', '#0000000A', 240, 36, 6, '#D9D9D9'),
          text('sel-dis-t', 'T', '禁用选择器 ⌄', '#00000040', 13),
        ],
      },
      // Checkbox & Radio & Switch Row
      {
        type: 'frame', id: 'pk-row-toggles', width: 2136, height: 44, layout: 'horizontal', gap: 32, alignItems: 'center',
        children: [
          text('pk-lbl-tog', 'L', '状态开关:', '#00000073', 13, '600', 120),
          rect('cb-chk', '$antd-colorPrimary', 18, 18, 4),
          text('cb-chk-t', 'T', '✓ Checkbox 选中', '$antd-colorText', 13),
          rect('cb-unchk', '#FFFFFF', 18, 18, 4, '#D9D9D9'),
          text('cb-unchk-t', 'T', 'Checkbox 未选', '$antd-colorTextSecondary', 13),
          rect('rd-chk', '$antd-colorPrimary', 18, 18, 999),
          text('rd-chk-t', 'T', '● Radio 选中', '$antd-colorText', 13),
          rect('sw-on', '$antd-colorPrimary', 44, 22, 999),
          text('sw-on-t', 'T', 'Switch 开启态', '$antd-colorText', 13),
          rect('sw-off', '#00000040', 44, 22, 999),
          text('sw-off-t', 'T', 'Switch 关闭态', '$antd-colorTextSecondary', 13),
        ],
      },
      // DatePicker & TimePicker Row
      {
        type: 'frame', id: 'pk-row-date', width: 2136, height: 44, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('pk-lbl-date', 'L', '日期与时间:', '#00000073', 13, '600', 120),
          rect('dp-single', '#FFFFFF', 260, 36, 6, '#D9D9D9'),
          text('dp-single-t', 'T', '2026-09-16   📅', '#000000E0', 13),
          rect('dp-range', '#FFFFFF', 360, 36, 6, '#D9D9D9'),
          text('dp-range-t', 'T', '2026-09-01  ~  2026-09-30   📅', '#000000E0', 13),
          rect('tp-single', '#FFFFFF', 220, 36, 6, '#D9D9D9'),
          text('tp-single-t', 'T', '14:30:00   ⏰', '#000000E0', 13),
        ],
      },
      // Slider & Rate Row
      {
        type: 'frame', id: 'pk-row-slider', width: 2136, height: 44, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('pk-lbl-sld', 'L', '滑动与评分:', '#00000073', 13, '600', 120),
          rect('sld-track', '#F5F5F5', 400, 6, 999),
          rect('sld-bar', '$antd-colorPrimary', 260, 6, 999),
          text('sld-val', 'T', '65%', '$antd-colorPrimary', 13, '600'),
          text('rate-stars', 'T', '★★★★★  5.0 分', '#FAAD14', 16, '600'),
          rect('cp-swatch', '#1677FF', 28, 28, 6),
          text('cp-val', 'T', 'ColorPicker: #1677FF', '$antd-colorText', 13, '600'),
        ],
      },
    ],
  });

  return {
    type: 'frame',
    id: 'artboard-data-entry',
    name: 'antd: data entry',
    x: 4960,
    y: 0,
    width: 2360,
    height: 4400,
    fill: '#FFFFFF',
    cornerRadius: 12,
    clip: true,
    layout: 'none',
    children,
  };
}

// ==================== ARTBOARD 4: DATA DISPLAY VARIANTS ====================
function buildDataDisplayArtboard() {
  const children = [];
  children.push(artboardHeader(
    'dd-header',
    'Ant Design 6 · Data Display Components (数据展示)',
    'Enterprise data visual showcase: Table with pagination, Card with header & cover, List, Descriptions, Avatar group, Badge & Tag colors, Statistic metrics',
    [
      { text: 'Data Display', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' },
      { text: '20 Components', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' },
      { text: 'Enterprise Fidelity', bg: '#FFF7E6', border: '#FFD591', color: '#FA8C16' },
    ]
  ));

  let curY = 200;

  // 1. Table & Card Showcase
  children.push({
    type: 'frame',
    id: 'sec-table-card',
    name: 'Table & Card',
    x: 80,
    y: curY,
    width: 2200,
    height: 600,
    layout: 'horizontal',
    gap: 32,
    children: [
      // Table Card
      {
        type: 'frame', id: 'card-table-full', width: 1400, height: 600, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 12, padding: [24, 32], layout: 'vertical', gap: 16,
        children: [
          text('tbl-head-title', 'T', 'Table 企业级数据表格 (带复选框、状态标签、分页与排序)', '#000000E0', 16, '600'),
          rect('tbl-line', '#F0F0F0', 1336, 1, 0),
          // Table Header
          {
            type: 'frame', id: 'tbl-th', width: 1336, height: 44, fill: '#FAFAFA', padding: [0, 16], layout: 'horizontal', alignItems: 'center',
            children: [
              text('th-chk', 'C', '☐', '#00000040', 14, '600', 40),
              text('th-id', 'C', '任务编号', '#00000073', 13, '600', 120),
              text('th-name', 'C', '任务名称', '#00000073', 13, '600', 260),
              text('th-type', 'C', '所属类型', '#00000073', 13, '600', 140),
              text('th-st', 'C', '状态', '#00000073', 13, '600', 140),
              text('th-time', 'C', '创建时间', '#00000073', 13, '600', 200),
              text('th-act', 'C', '操作', '#00000073', 13, '600', 160),
            ],
          },
          // Table Row 1
          {
            type: 'frame', id: 'tbl-r1', width: 1336, height: 48, padding: [0, 16], layout: 'horizontal', alignItems: 'center', stroke: '#F0F0F0', strokeWidth: 1,
            children: [
              text('r1-chk', 'C', '☑', '$antd-colorPrimary', 14, '600', 40),
              text('r1-id', 'C', 'TSK-1001', '#000000E0', 13, 'normal', 120),
              text('r1-name', 'C', 'Ant Design 6.6.4 核心资产适配', '#000000E0', 13, '600', 260),
              text('r1-type', 'C', 'UI Kit', '#00000073', 13, 'normal', 140),
              text('r1-st', 'C', '● 运行中', '#52C41A', 13, '600', 140),
              text('r1-time', 'C', '2026-09-16 10:00', '#00000073', 13, 'normal', 200),
              text('r1-act', 'C', '编辑  详情  删除', '$antd-colorPrimary', 13, 'normal', 160),
            ],
          },
          // Table Row 2
          {
            type: 'frame', id: 'tbl-r2', width: 1336, height: 48, padding: [0, 16], layout: 'horizontal', alignItems: 'center', fill: '#00000003', stroke: '#F0F0F0', strokeWidth: 1,
            children: [
              text('r2-chk', 'C', '☐', '#00000040', 14, '600', 40),
              text('r2-id', 'C', 'TSK-1002', '#000000E0', 13, 'normal', 120),
              text('r2-name', 'C', 'TypeScript Inspector 属性推导', '#000000E0', 13, '600', 260),
              text('r2-type', 'C', 'Compiler', '#00000073', 13, 'normal', 140),
              text('r2-st', 'C', '● 已完成', '#1677FF', 13, '600', 140),
              text('r2-time', 'C', '2026-09-16 09:30', '#00000073', 13, 'normal', 200),
              text('r2-act', 'C', '编辑  详情  删除', '$antd-colorPrimary', 13, 'normal', 160),
            ],
          },
        ],
      },
      // Card Showcase
      {
        type: 'frame', id: 'card-showcase', width: 768, height: 600, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 12, padding: [24, 28], layout: 'vertical', gap: 16,
        children: [
          text('crd-title', 'T', 'Card 卡片 · 标题、封面与操作栏', '#000000E0', 16, '600'),
          rect('crd-line', '#F0F0F0', 712, 1, 0),
          rect('crd-cover', '#D6E4FF', 712, 160, 8),
          text('crd-sub', 'T', 'Ant Design 6 · Design System Overview', '#000000E0', 16, '600'),
          text('crd-desc', 'T', '包含丰富的数据录入、展示与反馈组件体系，全面赋能现代 Web 应用。', '#00000073', 13),
          rect('crd-footer-line', '#F0F0F0', 712, 1, 0),
          text('crd-actions', 'T', '⚙ 设置      🔗 查看文档      ⇧ 导出', '$antd-colorPrimary', 13, '600'),
        ],
      },
    ],
  });

  curY += 630;

  // 2. Avatar, Badge, Tag, Statistic
  children.push({
    type: 'frame',
    id: 'sec-meta-display',
    name: 'Avatar, Badge, Tag, Statistic',
    x: 80,
    y: curY,
    width: 2200,
    height: 380,
    fill: '#FFFFFF',
    stroke: '#F0F0F0',
    strokeWidth: 1,
    cornerRadius: 12,
    padding: [24, 32],
    layout: 'vertical',
    gap: 20,
    children: [
      text('meta-title', 'T', '元信息与徽标体系 (Avatar, Badge, Tag, Statistic)', '#000000E0', 18, '600'),
      rect('meta-line', '#F0F0F0', 2136, 1, 0),
      // Avatars Row
      {
        type: 'frame', id: 'av-row', width: 2136, height: 56, layout: 'horizontal', gap: 24, alignItems: 'center',
        children: [
          text('av-lbl', 'L', 'Avatar 头像组:', '#00000073', 13, '600', 120),
          rect('av-1', '#1677FF', 48, 48, 999),
          text('av-1-t', 'T', 'U', '#FFFFFF', 18, '700'),
          rect('av-2', '#52C41A', 40, 40, 999),
          text('av-2-t', 'T', 'A', '#FFFFFF', 16, '700'),
          rect('av-3', '#FAAD14', 32, 32, 999),
          text('av-3-t', 'T', 'D', '#FFFFFF', 14, '700'),
          rect('av-grp', '#F5F5F5', 40, 40, 999, '#D9D9D9'),
          text('av-grp-t', 'T', '+5', '#00000073', 13, '600'),
        ],
      },
      // Tags 11 Colors Row
      {
        type: 'frame', id: 'tag-row', width: 2136, height: 40, layout: 'horizontal', gap: 12, alignItems: 'center',
        children: [
          text('tag-lbl', 'L', 'Tag 预设色彩:', '#00000073', 13, '600', 120),
          rect('tag-c1', '#E6F4FF', 70, 28, 4, '#91CAFF'),
          text('tag-c1-t', 'T', 'blue', '#1677FF', 12),
          rect('tag-c2', '#F6FFED', 70, 28, 4, '#B7EB8F'),
          text('tag-c2-t', 'T', 'green', '#52C41A', 12),
          rect('tag-c3', '#FFFBE6', 70, 28, 4, '#FFE58F'),
          text('tag-c3-t', 'T', 'gold', '#FAAD14', 12),
          rect('tag-c4', '#FFF2F0', 70, 28, 4, '#FFCCC7'),
          text('tag-c4-t', 'T', 'red', '#FF4D4F', 12),
          rect('tag-c5', '#F9F0FF', 70, 28, 4, '#D3ADF7'),
          text('tag-c5-t', 'T', 'purple', '#722ED1', 12),
          rect('tag-c6', '#E6FFFB', 70, 28, 4, '#87E8DE'),
          text('tag-c6-t', 'T', 'cyan', '#13C2C2', 12),
        ],
      },
      // Statistic Row
      {
        type: 'frame', id: 'stat-row', width: 2136, height: 64, layout: 'horizontal', gap: 64, alignItems: 'center',
        children: [
          text('stat-lbl', 'L', 'Statistic 统计:', '#00000073', 13, '600', 120),
          text('st1', 'T', '活跃指标 DAU\n1,289,340', '#000000E0', 14, '700'),
          text('st2', 'T', '增长率 Trending\n+18.4% ↗', '#52C41A', 14, '700'),
          text('st3', 'T', '账户余额\n¥ 9,280,000.00', '$antd-colorPrimary', 14, '700'),
        ],
      },
    ],
  });

  return {
    type: 'frame',
    id: 'artboard-data-display',
    name: 'antd: data display',
    x: 7440,
    y: 0,
    width: 2360,
    height: 4400,
    fill: '#FFFFFF',
    cornerRadius: 12,
    clip: true,
    layout: 'none',
    children,
  };
}

// ==================== ARTBOARD 5: FEEDBACK & LAYOUT VARIANTS ====================
function buildFeedbackLayoutArtboard() {
  const children = [];
  children.push(artboardHeader(
    'fl-header',
    'Ant Design 6 · Feedback & Layout Components (反馈与布局)',
    'Alert 4 status variants, Modal dialog, Drawer slide-out panel, Popconfirm, Progress lines/circles, Result 404/Success, Skeleton, Spin, Grid layout system',
    [
      { text: 'Feedback & Layout', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' },
      { text: 'Modal / Drawer / Alert', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' },
    ]
  ));

  let curY = 200;

  // 1. Alert 4 Status Matrix
  children.push({
    type: 'frame',
    id: 'sec-alert-matrix',
    name: 'Alert 警告提示全系列',
    x: 80,
    y: curY,
    width: 2200,
    height: 380,
    fill: '#FFFFFF',
    stroke: '#F0F0F0',
    strokeWidth: 1,
    cornerRadius: 12,
    padding: [24, 32],
    layout: 'vertical',
    gap: 16,
    children: [
      text('al-title', 'T', 'Alert 警告提示 · Success, Info, Warning, Error 4大状态与带辅助描述', '#000000E0', 18, '600'),
      rect('al-line', '#F0F0F0', 2136, 1, 0),
      // Success Alert
      {
        type: 'frame', id: 'al-suc', width: 2136, height: 44, fill: '#F6FFED', stroke: '#B7EB8F', strokeWidth: 1, cornerRadius: 6, padding: [0, 16], layout: 'horizontal', alignItems: 'center', gap: 12,
        children: [text('al-s-ic', 'I', '✓', '#52C41A', 16, '700'), text('al-s-tx', 'T', '成功提示：所有 Ant Design 6.6.4 组件已全量完成属性对齐与验证。', '#000000E0', 13)],
      },
      // Info Alert
      {
        type: 'frame', id: 'al-inf', width: 2136, height: 44, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 6, padding: [0, 16], layout: 'horizontal', alignItems: 'center', gap: 12,
        children: [text('al-i-ic', 'I', 'ℹ', '#1677FF', 16, '700'), text('al-i-tx', 'T', '常规提示：当前支持通过属性面板交互式调节组件视觉参数。', '#000000E0', 13)],
      },
      // Warning Alert
      {
        type: 'frame', id: 'al-war', width: 2136, height: 44, fill: '#FFFBE6', stroke: '#FFE58F', strokeWidth: 1, cornerRadius: 6, padding: [0, 16], layout: 'horizontal', alignItems: 'center', gap: 12,
        children: [text('al-w-ic', 'I', '⚠', '#FAAD14', 16, '700'), text('al-w-tx', 'T', '警告提示：修改核心主题色将同步影响整个画布的 Ant Design 组件。', '#000000E0', 13)],
      },
      // Error Alert
      {
        type: 'frame', id: 'al-err', width: 2136, height: 44, fill: '#FFF2F0', stroke: '#FFCCC7', strokeWidth: 1, cornerRadius: 6, padding: [0, 16], layout: 'horizontal', alignItems: 'center', gap: 12,
        children: [text('al-e-ic', 'I', '✕', '#FF4D4F', 16, '700'), text('al-e-tx', 'T', '错误提示：检测到未合法的属性配置，请检查输入类型。', '#000000E0', 13)],
      },
    ],
  });

  curY += 410;

  // 2. Modal & Drawer Overlay Showcase
  children.push({
    type: 'frame',
    id: 'sec-modal-drawer',
    name: 'Modal & Drawer 浮层组件',
    x: 80,
    y: curY,
    width: 2200,
    height: 520,
    layout: 'horizontal',
    gap: 32,
    children: [
      // Modal Card
      {
        type: 'frame', id: 'card-modal-win', width: 1100, height: 520, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 12, padding: [24, 32], layout: 'vertical', gap: 16,
        children: [
          text('mod-title', 'T', '确认保存系统配置？ (Modal 对话框)', '#000000E0', 18, '600'),
          rect('mod-line1', '#F0F0F0', 1036, 1, 0),
          text('mod-body', 'T', '保存后，本次修改将自动生成标准组件原型。点击确定提交，点击取消回退。', '#000000A6', 14),
          rect('mod-fill', '#FAFAFA', 1036, 260, 8),
          rect('mod-line2', '#F0F0F0', 1036, 1, 0),
          {
            type: 'frame', id: 'mod-btn-row', width: 1036, height: 36, layout: 'horizontal', justifyContent: 'flex-end', gap: 12,
            children: [
              rect('mod-btn-c', '#FFFFFF', 90, 36, 6, '#D9D9D9'),
              text('mod-btn-c-t', 'T', '取消', '#000000E0', 14),
              rect('mod-btn-ok', '$antd-colorPrimary', 90, 36, 6),
              text('mod-btn-ok-t', 'T', '确定', '#FFFFFF', 14, '600'),
            ],
          },
        ],
      },
      // Drawer Card
      {
        type: 'frame', id: 'card-drawer-win', width: 1068, height: 520, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 12, padding: [24, 32], layout: 'vertical', gap: 16,
        children: [
          text('dr-title', 'T', '高级参数抽屉面板 (Drawer)', '#000000E0', 18, '600'),
          rect('dr-line1', '#F0F0F0', 1004, 1, 0),
          text('dr-f1', 'T', '参数一：主题色彩体系 ($antd-colorPrimary)', '#00000073', 13),
          rect('dr-in1', '#FFFFFF', 1004, 36, 6, '#D9D9D9'),
          text('dr-f2', 'T', '参数二：全局圆角规格 ($antd-borderRadius: 6)', '#00000073', 13),
          rect('dr-in2', '#FFFFFF', 1004, 36, 6, '#D9D9D9'),
          rect('dr-fill', '#FAFAFA', 1004, 180, 8),
          rect('dr-line2', '#F0F0F0', 1004, 1, 0),
          text('dr-foot', 'T', '[ 提交配置 ]          [ 关闭 ]', '$antd-colorPrimary', 14, '600'),
        ],
      },
    ],
  });

  return {
    type: 'frame',
    id: 'artboard-feedback-layout',
    name: 'antd: feedback & layout',
    x: 9920,
    y: 0,
    width: 2360,
    height: 4000,
    fill: '#FFFFFF',
    cornerRadius: 12,
    clip: true,
    layout: 'none',
    children,
  };
}

// ==================== MAIN EXECUTION ====================
console.log('Generating 5 Design System Artboards for libraries/antd-6.lib.pen...');

const artboards = [
  buildOverviewArtboard(),
  buildGeneralNavArtboard(),
  buildDataEntryArtboard(),
  buildDataDisplayArtboard(),
  buildFeedbackLayoutArtboard(),
];

const libraryPen = {
  version: '2.17',
  themes: { mode: ['light', 'dark'], density: ['regular', 'compact'] },
  variables: themedVariables,
  fileToken: 'antd-6-all-components-20260915',
  children: artboards,
};

await writeFile(libraryPath, `${JSON.stringify(libraryPen, null, 2)}\n`);
console.log(`Successfully generated libraries/antd-6.lib.pen with ${artboards.length} top-level Artboards!`);
