export function createRenderer(React, A, dayjs, bindings = {}) {
  const h = React.createElement;
  const callbacks = {
    preventUpload: () => false,
    title: item => item.title,
    listItem: item => h(A.List.Item, null, String(item)),
    masonryItem: ({data,index}) => h('div',{style:{height:data,background:'#e6f4ff',padding:12}},String(index+1)),
    formList: fields => fields.map(field=>h(A.Form.Item,{...field,key:field.key,name:[field.name,'name']},h(A.Input))),
    ...bindings,
  };
  function resolve(name) {
    const component = name.split('.').reduce((value,key)=>value?.[key], A);
    if (component) return component;
    if (/^[a-z][a-z0-9-]*$/.test(name)) return name;
    throw new Error(`Unknown component: ${name}`);
  }
  function decode(value) {
    if (Array.isArray(value)) return value.map(decode);
    if (!value || typeof value !== 'object') return value;
    if ('$date' in value) {
      const date = dayjs(value.$date);
      if (!date.isValid()) throw new Error(`Invalid date: ${value.$date}`);
      return date;
    }
    if ('$callback' in value) {
      if (typeof callbacks[value.$callback] !== 'function') throw new Error(`Unbound callback: ${value.$callback}`);
      return callbacks[value.$callback];
    }
    if ('$component' in value) return h(resolve(value.$component), decode(value.props ?? {}));
    return Object.fromEntries(Object.entries(value).map(([key,v])=>[key,decode(v)]));
  }
  function prepare(name, raw) {
    const props = decode(raw);
    if (/^(DatePicker|TimePicker|Calendar)(\.|$)/.test(name)) {
      const date = v => v == null || dayjs.isDayjs(v) ? v : Array.isArray(v) ? v.map(date) : decode({$date:v});
      for (const key of ['value','defaultValue','pickerValue','defaultPickerValue','minDate','maxDate','validRange']) if (key in props) props[key]=date(props[key]);
      if (props.showTime && typeof props.showTime === 'object') for (const key of ['defaultValue','defaultOpenValue']) if (key in props.showTime) props.showTime[key]=date(props.showTime[key]);
    }
    return props;
  }
  function Service({name,props,container}) {
    const service = name === 'Message' ? A.message : A.notification;
    const [api,holder] = service[name === 'Message' ? 'useMessage' : 'useNotification']({getContainer:container});
    React.useEffect(()=>{api.open({...props,key:'preview'});return ()=>api.destroy('preview');},[api,props]);
    return holder;
  }
  function render(name, raw, {container, contain = true} = {}) {
    const props = prepare(name,raw);
    if (name === 'Grid') return h(A.Row,{gutter:8},...['8','8','8'].map((span,index)=>h(A.Col,{key:index,span:Number(span)},h('div',{style:{background:'#e6f4ff',padding:16}},`col-${span}`))));
    if (name === 'Message' || name === 'Notification') return h(Service,{name,props,container});
    const base = name.split('.')[0];
    const preview = contain ? {
      ...(['Modal','Drawer'].includes(base) ? {getContainer:false,rootStyle:{position:'absolute'},...(base==='Modal'?{styles:{wrapper:{position:'absolute'}},style:{top:12},mask:false}:{mask:false})}:{}),
      ...(['Dropdown','Popover','Popconfirm','Tooltip','Tour','Select','TreeSelect','Cascader','DatePicker','TimePicker','ColorPicker','AutoComplete','Mentions'].includes(base)?{getPopupContainer:container}:{}),
    } : {};
    let element = h(resolve(name),{...preview,...props});
    const wrappers = {
      'Form.Item':'Form','Form.List':'Form','Form.ErrorList':'Form',
      'Card.Grid':'Card','Card.Meta':'Card','Col':'Row',
      'Descriptions.Item':'Descriptions','Collapse.Panel':'Collapse',
      'Menu.Item':'Menu','Menu.SubMenu':'Menu','Menu.Divider':'Menu',
      'Breadcrumb.Item':'Breadcrumb','Breadcrumb.Separator':'Breadcrumb',
      'Tabs.TabPane':'Tabs','Timeline.Item':'Timeline',
      'Splitter.Panel':'Splitter','Mentions.Option':'Mentions',
      'Anchor.Link':'Anchor','List.Item':'List','List.Item.Meta':'List',
      'Table.Column':'Table','Table.ColumnGroup':'Table',
    };
    if (wrappers[name]) element=h(resolve(wrappers[name]),{...(base==='Table'?{dataSource:[{key:'1',name:'张三'}],pagination:false}:{}),...(base==='Splitter'?{style:{height:160}}:{}),...(base==='Collapse'?{defaultActiveKey:['preview']}:{}),...(base==='Anchor'?{affix:false}:{})},React.cloneElement(element,{key:'preview'}));
    return element;
  }
  function theme(config = {}) {
    return {...decode(config),...(config.algorithm?{algorithm:(Array.isArray(config.algorithm)?config.algorithm:[config.algorithm]).map(name=>{if(typeof A.theme[name]!=='function')throw new Error(`Unknown theme algorithm: ${name}`);return A.theme[name];})}:{})};
  }
  return {decode,prepare,render,theme};
}
