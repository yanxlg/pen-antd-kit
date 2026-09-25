import json
import os
import sys

from scripts.build_standard_list_page import new_fkrej
from scripts.pen_mcp import PenMCP

lib_path = "/Users/yanxianliang/overseas/pen-antd-kit/libraries/antd-6.lib.pen"

print("1. Loading antd-6.lib.pen...")
with open(lib_path, "r", encoding="utf-8") as f:
    lib_data = json.load(f)

def replace_node(obj, target_id, replacement):
    if isinstance(obj, dict):
        if "children" in obj and isinstance(obj["children"], list):
            for i, child in enumerate(obj["children"]):
                if isinstance(child, dict) and child.get("id") == target_id:
                    obj["children"][i] = replacement
                    return True
        for v in obj.values():
            if replace_node(v, target_id, replacement):
                return True
    elif isinstance(obj, list):
        for item in obj:
            if replace_node(item, target_id, replacement):
                return True
    return False

found = replace_node(lib_data, "FkREj", new_fkrej)
if not found:
    print("Error: Could not find FkREj in lib_data!")
    sys.exit(1)

print("Found and replaced FkREj in memory.")
print("Saving to libraries/antd-6.lib.pen...")
with open(lib_path, "w", encoding="utf-8") as f:
    json.dump(lib_data, f, ensure_ascii=False, indent=2)
print("File successfully saved!")

print("\n2. Syncing to live Pencil session via PenMCP...")
try:
    mcp = PenMCP(file_path=lib_path)
    # Replace FkREj in live canvas
    # Note: Replace(targetId, newDefinition) in Pencil replaces the node with targetId
    js_code = f"""
    const newFk = {json.dumps(new_fkrej, ensure_ascii=False)};
    Replace("FkREj", newFk);
    Print("Live Pencil Replace(FkREj) executed successfully!");
    """
    res = mcp.execute(js_code)
    print("Pencil execute result:", res)
    mcp.close()
except Exception as e:
    print("Pencil live sync error:", e)
