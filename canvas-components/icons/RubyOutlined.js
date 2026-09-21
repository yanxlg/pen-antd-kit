/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export RubyOutlined.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M509.81 112.02c-.73.05-1.46.12-2.2.21h-4.32l-3.4 1.7a36.33 36.33 0 00-8.88 4.4l-145.96 73.02-153.7 153.7-72.65 145.24a36.33 36.33 0 00-4.9 9.86l-1.56 3.12v3.98a36.33 36.33 0 000 8.3v298.23l6.88 9.5a198.7 198.7 0 0020.58 24.42c37.86 37.85 87.66 57.16 142.62 62.01a36.34 36.34 0 0011.57 1.77h575.75c3.14.54 6.34.66 9.51.36a36.34 36.34 0 002.56-.35h29.8v-29.95a36.33 36.33 0 000-11.92V293.88a36.33 36.33 0 00-1.78-11.57c-4.84-54.95-24.16-104.75-62.01-142.62h-.07v-.07a203.92 203.92 0 00-24.27-20.43l-9.58-6.96H515.14a36.34 36.34 0 00-5.32-.21M643 184.89h145.96c2.47 2.08 5.25 4.06 7.45 6.25 26.59 26.63 40.97 64.74 42.3 111.18zM510.31 190l65.71 39.38-25.47 156.1-64.36 64.36-100.7 100.69L229.4 576l-39.38-65.7 61.1-122.26 136.94-136.95zm132.76 79.61l123.19 73.94-138.09 17.24zM821.9 409.82c-21.21 68.25-62.66 142.58-122.4 211.88l-65.85-188.4zm-252.54 59.6l53.64 153.56-153.55-53.65 68.12-68.12zm269.5 81.04v237L738.44 687.04c40.1-43.74 73.73-89.83 100.4-136.59m-478.04 77.7l-17.24 138.08-73.94-123.18zm72.52 5.46l188.32 65.85c-69.28 59.71-143.57 101.2-211.8 122.4zM184.9 643l117.43 195.7c-46.5-1.33-84.63-15.74-111.26-42.37-2.16-2.16-4.11-4.93-6.17-7.38zm502.17 95.43l100.4 100.4h-237c46.77-26.67 92.86-60.3 136.6-100.4"}]};
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
  name: 'RubyOutlined path ' + (index + 1),
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
