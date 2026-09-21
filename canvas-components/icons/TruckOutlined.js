/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export TruckOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M608 192a32 32 0 0132 32v160h174.81a32 32 0 0126.68 14.33l113.19 170.84a32 32 0 015.32 17.68V672a32 32 0 01-32 32h-96c0 70.7-57.3 128-128 128s-128-57.3-128-128H384c0 70.7-57.3 128-128 128s-128-57.3-128-128H96a32 32 0 01-32-32V224a32 32 0 0132-32zM256 640a64 64 0 000 128h1.06A64 64 0 00256 640m448 0a64 64 0 000 128h1.06A64 64 0 00704 640M576 256H128v384h17.12c22.13-38.26 63.5-64 110.88-64 47.38 0 88.75 25.74 110.88 64H576zm221.63 192H640v145.12A127.43 127.43 0 01704 576c47.38 0 88.75 25.74 110.88 64H896v-43.52zM500 448a12 12 0 0112 12v40a12 12 0 01-12 12H332a12 12 0 01-12-12v-40a12 12 0 0112-12zM308 320a12 12 0 0112 12v40a12 12 0 01-12 12H204a12 12 0 01-12-12v-40a12 12 0 0112-12z"}]};
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
  name: 'TruckOutlined path ' + (index + 1),
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
