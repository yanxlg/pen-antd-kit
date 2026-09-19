import {loadTypographyFonts} from './typography-fonts.mjs';
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const antdRequire = createRequire(require.resolve('antd'));
const iconRequire = createRequire(antdRequire.resolve('@ant-design/icons'));
const definitions = iconRequire('@ant-design/icons-svg/lib/index.js');
const {theme} = require('antd');
const hex = value => value.replace(/rgba?\(([^)]+)\)/, (_, body) => '#' + body.split(',').map((v,n) => Math.round(n===3?Number(v)*255:Number(v)).toString(16).padStart(2,'0')).join('')).toUpperCase();
const colors = t => Object.fromEntries(['colorText','colorTextDescription','colorTextDisabled','colorSuccessText','colorWarningText','colorErrorText','colorLink','colorLinkHover','colorLinkActive','colorBgContainer','colorBorder','colorPrimary'].map(k => [k,hex(t[k])]));
const tokens = {light:colors(theme.getDesignToken()),dark:colors(theme.getDesignToken({algorithm:theme.darkAlgorithm}))};
const icons = Object.fromEntries(['EditOutlined','CopyOutlined','CheckOutlined','EnterOutlined','HighlightOutlined','SmileOutlined','SmileFilled'].map(n=>{const s=definitions[n].icon;return[n,{viewBox:s.attrs.viewBox.split(' ').map(Number),paths:s.children.map(c=>c.attrs.d)}]}));
const browser = await chromium.launch({channel:'chrome'});
const page = await browser.newPage();
await loadTypographyFonts(page);
const metrics = await page.evaluate(()=>{
  const c=document.createElement('canvas').getContext('2d'); const result={};
  const size=100;for(const family of ['Inter','Roboto Mono'])for(const weight of [400,600])for(const italic of [false,true]){
    const key=[family,weight,italic?1:0].join(':'); c.font=`${italic?'italic ':''}${weight} ${size}px ${family}`;
    c.fontKerning="normal"; const widths={},pairs={}; const chars=Array.from({length:224},(_,n)=>String.fromCharCode(n+32));chars.push('…','—','·','“','”','‘','’');
    for(const ch of chars)widths[ch]=c.measureText(ch).width/size;
    for(const a of chars.slice(0,95))for(const b of chars.slice(0,95)){const d=c.measureText(a+b).width/size-widths[a]-widths[b];if(Math.abs(d)>0.0001)pairs[a+b]=d;}
    result[key]={widths,pairs};
  }
  return result;
});
// Measure inline decoration boxes against the CSS rules in Typography/style/mixins.
await page.setContent('<!doctype html><div id="fixture"></div><style>body{margin:0}code,kbd{font-family:"Roboto Mono";margin:0 .2em;padding:.2em .4em .1em;font-size:85%;border:1px solid;border-radius:3px}kbd{padding-top:.15em;font-size:90%;border-bottom-width:2px}mark{padding:0}</style>');
const boxes=await page.evaluate(()=>{
 const result={};const fixture=document.querySelector('#fixture');
 for(const [fs,lh] of [[14,22],[16,24],[20,28],[24,32],[30,38],[38,46]])for(const weight of [400,600])for(const italic of [false,true])for(let flags=0;flags<8;flags++){
  const host=document.createElement('div');host.style.cssText=`font:${italic?'italic ':''}${weight} ${fs}px/${lh/fs} Inter`;
  let inner=document.createElement('span');inner.textContent='Ant Design';const text=inner;
  for(const [flag,tag]of [[1,'code'],[2,'mark'],[4,'kbd']])if(flags&flag){const wrapper=document.createElement(tag);wrapper.append(inner);inner=wrapper;}
  host.append(inner);const marker=document.createElement('span');marker.style.cssText='display:inline-block;width:0;height:0';host.append(marker);fixture.replaceChildren(host);
  const root=host.getBoundingClientRect();const tr=text.getBoundingClientRect();
  const bg=[...host.querySelectorAll('code,kbd,mark')].map(n=>{const r=n.getBoundingClientRect();return{kind:n.tagName.toLowerCase(),x:r.x-root.x,y:r.y-root.y,extra:r.width-tr.width,height:r.height};});
  result[[fs,weight,italic?1:0,flags].join(':')]={edge:tr.x-root.x,baseline:marker.getBoundingClientRect().y-root.y,boxes:bg};
 }
 return result;
});
await browser.close();
const template=await readFile(new URL('./templates/Typography.runtime.js',import.meta.url),'utf8');
for(const comp of ['Typography','Typography.Text','Typography.Title','Typography.Paragraph','Typography.Link']){
  const code=template.replace('__DEFAULT_COMPONENT__',comp.split('.')[1]||'Text').replace('// GENERATED_DATA',`const metrics=${JSON.stringify(metrics)};\nconst boxes=${JSON.stringify(boxes)};\nconst tokens=${JSON.stringify(tokens)};\nconst icons=${JSON.stringify(icons)};`);
  await writeFile(new URL(`../canvas-components/${comp}.js`,import.meta.url),code);
}
console.log('Generated Typography and four exports from one renderer, official theme tokens and icons, measured Inter/Roboto Mono metrics.');
