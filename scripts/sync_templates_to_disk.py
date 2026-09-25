import json
from scripts.pen_mcp import PenMCP

client = PenMCP()

for template_id in ["H7JWwU", "GpMuP"]:
    code = f'const node = Get("{template_id}", {{depth: 20}}); Print("TEMPLATE_DATA_{template_id}:" + JSON.stringify(node));'
    res = client.execute(code)
    msg = res.get("data", {}).get("result", {}).get("message", "")
    marker = f"TEMPLATE_DATA_{template_id}:"
    idx = msg.find(marker)
    if idx == -1:
        print(f"FAILED to find marker for {template_id} in message:", msg)
        client.close()
        exit(1)
    
    data_str = msg[idx + len(marker):].strip()
    # The message might contain additional print output or trailing lines; take the line
    line = data_str.split("\n")[0].strip()
    live_node = json.loads(line)
    
    pen_path = "./libraries/antd-6.lib.pen"
    with open(pen_path, "r", encoding="utf-8") as f:
        pen = json.load(f)
    
    # Locate in templates layer
    found = False
    for layer in pen.get("children", []):
        if layer.get("id") == "layer-templates-pages":
            pages = layer.get("children", [])
            for i, child in enumerate(pages):
                if child.get("id") == template_id:
                    pages[i] = live_node
                    found = True
                    print(f"Replaced {template_id} in layer-templates-pages with live state!")
                    break
        if found:
            break
            
    if not found:
        print(f"Could not find {template_id} in layer-templates-pages!")
        client.close()
        exit(1)

    with open(pen_path, "w", encoding="utf-8") as f:
        json.dump(pen, f, indent=2, ensure_ascii=False)

client.close()
print("All templates successfully synced to disk!")
