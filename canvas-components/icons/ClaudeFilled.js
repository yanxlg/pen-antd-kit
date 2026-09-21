/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export ClaudeFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M240 659.67l176.12-98.82 2.95-8.62-2.95-4.76h-8.61l-29.47-1.81-100.64-2.72-87.26-3.63-84.55-4.53-21.3-4.54-19.95-26.29 2.04-13.14 17.9-12.02 25.62 2.27 56.67 3.85 85 5.9 61.64 3.62 91.35 9.52h14.51l2.04-5.89-4.99-3.63-3.85-3.62-87.94-59.61-95.2-63.02-49.87-36.26-26.97-18.37-13.6-17.22-5.9-37.63 24.49-26.97 32.86 2.27 8.39 2.26 33.32 25.61 71.17 55.09 92.93 68.45 13.6 11.33 5.44-3.85.68-2.72-6.12-10.2L359 288.62l-53.94-92.93-24.03-38.53-6.34-23.12c-2.27-9.52-3.86-17.45-3.86-27.2l27.88-37.86L314.12 64l37.17 4.99 15.65 13.6 23.11 52.81 37.4 83.19 58.03 113.1 17 33.55 9.07 31.05 3.4 9.52h5.9v-5.44l4.75-63.7 8.84-78.2 8.61-100.63L546 129.5l14.05-34 27.88-18.36 21.76 10.42 17.9 25.61-2.48 16.55-10.66 69.13-20.85 108.35-13.6 72.53h7.93l9.07-9.07 36.72-48.73 61.65-77.06 27.2-30.6 31.73-33.77 20.4-16.1h38.54l28.33 42.16-12.7 43.52-39.66 50.32-32.87 42.61-47.14 63.47-29.47 50.77 2.72 4.08 7.03-.68L796 438l57.57-10.43 68.68-11.79 31.05 14.5 3.4 14.74-12.24 30.15-73.43 18.13-86.14 17.23-128.29 30.37-1.59 1.13 1.82 2.27 57.8 5.44 24.7 1.36h60.52l112.66 8.39 29.46 19.49 17.68 23.8-2.95 18.13-45.33 23.12-61.2-14.5-142.8-34-48.95-12.25h-6.8v4.08l40.8 39.9 74.8 67.54 93.6 87.04 4.77 21.54-12.02 17-12.7-1.82-82.27-61.88-31.73-27.88-71.86-60.52h-4.76v6.35l16.55 24.25 87.5 131.47 4.53 40.34-6.35 13.15-22.66 7.93-24.94-4.53-51.22-71.85-52.82-80.92-42.6-72.53-5.22 2.95-25.17 270.86-11.78 13.82-27.2 10.43-22.67-17.23-12-27.88 12-55.07 14.51-71.86 11.79-57.12 10.65-70.94 6.35-23.58-.46-1.58-5.21.68-53.5 73.44-81.36 109.93-64.38 68.9-15.4 6.13-26.75-13.83 2.49-24.71 14.96-21.99 89.08-113.33 53.71-70.26 34.69-40.57-.23-5.9h-2.04L218.47 756.91l-42.16 5.44-18.13-17 2.27-27.88 8.61-9.07 71.17-48.96z"}]};
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
  name: 'ClaudeFilled path ' + (index + 1),
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
