import {readFile, writeFile} from 'node:fs/promises';

const values = JSON.parse(await readFile(new URL('../registry/icon-component-values.json', import.meta.url), 'utf8'));
for (const file of ['Button.js', 'FloatButton.js']) {
  const path = new URL('../canvas-components/' + file, import.meta.url);
  let source = await readFile(path, 'utf8');
  if (!source.includes("?'antd-icon-live-origin':iconValues[i.icon]")) source = source.replace("?'antd-icon-live-origin':i.icon", "?'antd-icon-live-origin':iconValues[i.icon]?'antd-icon-live-origin':i.icon");
  source = source.replace('ref:i.icon,x:', "ref:iconValues[i.icon]?'antd-icon-live-origin':i.icon,x:");
  if (!/^const iconValues=.*;$/m.test(source)) throw new Error('Missing Icon value binding in ' + file);
  await writeFile(path, source.replace(/^const iconValues=.*;$/m, 'const iconValues=' + JSON.stringify(values) + ';'));
}
console.log('Generated complete Icon input bindings for Button and FloatButton.');
