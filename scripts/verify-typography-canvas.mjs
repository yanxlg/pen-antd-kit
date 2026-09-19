import {loadTypographyFonts} from './typography-fonts.mjs';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';
const require=createRequire(import.meta.url), ar=createRequire(require.resolve('antd'));
const source=await readFile(new URL('../canvas-components/Typography.js',import.meta.url),'utf8');
const render=new Function('pencil',source);
const browser=await chromium.launch({channel:'chrome'});
try {
const page=await browser.newPage();await page.setContent('<!doctype html><div id="root"></div>'); await page.addStyleTag({path:require.resolve('antd/dist/reset.css')});
for(const path of [require.resolve('react/package.json').replace('package.json','umd/react.development.js'),require.resolve('react-dom/package.json').replace('package.json','umd/react-dom.development.js'),ar.resolve('dayjs/dayjs.min.js'),require.resolve('antd/dist/antd.min.js')])await page.addScriptTag({path});
await loadTypographyFonts(page);
const cases=[{}, {code:true},{keyboard:true},{mark:true},{strong:true},{italic:true},{underline:true},{delete:true},{disabled:true},{type:'secondary'},{type:'warning'},{type:'danger'},{component:'Link'}, {code:true,keyboard:true,mark:true}, {component:'Title',level:1,code:true}, {component:'Title',level:3,keyboard:true},...[1,2,3,4,5].map(level=>({component:'Title',level,editable:true,copyable:true})),{editable:true,copyable:true,disabled:true},{copyable:true,actionsPlacement:'start'}];
let checks=0;
for(const props of cases){
 const input={content:'Ant Design Wi. AV',...props};
 const actual=render({input,width:1000,height:100});
 const expected=await page.evaluate(async input=>{
  const p={...input,level:Number(input.level)||undefined,actions:{placement:input.actionsPlacement||'end'},style:{margin:0}};delete p.component;delete p.content;
  ReactDOM.render(React.createElement(antd.ConfigProvider,{theme:{token:{fontFamily:'Inter',fontFamilyCode:'Roboto Mono'}}},React.createElement('div',{style:{fontFamily:'Inter',fontSize:14,lineHeight:'22px'},id:'sample'},React.createElement(antd.Typography[input.component||'Text'],p,input.content))),document.getElementById('root'));
  await new Promise(r=>requestAnimationFrame(r));
  const root=document.querySelector('#sample'),base=root.getBoundingClientRect(),typo=root.firstElementChild;
  const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x-base.x,y:r.y-base.y,w:r.width,h:r.height};};
  const c=getComputedStyle(typo);const inline=typo.querySelector('code,kbd,mark');
  const text=inline||typo;const range=document.createRange();range.selectNodeContents(text);if(!inline)range.setEnd(text,text.childNodes[0]?.nodeType===3?1:0);
  return {color:c.color,fs:c.fontSize,font:c.font,ls:c.letterSpacing,features:c.fontFeatureSettings,kerning:c.fontKerning,render:c.textRendering,bg:inline?{...rect(inline),color:getComputedStyle(inline).backgroundColor}:null,buttons:[...typo.querySelectorAll('button')].map(n=>({margin:getComputedStyle(n).margin,...rect(n)})),icons:[...typo.querySelectorAll('button svg')].map(rect),textWidth:range.getBoundingClientRect().width};
 },input);
 const hex=value=>value.replace(/rgba?\(([^)]+)\)/,(_,body)=>'#'+body.split(',').map((v,n)=>Math.round(n===3?Number(v)*255:Number(v)).toString(16).padStart(2,'0')).join('')).toUpperCase();
 const text=actual.find(n=>n.type==='text');
 if(!input.mark)assert.equal(text.fill.toUpperCase(),hex(expected.color));
 assert.equal(text.underline,!!input.underline);assert.equal(text.strikethrough,!!input.delete);
 const paths=actual.filter(n=>n.type==='path');assert.equal(paths.length,expected.icons.length);
 paths.forEach((p,n)=>{for(const [key,val]of [['x',expected.icons[n].x],['y',expected.icons[n].y],['width',expected.icons[n].w]])assert.ok(Math.abs(p[key]-val)<1,`${JSON.stringify(props)} icon ${key}: ${p[key]} != ${val}`);});
 if(expected.bg){const bg=actual.find(n=>n.type==='rectangle');assert.ok(Math.abs(bg.width-expected.bg.w)<.3,`background width ${JSON.stringify(props)}: ${bg.width} != ${expected.bg.w}`);assert.ok(Math.abs(bg.height-expected.bg.h)<1,`background height ${JSON.stringify(props)}`);assert.ok(Math.abs(bg.y-expected.bg.y)<1,`background y ${JSON.stringify(props)}: ${bg.y} != ${expected.bg.y}`);}
 for(const n of actual){assert.ok(!('textDecoration'in n));assert.match(n.fill,/^#[\da-f]{6}([\da-f]{2})?$/i);for(const p of ['x','y','width','height'])if(n[p]!==undefined)assert.ok(Number.isFinite(n[p]));}
 checks++;
}
for(const width of [200,320,720])for(const rows of [1,2,3])for(const theme of ['light','dark']){
 const input={component:'Paragraph',content:'Ant Design, a design language for background applications. '.repeat(10),ellipsis:true,rows,editable:true,copyable:true,expandable:true,theme};
 const output=render({input,width,height:rows*22});const text=output.filter(n=>n.type==='text'&&n.name==='Text');assert.equal(text.length,rows);assert.match(text.at(-1).content,/…$/);for(const path of output.filter(n=>n.type==='path'))assert.ok(path.x+path.width<=width+.1);checks++;
}
assert.ok(render({input:{content:'Ant Design',editable:true,editing:true},width:320,height:54}).some(n=>n.name==='Editing surface'));
assert.ok(render({input:{content:'Ant Design',copyable:true,copied:true}}).some(n=>n.name==='CheckOutlined'));
const wrapped=render({input:{component:'Paragraph',content:'Some content that should wrap onto several lines for checking.',editable:true},width:180});assert.ok(wrapped.find(n=>n.type==='path').y>22);
for(const comp of ['Text','Title','Paragraph','Link']){const entry=await readFile(new URL(`../canvas-components/Typography.${comp}.js`,import.meta.url),'utf8');assert.ok(entry.includes(`= "${comp}"`));assert.doesNotThrow(()=>new Function('pencil',entry)({input:{component:comp},width:400,height:50}));}
const nativeWidths=JSON.parse(await readFile(new URL('./fonts/pencil-typography-widths.json',import.meta.url),'utf8'));
const measured=new Function('pencil',source.replace(/return nodes;\s*$/,'return {nodes,measure};'));
for(const sample of nativeWidths){
 const input={content:sample.content,code:sample.fontFamily==='Roboto Mono'&&sample.fontSize===11.9,keyboard:sample.fontFamily==='Roboto Mono'&&sample.fontSize===12.6};
 const result=measured({input,width:2000,height:22});
 assert.equal(result.nodes.find(n=>n.type==='text').fontFamily,sample.fontFamily);
 assert.ok(Math.abs(Math.ceil(result.measure(sample.content))-sample.width)<=1,`Pencil text width: ${sample.content}`);
}
for(const [content,width]of [['Ant Design Typography',156],['Disabled content, available actions',230]]){
 const result=render({input:{content,editable:true,copyable:true},width:432,height:22});
 assert.ok(result.find(n=>n.type==='path').x>=width+3,'Action must clear Pencil text bounds');
}
console.log(`PASS: ${checks} official browser geometry and canvas overflow cases; decorations, disabled actions, state rendering, light/dark colors, exports, and ${nativeWidths.length} Pencil-measured text runs.`);
} finally {await browser.close();}
