import json
import os
import sys
import uuid

def gen_id():
    return uuid.uuid4().hex[:6]

def create_form_item(label, ctype="input", placeholder=None, options=None, size="middle", label_width=None, required=False):
    ctrl_h = 24 if size == "small" else 40 if size == "large" else 32
    
    if ctype == "select":
        ctrl = {
            "type": "ref",
            "id": gen_id(),
            "ref": "VoQE7",
            "name": f"Select · {label}",
            "width": "fill_container",
            "height": ctrl_h,
            "inputs": {
                "placeholder": placeholder or f"Select {label.lower()}",
                "options": options or "All, Option 1, Option 2",
                "size": size
            }
        }
    elif ctype == "date":
        ctrl = {
            "type": "ref",
            "id": gen_id(),
            "ref": "jCYiD",
            "name": f"DatePicker · {label}",
            "width": "fill_container",
            "height": ctrl_h,
            "inputs": {
                "placeholder": placeholder or "Select date",
                "size": size
            }
        }
    else:
        ctrl = {
            "type": "ref",
            "id": gen_id(),
            "ref": "iQ5uU",
            "name": f"Input · {label}",
            "width": "fill_container",
            "height": ctrl_h,
            "inputs": {
                "placeholder": placeholder or f"Enter {label.lower()}",
                "size": size
            }
        }
        
    # Standard Form.Item container component (ref: v9aLD)
    lbl_desc = {
        "height": ctrl_h
    }
    if label_width is not None and label_width != "auto":
        lbl_desc["width"] = label_width
        lbl_desc["justifyContent"] = "end"
        lbl_desc["padding"] = [0, 8, 0, 0]
    else:
        lbl_desc["width"] = "fit_content"
        lbl_desc["justifyContent"] = "start"

    return {
        "type": "ref",
        "id": gen_id(),
        "ref": "v9aLD",
        "name": f"Form.Item · {label}",
        "width": "fill_container",
        "height": "fit_content",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Form.Item",
                "category": "Data Entry",
                "version": "6.6.4",
                "props": {
                    "label": label,
                    "name": label.lower().replace(" ", "_"),
                    "required": required
                }
            }
        },
        "descendants": {
            "j5qjw": lbl_desc,
            "qCPCB": {
                "content": f"{label}:"
            },
            "AnzEt": {
                "enabled": required
            },
            "WC1GX": {
                "width": "fill_container",
                "height": "fit_content",
                "children": [ctrl]
            }
        }
    }

def create_col_item(label, ctype="input", placeholder=None, options=None, size="middle", label_width=None, required=False):
    fi = create_form_item(
        label=label,
        ctype=ctype,
        placeholder=placeholder,
        options=options,
        size=size,
        label_width=label_width,
        required=required
    )
    return {
        "type": "ref",
        "id": gen_id(),
        "ref": "ud9of",
        "name": f"Col · {label}",
        "width": "fill_container",
        "height": "fit_content",
        "fill": "#00000000",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Col",
                "category": "Layout",
                "version": "6.6.4"
            }
        },
        "descendants": {
            "bMQkr": {
                "layout": "vertical",
                "width": "fill_container",
                "height": "fit_content",
                "children": [fi]
            }
        }
    }

def create_action_col(has_collapse=False, is_collapsed=True, size="middle", search_text="Search", reset_text="Reset", expand_text="Expand", collapse_text="Collapse"):
    btn_h = 24 if size == "small" else 40 if size == "large" else 32
    search_w = 64 if search_text == "查询" else 76
    reset_w = 64 if reset_text == "重置" else 70
    buttons = [
        {
            "type": "ref",
            "id": gen_id(),
            "ref": "DQZzq",
            "name": f"Button · {search_text}",
            "width": search_w,
            "height": btn_h,
            "inputs": {
                "children": search_text,
                "type": "primary",
                "size": size
            }
        },
        {
            "type": "ref",
            "id": gen_id(),
            "ref": "DQZzq",
            "name": f"Button · {reset_text}",
            "width": reset_w,
            "height": btn_h,
            "inputs": {
                "children": reset_text,
                "type": "default",
                "size": size
            }
        }
    ]
    if has_collapse:
        if is_collapsed:
            btn_name = f"Button · {expand_text}"
            btn_text = expand_text
            btn_icon = "DownOutlined"
        else:
            btn_name = f"Button · {collapse_text}"
            btn_text = collapse_text
            btn_icon = "UpOutlined"
        expand_w = 64 if expand_text in ("展开", "收起") else 96
            
        buttons.append({
            "type": "ref",
            "id": gen_id(),
            "ref": "DQZzq",
            "name": btn_name,
            "width": expand_w,
            "height": btn_h,
            "inputs": {
                "children": btn_text,
                "icon": btn_icon,
                "iconPlacement": "end",
                "type": "link",
                "size": size
            }
        })
        
    space_comp = {
        "type": "ref",
        "id": gen_id(),
        "ref": "V5YhmT",
        "name": "Space · Action Buttons",
        "height": "fit_content",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Space",
                "category": "Layout",
                "version": "6.6.4",
                "props": {
                    "size": 8
                }
            }
        },
        "descendants": {
            "VWZt2": {
                "layout": "horizontal",
                "gap": 8,
                "alignItems": "center",
                "justifyContent": "end",
                "height": "fit_content",
                "children": buttons
            }
        }
    }
    
    action_form_item = {
        "type": "ref",
        "id": gen_id(),
        "ref": "v9aLD",
        "name": "Form.Item · Actions",
        "width": "fill_container",
        "height": "fit_content",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Form.Item",
                "category": "Data Entry",
                "version": "6.6.4"
            }
        },
        "descendants": {
            "j5qjw": {
                "enabled": False
            },
            "WC1GX": {
                "layout": "horizontal",
                "width": "fill_container",
                "height": "fit_content",
                "justifyContent": "end",
                "alignItems": "center",
                "children": [space_comp]
            }
        }
    }
    
    return {
        "type": "ref",
        "id": gen_id(),
        "ref": "ud9of",
        "name": "Col · Actions",
        "width": "fill_container",
        "height": "fit_content",
        "fill": "#00000000",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Col",
                "category": "Layout",
                "version": "6.6.4"
            }
        },
        "descendants": {
            "bMQkr": {
                "layout": "vertical",
                "width": "fill_container",
                "height": "fit_content",
                "children": [action_form_item]
            }
        }
    }

