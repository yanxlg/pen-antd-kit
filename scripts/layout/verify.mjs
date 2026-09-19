import fs from 'node:fs';import assert from 'node:assert/strict';import {chromium} from '@playwright/test';import {setup} from '../floatbutton-browser.mjs';import {layoutInstance,reactModel} from './composition.mjs';import {groups,registry,slots,buttons,row,splitter,masonry,layout} from './catalog.mjs';
const root=new URL('../../canvas-components/',import.meta.url),cache=new Map();
export function render(name,props={},width=740,height=120){let c=cache.get(name);if(!c){const source=fs.readFileSync(new URL(name+'.js',root),'utf8'),defaults={};for(const match of source.matchAll(/@input (\w+): .*? = (.+)/g)){try{defaults[match[1]]=JSON.parse(match[2]);}catch{defaults[match[1]]=match[2];}}c={defaults,fn:new Function('pencil',source)};cache.set(name,c);}return c.fn({input:{...c.defaults,...props},width,height});}
let count=0;for(const g of Object.values(groups))for(const[,demos]of [...g.matrix,...g.usage])for(const d of demos){const nodes=render(d.component,d.props,d.width,d.height);for(const n of nodes){for(const key of ['x','y','width','height'])if(n[key]!==undefined)assert(Number.isFinite(n[key]),`${d.component} ${key}`);assert(n.width>=0&&n.height>=0);if(n.type==='script'){assert(!n.ref,'Independent instances must not reference live nodes');assert(n.scriptUri,'Missing nested script binding');}assert((n.x||0)+n.width<=d.width+1,`${d.component} overflows width: ${d.label}`);assert((n.y||0)+n.height<=d.height+1,`${d.component} overflows height: ${d.label} ${n.y+n.height}>${d.height}`);}reactModel(layoutInstance(d.component,d.props,{width:d.width,height:d.height}));count++;}
const imported=JSON.parse(fs.readFileSync(new URL('../../registry/layout-official-imports.json',import.meta.url),'utf8'));
let importedCols=0;
for(const scene of imported.grid.snapshots){
 const cols=render('Row',scene.inputs,scene.width,scene.height);
 for(const col of cols){
  assert.equal(col.scriptUri,'../canvas-components/Col.js','Every imported column uses the single Col definition');
  const content=render('Col',col.inputs,col.width,col.height);
  assert.equal(content.find(n=>n.type==='text')?.content,col.inputs.children,'Configured label preserved');
  assert.equal(content.find(n=>n.type==='rectangle')?.fill,col.inputs.background,'Configured background preserved');
  assert.equal(content.find(n=>n.type==='rectangle')?.width,col.width-(scene.inputs.gutter||0),'Gutter remains inside Col');
  importedCols++;
 }
 const model=reactModel({ref:registry.components.Row,inputs:scene.inputs});
 assert.equal(model.children.length,cols.length);
}
assert.equal(importedCols,117,'All official Grid columns survive consolidation');
for(const scene of imported.masonry.snapshots){
 const expectedCount=Object.keys(scene.props).filter(k=>/^item\d+$/.test(k)).length;
 const nodes=render('Masonry',scene.props,774,scene.height);
 assert.equal(nodes.length,expectedCount,'Imported Masonry item count');
 for(const n of nodes){assert(n.x+n.width<=775);assert(n.y+n.height<=scene.height+1);}
 const model=reactModel({ref:registry.components.Masonry,scriptUri:'../canvas-components/Masonry.js',inputs:scene.props});
 assert.equal(model.props.items.length,expectedCount,'Instance inputs must replace master inputs');
 assert(!JSON.stringify(model).includes('"ref":'),'Unresolved imported content reference');
}
const wrapProps={wrap:true,gap:'small'};for(let k=1;k<=24;k++){wrapProps['child'+k]='CjMCs';wrapProps['child'+k+'Width']=78;wrapProps['child'+k+'Height']=32;}
const wrapNodes=render('Flex',wrapProps,774,112);assert.equal(wrapNodes.length,24);assert.equal(wrapNodes[23].y,80);
for(const n of wrapNodes){assert(n.x+n.width<=774);assert(n.y+n.height<=112);}
const longRow={gutter:16,verticalGutter:16};
for(let k=1;k<=8;k++)Object.assign(longRow,{['col'+k]:registry.components.Col,['children'+k]:'Column',['background'+k]:'#0092ff',['span'+k]:6,['height'+k]:120});
const longNodes=render('Row',longRow,800,256);
assert.equal(longNodes.length,8,'Official Grid playground must retain both rows');
assert.equal(longNodes[4].y,136);assert.equal(longNodes[7].x,600);
assert.equal(reactModel(layoutInstance('Row',longRow)).children.length,8);
assert.equal(render('Divider',{marginBlock:0},740,1)[0].y,0,'Imported wrapper owns divider margins');
const overlay=render('Layout',{...layout,hasSider:true,siderOverlay:true},740,300);
assert.equal(overlay.find(n=>n.name==='Content').width,740,'Overlay Sider must not shrink content');
const browser=await chromium.launch({channel:'chrome'});let comparisons=0;try{const page=await browser.newPage();await setup(page);
for(const [children,plain,labelWidth] of [['Text',true,27],['Left Text',true,56],['Right Text',true,65],['classNames Object',false,147],['styles Object',false,99]]){
 const label=render('Divider',{children,plain,labelWidth,marginBlock:0},774,plain?22:26).find(n=>n.type==='text');
 const measured=await page.evaluate(({children,plain})=>{const c=document.createElement('canvas').getContext('2d');c.font=(plain?'400 14px':'500 16px')+' Inter';return c.measureText(children).width;},{children,plain});
 assert(label.width>=measured,'Divider label must fit the actual font: '+children);
 assert.equal(label.textGrowth,'auto','Divider labels must retain official nowrap behavior');
 comparisons++;
}
for(const name of ['Flex','Space'])for(const vertical of [false,true])for(const gap of [8,16,24])for(const align of ['start','center','end']){const width=740,height=240,props={...slots,vertical,gap:String(gap),size:String(gap),align:name==='Flex'?'flex-'+align:align};if(align==='center')props.align='center';const actual=await page.evaluate(({name,vertical,gap,align,width,height})=>{const E=React.createElement,ps=name==='Flex'?{vertical,gap,align:align==='center'?'center':'flex-'+align}:{vertical,size:gap,align};ReactDOM.render(E(antd[name],{...ps,style:{width,height}},[1,2,3,4].map(k=>E('div',{key:k,style:{width:80,height:40,flexShrink:0}},k))),document.getElementById('root'));const parent=document.getElementById('root').firstElementChild,p=parent.getBoundingClientRect();return [...parent.children].map(n=>{const b=(name==='Space'?n.firstElementChild:n).getBoundingClientRect();return{x:b.x-p.x,y:b.y-p.y,width:b.width,height:b.height}});},{name,vertical,gap,align,width,height});const expected=render(name,props,width,height).filter(n=>n.type==='script');for(let k=0;k<expected.length;k++)for(const key of ['x','y','width','height'])assert(Math.abs(expected[k][key]-actual[k][key])<1,`${name} ${vertical} ${align} ${gap} ${key}: ${expected[k][key]} vs ${actual[k][key]}`);comparisons++;}
for(const justify of ['start','center','end','space-between','space-around','space-evenly']){const props={...row,span1:4,span2:4,col3:'',col4:'',justify,gutter:16};const actual=await page.evaluate(justify=>{const E=React.createElement;ReactDOM.render(E(antd.Row,{justify,gutter:16,style:{width:740,height:40,margin:0}},[1,2].map(k=>E(antd.Col,{span:4,key:k},E('div',{style:{height:40}})))),document.getElementById('root'));let p=document.querySelector('.ant-row').getBoundingClientRect();return [...document.querySelectorAll('.ant-col')].map(n=>{let r=n.getBoundingClientRect();return{x:r.x-p.x,width:r.width};});},justify);const expected=render('Row',props,740,40);expected.forEach((n,k)=>{assert(Math.abs(n.x-actual[k].x)<1);assert(Math.abs(n.width-actual[k].width)<1);});comparisons++;}
for(const vertical of [false,true])for(const size1 of [25,50,70]){const actual=await page.evaluate(({vertical,size1})=>{const E=React.createElement;ReactDOM.render(E(antd.Splitter,{vertical,style:{width:740,height:240}},E(antd.Splitter.Panel,{size:size1+'%'},'First'),E(antd.Splitter.Panel,{size:100-size1+'%'},'Second')),document.getElementById('root'));const p=document.querySelector('.ant-splitter').getBoundingClientRect();return [...document.querySelectorAll('.ant-splitter-panel')].map(n=>{const r=n.getBoundingClientRect();return{x:r.x-p.x,y:r.y-p.y,width:r.width,height:r.height}});},{vertical,size1});const expected=render('Splitter',{...splitter,vertical,size1,size2:100-size1},740,240).filter(n=>n.type==='script');for(let k=0;k<2;k++)for(const key of ['x','y','width','height'])assert(Math.abs(expected[k][key]-actual[k][key])<1,`Splitter ${key}`);comparisons++;}
for(const columns of [2,3,4]){const actual=await page.evaluate(async columns=>{const E=React.createElement,heights=[100,60,140,80,120,90,160,70];ReactDOM.render(E(antd.Masonry,{columns,gutter:16,items:heights.map((height,key)=>({key,height,data:{},children:E('div',{style:{height}},String(key))})),style:{width:740}}),document.getElementById('root'));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));let parent=document.querySelector('.ant-masonry'),p=parent.getBoundingClientRect();return [...parent.children].map(n=>{const r=n.getBoundingClientRect();return{x:r.x-p.x,y:r.y-p.y,width:r.width,height:r.height}});},columns);const expected=render('Masonry',{...masonry,columns,gutter:16,verticalGutter:16},740,600);for(let k=0;k<8;k++)for(const key of ['x','y','width','height'])assert(Math.abs(expected[k][key]-actual[k][key])<1,`Masonry ${columns} ${key} ${k}`);comparisons++;}
for(const size of ['small','middle','large']){const actual=await page.evaluate(size=>{ReactDOM.render(React.createElement(antd.Divider,{size,style:{width:740}}),document.getElementById('root'));const n=document.querySelector('.ant-divider'),s=getComputedStyle(n);return{margin:parseFloat(s.marginTop),color:s.borderTopColor,width:parseFloat(s.borderTopWidth)};},size);const n=render('Divider',{size},740,49)[0];assert.equal(n.y,actual.margin);assert.equal(n.height,actual.width);comparisons++;}
for(const collapsed of [false,true]){const actual=await page.evaluate(async collapsed=>{const E=React.createElement;ReactDOM.render(E(antd.Layout,{style:{width:740,height:300}},E(antd.Layout.Header),E(antd.Layout,null,E(antd.Layout.Sider,{collapsed,collapsible:true},'Sider'),E(antd.Layout.Content,'Content')),E(antd.Layout.Footer,{style:{height:70}},'Footer')),document.getElementById('root'));await new Promise(r=>setTimeout(r,250));const p=document.querySelector('.ant-layout').getBoundingClientRect();return Object.fromEntries(['header','sider','content','footer'].map(key=>{const b=document.querySelector('.ant-layout-'+key).getBoundingClientRect();return[key,{x:b.x-p.x,y:b.y-p.y,width:b.width,height:b.height}]}));},collapsed);const expected=render('Layout',{...layout,hasSider:true,collapsed},740,300).filter(n=>n.type==='script');for(const n of expected)for(const key of ['x','y','width','height'])assert(Math.abs(n[key]-actual[n.name.toLowerCase()][key])<1,`Layout ${n.name} ${key}: ${n[key]} vs ${actual[n.name.toLowerCase()][key]}`);comparisons++;}
for(const orientation of ['horizontal','vertical'])for(const placement of ['start','middle','end']){const n=render('Button',{children:'Save',compactPlacement:placement,compactOrientation:orientation},80,32)[0];assert.deepEqual(n.cornerRadius,placement==='middle'?0:orientation==='vertical'?(placement==='start'?[6,6,0,0]:[0,0,6,6]):(placement==='start'?[6,0,0,6]:[0,6,6,0]));}
console.log(`PASS: ${count} Layout state snapshots and ${comparisons} browser geometry comparisons; 6 imported Masonry scenes and 24-button wrap verified.`);
}finally{await browser.close();}
