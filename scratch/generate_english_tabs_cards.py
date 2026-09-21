import json

def make_divider(text):
    return {
        "type": "ref",
        "ref": "xi5QX",
        "name": f"Divider · {text}",
        "width": "fill_container",
        "height": 24,
        "inputs": {
            "children": text,
            "orientation": "horizontal",
            "titlePlacement": "left",
            "plain": True
        }
    }

def make_meta(title, desc):
    return {
        "type": "frame",
        "name": "Meta",
        "width": "fill_container",
        "layout": "vertical",
        "children": [
            {
                "type": "rectangle",
                "name": "Divider",
                "layoutPosition": "absolute",
                "x": 0,
                "y": 0,
                "width": 1646,
                "height": 1,
                "fill": "#F0F0F0"
            },
            {
                "type": "frame",
                "name": "Title Frame",
                "layoutPosition": "absolute",
                "x": 16,
                "y": -15,
                "height": 30,
                "fill": "#FFFFFF",
                "cornerRadius": [6, 6, 0, 0],
                "padding": [1, 8],
                "alignItems": "center",
                "children": [
                    {
                        "type": "text",
                        "name": "Title",
                        "content": title,
                        "fontFamily": "AlibabaSans",
                        "fontSize": 14,
                        "fontWeight": "500",
                        "fill": "#000000E0",
                        "lineHeight": 1,
                        "textAlignVertical": "middle"
                    }
                ]
            },
            {
                "type": "frame",
                "name": "Description",
                "width": "fill_container",
                "layout": "vertical",
                "padding": [18, 24, 18, 24],
                "children": [
                    {
                        "type": "text",
                        "name": "Text",
                        "content": desc,
                        "fontFamily": "AlibabaSans",
                        "fontSize": 14,
                        "fontWeight": "normal",
                        "fill": "#000000E0",
                        "lineHeight": 1.5714
                    }
                ]
            }
        ]
    }

def make_card(name, title, desc, preview_children):
    return {
        "type": "frame",
        "name": f"Card · {name}",
        "width": "fill_container",
        "layout": "vertical",
        "cornerRadius": 8,
        "stroke": "#0505050F",
        "strokeWidth": 1,
        "fill": "#FFFFFF",
        "children": [
            {
                "type": "frame",
                "name": "Preview",
                "width": "fill_container",
                "layout": "vertical",
                "padding": 24,
                "gap": 20,
                "children": preview_children
            },
            make_meta(title, desc)
        ]
    }

base_items_3 = [
    {"key": "1", "label": "Tab 1", "children": "Content of Tab Pane 1"},
    {"key": "2", "label": "Tab 2", "children": "Content of Tab Pane 2"},
    {"key": "3", "label": "Tab 3", "children": "Content of Tab Pane 3"}
]

cards = []

# 1. Basic
cards.append(make_card(
    "Basic", "Basic", "Default activate first tab.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Basic",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(base_items_3),
            "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top", "hideAdd": True
        }
    }]
))

# 2. Disabled
disabled_items = [
    {"key": "1", "label": "Tab 1", "children": "Content of Tab Pane 1"},
    {"key": "2", "label": "Tab 2", "disabled": True, "children": "Content of Tab Pane 2"},
    {"key": "3", "label": "Tab 3", "children": "Content of Tab Pane 3"}
]
cards.append(make_card(
    "Disabled", "Disabled", "Disabled a tab.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Disabled",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(disabled_items),
            "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top", "hideAdd": True
        }
    }]
))

# 3. Centered
cards.append(make_card(
    "Centered", "Centered", "Centered tabs.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Centered",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(base_items_3),
            "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top", "centered": True, "hideAdd": True
        }
    }]
))

# 4. Icon
icon_items = [
    {"key": "1", "label": "Tab 1", "icon": "AppleOutlined", "children": "Content of Tab Pane 1"},
    {"key": "2", "label": "Tab 2", "icon": "AndroidOutlined", "children": "Content of Tab Pane 2"},
    {"key": "3", "label": "Tab 3", "icon": "HeartOutlined", "children": "Content of Tab Pane 3"}
]
cards.append(make_card(
    "Icon", "Icon",
    "The Tab with Icon. icon also accepts a bare <svg> element from a third-party icon library, which stays vertically centred with the label.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Icon",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(icon_items),
            "activeKey": "2", "type": "line", "size": "middle", "tabPlacement": "top", "hideAdd": True
        }
    }]
))

