export const dataEntryComponents = [
  'AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form',
  'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider',
  'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload',
];

export const componentDefaults = {
  AutoComplete: { placeholder: 'input here', value: '', options: 'Ant Design|AntV|Ant Design Pro' },
  Cascader: { placeholder: 'Please select', value: '' },
  Checkbox: { children: 'Checkbox', checked: false },
  ColorPicker: { value: '#1677ff', showText: true },
  DatePicker: { placeholder: 'Select date', value: '' },
  Form: { fields: 'Username|Password' },
  Input: { placeholder: 'Basic usage', value: '', allowClear: false },
  InputNumber: { value: 3, min: 0, max: 100 },
  Mentions: { placeholder: 'Input @ to mention people', value: '' },
  Radio: { label: 'Radio', checked: false },
  Rate: { value: 4, count: 5 },
  Select: { placeholder: 'Select a person', value: '', options: 'Jack|Lucy|Tom' },
  Slider: { value: 40, min: 0, max: 100 },
  Switch: { label: '', checked: true },
  TimePicker: { placeholder: 'Select time', value: '' },
  Transfer: { titles: 'Source|Target', showSearch: false },
  TreeSelect: { placeholder: 'Please select', value: '' },
  Upload: { label: 'Click to Upload' },
};

export const componentSizes = {
  AutoComplete: [240, 32], Cascader: [240, 32], Checkbox: [160, 32],
  ColorPicker: [160, 32], DatePicker: [240, 32], Form: [360, 132],
  Input: [320, 32], InputNumber: [160, 32], Mentions: [320, 72],
  Radio: [140, 32], Rate: [140, 32], Select: [240, 32], Slider: [320, 32],
  Switch: [80, 32], TimePicker: [240, 32], Transfer: [520, 220],
  TreeSelect: [240, 32], Upload: [320, 160],
};

export const componentVariants = {
  AutoComplete: [['Basic', {}], ['Open', { open: true }], ['Disabled', { disabled: true }], ['Error', { status: 'error' }], ['Filled', { variant: 'filled' }]],
  Cascader: [['Basic', {}], ['Selected', { value: 'Zhejiang / Hangzhou / West Lake' }], ['Open', { open: true }], ['Disabled', { disabled: true }], ['Error', { status: 'error' }]],
  Checkbox: [['Unchecked', {}], ['Checked', { checked: true }], ['Indeterminate', { indeterminate: true }], ['Disabled', { disabled: true }]],
  ColorPicker: [['Default', {}], ['Text', { showText: true }], ['Small', { size: 'small' }], ['Large', { size: 'large' }], ['Disabled', { disabled: true }]],
  DatePicker: [['Date', {}], ['Selected', { value: '2026-09-18' }], ['Open', { open: true }], ['Month', { picker: 'month' }], ['Disabled', { disabled: true }]],
  Form: [['Basic', {}], ['Horizontal', { layout: 'horizontal' }], ['Required', { required: true }], ['Error', { status: 'error' }]],
  Input: [['Basic', {}], ['Value', { value: 'Ant Design' }], ['Prefix and suffix', { prefix: '¥', suffix: 'RMB' }], ['Filled', { variant: 'filled' }], ['Disabled', { disabled: true }], ['Error', { status: 'error' }]],
  InputNumber: [['Basic', {}], ['Small', { size: 'small' }], ['Large', { size: 'large' }], ['Spinner', { mode: 'spinner' }], ['Disabled', { disabled: true }], ['Error', { status: 'error' }]],
  Mentions: [['Basic', {}], ['Value', { value: '@afc163 hello' }], ['Disabled', { disabled: true }], ['Error', { status: 'error' }]],
  Radio: [['Unchecked', {}], ['Checked', { checked: true }], ['Disabled', { disabled: true }]],
  Rate: [['Basic', {}], ['Half', { value: 3.5, allowHalf: true }], ['Disabled', { disabled: true }]],
  Select: [['Basic', {}], ['Selected', { value: 'Lucy' }], ['Open', { open: true }], ['Multiple', { mode: 'multiple', value: 'Lucy' }], ['Disabled', { disabled: true }], ['Error', { status: 'error' }]],
  Slider: [['Basic', {}], ['Range', { range: true }], ['Marks', { marks: true }], ['Disabled', { disabled: true }]],
  Switch: [['Checked', {}], ['Unchecked', { checked: false }], ['Small', { size: 'small' }], ['Loading', { loading: true }], ['Disabled', { disabled: true }]],
  TimePicker: [['Basic', {}], ['Selected', { value: '12:30:00' }], ['Open', { open: true }], ['12 hour', { use12Hours: true }], ['Disabled', { disabled: true }]],
  Transfer: [['Basic', {}], ['Search', { showSearch: true }], ['One way', { oneWay: true }], ['Disabled', { disabled: true }]],
  TreeSelect: [['Basic', {}], ['Selected', { value: 'Node 1' }], ['Open', { open: true }], ['Multiple', { multiple: true }], ['Disabled', { disabled: true }]],
  Upload: [['Button', { mode: 'button' }], ['Drag and drop', { mode: 'dragger' }], ['Picture card', { mode: 'picture-card' }], ['Disabled', { disabled: true }]],
};

export const slugFor = (name) => name.toLowerCase();
