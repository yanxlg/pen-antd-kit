import socket
import json
import sys

class PenMCP:
    def __init__(self, file_path="/Users/yanxianliang/overseas/pen-antd-kit/libraries/antd-6.lib.pen"):
        self.file_path = file_path
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.sock.connect("/Users/yanxianliang/.pencil/socket/pencil-desktop.sock")
        self.buf = b""
        self._req_counter = 1
        
        init_res = self._read()
        self.client_id = init_res["data"]["client_id"]
        self._send("agent_connected", {"client_id": self.client_id, "agent": "antigravity"})

    def _read(self):
        while b"\x0c" not in self.buf:
            chunk = self.sock.recv(4096)
            if not chunk:
                return None
            self.buf += chunk
        msg, self.buf = self.buf.split(b"\x0c", 1)
        return json.loads(msg.decode("utf-8"))

    def _send(self, event, data):
        payload = json.dumps({"type": event, "data": data}) + "\x0c"
        self.sock.sendall(payload.encode("utf-8"))

    def execute(self, js_code):
        req_id = f"req-{self._req_counter}"
        self._req_counter += 1
        self._send("tool_request", {
            "client_id": self.client_id,
            "request_id": req_id,
            "name": "execute",
            "payload": {
                "filePath": self.file_path,
                "input": js_code
            }
        })
        res = self._read()
        return res

    def close(self):
        try:
            self.sock.close()
        except:
            pass

if __name__ == "__main__":
    client = PenMCP()
    res = client.execute("Print('Pen MCP connection verified!');")
    print(res)
    client.close()
