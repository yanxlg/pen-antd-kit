import json
import sys
from scripts.pen_mcp import PenMCP

def make_text(id_val, content, font_size=14, weight="normal", fill="#000000E0", width=None, height=None, align="left"):
    node = {
        "type": "text",
        "id": id_val,
        "fill": fill,
        "content": str(content),
        "fontFamily": "Inter",
        "fontSize": font_size,
        "fontWeight": str(weight),
        "textAlign": align
    }
    if width is not None:
        node["width"] = width
    if height is not None:
        node["height"] = height
    return node

def make_card_shell(card_id, card_name, title, subtitle, children):
    header = {
        "type": "frame",
        "id": f"{card_id}_hdr",
        "name": "Card Header",
        "width": "fill_container",
        "layout": "vertical",
        "gap": 4,
        "children": [
            make_text(f"{card_id}_t", title, 16, "600", "#000000E0"),
            make_text(f"{card_id}_sub", subtitle, 12, "normal", "#00000073")
        ]
    }
    return {
        "type": "frame",
        "id": card_id,
        "name": card_name,
        "width": 1664,
        "fill": "#FFFFFF",
        "cornerRadius": 8,
        "stroke": "#E8E8E8",
        "strokeWidth": 1,
        "strokeAlignment": "inner",
        "padding": [24, 24, 24, 24],
        "layout": "vertical",
        "gap": 20,
        "children": [header] + children
    }

def make_form_item_horizontal(id_val, label, ctrl_node, required=False, label_w=110, help_text=None, help_color="#FF4D4F"):
    label_children = []
    if required:
        label_children.append(make_text(f"{id_val}_req", "*", 14, "normal", "#FF4D4F"))
    label_children.append(make_text(f"{id_val}_lbl", label, 14, "500", "#000000E0"))
    
    ctrl_children = [ctrl_node]
    if help_text:
        ctrl_children.append(make_text(f"{id_val}_help", help_text, 12, "normal", help_color))
        
    return {
        "type": "frame",
        "id": id_val,
        "name": f"Form.Item · {label.replace(':', '').strip()}",
        "width": "fill_container",
        "layout": "horizontal",
        "gap": 16,
        "alignItems": "center",
        "children": [
            {
                "type": "frame",
                "id": f"{id_val}_lbl_box",
                "name": "Label Container",
                "width": label_w,
                "height": 32,
                "gap": 4,
                "justifyContent": "end",
                "alignItems": "center",
                "children": label_children
            },
            {
                "type": "frame",
                "id": f"{id_val}_ctrl_box",
                "name": "Control Box",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 4,
                "children": ctrl_children
            }
        ]
    }

def make_form_item_vertical(id_val, label, ctrl_node, required=False, help_text=None):
    label_children = []
    if required:
        label_children.append(make_text(f"{id_val}_req", "*", 14, "normal", "#FF4D4F"))
    label_children.append(make_text(f"{id_val}_lbl", label, 14, "500", "#000000E0"))
    
    children = [
        {
            "type": "frame",
            "id": f"{id_val}_lbl_box",
            "name": "Label Container",
            "layout": "horizontal",
            "gap": 4,
            "alignItems": "center",
            "children": label_children
        },
        ctrl_node
    ]
    if help_text:
        children.append(make_text(f"{id_val}_help", help_text, 12, "normal", "#FF4D4F"))
        
    return {
        "type": "frame",
        "id": id_val,
        "name": f"Form.Item · {label.replace(':', '').strip()}",
        "width": "fill_container",
        "layout": "vertical",
        "gap": 8,
        "children": children
    }

