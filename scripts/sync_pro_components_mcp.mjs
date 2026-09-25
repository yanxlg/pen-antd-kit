import { execSync } from 'node:child_process';
import { executePencil } from './live-pen-mcp.mjs';

async function main() {
  console.log('Generating pro_layer from build_pro_components.py...');
  const jsonStr = execSync('python3 -c "import sys, json; sys.path.append(\'.\'); from scripts.build_pro_components import build_pro_components; print(json.dumps(build_pro_components()))"', { maxBuffer: 50 * 1024 * 1024 }).toString();
  const proLayer = JSON.parse(jsonStr);

  console.log('Executing live Replace on Pencil canvas for Pro Components layer...');
  const snippet = `
    let targetId = null;
    const raw = __batchDesignGet(new Error().stack, undefined, { depth: 1 });
    const parsed = JSON.parse(raw);
    for (const n of parsed.nodes || []) {
      if (n.name && n.name.includes('08 Pro Components')) {
        targetId = n.id;
        break;
      }
    }
    if (!targetId) {
      targetId = 'bfPfO';
    }
    Print('Found target node:', targetId);
    const newId = Replace(targetId, ${JSON.stringify(proLayer)});
    const updated = Get(newId, { depth: 0 });
    Print('Replaced successfully! New ID:', newId, updated.name);
  `;

  try {
    const res = await executePencil(snippet);
    console.log('MCP Execution result:\n', res.message || res);
  } catch (err) {
    console.error('MCP Execution failed:', err);
    process.exit(1);
  }
}

main();
