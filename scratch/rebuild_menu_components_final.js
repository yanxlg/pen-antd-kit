
const board = "artboard-menu-components";
for (const n of Get(board, { depth: 1 }).children || []) Delete(n.id);
Update(board, { width: 1728, name: 'Components', height: 1000, layout: 'none' });

Insert(board, {
  type: "text",
  name: "Components",
  content: "Components",
  fontFamily: "Inter",
  fontSize: 80,
  fontWeight: "700",
  fill: "#000000e0",
  textGrowth: "fixed-width",
  width: 1600,
  lineHeight: 1.5714,
  x: 32,
  y: 32
});

const content = Insert(board, {
  type: 'frame',
  name: 'Component definition and configured instances',
  x: 32,
  y: 160,
  width: 1664,
  layout: 'vertical',
  gap: 24
});

// Card 0: Canonical Menu
const master = Insert(content, {
  type: 'frame',
  name: 'Canonical Menu',
  width: 1664,
  layout: 'vertical',
  gap: 16,
  padding: 24,
  stroke: '#f0f0f0',
  strokeWidth: 1,
  cornerRadius: 8
});
Insert(master, {
  type: 'text',
  name: 'Menu',
  content: 'Menu',
  fontFamily: 'Inter',
  fontSize: 20,
  fontWeight: '600',
  fill: '#000000e0',
  textGrowth: 'fixed-width',
  width: 'fill_container',
  lineHeight: 1.5714
});
const canonicalMenu = Insert(master, {
  type: 'script',
  name: 'Antd/Menu',
  reusable: true,
  scriptUri: '../canvas-components/Menu.js',
  width: 256,
  height: 168,
  inputs: {
    items: JSON.stringify([
      { key: "mail", label: "Navigation One", icon: "MailOutlined" },
      { key: "app", disabled: true, label: "Navigation Two", icon: "AppstoreOutlined" },
      { key: "SubMenu", label: "Navigation Three - Submenu", icon: "SettingOutlined", children: [
        { type: "group", label: "Item 1", children: [
          { key: "setting:1", label: "Option 1" },
          { key: "setting:2", label: "Option 2" }
        ]},
        { type: "group", label: "Item 2", children: [
          { key: "setting:3", label: "Option 3" },
          { key: "setting:4", label: "Option 4" }
        ]}
      ]},
      { key: "alipay", label: "Navigation Four - Link" }
    ]),
    selectedKeys: JSON.stringify(["mail"]),
    openKeys: JSON.stringify([]),
    mode: "vertical",
    theme: "light",
    inlineCollapsed: false,
    popupPlacement: "rightTop",
    popupRender: false
  },
  metadata: {
    type: 'antd-component',
    antd: {
      component: 'Menu',
      category: 'Navigation',
      version: '6.6.4'
    }
  }
});

// Card 1: Menu · Horizontal (Light)
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Horizontal (Light)', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Horizontal (Light)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Horizontal (Light)', width: 800, height: 46, inputs: {
    items: JSON.stringify([
      { key: "mail", label: "Navigation One", icon: "MailOutlined" },
      { key: "app", disabled: true, label: "Navigation Two", icon: "AppstoreOutlined" },
      { key: "SubMenu", label: "Navigation Three - Submenu", icon: "SettingOutlined", children: [
        { type: "group", label: "Item 1", children: [{ key: "setting:1", label: "Option 1" }, { key: "setting:2", label: "Option 2" }] },
        { type: "group", label: "Item 2", children: [{ key: "setting:3", label: "Option 3" }, { key: "setting:4", label: "Option 4" }] }
      ]},
      { key: "alipay", label: "Navigation Four - Link" }
    ]),
    selectedKeys: JSON.stringify(["mail"]),
    openKeys: JSON.stringify([]),
    mode: "horizontal",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 2: Menu · Horizontal (Dark)
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Horizontal (Dark)', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Horizontal (Dark)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Horizontal (Dark)', width: 800, height: 46, inputs: {
    items: JSON.stringify([
      { key: "mail", label: "Navigation One", icon: "MailOutlined" },
      { key: "app", disabled: true, label: "Navigation Two", icon: "AppstoreOutlined" },
      { key: "SubMenu", label: "Navigation Three - Submenu", icon: "SettingOutlined", children: [
        { type: "group", label: "Item 1", children: [{ key: "setting:1", label: "Option 1" }, { key: "setting:2", label: "Option 2" }] },
        { type: "group", label: "Item 2", children: [{ key: "setting:3", label: "Option 3" }, { key: "setting:4", label: "Option 4" }] }
      ]},
      { key: "alipay", label: "Navigation Four - Link" }
    ]),
    selectedKeys: JSON.stringify(["mail"]),
    openKeys: JSON.stringify([]),
    mode: "horizontal",
    theme: "dark",
    inlineCollapsed: false
  }});
}

