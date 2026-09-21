/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export SplitCellsOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M938.2 508.4L787.3 389c-3-2.4-7.3-.2-7.3 3.6V478H636V184h204v128c0 2.2 1.8 4 4 4h60c2.2 0 4-1.8 4-4V144c0-15.5-12.5-28-28-28H596c-15.5 0-28 12.5-28 28v736c0 15.5 12.5 28 28 28h284c15.5 0 28-12.5 28-28V712c0-2.2-1.8-4-4-4h-60c-2.2 0-4 1.8-4 4v128H636V546h144v85.4c0 3.8 4.4 6 7.3 3.6l150.9-119.4a4.5 4.5 0 000-7.2zM428 116H144c-15.5 0-28 12.5-28 28v168c0 2.2 1.8 4 4 4h60c2.2 0 4-1.8 4-4V184h204v294H244v-85.4c0-3.8-4.3-6-7.3-3.6l-151 119.4a4.52 4.52 0 000 7.1l151 119.5c2.9 2.3 7.3.2 7.3-3.6V546h144v294H184V712c0-2.2-1.8-4-4-4h-60c-2.2 0-4 1.8-4 4v168c0 15.5 12.5 28 28 28h284c15.5 0 28-12.5 28-28V144c0-15.5-12.5-28-28-28z"}]};
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
  name: 'SplitCellsOutlined path ' + (index + 1),
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
