import json
import sys
from scripts.pen_mcp import PenMCP

cards_to_sync = [
    "L9L5FZ", "uLBJL", "w81kKy", "szkF5", "YEcu2", "ztVMC", "ex5Kr"
]

client = PenMCP()

live_cards = {}
for cid in cards_to_sync:
    code = f'const card = Get("{cid}", {{depth: 15}}); Print("FULL_CARD_{cid}:" + JSON.stringify(card));'
    res = client.execute(code)
    msg = res.get("data", {}).get("result", {}).get("message", "")
    marker = f"FULL_CARD_{cid}:"
    idx = msg.find(marker)
    if idx != -1:
        data_str = msg[idx + len(marker):].strip()
        live_cards[cid] = json.loads(data_str)
        print(f"Fetched full card {cid} (name: {live_cards[cid].get('name')})")
    else:
        print(f"FAILED to fetch {cid}")

client.close()

if len(live_cards) != len(cards_to_sync):
    print("Error: Could not fetch all cards from live Pencil. Aborting disk write.")
    sys.exit(1)

pen_path = "./libraries/antd-6.lib.pen"
print(f"Loading {pen_path}...")
with open(pen_path, "r", encoding="utf-8") as f:
    pen = json.load(f)

def replace_card(node, target_id, new_node):
    if "children" in node:
        for i, child in enumerate(node["children"]):
            if child.get("id") == target_id:
                node["children"][i] = new_node
                return True
            if replace_card(child, target_id, new_node):
                return True
    return False

synced_count = 0
for cid, card_node in live_cards.items():
    if replace_card(pen, cid, card_node):
        synced_count += 1
        print(f"Successfully replaced card {cid} on disk")
    else:
        print(f"FAILED to find card {cid} on disk!")

print(f"Total cards replaced: {synced_count} / {len(cards_to_sync)}")

if synced_count == len(cards_to_sync):
    with open(pen_path, "w", encoding="utf-8") as f:
        json.dump(pen, f, indent=2, ensure_ascii=False)
    print("SUCCESS: Disk file libraries/antd-6.lib.pen has been updated and saved!")
else:
    print("WARNING: Some cards were not found on disk, not saving.")
