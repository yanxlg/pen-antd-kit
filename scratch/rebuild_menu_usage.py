import json
from scripts.pen_mcp import PenMCP

client = PenMCP()

js_code = """
// 1. Move uqMYC to index 9 so Card 10 is Custom semantic dom styling and Card 11 is Custom Submenu Render
Move('uqMYC', 'PZ7NT', 9);

// Standard metadata descriptions and titles
const metaData = [
  {
    title: 'Top Navigation',
    desc: 'Horizontal top navigation menu.'
  },
  {
    title: 'Inline menu',
    desc: 'Vertical menu with inline submenus.'
  },
  {
    title: 'Collapsed inline menu',
    desc: 'Inline menu could be collapsed.'
  },
  {
    title: 'Menu tooltip',
    desc: 'Configure tooltip in inline collapsed mode, or disable it.'
  },
  {
    title: 'Open current submenu only',
    desc: 'Click the menu and you will see that all the other menus gets collapsed to keep the entire menu compact.'
  },
  {
    title: 'Vertical menu',
    desc: 'Submenus open as pop-ups.'
  },
  {
    title: 'Menu Themes',
    desc: 'There are two built-in themes: light and dark. The default value is light.'
  },
  {
    title: 'Sub-menu theme',
    desc: 'You can config SubMenu theme with theme prop to enable different theme color effect. This sample is dark for root and light for SubMenu.'
  },
  {
    title: 'Switch the menu type',
    desc: 'Show the dynamic switching mode (between inline and vertical).'
  },
  {
    title: 'Custom semantic dom styling',
    desc: 'You can customize the semantic dom style of Menu by passing objects/functions through classNames and styles.'
  },
  {
    title: 'Custom Submenu Render',
    desc: 'Use the popupRender prop to customize submenu popup rendering.'
  }
];

// 2. Format Meta for each card
const container = Get('PZ7NT');
for (let i = 0; i < container.children.length; i++) {
  const card = container.children[i];
  const info = metaData[i];
  Update(card.id, {
    name: 'Example · ' + info.title,
    width: 'fill_container',
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#0505050F',
    strokeWidth: 1,
    layout: 'vertical'
  });

  const preview = card.children[0];
  Update(preview.id, {
    width: 'fill_container',
    layout: 'vertical',
    padding: 24,
    gap: 16
  });

  const meta = card.children[1];
  Update(meta.id, {
    width: 'fill_container',
    layout: 'vertical',
    clip: false
  });

  // Rebuild Meta children: Divider, Title Frame, Description
  for (const c of meta.children || []) {
    Delete(c.id);
  }

  Insert(meta.id, {
    type: 'rectangle',
    name: 'Divider',
    fill: '#F0F0F0',
    width: 1646,
    height: 1,
    layoutPosition: 'absolute',
    x: 0,
    y: 0
  });

  Insert(meta.id, {
    type: 'frame',
    name: 'Example title · ' + info.title,
    layoutPosition: 'absolute',
    x: 16,
    y: -15,
    height: 30,
    fill: '#FFFFFF',
    cornerRadius: [6, 6, 0, 0],
    padding: [1, 8],
    alignItems: 'center',
    children: [
      {
        type: 'text',
        name: 'Example title',
        fill: '#000000E0',
        content: info.title,
        lineHeight: 1,
        textAlignVertical: 'middle',
        fontFamily: 'AlibabaSans',
        fontSize: 14,
        fontWeight: '500'
      }
    ]
  });

  Insert(meta.id, {
    type: 'frame',
    name: 'Description',
    width: 'fill_container',
    layout: 'vertical',
    padding: [18, 24],
    children: [
      {
        type: 'text',
        name: 'Text',
        fill: '#000000E0',
        content: info.desc,
        lineHeight: 1.5714,
        fontFamily: 'AlibabaSans',
        fontSize: 14,
        fontWeight: 'normal',
        textGrowth: 'fixed-width',
        width: 'fill_container'
      }
    ]
  });
}

// 3. Rebuild Preview for each card
// Card 1: Top Navigation (n7qXf)
{
  for (const c of Get('n7qXf').children || []) Delete(c.id);
  Insert('n7qXf', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Top Navigation',
    width: 'fill_container',
    height: 46,
    inputs: {
      items: JSON.stringify([
        { key: 'mail', label: 'Navigation One', icon: 'MailOutlined' },
        { key: 'app', label: 'Navigation Two', icon: 'AppstoreOutlined', disabled: true },
        {
          key: 'SubMenu',
          label: 'Navigation Three - Submenu',
          icon: 'SettingOutlined',
          children: [
            { type: 'group', label: 'Item 1', children: [{ label: 'Option 1', key: 'setting:1' }, { label: 'Option 2', key: 'setting:2' }] },
            { type: 'group', label: 'Item 2', children: [{ label: 'Option 3', key: 'setting:3' }, { label: 'Option 4', key: 'setting:4' }] }
          ]
        },
        { key: 'alipay', label: 'Navigation Four - Link' }
      ]),
      selectedKeys: '["mail"]',
      openKeys: '[]',
      mode: 'horizontal',
      theme: 'light',
      inlineCollapsed: false
    }
  });
}

// Card 2: Inline menu (POunm)
{
  for (const c of Get('POunm').children || []) Delete(c.id);
  Insert('POunm', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Inline menu',
    width: 256,
    height: 440,
    inputs: {
      items: JSON.stringify([
        {
          key: 'sub1',
          label: 'Navigation One',
          icon: 'MailOutlined',
          children: [
            { key: 'g1', label: 'Item 1', type: 'group', children: [{ key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }] },
            { key: 'g2', label: 'Item 2', type: 'group', children: [{ key: '3', label: 'Option 3' }, { key: '4', label: 'Option 4' }] }
          ]
        },
        {
          key: 'sub2',
          label: 'Navigation Two',
          icon: 'AppstoreOutlined',
          children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            { key: 'sub3', label: 'Submenu', children: [{ key: '7', label: 'Option 7' }, { key: '8', label: 'Option 8' }] }
          ]
        },
        { type: 'divider' },
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
        },
        {
          key: 'grp',
          label: 'Group',
          type: 'group',
          children: [
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' }
          ]
        }
      ]),
      selectedKeys: '["1"]',
      openKeys: '["sub1"]',
      mode: 'inline',
      theme: 'light',
      inlineCollapsed: false
    }
  });
}

// Card 3: Collapsed inline menu (YKEYA)
{
  for (const c of Get('YKEYA').children || []) Delete(c.id);
  Insert('YKEYA', {
    type: 'ref',
    ref: 'DQZzq',
    name: 'Collapse button',
    width: 32,
    height: 32,
    inputs: {
      type: 'primary',
      icon: 'MenuUnfoldOutlined',
      children: ''
    }
  });
  Insert('YKEYA', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Collapsed inline menu',
    width: 80,
    height: 210,
    inputs: {
      items: JSON.stringify([
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
            { key: 'sub3', label: 'Submenu', children: [{ key: '11', label: 'Option 11' }, { key: '12', label: 'Option 12' }] }
          ]
        }
      ]),
      selectedKeys: '["1"]',
      openKeys: '[]',
      mode: 'inline',
      theme: 'dark',
      inlineCollapsed: true
    }
  });
}

// Card 4: Menu tooltip (ID6l1)
{
  for (const c of Get('ID6l1').children || []) Delete(c.id);
  const bar = Insert('ID6l1', {
    type: 'frame',
    name: 'Control bar',
    layout: 'horizontal',
    gap: 8,
    alignItems: 'center'
  });
  Insert(bar, {
    type: 'ref',
    ref: 'DQZzq',
    name: 'Collapse button',
    width: 32,
    height: 32,
    inputs: {
      type: 'primary',
      icon: 'MenuUnfoldOutlined',
      children: ''
    }
  });
  Insert(bar, {
    type: 'ref',
    ref: 'rZqkn',
    name: 'Tooltip switch',
    width: 90,
    height: 22,
    inputs: {
      checked: true,
      checkedChildren: 'Tooltip On',
      unCheckedChildren: 'Tooltip Off'
    }
  });
  Insert('ID6l1', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Menu tooltip',
    width: 80,
    height: 210,
    inputs: {
      items: JSON.stringify([
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
            { key: 'sub3', label: 'Submenu', children: [{ key: '11', label: 'Option 11' }, { key: '12', label: 'Option 12' }] }
          ]
        }
      ]),
      selectedKeys: '["1"]',
      openKeys: '[]',
      mode: 'inline',
      theme: 'dark',
      inlineCollapsed: true
    }
  });
}

// Card 5: Open current submenu only (rvioJ)
{
  for (const c of Get('rvioJ').children || []) Delete(c.id);
  Insert('rvioJ', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Open current submenu only',
    width: 256,
    height: 400,
    inputs: {
      items: JSON.stringify([
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
      ]),
      selectedKeys: '["231"]',
      openKeys: '["2", "23"]',
      mode: 'inline',
      theme: 'light',
      inlineCollapsed: false
    }
  });
}

// Card 6: Vertical menu (btgk6)
{
  for (const c of Get('btgk6').children || []) Delete(c.id);
  Insert('btgk6', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Vertical menu',
    width: 256,
    height: 128,
    inputs: {
      items: JSON.stringify([
        {
          key: 'sub1',
          icon: 'MailOutlined',
          label: 'Navigation One',
          children: [
            { key: '1-1', label: 'Item 1', type: 'group', children: [{ key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }] },
            { key: '1-2', label: 'Item 2', type: 'group', children: [{ key: '3', label: 'Option 3' }, { key: '4', label: 'Option 4' }] }
          ]
        },
        {
          key: 'sub2',
          icon: 'AppstoreOutlined',
          label: 'Navigation Two',
          children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            { key: 'sub3', label: 'Submenu', children: [{ key: '7', label: 'Option 7' }, { key: '8', label: 'Option 8' }] }
          ]
        },
        {
          key: 'sub4',
          icon: 'SettingOutlined',
          label: 'Navigation Three',
          children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' }
          ]
        }
      ]),
      selectedKeys: '["1"]',
      openKeys: '[]',
      mode: 'vertical',
      theme: 'light',
      inlineCollapsed: false
    }
  });
}

// Card 7: Menu Themes (G2hOJh)
{
  for (const c of Get('G2hOJh').children || []) Delete(c.id);
  const bar = Insert('G2hOJh', {
    type: 'frame',
    name: 'Theme switch bar',
    layout: 'horizontal',
    gap: 8,
    alignItems: 'center'
  });
  Insert(bar, {
    type: 'ref',
    ref: 'rZqkn',
    name: 'Theme switch',
    width: 58,
    height: 22,
    inputs: {
      checked: true,
      checkedChildren: 'Dark',
      unCheckedChildren: 'Light'
    }
  });
  Insert('G2hOJh', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Menu Themes',
    width: 256,
    height: 320,
    inputs: {
      items: JSON.stringify([
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
            { key: 'sub3', label: 'Submenu', children: [{ key: '7', label: 'Option 7' }, { key: '8', label: 'Option 8' }] }
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
      ]),
      selectedKeys: '["1"]',
      openKeys: '["sub1"]',
      mode: 'inline',
      theme: 'dark',
      inlineCollapsed: false
    }
  });
}

// Card 8: Sub-menu theme (i3rmHM)
{
  for (const c of Get('i3rmHM').children || []) Delete(c.id);
  const bar = Insert('i3rmHM', {
    type: 'frame',
    name: 'Submenu theme switch bar',
    layout: 'horizontal',
    gap: 8,
    alignItems: 'center'
  });
  Insert(bar, {
    type: 'ref',
    ref: 'rZqkn',
    name: 'Submenu theme switch',
    width: 58,
    height: 22,
    inputs: {
      checked: false,
      checkedChildren: 'Dark',
      unCheckedChildren: 'Light'
    }
  });
  Insert('i3rmHM', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Sub-menu theme',
    width: 256,
    height: 136,
    inputs: {
      items: JSON.stringify([
        {
          key: 'sub1',
          icon: 'MailOutlined',
          label: 'Navigation One',
          theme: 'light',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
            { key: '3', label: 'Option 3' }
          ]
        },
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' }
      ]),
      selectedKeys: '["1"]',
      openKeys: '["sub1"]',
      mode: 'vertical',
      theme: 'dark',
      inlineCollapsed: false
    }
  });
}

// Card 9: Switch the menu type (YQWq3)
{
  for (const c of Get('YQWq3').children || []) Delete(c.id);
  const bar = Insert('YQWq3', {
    type: 'frame',
    name: 'Switch mode and style bar',
    layout: 'horizontal',
    gap: 12,
    alignItems: 'center'
  });
  Insert(bar, {
    type: 'ref',
    ref: 'rZqkn',
    name: 'Mode switch',
    width: 44,
    height: 22,
    inputs: { checked: false }
  });
  Insert(bar, {
    type: 'text',
    name: 'Mode label',
    content: 'Change Mode',
    fontFamily: 'Inter',
    fontSize: 14,
    fill: '#000000E0'
  });
  Insert(bar, {
    type: 'ref',
    ref: 'xi5QX',
    name: 'Divider',
    width: 1,
    height: 16,
    inputs: { orientation: 'vertical' }
  });
  Insert(bar, {
    type: 'ref',
    ref: 'rZqkn',
    name: 'Style switch',
    width: 44,
    height: 22,
    inputs: { checked: false }
  });
  Insert(bar, {
    type: 'text',
    name: 'Style label',
    content: 'Change Style',
    fontFamily: 'Inter',
    fontSize: 14,
    fill: '#000000E0'
  });
  Insert('YQWq3', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Switch the menu type',
    width: 256,
    height: 290,
    inputs: {
      items: JSON.stringify([
        { key: '1', icon: 'MailOutlined', label: 'Navigation One' },
        { key: '2', icon: 'CalendarOutlined', label: 'Navigation Two' },
        {
          key: 'sub1',
          icon: 'AppstoreOutlined',
          label: 'Navigation Two',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
            { key: 'sub1-2', label: 'Submenu', children: [{ key: '5', label: 'Option 5' }, { key: '6', label: 'Option 6' }] }
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
      ]),
      selectedKeys: '["1"]',
      openKeys: '["sub1"]',
      mode: 'inline',
      theme: 'light',
      inlineCollapsed: false
    }
  });
}

// Card 10: Custom semantic dom styling (O8Pik)
{
  for (const c of Get('O8Pik').children || []) Delete(c.id);
  const row = Insert('O8Pik', {
    type: 'frame',
    name: 'Custom semantic styled menus',
    layout: 'horizontal',
    gap: 24
  });
  Insert(row, {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Custom semantic styles',
    width: 280,
    height: 168,
    inputs: {
      items: JSON.stringify([
        {
          key: 'SubMenu',
          label: 'Navigation One',
          children: [
            { key: 'g1', label: 'Item 1', type: 'group', children: [{ key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }] }
          ]
        },
        { key: 'mail', label: 'Navigation Two' }
      ]),
      selectedKeys: '["1"]',
      openKeys: '["SubMenu"]',
      mode: 'inline',
      theme: 'light',
      styles: JSON.stringify({
        root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
        item: { color: '#1677ff' }
      })
    }
  });
  Insert(row, {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Custom semantic bg',
    width: 280,
    height: 168,
    inputs: {
      items: JSON.stringify([
        {
          key: 'SubMenu',
          label: 'Navigation One',
          children: [
            { key: 'g1', label: 'Item 1', type: 'group', children: [{ key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }] }
          ]
        },
        { key: 'mail', label: 'Navigation Two' }
      ]),
      selectedKeys: '["1"]',
      openKeys: '["SubMenu"]',
      mode: 'inline',
      theme: 'light',
      styles: JSON.stringify({
        root: { backgroundColor: 'rgba(240,249,255, 0.6)', border: '1px solid #bae0ff', padding: 8, borderRadius: 4 }
      })
    }
  });
}

// Card 11: Custom Submenu Render (zcP11)
{
  for (const c of Get('zcP11').children || []) Delete(c.id);
  Insert('zcP11', {
    type: 'ref',
    ref: 'jaNIi',
    name: 'Menu instance · Custom Submenu Render Header',
    width: 'fill_container',
    height: 46,
    inputs: {
      items: JSON.stringify([
        { key: 'home', label: 'Home' },
        { key: 'features', label: 'Features' }
      ]),
      selectedKeys: '["features"]',
      openKeys: '[]',
      mode: 'horizontal',
      theme: 'light'
    }
  });
  const popup = Insert('zcP11', {
    type: 'frame',
    name: 'Custom popup submenu',
    layout: 'horizontal',
    gap: 16,
    padding: 16,
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#0000000F',
    strokeWidth: 1,
    width: 500
  });
  const itemA = Insert(popup, {
    type: 'frame',
    name: 'Popup Item 1',
    layout: 'vertical',
    gap: 4,
    padding: 12,
    cornerRadius: 6,
    fill: '#00000005',
    width: 226
  });
  Insert(itemA, {
    type: 'text',
    name: 'Item Title',
    content: 'Getting Started',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    fill: '#1677FF'
  });
  Insert(itemA, {
    type: 'text',
    name: 'Item Desc',
    content: 'Quick start guide and learn the basics.',
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#00000073',
    textGrowth: 'fixed-width',
    width: 'fill_container',
    lineHeight: 1.4
  });

  const itemB = Insert(popup, {
    type: 'frame',
    name: 'Popup Item 2',
    layout: 'vertical',
    gap: 4,
    padding: 12,
    cornerRadius: 6,
    width: 226
  });
  Insert(itemB, {
    type: 'text',
    name: 'Item Title',
    content: 'Components',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    fill: '#000000E0'
  });
  Insert(itemB, {
    type: 'text',
    name: 'Item Desc',
    content: 'Explore our component library.',
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#00000073',
    textGrowth: 'fixed-width',
    width: 'fill_container',
    lineHeight: 1.4
  });
}

// 4. Recalculate heights
const hContent = Get('cBEpv', (n, c) => c.depth === 0 ? c.bounds.height : undefined)[0];
const targetBoardHeight = Math.ceil(hContent + 220);
Update('artboard-menu-usage', { height: targetBoardHeight });

const menuComponents = Get('artboard-menu-components');
const menuPrinciples = Get('artboard-menu-principles');
const maxSecH = Math.max(targetBoardHeight, menuComponents ? menuComponents.height : 0, menuPrinciples ? menuPrinciples.height : 0) + 140;
Update('section-menu', { height: maxSecH });

Print(JSON.stringify({
  contentHeight: hContent,
  targetBoardHeight: targetBoardHeight,
  sectionHeight: maxSecH
}));
"""

res = client.execute(js_code)
print(res)
client.close()
