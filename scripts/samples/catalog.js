/* Real Ant Design renders; the browser import is the source of editable Pen layers. */
const h = React.createElement;
const A = antd;
const { useEffect, useState } = React;
const categories = {
  General: ['Button', 'FloatButton', 'Icon', 'Typography'],
  Layout: ['Divider', 'Flex', 'Grid', 'Layout', 'Masonry', 'Space', 'Splitter', 'Row', 'Col'],
  Navigation: ['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'],
  'Data Entry': ['AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form', 'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload'],
  'Data Display': ['Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions', 'Empty', 'Image', 'List', 'Listy', 'Popover', 'QRCode', 'Segmented', 'Statistic', 'Table', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree'],
  Feedback: ['Alert', 'Drawer', 'Message', 'Modal', 'Notification', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'],
  Other: ['Affix', 'App', 'BackTop', 'BorderBeam'],
};
const treeData = [{ title: '产品研发', key: '0', value: '0', children: [{ title: '设计团队', key: '0-0', value: '0-0' }, { title: '开发团队', key: '0-1', value: '0-1' }] }];
const options = [{ label: '设计', value: 'design' }, { label: '研发', value: 'dev' }, { label: '产品', value: 'pm' }];
const menuItems = [{ key: '1', label: '项目概览' }, { key: '2', label: '团队成员' }, { key: '3', label: '项目设置' }];
const button = (label, props = {}) => h(A.Button, props, label);
const space = (...children) => h(A.Space, null, ...children);
const paragraph = (content) => h(A.Typography.Paragraph, { style: { marginBottom: 0 } }, content);
const block = (label, height = 48, color = '#1677ff') => h('div', { style: { height, background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, label);
const popup = (name) => () => document.getElementById('sample-' + name);
const portalStyle = { position: 'absolute' };
const hasState = (state, ...values) => values.includes(state);
const stateProps = (name, state) => {
  const disabled = state === 'disabled';
  if (name === 'Button') return { type: state === 'danger' || state === 'loading' || state === 'default' ? 'primary' : state === 'text' ? 'text' : 'primary', danger: state === 'danger', loading: state === 'loading', disabled };
  if (['Input', 'Select', 'DatePicker', 'TreeSelect', 'Cascader', 'InputNumber'].includes(name)) return { disabled, status: state === 'error' ? 'error' : undefined, open: state === 'open' };
  if (name === 'Checkbox' || name === 'Radio') return { disabled };
  if (name === 'Switch') return { disabled, loading: state === 'loading', defaultChecked: state === 'checked' || state === 'loading' };
  if (name === 'Table') return { loading: state === 'loading', dataSource: state === 'empty' ? [] : undefined };
  if (name === 'Modal' || name === 'Drawer' || name === 'Dropdown' || name === 'Popconfirm' || name === 'Popover' || name === 'Tooltip' || name === 'Tour') return { open: state === 'open' };
  return {};
};
function MessageSample() {
  const [api, holder] = A.message.useMessage({ getContainer: popup('Message'), top: 16 });
  useEffect(() => { api.success({ key: 'sample', content: '保存成功', duration: 0 }); }, []);
  return h('div', { style: { height: 60 } }, holder);
}
function NotificationSample() {
  const [api, holder] = A.notification.useNotification({ getContainer: popup('Notification'), stack: false, top: 0, placement: 'top' });
  useEffect(() => { api.success({ key: 'sample', title: '操作成功', description: '项目配置已保存，可以继续编辑。', duration: 0, style: { width: 344 } }); }, []);
  return h('div', { style: { height: 120 } }, holder);
}
function Samples({ name, state = 'default' }) {
  switch (name) {
    case 'Button': return space(button('主要按钮', stateProps(name, state)), button('默认按钮', { disabled: state === 'disabled' }), button('文本按钮', { type: 'text' }));
    case 'FloatButton': return h(A.FloatButton, { style: { position: 'relative', inset: 'auto' } });
    case 'Icon': return space(h(A.Button, { shape: 'circle', loading: true }), h(A.Input.Search, { placeholder: '搜索', style: { width: 220 } }));
    case 'Typography': return h('div', null, h(A.Typography.Title, { level: 3 }, '标题文本'), paragraph('Ant Design 为企业级产品提供一致、清晰的界面语言。'), h(A.Typography.Link, null, '了解更多'));
    case 'Divider': return h('div', null, paragraph('上方内容'), h(A.Divider, null, '分割线'), paragraph('下方内容'));
    case 'Flex': return h(A.Flex, { gap: 8, justify: 'space-between' }, ...['起始', '居中', '末尾'].map(t => button(t)));
    case 'Grid': return h('div', null, h(A.Row, { gutter: [8, 8] }, ...[8, 8, 8].map((n, i) => h(A.Col, { span: n, key: i }, block('col-8', 48)))), h(A.Row, { gutter: 8, style: { marginTop: 8 } }, h(A.Col, { span: 6 }, block('col-6', 48, '#4096ff')), h(A.Col, { span: 18 }, block('col-18', 48, '#4096ff'))));
    case 'Row': return h(A.Row, { gutter: 16 }, h(A.Col, { span: 12 }, block('col-12')), h(A.Col, { span: 12 }, block('col-12', 48, '#4096ff')));
    case 'Col': return h(A.Row, { gutter: 8 }, h(A.Col, { span: 8 }, block('col-8')), h(A.Col, { span: 16 }, block('col-16', 48, '#4096ff')));
    case 'Layout': return h(A.Layout, null, h(A.Layout.Header, { style: { color: 'white', height: 48, lineHeight: '48px', padding: '0 16px' } }, 'Header'), h(A.Layout, null, h(A.Layout.Sider, { width: 88, style: { color: 'white', padding: 16 } }, 'Sider'), h(A.Layout.Content, { style: { padding: 24, height: 112 } }, 'Content')), h(A.Layout.Footer, { style: { textAlign: 'center', padding: 12 } }, 'Footer'));
    case 'Masonry': return h(A.Masonry, { columns: 3, gutter: 8, items: [72, 112, 88, 64, 56, 88].map((height, i) => ({ key: String(i), data: height })), itemRender: ({ data, index }) => block(String(index + 1), data, index % 2 ? '#4096ff' : '#1677ff') });
    case 'Space': return space(button('按钮'), h(A.Tag, { color: 'blue' }, '标签'), h(A.Switch, { defaultChecked: true }));
    case 'Splitter': return h(A.Splitter, { style: { height: 144, border: '1px solid #f0f0f0' } }, h(A.Splitter.Panel, { defaultSize: '40%' }, block('面板一', 144, '#f0f5ff')), h(A.Splitter.Panel, null, h('div', { style: { padding: 24 } }, '面板二')));
    case 'Anchor': return h(A.Anchor, { affix: false, items: [{ key: '1', href: '#intro', title: '概览' }, { key: '2', href: '#usage', title: '使用方式', children: [{ key: '3', href: '#api', title: 'API 参考' }] }] });
    case 'Breadcrumb': return h(A.Breadcrumb, { items: [{ title: '首页' }, { title: '项目管理' }, { title: '项目详情' }] });
    case 'Dropdown': return h('div', { style: { height: 164 } }, h(A.Dropdown.Button, { open: true, getPopupContainer: popup(name), menu: { items: menuItems }, placement: 'bottomLeft' }, '操作菜单'));
    case 'Menu': return h(A.Menu, { mode: 'inline', selectedKeys: ['1'], items: menuItems, style: { width: 224 } });
    case 'Pagination': return h(A.Pagination, { defaultCurrent: 2, total: 50, showSizeChanger: false });
    case 'Steps': return h(A.Steps, { current: 1, items: [{ title: '已完成' }, { title: '进行中' }, { title: '待处理' }] });
    case 'Tabs': return h(A.Tabs, { defaultActiveKey: '1', items: [{ key: '1', label: '概览', children: paragraph('项目概览内容') }, { key: '2', label: '详情' }, { key: '3', label: '设置' }] });
    case 'AutoComplete': return h(A.AutoComplete, { style: { width: 280 }, options, placeholder: '输入或选择内容' });
    case 'Cascader': return h(A.Cascader, { style: { width: 280 }, placeholder: '请选择地区', options: [{ value: 'zj', label: '浙江', children: [{ value: 'hz', label: '杭州' }] }] });
    case 'Checkbox': return h(A.Checkbox.Group, { options: ['设计', '研发', '产品'], defaultValue: state === 'unchecked' ? [] : ['设计'], disabled: state === 'disabled' });
    case 'ColorPicker': return h(A.ColorPicker, { defaultValue: '#1677ff', showText: true });
    case 'DatePicker': return h(A.DatePicker, { placeholder: '请选择日期', style: { width: 280 }, ...stateProps(name, state) });
    case 'Form': return h(A.Form, { layout: 'vertical', style: { width: 320 } }, h(A.Form.Item, { label: '用户名', required: true }, h(A.Input, { placeholder: '请输入用户名' })), h(A.Form.Item, { label: '密码', required: true }, h(A.Input.Password, { placeholder: '请输入密码' })), h(A.Form.Item, null, button('提交', { type: 'primary' })));
    case 'Input': return h(A.Input, { placeholder: '请输入内容', allowClear: true, style: { width: 280 }, ...stateProps(name, state) });
    case 'InputNumber': return h('div', { style: { position: 'relative', width: 160 } }, h(A.InputNumber, { min: 1, max: 10, defaultValue: 3, controls: true, style: { width: 160 }, ...stateProps(name, state) }), h('div', { style: { position: 'absolute', right: 8, top: 5, width: 12, height: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', color: '#00000073', fontSize: 9, lineHeight: '9px', pointerEvents: 'none' } }, h('span', { 'aria-hidden': true }, '⌃'), h('span', { 'aria-hidden': true }, '⌄')));
    case 'Mentions': return h(A.Mentions, { style: { width: 280 }, defaultValue: '@张三 ', options: [{ value: '张三', label: '张三' }, { value: '李四', label: '李四' }] });
    case 'Radio': return h(A.Radio.Group, { options: ['设计', '研发', '产品'], defaultValue: state === 'unchecked' ? undefined : '设计', disabled: state === 'disabled' });
    case 'Rate': return h(A.Rate, { defaultValue: 3 });
    case 'Select': return h(A.Select, { options, defaultValue: 'design', style: { width: 280 }, ...stateProps(name, state) });
    case 'Slider': return h(A.Slider, { defaultValue: 40, style: { width: 280 } });
    case 'Switch': return space(h(A.Switch, stateProps(name, state)), h(A.Switch, null), h(A.Switch, { defaultChecked: true, disabled: true }));
    case 'TimePicker': return h(A.TimePicker, { placeholder: '请选择时间', style: { width: 200 } });
    case 'Transfer': return h(A.Transfer, { dataSource: ['张三', '李四', '王五', '赵六'].map((title, i) => ({ key: String(i), title })), targetKeys: ['2'], render: item => item.title, titles: ['待选项', '已选项'], styles: { section: { width: 160, height: 220 } } });
    case 'TreeSelect': return h(A.TreeSelect, { treeData, placeholder: '请选择团队', style: { width: 280 } });
    case 'Upload': return h(A.Upload, { beforeUpload: () => false, defaultFileList: [{ uid: '1', name: '项目说明.pdf', status: 'done' }] }, button('上传文件'));
    case 'Avatar': return space(h(A.Avatar, { size: 48 }, '张'), h(A.Avatar, { size: 40, style: { backgroundColor: '#1677ff' } }, 'A'), h(A.Avatar, { shape: 'square' }, 'U'));
    case 'Badge': return space(h(A.Badge, { count: 5 }, h(A.Avatar, { shape: 'square', size: 48 }, 'A')), h(A.Badge, { status: 'success', text: '运行正常' }));
    case 'Calendar': return h(A.Calendar, { fullscreen: false, value: dayjs('2026-09-16') });
    case 'Card': return h(A.Card, { title: '项目概览', extra: h(A.Typography.Link, null, '更多') }, paragraph('项目名称：团队协作平台'), paragraph('负责人：张三'), paragraph('更新时间：2026-09-16'));
    case 'Carousel': return h(A.Carousel, { autoplay: false }, ...['第一张', '第二张', '第三张'].map(label => h('div', { key: label }, block(label, 144, '#364d79'))));
    case 'Collapse': return h(A.Collapse, { defaultActiveKey: ['1'], items: [{ key: '1', label: '项目说明', children: paragraph('团队成员可以在这里查看项目的详细说明。') }, { key: '2', label: '更多设置', children: paragraph('设置内容') }] });
    case 'Descriptions': return h(A.Descriptions, { title: '用户信息', bordered: true, column: 1, size: 'small', items: [{ key: '1', label: '姓名', children: '张三' }, { key: '2', label: '状态', children: h(A.Badge, { status: 'success', text: '正常' }) }, { key: '3', label: '部门', children: '产品研发部' }] });
    case 'Empty': return h(A.Empty, { description: '暂无数据' });
    case 'Image': return h(A.Image, { width: 240, height: 144, src: 'invalid-local-image', fallback: A.Image.PRESENTED_IMAGE_SIMPLE });
    case 'Listy': return h(A.Listy, {
      items: Array.from({ length: state === 'virtual' ? 100 : 6 }, (_, index) => ({ id: index, title: '成员 ' + (index + 1), team: index < 3 ? '设计团队' : '研发团队' })),
      rowKey: 'id',
      height: 200,
      virtual: state === 'virtual',
      itemRender: item => h('div', { style: { padding: 12 } }, item.title),
      ...(state === 'grouped' ? { group: { key: item => item.team, title: team => team }, sticky: true } : {}),
    });
    case 'List': return h(A.List, { header: '团队成员', bordered: true, dataSource: ['张三 · 产品设计', '李四 · 前端研发', '王五 · 质量保障'], renderItem: item => h(A.List.Item, null, item) });
    case 'Popover': return h('div', { style: { height: 132, paddingTop: 80, paddingLeft: 96 } }, h(A.Popover, { open: true, title: '提示标题', content: '这里是补充说明内容。', getPopupContainer: popup(name), placement: 'top' }, button('查看说明')));
    case 'QRCode': return h(A.QRCode, { type: 'svg', value: 'https://ant.design/', size: 176 });
    case 'Segmented': return h(A.Segmented, { options: ['每日', '每周', '每月'], defaultValue: '每周' });
    case 'Statistic': return h(A.Statistic, { title: '总用户数', value: 12345, suffix: '人' });
    case 'Table': return h(A.Table, { size: 'small', pagination: false, columns: [{ title: '姓名', dataIndex: 'name' }, { title: '状态', dataIndex: 'status', render: value => h(A.Tag, { color: 'green' }, value) }, { title: '操作', render: () => h(A.Typography.Link, null, '编辑') }], dataSource: state === 'empty' ? [] : [{ key: '1', name: '张三', status: '启用' }, { key: '2', name: '李四', status: '启用' }, { key: '3', name: '王五', status: '启用' }], loading: state === 'loading' });
    case 'Tag': return space(h(A.Tag, { color: 'blue' }, '处理中'), h(A.Tag, { color: 'success' }, '已完成'), h(A.Tag, { closable: true }, '可关闭'));
    case 'Timeline': return h(A.Timeline, { items: [{ content: '创建项目 · 09:00' }, { content: '开始开发 · 10:00' }, { color: 'green', content: '部署完成 · 12:00' }] });
    case 'Tooltip': return h('div', { style: { height: 92, paddingTop: 44, paddingLeft: 96 } }, h(A.Tooltip, { open: true, title: '提示说明文字', getPopupContainer: popup(name) }, button('悬停提示')));
    case 'Tour': return h('div', { style: { height: 220 } }, h(A.Tour, { open: true, mask: false, getPopupContainer: popup(name), steps: [{ title: '欢迎使用', description: '按步骤了解项目工作区的核心功能。', target: null }], styles: { root: { position: 'absolute', top: 16, left: 0, width: 352, transform: 'none' } } }));
    case 'Tree': return h(A.Tree, { treeData, defaultExpandAll: true, checkable: true, defaultCheckedKeys: ['0-0'] });
    case 'Alert': return h(A.Alert, { title: '操作成功', description: '项目配置已保存。', type: 'success', showIcon: true, closable: true });
    case 'Drawer': return h('div', { style: { height: 256 } }, h(A.Drawer, { title: '编辑资料', open: true, getContainer: false, mask: false, size: 320, rootStyle: portalStyle, footer: space(button('取消'), button('保存', { type: 'primary' })) }, paragraph('姓名'), h(A.Input, { defaultValue: '张三' })));
    case 'Message': return h(MessageSample);
    case 'Modal': return h('div', { style: { height: 220 } }, h(A.Modal, { title: '确认操作', open: true, getContainer: false, mask: false, width: 352, style: { top: 0, paddingBottom: 0 }, styles: { wrapper: portalStyle }, okText: '确定', cancelText: '取消' }, paragraph('确认保存当前项目配置吗？')));
    case 'Notification': return h(NotificationSample);
    case 'Popconfirm': return h('div', { style: { height: 172, paddingTop: 120, paddingLeft: 104 } }, h(A.Popconfirm, { open: true, title: '删除项目', description: '确定要删除这个项目吗？', okText: '删除', cancelText: '取消', okButtonProps: { danger: true }, getPopupContainer: popup(name) }, button('删除', { danger: true })));
    case 'Progress': return h('div', null, h(A.Progress, { percent: 66 }), h(A.Progress, { percent: 100, status: 'success' }), h(A.Progress, { type: 'circle', percent: 75, size: 80 }));
    case 'Result': return h(A.Result, { status: 'success', title: '提交成功', subTitle: '项目配置已保存，请继续下一步。', extra: button('返回项目', { type: 'primary' }) });
    case 'Skeleton': return h(A.Skeleton, { avatar: true, active: false, paragraph: { rows: 3 } });
    case 'Spin': return h('div', { style: { padding: 32, textAlign: 'center' } }, h(A.Spin, { size: 'large' }));
    case 'Watermark': return h(A.Watermark, { content: 'Ant Design', height: 48, width: 100, gap: [24, 24] }, h('div', { style: { height: 176, padding: 16 } }, paragraph('包含水印的文档内容')));
    case 'Affix': return h(A.Affix, { offsetTop: 0 }, button('固定在顶部', { type: 'primary' }));
    case 'App': return h(A.App, null, h(A.Alert, { title: '应用上下文中的内容', type: 'info', showIcon: true }), h('div', { style: { marginTop: 12 } }, button('应用操作', { type: 'primary' })));
    case 'BackTop': return h(A.FloatButton.BackTop, { visibilityHeight: 0, style: { position: 'relative', inset: 'auto' } });
    case 'BorderBeam': return h(A.BorderBeam, null, h(A.Card, { style: { width: 320 } }, paragraph('边框流光效果')));
    default: throw new Error('Missing real component sample: ' + name);
  }
}
class Boundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error: String(error) }; }
  render() { return this.state.error ? h('pre', { 'data-render-error': true }, this.state.error) : this.props.children; }
}
const params = new URLSearchParams(location.search);
const selected = params.get('component');
const state = params.get('state') || 'default';
const category = params.get('group');
const entries = Object.entries(categories).flatMap(([group, names]) => names.map(name => ({ group, name }))).filter(x => (!selected || x.name === selected) && (!category || x.group === category));
ReactDOM.createRoot(document.getElementById('root')).render(h(A.ConfigProvider, { theme: { token: { motion: false } } }, h('main', { className: selected ? 'catalog standalone' : 'catalog' }, ...entries.map(({ group, name }) => h('section', { className: 'sample', key: name }, h('h2', null, group + ' / ' + name + (state === 'default' ? '' : ' · ' + state)), h('div', { className: 'sample-body', id: 'sample-' + name, 'data-component': name, 'data-category': group, 'data-state': state }, h(Boundary, null, h(Samples, { name, state }))))))));
