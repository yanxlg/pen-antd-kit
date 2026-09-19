import {readFile} from 'node:fs/promises';
export const manifest=JSON.parse(await readFile(new URL('../registry/canvas-composition.json',import.meta.url),'utf8'));
export const renderButton=new Function('pencil',await readFile(new URL('../canvas-components/Button.js',import.meta.url),'utf8'));
export function buttonInstance({children='',icon=null,childrenContent=null,...props}={},placement={}) {
 if(typeof children!=='string')throw new Error('Plain children must be a string; use childrenContent for a reusable rich-content instance');
 if(icon&&(icon.type!=='script'||!icon.scriptUri))throw new Error('icon must be an independent component instance');
 if(childrenContent&&!childrenContent.type)throw new Error('childrenContent must be local content or a component instance');
 const {resolvedWidth,...position}=placement;
 const inputs={...props,children,icon:icon?JSON.stringify(icon):'',childrenContent:childrenContent?JSON.stringify(childrenContent):''};
 const surface=renderButton({input:inputs,width:typeof placement.width==='number'?placement.width:resolvedWidth})[0];
 return {type:'script',scriptUri:'../canvas-components/Button.js',name:'Button',...position,width:placement.width==='fill_container'?'fill_container':surface.width,height:surface.height,inputs};
}
export function buttonChildren(instance){return instance.inputs.childrenContent?JSON.parse(instance.inputs.childrenContent):instance.inputs.children;}
export function buttonProps(instance){const {icon,childrenContent,...props}=instance.inputs;return {...props,icon:icon?JSON.parse(icon):null,...(childrenContent?{childrenContent:JSON.parse(childrenContent)}:{})};}