// Card 3: Menu · Horizontal with Submenu Popup
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Horizontal with Submenu Popup', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Horizontal with Submenu Popup', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Horizontal with Submenu Popup', width: 800, height: 224, inputs: {
    items: JSON.stringify([
      { key: "mail", label: "Navigation One", icon: "MailOutlined" },
      { key: "app", disabled: true, label: "Navigation Two", icon: "AppstoreOutlined" },
      { key: "SubMenu", label: "Navigation Three - Submenu", icon: "SettingOutlined", children: [
        { key: "setting:1", label: "Option 1" },
        { key: "setting:2", label: "Option 2" },
        { key: "setting:3", label: "Option 3" },
        { key: "setting:4", label: "Option 4" }
      ]},
      { key: "alipay", label: "Navigation Four - Link" }
    ]),
    selectedKeys: JSON.stringify(["mail"]),
    openKeys: JSON.stringify(["SubMenu"]),
    mode: "horizontal",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 4: Menu · Custom Submenu Render
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Custom Submenu Render', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Custom Submenu Render (popupRender)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Custom Submenu Render', width: 800, height: 256, inputs: {
    items: JSON.stringify([
      { key: "home", label: "Home" },
      { key: "features", label: "Features", children: [
        { key: "getting-started", title: "Getting Started", description: "Quick start guide and learn the basics." },
        { key: "components", title: "Components", description: "Explore our component library." },
        { key: "templates", title: "Templates", description: "Ready-to-use template designs." }
      ]},
      { key: "resources", label: "Resources", children: [
        { key: "blog", title: "Blog", description: "Latest updates and articles." },
        { key: "community", title: "Community", description: "Join our developer community." }
      ]}
    ]),
    selectedKeys: JSON.stringify(["home"]),
    openKeys: JSON.stringify(["features"]),
    mode: "horizontal",
    theme: "light",
    popupRender: true
  }});
}

