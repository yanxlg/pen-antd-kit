import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const antdRequire = createRequire(require.resolve('antd'));
const routes = {
  '/react.js': join(dirname(require.resolve('react/package.json')), 'umd/react.development.js'),
  '/react-dom.js': join(dirname(require.resolve('react-dom/package.json')), 'umd/react-dom.development.js'),
  '/dayjs.js': antdRequire.resolve('dayjs/dayjs.min.js'),
  '/antd.js': require.resolve('antd/dist/antd.min.js'),
  '/reset.css': require.resolve('antd/dist/reset.css'),
  '/samples.js': new URL('./samples/catalog.js', import.meta.url),
};
const html = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>Ant Design 6.6.4 · UI reference</title><link rel="stylesheet" href="/reset.css"><style>body{margin:0;padding:32px;background:#f5f5f5}*{box-sizing:border-box}.catalog{display:grid;grid-template-columns:repeat(3,400px);gap:40px}.sample{width:400px;break-inside:avoid}.sample h2{font:600 16px/24px -apple-system,BlinkMacSystemFont,sans-serif;margin:0 0 12px}.sample-body{position:relative;background:white;padding:16px;min-height:64px;width:400px}.sample-body:after{content:'';display:block;clear:both}.standalone{display:block}.standalone .sample{margin-bottom:32px}.sample-body .ant-input-number-handler-wrap{opacity:1!important;visibility:visible!important}.sample-body .ant-input-number-handler{height:50%!important}</style><div id="root"></div><script src="/react.js"></script><script src="/react-dom.js"></script><script src="/dayjs.js"></script><script src="/antd.js"></script><script src="/samples.js"></script></html>`;
const server = createServer(async (req, res) => {
  try {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(html); return; }
    if (!routes[path]) { res.writeHead(404); res.end('Not found'); return; }
    res.setHeader('Content-Type', path.endsWith('.css') ? 'text/css' : 'text/javascript; charset=utf-8');
    res.end(await readFile(routes[path]));
  } catch (error) { res.writeHead(500); res.end(String(error)); }
});
server.listen(4318, '127.0.0.1', () => console.log('Antd source samples: http://127.0.0.1:4318'));
