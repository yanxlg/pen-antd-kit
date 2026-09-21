import { mkdir, writeFile, readFile } from 'node:fs/promises';

const inspectorPath = new URL('../registry/inspector.antd-6.6.4.json', import.meta.url);
const inspector = JSON.parse(await readFile(inspectorPath, 'utf8'));

const components = Object.keys(inspector.components);

const htmlAndTechnicalProps = new Set([
  'about', 'accessKey', 'autoCapitalize', 'autoComplete', 'autoCorrect', 'autoFocus',
  'autoSave', 'contentEditable', 'contextMenu', 'datatype',
  'defaultChecked', 'defaultValue', 'dir', 'draggable', 'enterKeyHint', 'exportparts',
  'hidden', 'id', 'inlist', 'inputMode', 'is', 'itemID', 'itemProp', 'itemRef',
  'itemScope', 'itemType', 'lang', 'nonce', 'part',
  'property', 'radioGroup', 'rel', 'resource', 'results', 'rev', 'role',
  'security', 'slot', 'spellCheck', 'style', 'suppressContentEditableWarning',
  'suppressHydrationWarning', 'tabIndex', 'title', 'translate', 'typeof', 'vocab',
  'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget',
  'media', 'ping', 'hrefLang', 'referrerPolicy', 'target', 'download',
  'capture', 'accept', 'alt', 'coords', 'useMap', 'cols', 'rows', 'wrap',
  'pattern', 'readOnly', 'required', 'step',
  'allowFullScreen', 'allowTransparency', 'frameBorder', 'marginHeight',
  'marginWidth', 'scrolling', 'seamless', 'srcDoc', 'crossOrigin', 'decoding',
  'optimum', 'high', 'low', 'reversed', 'start', 'span', 'cite', 'dateTime',
  '_skipSemantic', 'dangerouslySetInnerHTML', 'unselectable', 'popover',
  'popoverTarget', 'popoverTargetAction', 'key', 'ref', 'children',
  'className', 'rootClassName', 'prefixCls', 'styles', 'classNames', 'hashId',
  'iconPrefixCls', 'componentCls', 'antCls', 'motion', 'getPopupContainer',
  'getContainer', 'popupClassName', 'dropdownClassName', 'scrollNumberPrefixCls',
  'dropdownMatchSelectWidth', 'popupMatchSelectWidth', 'content'
]);

