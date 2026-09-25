import json
import re

# Load library file
file_path = "libraries/antd-6.lib.pen"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

def find_node(node, target_id):
    if isinstance(node, dict):
        if node.get("id") == target_id: return node
        for v in node.values():
            r = find_node(v, target_id)
            if r: return r
    elif isinstance(node, list):
        for item in node:
            r = find_node(item, target_id)
            if r: return r
    return None

# Definitions for each of the 4 templates
TEMPLATE_CONFIGS = {
    "H7JWwU": {
        "title": "Standard List Page · 1920 × 1080",
        "subtitle": "Standard query and management layout for a primary dataset",
        "desc": "Imported from Error Code Management. Preserves the real filter bar, list toolbar, table, pagination, and row actions.",
        "useWhen": "Managing one primary dataset with query and row actions",
        "includes": "Filters, create action, table, fixed actions, and pagination",
        "setup": "Nest in App Shell Page Body Slot, bind filter fields and table columns",
        "frameId": "CwWNg",
        "restorePadding": 16
    },
    "GpMuP": {
        "title": "Split Tabs Page · 1920 × 1080",
        "subtitle": "Continuous master-detail and multi-tab configuration layout",
        "desc": "Imported from App Configuration. Preserves the module catalog, configuration tabs, filters, table, and pagination.",
        "useWhen": "Left context remains visible while right side provides parallel work areas",
        "includes": "Master catalog, search bar, workspace tabs, filters, and data table",
        "setup": "Nest in App Shell Page Body Slot, bind catalog list and tab data",
        "frameId": "l0UmSc",
        "restorePadding": 16
    },
    "SJ7jd": {
        "title": "Drawer Detail · 1920 × 1080",
        "subtitle": "Context-preserving read-only detail overlay",
        "desc": "Imported from the real View Error Code state. Preserves the source page, transparent mask, read-only details, languages, and preview.",
        "useWhen": "Viewing read-only details without leaving current list or workspace context",
        "includes": "Transparent mask, drawer header, content slot, tabs, and close action",
        "setup": "Triggered from list row action, fill Drawer Content Slot with read-only details",
        "frameId": "d29wmW",
        "restorePadding": None
    },
    "C0P3Wo": {
        "title": "Drawer Form · 1920 × 1080",
        "subtitle": "Context-preserving entity creation and edit form overlay",
        "desc": "Imported from the real Create Error Code state. Preserves the source page, transparent mask, form fields, language editing, preview, and footer actions.",
        "useWhen": "Creating or editing entities that need to retain the source list context",
        "includes": "Transparent mask, drawer header, form slot, scroll body, and footer actions",
        "setup": "Triggered by create/edit button, fill Drawer Content Slot with form items",
        "frameId": "ckiVf",
        "restorePadding": None
    }
}

