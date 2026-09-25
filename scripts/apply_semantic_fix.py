import json
from scripts.pen_mcp import PenMCP

bzJ2j_new = {
  "type": "frame",
  "id": "bzJ2j",
  "name": "section",
  "context": "section",
  "width": "fill_container",
  "fill": "#ffffff",
  "cornerRadius": [8, 8, 0, 0],
  "stroke": "#0505050f",
  "strokeWidth": { "bottom": 1 },
  "strokeAlignment": "inner",
  "layout": "vertical",
  "gap": 24,
  "padding": [24, 24, 24, 24],
  "children": [
    # Form 1: Default
    {
      "type": "frame",
      "id": "form1_wrapper",
      "name": "Form (Default)",
      "width": "fill_container",
      "fill": "#ffffff",
      "cornerRadius": 8,
      "stroke": "#0505050f",
      "strokeWidth": 1,
      "strokeAlignment": "inner",
      "effect": {
        "type": "shadow",
        "shadowType": "outer",
        "color": "#00000014",
        "blur": 8,
        "offset": { "x": 0, "y": 2 }
      },
      "layout": "vertical",
      "gap": 24,
      "padding": [24, 24, 24, 24],
      "children": [
        # Username Item
        {
          "type": "frame",
          "id": "f1_item_user",
          "name": "Form.Item · Username",
          "width": "fill_container",
          "layout": "horizontal",
          "gap": 16,
          "alignItems": "center",
          "children": [
            {
              "type": "frame",
              "id": "f1_lbl_user",
              "name": "Label Container",
              "width": 100,
              "height": 32,
              "gap": 4,
              "justifyContent": "end",
              "alignItems": "center",
              "children": [
                {
                  "type": "text",
                  "id": "f1_req_user",
                  "name": "required",
                  "fill": "#ff4d4f",
                  "content": "*",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "normal"
                },
                {
                  "type": "text",
                  "id": "f1_txt_user",
                  "name": "label",
                  "fill": "#000000e0",
                  "content": "Username :",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "500"
                }
              ]
            },
            {
              "type": "frame",
              "id": "f1_ctrl_user",
              "name": "control",
              "width": "fill_container",
              "children": [
                {
                  "id": "f1_inp_user",
                  "type": "ref",
                  "ref": "iQ5uU",
                  "name": "Input",
                  "width": "fill_container",
                  "height": 32,
                  "inputs": {
                    "placeholder": "Please enter username",
                    "value": "",
                    "variant": "outlined"
                  }
                }
              ]
            }
          ]
        },
        # Email Item
        {
          "type": "frame",
          "id": "f1_item_email",
          "name": "Form.Item · Email",
          "width": "fill_container",
          "layout": "horizontal",
          "gap": 16,
          "alignItems": "center",
          "children": [
            {
              "type": "frame",
              "id": "f1_lbl_email",
              "name": "Label Container",
              "width": 100,
              "height": 32,
              "gap": 4,
              "justifyContent": "end",
              "alignItems": "center",
              "children": [
                {
                  "type": "text",
                  "id": "f1_req_email",
                  "name": "required",
                  "fill": "#ff4d4f",
                  "content": "*",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "normal"
                },
                {
                  "type": "text",
                  "id": "f1_txt_email",
                  "name": "label",
                  "fill": "#000000e0",
                  "content": "Email :",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "500"
                }
              ]
            },
            {
              "type": "frame",
              "id": "f1_ctrl_email",
              "name": "control",
              "width": "fill_container",
              "children": [
                {
                  "id": "f1_inp_email",
                  "type": "ref",
                  "ref": "iQ5uU",
                  "name": "Input",
                  "width": "fill_container",
                  "height": 32,
                  "inputs": {
                    "placeholder": "Please enter email",
                    "value": "",
                    "variant": "outlined"
                  }
                }
              ]
            }
          ]
        },
        # Buttons Item
        {
          "type": "frame",
          "id": "f1_item_btns",
          "name": "Form.Item · Buttons",
          "width": "fill_container",
          "layout": "horizontal",
          "gap": 16,
          "alignItems": "center",
          "children": [
            {
              "type": "frame",
              "id": "f1_lbl_btns",
              "name": "Label Container",
              "width": 100,
              "height": 32
            },
            {
              "type": "frame",
              "id": "f1_ctrl_btns",
              "name": "Buttons",
              "layout": "horizontal",
              "gap": 8,
              "alignItems": "center",
              "children": [
                {
                  "id": "f1_btn_submit",
                  "type": "ref",
                  "ref": "DQZzq",
                  "name": "Button",
                  "width": 76,
                  "height": 32,
                  "inputs": {
                    "children": "Submit",
                    "type": "primary"
                  }
                },
                {
                  "id": "f1_btn_reset",
                  "type": "ref",
                  "ref": "DQZzq",
                  "name": "Button",
                  "width": 64,
                  "height": 32,
                  "inputs": {
                    "children": "reset",
                    "type": "default"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    # Form 2: Custom Semantic DOM
    {
      "type": "frame",
      "id": "form2_wrapper",
      "name": "Form (Custom Semantic)",
      "width": "fill_container",
      "fill": "#ffffff",
      "cornerRadius": 8,
      "stroke": "#1677FF",
      "strokeWidth": 1,
      "strokeAlignment": "inner",
      "effect": {
        "type": "shadow",
        "shadowType": "outer",
        "color": "#00000014",
        "blur": 8,
        "offset": { "x": 0, "y": 2 }
      },
      "layout": "vertical",
      "gap": 24,
      "padding": [24, 24, 24, 24],
      "children": [
        # Username Item
        {
          "type": "frame",
          "id": "f2_item_user",
          "name": "Form.Item · Username",
          "width": "fill_container",
          "layout": "horizontal",
          "gap": 16,
          "alignItems": "center",
          "children": [
            {
              "type": "frame",
              "id": "f2_lbl_user",
              "name": "Label Container",
              "width": 100,
              "height": 32,
              "gap": 4,
              "justifyContent": "end",
              "alignItems": "center",
              "children": [
                {
                  "type": "text",
                  "id": "f2_req_user",
                  "name": "required",
                  "fill": "#ff4d4f",
                  "content": "*",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "normal"
                },
                {
                  "type": "text",
                  "id": "f2_txt_user",
                  "name": "label",
                  "fill": "#1677FF",
                  "content": "Username :",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "500"
                }
              ]
            },
            {
              "type": "frame",
              "id": "f2_ctrl_user",
              "name": "control",
              "width": "fill_container",
              "children": [
                {
                  "id": "f2_inp_user",
                  "type": "ref",
                  "ref": "iQ5uU",
                  "name": "Input",
                  "width": "fill_container",
                  "height": 32,
                  "inputs": {
                    "placeholder": "Please enter username",
                    "value": "",
                    "variant": "filled"
                  }
                }
              ]
            }
          ]
        },
        # Email Item
        {
          "type": "frame",
          "id": "f2_item_email",
          "name": "Form.Item · Email",
          "width": "fill_container",
          "layout": "horizontal",
          "gap": 16,
          "alignItems": "center",
          "children": [
            {
              "type": "frame",
              "id": "f2_lbl_email",
              "name": "Label Container",
              "width": 100,
              "height": 32,
              "gap": 4,
              "justifyContent": "end",
              "alignItems": "center",
              "children": [
                {
                  "type": "text",
                  "id": "f2_req_email",
                  "name": "required",
                  "fill": "#ff4d4f",
                  "content": "*",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "normal"
                },
                {
                  "type": "text",
                  "id": "f2_txt_email",
                  "name": "label",
                  "fill": "#1677FF",
                  "content": "Email :",
                  "fontFamily": "Inter",
                  "fontSize": 14,
                  "fontWeight": "500"
                }
              ]
            },
            {
              "type": "frame",
              "id": "f2_ctrl_email",
              "name": "control",
              "width": "fill_container",
              "children": [
                {
                  "id": "f2_inp_email",
                  "type": "ref",
                  "ref": "iQ5uU",
                  "name": "Input",
                  "width": "fill_container",
                  "height": 32,
                  "inputs": {
                    "placeholder": "Please enter email",
                    "value": "",
                    "variant": "filled"
                  }
                }
              ]
            }
          ]
        },
        # Buttons Item
        {
          "type": "frame",
          "id": "f2_item_btns",
          "name": "Form.Item · Buttons",
          "width": "fill_container",
          "layout": "horizontal",
          "gap": 16,
          "alignItems": "center",
          "children": [
            {
              "type": "frame",
              "id": "f2_lbl_btns",
              "name": "Label Container",
              "width": 100,
              "height": 32
            },
            {
              "type": "frame",
              "id": "f2_ctrl_btns",
              "name": "Buttons",
              "layout": "horizontal",
              "gap": 8,
              "alignItems": "center",
              "children": [
                {
                  "id": "f2_btn_submit",
                  "type": "ref",
                  "ref": "DQZzq",
                  "name": "Button",
                  "width": 76,
                  "height": 32,
                  "inputs": {
                    "children": "Submit",
                    "type": "primary"
                  }
                },
                {
                  "id": "f2_btn_reset",
                  "type": "ref",
                  "ref": "DQZzq",
                  "name": "Button",
                  "width": 64,
                  "height": 32,
                  "inputs": {
                    "children": "reset",
                    "type": "default"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

mcp = PenMCP()
code = f'''
Replace("BNP4E", {json.dumps(bzJ2j_new)});
Export(["I00Zb"], "png", "/Users/yanxianliang/.gemini/antigravity-ide/brain/128501c9-c7dd-40f4-a82d-c10dcec56f51/semantic_final.png");
'''
res = mcp.execute(code)
print('Pencil live replace res:', res)
mcp.close()

# 2. 同步写入磁盘库文件 libraries/antd-6.lib.pen
lib_path = 'libraries/antd-6.lib.pen'
with open(lib_path, 'r') as f:
    pen_data = json.load(f)

def replace_node_in_tree(node, target_id, new_content):
    if isinstance(node, dict):
        if 'children' in node and isinstance(node['children'], list):
            for i, child in enumerate(node['children']):
                if isinstance(child, dict) and (child.get('id') == target_id or child.get('id') == 'bzJ2j' or child.get('id') == 'BNP4E'):
                    node['children'][i] = new_content
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

replaced = replace_node_in_tree(pen_data, 'bzJ2j', bzJ2j_new)
if not replaced:
    replaced = replace_node_in_tree(pen_data, 'BNP4E', bzJ2j_new)
print('Replaced in lib pen data:', replaced)

with open(lib_path, 'w') as f:
    json.dump(pen_data, f, indent=2, ensure_ascii=False)
print('Saved to libraries/antd-6.lib.pen!')
