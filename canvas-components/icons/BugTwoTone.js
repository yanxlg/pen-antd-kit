/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export BugTwoTone.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M308 412v268c0 36.78 9.68 71.96 27.8 102.9a205.39 205.39 0 0073.3 73.3A202.68 202.68 0 00512 884c36.78 0 71.96-9.68 102.9-27.8a205.39 205.39 0 0073.3-73.3A202.68 202.68 0 00716 680V412H308zm484 172v96c0 6.5-.22 12.95-.66 19.35C859.94 728.64 908 796.7 908 876a8 8 0 01-8 8h-56a8 8 0 01-8-8c0-44.24-23.94-82.89-59.57-103.7a278.63 278.63 0 01-22.66 49.02 281.39 281.39 0 01-100.45 100.45C611.84 946.07 563.55 960 512 960s-99.84-13.93-141.32-38.23a281.39 281.39 0 01-100.45-100.45 278.63 278.63 0 01-22.66-49.02A119.95 119.95 0 00188 876a8 8 0 01-8 8h-56a8 8 0 01-8-8c0-79.3 48.07-147.36 116.66-176.65A284.12 284.12 0 01232 680v-96H84a8 8 0 01-8-8v-56a8 8 0 018-8h148V412c-76.77 0-139-62.23-139-139a8 8 0 018-8h60a8 8 0 018 8 63 63 0 0063 63h560a63 63 0 0063-63 8 8 0 018-8h60a8 8 0 018 8c0 76.77-62.23 139-139 139v100h148a8 8 0 018 8v56a8 8 0 01-8 8H792zM368 272a8 8 0 01-8 8h-56a8 8 0 01-8-8c0-40.04 8.78-76.75 25.9-108.07a184.57 184.57 0 0174.03-74.03C427.25 72.78 463.96 64 504 64h16c40.04 0 76.75 8.78 108.07 25.9a184.57 184.57 0 0174.03 74.03C719.22 195.25 728 231.96 728 272a8 8 0 01-8 8h-56a8 8 0 01-8-8c0-28.33-5.94-53.15-17.08-73.53a112.56 112.56 0 00-45.39-45.4C573.15 141.95 548.33 136 520 136h-16c-28.33 0-53.15 5.94-73.53 17.08a112.56 112.56 0 00-45.4 45.39C373.95 218.85 368 243.67 368 272z","fill":"__primary__"},{"d":"M308 412v268c0 36.78 9.68 71.96 27.8 102.9a205.39 205.39 0 0073.3 73.3A202.68 202.68 0 00512 884c36.78 0 71.96-9.68 102.9-27.8a205.39 205.39 0 0073.3-73.3A202.68 202.68 0 00716 680V412H308z","fill":"__secondary__"}]};
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
  name: 'BugTwoTone path ' + (index + 1),
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
