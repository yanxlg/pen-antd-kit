import { createRequire } from 'node:module';
import { mkdir, rm, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const antdRequire = createRequire(require.resolve('antd'));
const iconsRequire = createRequire(antdRequire.resolve('@ant-design/icons'));
const definitions = iconsRequire('@ant-design/icons-svg/lib/index.js');
const outputDirectory = new URL('../canvas-components/icons/', import.meta.url);

function serializeDefinition(definition) {
  const svg = typeof definition.icon === 'function'
    ? definition.icon('__primary__', '__secondary__')
    : definition.icon;
  const paths = [];

  function visit(node) {
    if (node.tag === 'path') paths.push(node.attrs);
    for (const child of node.children || []) visit(child);
  }

  visit(svg);
  return {
    viewBox: svg.attrs.viewBox.split(' ').map(Number),
    paths,
  };
}

function sourceFor(name, definition) {
  return `/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export ${name}.
const definition = ${JSON.stringify(definition)};
const input = pencil.input || {};
const fontSize = Number(input.fontSize ?? 16);
if (!Number.isFinite(fontSize) || fontSize <= 0) throw new Error('fontSize must be a positive pixel value');

const rawTone = input.twoToneColor || '#1677ff';
const tones = Array.isArray(rawTone)
  ? rawTone
  : String(rawTone).trim().startsWith('[')
    ? JSON.parse(rawTone)
    : [rawTone];
const primary = tones[0];
const lighten = (color) => {
  const value = String(color).replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) return '#E6F4FF';
  const channels = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
  return '#' + channels.map((channel) => Math.round(channel + (255 - channel) * 0.9).toString(16).padStart(2, '0')).join('');
};
const secondary = tones[1] || lighten(primary);
const angle = Number(input.rotate || 0);
const radians = angle * Math.PI / 180;
const half = fontSize / 2;
const x = (Number(pencil.width) || fontSize) / 2 - half * Math.cos(radians) + half * Math.sin(radians);
const y = (Number(pencil.height) || fontSize) / 2 - half * Math.sin(radians) - half * Math.cos(radians);

return definition.paths.map((attrs, index) => ({
  type: 'path',
  name: '${name} path ' + (index + 1),
  x,
  y,
  width: fontSize,
  height: fontSize,
  viewBox: definition.viewBox,
  geometry: attrs.d,
  fill: attrs.fill === '__primary__'
    ? primary
    : attrs.fill === '__secondary__'
      ? secondary
      : (!attrs.fill || attrs.fill === 'currentColor')
        ? (input.color || '#1677FF')
        : attrs.fill,
  fillRule: attrs['fill-rule'] || 'nonzero',
  opacity: attrs['fill-opacity'] === undefined ? 1 : Number(attrs['fill-opacity']),
  rotation: -angle,
}));
`;
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const exports = Object.entries(definitions)
  .filter(([, definition]) => definition.icon)
  .sort(([left], [right]) => left.localeCompare(right));

for (const [name, definition] of exports) {
  await writeFile(new URL(`${name}.js`, outputDirectory), sourceFor(name, serializeDefinition(definition)));
}

await writeFile(
  new URL('index.json', outputDirectory),
  `${JSON.stringify(exports.map(([name]) => name), null, 2)}\n`,
);

console.log(`Generated ${exports.length} independent @ant-design/icons canvas components.`);
