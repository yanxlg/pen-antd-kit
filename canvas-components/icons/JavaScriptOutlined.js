/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export JavaScriptOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M416 176H255.54v425.62c0 105.3-36.16 134.71-99.1 134.71-29.5 0-56.05-5.05-76.72-12.14L63 848.79C92.48 858.91 137.73 865 173.13 865 317.63 865 416 797.16 416 602.66zm349.49-16C610.26 160 512 248.13 512 364.6c0 100.32 75.67 163.13 185.7 203.64 79.57 28.36 111.03 53.7 111.03 95.22 0 45.57-36.36 74.96-105.13 74.96-63.87 0-121.85-21.31-161.15-42.58v-.04L512 822.43C549.36 843.73 619.12 865 694.74 865 876.52 865 961 767.75 961 653.3c0-97.25-54.04-160.04-170.94-204.63-86.47-34.44-122.81-53.67-122.81-97.23 0-34.45 31.45-65.84 96.3-65.84 63.83 0 107.73 21.45 133.3 34.64l38.34-128.19C895.1 174.46 841.11 160 765.5 160"}]};
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
  name: 'JavaScriptOutlined path ' + (index + 1),
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
