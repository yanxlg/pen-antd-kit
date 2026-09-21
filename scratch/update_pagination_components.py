import json
from scripts.pen_mcp import PenMCP

client = PenMCP()

js_code = """
// 1. Update Card 6 (Simple mode)
Update('mTwNB', { name: 'Pagination · Simple mode' });
Update('Qqv8v', { content: 'Simple mode' });
Update('Ar6LH', {
  name: 'Pagination · Simple (Editable)',
  inputs: {
    current: 2,
    total: 50,
    pageSize: 10,
    size: 'middle',
    simple: true,
    readOnly: false,
    disabled: false
  }
});

// Check if already has more than 2 children (State + 1 ref)
const card6 = Get('mTwNB');
if (card6.children.length === 2) {
  Insert('mTwNB', {
    type: 'ref',
    ref: 'Y9L6l',
    name: 'Pagination · Simple (Read-only)',
    width: 740,
    height: 32,
    inputs: {
      current: 2,
      total: 50,
      pageSize: 10,
      size: 'middle',
      simple: true,
      readOnly: true,
      disabled: false
    }
  });
  Insert('mTwNB', {
    type: 'ref',
    ref: 'Y9L6l',
    name: 'Pagination · Simple (Disabled)',
    width: 740,
    height: 32,
    inputs: {
      current: 2,
      total: 50,
      pageSize: 10,
      size: 'middle',
      simple: true,
      disabled: true,
      readOnly: false
    }
  });
}

// 2. Update Card 8 (Total items)
Update('UcNOG', { name: 'Pagination · Total items' });
Update('f87aez', { content: 'Total items' });
Update('m1g7Ki', {
  name: 'Pagination · Total count',
  inputs: {
    current: 1,
    total: 85,
    pageSize: 20,
    size: 'middle',
    disabled: false,
    simple: false,
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: 'total'
  }
});

const card8 = Get('UcNOG');
if (card8.children.length === 2) {
  Insert('UcNOG', {
    type: 'ref',
    ref: 'Y9L6l',
    name: 'Pagination · Total range',
    width: 740,
    height: 32,
    inputs: {
      current: 1,
      total: 85,
      pageSize: 20,
      size: 'middle',
      disabled: false,
      simple: false,
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: 'range'
    }
  });
}

// Helper to create a standard Card
function makeCard(name, title, children) {
  return {
    type: 'frame',
    name: name,
    width: 1664,
    fill: '#ffffff',
    cornerRadius: 8,
    stroke: '#f0f0f0',
    strokeWidth: 1,
    layout: 'vertical',
    gap: 16,
    padding: 24,
    children: [
      {
        type: 'text',
        name: 'State',
        fill: '#000000e0',
        textGrowth: 'fixed-width',
        width: 'fill_container',
        content: title,
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 1.5714
      },
      ...children
    ]
  };
}

const container = Get('DLzDc');
const existingNames = container.children.map(c => c.name);

// 3. Card: Align
if (!existingNames.some(n => n.includes('Align'))) {
  Insert('DLzDc', makeCard('Pagination · Align', 'Align', [
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Align start',
      width: 'fill_container',
      height: 32,
      inputs: { current: 1, total: 50, pageSize: 10, size: 'middle', align: 'start' }
    },
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Align center',
      width: 'fill_container',
      height: 32,
      inputs: { current: 1, total: 50, pageSize: 10, size: 'middle', align: 'center' }
    },
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Align end',
      width: 'fill_container',
      height: 32,
      inputs: { current: 1, total: 50, pageSize: 10, size: 'middle', align: 'end' }
    }
  ]));
}

// 4. Card: Controlled
if (!existingNames.some(n => n.includes('Controlled'))) {
  Insert('DLzDc', makeCard('Pagination · Controlled', 'Controlled', [
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Controlled',
      width: 740,
      height: 32,
      inputs: { current: 3, total: 50, pageSize: 10, size: 'middle' }
    }
  ]));
}

// 5. Card: Prev and next
if (!existingNames.some(n => n.includes('Prev and next'))) {
  Insert('DLzDc', makeCard('Pagination · Prev and next', 'Prev and next', [
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Prev and next',
      width: 740,
      height: 32,
      inputs: { current: 1, total: 500, pageSize: 10, size: 'middle', previousLabel: 'Previous', nextLabel: 'Next', showSizeChanger: true }
    }
  ]));
}

// 6. Card: Custom size changer
if (!existingNames.some(n => n.includes('Custom size changer'))) {
  Insert('DLzDc', makeCard('Pagination · Custom size changer', 'Custom size changer', [
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Custom size changer',
      width: 740,
      height: 32,
      inputs: { current: 3, total: 500, pageSize: 10, size: 'middle', showSizeChanger: true, customSizeChanger: 'InputNumber' }
    }
  ]));
}

// 7. Card: Custom semantic styling
if (!existingNames.some(n => n.includes('Custom semantic styling'))) {
  Insert('DLzDc', makeCard('Pagination · Custom semantic styling', 'Custom semantic styling', [
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Semantic dashed middle',
      width: 'fill_container',
      height: 52,
      inputs: {
        current: 1,
        total: 500,
        pageSize: 10,
        size: 'middle',
        showSizeChanger: true,
        classNames: '{"root":"custom-dashed"}',
        styles: '{"item":{"borderRadius":999}}'
      }
    },
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Semantic dashed small',
      width: 'fill_container',
      height: 44,
      inputs: {
        current: 1,
        total: 500,
        pageSize: 10,
        size: 'small',
        showSizeChanger: true,
        classNames: '{"root":"custom-dashed"}',
        styles: '{"item":{"backgroundColor":"#0000000a","borderRadius":999}}'
      }
    }
  ]));
}

// 8. Card: Show all configured props
if (!existingNames.some(n => n.includes('Show all configured props'))) {
  Insert('DLzDc', makeCard('Pagination · Show all configured props', 'Show all configured props', [
    {
      type: 'ref',
      ref: 'Y9L6l',
      name: 'Pagination · Show all configured props',
      width: 740,
      height: 32,
      inputs: { current: 1, total: 85, pageSize: 20, size: 'middle', showSizeChanger: true, showQuickJumper: true, showTotal: 'total' }
    }
  ]));
}

// Recalculate heights
const updatedContainer = Get('DLzDc');
const h = Get('DLzDc', (n, c) => c.depth === 0 ? c.bounds.height : undefined)[0];
const targetBoardHeight = Math.ceil(h + 200);
Update('artboard-pagination-components', { height: targetBoardHeight });

const usageBoard = Get('artboard-pagination-usage');
const principlesBoard = Get('ZNZWe');
const maxSectionHeight = Math.max(targetBoardHeight, usageBoard ? usageBoard.height : 0, principlesBoard ? principlesBoard.height : 0) + 120;
Update('section-pagination', { height: maxSectionHeight });

Print(JSON.stringify({
  childrenCount: updatedContainer.children.length,
  containerHeight: h,
  targetBoardHeight: targetBoardHeight,
  maxSectionHeight: maxSectionHeight
}));
"""

res = client.execute(js_code)
print(res)
client.close()
