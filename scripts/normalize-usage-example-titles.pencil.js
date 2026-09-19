// Run with Pencil execute after importing official Usage examples.
// It removes the documentation edit action and restores the official title divider.
const usageExampleTitles = Get((node, context) => {
  if (
    node.type !== 'frame' ||
    Number(node.y) >= 0 ||
    Math.abs(Number(node.height || 0) - 30) >= 1 ||
    context.parentCtx?.node.context !== 'section'
  ) return null;

  let ancestor = context.parentCtx;
  while (ancestor) {
    if (/Usage/.test(ancestor.node.name || '')) {
      return {
        id: node.id,
        sectionId: context.parentCtx.node.id,
        sectionWidth: context.parentCtx.bounds.width,
      };
    }
    ancestor = ancestor.parentCtx;
  }
  return null;
}).filter(Boolean);

let removedEditIcons = 0;
let addedDividers = 0;

for (const title of usageExampleTitles) {
  const editIcons = Get(title.id, (node, context) =>
    context.depth === 1 &&
    node.type === 'frame' &&
    /svg/i.test(`${node.context || ''} ${node.name || ''}`)
      ? node.id
      : null,
  ).filter(Boolean);

  for (const iconId of editIcons) {
    Delete(iconId);
    removedEditIcons += 1;
  }

  const anchor = Get(title.id, (node, context) =>
    context.depth === 1 && node.context === 'a'
      ? {
          id: node.id,
          width: context.bounds.width,
          height: context.bounds.height,
        }
      : null,
  ).filter(value => value !== null)[0];

  // Alibaba Sans title glyphs sit visually below their frame center. Shift the
  // link frame upward so the glyph ink, rather than its box, centers on the line.
  const opticalInkOffset = 1.25;
  if (anchor) {
    const anchorY = 0.5 - (-15) - anchor.height / 2 - opticalInkOffset;
    Update(anchor.id, { y: anchorY });
  }

  Update(title.id, {
    y: -15,
    height: 30,
    width: Math.ceil((anchor?.width || 0) + 16),
    fill: '#FFFFFF',
  });

  const divider = Get(title.sectionId, (node, context) =>
    context.depth === 1 && node.name === 'Example title divider' ? node.id : null,
  ).filter(Boolean)[0];

  if (!divider) {
    const dividerId = Insert(title.sectionId, {
      type: 'rectangle',
      name: 'Example title divider',
      width: title.sectionWidth,
      height: 1,
      fill: '#F0F0F0',
    });
    Move(dividerId, title.sectionId, 0);
    addedDividers += 1;
  } else {
    Update(divider, {
      width: title.sectionWidth,
      height: 1,
      fill: '#F0F0F0',
    });
  }
}

let remainingEditIcons = 0;
let missingDividers = 0;
let misalignedTitles = 0;
let misalignedTitleText = 0;
let dividerWidthMismatches = 0;
const opticalInkOffset = 1.25;

for (const title of usageExampleTitles) {
  remainingEditIcons += Get(title.id, (node, context) =>
    context.depth === 1 &&
    node.type === 'frame' &&
    /svg/i.test(`${node.context || ''} ${node.name || ''}`)
      ? 1
      : null,
  ).filter(Boolean).length;

  const dividers = Get(title.sectionId, (node, context) =>
    context.depth === 1 && node.name === 'Example title divider'
      ? { width: context.bounds.width }
      : null,
  ).filter(Boolean);
  if (dividers.length !== 1) missingDividers += 1;
  if (dividers[0] && Math.abs(dividers[0].width - title.sectionWidth) > 0.1) {
    dividerWidthMismatches += 1;
  }

  const titleNode = Get(title.id, { depth: 0 });
  if (Number(titleNode.y) !== -15 || Number(titleNode.height) !== 30) misalignedTitles += 1;

  const anchorBounds = Get(title.id, (node, context) =>
    context.depth === 1 && node.context === 'a'
      ? { y: context.bounds.y, height: context.bounds.height }
      : null,
  ).filter(Boolean)[0];
  if (
    !anchorBounds ||
    Math.abs(
      Number(titleNode.y) +
        anchorBounds.y +
        anchorBounds.height / 2 +
        opticalInkOffset -
        0.5,
    ) > 0.1
  ) misalignedTitleText += 1;
}

Print({
  usageExampleTitles: usageExampleTitles.length,
  removedEditIcons,
  addedDividers,
  remainingEditIcons,
  missingDividers,
  misalignedTitles,
  misalignedTitleText,
  dividerWidthMismatches,
});
