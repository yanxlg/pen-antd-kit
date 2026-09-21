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
  Update(p.id, { height: 292, layout: 'vertical', padding: 24, gap: 16, clip: false });
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
    height: 176,
    layout: 'none',
    clip: false
  });
  Insert(row1, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Ellipsis',
    x: 0,
    y: 0,
    width: 134,
    height: 32,
    inputs: {
      label: 'Dropdown',
      isButton: true,
      splitIcon: 'EllipsisOutlined',
      open: true,
      placement: 'bottomLeft',
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
    x: 210,
    y: 0,
    width: 134,
    height: 32,
    inputs: { label: 'Dropdown', isButton: true, splitIcon: 'UserOutlined', triggerWidth: 134, menu: buttonMenu }
  });
  Insert(row1, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Disabled',
    x: 420,
    y: 0,
    width: 134,
    height: 32,
    inputs: { label: 'Dropdown', isButton: true, splitIcon: 'EllipsisOutlined', disabled: true, triggerWidth: 134, menu: buttonMenu }
  });
  const row2 = Insert(p.id, {
    type: 'frame',
    name: 'Dropdown button variants · row 2',
    width: 'fill_container',
    layout: 'horizontal',
    gap: 76,
    clip: false
  });
  Insert(row2, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Loading icon',
    width: 143,
    height: 32,
    inputs: { label: 'With Tooltip', isButton: true, splitIcon: 'LoadingOutlined', triggerWidth: 143, menu: buttonMenu }
  });
  Insert(row2, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown · Regular button',
    width: 96,
    height: 32,
    inputs: { label: 'Button', triggerType: 'button', showTriggerIcon: true, triggerWidth: 96, menu: buttonMenu }
  });
  Insert(row2, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown button · Danger',
    width: 113,
    height: 32,
    inputs: { label: 'Danger', isButton: true, splitIcon: 'EllipsisOutlined', danger: true, triggerWidth: 113, menu: buttonMenu }
  });
}

// 6. Cascading menu (preview: JWeW7)
{
  const p = Get('JWeW7');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 230, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Cascading menu',
    width: 140,
    height: 32,
    inputs: {
      label: 'Cascading menu',
      open: true,
      triggerWidth: 140,
      popupWidth: 330,
      popupHeight: 140,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' },
          { key: 'sub1', label: 'sub menu', children: [{ key: 'sub1-1', label: '3rd menu item' }, { key: 'sub1-2', label: '4th menu item' }] },
          { key: 'sub2', label: 'disabled sub menu', disabled: true, children: [{ key: 'sub2-1', label: '5th menu item' }] }
        ],
        openKeys: ['sub1']
      })
    }
  });
}

// 7. Context Menu (preview: K67462)
{
  const p = Get('K67462');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 240, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const box = Insert(p.id, {
    type: 'frame',
    name: 'Context menu trigger box',
    width: 770,
    height: 190,
    fill: '#F5F5F5',
    stroke: '#D9D9D9',
    strokeWidth: 1,
    cornerRadius: 8,
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
    width: 770,
    height: 190,
    textAlign: 'center',
    textAlignVertical: 'middle'
  });
  Insert(box, {
    type: 'script',
    scriptUri: '../canvas-components/Dropdown.js',
    name: 'Dropdown instance · Context Menu Open',
    x: 80,
    y: 35,
    width: 160,
    height: 32,
    inputs: {
      label: '',
      open: true,
      triggerWidth: 0,
      triggerHeight: 0,
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
      popupWidth: 180,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' },
          { key: '3', label: '3rd menu item' }
        ],
        selectedKeys: ['3']
      })
    }
  });
}

