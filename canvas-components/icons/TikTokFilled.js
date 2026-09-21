/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export TikTokFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M912 224.96C912 162.57 861.42 112 799.04 112H224.96C162.57 112 112 162.57 112 224.96v574.08C112 861.43 162.58 912 224.96 912h574.08C861.42 912 912 861.43 912 799.04zM774.76 460.92c-51.62.57-99.71-15.03-141.94-43.93v202.87a192.3 192.3 0 01-149 187.85c-119.06 27.17-219.86-58.95-232.57-161.83-13.3-102.89 52.32-193.06 152.89-213.29 19.65-4.04 49.2-4.04 64.46-.57v108.66c-4.7-1.15-9.09-2.31-13.71-2.89-39.3-6.94-77.37 12.72-92.98 48.55-15.6 35.84-5.16 77.45 26.63 101.73 26.59 20.8 56.09 23.7 86.14 9.82 30.06-13.29 46.21-37.56 49.68-70.5.58-4.63.54-9.84.54-15.04V222.21c0-10.99.09-10.5 11.07-10.5h86.12c6.36 0 8.67.9 9.25 8.43 4.62 67.04 55.53 124.14 120.84 132.81 6.94 1.16 14.37 1.62 22.58 2.2z"}]};
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
  name: 'TikTokFilled path ' + (index + 1),
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
