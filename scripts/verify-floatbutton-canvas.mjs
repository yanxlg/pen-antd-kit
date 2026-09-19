import assert from'node:assert/strict';import{readFile}from'node:fs/promises';import{chromium}from'@playwright/test';import{setup,sample}from'./floatbutton-browser.mjs';import{createRequire}from'node:module';
const require=createRequire(import.meta.url),ar=createRequire(require.resolve('antd')),ir=createRequire(ar.resolve('@ant-design/icons')),defs=ir('@ant-design/icons-svg/lib/index.js');
import {manifest,iconInstance,floatButtonInstance,badgeInstance,floatButtonBadgeOffset,renderFloatButton,renderBadge,renderIndicator} from './floatbutton-composition.mjs';
const {components}=manifest;
const renderIcon=new Function('pencil',await readFile(new URL('../canvas-components/Icon.js',import.meta.url),'utf8'));
function fixture(input={}) {
 const {icon,badge,badgeDot,badgeColor,isBackTop,...props}=input;
 const name=icon||(isBackTop?'VerticalAlignTopOutlined':props.shape==='square'&&props.content?'':'FileTextOutlined');
 const node=floatButtonInstance({...props,icon:name?iconInstance(name):null});
 return {node,badge:badgeDot||badge>0?{count:badge||0,dot:!!badgeDot,color:badgeColor||'#FF4D4F',overflowCount:99,offset:floatButtonBadgeOffset(props.shape,!!badgeDot)}:null};
}
function renderNode({node,badge}) {
 const layers=renderFloatButton({input:node.inputs});
 const output=layers.flatMap(n=>n.type==='script'?renderIcon({input:n.inputs,width:n.width,height:n.height}).map(p=>({...p,x:p.x+n.x,y:p.y+n.y})):n);
 if(badge){
  const wrapper=badgeInstance(badge,node);
  const indicator=renderBadge({input:wrapper.inputs,width:node.width,height:node.height}).find(n=>n.name==='Indicator');
  if(indicator)output.push(...renderIndicator({input:indicator.inputs}).map(n=>({...n,x:n.x+indicator.x,y:n.y+indicator.y})));
 }
 return output;
}
const render=pencil=>renderNode(fixture(pencil.input));
assert.equal(fixture({}).node.scriptUri,'../canvas-components/FloatButton.js');
assert.equal(renderFloatButton({input:fixture({}).node.inputs}).find(n=>n.type==='script').scriptUri,'../canvas-components/Icon.js');
assert.equal(renderFloatButton({input:fixture({}).node.inputs}).find(n=>n.type==='script').inputs.name,'FileTextOutlined');
assert.throws(()=>floatButtonInstance({icon:'FileTextOutlined'}),/component instance/);
assert.deepEqual(renderIndicator({input:{count:0}}),[]);
assert.equal(renderIndicator({input:{count:0,showZero:true}})[1].content,'0');
assert.equal(renderIndicator({input:{count:42,overflowCount:9}})[1].content,'9+');
assert.equal(renderIndicator({input:{dot:true,color:'#1677FF'}})[0].fill,'#1677FF');
const browser=await chromium.launch({channel:'chrome'}),page=await browser.newPage();await setup(page);let count=0;
const hex=s=>s.replace(/rgba?\(([^)]+)\)/,(_,body)=>'#'+body.split(',').map((v,n)=>Math.round(n===3?Number(v)*255:Number(v)).toString(16).padStart(2,'0')).join('')).toUpperCase();
try{for(const shape of ['circle','square'])for(const type of ['default','primary'])for(const state of ['normal','hover','active','disabled','focus']){const input={shape,type,state:state==='disabled'?'normal':state,disabled:state==='disabled'},actual=render({input,width:40,height:40}),expected=await sample(page,input,input.state),box=actual[0],icon=actual.find(n=>n.type==='path');if(state==='focus'){const focus=actual.find(n=>n.name==='Keyboard focus ring');assert.equal(focus.strokeWidth,expected.outlineWidth);assert.equal(focus.stroke,hex(expected.outlineColor));}assert.equal(box.width,expected.width);assert.equal(box.height,expected.height);assert.equal(box.fill,hex(expected.bg));assert.equal(box.stroke,hex(expected.border));assert.equal(icon.width,expected.icon.width);assert.equal(icon.x,expected.icon.x);assert.equal(icon.y,expected.icon.y);assert.equal(icon.geometry,defs.FileTextOutlined.icon.children[0].attrs.d);count++;}
for(const input of [{shape:'square',content:'HELP INFO',icon:'FileTextOutlined'},{shape:'square',content:'HELP INFO'},{shape:'square',content:'HELP',icon:'FileTextOutlined'}]){const actual=render({input}),expected=await sample(page,{...input,icon:!!input.icon});assert.ok(Math.abs(actual[0].height-expected.height)<.1);const texts=actual.filter(n=>n.type==='text');assert.ok(Math.abs(texts[0].y-expected.text.y)<.1);assert.equal(texts.map(n=>n.content).join(' '),input.content);if(input.icon){const path=actual.find(n=>n.type==='path');assert.equal(path.width,expected.icon.width);assert.ok(Math.abs(path.y-expected.icon.y)<.1);}count++;}
for(const shape of ['circle','square'])for(const input of [{badgeDot:true},{badge:5},{badge:12},{badge:123}]){const actual=render({input:{shape,...input}}).find(n=>n.name==='Badge surface'),expected=(await sample(page,{shape,badge:input.badgeDot?{dot:true}:{count:input.badge}})).badge;for(const key of ['x','y','width','height'])assert.ok(Math.abs(actual[key]-expected[key])<.2,`badge ${shape} ${JSON.stringify(input)} ${key} ${actual[key]} ${expected[key]}`);count++;}
for(const shape of ['circle','square'])for(const progress of [0,25,50,100]){const output=render({input:{shape,isBackTop:true,showProgress:true,progress}});assert.equal(output.filter(n=>n.name==='BackTop progress').length,progress?1:0);assert.equal(output.find(n=>n.name==='VerticalAlignTopOutlined path 1').geometry,defs.VerticalAlignTopOutlined.icon.children[0].attrs.d);count++;}
assert.throws(()=>render({input:{icon:'not-an-icon'}}),/Unknown/);console.log(`PASS: ${count} FloatButton state, geometry, content, badge, SVG and progress cases; Inspector Badge → FloatButton → Icon references and Badge props verified.`);
}finally{await browser.close();}
