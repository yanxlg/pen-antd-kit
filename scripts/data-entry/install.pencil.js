
const config={"dataEntryComponents":["AutoComplete","Cascader","Checkbox","ColorPicker","DatePicker","Form","Input","InputNumber","Mentions","Radio","Rate","Select","Slider","Switch","TimePicker","Transfer","TreeSelect","Upload"],"componentDefaults":{"AutoComplete":{"placeholder":"input here","value":"","options":"Ant Design|AntV|Ant Design Pro"},"Cascader":{"placeholder":"Please select","value":"[]","options":"[{\"value\":\"zhejiang\",\"label\":\"Zhejiang\",\"children\":[{\"value\":\"hangzhou\",\"label\":\"Hangzhou\",\"children\":[{\"value\":\"west-lake\",\"label\":\"West Lake\"},{\"value\":\"xiaoshan\",\"label\":\"Xiaoshan\"}]}]},{\"value\":\"jiangsu\",\"label\":\"Jiangsu\",\"children\":[{\"value\":\"nanjing\",\"label\":\"Nanjing\"},{\"value\":\"suzhou\",\"label\":\"Suzhou\"}]}]"},"Checkbox":{"children":"Checkbox","checked":false},"ColorPicker":{"value":"#1677ff","showText":true},"DatePicker":{"placeholder":"Select date","value":""},"Form":{"fields":"Username|Password"},"Input":{"placeholder":"Basic usage","value":"","allowClear":false},"InputNumber":{"value":3,"min":0,"max":100},"Mentions":{"placeholder":"Input @ to mention people","value":""},"Radio":{"children":"Radio","checked":false},"Rate":{"value":4,"count":5},"Select":{"placeholder":"Select a person","value":"","options":"Jack|Lucy|Tom"},"Slider":{"value":40,"min":0,"max":100},"Switch":{"checked":true},"TimePicker":{"placeholder":"Select time","value":""},"Transfer":{"titles":"Source|Target","showSearch":false},"TreeSelect":{"placeholder":"Please select","value":""},"Upload":{"children":"Click to Upload"}},"componentSizes":{"AutoComplete":[240,32],"Cascader":[184,32],"Checkbox":[160,32],"ColorPicker":[160,32],"DatePicker":[240,32],"Form":[360,132],"Input":[320,32],"InputNumber":[160,32],"Mentions":[320,72],"Radio":[140,32],"Rate":[140,32],"Select":[240,32],"Slider":[320,32],"Switch":[44,22],"TimePicker":[240,32],"Transfer":[520,220],"TreeSelect":[240,32],"Upload":[320,160]},"componentVariants":{"AutoComplete":[["Basic",{}],["Open",{"open":true}],["Disabled",{"disabled":true}],["Error",{"status":"error"}],["Filled",{"variant":"filled"}]],"Cascader":[["Basic",{}],["Selected",{"value":"[\"zhejiang\",\"hangzhou\",\"west-lake\"]"}],["Open",{"value":"[\"zhejiang\",\"hangzhou\",\"west-lake\"]","open":true}],["Disabled",{"disabled":true}],["Error",{"status":"error"}]],"Checkbox":[["Unchecked",{}],["Checked",{"checked":true}],["Indeterminate",{"indeterminate":true}],["Disabled",{"disabled":true}]],"ColorPicker":[["Default",{}],["Text",{"showText":true}],["Small",{"size":"small"}],["Large",{"size":"large"}],["Disabled",{"disabled":true}]],"DatePicker":[["Date",{}],["Selected",{"value":"2026-09-18"}],["Open",{"open":true}],["Month",{"picker":"month"}],["Disabled",{"disabled":true}]],"Form":[["Basic",{}],["Horizontal",{"layout":"horizontal"}],["Required",{"required":true}],["Error",{"status":"error"}]],"Input":[["Basic",{}],["Value",{"value":"Ant Design"}],["Prefix and suffix",{"prefix":"¥","suffix":"RMB"}],["Filled",{"variant":"filled"}],["Disabled",{"disabled":true}],["Error",{"status":"error"}]],"InputNumber":[["Basic",{}],["Small",{"size":"small"}],["Large",{"size":"large"}],["Spinner",{"mode":"spinner"}],["Disabled",{"disabled":true}],["Error",{"status":"error"}]],"Mentions":[["Basic",{}],["Value",{"value":"@afc163 hello"}],["Disabled",{"disabled":true}],["Error",{"status":"error"}]],"Radio":[["Unchecked",{}],["Checked",{"checked":true}],["Disabled",{"disabled":true}]],"Rate":[["Basic",{}],["Half",{"value":3.5,"allowHalf":true}],["Disabled",{"disabled":true}]],"Select":[["Basic",{}],["Selected",{"value":"Lucy"}],["Open",{"open":true}],["Multiple",{"mode":"multiple","value":"Lucy"}],["Disabled",{"disabled":true}],["Error",{"status":"error"}]],"Slider":[["Basic",{}],["Range",{"range":true}],["Marks",{"marks":true}],["Disabled",{"disabled":true}]],"Switch":[["Checked",{}],["Unchecked",{"checked":false}],["Small",{"size":"small"}],["Loading",{"loading":true}],["Disabled",{"disabled":true}]],"TimePicker":[["Basic",{}],["Selected",{"value":"12:30:00"}],["Open",{"open":true}],["12 hour",{"use12Hours":true}],["Disabled",{"disabled":true}]],"Transfer":[["Basic",{}],["Search",{"showSearch":true}],["One way",{"oneWay":true}],["Disabled",{"disabled":true}]],"TreeSelect":[["Basic",{}],["Selected",{"value":"Node 1"}],["Open",{"open":true}],["Multiple",{"multiple":true}],["Disabled",{"disabled":true}]],"Upload":[["Button",{}],["Multiple",{"multiple":true}],["Directory",{"directory":true}],["Disabled",{"disabled":true}]]}};
const titleNode=(name, content, size = 18) => ({
  type: 'text', name, content, fontFamily: 'Inter', fontSize: size,
  fontWeight: size >= 32 ? '700' : '600', fill: '#000000e0',
  textGrowth: 'fixed-width', width: 'fill_container', lineHeight: 1.4,
});
const changed={components:0,usagePreserved:0,sections:0};
function definition(name,label,props,width,height){return {type:'script',name:'Antd/Data Entry/'+name,reusable:true,scriptUri:'../canvas-components/'+name+'.js',width,height,inputs:props,metadata:{type:'antd-component',antd:{component:name,category:'Data Entry',version:'6.6.4',example:label}}}}
function instance(masterId,name,label,props,width,height){return {type:'ref',ref:masterId,name:name+' · '+label,width,height,inputs:props,metadata:{type:'antd-component-instance',antd:{component:name,category:'Data Entry',version:'6.6.4',example:label}}}}
for(const name of config.dataEntryComponents){
 const slug=name.toLowerCase(),section=Get('section-'+slug),board=Get('artboard-'+slug+'-components'),usage=Get('artboard-'+slug+'-usage');
 if(!section||!board||!usage){Print('Missing',name);continue}
 Update(section.id,{placeholder:true});
 const existingMaster=Get(board.id,n=>n.type==='script'&&n.reusable&&n.scriptUri&&n.scriptUri.endsWith('/'+name+'.js'))[0];
 if(!existingMaster){
   Update(board.id,{name:'Components',y:90,width:1728,height:900,layout:'none'});
   if(!(board.children||[]).some(n=>n.name==='Components'))Insert(board.id,{...titleNode('Components','Components',80),x:32,y:32,width:1600});
   const content=Insert(board.id,{type:'frame',name:name+' component definition',x:32,y:160,width:1664,layout:'vertical',gap:24});
   const master=Insert(content,{type:'frame',name:'Canonical '+name,width:1664,layout:'vertical',gap:16,padding:24,stroke:'#f0f0f0',strokeWidth:1,cornerRadius:8});
   Insert(master,titleNode('Definition',name,20));
   const sz=config.componentSizes[name],defaults=config.componentDefaults[name];
   const masterId=Insert(master,definition(name,'Definition',defaults,sz[0],sz[1]));
   for(const pair of config.componentVariants[name]){
     const label=pair[0],props={...defaults,...pair[1]};
     let h=sz[1];if(props.open)h=Math.max(h,220);if(name==='Form')h=props.layout==='horizontal'?92:132;if(name==='Upload'&&props.mode==='button')h=40;
     const w=name==='Switch'&&props.size==='small'?28:sz[0];if(name==='Switch')h=props.size==='small'?16:22;
     const card=Insert(content,{type:'frame',name:name+' · '+label,width:1664,layout:'vertical',gap:16,padding:24,stroke:'#f0f0f0',strokeWidth:1,cornerRadius:8});
     Insert(card,titleNode('State',label,18));Insert(card,instance(masterId,name,label,props,w,h));
   }
   const ch=Get(content,(n,c)=>c.depth===0?c.bounds.height:undefined)[0];Update(board.id,{height:Math.ceil(ch+192)});
 }
 changed.components++;
 changed.usagePreserved++;
 const principles=(section.children||[]).find(n=>(n.name||'').startsWith('Principles'));
 let boardX=Number(usage.width)+40;
 if(principles){
   Update(principles.id,{x:0,y:90});
   Update(usage.id,{x:Number(principles.width)+40,y:90});
   boardX=Number(principles.width)+40+Number(usage.width)+40;
 }else Update(usage.id,{x:0,y:90});
 Update(board.id,{x:boardX,y:90});
 const sectionWidth=boardX+Number(board.width);
 const maxH=Math.max(Number(usage.height)||0,Number(board.height)||0,principles?Number(principles.height)||0:0)+122;
 Update(section.id,{width:sectionWidth,height:maxH,placeholder:false});
 const banner=(section.children||[]).find(n=>(n.name||'').startsWith('Sub-Title'));if(banner)Update(banner.id,{width:sectionWidth});
 changed.sections++;
}
let cursor=0,maxHeight=0;const group=Get('layer-data-entry');
for(const name of config.dataEntryComponents){const s=Get('section-'+name.toLowerCase());if(!s)continue;Update(s.id,{x:cursor,y:0});cursor+=Number(s.width)+120;maxHeight=Math.max(maxHeight,Number(s.height)||0)}
Update(group.id,{width:Math.max(1,cursor-120),height:maxHeight});
Print(changed);
