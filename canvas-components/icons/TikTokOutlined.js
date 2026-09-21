/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export TikTokOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M530.01 112.67c43.67-.67 87-.34 130.33-.67 2.67 51 21 103 58.33 139 37.33 37 90 54 141.33 59.66V445c-48-1.67-96.33-11.67-140-32.34-19-8.66-36.66-19.66-54-31-.33 97.33.34 194.67-.66 291.67-2.67 46.66-18 93-45 131.33-43.66 64-119.32 105.66-196.99 107-47.66 2.66-95.33-10.34-136-34.34C220.04 837.66 172.7 765 165.7 687c-.67-16.66-1-33.33-.34-49.66 6-63.34 37.33-124 86-165.34 55.33-48 132.66-71 204.99-57.33.67 49.34-1.33 98.67-1.33 148-33-10.67-71.67-7.67-100.67 12.33-21 13.67-37 34.67-45.33 58.34-7 17-5 35.66-4.66 53.66 8 54.67 60.66 100.67 116.66 95.67 37.33-.34 73-22 92.33-53.67 6.33-11 13.33-22.33 13.66-35.33 3.34-59.67 2-119 2.34-178.66.33-134.34-.34-268.33.66-402.33"}]};
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
  name: 'TikTokOutlined path ' + (index + 1),
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
