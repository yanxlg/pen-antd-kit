import json
import sys
sys.path.append(".")
from scripts.build_pro_components import create_search_form_container

LIB_PATH = "libraries/antd-6.lib.pen"

with open(LIB_PATH, "r", encoding="utf-8") as f:
    doc = json.load(f)

# Locate GpMuP
pages_group = doc["children"][9]
gp = None
for child in pages_group["children"]:
    if child["id"] == "GpMuP":
        gp = child
        break

if not gp:
    raise ValueError("GpMuP not found!")

# 1. Aside (ht9UM)
aside = {
    "type": "frame",
    "id": "ht9UM",
    "name": "aside",
    "width": 280,
    "height": "fill_container",
    "layout": "vertical",
    "padding": 16,
    "gap": 16,
    "fill": "#ffffff",
    "stroke": "#e6ebf2",
    "strokeWidth": 1,
    "cornerRadius": 8,
    "children": [
        {
            "type": "frame",
            "id": "CIFog",
            "name": "Catalog Header · 目录标题",
            "width": "fill_container",
            "height": 24,
            "layout": "horizontal",
            "justifyContent": "space_between",
            "alignItems": "center",
            "children": [
                {
                    "type": "text",
                    "id": "JMjyG",
                    "name": "配置目录",
                    "content": "配置目录",
                    "fill": "#1e293b",
                    "fontFamily": "Roboto",
                    "fontSize": 16,
                    "fontWeight": "600"
                },
                {
                    "type": "frame",
                    "id": "DsZZm",
                    "name": "Tag · 模块数量",
                    "layout": "horizontal",
                    "padding": [2, 8],
                    "fill": "#f1f5f9",
                    "cornerRadius": 10,
                    "alignItems": "center",
                    "children": [
                        {
                            "type": "text",
                            "id": "DsZZm_txt",
                            "name": "8 个模块",
                            "content": "8 个模块",
                            "fill": "#64748b",
                            "fontFamily": "Roboto",
                            "fontSize": 12,
                            "fontWeight": "normal"
                        }
                    ]
                }
            ]
        },
        {
            "type": "ref",
            "id": "C6hGii",
            "ref": "W4V5K",
            "name": "Input.Search · 搜索模块",
            "width": "fill_container",
            "height": 32,
            "inputs": {
                "placeholder": "搜索页面或模块"
            }
        },
        {
            "type": "ref",
            "id": "KWoOl",
            "ref": "ShznK",
            "name": "Menu · 模块目录",
            "width": "fill_container",
            "height": 360,
            "inputs": {
                "mode": "inline",
                "theme": "light",
                "selectedKeys": "[\"home\"]",
                "items": json.dumps([
                    {"key": "start", "label": "启动 (6)"},
                    {"key": "home", "label": "首页 (4)"},
                    {"key": "auth", "label": "注册登录 (6)"},
                    {"key": "apply", "label": "申请流程 (7)"},
                    {"key": "loan", "label": "借款流程 (8)"},
                    {"key": "repay", "label": "还款流程 (4)"},
                    {"key": "eval", "label": "评价引导 (1)"},
                    {"key": "account", "label": "我的账户 (15)"}
                ], ensure_ascii=False),
                "styles": "{\"root\":{\"border\":0,\"borderWidth\":0,\"backgroundColor\":\"transparent\"}}"
            }
        }
    ]
}

