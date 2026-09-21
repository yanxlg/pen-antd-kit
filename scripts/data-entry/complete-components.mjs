import fs from 'node:fs';

const plans = {
  AutoComplete: [
    ['Selected', { value: 'Ant Design' }, 240, 32],
    ['Small', { size: 'small' }, 240, 24],
    ['Large', { size: 'large' }, 240, 40],
    ['Warning', { status: 'warning', value: 'Ant Design' }, 240, 32],
    ['Borderless', { variant: 'borderless', value: 'Ant Design' }, 240, 32],
  ],
  Cascader: [
    ['Multiple', { multiple: true, value: '[["zhejiang","hangzhou","west-lake"],["jiangsu","nanjing"]]' }, 320, 32],
    ['Small', { size: 'small' }, 184, 24],
    ['Large', { size: 'large' }, 184, 40],
    ['Warning', { status: 'warning', value: '["zhejiang","hangzhou","west-lake"]' }, 184, 32],
    ['Filled', { variant: 'filled', value: '["zhejiang","hangzhou","west-lake"]' }, 184, 32],
    ['Underlined', { variant: 'underlined', value: '["zhejiang","hangzhou","west-lake"]' }, 184, 32],
  ],
  Checkbox: [
    ['Disabled checked', { checked: true, disabled: true }, 180, 32],
    ['Custom color', { checked: true, primaryColor: '#722ED1' }, 180, 32],
    ['Group', { options: '["Apple","Pear","Orange"]', value: '["Pear"]' }, 360, 32, 'Checkbox.Group'],
    ['Disabled group', { options: '["Apple","Pear","Orange"]', value: '["Pear"]', disabled: true }, 360, 32, 'Checkbox.Group'],
  ],
  ColorPicker: [
    ['Clear', { value: '', showText: false }, 32, 32],
    ['Swatch only', { value: '#722ED1', showText: false }, 32, 32],
    ['RGB text', { value: 'rgb(22, 119, 255)', showText: true, format: 'rgb' }, 190, 32],
    ['Disabled text', { value: '#1677FF', showText: true, disabled: true }, 160, 32],
  ],
  DatePicker: [
    ['Range selected', { value: '2026-09-18', endValue: '2026-09-21' }, 320, 32, 'DatePicker.RangePicker'],
    ['Small', { size: 'small' }, 240, 24],
    ['Large', { size: 'large' }, 240, 40],
    ['Warning', { status: 'warning', value: '2026-09-18' }, 240, 32],
    ['Filled', { variant: 'filled', value: '2026-09-18' }, 240, 32],
    ['Borderless', { variant: 'borderless', value: '2026-09-18' }, 240, 32],
  ],
  Form: [
    ['Inline', { layout: 'inline', fields: 'Username|Password' }, 520, 40],
    ['Disabled', { disabled: true }, 360, 132],
    ['Warning', { status: 'warning' }, 360, 132],
    ['Single field', { fields: 'Email' }, 360, 72],
  ],
  Input: [
    ['Small', { size: 'small' }, 320, 24],
    ['Large', { size: 'large' }, 320, 40],
    ['Allow clear', { value: 'Ant Design', allowClear: true }, 320, 32],
    ['Password', { value: 'password', password: true }, 320, 32],
    ['Search', { value: 'Ant Design', search: true }, 320, 32],
    ['OTP', { value: '123456', otp: true }, 320, 32],
  ],
  InputNumber: [
    ['Without controls', { controls: false, value: 3 }, 160, 32],
    ['Prefix and suffix', { prefix: '$', suffix: 'USD', value: 99 }, 200, 32],
    ['Warning', { status: 'warning', value: 3 }, 160, 32],
    ['Filled', { variant: 'filled', value: 3 }, 160, 32],
    ['Underlined', { variant: 'underlined', value: 3 }, 160, 32],
    ['Borderless', { variant: 'borderless', value: 3 }, 160, 32],
  ],
  Mentions: [
    ['Open', { open: true }, 320, 184],
    ['Warning', { status: 'warning' }, 320, 72],
    ['Filled', { variant: 'filled' }, 320, 72],
    ['Borderless', { variant: 'borderless' }, 320, 72],
  ],
  Radio: [
    ['Disabled checked', { checked: true, disabled: true }, 160, 32],
    ['Button outline', { optionType: 'button', checked: true, children: 'Option A' }, 120, 32],
    ['Button solid', { optionType: 'button', buttonStyle: 'solid', checked: true, children: 'Option A' }, 120, 32],
    ['Custom color', { checked: true, primaryColor: '#722ED1' }, 160, 32],
  ],
  Rate: [
    ['Empty', { value: 0 }, 140, 32],
    ['Full', { value: 5 }, 140, 32],
    ['Ten stars', { value: 7, count: 10 }, 260, 32],
    ['Seven stars', { value: 3, count: 7 }, 188, 32],
  ],
  Select: [
    ['Small', { size: 'small' }, 240, 24],
    ['Large', { size: 'large' }, 240, 40],
    ['Tags', { mode: 'tags', value: 'Ant Design' }, 280, 32],
    ['Loading', { loading: true }, 240, 32],
    ['Filled', { variant: 'filled', value: 'Lucy' }, 240, 32],
    ['Underlined', { variant: 'underlined', value: 'Lucy' }, 240, 32],
  ],
  Slider: [
    ['Vertical', { vertical: true, value: 40 }, 32, 180],
    ['Reverse', { reverse: true, value: 40 }, 320, 32],
    ['Dots', { dots: true, marks: true, step: 10 }, 320, 56],
    ['Tooltip', { value: 40, tooltipOpen: true, tooltipSuffix: '%' }, 320, 64],
    ['Disabled handle', { range: true, values: '20,70', disabledHandles: '1' }, 320, 32],
    ['Semantic styling', { range: true, values: '20,70', semanticStyle: 'multiple' }, 320, 32],
  ],
  Switch: [
    ['Small unchecked', { size: 'small', checked: false }, 28, 16],
    ['Small loading', { size: 'small', loading: true, checked: true }, 28, 16],
    ['Disabled unchecked', { disabled: true, checked: false }, 44, 22],
    ['Text checked', { checked: true, checkedChildren: 'on', unCheckedChildren: 'off' }, 60, 22],
    ['Text unchecked', { checked: false, checkedChildren: 'on', unCheckedChildren: 'off' }, 60, 22],
    ['Icons', { checked: true, checkedIcon: 'CheckOutlined', unCheckedIcon: 'CloseOutlined' }, 44, 22],
    ['Custom track', { checked: true, trackColor: '#52C41A' }, 44, 22],
    ['Semantic sizing', { checked: true, customTrackHeight: 14, customHandleSize: 20, customHandleOffsetX: -2 }, 33, 14],
  ],
};

