// Run with Pencil execute after importing or rebuilding official Usage examples.
// Ant Design's documentation controls are not part of the component example.
const isExampleActionBar = node =>
  node.type === 'frame' &&
  node.context === 'div' &&
  node.opacity === 0.7 &&
  node.strokeWidth?.top === 1 &&
  Array.isArray(node.padding) &&
  node.padding[0] === 13 &&
  node.padding[2] === 12 &&
  Array.isArray(node.children) &&
  node.children.length >= 3;

const usageBoards = Get(node =>
  node.type === 'frame' &&
  String(node.id).startsWith('artboard-') &&
  String(node.id).endsWith('-usage')
    ? node.id
    : null,
).filter(Boolean);

let removed = 0;
for (const boardId of usageBoards) {
  const actionBars = Get(boardId, node => isExampleActionBar(node) ? node.id : null).filter(Boolean);
  for (const actionBarId of actionBars) {
    Delete(actionBarId);
    removed += 1;
  }

  const directChildren = Get(boardId, (node, context) => context.depth === 1
    ? { y: Number(node.y) || 0, height: context.bounds.height }
    : null,
  ).filter(Boolean);
  if (directChildren.length) {
    const height = Math.ceil(Math.max(...directChildren.map(node => node.y + node.height)) + 32);
    Update(boardId, { height });
  }
}

const remaining = usageBoards.reduce((count, boardId) => count + Get(
  boardId,
  node => isExampleActionBar(node) ? 1 : null,
).filter(Boolean).length, 0);

Print({ usageBoards: usageBoards.length, removed, remaining });
