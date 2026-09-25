import fs from 'node:fs';

const penPath = './libraries/antd-6.lib.pen';
const pen = JSON.parse(fs.readFileSync(penPath, 'utf8'));

function findNode(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const c of node.children) {
      const res = findNode(c, id);
      if (res) return res;
    }
  }
  return null;
}

let idCounter = 1000;
function uid(prefix = 'vs') {
  return `${prefix}_${(idCounter++).toString(36)}`;
}

// 辅助构建 Form.Item
function makeFormItem({ id, label, controlChildren, gap = 0, labelAlignTop = false }) {
  const item = {
    id: id || uid('fi'),
    type: 'ref',
    ref: 'npYpT',
    name: `Form.Item · ${label}`,
    width: 600,
    gap: gap,
    descendants: {
      FlQ2c: {
        width: 150,
        height: 32,
        justifyContent: 'end',
        alignItems: labelAlignTop ? 'start' : 'center',
        padding: labelAlignTop ? [5, 8, 0, 0] : [0, 8, 0, 0],
      },
      qOWm2: {
        enabled: false,
      },
      O1MFk: {
        content: `${label}:`,
      },
      CVtG8: {
        width: 'fill_container',
        children: controlChildren,
      },
    },
  };
  return item;
}

// 辅助构建带 help 提示文案的表单控件
function withHelp(control, helpText, helpColor = '#ff4d4f') {
  return [
    {
      type: 'frame',
      id: uid('fhelp'),
      name: 'Item with Help',
      width: 'fill_container',
      layout: 'vertical',
      gap: 4,
      children: [
        control,
        {
          type: 'text',
          id: uid('txt'),
          name: 'Help Text',
          fill: helpColor,
          content: helpText,
          fontFamily: 'Inter',
          fontSize: 12,
          fontWeight: 'normal',
        },
      ],
    },
  ];
}

