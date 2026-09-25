import json
from scripts.pen_mcp import PenMCP

lib_path = "./libraries/antd-6.lib.pen"

anchors_guides = {
    # 1. Module Search
    "L8S9if": {"x": 236, "y": 228, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "o4XAI": {"x": 240, "y": 232, "width": 1700, "height": 8, "geometry": "M0 0l1100 0 0 8 600 0", "viewBox": [0, 0, 1700, 8]},

    # 2. Module Catalog
    "sJdtG": {"x": 236, "y": 320, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "LdylW": {"x": 240, "y": 240, "width": 2020, "height": 84, "geometry": "M0 84l1300 0 0-84 720 0", "viewBox": [0, 0, 2020, 84]},

    # 3. Workspace Tabs
    "BdROh": {"x": 516, "y": 179, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "PPsZL": {"x": 520, "y": 183, "width": 1420, "height": 297, "geometry": "M0 0l900 0 0 297 520 0", "viewBox": [0, 0, 1420, 297]},

    # 4. Create Action
    "kWfxU": {"x": 1868, "y": 179, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "VogXv": {"x": 1872, "y": 183, "width": 388, "height": 297, "geometry": "M0 0l200 0 0 297 188 0", "viewBox": [0, 0, 388, 297]},

    # 5. Filter Bar
    "SKtRy": {"x": 1236, "y": 250, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "gT4lq": {"x": 1240, "y": 254, "width": 700, "height": 466, "geometry": "M0 0l400 0 0 466 300 0", "viewBox": [0, 0, 700, 466]},

    # 6. Data Table
    "kcgUy": {"x": 996, "y": 406, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "fABdq": {"x": 1000, "y": 410, "width": 1260, "height": 310, "geometry": "M0 0l800 0 0 310 460 0", "viewBox": [0, 0, 1260, 310]},

    # 7. Pagination
    "MujsU": {"x": 1756, "y": 735, "width": 8, "height": 8, "cornerRadius": 4, "fill": "#1677ff"},
    "O7GcsO": {"x": 1760, "y": 739, "width": 180, "height": 221, "geometry": "M0 0l90 0 0 221 90 0", "viewBox": [0, 0, 180, 221]},
}

# 1. Update live Pencil
js_code = ""
for aid, props in anchors_guides.items():
    js_code += f"Update('{aid}', {json.dumps(props, ensure_ascii=False)});\n"

client = PenMCP(file_path=lib_path)
res = client.execute(js_code)
print("Pencil execute anchors update:", res.get("data", {}).get("result", {}).get("message"))
client.close()

# 2. Update disk file
with open(lib_path, "r", encoding="utf-8") as f:
    pen = json.load(f)

gp = pen["children"][9]["children"][2]
for child in gp["children"]:
    cid = child["id"]
    if cid in anchors_guides:
        child.update(anchors_guides[cid])

with open(lib_path, "w", encoding="utf-8") as f:
    json.dump(pen, f, indent=2, ensure_ascii=False)

print("Saved updated anchors and guides to libraries/antd-6.lib.pen")
