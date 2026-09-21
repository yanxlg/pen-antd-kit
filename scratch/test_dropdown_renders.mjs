import fs from 'fs';

const ddSrc = fs.readFileSync('canvas-components/Dropdown.js', 'utf8');
const ddFn = new Function('pencil', ddSrc);

const ddButtonSrc = fs.readFileSync('canvas-components/Dropdown.Button.js', 'utf8');
const ddButtonFn = new Function('pencil', ddButtonSrc);

const menuSrc = fs.readFileSync('canvas-components/Menu.js', 'utf8');
const menuFn = new Function('pencil', menuSrc);

console.log('Testing canvas components...');

// Test 1: Basic
try {
  const nodes = ddFn({
    input: {
      label: 'Hover me',
      open: true,
      placement: 'bottomLeft',
      popupWidth: 180,
      popupHeight: 136,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', disabled: true, label: '2nd menu item (disabled)', icon: 'SmileOutlined' },
          { key: '3', disabled: true, label: '3rd menu item (disabled)' },
          { key: '4', danger: true, label: 'a danger item' }
        ]
      })
    },
    width: 180,
    height: 32
  });
  console.log('Test 1 Basic: OK, produced', nodes.length, 'nodes');
} catch (e) {
  console.error('Test 1 Basic ERROR:', e);
}

// Test 2: Cascading
try {
  const nodes = ddFn({
    input: {
      label: 'Cascading menu',
      open: true,
      triggerWidth: 140,
      popupWidth: 330,
      popupHeight: 140,
      openKeys: JSON.stringify(['sub1']),
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' },
          {
            key: 'sub1',
            label: 'sub menu',
            children: [
              { key: '3', label: '3rd menu item' },
              { key: '4', label: '4th menu item' }
            ]
          },
          { key: '5', disabled: true, label: 'disabled sub menu' }
        ]
      })
    },
    width: 140,
    height: 32
  });
  console.log('Test 2 Cascading: OK, produced', nodes.length, 'nodes');
} catch (e) {
  console.error('Test 2 Cascading ERROR:', e);
}

// Test 3: Extra node (shortcuts)
try {
  const nodes = ddFn({
    input: {
      label: 'Hover me',
      open: true,
      popupWidth: 200,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item', extra: '⌘P' },
          { key: '2', label: '2nd menu item', extra: '⌘B' },
          { key: '3', label: '3rd menu item', extra: '⌘S' }
        ]
      })
    },
    width: 200,
    height: 32
  });
  console.log('Test 3 Extra: OK, produced', nodes.length, 'nodes');
} catch (e) {
  console.error('Test 3 Extra ERROR:', e);
}

// Test 4: Custom dropdown (footer)
try {
  const nodes = ddFn({
    input: {
      label: 'Hover me',
      open: true,
      popupWidth: 180,
      popupHeight: 120,
      customFooter: true,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' }
        ]
      })
    },
    width: 180,
    height: 32
  });
  console.log('Test 4 Custom dropdown: OK, produced', nodes.length, 'nodes');
} catch (e) {
  console.error('Test 4 Custom dropdown ERROR:', e);
}

// Test 5: Dropdown.Button
try {
  const nodes = ddButtonFn({
    input: {
      label: 'Dropdown',
      type: 'default',
      size: 'middle'
    },
    width: 120,
    height: 32
  });
  console.log('Test 5 Dropdown.Button: OK, produced', nodes.length, 'nodes');
} catch (e) {
  console.error('Test 5 Dropdown.Button ERROR:', e);
}
