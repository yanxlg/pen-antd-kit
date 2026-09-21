/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export TelegramFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M509.9 64A448 448 0 0064 512a448 448 0 00448 448 448 448 0 00448-448A448 448 0 00512 64a448 448 0 00-2.1 0zm185.26 269.7c3.73-.08 11.98.85 17.36 5.22a18.9 18.9 0 016.38 12.14c.6 3.47 1.35 11.42.75 17.62-6.72 70.86-35.92 242.74-50.78 322.07-6.27 33.6-18.62 44.84-30.6 45.92-26 2.43-45.74-17.17-70.94-33.67-39.43-25.87-61.71-41.97-99.98-67.2-44.24-29.12-15.57-45.18 9.63-71.3 6.6-6.88 121.22-111.15 123.46-120.6.26-1.2.53-5.6-2.09-7.91s-6.5-1.53-9.3-.9c-3.95.9-66.93 42.56-188.94 124.88-17.92 12.32-34.08 18.3-48.6 17.92-15.98-.3-46.75-9-69.63-16.42-28.08-9.15-50.37-13.97-48.42-29.46 1-8.06 12.13-16.31 33.33-24.75 130.6-56.9 217.66-94.42 261.26-112.52 124.4-51.75 150.27-60.75 167.1-61.04z"}]};
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
  name: 'TelegramFilled path ' + (index + 1),
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
