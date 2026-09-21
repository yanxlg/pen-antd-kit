import { spawn } from 'child_process';
import fs from 'fs';

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--disable-gpu',
  '--window-size=1440,1200',
  'https://ant.design/components/menu'
]);

async function run() {
  await new Promise(r => setTimeout(r, 4000));
  const listRes = await fetch('http://localhost:9223/json');
  const tabs = await listRes.json();
  const tab = tabs.find(t => t.url.includes('ant.design'));
  if (!tab) { chrome.kill(); return; }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let id = 1;
  function send(method, params = {}) {
    return new Promise(res => {
      const msgId = id++;
      const h = e => {
        const d = JSON.parse(e.data);
        if (d.id === msgId) { ws.removeEventListener('message', h); res(d.result); }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.addEventListener('open', r));
  await new Promise(r => setTimeout(r, 4000));

  // Scroll to demo
  await send('Runtime.evaluate', {
    expression: "document.querySelector('#menu-demo-submenu-theme').scrollIntoView({ block: 'center' })"
  });
  await new Promise(r => setTimeout(r, 1000));

  // Take screenshot of viewport
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/real-viewport-submenu-theme.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved artifacts/real-viewport-submenu-theme.png');

  chrome.kill();
  process.exit(0);
}

run().catch(e => { console.error(e); chrome.kill(); process.exit(1); });
