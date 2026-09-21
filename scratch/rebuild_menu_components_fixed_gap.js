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
  layout: 'vertical',
  gap: 24
});

function createRow(name) {
  return Insert(content, {
    type: 'frame',
    name: name,
    layout: 'horizontal',
    gap: 24
  });
}

function createCard(row, name, title, cardWidth) {
  const card = Insert(row, {
    type: 'frame',
    name: name,
    width: cardWidth,
    layout: 'vertical',
    gap: 16,
    padding: 24,
    stroke: '#f0f0f0',
    strokeWidth: 1,
    cornerRadius: 8
  });
  Insert(card, {
    type: 'text',
    name: 'State',
    content: title,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    fill: '#000000e0',
    textGrowth: 'fixed-width',
    width: 'fill_container',
    lineHeight: 1.5714
  });
  return card;
}

// ==========================================
// ROW 1: Master Definition + Horizontal Light
// ==========================================
const row1 = createRow('Row 1 · Master & Horizontal Light');

// Master Card (304px)
const master = Insert(row1, {
  type: 'frame',
  name: 'Canonical Menu',
  width: 304,
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

// Horizontal Light (788px)
{
  const card = createCard(row1, 'Menu · Horizontal (Light)', 'Horizontal (Light)', 788);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Horizontal (Light)',
    width: 740,
    height: 46,
    inputs: {
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
    }
  });
}

// ==========================================
// ROW 2: Horizontal Dark & Submenu Popup
// ==========================================
const row2 = createRow('Row 2 · Horizontal Dark & Popup');

// Horizontal Dark (788px)
{
  const card = createCard(row2, 'Menu · Horizontal (Dark)', 'Horizontal (Dark)', 788);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Horizontal (Dark)',
    width: 740,
    height: 46,
    inputs: {
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
    }
  });
}

// Horizontal with Submenu Popup (788px)
{
  const card = createCard(row2, 'Menu · Horizontal with Submenu Popup', 'Horizontal with Submenu Popup', 788);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Horizontal with Submenu Popup',
    width: 740,
    height: 224,
    inputs: {
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
    }
  });
}

// ==========================================
// ROW 3: Custom Submenu Render & Sub-menu Theme
// ==========================================
const row3 = createRow('Row 3 · Custom Popup & Sub-menu Theme');

// Custom Submenu Render (716px)
{
  const card = createCard(row3, 'Menu · Custom Submenu Render', 'Custom Submenu Render (popupRender)', 716);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Custom Submenu Render',
    width: 668,
    height: 256,
    inputs: {
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
    }
  });
}

// Sub-menu theme (Dark root + Light submenu) (528px)
{
  const card = createCard(row3, 'Menu · Sub-menu theme', 'Sub-menu theme (Dark root + Light submenu)', 528);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Sub-menu theme',
    width: 480,
    height: 220,
    inputs: {
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
    }
  });
}

// ==========================================
// ROW 4: Vertical Arrow & Vertical Popup
// ==========================================
const row4 = createRow('Row 4 · Vertical Variants');

// Vertical (Right arrow) (304px)
{
  const card = createCard(row4, 'Menu · Vertical (Right arrow)', 'Vertical (Right arrow)', 304);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Vertical (Right arrow)',
    width: 256,
    height: 160,
    inputs: {
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
    }
  });
}

// Vertical with Submenu Popup (528px)
{
  const card = createCard(row4, 'Menu · Vertical with Submenu Popup', 'Vertical with Submenu Popup', 528);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Vertical with Submenu Popup',
    width: 480,
    height: 170,
    inputs: {
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
    }
  });
}

// ==========================================
// ROW 5: Collapsed & Item States
// ==========================================
const row5 = createRow('Row 5 · Collapsed & Item States');

// Collapsed (Light & Dark) (304px)
{
  const card = createCard(row5, 'Menu · Collapsed', 'Collapsed (Light & Dark)', 304);
  const row = Insert(card, { type: 'frame', name: 'Collapsed row', width: 'fill_container', layout: 'horizontal', gap: 32 });
  Insert(row, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Collapsed (Light)',
    width: 80,
    height: 260,
    inputs: {
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
    }
  });
  Insert(row, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Collapsed (Dark)',
    width: 80,
    height: 260,
    inputs: {
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
    }
  });
}

// Item States (304px)
{
  const card = createCard(row5, 'Menu · Item States', 'Item States (Default, Selected, Disabled, Danger)', 304);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Item States',
    width: 256,
    height: 184,
    inputs: {
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
    }
  });
}

// ==========================================
// ROW 6: Dark Inline & Semantic Styling
// ==========================================
const row6 = createRow('Row 6 · Dark Inline & Semantic Styling');

// Dark Inline Theme (304px)
{
  const card = createCard(row6, 'Menu · Dark Inline Theme', 'Dark Inline Theme', 304);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Dark Inline Theme',
    width: 256,
    height: 400,
    inputs: {
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
    }
  });
}

// Custom Semantic Styling (592px)
{
  const card = createCard(row6, 'Menu · Custom Semantic Styling', 'Custom Semantic Styling (Border & Soft Background)', 592);
  const row = Insert(card, { type: 'frame', name: 'Semantic row', width: 'fill_container', layout: 'horizontal', gap: 20 });
  Insert(row, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Custom Semantic Styling (Border & Pill)',
    width: 256,
    height: 108,
    inputs: {
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
    }
  });
  Insert(row, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Custom Semantic Styling (Soft Background)',
    width: 256,
    height: 108,
    inputs: {
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
    }
  });
}

// ==========================================
// ROW 7: Inline Default & Inline Multi-level
// ==========================================
const row7 = createRow('Row 7 · Inline Menu Trees');

// Inline (Default) (304px)
{
  const card = createCard(row7, 'Menu · Inline (Default)', 'Inline (Default)', 304);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Inline (Default)',
    width: 256,
    height: 540,
    inputs: {
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
    }
  });
}

// Inline (Multi-level) (304px)
{
  const card = createCard(row7, 'Menu · Inline (Multi-level)', 'Inline (Multi-level)', 304);
  Insert(card, {
    type: 'ref',
    ref: canonicalMenu,
    name: 'Menu · Inline (Multi-level)',
    width: 256,
    height: 460,
    inputs: {
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
    }
  });
}

const bounds = Get(content, (n, c) => c && c.depth === 0 && c.bounds ? c.bounds.height : undefined);
const h = bounds && bounds[0] ? bounds[0] : 2800;
const boardH = Math.ceil(h + 192);
Update(board, { height: boardH });

const usageBoard = Get('artboard-menu-usage');
const sectionH = Math.max(boardH + 120, (usageBoard?.height || 5850) + 150);
Update('section-menu', { height: sectionH });
