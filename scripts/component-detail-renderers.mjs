// Authentic, High-Fidelity Ant Design Component Visual Renderers for Detail Artboards
const text = (id, name, content, fill = '#000000E0', size = 14, weight, width) => ({
  type: 'text', id, name, content: String(content), fill, fontFamily: 'Inter', fontSize: size,
  ...(weight ? { fontWeight: String(weight) } : {}),
  ...(width ? { width } : {}),
});

const rect = (id, fill, width, height, radius = 6, stroke, strokeWidth = 1) => ({
  type: 'frame', id, width, height, fill, cornerRadius: radius,
  ...(stroke ? { stroke, strokeWidth } : {}),
});

// Official Ant Design 6.6.4 Categories (71 components total)
export const CATEGORY_MAP = {
  Button: 'General', FloatButton: 'General', Typography: 'General',
  Divider: 'Layout', Flex: 'Layout', Grid: 'Layout', Layout: 'Layout', Space: 'Layout', Splitter: 'Layout', Col: 'Layout', Row: 'Layout', Masonry: 'Layout',
  Anchor: 'Navigation', Breadcrumb: 'Navigation', Dropdown: 'Navigation', Menu: 'Navigation', Pagination: 'Navigation', Steps: 'Navigation', Tabs: 'Navigation',
  AutoComplete: 'Data Entry', Cascader: 'Data Entry', Checkbox: 'Data Entry', ColorPicker: 'Data Entry', DatePicker: 'Data Entry', Form: 'Data Entry', Input: 'Data Entry', InputNumber: 'Data Entry', Mentions: 'Data Entry', Radio: 'Data Entry', Rate: 'Data Entry', Select: 'Data Entry', Slider: 'Data Entry', Switch: 'Data Entry', TimePicker: 'Data Entry', Transfer: 'Data Entry', TreeSelect: 'Data Entry', Upload: 'Data Entry',
  Avatar: 'Data Display', Badge: 'Data Display', Calendar: 'Data Display', Card: 'Data Display', Carousel: 'Data Display', Collapse: 'Data Display', Descriptions: 'Data Display', Empty: 'Data Display', Image: 'Data Display', Listy: 'Data Display', Popover: 'Data Display', QRCode: 'Data Display', Segmented: 'Data Display', Statistic: 'Data Display', Table: 'Data Display', Tag: 'Data Display', Timeline: 'Data Display', Tooltip: 'Data Display', Tour: 'Data Display', Tree: 'Data Display',
  Alert: 'Feedback', Drawer: 'Feedback', Message: 'Feedback', Modal: 'Feedback', Notification: 'Feedback', Popconfirm: 'Feedback', Progress: 'Feedback', Result: 'Feedback', Skeleton: 'Feedback', Spin: 'Feedback', Watermark: 'Feedback',
  Affix: 'Other', App: 'Other', BackTop: 'Other', BorderBeam: 'Other',
};

export const categoryFor = (name) => CATEGORY_MAP[name] || 'Other';

export const CHINESE_NAME_MAP = {
  Button: '按钮', FloatButton: '悬浮按钮', Typography: '排版',
  Divider: '分割线', Flex: '弹性布局', Grid: '栅格', Layout: '布局', Space: '间距', Splitter: '折叠分割器', Col: '栅格列', Row: '栅格行', Masonry: '瀑布流',
  Anchor: '锚点', Breadcrumb: '面包屑', Dropdown: '下拉菜单', Menu: '导航菜单', Pagination: '分页', Steps: '步骤条', Tabs: '标签页',
  AutoComplete: '自动完成', Cascader: '级联选择', Checkbox: '多选框', ColorPicker: '颜色选择器', DatePicker: '日期选择器', Form: '表单', Input: '输入框', InputNumber: '数字输入框', Mentions: '提及', Radio: '单选框', Rate: '评分', Select: '选择器', Slider: '滑动输入条', Switch: '开关', TimePicker: '时间选择器', Transfer: '穿梭框', TreeSelect: '树选择', Upload: '上传',
  Avatar: '头像', Badge: '徽标数', Calendar: '日历', Card: '卡片', Carousel: '走马灯', Collapse: '折叠面板', Descriptions: '描述列表', Empty: '空状态', Image: '图片', Listy: '虚拟列表', Popover: '气泡卡片', QRCode: '二维码', Segmented: '分段控制器', Statistic: '统计数值', Table: '表格', Tag: '标签', Timeline: '时间轴', Tooltip: '文字提示', Tour: '漫游式引导', Tree: '树形控件',
  Alert: '警告提示', Drawer: '抽屉', Message: '全局提示', Modal: '对话框', Notification: '通知提醒框', Popconfirm: '气泡确认框', Progress: '进度条', Result: '结果', Skeleton: '骨架屏', Spin: '加载中', Watermark: '水印',
  Affix: '固钉', App: '包裹器', BackTop: '回到顶部', BorderBeam: '发光边框',
};

export const cnNameFor = (name) => CHINESE_NAME_MAP[name] || name;

