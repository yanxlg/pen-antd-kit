import{chromium}from'@playwright/test';
import{readFile,writeFile}from'node:fs/promises';
import{setup,sample}from'./floatbutton-browser.mjs';
const hex=s=>s.replace(/rgba?\(([^)]+)\)/,(_,body)=>'#'+body.split(',').map((v,n)=>Math.round(n===3?Number(v)*255:Number(v)).toString(16).padStart(2,'0')).join('')).toUpperCase();
const browser=await chromium.launch({channel:'chrome'}),page=await browser.newPage();await setup(page);
const styles={};for(const type of ['default','primary'])for(const state of ['normal','hover','active','disabled']){const s=await sample(page,{type,disabled:state==='disabled'},state==='disabled'?'normal':state);styles[type+':'+state]={bg:hex(s.bg),color:hex(s.color),border:hex(s.border)};}
const widths=await page.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');c.font='400 12px Inter';c.fontKerning='normal';return Object.fromEntries(Array.from({length:224},(_,n)=>{const ch=String.fromCharCode(n+32);return[ch,c.measureText(ch).width]}));});await browser.close();
const iconValues=JSON.parse(await readFile(new URL('../registry/icon-component-values.json',import.meta.url),'utf8'));
let code=await readFile(new URL('./templates/FloatButton.runtime.js',import.meta.url),'utf8');code=code.replace('// GENERATED_DATA',`const iconValues=${JSON.stringify(iconValues)};\nconst styles=${JSON.stringify(styles)};\nconst widths=${JSON.stringify(widths)};`);await writeFile(new URL('../canvas-components/FloatButton.js',import.meta.url),code);await writeFile(new URL('../canvas-components/FloatButton.metrics.json',import.meta.url),JSON.stringify({styles},null,2)+'\n');console.log('Generated FloatButton root Inspector renderer and composition styles.');
