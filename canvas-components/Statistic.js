/**
 * @schema 2.18
 * @input title: string = "Active Users"
 * @input value: string = "112893"
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input precision: number = 0
 * @input decimalSeparator: string = "."
 * @input groupSeparator: string = ","
 * @input loading: boolean = false
 * @input styles: string = "{}"
 * @input valueStyle: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[],parse=(v,d)=>{try{return typeof v==='string'?JSON.parse(v):v??d}catch{return d}},embed=n=>{if(!n||typeof n!=='object')return n;if(n.type==='ref'&&(n.scriptUri||n.ref==='antd-icon-live-origin')){const {ref,...rest}=n;return {...rest,type:'script',scriptUri:n.scriptUri||'../canvas-components/Icon.js'};}return n;},styles=parse(i.styles,{}),root=styles.root||{},vs={...parse(i.valueStyle,{}),...styles.content},padding=Number(root.padding)||0,fs=Number(vs.fontSize)||24,color=vs.color||'#000000E0';
const text=(content,x,y,width,height=22,size=14,fill='#000000E0')=>({type:'text',content:String(content),x,y,width:Math.max(1,width),height,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:size,fill,textAlignVertical:'middle'});
if(root.backgroundColor||root.background)nodes.push({type:'rectangle',x:0,y:0,width:W,height:H,cornerRadius:root.borderRadius||0,fill:root.backgroundColor||root.background,stroke:root.borderColor||'#00000000',strokeWidth:root.borderColor?1:0});
if(i.title)nodes.push(text(i.title,padding,padding,W-padding*2,22,14,styles.title?.color||'#00000073'));if(styles.title?.fontWeight)nodes[nodes.length-1].fontWeight=String(styles.title.fontWeight);
const y=padding+(i.title?26:0);
if(i.loading){nodes.push({type:'rectangle',x:padding,y:y+16,width:W-padding*2,height:16,fill:'#F0F0F0',cornerRadius:4});return nodes;}
const num=Number(String(i.value??0).replaceAll(',',''));let val=Number.isFinite(num)?num.toFixed(Math.max(0,Math.min(12,i.precision||0))):String(i.value);let parts=val.split('.');parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,i.groupSeparator??',');val=parts.join(i.decimalSeparator||'.');
let x=padding;const prefix=embed(parse(i.prefix,null)),suffix=embed(parse(i.suffix,null));
if(prefix?.type){const w=Number(prefix.width)||fs;nodes.push({...prefix,x,y:y+(38-(Number(prefix.height)||fs))/2});x+=w+4;}else if(i.prefix){const w=String(i.prefix).length*fs*.58;nodes.push(text(i.prefix,x,y,w,38,fs,color));x+=w+4;}
const vp=Number(styles.value?.paddingInline)||0,vw=Math.max(1,[...val].reduce((w,c)=>w+fs*(/[.,]/.test(c)?.292:c==='-'?.33:.583),0));if(styles.value?.backgroundColor)nodes.push({type:'rectangle',x,y:y+4,width:vw+vp*2,height:30,fill:styles.value.backgroundColor,cornerRadius:styles.value.borderRadius||0});nodes.push(text(val,x+vp,y,vw,38,fs,styles.value?.color||color));x+=vw+vp*2;
if(suffix?.type)nodes.push({...suffix,x:x+4,y:y+(38-(Number(suffix.height)||fs))/2});else if(i.suffix)nodes.push(text(i.suffix,x+4,y,W-x-padding-4,38,fs,color));
return nodes;
