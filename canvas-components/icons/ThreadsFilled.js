/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export ThreadsFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M518.94 960h-.26c-133.69-.9-236.47-44.99-305.53-131-61.42-76.57-93.15-183.12-94.2-316.63v-.63c1.12-133.62 32.82-240.05 94.27-316.66 69-86.1 171.85-130.18 305.5-131.08h.52c102.52.75 188.27 27.07 254.84 78.33 62.6 48.16 106.7 116.85 131 204.1l-76.16 21.24C787.71 219.83 683.4 144.27 518.91 143.1c-108.64.82-190.78 34.94-244.16 101.43C224.79 306.82 199 396.8 197.99 512c1 115.21 26.8 205.18 76.8 267.46 53.38 66.56 135.55 100.72 244.15 101.43 97.93-.75 162.7-23.56 216.54-76.35 61.49-60.21 60.4-134.13 40.7-179.12-11.58-26.5-32.6-48.53-61.01-65.33-7.17 50.47-23.22 91.31-47.94 122.15-33.08 41.14-79.9 63.62-139.25 66.83-44.88 2.42-88.15-8.14-121.67-29.9-39.69-25.73-62.9-64.97-65.4-110.66-2.44-44.43 15.22-85.31 49.64-115.06 32.86-28.38 79.11-45.07 133.77-48.2a517.18 517.18 0 01112.75 5.3c-4.7-27.7-14-49.73-28-65.6C589.9 363.08 560.23 352 521 351.73h-1.09c-31.5 0-74.36 8.66-101.58 49.28l-65.6-44.06c36.6-54.28 95.88-84.22 167.18-84.22h1.65c119.24.75 190.29 73.73 197.38 201.15 4.03 1.72 8.06 3.51 11.98 5.3 55.63 26.14 96.32 65.75 117.75 114.62 29.76 67.94 32.52 178.82-57.79 267.23-69.07 67.57-152.84 98.11-271.67 98.93zm37.45-436.43c-9.04 0-18.18.26-27.59.79-68.54 3.84-111.25 35.31-108.86 80 2.5 46.9 54.2 68.66 103.93 65.97 45.7-2.43 105.2-20.27 115.21-138.5a392 392 0 00-82.7-8.26z"}]};
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
  name: 'ThreadsFilled path ' + (index + 1),
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
