import sys
sys.path.append(".")
from scripts.build_pro_components import create_search_form_container

# 1. 查询区卡片 SearchForm 组件
filter_card = create_search_form_container(
    fields=[
        {"label": "关联页面", "type": "select", "options": "全部, 隐私授权页, 银行卡管理", "placeholder": "请选择关联页面"},
        {"label": "错误码", "type": "input", "placeholder": "错误码 / 错误描述"},
        {"label": "状态", "type": "select", "options": "全部, 启用, 停用", "placeholder": "请选择状态"},
        {"label": "更新时间", "type": "date", "placeholder": "请选择更新时间"}
    ],
    filter_columns=4,
    min_rows=1,
    collapsed=True,
    name="SearchForm · 错误码查询",
    master_comp_id="yrlNJ",
    slot_id="sfSlot",
    search_text="查询",
    reset_text="重置",
    expand_text="展开",
    collapse_text="收起"
)

# 2. 表格数据与列配置
columns = [
    {"title": "错误码", "dataIndex": "code", "width": 140},
    {"title": "错误描述", "dataIndex": "description", "width": 300},
    {"title": "关联页面", "dataIndex": "page", "width": 260},
    {"title": "呈现形式", "dataIndex": "presentation", "width": 140},
    {"title": "状态", "dataIndex": "status", "width": 120},
    {"title": "最近操作人", "dataIndex": "operator", "width": 140},
    {"title": "更新时间", "dataIndex": "updatedAt", "width": 220},
    {"title": "操作", "dataIndex": "action", "fixed": "right", "width": 180}
]

dataSource = [
    {
        "key": "1",
        "code": "1000",
        "description": "aa",
        "page": "隐私授权页",
        "presentation": "Toast",
        "status": "启用",
        "operator": "若依",
        "updatedAt": "2026-09-20 01:06:26",
        "action": "编辑  停用  历史记录"
    },
    {
        "key": "2",
        "code": "1223",
        "description": "dasdsa",
        "page": "银行卡管理_添加手机钱包",
        "presentation": "弹窗",
        "status": "启用",
        "operator": "严贤良",
        "updatedAt": "2026-09-20 00:26:03",
        "action": "编辑  停用  历史记录"
    },
    {
        "key": "3",
        "code": "8998",
        "description": "CODEX E2E error verification edited",
        "page": "CODEX E2E 20260920 EDIT",
        "presentation": "Toast",
        "status": "启用",
        "operator": "严贤良",
        "updatedAt": "2026-09-20 01:35:39",
        "action": "编辑  停用  历史记录"
    }
]

# 3. 数据表格卡片 Table Card
table_card = {
    "type": "frame",
    "id": "PdK8R",
    "name": "Table Card · 数据表格卡片",
    "context": "Table - Card",
    "width": "fill_container",
    "fill": "#ffffff",
    "cornerRadius": 8,
    "stroke": "#e6ebf2",
    "strokeWidth": 1,
    "strokeAlignment": "inner",
    "layout": "vertical",
    "gap": 16,
    "padding": [20, 24],
    "children": [
        # Toolbar
        {
            "type": "frame",
            "id": "w4knN",
            "name": "List Header Toolbar",
            "context": "div",
            "width": "fill_container",
            "justifyContent": "space_between",
            "alignItems": "center",
            "children": [
                {
                    "type": "frame",
                    "id": "DEonv",
                    "name": "Title Group",
                    "context": "div",
                    "gap": 10,
                    "alignItems": "center",
                    "children": [
                        {
                            "type": "text",
                            "id": "AT41j",
                            "name": "错误码管理",
                            "context": "h2",
                            "fill": "#1e293b",
                            "content": "错误码管理",
                            "lineHeight": 1.4,
                            "fontFamily": "Roboto",
                            "fontSize": 16,
                            "fontWeight": "600"
                        },
                        {
                            "type": "frame",
                            "id": "qE8Wa",
                            "name": "共 3 条错误码",
                            "context": "span",
                            "height": 22,
                            "fill": "#f1f5f9",
                            "cornerRadius": 10,
                            "layout": "vertical",
                            "padding": [2, 8],
                            "justifyContent": "center",
                            "children": [
                                {
                                    "type": "text",
                                    "id": "MB4qj",
                                    "fill": "#64748b",
                                    "content": "共 3 条错误码",
                                    "lineHeight": 1.5,
                                    "fontFamily": "Roboto",
                                    "fontSize": 12,
                                    "fontWeight": "500"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "qxUry",
                    "type": "ref",
                    "ref": "DQZzq",
                    "name": "Button · Create Error Code",
                    "width": 102,
                    "height": 32,
                    "inputs": {
                        "children": "新建错误码",
                        "type": "primary"
                    }
                }
            ]
        },
        # 直接使用 Ant Design Table 组件！
        {
            "id": "UP0cd",
            "type": "ref",
            "ref": "nXLz3",
            "name": "Table · Error Codes",
            "width": "fill_container",
            "height": 320,
            "inputs": {
                "columns": json.dumps(columns, ensure_ascii=False),
                "dataSource": json.dumps(dataSource, ensure_ascii=False),
                "pagination": True,
                "showHeader": True,
                "bordered": False,
                "size": "large"
            }
        }
    ]
}

# 组合完整的 FkREj (Imported Error Code Page)
new_fkrej = {
    "type": "frame",
    "id": "FkREj",
    "name": "Imported Error Code Page",
    "width": "fill_container",
    "layout": "vertical",
    "gap": 16,
    "children": [
        filter_card,
        table_card
    ]
}

print("FkREj built successfully!")