// 按照官方 validate-static.tsx 的 22 个表单项顺序构建：
const items = [
  // 1. Fail: validateStatus="error", help="Should be combination of numbers & alphabets"
  makeFormItem({
    id: 'n7vND7',
    label: 'Fail',
    controlChildren: withHelp(
      {
        id: 'l3rBE',
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'unavailable choice',
          value: '',
          status: 'error',
        },
      },
      'Should be combination of numbers & alphabets',
      '#ff4d4f'
    ),
  }),

  // 2. Warning: validateStatus="warning", prefix=<SmileOutlined />
  makeFormItem({
    id: 'rUD7c',
    label: 'Warning',
    controlChildren: [
      {
        id: 'onzTm',
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'Warning',
          value: '',
          status: 'warning',
          prefixIcon: 'SmileOutlined',
        },
      },
    ],
  }),

  // 3. Validating: hasFeedback, validateStatus="validating", help="The information is being validated..."
  makeFormItem({
    id: 'U2zA0X',
    label: 'Validating',
    controlChildren: withHelp(
      {
        id: 'iqoss',
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: "I'm the content is being validated",
          value: '',
          hasFeedback: true,
          feedbackStatus: 'validating',
        },
      },
      'The information is being validated...',
      '#00000073'
    ),
  }),

  // 4. Success: hasFeedback, validateStatus="success"
  makeFormItem({
    id: 'qwC1q',
    label: 'Success',
    controlChildren: [
      {
        id: 'i73Q1f',
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: "I'm the content",
          value: '',
          hasFeedback: true,
          feedbackStatus: 'success',
        },
      },
    ],
  }),

  // 5. Warning: hasFeedback, validateStatus="warning"
  makeFormItem({
    id: uid('fi_warn2'),
    label: 'Warning',
    controlChildren: [
      {
        id: uid('inp_warn2'),
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'Warning',
          value: '',
          status: 'warning',
          hasFeedback: true,
          feedbackStatus: 'warning',
        },
      },
    ],
  }),

  // 6. Fail: hasFeedback, validateStatus="error", help="Should be combination of numbers & alphabets"
  makeFormItem({
    id: uid('fi_err2'),
    label: 'Fail',
    controlChildren: withHelp(
      {
        id: uid('inp_err2'),
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'unavailable choice',
          value: '',
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
      'Should be combination of numbers & alphabets',
      '#ff4d4f'
    ),
  }),

  // 7. Success: hasFeedback, validateStatus="success" -> DatePicker
  makeFormItem({
    id: 'O2hdxV',
    label: 'Success',
    controlChildren: [
      {
        id: 'yvjXe',
        type: 'ref',
        ref: 'jCYiD',
        name: 'DatePicker',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'Select date',
          value: '',
          hasFeedback: true,
          feedbackStatus: 'success',
        },
      },
    ],
  }),

  // 8. Warning: hasFeedback, validateStatus="warning" -> TimePicker
  makeFormItem({
    id: 'g8zzb3',
    label: 'Warning',
    controlChildren: [
      {
        id: 'xJkdM',
        type: 'ref',
        ref: 'GPix8',
        name: 'TimePicker',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'Select time',
          value: '',
          status: 'warning',
          hasFeedback: true,
          feedbackStatus: 'warning',
        },
      },
    ],
  }),

  // 9. Error: hasFeedback, validateStatus="error" -> DatePicker.RangePicker
  makeFormItem({
    id: 'rhZ4O',
    label: 'Error',
    controlChildren: [
      {
        id: 'O7CoSI',
        type: 'ref',
        ref: 'QmZCd',
        name: 'RangePicker',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'Start date',
          endPlaceholder: 'End date',
          value: '',
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
    ],
  }),

  // 10. Error: hasFeedback, validateStatus="error" -> Select
  makeFormItem({
    id: 'zGk47',
    label: 'Error',
    controlChildren: [
      {
        id: 'Z0rT5',
        type: 'ref',
        ref: 'VoQE7',
        name: 'Select',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: "I'm Select",
          value: 'Option 1',
          allowClear: true,
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
    ],
  }),

  // 11. Validating: hasFeedback, validateStatus="error", help="Something breaks the rule." -> Cascader
  makeFormItem({
    id: uid('fi_cascader'),
    label: 'Validating',
    controlChildren: withHelp(
      {
        id: uid('cascader'),
        type: 'ref',
        ref: 'F9Vfg',
        name: 'Cascader',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: "I'm Cascader",
          value: '',
          allowClear: true,
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
      'Something breaks the rule.',
      '#ff4d4f'
    ),
  }),

  // 12. Warning: hasFeedback, validateStatus="warning", help="Need to be checked" -> TreeSelect
  makeFormItem({
    id: uid('fi_treeselect'),
    label: 'Warning',
    controlChildren: withHelp(
      {
        id: uid('treeselect'),
        type: 'ref',
        ref: 'evXTy',
        name: 'TreeSelect',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: "I'm TreeSelect",
          value: '',
          allowClear: true,
          status: 'warning',
          hasFeedback: true,
          feedbackStatus: 'warning',
        },
      },
      'Need to be checked',
      '#faad14'
    ),
  }),

  // 13. inline: Form.Item with 2 DatePickers and hyphen
  makeFormItem({
    id: uid('fi_inline'),
    label: 'inline',
    controlChildren: [
      {
        type: 'frame',
        id: uid('inline_row'),
        name: 'Inline Row',
        width: 'fill_container',
        layout: 'horizontal',
        gap: 0,
        alignItems: 'start',
        children: [
          {
            type: 'frame',
            id: uid('left_dp_col'),
            name: 'Left DatePicker Col',
            width: 'fill_container',
            layout: 'vertical',
            gap: 4,
            children: [
              {
                id: uid('inline_dp_left'),
                type: 'ref',
                ref: 'jCYiD',
                name: 'DatePicker',
                width: 'fill_container',
                height: 32,
                inputs: {
                  placeholder: 'Select date',
                  status: 'error',
                },
              },
              {
                type: 'text',
                id: uid('inline_help'),
                name: 'Help Text',
                fill: '#ff4d4f',
                content: 'Please select right date',
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: 'normal',
              },
            ],
          },
          {
            type: 'text',
            id: uid('inline_hyphen'),
            name: 'Hyphen',
            width: 24,
            height: 32,
            textAlign: 'center',
            textAlignVertical: 'middle',
            textGrowth: 'fixed-width-height',
            fill: '#00000073',
            content: '-',
            fontFamily: 'Inter',
            fontSize: 14,
          },
          {
            id: uid('inline_dp_right'),
            type: 'ref',
            ref: 'jCYiD',
            name: 'DatePicker',
            width: 'fill_container',
            height: 32,
            inputs: {
              placeholder: 'Select date',
            },
          },
        ],
      },
    ],
  }),

  // 14. Success: hasFeedback, validateStatus="success" -> InputNumber
  makeFormItem({
    id: 'tLxYX',
    label: 'Success',
    controlChildren: [
      {
        id: 'YGjnr',
        type: 'ref',
        ref: 'SiWnx',
        name: 'InputNumber',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: '',
          value: '',
          hasFeedback: true,
          feedbackStatus: 'success',
        },
      },
    ],
  }),

  // 15. Success: hasFeedback, validateStatus="success" -> Input allowClear
  makeFormItem({
    id: uid('fi_allowclear'),
    label: 'Success',
    controlChildren: [
      {
        id: uid('inp_allowclear'),
        type: 'ref',
        ref: 'iQ5uU',
        name: 'Input',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'with allowClear',
          value: '',
          allowClear: true,
          hasFeedback: true,
          feedbackStatus: 'success',
        },
      },
    ],
  }),

  // 16. Warning: hasFeedback, validateStatus="warning" -> Input.Password
  makeFormItem({
    id: uid('fi_pwd_warn'),
    label: 'Warning',
    controlChildren: [
      {
        id: uid('pwd_warn'),
        type: 'ref',
        ref: 'C8cDZ',
        name: 'Input.Password',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'with input password',
          value: '',
          status: 'warning',
          hasFeedback: true,
          feedbackStatus: 'warning',
        },
      },
    ],
  }),

  // 17. Error: hasFeedback, validateStatus="error" -> Input.Password allowClear
  makeFormItem({
    id: uid('fi_pwd_err'),
    label: 'Error',
    controlChildren: [
      {
        id: uid('pwd_err'),
        type: 'ref',
        ref: 'C8cDZ',
        name: 'Input.Password',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: 'with input password and allowClear',
          value: '',
          allowClear: true,
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
    ],
  }),

  // 18. Success: hasFeedback, validateStatus="success" -> Input.OTP
  makeFormItem({
    id: uid('fi_otp_suc'),
    label: 'Success',
    controlChildren: [
      {
        id: uid('otp_suc'),
        type: 'ref',
        ref: 'QmpsX',
        name: 'Input.OTP',
        width: 'fill_container',
        height: 32,
        inputs: {
          length: 6,
          value: '',
          hasFeedback: true,
          feedbackStatus: 'success',
        },
      },
    ],
  }),

  // 19. Warning: hasFeedback, validateStatus="warning" -> Input.OTP
  makeFormItem({
    id: uid('fi_otp_warn'),
    label: 'Warning',
    controlChildren: [
      {
        id: uid('otp_warn'),
        type: 'ref',
        ref: 'QmpsX',
        name: 'Input.OTP',
        width: 'fill_container',
        height: 32,
        inputs: {
          length: 6,
          value: '',
          status: 'warning',
          hasFeedback: true,
          feedbackStatus: 'warning',
        },
      },
    ],
  }),

  // 20. Error: hasFeedback, validateStatus="error" -> Input.OTP
  makeFormItem({
    id: uid('fi_otp_err'),
    label: 'Error',
    controlChildren: [
      {
        id: uid('otp_err'),
        type: 'ref',
        ref: 'QmpsX',
        name: 'Input.OTP',
        width: 'fill_container',
        height: 32,
        inputs: {
          length: 6,
          value: '',
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
    ],
  }),

  // 21. Fail: validateStatus="error", hasFeedback -> Mentions
  makeFormItem({
    id: uid('fi_mentions'),
    label: 'Fail',
    controlChildren: [
      {
        id: uid('mentions'),
        type: 'ref',
        ref: 'VIOgT',
        name: 'Mentions',
        width: 'fill_container',
        height: 32,
        inputs: {
          placeholder: '',
          value: '',
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
    ],
  }),

  // 22. Fail: validateStatus="error", hasFeedback, help="Should have something" -> Input.TextArea
  makeFormItem({
    id: uid('fi_textarea'),
    label: 'Fail',
    labelAlignTop: true,
    controlChildren: withHelp(
      {
        id: uid('textarea'),
        type: 'ref',
        ref: 'jSd6E',
        name: 'Input.TextArea',
        width: 'fill_container',
        height: 98,
        inputs: {
          placeholder: '',
          value: '',
          rows: 4,
          allowClear: true,
          showCount: true,
          status: 'error',
          hasFeedback: true,
          feedbackStatus: 'error',
        },
      },
      'Should have something',
      '#ff4d4f'
    ),
  }),
];

// 写入 pen 文件
const vhNode = findNode(pen, 'VhVgS');
if (!vhNode) {
  console.error('VhVgS not found');
  process.exit(1);
}

const formNode = vhNode.children[0].children[0];
formNode.descendants.tSaDV.children = items;

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2), 'utf8');
console.log(`Successfully rebuilt VhVgS with all ${items.length} official items!`);
