import json
from scripts.pen_mcp import PenMCP

cards_data = [
    # Card 1: Horizontal Light
    {
        "name": "Menu · Horizontal (Light)",
        "title": "Horizontal (Light)",
        "width": 800,
        "height": 46,
        "inputs": {
            "items": json.dumps([
                {"key": "mail", "label": "Navigation One", "icon": "MailOutlined"},
                {"key": "app", "disabled": True, "label": "Navigation Two", "icon": "AppstoreOutlined"},
                {"key": "SubMenu", "label": "Navigation Three - Submenu", "icon": "SettingOutlined", "children": [
                    {"type": "group", "label": "Item 1", "children": [
                        {"key": "setting:1", "label": "Option 1"},
                        {"key": "setting:2", "label": "Option 2"}
                    ]},
                    {"type": "group", "label": "Item 2", "children": [
                        {"key": "setting:3", "label": "Option 3"},
                        {"key": "setting:4", "label": "Option 4"}
                    ]}
                ]},
                {"key": "alipay", "label": "Navigation Four - Link"}
            ]),
            "selectedKeys": json.dumps(["mail"]),
            "openKeys": json.dumps([]),
            "mode": "horizontal",
            "theme": "light",
            "inlineCollapsed": False
        }
    },
    # Card 2: Horizontal Dark
    {
        "name": "Menu · Horizontal (Dark)",
        "title": "Horizontal (Dark)",
        "width": 800,
        "height": 46,
        "inputs": {
            "items": json.dumps([
                {"key": "mail", "label": "Navigation One", "icon": "MailOutlined"},
                {"key": "app", "disabled": True, "label": "Navigation Two", "icon": "AppstoreOutlined"},
                {"key": "SubMenu", "label": "Navigation Three - Submenu", "icon": "SettingOutlined", "children": [
                    {"type": "group", "label": "Item 1", "children": [
                        {"key": "setting:1", "label": "Option 1"},
                        {"key": "setting:2", "label": "Option 2"}
                    ]},
                    {"type": "group", "label": "Item 2", "children": [
                        {"key": "setting:3", "label": "Option 3"},
                        {"key": "setting:4", "label": "Option 4"}
                    ]}
                ]},
                {"key": "alipay", "label": "Navigation Four - Link"}
            ]),
            "selectedKeys": json.dumps(["mail"]),
            "openKeys": json.dumps([]),
            "mode": "horizontal",
            "theme": "dark",
            "inlineCollapsed": False
        }
    },
    # Card 3: Inline Default
    {
        "name": "Menu · Inline (Default)",
        "title": "Inline (Default)",
        "width": 256,
        "height": 450,
        "inputs": {
            "items": json.dumps([
                {"key": "sub1", "label": "Navigation One", "icon": "MailOutlined", "children": [
                    {"key": "g1", "type": "group", "label": "Item 1", "children": [
                        {"key": "1", "label": "Option 1"},
                        {"key": "2", "label": "Option 2"}
                    ]},
                    {"key": "g2", "type": "group", "label": "Item 2", "children": [
                        {"key": "3", "label": "Option 3"},
                        {"key": "4", "label": "Option 4"}
                    ]}
                ]},
                {"key": "sub2", "label": "Navigation Two", "icon": "AppstoreOutlined", "children": [
                    {"key": "5", "label": "Option 5"},
                    {"key": "6", "label": "Option 6"},
                    {"key": "sub3", "label": "Submenu", "children": [
                        {"key": "7", "label": "Option 7"},
                        {"key": "8", "label": "Option 8"}
                    ]}
                ]},
                {"type": "divider"},
                {"key": "sub4", "label": "Navigation Three", "icon": "SettingOutlined", "children": [
                    {"key": "9", "label": "Option 9"},
                    {"key": "10", "label": "Option 10"},
                    {"key": "11", "label": "Option 11"},
                    {"key": "12", "label": "Option 12"}
                ]},
                {"key": "grp", "type": "group", "label": "Group", "children": [
                    {"key": "13", "label": "Option 13"},
                    {"key": "14", "label": "Option 14"}
                ]}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps(["sub1"]),
            "mode": "inline",
            "theme": "light",
            "inlineCollapsed": False
        }
    },
    # Card 4: Inline Multi-level
    {
        "name": "Menu · Inline (Multi-level)",
        "title": "Inline (Multi-level)",
        "width": 256,
        "height": 420,
        "inputs": {
            "items": json.dumps([
                {"key": "1", "icon": "MailOutlined", "label": "Navigation One"},
                {"key": "2", "icon": "CalendarOutlined", "label": "Navigation Two"},
                {"key": "sub1", "icon": "AppstoreOutlined", "label": "Navigation Two", "children": [
                    {"key": "3", "label": "Option 3"},
                    {"key": "4", "label": "Option 4"},
                    {"key": "sub1-2", "label": "Submenu", "children": [
                        {"key": "5", "label": "Option 5"},
                        {"key": "6", "label": "Option 6"}
                    ]}
                ]},
                {"key": "sub2", "icon": "SettingOutlined", "label": "Navigation Three", "children": [
                    {"key": "7", "label": "Option 7"},
                    {"key": "8", "label": "Option 8"},
                    {"key": "9", "label": "Option 9"},
                    {"key": "10", "label": "Option 10"}
                ]},
                {"key": "link", "icon": "LinkOutlined", "label": "Ant Design"}
            ]),
            "selectedKeys": json.dumps(["5"]),
            "openKeys": json.dumps(["sub1", "sub1-2"]),
            "mode": "inline",
            "theme": "light",
            "inlineCollapsed": False
        }
    },
    # Card 5: Collapsed Light
    {
        "name": "Menu · Collapsed (Light)",
        "title": "Collapsed (Light)",
        "width": 80,
        "height": 260,
        "inputs": {
            "items": json.dumps([
                {"key": "1", "icon": "PieChartOutlined", "label": "Option 1"},
                {"key": "2", "icon": "DesktopOutlined", "label": "Option 2"},
                {"key": "3", "icon": "ContainerOutlined", "label": "Option 3"},
                {"key": "sub1", "icon": "MailOutlined", "label": "Navigation One", "children": [
                    {"key": "5", "label": "Option 5"},
                    {"key": "6", "label": "Option 6"}
                ]},
                {"key": "sub2", "icon": "AppstoreOutlined", "label": "Navigation Two", "children": [
                    {"key": "9", "label": "Option 9"},
                    {"key": "10", "label": "Option 10"}
                ]}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps([]),
            "mode": "inline",
            "theme": "light",
            "inlineCollapsed": True
        }
    },
    # Card 6: Collapsed Dark
    {
        "name": "Menu · Collapsed (Dark)",
        "title": "Collapsed (Dark)",
        "width": 80,
        "height": 260,
        "inputs": {
            "items": json.dumps([
                {"key": "1", "icon": "PieChartOutlined", "label": "Option 1"},
                {"key": "2", "icon": "DesktopOutlined", "label": "Option 2"},
                {"key": "3", "icon": "ContainerOutlined", "label": "Option 3"},
                {"key": "sub1", "icon": "MailOutlined", "label": "Navigation One", "children": [
                    {"key": "5", "label": "Option 5"},
                    {"key": "6", "label": "Option 6"}
                ]},
                {"key": "sub2", "icon": "AppstoreOutlined", "label": "Navigation Two", "children": [
                    {"key": "9", "label": "Option 9"},
                    {"key": "10", "label": "Option 10"}
                ]}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps([]),
            "mode": "inline",
            "theme": "dark",
            "inlineCollapsed": True
        }
    },
    # Card 7: Vertical Right Arrow
    {
        "name": "Menu · Vertical (Right arrow)",
        "title": "Vertical (Right arrow)",
        "width": 256,
        "height": 160,
        "inputs": {
            "items": json.dumps([
                {"key": "sub1", "icon": "MailOutlined", "label": "Navigation One", "children": [
                    {"key": "1", "label": "Option 1"},
                    {"key": "2", "label": "Option 2"}
                ]},
                {"key": "sub2", "icon": "AppstoreOutlined", "label": "Navigation Two", "children": [
                    {"key": "3", "label": "Option 3"},
                    {"key": "4", "label": "Option 4"}
                ]},
                {"key": "link", "icon": "LinkOutlined", "label": "Ant Design"}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps([]),
            "mode": "vertical",
            "theme": "light",
            "inlineCollapsed": False
        }
    },
    # Card 8: Vertical with Submenu Popup
    {
        "name": "Menu · Vertical with Submenu Popup",
        "title": "Vertical with Submenu Popup",
        "width": 480,
        "height": 170,
        "inputs": {
            "items": json.dumps([
                {"key": "sub1", "icon": "MailOutlined", "label": "Navigation One", "children": [
                    {"key": "1", "label": "Option 1"},
                    {"key": "2", "label": "Option 2"},
                    {"key": "3", "label": "Option 3"}
                ]},
                {"key": "5", "label": "Option 5"},
                {"key": "6", "label": "Option 6"}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps(["sub1"]),
            "mode": "vertical",
            "theme": "light",
            "inlineCollapsed": False
        }
    },
    # Card 9: Sub-menu Theme
    {
        "name": "Menu · Sub-menu theme",
        "title": "Sub-menu theme (Dark root + Light submenu)",
        "width": 480,
        "height": 170,
        "inputs": {
            "items": json.dumps([
                {"key": "sub1", "icon": "MailOutlined", "label": "Navigation One", "theme": "light", "children": [
                    {"key": "1", "label": "Option 1"},
                    {"key": "2", "label": "Option 2"},
                    {"key": "3", "label": "Option 3"}
                ]},
                {"key": "5", "label": "Option 5"},
                {"key": "6", "label": "Option 6"}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps(["sub1"]),
            "mode": "vertical",
            "theme": "dark",
            "inlineCollapsed": False
        }
    },
    # Card 10: Dark Inline Theme
    {
        "name": "Menu · Dark Inline Theme",
        "title": "Dark Inline Theme",
        "width": 256,
        "height": 400,
        "inputs": {
            "items": json.dumps([
                {"key": "sub1", "label": "Navigation One", "icon": "MailOutlined", "children": [
                    {"key": "1", "label": "Option 1"},
                    {"key": "2", "label": "Option 2"},
                    {"key": "3", "label": "Option 3"},
                    {"key": "4", "label": "Option 4"}
                ]},
                {"key": "sub2", "label": "Navigation Two", "icon": "AppstoreOutlined", "children": [
                    {"key": "5", "label": "Option 5"},
                    {"key": "6", "label": "Option 6"},
                    {"key": "sub3", "label": "Submenu", "children": [
                        {"key": "7", "label": "Option 7"},
                        {"key": "8", "label": "Option 8"}
                    ]}
                ]},
                {"key": "sub4", "label": "Navigation Three", "icon": "SettingOutlined", "children": [
                    {"key": "9", "label": "Option 9"},
                    {"key": "10", "label": "Option 10"},
                    {"key": "11", "label": "Option 11"},
                    {"key": "12", "label": "Option 12"}
                ]}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps(["sub1"]),
            "mode": "inline",
            "theme": "dark",
            "inlineCollapsed": False
        }
    },
    # Card 11: Item States
    {
        "name": "Menu · Item States",
        "title": "Item States (Default, Selected, Disabled, Danger)",
        "width": 256,
        "height": 184,
        "inputs": {
            "items": json.dumps([
                {"key": "default", "label": "Default Item", "icon": "MailOutlined"},
                {"key": "selected", "label": "Selected Item", "icon": "CheckCircleOutlined"},
                {"key": "disabled", "disabled": True, "label": "Disabled Item", "icon": "StopOutlined"},
                {"key": "danger", "danger": True, "label": "Danger Item", "icon": "DeleteOutlined"}
            ]),
            "selectedKeys": json.dumps(["selected"]),
            "openKeys": json.dumps([]),
            "mode": "inline",
            "theme": "light",
            "inlineCollapsed": False
        }
    },
    # Card 12: Custom Semantic Styling (Border & Pill)
    {
        "name": "Menu · Custom Semantic Styling (Border & Pill)",
        "title": "Custom Semantic Styling (Border & Pill)",
        "width": 256,
        "height": 180,
        "inputs": {
            "items": json.dumps([
                {"key": "SubMenu", "label": "Navigation One", "children": [
                    {"key": "g1", "label": "Item 1", "type": "group", "children": [
                        {"key": "1", "label": "Option 1"},
                        {"key": "2", "label": "Option 2"}
                    ]}
                ]},
                {"key": "mail", "label": "Navigation Two"}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps(["SubMenu"]),
            "mode": "inline",
            "theme": "light",
            "styles": json.dumps({"root": {"border": "1px solid #f0f0f0", "padding": 8, "borderRadius": 8}, "item": {"color": "#1677ff"}})
        }
    },
    # Card 13: Custom Semantic Styling (Soft Background)
    {
        "name": "Menu · Custom Semantic Styling (Soft Background)",
        "title": "Custom Semantic Styling (Soft Background)",
        "width": 256,
        "height": 180,
        "inputs": {
            "items": json.dumps([
                {"key": "SubMenu", "label": "Navigation One", "children": [
                    {"key": "g1", "label": "Item 1", "type": "group", "children": [
                        {"key": "1", "label": "Option 1"},
                        {"key": "2", "label": "Option 2"}
                    ]}
                ]},
                {"key": "mail", "label": "Navigation Two"}
            ]),
            "selectedKeys": json.dumps(["1"]),
            "openKeys": json.dumps(["SubMenu"]),
            "mode": "inline",
            "theme": "light",
            "styles": json.dumps({"root": {"backgroundColor": "rgba(240,249,255, 0.6)", "border": "1px solid #bae0ff", "padding": 8, "borderRadius": 8}})
        }
    }
]

def main():
    m = PenMCP()
    
    # 1. Clean existing cards 1 to 5 from container K7DUEK
    clean_code = """
const container = Get("K7DUEK");
const toDelete = container.children.slice(1).map(c => c.id);
for (const id of toDelete) {
    Delete(id);
}
Print("Deleted previous configured cards:", toDelete.length);
"""
    res1 = m.execute(clean_code)
    print(res1["data"].get("result", {}).get("message") or res1["data"].get("error"))
    
    # 2. Insert the 13 cards using type: "ref", ref: "jaNIi"
    insert_lines = ["const container = 'K7DUEK';"]
    for i, c in enumerate(cards_data):
        card_var = f"card_{i}"
        insert_lines.append(f"""
const {card_var} = Insert(container, {{
    type: "frame",
    name: {json.dumps(c['name'])},
    width: 1664,
    layout: "vertical",
    padding: 24,
    gap: 16,
    stroke: "#f0f0f0",
    strokeWidth: 1,
    cornerRadius: 8
}});
Insert({card_var}, {{
    type: "text",
    name: "State",
    content: {json.dumps(c['title'])},
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600",
    fill: "#000000e0",
    textGrowth: "fixed-width",
    width: "fill_container",
    lineHeight: 1.5714
}});
Insert({card_var}, {{
    type: "ref",
    ref: "jaNIi",
    name: {json.dumps(c['name'])},
    width: {c['width']},
    height: {c['height']},
    inputs: {json.dumps(c['inputs'])}
}});
""")
    insert_lines.append("Print('Inserted all 13 configured cards!');")
    
    res2 = m.execute("\n".join(insert_lines))
    print(res2["data"].get("result", {}).get("message") or res2["data"].get("error"))

    # 3. Calculate heights and update artboard
    calc_code = """
const container = Get("K7DUEK");
let totalH = 0;
for (let i = 0; i < container.children.length; i++) {
    const c = container.children[i];
    Get(c.id, (n, ctx) => {
        if (n.id === c.id) {
            totalH += ctx.bounds.height;
        }
    });
}
const gapTotal = (container.children.length - 1) * 24;
const containerH = totalH + gapTotal;
const boardH = 160 + containerH + 40;
const section = Get("section-menu");
const targetSectionH = Math.max(section.height, 90 + boardH + 50);

Update("K7DUEK", { height: containerH });
Update("artboard-menu-components", { height: boardH });
Update("section-menu", { height: targetSectionH });
Update("layer-navigation", { height: Math.max(6017, targetSectionH) });

Print(JSON.stringify({
    cardsCount: container.children.length,
    containerH,
    boardH,
    targetSectionH
}));
"""
    res3 = m.execute(calc_code)
    print(res3["data"].get("result", {}).get("message") or res3["data"].get("error"))
    m.close()

if __name__ == "__main__":
    main()
