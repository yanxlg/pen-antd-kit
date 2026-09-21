import json, sys
sys.path.append('.')
from scripts.pen_mcp import PenMCP

client = PenMCP()

js_code = """
const dropdownMenu = JSON.stringify({
  items: [
    { key: '1', label: '1st menu item' },
    { key: '2', label: '2nd menu item' },
    { key: '3', label: '3rd menu item' }
  ]
});

// The imported example columns already have their own fixed width. Horizontal
// padding here made every card 16px narrower, enlarged the center gutter, and
// left the fixed-width metadata dividers hanging outside the card.
Update('vRp8M', { padding: 0 });
const rightColumn = Get('AXfIF');
const rightColumnPadding = Array.isArray(rightColumn.padding) ? rightColumn.padding : [0, 0, 0, 0];
Update('AXfIF', { padding: [0, 0, Number(rightColumnPadding[2]) || 0, 0] });

function dropdownDemo(parent, placement, options = {}) {
  const tileWidth = 248;
  const tileHeight = 168;
  const triggerWidths = {
    topLeft: 88, top: 76, topRight: 96,
    leftTop: 88, left: 76, leftBottom: 104,
    rightTop: 96, right: 84, rightBottom: 112,
    bottomLeft: 104, bottom: 88, bottomRight: 108
  };
  const triggerWidth = triggerWidths[placement];
  const popupWidth = 128;
  const popupHeight = 104;
  const isSide = placement.startsWith('left') || placement.startsWith('right');
  const isTop = placement.startsWith('top');
  const isRightAligned = placement.endsWith('Right');
  let x = 12;
  let y = 0;
  if (isSide) {
    x = placement.startsWith('left') ? popupWidth + 8 : 0;
    y = placement.endsWith('Top') ? 8 : placement.endsWith('Bottom') ? 128 : 68;
  } else {
    x = isRightAligned ? tileWidth - triggerWidth - 8 : placement === 'top' || placement === 'bottom' ? (tileWidth - triggerWidth) / 2 : 8;
    y = isTop ? 112 : 8;
  }
  const tile = Insert(parent, {
    type: 'frame',
    name: 'Placement demo · ' + placement,
    width: tileWidth,
    height: tileHeight,
    layout: 'none',
    clip: false
  });
  Insert(tile, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · ' + placement,
    layoutPosition: 'absolute',
    x,
    y,
    width: triggerWidth,
    height: 32,
    inputs: {
      label: placement,
      triggerType: 'button',
      open: true,
      arrow: !!options.arrow,
      arrowPointAtCenter: !!options.arrowPointAtCenter,
      placement,
      triggerWidth,
      popupWidth,
      popupHeight,
      menu: dropdownMenu
    }
  });
  return tile;
}

function dropdownGrid(preview, placements, options = {}) {
  const grid = Insert(preview, {
    type: 'frame',
    name: options.name || 'Dropdown placement grid',
    width: 'fill_container',
    layout: 'vertical',
    gap: 12,
    clip: false
  });
  for (let index = 0; index < placements.length; index += 3) {
    const row = Insert(grid, {
      type: 'frame',
      name: 'Placement row ' + (index / 3 + 1),
      width: 'fill_container',
      layout: 'horizontal',
      gap: 4,
      clip: false
    });
    for (const placement of placements.slice(index, index + 3)) dropdownDemo(row, placement, options);
  }
}

// 1. Basic (preview: u7S1lm)
{
  const p = Get('u7S1lm');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 320, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Basic',
    width: 200,
    height: 32,
    inputs: {
      label: 'Hover me',
      triggerWidth: 86,
      open: true,
      placement: 'bottomLeft',
      popupWidth: 280,
      popupHeight: 136,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', disabled: true, label: '2nd menu item (disabled)', icon: 'SmileOutlined' },
          { key: '3', disabled: true, label: '3rd menu item (disabled)' },
          { key: '4', danger: true, label: 'a danger item' }
        ]
      })
    }
  });
}

// 2. Placement (preview: R6Z33)
{
  const p = Get('R6Z33');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 756, layout: 'vertical', padding: 24, gap: 16, clip: false });
  dropdownGrid(p.id, [
    'topLeft', 'top', 'topRight',
    'leftTop', 'left', 'leftBottom',
    'rightTop', 'right', 'rightBottom',
    'bottomLeft', 'bottom', 'bottomRight'
  ], { name: 'All 12 placements' });
}

// 3. Other elements (preview: jFKf7)
{
  const p = Get('jFKf7');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 210, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Other elements',
    width: 180,
    height: 32,
    inputs: {
      label: 'Hover me',
      open: true,
      placement: 'bottomLeft',
      popupWidth: 180,
      popupHeight: 124,
      menu: JSON.stringify({
        items: [
          { key: '0', label: '1st menu item' },
          { key: '1', label: '2nd menu item' },
          { type: 'divider' },
          { key: '3', label: '3rd menu item (disabled)', disabled: true }
        ]
      })
    }
  });
}

// 4. Trigger mode (preview: lsLkf)
{
  const p = Get('lsLkf');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 210, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Trigger mode',
    width: 180,
    height: 32,
    inputs: {
      label: 'Click me',
      open: true,
      trigger: 'click',
      placement: 'bottomLeft',
      popupWidth: 180,
      popupHeight: 124,
      menu: JSON.stringify({
        items: [
          { key: '0', label: '1st menu item' },
          { key: '1', label: '2nd menu item' },
          { type: 'divider' },
          { key: '3', label: '3rd menu item' }
        ]
      })
    }
  });
}

// 5. Button with dropdown menu (preview: ADi4g)
{
  const p = Get('ADi4g');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 408, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const buttonMenu = JSON.stringify({
    items: [
      { key: '1', label: '1st menu item', icon: 'UserOutlined' },
      { key: '2', label: '2nd menu item', icon: 'UserOutlined' },
      { key: '3', label: '3rd menu item', icon: 'UserOutlined', danger: true },
      { key: '4', label: '4th menu item', icon: 'UserOutlined', danger: true, disabled: true }
    ]
  });
  const row1 = Insert(p.id, {
    type: 'frame',
    name: 'Dropdown button variants · row 1',
    width: 'fill_container',
    height: 172,
    layout: 'none',
    clip: false
  });
  Insert(row1, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Ellipsis',
    x: 46,
    y: 0,
    width: 134,
    height: 32,
    inputs: {
      label: 'Dropdown',
      isButton: true,
      splitIcon: 'EllipsisOutlined',
      open: true,
      placement: 'bottomRight',
      popupWidth: 180,
      popupHeight: 136,
      triggerWidth: 134,
      menu: buttonMenu
    }
  });
  Insert(row1, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · User icon',
    x: 306,
    y: 0,
    width: 134,
    height: 32,
    inputs: {
      label: 'Dropdown',
      isButton: true,
      splitIcon: 'UserOutlined',
      open: true,
      placement: 'bottomRight',
      popupWidth: 180,
      popupHeight: 136,
      triggerWidth: 134,
      menu: buttonMenu
    }
  });
  Insert(row1, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Disabled',
    x: 566,
    y: 0,
    width: 134,
    height: 32,
    inputs: { label: 'Dropdown', isButton: true, splitIcon: 'EllipsisOutlined', disabled: true, triggerWidth: 134, menu: buttonMenu }
  });
  const row2 = Insert(p.id, {
    type: 'frame',
    name: 'Dropdown button variants · row 2',
    width: 'fill_container',
    height: 172,
    layout: 'none',
    clip: false
  });
  Insert(row2, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Loading icon',
    x: 46,
    y: 0,
    width: 143,
    height: 32,
    inputs: {
      label: 'With Tooltip',
      isButton: true,
      splitIcon: 'LoadingOutlined',
      open: true,
      placement: 'bottomRight',
      popupWidth: 180,
      popupHeight: 136,
      triggerWidth: 143,
      menu: buttonMenu
    }
  });
  Insert(row2, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown · Regular button',
    x: 306,
    y: 0,
    width: 96,
    height: 32,
    inputs: {
      label: 'Button',
      triggerType: 'button',
      showTriggerIcon: true,
      open: true,
      placement: 'bottomLeft',
      popupWidth: 180,
      popupHeight: 136,
      triggerWidth: 96,
      menu: buttonMenu
    }
  });
  Insert(row2, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Danger',
    x: 566,
    y: 0,
    width: 113,
    height: 32,
    inputs: {
      label: 'Danger',
      isButton: true,
      splitIcon: 'EllipsisOutlined',
      danger: true,
      open: true,
      placement: 'bottomRight',
      popupWidth: 180,
      popupHeight: 136,
      triggerWidth: 113,
      menu: buttonMenu
    }
  });
}

// 6. Cascading menu (preview: JWeW7)
{
  const p = Get('JWeW7');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 272, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Cascading menu',
    width: 315,
    height: 32,
    inputs: {
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
          { key: '2', label: 'sub menu', children: [{ key: '2-1', label: '3rd menu item' }, { key: '2-2', label: '4th menu item' }] },
          { key: '3', label: 'disabled sub menu', disabled: true, children: [{ key: '3-1', label: '5d menu item' }, { key: '3-2', label: '6th menu item' }] }
        ],
        openKeys: ['2'],
        rootWidth: 190,
        submenuWidth: 129
      })
    }
  });
}

// 7. Context Menu (preview: K67462)
{
  const p = Get('K67462');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 272, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const box = Insert(p.id, {
    type: 'frame',
    name: 'Context menu trigger box',
    width: 'fill_container',
    height: 200,
    fill: '#F5F5F5',
    layout: 'none',
    clip: false
  });
  Insert(box, {
    type: 'text',
    name: 'Context text',
    content: 'Right Click on here',
    fill: '#00000073',
    fontSize: 14,
    fontFamily: 'AlibabaSans',
    x: 0,
    y: 0,
    width: 756,
    height: 200,
    textGrowth: 'fixed-width-height',
    textAlign: 'center',
    textAlignVertical: 'middle'
  });
  Insert(box, {
    type: 'path',
    name: 'Cursor arrow hint',
    x: 488,
    y: 88,
    width: 16,
    height: 18,
    viewBox: [0, 0, 16, 18],
    geometry: 'M 1 1 L 1 15.2 L 4.9 11.6 L 7.6 17 L 10.4 15.6 L 7.8 10.5 L 14 10.1 Z',
    fill: '#FFFFFF',
    stroke: '#00000073',
    strokeWidth: 1.25
  });
  Insert(box, {
    type: 'script',
    scriptUri: '../canvas-components/Dropdown.js',
    name: 'Dropdown instance · Context Menu Open',
    x: 500,
    y: 100,
    width: 160,
    height: 32,
    inputs: {
      hideTrigger: true,
      open: true,
      triggerWidth: 1,
      triggerHeight: 1,
      popupWidth: 160,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' },
          { key: '3', label: '3rd menu item' }
        ]
      })
    }
  });
}

// 8. Selectable Menu (preview: qNibE)
{
  const p = Get('qNibE');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 200, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Selectable Menu',
    width: 180,
    height: 32,
    inputs: {
      label: 'Selectable',
      open: true,
      triggerWidth: 92,
      popupWidth: 92,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: 'Item 1' },
          { key: '2', label: 'Item 2' },
          { key: '3', label: 'Item 3' }
        ],
        selectable: true,
        selectedKeys: ['3']
      })
    }
  });
}

// 9. Custom semantic dom styling (preview: JZ4Os)
{
  const p = Get('JZ4Os');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 388, layout: 'vertical', padding: 24, gap: 24, clip: false });
  const semanticItems = [
    { key: '1', label: 'Profile' },
    { key: '2', label: 'Settings', icon: 'SettingOutlined' },
    { type: 'divider' },
    { key: '3', label: 'Logout', icon: 'LogoutOutlined', danger: true }
  ];
  const objectRow = Insert(p.id, {
    type: 'frame',
    name: 'Object semantic style',
    width: 'fill_container',
    height: 167,
    layout: 'none',
    clip: false
  });
  Insert(objectRow, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Object Style Open',
    x: 0,
    y: 0,
    width: 126,
    height: 32,
    inputs: {
      label: 'Object Style',
      triggerType: 'button',
      showTriggerIcon: true,
      open: true,
      triggerWidth: 126,
      popupWidth: 160,
      popupHeight: 131,
      menu: JSON.stringify({
        items: semanticItems,
        styles: {
          root: { backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 4 },
          item: { padding: '8px 12px', fontSize: '14px' },
          itemTitle: { fontWeight: '500' },
          itemIcon: { color: '#1890FF', marginInlineEnd: 8 },
          itemContent: { backgroundColor: 'transparent' }
        }
      })
    }
  });
  const functionRow = Insert(p.id, {
    type: 'frame',
    name: 'Function semantic style',
    width: 'fill_container',
    height: 149,
    layout: 'none',
    clip: false
  });
  Insert(functionRow, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Function Style Open',
    x: 0,
    y: 0,
    width: 142,
    height: 32,
    inputs: {
      label: 'Function Style',
      triggerType: 'button',
      buttonType: 'primary',
      showTriggerIcon: true,
      trigger: 'click',
      open: true,
      triggerWidth: 142,
      popupWidth: 160,
      popupHeight: 113,
      menu: JSON.stringify({
        items: semanticItems,
        styles: {
          root: { backgroundColor: '#FAFAFA', borderColor: '#1890FF', borderWidth: 1, borderRadius: 8 }
        }
      })
    }
  });
}

// 10. Extra node (preview: SmWUy)
{
  const p = Get('SmWUy');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 230, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Extra node',
    width: 200,
    height: 32,
    inputs: {
      label: 'Hover me',
      triggerWidth: 86,
      open: true,
      popupWidth: 141,
      popupHeight: 145,
      menu: JSON.stringify({
        items: [
          { key: '1', label: 'My Account', disabled: true },
          { type: 'divider' },
          { key: '2', label: 'Profile', extra: '⌘P' },
          { key: '3', label: 'Billing', extra: '⌘B' },
          { key: '4', label: 'Settings', icon: 'SettingOutlined', extra: '⌘S' }
        ]
      })
    }
  });
}

// 11. Arrow (preview: rlXM4)
{
  const p = Get('rlXM4');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 396, layout: 'vertical', padding: 24, gap: 16, clip: false });
  dropdownGrid(p.id, [
    'topLeft', 'top', 'topRight',
    'bottomLeft', 'bottom', 'bottomRight'
  ], { name: 'Arrow placements', arrow: true });
}

// 12. Arrow pointing at the center (preview: DHmev)
{
  const p = Get('DHmev');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 396, layout: 'vertical', padding: 24, gap: 16, clip: false });
  dropdownGrid(p.id, [
    'topLeft', 'top', 'topRight',
    'bottomLeft', 'bottom', 'bottomRight'
  ], { name: 'Centered arrow placements', arrow: true, arrowPointAtCenter: true });
}

// 13. Click event (preview: q7WVA)
{
  const p = Get('q7WVA');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 200, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Click event',
    width: 200,
    height: 32,
    inputs: {
      label: 'Hover me, Click menu item',
      open: true,
      triggerWidth: 200,
      popupWidth: 200,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' },
          { key: '3', label: '3rd menu item' }
        ]
      })
    }
  });
}

// 14. Custom dropdown (preview: D0ro0)
{
  const p = Get('D0ro0');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 252, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Custom dropdown',
    width: 180,
    height: 32,
    inputs: {
      label: 'Hover me',
      open: true,
      popupWidth: 280,
      popupHeight: 148,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item (disabled)', disabled: true },
          { key: '3', label: '3rd menu item (disabled)', disabled: true }
        ],
        footer: { text: 'Click me!', type: 'primary' }
      })
    }
  });
}

// 15. The way of hiding menu. (preview: GFGCU)
{
  const p = Get('GFGCU');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 200, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · The way of hiding menu.',
    width: 260,
    height: 32,
    inputs: {
      label: 'Hover me',
      open: true,
      triggerWidth: 260,
      popupWidth: 260,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: 'Clicking me will not close the menu.' },
          { key: '2', label: 'Clicking me will not close the menu also.' },
          { key: '3', label: 'Clicking me will close the menu.' }
        ]
      })
    }
  });
}

// 16. Loading (preview: u8Bnr)
{
  const p = Get('u8Bnr');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 252, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const loadingMenu = JSON.stringify({
    items: [{ key: '1', label: 'Submit and continue' }]
  });
  const stack = Insert(p.id, {
    type: 'frame',
    name: 'Loading button variants',
    width: 'fill_container',
    height: 144,
    layout: 'vertical',
    gap: 8,
    clip: false
  });
  Insert(stack, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Loading compact · Primary',
    width: 132,
    height: 32,
    inputs: {
      label: 'Submit', isButton: true, buttonType: 'primary', loading: true,
      splitIcon: 'EllipsisOutlined', triggerWidth: 132, menu: loadingMenu
    }
  });
  Insert(stack, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Loading compact · Primary small',
    width: 108,
    height: 24,
    inputs: {
      label: 'Submit', isButton: true, buttonType: 'primary', loading: true, size: 'small',
      triggerHeight: 24, splitIcon: 'EllipsisOutlined', triggerWidth: 108, menu: loadingMenu
    }
  });
  Insert(stack, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Loading compact · Primary interactive',
    width: 110,
    height: 32,
    inputs: {
      label: 'Submit', isButton: true, buttonType: 'primary',
      splitIcon: 'EllipsisOutlined', triggerWidth: 110, menu: loadingMenu
    }
  });
  Insert(stack, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Loading compact · Default interactive',
    width: 110,
    height: 32,
    inputs: {
      label: 'Submit', isButton: true, open: true, placement: 'bottomLeft',
      splitIcon: 'DownOutlined', triggerWidth: 110, popupWidth: 160, popupHeight: 40,
      menu: loadingMenu
    }
  });
}

// 17. Selection actions (preview: rmp8y)
{
  const p = Get('rmp8y');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 264, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const box = Insert(p.id, {
    type: 'frame',
    name: 'Selection container',
    width: 'fill_container',
    height: 114,
    fill: '#F5F5F5',
    cornerRadius: 8,
    layout: 'none',
    clip: false
  });
  Insert(box, {
    type: 'text',
    name: 'Selection paragraph',
    content: 'Select any text in this paragraph to open a Dropdown menu near the selection. This is useful\\nfor actions such as                                      , marking entities, or searching the selected\\nkeyword. Example data: Alice, phone 13800138000, ID 110101199001011234.',
    x: 24,
    y: 24,
    width: 708,
    height: 66,
    fontFamily: 'AlibabaSans',
    fontSize: 14,
    lineHeight: 1.5714,
    fill: '#000000E0'
  });
  // Highlight rectangle for "masking sensitive words"
  Insert(box, {
    type: 'rectangle',
    name: 'Selection highlight',
    x: 139,
    y: 46,
    width: 154,
    height: 22,
    fill: '#1677FF',
    cornerRadius: 0
  });
  Insert(box, {
    type: 'text',
    name: 'Highlighted text',
    content: 'masking sensitive words',
    x: 139,
    y: 46,
    width: 154,
    height: 22,
    fontFamily: 'AlibabaSans',
    fontSize: 14,
    lineHeight: 1.5714,
    textAlignVertical: 'middle',
    fill: '#FFFFFF'
  });
  // Dropdown action menu
  Insert(box, {
    type: 'script',
    scriptUri: '../canvas-components/Dropdown.js',
    name: 'Dropdown instance · Selection actions open',
    x: 216,
    y: 72,
    width: 140,
    height: 32,
    inputs: {
      hideTrigger: true,
      open: true,
      placement: 'bottom',
      triggerWidth: 1,
      triggerHeight: 1,
      popupWidth: 140,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: 'mask', label: 'Mask keyword' },
          { key: 'mark', label: 'Mark keyword' },
          { key: 'search', label: 'Search keyword' }
        ]
      })
    }
  });
}

// Size the canvas from rendered auto-layout bounds so expanded examples never overflow.
const contentBounds = Get('gMx2L', (node, context) => context.depth === 0 ? context.bounds : undefined)[0];
const artboardHeight = Math.ceil(160 + contentBounds.height + 32);
Update('artboard-dropdown-usage', { height: artboardHeight });
Update('section-dropdown', { height: artboardHeight + 120 });

Print('Populated all 17 previews and updated heights');
"""

res = client.execute(js_code)
print(res['data']['result']['message'] if res.get('data', {}).get('result') else res)