# 5. Indicator (Multi-mode: align="center" vs align="start")
cards.append(make_card(
    "Indicator", "Indicator", "Set indicator prop to custom indicator size and align.",
    [
        make_divider('align="center"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Indicator Center",
            "width": "fill_container", "height": 84,
            "inputs": {
                "items": json.dumps(base_items_3),
                "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top",
                "indicatorAlign": "center", "indicatorSize": 24
            }
        },
        make_divider('align="start"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Indicator Start",
            "width": "fill_container", "height": 84,
            "inputs": {
                "items": json.dumps(base_items_3),
                "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top",
                "indicatorAlign": "start"
            }
        }
    ]
))

# 6. Slide (NO grouping label!)
slide_items = [{"key": str(i), "label": f"Tab-{i}", "children": f"Content of tab {i}"} for i in range(30)]
cards.append(make_card(
    "Slide", "Slide", "In order to fit in more tabs, they can slide left and right (or up and down).",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Slide",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(slide_items),
            "activeKey": "2", "type": "line", "size": "middle", "tabPlacement": "top"
        }
    }]
))

# 7. Extra content (Multi-mode: right action vs left & right actions)
btn_script_right = {"type": "script", "name": "Button", "scriptUri": "../canvas-components/Button.js", "inputs": {"children": "Extra Action", "type": "default"}}
btn_script_left = {"type": "script", "name": "Button", "scriptUri": "../canvas-components/Button.js", "inputs": {"children": "Left Action", "type": "default"}}
btn_script_right2 = {"type": "script", "name": "Button", "scriptUri": "../canvas-components/Button.js", "inputs": {"children": "Right Action", "type": "default"}}

cards.append(make_card(
    "Extra content", "Extra content",
    "You can add extra actions to the right or left or even both side of Tabs.",
    [
        make_divider('tabBarExtraContent="Right Action"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Extra Right",
            "width": "fill_container", "height": 84,
            "inputs": {
                "items": json.dumps(base_items_3),
                "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top",
                "extraEnd": json.dumps(btn_script_right), "extraEndWidth": 100
            }
        },
        make_divider('tabBarExtraContent={{ left, right }}'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Extra Both",
            "width": "fill_container", "height": 84,
            "inputs": {
                "items": json.dumps(base_items_3),
                "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top",
                "extraStart": json.dumps(btn_script_left), "extraStartWidth": 100, "extraStartMargin": 16,
                "extraEnd": json.dumps(btn_script_right2), "extraEndWidth": 100, "extraEndMargin": 16
            }
        }
    ]
))

# 8. Size (Multi-mode: small, middle, large with Dividers)
cards.append(make_card(
    "Size", "Size",
    "Large size tabs are usually used in page header, and small size could be used in Modal.",
    [
        make_divider('size="small"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Small Line",
            "width": "fill_container", "height": 76,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "line", "size": "small", "tabPlacement": "top"}
        },
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Small Card",
            "width": "fill_container", "height": 70,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "card", "size": "small", "tabPlacement": "top"}
        },
        make_divider('size="middle"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Middle Line",
            "width": "fill_container", "height": 84,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top"}
        },
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Middle Card",
            "width": "fill_container", "height": 78,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "card", "size": "middle", "tabPlacement": "top"}
        },
        make_divider('size="large"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Large Line",
            "width": "fill_container", "height": 94,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "line", "size": "large", "tabPlacement": "top"}
        }
    ]
))

# 9. Placement (Multi-mode: start, top, bottom with Dividers)
cards.append(make_card(
    "Placement", "Placement",
    "Tab's placement: start, end, top or bottom. Will auto switch to top in mobile.",
    [
        make_divider('tabPlacement="start"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Start",
            "width": "fill_container", "height": 146,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "line", "tabPlacement": "start"}
        },
        make_divider('tabPlacement="top"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Top",
            "width": "fill_container", "height": 84,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "line", "tabPlacement": "top"}
        },
        make_divider('tabPlacement="bottom"'),
        {
            "type": "ref", "ref": "acxPC", "name": "Tabs · Bottom",
            "width": "fill_container", "height": 84,
            "inputs": {"items": json.dumps(base_items_3), "activeKey": "1", "type": "line", "tabPlacement": "bottom"}
        }
    ]
))