# =========================================================================
# CARD 1: Form Layouts Matrix (Horizontal, Vertical, Inline)
# =========================================================================
card1_children = [
    {
        "type": "frame",
        "id": "c1_row",
        "name": "Layouts Row",
        "width": "fill_container",
        "layout": "horizontal",
        "gap": 24,
        "children": [
            # Col 1: Horizontal Layout
            {
                "type": "frame",
                "id": "c1_col_horiz",
                "name": "Col Horizontal",
                "width": "fill_container",
                "fill": "#FAFAFA",
                "cornerRadius": 6,
                "padding": 16,
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_text("c1_h_t", "Horizontal Layout (Default)", 14, "600", "#1677FF"),
                    make_form_item_horizontal("c1_h_user", "Username :", {
                        "type": "ref", "id": "c1_h_inpu", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please enter username"}
                    }, required=True, label_w=90),
                    make_form_item_horizontal("c1_h_pwd", "Password :", {
                        "type": "ref", "id": "c1_h_inpp", "ref": "C8cDZ", "name": "Input.Password",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please enter password"}
                    }, required=True, label_w=90),
                    {
                        "type": "frame", "id": "c1_h_rem_row", "name": "Remember Row",
                        "layout": "horizontal", "gap": 16, "alignItems": "center",
                        "children": [
                            {"type": "frame", "id": "c1_h_rem_sp", "width": 90, "height": 22},
                            {"type": "ref", "id": "c1_h_rem_chk", "ref": "cpj9Y", "name": "Checkbox",
                             "width": 120, "height": 22, "inputs": {"label": "Remember me", "checked": True}}
                        ]
                    },
                    {
                        "type": "frame", "id": "c1_h_btn_row", "name": "Button Row",
                        "layout": "horizontal", "gap": 16, "alignItems": "center",
                        "children": [
                            {"type": "frame", "id": "c1_h_btn_sp", "width": 90, "height": 32},
                            {
                                "type": "frame", "id": "c1_h_btns", "layout": "horizontal", "gap": 8,
                                "children": [
                                    {"type": "ref", "id": "c1_h_btn_sub", "ref": "DQZzq", "name": "Button",
                                     "width": 76, "height": 32, "inputs": {"children": "Submit", "type": "primary"}},
                                    {"type": "ref", "id": "c1_h_btn_rst", "ref": "DQZzq", "name": "Button",
                                     "width": 64, "height": 32, "inputs": {"children": "Reset", "type": "default"}}
                                ]
                            }
                        ]
                    }
                ]
            },
            # Col 2: Vertical Layout
            {
                "type": "frame",
                "id": "c1_col_vert",
                "name": "Col Vertical",
                "width": "fill_container",
                "fill": "#FAFAFA",
                "cornerRadius": 6,
                "padding": 16,
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_text("c1_v_t", "Vertical Layout", 14, "600", "#1677FF"),
                    make_form_item_vertical("c1_v_user", "Username", {
                        "type": "ref", "id": "c1_v_inpu", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please enter username"}
                    }, required=True),
                    make_form_item_vertical("c1_v_pwd", "Password", {
                        "type": "ref", "id": "c1_v_inpp", "ref": "C8cDZ", "name": "Input.Password",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please enter password"}
                    }, required=True),
                    {"type": "ref", "id": "c1_v_rem_chk", "ref": "cpj9Y", "name": "Checkbox",
                     "width": 120, "height": 22, "inputs": {"label": "Remember me", "checked": True}},
                    {"type": "ref", "id": "c1_v_btn_sub", "ref": "DQZzq", "name": "Button",
                     "width": "fill_container", "height": 32, "inputs": {"children": "Submit", "type": "primary"}}
                ]
            },
            # Col 3: Inline Layout
            {
                "type": "frame",
                "id": "c1_col_inline",
                "name": "Col Inline",
                "width": "fill_container",
                "fill": "#FAFAFA",
                "cornerRadius": 6,
                "padding": 16,
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_text("c1_i_t", "Inline Layout", 14, "600", "#1677FF"),
                    make_text("c1_i_desc", "Compact single-row layout for top toolbars & filters.", 12, "normal", "#00000073"),
                    {
                        "type": "frame",
                        "id": "c1_i_form",
                        "name": "Inline Form Row",
                        "width": "fill_container",
                        "layout": "horizontal",
                        "gap": 12,
                        "alignItems": "center",
                        "children": [
                            make_text("c1_i_u_lbl", "User:", 13, "normal", "#000000E0"),
                            {"type": "ref", "id": "c1_i_inpu", "ref": "iQ5uU", "name": "Input",
                             "width": 120, "height": 32, "inputs": {"placeholder": "Username"}},
                            make_text("c1_i_p_lbl", "Pass:", 13, "normal", "#000000E0"),
                            {"type": "ref", "id": "c1_i_inpp", "ref": "C8cDZ", "name": "Input.Password",
                             "width": 120, "height": 32, "inputs": {"placeholder": "Password"}},
                            {"type": "ref", "id": "c1_i_btn", "ref": "DQZzq", "name": "Button",
                             "width": 76, "height": 32, "inputs": {"children": "Log in", "type": "primary"}}
                        ]
                    }
                ]
            }
        ]
    }
]
card1 = make_card_shell("card_form_layouts", "Card · Form Layouts Matrix",
                        "1. Form Layouts Matrix",
                        "Three fundamental layouts: Horizontal (standard desktop), Vertical (responsive/mobile), and Inline (toolbar/search filter).",
                        card1_children)

