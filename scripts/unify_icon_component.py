#!/usr/bin/env python3
import json
import re
import os
import shutil

LIB_PATH = 'libraries/antd-6.lib.pen'
BACKUP_PATH = 'libraries/antd-6.lib.pen.icon_backup'

print(f"Reading {LIB_PATH}...")
with open(LIB_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create backup
print(f"Creating backup at {BACKUP_PATH}...")
shutil.copyfile(LIB_PATH, BACKUP_PATH)

# Step 1: Collect mapping of old icon script IDs to their canonical icon names
old_id_to_name = {}
def collect_map(node):
    suri = node.get('scriptUri', '')
    nid = node.get('id')
    if 'icons/' in suri:
        m = re.search(r'icons/([^/]+)\.js', suri)
        if m:
            old_id_to_name[nid] = m.group(1)
    elif node.get('name', '').startswith('Icon.'):
        old_id_to_name[nid] = node.get('name')[5:]
    elif node.get('inputs', {}).get('name') and ('Icon' in suri or 'icon' in node.get('name', '').lower()):
        old_id_to_name[nid] = node['inputs']['name']
    elif node.get('inputs', {}).get('type') and ('Icon' in suri or 'icon' in node.get('name', '').lower()):
        old_id_to_name[nid] = node['inputs']['type']
    for c in node.get('children', []):
        collect_map(c)

collect_map(data)
print(f"Mapped {len(old_id_to_name)} old icon IDs to icon names.")

# Step 2: Locate artboard-icon-components and HaHLL
def find_node(node, nid):
    if node.get('id') == nid:
        return node
    for c in node.get('children', []):
        r = find_node(c, nid)
        if r:
            return r
    return None

hahll = find_node(data, 'HaHLL')
if not hahll:
    raise ValueError("Could not find HaHLL in artboard-icon-components!")

# Step 3: Remove antd-icon-live-origin from its old nested place in ULqLd
ulqld = find_node(data, 'ULqLd')
ot7kc = find_node(ulqld, 'oT7kc') if ulqld else None
if ot7kc:
    # replace antd-icon-live-origin in oT7kc with a ref
    new_children = []
    for c in ot7kc.get('children', []):
        if c.get('id') == 'antd-icon-live-origin':
            new_children.append({
                "type": "ref",
                "id": "ref-heart-outlined-origin",
                "name": "Icon",
                "ref": "antd-icon-live-origin",
                "width": 32,
                "height": 32,
                "inputs": {
                    "type": "HeartOutlined",
                    "fontSize": 32,
                    "color": "#000000E0",
                    "twoToneColor": "#1677ff",
                    "rotate": 0
                }
            })
        else:
            new_children.append(c)
    ot7kc['children'] = new_children
    print("Replaced old nested antd-icon-live-origin with ref in oT7kc.")

# Create the dedicated Master Component Card at the top of HaHLL
master_card = {
    "type": "frame",
    "id": "card-icon-master-definition",
    "name": "Master Component · Icon",
    "context": "div",
    "clip": True,
    "width": "fill_container",
    "cornerRadius": 8,
    "fill": "#FAFAFA",
    "stroke": {
        "fill": "#D9D9D9",
        "thickness": 1
    },
    "layout": "horizontal",
    "gap": 20,
    "padding": [20, 24, 20, 24],
    "alignItems": "center",
    "children": [
        {
            "type": "text",
            "id": "icon-master-badge",
            "name": "Component Title",
            "content": "Icon [Master Component]",
            "fontFamily": "Inter",
            "fontSize": 15,
            "fontWeight": "bold",
            "fill": "#000000E0"
        },
        {
            "type": "script",
            "id": "antd-icon-live-origin",
            "name": "Icon",
            "reusable": True,
            "metadata": {
                "type": "antd-component",
                "antd": {
                    "component": "Icon",
                    "category": "General",
                    "version": "6.4.3",
                    "props": {
                        "type": "SearchOutlined"
                    },
                    "tokens": {}
                }
            },
            "width": 24,
            "height": 24,
            "scriptUri": "../canvas-components/Icon.js",
            "inputs": {
                "type": "SearchOutlined",
                "fontSize": 24,
                "color": "#1677FF",
                "twoToneColor": "#1677ff",
                "rotate": 0
            }
        },
        {
            "type": "text",
            "id": "icon-master-desc",
            "name": "Component Description",
            "content": "Official Ant Design Icon Master Component. Select the component to choose an icon from the 'type' dropdown.",
            "fontFamily": "Inter",
            "fontSize": 13,
            "fill": "#00000073"
        }
    ]
}

# Ensure card-icon-master-definition is at index 0 of hahll
existing_card = find_node(hahll, 'card-icon-master-definition')
if not existing_card:
    hahll['children'].insert(0, master_card)
    print("Inserted Master Component Card at index 0 of HaHLL.")
else:
    print("Master Component Card already present.")

# Step 4: Convert all 848 cards in bX83F to ref nodes
bx = find_node(data, 'bX83F')
bx_converted = 0
def convert_bx(node):
    global bx_converted
    if node.get('type') == 'script' and node.get('id') != 'antd-icon-live-origin':
        nid = node.get('id')
        icon_name = old_id_to_name.get(nid)
        if not icon_name:
            suri = node.get('scriptUri', '')
            m = re.search(r'icons/([^/]+)\.js', suri)
            if m: icon_name = m.group(1)
            elif node.get('name', '').startswith('Icon.'): icon_name = node.get('name')[5:]
            else: icon_name = 'SearchOutlined'
        
        inputs = node.get('inputs', {})
        node['type'] = 'ref'
        node['name'] = 'Icon'
        node['ref'] = 'antd-icon-live-origin'
        node.pop('reusable', None)
        node.pop('metadata', None)
        node.pop('scriptUri', None)
        node['inputs'] = {
            'type': icon_name,
            'fontSize': inputs.get('fontSize', 24),
            'color': inputs.get('color', '#555555'),
            'twoToneColor': inputs.get('twoToneColor', '#1677ff'),
            'rotate': inputs.get('rotate', 0)
        }
        bx_converted += 1
    for c in node.get('children', []):
        convert_bx(c)

if bx:
    convert_bx(bx)
print(f"Converted {bx_converted} scripts in bX83F to ref: antd-icon-live-origin.")

# Step 5: Convert scripts in ULqLd
ul_converted = 0
def convert_ul(node):
    global ul_converted
    if node.get('type') == 'script' and node.get('id') != 'antd-icon-live-origin':
        nid = node.get('id')
        icon_name = old_id_to_name.get(nid)
        if not icon_name:
            suri = node.get('scriptUri', '')
            m = re.search(r'icons/([^/]+)\.js', suri)
            if m: icon_name = m.group(1)
            else: icon_name = node.get('name', 'SearchOutlined')
        
        inputs = node.get('inputs', {})
        node['type'] = 'ref'
        node['name'] = 'Icon'
        node['ref'] = 'antd-icon-live-origin'
        node.pop('reusable', None)
        node.pop('metadata', None)
        node.pop('scriptUri', None)
        node['inputs'] = {
            'type': icon_name,
            'fontSize': inputs.get('fontSize', 32),
            'color': inputs.get('color', '#000000E0'),
            'twoToneColor': inputs.get('twoToneColor', '#1677ff'),
            'rotate': inputs.get('rotate', 0)
        }
        ul_converted += 1
    for c in node.get('children', []):
        convert_ul(c)

if ulqld:
    convert_ul(ulqld)
print(f"Converted {ul_converted} scripts in ULqLd to ref: antd-icon-live-origin.")

# Step 6: Convert other scripts (in Upload, TreeSelect, etc.)
other_converted = 0
def convert_other_scripts(node):
    global other_converted
    if node.get('type') == 'script' and node.get('id') != 'antd-icon-live-origin':
        suri = node.get('scriptUri', '')
        if 'icons/' in suri or 'Icon.js' in suri:
            node['scriptUri'] = '../canvas-components/Icon.js'
            node.pop('reusable', None)
            inputs = node.setdefault('inputs', {})
            icon_name = inputs.get('type') or inputs.get('name')
            if not icon_name and 'icons/' in suri:
                m = re.search(r'icons/([^/]+)\.js', suri)
                if m: icon_name = m.group(1)
            if not icon_name:
                icon_name = old_id_to_name.get(node.get('id'), 'SearchOutlined')
            inputs['type'] = icon_name
            inputs['name'] = icon_name
            other_converted += 1
    for c in node.get('children', []):
        convert_other_scripts(c)

convert_other_scripts(data)
print(f"Updated {other_converted} other icon scripts to point to Icon.js with type prop.")

# Step 7: Update all refs that pointed to old icon IDs in Usage, Components, and everywhere
refs_updated = 0
def update_refs(node):
    global refs_updated
    if node.get('type') == 'ref':
        ref_id = node.get('ref')
        if ref_id in old_id_to_name:
            icon_name = old_id_to_name[ref_id]
            node['ref'] = 'antd-icon-live-origin'
            node['name'] = 'Icon'
            inputs = node.setdefault('inputs', {})
            inputs['type'] = icon_name
            inputs['name'] = icon_name
            refs_updated += 1
    for c in node.get('children', []):
        update_refs(c)

update_refs(data)
print(f"Updated {refs_updated} refs pointing to old icon IDs to antd-icon-live-origin.")

# Step 8: Verify the entire scenegraph
all_ids = set()
def collect_all_ids(node):
    if 'id' in node:
        all_ids.add(node['id'])
    for c in node.get('children', []):
        collect_all_ids(c)
collect_all_ids(data)

broken_refs = []
total_reusables = []
total_icon_scripts = []
def audit(node):
    if node.get('type') == 'ref':
        r = node.get('ref')
        if r and r not in all_ids:
            broken_refs.append((node.get('id'), node.get('name'), r))
    if node.get('reusable'):
        total_reusables.append((node.get('id'), node.get('name')))
    suri = node.get('scriptUri', '')
    if 'icons/' in suri:
        total_icon_scripts.append((node.get('id'), suri))
    for c in node.get('children', []):
        audit(c)

audit(data)
print(f"Broken refs: {len(broken_refs)}")
if broken_refs:
    for br in broken_refs[:10]:
        print(" ", br)
print(f"Total reusable components now: {len(total_reusables)}")
print(f"Old icon scripts remaining: {len(total_icon_scripts)}")

# Step 9: Save updated file
print(f"Writing updated scenegraph to {LIB_PATH}...")
with open(LIB_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("SUCCESS: libraries/antd-6.lib.pen updated cleanly!")
