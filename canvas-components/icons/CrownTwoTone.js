/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export CrownTwoTone.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M911.9 283.9v.5L835.5 865c-1 8-7.9 14-15.9 14H204.5c-8.1 0-14.9-6.1-16-14l-76.4-580.6v-.6 1.6L188.5 866c1.1 7.9 7.9 14 16 14h615.1c8 0 14.9-6 15.9-14l76.4-580.6c.1-.5.1-1 0-1.5z","fill":"__secondary__"},{"d":"M773.6 810.6l53.9-409.4-139.8 86.1L512 252.9 336.3 487.3l-139.8-86.1 53.8 409.4h523.3zm-374.2-189c0-62.1 50.5-112.6 112.6-112.6s112.6 50.5 112.6 112.6v1c0 62.1-50.5 112.6-112.6 112.6s-112.6-50.5-112.6-112.6v-1z","fill":"__secondary__"},{"d":"M512 734.2c61.9 0 112.3-50.2 112.6-112.1v-.5c0-62.1-50.5-112.6-112.6-112.6s-112.6 50.5-112.6 112.6v.5c.3 61.9 50.7 112.1 112.6 112.1zm0-160.9c26.6 0 48.2 21.6 48.2 48.3 0 26.6-21.6 48.3-48.2 48.3s-48.2-21.6-48.2-48.3c0-26.6 21.6-48.3 48.2-48.3z","fill":"__primary__"},{"d":"M188.5 865c1.1 7.9 7.9 14 16 14h615.1c8 0 14.9-6 15.9-14l76.4-580.6v-.5c.3-6.4-6.7-10.8-12.3-7.4L705 396.4 518.4 147.5a8.06 8.06 0 00-12.9 0L319 396.4 124.3 276.5c-5.5-3.4-12.6.9-12.2 7.3v.6L188.5 865zm147.8-377.7L512 252.9l175.7 234.4 139.8-86.1-53.9 409.4H250.3l-53.8-409.4 139.8 86.1z","fill":"__primary__"}]};
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
  name: 'CrownTwoTone path ' + (index + 1),
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
