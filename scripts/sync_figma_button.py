#!/usr/bin/env python3
"""
Syncs the Button component area of libraries/antd-6.lib.pen from the LIVE Figma
editor (browser), instead of a downloaded .fig file.

How it works:
  1. Drives the open Figma page in the CDP-enabled Chrome (127.0.0.1:9222) via
     scripts/figma-copy-node.cjs: copies the Button page (unlocked nodes) and the
     three locked content frames (Principles / Usage / Components wrapper) to the
     macOS clipboard. Deep links select locked frames; Cmd+A skips them.
  2. Dumps each clipboard payload (public.html) with scripts/dump_clipboard_html.swift
     and extracts the base64 fig-kiwi buffer, which carries original node GUIDs.
  3. Merges the four captures into one node set that reconstructs the Figma
     "Button" page, then reuses import_figma_antd.build_figma_component_section()
     so the pen output is identical in structure to the .fig-based pipeline.
  4. Replaces only the "Button · 按钮" section inside the General layer of
     libraries/antd-6.lib.pen.

Prerequisite: a Chrome instance with remote debugging and the Figma file open:
  rsync -a --exclude 'Service Worker' --exclude 'WebStorage' --exclude 'Cache*' \
    "$HOME/Library/Application Support/Google/Chrome/Default/" /tmp/codex-figma-profile/Default/
  cp "$HOME/Library/Application Support/Google/Chrome/Local State" /tmp/codex-figma-profile/
  open -na "Google Chrome" --args --user-data-dir=/tmp/codex-figma-profile \
    --remote-debugging-port=9222 --no-first-run --no-default-browser-check \
    --disable-extensions --disable-component-update "<figma-file-url>"

Usage: python3 scripts/sync_figma_button.py
"""

import base64
import json
import os
import re
import subprocess
import sys
import tempfile

import fig_kiwi

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIBRARY_PATH = os.path.join(REPO, 'libraries', 'antd-6.lib.pen')
COPY_SCRIPT = os.path.join(REPO, 'scripts', 'figma-copy-node.cjs')
DUMP_SCRIPT = os.path.join(REPO, 'scripts', 'dump_clipboard_html.swift')

sys.path.insert(0, os.path.join(REPO, 'scripts'))
import import_figma_antd as ifa  # noqa: E402

# Figma node ids (sessionID-localID) of the Button page's locked content frames.
CAPTURES = [
    ('--all', 'page-unlocked'),        # headings, Button matrix, Button-Group
    ('55761-111481', 'principles'),    # locked Principles content frame
    ('65907-73', 'usage'),             # locked Usage content frame
    ('120085-168888', 'components'),   # locked Components wrapper (row labels)
]


def capture(target, name, workdir):
    print(f'Capturing {name} ({target}) from Figma editor...')
    subprocess.run(['node', COPY_SCRIPT, target], cwd=REPO, check=True)
    html_path = os.path.join(workdir, f'{name}.html')
    subprocess.run(['swift', DUMP_SCRIPT, html_path], check=True,
                   stdout=subprocess.DEVNULL)
    raw = open(html_path, 'rb').read().decode('utf-8')
    m = re.search(r'data-buffer="<!--\(figma\)(.*?)\(/figma\)-->', raw, re.S)
    if not m:
        raise RuntimeError(f'no figma buffer in clipboard after copying {name}')
    fig_path = os.path.join(workdir, f'{name}.fig')
    with open(fig_path, 'wb') as f:
        f.write(base64.b64decode(m.group(1)))
    return fig_path


def main():
    with tempfile.TemporaryDirectory() as workdir:
        merged = {}
        for target, name in CAPTURES:
            data = fig_kiwi.decode(capture(target, name, workdir), {})
            for n in data.get('nodeChanges', []):
                g = n.get('guid')
                if g:
                    merged.setdefault((g['sessionID'], g['localID']), n)

        print(f'Merged {len(merged)} nodes from {len(CAPTURES)} clipboard captures.')

        # Rebuild the hierarchy and hand it to the shared converter.
        ifa.nodes_by_guid.clear()
        ifa.children_by_parent.clear()
        for key, n in merged.items():
            ifa.nodes_by_guid[key] = n
            p = n.get('parentIndex')
            if p and p.get('guid'):
                ifa.children_by_parent.setdefault(
                    (p['guid']['sessionID'], p['guid']['localID']), []).append(n)

        page = next((n for n in merged.values() if n.get('type') == 'CANVAS'), None)
        if not page:
            raise RuntimeError('merged captures contain no CANVAS node')

        section, sec_w, sec_h = ifa.build_figma_component_section(
            page, 'Button', 'General', 0)

    with open(LIBRARY_PATH) as f:
        lib = json.load(f)

    general = next(l for l in lib['children']
                   if l.get('name', '').startswith('01 General'))
    old = next(c for c in general['children']
               if c.get('name') == 'Button · 按钮')
    section['x'] = old.get('x', 0)
    section['y'] = old.get('y', 90)
    general['children'][general['children'].index(old)] = section

    with open(LIBRARY_PATH, 'w') as f:
        json.dump(lib, f, indent=2)

    print(f'Button section synced ({sec_w}x{sec_h}):')
    for c in section['children']:
        print(f"  - {c.get('name')} ({c.get('width')}x{c.get('height')}, "
              f"{len(c.get('children') or [])} children)")


if __name__ == '__main__':
    main()
