
const masterId = 'SiWnx';
const buttonId = 'DQZzq';
const checkboxId = 'cpj9Y';
const userIconId = 'ZpEDl';

const previewMap = {
  basic: 'PIPK5',
  sizes: 'T2Fjg',
  disabled: 'lLY6i',
  digit: 'mZVOb',
  formatter: 'YTEyH',
  keyboard: 'kcw3r',
  wheel: 't3S4f',
  variants: 'g9kM95',
  spinner: 'LG0Lw',
  outOfRange: 'NvMFj',
  presuffix: 'SyTEa',
  status: 'Vf6q0',
  focus: 'GMQlS',
  styleClass: 'dMB9M'
};

function clearChildren(id) {
  const node = Get(id, { depth: 1 });
  for (const ch of node.children || []) {
    Delete(ch.id);
  }
}

// 1. Basic
clearChildren(previewMap.basic);
Update(previewMap.basic, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.basic, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Basic',
  width: 140,
  height: 32,
  inputs: { value: 3, min: 1, max: 10, size: 'middle', controls: true }
});

// 2. Sizes (Official: vertical space with large 40, middle 32, small 24)
clearChildren(previewMap.sizes);
Update(previewMap.sizes, { layout: 'vertical', padding: [24, 24], gap: 12, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.sizes, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Large',
  width: 140,
  height: 40,
  inputs: { value: 3, min: 1, max: 100000, size: 'large', controls: true }
});
Insert(previewMap.sizes, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Middle',
  width: 140,
  height: 32,
  inputs: { value: 3, min: 1, max: 100000, size: 'middle', controls: true }
});
Insert(previewMap.sizes, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Small',
  width: 140,
  height: 24,
  inputs: { value: 3, min: 1, max: 100000, size: 'small', controls: true }
});

// 3. Disabled
clearChildren(previewMap.disabled);
Update(previewMap.disabled, { layout: 'vertical', padding: [24, 24], gap: 20, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.disabled, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Disabled',
  width: 140,
  height: 32,
  inputs: { value: 3, min: 1, max: 10, disabled: true, size: 'middle', controls: true }
});
Insert(previewMap.disabled, {
  type: 'ref',
  ref: buttonId,
  name: 'Button · Toggle',
  width: 130,
  height: 32,
  inputs: { children: 'Toggle disabled', type: 'primary' }
});

// 4. High precision decimals
clearChildren(previewMap.digit);
Update(previewMap.digit, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.digit, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · High Precision',
  width: 200,
  height: 32,
  inputs: { value: '1', min: 0, max: 10, stringMode: true, size: 'middle', controls: true }
});

// 5. Formatter
clearChildren(previewMap.formatter);
Update(previewMap.formatter, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.formatter, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Currency',
  width: 140,
  height: 32,
  inputs: { prefix: '$', value: 1000, max: 100000, formatter: true, size: 'middle', controls: true }
});
Insert(previewMap.formatter, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Percentage',
  width: 140,
  height: 32,
  inputs: { suffix: '%', value: 100, min: 0, max: 100, size: 'middle', controls: true }
});

// 6. Keyboard
clearChildren(previewMap.keyboard);
Update(previewMap.keyboard, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.keyboard, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Keyboard',
  width: 140,
  height: 32,
  inputs: { value: 3, min: 1, max: 10, keyboard: true, size: 'middle', controls: true }
});
Insert(previewMap.keyboard, {
  type: 'ref',
  ref: checkboxId,
  name: 'Checkbox · Toggle keyboard',
  width: 150,
  height: 22,
  inputs: { children: 'Toggle keyboard', checked: true }
});

// 7. Wheel
clearChildren(previewMap.wheel);
Update(previewMap.wheel, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.wheel, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Wheel',
  width: 140,
  height: 32,
  inputs: { value: 3, min: 1, max: 10, changeOnWheel: true, size: 'middle', controls: true }
});

