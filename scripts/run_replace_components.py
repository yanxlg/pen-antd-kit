import json
from scripts.pen_mcp import PenMCP
from scripts.build_form_components import PoM3O_new

mcp = PenMCP()
code = f'''
Replace("PoM3O", {json.dumps(PoM3O_new)});

// 通过父节点 artboard-form-components 获取第二个子节点的 bounds
const art = Get("artboard-form-components");
const newContentId = art.children[1].id;
Print("New content ID: " + newContentId);

const pBounds = Get(newContentId, (node, context) => context.depth === 0 ? context.bounds : null)[0];
Print("New content bounds: " + JSON.stringify(pBounds));

const newArtHeight = Math.ceil(160 + pBounds.height + 32);
Update("artboard-form-components", {{"height": newArtHeight}});
Print("Updated artboard-form-components height to: " + newArtHeight);

Export(["artboard-form-components"], "png", "/Users/yanxianliang/.gemini/antigravity-ide/brain/128501c9-c7dd-40f4-a82d-c10dcec56f51/components_rebuilt.png");
'''

res = mcp.execute(code)
print("Replace result:", res)
mcp.close()

# 同步写入 libraries/antd-6.lib.pen
lib_path = "libraries/antd-6.lib.pen"
with open(lib_path, "r") as f:
    pen_data = json.load(f)

def replace_node_in_tree(node, target_id, new_content):
    if isinstance(node, dict):
        if "children" in node and isinstance(node["children"], list):
            for i, child in enumerate(node["children"]):
                if isinstance(child, dict) and (child.get("id") == target_id or child.get("name") == "Form component definition"):
                    node["children"][i] = new_content
                    return True
                if replace_node_in_tree(child, target_id, new_content):
                    return True
        for k, v in node.items():
            if replace_node_in_tree(v, target_id, new_content):
                return True
    elif isinstance(node, list):
        for item in node:
            if replace_node_in_tree(item, target_id, new_content):
                return True
    return False

def update_node_prop(node, target_id, prop_key, prop_val):
    if isinstance(node, dict):
        if node.get("id") == target_id:
            node[prop_key] = prop_val
            return True
        for k, v in node.items():
            if update_node_prop(v, target_id, prop_key, prop_val):
                return True
    elif isinstance(node, list):
        for item in node:
            if update_node_prop(item, target_id, prop_key, prop_val):
                return True
    return False

msg = res.get("data", {}).get("result", {}).get("message", "")
computed_h = 3000
for line in msg.split("\n"):
    if "Updated artboard-form-components height to:" in line:
        computed_h = int(line.split(":")[-1].strip())

r1 = replace_node_in_tree(pen_data, "PoM3O", PoM3O_new)
r2 = update_node_prop(pen_data, "artboard-form-components", "height", computed_h)
print(f"Persisted to file: replaced={r1}, new_height={r2} ({computed_h}px)")

with open(lib_path, "w") as f:
    json.dump(pen_data, f, indent=2, ensure_ascii=False)
print("Saved libraries/antd-6.lib.pen successfully!")
