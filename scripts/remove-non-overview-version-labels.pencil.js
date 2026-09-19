// Run with Pencil execute after importing official examples.
// Component-library version badges are allowed only in Components Overview.
const versionLabels = Get((node, context) => {
  if (node.type !== 'text') return null;
  const content = String(node.content || '').trim();
  if (!/^(?:>=\s*)?v?\d+\.\d+(?:\.\d+)?$/i.test(content)) return null;

  let root = context;
  while (root.parentCtx) root = root.parentCtx;
  if (root.node.id === 'layer-components-overview') return null;

  return {
    textId: node.id,
    parentId: context.parentCtx?.node.id || null,
  };
}).filter(Boolean);

const labelContainers = [...new Set(
  versionLabels.map(label => label.parentId).filter(Boolean),
)];

for (const containerId of labelContainers) Delete(containerId);

const colorsSubtitle = Get('c1-sub');
if (colorsSubtitle && /\d+\.\d+(?:\.\d+)?/.test(String(colorsSubtitle.content || ''))) {
  Update(colorsSubtitle.id, { content: 'Official 10-Step Color System' });
}

const remainingVersionLabels = Get((node, context) => {
  if (node.type !== 'text') return null;
  const content = String(node.content || '').trim();
  if (!/^(?:>=\s*)?v?\d+\.\d+(?:\.\d+)?$/i.test(content)) return null;

  let root = context;
  while (root.parentCtx) root = root.parentCtx;
  return root.node.id === 'layer-components-overview' ? null : node.id;
}).filter(Boolean).length;

Print({
  removedVersionLabels: labelContainers.length,
  remainingVersionLabels,
  preservedTopLevel: 'layer-components-overview',
});
