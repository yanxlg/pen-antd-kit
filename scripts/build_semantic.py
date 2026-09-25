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
      "stroke": "#d9d9d9",
      "strokeWidth": 1,
      "strokeAlignment": "inner",
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
code = f'Replace("bzJ2j", {json.dumps(bzJ2j_new)});'
res = mcp.execute(code)
print('Live update res:', res)
mcp.close()
