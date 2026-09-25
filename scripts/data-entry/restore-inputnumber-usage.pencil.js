
const masterId = 'SiWnx';
const buttonId = 'DQZzq';
const checkboxId = 'cpj9Y';

const nodes = Get('Q211TC', (n, c) => ({ id: n.id, name: n.name, context: n.context, type: n.type, parent: c.parentCtx?.node?.id, b: c.bounds }));
const map = new Map(nodes.map(n => [n.id, n]));
const titles = ['Basic', 'Sizes', 'Disabled', 'High precision decimals', 'Formatter', 'Keyboard', 'Wheel', 'Variants', 'Spinner', 'Out of range', 'Prefix / Suffix', 'Status', 'Focus', 'Custom semantic dom styling'];

const cardMap = [];
for (const t of titles) {
  const label = nodes.find(n => n.name === t && n.context === 'a');
  if (label) {
    const row = map.get(label.parent);
    const desc = map.get(row?.parent);
    const card = map.get(desc?.parent);
    const preview = card?.n?.children?.[0];
    cardMap.push({
      title: t,
      cardId: card?.id,
      previewId: preview?.id,
      descId: desc?.id,
      rowId: row?.id,
      labelId: label.id
    });
  }
}

Print('Processing cards count:', cardMap.length);

for (const c of cardMap) {
  const preview = c.previewId;
  const card = c.cardId;
  const desc = c.descId;
  const row = c.rowId;

  // 1. Clean preview
  const prevNode = Get(preview, { depth: 1 });
  for (const ch of prevNode.children || []) {
    Delete(ch.id);
  }

  // 2. Clean toolbar/actions in desc
  const descNode = Get(desc, { depth: 1 });
  if (descNode.children && descNode.children.length >= 3) {
    // 3rd child is toolbar with svg buttons
    Delete(descNode.children[2].id);
  }

  // 3. Clean and polish title row
  const rowNode = Get(row, { depth: 1 });
  for (const ch of rowNode.children || []) {
    Delete(ch.id);
  }
  Update(row, { y: -14, width: 'fit_content', height: 28, clip: false, layout: 'horizontal', alignItems: 'center' });
  Insert(row, {
    type: 'text',
    name: 'Example title',
    content: c.title,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    fill: '#000000E0',
    textGrowth: 'fit'
  });
  const line = Insert(desc, { type: 'rectangle', name: 'Example title divider', width: 'fill_container', height: 1, fill: '#F0F0F0' });
  Move(line, desc, 0);

  // 4. Configure Preview according to card title
  if (c.title === 'Basic') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Basic',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, size: 'middle', controls: true }
    });
  } else if (c.title === 'Sizes') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Large',
      width: 140,
      height: 40,
      inputs: { value: 3, min: 1, max: 100000, size: 'large', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Middle',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 100000, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Small',
      width: 140,
      height: 24,
      inputs: { value: 3, min: 1, max: 100000, size: 'small', controls: true }
    });
  } else if (c.title === 'Disabled') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Disabled',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, disabled: true, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: buttonId,
      name: 'Button · Toggle',
      width: 'fit_content',
      height: 32,
      inputs: { children: 'Toggle disabled', type: 'primary' }
    });
  } else if (c.title === 'High precision decimals') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · High Precision',
      width: 180,
      height: 32,
      inputs: { value: '1.00000000000001', stringMode: true, size: 'middle', controls: true }
    });
  } else if (c.title === 'Formatter') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Currency',
      width: 140,
      height: 32,
      inputs: { value: '$ 1,000', size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Percentage',
      width: 140,
      height: 32,
      inputs: { value: '100%', min: 0, max: 100, size: 'middle', controls: true }
    });
  } else if (c.title === 'Keyboard') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Keyboard',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, keyboard: true, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: checkboxId,
      name: 'Checkbox · Toggle keyboard',
      width: 'fit_content',
      height: 22,
      inputs: { children: 'Toggle keyboard', checked: true }
    });
  } else if (c.title === 'Wheel') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Wheel',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, changeOnWheel: true, size: 'middle', controls: true }
    });
  } else if (c.title === 'Variants') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Outlined',
      width: 130,
      height: 32,
      inputs: { placeholder: 'Outlined', variant: 'outlined', size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Filled',
      width: 130,
      height: 32,
      inputs: { placeholder: 'Filled', variant: 'filled', size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Borderless',
      width: 130,
      height: 32,
      inputs: { placeholder: 'Borderless', variant: 'borderless', size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Underlined',
      width: 130,
      height: 32,
      inputs: { placeholder: 'Underlined', variant: 'underlined', size: 'middle', controls: true }
    });
  } else if (c.title === 'Spinner') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Spinner Default',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, mode: 'spinner', size: 'middle' }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Spinner Disabled',
      width: 140,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, mode: 'spinner', disabled: true, size: 'middle' }
    });
  } else if (c.title === 'Out of range') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Out of Range',
      width: 140,
      height: 32,
      inputs: { value: 99, min: 1, max: 10, status: 'warning', size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: buttonId,
      name: 'Button · Reset',
      width: 'fit_content',
      height: 32,
      inputs: { children: 'Reset', type: 'primary' }
    });
  } else if (c.title === 'Prefix / Suffix') {
    Update(preview, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Prefix Text',
      width: 'fill_container',
      height: 32,
      inputs: { prefix: '￥', value: 3, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Prefix Icon',
      width: 'fill_container',
      height: 32,
      inputs: { prefixIcon: 'UserOutlined', value: 3, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Prefix Disabled',
      width: 'fill_container',
      height: 32,
      inputs: { prefix: '￥', value: 3, disabled: true, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Suffix Text',
      width: 'fill_container',
      height: 32,
      inputs: { suffix: 'RMB', value: 3, size: 'middle', controls: true }
    });
  } else if (c.title === 'Status') {
    Update(preview, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Status Error',
      width: 'fill_container',
      height: 32,
      inputs: { status: 'error', value: 3, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Status Warning',
      width: 'fill_container',
      height: 32,
      inputs: { status: 'warning', value: 3, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Status Error Icon',
      width: 'fill_container',
      height: 32,
      inputs: { status: 'error', prefixIcon: 'ClockCircleOutlined', value: 3, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Status Warning Icon',
      width: 'fill_container',
      height: 32,
      inputs: { status: 'warning', prefixIcon: 'ClockCircleOutlined', value: 3, size: 'middle', controls: true }
    });
  } else if (c.title === 'Focus') {
    Update(preview, { layout: 'vertical', padding: [24, 24], gap: 16, alignItems: 'flex_start', height: 'fit_content' });
    const rowButtons = Insert(preview, {
      type: 'frame',
      name: 'Focus Buttons Row',
      layout: 'horizontal',
      gap: 8,
      alignItems: 'center',
      width: 'fill_container',
      height: 'fit_content'
    });
    Insert(rowButtons, {
      type: 'ref',
      ref: buttonId,
      name: 'Button · Focus at first',
      width: 'fit_content',
      height: 32,
      inputs: { children: 'Focus at first', type: 'default' }
    });
    Insert(rowButtons, {
      type: 'ref',
      ref: buttonId,
      name: 'Button · Focus at last',
      width: 'fit_content',
      height: 32,
      inputs: { children: 'Focus at last', type: 'default' }
    });
    Insert(rowButtons, {
      type: 'ref',
      ref: buttonId,
      name: 'Button · Focus to select all',
      width: 'fit_content',
      height: 32,
      inputs: { children: 'Focus to select all', type: 'default' }
    });
    Insert(rowButtons, {
      type: 'ref',
      ref: buttonId,
      name: 'Button · Focus prevent scroll',
      width: 'fit_content',
      height: 32,
      inputs: { children: 'Focus prevent scroll', type: 'default' }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Focus Target',
      width: 160,
      height: 32,
      inputs: { value: 3, min: 1, max: 10, size: 'middle', controls: true }
    });
  } else if (c.title === 'Custom semantic dom styling') {
    Update(preview, { layout: 'horizontal', padding: [24, 24], gap: 16, alignItems: 'center', height: 'fit_content' });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Custom Style 1',
      width: 140,
      height: 32,
      inputs: { value: 3, size: 'middle', controls: true }
    });
    Insert(preview, {
      type: 'ref',
      ref: masterId,
      name: 'InputNumber · Custom Style 2',
      width: 140,
      height: 32,
      inputs: { value: 99, size: 'middle', controls: true, variant: 'filled' }
    });
  }
}

// 5. Mount Q211TC to VTptU (Usage Content)
Delete('zTAOE');
Update('Q211TC', {
  name: 'Official Examples · Direct Import',
  width: 1664,
  height: 'fit_content',
  clip: false,
  x: 0,
  y: 0
});
Move('Q211TC', 'VTptU');
Update('artboard-inputnumber-usage', { height: 'fit_content' });
Update('VTptU', { height: 'fit_content' });

Print('Successfully updated InputNumber Usage with official imported examples.');