// Generates the authentic visual display for each canonical Ant Design component
export function renderComponentDetailCard(compName, globalIndex, cardX, cardY, cardWidth = 424, cardHeight = 270) {
  const id = `antd-${compName.toLowerCase()}-${globalIndex}`;
  const cat = categoryFor(compName);
  const cnName = cnNameFor(compName);
  const compHeight = cardHeight - 62;
  const innerW = cardWidth - 36;

  let compChildren = [];
  let compLayout = 'vertical';
  let compGap = 10;
  let compAlign = 'flex_start';
  let compJustify = 'flex_start';

  switch (compName) {
    // ==================== 1. GENERAL (3) ====================
    case 'Button': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row1`, width: innerW, height: 34, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            rect(`${id}-b1`, '$antd-colorPrimary', 84, 32, 6), text(`${id}-b1t`, 'T', '主要按钮', '#FFFFFF', 12, '500'),
            rect(`${id}-b2`, '#FFFFFF', 84, 32, 6, '#D9D9D9'), text(`${id}-b2t`, 'T', '默认按钮', '#000000E0', 12, '500'),
            rect(`${id}-b3`, '#FFFFFF', 84, 32, 6, '$antd-colorPrimary'), text(`${id}-b3t`, 'T', '虚线按钮', '$antd-colorPrimary', 12, '500'),
            rect(`${id}-b4`, '$antd-colorError', 84, 32, 6), text(`${id}-b4t`, 'T', '危险按钮', '#FFFFFF', 12, '500'),
          ],
        },
        {
          type: 'frame', id: `${id}-row2`, width: innerW, height: 34, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            rect(`${id}-b5`, '#4096FF', 84, 32, 6), text(`${id}-b5t`, 'T', '悬浮态', '#FFFFFF', 12, '500'),
            rect(`${id}-b6`, '$antd-colorPrimary', 96, 32, 6), text(`${id}-b6t`, 'T', '⌛ 加载中', '#FFFFFF', 12, '500'),
            rect(`${id}-b7`, '#0000000A', 84, 32, 6, '#D9D9D9'), text(`${id}-b7t`, 'T', '禁用态', '#00000040', 12, '500'),
            rect(`${id}-b8`, '#00000000', 70, 32, 6), text(`${id}-b8t`, 'T', '文本按钮', '#000000E0', 12, '500'),
          ],
        },
        {
          type: 'frame', id: `${id}-row3`, width: innerW, height: 34, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            rect(`${id}-bs-lg`, '$antd-colorPrimary', 96, 36, 6), text(`${id}-bt-lg`, 'T', 'Large 按钮', '#FFFFFF', 13, '600'),
            rect(`${id}-bs-sm`, '$antd-colorPrimary', 76, 24, 4), text(`${id}-bt-sm`, 'T', 'Small', '#FFFFFF', 11, '500'),
            rect(`${id}-bs-rnd`, '$antd-colorPrimary', 32, 32, 16), text(`${id}-bt-rnd`, 'T', '🔍', '#FFFFFF', 12),
          ],
        },
      ];
      break;
    }

    case 'FloatButton': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 20, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-fb1`, width: 48, height: 48, fill: '$antd-colorPrimary', cornerRadius: 24, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-fb1t`, 'T', '★', '#FFFFFF', 20)] },
            { type: 'frame', id: `${id}-fb2`, width: 48, height: 48, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 24, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-fb2t`, 'T', '💬', '#000000A6', 18)] },
            { type: 'frame', id: `${id}-fb3`, width: 48, height: 48, fill: '$antd-colorPrimary', cornerRadius: 24, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-fb3t`, 'T', '↑', '#FFFFFF', 20, '700')] },
            { type: 'frame', id: `${id}-fb-badge`, width: 48, height: 48, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 24, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-fb4t`, 'T', '🔔', '#000000E0', 18)] },
          ],
        },
        text(`${id}-desc`, 'D', '悬浮按钮提供常驻操作入库，支持返回顶部、徽标、菜单扩展及多种样式', '#00000073', 12),
      ];
      break;
    }

    case 'Typography': {
      compChildren = [
        text(`${id}-h2`, 'H2', '二级标题 Heading 2 (Typography.Title)', '#000000E0', 17, '600'),
        text(`${id}-p`, 'P', 'Ant Design 为企业级产品提供一致、清晰的界面文本规范。', '#000000A6', 13),
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 12, alignItems: 'center',
          children: [
            text(`${id}-lnk`, 'Link', '了解更多规范 ›', '$antd-colorPrimary', 13, '500'),
            { type: 'frame', id: `${id}-code`, fill: '#F5F5F5', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: [2, 6], children: [text(`${id}-codet`, 'C', 'code: npm install antd', '#FF4D4F', 11)] },
          ],
        },
      ];
      break;
    }

    // ==================== 2. LAYOUT (9) ====================
    case 'Divider': {
      compChildren = [
        text(`${id}-top`, 'T', '上方内容区域 (Section Header)', '#000000E0', 13, '500'),
        {
          type: 'frame', id: `${id}-div-row`, width: innerW, layout: 'horizontal', alignItems: 'center', gap: 12,
          children: [
            rect(`${id}-d1`, '#E8E8E8', 100, 1, 0),
            text(`${id}-dt`, 'T', '居中文本分割线', '#00000073', 12),
            rect(`${id}-d2`, '#E8E8E8', 120, 1, 0),
          ],
        },
        text(`${id}-bot`, 'T', '下方内容描述详情 (Section Content)', '#000000A6', 12),
        rect(`${id}-dash`, '#D9D9D9', innerW, 1, 0),
        text(`${id}-dash-lbl`, 'T', '虚线分割线 (Dashed Divider)', '#00000073', 11),
      ];
      break;
    }

    case 'Flex': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Flex 弹性布局 · justify: space-between, gap: 10', '#00000073', 12),
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 48, fill: '#F5F5F5', cornerRadius: 6, padding: [8, 12], layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center',
          children: [
            rect(`${id}-f1`, '#91CAFF', 72, 32, 4), text(`${id}-f1t`, 'T', '项目一', '#003A8C', 12, '600'),
            rect(`${id}-f2`, '#69C0FF', 72, 32, 4), text(`${id}-f2t`, 'T', '项目二', '#003A8C', 12, '600'),
            rect(`${id}-f3`, '#4096FF', 72, 32, 4), text(`${id}-f3t`, 'T', '项目三', '#FFFFFF', 12, '600'),
            rect(`${id}-f4`, '$antd-colorPrimary', 72, 32, 4), text(`${id}-f4t`, 'T', '项目四', '#FFFFFF', 12, '600'),
          ],
        },
        text(`${id}-wrap`, 'W', '支持 wrap、align、justify 等 CSS Flexbox 完整属性', '#00000073', 12),
      ];
      break;
    }

    case 'Grid': {
      compChildren = [
        text(`${id}-lbl1`, 'L', '24 栅格系统 · Col span={8} × 3', '#00000073', 12),
        {
          type: 'frame', id: `${id}-r1`, width: innerW, height: 34, layout: 'horizontal', gap: 8,
          children: [
            rect(`${id}-c1`, '#91CAFF', 120, 34, 4), text(`${id}-c1t`, 'T', 'col-8 (33.3%)', '#003A8C', 11, '600'),
            rect(`${id}-c2`, '#69C0FF', 120, 34, 4), text(`${id}-c2t`, 'T', 'col-8 (33.3%)', '#003A8C', 11, '600'),
            rect(`${id}-c3`, '#4096FF', 120, 34, 4), text(`${id}-c3t`, 'T', 'col-8 (33.3%)', '#FFFFFF', 11, '600'),
          ],
        },
        text(`${id}-lbl2`, 'L', 'Col span={6} + span={18}', '#00000073', 12),
        {
          type: 'frame', id: `${id}-r2`, width: innerW, height: 34, layout: 'horizontal', gap: 8,
          children: [
            rect(`${id}-c4`, '#ADC6FF', 90, 34, 4), text(`${id}-c4t`, 'T', 'col-6', '#003A8C', 11, '600'),
            rect(`${id}-c5`, '$antd-colorPrimary', 280, 34, 4), text(`${id}-c5t`, 'T', 'col-18 (75%)', '#FFFFFF', 11, '600'),
          ],
        },
      ];
      break;
    }

    case 'Col': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Col 栅格列组件规范 (span, offset, push, pull)', '#00000073', 12),
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 80, fill: '#F5F5F5', cornerRadius: 6, padding: [10, 10], layout: 'horizontal', gap: 8,
          children: [
            rect(`${id}-col-a`, '$antd-colorPrimary', 110, 60, 4), text(`${id}-cta`, 'T', 'Col: 8', '#FFFFFF', 13, '600'),
            rect(`${id}-col-b`, '#4096FF', 150, 60, 4), text(`${id}-ctb`, 'T', 'Col: 10', '#FFFFFF', 13, '600'),
            rect(`${id}-col-c`, '#69C0FF', 90, 60, 4), text(`${id}-ctc`, 'T', 'Col: 6', '#003A8C', 13, '600'),
          ],
        },
        text(`${id}-tip`, 'T', '响应式断点 xs, sm, md, lg, xl, xxl 自适应流式布局', '#00000073', 11),
      ];
      break;
    }

    case 'Row': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Row 栅格行组件规范 (gutter, justify, align)', '#00000073', 12),
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 75, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [8, 12], layout: 'vertical', gap: 8,
          children: [
            text(`${id}-rw-t`, 'T', 'Row gutter={[16, 16]}', '#000000A6', 12, '600'),
            {
              type: 'frame', id: `${id}-items`, width: innerW - 24, height: 32, layout: 'horizontal', gap: 12,
              children: [
                rect(`${id}-r1`, '#ADC6FF', 100, 32, 4), text(`${id}-r1t`, 'T', 'item 1', '#003A8C', 11),
                rect(`${id}-r2`, '#91CAFF', 100, 32, 4), text(`${id}-r2t`, 'T', 'item 2', '#003A8C', 11),
                rect(`${id}-r3`, '#69C0FF', 120, 32, 4), text(`${id}-r3t`, 'T', 'item 3', '#003A8C', 11),
              ],
            },
          ],
        },
      ];
      break;
    }

    case 'Layout': {
      compChildren = [
        {
          type: 'frame', id: `${id}-frame`, width: innerW, height: 140, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 6, clip: true, layout: 'vertical',
          children: [
            { type: 'frame', id: `${id}-hdr`, width: innerW, height: 28, fill: '#001529', padding: [0, 10], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-ht`, 'T', 'Header 顶部通栏', '#FFFFFF', 11, '600')] },
            {
              type: 'frame', id: `${id}-mid`, width: innerW, height: 86, layout: 'horizontal',
              children: [
                { type: 'frame', id: `${id}-sid`, width: 80, height: 86, fill: '#002140', padding: [10, 8], children: [text(`${id}-st`, 'T', 'Sider 侧边栏', '#85A5FF', 11)] },
                { type: 'frame', id: `${id}-cnt`, width: innerW - 80, height: 86, fill: '#F5F5F5', padding: [12, 12], children: [text(`${id}-ct`, 'T', 'Content 页面主体内容工作区', '#000000A6', 12)] },
              ],
            },
            { type: 'frame', id: `${id}-ftr`, width: innerW, height: 26, fill: '#FAFAFA', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-ft`, 'T', 'Footer 底部版权信息 © Ant Design', '#00000073', 10)] },
          ],
        },
      ];
      break;
    }

    case 'Space': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Space 间距组件 (自动处理子节点内边距)', '#00000073', 12),
        {
          type: 'frame', id: `${id}-sp-row`, width: innerW, height: 44, layout: 'horizontal', gap: 12, alignItems: 'center',
          children: [
            rect(`${id}-sb1`, '$antd-colorPrimary', 70, 32, 4), text(`${id}-sb1t`, 'T', '按钮', '#FFFFFF', 12, '500'),
            { type: 'frame', id: `${id}-stag`, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 4, padding: [4, 8], children: [text(`${id}-stt`, 'T', '标签组件', '$antd-colorPrimary', 12)] },
            { type: 'frame', id: `${id}-ssw`, width: 44, height: 22, fill: '$antd-colorPrimary', cornerRadius: 11, padding: [2, 2], layout: 'horizontal', justifyContent: 'flex_end', children: [rect(`${id}-ssh`, '#FFFFFF', 18, 18, 9)] },
            text(`${id}-stxt`, 'T', '正文文本', '#000000A6', 12),
          ],
        },
        text(`${id}-sub`, 'S', '支持 size: small | middle | large | 自定义数值，自动跨行间距', '#00000073', 11),
      ];
      break;
    }

    case 'Splitter': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Splitter 折叠分割面板 (拖拽调整双栏比例)', '#00000073', 12),
        {
          type: 'frame', id: `${id}-split`, width: innerW, height: 110, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, layout: 'horizontal',
          children: [
            { type: 'frame', id: `${id}-p1`, width: 140, height: 110, fill: '#F5F5F5', padding: [12, 12], children: [text(`${id}-p1t`, 'T', '左侧面板\ndefault: 35%', '#000000A6', 12)] },
            { type: 'frame', id: `${id}-bar`, width: 8, height: 110, fill: '#E8E8E8', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [rect(`${id}-knob`, '#8C8C8C', 4, 20, 2)] },
            { type: 'frame', id: `${id}-p2`, width: innerW - 148, height: 110, fill: '#FFFFFF', padding: [12, 12], children: [text(`${id}-p2t`, 'T', '右侧面板主工作区\n可响应式伸缩', '#000000E0', 12)] },
          ],
        },
      ];
      break;
    }

    case 'Masonry': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Masonry 瀑布流布局 (自适应高度无空隙堆叠)', '#00000073', 12),
        {
          type: 'frame', id: `${id}-grid`, width: innerW, height: 120, layout: 'horizontal', gap: 10,
          children: [
            { type: 'frame', id: `${id}-c1`, width: 115, layout: 'vertical', gap: 8, children: [rect(`${id}-m1`, '#ADC6FF', 115, 60, 4), rect(`${id}-m2`, '#91CAFF', 115, 45, 4)] },
            { type: 'frame', id: `${id}-c2`, width: 115, layout: 'vertical', gap: 8, children: [rect(`${id}-m3`, '$antd-colorPrimary', 115, 40, 4), rect(`${id}-m4`, '#69C0FF', 115, 65, 4)] },
            { type: 'frame', id: `${id}-c3`, width: 115, layout: 'vertical', gap: 8, children: [rect(`${id}-m5`, '#D6E4FF', 115, 75, 4), rect(`${id}-m6`, '#ADC6FF', 115, 30, 4)] },
          ],
        },
      ];
      break;
    }

    // ==================== 3. NAVIGATION (7) ====================
    case 'Anchor': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Anchor 锚点导航', '#00000073', 12),
        {
          type: 'frame', id: `${id}-links`, width: innerW, layout: 'vertical', gap: 8,
          children: [
            { type: 'frame', id: `${id}-a1`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-pip`, '$antd-colorPrimary', 3, 14, 1), text(`${id}-at1`, 'T', '1. 快速了解 Ant Design 规范', '$antd-colorPrimary', 13, '600')] },
            { type: 'frame', id: `${id}-a2`, padding: [0, 11], children: [text(`${id}-at2`, 'T', '2. 组件使用说明与 Props API', '#000000A6', 13)] },
            { type: 'frame', id: `${id}-a3`, padding: [0, 11], children: [text(`${id}-at3`, 'T', '3. 主题与 Design Tokens 定制', '#000000A6', 13)] },
          ],
        },
      ];
      break;
    }

    case 'Breadcrumb': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Breadcrumb 面包屑路径', '#00000073', 12),
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            text(`${id}-b1`, 'T', '首页', '#00000073', 13),
            text(`${id}-s1`, 'S', '/', '#00000040', 13),
            text(`${id}-b2`, 'T', '研发中心', '#00000073', 13),
            text(`${id}-s2`, 'S', '/', '#00000040', 13),
            text(`${id}-b3`, 'T', '项目详情', '#000000E0', 13, '600'),
          ],
        },
        rect(`${id}-sep`, '#F0F0F0', innerW, 1, 0),
        text(`${id}-tip`, 'T', '支持下拉菜单扩展、路由联动以及自定义分隔符', '#00000073', 12),
      ];
      break;
    }

    case 'Dropdown': {
      compChildren = [
        {
          type: 'frame', id: `${id}-top`, width: innerW, layout: 'horizontal', gap: 12, alignItems: 'center',
          children: [
            rect(`${id}-btn`, '#FFFFFF', 130, 32, 4, '#D9D9D9'), text(`${id}-btnt`, 'T', '操作菜单 ⌄', '#000000E0', 13, '500'),
          ],
        },
        {
          type: 'frame', id: `${id}-menu`, width: 180, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 6, padding: [4, 4], layout: 'vertical', gap: 2,
          children: [
            { type: 'frame', id: `${id}-m1`, width: 172, height: 28, fill: '#E6F4FF', cornerRadius: 4, padding: [0, 8], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-m1t`, 'T', '编辑项目配置', '$antd-colorPrimary', 12)] },
            { type: 'frame', id: `${id}-m2`, width: 172, height: 28, padding: [0, 8], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-m2t`, 'T', '复制访问链接', '#000000E0', 12)] },
            { type: 'frame', id: `${id}-m3`, width: 172, height: 28, padding: [0, 8], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-m3t`, 'T', '删除当前项目', '#FF4D4F', 12)] },
          ],
        },
      ];
      break;
    }

    case 'Menu': {
      compChildren = [
        {
          type: 'frame', id: `${id}-menu`, width: innerW, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 6, padding: [6, 6], layout: 'vertical', gap: 4,
          children: [
            { type: 'frame', id: `${id}-m1`, width: innerW - 12, height: 34, fill: '#E6F4FF', cornerRadius: 4, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between', children: [text(`${id}-m1t`, 'T', '▣  工作台大盘', '$antd-colorPrimary', 13, '600'), rect(`${id}-bar`, '$antd-colorPrimary', 3, 16, 2)] },
            { type: 'frame', id: `${id}-m2`, width: innerW - 12, height: 34, padding: [0, 12], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-m2t`, 'T', '▤  项目与代码中心', '#000000A6', 13)] },
            { type: 'frame', id: `${id}-m3`, width: innerW - 12, height: 34, padding: [0, 12], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-m3t`, 'T', '⚙  系统与安全配置', '#000000A6', 13)] },
          ],
        },
      ];
      break;
    }

    case 'Pagination': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Pagination 分页组件', '#00000073', 12),
        {
          type: 'frame', id: `${id}-pager`, layout: 'horizontal', gap: 6, alignItems: 'center',
          children: [
            rect(`${id}-p0`, '#FFFFFF', 28, 28, 4, '#D9D9D9'), text(`${id}-p0t`, 'T', '‹', '#00000073', 14),
            rect(`${id}-p1`, '$antd-colorPrimary', 28, 28, 4), text(`${id}-p1t`, 'T', '1', '#FFFFFF', 12, '600'),
            rect(`${id}-p2`, '#FFFFFF', 28, 28, 4, '#D9D9D9'), text(`${id}-p2t`, 'T', '2', '#000000E0', 12),
            rect(`${id}-p3`, '#FFFFFF', 28, 28, 4, '#D9D9D9'), text(`${id}-p3t`, 'T', '3', '#000000E0', 12),
            rect(`${id}-pnext`, '#FFFFFF', 28, 28, 4, '#D9D9D9'), text(`${id}-pnt`, 'T', '›', '#00000073', 14),
          ],
        },
        text(`${id}-tot`, 'T', '共 128 条记录 · 10 条/页', '#00000073', 12),
      ];
      break;
    }

    case 'Steps': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Steps 步骤条', '#00000073', 12),
        {
          type: 'frame', id: `${id}-row`, width: innerW, height: 40, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            rect(`${id}-s1`, '$antd-colorPrimary', 24, 24, 12), text(`${id}-s1t`, 'T', '1 填写信息', '$antd-colorPrimary', 12, '600'),
            rect(`${id}-l1`, '$antd-colorPrimary', 36, 2, 0),
            rect(`${id}-s2`, '$antd-colorPrimary', 24, 24, 12), text(`${id}-s2t`, 'T', '2 审核确认', '$antd-colorPrimary', 12, '600'),
            rect(`${id}-l2`, '#D9D9D9', 36, 2, 0),
            rect(`${id}-s3`, '#FFFFFF', 24, 24, 12, '#D9D9D9'), text(`${id}-s3t`, 'T', '3 完成', '#00000040', 12),
          ],
        },
      ];
      break;
    }

    case 'Tabs': {
      compChildren = [
        {
          type: 'frame', id: `${id}-head`, width: innerW, layout: 'horizontal', gap: 24,
          children: [
            text(`${id}-t1`, 'T', '概览信息', '$antd-colorPrimary', 14, '600'),
            text(`${id}-t2`, 'T', '详细日志', '#000000A6', 14),
            text(`${id}-t3`, 'T', '安全审计', '#000000A6', 14),
          ],
        },
        rect(`${id}-line`, '$antd-colorPrimary', 56, 2, 0),
        {
          type: 'frame', id: `${id}-cnt`, width: innerW, height: 75, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 4, padding: [12, 14],
          children: [text(`${id}-ct`, 'T', '当前选中的第一标签页内容区域，展示全局概览信息。', '#000000A6', 12)],
        },
      ];
      break;
    }

    // ==================== 4. DATA ENTRY (18) ====================
    case 'AutoComplete': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-val`, 'T', 'ant-design-pro', '#000000E0', 13), text(`${id}-icon`, 'I', '🔍', '#00000073', 12)],
        },
        {
          type: 'frame', id: `${id}-sugg`, width: innerW, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 4, padding: [4, 4], layout: 'vertical', gap: 2,
          children: [
            { type: 'frame', id: `${id}-g1`, width: innerW - 8, height: 26, fill: '#E6F4FF', padding: [0, 8], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-g1t`, 'T', 'ant-design-pro-cli', '$antd-colorPrimary', 12)] },
            { type: 'frame', id: `${id}-g2`, width: innerW - 8, height: 26, padding: [0, 8], layout: 'horizontal', alignItems: 'center', children: [text(`${id}-g2t`, 'T', 'ant-design-colors', '#000000A6', 12)] },
          ],
        },
      ];
      break;
    }

    case 'Cascader': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-val`, 'T', '浙江省 / 杭州市 / 西湖区', '#000000E0', 13), text(`${id}-arrow`, 'A', '⌄', '#00000073', 13)],
        },
        rect(`${id}-hint`, '#FAFAFA', innerW, 65, 4, '#F0F0F0'),
        text(`${id}-ht`, 'T', '支持多级联动、单选与多选，动态加载子级选项数据', '#00000073', 12),
      ];
      break;
    }

    case 'Checkbox': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 16, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-c1`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-cb1`, '$antd-colorPrimary', 16, 16, 3), text(`${id}-t1`, 'T', '✓ 选项 A (已选)', '#000000E0', 13)] },
            { type: 'frame', id: `${id}-c2`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-cb2`, '#FFFFFF', 16, 16, 3, '#D9D9D9'), text(`${id}-t2`, 'T', '选项 B (未选)', '#000000A6', 13)] },
            { type: 'frame', id: `${id}-c3`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-cb3`, '#F5F5F5', 16, 16, 3, '#D9D9D9'), text(`${id}-t3`, 'T', '选项 C (禁用)', '#00000040', 13)] },
          ],
        },
      ];
      break;
    }

    case 'ColorPicker': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 14, alignItems: 'center',
          children: [
            rect(`${id}-swatch`, '$antd-colorPrimary', 36, 36, 6),
            {
              type: 'frame', id: `${id}-info`, layout: 'vertical', gap: 2,
              children: [
                text(`${id}-hex`, 'H', '#1677FF', '#000000E0', 13, '600'),
                text(`${id}-rgb`, 'R', 'RGB: 22, 119, 255 (100%)', '#00000073', 11),
              ],
            },
          ],
        },
      ];
      break;
    }

    case 'DatePicker': {
      compChildren = [
        {
          type: 'frame', id: `${id}-dp`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-val`, 'T', '2026-09-16', '#000000E0', 13), text(`${id}-icon`, 'I', '📅', '#00000073', 13)],
        },
        {
          type: 'frame', id: `${id}-range`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-rv`, 'T', '2026-09-01  ~  2026-09-30 (范围选择)', '#000000A6', 12), text(`${id}-ri`, 'I', '📅', '#00000073', 13)],
        },
      ];
      break;
    }

    case 'Form': {
      compChildren = [
        text(`${id}-l1`, 'L', '账号名称 *', '#00000073', 12, '600'),
        rect(`${id}-i1`, '#FFFFFF', innerW, 30, 4, '#D9D9D9'),
        text(`${id}-l2`, 'L', '登录密码 *', '#00000073', 12, '600'),
        rect(`${id}-i2`, '#FFFFFF', innerW, 30, 4, '#D9D9D9'),
        {
          type: 'frame', id: `${id}-submit`, width: 80, height: 28, fill: '$antd-colorPrimary', cornerRadius: 4, layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
          children: [text(`${id}-st`, 'T', '提交保存', '#FFFFFF', 12, '500')],
        },
      ];
      break;
    }

    case 'Input': {
      compChildren = [
        {
          type: 'frame', id: `${id}-i1`, width: innerW, height: 32, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 10], layout: 'horizontal', alignItems: 'center',
          children: [text(`${id}-i1t`, 'T', '请输入文本内容...', '#00000040', 12)],
        },
        {
          type: 'frame', id: `${id}-i2`, width: innerW, height: 32, fill: '#FFFFFF', stroke: '#1677FF', strokeWidth: 1, cornerRadius: 6, padding: [0, 10], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-i2t`, 'T', 'ant-design-pro', '#000000E0', 12), text(`${id}-i2c`, 'C', '✕', '#00000040', 11)],
        },
        {
          type: 'frame', id: `${id}-i3`, width: innerW, height: 32, fill: '#FFFFFF', stroke: '#FF4D4F', strokeWidth: 1, cornerRadius: 6, padding: [0, 10], layout: 'horizontal', alignItems: 'center',
          children: [text(`${id}-i3t`, 'T', '格式错误示例 (status="error")', '#FF4D4F', 12)],
        },
      ];
      break;
    }

    case 'InputNumber': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: 170, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [
            text(`${id}-val`, 'T', '99.00', '#000000E0', 13),
            { type: 'frame', id: `${id}-st`, layout: 'vertical', children: [text(`${id}-u`, 'U', '▴', '#00000073', 9), text(`${id}-d`, 'D', '▾', '#00000073', 9)] },
          ],
        },
        text(`${id}-tip`, 'T', '支持步长 step、精度 precision、前缀/后缀与格式化 formatter', '#00000073', 12),
      ];
      break;
    }

    case 'Mentions': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 60, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [8, 10], layout: 'vertical',
          children: [
            text(`${id}-txt`, 'T', '请 @项目经理 审核本期迭代规划', '#000000E0', 13),
          ],
        },
        {
          type: 'frame', id: `${id}-pop`, width: 160, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 4, padding: [4, 6], layout: 'vertical', gap: 2,
          children: [
            text(`${id}-m1`, 'T', '@项目经理 (张三)', '$antd-colorPrimary', 12),
            text(`${id}-m2`, 'T', '@前端开发 (李四)', '#000000A6', 12),
          ],
        },
      ];
      break;
    }

    case 'Radio': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 16, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-r1`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-rb1`, '$antd-colorPrimary', 16, 16, 8), text(`${id}-t1`, 'T', '单选 A (选中)', '#000000E0', 13)] },
            { type: 'frame', id: `${id}-r2`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-rb2`, '#FFFFFF', 16, 16, 8, '#D9D9D9'), text(`${id}-t2`, 'T', '单选 B', '#000000A6', 13)] },
            { type: 'frame', id: `${id}-r3`, layout: 'horizontal', gap: 8, alignItems: 'center', children: [rect(`${id}-rb3`, '#F5F5F5', 16, 16, 8, '#D9D9D9'), text(`${id}-t3`, 'T', '单选 C', '#00000040', 13)] },
          ],
        },
      ];
      break;
    }

    case 'Rate': {
      compChildren = [
        {
          type: 'frame', id: `${id}-stars`, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            text(`${id}-s1`, 'S', '★', '#FAAD14', 22),
            text(`${id}-s2`, 'S', '★', '#FAAD14', 22),
            text(`${id}-s3`, 'S', '★', '#FAAD14', 22),
            text(`${id}-s4`, 'S', '★', '#FAAD14', 22),
            text(`${id}-s5`, 'S', '☆', '#D9D9D9', 22),
            text(`${id}-score`, 'T', '4.0 分 · 极好', '#FAAD14', 13, '600'),
          ],
        },
      ];
      break;
    }

    case 'Select': {
      compChildren = [
        {
          type: 'frame', id: `${id}-s1`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-s1t`, 'T', '研发工程师 (Developer)', '#000000E0', 13), text(`${id}-s1a`, 'A', '⌄', '#00000073', 12)],
        },
        {
          type: 'frame', id: `${id}-s2`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [4, 8], layout: 'horizontal', gap: 6, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-tag1`, fill: '#F5F5F5', cornerRadius: 4, padding: [2, 6], children: [text(`${id}-t1`, 'T', '设计 ✕', '#000000A6', 11)] },
            { type: 'frame', id: `${id}-tag2`, fill: '#F5F5F5', cornerRadius: 4, padding: [2, 6], children: [text(`${id}-t2`, 'T', '研发 ✕', '#000000A6', 11)] },
          ],
        },
      ];
      break;
    }

    case 'Slider': {
      compChildren = [
        text(`${id}-val`, 'V', '当前数值: 65%', '$antd-colorPrimary', 12, '600'),
        {
          type: 'frame', id: `${id}-track-bg`, width: innerW, height: 6, fill: '#F5F5F5', cornerRadius: 3, layout: 'horizontal',
          children: [
            rect(`${id}-track-fill`, '$antd-colorPrimary', 220, 6, 3),
          ],
        },
        { type: 'frame', id: `${id}-thumb`, width: 16, height: 16, fill: '#FFFFFF', stroke: '$antd-colorPrimary', strokeWidth: 2, cornerRadius: 8 },
      ];
      break;
    }

    case 'Switch': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 20, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-on`, width: 44, height: 22, fill: '$antd-colorPrimary', cornerRadius: 11, padding: [2, 2], layout: 'horizontal', justifyContent: 'flex_end', children: [rect(`${id}-h1`, '#FFFFFF', 18, 18, 9)] },
            text(`${id}-l1`, 'T', '开启 (checked)', '$antd-colorPrimary', 13),
            { type: 'frame', id: `${id}-off`, width: 44, height: 22, fill: '#BFBFBF', cornerRadius: 11, padding: [2, 2], layout: 'horizontal', justifyContent: 'flex_start', children: [rect(`${id}-h2`, '#FFFFFF', 18, 18, 9)] },
            text(`${id}-l2`, 'T', '已关闭', '#00000073', 13),
          ],
        },
      ];
      break;
    }

    case 'TimePicker': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: 220, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-val`, 'T', '14:30:00', '#000000E0', 13), text(`${id}-icon`, 'I', '🕒', '#00000073', 13)],
        },
        text(`${id}-tip`, 'T', '精确到秒的时间选择器，支持时、分、秒独立滚动列联动', '#00000073', 12),
      ];
      break;
    }

    case 'Transfer': {
      compChildren = [
        {
          type: 'frame', id: `${id}-trans`, width: innerW, height: 120, layout: 'horizontal', gap: 10, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-l`, width: 140, height: 120, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [6, 8], layout: 'vertical', gap: 4, children: [text(`${id}-lt`, 'T', '待选项 (2/4)', '#00000073', 11), rect(`${id}-ls`, '#F0F0F0', 124, 1, 0), text(`${id}-li1`, 'T', '☐ 候选一', '#000000A6', 12), text(`${id}-li2`, 'T', '☐ 候选二', '#000000A6', 12)] },
            { type: 'frame', id: `${id}-arrows`, layout: 'vertical', gap: 6, children: [rect(`${id}-ar1`, '$antd-colorPrimary', 24, 24, 4), text(`${id}-art1`, 'T', '›', '#FFFFFF', 14), rect(`${id}-ar2`, '#F5F5F5', 24, 24, 4), text(`${id}-art2`, 'T', '‹', '#00000073', 14)] },
            { type: 'frame', id: `${id}-r`, width: 140, height: 120, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [6, 8], layout: 'vertical', gap: 4, children: [text(`${id}-rt`, 'T', '已选项 (1)', '#00000073', 11), rect(`${id}-rs`, '#F0F0F0', 124, 1, 0), text(`${id}-ri1`, 'T', '☑ 候选三', '$antd-colorPrimary', 12)] },
          ],
        },
      ];
      break;
    }

    case 'TreeSelect': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 34, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [0, 12], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [text(`${id}-val`, 'T', '蚂蚁集团 / 核心技术组', '#000000E0', 13), text(`${id}-arrow`, 'A', '⌄', '#00000073', 13)],
        },
        rect(`${id}-hint`, '#FAFAFA', innerW, 60, 4, '#F0F0F0'),
        text(`${id}-ht`, 'T', '结合 Tree 与 Select 的树形下拉控件，支持层级多选', '#00000073', 12),
      ];
      break;
    }

    case 'Upload': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 90, stroke: '$antd-colorPrimary', strokeWidth: 1, cornerRadius: 6, fill: '#FAFAFA', layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 6,
          children: [
            text(`${id}-icon`, 'I', '☁', '$antd-colorPrimary', 24),
            text(`${id}-txt`, 'T', '点击或将文件拖拽至此区域上传', '#000000A6', 12),
          ],
        },
        text(`${id}-f`, 'F', '📄 项目需求说明书_v2.pdf (1.2 MB) ✓', '#52C41A', 11),
      ];
      break;
    }

    // ==================== 5. DATA DISPLAY (20) ====================
    case 'Avatar': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 16, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-a1`, width: 44, height: 44, fill: '$antd-colorPrimary', cornerRadius: 22, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-a1t`, 'T', '张', '#FFFFFF', 16, '600')] },
            { type: 'frame', id: `${id}-a2`, width: 44, height: 44, fill: '#87D068', cornerRadius: 22, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-a2t`, 'T', 'U', '#FFFFFF', 16, '600')] },
            { type: 'frame', id: `${id}-a3`, width: 44, height: 44, fill: '#FF85C0', cornerRadius: 6, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-a3t`, 'T', '方', '#FFFFFF', 16, '600')] },
          ],
        },
        text(`${id}-desc`, 'D', '支持圆形、方形、文字、图标与图片等多种形式头像', '#00000073', 12),
      ];
      break;
    }

    case 'Badge': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 24, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${id}-sq`, width: 44, height: 44, fill: '#F0F2F5', cornerRadius: 6,
              children: [
                { type: 'frame', id: `${id}-pip`, width: 18, height: 18, fill: '#FF4D4F', cornerRadius: 9, x: 30, y: -6, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-pt`, 'T', '5', '#FFFFFF', 10, '700')] },
              ],
            },
            text(`${id}-st`, 'T', '● 正常运行 (Status Dot)', '#52C41A', 13, '600'),
          ],
        },
      ];
      break;
    }

    case 'Calendar': {
      compChildren = [
        text(`${id}-m`, 'M', '2026年9月 (月历视图)', '#000000E0', 13, '600'),
        rect(`${id}-line`, '#F0F0F0', innerW, 1, 0),
        text(`${id}-w`, 'W', '一   二   三   四   五   六   日', '#00000073', 11),
        text(`${id}-d`, 'D', ' 1    2    3    4    5    6    7\n 8    9   10   11   12   13   14\n15  [16]  17   18   19   20   21', '#000000E0', 11),
      ];
      break;
    }

    case 'Card': {
      compChildren = [
        {
          type: 'frame', id: `${id}-cd`, width: innerW, height: 120, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 8, padding: [12, 14], layout: 'vertical', gap: 6,
          children: [
            {
              type: 'frame', id: `${id}-ch`, width: innerW - 28, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center',
              children: [text(`${id}-ct`, 'T', '业务监控概览 (Card Title)', '#000000E0', 13, '600'), text(`${id}-ce`, 'T', '更多 ›', '$antd-colorPrimary', 12)],
            },
            rect(`${id}-sep`, '#F0F0F0', innerW - 28, 1, 0),
            text(`${id}-cb`, 'T', '实时并发事务处理中，服务健康度 99.9%', '#00000073', 12),
          ],
        },
      ];
      break;
    }

    case 'Carousel': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 100, fill: '#364D79', cornerRadius: 6, layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 10,
          children: [
            text(`${id}-ct`, 'T', 'Ant Design 走马灯轮播 1', '#FFFFFF', 14, '600'),
            text(`${id}-dots`, 'D', '●  ○  ○  ○', '#FFFFFFB3', 12),
          ],
        },
      ];
      break;
    }

    case 'Collapse': {
      compChildren = [
        {
          type: 'frame', id: `${id}-c1`, width: innerW, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [8, 12], layout: 'vertical', gap: 4,
          children: [
            text(`${id}-h1`, 'H', '⌄ 面板一：项目说明', '#000000E0', 13, '600'),
            text(`${id}-p1`, 'P', '展开后的详细文本说明内容。', '#000000A6', 12),
          ],
        },
        {
          type: 'frame', id: `${id}-c2`, width: innerW, height: 32, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 12], layout: 'horizontal', alignItems: 'center',
          children: [text(`${id}-h2`, 'H', '› 面板二：高级参数设置 (折叠)', '#00000073', 13)],
        },
      ];
      break;
    }

    case 'Descriptions': {
      compChildren = [
        text(`${id}-dt`, 'T', '用户信息明细', '#000000E0', 13, '600'),
        {
          type: 'frame', id: `${id}-box`, width: innerW, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 4, padding: [8, 10], layout: 'vertical', gap: 4,
          children: [
            text(`${id}-r1`, 'T', '姓名：张三        状态：正常', '#000000A6', 12),
            text(`${id}-r2`, 'T', '所属部门：蚂蚁体验技术平台', '#000000A6', 12),
          ],
        },
      ];
      break;
    }

    case 'Empty': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 6,
          children: [
            text(`${id}-ico`, 'I', '📁', '#00000040', 32),
            text(`${id}-et`, 'T', '暂无数据', '#00000073', 13),
            rect(`${id}-btn`, '$antd-colorPrimary', 80, 26, 4), text(`${id}-bt`, 'T', '立即创建', '#FFFFFF', 11),
          ],
        },
      ];
      break;
    }

    case 'Image': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: 160, height: 95, fill: '#F5F5F5', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 6,
          children: [
            text(`${id}-ico`, 'I', '🖼️', '#00000040', 24),
            text(`${id}-lbl`, 'L', '图片预览组件', '#00000073', 11),
          ],
        },
      ];
      break;
    }

    case 'Popover': {
      compChildren = [
        {
          type: 'frame', id: `${id}-card`, width: 220, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 6, padding: [10, 12], layout: 'vertical', gap: 4,
          children: [
            text(`${id}-pt`, 'T', '气泡卡片标题', '#000000E0', 13, '600'),
            text(`${id}-pb`, 'B', '这里是 Popover 气泡浮层详细说明信息。', '#00000073', 12),
          ],
        },
        rect(`${id}-btn`, '$antd-colorPrimary', 90, 28, 4), text(`${id}-bt`, 'T', '悬浮触发', '#FFFFFF', 12),
      ];
      break;
    }

    case 'QRCode': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 16, alignItems: 'center',
          children: [
            rect(`${id}-qr`, '#000000', 80, 80, 0),
            {
              type: 'frame', id: `${id}-desc`, layout: 'vertical', gap: 4,
              children: [
                text(`${id}-qt`, 'T', '官方移动端二维码', '#000000E0', 13, '600'),
                text(`${id}-qs`, 'S', '扫码在移动设备体验', '#00000073', 12),
              ],
            },
          ],
        },
      ];
      break;
    }

    case 'Segmented': {
      compChildren = [
        {
          type: 'frame', id: `${id}-seg`, width: innerW, height: 36, fill: '#F5F5F5', cornerRadius: 6, padding: [4, 4], layout: 'horizontal', gap: 4,
          children: [
            rect(`${id}-a1`, '#FFFFFF', 100, 28, 4), text(`${id}-a1t`, 'T', '按日统计', '#000000E0', 12, '600'),
            rect(`${id}-a2`, '#00000000', 100, 28, 4), text(`${id}-a2t`, 'T', '按周汇总', '#00000073', 12),
            rect(`${id}-a3`, '#00000000', 100, 28, 4), text(`${id}-a3t`, 'T', '年度大盘', '#00000073', 12),
          ],
        },
      ];
      break;
    }

    case 'Statistic': {
      compChildren = [
        text(`${id}-st`, 'T', '总活跃用户数 (人)', '#00000073', 12),
        text(`${id}-sv`, 'V', '128,450', '#000000E0', 26, '700'),
        text(`${id}-sg`, 'G', '+14.2% 较上周持续增长 ↑', '#52C41A', 12, '600'),
      ];
      break;
    }

    case 'Table': {
      compChildren = [
        {
          type: 'frame', id: `${id}-tb`, width: innerW, fill: '#FFFFFF', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 6, layout: 'vertical',
          children: [
            {
              type: 'frame', id: `${id}-th`, width: innerW, height: 32, fill: '#FAFAFA', padding: [0, 10], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                text(`${id}-th1`, 'T', '姓名 (Name)', '#00000073', 11, '600', 100),
                text(`${id}-th2`, 'T', '角色 (Role)', '#00000073', 11, '600', 100),
                text(`${id}-th3`, 'T', '状态', '#00000073', 11, '600', 70),
                text(`${id}-th4`, 'T', '操作', '#00000073', 11, '600', 50),
              ],
            },
            {
              type: 'frame', id: `${id}-r1`, width: innerW, height: 34, padding: [0, 10], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between', stroke: '#F0F0F0', strokeWidth: 1,
              children: [
                text(`${id}-r11`, 'T', '张三', '#000000E0', 11, '500', 100),
                text(`${id}-r12`, 'T', '管理员', '$antd-colorPrimary', 11, 'normal', 100),
                text(`${id}-r13`, 'T', '● 正常', '#52C41A', 11, '600', 70),
                text(`${id}-r14`, 'T', '编辑', '$antd-colorPrimary', 11, 'normal', 50),
              ],
            },
            {
              type: 'frame', id: `${id}-r2`, width: innerW, height: 34, padding: [0, 10], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                text(`${id}-r21`, 'T', '李四', '#000000E0', 11, '500', 100),
                text(`${id}-r22`, 'T', '前端', '#000000A6', 11, 'normal', 100),
                text(`${id}-r23`, 'T', '○ 离线', '#8C8C8C', 11, 'normal', 70),
                text(`${id}-r24`, 'T', '编辑', '$antd-colorPrimary', 11, 'normal', 50),
              ],
            },
          ],
        },
      ];
      break;
    }

    case 'Tag': {
      compChildren = [
        {
          type: 'frame', id: `${id}-tags`, layout: 'horizontal', gap: 8, alignItems: 'center',
          children: [
            { type: 'frame', id: `${id}-t1`, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 4, padding: [2, 8], children: [text(`${id}-t1t`, 'T', '处理中', '$antd-colorPrimary', 12)] },
            { type: 'frame', id: `${id}-t2`, fill: '#F6FFED', stroke: '#B7EB8F', strokeWidth: 1, cornerRadius: 4, padding: [2, 8], children: [text(`${id}-t2t`, 'T', '已完成', '#52C41A', 12)] },
            { type: 'frame', id: `${id}-t3`, fill: '#FFF2F0', stroke: '#FFCCC7', strokeWidth: 1, cornerRadius: 4, padding: [2, 8], children: [text(`${id}-t3t`, 'T', '异常 ✕', '#FF4D4F', 12)] },
          ],
        },
      ];
      break;
    }

    case 'Timeline': {
      compChildren = [
        {
          type: 'frame', id: `${id}-time`, width: innerW, layout: 'vertical', gap: 6,
          children: [
            text(`${id}-t1`, 'T', '●  2026-09-01 创建项目需求规范', '$antd-colorPrimary', 12),
            text(`${id}-t2`, 'T', '●  2026-09-10 核心组件库研发启动', '$antd-colorPrimary', 12),
            text(`${id}-t3`, 'T', '●  2026-09-16 正式发布 v6.6.4 版本', '#52C41A', 12, '600'),
          ],
        },
      ];
      break;
    }

    case 'Tooltip': {
      compChildren = [
        {
          type: 'frame', id: `${id}-tip`, fill: '#000000E0', cornerRadius: 4, padding: [6, 12], layout: 'horizontal', alignItems: 'center',
          children: [text(`${id}-tipt`, 'T', '这是一条文字提示 (Tooltip Info)', '#FFFFFF', 12)],
        },
        rect(`${id}-btn`, '#FFFFFF', 100, 30, 4, '#D9D9D9'), text(`${id}-bt`, 'T', '鼠标悬停', '#000000E0', 12),
      ];
      break;
    }

    case 'Tour': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 6, padding: [10, 14], layout: 'vertical', gap: 6,
          children: [
            text(`${id}-tt`, 'T', '漫游引导 · 步骤 1/3', '$antd-colorPrimary', 13, '600'),
            text(`${id}-tb`, 'B', '欢迎使用全新的工作台，点击查看快捷面板。', '#000000A6', 12),
            rect(`${id}-btn`, '$antd-colorPrimary', 70, 24, 4), text(`${id}-bt`, 'T', '下一步', '#FFFFFF', 11),
          ],
        },
      ];
      break;
    }

    case 'Tree': {
      compChildren = [
        {
          type: 'frame', id: `${id}-tree`, width: innerW, layout: 'vertical', gap: 6,
          children: [
            text(`${id}-tr1`, 'T', '▾ 📁 蚂蚁集团 / 体验技术平台', '#000000E0', 13, '600'),
            text(`${id}-tr2`, 'T', '   └── ☑ 💻 Ant Design 核心组件库', '$antd-colorPrimary', 12),
            text(`${id}-tr3`, 'T', '   └── ☐ 🎨 海外体验设计规范组', '#000000A6', 12),
          ],
        },
      ];
      break;
    }

    // ==================== 6. FEEDBACK (9) ====================
    case 'Alert': {
      compChildren = [
        {
          type: 'frame', id: `${id}-al1`, width: innerW, height: 36, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 6, padding: [0, 10], layout: 'horizontal', alignItems: 'center', gap: 8,
          children: [text(`${id}-i1`, 'I', 'ℹ', '$antd-colorPrimary', 13, '700'), text(`${id}-t1`, 'T', '提示：当前组件库已升级至最新版本', '#000000E0', 12)],
        },
        {
          type: 'frame', id: `${id}-al2`, width: innerW, height: 36, fill: '#F6FFED', stroke: '#B7EB8F', strokeWidth: 1, cornerRadius: 6, padding: [0, 10], layout: 'horizontal', alignItems: 'center', gap: 8,
          children: [text(`${id}-i2`, 'I', '✓', '#52C41A', 13, '700'), text(`${id}-t2`, 'T', '成功：操作已顺利持久化保存', '#000000E0', 12)],
        },
      ];
      break;
    }

    case 'Drawer': {
      compChildren = [
        {
          type: 'frame', id: `${id}-drw`, width: 220, height: 130, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 6, padding: [10, 12], layout: 'vertical', justifyContent: 'space_between',
          children: [
            text(`${id}-dt`, 'T', '编辑抽屉 Drawer', '#000000E0', 13, '600'),
            text(`${id}-db`, 'B', '抽屉从屏幕边缘滑出，用于附加详情或长表单。', '#00000073', 11),
            rect(`${id}-ok`, '$antd-colorPrimary', 60, 24, 4), text(`${id}-okt`, 'T', '保存', '#FFFFFF', 11),
          ],
        },
      ];
      break;
    }

    case 'Modal': {
      compChildren = [
        {
          type: 'frame', id: `${id}-dlg`, width: innerW, height: 120, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 8, padding: [12, 14], layout: 'vertical', justifyContent: 'space_between',
          children: [
            {
              type: 'frame', id: `${id}-hdr`, width: innerW - 28, layout: 'horizontal', justifyContent: 'space_between',
              children: [text(`${id}-mt`, 'T', '确认保存配置？', '#000000E0', 13, '600'), text(`${id}-mx`, 'X', '✕', '#00000040', 11)],
            },
            text(`${id}-mb`, 'B', '保存后将对团队内所有人员生效，请仔细核对。', '#00000073', 11),
            {
              type: 'frame', id: `${id}-ftr`, width: innerW - 28, layout: 'horizontal', justifyContent: 'flex_end', gap: 8,
              children: [
                rect(`${id}-btn-c`, '#FFFFFF', 56, 26, 4, '#D9D9D9'), text(`${id}-bct`, 'T', '取消', '#000000E0', 11),
                rect(`${id}-btn-o`, '$antd-colorPrimary', 56, 26, 4), text(`${id}-bot`, 'T', '确定', '#FFFFFF', 11, '600'),
              ],
            },
          ],
        },
      ];
      break;
    }

    case 'Popconfirm': {
      compChildren = [
        {
          type: 'frame', id: `${id}-pop`, width: 180, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 6, padding: [8, 10], layout: 'vertical', gap: 6,
          children: [
            text(`${id}-pt`, 'T', '⚠️ 确定要删除该项吗？', '#000000E0', 12, '600'),
            {
              type: 'frame', id: `${id}-act`, layout: 'horizontal', gap: 6, justifyContent: 'flex_end',
              children: [
                rect(`${id}-del`, '$antd-colorError', 48, 22, 3), text(`${id}-delt`, 'T', '删除', '#FFFFFF', 11),
              ],
            },
          ],
        },
        rect(`${id}-btn`, '$antd-colorError', 80, 28, 4), text(`${id}-bt`, 'T', '删除记录', '#FFFFFF', 12),
      ];
      break;
    }

    case 'Progress': {
      compChildren = [
        text(`${id}-l1`, 'L', '上传进度: 68%', '#00000073', 12),
        {
          type: 'frame', id: `${id}-p1`, width: innerW, height: 8, fill: '#F5F5F5', cornerRadius: 4, layout: 'horizontal',
          children: [rect(`${id}-p1f`, '$antd-colorPrimary', 240, 8, 4)],
        },
        text(`${id}-l2`, 'L', '成功状态: 100%', '#52C41A', 12, '600'),
        {
          type: 'frame', id: `${id}-p2`, width: innerW, height: 8, fill: '#F5F5F5', cornerRadius: 4, layout: 'horizontal',
          children: [rect(`${id}-p2f`, '#52C41A', innerW, 8, 4)],
        },
      ];
      break;
    }

    case 'Result': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 6,
          children: [
            { type: 'frame', id: `${id}-ico`, width: 44, height: 44, fill: '#F6FFED', stroke: '#B7EB8F', strokeWidth: 1, cornerRadius: 22, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-it`, 'I', '✓', '#52C41A', 22, '700')] },
            text(`${id}-rt`, 'T', '操作执行成功', '#000000E0', 14, '600'),
            text(`${id}-rs`, 'S', '项目配置已顺利写入，可返回继续操作。', '#00000073', 11),
          ],
        },
      ];
      break;
    }

    case 'Skeleton': {
      compChildren = [
        {
          type: 'frame', id: `${id}-row`, width: innerW, layout: 'horizontal', gap: 12, alignItems: 'center',
          children: [
            rect(`${id}-sk-av`, '#F0F0F0', 40, 40, 20),
            {
              type: 'frame', id: `${id}-sk-lines`, width: innerW - 60, layout: 'vertical', gap: 8,
              children: [
                rect(`${id}-sk1`, '#F0F0F0', 200, 14, 4),
                rect(`${id}-sk2`, '#F0F0F0', innerW - 60, 12, 4),
              ],
            },
          ],
        },
      ];
      break;
    }

    case 'Spin': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 8,
          children: [
            text(`${id}-sp`, 'S', '◌', '$antd-colorPrimary', 32),
            text(`${id}-spt`, 'T', '数据加载中...', '$antd-colorPrimary', 12),
          ],
        },
      ];
      break;
    }

    case 'Watermark': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 110, fill: '#FAFAFA', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 6, padding: [12, 14], layout: 'vertical', justifyContent: 'space_between',
          children: [
            text(`${id}-wm1`, 'W', 'Ant Design 6.6.4   机密文档   Ant Design 6.6.4', '#00000018', 13, '600'),
            text(`${id}-txt`, 'T', '受水印保护的企业级文档核心内容正文', '#000000A6', 12),
            text(`${id}-wm2`, 'W', 'Ant Design 6.6.4   机密文档   Ant Design 6.6.4', '#00000018', 13, '600'),
          ],
        },
      ];
      break;
    }

    // ==================== 7. OTHER (5) ====================
    case 'Affix': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'Affix 固钉 (滚动时固定在视口顶部/底部)', '#00000073', 12),
        rect(`${id}-btn`, '$antd-colorPrimary', 120, 32, 6), text(`${id}-bt`, 'T', '📌 固定在顶部', '#FFFFFF', 12, '500'),
      ];
      break;
    }

    case 'App': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, fill: '#FFFFFF', stroke: '$antd-colorPrimary', strokeWidth: 1, cornerRadius: 6, padding: [10, 12], layout: 'vertical', gap: 6,
          children: [
            text(`${id}-at`, 'T', 'App 上下文包裹组件', '$antd-colorPrimary', 13, '600'),
            text(`${id}-ab`, 'B', '统一提供 message、notification、modal 实例与全局消费', '#00000073', 12),
          ],
        },
      ];
      break;
    }

    case 'BackTop': {
      compChildren = [
        text(`${id}-lbl`, 'L', 'BackTop 回到顶部', '#00000073', 12),
        { type: 'frame', id: `${id}-btn`, width: 44, height: 44, fill: '$antd-colorPrimary', cornerRadius: 22, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [text(`${id}-bt`, 'T', '↑', '#FFFFFF', 20, '700')] },
      ];
      break;
    }

    case 'BorderBeam': {
      compChildren = [
        {
          type: 'frame', id: `${id}-box`, width: innerW, height: 90, stroke: '$antd-colorPrimary', strokeWidth: 2, cornerRadius: 8, fill: '#FFFFFF', layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 4,
          children: [
            text(`${id}-bt`, 'T', 'BorderBeam 发光流光边框', '$antd-colorPrimary', 13, '600'),
            text(`${id}-bs`, 'S', '沿容器边框流转的动效光束', '#00000073', 11),
          ],
        },
      ];
      break;
    }

    default: {
      compChildren = [
        text(`${id}-def-t`, 'T', `${compName} · ${cnName}`, '$antd-colorPrimary', 14, '600'),
        text(`${id}-def-d`, 'D', `Ant Design 6.6.4 官方组件 (${cat} 类目)`, '#00000073', 12),
        rect(`${id}-def-box`, '#FAFAFA', innerW, 60, 6, '#F0F0F0'),
      ];
      break;
    }
  }

  // Component Card Outer Frame - exactly one canonical origin per component
  return {
    type: 'frame',
    id,
    name: `Antd/${cat}/${compName}`,
    reusable: true,
    x: cardX,
    y: cardY,
    width: cardWidth,
    height: cardHeight,
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#E8E8E8',
    strokeWidth: 1,
    padding: [14, 18],
    layout: 'vertical',
    gap: 10,
    clip: true,
    metadata: {
      type: 'antd-component',
      antd: { component: compName, category: cat, version: '6.6.4', props: {}, tokens: {} },
    },
    children: [
      // Component Label Header
      {
        type: 'frame', id: `${id}-header-bar`, width: innerW, height: 26, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center',
        children: [
          text(`${id}-header-title`, 'Title', `${compName} · ${cnName}`, '#000000E0', 14, '600'),
          {
            type: 'frame', id: `${id}-header-tag`, fill: '#F0F5FF', cornerRadius: 4, padding: [2, 6],
            children: [text(`${id}-header-tag-text`, 'Tag', cat, '$antd-colorPrimary', 11, '500')],
          },
        ],
      },
      rect(`${id}-header-line`, '#F0F0F0', innerW, 1, 0),
      // Component Real Visual Node
      {
        type: 'frame', id: `${id}-visual-container`, width: innerW, height: compHeight, layout: compLayout, gap: compGap, alignItems: compAlign, justifyContent: compJustify,
        children: compChildren,
      },
    ],
  };
}
