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
      triggerWidth: 133,
      popupWidth: 315,
      popupHeight: 168,
      menu: JSON.stringify({
        items: [
          {
            key: '1',
            type: 'group',
            label: 'Group title',
            children: [
              { key: '1-1', label: '1st menu item' },
              { key: '1-2', label: '2nd menu item' }
            ]
          },
          {
            key: '2',
            label: 'sub menu',
            children: [
              { key: '2-1', label: '3rd menu item' },
              { key: '2-2', label: '4th menu item' }
            ]
          },
          { key: '3', disabled: true, label: 'disabled sub menu', children: [] }
        ],
        openKeys: ['2'],
        rootWidth: 190,
        submenuWidth: 129
      })
    },
    width: 315,
    height: 32
  });
  if (nodes.some((node) => node.name === 'Dropdown popup')) {
    throw new Error('Cascading dropdown rendered a combined popup surface');
  }
  const menuNode = nodes.find((node) => node.name === 'Menu');
  const menuNodes = menuFn({ input: menuNode.inputs, width: 315, height: 168 });
  const menuSurface = menuNodes.find((node) => node.name === 'Menu surface');
  const submenuSurface = menuNodes.find((node) => node.name === 'Vertical popup surface');
  if (menuSurface?.width !== 190 || submenuSurface?.x !== 186 || submenuSurface?.y !== 100 || submenuSurface?.width !== 129) {
    throw new Error('Cascading menu dimensions or alignment do not match the official example');
  }
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
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' }
        ],
        footer: { text: 'Click me!', type: 'primary' }
      })
    },
    width: 180,
    height: 32
  });
  const menu = nodes.find((node) => node.name === 'Menu');
  if (!menu || 'footer' in menu.inputs || !nodes.some((node) => node.name === 'Button')) {
    throw new Error('Custom dropdown footer was not isolated from Menu inputs');
  }
  console.log('Test 4 Custom dropdown: OK, produced', nodes.length, 'nodes');
} catch (e) {
  console.error('Test 4 Custom dropdown ERROR:', e);
}

// Test 5: Dropdown.Button
try {
  for (const icon of ['EllipsisOutlined', 'UserOutlined', 'LoadingOutlined', 'DownOutlined']) {
    const nodes = ddButtonFn({
      input: { children: 'Dropdown', type: 'default', size: 'middle', icon },
      width: 120,
      height: 32
    });
    const iconNode = nodes.find((node) => node.name === icon);
    if (!iconNode || iconNode.scriptUri !== '../canvas-components/Icon.js') {
      throw new Error(`Dropdown.Button did not render ${icon} through Icon.js`);
    }
  }
  for (const variant of [
    { size: 'small', height: 24, iconSize: 12, fontSize: 14, radius: 4 },
    { size: 'middle', height: 32, iconSize: 14, fontSize: 14, radius: 6 },
    { size: 'large', height: 40, iconSize: 16, fontSize: 16, radius: 8 }
  ]) {
    const nodes = ddButtonFn({
      input: { children: 'Dropdown', type: 'default', size: variant.size, icon: 'DownOutlined' },
      width: 120,
      height: variant.height
    });
    const iconNode = nodes.find((node) => node.name === 'DownOutlined');
    const labelNode = nodes.find((node) => node.name === 'Button label');
    const surfaceNode = nodes.find((node) => node.name === 'Main button surface');
    if (iconNode?.width !== variant.iconSize || labelNode?.fontSize !== variant.fontSize || surfaceNode?.cornerRadius?.[0] !== variant.radius) {
      throw new Error(`Dropdown.Button ${variant.size} tokens do not match Ant Design sizing`);
    }
  }
  const loadingNodes = ddButtonFn({
    input: { children: 'Submit', type: 'primary', size: 'middle', icon: 'EllipsisOutlined', loading: true },
    width: 132,
    height: 32
  });
  if (!loadingNodes.some((node) => node.name === 'LoadingOutlined')) {
    throw new Error('Dropdown.Button loading state did not render LoadingOutlined');
  }
  const dropdownLoadingNodes = ddFn({
    input: {
      label: 'Submit',
      isButton: true,
      buttonType: 'primary',
      loading: true,
      splitIcon: 'EllipsisOutlined',
      triggerWidth: 132
    },
    width: 132,
    height: 32
  });
  const loadingTrigger = dropdownLoadingNodes.find((node) => node.scriptUri === '../canvas-components/Dropdown.Button.js');
  if (!loadingTrigger?.inputs?.loading) {
    throw new Error('Dropdown did not forward its loading state to Dropdown.Button');
  }
  console.log('Test 5 Dropdown.Button icons: OK');
} catch (e) {
  console.error('Test 5 Dropdown.Button ERROR:', e);
}

// Test 6: invisible trigger for context/selection examples
try {
  const nodes = ddFn({
    input: {
      hideTrigger: true,
      open: true,
      triggerWidth: 1,
      triggerHeight: 1,
      popupWidth: 140,
      popupHeight: 104,
      menu: JSON.stringify({ items: [{ key: '1', label: '1st menu item' }] })
    },
    width: 140,
    height: 1
  });
  if (nodes.some((node) => node.name === 'Dropdown link') || !nodes.some((node) => node.name === 'Menu')) {
    throw new Error('Hidden Dropdown trigger still rendered visible trigger content');
  }
  console.log('Test 6 Hidden trigger: OK');
} catch (e) {
  console.error('Test 6 Hidden trigger ERROR:', e);
}

// Test 7: semantic menu styles remain valid string inputs for the nested Menu script
try {
  const styles = {
    root: { backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 4 },
    item: { padding: '8px 12px', fontSize: '14px' },
    itemTitle: { fontWeight: '500' },
    itemIcon: { color: '#1890FF', marginInlineEnd: 8 }
  };
  const nodes = ddFn({
    input: {
      label: 'Object Style',
      triggerType: 'button',
      showTriggerIcon: true,
      open: true,
      triggerWidth: 126,
      popupWidth: 160,
      popupHeight: 131,
      menu: JSON.stringify({
        items: [
          { key: '1', label: 'Profile' },
          { key: '2', label: 'Settings', icon: 'SettingOutlined' },
          { type: 'divider' },
          { key: '3', label: 'Logout', icon: 'LogoutOutlined', danger: true }
        ],
        styles
      })
    },
    width: 126,
    height: 32
  });
  const menu = nodes.find((node) => node.name === 'Menu');
  if (typeof menu?.inputs?.styles !== 'string') {
    throw new Error('Dropdown passed a non-string styles value to the nested Menu script');
  }
  const menuNodes = menuFn({ input: menu.inputs, width: menu.width, height: menu.height });
  const surface = menuNodes.find((node) => node.name === 'Menu surface');
  const settingsIcon = menuNodes.find((node) => node.type === 'script' && node.inputs?.name === 'SettingOutlined');
  if (surface?.cornerRadius !== 4 || surface?.stroke !== '#D9D9D9' || settingsIcon?.inputs?.color !== '#1890FF') {
    throw new Error('Semantic menu styles did not render through the nested Menu script');
  }
  console.log('Test 7 Semantic styles: OK');
} catch (e) {
  console.error('Test 7 Semantic styles ERROR:', e);
}
