import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const antdRequire = createRequire(require.resolve('antd'));
const iconsRequire = createRequire(antdRequire.resolve('@ant-design/icons'));
const definitions = iconsRequire('@ant-design/icons-svg/lib/index.js');
const { generate } = iconsRequire('@ant-design/colors');
const render = new Function('pencil', await readFile(new URL('../canvas-components/Icon.js', import.meta.url), 'utf8'));
let count = 0;
for (const [name, def] of Object.entries(definitions)) {
  if (!def.icon) continue;
  const svg = typeof def.icon === 'function' ? def.icon('#1677ff', generate('#1677ff')[0]) : def.icon;
  const expected = [];
  function walk(node) { if (node.tag === 'path') expected.push(node.attrs); for (const child of node.children || []) walk(child); }
  walk(svg);
  const output = render({ input: {name, fontSize: 24}, width:24, height:24 });
  assert.equal(output.length, expected.length, name);
  output.forEach((path, j) => {
    assert.equal(path.geometry, expected[j].d, name);
    assert.deepEqual(path.viewBox, svg.attrs.viewBox.split(' ').map(Number), name);
    assert.equal(path.fill, !expected[j].fill || expected[j].fill === 'currentColor' ? '#000000E0' : expected[j].fill, name);
    assert.equal(path.width, 24); assert.equal(path.height, 24);
    assert.equal(path.x, 0); assert.equal(path.y, 0);
  });
  count++;
}
for (const color of ['#eb2f96','#52c41a','#000000','#ffffff','#123abc','rebeccapurple','rgb(12, 90, 200)']) {
  const paths=render({input:{name:'HeartTwoTone',twoToneColor:color,fontSize:32}});
  assert.deepEqual(paths.map(p=>p.fill), [color,generate(color)[0]]);
}
assert.deepEqual(render({input:{name:'HeartTwoTone',twoToneColor:'["#123456","#abcdef"]'}}).map(p=>p.fill),['#123456','#abcdef']);
for (const angle of [0,45,90,180,270]) {
  const p=render({input:{name:'ArrowRightOutlined',fontSize:24,rotate:angle},width:24,height:24})[0];
  const r=angle*Math.PI/180;
  assert.ok(Math.abs(p.x+12*Math.cos(r)-12*Math.sin(r)-12)<1e-8);
  assert.ok(Math.abs(p.y+12*Math.sin(r)+12*Math.cos(r)-12)<1e-8);
  assert.equal(p.rotation,-angle);
}
assert.throws(()=>render({input:{name:'DoesNotExistOutlined'}}),/Unknown Ant Design/);
assert.throws(()=>render({input:{fontSize:0}}),/positive pixel/);
console.log(`PASS: ${count} official SVG definitions, colors, two-tone palettes, sizing, rotation, and invalid inputs.`);
