import json, sys
sys.path.append('.')
from scripts.pen_mcp import PenMCP

client = PenMCP()

meta_col1 = [
  {
    "id": "P7pCB",
    "title": "Basic",
    "desc": "The most basic dropdown menu.",
    "previewHeight": 320
  },
  {
    "id": "cRS82",
    "title": "Placement",
    "desc": "Support 12 placements.",
    "previewHeight": 756
  },
  {
    "id": "qSS6D",
    "title": "Other elements",
    "desc": "Divider and disabled menu item.",
    "previewHeight": 210
  },
  {
    "id": "g8TIPm",
    "title": "Trigger mode",
    "desc": "The default trigger mode is hover, you can change it to click.",
    "previewHeight": 210
  },
  {
    "id": "m5iOy",
    "title": "Button with dropdown menu",
    "desc": "A button is on the left, and a related functional menu is on the right. You can set the icon property to modify the icon of right.",
    "previewHeight": 292
  },
  {
    "id": "joghe",
    "title": "Cascading menu",
    "desc": "The menu has multiple levels.",
    "previewHeight": 230
  },
  {
    "id": "NpOJm",
    "title": "Context Menu",
    "desc": "The default trigger mode is hover, you can change it to contextMenu. The pop-up menu position will follow the right-click position.",
    "previewHeight": 240
  },
  {
    "id": "ioUrs",
    "title": "Selectable Menu",
    "desc": "Configure the selectable property in menu to enable selectable ability.",
    "previewHeight": 200
  },
  {
    "id": "AdXlQ",
    "title": "Custom semantic dom styling",
    "desc": "You can customize the semantic dom style of the Dropdown by passing objects/functions through classNames and styles.",
    "previewHeight": 200
  }
]

meta_col2 = [
  {
    "id": "lq7Sw",
    "title": "Extra node",
    "desc": "The dropdown menu with shortcut.",
    "previewHeight": 230
  },
  {
    "id": "wRcjo",
    "title": "Arrow",
    "desc": "You could display an arrow.",
    "previewHeight": 396
  },
  {
    "id": "dfWUU",
    "title": "Arrow pointing at the center",
    "desc": "By specifying arrow prop with { pointAtCenter: true }, the arrow will point to the center of the target element.",
    "previewHeight": 396
  },
  {
    "id": "VcOoX",
    "title": "Click event",
    "desc": "An event will be triggered when you click menu items, in which you can make different operations according to item's key.",
    "previewHeight": 200
  },
  {
    "id": "W3Y3QS",
    "title": "Custom dropdown",
    "desc": "Customize the dropdown menu via popupRender. If you don't need the Menu content, use the Popover component directly.",
    "previewHeight": 220
  },
  {
    "id": "p8VZib",
    "title": "The way of hiding menu.",
    "desc": "The default is to close the menu when you click on menu items, this feature can be turned off.",
    "previewHeight": 200
  },
  {
    "id": "zlkQf",
    "title": "Loading",
    "desc": "A loading indicator can be added to a button by setting the loading property.",
    "previewHeight": 240
  },
  {
    "id": "njiJn",
    "title": "Selection actions",
    "desc": "Use Dropdown with the browser Selection API to show custom actions after selecting text.",
    "previewHeight": 240
  }
]

js_code = f"""
const metaCol1 = {json.dumps(meta_col1)};
const metaCol2 = {json.dumps(meta_col2)};

function formatCard(info) {{
  const card = Get(info.id);
  if (!card) return;
  Update(card.id, {{
    name: 'Example · ' + info.title,
    width: 'fill_container',
    fill: '#FFFFFF',
    cornerRadius: 8,
    stroke: '#0505050F',
    strokeWidth: 1,
    strokeAlignment: 'inner',
    layout: 'vertical',
    padding: 1,
    clip: false
  }});

  const preview = card.children[0];
  Update(preview.id, {{
    name: 'Dropdown example · ' + info.title,
    width: 'fill_container',
    height: info.previewHeight,
    layout: 'vertical',
    padding: 24,
    gap: 16,
    clip: false
  }});

  const meta = card.children[1];
  Update(meta.id, {{
    name: 'Example meta · ' + info.title,
    width: 'fill_container',
    layout: 'vertical',
    clip: false
  }});

  // Rebuild Meta children: Divider, Title Frame, Description
  for (const c of meta.children || []) {{
    Delete(c.id);
  }}

  Insert(meta.id, {{
    type: 'rectangle',
    name: 'Divider',
    fill: '#F0F0F0',
    width: 818,
    height: 1,
    layoutPosition: 'absolute',
    x: 0,
    y: 0
  }});

  Insert(meta.id, {{
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
      {{
        type: 'text',
        name: 'Example title',
        content: info.title,
        fontFamily: 'AlibabaSans',
        fontSize: 14,
        fontWeight: '500',
        fill: '#000000E0',
        lineHeight: 1,
        textAlignVertical: 'middle'
      }}
    ]
  }});

  Insert(meta.id, {{
    type: 'frame',
    name: 'Description',
    width: 'fill_container',
    layout: 'vertical',
    padding: [18, 24],
    children: [
      {{
        type: 'text',
        name: 'Text',
        content: info.desc,
        fontFamily: 'AlibabaSans',
        fontSize: 14,
        fontWeight: 'normal',
        fill: '#000000E0',
        lineHeight: 1.5714,
        width: 'fill_container',
        textGrowth: 'fixed-width'
      }}
    ]
  }});
}}

for (const info of metaCol1) formatCard(info);
for (const info of metaCol2) formatCard(info);
Print('Formatted all 17 cards');
"""

res = client.execute(js_code)
print(res['data']['result']['message'] if res.get('data', {}).get('result') else res)
