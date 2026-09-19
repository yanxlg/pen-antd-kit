// Run with Pencil execute after importing or updating Data Display, Feedback or Other Usage.
const layers = ['layer-data-display', 'layer-feedback', 'layer-other'];
const boards = layers.flatMap(layer => Get(
  layer,
  node => node.type === 'frame' && /Usage/.test(node.name || '') ? node.id : undefined,
));

const importRoots = layers.flatMap(layer => Get(
  layer,
  node => String(node.context || '').startsWith('antd-official-import:') ? node.id : undefined,
));

const directScripts = boards.flatMap(board => Get(
  board,
  node => node.type === 'script' ? node.id : undefined,
));

const actionBars = boards.flatMap(board => Get(
  board,
  node => node.type === 'frame' &&
    node.context === 'div' &&
    node.opacity === 0.7 &&
    node.strokeWidth?.top === 1 &&
    Array.isArray(node.padding) &&
    node.padding[0] === 13
      ? node.id
      : undefined,
));

const clippedRefs = layers.flatMap(layer => Get(
  layer,
  (node, context) => node.type === 'ref' && context.problems
    ? { id: node.id, name: node.name, problem: context.problems }
    : undefined,
  { resolveInstances: true },
));

Print({
  usageBoards: boards.length,
  officialImportRoots: importRoots.length,
  directUsageScripts: directScripts.length,
  remainingActionBars: actionBars.length,
  clippedRefs,
});