// 8. Variants (Official: vertical flex with gap 12)
clearChildren(previewMap.variants);
Update(previewMap.variants, { layout: 'vertical', padding: [24, 24], gap: 12, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.variants, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Outlined',
  width: 200,
  height: 32,
  inputs: { placeholder: 'Outlined', variant: 'outlined', size: 'middle', controls: true }
});
Insert(previewMap.variants, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Filled',
  width: 200,
  height: 32,
  inputs: { placeholder: 'Filled', variant: 'filled', size: 'middle', controls: true }
});
Insert(previewMap.variants, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Borderless',
  width: 200,
  height: 32,
  inputs: { placeholder: 'Borderless', variant: 'borderless', size: 'middle', controls: true }
});
Insert(previewMap.variants, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Underlined',
  width: 200,
  height: 32,
  inputs: { placeholder: 'Underlined', variant: 'underlined', size: 'middle', controls: true }
});

// 9. Spinner (Official: vertical flex, width 150)
clearChildren(previewMap.spinner);
Update(previewMap.spinner, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.spinner, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Spinner Outlined',
  width: 150,
  height: 32,
  inputs: { value: 3, min: 1, max: 10, mode: 'spinner', variant: 'outlined', size: 'middle' }
});
Insert(previewMap.spinner, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Spinner Filled',
  width: 150,
  height: 32,
  inputs: { value: 3, min: 1, max: 10, mode: 'spinner', variant: 'filled', size: 'middle' }
});

// 10. Out of range
clearChildren(previewMap.outOfRange);
Update(previewMap.outOfRange, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.outOfRange, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Out of Range',
  width: 140,
  height: 32,
  inputs: { value: 99, min: 1, max: 10, status: 'warning', size: 'middle', controls: true }
});
Insert(previewMap.outOfRange, {
  type: 'ref',
  ref: buttonId,
  name: 'Button · Reset',
  width: 80,
  height: 32,
  inputs: { children: 'Reset', type: 'primary' }
});

// 11. Prefix / Suffix (Official: Space.Compact with Space.Addon + UserOutlined)
clearChildren(previewMap.presuffix);
Update(previewMap.presuffix, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.presuffix, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Prefix Text',
  width: 'fill_container',
  height: 32,
  inputs: { prefix: '￥', value: 3, size: 'middle', controls: true }
});

// Item 2: Space.Compact block with Space.Addon
const compactRow = Insert(previewMap.presuffix, {
  type: 'frame',
  name: 'Space.Compact',
  width: 'fill_container',
  height: 32,
  layout: 'horizontal',
  gap: -1,
  alignItems: 'center'
});
const addonBox = Insert(compactRow, {
  type: 'frame',
  name: 'Space.Addon',
  width: 38,
  height: 32,
  fill: '#0000000a',
  cornerRadius: [6, 0, 0, 6],
  stroke: '#d9d9d9',
  strokeWidth: 1,
  strokeAlignment: 'inner',
  layout: 'horizontal',
  alignItems: 'center',
  justifyContent: 'center'
});
Insert(addonBox, {
  type: 'ref',
  ref: userIconId,
  name: 'Icon.UserOutlined',
  width: 14,
  height: 14
});
const inputWrapper = Insert(compactRow, {
  type: 'frame',
  name: 'div',
  width: 'fill_container',
  height: 32
});
Insert(inputWrapper, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber',
  width: 'fill_container',
  height: 32,
  inputs: { prefix: '￥', value: 3, size: 'middle', controls: true, compactPlacement: 'end' }
});

Insert(previewMap.presuffix, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Prefix Disabled',
  width: 'fill_container',
  height: 32,
  inputs: { prefix: '￥', value: 3, disabled: true, size: 'middle', controls: true }
});
Insert(previewMap.presuffix, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Suffix Text',
  width: 'fill_container',
  height: 32,
  inputs: { suffix: 'RMB', value: 3, size: 'middle', controls: true }
});

