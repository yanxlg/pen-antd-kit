import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { setup } from './floatbutton-browser.mjs';
const browser=await chromium.launch({channel:'chrome'});
try {
  const page=await browser.newPage();await setup(page);
  const widths=await page.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');c.font='400 12px Inter';return Object.fromEntries(Array.from('0123456789+').map(ch=>[ch,c.measureText(ch).width]));});
  const template=await readFile(new URL('./templates/Badge.runtime.js',import.meta.url),'utf8');
  await writeFile(new URL('../canvas-components/Badge.js',import.meta.url),template.replace('// GENERATED_DATA',`const widths=${JSON.stringify(widths)};`));
  const wrapper=await readFile(new URL('./templates/Badge.wrapper.runtime.js',import.meta.url),'utf8');
  await writeFile(new URL('../canvas-components/Badge.wrapper.js',import.meta.url),wrapper.replace('// GENERATED_DATA',`const widths=${JSON.stringify(widths)};`));
  console.log('Generated Badge indicator and Inspector wrapper.');
} finally { await browser.close(); }
