/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export PythonOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M555 790.5a28.5 28.5 0 1057 0 28.5 28.5 0 00-57 0m-143-557a28.5 28.5 0 1057 0 28.5 28.5 0 00-57 0"},{"d":"M821.52 297.71H726.3v-95.23c0-49.9-40.58-90.48-90.48-90.48H388.19c-49.9 0-90.48 40.57-90.48 90.48v95.23h-95.23c-49.9 0-90.48 40.58-90.48 90.48v247.62c0 49.9 40.57 90.48 90.48 90.48h95.23v95.23c0 49.9 40.58 90.48 90.48 90.48h247.62c49.9 0 90.48-40.57 90.48-90.48V726.3h95.23c49.9 0 90.48-40.58 90.48-90.48V388.19c0-49.9-40.57-90.48-90.48-90.48M202.48 669.14a33.37 33.37 0 01-33.34-33.33V388.19a33.37 33.37 0 0133.34-33.33h278.57a28.53 28.53 0 0028.57-28.57 28.53 28.53 0 00-28.57-28.58h-126.2v-95.23a33.37 33.37 0 0133.34-33.34h247.62a33.37 33.37 0 0133.33 33.34v256.47a24.47 24.47 0 01-24.47 24.48H379.33c-45.04 0-81.62 36.66-81.62 81.62v104.1zm652.38-33.33a33.37 33.37 0 01-33.34 33.33H542.95a28.53 28.53 0 00-28.57 28.57 28.53 28.53 0 0028.57 28.58h126.2v95.23a33.37 33.37 0 01-33.34 33.34H388.19a33.37 33.37 0 01-33.33-33.34V565.05a24.47 24.47 0 0124.47-24.48h265.34c45.04 0 81.62-36.67 81.62-81.62v-104.1h95.23a33.37 33.37 0 0133.34 33.34z"}]};
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
  name: 'PythonOutlined path ' + (index + 1),
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
