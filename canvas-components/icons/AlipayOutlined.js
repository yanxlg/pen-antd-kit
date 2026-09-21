/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export AlipayOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M557.2 129a6.68 6.68 0 016.72 6.65V250.2h243.8a6.74 6.74 0 016.65 6.84c.02 23.92-6.05 54.69-19.85 54.69H563.94v81.1h166.18c7.69 0 13.8 6.51 13.25 14.18l-.11 1.51c-.7 90.2-30.63 180.64-79.52 259.65l8.71 3.82c77.3 33.48 162.15 60.85 267.15 64.14a21.08 21.08 0 0120.38 22.07l-.2 3.95c-3.34 59.57-20 132.85-79.85 132.85-8.8 0-17.29-.55-25.48-1.61-78.04-9.25-156.28-57.05-236.32-110.27l-17.33-11.57-13.15-8.83a480.83 480.83 0 01-69.99 57.25 192.8 192.8 0 01-19.57 11.08c-65.51 39.18-142.21 62.6-227.42 62.62-118.2 0-204.92-77.97-206.64-175.9l-.03-2.95.03-1.7c1.66-98.12 84.77-175.18 203-176.72l3.64-.03c102.92 0 186.66 33.54 270.48 73.14l.44.38 1.7-3.47c21.27-44.14 36.44-94.95 42.74-152.06h-324.8a6.64 6.64 0 01-6.63-6.62c-.04-21.86 6-54.91 19.85-54.91h162.1v-81.1H191.92a6.71 6.71 0 01-6.64-6.85c-.01-22.61 6.06-54.68 19.86-54.68h231.4v-64.85l.02-1.99c.9-30.93 23.72-54.36 120.64-54.36M256.9 619c-74.77 0-136.53 39.93-137.88 95.6l-.02 1.26.08 3.24a92.55 92.55 0 001.58 13.64c20.26 96.5 220.16 129.71 364.34-36.59l-8.03-4.72C405.95 650.11 332.94 619 256.9 619"}]};
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
  name: 'AlipayOutlined path ' + (index + 1),
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
