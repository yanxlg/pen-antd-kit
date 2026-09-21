/**
 * @schema 2.18
 * @input options: string = "Daily|Weekly|Monthly"
 * @input value: string = "Daily"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input disabled: boolean = false
 * @input block: boolean = false
 * @input vertical: boolean = false
 * @input orientation: enum("horizontal", "vertical") = "horizontal"
 * @input shape: enum("default", "round") = "default"
 * @input styles: string = "{}"
 * @input name: string = ""
 */
const i=pencil.input||{}, W=Math.max(1,pencil.width), canvasH=Math.max(1,pencil.height);
const parse=(v,d)=>{try{return typeof v==='string'?JSON.parse(v):v??d}catch{return d}};
let options=parse(i.options,null);if(!Array.isArray(options))options=String(i.options||'Daily|Weekly|Monthly').split('|');
options=options.map(o=>typeof o==='object'?o:{label:String(o),value:o});
const styles=parse(i.styles,{}),root=styles.root||{},vertical=i.vertical||i.orientation==='vertical',h=i.size==='small'?24:i.size==='large'?40:32,font=i.size==='large'?16:14,pad=Number(root.padding??2),radius=i.shape==='round'?999:root.borderRadius??(i.size==='large'?8:i.size==='small'?4:6);
const itemH=Math.max(h-4,...options.map(o=>Number(o.style?.height)||0)),H=pad*2+itemH*(vertical?options.length:1);
const box=(x,y,width,height,fill,r)=>({type:'rectangle',x,y,width,height,fill,cornerRadius:r});
const nodes=[box(0,0,W,H,root.backgroundColor||'#F5F5F5',radius)];
let cursor=pad;
options.forEach((o,index)=>{
 const label=parse(o.label,o.label),rich=label&&typeof label==='object',disabled=i.disabled||o.disabled,selected=String(o.value)===String(i.value??options[0]?.value),style=o.style||{},cellW=vertical?W-pad*2:i.block?(W-pad*2)/options.length:Number(style.width)||((rich?Number(label.width)||32:String(label??'').length*font*.53)+(o.icon?20:0)+(i.size==='small'?14:22)),cellH=vertical?Number(style.height)||(H-pad*2)/options.length:H-pad*2,x=vertical?pad:cursor,y=vertical?cursor:pad;
 if(selected)nodes.push({...box(x,y,cellW,cellH,styles.itemSelected?.backgroundColor||'#FFFFFF',i.shape==='round'?999:Math.max(2,radius-2)),effect:{type:'shadow',shadowType:'outer',color:'#00000014',offset:{x:0,y:1},blur:3,spread:0}});
 const color=disabled?'#00000040':selected?'#000000E0':'#000000A6';
 if(rich){nodes.push({...label,x:x+(cellW-Number(label.width||cellW))/2,y:y+(cellH-Number(label.height||cellH))/2});}
 else {
  let icon=parse(o.icon,null);const tw=Math.max(0,String(label??'').length*font*.53),iw=icon?font+6:0,start=x+(cellW-tw-iw)/2;
  if(icon)nodes.push({...icon,x:start,y:y+(cellH-font)/2,width:font,height:font});
  if(label)nodes.push({type:'text',content:String(label),x:x+iw,y,width:cellW-iw,height:cellH,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:font,fill:color,textAlign:'center',textAlignVertical:'middle'});
 }
 cursor+=vertical?cellH:cellW;
});
return nodes;
