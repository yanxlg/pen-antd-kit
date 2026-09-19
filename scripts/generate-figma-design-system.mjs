import { readFile, writeFile } from 'node:fs/promises';
import { buildCardPreview } from './overview-cards.mjs';
import { renderComponentDetailCard, categoryFor, cnNameFor } from './component-detail-renderers.mjs';

const libraryPath = new URL('../libraries/antd-6.lib.pen', import.meta.url);

// ==================== TOKENS & HELPERS ====================
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

const artboardBanner = (id, title, subtitle, badges = [], width = 1376) => ({
  type: 'frame',
  id: `${id}-banner`,
  name: 'Header Banner',
  x: 32,
  y: 28,
  width,
  height: 75,
  layout: 'vertical',
  gap: 8,
  children: [
    {
      type: 'frame',
      id: `${id}-title-row`,
      name: 'Title Row',
      width,
      height: 36,
      layout: 'horizontal',
      alignItems: 'center',
      gap: 12,
      children: [
        rect(`${id}-logo`, '#1677FF', 28, 28, 6),
        text(`${id}-title`, 'Title', title, '#000000E0', 20, '700'),
        ...badges.map((b, idx) => ({
          type: 'frame',
          id: `${id}-badge-${idx}`,
          fill: b.bg || '#E6F4FF',
          stroke: b.border || '#91CAFF',
          strokeWidth: 1,
          cornerRadius: 4,
          padding: [2, 8],
          layout: 'horizontal',
          alignItems: 'center',
          children: [text(`${id}-bt-${idx}`, 'T', b.text, b.color || '#1677FF', 11, '600')],
        })),
      ],
    },
    text(`${id}-sub`, 'Subtitle', subtitle, '#00000073', 13),
  ],
});

let globalOriginIndex = 0;

// Helper to construct a standard category artboard with authentic component detail cards
function buildCategoryArtboard(artboardId, artboardName, subtitle, badgeText, badgeColor, compList, artboardX = 0, artboardW = 1440, artboardH = 1050) {
  const innerCards = [];
  const COLS = 3;
  const CARD_W = 424;
  const CARD_H = 270;
  const GAP_X = 24;
  const GAP_Y = 24;
  const START_X = 40;
  const START_Y = 125;

  compList.forEach((compName, idx) => {
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    const cardX = START_X + col * (CARD_W + GAP_X);
    const cardY = START_Y + row * (CARD_H + GAP_Y);
    innerCards.push(renderComponentDetailCard(compName, globalOriginIndex++, cardX, cardY, CARD_W, CARD_H));
  });

  return {
    type: 'frame',
    id: artboardId,
    name: artboardName,
    x: artboardX,
    y: 0,
    width: artboardW,
    height: artboardH,
    fill: '#FFFFFF',
    stroke: '#E8E8E8',
    strokeWidth: 1,
    cornerRadius: 10,
    clip: true,
    layout: 'none',
    children: [
      artboardBanner(artboardId, artboardName, subtitle, [{ text: badgeText, bg: '#E6F4FF', border: '#91CAFF', color: badgeColor || '#1677FF' }], artboardW - 64),
      ...innerCards,
    ],
  };
}