const defaults = {
  AutoComplete: { placeholder: 'input here', value: '', options: 'Ant Design|AntV|Ant Design Pro' },
  Cascader: { placeholder: 'Please select', value: '[]', options: '[{"value":"zhejiang","label":"Zhejiang","children":[{"value":"hangzhou","label":"Hangzhou","children":[{"value":"west-lake","label":"West Lake"},{"value":"xiaoshan","label":"Xiaoshan"}]}]},{"value":"jiangsu","label":"Jiangsu","children":[{"value":"nanjing","label":"Nanjing"},{"value":"suzhou","label":"Suzhou"}]}]' },
  Checkbox: { children: 'Checkbox', checked: false },
  ColorPicker: { value: '#1677ff', showText: true },
  DatePicker: { placeholder: 'Select date', value: '' },
  Form: { fields: 'Username|Password' },
  Input: { placeholder: 'Basic usage', value: '', allowClear: false },
  InputNumber: { value: 3, min: 0, max: 100 },
  Mentions: { placeholder: 'Input @ to mention people', value: '' },
  Radio: { children: 'Radio', checked: false },
  Rate: { value: 4, count: 5 },
  Select: { placeholder: 'Select a person', value: '', options: 'Jack|Lucy|Tom' },
  Slider: { value: 40, min: 0, max: 100 },
  Switch: { checked: true },
};

