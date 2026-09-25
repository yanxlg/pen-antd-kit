import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

// Pen ships its MCP server inside the app bundle. Talking to it over stdio
// keeps every MCP-driven step reproducible from the CLI: the same calls work
// when the editor wiring is missing, stale, or pointed at another app name.

const appBundleServer = "/Applications/Pen.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64";

export function penMcpServer({ server } = {}) {
  if (server) return resolve(server);
  if (process.env.PEN_MCP_SERVER) return resolve(process.env.PEN_MCP_SERVER);
  if (existsSync(appBundleServer)) return appBundleServer;
  throw new Error("Pen MCP server not found. Pass --server <path> or set PEN_MCP_SERVER.");
}

function extensionFor(mimeType) {
  if (!mimeType) return ".bin";
  if (mimeType.includes("png")) return ".png";
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return ".jpg";
  if (mimeType.includes("webp")) return ".webp";
  if (mimeType.includes("svg")) return ".svg";
  if (mimeType.includes("json")) return ".json";
  if (mimeType.includes("text")) return ".txt";
  return extname(mimeType) || ".bin";
}

export async function penSession({ server, app = "desktop", agent = "codex", timeoutMs = 120000 } = {}) {
  const command = penMcpServer({ server });
  const child = spawn(command, ["--app", app, "--agent", agent], { stdio: ["pipe", "pipe", "pipe"] });

  let buffer = "";
  let stderr = "";
  const pending = new Map();
  child.stdout.on("data", (chunk) => {
    buffer += chunk.toString();
    let newline = buffer.indexOf("\n");
    while (newline !== -1) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (line) {
        try {
          const message = JSON.parse(line);
          const waiter = message.id !== undefined ? pending.get(message.id) : undefined;
          if (waiter) {
            pending.delete(message.id);
            waiter(message);
          }
        } catch {
          // Partial frames and log noise are not part of the protocol.
        }
      }
      newline = buffer.indexOf("\n");
    }
  });
  child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

  let nextId = 1;
  const request = (method, params) => new Promise((resolveRequest, rejectRequest) => {
    const id = nextId;
    nextId += 1;
    const timer = setTimeout(() => {
      pending.delete(id);
      rejectRequest(new Error(`Pen MCP request ${method} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    pending.set(id, (message) => {
      clearTimeout(timer);
      if (message.error) rejectRequest(new Error(`${message.error.message}${stderr ? `\n${stderr.trim()}` : ""}`));
      else resolveRequest(message.result);
    });
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
  });

  const notify = (method, params = {}) => child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", method, params })}\n`);

  await request("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "pen-antd-cli", version: "0.1.0" },
  });
  notify("notifications/initialized");

  return {
    command,
    listTools: () => request("tools/list", {}),
    call: (name, args = {}) => request("tools/call", { name, arguments: args }),
    close: () => child.kill(),
  };
}

export async function callPenTool({ tool, args = {}, server, app, agent, timeoutMs, outputDir }) {
  const session = await penSession({ server, app, agent, timeoutMs });
  try {
    const result = await session.call(tool, args);
    const texts = [];
    const images = [];
    for (const [index, item] of (result?.content || []).entries()) {
      if (item.type === "text" && typeof item.text === "string") texts.push(item.text);
      if (item.type === "image" && item.data) {
        const extension = extensionFor(item.mimeType);
        const path = outputDir
          ? join(resolve(outputDir), `${tool}-${index + 1}${extension}`)
          : undefined;
        if (path) {
          await mkdir(resolve(outputDir), { recursive: true });
          await writeFile(path, Buffer.from(item.data, "base64"));
          images.push({ path, mimeType: item.mimeType });
        } else {
          images.push({ mimeType: item.mimeType, bytes: Buffer.from(item.data, "base64").length });
        }
      }
    }
    return { tool, text: texts.join("\n"), images, isError: Boolean(result?.isError) };
  } finally {
    session.close();
  }
}

export async function listPenTools({ server, app, agent, timeoutMs } = {}) {
  const session = await penSession({ server, app, agent, timeoutMs });
  try {
    const result = await session.listTools();
    return (result?.tools || []).map((tool) => ({ name: tool.name, title: tool.annotations?.title, description: tool.description }));
  } finally {
    session.close();
  }
}
