import json
from scripts.pen_mcp import PenMCP

lib_path = "/Users/yanxianliang/overseas/pen-antd-kit/libraries/antd-6.lib.pen"

with open(lib_path, "r", encoding="utf-8") as f:
    doc = json.load(f)

gp = doc["children"][9]["children"][2]
l0 = gp["children"][4] # l0UmSc
container = l0["children"][0] # fDHOb

# Anchors and guides map
anchors_guides = {}
for c in gp["children"]:
    if c["id"] in ["L8S9if", "o4XAI", "sJdtG", "LdylW", "BdROh", "PPsZL", "kWfxU", "VogXv", "SKtRy", "gT4lq", "kcgUy", "fABdq", "MujsU", "O7GcsO"]:
        anchors_guides[c["id"]] = c

js_code = f"""
Update('l0UmSc', {{ padding: 0 }});
const newContainer = {json.dumps(container, ensure_ascii=False)};
Replace('fDHOb', newContainer);
"""

for aid, props in anchors_guides.items():
    update_props = {k: v for k, v in props.items() if k not in ["id", "type"]}
    js_code += f"Update('{aid}', {json.dumps(update_props, ensure_ascii=False)});\n"

print("Connecting to live Pencil socket...")
mcp = PenMCP(file_path=lib_path)
res = mcp.execute(js_code)
print("Pencil execute result:", res)
mcp.close()
