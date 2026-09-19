import { mkdir, writeFile } from 'node:fs/promises';

const node = (type, id, name, extra = {}) => ({ type, id, name, ...extra });
const text = (id, name, content, fill = '$antd-colorText', fontSize = 14, fontWeight) => node('text', id, name, { content, fill, fontFamily: 'Inter', fontSize, ...(fontWeight ? { fontWeight } : {}) });
const component = (id, name, props, children = [], extra = {}) => node('frame', id, `Antd/${name}`, {
  reusable: false,
  metadata: { type: 'antd-component', antd: { component: name, version: '6.6.4', props, tokens: {} } },
  layout: 'horizontal',
  alignItems: 'center',
  ...extra,
  children,
});

const screen = node('frame', 'user-management-screen', 'Screen · 用户管理', {
  width: 1440,
  height: 900,
  fill: '$antd-colorBgLayout',
  layout: 'vertical',
  gap: 24,
  padding: 32,
  children: [
    node('frame', 'page-header', '页面标题', {
      width: 'fill_container', height: 40, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center',
      children: [text('page-title', 'Title', '用户管理', '$antd-colorText', 24, '600'), component('add-user', 'Button', { type: 'primary' }, [text('add-user-label', 'Label', '新增用户', '#FFFFFF')], { width: 104, height: 40, fill: '$antd-colorPrimary', cornerRadius: '$antd-borderRadius', justifyContent: 'center' })],
    }),
    node('frame', 'filter-card', '筛选表单', {
      width: 'fill_container', height: 96, fill: '$antd-colorBgContainer', cornerRadius: '$antd-borderRadiusLG', padding: 20, gap: 12,
      children: [component('user-name-input', 'Input', { placeholder: '请输入姓名', allowClear: true }, [text('user-name-placeholder', 'Placeholder', '姓名')], { width: 220, height: 32, fill: '$antd-colorBgContainer', stroke: '$antd-colorBorder', strokeWidth: 1, padding: [0, 12], cornerRadius: '$antd-borderRadius' }), component('user-status-select', 'Select', { placeholder: '请选择状态', options: [{ label: '启用', value: 'active' }, { label: '停用', value: 'inactive' }] }, [text('user-status-placeholder', 'Placeholder', '状态', '$antd-colorTextPlaceholder')], { width: 220, height: 32, fill: '$antd-colorBgContainer', stroke: '$antd-colorBorder', strokeWidth: 1, padding: [0, 12], cornerRadius: '$antd-borderRadius' }), component('search-button', 'Button', { type: 'primary' }, [text('search-label', 'Label', '查询', '#FFFFFF')], { width: 72, height: 32, fill: '$antd-colorPrimary', cornerRadius: '$antd-borderRadius', justifyContent: 'center' })],
    }),
    node('frame', 'table-card', '用户表格', {
      width: 'fill_container', height: 460, fill: '$antd-colorBgContainer', cornerRadius: '$antd-borderRadiusLG', layout: 'vertical',
      children: [component('user-table', 'Table', { rowKey: 'id', columns: [{ title: '姓名', dataIndex: 'name' }, { title: '邮箱', dataIndex: 'email' }, { title: '状态', dataIndex: 'status' }, { title: '操作', key: 'actions' }], dataSource: [{ id: 1, name: 'Ana López', email: 'ana@example.com', status: '启用' }, { id: 2, name: 'Wei Chen', email: 'wei@example.com', status: '启用' }], pagination: false }, [text('table-content', 'Rows', 'Ana López     ana@example.com     启用     编辑', '$antd-colorTextSecondary')], { width: 'fill_container', height: 360, fill: '$antd-colorBgContainer', padding: 20, layout: 'vertical', alignItems: 'start' }), component('table-pagination', 'Pagination', { current: 1, pageSize: 10, total: 42, showSizeChanger: true }, [text('pagination-label', 'Label', '1  2  3  …  下一页', '$antd-colorTextSecondary')], { width: 'fill_container', height: 48, justifyContent: 'end', padding: [0, 20] })],
    }),
    node('frame', 'state-notes', 'State coverage', {
      width: 'fill_container', height: 120, layout: 'horizontal', gap: 16,
      children: [text('state-default', 'State · default', '默认：展示用户列表', '$antd-colorTextSecondary'), text('state-loading', 'State · loading', '加载：Table.loading=true', '$antd-colorTextSecondary'), text('state-empty', 'State · empty', '空数据：Empty', '$antd-colorTextSecondary'), text('state-error', 'State · error', '错误：Alert type=error', '$antd-colorError')],
    }),
    component('create-user-modal', 'Modal', { open: false, title: '新增用户', destroyOnHidden: true }, [text('modal-content', 'Slot · children', '姓名、邮箱和角色表单', '$antd-colorTextSecondary')], { width: 480, height: 220, fill: '$antd-colorBgContainer', cornerRadius: '$antd-borderRadiusLG', layout: 'vertical', padding: 24, alignItems: 'start', metadata: { type: 'antd-component', antd: { component: 'Modal', version: '6.6.4', props: { open: false, title: '新增用户', destroyOnHidden: true }, state: 'closed', tokens: {} } } }),
  ],
});

const document = {
  version: '2.17',
  themes: { mode: ['light', 'dark'], density: ['regular', 'compact'] },
  children: [screen],
  variables: {
    'antd-colorPrimary': { type: 'color', value: '#1677FF' },
    'antd-colorText': { type: 'color', value: 'rgba(0,0,0,0.88)' },
    'antd-colorTextSecondary': { type: 'color', value: 'rgba(0,0,0,0.65)' },
    'antd-colorTextPlaceholder': { type: 'color', value: 'rgba(0,0,0,0.25)' },
    'antd-colorError': { type: 'color', value: '#FF4D4F' },
    'antd-colorBgLayout': { type: 'color', value: '#F5F5F5' },
    'antd-colorBgContainer': { type: 'color', value: '#FFFFFF' },
    'antd-colorBorder': { type: 'color', value: '#D9D9D9' },
    'antd-borderRadius': { type: 'number', value: 6 },
    'antd-borderRadiusLG': { type: 'number', value: 8 },
  },
  fileToken: 'antd-6-user-management-example-20260915',
};

await mkdir(new URL('../examples/', import.meta.url), { recursive: true });
await writeFile(new URL('../examples/user-management.pen', import.meta.url), `${JSON.stringify(document, null, 2)}\n`);
console.log('generated user-management.pen');
