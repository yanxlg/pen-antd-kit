// Visual Preview Generator for Official Ant Design Figma-style Overview Cards
export function buildCardPreview(compName, pfx, w, h) {
  const cX = Math.round(w / 2);
  const cY = Math.round(h / 2);

  switch (compName) {
    case 'Button': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Buttons',
          width: 100, height: 96, layout: 'vertical', gap: 8, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-b1`, name: 'Primary',
              width: 96, height: 26, fill: '#1677FF', cornerRadius: 4,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Primary', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 11, fontWeight: '500' }],
            },
            {
              type: 'frame', id: `${pfx}-b2`, name: 'Default',
              width: 96, height: 26, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Default', fill: '#595959', fontFamily: 'Inter', fontSize: 11 }],
            },
            {
              type: 'frame', id: `${pfx}-b3`, name: 'Danger',
              width: 96, height: 26, fill: '#FFFFFF', stroke: '#FF4D4F', strokeWidth: 1, cornerRadius: 4,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: 'Danger', fill: '#FF4D4F', fontFamily: 'Inter', fontSize: 11 }],
            },
          ],
        },
      ];
    }

    case 'FloatButton': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'FloatButtons',
          layout: 'horizontal', gap: 14, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-fab1`, name: 'Primary FAB',
              width: 44, height: 44, cornerRadius: 22, fill: '#1677FF',
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-t1`, name: 'Icon', content: '★', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 18 }],
            },
            {
              type: 'frame', id: `${pfx}-fab2`, name: 'Default FAB',
              width: 34, height: 34, cornerRadius: 17, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-t2`, name: 'Icon', content: '?', fill: '#595959', fontFamily: 'Inter', fontSize: 14 }],
            },
          ],
        },
      ];
    }

    case 'Typography': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Typography Preview',
          layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            { type: 'text', id: `${pfx}-aa`, name: 'Aa', content: 'Aa', fill: '#1677FF', fontFamily: 'Inter', fontSize: 44, fontWeight: '700' },
            {
              type: 'frame', id: `${pfx}-lines`, name: 'Guideline Rows',
              layout: 'vertical', gap: 4, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-l1`, width: 100, height: 6, fill: '#E8EEF5', cornerRadius: 3 },
                { type: 'frame', id: `${pfx}-l2`, width: 70, height: 6, fill: '#E8EEF5', cornerRadius: 3 },
              ],
            },
          ],
        },
      ];
    }

    case 'Divider': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Divider Preview',
          width: 130, layout: 'vertical', gap: 10, alignItems: 'center',
          children: [
            { type: 'frame', id: `${pfx}-l1`, width: 120, height: 8, fill: '#F0F2F5', cornerRadius: 4 },
            {
              type: 'frame', id: `${pfx}-row`, name: 'Divider Line',
              width: 130, height: 16, layout: 'horizontal', alignItems: 'center', gap: 8,
              children: [
                { type: 'frame', id: `${pfx}-dl1`, width: 42, height: 1, fill: '#1677FF' },
                { type: 'text', id: `${pfx}-dt`, name: 'Text', content: 'Text', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10, fontWeight: '500' },
                { type: 'frame', id: `${pfx}-dl2`, width: 42, height: 1, fill: '#1677FF' },
              ],
            },
            { type: 'frame', id: `${pfx}-l2`, width: 120, height: 8, fill: '#F0F2F5', cornerRadius: 4 },
          ],
        },
      ];
    }

    case 'Grid': {
      const cols = Array.from({ length: 8 }).map((_, i) => ({
        type: 'frame', id: `${pfx}-c${i}`, name: `Col ${i + 1}`,
        width: 12, height: 72, fill: '#BAE0FF', cornerRadius: 2,
      }));
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Grid Preview',
          layout: 'horizontal', gap: 6, alignItems: 'center',
          children: cols,
        },
      ];
    }

    case 'Layout': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Layout Mockup',
          width: 140, height: 88, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, clip: true,
          layout: 'vertical',
          children: [
            { type: 'frame', id: `${pfx}-hdr`, name: 'Header', width: 140, height: 16, fill: '#BAE0FF' },
            {
              type: 'frame', id: `${pfx}-mid`, name: 'Body',
              width: 140, height: 72, layout: 'horizontal',
              children: [
                { type: 'frame', id: `${pfx}-side`, name: 'Sidebar', width: 32, height: 72, fill: '#F0F2F5' },
                {
                  type: 'frame', id: `${pfx}-cnt`, name: 'Content',
                  width: 108, height: 72, padding: 8, layout: 'vertical', gap: 6,
                  children: [
                    { type: 'frame', id: `${pfx}-b1`, width: 70, height: 8, fill: '#E8EEF5', cornerRadius: 2 },
                    { type: 'frame', id: `${pfx}-b2`, width: 90, height: 32, fill: '#F5F5F5', cornerRadius: 2 },
                  ],
                },
              ],
            },
          ],
        },
      ];
    }

    case 'Space': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Space Preview',
          layout: 'vertical', gap: 8, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 8,
              children: [
                { type: 'frame', id: `${pfx}-b1`, width: 44, height: 26, fill: '#F0F2F5', cornerRadius: 4 },
                { type: 'frame', id: `${pfx}-b2`, width: 44, height: 26, fill: '#F0F2F5', cornerRadius: 4 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 8,
              children: [
                { type: 'frame', id: `${pfx}-b3`, width: 44, height: 26, fill: '#F0F2F5', cornerRadius: 4 },
                { type: 'frame', id: `${pfx}-b4`, width: 44, height: 26, fill: '#F0F2F5', cornerRadius: 4 },
              ],
            },
          ],
        },
      ];
    }

    case 'Col':
    case 'Row': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Col Row Preview',
          width: 140, layout: 'vertical', gap: 8,
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 6,
              children: [
                { type: 'frame', id: `${pfx}-c1`, width: 67, height: 28, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: '50%', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10 }] },
                { type: 'frame', id: `${pfx}-c2`, width: 67, height: 28, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: '50%', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10 }] },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 6,
              children: [
                { type: 'frame', id: `${pfx}-c3`, width: 42, height: 28, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: '33%', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10 }] },
                { type: 'frame', id: `${pfx}-c4`, width: 42, height: 28, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t4`, name: 'T', content: '33%', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10 }] },
                { type: 'frame', id: `${pfx}-c5`, width: 42, height: 28, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t5`, name: 'T', content: '33%', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'Flex': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Flex Box',
          width: 140, height: 56, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, strokeStyle: 'dashed', cornerRadius: 4,
          layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between', padding: [0, 10],
          children: [
            { type: 'frame', id: `${pfx}-f1`, width: 32, height: 32, fill: '#1677FF', cornerRadius: 4, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: '1', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' }] },
            { type: 'frame', id: `${pfx}-f2`, width: 32, height: 32, fill: '#1677FF', cornerRadius: 4, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: '2', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' }] },
            { type: 'frame', id: `${pfx}-f3`, width: 32, height: 32, fill: '#1677FF', cornerRadius: 4, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: '3', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' }] },
          ],
        },
      ];
    }

    case 'Splitter': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Splitter Frame',
          width: 140, height: 70, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, clip: true,
          layout: 'horizontal',
          children: [
            { type: 'frame', id: `${pfx}-p1`, width: 62, height: 70, fill: '#F5F5F5', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Pane 1', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 }] },
            { type: 'frame', id: `${pfx}-sp`, width: 4, height: 70, fill: '#1677FF' },
            { type: 'frame', id: `${pfx}-p2`, width: 74, height: 70, fill: '#FFFFFF', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Pane 2', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 }] },
          ],
        },
      ];
    }

    case 'Masonry': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Masonry Preview',
          layout: 'horizontal', gap: 6, alignItems: 'flex_start',
          children: [
            { type: 'frame', id: `${pfx}-c1`, layout: 'vertical', gap: 6, children: [{ type: 'frame', id: `${pfx}-c11`, width: 34, height: 36, fill: '#BAE0FF', cornerRadius: 2 }, { type: 'frame', id: `${pfx}-c12`, width: 34, height: 24, fill: '#E8EEF5', cornerRadius: 2 }] },
            { type: 'frame', id: `${pfx}-c2`, layout: 'vertical', gap: 6, children: [{ type: 'frame', id: `${pfx}-c21`, width: 34, height: 22, fill: '#E8EEF5', cornerRadius: 2 }, { type: 'frame', id: `${pfx}-c22`, width: 34, height: 46, fill: '#BAE0FF', cornerRadius: 2 }] },
            { type: 'frame', id: `${pfx}-c3`, layout: 'vertical', gap: 6, children: [{ type: 'frame', id: `${pfx}-c31`, width: 34, height: 42, fill: '#BAE0FF', cornerRadius: 2 }, { type: 'frame', id: `${pfx}-c32`, width: 34, height: 20, fill: '#E8EEF5', cornerRadius: 2 }] },
          ],
        },
      ];
    }

    case 'Affix': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Affix Frame',
          width: 130, height: 80, layout: 'vertical', gap: 8,
          children: [
            { type: 'frame', id: `${pfx}-l1`, width: 110, height: 6, fill: '#F0F2F5', cornerRadius: 3 },
            { type: 'frame', id: `${pfx}-l2`, width: 90, height: 6, fill: '#F0F2F5', cornerRadius: 3 },
            {
              type: 'frame', id: `${pfx}-btn`, name: 'Affixed Button',
              width: 60, height: 24, fill: '#1677FF', cornerRadius: 4,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-t`, name: 'T', content: 'Affix', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 11, fontWeight: '500' }],
            },
            { type: 'frame', id: `${pfx}-l3`, width: 100, height: 6, fill: '#F0F2F5', cornerRadius: 3 },
          ],
        },
      ];
    }

    case 'Breadcrumb': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Breadcrumb Preview',
          layout: 'horizontal', alignItems: 'center', gap: 6,
          children: [
            { type: 'frame', id: `${pfx}-b1`, width: 24, height: 8, fill: '#BFBFBF', cornerRadius: 2 },
            { type: 'text', id: `${pfx}-s1`, name: 'Slash', content: '/', fill: '#BFBFBF', fontFamily: 'Inter', fontSize: 12 },
            { type: 'frame', id: `${pfx}-b2`, width: 30, height: 8, fill: '#BFBFBF', cornerRadius: 2 },
            { type: 'text', id: `${pfx}-s2`, name: 'Slash', content: '/', fill: '#BFBFBF', fontFamily: 'Inter', fontSize: 12 },
            { type: 'frame', id: `${pfx}-b3`, width: 36, height: 8, fill: '#1677FF', cornerRadius: 2 },
          ],
        },
      ];
    }

    case 'Dropdown': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Dropdown Frame',
          width: 120, layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-trig`, name: 'Trigger',
              width: 110, height: 26, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-tt`, name: 'T', content: 'Hover me', fill: '#595959', fontFamily: 'Inter', fontSize: 10 },
                { type: 'text', id: `${pfx}-ti`, name: 'Arr', content: '▾', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-pop`, name: 'Menu Popover',
              width: 110, height: 52, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
              layout: 'vertical', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-m1`, width: 102, height: 12, fill: '#E6F4FF', cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-m2`, width: 102, height: 12, fill: '#F5F5F5', cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-m3`, width: 102, height: 12, fill: '#F5F5F5', cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'Menu': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Menu Preview',
          width: 120, height: 76, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
          layout: 'vertical', gap: 4,
          children: [
            { type: 'frame', id: `${pfx}-m1`, width: 112, height: 20, padding: [0, 6], layout: 'horizontal', alignItems: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Option 1', fill: '#595959', fontFamily: 'Inter', fontSize: 10 }] },
            {
              type: 'frame', id: `${pfx}-m2`, width: 112, height: 20, fill: '#E6F4FF', cornerRadius: 2, padding: [0, 6],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Option 2', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10, fontWeight: '500' },
                { type: 'frame', id: `${pfx}-bar`, width: 3, height: 14, fill: '#1677FF', cornerRadius: 1 },
              ],
            },
            { type: 'frame', id: `${pfx}-m3`, width: 112, height: 20, padding: [0, 6], layout: 'horizontal', alignItems: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: 'Option 3', fill: '#595959', fontFamily: 'Inter', fontSize: 10 }] },
          ],
        },
      ];
    }

    case 'Pagination': {
      const pbox = (id, content, active) => ({
        type: 'frame', id, width: 22, height: 22, cornerRadius: 3,
        fill: active ? '#1677FF' : '#FFFFFF',
        stroke: active ? undefined : '#D9D9D9', strokeWidth: active ? undefined : 1,
        layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
        children: [{ type: 'text', id: `${id}-t`, name: 'T', content, fill: active ? '#FFFFFF' : '#595959', fontFamily: 'Inter', fontSize: 10 }],
      });
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Pagination Row',
          layout: 'horizontal', gap: 4, alignItems: 'center',
          children: [
            pbox(`${pfx}-p0`, '<', false),
            pbox(`${pfx}-p1`, '1', true),
            pbox(`${pfx}-p2`, '2', false),
            pbox(`${pfx}-p3`, '3', false),
            pbox(`${pfx}-p4`, '>', false),
          ],
        },
      ];
    }

    case 'Steps': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Steps Row',
          layout: 'horizontal', alignItems: 'center', gap: 4,
          children: [
            { type: 'frame', id: `${pfx}-s1`, width: 20, height: 20, cornerRadius: 10, fill: '#1677FF', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: '1', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 10 }] },
            { type: 'frame', id: `${pfx}-l1`, width: 24, height: 2, fill: '#1677FF' },
            { type: 'frame', id: `${pfx}-s2`, width: 20, height: 20, cornerRadius: 10, fill: '#1677FF', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: '2', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 10 }] },
            { type: 'frame', id: `${pfx}-l2`, width: 24, height: 2, fill: '#D9D9D9' },
            { type: 'frame', id: `${pfx}-s3`, width: 20, height: 20, cornerRadius: 10, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: '3', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 }] },
          ],
        },
      ];
    }

    case 'Tabs': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Tabs Preview',
          width: 130, layout: 'vertical', gap: 8, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-row`, layout: 'horizontal', gap: 14,
              children: [
                {
                  type: 'frame', id: `${pfx}-tb1`, layout: 'vertical', gap: 4, alignItems: 'center',
                  children: [
                    { type: 'text', id: `${pfx}-tt1`, name: 'T', content: 'Tab 1', fill: '#1677FF', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' },
                    { type: 'frame', id: `${pfx}-ub`, width: 28, height: 2, fill: '#1677FF' },
                  ],
                },
                { type: 'text', id: `${pfx}-tt2`, name: 'T', content: 'Tab 2', fill: '#595959', fontFamily: 'Inter', fontSize: 11 },
                { type: 'text', id: `${pfx}-tt3`, name: 'T', content: 'Tab 3', fill: '#595959', fontFamily: 'Inter', fontSize: 11 },
              ],
            },
            { type: 'frame', id: `${pfx}-pnl`, width: 120, height: 38, fill: '#F9F9F9', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 4 },
          ],
        },
      ];
    }

    case 'Anchor': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Anchor Preview',
          layout: 'horizontal', gap: 8,
          children: [
            {
              type: 'frame', id: `${pfx}-line`, width: 2, height: 64, fill: '#D9D9D9', layout: 'vertical',
              children: [{ type: 'frame', id: `${pfx}-act`, width: 2, height: 18, fill: '#1677FF' }],
            },
            {
              type: 'frame', id: `${pfx}-links`, layout: 'vertical', gap: 6,
              children: [
                { type: 'text', id: `${pfx}-a1`, name: 'T', content: 'Basic demo', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10, fontWeight: '500' },
                { type: 'text', id: `${pfx}-a2`, name: 'T', content: 'Static demo', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
                { type: 'text', id: `${pfx}-a3`, name: 'T', content: 'API Reference', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
              ],
            },
          ],
        },
      ];
    }

    case 'AutoComplete': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'AutoComplete Frame',
          width: 130, layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-inp`, width: 124, height: 26, stroke: '#1677FF', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center',
              children: [{ type: 'text', id: `${pfx}-t`, name: 'T', content: 'anti', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 10 }],
            },
            {
              type: 'frame', id: `${pfx}-pop`, width: 124, height: 48, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
              layout: 'vertical', gap: 3,
              children: [
                { type: 'frame', id: `${pfx}-r1`, width: 116, height: 12, fill: '#E6F4FF', cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-r2`, width: 116, height: 12, fill: '#F5F5F5', cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-r3`, width: 116, height: 12, fill: '#F5F5F5', cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'Checkbox': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Checkbox List',
          layout: 'vertical', gap: 8,
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-cb1`, width: 14, height: 14, fill: '#1677FF', cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-ck`, name: 'T', content: '✓', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 9 }] },
                { type: 'frame', id: `${pfx}-b1`, width: 64, height: 8, fill: '#8C8C8C', cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-cb2`, width: 14, height: 14, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-b2`, width: 80, height: 8, fill: '#D9D9D9', cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r3`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-cb3`, width: 14, height: 14, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-b3`, width: 50, height: 8, fill: '#D9D9D9', cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'Cascader': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Cascader Frame',
          layout: 'horizontal', gap: 2,
          children: [
            {
              type: 'frame', id: `${pfx}-p1`, width: 64, height: 72, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 2, padding: 4,
              layout: 'vertical', gap: 3,
              children: [
                { type: 'frame', id: `${pfx}-m1`, width: 56, height: 18, fill: '#E6F4FF', cornerRadius: 2, padding: [0, 4], layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Zhejiang', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9 }, { type: 'text', id: `${pfx}-a1`, name: 'T', content: '>', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9 }] },
                { type: 'frame', id: `${pfx}-m2`, width: 56, height: 18, padding: [0, 4], layout: 'horizontal', alignItems: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Jiangsu', fill: '#595959', fontFamily: 'Inter', fontSize: 9 }] },
              ],
            },
            {
              type: 'frame', id: `${pfx}-p2`, width: 64, height: 72, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 2, padding: 4,
              layout: 'vertical', gap: 3,
              children: [
                { type: 'frame', id: `${pfx}-m3`, width: 56, height: 18, padding: [0, 4], layout: 'horizontal', alignItems: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: 'Hangzhou', fill: '#595959', fontFamily: 'Inter', fontSize: 9 }] },
                { type: 'frame', id: `${pfx}-m4`, width: 56, height: 18, padding: [0, 4], layout: 'horizontal', alignItems: 'center', children: [{ type: 'text', id: `${pfx}-t4`, name: 'T', content: 'Ningbo', fill: '#595959', fontFamily: 'Inter', fontSize: 9 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'Form': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Form Frame',
          layout: 'vertical', gap: 8, alignItems: 'flex_start',
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 6, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-lb1`, width: 22, height: 6, fill: '#BFBFBF', cornerRadius: 2 },
                { type: 'text', id: `${pfx}-c1`, name: 'Col', content: ':', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
                { type: 'frame', id: `${pfx}-inp1`, width: 78, height: 20, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 6, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-lb2`, width: 22, height: 6, fill: '#BFBFBF', cornerRadius: 2 },
                { type: 'text', id: `${pfx}-c2`, name: 'Col', content: ':', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
                { type: 'frame', id: `${pfx}-inp2`, width: 78, height: 20, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-btn`, width: 48, height: 20, fill: '#1677FF', cornerRadius: 2,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-bt`, name: 'T', content: 'Submit', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 9 }],
            },
          ],
        },
      ];
    }

    case 'InputNumber': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'InputNumber Box',
          width: 120, height: 28, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
          layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
          children: [
            { type: 'text', id: `${pfx}-num`, name: 'T', content: '100', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 11 },
            {
              type: 'frame', id: `${pfx}-btns`, layout: 'vertical', gap: 1, alignItems: 'center',
              children: [
                { type: 'text', id: `${pfx}-u`, name: 'Up', content: '▴', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 8 },
                { type: 'text', id: `${pfx}-d`, name: 'Down', content: '▾', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 8 },
              ],
            },
          ],
        },
      ];
    }

    case 'Input': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Input Stack',
          layout: 'vertical', gap: 8, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-i1`, width: 130, height: 26, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center',
              children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Default Size', fill: '#BFBFBF', fontFamily: 'Inter', fontSize: 10 }],
            },
            {
              type: 'frame', id: `${pfx}-i2`, width: 130, height: 26, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center',
              children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Default Size', fill: '#BFBFBF', fontFamily: 'Inter', fontSize: 10 }],
            },
          ],
        },
      ];
    }

    case 'Rate': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Rate Preview',
          layout: 'horizontal', gap: 4, alignItems: 'center',
          children: [
            { type: 'text', id: `${pfx}-s1`, name: 'S', content: '★', fill: '#FAAD14', fontFamily: 'Inter', fontSize: 14 },
            { type: 'text', id: `${pfx}-s2`, name: 'S', content: '★', fill: '#FAAD14', fontFamily: 'Inter', fontSize: 14 },
            { type: 'text', id: `${pfx}-s3`, name: 'S', content: '★', fill: '#FAAD14', fontFamily: 'Inter', fontSize: 14 },
            { type: 'text', id: `${pfx}-s4`, name: 'S', content: '★', fill: '#FAAD14', fontFamily: 'Inter', fontSize: 14 },
            { type: 'text', id: `${pfx}-s5`, name: 'S', content: '☆', fill: '#D9D9D9', fontFamily: 'Inter', fontSize: 14 },
            { type: 'text', id: `${pfx}-val`, name: 'V', content: '3.5', fill: '#595959', fontFamily: 'Inter', fontSize: 12, fontWeight: '600' },
          ],
        },
      ];
    }

    case 'Radio': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Radio List',
          layout: 'vertical', gap: 8,
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-rd1`, width: 14, height: 14, stroke: '#1677FF', strokeWidth: 1, cornerRadius: 7, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'frame', id: `${pfx}-dot`, width: 6, height: 6, fill: '#1677FF', cornerRadius: 3 }] },
                { type: 'frame', id: `${pfx}-b1`, width: 64, height: 8, fill: '#8C8C8C', cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-rd2`, width: 14, height: 14, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 7 },
                { type: 'frame', id: `${pfx}-b2`, width: 80, height: 8, fill: '#D9D9D9', cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r3`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-rd3`, width: 14, height: 14, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 7 },
                { type: 'frame', id: `${pfx}-b3`, width: 50, height: 8, fill: '#D9D9D9', cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'Switch': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Switch Pair',
          layout: 'vertical', gap: 10, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-on`, width: 44, height: 22, fill: '#1677FF', cornerRadius: 11, padding: [2, 2],
              layout: 'horizontal', justifyContent: 'flex_end',
              children: [{ type: 'frame', id: `${pfx}-h1`, width: 18, height: 18, fill: '#FFFFFF', cornerRadius: 9 }],
            },
            {
              type: 'frame', id: `${pfx}-off`, width: 44, height: 22, fill: '#BFBFBF', cornerRadius: 11, padding: [2, 2],
              layout: 'horizontal', justifyContent: 'flex_start',
              children: [{ type: 'frame', id: `${pfx}-h2`, width: 18, height: 18, fill: '#FFFFFF', cornerRadius: 9 }],
            },
          ],
        },
      ];
    }

    case 'Select': {
      const sbox = (id, textContent) => ({
        type: 'frame', id, width: 130, height: 24, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
        layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
        children: [
          { type: 'text', id: `${id}-t`, name: 'T', content: textContent, fill: '#595959', fontFamily: 'Inter', fontSize: 10 },
          { type: 'text', id: `${id}-arr`, name: 'A', content: '▾', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 9 },
        ],
      });
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Select Stack',
          layout: 'vertical', gap: 6,
          children: [
            sbox(`${pfx}-s1`, 'lucy'),
            sbox(`${pfx}-s2`, 'jack'),
            sbox(`${pfx}-s3`, 'yiminghe'),
          ],
        },
      ];
    }

    case 'TreeSelect': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'TreeSelect Frame',
          width: 130, layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-inp`, width: 124, height: 24, stroke: '#1677FF', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-it`, name: 'T', content: 'Please Select', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9 },
                { type: 'text', id: `${pfx}-ia`, name: 'A', content: '▴', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-tree`, width: 124, height: 50, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
              layout: 'vertical', gap: 3,
              children: [
                { type: 'text', id: `${pfx}-tr1`, name: 'T', content: '▾ ☑ Node 1', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9 },
                { type: 'text', id: `${pfx}-tr2`, name: 'T', content: '   └── ☐ Child 1', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
                { type: 'text', id: `${pfx}-tr3`, name: 'T', content: '   └── ☐ Child 2', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
              ],
            },
          ],
        },
      ];
    }

    case 'Transfer': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Transfer Row',
          layout: 'horizontal', gap: 6, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-b1`, width: 48, height: 66, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2, padding: 4,
              layout: 'vertical', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-r1`, width: 40, height: 10, fill: '#E6F4FF', cornerRadius: 1 },
                { type: 'frame', id: `${pfx}-r2`, width: 40, height: 10, fill: '#E6F4FF', cornerRadius: 1 },
                { type: 'frame', id: `${pfx}-r3`, width: 40, height: 10, fill: '#F5F5F5', cornerRadius: 1 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-ctrl`, layout: 'vertical', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-a1`, width: 16, height: 16, fill: '#1677FF', cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: '>', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 9 }] },
                { type: 'frame', id: `${pfx}-a2`, width: 16, height: 16, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: '<', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 9 }] },
              ],
            },
            {
              type: 'frame', id: `${pfx}-b2`, width: 48, height: 66, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2, padding: 4,
              layout: 'vertical', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-r4`, width: 40, height: 10, fill: '#F5F5F5', cornerRadius: 1 },
              ],
            },
          ],
        },
      ];
    }

    case 'ColorPicker': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'ColorPicker Preview',
          layout: 'vertical', gap: 8, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-row`, layout: 'horizontal', gap: 8, alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-swatch`, width: 28, height: 28, fill: '#1677FF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4 },
                { type: 'text', id: `${pfx}-hex`, name: 'T', content: '#1677FF', fill: '#1677FF', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' },
              ],
            },
            { type: 'frame', id: `${pfx}-bar`, width: 100, height: 8, fill: '#FA8C16', cornerRadius: 4 },
          ],
        },
      ];
    }

    case 'DatePicker': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'DatePicker Frame',
          width: 130, layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-inp`, width: 124, height: 24, stroke: '#1677FF', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-dt`, name: 'T', content: '2026-09-16', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9 },
                { type: 'text', id: `${pfx}-ic`, name: 'I', content: '📅', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 9 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-cal`, width: 124, height: 50, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
              layout: 'vertical', gap: 3, alignItems: 'center',
              children: [
                { type: 'text', id: `${pfx}-m`, name: 'T', content: 'Sep 2026', fill: '#1677FF', fontFamily: 'Inter', fontSize: 8, fontWeight: '600' },
                { type: 'frame', id: `${pfx}-grid`, width: 112, height: 28, fill: '#F5F5F5', cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'TimePicker': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'TimePicker Frame',
          width: 124, layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-inp`, width: 118, height: 26, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-tm`, name: 'T', content: '12:08:24', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 10 },
                { type: 'text', id: `${pfx}-ic`, name: 'I', content: '⏰', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 9 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-cols`, layout: 'horizontal', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-c1`, width: 34, height: 42, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-c2`, width: 34, height: 42, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-c3`, width: 34, height: 42, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'Slider': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Slider Box',
          width: 120, layout: 'vertical', gap: 8, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-tt`, fill: '#1F1F1F', cornerRadius: 3, padding: [2, 6],
              children: [{ type: 'text', id: `${pfx}-ttt`, name: 'T', content: '60%', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 9 }],
            },
            {
              type: 'frame', id: `${pfx}-trk`, width: 120, height: 4, fill: '#F0F2F5', cornerRadius: 2,
              layout: 'horizontal', alignItems: 'center',
              children: [
                { type: 'frame', id: `${pfx}-fil`, width: 72, height: 4, fill: '#1677FF', cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-hdl`, width: 12, height: 12, fill: '#FFFFFF', stroke: '#1677FF', strokeWidth: 2, cornerRadius: 6 },
              ],
            },
          ],
        },
      ];
    }

    case 'Mentions': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Mentions Box',
          width: 130, layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-area`, width: 124, height: 38, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: 6,
              children: [{ type: 'text', id: `${pfx}-txt`, name: 'T', content: '@ant-design', fill: '#1677FF', fontFamily: 'Inter', fontSize: 10, fontWeight: '500' }],
            },
            {
              type: 'frame', id: `${pfx}-pop`, width: 124, height: 30, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
              children: [{ type: 'frame', id: `${pfx}-it`, width: 116, height: 20, fill: '#E6F4FF', cornerRadius: 2 }],
            },
          ],
        },
      ];
    }

    case 'Upload': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Upload Dropzone',
          width: 130, height: 72, fill: '#FAFAFA', stroke: '#1677FF', strokeWidth: 1, strokeStyle: 'dashed', cornerRadius: 4,
          layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 4,
          children: [
            { type: 'text', id: `${pfx}-cld`, name: 'Cloud', content: '☁', fill: '#1677FF', fontFamily: 'Inter', fontSize: 20 },
            { type: 'text', id: `${pfx}-txt`, name: 'T', content: 'Click or drag file', fill: '#595959', fontFamily: 'Inter', fontSize: 9 },
          ],
        },
      ];
    }

    case 'Avatar': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Avatar Row',
          layout: 'horizontal', gap: 10, alignItems: 'center',
          children: [
            { type: 'frame', id: `${pfx}-a1`, width: 34, height: 34, cornerRadius: 17, fill: '#1677FF', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'U', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 14, fontWeight: '600' }] },
            { type: 'frame', id: `${pfx}-a2`, width: 34, height: 34, cornerRadius: 17, fill: '#FA8C16', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'A', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 14, fontWeight: '600' }] },
            { type: 'frame', id: `${pfx}-a3`, width: 34, height: 34, cornerRadius: 4, fill: '#52C41A', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: 'D', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 14, fontWeight: '600' }] },
          ],
        },
      ];
    }

    case 'Badge': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Badge Preview',
          width: 50, height: 50,
          children: [
            { type: 'frame', id: `${pfx}-card`, width: 44, height: 44, fill: '#F0F2F5', cornerRadius: 4 },
            {
              type: 'frame', id: `${pfx}-pip`, width: 20, height: 16, fill: '#FF4D4F', cornerRadius: 8, x: 30, y: -4,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-pt`, name: 'T', content: '5', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 9, fontWeight: '700' }],
            },
          ],
        },
      ];
    }

    case 'Calendar': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Calendar Frame',
          width: 130, height: 76, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 6,
          layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            { type: 'text', id: `${pfx}-hdr`, name: 'T', content: 'September 2026', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '600' },
            { type: 'frame', id: `${pfx}-dots`, width: 116, height: 44, fill: '#F5F5F5', cornerRadius: 2 },
          ],
        },
      ];
    }

    case 'Card': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Card Preview',
          width: 130, height: 76, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 6,
          layout: 'vertical', gap: 6,
          children: [
            {
              type: 'frame', id: `${pfx}-hdr`, layout: 'horizontal', justifyContent: 'space_between', alignItems: 'center',
              children: [
                { type: 'text', id: `${pfx}-ct`, name: 'T', content: 'Card Title', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 10, fontWeight: '600' },
                { type: 'text', id: `${pfx}-cm`, name: 'T', content: 'More >', fill: '#1677FF', fontFamily: 'Inter', fontSize: 8 },
              ],
            },
            { type: 'frame', id: `${pfx}-ln`, width: 118, height: 1, fill: '#F0F0F0' },
            { type: 'frame', id: `${pfx}-l1`, width: 100, height: 6, fill: '#F0F2F5', cornerRadius: 2 },
            { type: 'frame', id: `${pfx}-l2`, width: 70, height: 6, fill: '#F0F2F5', cornerRadius: 2 },
          ],
        },
      ];
    }

    case 'Carousel': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Carousel Banner',
          width: 130, height: 64, fill: '#1677FF', cornerRadius: 4, padding: 4,
          layout: 'vertical', alignItems: 'center', justifyContent: 'space_between',
          children: [
            { type: 'text', id: `${pfx}-t`, name: 'T', content: 'Slide 1', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 12, fontWeight: '600' },
            { type: 'text', id: `${pfx}-dots`, name: 'Dots', content: '●  ○  ○', fill: '#FFFFFFB3', fontFamily: 'Inter', fontSize: 8 },
          ],
        },
      ];
    }

    case 'Collapse': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Collapse Preview',
          width: 130, layout: 'vertical', gap: 4,
          children: [
            {
              type: 'frame', id: `${pfx}-p1`, width: 130, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 3, padding: 4,
              layout: 'vertical', gap: 4,
              children: [
                { type: 'text', id: `${pfx}-t1`, name: 'T', content: '▾ Panel 1', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '500' },
                { type: 'frame', id: `${pfx}-c1`, width: 120, height: 20, fill: '#FFFFFF', cornerRadius: 2 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-p2`, width: 130, height: 20, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 3, padding: [2, 4],
              children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: '▸ Panel 2', fill: '#595959', fontFamily: 'Inter', fontSize: 9 }],
            },
          ],
        },
      ];
    }

    case 'Descriptions': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Descriptions Table',
          width: 130, stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 2, layout: 'vertical',
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal',
              children: [
                { type: 'frame', id: `${pfx}-c1`, width: 44, height: 22, fill: '#FAFAFA', padding: [4, 4], children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'User', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 8 }] },
                { type: 'frame', id: `${pfx}-c2`, width: 86, height: 22, fill: '#FFFFFF', padding: [4, 4], children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Zhou', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 8 }] },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal',
              children: [
                { type: 'frame', id: `${pfx}-c3`, width: 44, height: 22, fill: '#FAFAFA', padding: [4, 4], children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: 'City', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 8 }] },
                { type: 'frame', id: `${pfx}-c4`, width: 86, height: 22, fill: '#FFFFFF', padding: [4, 4], children: [{ type: 'text', id: `${pfx}-t4`, name: 'T', content: 'Hangzhou', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 8 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'Empty': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Empty Box',
          layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            { type: 'text', id: `${pfx}-ic`, name: 'Icon', content: '📦', fill: '#BFBFBF', fontFamily: 'Inter', fontSize: 28 },
            { type: 'text', id: `${pfx}-tx`, name: 'T', content: 'No Data', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
          ],
        },
      ];
    }

    case 'Image': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Image Placeholder',
          width: 100, height: 66, fill: '#F5F5F5', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4,
          layout: 'vertical', alignItems: 'center', justifyContent: 'center', gap: 4,
          children: [
            { type: 'text', id: `${pfx}-ic`, name: 'Icon', content: '🖼️', fill: '#BFBFBF', fontFamily: 'Inter', fontSize: 20 },
            { type: 'text', id: `${pfx}-ey`, name: 'Eye', content: 'Preview 👁', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 8 },
          ],
        },
      ];
    }

    case 'List': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'List Preview',
          width: 130, layout: 'vertical', gap: 6,
          children: [
            { type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 6, alignItems: 'center', children: [{ type: 'frame', id: `${pfx}-a1`, width: 16, height: 16, cornerRadius: 8, fill: '#BAE0FF' }, { type: 'frame', id: `${pfx}-t1`, width: 80, height: 6, fill: '#8C8C8C', cornerRadius: 2 }] },
            { type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 6, alignItems: 'center', children: [{ type: 'frame', id: `${pfx}-a2`, width: 16, height: 16, cornerRadius: 8, fill: '#BAE0FF' }, { type: 'frame', id: `${pfx}-t2`, width: 90, height: 6, fill: '#8C8C8C', cornerRadius: 2 }] },
            { type: 'frame', id: `${pfx}-r3`, layout: 'horizontal', gap: 6, alignItems: 'center', children: [{ type: 'frame', id: `${pfx}-a3`, width: 16, height: 16, cornerRadius: 8, fill: '#BAE0FF' }, { type: 'frame', id: `${pfx}-t3`, width: 70, height: 6, fill: '#8C8C8C', cornerRadius: 2 }] },
          ],
        },
      ];
    }

    case 'Popover': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Popover Preview',
          layout: 'vertical', alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-card`, width: 110, height: 44, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 6,
              layout: 'vertical', gap: 2,
              children: [
                { type: 'text', id: `${pfx}-pt`, name: 'T', content: 'Title', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 10, fontWeight: '600' },
                { type: 'text', id: `${pfx}-pc`, name: 'T', content: 'Content body...', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
              ],
            },
            { type: 'text', id: `${pfx}-arr`, name: 'A', content: '▼', fill: '#E8E8E8', fontFamily: 'Inter', fontSize: 10 },
          ],
        },
      ];
    }

    case 'QRCode': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'QRCode Box',
          width: 66, height: 66, fill: '#FFFFFF', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: 6,
          layout: 'vertical', alignItems: 'center', justifyContent: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-mat`, width: 50, height: 50, fill: '#1F1F1F', cornerRadius: 2,
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'frame', id: `${pfx}-dot`, width: 14, height: 14, fill: '#1677FF', cornerRadius: 2 }],
            },
          ],
        },
      ];
    }

    case 'Segmented': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Segmented Track',
          width: 130, height: 26, fill: '#F0F2F5', cornerRadius: 6, padding: 2,
          layout: 'horizontal', gap: 2,
          children: [
            { type: 'frame', id: `${pfx}-s1`, width: 40, height: 22, fill: '#FFFFFF', cornerRadius: 4, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Daily', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '600' }] },
            { type: 'frame', id: `${pfx}-s2`, width: 40, height: 22, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Weekly', fill: '#595959', fontFamily: 'Inter', fontSize: 9 }] },
            { type: 'frame', id: `${pfx}-s3`, width: 40, height: 22, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-t3`, name: 'T', content: 'Monthly', fill: '#595959', fontFamily: 'Inter', fontSize: 9 }] },
          ],
        },
      ];
    }

    case 'Statistic': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Statistic Preview',
          layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            { type: 'text', id: `${pfx}-lbl`, name: 'T', content: 'Active Users', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
            { type: 'text', id: `${pfx}-val`, name: 'T', content: '11,289', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 22, fontWeight: '700' },
            { type: 'text', id: `${pfx}-trd`, name: 'T', content: '+12.5% ▲', fill: '#52C41A', fontFamily: 'Inter', fontSize: 9, fontWeight: '600' },
          ],
        },
      ];
    }

    case 'Table': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Table Mockup',
          width: 130, stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 2, layout: 'vertical',
          children: [
            {
              type: 'frame', id: `${pfx}-th`, width: 130, height: 18, fill: '#FAFAFA', padding: [0, 6],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-h1`, name: 'T', content: 'Name', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 8, fontWeight: '600' },
                { type: 'text', id: `${pfx}-h2`, name: 'T', content: 'Age', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 8, fontWeight: '600' },
                { type: 'text', id: `${pfx}-h3`, name: 'T', content: 'Address', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 8, fontWeight: '600' },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r1`, width: 130, height: 18, padding: [0, 6],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-d1`, name: 'T', content: 'John', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
                { type: 'text', id: `${pfx}-d2`, name: 'T', content: '32', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
                { type: 'text', id: `${pfx}-d3`, name: 'T', content: 'New York', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, width: 130, height: 18, fill: '#FAFAFA', padding: [0, 6],
              layout: 'horizontal', alignItems: 'center', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-d4`, name: 'T', content: 'Jim', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
                { type: 'text', id: `${pfx}-d5`, name: 'T', content: '42', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
                { type: 'text', id: `${pfx}-d6`, name: 'T', content: 'London', fill: '#595959', fontFamily: 'Inter', fontSize: 8 },
              ],
            },
          ],
        },
      ];
    }

    case 'Tag': {
      const tagItem = (id, content, bg, border, col) => ({
        type: 'frame', id, fill: bg, stroke: border, strokeWidth: 1, cornerRadius: 4, padding: [2, 6],
        children: [{ type: 'text', id: `${id}-t`, name: 'T', content, fill: col, fontFamily: 'Inter', fontSize: 9 }],
      });
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Tag Grid',
          layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 6,
              children: [
                tagItem(`${pfx}-t1`, 'Processing', '#E6F4FF', '#91CAFF', '#1677FF'),
                tagItem(`${pfx}-t2`, 'Success', '#F6FFED', '#B7EB8F', '#52C41A'),
              ],
            },
            {
              type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 6,
              children: [
                tagItem(`${pfx}-t3`, 'Error', '#FFF2F0', '#FFCCC7', '#FF4D4F'),
                tagItem(`${pfx}-t4`, 'Warning', '#FFFBE6', '#FFE58F', '#FAAD14'),
              ],
            },
          ],
        },
      ];
    }

    case 'Timeline': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Timeline Frame',
          layout: 'vertical', gap: 6,
          children: [
            { type: 'frame', id: `${pfx}-r1`, layout: 'horizontal', gap: 6, alignItems: 'center', children: [{ type: 'frame', id: `${pfx}-d1`, width: 10, height: 10, cornerRadius: 5, fill: '#1677FF' }, { type: 'text', id: `${pfx}-t1`, name: 'T', content: 'Created task', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9 }] },
            { type: 'frame', id: `${pfx}-r2`, layout: 'horizontal', gap: 6, alignItems: 'center', children: [{ type: 'frame', id: `${pfx}-d2`, width: 10, height: 10, cornerRadius: 5, fill: '#52C41A' }, { type: 'text', id: `${pfx}-t2`, name: 'T', content: 'Solved bug', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9 }] },
            { type: 'frame', id: `${pfx}-r3`, layout: 'horizontal', gap: 6, alignItems: 'center', children: [{ type: 'frame', id: `${pfx}-d3`, width: 10, height: 10, cornerRadius: 5, fill: '#D9D9D9' }, { type: 'text', id: `${pfx}-t3`, name: 'T', content: 'Testing release', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 9 }] },
          ],
        },
      ];
    }

    case 'Tooltip': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Tooltip Bubble',
          layout: 'vertical', alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-card`, fill: '#1F1F1F', cornerRadius: 4, padding: [4, 8],
              children: [{ type: 'text', id: `${pfx}-t`, name: 'T', content: 'prompt text', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 9 }],
            },
            { type: 'text', id: `${pfx}-arr`, name: 'A', content: '▼', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9 },
          ],
        },
      ];
    }

    case 'Tour': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Tour Preview',
          layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            { type: 'frame', id: `${pfx}-btn`, width: 70, height: 22, fill: '#FFFFFF', stroke: '#1677FF', strokeWidth: 2, cornerRadius: 4, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-bt`, name: 'T', content: 'Target', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9 }] },
            {
              type: 'frame', id: `${pfx}-card`, width: 110, height: 38, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
              layout: 'vertical', gap: 2,
              children: [
                { type: 'text', id: `${pfx}-tt`, name: 'T', content: 'Guide Step 1/3', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 8, fontWeight: '600' },
                { type: 'frame', id: `${pfx}-nxt`, width: 34, height: 14, fill: '#1677FF', cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-nt`, name: 'T', content: 'Next', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 7 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'Tree': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Tree List',
          layout: 'vertical', gap: 4,
          children: [
            { type: 'text', id: `${pfx}-t1`, name: 'T', content: '▾ 📁 parent 1', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '500' },
            { type: 'text', id: `${pfx}-t2`, name: 'T', content: '   └── 📄 leaf 1-1', fill: '#595959', fontFamily: 'Inter', fontSize: 9 },
            { type: 'text', id: `${pfx}-t3`, name: 'T', content: '   └── 📄 leaf 1-2', fill: '#595959', fontFamily: 'Inter', fontSize: 9 },
          ],
        },
      ];
    }

    case 'Alert': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Alert Banner',
          width: 130, height: 36, fill: '#E6F4FF', stroke: '#91CAFF', strokeWidth: 1, cornerRadius: 4, padding: [0, 8],
          layout: 'horizontal', alignItems: 'center', gap: 6,
          children: [
            { type: 'text', id: `${pfx}-ic`, name: 'Icon', content: 'ℹ', fill: '#1677FF', fontFamily: 'Inter', fontSize: 12, fontWeight: '700' },
            { type: 'text', id: `${pfx}-tx`, name: 'T', content: 'Informational Notes', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9 },
          ],
        },
      ];
    }

    case 'Drawer': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Drawer Mockup',
          width: 130, height: 76, fill: '#00000022', cornerRadius: 4, clip: true,
          layout: 'horizontal', justifyContent: 'flex_end',
          children: [
            {
              type: 'frame', id: `${pfx}-drw`, width: 66, height: 76, fill: '#FFFFFF', padding: 6,
              layout: 'vertical', gap: 6,
              children: [
                {
                  type: 'frame', id: `${pfx}-hdr`, layout: 'horizontal', justifyContent: 'space_between',
                  children: [
                    { type: 'text', id: `${pfx}-dt`, name: 'T', content: 'Drawer', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '600' },
                    { type: 'text', id: `${pfx}-dx`, name: 'X', content: '×', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
                  ],
                },
                { type: 'frame', id: `${pfx}-l1`, width: 50, height: 6, fill: '#F0F2F5', cornerRadius: 2 },
                { type: 'frame', id: `${pfx}-l2`, width: 40, height: 6, fill: '#F0F2F5', cornerRadius: 2 },
              ],
            },
          ],
        },
      ];
    }

    case 'Modal': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Modal Dialog',
          width: 124, height: 76, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 6, padding: 6,
          layout: 'vertical', gap: 6,
          children: [
            {
              type: 'frame', id: `${pfx}-hdr`, layout: 'horizontal', justifyContent: 'space_between',
              children: [
                { type: 'text', id: `${pfx}-mt`, name: 'T', content: 'Basic Modal', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '600' },
                { type: 'text', id: `${pfx}-mx`, name: 'X', content: '×', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 },
              ],
            },
            { type: 'frame', id: `${pfx}-l1`, width: 100, height: 6, fill: '#F0F2F5', cornerRadius: 2 },
            {
              type: 'frame', id: `${pfx}-ftr`, layout: 'horizontal', justifyContent: 'flex_end', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-b1`, width: 34, height: 16, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-bt1`, name: 'T', content: 'Cancel', fill: '#595959', fontFamily: 'Inter', fontSize: 7 }] },
                { type: 'frame', id: `${pfx}-b2`, width: 24, height: 16, fill: '#1677FF', cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-bt2`, name: 'T', content: 'OK', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 7 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'Popconfirm': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Popconfirm Bubble',
          width: 110, height: 50, fill: '#FFFFFF', stroke: '#E8E8E8', strokeWidth: 1, cornerRadius: 4, padding: 4,
          layout: 'vertical', gap: 4,
          children: [
            { type: 'text', id: `${pfx}-tx`, name: 'T', content: '⚠️ Delete task?', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '500' },
            {
              type: 'frame', id: `${pfx}-btns`, layout: 'horizontal', justifyContent: 'flex_end', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-b1`, width: 22, height: 14, stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-bt1`, name: 'T', content: 'No', fill: '#595959', fontFamily: 'Inter', fontSize: 7 }] },
                { type: 'frame', id: `${pfx}-b2`, width: 22, height: 14, fill: '#1677FF', cornerRadius: 2, layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-bt2`, name: 'T', content: 'Yes', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 7 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'Progress': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Progress Bar',
          width: 120, layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-trk`, width: 120, height: 8, fill: '#F5F5F5', cornerRadius: 4,
              children: [{ type: 'frame', id: `${pfx}-fil`, width: 84, height: 8, fill: '#1677FF', cornerRadius: 4 }],
            },
            { type: 'text', id: `${pfx}-tx`, name: 'T', content: '70%', fill: '#1677FF', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' },
          ],
        },
      ];
    }

    case 'Result': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Result Preview',
          layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            { type: 'frame', id: `${pfx}-cir`, width: 28, height: 28, cornerRadius: 14, fill: '#52C41A', layout: 'horizontal', alignItems: 'center', justifyContent: 'center', children: [{ type: 'text', id: `${pfx}-ck`, name: 'T', content: '✓', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 14, fontWeight: '700' }] },
            { type: 'text', id: `${pfx}-ttl`, name: 'T', content: 'Success', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 11, fontWeight: '600' },
            { type: 'text', id: `${pfx}-sub`, name: 'T', content: 'Order #2026', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 9 },
          ],
        },
      ];
    }

    case 'Skeleton': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Skeleton Stack',
          width: 120, layout: 'vertical', gap: 6,
          children: [
            { type: 'frame', id: `${pfx}-cir`, width: 22, height: 22, cornerRadius: 11, fill: '#F0F2F5' },
            { type: 'frame', id: `${pfx}-b1`, width: 110, height: 8, fill: '#F0F2F5', cornerRadius: 2 },
            { type: 'frame', id: `${pfx}-b2`, width: 70, height: 8, fill: '#F0F2F5', cornerRadius: 2 },
          ],
        },
      ];
    }

    case 'Spin': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Spin Preview',
          layout: 'vertical', gap: 6, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-dots`, width: 24, height: 24, layout: 'horizontal', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-d1`, width: 8, height: 8, cornerRadius: 4, fill: '#1677FF' },
                { type: 'frame', id: `${pfx}-d2`, width: 8, height: 8, cornerRadius: 4, fill: '#69B1FF' },
              ],
            },
            { type: 'text', id: `${pfx}-tx`, name: 'T', content: 'Loading...', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9 },
          ],
        },
      ];
    }

    case 'Watermark': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'Watermark Pattern',
          width: 120, height: 60, fill: '#FAFAFA', stroke: '#F0F0F0', strokeWidth: 1, cornerRadius: 4, padding: 6,
          layout: 'vertical', gap: 4,
          children: [
            { type: 'text', id: `${pfx}-w1`, name: 'T', content: 'Ant Design', fill: '#0000001A', fontFamily: 'Inter', fontSize: 10 },
            { type: 'text', id: `${pfx}-w2`, name: 'T', content: '   Ant Design', fill: '#0000001A', fontFamily: 'Inter', fontSize: 10 },
            { type: 'text', id: `${pfx}-w3`, name: 'T', content: 'Ant Design', fill: '#0000001A', fontFamily: 'Inter', fontSize: 10 },
          ],
        },
      ];
    }

    case 'App': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'App Preview',
          width: 130, height: 64, fill: '#FAFAFA', stroke: '#D9D9D9', strokeWidth: 1, cornerRadius: 4, padding: 6,
          layout: 'vertical', gap: 4,
          children: [
            { type: 'text', id: `${pfx}-at`, name: 'T', content: 'App Root', fill: '#1F1F1F', fontFamily: 'Inter', fontSize: 9, fontWeight: '600' },
            {
              type: 'frame', id: `${pfx}-row`, layout: 'horizontal', gap: 4,
              children: [
                { type: 'frame', id: `${pfx}-t1`, fill: '#E6F4FF', cornerRadius: 2, padding: [1, 4], children: [{ type: 'text', id: `${pfx}-tt1`, name: 'T', content: 'message', fill: '#1677FF', fontFamily: 'Inter', fontSize: 7 }] },
                { type: 'frame', id: `${pfx}-t2`, fill: '#F6FFED', cornerRadius: 2, padding: [1, 4], children: [{ type: 'text', id: `${pfx}-tt2`, name: 'T', content: 'modal', fill: '#52C41A', fontFamily: 'Inter', fontSize: 7 }] },
                { type: 'frame', id: `${pfx}-t3`, fill: '#FFF7E6', cornerRadius: 2, padding: [1, 4], children: [{ type: 'text', id: `${pfx}-tt3`, name: 'T', content: 'notify', fill: '#FA8C16', fontFamily: 'Inter', fontSize: 7 }] },
              ],
            },
          ],
        },
      ];
    }

    case 'BackTop': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'BackTop Preview',
          layout: 'vertical', gap: 4, alignItems: 'center',
          children: [
            {
              type: 'frame', id: `${pfx}-btn`, width: 36, height: 36, cornerRadius: 18, fill: '#1677FF',
              layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
              children: [{ type: 'text', id: `${pfx}-up`, name: 'Up', content: '▲', fill: '#FFFFFF', fontFamily: 'Inter', fontSize: 12 }],
            },
            { type: 'text', id: `${pfx}-tx`, name: 'T', content: 'UP', fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 8 },
          ],
        },
      ];
    }

    case 'BorderBeam': {
      return [
        {
          type: 'frame', id: `${pfx}-box`, name: 'BorderBeam Box',
          width: 120, height: 50, fill: '#FFFFFF', stroke: '#1677FF', strokeWidth: 2, cornerRadius: 4,
          layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
          children: [{ type: 'text', id: `${pfx}-t`, name: 'T', content: 'Glowing Border', fill: '#1677FF', fontFamily: 'Inter', fontSize: 9, fontWeight: '500' }],
        },
      ];
    }

    default: {
      return [
        {
          type: 'frame', id: `${pfx}-def`, width: 100, height: 40, fill: '#F5F5F5', cornerRadius: 4,
          layout: 'horizontal', alignItems: 'center', justifyContent: 'center',
          children: [{ type: 'text', id: `${pfx}-t`, name: 'T', content: compName, fill: '#8C8C8C', fontFamily: 'Inter', fontSize: 10 }],
        },
      ];
    }
  }
}
