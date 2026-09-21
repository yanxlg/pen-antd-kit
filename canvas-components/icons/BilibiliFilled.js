/**
 * @schema 2.18
 * @input fontSize: number = 16
 * @input color: color = #1677FF
 * @input twoToneColor: string = "#1677ff"
 * @input rotate: number = 0
 */
// Generated from the official @ant-design/icons export BilibiliFilled.
const definition = {"viewBox":[64,64,896,896],"paths":[{"d":"M310.13 596.45c-8-4.46-16.5-8.43-25-11.9a273.55 273.55 0 00-26.99-7.44c-2.5-.99-2.5 1-2.5 1.49 0 7.93.5 18.84 1.5 27.77 1 7.44 2 15.37 4 22.8 0 .5 0 1 .5 1.5 1 .99 2 1.48 3 .49 8-4.46 16-8.43 23-13.39 7.5-5.45 15.5-11.9 22-18.35 1.5-1.48 0-2.47.5-2.97m323.95-11.9a273.55 273.55 0 00-27-7.44c-2.5-.99-2.5 1-2.5 1.49 0 7.93.5 18.84 1.5 27.77 1 7.43 2 15.37 4 22.8 0 .5 0 1 .5 1.5 1 .99 2 1.48 3 .49 8-4.46 16-8.43 23-13.39 7.5-5.45 15.5-11.9 22-18.35 2-1.48.5-2.47.5-2.97-7.5-4.46-16.5-8.43-25-11.9"},{"d":"M741.5 112H283c-94.5 0-171 76.5-171 171.5v458c.5 94 77 170.5 171 170.5h458c94.5 0 171-76.5 171-170.5v-458c.5-95-76-171.5-170.5-171.5m95 343.5H852v48h-15.5zM741 454l2 43-13.5 1.5-5-44.5zm-23.5 0l4 45.5L707 501l-6.5-47.5h17zM487 455.5h15v48h-15zm-96-1.5l2 43-13.5 1.5-5-44.5zm-23.5 0l4 45.5-14.5 2-6-47.5zM364 603c-20.5 65.5-148 59.5-159.5 57.5-9-161.5-23-196.5-34.5-275.5l54.5-22.5c1 71.5 9 185 9 185s108.5-15.5 132 47c.5 3 0 6-1.5 8.5m20.5 35.5l-23.5-124h35.5l13 123zm44.5-8l-27-235 33.5-1.5 21 236H429zm34-175h17.5v48H467zm41 190h-26.5l-9.5-126h36zm210-43C693.5 668 566 662 554.5 660c-9-161-23-196-34.5-275l54.5-22.5c1 71.5 9 185 9 185S692 532 715.5 594c.5 3 0 6-1.5 8.5m19.5 36l-23-124H746l13 123zm45.5-8l-27.5-235L785 394l21 236h-27zm33.5-175H830v48h-13zm41 190H827l-9.5-126h36z"}]};
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
  name: 'BilibiliFilled path ' + (index + 1),
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
