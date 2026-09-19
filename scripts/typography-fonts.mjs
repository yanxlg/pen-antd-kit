import {readFile} from 'node:fs/promises';
export async function loadTypographyFonts(page) {
 const fonts=JSON.parse(await readFile(new URL('./fonts/typography.json',import.meta.url),'utf8'));
 for(const font of fonts){
 const data=(await readFile(new URL('./fonts/'+font.file,import.meta.url))).toString('base64');
 await page.evaluate(async ({font,data})=>{const face=new FontFace(font.family,`url(data:font/ttf;base64,${data})`,{weight:font.weight,style:font.style});await face.load();document.fonts.add(face);},{font,data});
 }
 await page.evaluate(()=>document.fonts.ready);
}
