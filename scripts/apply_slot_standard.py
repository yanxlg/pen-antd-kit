import json
from scripts.pen_mcp import PenMCP

lib_path = "libraries/antd-6.lib.pen"
with open(lib_path, "r", encoding="utf-8") as f:
    lib_data = json.load(f)

def find_node(obj, target_id):
    if isinstance(obj, dict):
        if obj.get("id") == target_id:
            return obj
        for v in obj.values():
            res = find_node(v, target_id)
            if res: return res
    elif isinstance(obj, list):
        for item in obj:
            res = find_node(item, target_id)
            if res: return res
    return None

# --- 1. App Shell (f4rW6H) updates ---
# N0FHv (Page Body Slot)
n0 = find_node(lib_data, "N0FHv")
if n0:
    n0["name"] = "Page Body Slot · 页面内容插槽"
    n0["slot"] = []
    n0["context"] = "页面业务内容插槽 (Page Body Slot)。在此区域替换或放入业务页面内容；外层保留固定 16px 间距。"
    if "children" in n0 and len(n0["children"]) >= 2:
        n0["children"][0]["name"] = "插槽标题"
        n0["children"][0]["content"] = "页面业务内容插槽 (Page Body Slot)"
        n0["children"][1]["name"] = "插槽说明"
        n0["children"][1]["content"] = "在实例中直接替换此 Slot 填充业务页面；外层固定保留 16px 内容间距"

# K5GgH (Sider Content Slot)
k5 = find_node(lib_data, "K5GgH")
if k5:
    k5["name"] = "Sider Content Slot · 导航插槽"
    k5["slot"] = []
    k5["context"] = "侧边栏导航内容插槽。可替换为自定义 Menu 实例或其它导航容器。"

# Gn0rZ (Brand Slot)
gn = find_node(lib_data, "Gn0rZ")
if gn:
    gn["name"] = "Brand Slot · 品牌插槽"
    gn["slot"] = []
    gn["context"] = "应用品牌与 Logo 插槽。可替换应用图标与应用名称。"

# RkvCa (App Switcher Slot)
rkv = find_node(lib_data, "RkvCa")
if rkv:
    rkv["name"] = "App Switcher Slot · 切换器插槽"
    rkv["slot"] = []
    rkv["context"] = "业务源与 App 切换器插槽。"

# miKao (User Profile Slot)
mi = find_node(lib_data, "miKao")
if mi:
    mi["name"] = "User Profile Slot · 用户信息插槽"
    mi["slot"] = []
    mi["context"] = "用户信息与操作插槽。"

# xfNTc - reset name as ref
xf = find_node(lib_data, "xfNTc")
if xf:
    xf["name"] = "Breadcrumb · Replaceable"
    if "slot" in xf:
        del xf["slot"]

# --- 2. Drawer Detail (SJ7jd) updates ---
d29 = find_node(lib_data, "d29wmW")
if d29:
    d29["name"] = "Frame · Drawer Detail"
    d29["context"] = "prototype-template; pattern=drawer-detail; viewport=desktop; resolution=1920x1080; width-fixed=true; min-height=1080"
    d29["reusable"] = True

cg = find_node(lib_data, "cGn6I")
if cg:
    cg["name"] = "Drawer Content Slot · 抽屉内容插槽"
    cg["slot"] = []
    cg["context"] = "抽屉内容区域插槽 (Drawer Content Slot)。生成只读详情时在此区域填充 Descriptions 或业务详情卡片；保留顶部 Header 与底部关闭操作。"

# --- 3. Drawer Form (C0P3Wo) updates ---
cki = find_node(lib_data, "ckiVf")
if cki:
    cki["name"] = "Frame · Drawer Form"
    cki["context"] = "prototype-template; pattern=drawer-form; viewport=desktop; resolution=1920x1080; width-fixed=true; min-height=1080"
    cki["reusable"] = True

ga = find_node(lib_data, "GAy4f")
if ga:
    ga["name"] = "Drawer Content Slot · 抽屉表单插槽"
    ga["slot"] = []
    ga["context"] = "抽屉表单区域插槽 (Drawer Content Slot)。生成表单时在此区域填充 Form 或表单字段；正文独立滚动，底部取消/确定按钮固定保持可达。"

# 保存到本地 lib 文件
print("Saving changes to", lib_path)
with open(lib_path, "w", encoding="utf-8") as f:
    json.dump(lib_data, f, ensure_ascii=False, indent=2)
print("File successfully saved!")

# 同步到 live Pencil socket
print("\nConnecting to Pencil live session...")
mcp = PenMCP()
js_code = [
    # 1. App Shell
    'Update("N0FHv", {name: "Page Body Slot · 页面内容插槽", slot: [], context: "页面业务内容插槽 (Page Body Slot)。在此区域替换或放入业务页面内容；外层保留固定 16px 间距。"});',
    'Update("yChbj", {name: "插槽标题", content: "页面业务内容插槽 (Page Body Slot)"});',
    'Update("BKUi8", {name: "插槽说明", content: "在实例中直接替换此 Slot 填充业务页面；外层固定保留 16px 内容间距"});',
    'Update("K5GgH", {name: "Sider Content Slot · 导航插槽", slot: [], context: "侧边栏导航内容插槽。可替换为自定义 Menu 实例或其它导航容器。"});',
    'Update("Gn0rZ", {name: "Brand Slot · 品牌插槽", slot: [], context: "应用品牌与 Logo 插槽。可替换应用图标与应用名称。"});',
    'Update("RkvCa", {name: "App Switcher Slot · 切换器插槽", slot: [], context: "业务源与 App 切换器插槽。"});',
    'Update("miKao", {name: "User Profile Slot · 用户信息插槽", slot: [], context: "用户信息与操作插槽。"});',
    'Update("xfNTc", {name: "Breadcrumb · Replaceable"});',
    
    # 2. Drawer Detail
    'Update("d29wmW", {name: "Frame · Drawer Detail", context: "prototype-template; pattern=drawer-detail; viewport=desktop; resolution=1920x1080; width-fixed=true; min-height=1080", reusable: true});',
    'Update("cGn6I", {name: "Drawer Content Slot · 抽屉内容插槽", slot: [], context: "抽屉内容区域插槽 (Drawer Content Slot)。生成只读详情时在此区域填充 Descriptions 或业务详情卡片；保留顶部 Header 与底部关闭操作。"});',
    
    # 3. Drawer Form
    'Update("ckiVf", {name: "Frame · Drawer Form", context: "prototype-template; pattern=drawer-form; viewport=desktop; resolution=1920x1080; width-fixed=true; min-height=1080", reusable: true});',
    'Update("GAy4f", {name: "Drawer Content Slot · 抽屉表单插槽", slot: [], context: "抽屉表单区域插槽 (Drawer Content Slot)。生成表单时在此区域填充 Form 或表单字段；正文独立滚动，底部取消/确定按钮固定保持可达。"});',
    
    'Print("Successfully updated all template slots on live Pencil canvas!");'
]

full_js = "\n".join(js_code)
res = mcp.execute(full_js)
print("Live MCP response:")
print(res)
mcp.close()
