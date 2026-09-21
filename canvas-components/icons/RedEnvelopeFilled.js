/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export RedEnvelopeFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zM647 470.4l-87.2 161h45.9c4.6 0 8.4 3.8 8.4 8.4v25.1c0 4.6-3.8 8.4-8.4 8.4h-63.3v28.6h63.3c4.6 0 8.4 3.8 8.4 8.4v25c.2 4.6-3.6 8.5-8.2 8.5h-63.3v49.9c0 4.6-3.8 8.4-8.4 8.4h-43.7c-4.6 0-8.4-3.8-8.4-8.4v-49.9h-63c-4.6 0-8.4-3.8-8.4-8.4v-25.1c0-4.6 3.8-8.4 8.4-8.4h63v-28.6h-63c-4.6 0-8.4-3.8-8.4-8.4v-25.1c0-4.6 3.8-8.4 8.4-8.4h45.4l-87.5-161c-2.2-4.1-.7-9.1 3.4-11.4 1.3-.6 2.6-1 3.9-1h48.8c3.2 0 6.1 1.8 7.5 4.6l71.9 141.8 71.9-141.9a8.5 8.5 0 017.5-4.6h47.8c4.6 0 8.4 3.8 8.4 8.4-.1 1.5-.5 2.9-1.1 4.1zM512.6 323L289 148h446L512.6 323z"}]};
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
  name: 'RedEnvelopeFilled path ' + (index + 1),
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