# 10. Custom Popup Search (NO grouping label!)
popup_items = [{"key": str(i), "label": f"Tab-{i}", "children": f"Content of tab {i}"} for i in range(20)]
cards.append(make_card(
    "Custom Popup Search", "Custom Popup Search",
    "Customize the Tabs more dropdown menu via popupRender prop, supporting search and keyboard navigation.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Popup Search",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(popup_items),
            "activeKey": "2", "type": "line", "size": "middle", "tabPlacement": "top"
        }
    }]
))

# 11. Card type tab
cards.append(make_card(
    "Card type tab", "Card type tab",
    "Another type of Tabs, which doesn't support vertical mode.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Card",
        "width": "fill_container", "height": 78,
        "inputs": {
            "items": json.dumps(base_items_3),
            "activeKey": "1", "type": "card", "size": "middle", "tabPlacement": "top", "hideAdd": True
        }
    }]
))

# 12. Add & close tab
editable_items = [
    {"key": "1", "label": "Tab 1", "closable": True, "children": "Content of Tab 1"},
    {"key": "2", "label": "Tab 2", "closable": True, "children": "Content of Tab 2"},
    {"key": "3", "label": "Tab 3", "closable": False, "children": "Content of Tab 3 (closable: false)"}
]
cards.append(make_card(
    "Add & close tab", "Add & close tab",
    "Only card type Tabs support adding & closable. Use closable={false} to disable close.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Editable Card",
        "width": "fill_container", "height": 78,
        "inputs": {
            "items": json.dumps(editable_items),
            "activeKey": "1", "type": "editable-card", "size": "middle", "tabPlacement": "top", "hideAdd": False
        }
    }]
))

# 13. Customized trigger of new tab
cards.append(make_card(
    "Customized trigger of new tab", "Customized trigger of new tab",
    "Hide default plus icon, and bind event for customized trigger.",
    [
        {
            "type": "frame",
            "name": "Add Trigger Toolbar",
            "layout": "horizontal",
            "alignItems": "center",
            "gap": 12,
            "children": [
                {
                    "type": "ref",
                    "ref": "DQZzq",
                    "name": "Button",
                    "width": 80,
                    "height": 32,
                    "inputs": {"children": "+ ADD", "type": "default"}
                }
            ]
        },
        {
            "type": "ref",
            "ref": "acxPC",
            "name": "Tabs · Customized trigger",
            "width": "fill_container",
            "height": 78,
            "inputs": {
                "items": json.dumps([
                    {"key": "1", "label": "Tab 1", "closable": True, "children": "Content of Tab Pane 1"},
                    {"key": "2", "label": "Tab 2", "closable": True, "children": "Content of Tab Pane 2"}
                ]),
                "activeKey": "1", "type": "editable-card", "size": "middle", "tabPlacement": "top", "hideAdd": True
            }
        }
    ]
))

# 14. Customized bar of tab (NO grouping label!)
cards.append(make_card(
    "Customized bar of tab", "Customized bar of tab",
    "Use react-sticky-box and renderTabBar.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Customized bar",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(base_items_3),
            "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top"
        }
    }]
))

# 15. Draggable Tabs (NO grouping label!)
cards.append(make_card(
    "Draggable Tabs", "Draggable Tabs",
    "Use dnd-kit to make tabs draggable.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Draggable",
        "width": "fill_container", "height": 84,
        "inputs": {
            "items": json.dumps(base_items_3),
            "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top"
        }
    }]
))

# 16. Custom semantic dom styling (NO grouping label! Exactly as in user screenshot!)
cards.append(make_card(
    "Custom semantic dom styling", "Custom semantic dom styling",
    "You can customize the semantic dom style of Tabs by passing objects/functions through classNames and styles.",
    [{
        "type": "ref", "ref": "acxPC", "name": "Tabs · Semantic Style",
        "width": "fill_container", "height": 120,
        "inputs": {
            "items": json.dumps(base_items_3),
            "activeKey": "1", "type": "line", "size": "middle", "tabPlacement": "top",
            "styles": json.dumps({"root": {"borderWidth": 2, "borderStyle": "dashed", "borderColor": "#1677FF", "padding": 16}})
        }
    }]
))

print(f"Total cards generated: {len(cards)}")

# Save part 1 (1-8) and part 2 (9-16)
with open("scratch/en_cards_part1.json", "w") as f:
    json.dump(cards[:8], f, ensure_ascii=False, indent=2)

with open("scratch/en_cards_part2.json", "w") as f:
    json.dump(cards[8:], f, ensure_ascii=False, indent=2)

print("Saved scratch/en_cards_part1.json and scratch/en_cards_part2.json")
