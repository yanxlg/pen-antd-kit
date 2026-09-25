import json
import sys

def build_card_master():
    return {
        "type": "frame",
        "id": "LSKNJ",
        "x": 24,
        "y": 72,
        "name": "Card",
        "context": "Ant Design Card container component. Header (Title + Extra) + Divider + Body Slot (children).",
        "reusable": True,
        "clip": True,
        "width": 360,
        "fill": "#FFFFFF",
        "cornerRadius": 8,
        "stroke": "#F0F0F0",
        "strokeWidth": 1,
        "strokeAlignment": "inner",
        "layout": "vertical",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Card",
                "category": "Data Display",
                "version": "6.6.4",
                "props": {
                    "title": "Card title",
                    "bordered": True,
                    "size": "default"
                }
            }
        },
        "children": [
            {
                "type": "frame",
                "id": "cardHeader",
                "name": "Card header",
                "width": "fill_container",
                "height": 56,
                "padding": [0, 24],
                "layout": "horizontal",
                "justifyContent": "space_between",
                "alignItems": "center",
                "children": [
                    {
                        "type": "text",
                        "id": "cardTitle",
                        "name": "Card title",
                        "fill": "#000000E0",
                        "content": "Card title",
                        "lineHeight": 1.5714,
                        "fontFamily": "Inter",
                        "fontSize": 16,
                        "fontWeight": "600",
                        "textAlignVertical": "middle"
                    },
                    {
                        "type": "text",
                        "id": "cardExtra",
                        "name": "Extra",
                        "fill": "#1677FF",
                        "content": "More",
                        "lineHeight": 1.5714,
                        "fontFamily": "Inter",
                        "fontSize": 14,
                        "fontWeight": "normal",
                        "textAlignVertical": "middle"
                    }
                ]
            },
            {
                "type": "rectangle",
                "id": "cardDivider",
                "name": "Header divider",
                "fill": "#F0F0F0",
                "width": "fill_container",
                "height": 1
            },
            {
                "type": "frame",
                "id": "cardBody",
                "name": "children",
                "context": "Card body content slot",
                "slot": [
                    "OGRzz",
                    "w8kBus",
                    "v9aLD",
                    "DQZzq",
                    "J9yjrH",
                    "panTp",
                    "aSadP",
                    "d7FAW"
                ],
                "width": "fill_container",
                "layout": "vertical",
                "padding": 24,
                "gap": 16,
                "children": [
                    {
                        "type": "text",
                        "id": "cardContentText",
                        "name": "Card content",
                        "fill": "#000000E0",
                        "content": "Card content",
                        "lineHeight": 1.5714,
                        "fontFamily": "Inter",
                        "fontSize": 14,
                        "fontWeight": "normal",
                        "textAlignVertical": "middle"
                    }
                ]
            }
        ]
    }

def get_skeleton_lines(width=672):
    return [
        {"type": "rectangle", "name": "Skeleton line 1", "width": round(width * 0.58), "height": 14, "cornerRadius": 7, "fill": "#0000000F"},
        {"type": "rectangle", "name": "Skeleton line 2", "width": round(width * 0.92), "height": 14, "cornerRadius": 7, "fill": "#0000000A"},
        {"type": "rectangle", "name": "Skeleton line 3", "width": round(width * 0.76), "height": 14, "cornerRadius": 7, "fill": "#0000000A"},
        {"type": "rectangle", "name": "Skeleton line 4", "width": round(width * 0.46), "height": 14, "cornerRadius": 7, "fill": "#0000000A"}
    ]

