import { spawn } from 'child_process';
import fs from 'fs';

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--window-size=1440,1200',
  'https://ant.design/components/menu#menu-demo-submenu-theme'
]);

async function run() {
  await new Promise(r => setTimeout(r, 4000));
  const listRes = await fetch('http://localhost:9222/json');
  const tabs = await listRes.json();
  const tab = tabs.find(t => t.url.includes('ant.design'));
  if (!tab || !tab.webSocketDebuggerUrl) {
    console.log('No tab found');
    chrome.kill();
    return;
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.addEventListener('open', r));
  await new Promise(r => setTimeout(r, 4000));

  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const demo = document.querySelector('#menu-demo-submenu-theme');
        if (!demo) return { error: 'demo not found' };
        demo.scrollIntoView();
        const codeBox = demo.querySelector('.code-box-demo');
        const sw = demo.querySelector('.ant-switch');
        const menu = demo.querySelector('.ant-menu-root');
        const sub1 = demo.querySelector('.ant-menu-submenu-title');
        const popup = demo.querySelector('.ant-menu-submenu-popup');
        
        const r = el => {
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
        };

        return {
          demo: r(demo),
          codeBox: r(codeBox),
          sw: r(sw),
          menu: r(menu),
          sub1: r(sub1),
          popup: r(popup),
          popupClass: popup ? popup.className : null,
          popupStyle: popup ? popup.getAttribute('style') : null
        };
      })()
    `,
    returnByValue: true
  });

  const val = evalRes && evalRes.result ? evalRes.result.value : evalRes;
  console.log('EVAL_RESULT:', JSON.stringify(val, null, 2));

  if (val && val.codeBox) {
    const d = val.codeBox;
    // clip with 10px margin
    const clip = { x: Math.max(0, d.x - 10), y: Math.max(0, d.y - 10), width: d.w + 20, height: d.h + 20, scale: 2 };
    const shot = await send('Page.captureScreenshot', { clip });
    if (shot && shot.data) {
      fs.writeFileSync('artifacts/real-official-submenu-theme.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved artifacts/real-official-submenu-theme.png');
    }
  }

  chrome.kill();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  chrome.kill();
  process.exit(1);
});
