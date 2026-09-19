import {chromium} from '@playwright/test';
import fs from 'node:fs';
const pages=JSON.parse(fs.readFileSync('artifacts/feedback-other/imports.json'));
const browser=await chromium.launch({headless:true,channel:'chrome'});
for(const p of pages){
 const page=await browser.newPage({viewport:{width:2400,height:1400}});
 try{
 await page.goto(`https://ant.design/components/${p.slug}/`,{waitUntil:'domcontentloaded'});await page.locator('.code-box-demo').first().waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(2500);
 const data=await page.evaluate(()=>{
 const kinds=['ant-alert','ant-btn','ant-progress','ant-result','ant-skeleton','ant-spin','ant-watermark','ant-affix','ant-border-beam','ant-switch','ant-radio-group','ant-input','ant-select','ant-checkbox-wrapper','ant-float-btn'];
 const selector=kinds.map(k=>'.'+k).join(',');
 const clean=s=>s.replace(/\s+/g,' ').trim();
 const txt=e=>clean(e.textContent||'');
 const records=[];
 for(const demo of document.querySelectorAll('.code-box-demo')){
 const card=demo.closest('.code-box'),title=card?.querySelector('.code-box-title a')?.textContent;
 for(const el of demo.querySelectorAll(selector)){
 const cs=getComputedStyle(el),rect=el.getBoundingClientRect();if(!rect.width||!rect.height)continue;
 const kind=kinds.find(k=>el.classList.contains(k));
 const rootAncestor=el.parentElement?.closest(selector);
 const classes=[...el.classList];const style={};for(const k of ['color','backgroundColor','borderColor','borderRadius','fontSize','lineHeight','padding','gap','width','height'])style[k]=cs[k];
 const content={};for(const [key,sel] of Object.entries({title:'.ant-alert-title,.ant-alert-message,.ant-result-title',description:'.ant-alert-description,.ant-result-subtitle',extra:'.ant-result-extra',paragraph:'.ant-skeleton-paragraph',progress:'.ant-progress-text'}))content[key]=el.querySelector(sel)?.textContent||'';
 const icons=[...el.querySelectorAll('[role="img"][aria-label]')].map(e=>e.getAttribute('aria-label'));
 const texts=[];const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);while(walker.nextNode()){const s=clean(walker.currentNode.textContent);if(s)texts.push(s)}
 records.push({kind,classes,text:txt(el),texts,style,width:rect.width,height:rect.height,demo:card?.id,title,icons,content,childClasses:[...el.querySelectorAll('[class]')].map(x=>x.className?.baseVal||x.className),nested:!!rootAncestor&&demo.contains(rootAncestor),parentKind:rootAncestor?kinds.find(k=>rootAncestor.classList.contains(k)):null,checked:el.getAttribute('aria-checked'),placeholder:el.getAttribute('placeholder'),value:el.value||'',ariaNow:el.getAttribute('aria-valuenow')||el.querySelector('[aria-valuenow]')?.getAttribute('aria-valuenow')});
 }
 }
 return {url:location.href,width:document.querySelector('.demo-wrapper')?.getBoundingClientRect().width,records,titles:[...document.querySelectorAll('.code-box-title a')].map(e=>e.textContent)};
 });fs.writeFileSync(`artifacts/feedback-other/${p.slug}-official.json`,JSON.stringify(data,null,2));console.log(p.slug,data.records.length,data.titles.length,data.width);
 }finally{await page.close()}
}
await browser.close();
