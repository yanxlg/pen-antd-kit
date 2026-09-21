/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export OpenAIOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M482.88 128c-84.35 0-156.58 52.8-185.68 126.98-60.89 8.13-115.3 43.63-146.6 97.84-42.16 73-32.55 161.88 17.14 224.16-23.38 56.75-19.85 121.6 11.42 175.78 42.18 73.02 124.1 109.15 202.94 97.23C419.58 898.63 477.51 928 540.12 928c84.35 0 156.58-52.8 185.68-126.98 60.89-8.13 115.3-43.62 146.6-97.84 42.16-73 32.55-161.88-17.14-224.16 23.38-56.75 19.85-121.6-11.42-175.78-42.18-73.02-124.1-109.15-202.94-97.23C603.42 157.38 545.49 128 482.88 128m0 61.54c35.6 0 68.97 13.99 94.22 37.74-1.93 1.03-3.92 1.84-5.83 2.94l-136.68 78.91a46.11 46.11 0 00-23.09 39.78l-.84 183.6-65.72-38.34V327.4c0-76 61.9-137.86 137.94-137.86m197.7 75.9c44.19 3.14 86.16 27.44 109.92 68.57 17.8 30.8 22.38 66.7 14.43 100.42-1.88-1.17-3.6-2.49-5.53-3.6l-136.73-78.91a46.23 46.23 0 00-46-.06l-159.47 91.1.36-76.02 144.5-83.41a137.19 137.19 0 0178.53-18.09m-396.92 55.4c-.07 2.2-.3 4.35-.3 6.56v157.75a46.19 46.19 0 0022.91 39.9l158.68 92.5-66.02 37.67-144.55-83.35c-65.86-38-88.47-122.53-50.45-188.34 17.78-30.78 46.55-52.69 79.73-62.68m340.4 79.93l144.54 83.35c65.86 38 88.47 122.53 50.45 188.34-17.78 30.78-46.55 52.69-79.73 62.68.07-2.19.3-4.34.3-6.55V570.85a46.19 46.19 0 00-22.9-39.9l-158.69-92.5zM511.8 464.84l54.54 31.79-.3 63.22-54.84 31.31-54.54-31.85.3-63.16zm100.54 58.65l65.72 38.35V728.6c0 76-61.9 137.86-137.94 137.86-35.6 0-68.97-13.99-94.22-37.74 1.93-1.03 3.92-1.84 5.83-2.94l136.68-78.9a46.11 46.11 0 0023.09-39.8zm-46.54 89.55l-.36 76.02-144.5 83.41c-65.85 38-150.42 15.34-188.44-50.48-17.8-30.8-22.38-66.7-14.43-100.42 1.88 1.17 3.6 2.5 5.53 3.6l136.74 78.91a46.23 46.23 0 0046 .06z"}]};
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
  name: 'OpenAIOutlined path ' + (index + 1),
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
