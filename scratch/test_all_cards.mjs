
import fs from 'fs';
const menuSrc = fs.readFileSync('canvas-components/Menu.js', 'utf8');
const menuFn = new Function('pencil', menuSrc);

// Card 2
const items2 = [
  { key: '1', icon: 'PieChartOutlined', label: 'Option 1' },
  { key: '2', icon: 'DesktopOutlined', label: 'Option 2' },
  { key: '3', icon: 'ContainerOutlined', label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: 'MailOutlined',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' }
    ]
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: 'AppstoreOutlined',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' }
        ]
      }
    ]
  }
];

const nodes2 = menuFn({
  input: {
    items: JSON.stringify(items2),
    selectedKeys: JSON.stringify(['1']),
    openKeys: JSON.stringify(['sub1']),
    mode: 'inline',
    theme: 'dark',
    inlineCollapsed: false
  },
  width: 256,
  height: 400
});
let max2 = 0;
for (const n of nodes2) max2 = Math.max(max2, (n.y||0)+(n.height||0));
console.log('Card 2/3 menu rendered bottom:', max2);

// Card 4
const items4 = [
  {
    key: '1',
    icon: 'MailOutlined',
    label: 'Navigation One',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' }
    ]
  },
  {
    key: '2',
    icon: 'AppstoreOutlined',
    label: 'Navigation Two',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' }
        ]
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' }
        ]
      }
    ]
  },
  {
    key: '3',
    icon: 'SettingOutlined',
    label: 'Navigation Three',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
      { key: '33', label: 'Option 3' },
      { key: '34', label: 'Option 4' }
    ]
  }
];
const nodes4 = menuFn({
  input: {
    items: JSON.stringify(items4),
    selectedKeys: JSON.stringify(['231']),
    openKeys: JSON.stringify(['2', '23']),
    mode: 'inline',
    theme: 'light',
    inlineCollapsed: false
  },
  width: 256,
  height: 400
});
let max4 = 0;
for (const n of nodes4) max4 = Math.max(max4, (n.y||0)+(n.height||0));
console.log('Card 4 menu rendered bottom:', max4);

// Card 6
const items6 = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: 'MailOutlined',
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' }
    ]
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: 'AppstoreOutlined',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' }
        ]
      }
    ]
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: 'SettingOutlined',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' }
    ]
  }
];
const nodes6 = menuFn({
  input: {
    items: JSON.stringify(items6),
    selectedKeys: JSON.stringify(['1']),
    openKeys: JSON.stringify(['sub1']),
    mode: 'inline',
    theme: 'dark'
  },
  width: 256,
  height: 312
});
let max6 = 0;
for (const n of nodes6) max6 = Math.max(max6, (n.y||0)+(n.height||0));
console.log('Card 6 menu rendered bottom:', max6);

// Card 8
const items8 = [
  { key: '1', icon: 'MailOutlined', label: 'Navigation One' },
  { key: '2', icon: 'CalendarOutlined', label: 'Navigation Two' },
  {
    key: 'sub1',
    icon: 'AppstoreOutlined',
    label: 'Navigation Two',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    icon: 'SettingOutlined',
    label: 'Navigation Three',
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' }
    ]
  },
  { key: 'link', icon: 'LinkOutlined', label: 'Ant Design' }
];
const nodes8 = menuFn({
  input: {
    items: JSON.stringify(items8),
    selectedKeys: JSON.stringify(['1']),
    openKeys: JSON.stringify(['sub1']),
    mode: 'inline',
    theme: 'light'
  },
  width: 256,
  height: 356
});
let max8 = 0;
for (const n of nodes8) max8 = Math.max(max8, (n.y||0)+(n.height||0));
console.log('Card 8 menu rendered bottom:', max8);