// Card 5: Menu · Inline (Default)
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Inline (Default)', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Inline (Default)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Inline (Default)', width: 256, height: 540, inputs: {
    items: JSON.stringify([
      { key: "sub1", label: "Navigation One", icon: "MailOutlined", children: [
        { key: "g1", type: "group", label: "Item 1", children: [{ key: "1", label: "Option 1" }, { key: "2", label: "Option 2" }] },
        { key: "g2", type: "group", label: "Item 2", children: [{ key: "3", label: "Option 3" }, { key: "4", label: "Option 4" }] }
      ]},
      { key: "sub2", label: "Navigation Two", icon: "AppstoreOutlined", children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "sub3", label: "Submenu", children: [{ key: "7", label: "Option 7" }, { key: "8", label: "Option 8" }] }
      ]},
      { type: "divider" },
      { key: "sub4", label: "Navigation Three", icon: "SettingOutlined", children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" }
      ]},
      { key: "grp", type: "group", label: "Group", children: [
        { key: "13", label: "Option 13" },
        { key: "14", label: "Option 14" }
      ]}
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify(["sub1"]),
    mode: "inline",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 6: Menu · Inline (Multi-level)
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Inline (Multi-level)', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Inline (Multi-level)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Inline (Multi-level)', width: 256, height: 460, inputs: {
    items: JSON.stringify([
      { key: "1", icon: "MailOutlined", label: "Navigation One" },
      { key: "2", icon: "CalendarOutlined", label: "Navigation Two" },
      { key: "sub1", icon: "AppstoreOutlined", label: "Navigation Two", children: [
        { key: "3", label: "Option 3" },
        { key: "4", label: "Option 4" },
        { key: "sub1-2", label: "Submenu", children: [
          { key: "5", label: "Option 5" },
          { key: "6", label: "Option 6" }
        ]}
      ]},
      { key: "sub2", icon: "SettingOutlined", label: "Navigation Three", children: [
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" }
      ]},
      { key: "link", icon: "LinkOutlined", label: "Ant Design" }
    ]),
    selectedKeys: JSON.stringify(["5"]),
    openKeys: JSON.stringify(["sub1", "sub1-2"]),
    mode: "inline",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 7: Menu · Collapsed (Light & Dark)
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Collapsed', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Collapsed (Light & Dark)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  const row = Insert(card, { type: 'frame', name: 'Collapsed row', width: 'fill_container', layout: 'horizontal', gap: 32 });
  Insert(row, { type: 'ref', ref: canonicalMenu, name: 'Menu · Collapsed (Light)', width: 80, height: 260, inputs: {
    items: JSON.stringify([
      { key: "1", icon: "PieChartOutlined", label: "Option 1" },
      { key: "2", icon: "DesktopOutlined", label: "Option 2" },
      { key: "3", icon: "ContainerOutlined", label: "Option 3" },
      { key: "sub1", icon: "MailOutlined", label: "Navigation One", children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" }
      ]},
      { key: "sub2", icon: "AppstoreOutlined", label: "Navigation Two", children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" }
      ]}
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify([]),
    mode: "inline",
    theme: "light",
    inlineCollapsed: true
  }});
  Insert(row, { type: 'ref', ref: canonicalMenu, name: 'Menu · Collapsed (Dark)', width: 80, height: 260, inputs: {
    items: JSON.stringify([
      { key: "1", icon: "PieChartOutlined", label: "Option 1" },
      { key: "2", icon: "DesktopOutlined", label: "Option 2" },
      { key: "3", icon: "ContainerOutlined", label: "Option 3" },
      { key: "sub1", icon: "MailOutlined", label: "Navigation One", children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" }
      ]},
      { key: "sub2", icon: "AppstoreOutlined", label: "Navigation Two", children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" }
      ]}
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify([]),
    mode: "inline",
    theme: "dark",
    inlineCollapsed: true
  }});
}

// Card 8: Menu · Vertical (Right arrow)
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Vertical (Right arrow)', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Vertical (Right arrow)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Vertical (Right arrow)', width: 256, height: 160, inputs: {
    items: JSON.stringify([
      { key: "sub1", icon: "MailOutlined", label: "Navigation One", children: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" }
      ]},
      { key: "sub2", icon: "AppstoreOutlined", label: "Navigation Two", children: [
        { key: "3", label: "Option 3" },
        { key: "4", label: "Option 4" }
      ]},
      { key: "link", icon: "LinkOutlined", label: "Ant Design" }
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify([]),
    mode: "vertical",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 9: Menu · Vertical with Submenu Popup
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Vertical with Submenu Popup', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Vertical with Submenu Popup', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Vertical with Submenu Popup', width: 480, height: 170, inputs: {
    items: JSON.stringify([
      { key: "sub1", icon: "MailOutlined", label: "Navigation One", children: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" },
        { key: "3", label: "Option 3" }
      ]},
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" }
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify(["sub1"]),
    mode: "vertical",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 10: Menu · Sub-menu theme
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Sub-menu theme', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Sub-menu theme (Dark root + Light submenu)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Sub-menu theme', width: 480, height: 220, inputs: {
    items: JSON.stringify([
      { key: "sub1", icon: "MailOutlined", label: "Navigation One", theme: "light", children: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" },
        { key: "3", label: "Option 3" }
      ]},
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" }
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify(["sub1"]),
    mode: "vertical",
    theme: "dark",
    inlineCollapsed: false,
    popupPlacement: "rightBottom"
  }});
}

// Card 11: Menu · Dark Inline Theme
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Dark Inline Theme', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Dark Inline Theme', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Dark Inline Theme', width: 256, height: 400, inputs: {
    items: JSON.stringify([
      { key: "sub1", label: "Navigation One", icon: "MailOutlined", children: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" },
        { key: "3", label: "Option 3" },
        { key: "4", label: "Option 4" }
      ]},
      { key: "sub2", label: "Navigation Two", icon: "AppstoreOutlined", children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "sub3", label: "Submenu", children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" }
        ]}
      ]},
      { key: "sub4", label: "Navigation Three", icon: "SettingOutlined", children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" }
      ]}
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify(["sub1"]),
    mode: "inline",
    theme: "dark",
    inlineCollapsed: false
  }});
}

