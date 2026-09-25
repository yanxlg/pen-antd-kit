import fs from 'node:fs';

let idCounter = 5000;
function uid(prefix = 'vo') {
  return `${prefix}_${(idCounter++).toString(36)}`;
}

// 辅助构建符合 labelCol: {span: 6}, wrapperCol: {span: 14} 的 Form.Item
function makeItem({ name, label, isRequired = false, controlChildren, labelAlignTop = false, extraText = null }) {
  let contentChildren = controlChildren;
  if (extraText) {
    contentChildren = [
      {
        type: 'frame',
        id: uid('fext'),
        name: 'Item with Extra',
        width: 'fill_container',
        layout: 'vertical',
        gap: 4,
        children: [
          ...controlChildren,
          {
            type: 'text',
            id: uid('txt_extra'),
            name: 'Extra',
            fill: '#00000073',
            content: extraText,
            fontSize: 14,
            fontFamily: 'Inter',
            fontWeight: 'normal'
          }
        ]
      }
    ];
  }

  return {
    id: uid('fi'),
    type: 'ref',
    ref: 'npYpT',
    name: `Form.Item · ${name}`,
    width: 600,
    gap: 0,
    descendants: {
      FlQ2c: {
        width: 150,
        height: 32,
        justifyContent: 'end',
        alignItems: labelAlignTop ? 'start' : 'center',
        padding: labelAlignTop ? [5, 8, 0, 0] : [0, 8, 0, 0]
      },
      qOWm2: {
        enabled: isRequired
      },
      O1MFk: {
        content: label ? `${label}:` : ''
      },
      CVtG8: {
        width: 350,
        children: contentChildren
      }
    }
  };
}