def create_spacer_col(size="middle"):
    ctrl_h = 24 if size == "small" else 40 if size == "large" else 32
    return {
        "type": "ref",
        "id": gen_id(),
        "ref": "ud9of",
        "name": "Col · Spacer",
        "width": "fill_container",
        "height": "fit_content",
        "fill": "#00000000",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Col",
                "category": "Layout",
                "version": "6.6.4"
            }
        },
        "descendants": {
            "bMQkr": {
                "layout": "vertical",
                "width": "fill_container",
                "height": "fit_content",
                "children": [
                    {
                        "type": "frame",
                        "id": gen_id(),
                        "name": "Spacer",
                        "width": "fill_container",
                        "height": ctrl_h
                    }
                ]
            }
        }
    }

def create_search_form_container(
    fields,
    filter_columns=3,
    min_rows=1,
    collapsed=True,
    bordered=True,
    size="middle",
    label_width=None,
    container_id=None,
    name="SearchForm",
    reusable=False,
    master_comp_id="yrlNJ",
    slot_id="sfSlot",
    search_text="Search",
    reset_text="Reset",
    expand_text="Expand",
    collapse_text="Collapse"
):
    N = len(fields)
    threshold = filter_columns * min_rows - 1
    has_collapse = (N > threshold)
    
    if has_collapse:
        visible_fields = fields[:threshold] if collapsed else fields
    else:
        visible_fields = fields
        
    K = len(visible_fields)
    cols = filter_columns
    
    rows_data = []
    if K % cols == 0:
        for r in range(K // cols):
            row_fields = visible_fields[r * cols : (r + 1) * cols]
            rows_data.append({"fields": row_fields, "has_action": False})
        rows_data.append({"fields": [], "has_action": True, "empty_cols": cols - 1})
    else:
        full_rows = K // cols
        for r in range(full_rows):
            row_fields = visible_fields[r * cols : (r + 1) * cols]
            rows_data.append({"fields": row_fields, "has_action": False})
        last_fields = visible_fields[full_rows * cols :]
        empty_cols = cols - 1 - len(last_fields)
        rows_data.append({"fields": last_fields, "has_action": True, "empty_cols": empty_cols})
        
    row_frames = []
    for r_idx, r_info in enumerate(rows_data):
        row_cols = []
        for f_item in r_info["fields"]:
            row_cols.append(create_col_item(
                label=f_item.get("label", "Field"),
                ctype=f_item.get("type", "input"),
                placeholder=f_item.get("placeholder"),
                options=f_item.get("options"),
                size=size,
                label_width=f_item.get("label_width", label_width),
                required=f_item.get("required", False)
            ))
            
        for _ in range(r_info.get("empty_cols", 0)):
            row_cols.append(create_spacer_col(size=size))
            
        if r_info.get("has_action"):
            row_cols.append(create_action_col(
                has_collapse=has_collapse,
                is_collapsed=collapsed,
                size=size,
                search_text=search_text,
                reset_text=reset_text,
                expand_text=expand_text,
                collapse_text=collapse_text
            ))
            
        row_frames.append({
            "type": "ref",
            "id": gen_id(),
            "ref": "upZiq",
            "name": f"Row · Grid Row {r_idx + 1}",
            "layout": "horizontal",
            "width": "fill_container",
            "height": "fit_content",
            "metadata": {
                "type": "antd-component",
                "antd": {
                    "component": "Row",
                    "category": "Layout",
                    "version": "6.6.4",
                    "props": {
                        "gutter": [24, 16]
                    }
                }
            },
            "descendants": {
                "WnPGt": {
                    "layout": "horizontal",
                    "width": "fill_container",
                    "height": "fit_content",
                    "alignItems": "center",
                    "gap": 24,
                    "children": row_cols
                }
            }
        })
        
    form_suffix = name.replace("SearchForm · ", "").replace("SearchForm", "").strip()
    form_name = f"Form · {form_suffix}" if form_suffix else "Form"
    form_ref = {
        "type": "ref",
        "id": gen_id(),
        "ref": "OGRzz",
        "name": form_name,
        "width": "fill_container",
        "height": "fit_content",
        "metadata": {
            "type": "antd-component",
            "antd": {
                "component": "Form",
                "category": "Data Entry",
                "version": "6.6.4",
                "props": {
                    "layout": "horizontal"
                }
            }
        },
        "descendants": {
            "YNENf": {
                "layout": "vertical",
                "gap": 16,
                "width": "fill_container",
                "height": "fit_content",
                "children": row_frames
            }
        }
    }
    
    if reusable:
        return {
            "type": "frame",
            "id": container_id or master_comp_id,
            "name": "SearchForm",
            "reusable": True,
            "width": "fill_container",
            "height": "fit_content",
            "fill": "#FFFFFF",
            "stroke": "#F0F0F0",
            "strokeWidth": 1,
            "cornerRadius": 8,
            "padding": [16, 20, 16, 20],
            "layout": "vertical",
            "metadata": {
                "type": "antd-component",
                "antd": {
                    "component": "SearchForm",
                    "category": "Pro Components",
                    "version": "6.6.4",
                    "composition": [
                        "Form",
                        "Row",
                        "Col",
                        "Form.Item",
                        "Input",
                        "Select",
                        "DatePicker",
                        "Space",
                        "Button"
                    ]
                }
            },
            "children": [
                {
                    "type": "frame",
                    "id": slot_id,
                    "name": "children",
                    "context": "SearchForm children slot",
                    "slot": ["OGRzz"],
                    "width": "fill_container",
                    "height": "fit_content",
                    "layout": "vertical",
                    "children": [form_ref]
                }
            ]
        }
    else:
        sf_name = name if name.startswith("SearchForm") else f"SearchForm · {name}"
        sf_instance = {
            "type": "ref",
            "id": container_id or gen_id(),
            "ref": master_comp_id,
            "name": sf_name,
            "width": "fill_container",
            "height": "fit_content",
            "metadata": {
                "type": "antd-component",
                "antd": {
                    "component": "SearchForm",
                    "category": "Pro Components",
                    "version": "6.6.4",
                    "props": {
                        "filterColumns": filter_columns,
                        "minRows": min_rows,
                        "collapsed": collapsed,
                        "bordered": bordered,
                        "size": size,
                        "labelWidth": label_width
                    }
                }
            },
            "descendants": {
                slot_id: {
                    "width": "fill_container",
                    "height": "fit_content",
                    "children": [form_ref]
                }
            }
        }
        if not bordered:
            sf_instance["fill"] = "transparent"
            sf_instance["stroke"] = "transparent"
            sf_instance["strokeWidth"] = 0
            sf_instance["padding"] = 0
        return sf_instance

def build_pro_components(master_comp_id="yrlNJ", slot_id="sfSlot"):
    # 1. Master Component Definition (SearchForm Container composed of Form -> Row -> Col -> Form.Item)
    # Default label_width is None (auto-width following content)
    master_comp = create_search_form_container(
        fields=[
            {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
            {"label": "Service", "type": "input", "placeholder": "Enter service name"},
            {"label": "Status", "type": "select", "options": "All, Running, Closed", "placeholder": "Select status"},
            {"label": "Updated At", "type": "date", "placeholder": "Select date"}
        ],
        filter_columns=3,
        min_rows=1,
        collapsed=True,
        bordered=True,
        size="middle",
        container_id=master_comp_id,
        master_comp_id=master_comp_id,
        slot_id=slot_id,
        name="SearchForm",
        reusable=True
    )

    # 2. Sub-Title Banner
    banner = {
        "type": "frame",
        "id": "section-searchform-banner",
        "x": 0,
        "y": 0,
        "name": "Sub-Title: SearchForm",
        "width": 5632,
        "height": 64,
        "layout": "vertical",
        "gap": 6,
        "children": [
            {
                "type": "text",
                "id": "searchform-banner-title",
                "name": "Title",
                "fill": "#FFFFFF",
                "content": "SearchForm",
                "fontFamily": "Inter",
                "fontSize": 26,
                "fontWeight": "700"
            },
            {
                "type": "text",
                "id": "searchform-banner-desc",
                "name": "Description",
                "fill": "#BFBFBF",
                "content": "Enterprise-grade query search form composed strictly of standard Ant Design hierarchy: Form > Row > Col > Form.Item > Input/Select/DatePicker and Space > Button.",
                "fontFamily": "Inter",
                "fontSize": 13,
                "fontWeight": "normal"
            }
        ]
    }

    # 3. Principles Artboard (x: 0, y: 90, w: 1728, h: 3200)
    principles_artboard = {
        "type": "frame",
        "id": "artboard-searchform-principles",
        "name": "Principles",
        "x": 0,
        "y": 90,
        "width": 1728,
        "height": 3200,
        "fill": "#FFFFFF",
        "cornerRadius": 8,
        "stroke": "#E8E8E8",
        "strokeWidth": 1,
        "layout": "none",
        "children": [
            {
                "type": "text",
                "id": "searchform-p-title",
                "x": 32,
                "y": 32,
                "name": "Principles",
                "fill": "#000000",
                "content": "Principles",
                "fontFamily": "Inter",
                "fontSize": 80,
                "fontWeight": "700"
            },
            {
                "type": "frame",
                "id": "searchform-p-content",
                "name": "Principles Content",
                "x": 32,
                "y": 150,
                "width": 1664,
                "layout": "vertical",
                "gap": 20,
                "children": [
                    {
                        "type": "frame",
                        "id": "sf-rule-1",
                        "name": "Rule 1 · Ant Design Standard Component Composition",
                        "width": "fill_container",
                        "fill": "#F8FAFC",
                        "cornerRadius": 8,
                        "stroke": "#E2E8F0",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 10,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-r1-h",
                                "fill": "#0F172A",
                                "content": "1. Standard Component Hierarchy (Form > Row > Col > Form.Item)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-r1-b",
                                "fill": "#334155",
                                "content": "• Form Container: The outer container represents a standard Ant Design <Form> (layout=\"horizontal\").\n• Grid Structure: Rows are standard <Row gutter={[24, 16]}>, containing proportional <Col> columns.\n• Form Items: Each column hosts a standard <Form.Item> containing a Label Container and active controls (Input, Select, DatePicker).\n• Action Area: The final column hosts <Form.Item · Actions> wrapping a <Space> container with primary/default/link <Button> components.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.6
                            }
                        ]
                    },
                    {
                        "type": "frame",
                        "id": "sf-rule-2",
                        "name": "Rule 2 · Grid Allocation and Spacing Model",
                        "width": "fill_container",
                        "fill": "#F8FAFC",
                        "cornerRadius": 8,
                        "stroke": "#E2E8F0",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 10,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-r2-h",
                                "fill": "#0F172A",
                                "content": "2. Grid Column Allocation & Spacing Model",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-r2-b",
                                "fill": "#334155",
                                "content": "• Each field occupies strictly 1 Col. The action bar (Search, Reset, Expand/Collapse) occupies 1 Col.\n• Container padding = 16px 20px (vertical 16px, horizontal 20px).\n• Grid horizontal gap = 24px (columnGap), vertical row gap = 16px (rowGap).\n• Supported size variants: small (24px control height) / middle (32px standard) / large (40px).",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.6
                            }
                        ]
                    },
                    {
                        "type": "frame",
                        "id": "sf-rule-3",
                        "name": "Rule 3 · Folding Threshold Formula",
                        "width": "fill_container",
                        "fill": "#F8FAFC",
                        "cornerRadius": 8,
                        "stroke": "#E2E8F0",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 10,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-r3-h",
                                "fill": "#0F172A",
                                "content": "3. Collapse/Expand Threshold Formula (Threshold M)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-r3-b",
                                "fill": "#334155",
                                "content": "• Threshold formula: Folding capacity M = filterColumns × minRows - 1.\n• When total fields N ≤ M: No expand/collapse toggle is rendered. The action bar shows only \"Search\" and \"Reset\" buttons.\n• When total fields N > M: The action bar displays \"Search\", \"Reset\", and the Link Button using official AntD Icon with iconPlacement=\"end\" (Expand with DownOutlined, Collapse with UpOutlined).",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.6
                            }
                        ]
                    },
                    {
                        "type": "frame",
                        "id": "sf-rule-4",
                        "name": "Rule 4 · Dual-State Display Mechanism",
                        "width": "fill_container",
                        "fill": "#F8FAFC",
                        "cornerRadius": 8,
                        "stroke": "#E2E8F0",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 10,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-r4-h",
                                "fill": "#0F172A",
                                "content": "4. Collapsed vs Expanded Dual-State Display",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-r4-b",
                                "fill": "#334155",
                                "content": "• Collapsed state: Displays only the first (filterColumns × minRows - 1) fields, and the action button shows \"Expand\" with DownOutlined (iconPlacement=\"end\").\n• Expanded state: Displays all fields across necessary rows, and the toggle button switches to \"Collapse\" with UpOutlined (iconPlacement=\"end\").",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.6
                            }
                        ]
                    },
                    {
                        "type": "frame",
                        "id": "sf-rule-5",
                        "name": "Rule 5 · Action Alignment and Row Wrapping Algorithm",
                        "width": "fill_container",
                        "fill": "#F0F9FF",
                        "cornerRadius": 8,
                        "stroke": "#BAE6FD",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 10,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-r5-h",
                                "fill": "#0369A1",
                                "content": "5. Action Alignment & Full-Row Wrapping Algorithm",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-r5-b",
                                "fill": "#0C4A6E",
                                "content": "• The action bar is permanently anchored in the last Col of the active Row (right-aligned).\n• Full-row wrapping: If the count of visible fields is an exact multiple of filterColumns (K % filterColumns === 0), all columns of the current Row are filled. The action bar wraps to the next Row and docks in the final Col.\n• Incomplete row: If K % filterColumns !== 0, the action bar stays in the last Col of the current Row.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.6
                            }
                        ]
                    },
                    {
                        "type": "frame",
                        "id": "sf-rule-6",
                        "name": "Rule 6 · Default Auto-Width vs Fixed labelWidth Alignment",
                        "width": "fill_container",
                        "fill": "#FDF4FF",
                        "cornerRadius": 8,
                        "stroke": "#F0ABFC",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 10,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-r6-h",
                                "fill": "#86198F",
                                "content": "6. Default Auto-Width vs Fixed labelWidth Alignment",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-r6-b",
                                "fill": "#701A75",
                                "content": "• Default Auto-Width (labelWidth not specified): Label Containers naturally hug their textual content without fixed pixel constraints. Short labels take minimal space and longer labels never get clipped or wrapped.\n• Fixed Width Alignment (labelWidth specified): When consistent vertical baseline alignment across staggered fields is required, setting a fixed labelWidth (e.g. 120px-150px) with right-aligned text locks all input baselines into alignment.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.6
                            }
                        ]
                    }
                ]
            }
        ]
    }

    # 4. Usage Artboard (x: 1768, y: 90, w: 2096, h: 3200)
    usage_artboard = {
        "type": "frame",
        "id": "artboard-searchform-usage",
        "name": "Usage",
        "x": 1768,
        "y": 90,
        "width": 2096,
        "height": 3200,
        "fill": "#FFFFFF",
        "cornerRadius": 8,
        "stroke": "#E8E8E8",
        "strokeWidth": 1,
        "layout": "none",
        "children": [
            {
                "type": "text",
                "id": "searchform-u-title",
                "x": 32,
                "y": 32,
                "name": "Usage",
                "fill": "#000000",
                "content": "Usage",
                "fontFamily": "Inter",
                "fontSize": 80,
                "fontWeight": "700"
            },
            {
                "type": "frame",
                "id": "searchform-u-content",
                "name": "Usage Content",
                "x": 32,
                "y": 150,
                "width": 2032,
                "layout": "vertical",
                "gap": 24,
                "children": [
                    # Scenario 1 (Default: auto label width)
                    {
                        "type": "frame",
                        "id": "card-u-sc1",
                        "name": "Card · Scenario 1: Fields Below Threshold (No Collapse Toggle)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc1-t",
                                "fill": "#000000E0",
                                "content": "Scenario 1: Minimal Compact Form (filterColumns=3, minRows=1, fields=2 ≤ threshold 2)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc1-d",
                                "fill": "#00000073",
                                "content": "[Rule 3 Verification] Form composed of Row > Col > Form.Item. Labels naturally hug content width. Total fields (2) does not exceed threshold M = 3×1-1 = 2.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
                                    {"label": "Status", "type": "select", "options": "All, Active, Disabled", "placeholder": "Select status"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 1"
                            )
                        ]
                    },
                    # Scenario 2 (Default: auto label width, Expand button with DownOutlined and iconPlacement=end)
                    {
                        "type": "frame",
                        "id": "card-u-sc2",
                        "name": "Card · Scenario 2: Single Row Collapsed (Shows Expand Toggle)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc2-t",
                                "fill": "#000000E0",
                                "content": "Scenario 2: Single Row Collapsed (filterColumns=4, minRows=1, fields=6 > threshold 3, collapsed=true)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc2-d",
                                "fill": "#00000073",
                                "content": "[Rule 4 Verification] In collapsed state, Row contains 3 field Cols and 1 action Col. Action toggle displays \"Expand\" with DownOutlined (iconPlacement=\"end\").",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
                                    {"label": "Description", "type": "input", "placeholder": "Enter description"},
                                    {"label": "Status", "type": "select", "options": "All, Running, Closed", "placeholder": "Select status"},
                                    {"label": "Call Count", "type": "input", "placeholder": "Enter call count"},
                                    {"label": "Schedule Date", "type": "date", "placeholder": "Select date"},
                                    {"label": "Owner", "type": "input", "placeholder": "Enter owner name"}
                                ],
                                filter_columns=4,
                                min_rows=1,
                                collapsed=True,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 2"
                            )
                        ]
                    },
                    # Scenario 3 (Default: auto label width, Collapse button with UpOutlined and iconPlacement=end)
                    {
                        "type": "frame",
                        "id": "card-u-sc3",
                        "name": "Card · Scenario 3: Single Row Fully Expanded (Shows Collapse Toggle)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc3-t",
                                "fill": "#000000E0",
                                "content": "Scenario 3: Single Row Fully Expanded (filterColumns=4, minRows=1, fields=6, collapsed=false)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc3-d",
                                "fill": "#00000073",
                                "content": "[Rule 4 & 5 Verification] Form expands across 2 Row components. Row 2 hosts the action Col displaying \"Collapse\" with UpOutlined (iconPlacement=\"end\").",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
                                    {"label": "Description", "type": "input", "placeholder": "Enter description"},
                                    {"label": "Call Count", "type": "input", "placeholder": "Enter call count"},
                                    {"label": "Status", "type": "select", "options": "All, Running, Closed", "placeholder": "Select status"},
                                    {"label": "Schedule Date", "type": "date", "placeholder": "Select date"},
                                    {"label": "Owner", "type": "input", "placeholder": "Enter owner name"}
                                ],
                                filter_columns=4,
                                min_rows=1,
                                collapsed=False,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 3"
                            )
                        ]
                    },
                    # Scenario 4 (Default: auto label width)
                    {
                        "type": "frame",
                        "id": "card-u-sc4",
                        "name": "Card · Scenario 4: Multi-Row Collapsed (minRows=2, threshold M=5)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc4-t",
                                "fill": "#000000E0",
                                "content": "Scenario 4: Multi-Row Collapsed (filterColumns=3, minRows=2, fields=7, collapsed=true)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc4-d",
                                "fill": "#00000073",
                                "content": "[Rule 4 Verification] Threshold M = 3×2-1 = 5. Collapsed state renders across 2 Row frames with 5 Form.Item fields and 1 action Col showing \"Expand\" with DownOutlined.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
                                    {"label": "Service", "type": "input", "placeholder": "Enter service name"},
                                    {"label": "Schedule Type", "type": "select", "options": "All, Auto, Manual", "placeholder": "Select type"},
                                    {"label": "Status", "type": "select", "options": "All, Success, Failed", "placeholder": "Select status"},
                                    {"label": "Threshold", "type": "input", "placeholder": "Enter threshold"},
                                    {"label": "Updated At", "type": "date", "placeholder": "Select date"},
                                    {"label": "Operator", "type": "input", "placeholder": "Enter operator"}
                                ],
                                filter_columns=3,
                                min_rows=2,
                                collapsed=True,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 4"
                            )
                        ]
                    },
                    # Scenario 5 (Default: auto label width)
                    {
                        "type": "frame",
                        "id": "card-u-sc5",
                        "name": "Card · Scenario 5: Multi-Row Fully Expanded (All 7 Fields Visible)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc5-t",
                                "fill": "#000000E0",
                                "content": "Scenario 5: Multi-Row Fully Expanded (filterColumns=3, minRows=2, fields=7, collapsed=false)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc5-d",
                                "fill": "#00000073",
                                "content": "[Rule 4 & 5 Verification] Form renders 3 Row components. Row 3 contains 1 field Col, 1 spacer Col, and 1 action Col with \"Collapse\" (UpOutlined). All labels naturally hug content width.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
                                    {"label": "Service", "type": "input", "placeholder": "Enter service name"},
                                    {"label": "Schedule Type", "type": "select", "options": "All, Auto, Manual", "placeholder": "Select type"},
                                    {"label": "Status", "type": "select", "options": "All, Success, Failed", "placeholder": "Select status"},
                                    {"label": "Threshold", "type": "input", "placeholder": "Enter threshold"},
                                    {"label": "Updated At", "type": "date", "placeholder": "Select date"},
                                    {"label": "Operator", "type": "input", "placeholder": "Enter operator"}
                                ],
                                filter_columns=3,
                                min_rows=2,
                                collapsed=False,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 5"
                            )
                        ]
                    },
                    # Scenario 6 (Default: auto label width)
                    {
                        "type": "frame",
                        "id": "card-u-sc6",
                        "name": "Card · Scenario 6: Full-Row Wrapping (Rule 5 Core Algorithm)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#EFF6FF",
                        "cornerRadius": 8,
                        "stroke": "#BFDBFE",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc6-t",
                                "fill": "#1E40AF",
                                "content": "Scenario 6: Full-Row Multiple Wrapping (filterColumns=3, minRows=1, expanded fields=3)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc6-d",
                                "fill": "#1E3A8A",
                                "content": "[Rule 5 Core Verification] Row 1 has 3 field Cols (3 % 3 === 0). The action Col automatically wraps to Row 2, padded with 2 spacer Cols and right-aligned.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "Enter rule name"},
                                    {"label": "Description", "type": "input", "placeholder": "Enter description"},
                                    {"label": "Service Call", "type": "input", "placeholder": "Enter service call"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                collapsed=False,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 6"
                            )
                        ]
                    },
                    # Scenario 7 (Default: auto label width)
                    {
                        "type": "frame",
                        "id": "card-u-sc7",
                        "name": "Card · Scenario 7: Borderless Embedded Mode (bordered=false)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc7-t",
                                "fill": "#000000E0",
                                "content": "Scenario 7: Borderless Embedded Mode (bordered=false · for Table Header/Card Toolbar)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc7-d",
                                "fill": "#00000073",
                                "content": "Form container with zero border and transparent background, designed for seamless embedding within ProTable headers.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Keywords", "type": "input", "placeholder": "Search by keywords"},
                                    {"label": "Category", "type": "select", "options": "All, Document, Ticket", "placeholder": "Select category"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                bordered=False,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 7"
                            )
                        ]
                    },
                    # Scenario 8: Fixed labelWidth Alignment (Explicit labelWidth=150)
                    {
                        "type": "frame",
                        "id": "card-u-sc8",
                        "name": "Card · Scenario 8: Fixed labelWidth Alignment (Variable-Length Labels)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FAF5FF",
                        "cornerRadius": 8,
                        "stroke": "#E9D5FF",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "u-sc8-t",
                                "fill": "#6B21A8",
                                "content": "Scenario 8: Fixed labelWidth Alignment (filterColumns=3, labelWidth=150, collapsed=false)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "u-sc8-d",
                                "fill": "#581C87",
                                "content": "[Alignment Verification] When labelWidth is explicitly set (150px), Label Containers across all Form.Item components maintain uniform width with right-aligned text. Input, Select, and DatePicker controls lock to the exact same vertical baseline.",
                                "fontFamily": "Inter",
                                "fontSize": 13,
                                "lineHeight": 1.5
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Rule Name", "type": "input", "placeholder": "4 chars label"},
                                    {"label": "Target Cluster", "type": "input", "placeholder": "Medium label"},
                                    {"label": "Status", "type": "select", "options": "All, Running, Error", "placeholder": "Short label"},
                                    {"label": "Last Scheduled Time", "type": "date", "placeholder": "Long label"},
                                    {"label": "Assigned Lead", "type": "input", "placeholder": "Medium label"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                collapsed=False,
                                label_width=150,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Scenario 8 (labelWidth=150)"
                            )
                        ]
                    }
                ]
            }
        ]
    }

    # 5. Components Artboard (x: 3904, y: 90, w: 1728, h: 3200)
    components_artboard = {
        "type": "frame",
        "id": "artboard-searchform-components",
        "name": "Components",
        "x": 3904,
        "y": 90,
        "width": 1728,
        "height": 3200,
        "fill": "#FFFFFF",
        "cornerRadius": 8,
        "stroke": "#E8E8E8",
        "strokeWidth": 1,
        "layout": "none",
        "children": [
            {
                "type": "text",
                "id": "searchform-c-title",
                "x": 32,
                "y": 32,
                "name": "Components",
                "fill": "#000000",
                "content": "Components",
                "fontFamily": "Inter",
                "fontSize": 80,
                "fontWeight": "700"
            },
            {
                "type": "frame",
                "id": "searchform-c-content",
                "name": "Components Content",
                "x": 32,
                "y": 150,
                "width": 1664,
                "layout": "vertical",
                "gap": 24,
                "children": [
                    # Card 1: Standard Definition (Contains the Master Component Frame)
                    {
                        "type": "frame",
                        "id": "card-sf-comp-master",
                        "name": "Card · Standard Master Definition (Middle 32px)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-c1-t",
                                "fill": "#000000E0",
                                "content": "1. SearchForm Master Component · Standard Container (Middle 32px)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-c1-st",
                                "fill": "#00000073",
                                "content": "Built with standard Form > Row > Col > Form.Item hierarchy (reusable: true). By default, label width naturally hugs content.",
                                "fontFamily": "Inter",
                                "fontSize": 13
                            },
                            master_comp
                        ]
                    },
                    # Card 2: Sizes Matrix
                    {
                        "type": "frame",
                        "id": "card-sf-comp-sizes",
                        "name": "Card · Size Variant Matrix (Small 24px & Large 40px)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-c2-t",
                                "fill": "#000000E0",
                                "content": "2. Size Variant Matrix (Small 24px & Large 40px)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-c2-st",
                                "fill": "#00000073",
                                "content": "Optimized for data-dense compact sidebars (Small) and standalone high-visibility portals (Large).",
                                "fontFamily": "Inter",
                                "fontSize": 13
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Project ID", "type": "input", "placeholder": "24px compact input"},
                                    {"label": "Approval", "type": "select", "options": "Approved, Rejected", "placeholder": "Select"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                size="small",
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Small Size"
                            ),
                            create_search_form_container(
                                fields=[
                                    {"label": "Global Order", "type": "input", "placeholder": "40px large input"},
                                    {"label": "Delivery", "type": "select", "options": "Air, Sea", "placeholder": "Select"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                size="large",
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Large Size"
                            )
                        ]
                    },
                    # Card 3: Columns Matrix (2 Columns & 4 Columns)
                    {
                        "type": "frame",
                        "id": "card-sf-comp-cols",
                        "name": "Card · Grid Columns Adaptation Matrix (2 Columns & 4 Columns)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-c3-t",
                                "fill": "#000000E0",
                                "content": "3. Grid Columns Adaptation Matrix (2 Columns & 4 Columns)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-c3-st",
                                "fill": "#00000073",
                                "content": "Flexible grid layouts designed for diverse container widths and responsive breakpoints.",
                                "fontFamily": "Inter",
                                "fontSize": 13
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Entity ID", "type": "input", "placeholder": "Two columns single field"}
                                ],
                                filter_columns=2,
                                min_rows=1,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · 2 Columns"
                            ),
                            create_search_form_container(
                                fields=[
                                    {"label": "Task Name", "type": "input", "placeholder": "Column 1 field"},
                                    {"label": "Worker Node", "type": "input", "placeholder": "Column 2 field"},
                                    {"label": "Queue Status", "type": "select", "options": "Normal, Blocked", "placeholder": "Select"}
                                ],
                                filter_columns=4,
                                min_rows=1,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · 4 Columns"
                            )
                        ]
                    },
                    # Card 4: Bordered Modes
                    {
                        "type": "frame",
                        "id": "card-sf-comp-border",
                        "name": "Card · Container Border Styles (Bordered vs Borderless)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-c4-t",
                                "fill": "#000000E0",
                                "content": "4. Container Border Styles (Bordered vs Borderless)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-c4-st",
                                "fill": "#00000073",
                                "content": "bordered=true provides a self-contained card container; bordered=false integrates seamlessly into tables and drawers.",
                                "fontFamily": "Inter",
                                "fontSize": 13
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Filter Key", "type": "input", "placeholder": "Transparent background mode"},
                                    {"label": "Category", "type": "select", "options": "All, Group A", "placeholder": "Select"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                bordered=False,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Borderless Mode"
                            )
                        ]
                    },
                    # Card 5: Auto Width vs Fixed labelWidth Matrix
                    {
                        "type": "frame",
                        "id": "card-sf-comp-labelwidth",
                        "name": "Card · Label Width Matrix (Auto Width vs Fixed 150px)",
                        "width": "fill_container",
                        "height": "fit_content",
                        "fill": "#FFFFFF",
                        "cornerRadius": 8,
                        "stroke": "#E8E8E8",
                        "strokeWidth": 1,
                        "padding": 24,
                        "layout": "vertical",
                        "gap": 16,
                        "children": [
                            {
                                "type": "text",
                                "id": "sf-c5-t",
                                "fill": "#000000E0",
                                "content": "5. Label Width Alignment Matrix (Auto Width vs Fixed 150px)",
                                "fontFamily": "Inter",
                                "fontSize": 16,
                                "fontWeight": "600"
                            },
                            {
                                "type": "text",
                                "id": "sf-c5-st",
                                "fill": "#00000073",
                                "content": "Comparison between default Auto-Width (labels naturally hug content) and Fixed labelWidth=150px (all controls locked to uniform vertical baseline).",
                                "fontFamily": "Inter",
                                "fontSize": 13
                            },
                            create_search_form_container(
                                fields=[
                                    {"label": "Name", "type": "input", "placeholder": "Short label (auto width)"},
                                    {"label": "Contact Phone", "type": "input", "placeholder": "Medium label (auto width)"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                label_width=None,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Auto Label Width"
                            ),
                            create_search_form_container(
                                fields=[
                                    {"label": "Business Department", "type": "input", "placeholder": "Fixed 150px width"},
                                    {"label": "Submission Deadline", "type": "date", "placeholder": "Fixed 150px width"}
                                ],
                                filter_columns=3,
                                min_rows=1,
                                label_width=150,
                                master_comp_id=master_comp_id,
                                slot_id=slot_id,
                                name="SearchForm · Fixed 150px Label Width"
                            )
                        ]
                    }
                ]
            }
        ]
    }

    # 6. Section SearchForm (08 Pro Components Section)
    section_searchform = {
        "type": "frame",
        "id": "section-search-form",
        "name": "08 Pro Components",
        "x": -58,
        "y": 112500,
        "width": 5632,
        "height": 3300,
        "layout": "none",
        "children": [
            banner,
            principles_artboard,
            usage_artboard,
            components_artboard
        ]
    }

    return section_searchform

if __name__ == '__main__':
    pen_path = './libraries/antd-6.lib.pen'
    with open(pen_path, 'r', encoding='utf-8') as f:
        pen = json.load(f)

    pro_layer = build_pro_components()
    replaced = False
    for idx, c in enumerate(pen.get('children', [])):
        if 'Pro Components' in c.get('name', ''):
            pen['children'][idx] = pro_layer
            replaced = True
            print("Replaced existing Pro Components layer in libraries/antd-6.lib.pen")
            break

    if not replaced:
        pen['children'].append(pro_layer)
        print("Appended new Pro Components layer to libraries/antd-6.lib.pen")

    with open(pen_path, 'w', encoding='utf-8') as f:
        json.dump(pen, f, indent=2, ensure_ascii=False)

    print("Successfully updated SearchForm with auto-width labels and official iconPlacement buttons!")
