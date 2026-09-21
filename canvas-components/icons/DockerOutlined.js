/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export DockerOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M555.88 488.24h-92.62v-82.79h92.62zm0-286.24h-92.62v85.59h92.62zm109.45 203.45H572.7v82.79h92.62zm-218.9-101.02h-92.61v84.18h92.6zm109.45 0h-92.61v84.18h92.6zm388.69 140.3c-19.65-14.02-67.36-18.23-102.44-11.22-4.2-33.67-23.85-63.14-57.53-89.8l-19.65-12.62-12.62 19.64c-25.26 39.29-32.28 103.83-5.62 145.92-12.63 7.02-36.48 15.44-67.35 15.44H67.56c-12.63 71.56 8.42 164.16 61.74 227.3C181.22 801.13 259.8 832 360.83 832c220.3 0 384.48-101.02 460.25-286.24 29.47 0 95.42 0 127.7-63.14 1.4-2.8 9.82-18.24 11.22-23.85zm-717.04-39.28h-92.61v82.79h92.6zm109.45 0h-92.61v82.79h92.6zm109.45 0h-92.61v82.79h92.6zM336.98 304.43h-92.61v84.19h92.6z"}]};
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
  name: 'DockerOutlined path ' + (index + 1),
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