def convert_instance(inst):
    inputs = inst.get("inputs", {})
    desc = inst.get("descendants", {})
    
    title_raw = inputs.get("title", "")
    extra_raw = inputs.get("extra", "")
    children_raw = inputs.get("children", "")
    size = inputs.get("size", "default")
    variant = inputs.get("variant", "outlined")
    loading = inputs.get("loading", False)
    bordered = inputs.get("bordered", variant != "borderless")
    if variant == "borderless":
        bordered = False
        inst["stroke"] = "#00000000"
        inst["strokeWidth"] = 0
    
    props = {
        "bordered": bordered,
        "size": size,
        "loading": loading
    }
    
    # Handle header / title / extra
    has_title = False
    parsed_title = None
    if isinstance(title_raw, str) and title_raw.strip().startswith("{"):
        try:
            parsed_title = json.loads(title_raw)
            has_title = True
        except:
            has_title = bool(title_raw)
    elif title_raw:
        has_title = True
        
    if loading:
        desc["cardHeader"] = {"enabled": False}
        desc["cardDivider"] = {"enabled": False}
        pad = 12 if size == "small" else 24
        inst_w = inst.get("width", 720)
        usable_w = (inst_w if isinstance(inst_w, (int, float)) else 720) - pad * 2
        desc["cardBody"] = {
            "padding": pad,
            "gap": 14,
            "children": get_skeleton_lines(usable_w)
        }
    else:
        if not has_title:
            desc["cardHeader"] = {"enabled": False}
            desc["cardDivider"] = {"enabled": False}
        else:
            props["title"] = title_raw if not parsed_title else "Card title"
            header_override = {}
            if size == "small":
                header_override["height"] = 38
                header_override["padding"] = [0, 12]
            if parsed_title:
                header_override["children"] = [parsed_title]
                desc["cardHeader"] = header_override
            else:
                if header_override:
                    desc["cardHeader"] = header_override
                desc["cardTitle"] = {
                    "content": str(title_raw),
                    "fontSize": 14 if size == "small" else 16
                }
                
                # Extra
                if extra_raw:
                    parsed_extra = None
                    if isinstance(extra_raw, str) and extra_raw.strip().startswith("{"):
                        try:
                            parsed_extra = json.loads(extra_raw)
                        except:
                            pass
                    if parsed_extra:
                        header_children = desc.get("cardHeader", {}).get("children", [])
                        # or keep extra as is
                        props["extra"] = "More"
                    else:
                        props["extra"] = str(extra_raw)
                        desc["cardExtra"] = {
                            "content": str(extra_raw),
                            "fontSize": 14
                        }
                else:
                    desc["cardExtra"] = {"enabled": False}
                    
        # Handle Body
        body_pad = 12 if size == "small" else 24
        body_override = {"padding": body_pad}
        
        # Check children
        if children_raw:
            parsed_child = None
            if isinstance(children_raw, str) and children_raw.strip().startswith("{"):
                try:
                    parsed_child = json.loads(children_raw)
                except:
                    pass
            elif isinstance(children_raw, dict):
                parsed_child = children_raw
                
            if parsed_child:
                body_override["children"] = [parsed_child]
            else:
                # Text content
                body_override["children"] = [
                    {
                        "type": "text",
                        "name": "Card content",
                        "content": str(children_raw),
                        "fontSize": 14,
                        "lineHeight": 1.5714,
                        "fontFamily": "Inter",
                        "fill": "#000000E0",
                        "textAlignVertical": "middle"
                    }
                ]
        desc["cardBody"] = body_override
        
    inst["descendants"] = desc
    inst["metadata"] = {
        "type": "antd-component",
        "antd": {
            "component": "Card",
            "category": "Data Display",
            "version": "6.6.4",
            "props": props
        }
    }
    # Clean up old inputs now that it is a native frame instance
    if "inputs" in inst:
        del inst["inputs"]

def main():
    pen_path = "libraries/antd-6.lib.pen"
    with open(pen_path, "r", encoding="utf-8") as f:
        pen = json.load(f)
        
    # 1. Find and replace LSKNJ master
    found_master = False
    def replace_master(node):
        nonlocal found_master
        if not node:
            return
        if "children" in node:
            for idx, c in enumerate(node["children"]):
                if c.get("id") == "LSKNJ":
                    master = build_card_master()
                    master["x"] = c.get("x", 24)
                    master["y"] = c.get("y", 72)
                    node["children"][idx] = master
                    found_master = True
                    return
                replace_master(c)
                
    replace_master(pen)
    print("Master LSKNJ replaced:", found_master)
    
    # 2. Convert all instances of LSKNJ
    converted_count = 0
    def convert_all_instances(node):
        nonlocal converted_count
        if not node:
            return
        if node.get("ref") == "LSKNJ":
            convert_instance(node)
            converted_count += 1
        if "children" in node:
            for c in node["children"]:
                convert_all_instances(c)
                
    convert_all_instances(pen)
    print(f"Converted {converted_count} instances of Card to Slot Container pattern!")
    
    with open(pen_path, "w", encoding="utf-8") as f:
        json.dump(pen, f, ensure_ascii=False, indent=2)
    print("Successfully wrote updated libraries/antd-6.lib.pen!")

if __name__ == "__main__":
    main()
