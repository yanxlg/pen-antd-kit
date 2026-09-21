/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export PinterestFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M512 64C264.97 64 64 264.97 64 512c0 192.53 122.08 357.04 292.88 420.28-4.92-43.86-4.14-115.68 3.97-150.46 7.6-32.66 49.11-208.16 49.11-208.16s-12.53-25.1-12.53-62.16c0-58.24 33.74-101.7 75.77-101.7 35.74 0 52.97 26.83 52.97 58.98 0 35.96-22.85 89.66-34.7 139.43-9.87 41.7 20.91 75.7 62.02 75.7 74.43 0 131.64-78.5 131.64-191.77 0-100.27-72.03-170.38-174.9-170.38-119.15 0-189.08 89.38-189.08 181.75 0 35.98 13.85 74.58 31.16 95.58 3.42 4.16 3.92 7.78 2.9 12-3.17 13.22-10.22 41.67-11.63 47.5-1.82 7.68-6.07 9.28-14 5.59-52.3-24.36-85-100.81-85-162.25 0-132.1 95.96-253.43 276.71-253.43 145.29 0 258.18 103.5 258.18 241.88 0 144.34-91.02 260.49-217.31 260.49-42.44 0-82.33-22.05-95.97-48.1 0 0-21 79.96-26.1 99.56-8.82 33.9-46.55 104.13-65.49 136.03A446.16 446.16 0 00512 960c247.04 0 448-200.97 448-448S759.04 64 512 64"}]};
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
  name: 'PinterestFilled path ' + (index + 1),
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
