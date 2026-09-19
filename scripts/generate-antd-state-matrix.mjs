import { mkdir, writeFile } from 'node:fs/promises';
import {groups as layoutGroups} from './layout/catalog.mjs';

const groups = {
  General: ['Button', 'FloatButton', 'Typography'],
  Layout: ['Divider', 'Flex', 'Grid', 'Layout', 'Masonry', 'Space', 'Splitter'],
  Navigation: ['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'],
  'Data Entry': ['AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form', 'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload'],
  'Data Display': ['Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions', 'Empty', 'Image', 'List', 'Listy', 'Popover', 'QRCode', 'Segmented', 'Statistic', 'Table', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree'],
  Feedback: ['Alert', 'Drawer', 'Message', 'Modal', 'Notification', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'],
  Other: ['Affix', 'App', 'BackTop', 'BorderBeam'],
};

const common = ['default', 'disabled', 'focus'];
const stateOverrides = {
  Listy: ['default', 'virtual', 'grouped'],
  Alert: ['success', 'warning', 'error', 'info'],
  Button: ['primary', 'default', 'dashed', 'text', 'link', 'loading', 'disabled', 'danger'],
  Checkbox: ['checked', 'unchecked', 'indeterminate', 'disabled'],
  Collapse: ['collapsed', 'expanded'],
  DatePicker: ['default', 'open', 'disabled', 'error'],
  Drawer: ['closed', 'open'],
  Dropdown: ['closed', 'open'],
  Empty: ['default', 'custom-description'],
  Form: ['default', 'required-error', 'disabled', 'success'],
  Input: ['default', 'focus', 'filled', 'disabled', 'error'],
  InputNumber: ['default', 'hover-controls', 'disabled', 'error'],
  Modal: ['closed', 'open'],
  Popconfirm: ['closed', 'open'],
  Progress: ['normal', 'success', 'exception', 'active'],
  Radio: ['checked', 'unchecked', 'disabled'],
  Rate: ['default', 'half', 'disabled'],
  Select: ['default', 'open', 'multiple', 'disabled', 'error'],
  Skeleton: ['loading', 'loaded'],
  Slider: ['default', 'disabled'],
  Spin: ['spinning', 'loaded'],
  Switch: ['checked', 'unchecked', 'disabled', 'loading'],
  Table: ['default', 'loading', 'empty', 'error', 'selected-row', 'pagination'],
  Tabs: ['default', 'active-tab', 'disabled-tab'],
  Tooltip: ['closed', 'open'],
  Tour: ['closed', 'open'],
  Transfer: ['default', 'selected', 'disabled'],
  Tree: ['default', 'expanded', 'checked', 'disabled'],
  TreeSelect: ['default', 'open', 'multiple', 'disabled', 'error'],
  Upload: ['empty', 'uploading', 'done', 'error', 'disabled'],
};

const components = Object.entries(groups).flatMap(([category, names]) => names.map((name) => category === 'Layout' ? {name, category, states: layoutGroups[name].matrix.flatMap(([group, demos]) => demos.map(d => group + ': ' + (d.label || d.component))), source: 'scripts/layout/catalog.mjs', verification: 'pnpm verify:layout', canvasStates: layoutGroups[name].matrix.flatMap(([, demos]) => demos)} : ({
  name,
  category,
  states: stateOverrides[name] ?? common,
  source: `http://127.0.0.1:4318/?component=${encodeURIComponent(name)}&state=${encodeURIComponent((stateOverrides[name] ?? common)[0])}`,
  stateUrls: (stateOverrides[name] ?? common).map((state) => `http://127.0.0.1:4318/?component=${encodeURIComponent(name)}&state=${encodeURIComponent(state)}`),
  selector: `#sample-${name}`,
})));
await mkdir(new URL('../registry/', import.meta.url), { recursive: true });
await writeFile(new URL('../registry/state-matrix.antd-6.6.4.json', import.meta.url), `${JSON.stringify({
  library: 'antd',
  version: '6.6.4',
  purpose: 'browser-rendered state coverage for Pen import and visual regression',
  workflow: ['render-real-antd', 'import-to-pen', 'screenshot', 'compare', 'fix-source-or-import-rule'],
  components,
}, null, 2)}\n`);
console.log(`generated state matrix for ${components.length} components`);