// 构建全部 14 个官方表单项
export function buildValidateOtherItems() {
  return [
    // 1. Plain Text
    makeItem({
      name: 'Plain Text',
      label: 'Plain Text',
      controlChildren: [
        {
          type: 'frame',
          id: uid('f_china'),
          name: 'ant-form-text',
          width: 'fill_container',
          height: 32,
          layout: 'horizontal',
          alignItems: 'center',
          children: [
            {
              type: 'text',
              id: uid('ptxt'),
              name: 'China',
              fill: '#000000e0',
              content: 'China',
              fontSize: 14,
              lineHeight: 2.29,
              fontFamily: 'Inter',
              fontWeight: 'normal'
            }
          ]
        }
      ]
    }),

    // 2. Select
    makeItem({
      name: 'Select',
      label: 'Select',
      isRequired: true,
      controlChildren: [
        {
          id: uid('sel'),
          type: 'ref',
          ref: 'VoQE7',
          name: 'Select',
          width: 'fill_container',
          height: 32,
          inputs: {
            placeholder: 'Please select a country',
            value: '',
            options: 'China|U.S.A',
            hasFeedback: true
          }
        }
      ]
    }),

    // 3. Select[multiple]
    makeItem({
      name: 'Select[multiple]',
      label: 'Select[multiple]',
      isRequired: true,
      controlChildren: [
        {
          id: uid('sel_m'),
          type: 'ref',
          ref: 'VoQE7',
          name: 'Select',
          width: 'fill_container',
          height: 32,
          inputs: {
            mode: 'multiple',
            placeholder: 'Please select favourite colors',
            value: '',
            options: 'Red|Green|Blue'
          }
        }
      ]
    }),

    // 4. InputNumber
    makeItem({
      name: 'InputNumber',
      label: 'InputNumber',
      controlChildren: [
        {
          type: 'frame',
          id: uid('inp_num_row'),
          name: 'InputNumber Row',
          width: 'fill_container',
          layout: 'horizontal',
          alignItems: 'center',
          gap: 8,
          children: [
            {
              id: uid('inp_num'),
              type: 'ref',
              ref: 'SiWnx',
              name: 'InputNumber',
              width: 90,
              height: 32,
              inputs: {
                value: 3,
                min: 1,
                max: 10
              }
            },
            {
              type: 'text',
              id: uid('txt_mach'),
              name: 'machines',
              fill: '#000000e0',
              content: 'machines',
              fontSize: 14,
              fontFamily: 'Inter',
              fontWeight: 'normal'
            }
          ]
        }
      ]
    }),

    // 5. Switch
    makeItem({
      name: 'Switch',
      label: 'Switch',
      controlChildren: [
        {
          id: uid('sw'),
          type: 'ref',
          ref: 'rZqkn',
          name: 'Switch',
          width: 44,
          height: 22,
          inputs: {
            checked: false
          }
        }
      ]
    }),

    // 6. Slider
    makeItem({
      name: 'Slider',
      label: 'Slider',
      controlChildren: [
        {
          id: uid('slider'),
          type: 'ref',
          ref: 'N6xQH4',
          name: 'Slider',
          width: 'fill_container',
          height: 38,
          inputs: {
            marks: true,
            markValues: '0,20,40,60,80,100',
            markLabels: 'A,B,C,D,E,F',
            value: 0
          }
        }
      ]
    }),

    // 7. Radio.Group
    makeItem({
      name: 'Radio.Group',
      label: 'Radio.Group',
      controlChildren: [
        {
          id: uid('rg'),
          type: 'ref',
          ref: 'H0DThz',
          name: 'Radio.Group',
          width: 'fill_container',
          height: 32,
          inputs: {
            options: JSON.stringify(['item 1', 'item 2', 'item 3']),
            value: ''
          }
        }
      ]
    }),

    // 8. Radio.Button
    makeItem({
      name: 'Radio.Button',
      label: 'Radio.Button',
      isRequired: true,
      controlChildren: [
        {
          id: uid('rg_btn'),
          type: 'ref',
          ref: 'H0DThz',
          name: 'Radio.Group',
          width: 210,
          height: 32,
          inputs: {
            optionType: 'button',
            options: JSON.stringify(['item 1', 'item 2', 'item 3']),
            value: 'item 1'
          }
        }
      ]
    }),

    // 9. Checkbox.Group
    makeItem({
      name: 'Checkbox.Group',
      label: 'Checkbox.Group',
      labelAlignTop: true,
      controlChildren: [
        {
          type: 'frame',
          id: uid('cg_grid'),
          name: 'Checkbox Grid',
          width: 'fill_container',
          layout: 'vertical',
          gap: 8,
          children: [
            {
              type: 'frame',
              id: uid('cg_row1'),
              name: 'Row 1',
              width: 'fill_container',
              layout: 'horizontal',
              gap: 24,
              children: [
                { id: uid('cb_a'), type: 'ref', ref: 'cpj9Y', name: 'Checkbox', width: 60, height: 22, inputs: { children: 'A', checked: true } },
                { id: uid('cb_b'), type: 'ref', ref: 'cpj9Y', name: 'Checkbox', width: 60, height: 22, inputs: { children: 'B', checked: true, disabled: true } },
                { id: uid('cb_c'), type: 'ref', ref: 'cpj9Y', name: 'Checkbox', width: 60, height: 22, inputs: { children: 'C', checked: false } }
              ]
            },
            {
              type: 'frame',
              id: uid('cg_row2'),
              name: 'Row 2',
              width: 'fill_container',
              layout: 'horizontal',
              gap: 24,
              children: [
                { id: uid('cb_d'), type: 'ref', ref: 'cpj9Y', name: 'Checkbox', width: 60, height: 22, inputs: { children: 'D', checked: false } },
                { id: uid('cb_e'), type: 'ref', ref: 'cpj9Y', name: 'Checkbox', width: 60, height: 22, inputs: { children: 'E', checked: false } },
                { id: uid('cb_f'), type: 'ref', ref: 'cpj9Y', name: 'Checkbox', width: 60, height: 22, inputs: { children: 'F', checked: false } }
              ]
            }
          ]
        }
      ]
    }),

    // 10. Rate
    makeItem({
      name: 'Rate',
      label: 'Rate',
      controlChildren: [
        {
          id: uid('rate'),
          type: 'ref',
          ref: 'TCEuq',
          name: 'Rate',
          width: 130,
          height: 24,
          inputs: {
            value: 3.5,
            allowHalf: true
          }
        }
      ]
    }),

    // 11. Upload
    makeItem({
      name: 'Upload',
      label: 'Upload',
      extraText: 'longgggggggggggggggggggggggggggggggggg',
      labelAlignTop: true,
      controlChildren: [
        {
          id: uid('btn_up'),
          type: 'ref',
          ref: 'DQZzq',
          name: 'Button',
          width: 140,
          height: 32,
          inputs: {
            type: 'default',
            children: '⇪ Click to upload'
          }
        }
      ]
    }),

    // 12. Dragger
    makeItem({
      name: 'Dragger',
      label: 'Dragger',
      labelAlignTop: true,
      controlChildren: [
        {
          id: uid('dragger'),
          type: 'ref',
          ref: 'O1XUv',
          name: 'Upload.Dragger',
          width: 'fill_container',
          height: 140,
          inputs: {
            children: 'Click or drag file to this area to upload',
            hint: 'Support for a single or bulk upload.'
          }
        }
      ]
    }),

    // 13. ColorPicker
    makeItem({
      name: 'ColorPicker',
      label: 'ColorPicker',
      isRequired: true,
      controlChildren: [
        {
          id: uid('cp'),
          type: 'ref',
          ref: 'FUop2',
          name: 'ColorPicker',
          width: 32,
          height: 32,
          inputs: {
            value: '#1677FF',
            showText: false
          }
        }
      ]
    }),

    // 14. Action buttons: Submit + reset
    makeItem({
      name: 'Actions',
      label: '',
      controlChildren: [
        {
          type: 'frame',
          id: uid('act_space'),
          name: 'Space',
          width: 'fill_container',
          layout: 'horizontal',
          gap: 8,
          children: [
            {
              id: uid('btn_sub'),
              type: 'ref',
              ref: 'DQZzq',
              name: 'Button · Submit',
              width: 85,
              height: 32,
              inputs: {
                type: 'primary',
                children: 'Submit'
              }
            },
            {
              id: uid('btn_reset'),
              type: 'ref',
              ref: 'DQZzq',
              name: 'Button · reset',
              width: 85,
              height: 32,
              inputs: {
                type: 'default',
                children: 'reset'
              }
            }
          ]
        }
      ]
    })
  ];
}