const code = `
const plans=${JSON.stringify(plans)};
const defaults=${JSON.stringify(defaults)};
const changed=[];
const text=(name,content,size,weight='600',color='#000000e0')=>({type:'text',name,content,fontFamily:'Inter',fontSize:size,fontWeight:weight,fill:color,textGrowth:'fixed-width',width:'fill_container',lineHeight:1.4});
const metadata=(component,label)=>({type:'antd-component-instance',antd:{component,category:'Data Entry',version:'6.6.4',example:label}});
const find=(node,predicate)=>{if(!node)return undefined;if(predicate(node))return node;for(const child of node.children||[]){const match=find(child,predicate);if(match)return match}return undefined};
const cascaderUsage=Get('artboard-cascader-usage',{depth:30});
const migrateCascaderUsage=node=>{if(!node)return;if(node.type==='ref'&&node.ref==='F9Vfg'&&node.inputs?.size==='middle')Update(node.id,{inputs:{...node.inputs,size:'medium'}});for(const child of node.children||[])migrateCascaderUsage(child)};
migrateCascaderUsage(cascaderUsage);
const cascaderOptions=defaults.Cascader.options;
const defaultValueDemo=Get('X08r02');
if(defaultValueDemo)Update(defaultValueDemo.id,{inputs:{...defaultValueDemo.inputs,placeholder:'Please select',value:'["zhejiang","hangzhou","west-lake"]',options:cascaderOptions}});
const customRenderDemo=Get('Ehfbs');
if(customRenderDemo)Update(customRenderDemo.id,{inputs:{...customRenderDemo.inputs,placeholder:'Please select',value:'["zhejiang","hangzhou","west-lake"]',displayValue:'Zhejiang / Hangzhou / West Lake (752100)',displayLinkText:'752100',options:cascaderOptions}});
if(Get('taGuQ'))Replace('taGuQ',{type:'ref',ref:'F9Vfg',name:'Cascader · Underlined',width:184,height:32,inputs:{...defaults.Cascader,size:'medium',status:'default',disabled:false,open:false,variant:'underlined'},metadata:metadata('Cascader','Variants · Underlined')});
if(Get('h7TxfD'))Replace('h7TxfD',{type:'ref',ref:'H0DThz',name:'Radio.Group · Placement',width:381,height:32,inputs:{options:JSON.stringify([{label:'topLeft',value:'topLeft',width:80},{label:'topRight',value:'topRight',width:88},{label:'bottomLeft',value:'bottomLeft',width:104},{label:'bottomRight',value:'bottomRight',width:112}]),value:'topLeft',optionType:'button',buttonStyle:'outline',disabled:false,block:false},metadata:metadata('Radio.Group','Cascader placement')});
const panelInputs=multiple=>({options:cascaderOptions,value:'[]',multiple,disabled:false,direction:'ltr',primaryColor:'#1677FF'});
if(Get('RrYbV'))Replace('RrYbV',{type:'ref',ref:'F3IF3s',name:'Cascader.Panel · Single',width:111,height:180,inputs:panelInputs(false),metadata:metadata('Cascader.Panel','Panel')});
if(Get('wGU5i'))Replace('wGU5i',{type:'ref',ref:'F3IF3s',name:'Cascader.Panel · Multiple',width:111,height:180,inputs:panelInputs(true),metadata:metadata('Cascader.Panel','Panel multiple')});
if(Get('TPdHc'))Replace('TPdHc',{type:'ref',ref:'F3IF3s',name:'Cascader.Panel · Empty',width:111,height:180,inputs:{...panelInputs(false),options:'[]'},metadata:metadata('Cascader.Panel','Panel empty')});
for(const [name,variants] of Object.entries(plans)){
  const slug=name.toLowerCase(), board=Get('artboard-'+slug+'-components'), section=Get('section-'+slug);
  if(!board||!section){Print('Missing board',name);continue}
  const content=(board.children||[]).find(n=>(n.name||'').includes('component definition'));
  if(!content){Print('Missing content',name);continue}
  const existing=(content.children||[]).find(n=>n.name==='Extended coverage');
  if(existing)Delete(existing.id);
  const tree=Get(board.id,{depth:8});
  const master=find(tree,n=>n.type==='script'&&n.reusable&&n.scriptUri&&n.scriptUri.endsWith('/'+name+'.js'));
  if(!master){Print('Missing master',name);continue}
  const group=Insert(content.id,{type:'frame',name:'Extended coverage',width:1664,layout:'vertical',gap:16,padding:24,stroke:'#d6e4ff',strokeWidth:1,cornerRadius:8,fill:'#fafdff'});
  Insert(group,text('Extended coverage','Extended coverage',20));
  Insert(group,text('Coverage note','Representative size, state, variant, and composition cases supported by the renderer.',13,'normal','#00000073'));
  for(let index=0;index<variants.length;index+=2){
    const row=Insert(group,{type:'frame',name:'Coverage row '+(index/2+1),width:'fill_container',layout:'horizontal',gap:16});
    for(const item of variants.slice(index,index+2)){
      const [label,overrides,width,height,componentName]=item;
      const targetName=componentName||name;
      const target=targetName===name?master:find(tree,n=>n.type==='script'&&n.reusable&&n.scriptUri&&n.scriptUri.endsWith('/'+targetName+'.js'));
      const card=Insert(row,{type:'frame',name:name+' · '+label,width:792,height:Math.max(96,height+68),layout:'none',padding:20,stroke:'#f0f0f0',strokeWidth:1,cornerRadius:8,fill:'#ffffff'});
      Insert(card,{...text('State',label,15),x:20,y:18,width:752});
      if(target)Insert(card,{type:'ref',ref:target.id,name:name+' · '+label,x:20,y:52,width,height,inputs:{...defaults[name],...overrides},metadata:metadata(targetName,label)});
    }
  }
  const contentHeight=Get(content.id,(n,c)=>c.depth===0?c.bounds.height:undefined)[0];
  Update(board.id,{height:Math.ceil(contentHeight+192)});
  const usage=Get('artboard-'+slug+'-usage');
  const principles=(section.children||[]).find(n=>(n.name||'').startsWith('Principles'));
  const maxHeight=Math.max(Number(board.height)||0,usage?Number(usage.height)||0:0,principles?Number(principles.height)||0:0)+122;
  Update(section.id,{height:maxHeight});
  changed.push({name,variants:variants.length});
}
Print({changed});
`;

fs.writeFileSync(new URL('./complete-components.pencil.js', import.meta.url), code);
console.log(`Prepared extended coverage for ${Object.keys(plans).length} Data Entry component boards.`);
