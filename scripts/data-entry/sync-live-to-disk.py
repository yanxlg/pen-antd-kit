import json
from scripts.pen_mcp import PenMCP

client = PenMCP()

cards = [
    "YEcu2", "cR9Tn", "L9L5FZ", "uLBJL", "w81kKy", "w8qSt",
    "szkF5", "ztVMC", "sx27H", "Q7C56", "xENxO", "lLDwu",
    "VhVgS", "KPq3T", "bA98a", "y25Ie", "ex5Kr"
]

live_cards = {}
for cid in cards:
    code = f'const card = Get("{cid}", {{depth: 10}}); Print("CARD_DATA_{cid}:" + JSON.stringify(card.children[0]));'
    res = client.execute(code)
    msg = res.get("data", {}).get("result", {}).get("message", "")
    marker = f"CARD_DATA_{cid}:"
    idx = msg.find(marker)
    if idx != -1:
        data_str = msg[idx + len(marker):].strip()
        live_cards[cid] = json.loads(data_str)
        preview_id = live_cards[cid].get("id")
        print(f"Fetched {cid}: preview id = {preview_id}")
    else:
        print(f"FAILED to fetch {cid}")

client.close()

pen_path = "./libraries/antd-6.lib.pen"
with open(pen_path, "r", encoding="utf-8") as f:
    pen = json.load(f)

def replace_node(node, target_id, new_node):
    if "children" in node:
        for i, child in enumerate(node["children"]):
            if child.get("id") == target_id:
                node["children"][i] = new_node
                return True
            if replace_node(child, target_id, new_node):
                return True
    return False

synced_count = 0
for cid, preview_node in live_cards.items():
    pid = preview_node["id"]
    if replace_node(pen, pid, preview_node):
        synced_count += 1
        print(f"Replaced {pid} ({cid}) on disk")
    else:
        print(f"Failed to find {pid} ({cid}) in disk pen file")

print(f"Total synced: {synced_count} / {len(cards)}")
if synced_count == len(cards):
    with open(pen_path, "w", encoding="utf-8") as f:
        json.dump(pen, f, indent=2, ensure_ascii=False)
    print("SUCCESS: libraries/antd-6.lib.pen updated and saved!")