// 12. Status (All 4 are middle size: 32px height, fill_container width)
clearChildren(previewMap.status);
Update(previewMap.status, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.status, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Status Error',
  width: 'fill_container',
  height: 32,
  inputs: { status: 'error', value: 3, size: 'middle', controls: true }
});
Insert(previewMap.status, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Status Warning',
  width: 'fill_container',
  height: 32,
  inputs: { status: 'warning', value: 3, size: 'middle', controls: true }
});
Insert(previewMap.status, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Status Error Icon',
  width: 'fill_container',
  height: 32,
  inputs: { status: 'error', prefixIcon: 'ClockCircleOutlined', value: 3, size: 'middle', controls: true }
});
Insert(previewMap.status, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Status Warning Icon',
  width: 'fill_container',
  height: 32,
  inputs: { status: 'warning', prefixIcon: 'ClockCircleOutlined', value: 3, size: 'middle', controls: true }
});

// 13. Focus (Buttons + Middle 32px InputNumber with value 999)
clearChildren(previewMap.focus);
Update(previewMap.focus, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
const focusButtonsRow = Insert(previewMap.focus, {
  type: 'frame',
  name: 'Focus Buttons Row',
  layout: 'horizontal',
  gap: 8,
  alignItems: 'center',
  width: 'fill_container',
  height: 'fit_content'
});
Insert(focusButtonsRow, {
  type: 'ref',
  ref: buttonId,
  name: 'Button · Focus at first',
  width: 110,
  height: 32,
  inputs: { children: 'Focus at first', type: 'default' }
});
Insert(focusButtonsRow, {
  type: 'ref',
  ref: buttonId,
  name: 'Button · Focus at last',
  width: 110,
  height: 32,
  inputs: { children: 'Focus at last', type: 'default' }
});
Insert(focusButtonsRow, {
  type: 'ref',
  ref: buttonId,
  name: 'Button · Focus to select all',
  width: 140,
  height: 32,
  inputs: { children: 'Focus to select all', type: 'default' }
});
Insert(focusButtonsRow, {
  type: 'ref',
  ref: buttonId,
  name: 'Button · Focus prevent scroll',
  width: 155,
  height: 32,
  inputs: { children: 'Focus prevent scroll', type: 'default' }
});
Insert(previewMap.focus, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Focus Target',
  width: 'fill_container',
  height: 32,
  inputs: { value: 999, size: 'middle', controls: true }
});

// 14. Custom semantic dom styling (Vertical flex with Object 32px and Function 40px)
clearChildren(previewMap.styleClass);
Update(previewMap.styleClass, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content', width: 'fill_container' });
Insert(previewMap.styleClass, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Custom Style 1',
  width: 200,
  height: 32,
  inputs: { placeholder: 'Object', size: 'middle', controls: true }
});
Insert(previewMap.styleClass, {
  type: 'ref',
  ref: masterId,
  name: 'InputNumber · Custom Style 2',
  width: 200,
  height: 40,
  inputs: { placeholder: 'Function', size: 'large', controls: true, variant: 'filled' }
});

// Polish description bars across all cards in zTAOE
const allDescIds = ['ZnF8Q', 'JWeB2', 'T10Jr1', 'uH0ap', 'QbiB0', 'JRuNJ', 'd282yl', 'qrx8Y', 'v7Wwje', 'yvKUF', 'WD9Xp', 'WUUQg', 'E5AuSe', 'B4Hiw'];
for (const dId of allDescIds) {
  const dNode = Get(dId, { depth: 1 });
  if (dNode && dNode.children && dNode.children.length >= 3) {
    Delete(dNode.children[2].id);
  }
}

// Remove version badges if any
Get('zTAOE', (n, ctx) => {
  if (n.type === 'text' && (n.content?.includes('5.') || n.content?.includes('6.'))) {
    if (ctx.parentCtx?.node?.id) {
      Delete(ctx.parentCtx.node.id);
    }
  }
});

Print('Updated all 14 official examples in zTAOE successfully.');
