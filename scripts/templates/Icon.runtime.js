const input = pencil.input || {};
const name = (input.name && (!input.type || input.type === 'SearchOutlined'))
  ? input.name
  : (input.type || input.name || 'SearchOutlined');
const definition = icons[name];
if (!definition) throw new Error('Unknown Ant Design icon export: ' + name);
const fontSize = Number(input.fontSize ?? 16);
if (!Number.isFinite(fontSize) || fontSize <= 0) throw new Error('fontSize must be a positive pixel value');
const raw = input.twoToneColor || '#1677ff';
const tones = Array.isArray(raw) ? raw : String(raw).trim().startsWith('[') ? JSON.parse(raw) : [raw];
const primary = tones[0];
const secondary = tones[1] || generate(primary)[0];
const angle = Number(input.rotate || 0);
const radians = angle * Math.PI / 180;
const half = fontSize / 2;
const x = (Number(pencil.width) || fontSize) / 2 - half * Math.cos(radians) + half * Math.sin(radians);
const y = (Number(pencil.height) || fontSize) / 2 - half * Math.sin(radians) - half * Math.cos(radians);
return definition.paths.map((attrs, index) => ({
  type: 'path', name: name + ' path ' + (index + 1),
  x, y, width: fontSize, height: fontSize,
  viewBox: definition.viewBox, geometry: attrs.d,
  fill: attrs.fill === '__primary__' ? primary : attrs.fill === '__secondary__' ? secondary : (!attrs.fill || attrs.fill === 'currentColor') ? (input.color || '#000000E0') : attrs.fill,
  fillRule: attrs['fill-rule'] || 'nonzero',
  opacity: attrs['fill-opacity'] === undefined ? 1 : Number(attrs['fill-opacity']),
  rotation: -angle,
}));