// ==================== 1. LAYER: COMPONENTS OVERVIEW (MASTER CATALOG) ====================
function buildOverviewLayer(y) {
  const CARD_H = 210;
  const GAP_X = 16;
  const GAP_Y = 16;
  const COL_WIDTH = 952;
  const COL_GAP = 48;
  const START_X = 80;
  const START_Y = 180;

  const colConfigs = [
    {
      colIndex: 0,
      sections: [
        { title: 'General', titleZh: '通用', colsPerRow: 3, components: ['Button', 'FloatButton', 'Typography'] },
        { title: 'Layout', titleZh: '布局', colsPerRow: 4, components: ['Divider', 'Grid', 'Layout', 'Space', 'Col', 'Row', 'Flex', 'Splitter'] },
        { title: 'Navigation', titleZh: '导航', colsPerRow: 4, components: ['Affix', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs', 'Anchor'] },
      ],
    },
    {
      colIndex: 1,
      sections: [
        {
          title: 'Data Entry', titleZh: '数据录入', colsPerRow: 3,
          components: [
            'AutoComplete', 'Checkbox', 'Cascader',
            'Form', 'InputNumber', 'Input',
            'Rate', 'Radio', 'Switch',
            'Select', 'TreeSelect', 'Transfer',
            'DatePicker', 'TimePicker', 'ColorPicker',
            'Slider', 'Mentions', 'Upload',
          ],
        },
      ],
    },
    {
      colIndex: 2,
      sections: [
        {
          title: 'Data Display', titleZh: '数据展示', colsPerRow: 4,
          components: [
            'Avatar', 'Badge', 'Calendar', 'Card',
            'Carousel', 'Collapse', 'Descriptions', 'Empty',
            'Image', 'List', 'Listy', 'Popover', 'QRCode',
            'Segmented', 'Statistic', 'Table', 'Tag',
            'Timeline', 'Tooltip', 'Tour', 'Tree',
          ],
        },
      ],
    },
    {
      colIndex: 3,
      sections: [
        {
          title: 'Feedback', titleZh: '反馈', colsPerRow: 3,
          components: ['Alert', 'Drawer', 'Message', 'Modal', 'Notification', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'],
        },
        {
          title: 'Other', titleZh: '其他', colsPerRow: 3,
          components: ['App', 'BackTop', 'BorderBeam', 'Masonry'],
        },
      ],
    },
  ];

  const artboardChildren = [];
  const totalArtboardWidth = START_X + 4 * COL_WIDTH + 3 * COL_GAP + START_X; // 4112

  artboardChildren.push({
    type: 'frame',
    id: 'ov-banner',
    name: 'Header Banner',
    x: 80,
    y: 50,
    width: totalArtboardWidth - 160,
    height: 90,
    layout: 'vertical',
    gap: 10,
    children: [
      {
        type: 'frame', id: 'ov-title-row', width: totalArtboardWidth - 160, height: 40, layout: 'horizontal', alignItems: 'center', gap: 14,
        children: [
          rect('ov-logo', '#1677FF', 32, 32, 8),
          text('ov-title', 'Title', 'Components Overview · 全量组件总览索引', '#000000E0', 24, '700'),
          rect('ov-b1', '#E6F4FF', 100, 26, 4, '#91CAFF'),
          text('ov-b1-t', 'T', 'v6.6.4 Official', '#1677FF', 11, '600'),
          rect('ov-b2', '#F6FFED', 160, 26, 4, '#B7EB8F'),
          text('ov-b2-t', 'T', '71 Canonical Components', '#52C41A', 11, '600'),
        ],
      },
      text('ov-sub', 'Sub', 'Official Ant Design 6.6.4 Master Index Catalog · Standard Component Cards & Quick Previews', '#00000073', 13),
    ],
  });

  let ovCardIndex = 0;
  let maxCalculatedY = 0;

  for (const col of colConfigs) {
    const colBaseX = START_X + col.colIndex * (COL_WIDTH + COL_GAP);
    let curY = START_Y;

    for (const sec of col.sections) {
      const secId = `ov-sec-${sec.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      artboardChildren.push({
        type: 'text',
        id: `${secId}-title`,
        name: `Section: ${sec.title}`,
        x: colBaseX,
        y: curY,
        content: `${sec.title} · ${sec.titleZh}`,
        fill: sec.title === 'General' ? '#1677FF' : '#595959',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
      });
      curY += 36;

      const colsPerRow = sec.colsPerRow;
      const cardW = Math.floor((COL_WIDTH - (colsPerRow - 1) * GAP_X) / colsPerRow);

      for (let i = 0; i < sec.components.length; i++) {
        const compName = sec.components[i];
        const row = Math.floor(i / colsPerRow);
        const colIdx = i % colsPerRow;
        const cardX = colBaseX + colIdx * (cardW + GAP_X);
        const cardY = curY + row * (CARD_H + GAP_Y);

        const id = `ov-card-${compName.toLowerCase()}-${ovCardIndex++}`;
        const cat = categoryFor(compName);
        const previewH = CARD_H - 39;

        // Overview catalog cards use reusable: false and type: 'overview-card' so canonical origins live in detail artboards
        artboardChildren.push({
          type: 'frame',
          id,
          name: `Overview/${compName}`,
          reusable: false,
          x: cardX,
          y: cardY,
          width: cardW,
          height: CARD_H,
          fill: '#FFFFFF',
          cornerRadius: 6,
          stroke: '#E2E8F0',
          strokeWidth: 1,
          clip: true,
          layout: 'vertical',
          metadata: {
            type: 'overview-card',
            component: compName,
            category: cat,
          },
          children: [
            {
              type: 'frame', id: `${id}-hdr`, name: 'Card Header', width: cardW, height: 38, layout: 'horizontal', alignItems: 'center', padding: [0, 14],
              children: [text(`${id}-title`, 'Title', compName, '#1F1F1F', 13, '500')],
            },
            { type: 'frame', id: `${id}-line`, name: 'Divider', width: cardW, height: 1, fill: '#F0F2F5' },
            {
              type: 'frame', id: `${id}-body`, name: 'Preview Area', width: cardW, height: previewH, fill: '#FFFFFF', layout: 'vertical', alignItems: 'center', justifyContent: 'center',
              children: buildCardPreview(compName, `${id}-pv`, cardW, previewH),
            },
          ],
        });
      }

      const totalRows = Math.ceil(sec.components.length / colsPerRow);
      curY += totalRows * (CARD_H + GAP_Y) + 24;
    }
    if (curY > maxCalculatedY) maxCalculatedY = curY;
  }

  const artboardHeight = Math.max(1680, Math.ceil((maxCalculatedY + 80) / 100) * 100);

  return {
    type: 'frame',
    id: 'layer-components-overview',
    name: 'Components Overview',
    x: 0,
    y,
    width: totalArtboardWidth,
    height: artboardHeight,
    fill: '#EBF2FA',
    cornerRadius: 12,
    clip: true,
    layout: 'none',
    children: artboardChildren,
  };
}

// ==================== 2. LAYER: TEMPLATES & PAGES ====================
function buildTemplatesLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 900;
  const GAP_X = 80;

  const dashChildren = [
    artboardBanner('t1', 'Dashboard · 分析工作台大盘', 'Enterprise Operations & Financial Analytics Portal', [{ text: 'Template 1', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' }], 1376),
    {
      type: 'frame', id: 'dash-nav', x: 32, y: 120, width: 1376, height: 50, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 8, padding: [0, 20], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
      children: [
        text('dash-logo', 'L', '⚡ ANT DESIGN WORKSPACE', '$antd-colorPrimary', 15, '700'),
        text('dash-links', 'Links', '仪表盘      项目中心      研发资产      系统设置', '#000000A6', 13),
        text('dash-user', 'U', '🔔 8       👤 管理员 Admin ⌄', '#000000E0', 13, '600'),
      ],
    },
    {
      type: 'frame', id: 'dash-metrics', x: 32, y: 186, width: 1376, height: 120, layout: 'horizontal', gap: 16,
      children: [
        { type: 'frame', id: 'm1', width: 332, height: 120, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [16, 20], layout: 'vertical', gap: 6, children: [text('m1-t', 'T', '总销售额 (Total Sales)', '#00000073', 12), text('m1-v', 'V', '¥ 126,560', '#000000E0', 22, '700'), text('m1-s', 'S', '周同比 12% ↗', '#52C41A', 11)] },
        { type: 'frame', id: 'm2', width: 332, height: 120, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [16, 20], layout: 'vertical', gap: 6, children: [text('m2-t', 'T', '日活跃用户 (DAU)', '#00000073', 12), text('m2-v', 'V', '8,846 人', '#000000E0', 22, '700'), text('m2-s', 'S', '周同比 18.2% ↗', '#52C41A', 11)] },
        { type: 'frame', id: 'm3', width: 332, height: 120, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [16, 20], layout: 'vertical', gap: 6, children: [text('m3-t', 'T', '支付订单数 (Orders)', '#00000073', 12), text('m3-v', 'V', '6,560 笔', '#000000E0', 22, '700'), text('m3-s', 'S', '周同比 3% ↘', '#FF4D4F', 11)] },
        { type: 'frame', id: 'm4', width: 332, height: 120, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [16, 20], layout: 'vertical', gap: 6, children: [text('m4-t', 'T', '服务健康度 (Health)', '#00000073', 12), text('m4-v', 'V', '99.8%', '$antd-colorPrimary', 22, '700'), text('m4-s', 'S', '系统平稳运行', '#52C41A', 11)] },
      ],
    },
    {
      type: 'frame', id: 'dash-charts', x: 32, y: 322, width: 1376, height: 480, layout: 'horizontal', gap: 16,
      children: [
        {
          type: 'frame', id: 'chart-box', width: 920, height: 480, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [20, 24], layout: 'vertical', gap: 14,
          children: [
            text('cb-title', 'T', '业务增长走势图 (销售额与访问量趋势)', '#000000E0', 15, '600'),
            rect('cb-line', '#F0F0F0', 872, 1, 0),
            rect('cb-demo', '#E6F4FF', 872, 360, 6, '#91CAFF'),
            text('cb-demo-t', 'T', '📊 折线趋势图可视化区域 (Ant Design Charts 适配规范)', '$antd-colorPrimary', 13, '600'),
          ],
        },
        {
          type: 'frame', id: 'rank-box', width: 440, height: 480, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [20, 24], layout: 'vertical', gap: 12,
          children: [
            text('rk-title', 'T', '门店销售排名 (Top Stores)', '#000000E0', 15, '600'),
            rect('rk-line', '#F0F0F0', 392, 1, 0),
            text('rk-1', '1', '1. 杭州西溪旗舰店        ¥ 323,234', '$antd-colorPrimary', 13, '600'),
            text('rk-2', '2', '2. 上海陆家嘴中心店      ¥ 298,120', '$antd-colorPrimary', 13, '600'),
            text('rk-3', '3', '3. 北京国贸三期店        ¥ 265,400', '$antd-colorPrimary', 13, '600'),
            text('rk-4', '4', '4. 深圳科技园店          ¥ 182,300', '#000000A6', 13),
            text('rk-5', '5', '5. 广州天河城店          ¥ 145,200', '#000000A6', 13),
          ],
        },
      ],
    },
  ];

  const userMgmtChildren = [
    artboardBanner('t2', 'User Management · 用户与权限管理', 'Enterprise Role & Permission Management Table', [{ text: 'Template 2', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' }], 1376),
    {
      type: 'frame', id: 'um-filter', x: 32, y: 120, width: 1376, height: 50, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [0, 20], layout: 'horizontal', alignItems: 'center', gap: 20,
      children: [
        text('um-f1', 'F', '用户姓名：[ 请输入姓名 ]', '#00000073', 13),
        text('um-f2', 'F', '角色权限：[ 全部角色 ⌄ ]', '#00000073', 13),
        text('um-f3', 'F', '注册时间：[ 2026-09-01 ~ 2026-09-30 📅 ]', '#00000073', 13),
        rect('um-btn-search', '$antd-colorPrimary', 70, 30, 4),
        text('um-bs-t', 'T', '查询', '#FFFFFF', 12, '600'),
        rect('um-btn-reset', '#FFFFFF', 70, 30, 4, '#D9D9D9'),
        text('um-br-t', 'T', '重置', '#000000E0', 12),
      ],
    },
    {
      type: 'frame', id: 'um-table', x: 32, y: 186, width: 1376, height: 600, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, layout: 'vertical',
      children: [
        {
          type: 'frame', id: 'um-th', width: 1376, height: 44, fill: '#FAFAFA', padding: [0, 20], layout: 'horizontal', alignItems: 'center',
          children: [
            text('th-c', 'C', '☐', '#00000040', 13, '600', 40),
            text('th-name', 'C', '用户名 / 姓名', '#00000073', 13, '600', 260),
            text('th-email', 'C', '企业邮箱', '#00000073', 13, '600', 260),
            text('th-role', 'C', '所属角色', '#00000073', 13, '600', 200),
            text('th-st', 'C', '状态', '#00000073', 13, '600', 160),
            text('th-time', 'C', '最后登录时间', '#00000073', 13, '600', 220),
            text('th-act', 'C', '操作', '#00000073', 13, '600', 160),
          ],
        },
        ...[
          { name: '👤 张三 (zhangsan)', email: 'zhangsan@ant.design', role: '超级管理员', st: '● 正常在线', col: '#52C41A' },
          { name: '👤 李四 (lisi)', email: 'lisi@ant.design', role: '研发工程师', st: '● 正常在线', col: '#52C41A' },
          { name: '👤 王五 (wangwu)', email: 'wangwu@ant.design', role: 'UI/UX 设计师', st: '○ 离线', col: '#8C8C8C' },
          { name: '👤 赵六 (zhaoliu)', email: 'zhaoliu@ant.design', role: '运营主管', st: '● 正常在线', col: '#52C41A' },
          { name: '👤 孙七 (sunqi)', email: 'sunqi@ant.design', role: '访客受限', st: '● 账号冻结', col: '#FF4D4F' },
        ].map((u, idx) => ({
          type: 'frame', id: `um-r${idx}`, width: 1376, height: 52, padding: [0, 20], layout: 'horizontal', alignItems: 'center', stroke: '#F0F0F0', strokeWidth: 1,
          children: [
            text(`r${idx}-c`, 'C', '☐', '#00000040', 13, 'normal', 40),
            text(`r${idx}-name`, 'C', u.name, '#000000E0', 13, '600', 260),
            text(`r${idx}-email`, 'C', u.email, '#00000073', 13, 'normal', 260),
            text(`r${idx}-role`, 'C', u.role, '$antd-colorPrimary', 13, '500', 200),
            text(`r${idx}-st`, 'C', u.st, u.col, 13, '600', 160),
            text(`r${idx}-time`, 'C', '2026-09-16 10:45', '#00000073', 13, 'normal', 220),
            text(`r${idx}-act`, 'C', '编辑  权限  禁用', '$antd-colorPrimary', 13, 'normal', 160),
          ],
        })),
      ],
    },
  ];

  const stepFormChildren = [
    artboardBanner('t3', 'Step Form Wizard · 分步向导表单', 'Multi-step Structured Business Submission Wizard', [{ text: 'Template 3', bg: '#FFF7E6', border: '#FFD591', color: '#FA8C16' }], 1376),
    {
      type: 'frame', id: 'wiz-steps', x: 32, y: 120, width: 1376, height: 60, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [0, 40], layout: 'horizontal', alignItems: 'center', justifyContent: 'center', gap: 24,
      children: [
        text('ws-1', 'S', '① 填写基本资料 (已完成)', '$antd-colorPrimary', 13, '600'),
        text('ws-arr1', 'A', '────────▶', '$antd-colorPrimary', 12),
        text('ws-2', 'S', '② 配置团队成员与权限 (进行中)', '$antd-colorPrimary', 14, '700'),
        text('ws-arr2', 'A', '────────▶', '#D9D9D9', 12),
        text('ws-3', 'S', '③ 确认并提交审核 (待处理)', '#00000040', 13),
      ],
    },
    {
      type: 'frame', id: 'wiz-form', x: 288, y: 200, width: 800, height: 580, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 8, padding: [28, 36], layout: 'vertical', gap: 16,
      children: [
        text('wf-title', 'T', '企业级研发团队成员与访问权限分配', '#000000E0', 16, '600'),
        rect('wf-line', '#F0F0F0', 728, 1, 0),
        text('wf-l1', 'L', '团队归属部门：', '#00000073', 13, '600'),
        rect('wf-i1', '#FFFFFF', 728, 36, 6, '#D9D9D9'),
        text('wf-i1-t', 'T', '蚂蚁体验技术部 / 国际化体验设计组 ⌄', '#000000E0', 13),
        text('wf-l2', 'L', '默认角色权限：', '#00000073', 13, '600'),
        rect('wf-i2', '#FFFFFF', 728, 36, 6, '#D9D9D9'),
        text('wf-i2-t', 'T', '☑ 允许创建项目    ☑ 允许导出设计规范    ☐ 允许修改计费配置', '#000000A6', 13),
        text('wf-l3', 'L', '负责人联系方式：', '#00000073', 13, '600'),
        rect('wf-i3', '#FFFFFF', 728, 36, 6, '#D9D9D9'),
        text('wf-i3-t', 'T', 'admin-security@ant.design', '#000000E0', 13),
        {
          type: 'frame', id: 'wf-btns', width: 728, height: 44, layout: 'horizontal', gap: 16, alignItems: 'center', justifyContent: 'flex_end',
          children: [
            rect('wf-b-prev', '#FFFFFF', 100, 36, 6, '#D9D9D9'),
            text('wf-bp-t', 'T', '上一步', '#000000E0', 13),
            rect('wf-b-next', '$antd-colorPrimary', 120, 36, 6),
            text('wf-bn-t', 'T', '下一步：确认', '#FFFFFF', 13, '600'),
          ],
        },
      ],
    },
  ];

  const artboards = [
    {
      type: 'frame', id: 'artboard-tmpl-dashboard', name: 'Dashboard · 数据监控大盘',
      x: 0, y: 0, width: ARTBOARD_W, height: ARTBOARD_H, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 10, clip: true, layout: 'none',
      children: dashChildren,
    },
    {
      type: 'frame', id: 'artboard-tmpl-user-management', name: 'User Management · 用户与权限管理',
      x: ARTBOARD_W + GAP_X, y: 0, width: ARTBOARD_W, height: ARTBOARD_H, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 10, clip: true, layout: 'none',
      children: userMgmtChildren,
    },
    {
      type: 'frame', id: 'artboard-tmpl-step-form', name: 'Step Form · 分步申请向导',
      x: (ARTBOARD_W + GAP_X) * 2, y: 0, width: ARTBOARD_W, height: ARTBOARD_H, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 10, clip: true, layout: 'none',
      children: stepFormChildren,
    },
  ];

  return {
    type: 'frame',
    id: 'layer-templates-pages',
    name: 'Templates & Pages',
    x: 0,
    y,
    width: (ARTBOARD_W + GAP_X) * 2 + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 3. LAYER: COLORS & TOKENS ====================
function buildColorsLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 900;
  const GAP_X = 80;

  const brands = [
    { name: '100 (浅显底色)', hex: '#E6F4FF', desc: '选态底色、高亮背景' },
    { name: '200 (次浅底色)', hex: '#BAE0FF', desc: '次级高亮背景' },
    { name: '300 (边框浅色)', hex: '#91CAFF', desc: '主色相关细描边' },
    { name: '400 (悬浮副色)', hex: '#69C0FF', desc: '次级悬浮态描边' },
    { name: '500 (悬停状态)', hex: '#4096FF', desc: '按钮 Hover 悬浮色' },
    { name: '600 (主色基准)', hex: '#1677FF', desc: 'colorPrimary 标准主色' },
    { name: '700 (激活状态)', hex: '#0958D9', desc: '按钮 Active 点击按下态' },
    { name: '800 (深色主调)', hex: '#003EB3', desc: '深色模式主色、高反差' },
  ];

  const funcs = [
    { title: 'Success 成功色 (colorSuccess)', hex: '#52C41A', bg: '#F6FFED', border: '#B7EB8F' },
    { title: 'Warning 警告色 (colorWarning)', hex: '#FAAD14', bg: '#FFFBE6', border: '#FFE58F' },
    { title: 'Error 错误色 (colorError)', hex: '#FF4D4F', bg: '#FFF2F0', border: '#FFCCC7' },
    { title: 'Info 信息色 (colorInfo)', hex: '#1677FF', bg: '#E6F4FF', border: '#91CAFF' },
  ];

  const brandChildren = [
    artboardBanner('c1', 'Brand & Functional Palette · 基础色彩体系', 'Ant Design 6.6.4 Official 10-Step Color System', [{ text: 'Color Tokens', bg: '#E6F4FF', border: '#91CAFF', color: '#1677FF' }], 1376),
    {
      type: 'frame', id: 'bp-box', x: 32, y: 120, width: 1376, height: 260, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [20, 24], layout: 'vertical', gap: 14,
      children: [
        text('bp-t', 'T', 'Ant Design 品牌主色阶 (Blue / 拂晓蓝 #1677FF)', '#000000E0', 15, '600'),
        {
          type: 'frame', id: 'bp-swatches', width: 1328, height: 160, layout: 'horizontal', gap: 12,
          children: brands.map((b, idx) => ({
            type: 'frame', id: `cb-${idx}`, width: 154, height: 160, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 6, clip: true, layout: 'vertical',
            children: [
              rect(`sw-${idx}`, b.hex, 154, 70, 0),
              {
                type: 'frame', id: `sw-info-${idx}`, width: 154, height: 90, padding: [8, 10], layout: 'vertical', gap: 2,
                children: [
                  text(`sw-nm-${idx}`, 'N', b.name, '#000000E0', 12, '600'),
                  text(`sw-hx-${idx}`, 'H', b.hex, b.hex, 11, '700'),
                  text(`sw-ds-${idx}`, 'D', b.desc, '#00000073', 10),
                ],
              },
            ],
          })),
        },
      ],
    },
    {
      type: 'frame', id: 'cf-box', x: 32, y: 400, width: 1376, height: 240, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [20, 24], layout: 'vertical', gap: 14,
      children: [
        text('cf-t', 'T', '四大核心功能色 (Functional State Colors)', '#000000E0', 15, '600'),
        {
          type: 'frame', id: 'cf-row', width: 1328, height: 130, layout: 'horizontal', gap: 16,
          children: funcs.map((f, idx) => ({
            type: 'frame', id: `fn-${idx}`, width: 320, height: 130, fill: f.bg, stroke: f.border, strokeWidth: 1, cornerRadius: 8, padding: [16, 20], layout: 'vertical', justifyContent: 'space_between',
            children: [
              text(`fn-t-${idx}`, 'T', f.title, '#000000E0', 13, '600'),
              text(`fn-h-${idx}`, 'H', f.hex, f.hex, 14, '700'),
            ],
          })),
        },
      ],
    },
  ];

  const neutrals = [
    { name: 'colorText (标题文字)', hex: '#000000E0', desc: '88% 黑' },
    { name: 'colorTextSecondary (正文与次级)', hex: '#000000A6', desc: '65% 黑' },
    { name: 'colorTextTertiary (辅助说明)', hex: '#00000073', desc: '45% 黑' },
    { name: 'colorTextQuaternary (失效禁用)', hex: '#00000040', desc: '25% 黑' },
    { name: 'colorBorder (控件描边)', hex: '#D9D9D9', desc: '边框灰色' },
    { name: 'colorBgLayout (底色背景)', hex: '#F5F5F5', desc: '浅灰底色' },
  ];

  const neutralChildren = [
    artboardBanner('c2', 'Neutral & Dark Mode · 中性色与暗黑模式', 'Light & Dark Mode Semantic Token Bindings', [{ text: 'Theme Tokens', bg: '#F6FFED', border: '#B7EB8F', color: '#52C41A' }], 1376),
    {
      type: 'frame', id: 'nt-box', x: 32, y: 120, width: 1376, height: 320, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [20, 24], layout: 'vertical', gap: 12,
      children: [
        text('nt-t', 'T', '浅色模式中性色阶 (Light Mode Neutral Scale)', '#000000E0', 15, '600'),
        ...neutrals.map((n, idx) => ({
          type: 'frame', id: `neu-${idx}`, width: 1328, height: 38, padding: [0, 16], layout: 'horizontal', alignItems: 'center', stroke: '#F0F0F0', strokeWidth: 1,
          children: [
            rect(`neu-sq-${idx}`, n.hex, 20, 20, 4, '#D9D9D9'),
            text(`neu-nm-${idx}`, 'N', n.name, '#000000E0', 13, '600', 400),
            text(`neu-hx-${idx}`, 'H', n.hex, '#00000073', 13, 'normal', 250),
            text(`neu-ds-${idx}`, 'D', n.desc, '#00000040', 13),
          ],
        })),
      ],
    },
    {
      type: 'frame', id: 'dk-box', x: 32, y: 460, width: 1376, height: 240, fill: '#141414', cornerRadius: 8, padding: [20, 24], layout: 'vertical', gap: 12,
      children: [
        text('dk-t', 'T', '暗黑模式主题变量 (Dark Mode Tokens)', '#FFFFFFD9', 15, '600'),
        text('dk-sub', 'T', 'Primary: #1668DC | Background: #000000 | Container: #141414 | Text: #FFFFFFD9', '#FFFFFFA6', 13),
        rect('dk-prev', '#1F1F1F', 1328, 120, 6, '#303030'),
        text('dk-demo', 'T', '🌙 Ant Design 官方暗黑模式自适应组件渲染区', '#1668DC', 13, '600'),
      ],
    },
  ];

  const metricChildren = [
    artboardBanner('c3', 'Design Tokens & Metrics · 尺寸与全局变量', 'Official Ant Design Spacing, Radius, and Font Metrics', [{ text: 'Global Metrics', bg: '#FFF7E6', border: '#FFD591', color: '#FA8C16' }], 1376),
    {
      type: 'frame', id: 'tm-box', x: 32, y: 120, width: 1376, height: 600, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 8, padding: [24, 28], layout: 'vertical', gap: 20,
      children: [
        text('tm-t1', 'T', '1. 圆角梯度规范 (Border Radius Scale)', '#000000E0', 15, '600'),
        {
          type: 'frame', id: 'rad-row', width: 1320, height: 70, layout: 'horizontal', gap: 20,
          children: [
            { type: 'frame', id: 'r-sm', width: 240, height: 70, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 4, padding: 12, children: [text('r-sm-t', 'T', 'borderRadiusSM: 4px', '$antd-colorPrimary', 13, '600')] },
            { type: 'frame', id: 'r-df', width: 240, height: 70, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 6, padding: 12, children: [text('r-df-t', 'T', 'borderRadius: 6px (默认)', '$antd-colorPrimary', 13, '600')] },
            { type: 'frame', id: 'r-lg', width: 240, height: 70, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 8, padding: 12, children: [text('r-lg-t', 'T', 'borderRadiusLG: 8px', '$antd-colorPrimary', 13, '600')] },
          ],
        },
        rect('tm-sep1', '#F0F0F0', 1320, 1, 0),
        text('tm-t2', 'T', '2. 控件高度体系 (Control Heights)', '#000000E0', 15, '600'),
        {
          type: 'frame', id: 'h-row', width: 1320, height: 60, layout: 'horizontal', gap: 20, alignItems: 'center',
          children: [
            rect('h-sm', '#FAFAFA', 240, 24, 4, '#D9D9D9'),
            text('h-sm-t', 'T', 'Small 高度: 24px', '#000000E0', 12),
            rect('h-df', '#FAFAFA', 240, 32, 6, '#D9D9D9'),
            text('h-df-t', 'T', 'Default 高度: 32px (标准)', '#000000E0', 13, '600'),
            rect('h-lg', '#FAFAFA', 240, 40, 8, '#D9D9D9'),
            text('h-lg-t', 'T', 'Large 高度: 40px', '#000000E0', 14),
          ],
        },
        rect('tm-sep2', '#F0F0F0', 1320, 1, 0),
        text('tm-t3', 'T', '3. 间距标尺系统 (Spacing System: 4px 栅格)', '#000000E0', 15, '600'),
        text('tm-sp', 'T', 'sizeXXS: 4px | sizeXS: 8px | sizeSM: 12px | sizeMD: 16px | sizeLG: 24px | sizeXL: 32px', '#00000073', 13),
      ],
    },
  ];

  const artboards = [
    {
      type: 'frame', id: 'artboard-tokens-brand', name: 'Brand & Functional Palette · 基础色板',
      x: 0, y: 0, width: ARTBOARD_W, height: ARTBOARD_H, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 10, clip: true, layout: 'none',
      children: brandChildren,
    },
    {
      type: 'frame', id: 'artboard-tokens-neutral', name: 'Neutral & Dark Palette · 中性与暗色规范',
      x: ARTBOARD_W + GAP_X, y: 0, width: ARTBOARD_W, height: ARTBOARD_H, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 10, clip: true, layout: 'none',
      children: neutralChildren,
    },
    {
      type: 'frame', id: 'artboard-tokens-metrics', name: 'Design Tokens & Metrics · 尺寸与变量',
      x: (ARTBOARD_W + GAP_X) * 2, y: 0, width: ARTBOARD_W, height: ARTBOARD_H, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 10, clip: true, layout: 'none',
      children: metricChildren,
    },
  ];

  return {
    type: 'frame',
    id: 'layer-colors-tokens',
    name: 'Colors & Tokens',
    x: 0,
    y,
    width: (ARTBOARD_W + GAP_X) * 2 + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 4. LAYER: GENERAL (3 COMPONENTS, 1 ARTBOARD) ====================
function buildGeneralLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 850;
  const comps = ['Button', 'FloatButton', 'Typography'];

  const artboard = buildCategoryArtboard(
    'artboard-general-components',
    'General Components · 通用组件规范',
    'Button, FloatButton, Typography 核心通用组件全形态呈现',
    'General 通用',
    '#1677FF',
    comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  return {
    type: 'frame',
    id: 'layer-general',
    name: '01 General · 通用',
    x: 0,
    y,
    width: ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [artboard],
  };
}

// ==================== 5. LAYER: LAYOUT (9 COMPONENTS, 2 ARTBOARDS) ====================
function buildLayoutLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 950;
  const GAP_X = 80;

  const ab1Comps = ['Grid', 'Row', 'Col', 'Space', 'Divider'];
  const ab2Comps = ['Layout', 'Flex', 'Splitter', 'Masonry'];

  const ab1 = buildCategoryArtboard(
    'artboard-layout-grid',
    'Grid & Spacing · 栅格间距与分割',
    'Grid, Row, Col, Space, Divider 栅格与间距系统规范',
    'Layout 布局',
    '#1677FF',
    ab1Comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab2 = buildCategoryArtboard(
    'artboard-layout-structure',
    'Structure & Flow · 页面架构与流式布局',
    'Layout, Flex, Splitter, Masonry 经典页面架构与弹性流式容器',
    'Layout 布局',
    '#1677FF',
    ab2Comps,
    ARTBOARD_W + GAP_X,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const artboards = [ab1, ab2];

  return {
    type: 'frame',
    id: 'layer-layout',
    name: '02 Layout · 布局',
    x: 0,
    y,
    width: ARTBOARD_W + GAP_X + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 6. LAYER: NAVIGATION (7 COMPONENTS, 2 ARTBOARDS) ====================
function buildNavigationLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 950;
  const GAP_X = 80;

  const ab1Comps = ['Menu', 'Tabs', 'Dropdown', 'Breadcrumb'];
  const ab2Comps = ['Steps', 'Pagination', 'Anchor'];

  const ab1 = buildCategoryArtboard(
    'artboard-nav-menus',
    'Menu & Route · 菜单导航与路径',
    'Menu, Tabs, Dropdown, Breadcrumb 页面层级与路由导航规范',
    'Navigation 导航',
    '#52C41A',
    ab1Comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab2 = buildCategoryArtboard(
    'artboard-nav-steps',
    'Steps & Wayfinding · 流程与分页引导',
    'Steps, Pagination, Anchor 线性流程、分页器与页面锚点定位',
    'Navigation 导航',
    '#52C41A',
    ab2Comps,
    ARTBOARD_W + GAP_X,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const artboards = [ab1, ab2];

  return {
    type: 'frame',
    id: 'layer-navigation',
    name: '03 Navigation · 导航',
    x: 0,
    y,
    width: ARTBOARD_W + GAP_X + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 7. LAYER: DATA ENTRY (18 COMPONENTS, 3 ARTBOARDS) ====================
function buildDataEntryLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 1050;
  const GAP_X = 80;

  const ab1Comps = ['Input', 'InputNumber', 'AutoComplete', 'Mentions', 'Form', 'ColorPicker'];
  const ab2Comps = ['Select', 'Cascader', 'TreeSelect', 'Checkbox', 'Radio', 'Switch'];
  const ab3Comps = ['DatePicker', 'TimePicker', 'Slider', 'Rate', 'Transfer', 'Upload'];

  const ab1 = buildCategoryArtboard(
    'artboard-entry-inputs',
    'Inputs & Form · 文本输入与表单',
    'Input, InputNumber, AutoComplete, Mentions, Form, ColorPicker 基础输入组件',
    'Data Entry 数据录入',
    '#1677FF',
    ab1Comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab2 = buildCategoryArtboard(
    'artboard-entry-selectors',
    'Selectors & Options · 选择与开关控制',
    'Select, Cascader, TreeSelect, Checkbox, Radio, Switch 选择与单复选',
    'Data Entry 数据录入',
    '#1677FF',
    ab2Comps,
    ARTBOARD_W + GAP_X,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab3 = buildCategoryArtboard(
    'artboard-entry-pickers',
    'Pickers & Upload · 时间范围与上传穿梭',
    'DatePicker, TimePicker, Slider, Rate, Transfer, Upload 时间、评分与文件上传',
    'Data Entry 数据录入',
    '#1677FF',
    ab3Comps,
    (ARTBOARD_W + GAP_X) * 2,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const artboards = [ab1, ab2, ab3];

  return {
    type: 'frame',
    id: 'layer-data-entry',
    name: '04 Data Entry · 数据录入',
    x: 0,
    y,
    width: (ARTBOARD_W + GAP_X) * 2 + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 8. LAYER: DATA DISPLAY (20 COMPONENTS, 3 ARTBOARDS) ====================
function buildDataDisplayLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 1050;
  const GAP_X = 80;

  const ab1Comps = ['Table', 'Descriptions', 'List', 'Card', 'Segmented', 'Statistic'];
  const ab2Comps = ['Avatar', 'Badge', 'Tag', 'Image', 'QRCode', 'Timeline', 'Empty'];
  const ab3Comps = ['Tree', 'Calendar', 'Collapse', 'Carousel', 'Tooltip', 'Popover', 'Tour'];

  const ab1 = buildCategoryArtboard(
    'artboard-display-tables',
    'Tables & Structured · 表格与结构化数据',
    'Table, Descriptions, List, Card, Segmented, Statistic 表格与核心数据容器',
    'Data Display 数据展示',
    '#722ED1',
    ab1Comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab2 = buildCategoryArtboard(
    'artboard-display-media',
    'Media & Indicators · 媒体与状态标识',
    'Avatar, Badge, Tag, Image, QRCode, Timeline, Empty 图文多媒体与状态呈现',
    'Data Display 数据展示',
    '#722ED1',
    ab2Comps,
    ARTBOARD_W + GAP_X,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab3 = buildCategoryArtboard(
    'artboard-display-views',
    'Trees & Rich Views · 树形层级与复杂视图',
    'Tree, Calendar, Collapse, Carousel, Tooltip, Popover, Tour 树形、日历与漫游引导',
    'Data Display 数据展示',
    '#722ED1',
    ab3Comps,
    (ARTBOARD_W + GAP_X) * 2,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const artboards = [ab1, ab2, ab3];

  return {
    type: 'frame',
    id: 'layer-data-display',
    name: '05 Data Display · 数据展示',
    x: 0,
    y,
    width: (ARTBOARD_W + GAP_X) * 2 + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 9. LAYER: FEEDBACK (9 COMPONENTS, 2 ARTBOARDS) ====================
function buildFeedbackLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 950;
  const GAP_X = 80;

  const ab1Comps = ['Alert', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'];
  const ab2Comps = ['Modal', 'Drawer', 'Popconfirm'];

  const ab1 = buildCategoryArtboard(
    'artboard-feedback-inline',
    'Alerts & State · 状态提示与进度加载',
    'Alert, Progress, Result, Skeleton, Spin, Watermark 页面内联反馈与加载骨架',
    'Feedback 反馈',
    '#FA8C16',
    ab1Comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const ab2 = buildCategoryArtboard(
    'artboard-feedback-modals',
    'Modals & Overlays · 模态对话框与抽屉',
    'Modal, Drawer, Popconfirm 浮层确认、抽屉表单与二次确认气泡',
    'Feedback 反馈',
    '#FA8C16',
    ab2Comps,
    ARTBOARD_W + GAP_X,
    ARTBOARD_W,
    ARTBOARD_H
  );

  const artboards = [ab1, ab2];

  return {
    type: 'frame',
    id: 'layer-feedback',
    name: '06 Feedback · 反馈',
    x: 0,
    y,
    width: ARTBOARD_W + GAP_X + ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [...artboards].reverse(),
  };
}

// ==================== 10. LAYER: OTHER (4 COMPONENTS, 1 ARTBOARD) ====================
function buildOtherLayer(y) {
  const ARTBOARD_W = 1440;
  const ARTBOARD_H = 950;
  const comps = ['Affix', 'App', 'BackTop', 'BorderBeam'];

  const artboard = buildCategoryArtboard(
    'artboard-other-components',
    'Utility & App Context · 工具与全局化配置',
    'Affix, App, BackTop, BorderBeam 工具类组件',
    'Other 其他',
    '#13C2C2',
    comps,
    0,
    ARTBOARD_W,
    ARTBOARD_H
  );

  return {
    type: 'frame',
    id: 'layer-other',
    name: '07 Other · 其他',
    x: 0,
    y,
    width: ARTBOARD_W,
    height: ARTBOARD_H,
    layout: 'none',
    children: [artboard],
  };
}

// ==================== MAIN GENERATOR ====================
console.log('Generating Ant Design 6.6.4 Design System with complete Component Detail Layers...');

const LAYER_GAP = 600;

// Calculate vertical stacking Y coordinates
const layerYCoords = {
  overview: 0,
  templates: 1900 + LAYER_GAP, // 2500
  colors: 2500 + 900 + LAYER_GAP, // 4000
  general: 4000 + 900 + LAYER_GAP, // 5500
  layout: 5500 + 850 + LAYER_GAP, // 6950
  navigation: 6950 + 950 + LAYER_GAP, // 8500
  dataEntry: 8500 + 950 + LAYER_GAP, // 10050
  dataDisplay: 10050 + 1050 + LAYER_GAP, // 11700
  feedback: 11700 + 1050 + LAYER_GAP, // 13350
  other: 13350 + 950 + LAYER_GAP, // 14900
};

// Reversed order so Layers panel in Pen displays natural order:
// Overview, Templates, Colors, General, Layout, Navigation, Data Entry, Data Display, Feedback, Other
const layers = [
  buildOtherLayer(layerYCoords.other),
  buildFeedbackLayer(layerYCoords.feedback),
  buildDataDisplayLayer(layerYCoords.dataDisplay),
  buildDataEntryLayer(layerYCoords.dataEntry),
  buildNavigationLayer(layerYCoords.navigation),
  buildLayoutLayer(layerYCoords.layout),
  buildGeneralLayer(layerYCoords.general),
  buildColorsLayer(layerYCoords.colors),
  buildTemplatesLayer(layerYCoords.templates),
  buildOverviewLayer(layerYCoords.overview),
];

const libraryPen = {
  version: '2.17',
  themes: { mode: ['light', 'dark'], density: ['regular', 'compact'] },
  variables: themedVariables,
  fileToken: 'antd-6-all-components-20260915',
  children: layers,
};

await writeFile(libraryPath, `${JSON.stringify(libraryPen, null, 2)}\n`);
console.log(`Successfully generated libraries/antd-6.lib.pen with ${layers.length} Layers!`);
layers.forEach((l, i) => console.log(` ${i + 1}. ${l.name} (y: ${l.y}, artboards: ${l.children.length})`));
