// Run with Pencil execute after adding or importing component detail frames.
// Canonical order: Principles -> Usage -> Components. Without Principles:
// Usage -> Components. Every adjacent frame uses a 40px gap.
const groups = [
  'layer-general',
  'layer-layout',
  'layer-navigation',
  'layer-data-entry',
  'layer-data-display',
  'layer-feedback',
  'layer-other',
];

let sectionsUpdated = 0;
let framesMoved = 0;
let sectionsResized = 0;
let groupSectionsMoved = 0;

for (const groupId of groups) {
  const sections = Get(groupId, (node, context) =>
    context.depth === 1 && node.type === 'frame'
      ? { id: node.id, x: context.bounds.x }
      : null,
  ).filter(Boolean).sort((a, b) => a.x - b.x);

  for (const section of sections) {
    const frames = Get(section.id, (node, context) => {
      if (context.depth !== 1 || node.type !== 'frame') return null;
      const name = String(node.name || '').toLowerCase();
      const kind = name.includes('principles')
        ? 'principles'
        : name.includes('usage')
          ? 'usage'
          : name.includes('components')
            ? 'components'
            : null;
      return kind
        ? { id: node.id, kind, x: context.bounds.x, width: context.bounds.width }
        : null;
    }).filter(Boolean);

    const ordered = ['principles', 'usage', 'components']
      .map(kind => frames.find(frame => frame.kind === kind))
      .filter(Boolean);
    if (!ordered.length) continue;

    let x = 0;
    let changed = false;
    for (const frame of ordered) {
      if (Math.abs(frame.x - x) > 0.1) {
        Update(frame.id, { x });
        framesMoved += 1;
        changed = true;
      }
      x += frame.width + 40;
    }
    if (changed) sectionsUpdated += 1;

    const sectionWidth = x - 40;
    const currentSection = Get(section.id, { depth: 0 });
    if (Math.abs(Number(currentSection.width) - sectionWidth) > 0.1) {
      Update(section.id, { width: sectionWidth });
      sectionsResized += 1;
    }
    const banners = Get(section.id, (node, context) =>
      context.depth === 1 && String(node.name || '').startsWith('Sub-Title')
        ? node.id
        : null,
    ).filter(Boolean);
    for (const bannerId of banners) Update(bannerId, { width: sectionWidth });
  }

  let sectionX = 0;
  let groupHeight = 0;
  for (const section of sections) {
    const currentSection = Get(section.id, { depth: 0 });
    if (Math.abs(Number(currentSection.x) - sectionX) > 0.1) {
      Update(section.id, { x: sectionX });
      groupSectionsMoved += 1;
    }
    sectionX += Number(currentSection.width) + 120;
    groupHeight = Math.max(groupHeight, Number(currentSection.height) || 0);
  }
  Update(groupId, {
    width: Math.max(1, sectionX - 120),
    height: groupHeight,
  });
}

Print({
  sectionsUpdated,
  framesMoved,
  sectionsResized,
  groupSectionsMoved,
  order: 'Principles -> Usage -> Components',
});