# =========================================================================
# CARD 2: Form.Item Statuses & Validation Feedback
# =========================================================================
card2_children = [
    {
        "type": "frame",
        "id": "c2_grid",
        "name": "Statuses Grid",
        "width": "fill_container",
        "layout": "horizontal",
        "gap": 24,
        "children": [
            # Col 1
            {
                "type": "frame",
                "id": "c2_col1",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_form_item_horizontal("c2_def", "Default :", {
                        "type": "ref", "id": "c2_inp_def", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Normal input state", "value": "ant_designer"}
                    }, required=True, label_w=120),
                    make_form_item_horizontal("c2_err", "Error Status :", {
                        "type": "ref", "id": "c2_inp_err", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please enter email", "value": "invalid-email@", "status": "error"}
                    }, required=True, label_w=120, help_text="Please enter a valid email address!", help_color="#FF4D4F")
                ]
            },
            # Col 2
            {
                "type": "frame",
                "id": "c2_col2",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_form_item_horizontal("c2_warn", "Warning Status :", {
                        "type": "ref", "id": "c2_inp_warn", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please enter password", "value": "123456", "status": "warning"}
                    }, required=True, label_w=120, help_text="Password strength is low, combine letters and numbers.", help_color="#FAAD14"),
                    make_form_item_horizontal("c2_succ", "With Feedback :", {
                        "type": "ref", "id": "c2_inp_succ", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Account ID", "value": "ACC-99281", "hasFeedback": True, "feedbackStatus": "success"}
                    }, required=True, label_w=120, help_text="Account ID verified and available.", help_color="#52C41A")
                ]
            }
        ]
    }
]
card2 = make_card_shell("card_form_statuses", "Card · Form.Item Statuses & Feedback",
                        "2. Form.Item Statuses & Validation Feedback",
                        "Visual feedback mechanisms including normal, error (with message), warning, and feedback icons.",
                        card2_children)

# =========================================================================
# CARD 3: Form.Item Anatomy & Options
# =========================================================================
card3_children = [
    {
        "type": "frame",
        "id": "c3_grid",
        "name": "Anatomy Grid",
        "width": "fill_container",
        "layout": "horizontal",
        "gap": 24,
        "children": [
            # Col 1: Required & Optional & Tooltip
            {
                "type": "frame",
                "id": "c3_col1",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_form_item_horizontal("c3_req", "Required Field :", {
                        "type": "ref", "id": "c3_inp_req", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Mandatory field with red asterisk"}
                    }, required=True, label_w=140),
                    make_form_item_horizontal("c3_opt", "Optional Note :", {
                        "type": "ref", "id": "c3_inp_opt", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Optional mark displayed"}
                    }, required=False, label_w=140, help_text="(optional field)", help_color="#00000073")
                ]
            },
            # Col 2: Extra & Colon
            {
                "type": "frame",
                "id": "c3_col2",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_form_item_horizontal("c3_extra", "Public Website :", {
                        "type": "ref", "id": "c3_inp_ext", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "https://ant.design"}
                    }, required=False, label_w=140, help_text="Extra: We will never disclose your confidential details.", help_color="#00000073"),
                    make_form_item_horizontal("c3_nocolon", "No Colon Label", {
                        "type": "ref", "id": "c3_inp_nc", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "colon={false} configuration"}
                    }, required=False, label_w=140)
                ]
            }
        ]
    }
]
card3 = make_card_shell("card_form_anatomy", "Card · Form.Item Anatomy & Options",
                        "3. Form.Item Anatomy & Options",
                        "Field anatomy details: required asterisk, optional indicator, helper descriptions, and colon toggle.",
                        card3_children)

