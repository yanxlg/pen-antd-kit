/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export DeleteColumnOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M651.1 641.9a7.84 7.84 0 00-5.1-1.9h-54.7c-2.4 0-4.6 1.1-6.1 2.9L512 730.7l-73.1-87.8a8.1 8.1 0 00-6.1-2.9H378c-1.9 0-3.7.7-5.1 1.9a7.97 7.97 0 00-1 11.3L474.2 776 371.8 898.9a8.06 8.06 0 006.1 13.2h54.7c2.4 0 4.6-1.1 6.1-2.9l73.1-87.8 73.1 87.8a8.1 8.1 0 006.1 2.9h55c1.9 0 3.7-.7 5.1-1.9 3.4-2.8 3.9-7.9 1-11.3L549.8 776l102.4-122.9c2.8-3.4 2.3-8.4-1.1-11.2zM472 544h80c4.4 0 8-3.6 8-8V120c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v416c0 4.4 3.6 8 8 8zM350 386H184V136c0-3.3-2.7-6-6-6h-60c-3.3 0-6 2.7-6 6v292c0 16.6 13.4 30 30 30h208c3.3 0 6-2.7 6-6v-60c0-3.3-2.7-6-6-6zm556-256h-60c-3.3 0-6 2.7-6 6v250H674c-3.3 0-6 2.7-6 6v60c0 3.3 2.7 6 6 6h208c16.6 0 30-13.4 30-30V136c0-3.3-2.7-6-6-6z"}]};
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
  name: 'DeleteColumnOutlined path ' + (index + 1),
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
