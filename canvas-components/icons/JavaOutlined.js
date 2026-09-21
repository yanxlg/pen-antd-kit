/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export JavaOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M394.68 756.99s-34.33 19.95 24.34 26.6c71.1 8.05 107.35 7 185.64-7.87 0 0 20.66 12.94 49.38 24.14-175.47 75.08-397.18-4.37-259.36-42.87m-21.37-98.17s-38.35 28.35 20.32 34.47c75.83 7.88 135.9 8.4 239.57-11.55 0 0 14.36 14.53 36.95 22.4-212.43 62.13-448.84 5.08-296.84-45.32m180.73-166.43c43.26 49.7-11.38 94.5-11.38 94.5s109.8-56.7 59.37-127.57c-47.11-66.15-83.19-99.05 112.25-212.27.18 0-306.82 76.65-160.24 245.35m232.22 337.04s25.4 20.82-27.85 37.1c-101.4 30.62-421.7 39.9-510.66 1.22-32.05-13.82 28.02-33.25 46.93-37.27 19.62-4.2 31-3.5 31-3.5-35.55-25.03-229.94 49.17-98.77 70.35 357.6 58.1 652.16-26.08 559.35-67.9m-375.12-272.3s-163.04 38.68-57.79 52.68c44.48 5.95 133.1 4.55 215.58-2.28 67.42-5.6 135.2-17.85 135.2-17.85s-23.82 10.15-40.98 21.88c-165.5 43.57-485.1 23.27-393.16-21.18 77.93-37.45 141.15-33.25 141.15-33.25M703.6 720.42c168.3-87.33 90.37-171.33 36.08-159.95-13.31 2.8-19.27 5.25-19.27 5.25s4.9-7.7 14.36-11.03C842.12 516.9 924.78 666 700.1 724.97c0-.18 2.63-2.45 3.5-4.55M602.03 64s93.16 93.1-88.44 236.25c-145.53 114.8-33.27 180.42 0 255.14-84.94-76.65-147.28-144.02-105.42-206.84C469.63 256.67 639.68 211.87 602.03 64M427.78 957.19C589.24 967.5 837.22 951.4 843 875.1c0 0-11.2 28.88-133.44 51.98-137.83 25.9-307.87 22.92-408.57 6.3 0-.18 20.66 16.97 126.79 23.8"}]};
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
  name: 'JavaOutlined path ' + (index + 1),
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
