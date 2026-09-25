import net from 'node:net';

export function executePencil(input) {
  return new Promise((resolve, reject) => {
    const socketPath = '/Users/yanxianliang/.pencil/socket/pencil-desktop.sock';
    const client = net.createConnection(socketPath);
    let resolved = false;

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        client.destroy();
        reject(new Error('Pencil execution timed out after 30s'));
      }
    }, 30000);

    let assignedClientId = '';

    client.on('error', (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        reject(err);
      }
    });

    let buffer = '';

    client.on('data', (d) => {
      buffer += d.toString('utf8');
      let idx;
      while ((idx = buffer.indexOf('\x0c')) !== -1) {
        const frame = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (!frame.trim()) continue;
        try {
          const msg = JSON.parse(frame);
          if (msg.data?.request_id === 'client-id-assignment') {
            assignedClientId = msg.data.client_id;
            // Send agent_connected
            client.write(JSON.stringify({
              type: 'agent_connected',
              data: { client_id: assignedClientId, agent: 'antigravity' }
            }) + '\x0c');

            // Send tool_request execute
            const req = {
              type: 'tool_request',
              data: {
                client_id: assignedClientId,
                request_id: 'exec-req-1',
                name: 'execute',
                payload: { input }
              }
            };
            client.write(JSON.stringify(req) + '\x0c');
          } else if (msg.data?.request_id === 'exec-req-1') {
            resolved = true;
            clearTimeout(timer);
            client.end();
            if (msg.data.success) {
              resolve(msg.data.result);
            } else {
              reject(new Error(msg.data.error || 'Execution failed'));
            }
          }
        } catch (e) {
          console.error('Error parsing frame:', e);
        }
      }
    });
  });
}
