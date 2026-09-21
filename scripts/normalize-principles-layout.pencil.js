const principleRows = Get((node, context) =>
  node.type === 'frame' && context.depth === 2 && /^Principles/.test(node.name || '')
    ? { id: node.id, sectionId: context.parentCtx?.node.id, width: context.bounds.width }
    : undefined,
);
const principlesBoards = principleRows.map(row => row.id);

function leftPadding(padding) {
  if (typeof padding === 'number') return padding;
  if (!Array.isArray(padding)) return 0;
  if (padding.length === 2) return padding[1];
  if (padding.length === 4) return padding[3];
  return padding[0] || 0;
}

const narrowParagraphs = [
  'rohCX', 'Z3rjpz', 'zbKAt', 'EUhmJ',
  'XccHN', 'LSt4r', 'i0tqqK', 'PwIZs', 'ZqTDg',
  'XmKKx', 'pepTf', 'r6UuF', 'fKCfS',
];

for (const id of narrowParagraphs) {
  Update(id, { width: 1228, textGrowth: 'fixed-width', height: undefined });
}

for (const row of principleRows) {
  const content = Get(row.id, (node, context) =>
    context.depth === 1 && node.type === 'frame'
      ? { id: node.id, padding: node.padding }
      : undefined,
  )[0];
  if (content) {
    const x = Math.max(0, 32 - leftPadding(content.padding));
    Update(content.id, {
      x,
      width: row.width - x * 2,
      strokeWidth: 0,
      cornerRadius: 0,
    });
  }
}

for (const boardId of principlesBoards) {
  Get(boardId, (node, context) => {
    if (node.type === 'text') {
      const update = { textAlign: 'left' };
      if (typeof node.content === 'string' && node.content.includes('\\n')) {
        update.content = node.content.replace(/\\n/g, '\n');
      }
      if (
        node.textGrowth === 'fixed-width-height' &&
        context.parentCtx?.node.layout === 'vertical'
      ) {
        update.textGrowth = 'fixed-width';
        update.height = undefined;
      }
      Update(node.id, update);
    }

    if (node.type === 'frame' && node.context === 'li') {
      Update(node.id, {
        layout: 'horizontal',
        height: 'fit_content',
        alignItems: 'start',
        justifyContent: 'start',
      });
    }

    if (
      node.type === 'rectangle' &&
      node.context === 'img' &&
      context.parentCtx?.node.layout === 'vertical' &&
      context.bounds.width > context.parentCtx.bounds.width &&
      context.bounds.width - context.parentCtx.bounds.width < 1
    ) {
      Update(node.id, { width: 'fill_container' });
    }
  });
}

for (const boardId of principlesBoards) {
  const contributorBlocks = Get(boardId, (node, context) =>
    node.type === 'text' && node.content === 'contributors'
      ? context.parentCtx?.node.id
      : undefined,
  );
  for (const id of contributorBlocks) Delete(id);

  const importArtifacts = Get(boardId, node =>
    (node.type === 'rectangle' && node.context === 'a') ||
    (node.type === 'frame' && node.context === 'CSSMotion - button')
      ? node.id
      : undefined,
  );
  for (const id of importArtifacts) Delete(id);

  Get(boardId, (node, context) => {
    if (
      node.type === 'frame' &&
      context.parentCtx &&
      context.bounds.width > context.parentCtx.bounds.width &&
      context.bounds.width - context.parentCtx.bounds.width < 41 &&
      Array.isArray(node.padding) &&
      node.padding[0] === 0 &&
      node.padding[1] === 20
    ) {
      Update(node.id, { width: context.parentCtx.bounds.width, padding: 0 });
    }

    if (
      node.type === 'frame' &&
      context.parentCtx &&
      context.bounds.x >= 0 &&
      context.bounds.x + context.bounds.width > context.parentCtx.bounds.width &&
      context.bounds.x + context.bounds.width - context.parentCtx.bounds.width < 1
    ) {
      Update(node.id, {
        width: context.bounds.width -
          (context.bounds.x + context.bounds.width - context.parentCtx.bounds.width) - 0.01,
      });
    }
  });

  for (let pass = 0; pass < 3; pass += 1) {
    const grow = {};
    Get(boardId, (node, context) => {
      if (!context.parentCtx || context.parentCtx.node.type !== 'frame') return;
      const bottom = context.bounds.y + context.bounds.height;
      if (bottom > context.parentCtx.bounds.height + 0.001) {
        grow[context.parentCtx.node.id] = Math.max(
          grow[context.parentCtx.node.id] || 0,
          Math.ceil(bottom),
        );
      }
    });
    for (const id of Object.keys(grow)) Update(id, { height: grow[id] });
  }
}

for (const boardId of principlesBoards) {
  const bottoms = Get(boardId, (node, context) =>
    context.depth === 1 ? context.bounds.y + context.bounds.height : undefined,
  );
  const bottom = Math.max(0, ...bottoms);
  Update(boardId, { height: Math.ceil(bottom + 32) });
}

const sections = [...new Set(principleRows.map(row => row.sectionId).filter(Boolean))];

for (const sectionId of sections) {
  const bottoms = Get(sectionId, (node, context) =>
    context.depth === 1 ? context.bounds.y + context.bounds.height : undefined,
  );
  const bottom = Math.max(0, ...bottoms);
  Update(sectionId, { height: Math.ceil(bottom + 32) });
}

Print({
  principlesBoards: principlesBoards.length,
  narrowedParagraphs: narrowParagraphs.length,
  normalizedSections: sections.length,
});
