
import fs from 'fs';
const menuSrc = fs.readFileSync('canvas-components/Menu.js', 'utf8');
const switchSrc = fs.readFileSync('canvas-components/Switch.js', 'utf8');

// Test 1: Menu vertical with popup
const menuFn = new Function('pencil', menuSrc);
const nodes1 = menuFn({
  input: {
    mode: 'vertical',
    theme: 'dark',
    items: JSON.stringify([
      { key: 'sub1', icon: 'MailOutlined', label: 'Navigation One', theme: 'light', children: [{ key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }, { key: '3', label: 'Option 3' }] },
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' }
    ]),
    selectedKeys: JSON.stringify(['1']),
    openKeys: JSON.stringify(['sub1'])
  },
  width: 420,
  height: 136
});
console.log('Test 1 nodes count:', nodes1.length);
const popupSurface = nodes1.find(n => n.name === 'Vertical popup surface');
console.log('Popup surface found:', !!popupSurface, 'x=' + popupSurface?.x, 'w=' + popupSurface?.width, 'effect=' + !!popupSurface?.effect);

// Test 2: Switch with Dark and Light labels
const switchFn = new Function('pencil', switchSrc);
const swDark = switchFn({
  input: { checked: true, checkedChildren: 'Dark', unCheckedChildren: 'Light' },
  width: 64,
  height: 22
});
const darkLabel = swDark.find(n => n.name === 'Switch label');
console.log('Switch Dark label width:', darkLabel?.width, 'content:', darkLabel?.content);

const swLight = switchFn({
  input: { checked: false, checkedChildren: 'Dark', unCheckedChildren: 'Light' },
  width: 64,
  height: 22
});
const lightLabel = swLight.find(n => n.name === 'Switch label');
console.log('Switch Light label width:', lightLabel?.width, 'content:', lightLabel?.content);
