/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export IeSquareFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM765.9 556.9H437.1c0 100.4 144.3 136 196.8 47.4h120.8c-32.6 91.7-119.7 146-216.8 146-35.1 0-70.3-.1-101.7-15.6-87.4 44.5-180.3 56.6-180.3-42 0-45.8 23.2-107.1 44-145C335 484 381.3 422.8 435.6 374.5c-43.7 18.9-91.1 66.3-122 101.2 25.9-112.8 129.5-193.6 237.1-186.5 130-59.8 209.7-34.1 209.7 38.6 0 27.4-10.6 63.3-21.4 87.9 25.2 45.5 33.3 97.6 26.9 141.2zm-72.3-272.5c-24 0-51.1 11.7-72.6 22 46.3 18 86 57.3 112.3 99.6 7.1-18.9 14.6-47.9 14.6-67.9 0-32-22.8-53.7-54.3-53.7zM540.5 399.1c-53.7 0-102 39.7-104 94.9h208c-2-55.1-50.6-94.9-104-94.9zM320.6 602.9c-73 152.4 11.5 172.2 100.3 123.3-46.6-27.5-82.6-72.2-100.3-123.3z"}]};
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
  name: 'IeSquareFilled path ' + (index + 1),
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