// 9. Custom semantic dom styling (preview: JZ4Os)
{
  const p = Get('JZ4Os');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 200, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const row = Insert(p.id, {
    type: 'frame',
    name: 'Style buttons row',
    width: 'fill_container',
    layout: 'horizontal',
    gap: 16,
    clip: false
  });
  Insert(row, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Object Style Open',
    width: 120,
    height: 32,
    inputs: {
      label: 'Object Style',
      open: true,
      triggerWidth: 120,
      popupWidth: 180,
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
  Insert(row, {
    type: 'script',
    scriptUri: '../canvas-components/Button.js',
    name: 'Button · Function Style',
    width: 120,
    height: 32,
    inputs: { children: 'Function Style', type: 'default' }
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
  Update(p.id, { height: 220, layout: 'vertical', padding: 24, gap: 16, clip: false });
  Insert(p.id, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown instance · Custom dropdown',
    width: 180,
    height: 32,
    inputs: {
      label: 'Hover me',
      open: true,
      popupWidth: 180,
      popupHeight: 120,
      menu: JSON.stringify({
        items: [
          { key: '1', label: '1st menu item' },
          { key: '2', label: '2nd menu item' }
        ],
        footer: { text: 'Click me', type: 'primary' }
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
  Update(p.id, { height: 240, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const row = Insert(p.id, {
    type: 'frame',
    name: 'Loading buttons row',
    width: 'fill_container',
    layout: 'horizontal',
    gap: 12,
    clip: false
  });
  Insert(row, {
    type: 'ref',
    ref: 'ScSFh',
    name: 'Dropdown.Button instance · Submit Open',
    width: 110,
    height: 32,
    inputs: {
      label: 'Submit',
      isButton: true,
      open: true,
      placement: 'bottomLeft',
      triggerWidth: 110,
      popupWidth: 180,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: '1', label: 'Submit and continue' },
          { key: '2', label: 'Save draft' },
          { key: '3', label: 'Discard changes', danger: true }
        ]
      })
    }
  });
  Insert(row, {
    type: 'ref',
    ref: 'M3zf3',
    name: 'Dropdown.Button · Small',
    width: 96,
    height: 24,
    inputs: { children: 'Submit', size: 'small' }
  });
  Insert(row, {
    type: 'ref',
    ref: 'M3zf3',
    name: 'Dropdown.Button · Default',
    width: 110,
    height: 32,
    inputs: { children: 'Submit' }
  });
}

// 17. Selection actions (preview: rmp8y)
{
  const p = Get('rmp8y');
  for (const c of p.children || []) Delete(c.id);
  Update(p.id, { height: 240, layout: 'vertical', padding: 24, gap: 16, clip: false });
  const box = Insert(p.id, {
    type: 'frame',
    name: 'Selection container',
    width: 770,
    height: 190,
    layout: 'none',
    clip: false
  });
  Insert(box, {
    type: 'text',
    name: 'Selection paragraph',
    content: 'Select any text in this paragraph to open a Dropdown menu near the selection. This is useful for actions such as masking sensitive words, marking entities, etc.',
    x: 0,
    y: 0,
    width: 770,
    height: 60,
    fontFamily: 'AlibabaSans',
    fontSize: 14,
    lineHeight: 1.5714,
    fill: '#000000E0'
  });
  // Highlight rectangle for "masking sensitive words"
  Insert(box, {
    type: 'rectangle',
    name: 'Selection highlight',
    x: 104,
    y: 22,
    width: 172,
    height: 22,
    fill: '#1677FF',
    cornerRadius: 2
  });
  Insert(box, {
    type: 'text',
    name: 'Highlighted text',
    content: 'masking sensitive words',
    x: 108,
    y: 22,
    width: 164,
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
    x: 104,
    y: 48,
    width: 140,
    height: 32,
    inputs: {
      label: '',
      open: true,
      triggerWidth: 0,
      triggerHeight: 0,
      popupWidth: 140,
      popupHeight: 104,
      menu: JSON.stringify({
        items: [
          { key: 'copy', label: 'Copy', icon: 'CopyOutlined' },
          { key: 'search', label: 'Search', icon: 'SearchOutlined' },
          { key: 'share', label: 'Share', icon: 'ShareAltOutlined' }
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
