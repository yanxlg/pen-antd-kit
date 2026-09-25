import json
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from scripts.pen_mcp import PenMCP

pen_path = "./libraries/antd-6.lib.pen"
with open(pen_path, "r", encoding="utf-8") as f:
    pen = json.load(f)

def find_node(node, target_id):
    if node.get("id") == target_id:
        return node
    for c in node.get("children", []):
        res = find_node(c, target_id)
        if res:
            return res
    return None

vh_node = find_node(pen, "VhVgS")
form_node = vh_node["children"][0]["children"][0]
descendants = form_node["descendants"]

client = PenMCP()

# Update oI4WC descendants in live Pencil
update_payload = {"descendants": descendants}
js_code = f"""
const res = Update('oI4WC', {json.dumps(update_payload)});
Print('UPDATE_RESULT:' + JSON.stringify(res));
"""

res = client.execute(js_code)
print(res.get("data", {}).get("result", {}).get("message", ""))
client.close()
