import json
from scripts.pen_mcp import PenMCP

client = PenMCP()
code = 'const gp = Get("GpMuP", {depth: 10}); Print("GPMUP_DATA:" + JSON.stringify(gp));'
res = client.execute(code)
client.close()

msg = res.get("data", {}).get("result", {}).get("message", "")
marker = "GPMUP_DATA:"
idx = msg.find(marker)
if idx == -1:
    print("FAILED to find marker in message:", msg)
    exit(1)

data_str = msg[idx + len(marker):].strip()
live_gp = json.loads(data_str)

pen_path = "./libraries/antd-6.lib.pen"
with open(pen_path, "r", encoding="utf-8") as f:
    pen = json.load(f)

# Find GpMuP in templates
pages = pen["children"][9]["children"]
for i, child in enumerate(pages):
    if child["id"] == "GpMuP":
        pages[i] = live_gp
        print("Replaced GpMuP in templates array with live Pencil state!")
        break

with open(pen_path, "w", encoding="utf-8") as f:
    json.dump(pen, f, indent=2, ensure_ascii=False)

print("SUCCESS: libraries/antd-6.lib.pen updated and saved!")
