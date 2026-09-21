/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export QwenFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M956.98 607.01L841.17 406.35l54.88-94.98a20.9 20.9 0 000-21.13l-60.97-105.65a21.28 21.28 0 00-18.3-10.57H585.07l-54.88-95.01a21.28 21.28 0 00-18.3-10.6H390A20.9 20.9 0 00371.7 79L255.86 279.6H146.1a20.9 20.9 0 00-18.3 10.6L66.87 395.78a20.9 20.9 0 000 21.17l115.85 200.7-54.88 95.02a20.9 20.9 0 000 21.13l61 105.65a21.28 21.28 0 0018.3 10.57h231.65l54.88 95a21.28 21.28 0 0018.3 10.61h121.92a21.28 21.28 0 0018.3-10.6l115.88-200.67h109.76a21.28 21.28 0 0018.3-10.56l61-105.58a20.53 20.53 0 00-.15-21.2M390.03 89.61l61 105.57-61 105.58h487.84l-61.08 105.58H341.2l-67.01-116.11zm48.76 739.23l-231.65-.08 61-105.65h121.9L146.16 300.84h121.97q118.8 205.97 237.7 411.86zm377.96-211.3L755.8 512 511.93 934.43l-61-105.66c79.48-137.12 158.66-274.43 237.92-411.7h134.1l115.8 200.62z"}]};
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
  name: 'QwenFilled path ' + (index + 1),
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
