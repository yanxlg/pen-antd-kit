import sys
import subprocess
import json

class PenClient:
    def __init__(self):
        self.proc = subprocess.Popen(
            ["/Applications/Pen.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64", "--app", "desktop", "--agent", "antigravity"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        self._req_id = 1
        # initialize
        self._call("initialize", {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "pen_client", "version": "1.0"}
        })
        self.proc.stdin.write(json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized"}) + "\n")
        self.proc.stdin.flush()

    def _call(self, method, params):
        req = {"jsonrpc": "2.0", "id": self._req_id, "method": method, "params": params}
        self._req_id += 1
        self.proc.stdin.write(json.dumps(req) + "\n")
        self.proc.stdin.flush()
        line = self.proc.stdout.readline()
        if not line:
            return None
        res = json.loads(line)
        if "error" in res:
            raise Exception(res["error"])
        return res.get("result")

    def call_tool(self, name, arguments):
        return self._call("tools/call", {"name": name, "arguments": arguments})

    def execute(self, js_code, file_path="libraries/antd-6.lib.pen"):
        res = self.call_tool("execute", {"filePath": file_path, "input": js_code})
        return res

    def close(self):
        try:
            self.proc.terminate()
        except:
            pass

if __name__ == "__main__":
    client = PenClient()
    js = """
    const c0 = Get("R4Lc9", {depth: 2});
    Print("Card 0 preview layout:", c0.children[0].layout);
    for (const c of c0.children[0].children) {
      Print(" - child:", c.id, c.name, c.type, c.x, c.y);
    }
    """
    res = client.execute(js)
    print("Execute output:", json.dumps(res, indent=2, ensure_ascii=False))
    client.close()
