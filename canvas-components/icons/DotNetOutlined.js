/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export DotNetOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M101.28 662c-10.65 0-19.53-3.3-26.63-9.89-7.1-6.6-10.65-14.7-10.65-24.32 0-9.89 3.65-18 10.96-24.31 7.3-6.32 16.42-9.48 27.35-9.48 11.06 0 20.1 3.2 27.14 9.58 7.03 6.39 10.55 14.46 10.55 24.21 0 10.03-3.58 18.24-10.76 24.63-7.17 6.39-16.49 9.58-27.96 9.58M458 657h-66.97l-121.4-185.35c-7.13-10.84-12.06-19-14.8-24.48h-.82c1.1 10.42 1.65 26.33 1.65 47.72V657H193V362h71.49l116.89 179.6a423.23 423.23 0 0114.79 24.06h.82c-1.1-6.86-1.64-20.37-1.64-40.53V362H458zM702 657H525V362h170.2v54.1H591.49v65.63H688v53.9h-96.52v67.47H702zM960 416.1h-83.95V657h-66.5V416.1H726V362h234z"}]};
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
  name: 'DotNetOutlined path ' + (index + 1),
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
