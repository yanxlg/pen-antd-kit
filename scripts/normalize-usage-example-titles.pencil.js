const titles = Get((n, c) => {
  if (n.type !== 'frame' || !(n.y < 0) || c.parentCtx?.node.context !== 'section') return;
  let a = c.parentCtx;
  while (a && !/^Usage(?:$| ·)/.test(a.node.name || '')) a = a.parentCtx;
  if (a) return { id: n.id, section: c.parentCtx.node.id };
});
for (const title of titles) {
  const children = Get(title.id, { depth: 1 }).children || [];
  for (const child of children) {
    if (child.type === 'frame' && /svg/i.test(`${child.context || ''} ${child.name || ''}`)) {
      Delete(child.id);
      continue;
    }
    Get(child.id, n => {
      if (n.type === 'text') Update(n.id, { textGrowth: 'auto', lineHeight: 2, layoutPosition: 'auto', x: undefined, y: undefined });
      if (n.type === 'frame') Update(n.id, { layout: 'horizontal', width: 'fit_content', height: 'fit_content', padding: 0, gap: 0, alignItems: 'center', justifyContent: 'start', layoutPosition: 'auto', x: undefined, y: undefined });
    });
  }
  Update(title.id, { name: 'Example title', layout: 'horizontal', layoutPosition: 'absolute', x: 16, y: -15, width: 'fit_content', height: 30, padding: [1, 8], gap: 0, alignItems: 'center', justifyContent: 'start', fill: '#FFFFFF', clip: false });
  const dividers = Get(title.section, (n, c) => c.depth === 1 && n.name === 'Example title divider' ? n.id : undefined);
  const divider = dividers[0] || Insert(title.section, { type: 'rectangle', name: 'Example title divider', width: 'fill_container', height: 1, fill: '#F0F0F0' });
  Update(divider, { layoutPosition: 'absolute', x: 0, y: 0, width: Get(title.section, (n, c) => c.depth === 0 ? c.bounds.width : undefined)[0], height: 1 });
  Move(divider, title.section, 0);
  for (const extra of dividers.slice(1)) Delete(extra);
}
Print({ normalizedExampleTitles: titles.length });