// Card 12: Menu · Item States
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Item States', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Item States (Default, Selected, Disabled, Danger)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  Insert(card, { type: 'ref', ref: canonicalMenu, name: 'Menu · Item States', width: 256, height: 184, inputs: {
    items: JSON.stringify([
      { key: "default", label: "Default Item", icon: "MailOutlined" },
      { key: "selected", label: "Selected Item", icon: "CheckCircleOutlined" },
      { key: "disabled", disabled: true, label: "Disabled Item", icon: "StopOutlined" },
      { key: "danger", danger: true, label: "Danger Item", icon: "DeleteOutlined" }
    ]),
    selectedKeys: JSON.stringify(["selected"]),
    openKeys: JSON.stringify([]),
    mode: "inline",
    theme: "light",
    inlineCollapsed: false
  }});
}

// Card 13: Menu · Custom Semantic Styling
{
  const card = Insert(content, { type: 'frame', name: 'Menu · Custom Semantic Styling', width: 1664, layout: 'vertical', padding: 24, gap: 16, stroke: '#f0f0f0', strokeWidth: 1, cornerRadius: 8 });
  Insert(card, { type: 'text', name: 'State', content: 'Custom Semantic Styling (Border & Soft Background)', fontFamily: 'Inter', fontSize: 18, fontWeight: '600', fill: '#000000e0', textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.5714 });
  const row = Insert(card, { type: 'frame', name: 'Semantic row', width: 'fill_container', layout: 'horizontal', gap: 32 });
  Insert(row, { type: 'ref', ref: canonicalMenu, name: 'Menu · Custom Semantic Styling (Border & Pill)', width: 256, height: 108, inputs: {
    items: JSON.stringify([
      { key: "SubMenu", label: "Navigation One", children: [
        { key: "g1", label: "Item 1", type: "group", children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" }
        ]}
      ]},
      { key: "mail", label: "Navigation Two" }
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify([]),
    mode: "inline",
    theme: "light",
    styles: JSON.stringify({
      root: { border: "1px solid #f0f0f0", padding: 8, borderRadius: 8 },
      item: { color: "#1677ff" }
    })
  }});
  Insert(row, { type: 'ref', ref: canonicalMenu, name: 'Menu · Custom Semantic Styling (Soft Background)', width: 256, height: 108, inputs: {
    items: JSON.stringify([
      { key: "SubMenu", label: "Navigation One", children: [
        { key: "g1", label: "Item 1", type: "group", children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" }
        ]}
      ]},
      { key: "mail", label: "Navigation Two" }
    ]),
    selectedKeys: JSON.stringify(["1"]),
    openKeys: JSON.stringify([]),
    mode: "inline",
    theme: "light",
    styles: JSON.stringify({
      root: { backgroundColor: "rgba(240,249,255, 0.6)", border: "1px solid #bae0ff", padding: 8, borderRadius: 8 }
    })
  }});
}

const h = Get(content, (n, c) => c.depth === 0 ? c.bounds.height : undefined)[0];
const boardH = Math.ceil(h + 192);
Update(board, { height: boardH });

const usageBoard = Get('artboard-menu-usage');
const sectionH = Math.max(boardH + 120, (usageBoard?.height || 5850) + 150);
Update('section-menu', { height: sectionH });
