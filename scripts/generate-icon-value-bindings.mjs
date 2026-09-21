import {readFile, writeFile} from 'node:fs/promises';

const values = JSON.parse(await readFile(new URL('../registry/icon-component-values.json', import.meta.url), 'utf8'));
for (const file of ['Button.js', 'FloatButton.js']) {
  const path = new URL('../canvas-components/' + file, import.meta.url);
  let source = await readFile(path, 'utf8');
  if (!/^const iconValues=.*;$/m.test(source)) throw new Error('Missing Icon value binding in ' + file);
  await writeFile(path, source.replace(/^const iconValues=.*;$/m, 'const iconValues=' + JSON.stringify(values) + ';'));
}
console.log('Generated complete Icon input bindings for Button and FloatButton.');
