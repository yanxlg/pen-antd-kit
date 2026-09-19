import {chromium} from '@playwright/test';import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:2400,height:1400}});
for(const slug of ['watermark','border-beam','affix','app','float-button']){
 await page.goto('https://ant.design/components/'+slug+'/');await page.locator('.code-box-demo').first().waitFor();await page.waitForTimeout(4000);
 const data=await page.locator('.demo-wrapper .code-box').evaluateAll(cards=>cards.map(c=>({id:c.id,title:c.querySelector('.code-box-title')?.textContent,html:c.querySelector('.code-box-demo')?.innerHTML,iframes:[...c.querySelectorAll('iframe')].map(x=>x.src)})));
 fs.writeFileSync('artifacts/feedback-other/'+slug+'-special.json',JSON.stringify(data,null,2));console.log(slug,data.map(x=>({id:x.id,title:x.title,iframes:x.iframes})));
}
await browser.close();
