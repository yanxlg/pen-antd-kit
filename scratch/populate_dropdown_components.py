import sys

sys.path.append('.')
from scripts.pen_mcp import PenMCP


client = PenMCP()

js_code = r"""
const board = Get('artboard-dropdown-components');
const content = Get('eJnw5');
const canonicalDropdown = Get('TmY0s');

const basicMenu = JSON.stringify({
  items: [
    { key: '1', label: '1st menu item' },
    { key: '2', label: '2nd menu item' },
    { key: '3', label: '3rd menu item' }
  ]
});

const semanticMenu = JSON.stringify({
  items: [
    { key: 'profile', label: 'Profile', icon: 'UserOutlined' },
    { key: 'settings', label: 'Settings', icon: 'SettingOutlined' },
    { key: 'disabled', label: 'Disabled action', disabled: true },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', icon: 'LogoutOutlined', danger: true }
  ]
});

const shortcutMenu = JSON.stringify({
  items: [
    { key: 'profile', label: 'Profile', extra: '⌘P' },
    { key: 'billing', label: 'Billing', extra: '⌘B' },
    { key: 'settings', label: 'Settings', icon: 'SettingOutlined', extra: '⌘S' }
  ]
});

const selectableMenu = JSON.stringify({
  items: [
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2' },
    { key: '3', label: 'Item 3' }
  ],
  selectable: true,
  selectedKeys: ['3']
});

function textNode(name, value, size = 14, color = '#000000e0', weight = 'normal') {
  return {
    type: 'text',
    name,
    content: value,
    fontFamily: 'Inter',
    fontSize: size,
    fontWeight: weight,
    fill: color,
    textGrowth: 'fixed-width',
    width: 'fill_container',
    lineHeight: 1.5714
  };
}

function label(parent, value, x, y, width = 180) {
  Insert(parent, {
    type: 'text',
    name: value,
    content: value,
    x,
    y,
    width,
    height: 20,
    textGrowth: 'fixed-width-height',
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.5,
    fill: '#00000073'
  });
}

function card(parent, title, description, stageHeight) {
  const node = Insert(parent, {
    type: 'frame',
    name: title,
    width: 820,
    height: stageHeight + 120,
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#F0F0F0',
    strokeWidth: 1,
    layout: 'vertical',
    gap: 8,
    padding: 24,
    clip: false,
    metadata: { type: 'props-cross-showcase', component: 'Dropdown', axes: title }
  });
  Insert(node, textNode('Scenario', title, 18, '#000000e0', '600'));
  Insert(node, textNode('Description', description, 13, '#00000073'));
  return Insert(node, {
    type: 'frame',
    name: title + ' · Stage',
    width: 'fill_container',
    height: stageHeight,
    layout: 'none',
    clip: false
  });
}

function dropdown(parent, x, y, width, inputs) {
  return Insert(parent, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown · ' + (inputs.label || inputs.placement || 'Scenario'),
    x,
    y,
    width,
    height: inputs.triggerHeight || 32,
    inputs: {
      menu: basicMenu,
      triggerWidth: width,
      popupWidth: 160,
      popupHeight: 104,
      ...inputs
    }
  });
}

function splitButton(parent, x, y, width, inputs) {
  return Insert(parent, {
    type: 'script',
    scriptUri: '../canvas-components/Dropdown.Button.js',
    name: 'Dropdown.Button · ' + (inputs.children || 'Scenario'),
    x,
    y,
    width,
    height: inputs.size === 'small' ? 24 : inputs.size === 'large' ? 40 : 32,
    inputs: { children: 'Dropdown', type: 'default', size: 'middle', icon: 'DownOutlined', ...inputs }
  });
}

// Preserve the canonical Dropdown master because all Usage examples reference ScSFh.
for (const child of content.children || []) {
  if (child.id !== canonicalDropdown.id) Delete(child.id);
}
for (const child of board.children || []) {
  if (child.id !== 'exarR' && child.id !== content.id) Delete(child.id);
}

Update(board.id, { height: 2200, clip: true, layout: 'none' });
Update(content.id, { x: 32, y: 160, width: 1664, layout: 'vertical', gap: 24 });
Update(canonicalDropdown.id, {
  name: 'Canonical Dropdown',
  width: 1664,
  height: 128,
  layout: 'vertical',
  gap: 12,
  padding: 24,
  cornerRadius: 8,
  stroke: '#F0F0F0',
  strokeWidth: 1
});
Update('ScSFh', {
  width: 200,
  height: 32,
  inputs: {
    label: 'Hover me',
    menu: basicMenu,
    triggerWidth: 86,
    popupWidth: 160,
    popupHeight: 104
  }
});

const buttonMaster = Insert(content.id, {
  type: 'frame',
  name: 'Canonical Dropdown.Button',
  width: 1664,
  height: 128,
  layout: 'vertical',
  gap: 12,
  padding: 24,
  cornerRadius: 8,
  stroke: '#F0F0F0',
  strokeWidth: 1
});
Insert(buttonMaster, textNode('Dropdown.Button', 'Dropdown.Button', 20, '#000000e0', '600'));
Insert(buttonMaster, {
  type: 'script',
  name: 'Antd/Dropdown.Button',
  reusable: true,
  scriptUri: '../canvas-components/Dropdown.Button.js',
  width: 148,
  height: 32,
  inputs: { children: 'Dropdown', type: 'default', size: 'middle', icon: 'DownOutlined' },
  metadata: { type: 'antd-component', antd: { component: 'Dropdown.Button', category: 'Navigation', version: '6.6.4' } }
});

Insert(content.id, textNode('Cross scenarios', 'Cross scenarios', 20, '#000000e0', '600'));

// Row 1 — trigger representation and popup geometry.
{
  const row = Insert(content.id, { type: 'frame', name: 'Cross scenarios · Row 1', width: 'fill_container', gap: 24, clip: false });
  const triggerStage = card(row, 'Trigger × Open state', 'Compare link, regular button and split-button triggers in the same open state.', 196);
  label(triggerStage, 'Link · hover · open', 0, 0);
  dropdown(triggerStage, 0, 26, 92, { label: 'Hover me', open: true, trigger: 'hover' });
  label(triggerStage, 'Button · click · open', 250, 0);
  dropdown(triggerStage, 250, 26, 112, { label: 'Actions', triggerType: 'button', showTriggerIcon: true, open: true, trigger: 'click' });
  label(triggerStage, 'Dropdown.Button · open', 520, 0);
  dropdown(triggerStage, 520, 26, 148, { label: 'Submit', triggerType: 'splitButton', buttonType: 'primary', open: true, trigger: 'click' });

  const placementStage = card(row, 'Placement × Arrow', 'Top and bottom alignment combined with edge and centered arrow behavior.', 196);
  dropdown(placementStage, 10, 126, 92, { label: 'topLeft', placement: 'topLeft', triggerType: 'button', open: true, arrow: true, popupWidth: 148 });
  dropdown(placementStage, 260, 126, 92, { label: 'topRight', placement: 'topRight', triggerType: 'button', open: true, arrow: true, arrowPointAtCenter: true, popupWidth: 148 });
  dropdown(placementStage, 404, 0, 104, { label: 'bottomLeft', placement: 'bottomLeft', triggerType: 'button', open: true, arrow: true, popupWidth: 148 });
  dropdown(placementStage, 664, 0, 108, { label: 'bottomRight', placement: 'bottomRight', triggerType: 'button', open: true, arrow: true, arrowPointAtCenter: true, popupWidth: 148 });
}

// Row 2 — split button visual states and menu item semantics.
{
  const row = Insert(content.id, { type: 'frame', name: 'Cross scenarios · Row 2', width: 'fill_container', gap: 24, clip: false });
  const buttonStage = card(row, 'Button type × Status', 'Default, primary, danger, disabled and loading states for Dropdown.Button.', 232);
  label(buttonStage, 'Default', 0, 0, 120);
  splitButton(buttonStage, 0, 24, 142, { children: 'Dropdown' });
  label(buttonStage, 'Primary', 190, 0, 120);
  splitButton(buttonStage, 190, 24, 142, { children: 'Dropdown', type: 'primary' });
  label(buttonStage, 'Danger', 380, 0, 120);
  splitButton(buttonStage, 380, 24, 142, { children: 'Danger', danger: true, icon: 'EllipsisOutlined' });
  label(buttonStage, 'Disabled', 570, 0, 120);
  splitButton(buttonStage, 570, 24, 142, { children: 'Dropdown', disabled: true });
  label(buttonStage, 'Loading', 0, 72, 120);
  splitButton(buttonStage, 0, 94, 142, { children: 'Submit', type: 'primary', loading: true, icon: 'EllipsisOutlined' });
  label(buttonStage, 'Small', 190, 72, 120);
  splitButton(buttonStage, 190, 94, 124, { children: 'Submit', type: 'primary', size: 'small' });
  label(buttonStage, 'Custom icon', 380, 72, 120);
  splitButton(buttonStage, 380, 94, 142, { children: 'Account', icon: 'UserOutlined' });

  const itemStage = card(row, 'Menu content × Item state', 'Icons, disabled and danger items, shortcut metadata, and selectable state.', 232);
  label(itemStage, 'Semantic states', 0, 0);
  dropdown(itemStage, 0, 24, 126, { label: 'Account', open: true, triggerType: 'button', showTriggerIcon: true, popupWidth: 210, popupHeight: 145, menu: semanticMenu });
  label(itemStage, 'Extra metadata', 270, 0);
  dropdown(itemStage, 270, 24, 126, { label: 'Shortcuts', open: true, triggerType: 'button', showTriggerIcon: true, popupWidth: 210, popupHeight: 104, menu: shortcutMenu });
  label(itemStage, 'Selectable', 540, 0);
  dropdown(itemStage, 540, 24, 116, { label: 'Selectable', open: true, popupWidth: 116, popupHeight: 104, menu: selectableMenu });
}

// Row 3 — hierarchy/interaction and trigger sizing matrix.
{
  const row = Insert(content.id, { type: 'frame', name: 'Cross scenarios · Row 3', width: 'fill_container', gap: 24, clip: false });
  const hierarchyStage = card(row, 'Hierarchy × Interaction', 'Cascading navigation beside a menu that stays open for repeated actions.', 256);
  label(hierarchyStage, 'Cascading menu', 0, 0);
  dropdown(hierarchyStage, 0, 24, 138, {
    label: 'Cascading menu',
    open: true,
    popupWidth: 315,
    popupHeight: 168,
    menu: JSON.stringify({
      items: [
        { key: '1', label: '1st menu item' },
        { key: '2', label: 'sub menu', children: [{ key: '2-1', label: '3rd menu item' }, { key: '2-2', label: '4th menu item' }] },
        { key: '3', label: 'disabled sub menu', disabled: true, children: [] }
      ],
      openKeys: ['2'],
      rootWidth: 190,
      submenuWidth: 129
    })
  });
  label(hierarchyStage, 'Repeated actions · keep open', 410, 0, 220);
  dropdown(hierarchyStage, 410, 24, 120, {
    label: 'Hover me',
    open: true,
    popupWidth: 280,
    popupHeight: 104,
    menu: JSON.stringify({
      items: [
        { key: '1', label: 'Clicking me will not close the menu.' },
        { key: '2', label: 'Clicking me will not close the menu also.' },
        { key: '3', label: 'Clicking me will close the menu.' }
      ]
    })
  });

  const sizeStage = card(row, 'Size × Trigger type', 'Small, middle and large sizes across link, button and split-button triggers.', 256);
  label(sizeStage, 'Link', 112, 0, 100);
  label(sizeStage, 'Button', 326, 0, 100);
  label(sizeStage, 'Dropdown.Button', 550, 0, 140);
  const rows = [
    { name: 'Small', size: 'small', height: 24, y: 30, linkWidth: 62, buttonWidth: 76, splitWidth: 78 },
    { name: 'Middle', size: 'middle', height: 32, y: 72, linkWidth: 72, buttonWidth: 94, splitWidth: 104 },
    { name: 'Large', size: 'large', height: 40, y: 120, linkWidth: 76, buttonWidth: 104, splitWidth: 116 }
  ];
  for (const item of rows) {
    label(sizeStage, item.name, 0, item.y + 2, 72);
    dropdown(sizeStage, 112, item.y, item.linkWidth, { label: item.name, size: item.size, triggerHeight: item.height });
    dropdown(sizeStage, 326, item.y, item.buttonWidth, { label: item.name, size: item.size, triggerHeight: item.height, triggerType: 'button', showTriggerIcon: true });
    dropdown(sizeStage, 550, item.y, item.splitWidth, { label: item.name, size: item.size, triggerHeight: item.height, triggerType: 'splitButton', buttonType: item.size === 'middle' ? 'primary' : 'default' });
  }
}

const contentHeight = Get(content.id, (node, context) => context.depth === 0 ? context.bounds.height : undefined)[0];
const boardHeight = Math.ceil(160 + contentHeight + 32);
Update(board.id, { height: boardHeight });
const dropdownSection = Get('section-dropdown');
Update(dropdownSection.id, { height: Math.max(dropdownSection.height || 0, boardHeight + 120) });

Print('Populated Dropdown Components cross scenarios');
"""

result = client.execute(js_code)
print(result['data']['result']['message'] if result.get('data', {}).get('result') else result)