# =========================================================================
# CARD 4: Form.List Dynamic Fields
# =========================================================================
card4_children = [
    {
        "type": "frame",
        "id": "c4_list_box",
        "name": "Dynamic List Container",
        "width": "fill_container",
        "fill": "#FAFAFA",
        "cornerRadius": 8,
        "stroke": "#D9D9D9",
        "strokeWidth": 1,
        "strokeAlignment": "inner",
        "padding": 16,
        "layout": "vertical",
        "gap": 12,
        "children": [
            make_text("c4_list_title", "Passengers / Team Members List", 14, "600", "#000000E0"),
            # Row 1
            {
                "type": "frame",
                "id": "c4_row_1",
                "name": "List Item 1",
                "width": "fill_container",
                "layout": "horizontal",
                "gap": 12,
                "alignItems": "center",
                "children": [
                    {"type": "ref", "id": "c4_inp_fn1", "ref": "iQ5uU", "name": "Input",
                     "width": "fill_container", "height": 32, "inputs": {"placeholder": "First Name", "value": "John"}},
                    {"type": "ref", "id": "c4_inp_ln1", "ref": "iQ5uU", "name": "Input",
                     "width": "fill_container", "height": 32, "inputs": {"placeholder": "Last Name", "value": "Doe"}},
                    {"type": "ref", "id": "c4_sel_r1", "ref": "VoQE7", "name": "Select",
                     "width": 180, "height": 32, "inputs": {"placeholder": "Role", "value": "Admin"}},
                    {"type": "ref", "id": "c4_btn_del1", "ref": "DQZzq", "name": "Button",
                     "width": 36, "height": 32, "inputs": {"children": "✕", "danger": True, "type": "text"}}
                ]
            },
            # Row 2
            {
                "type": "frame",
                "id": "c4_row_2",
                "name": "List Item 2",
                "width": "fill_container",
                "layout": "horizontal",
                "gap": 12,
                "alignItems": "center",
                "children": [
                    {"type": "ref", "id": "c4_inp_fn2", "ref": "iQ5uU", "name": "Input",
                     "width": "fill_container", "height": 32, "inputs": {"placeholder": "First Name", "value": "Alice"}},
                    {"type": "ref", "id": "c4_inp_ln2", "ref": "iQ5uU", "name": "Input",
                     "width": "fill_container", "height": 32, "inputs": {"placeholder": "Last Name", "value": "Smith"}},
                    {"type": "ref", "id": "c4_sel_r2", "ref": "VoQE7", "name": "Select",
                     "width": 180, "height": 32, "inputs": {"placeholder": "Role", "value": "Developer"}},
                    {"type": "ref", "id": "c4_btn_del2", "ref": "DQZzq", "name": "Button",
                     "width": 36, "height": 32, "inputs": {"children": "✕", "danger": True, "type": "text"}}
                ]
            },
            # Add Button (Dashed)
            {
                "type": "ref",
                "id": "c4_btn_add",
                "ref": "DQZzq",
                "name": "Button · Add Field",
                "width": "fill_container",
                "height": 36,
                "inputs": {
                    "children": "+ Add Passenger / Team Member",
                    "type": "dashed"
                }
            }
        ]
    }
]
card4 = make_card_shell("card_form_list", "Card · Form.List Dynamic Fields",
                        "4. Form.List Dynamic Fields",
                        "Standard dynamic field array management supporting repeated rows, removal actions, and full-width dashed Add button.",
                        card4_children)

# =========================================================================
# CARD 5: Form.ErrorList & Error Summaries
# =========================================================================
card5_children = [
    {
        "type": "frame",
        "id": "c5_err_box",
        "name": "ErrorList Container",
        "width": "fill_container",
        "fill": "#FFF2F0",
        "cornerRadius": 8,
        "stroke": "#FFCCC7",
        "strokeWidth": 1,
        "strokeAlignment": "inner",
        "padding": 16,
        "layout": "vertical",
        "gap": 10,
        "children": [
            make_text("c5_err_t", "⛔ Form.ErrorList: Validation Summary (3 errors detected)", 14, "600", "#CF1322"),
            make_text("c5_err_1", "• Username: Must be between 4 and 16 characters without symbols.", 13, "normal", "#FF4D4F"),
            make_text("c5_err_2", "• Email: The email domain format is invalid or unavailable.", 13, "normal", "#FF4D4F"),
            make_text("c5_err_3", "• Terms: You must review and agree to the Service Terms before submission.", 13, "normal", "#FF4D4F")
        ]
    }
]
card5 = make_card_shell("card_form_errorlist", "Card · Form.ErrorList & Error Summaries",
                        "5. Form.ErrorList & Error Summaries",
                        "Centralized error presentation component displaying field-level and form-level error message summaries.",
                        card5_children)

