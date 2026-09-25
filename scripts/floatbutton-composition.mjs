import {readFile} from 'node:fs/promises';
export const manifest=JSON.parse(await readFile(new URL('../registry/canvas-composition.json',import.meta.url),'utf8'));
export const renderFloatButton=new Function('pencil',await readFile(new URL('../canvas-components/FloatButton.js',import.meta.url),'utf8'));
export const renderBadge=new Function('pencil',await readFile(new URL('../canvas-components/Badge.wrapper.js',import.meta.url),'utf8'));
export const renderIndicator=new Function('pencil',await readFile(new URL('../canvas-components/Badge.js',import.meta.url),'utf8'));
export function iconInstance(name){if(!manifest.iconRefs[name])throw new Error('Unknown Icon '+name);return {type:'script',scriptUri:'../canvas-components/Icon.js',name,inputs:{type:name,name}};}
export function floatButtonInstance({icon=iconInstance('FileTextOutlined'),...props}={},placement={}){
 if(icon&&(icon.type!=='script'||!icon.scriptUri))throw new Error('icon must be an independent component instance');
 const inputs={shape:'circle',type:'default',state:'normal',...props,icon:icon?JSON.stringify(icon):''};
 const box=renderFloatButton({input:inputs})[0];
 return {type:'script',scriptUri:'../canvas-components/FloatButton.js',name:'FloatButton',width:box.width,height:box.height,...placement,inputs};
}
export function badgeInstance({offset=[0,0],...props},child,placement={}){
 if(child.type!=='script'||!child.scriptUri)throw new Error('Badge children must be an independent component instance');
 return {type:'script',scriptUri:'../canvas-components/Badge.wrapper.js',name:'Badge',width:child.width||40,height:child.height||40,...placement,inputs:{...props,children:JSON.stringify(child),offsetX:offset[0],offsetY:offset[1]}};
}
export function floatButtonBadgeOffset(shape,dot){const offset=(shape==='square'?(dot?6:0):16)*(1-1/Math.SQRT2);return [-1-offset,1+offset];}
