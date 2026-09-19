#!/usr/bin/env python3
"""Thin stdio JSON-RPC client for the Pen (pencil) MCP server.

Usage: pen_mcp.py <tool_name> [args_json]
Prints the tool result content to stdout.
"""
import json
import subprocess
import sys

SERVER = "/Applications/Pen.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64"
ARGS = ["--app", "desktop", "--agent", "antigravity"]


def main():
    tool = sys.argv[1] if len(sys.argv) > 1 else "get_app_state"
    tool_args = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
    proc = subprocess.Popen(
        [SERVER] + ARGS,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
    )
    reqs = [
        {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
            "protocolVersion": "2025-03-26", "capabilities": {},
            "clientInfo": {"name": "wb", "version": "1.0"}}},
        {"jsonrpc": "2.0", "method": "notifications/initialized"},
        {"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {
            "name": tool, "arguments": tool_args}},
    ]
    payload = "".join(json.dumps(r) + "\n" for r in reqs).encode()
    try:
        out, _ = proc.communicate(payload, timeout=180)
    except subprocess.TimeoutExpired:
        proc.kill()
        out, _ = proc.communicate()
    result = None
    for line in out.decode("utf-8", "replace").splitlines():
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            msg = json.loads(line)
        except json.JSONDecodeError:
            continue
        if msg.get("id") == 2:
            result = msg
            break
    if result is None:
        print("NO_RESULT", file=sys.stderr)
        sys.exit(1)
    body = result.get("result", result.get("error"))
    contents = body.get("content") if isinstance(body, dict) else None
    if contents:
        for c in contents:
            if c.get("type") == "text":
                print(c.get("text", ""))
            else:
                print(json.dumps(c))
    else:
        print(json.dumps(body, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