# =========================================================================
# CARD 6: Component Integration (Form Controls Matrix)
# =========================================================================
card6_children = [
    {
        "type": "frame",
        "id": "c6_grid",
        "name": "Controls Integration Grid",
        "width": "fill_container",
        "layout": "horizontal",
        "gap": 24,
        "children": [
            # Col 1: Select, DatePicker, InputNumber, Slider
            {
                "type": "frame",
                "id": "c6_col1",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_form_item_horizontal("c6_sel", "Select :", {
                        "type": "ref", "id": "c6_inp_sel", "ref": "VoQE7", "name": "Select",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Please select option", "value": "Option 1"}
                    }, required=True, label_w=110),
                    make_form_item_horizontal("c6_date", "DatePicker :", {
                        "type": "ref", "id": "c6_inp_date", "ref": "jCYiD", "name": "DatePicker",
                        "width": "fill_container", "height": 32, "inputs": {"placeholder": "Select date", "value": "2026-10-01"}
                    }, required=True, label_w=110),
                    make_form_item_horizontal("c6_num", "InputNumber :", {
                        "type": "ref", "id": "c6_inp_num", "ref": "SiWnx", "name": "InputNumber",
                        "width": "fill_container", "height": 32, "inputs": {"value": 88}
                    }, required=False, label_w=110),
                    make_form_item_horizontal("c6_slider", "Slider :", {
                        "type": "ref", "id": "c6_inp_sli", "ref": "N6xQH4", "name": "Slider",
                        "width": "fill_container", "height": 32, "inputs": {"value": 65}
                    }, required=False, label_w=110)
                ]
            },
            # Col 2: Switch, Radio, Checkbox, Rate
            {
                "type": "frame",
                "id": "c6_col2",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_form_item_horizontal("c6_sw", "Switch :", {
                        "type": "ref", "id": "c6_inp_sw", "ref": "rZqkn", "name": "Switch",
                        "width": 44, "height": 22, "inputs": {"checked": True}
                    }, required=False, label_w=110),
                    make_form_item_horizontal("c6_rad", "Radio.Group :", {
                        "type": "ref", "id": "c6_inp_rad", "ref": "H0DThz", "name": "Radio.Group",
                        "width": "fill_container", "height": 32, "inputs": {"options": json.dumps(["Option A", "Option B", "Option C"]), "value": "Option A"}
                    }, required=True, label_w=110),
                    make_form_item_horizontal("c6_chk", "Checkbox.Group :", {
                        "type": "ref", "id": "c6_inp_chk", "ref": "X3uk1", "name": "Checkbox.Group",
                        "width": "fill_container", "height": 32, "inputs": {"options": json.dumps(["Apple", "Pear", "Orange"]), "value": json.dumps(["Apple", "Pear"])}
                    }, required=False, label_w=110),
                    make_form_item_horizontal("c6_rate", "Rate :", {
                        "type": "ref", "id": "c6_inp_rate", "ref": "TCEuq", "name": "Rate",
                        "width": 160, "height": 24, "inputs": {"value": 5}
                    }, required=False, label_w=110)
                ]
            }
        ]
    }
]
card6 = make_card_shell("card_form_controls", "Card · Component Integration",
                        "6. Form Controls Integration",
                        "Seamless combination with Ant Design data entry components: Select, DatePicker, InputNumber, Slider, Switch, Radio.Group, Checkbox.Group, Rate.",
                        card6_children)

# =========================================================================
# CARD 7: Form Sizes & Global Variants
# =========================================================================
card7_children = [
    {
        "type": "frame",
        "id": "c7_grid",
        "name": "Sizes and Variants Grid",
        "width": "fill_container",
        "layout": "horizontal",
        "gap": 24,
        "children": [
            # Col 1: Sizes
            {
                "type": "frame",
                "id": "c7_col1",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_text("c7_sz_t", "Global Sizes: Small (24) / Middle (32) / Large (40)", 14, "600", "#1677FF"),
                    make_form_item_horizontal("c7_sz_s", "Small (24px) :", {
                        "type": "ref", "id": "c7_inp_s", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 24, "inputs": {"size": "small", "placeholder": "Small size"}
                    }, label_w=120),
                    make_form_item_horizontal("c7_sz_m", "Middle (32px) :", {
                        "type": "ref", "id": "c7_inp_m", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"size": "middle", "placeholder": "Middle size (default)"}
                    }, label_w=120),
                    make_form_item_horizontal("c7_sz_l", "Large (40px) :", {
                        "type": "ref", "id": "c7_inp_l", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 40, "inputs": {"size": "large", "placeholder": "Large size"}
                    }, label_w=120)
                ]
            },
            # Col 2: Variants & Disabled
            {
                "type": "frame",
                "id": "c7_col2",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 16,
                "children": [
                    make_text("c7_var_t", "Variants & Disabled State", 14, "600", "#1677FF"),
                    make_form_item_horizontal("c7_v_filled", "Filled Variant :", {
                        "type": "ref", "id": "c7_inp_vf", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"variant": "filled", "placeholder": "Filled background"}
                    }, label_w=120),
                    make_form_item_horizontal("c7_v_borderless", "Borderless :", {
                        "type": "ref", "id": "c7_inp_vb", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"variant": "borderless", "placeholder": "Borderless style"}
                    }, label_w=120),
                    make_form_item_horizontal("c7_dis", "Disabled :", {
                        "type": "ref", "id": "c7_inp_dis", "ref": "iQ5uU", "name": "Input",
                        "width": "fill_container", "height": 32, "inputs": {"disabled": True, "value": "Disabled field content"}
                    }, label_w=120)
                ]
            }
        ]
    }
]
card7 = make_card_shell("card_form_variants", "Card · Sizes & Global Variants",
                        "7. Form Sizes & Global Variants",
                        "Comprehensive size specifications (small 24px, middle 32px, large 40px), visual variants, and disabled form controls.",
                        card7_children)