for artboard_id, cfg in TEMPLATE_CONFIGS.items():
    ab = find_node(data, artboard_id)
    if not ab:
        print(f"Artboard {artboard_id} not found!")
        continue
    
    print(f"\nProcessing {artboard_id}: {ab.get('name')}")
    
    # 1. Update Title node (turn into frame with title + subtitle)
    children = ab.get("children", [])
    title_node = None
    for c in children:
        if c.get("name", "").startswith("Title"):
            title_node = c
            break
    
    new_title_node = {
        "type": "frame",
        "id": title_node.get("id") if title_node else f"title-{artboard_id}",
        "x": 0,
        "y": 0,
        "name": "Title · 标题",
        "width": 1440,
        "height": 59,
        "alignItems": "center",
        "children": [
            {
                "type": "frame",
                "id": f"tg-{artboard_id}",
                "name": "标题组",
                "height": 59,
                "alignItems": "center",
                "children": [
                    {
                        "type": "frame",
                        "id": f"tt-{artboard_id}",
                        "name": "标题文字",
                        "layout": "vertical",
                        "gap": 2,
                        "children": [
                            {
                                "type": "text",
                                "id": f"title-t-{artboard_id}",
                                "name": "模板标题",
                                "fill": "#ffffff",
                                "content": cfg["title"],
                                "fontFamily": "Roboto",
                                "fontSize": 26,
                                "fontWeight": "700"
                            },
                            {
                                "type": "text",
                                "id": f"subtitle-t-{artboard_id}",
                                "name": "模板副标题",
                                "fill": "#bfbfbf",
                                "content": cfg["subtitle"],
                                "fontFamily": "Roboto",
                                "fontSize": 13,
                                "fontWeight": "normal"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    if title_node:
        idx = children.index(title_node)
        children[idx] = new_title_node
    else:
        children.insert(0, new_title_node)
        
    # 2. Update Description node
    desc_node = None
    for c in children:
        if c.get("name", "").startswith("Description"):
            desc_node = c
            break
    if desc_node:
        desc_node["x"] = 0
        desc_node["y"] = 68
        desc_node["width"] = 1440
        desc_node["content"] = cfg["desc"]
        desc_node["fill"] = "#bfbfbf"
        desc_node["fontSize"] = 14
        desc_node["lineHeight"] = 1.55
        desc_node["textGrowth"] = "fixed-width"
        
    # 3. Update Scenario node
    sc_node = None
    for c in children:
        if c.get("name", "").startswith("Scenario"):
            sc_node = c
            break
    new_scenario_node = {
        "type": "frame",
        "id": sc_node.get("id") if sc_node else f"sc-{artboard_id}",
        "x": 0,
        "y": 105,
        "name": "Scenario · 适用场景",
        "width": 456,
        "height": 40,
        "fill": "#00000000",
        "layout": "vertical",
        "gap": 3,
        "children": [
            {
                "type": "text",
                "id": f"sc-title-{artboard_id}",
                "name": "适用场景标题",
                "fill": "#69b1ff",
                "content": "Use when",
                "fontFamily": "Roboto",
                "fontSize": 12,
                "fontWeight": "600"
            },
            {
                "type": "text",
                "id": f"sc-content-{artboard_id}",
                "name": "适用场景内容",
                "fill": "#d9d9d9",
                "content": cfg["useWhen"],
                "fontFamily": "Roboto",
                "fontSize": 13,
                "fontWeight": "normal"
            }
        ]
    }
    if sc_node:
        idx = children.index(sc_node)
        children[idx] = new_scenario_node
    else:
        children.append(new_scenario_node)
        
    # 4. Update Functions node
    fn_node = None
    for c in children:
        if c.get("name", "").startswith("Functions"):
            fn_node = c
            break
    new_fn_node = {
        "type": "frame",
        "id": fn_node.get("id") if fn_node else f"fn-{artboard_id}",
        "x": 468,
        "y": 105,
        "name": "Functions · 核心功能",
        "width": 456,
        "height": 40,
        "fill": "#00000000",
        "layout": "vertical",
        "gap": 3,
        "children": [
            {
                "type": "text",
                "id": f"fn-title-{artboard_id}",
                "name": "核心功能标题",
                "fill": "#69b1ff",
                "content": "Includes",
                "fontFamily": "Roboto",
                "fontSize": 12,
                "fontWeight": "600"
            },
            {
                "type": "text",
                "id": f"fn-content-{artboard_id}",
                "name": "核心功能内容",
                "fill": "#d9d9d9",
                "content": cfg["includes"],
                "fontFamily": "Roboto",
                "fontSize": 13,
                "fontWeight": "normal"
            }
        ]
    }
    if fn_node:
        idx = children.index(fn_node)
        children[idx] = new_fn_node
    else:
        children.append(new_fn_node)
        
    # 5. Add / Update Usage node
    us_node = None
    for c in children:
        if c.get("name", "").startswith("Usage"):
            us_node = c
            break
    new_us_node = {
        "type": "frame",
        "id": us_node.get("id") if us_node else f"usage-{artboard_id}",
        "x": 936,
        "y": 105,
        "name": "Usage · 使用方式",
        "width": 456,
        "height": 40,
        "fill": "#00000000",
        "layout": "vertical",
        "gap": 3,
        "children": [
            {
                "type": "text",
                "id": f"us-title-{artboard_id}",
                "name": "使用方式标题",
                "fill": "#69b1ff",
                "content": "Setup",
                "fontFamily": "Roboto",
                "fontSize": 12,
                "fontWeight": "600"
            },
            {
                "type": "text",
                "id": f"us-content-{artboard_id}",
                "name": "使用方式内容",
                "fill": "#d9d9d9",
                "content": cfg["setup"],
                "fontFamily": "Roboto",
                "fontSize": 13,
                "fontWeight": "normal"
            }
        ]
    }
    if us_node:
        idx = children.index(us_node)
        children[idx] = new_us_node
    else:
        fn_idx = children.index(new_fn_node)
        children.insert(fn_idx + 1, new_us_node)
        
    # 6. Update Frame y position to 160
    frame_node = find_node(data, cfg["frameId"])
    if frame_node:
        frame_node["y"] = 160
        if cfg["restorePadding"] is not None:
            frame_node["padding"] = cfg["restorePadding"]
        print(f"Updated frame {cfg['frameId']} to y=160, padding={frame_node.get('padding')}")

    # 7. Update Anchors and Guides (+20px on y)
    for c in children:
        cname = c.get("name", "")
        ctype = c.get("type", "")
        if ctype == "rectangle" and "Anchor" in cname:
            old_y = c.get("y", 0)
            c["y"] = old_y + 20
            print(f"  Anchor {c.get('id')} ({cname}) y: {old_y} -> {c['y']}")
            
        elif ctype == "path" and "Guide" in cname:
            old_y = c.get("y", 0)
            geom = c.get("geometry", "")
            h = c.get("height", 0)
            w = c.get("width", 0)
            
            if "M0 0l" in geom:
                # Downward or flat
                c["y"] = old_y + 20
                m = re.match(r"M0 0l(\d+(?:\.\d+)?) 0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) 0", geom)
                if m:
                    dx1, dy, dx2 = float(m.group(1)), float(m.group(2)), float(m.group(3))
                    if dy > 0:
                        new_dy = dy - 20
                        new_h = h - 20
                        new_geom = f"M0 0l{int(dx1) if dx1.is_integer() else dx1} 0 0 {int(new_dy) if new_dy.is_integer() else new_dy} {int(dx2) if dx2.is_integer() else dx2} 0"
                        c["geometry"] = new_geom
                        c["height"] = int(new_h) if float(new_h).is_integer() else new_h
                        c["viewBox"] = [0, 0, w, c["height"]]
                        print(f"  Guide {c.get('id')} downward: h {h}->{c['height']}, geom {geom} -> {new_geom}")
                    else:
                        print(f"  Guide {c.get('id')} flat: y {old_y}->{c['y']}")
            else:
                # Upward: M0 <h>l... 0 -<dy> ...
                m = re.match(r"M0 (\d+(?:\.\d+)?)l(\d+(?:\.\d+)?) 0 0 -?(\d+(?:\.\d+)?) (\d+(?:\.\d+)?) 0", geom)
                if m:
                    init_y, dx1, dy, dx2 = float(m.group(1)), float(m.group(2)), float(m.group(3)), float(m.group(4))
                    new_init_y = init_y + 20
                    new_dy = dy + 20
                    new_h = h + 20
                    c["y"] = old_y  # Keep top y!
                    c["height"] = int(new_h) if float(new_h).is_integer() else new_h
                    new_geom = f"M0 {int(new_init_y) if new_init_y.is_integer() else new_init_y}l{int(dx1) if dx1.is_integer() else dx1} 0 0 -{int(new_dy) if new_dy.is_integer() else new_dy} {int(dx2) if dx2.is_integer() else dx2} 0"
                    c["geometry"] = new_geom
                    c["viewBox"] = [0, 0, w, c["height"]]
                    print(f"  Guide {c.get('id')} upward: h {h}->{c['height']}, geom {geom} -> {new_geom}")

# Save updated library file
with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)

print("\nSuccessfully updated libraries/antd-6.lib.pen on disk!")
