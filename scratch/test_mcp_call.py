import sys
import subprocess
import json

proc = subprocess.Popen(
    ["/Applications/Pen.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64", "--app", "desktop", "--agent", "antigravity"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

init_req = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
        "protocolVersion": "2024-11-05",
        "capabilities": {},
        "clientInfo": {"name": "test", "version": "1.0"}
    }
}

proc.stdin.write(json.dumps(init_req) + "\n")
proc.stdin.flush()
line = proc.stdout.readline()
print("Init response:", line.strip())

proc.stdin.write(json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized"}) + "\n")
proc.stdin.flush()

tools_req = {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}
proc.stdin.write(json.dumps(tools_req) + "\n")
proc.stdin.flush()
line = proc.stdout.readline()
print("Tools response:", line.strip()[:200])

proc.terminate()