# 2. Workspace Section (sMQbI)
section = {
    "type": "frame",
    "id": "sMQbI",
    "name": "section",
    "width": "fill_container",
    "height": "fill_container",
    "layout": "vertical",
    "gap": 16,
    "children": [
        {
            "type": "frame",
            "id": "SbAN5",
            "name": "Workspace Tabs Header · 标签与操作",
            "width": "fill_container",
            "height": 46,
            "layout": "horizontal",
            "justifyContent": "space_between",
            "alignItems": "center",
            "children": [
                {
                    "type": "ref",
                    "id": "giGWb",
                    "ref": "acxPC",
                    "name": "Tabs · 工作区标签",
                    "width": 260,
                    "height": 46,
                    "inputs": {
                        "items": json.dumps([
                            {"key": "bff", "label": "BFF 配置"},
                            {"key": "middle", "label": "中台配置"}
                        ], ensure_ascii=False),
                        "activeKey": "bff",
                        "type": "line",
                        "size": "middle"
                    }
                },
                {
                    "type": "ref",
                    "id": "hiPGh",
                    "ref": "DQZzq",
                    "name": "Button · 新建配置",
                    "width": 96,
                    "height": 32,
                    "inputs": {
                        "children": "新建配置",
                        "type": "primary"
                    }
                }
            ]
        },
        create_search_form_container(
            fields=[
                {"label": "页面", "type": "select", "options": "全部, 隐私授权页, 隐私重授权页", "placeholder": "请选择页面"},
                {"label": "配置", "type": "input", "placeholder": "配置名称 / 编码"},
                {"label": "状态", "type": "select", "options": "全部, 启用, 停用", "placeholder": "请选择状态"}
            ],
            filter_columns=4,
            min_rows=1,
            collapsed=False,
            name="SearchForm · 配置查询",
            master_comp_id="yrlNJ",
            slot_id="sfSlot",
            search_text="查询",
            reset_text="重置"
        ),
        {
            "type": "frame",
            "id": "RAhzT",
            "name": "Table Card · 数据表格卡片",
            "width": "fill_container",
            "height": "fill_container",
            "layout": "vertical",
            "padding": [20, 24],
            "gap": 16,
            "fill": "#ffffff",
            "cornerRadius": 8,
            "stroke": "#e6ebf2",
            "strokeWidth": 1,
            "children": [
                {
                    "type": "ref",
                    "id": "nqmqa",
                    "ref": "nXLz3",
                    "name": "Table · App Config",
                    "width": "fill_container",
                    "height": 460,
                    "inputs": {
                        "columns": json.dumps([
                            {"title": "页面", "dataIndex": "page", "width": 140},
                            {"title": "配置编码", "dataIndex": "code", "width": 220},
                            {"title": "配置名称", "dataIndex": "name", "width": 140},
                            {"title": "状态", "dataIndex": "status", "width": 100},
                            {"title": "配置描述", "dataIndex": "description", "width": 160},
                            {"title": "更新人", "dataIndex": "operator", "width": 120},
                            {"title": "更新时间", "dataIndex": "updatedAt", "width": 180},
                            {"title": "操作", "dataIndex": "action", "fixed": "right", "width": 180}
                        ], ensure_ascii=False),
                        "dataSource": json.dumps([
                            {"key": "1", "page": "隐私授权页", "code": "pakora_start_aaaa", "name": "aaaa", "status": "启用", "description": "", "operator": "若依", "updatedAt": "2026-09-20 01:38:05", "action": "编辑  停用  历史记录"},
                            {"key": "2", "page": "隐私授权页", "code": "pakora_start_aaa", "name": "aaa", "status": "启用", "description": "", "operator": "若依", "updatedAt": "2026-09-20 01:32:27", "action": "编辑  停用  历史记录"},
                            {"key": "3", "page": "隐私授权页", "code": "pakora_start_aa_2", "name": "aa", "status": "启用", "description": "", "operator": "若依", "updatedAt": "2026-09-20 01:29:22", "action": "编辑  停用  历史记录"},
                            {"key": "4", "page": "隐私授权页", "code": "pakora_start_aa", "name": "aa", "status": "启用", "description": "", "operator": "若依", "updatedAt": "2026-09-20 01:25:47", "action": "编辑  停用  历史记录"},
                            {"key": "5", "page": "隐私重授权页", "code": "pk_pakora_start_dsadsa", "name": "dsadsa", "status": "启用", "description": "dsadas", "operator": "system", "updatedAt": "2026-09-17 03:59:09", "action": "编辑  停用  历史记录"},
                            {"key": "6", "page": "隐私授权页", "code": "pk_pakora_start_ewqeqw", "name": "ewqeqw", "status": "启用", "description": "ewqewq", "operator": "system", "updatedAt": "2026-09-17 03:58:50", "action": "编辑  停用  历史记录"}
                        ], ensure_ascii=False),
                        "pagination": True,
                        "showHeader": True,
                        "bordered": False,
                        "size": "large"
                    }
                }
            ]
        }
    ]
}

# 3. Container (fDHOb)
container = {
    "type": "frame",
    "id": "fDHOb",
    "name": "Container",
    "width": "fill_container",
    "height": "fill_container",
    "layout": "horizontal",
    "gap": 16,
    "children": [
        aside,
        section
    ]
}

# 4. l0UmSc (Frame · App Config Split Tabs)
l0UmSc = {
    "type": "frame",
    "id": "l0UmSc",
    "name": "Frame · App Config Split Tabs",
    "context": "prototype-template; pattern=split-tabs; viewport=desktop; resolution=1920x1080; width-fixed=true; min-height=1080",
    "x": 0,
    "y": 160,
    "width": 1920,
    "height": 1080,
    "layout": "vertical",
    "fill": "#00000000",
    "children": [
        container
    ]
}

# 5. Anchors and Guides update in gp
anchors_guides = {
    "L8S9if": {"x": 136, "y": 228, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "o4XAI": {"x": 140, "y": 232, "width": 1800, "height": 8, "geometry": "M0 0l1100 0 0 8 700 0", "viewBox": [0, 0, 1800, 8]},
    "sJdtG": {"x": 136, "y": 324, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "LdylW": {"x": 140, "y": 240, "width": 2120, "height": 84, "geometry": "M0 84l1300 0 0-84 820 0", "viewBox": [0, 0, 2120, 84]},
    "BdROh": {"x": 422, "y": 179, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "PPsZL": {"x": 426, "y": 183, "width": 1514, "height": 297, "geometry": "M0 0l900 0 0 297 614 0", "viewBox": [0, 0, 1514, 297]},
    "kWfxU": {"x": 1868, "y": 179, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "VogXv": {"x": 1872, "y": 183, "width": 388, "height": 297, "geometry": "M0 0l200 0 0 297 188 0", "viewBox": [0, 0, 388, 297]},
    "SKtRy": {"x": 1104, "y": 250, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "gT4lq": {"x": 1108, "y": 254, "width": 832, "height": 466, "geometry": "M0 0l500 0 0 466 332 0", "viewBox": [0, 0, 832, 466]},
    "kcgUy": {"x": 1104, "y": 478, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "fABdq": {"x": 1108, "y": 482, "width": 1152, "height": 238, "geometry": "M0 0l700 0 0 238 452 0", "viewBox": [0, 0, 1152, 238]},
    "MujsU": {"x": 1762, "y": 735, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "O7GcsO": {"x": 1766, "y": 739, "width": 174, "height": 221, "geometry": "M0 0l90 0 0 221 84 0", "viewBox": [0, 0, 174, 221]},
}

# Update gp children
new_children = []
for child in gp["children"]:
    cid = child["id"]
    if cid == "l0UmSc":
        new_children.append(l0UmSc)
    elif cid in anchors_guides:
        updated = dict(child)
        updated.update(anchors_guides[cid])
        new_children.append(updated)
    else:
        new_children.append(child)

gp["children"] = new_children

with open(LIB_PATH, "w", encoding="utf-8") as f:
    json.dump(doc, f, indent=2, ensure_ascii=False)

print("Successfully updated GpMuP in antd-6.lib.pen")
