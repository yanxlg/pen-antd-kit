/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export PinterestOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64m0 38.96c226.14 0 409.04 182.9 409.04 409.04 0 226.14-182.9 409.04-409.04 409.04-41.37 0-81.27-6.19-118.89-17.57 16.76-28.02 38.4-68.06 46.99-101.12 5.1-19.6 26.1-99.56 26.1-99.56 13.64 26.04 53.5 48.09 95.94 48.09 126.3 0 217.34-116.15 217.34-260.49 0-138.37-112.91-241.88-258.2-241.88-180.75 0-276.69 121.32-276.69 253.4 0 61.44 32.68 137.91 85 162.26 7.92 3.7 12.17 2.1 14-5.59 1.4-5.83 8.46-34.25 11.63-47.48 1.02-4.22.53-7.86-2.89-12.02-17.31-21-31.2-59.58-31.2-95.56 0-92.38 69.94-181.78 189.08-181.78 102.88 0 174.93 70.13 174.93 170.4 0 113.28-57.2 191.78-131.63 191.78-41.11 0-71.89-34-62.02-75.7 11.84-49.78 34.7-103.49 34.7-139.44 0-32.15-17.25-58.97-53-58.97-42.02 0-75.78 43.45-75.78 101.7 0 37.06 12.56 62.16 12.56 62.16s-41.51 175.5-49.12 208.17c-7.62 32.64-5.58 76.6-2.43 109.34C208.55 830.52 102.96 683.78 102.96 512c0-226.14 182.9-409.04 409.04-409.04"}]};
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
  name: 'PinterestOutlined path ' + (index + 1),
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
