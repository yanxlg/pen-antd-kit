/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export InsuranceFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M519.9 358.8h97.9v41.6h-97.9zm347-188.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2zM411.3 656h-.2c0 4.4-3.6 8-8 8h-37.3c-4.4 0-8-3.6-8-8V471.4c-7.7 9.2-15.4 17.9-23.1 26a6.04 6.04 0 01-10.2-2.4l-13.2-43.5c-.6-2-.2-4.1 1.2-5.6 37-43.4 64.7-95.1 82.2-153.6 1.1-3.5 5-5.3 8.4-3.7l38.6 18.3c2.7 1.3 4.1 4.4 3.2 7.2a429.2 429.2 0 01-33.6 79V656zm296.5-49.2l-26.3 35.3a5.92 5.92 0 01-8.9.7c-30.6-29.3-56.8-65.2-78.1-106.9V656c0 4.4-3.6 8-8 8h-36.2c-4.4 0-8-3.6-8-8V536c-22 44.7-49 80.8-80.6 107.6a5.9 5.9 0 01-8.9-1.4L430 605.7a6 6 0 011.6-8.1c28.6-20.3 51.9-45.2 71-76h-55.1c-4.4 0-8-3.6-8-8V478c0-4.4 3.6-8 8-8h94.9v-18.6h-65.9c-4.4 0-8-3.6-8-8V316c0-4.4 3.6-8 8-8h184.7c4.4 0 8 3.6 8 8v127.2c0 4.4-3.6 8-8 8h-66.7v18.6h98.8c4.4 0 8 3.6 8 8v35.6c0 4.4-3.6 8-8 8h-59c18.1 29.1 41.8 54.3 72.3 76.9 2.6 2.1 3.2 5.9 1.2 8.5z"}]};
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
  name: 'InsuranceFilled path ' + (index + 1),
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