function getInputs(name, comp) {
  const inputs = [];
  const added = new Set();

  const addInput = (propName, type, def) => {
    if (!added.has(propName)) {
      inputs.push({ name: propName, type, def });
      added.add(propName);
    }
  };

  // 1. High-priority component-specific design properties
  const componentDesignProps = {
    Divider: [
      { name: 'label', type: 'string', def: '"分割线"' },
      { name: 'orientation', type: 'enum("center", "left", "right")', def: '"center"' },
      { name: 'dashed', type: 'boolean', def: 'false' },
      { name: 'type', type: 'enum("horizontal", "vertical")', def: '"horizontal"' },
    ],
    Flex: [
      { name: 'justify', type: 'enum("normal", "flex-start", "center", "flex-end", "space-between", "space-around")', def: '"space-between"' },
      { name: 'align', type: 'enum("normal", "flex-start", "center", "flex-end", "baseline")', def: '"center"' },
      { name: 'gap', type: 'enum("small", "middle", "large")', def: '"middle"' },
    ],
    Space: [
      { name: 'direction', type: 'enum("horizontal", "vertical")', def: '"horizontal"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'align', type: 'enum("start", "end", "center", "baseline")', def: '"center"' },
      { name: 'wrap', type: 'boolean', def: 'false' },
    ],
    Splitter: [
      { name: 'layout', type: 'enum("horizontal", "vertical")', def: '"horizontal"' },
    ],
    Input: [
      { name: 'placeholder', type: 'string', def: '"请输入内容"' },
      { name: 'value', type: 'string', def: '""' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'variant', type: 'enum("outlined", "filled", "borderless")', def: '"outlined"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'allowClear', type: 'boolean', def: 'true' },
      { name: 'prefix', type: 'string', def: '""' },
      { name: 'suffix', type: 'string', def: '""' },
      { name: 'multiline', type: 'boolean', def: 'false' },
      { name: 'search', type: 'boolean', def: 'false' },
      { name: 'password', type: 'boolean', def: 'false' },
      { name: 'otp', type: 'boolean', def: 'false' },
    ],
    'Input.Search': [
      { name: 'placeholder', type: 'string', def: '""' },
      { name: 'value', type: 'string', def: '""' },
      { name: 'allowClear', type: 'boolean', def: 'false' },
      { name: 'search', type: 'boolean', def: 'false' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'variant', type: 'enum("outlined", "filled", "borderless", "underlined")', def: '"outlined"' },
    ],
    InputNumber: [
      { name: 'value', type: 'number', def: '3' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'min', type: 'number', def: '0' },
      { name: 'max', type: 'number', def: '100' },
      { name: 'controls', type: 'boolean', def: 'true' },
      { name: 'mode', type: 'enum("input", "spinner")', def: '"input"' },
      { name: 'prefix', type: 'string', def: '""' },
      { name: 'suffix', type: 'string', def: '""' },
      { name: 'placeholder', type: 'string', def: '""' },
      { name: 'variant', type: 'enum("outlined", "filled", "borderless", "underlined")', def: '"outlined"' },
    ],
    Select: [
      { name: 'placeholder', type: 'string', def: '"请选择"' },
      { name: 'value', type: 'string', def: '""' },
      { name: 'options', type: 'string', def: '"杭州|上海|北京|深圳"' },
      { name: 'mode', type: 'enum("default", "multiple", "tags")', def: '"default"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'open', type: 'boolean', def: 'false' },
      { name: 'allowClear', type: 'boolean', def: 'true' },
    ],
    Cascader: [
      { name: 'placeholder', type: 'string', def: '"请选择地区"' },
      { name: 'value', type: 'string', def: '"浙江 / 杭州 / 西湖"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'open', type: 'boolean', def: 'false' },
      { name: 'multiple', type: 'boolean', def: 'false' },
      { name: 'multiple', type: 'boolean', def: 'false' },
      { name: 'allowClear', type: 'boolean', def: 'true' },
    ],
    TreeSelect: [
      { name: 'placeholder', type: 'string', def: '"请选择分类"' },
      { name: 'value', type: 'string', def: '"技术研发部"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'open', type: 'boolean', def: 'false' },
    ],
    AutoComplete: [
      { name: 'placeholder', type: 'string', def: '"输入搜索关键词"' },
      { name: 'value', type: 'string', def: '""' },
      { name: 'options', type: 'string', def: '"Ant Design|AntV|Ant Design Pro"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'open', type: 'boolean', def: 'false' },
    ],
    Mentions: [
      { name: 'placeholder', type: 'string', def: '"使用 @ 提及他人"' },
      { name: 'value', type: 'string', def: '"@张三 "' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'open', type: 'boolean', def: 'false' },
    ],
    Checkbox: [
      { name: 'children', type: 'string', def: '"记住账号"' },
      { name: 'checked', type: 'boolean', def: 'true' },
      { name: 'indeterminate', type: 'boolean', def: 'false' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'value', type: 'string', def: '""' },
    ],
    Radio: [
      { name: 'label', type: 'string', def: '"选项一"' },
      { name: 'checked', type: 'boolean', def: 'true' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'group', type: 'boolean', def: 'false' },
      { name: 'button', type: 'boolean', def: 'false' },
    ],
    Switch: [
      { name: 'label', type: 'string', def: '"开启通知"' },
      { name: 'checked', type: 'boolean', def: 'true' },
      { name: 'size', type: 'enum("default", "small")', def: '"default"' },
      { name: 'loading', type: 'boolean', def: 'false' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Slider: [
      { name: 'value', type: 'number', def: '40' },
      { name: 'min', type: 'number', def: '0' },
      { name: 'max', type: 'number', def: '100' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Rate: [
      { name: 'value', type: 'number', def: '4' },
      { name: 'count', type: 'number', def: '5' },
      { name: 'allowHalf', type: 'boolean', def: 'false' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    ColorPicker: [
      { name: 'value', type: 'string', def: '"#1677FF"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'showText', type: 'boolean', def: 'true' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    DatePicker: [
      { name: 'placeholder', type: 'string', def: '"请选择日期"' },
      { name: 'value', type: 'string', def: '"2026-09-16"' },
      { name: 'picker', type: 'enum("date", "week", "month", "quarter", "year")', def: '"date"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'open', type: 'boolean', def: 'false' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'range', type: 'boolean', def: 'false' },
    ],
    TimePicker: [
      { name: 'placeholder', type: 'string', def: '"请选择时间"' },
      { name: 'value', type: 'string', def: '"12:30:00"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'status', type: 'enum("default", "error", "warning")', def: '"default"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
      { name: 'open', type: 'boolean', def: 'false' },
      { name: 'range', type: 'boolean', def: 'false' },
      { name: 'use12Hours', type: 'boolean', def: 'false' },
    ],
    Transfer: [
      { name: 'titles', type: 'string', def: '"可选项|已选项"' },
      { name: 'showSearch', type: 'boolean', def: 'true' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Upload: [
      { name: 'mode', type: 'enum("button", "dragger", "picture-card")', def: '"button"' },
      { name: 'label', type: 'string', def: '"点击或拖拽文件到此区域上传"' },
      { name: 'type', type: 'enum("select", "drag")', def: '"drag"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Form: [
      { name: 'layout', type: 'enum("vertical", "horizontal", "inline")', def: '"vertical"' },
      { name: 'fields', type: 'string', def: '"用户名|密码|电子邮箱"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Avatar: [
      { name: 'text', type: 'string', def: '"A"' },
      { name: 'shape', type: 'enum("circle", "square")', def: '"circle"' },
      { name: 'size', type: 'enum("small", "default", "large")', def: '"default"' },
      { name: 'color', type: 'enum("blue", "gray", "green", "purple")', def: '"blue"' },
    ],
    Tag: [
      { name: 'label', type: 'string', def: '"Ant Design"' },
      { name: 'color', type: 'enum("default", "processing", "success", "warning", "error", "magenta", "orange")', def: '"processing"' },
      { name: 'bordered', type: 'boolean', def: 'true' },
      { name: 'closable', type: 'boolean', def: 'true' },
    ],
    Table: [
      { name: 'columns', type: 'string', def: '"姓名|状态|角色|操作"' },
      { name: 'rows', type: 'string', def: '"张三,正常,系统管理员,编辑|李四,已停用,只读用户,启用|王五,审核中,开发者,查看"' },
      { name: 'bordered', type: 'boolean', def: 'true' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'loading', type: 'boolean', def: 'false' },
      { name: 'pagination', type: 'boolean', def: 'true' },
    ],
    Card: [
      { name: 'title', type: 'string', def: '"数据卡片标题"' },
      { name: 'extra', type: 'string', def: '"查看详情"' },
      { name: 'bordered', type: 'boolean', def: 'true' },
      { name: 'size', type: 'enum("default", "small")', def: '"default"' },
    ],
    Segmented: [
      { name: 'options', type: 'string', def: '"日视图|周视图|月视图|年视图"' },
      { name: 'value', type: 'string', def: '"周视图"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Statistic: [
      { name: 'title', type: 'string', def: '"总成交金额 (元)"' },
      { name: 'value', type: 'string', def: '"1,828,490.50"' },
      { name: 'prefix', type: 'string', def: '"¥ "' },
      { name: 'suffix', type: 'string', def: '""' },
      { name: 'trend', type: 'enum("none", "up", "down")', def: '"up"' },
    ],
    Timeline: [
      { name: 'items', type: 'string', def: '"创建服务 08:30|初步技术方案评审 10:15|网络打通完成 14:00|正式上线运营 16:30"' },
      { name: 'mode', type: 'enum("left", "alternate", "right")', def: '"left"' },
    ],
    Tree: [
      { name: 'items', type: 'string', def: '"平台根节点|├── 核心服务集群|│   ├── 用户中台|│   └── 支付网关|└── 边缘计算节点"' },
      { name: 'showLine', type: 'boolean', def: 'true' },
    ],
    Descriptions: [
      { name: 'title', type: 'string', def: '"用户详细资料"' },
      { name: 'items', type: 'string', def: '"用户姓名:张三|联系电话:188-8888-8888|电子邮箱:zhangsan@example.com|认证状态:已完成实名认证"' },
      { name: 'bordered', type: 'boolean', def: 'true' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"small"' },
    ],
    Alert: [
      { name: 'type', type: 'enum("info", "success", "warning", "error")', def: '"info"' },
      { name: 'message', type: 'string', def: '"系统安全提醒"' },
      { name: 'description', type: 'string', def: '"检测到您的登录凭证即将过期，请及时在个人中心完成身份校验。"' },
      { name: 'showIcon', type: 'boolean', def: 'true' },
      { name: 'closable', type: 'boolean', def: 'true' },
      { name: 'banner', type: 'boolean', def: 'false' },
    ],
    Modal: [
      { name: 'title', type: 'string', def: '"操作确认"' },
      { name: 'content', type: 'string', def: '"确定要将选中的 5 项资源批量归档到历史数据存储池吗？此操作不可逆。"' },
      { name: 'open', type: 'boolean', def: 'true' },
      { name: 'width', type: 'number', def: '520' },
      { name: 'centered', type: 'boolean', def: 'true' },
    ],
    Drawer: [
      { name: 'title', type: 'string', def: '"侧边抽屉面板"' },
      { name: 'open', type: 'boolean', def: 'true' },
      { name: 'placement', type: 'enum("right", "left", "top", "bottom")', def: '"right"' },
      { name: 'width', type: 'number', def: '380' },
    ],
    Progress: [
      { name: 'percent', type: 'number', def: '75' },
      { name: 'type', type: 'enum("line", "circle")', def: '"line"' },
      { name: 'status', type: 'enum("normal", "success", "exception", "active")', def: '"active"' },
      { name: 'size', type: 'enum("default", "small")', def: '"default"' },
    ],
    Result: [
      { name: 'status', type: 'enum("success", "error", "info", "warning", "404", "500")', def: '"success"' },
      { name: 'title', type: 'string', def: '"业务提交成功"' },
      { name: 'subTitle', type: 'string', def: '"系统已生成订单 202609160012，可在控制台中查看执行进度。"' },
    ],
    Steps: [
      { name: 'items', type: 'string', def: '"基本信息|配置参数|安全验证|完成交付"' },
      { name: 'current', type: 'number', def: '2' },
      { name: 'direction', type: 'enum("horizontal", "vertical")', def: '"horizontal"' },
      { name: 'status', type: 'enum("wait", "process", "finish", "error")', def: '"process"' },
    ],
    Tabs: [
      { name: 'items', type: 'string', def: '"概览看板|详细配置|访问控制|操作日志"' },
      { name: 'type', type: 'enum("line", "card", "editable-card")', def: '"line"' },
      { name: 'size', type: 'enum("small", "middle", "large")', def: '"middle"' },
      { name: 'tabPosition', type: 'enum("top", "bottom", "left", "right")', def: '"top"' },
    ],
    Menu: [
      { name: 'items', type: 'string', def: '"仪表盘|数据中心|权限管理|安全设置"' },
      { name: 'mode', type: 'enum("inline", "horizontal", "vertical")', def: '"inline"' },
      { name: 'theme', type: 'enum("light", "dark")', def: '"light"' },
    ],
    Pagination: [
      { name: 'current', type: 'number', def: '2' },
      { name: 'total', type: 'number', def: '85' },
      { name: 'pageSize', type: 'number', def: '10' },
      { name: 'simple', type: 'boolean', def: 'false' },
      { name: 'disabled', type: 'boolean', def: 'false' },
    ],
    Breadcrumb: [
      { name: 'items', type: 'string', def: '"首页/运营管理/权限策略/自定义规则"' },
      { name: 'separator', type: 'string', def: '"/"' },
    ],
    Dropdown: [
      { name: 'label', type: 'string', def: '"操作菜单"' },
      { name: 'items', type: 'string', def: '"编辑资料|修改权限|退出登录"' },
      { name: 'open', type: 'boolean', def: 'false' },
    ],
    Popconfirm: [
      { name: 'title', type: 'string', def: '"确认删除此项数据吗？"' },
      { name: 'open', type: 'boolean', def: 'false' },
    ],
    Tooltip: [
      { name: 'title', type: 'string', def: '"提示信息内容"' },
      { name: 'placement', type: 'enum("top", "bottom", "left", "right")', def: '"top"' },
    ],
    Popover: [
      { name: 'title', type: 'string', def: '"浮层卡片标题"' },
      { name: 'content', type: 'string', def: '"这里是浮层内部承载的详细内容"' },
      { name: 'open', type: 'boolean', def: 'false' },
    ],
    Tour: [
      { name: 'title', type: 'string', def: '"新功能引导"' },
      { name: 'description', type: 'string', def: '"点击此处可以切换深浅色主题模式与紧凑排版。"' },
      { name: 'current', type: 'number', def: '1' },
      { name: 'total', type: 'number', def: '3' },
    ],
    QRCode: [
      { name: 'value', type: 'string', def: '"https://ant.design"' },
      { name: 'size', type: 'number', def: '100' },
      { name: 'status', type: 'enum("active", "expired", "loading")', def: '"active"' },
    ],
    Empty: [
      { name: 'description', type: 'string', def: '"暂无匹配数据"' },
    ],
    Image: [
      { name: 'width', type: 'number', def: '160' },
      { name: 'height', type: 'number', def: '100' },
    ],
    Spin: [
      { name: 'tip', type: 'string', def: '"加载中..."' },
      { name: 'size', type: 'enum("small", "default", "large")', def: '"default"' },
    ],
    Skeleton: [
      { name: 'active', type: 'boolean', def: 'true' },
      { name: 'avatar', type: 'boolean', def: 'true' },
      { name: 'rows', type: 'number', def: '3' },
    ],
    Watermark: [
      { name: 'content', type: 'string', def: '"Ant Design Confidential"' },
    ],
    Affix: [
      { name: 'offsetTop', type: 'number', def: '20' },
    ],
    BackTop: [
      { name: 'visibilityHeight', type: 'number', def: '400' },
    ],
    BorderBeam: [
      { name: 'children', type: 'ref' },
      { name: 'color', type: 'color', def: '#1677FF' },
      { name: 'count', type: 'number', def: '1' },
      { name: 'duration', type: 'number', def: '6' },
      { name: 'lineWidth', type: 'number', def: '1' },
      { name: 'outset', type: 'number', def: '0' },
      { name: 'size', type: 'number', def: '100' },
    ],
    App: [
      { name: 'message', type: 'string', def: '"上下文消息容器"' },
    ],
  };

  if (componentDesignProps[name]) {
    for (const p of componentDesignProps[name]) addInput(p.name, p.type, p.def);
    if (name === 'Button') return inputs;
  }

  const compactControlNames = new Set([
    'Input', 'InputNumber', 'Select', 'TreeSelect', 'Cascader', 'AutoComplete',
    'DatePicker', 'DatePicker.RangePicker', 'TimePicker', 'TimePicker.RangePicker',
    'ColorPicker',
  ]);
  if (compactControlNames.has(name) || name.startsWith('Input.')) {
    addInput('compactOrientation', 'enum("horizontal", "vertical")', '"horizontal"');
    addInput('compactPlacement', 'enum("none", "start", "middle", "end")', '"none"');
  }

  // 2. Add remaining clean visual props from inspector
  for (const prop of comp.props) {
    if (added.has(prop.name) || htmlAndTechnicalProps.has(prop.name)) continue;
    if (prop.name.startsWith('aria-') || prop.name.startsWith('data-') || prop.name.startsWith('on')) continue;
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop.name)) continue;

    const ctrl = prop.control;
    if (ctrl.type === 'enum' && ctrl.options && ctrl.options.length > 0) {
      const opts = ctrl.options.filter(o => typeof o === 'string' && o.length < 30 && !o.includes('"'));
      if (opts.length > 1) {
        addInput(prop.name, `enum(${opts.map(o => JSON.stringify(o)).join(', ')})`, JSON.stringify(opts[0]));
      }
    } else if (ctrl.type === 'boolean') {
      addInput(prop.name, 'boolean', 'false');
    } else if (ctrl.type === 'number') {
      addInput(prop.name, 'number', '0');
    } else if (ctrl.type === 'string') {
      addInput(prop.name, 'string', '""');
    }
  }

  // 3. Keep the component surface aligned with Ant Design. The primary color
  // is a theme token, not a Button prop, so Button reads the canonical token
  // in its renderer instead of exposing an editor-only control.
  if (name !== 'Button') addInput('primaryColor', 'color', '#1677FF');

  return inputs;
}

const generateHeader = (name, comp) => {
  const inputs = getInputs(name, comp);
  return `/**\n * @schema 2.18\n` + inputs.map(inp => ` * @input ${inp.name}: ${inp.type} = ${inp.def}`).join('\n') + `\n */\n`;
};

const commonEngine = `
const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left") => ({type:"text", content:String(content), x, y, width, height:Math.max(16,fontSize+4), fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align, textAlignVertical:"middle", textGrowth:"fixed-width-height"});
const box = (x, y, width, height, fill="#FFFFFF", radius=6, stroke="#D9D9D9", strokeWidth=1) => ({type:"rectangle", x, y, width, height, cornerRadius:radius, fill, stroke, strokeWidth, strokeAlignment:"inner"});
const circle = (x, y, size, fill="#1677FF", stroke=undefined) => ({type:"ellipse", x, y, width:size, height:size, fill, stroke, strokeWidth:stroke?1:0});
const nodes = [];
const disabled = i.disabled ? "#00000040" : "#000000E0";
const primary = i.danger ? "#FF4D4F" : (i.primaryColor || "#1677FF");
const borderCol = i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";
const bgFill = i.variant === "filled" ? "#00000005" : "#FFFFFF";
const strokeCol = i.variant === "borderless" ? "#00000000" : borderCol;
const compactRadius = (radius=6) => {
  const placement = i.compactPlacement || "none";
  if (placement === "none") return radius;
  if (placement === "middle") return 0;
  if (i.compactOrientation === "vertical") return placement === "start" ? [radius,radius,0,0] : [0,0,radius,radius];
  return placement === "start" ? [radius,0,0,radius] : [0,radius,radius,0];
};
const iconPath = (geometry, viewBox, x, y, size=14, color="#00000040") => ({
  type:"path", x, y, width:size, height:size, viewBox, geometry, fill:color
});
`;

const comprehensiveRenderer = `
switch (__COMPONENT__) {
// ==================== 1. GENERAL (通用) ====================
case "Divider": {
  const isVert = i.type === "vertical";
  if (isVert) {
    nodes.push({type:"rectangle", x:W/2, y:0, width:1, height:H, fill:"#00000015"});
  } else if (i.label) {
    const tw = Math.min(W * 0.4, (i.label.length * 13));
    const leftW = i.orientation === "left" ? 24 : i.orientation === "right" ? W - tw - 24 : (W - tw) / 2;
    nodes.push({type:"rectangle", x:0, y:H/2, width:leftW, height:1, fill:"#00000015"});
    nodes.push(text(i.label, leftW + 8, H/2 - 9, tw - 16, "#00000073", 12));
    nodes.push({type:"rectangle", x:leftW + tw, y:H/2, width:W - (leftW + tw), height:1, fill:"#00000015"});
  } else {
    nodes.push({type:"rectangle", x:0, y:H/2, width:W, height:1, fill:"#00000015"});
  }
  break;
}
case "Flex": case "Space": {
  nodes.push(box(0, 0, W, H, "#FAFAFA", 6, "#F0F0F0"));
  const items = ["Item 1", "Item 2", "Item 3"];
  const isVert = i.direction === "vertical";
  items.forEach((it, n) => {
    const ix = isVert ? 12 : 12 + n * 80;
    const iy = isVert ? 8 + n * 32 : (H-24)/2;
    nodes.push(box(ix, iy, 68, 24, primary, 4, primary));
    nodes.push(text(it, ix + 10, iy + 4, 48, "#FFFFFF", 12));
  });
  break;
}
case "Grid": case "Row": case "Col": {
  nodes.push(box(0, 0, W, H, "#F5F5F5", 6, "#E8E8E8"));
  const spans = [6, 6, 12];
  let curX = 8;
  spans.forEach((sp) => {
    const sw = (W - 28) * sp / 24;
    nodes.push(box(curX, 8, sw, H - 16, "#D6E4FF", 4, primary));
    nodes.push(text("col-" + sp, curX + 8, (H-18)/2, sw - 16, primary, 12, "600"));
    curX += sw + 6;
  });
  break;
}
case "Layout": {
  nodes.push(box(0, 0, W, H, "#F0F2F5", 6, "#D9D9D9"));
  nodes.push(box(0, 0, W, 28, "#001529", 6, "#001529"));
  nodes.push(text("Header", 12, 6, 60, "#FFFFFF", 11));
  nodes.push(box(0, 28, 60, H - 52, "#002140", 0, "#002140"));
  nodes.push(text("Sider", 12, 40, 40, "#FFFFFFBF", 11));
  nodes.push(box(66, 34, W - 72, H - 64, "#FFFFFF", 4, "#E8E8E8"));
  nodes.push(text("Content", 76, 42, 60, "#00000073", 11));
  nodes.push(box(0, H - 24, W, 24, "#F0F2F5", 0, "#E8E8E8"));
  nodes.push(text("Footer ©2026", W/2 - 40, H - 18, 80, "#00000040", 10));
  break;
}
case "Splitter": {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 6, "#D9D9D9"));
  nodes.push(box(0, 0, W * 0.4, H, "#FAFAFA", 0, "#F0F0F0"));
  nodes.push(text("Panel 1 (40%)", 12, H/2 - 8, W*0.4 - 24, "#00000073", 12));
  nodes.push(box(W * 0.4, 0, 4, H, primary, 0, primary));
  nodes.push(text("Panel 2 (60%)", W * 0.4 + 12, H/2 - 8, W*0.6 - 24, "#000000E0", 12));
  break;
}
case "Masonry": {
  nodes.push(box(0, 0, W, H, "#FAFAFA", 6, "#F0F0F0"));
  const colW = (W - 24) / 3;
  [60, 90, 70, 80, 50, 65].forEach((mh, n) => {
    const colIdx = n % 3;
    const rowY = n < 3 ? 8 : 80;
    nodes.push(box(8 + colIdx * (colW + 4), rowY, colW, mh, "#FFFFFF", 4, "#E8E8E8"));
    nodes.push(text("Card " + (n+1), 12 + colIdx * (colW + 4), rowY + 6, colW - 8, "#00000073", 11));
  });
  break;
}

// ==================== 3. DATA ENTRY (数据录入) ====================
case "Input": {
  const fieldW = Math.max(1, pencil.width);
  const fieldH = i.multiline ? H : h;
  if (i.otp) {
    const count=6,gap=8,bw=(fieldW-gap*(count-1))/count;
    for(let n=0;n<count;n++){nodes.push(box(n*(bw+gap),0,bw,h,i.disabled?"#0000000A":bgFill,6,strokeCol));if(i.value)nodes.push(text(String(i.value)[n]||"",n*(bw+gap),7,bw,disabled,14,"normal","center"));}
    return nodes;
  }
  nodes.push(box(0, 0, fieldW, fieldH, i.disabled ? "#0000000A" : bgFill, compactRadius(6), strokeCol));
  let curX = pad;
  if (i.prefix) {
    nodes.push(text(i.prefix, curX, (h-18)/2, 20, "#00000040", 13));
    curX += 20;
  }
  const raw = i.value !== undefined && i.value !== "" ? i.value : (i.placeholder ?? (i.prefix ? "" : "请输入内容"));
  const val = i.password && i.value ? "•".repeat(Math.max(6,String(i.value).length)) : raw;
  const col = i.value ? disabled : "#00000040";
  const center = i.textAlign === "center";
  const suffixSpace=i.search?44:(i.allowClear?32:pad);
  nodes.push(text(val, center ? 0 : curX, i.multiline?10:(h-18)/2, center ? fieldW : fieldW - curX - suffixSpace, col, 14, "normal", center ? "center" : "left"));
  if (i.allowClear && i.value && !i.search) nodes.push(text("✕", fieldW - 24, (h-18)/2, 16, "#00000040", 12));
  if(i.search){nodes.push(box(fieldW-40,0,40,h,primary,[0,6,6,0],primary));nodes.push(text("⌕",fieldW-40,6,40,"#fff",16,"normal","center"));}
  break;
}
case "AutoComplete": {
  nodes.push(box(0,0,W,h,i.disabled?"#0000000A":bgFill,compactRadius(6),strokeCol));
  nodes.push(text(i.value||i.placeholder||"input here",12,(h-18)/2,W-24,i.value?disabled:"#00000040",14));
  if(i.open){const opts=String(i.options||"Ant Design|AntV|Ant Design Pro").split("|");nodes.push(box(0,h+4,W,opts.length*32+8,"#fff",8,"#f0f0f0"));opts.forEach((o,n)=>{if(n===0)nodes.push(box(4,h+8+n*32,W-8,28,"#e6f4ff",4,"#e6f4ff"));nodes.push(text(o,12,h+12+n*32,W-24,n===0?primary:"#000000e0",13));});}
  break;
}
case "Mentions": {
  nodes.push(box(0,0,W,H,i.disabled?"#0000000A":bgFill,6,strokeCol));nodes.push(text(i.value||i.placeholder||"Input @ to mention people",12,10,W-24,i.value?disabled:"#00000040",14));
  if(i.open){nodes.push(box(0,H+4,180,104,"#fff",8,"#f0f0f0"));["afc163","zombieJ","yesmeck"].forEach((o,n)=>nodes.push(text("@"+o,12,H+12+n*30,156,n===0?primary:"#000000e0",13)));}
  break;
}
case "InputNumber": {
  const inputSize=i.size==='small'||i.size==='large'?i.size:'middle';
  const inputH=inputSize==='small'?24:inputSize==='large'?40:32;
  const inputPad=inputSize==='small'?8:12;
  const inputRadius=inputSize==='small'?4:inputSize==='large'?8:6;
  const inputFont=inputSize==='large'?16:14;
  const inputBorder=i.disabled?'#D9D9D9':i.status==='error'?'#FF4D4F':i.status==='warning'?'#FAAD14':'#D9D9D9';
  const inputFill=i.disabled?'#0000000A':i.variant==='filled'?'#00000005':'#FFFFFF';
  const inputStroke=i.variant==='borderless'||i.variant==='filled'?'#00000000':inputBorder;
  nodes.push(box(0,0,W,inputH,inputFill,compactRadius(inputRadius),inputStroke));
  if(i.variant==='underlined')nodes.push({type:'rectangle',x:0,y:inputH-1,width:W,height:1,fill:inputBorder});
  if(i.mode==='spinner'&&!i.disabled){
    const actionW=inputH;
    nodes.push({type:'rectangle',x:actionW,y:0,width:1,height:inputH,fill:'#D9D9D9'});
    nodes.push({type:'rectangle',x:W-actionW-1,y:0,width:1,height:inputH,fill:'#D9D9D9'});
    const val=Number(i.value??0);
    const minDisabled=i.min!==undefined&&i.min!==null&&val<=Number(i.min);
    const maxDisabled=i.max!==undefined&&i.max!==null&&val>=Number(i.max);
    nodes.push(text('−',0,(inputH-(inputFont+4))/2,actionW,minDisabled?'#00000040':'#000000E0',inputFont,'normal','center'));
    nodes.push(text('+',W-actionW,(inputH-(inputFont+4))/2,actionW,maxDisabled?'#00000040':'#000000E0',inputFont,'normal','center'));
    nodes.push(text(String(i.value??i.placeholder??''),actionW,(inputH-(inputFont+4))/2,W-actionW*2,disabled,inputFont,'normal','center'));
  }else{
    let textX=inputPad,textRight=W-inputPad;
    if(i.prefix){nodes.push(text(i.prefix,textX,(inputH-(inputFont+4))/2,20,disabled,inputFont));textX+=24;}
    if(i.suffix){nodes.push(text(i.suffix,W-inputPad-24,(inputH-(inputFont+4))/2,24,disabled,inputFont,'normal','right'));textRight-=28;}
    const raw=i.value!==undefined&&i.value!==null?i.value:i.placeholder;
    nodes.push(text(String(raw??''),textX,(inputH-(inputFont+4))/2,Math.max(1,textRight-textX),raw===''||raw===undefined?'#00000040':disabled,inputFont));
  }
  break;
}
case "Select": case "TreeSelect": case "Cascader": {
  nodes.push(box(0, 0, W, h, i.disabled ? "#0000000A" : bgFill, compactRadius(6), strokeCol));
  if (i.mode === "multiple" || i.mode === "tags" || i.multiple) {
    const tagLabel=String(i.value||i.placeholder||"Zhejiang").split("|")[0];
    const tagWidth=Math.min(W-42,Math.max(56,tagLabel.length*8+30));
    nodes.push(box(4, (h-24)/2, tagWidth, 24, "#F5F5F5", 4, "#D9D9D9"));
    nodes.push(text(tagLabel, 12, (h-18)/2, tagWidth-28, i.disabled?"#00000040":"#000000E0", 14));
    nodes.push(iconPath("M799.86 166.31L857.69 224.15L569.93 512L857.69 799.7L799.86 857.69L512 569.93L224.3 857.69L166.31 799.86L454.07 512L166.31 224.15L224.14 166.31L512 454.07Z",[64,64,896,896],tagWidth-14,(h-10)/2,10,"#00000073"));
  } else {
    const val = i.value || i.placeholder || "请选择";
    nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  }
  nodes.push(iconPath("M884 256H809L512 654.2L215 256H140L486.1 754.8C498.9 772.4 525.1 772.4 537.8 754.8Z",[64,64,896,896],W-24,(h-12)/2,12,"#00000040"));
  if (i.open) {
    const opts = (i.options || "选项一|选项二|选项三").split("|");
    nodes.push({type:"rectangle", x:0, y:h+4, width:W, height:opts.length*32+8, cornerRadius:6, fill:"#FFFFFF", stroke:"#F0F0F0", strokeWidth:1, effect:{type:"shadow",shadowType:"outer",blur:8,offset:{x:0,y:4},color:"#00000015"}});
    opts.forEach((o, n) => {
      const active = n === 0;
      if (active) nodes.push({type:"rectangle", x:4, y:h+8+n*32, width:W-8, height:28, cornerRadius:4, fill:"#E6F4FF"});
      nodes.push(text(o, 12, h+12+n*32, W-24, active ? primary : "#000000E0", 13));
    });
  }
  break;
}
case "DatePicker": {
  nodes.push(box(0, 0, W, h, bgFill, compactRadius(6), strokeCol));
  const val = i.value || i.placeholder || "请选择日期";
  if(i.range){nodes.push(text(val||"Start",pad,(h-18)/2,(W-56)/2,i.value?disabled:"#00000040",14));nodes.push(text("→",W/2-10,(h-18)/2,20,"#00000040",13,"normal","center"));nodes.push(text(i.endValue||"End",W/2+14,(h-18)/2,(W-56)/2,"#00000040",14));}
  else nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  nodes.push(iconPath("M880 184H712V120H640V184H384V120H312V184H144C126.3 184 112 198.3 112 216V880C112 897.7 126.3 912 144 912H880C897.7 912 912 897.7 912 880V216C912 198.3 897.7 184 880 184ZM840 840H184V460H840V840ZM184 392V256H312V304H384V256H640V304H712V256H840V392H184Z",[64,64,896,896],W-26,(h-14)/2,14,"#00000040"));
  if (i.open) {
    const pw = Math.max(W, 260), ph = 200;
    nodes.push({type:"rectangle", x:0, y:h+4, width:pw, height:ph, cornerRadius:8, fill:"#FFFFFF", stroke:"#F0F0F0", strokeWidth:1, effect:{type:"shadow",shadowType:"outer",blur:12,offset:{x:0,y:4},color:"#0000001F"}});
    nodes.push(text("2026年 9月", 16, h+14, pw-32, "#000000E0", 14, "600"));
    for (let d = 1; d <= 21; d++) {
      const col = (d-1)%7, row = Math.floor((d-1)/7);
      const isToday = d === 16;
      const dx = 16 + col*32, dy = h + 42 + row*28;
      if (isToday) nodes.push({type:"rectangle", x:dx, y:dy, width:24, height:24, cornerRadius:4, fill:primary});
      nodes.push(text(String(d), dx+4, dy+3, 20, isToday?"#FFFFFF":"#000000A6", 12));
    }
  }
  break;
}
case "TimePicker": {
  nodes.push(box(0, 0, W, h, bgFill, compactRadius(6), strokeCol));
  const raw=i.value||"", val=raw?(i.use12Hours?raw.replace(/^([0-9]{1,2}):([0-9]{2}).*$/,(_,hh,mm)=>{const h24=Number(hh),h12=h24%12||12;return h12+":"+mm+(h24>=12?" PM":" AM");}):raw):(i.placeholder||"Select time");
  if(i.range){nodes.push(text(val||"Start",pad,(h-18)/2,(W-56)/2,i.value?disabled:"#00000040",14));nodes.push(text("→",W/2-10,(h-18)/2,20,"#00000040",13,"normal","center"));nodes.push(text(i.endValue||"End",W/2+14,(h-18)/2,(W-56)/2,"#00000040",14));}
  else nodes.push(text(val,pad,(h-18)/2,W-32-pad,i.value?disabled:"#00000040",14));
  nodes.push(iconPath("M512 64C264.6 64 64 264.6 64 512S264.6 960 512 960S960 759.4 960 512S759.4 64 512 64ZM512 884C306.6 884 140 717.4 140 512S306.6 140 512 140S884 306.6 884 512S717.4 884 512 884ZM544.1 535.5V288H480V563.4C480 566 481.2 568.4 483.3 569.9L648.7 690.5L688.5 638.8L544.1 535.5Z",[64,64,896,896],W-26,(h-14)/2,14,"#00000040"));
  if (i.open) {
    const pw=Math.max(W,i.use12Hours?260:220),ph=184,cols=i.use12Hours?4:3,colW=pw/cols;
    nodes.push({type:"rectangle",x:0,y:h+4,width:pw,height:ph,cornerRadius:8,fill:"#FFFFFF",stroke:"#F0F0F0",strokeWidth:1,effect:{type:"shadow",shadowType:"outer",blur:12,offset:{x:0,y:4},color:"#0000001F"}});
    const lists=[i.use12Hours?["01","02","03","04","05"]:["00","01","02","03","04"],["00","15","30","45"],["00","15","30","45"]];if(i.use12Hours)lists.push(["AM","PM"]);
    lists.forEach((list,col)=>{if(col>0)nodes.push(box(col*colW,h+4,1,ph,"#F0F0F0",0,"#F0F0F0",0));list.forEach((v,row)=>{const active=row===0;if(active)nodes.push(box(col*colW+4,h+10+row*30,colW-8,26,"#E6F4FF",4,"#E6F4FF",0));nodes.push(text(v,col*colW+12,h+15+row*30,colW-24,active?primary:"#000000E0",12));});});
  }
  break;
}
case "Checkbox": {
  const s = 16;
  const isChecked = !!i.checked, isMixed=!!i.indeterminate, controlY=(pencil.height-s)/2;
  const activeFill=i.disabled?'#F5F5F5':primary,activeMark=i.disabled?'#BFBFBF':'#FFFFFF';
  nodes.push({type:'rectangle',x:0,y:controlY,width:s,height:s,cornerRadius:4,fill:isChecked?activeFill:'#FFFFFF',stroke:i.disabled?'#D9D9D9':isChecked?primary:'#D9D9D9',strokeWidth:1});
  if(isMixed)nodes.push({type:'rectangle',x:4,y:controlY+4,width:8,height:8,cornerRadius:1,fill:i.disabled?'#BFBFBF':primary});
  else if(isChecked)nodes.push({type:'path',x:3,y:controlY+4,width:10,height:8,viewBox:[0,0,10,8],geometry:'M0 3.5 L1.4 2.1 L3.8 4.5 L8.6 0 L10 1.4 L3.8 7.3 Z',fill:activeMark});
  nodes.push(text(i.children||"复选框",s+8,(pencil.height-18)/2,W-s-8,disabled));
  break;
}
case "Radio": {
  if(i.group){["A","B","C"].forEach((label,n)=>{const x=n*72;if(i.button){nodes.push(box(x,0,64,h,n===0?primary:"#fff",n===0?[6,0,0,6]:n===2?[0,6,6,0]:0,n===0?primary:"#d9d9d9"));nodes.push(text(label,x,7,64,n===0?"#fff":"#000000e0",14,"normal","center"));}else{nodes.push({type:"ellipse",x,y:(h-16)/2,width:16,height:16,fill:"#fff",stroke:n===0?primary:"#d9d9d9",strokeWidth:1});if(n===0)nodes.push({type:"ellipse",x:x+4,y:(h-8)/2,width:8,height:8,fill:primary});nodes.push(text(label,x+24,(h-18)/2,40,disabled,14));}});return nodes;}
  const s = 16;
  const isChecked = i.checked;
  nodes.push({type:"ellipse", x:0, y:(h-s)/2, width:s, height:s, fill:"#FFFFFF", stroke:i.disabled?"#00000040":(isChecked?primary:"#D9D9D9"), strokeWidth:1});
  if (isChecked) nodes.push({type:"ellipse", x:4, y:(h-s)/2+4, width:8, height:8, fill:primary});
  nodes.push(text(i.label||"单选框", s+8, (h-18)/2, W-s-8, disabled));
  break;
}
case "Switch": {
  const sw = i.size === "small" ? 28 : 44;
  const sh = i.size === "small" ? 16 : 22;
  const dotS = sh - 4;
  const isChecked = i.checked;
  nodes.push({type:"rectangle", x:0, y:(h-sh)/2, width:sw, height:sh, cornerRadius:sh/2, fill:i.disabled?"#0000001A":(isChecked?primary:"#00000040")});
  nodes.push({type:"ellipse", x:isChecked ? sw - dotS - 2 : 2, y:(h-sh)/2+2, width:dotS, height:dotS, fill:"#FFFFFF"});
  nodes.push(text(i.label||"开关", sw+8, (h-18)/2, W-sw-8, disabled));
  break;
}
case "Slider": {
  nodes.push(box(0, (H-4)/2, W, 4, "#F5F5F5", 2));
  nodes.push(box(0, (H-4)/2, W * 0.4, 4, primary, 2));
  nodes.push(circle(W * 0.4 - 7, (H-14)/2, 14, "#FFFFFF", primary));
  break;
}
case "Rate": {
  const cnt = Math.min(5, Number(i.value) || 4);
  [1, 2, 3, 4, 5].forEach((st, n) => {
    nodes.push(text("★", n * 24, (H-22)/2, 22, n < cnt ? "#FAAD14" : "#E8E8E8", 20));
  });
  break;
}
case "ColorPicker": {
  const controlW=Math.max(1,pencil.width),swatch=h-8,swatchX=4,swatchY=4,swatchRadius=i.size==="small"?2:i.size==="large"?6:4;
  nodes.push(box(0,0,controlW,h,i.disabled?"#0000000A":"#FFFFFF",compactRadius(6),"#D9D9D9"));
  if(i.value) nodes.push(box(swatchX,swatchY,swatch,swatch,i.value,swatchRadius,"#00000000",0));
  else {
    nodes.push(box(swatchX,swatchY,swatch,swatch,"#00000000",swatchRadius,"#0505050F"));
    const inset=2,lineSize=swatch-inset*2;
    nodes.push({type:"path",x:swatchX+inset,y:swatchY+inset,width:lineSize,height:lineSize,viewBox:[0,0,lineSize,lineSize],geometry:`M0 ${lineSize} L${lineSize} 0`,fill:"transparent",stroke:"#F5222D",strokeWidth:2});
  }
  if(i.showText){const value=/^#[0-9a-f]+$/i.test(i.value||"")?i.value.toUpperCase():(i.value||"");nodes.push(text(value,swatchX+swatch+8,(h-18)/2,Math.max(0,controlW-swatchX-swatch-12),i.disabled?"#00000040":"#000000E0",14));}
  break;
}
case "Transfer": {
  const pw = W * 0.44;
  nodes.push(box(0, 0, pw, H, "#FFFFFF", 6, "#D9D9D9"));
  nodes.push(text("待选项 (3)", 8, 8, pw-16, "#000000A6", 12, "600"));
  ["用户 A", "用户 B", "用户 C"].forEach((u, idx) => {
    nodes.push(text("☐ " + u, 8, 36 + idx*26, pw-16, "#000000E0", 12));
  });
  nodes.push(box(W - pw, 0, pw, H, "#FFFFFF", 6, "#D9D9D9"));
  nodes.push(text("已选项 (1)", W - pw + 8, 8, pw-16, "#000000A6", 12, "600"));
  nodes.push(text("☑ 管理员", W - pw + 8, 36, pw-16, "#000000E0", 12));
  nodes.push(text("⇄", W/2 - 10, H/2 - 12, 20, primary, 18, "600"));
  break;
}
case "Upload": {
  if(i.mode==="button"){nodes.push(box(0,0,Math.min(W,132),32,i.disabled?"#0000000a":"#fff",6,"#d9d9d9"));nodes.push(text("⇧",12,7,18,"#000000e0",14));nodes.push(text(i.label||"Click to Upload",34,7,Math.min(W,132)-42,i.disabled?"#00000040":"#000000e0",14));return nodes;}
  if(i.mode==="picture-card"){nodes.push(box(0,0,104,104,"#fafafa",8,"#d9d9d9"));nodes.push(text("+",0,28,104,"#00000073",24,"normal","center"));nodes.push(text("Upload",0,60,104,"#00000073",12,"normal","center"));return nodes;}
  nodes.push(box(0, 0, W, H, "#FAFAFA", 8, "#D9D9D9"));
  nodes.push(text("⇧", 0, H/2 - 34, W, primary, 28,"normal","center"));
  nodes.push(text(i.label || "Click or drag file to this area to upload", 0, H/2 + 8, W, "#000000A6", 12,"normal","center"));
  break;
}
case "Form": {
  const fields = (i.fields || "用户名|密码").split("|");
  fields.forEach((f, idx) => {
    const fy = idx * 56;
    nodes.push(text(f + " *", 0, fy, 80, "#000000D9", 13));
    nodes.push(box(0, fy + 22, W, 32, "#FFFFFF", 6, "#D9D9D9"));
    nodes.push(text("请输入" + f, 10, fy + 28, W-20, "#00000040", 12));
  });
  break;
}

// ==================== 4. DATA DISPLAY (数据展示) ====================
case "Avatar": {
  const s = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
  const rad = i.shape === "square" ? 6 : s/2;
  const bg = i.color === "green" ? "#52C41A" : i.color === "purple" ? "#722ED1" : primary;
  nodes.push({type:"rectangle", x:0, y:0, width:s, height:s, cornerRadius:rad, fill:bg});
  nodes.push(text(i.text || "A", s/2 - 5, (s-16)/2, s, "#FFFFFF", s*0.45, "600"));
  break;
}
case "Tag": {
  const tw = Math.max(52, (i.label||"Tag").length*10 + 20);
  const tagBg = i.color === "success" ? "#F6FFED" : i.color === "error" ? "#FFF2F0" : i.color === "warning" ? "#FFFBE6" : i.color === "processing" ? "#E6F4FF" : "#FAFAFA";
  const tagBorder = i.color === "success" ? "#B7EB8F" : i.color === "error" ? "#FFCCC7" : i.color === "warning" ? "#FFE58F" : i.color === "processing" ? "#91CAFF" : "#D9D9D9";
  const tagCol = i.color === "success" ? "#52C41A" : i.color === "error" ? "#FF4D4F" : i.color === "warning" ? "#FAAD14" : i.color === "processing" ? primary : "#000000E0";
  nodes.push({type:"rectangle", x:0, y:2, width:tw, height:24, cornerRadius:4, fill:tagBg, stroke:i.bordered?tagBorder:"#00000000", strokeWidth:1});
  nodes.push(text(i.label||"标签", 8, 6, tw - (i.closable?22:16), tagCol, 12));
  if (i.closable) nodes.push(text("✕", tw - 16, 7, 10, "#00000073", 10));
  break;
}
case "Table": {
  const cols = (i.columns || "姓名|状态|角色|操作").split("|");
  const rows = (i.rows || "张三,正常,管理员,编辑|李四,停用,访客,编辑").split("|").map(r => r.split(","));
  const rh = i.size === "small" ? 28 : 36;
  const colW = W / cols.length;
  cols.forEach((c, n) => {
    nodes.push(box(n * colW, 0, colW, rh, "#FAFAFA", 0, "#F0F0F0"));
    nodes.push(text(c, n * colW + 8, 8, colW - 16, "#000000A6", 12, "600"));
  });
  rows.forEach((row, r) => {
    row.forEach((cell, n) => {
      nodes.push(box(n * colW, (r + 1) * rh, colW, rh, "#FFFFFF", 0, "#F0F0F0"));
      nodes.push(text(cell || "—", n * colW + 8, (r + 1) * rh + 8, colW - 16, "#000000E0", 12));
    });
  });
  break;
}
case "Card": {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 8, i.bordered ? "#F0F0F0" : "#00000000"));
  nodes.push(box(0, 0, W, 44, "#FFFFFF", 0, "#F0F0F0"));
  nodes.push(text(i.title || "卡片标题", 16, 12, W - 80, "#000000E0", 16, "600"));
  if (i.extra) nodes.push(text(i.extra, W - 64, 14, 48, primary, 13));
  nodes.push(text("卡片正文内容区域，承载图表、列表或详情。", 16, 56, W - 32, "#000000A6", 13));
  break;
}
case "Segmented": {
  const opts = (i.options || "日视图|周视图|月视图").split("|");
  nodes.push(box(0, 0, W, 36, "#F5F5F5", 6, "#E8E8E8"));
  const segW = (W - 8) / opts.length;
  opts.forEach((o, idx) => {
    const isSel = o === (i.value || opts[0]);
    if (isSel) nodes.push(box(4 + idx * segW, 4, segW, 28, "#FFFFFF", 4, "#00000015", 1));
    nodes.push(text(o, 8 + idx * segW, 9, segW - 8, isSel ? "#000000E0" : "#00000073", 12, isSel ? "600" : "normal"));
  });
  break;
}
case "Statistic": {
  nodes.push(text(i.title || "总资产 (元)", 0, 4, W, "#00000073", 12));
  nodes.push(text((i.prefix||"") + (i.value||"1,234,560") + (i.suffix||""), 0, 24, W, "#000000E0", 24, "600"));
  if (i.trend === "up") nodes.push(text("▲ +12.5%", 0, 56, W, "#52C41A", 12));
  else if (i.trend === "down") nodes.push(text("▼ -4.2%", 0, 56, W, "#FF4D4F", 12));
  break;
}
case "Timeline": {
  const events = (i.items || "创建订单 08:30|正在处理中 10:15|处理完成 14:00").split("|");
  events.forEach((ev, n) => {
    const y = n * 32;
    nodes.push(circle(4, y + 4, 8, n === 0 ? primary : "#00000026"));
    if (n < events.length - 1) nodes.push({type:"rectangle", x:7, y:y + 12, width:2, height:24, fill:"#F0F0F0"});
    nodes.push(text(ev, 24, y, W - 24, n === 0 ? "#000000E0" : "#00000073", 13));
  });
  break;
}
case "Tree": {
  const lines = (i.items || "根节点|├── 研发部|│   └── 前端组|└── 设计部").split("|");
  lines.forEach((l, idx) => {
    nodes.push(text(l, 8, idx * 26, W - 16, "#000000E0", 13));
  });
  break;
}
case "Descriptions": {
  const pairs = (i.items || "姓名:张三|部门:前端研发|状态:正常").split("|").map(p => p.split(":"));
  pairs.forEach((pair, idx) => {
    const dy = idx * 32;
    nodes.push(box(0, dy, 80, 32, "#FAFAFA", 0, "#F0F0F0"));
    nodes.push(text(pair[0], 8, dy + 8, 64, "#000000A6", 12, "600"));
    nodes.push(box(80, dy, W - 80, 32, "#FFFFFF", 0, "#F0F0F0"));
    nodes.push(text(pair[1] || "—", 88, dy + 8, W - 96, "#000000E0", 12));
  });
  break;
}
case "Calendar": {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 8, "#D9D9D9"));
  nodes.push(text("2026年 9月", 12, 12, W - 24, "#000000E0", 14, "600"));
  ["一","二","三","四","五","六","日"].forEach((w, idx) => {
    nodes.push(text(w, 12 + idx * (W-24)/7, 36, (W-24)/7, "#00000073", 12));
  });
  for (let n = 1; n <= 28; n++) {
    const col = (n-1)%7, row = Math.floor((n-1)/7);
    nodes.push(text(String(n), 12 + col * (W-24)/7, 60 + row*24, (W-24)/7, n===16?primary:"#000000A6", 12, n===16?"600":"normal"));
  }
  break;
}
case "Carousel": {
  nodes.push(box(0, 0, W, H, primary, 8, primary));
  nodes.push(text("Carousel Banner 1", 0, H/2 - 10, W, "#FFFFFF", 16, "600"));
  [1, 2, 3].forEach((dot, n) => {
    nodes.push(circle(W/2 - 20 + n * 16, H - 16, 6, n === 0 ? "#FFFFFF" : "#FFFFFF50"));
  });
  break;
}
case "Collapse": {
  nodes.push(box(0, 0, W, 36, "#FAFAFA", 6, "#D9D9D9"));
  nodes.push(text("⌄  折叠面板标题", 12, 10, W - 24, "#000000E0", 13, "600"));
  nodes.push(box(0, 36, W, 48, "#FFFFFF", 0, "#D9D9D9"));
  nodes.push(text("折叠面板的内容区域，放置详细说明文本。", 12, 46, W - 24, "#000000A6", 12));
  break;
}
case "Empty": {
  nodes.push(text("📭", (W-32)/2, H/2 - 24, 32, "#00000026", 32));
  nodes.push(text(i.description || "暂无数据", 0, H/2 + 16, W, "#00000040", 13));
  break;
}
case "Image": {
  nodes.push(box(0, 0, W, H, "#FAFAFA", 6, "#E8E8E8"));
  nodes.push(text("🖼️ 图片预览", 0, (H-18)/2, W, "#00000073", 13));
  break;
}
case "QRCode": {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 8, "#D9D9D9"));
  nodes.push(box((W-80)/2, 16, 80, 80, "#000000", 0));
  nodes.push(text("扫码关注", 0, 108, W, "#00000073", 12));
  break;
}

// ==================== 5. FEEDBACK (反馈) ====================
case "Alert": {
  const alertBg = i.type === "error" ? "#FFF2F0" : i.type === "warning" ? "#FFFBE6" : i.type === "success" ? "#F6FFED" : "#E6F4FF";
  const alertBorder = i.type === "error" ? "#FFCCC7" : i.type === "warning" ? "#FFE58F" : i.type === "success" ? "#B7EB8F" : "#91CAFF";
  const alertCol = i.type === "error" ? "#FF4D4F" : i.type === "warning" ? "#FAAD14" : i.type === "success" ? "#52C41A" : primary;
  const iconChar = i.type === "error" ? "❌" : i.type === "warning" ? "⚠️" : i.type === "success" ? "✅" : "ℹ️";
  nodes.push(box(0, 0, W, H, alertBg, i.banner ? 0 : 6, alertBorder));
  let curX = 12;
  if (i.showIcon) {
    nodes.push(text(iconChar, curX, 12, 20, alertCol, 14));
    curX += 24;
  }
  nodes.push(text(i.message || "提示标题", curX, 10, W - curX - 24, "#000000E0", 14, "600"));
  if (i.description) {
    nodes.push(text(i.description, curX, 32, W - curX - 24, "#000000A6", 12));
  }
  if (i.closable) nodes.push(text("✕", W - 20, 12, 16, "#00000040", 12));
  break;
}
case "Modal": {
  if (!i.open) {
    nodes.push(box(0, 0, W, 40, "#FAFAFA", 6, "#D9D9D9"));
    nodes.push(text("打开弹窗对话框", 12, 11, W-24, primary, 14));
    break;
  }
  const mw = Math.min(W, i.width || 480), mh = Math.min(H, 200);
  nodes.push({type:"rectangle", x:(W-mw)/2, y:(H-mh)/2, width:mw, height:mh, cornerRadius:8, fill:"#FFFFFF", effect:{type:"shadow",shadowType:"outer",blur:24,offset:{x:0,y:6},color:"#0000002A"}});
  nodes.push(text(i.title||"操作确认", (W-mw)/2+20, (H-mh)/2+16, mw-60, "#000000E0", 16, "600"));
  nodes.push(text("✕", (W+mw)/2-28, (H-mh)/2+16, 16, "#00000073", 14));
  nodes.push(text(i.content||"确定要执行此项操作吗？", (W-mw)/2+20, (H-mh)/2+54, mw-40, "#000000A6", 13));
  nodes.push(box((W+mw)/2-136, (H+mh)/2-40, 56, 28, "#FFFFFF", 4, "#D9D9D9"));
  nodes.push(text("取消", (W+mw)/2-124, (H+mh)/2-34, 36, "#000000E0", 12));
  nodes.push(box((W+mw)/2-70, (H+mh)/2-40, 56, 28, primary, 4, primary));
  nodes.push(text("确定", (W+mw)/2-58, (H+mh)/2-34, 36, "#FFFFFF", 12));
  break;
}
case "Drawer": {
  if (!i.open) {
    nodes.push(box(0, 0, W, 40, "#FAFAFA", 6, "#D9D9D9"));
    nodes.push(text("打开抽屉面板", 12, 11, W-24, primary, 14));
    break;
  }
  const dw = Math.min(W, i.width || 320);
  nodes.push({type:"rectangle", x:W-dw, y:0, width:dw, height:H, fill:"#FFFFFF", effect:{type:"shadow",shadowType:"outer",blur:24,offset:{x:-4,y:0},color:"#0000001F"}});
  nodes.push(text(i.title||"抽屉标题", W-dw+20, 16, dw-60, "#000000E0", 16, "600"));
  nodes.push(text("✕", W-28, 16, 16, "#00000073", 14));
  nodes.push(box(W-dw, 48, dw, 1, "#F0F0F0"));
  nodes.push(text("抽屉正文内容与配置表单区域...", W-dw+20, 64, dw-40, "#000000A6", 13));
  break;
}
case "Progress": {
  const pct = Math.max(0, Math.min(100, Number(i.percent) || 75));
  if (i.type === "circle") {
    nodes.push(circle(W/2 - 32, (H-64)/2, 64, "#F5F5F5", "#D9D9D9"));
    nodes.push(circle(W/2 - 26, (H-52)/2, 52, "#FFFFFF"));
    nodes.push(text(pct + "%", W/2 - 20, (H-18)/2, 40, primary, 14, "600"));
  } else {
    nodes.push(box(0, (H-8)/2, W - 48, 8, "#F5F5F5", 4));
    nodes.push(box(0, (H-8)/2, (W - 48) * pct / 100, 8, primary, 4));
    nodes.push(text(pct + "%", W - 40, (H-18)/2, 40, "#00000073", 12));
  }
  break;
}
case "Result": {
  nodes.push(circle((W-48)/2, 16, 48, "#52C41A"));
  nodes.push(text("✓", (W-24)/2 + 3, 24, 24, "#FFFFFF", 28, "600"));
  nodes.push(text(i.title||"提交成功", 0, 76, W, "#000000E0", 18, "600"));
  nodes.push(text(i.subTitle||"系统已处理完成并保存状态", 0, 102, W, "#00000073", 12));
  break;
}
case "Spin": {
  nodes.push(text("◌", (W-24)/2, (H-36)/2, 24, primary, 24, "600"));
  if (i.tip) nodes.push(text(i.tip, 0, (H-36)/2 + 28, W, primary, 12));
  break;
}
case "Skeleton": {
  nodes.push(circle(0, 8, 36, "#F0F0F0"));
  nodes.push(box(48, 12, W - 64, 12, "#F0F0F0", 4));
  nodes.push(box(48, 32, (W - 64)*0.6, 12, "#F0F0F0", 4));
  break;
}
case "Popconfirm": {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 6, "#E8E8E8", 1));
  nodes.push(text("⚠️ " + (i.title||"确认要执行此操作吗？"), 8, 8, W-16, "#000000E0", 12));
  nodes.push(box(W-88, 32, 38, 22, "#FFFFFF", 3, "#D9D9D9"));
  nodes.push(text("取消", W-80, 36, 24, "#000000E0", 11));
  nodes.push(box(W-44, 32, 38, 22, primary, 3, primary));
  nodes.push(text("确定", W-36, 36, 24, "#FFFFFF", 11));
  break;
}
case "Tooltip": case "Popover": {
  nodes.push({type:"rectangle", x:0, y:0, width:W, height:H, cornerRadius:6, fill:"#000000D9"});
  nodes.push(text(i.title || i.content || "气泡提示内容", 12, (H-18)/2, W - 24, "#FFFFFF", 12));
  break;
}
case "Tour": {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 8, "#E8E8E8", 1));
  nodes.push(text("📍 " + (i.title||"新功能引导"), 12, 12, W-24, "#000000E0", 14, "600"));
  nodes.push(text(i.description||"点击此处可以快速开始项目。", 12, 36, W-24, "#000000A6", 12));
  nodes.push(text((i.current||1) + "/" + (i.total||3), 12, H - 24, 40, "#00000073", 11));
  nodes.push(box(W - 64, H - 28, 52, 22, primary, 4, primary));
  nodes.push(text("下一步", W - 56, H - 24, 40, "#FFFFFF", 11));
  break;
}
case "Watermark": {
  nodes.push(box(0, 0, W, H, "#FAFAFA", 6, "#E8E8E8"));
  nodes.push(text(i.content || "ANT DESIGN WATERMARK", 24, H/2 - 10, W - 48, "#00000010", 16, "600"));
  break;
}

// ==================== 6. NAVIGATION (导航) ====================
case "Steps": {
  const items = (i.items || "基本信息|参数配置|完成验证").split("|");
  const stepW = W / items.length;
  items.forEach((it, n) => {
    const isDone = n < (i.current || 1);
    const isCur = n === (i.current || 1);
    const x = n * stepW;
    nodes.push(circle(x + 8, (H-24)/2, 24, isDone || isCur ? primary : "#FFFFFF", isDone || isCur ? primary : "#00000040"));
    nodes.push(text(isDone ? "✓" : String(n+1), x + 16, (H-18)/2, 12, isDone || isCur ? "#FFFFFF" : "#00000073", 12, "600"));
    nodes.push(text(it, x + 38, (H-18)/2, stepW - 44, isCur ? "#000000E0" : "#00000073", 12, isCur ? "600" : "normal"));
    if (n < items.length - 1) nodes.push(box(x + stepW - 8, H/2, 12, 1, isDone ? primary : "#00000015"));
  });
  break;
}
case "Tabs": {
  const items = (i.items || "概览|详情|设置").split("|");
  const tw = Math.min(W / items.length, 90);
  items.forEach((it, n) => {
    const active = n === 0;
    nodes.push(text(it, n * tw + 8, 8, tw - 16, active ? primary : "#000000A6", 13, active ? "600" : "normal"));
    if (active) nodes.push({type:"rectangle", x:n * tw + 6, y:28, width:tw - 12, height:2, fill:primary});
  });
  nodes.push(box(0, 29, W, 1, "#F0F0F0"));
  break;
}
case "Menu": {
  const items = (i.items || "首页|数据管理|系统设置").split("|");
  const isDark = i.theme === "dark";
  nodes.push(box(0, 0, W, H, isDark ? "#001529" : "#FFFFFF", 0, isDark ? "#001529" : "#F0F0F0"));
  items.forEach((it, n) => {
    const active = n === 0;
    const y = n * 38;
    if (active) nodes.push(box(0, y, W, 38, isDark ? primary : "#E6F4FF", 0, "#00000000"));
    nodes.push(text(it, 16, y + 10, W - 32, active ? (isDark ? "#FFFFFF" : primary) : (isDark ? "#FFFFFFBF" : "#000000E0"), 13, active ? "600" : "normal"));
  });
  break;
}
case "Pagination": {
  const cur = Number(i.current) || 2;
  [1, 2, 3, 4, 5].forEach((p, n) => {
    const x = n * 32;
    const active = p === cur;
    nodes.push(box(x, 0, 28, 28, active ? primary : "#FFFFFF", 4, active ? primary : "#D9D9D9"));
    nodes.push(text(String(p), x + 9, 5, 16, active ? "#FFFFFF" : "#000000E0", 12));
  });
  break;
}
case "Breadcrumb": {
  const items = (i.items || "首页/业务中心/当前页面").split("/");
  let curX = 0;
  items.forEach((it, n) => {
    const isLast = n === items.length - 1;
    const iw = it.length * 12 + 6;
    nodes.push(text(it, curX, (H-18)/2, iw, isLast ? "#000000E0" : "#00000073", 13, isLast ? "600" : "normal"));
    curX += iw;
    if (!isLast) {
      nodes.push(text("/", curX, (H-18)/2, 10, "#00000040", 13));
      curX += 14;
    }
  });
  break;
}
case "Dropdown": {
  nodes.push(box(0, 0, W, h, "#FFFFFF", 6, "#D9D9D9"));
  nodes.push(text(i.label||"下拉菜单", pad, (h-18)/2, W - 32, "#000000E0", 13));
  nodes.push(text("⌄", W - 20, (h-18)/2, 14, "#00000073", 13));
  break;
}
case "Anchor": {
  nodes.push(box(0, 0, 2, H, "#F0F0F0"));
  nodes.push(box(0, 8, 2, 20, primary));
  nodes.push(text("API 核心接口", 12, 8, W - 16, primary, 13, "600"));
  nodes.push(text("使用说明与代码示例", 12, 36, W - 16, "#00000073", 13));
  break;
}

// ==================== 7. OTHER (配置与全局) ====================
case "Affix": case "BackTop": {
  nodes.push(circle(W/2 - 20, (H-40)/2, 40, "#FFFFFF", "#E8E8E8"));
  nodes.push(text("📌", W/2 - 8, (H-20)/2, 20, primary, 14));
  break;
}
case "BorderBeam": {
  nodes.push(box(0, 0, W, H, "#FFFFFF00", 8, primary, 2));
  nodes.push(text("边框光束动画容器", 12, (H-18)/2, W - 24, primary, 13));
  break;
}
case "App": {
  nodes.push(box(0, 0, W, H, "#FAFAFA", 6, primary));
  nodes.push(text("⚙ " + (i.label||__COMPONENT__), 12, (H-18)/2, W - 24, primary, 13, "600"));
  break;
}
default: {
  nodes.push(box(0, 0, W, H, "#FFFFFF", 6, "#D9D9D9"));
  nodes.push(text(i.label || __COMPONENT__, 12, Math.max(4, (H-18)/2), W - 24, disabled, 13));
}
}
return nodes;
`;

const outDir = new URL('../canvas-components/', import.meta.url);
await mkdir(outDir, { recursive: true });
const onlyComponents = new Set(String(process.env.ONLY_COMPONENTS || '').split(',').map(value => value.trim()).filter(Boolean));

// Parse cases from comprehensiveRenderer
const startIdx = comprehensiveRenderer.indexOf('switch (__COMPONENT__) {');
const endIdx = comprehensiveRenderer.indexOf('default: {', startIdx);
const switchBlock = comprehensiveRenderer.substring(startIdx, endIdx);

const caseMap = new Map();
const regex = /(?:case\s+\"([^\"]+)\":\s*)+(\{[\s\S]*?\n  break;\n\})/g;
let m;
while ((m = regex.exec(switchBlock)) !== null) {
  const allCases = [...m[0].matchAll(/case\s+\"([^\"]+)\"/g)].map(x => x[1]);
  const code = m[2];
  for (const c of allCases) {
    caseMap.set(c, code);
  }
}

for (const name of components) {
  if (onlyComponents.size && !onlyComponents.has(name)) continue;
  if (name === "Button" || name === "FloatButton" || name === "Badge") continue;
  if (["Divider", "Flex", "Row", "Col", "Grid", "Layout", "Masonry", "Space", "Splitter"].some(n => name === n || name.startsWith(n + "."))) continue;
  if (name === "Typography" || name.startsWith("Typography.")) continue;
  const comp = inspector.components[name];
  const fileHeader = generateHeader(name, comp);
  let componentCode = caseMap.get(name) || caseMap.get(name.split('.')[0]);
  if (componentCode) {
    componentCode = componentCode.replace(/^\{\n/, '').replace(/\n\s*break;\n\}$/, '');
  } else {
    componentCode = `  nodes.push(box(0, 0, W, H, "#FFFFFF", 6, "#D9D9D9"));\n  nodes.push(text(i.label || "${name}", 12, Math.max(4, (H-18)/2), W - 24, disabled, 13));`;
  }
  const fileBody = `${commonEngine}\n${componentCode}\nreturn nodes;\n`;
  await writeFile(new URL(`${name}.js`, outDir), `${fileHeader}${fileBody}`);
}

await writeFile(new URL('README.md', outDir), '# Ant Design canvas components\n\nEach file is a Pencil Code on Canvas script (schema 2.18). Link a Script node to the matching file; all declared inputs become live properties and rerender native Pencil layers.\n');

console.log(`Generated ${components.length} polished canvas components with clean visual @inputs and full custom rendering!`);

if (!onlyComponents.size) {
  await import("./generate-typography-canvas.mjs");
  await import("./generate-floatbutton-canvas.mjs");
  await import("./generate-badge-canvas.mjs");
}