# 汇总 7 个卡片进入 PoM3O
PoM3O_new = {
    "type": "frame",
    "id": "PoM3O",
    "x": 32,
    "y": 160,
    "name": "Form component definition",
    "width": 1664,
    "layout": "vertical",
    "gap": 24,
    "children": [
        card1,
        card2,
        card3,
        card4,
        card5,
        card6,
        card7
    ]
}

# 1. 连接 Pencil Desktop 执行 live 替换
mcp = PenMCP()
code = f'''
Replace("PoM3O", {json.dumps(PoM3O_new)});

// 获取新 PoM3O 的精确高度
const pBounds = Get("PoM3O", (node, context) => context.depth === 0 ? context.bounds : null)[0];
Print("New PoM3O bounds: " + JSON.stringify(pBounds));

// 更新 artboard-form-components 的高度
// PoM3O 在 y=160, 底部留 32px padding
const newArtHeight = Math.ceil(160 + pBounds.height + 32);
Update("artboard-form-components", {{"height": newArtHeight}});
Print("Updated artboard-form-components height to: " + newArtHeight);

Export(["artboard-form-components"], "png", "/Users/yanxianliang/.gemini/antigravity-ide/brain/128501c9-c7dd-40f4-a82d-c10dcec56f51/components_rebuilt.png");
'''
res = mcp.execute(code)
print("Live replace response:", res)
mcp.close()

# 2. 同步写入磁盘库文件 libraries/antd-6.lib.pen
lib_path = "libraries/antd-6.lib.pen"
with open(lib_path, "r") as f:
    pen_data = json.load(f)

def replace_node_in_tree(node, target_id, new_content):
    if isinstance(node, dict):
        if "children" in node and isinstance(node["children"], list):
            for i, child in enumerate(node["children"]):
                if isinstance(child, dict) and child.get("id") == target_id:
                    node["children"][i] = new_content
                    return True
                if replace_node_in_tree(child, target_id, new_content):
                    return True
        for k, v in node.items():
            if replace_node_in_tree(v, target_id, new_content):
                return True
    elif isinstance(node, list):
        for item in node:
            if replace_node_in_tree(item, target_id, new_content):
                return True
    return False

def update_node_prop(node, target_id, prop_key, prop_val):
    if isinstance(node, dict):
        if node.get("id") == target_id:
            node[prop_key] = prop_val
            return True
        for k, v in node.items():
            if update_node_prop(v, target_id, prop_key, prop_val):
                return True
    elif isinstance(node, list):
        for item in node:
            if update_node_prop(item, target_id, prop_key, prop_val):
                return True
    return False

# 提取刚刚计算出来的高度
# 如果打印信息里有，或者从响应里解析
msg = res.get("data", {}).get("result", {}).get("message", "")
computed_h = 2800
for line in msg.split("\n"):
    if "Updated artboard-form-components height to:" in line:
        computed_h = int(line.split(":")[-1].strip())

r1 = replace_node_in_tree(pen_data, "PoM3O", PoM3O_new)
r2 = update_node_prop(pen_data, "artboard-form-components", "height", computed_h)
print(f"Replaced in file: PoM3O={r1}, artboard_height={r2} ({computed_h}px)")

with open(lib_path, "w") as f:
    json.dump(pen_data, f, indent=2, ensure_ascii=False)
print("Successfully persisted to libraries/antd-6.lib.pen!")
