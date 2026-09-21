/**
 * @schema 2.18
 * @input title: string = "User Info"
 * @input extra: string = ""
 * @input items: string = "Product:Cloud Database|Billing Mode:Prepaid|Automatic Renewal:YES"
 * @input bordered: boolean = false
 * @input size: enum("small", "middle", "large") = "middle"
 * @input colon: boolean = true
 * @input layout: enum("horizontal", "vertical") = "horizontal"
 * @input column: number = 3
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),parse=(v,d)=>{try{return typeof v==='string'?JSON.parse(v):v??d}catch{return d}},styles=parse(i.styles,{}),root=styles.root||{},pad=Number(root.padding)||0,inner=W-pad*2,nodes=[],vertical=i.layout==='vertical',cols=Math.max(1,Number(i.column)||3);
let items=parse(i.items,null);if(!Array.isArray(items))items=String(i.items||'').split('|').map(s=>{const p=s.indexOf(':');return{label:s.slice(0,p),children:s.slice(p+1)}});
const dimension=(v,base,fallback)=>typeof v==='string'&&v.endsWith('%')?parseFloat(v)*base/100:Number(v)||fallback;
const rect=(x,y,width,height,fill,border=false)=>({type:'rectangle',x,y,width,height,fill,...(border?{stroke:'#F0F0F0',strokeWidth:1,strokeAlignment:'inner'}:{})});
const text=(s,x,y,w,h,color='#000000E0',weight='400')=>({type:'text',content:String(s),x,y,width:Math.max(1,w),height:Math.max(1,h),textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,lineHeight:1.57,textAlignVertical:'middle',fontWeight:String(weight),fill:color});
nodes.push({...rect(0,0,W,H,root.backgroundColor||'#FFFFFF'),stroke:root.borderColor||'#00000000',strokeWidth:root.borderColor?1:0,cornerRadius:root.borderRadius||0});
const head=i.title?(i.extra?32:24):0;
if(i.title)nodes.push({...text(i.title,pad,pad,inner,head,styles.title?.color||'#000000E0','600'),fontSize:16});
const extra=parse(i.extra,null);if(extra?.type)nodes.push({...extra,x:W-pad-Number(extra.width||70),y:pad});
let y=pad+head+(head?20:0),group=[];
const renderRow=row=>{let x=pad;const cellHeight=Math.max(...row.map(o=>Number(o.styles?.content?.height)|| (i.bordered?(i.size==='small'?38:i.size==='middle'?46:54):22))),labelHeight=Math.max(...row.map(o=>Number(o.styles?.label?.height)||22));
 for(const item of row){const ls={...styles.label,...item.styles?.label},cs={...styles.content,...item.styles?.content},span=Math.min(cols,Number(item.span)||1),fallback=inner*span/cols,lw=dimension(ls.width,inner,vertical?fallback:(i.bordered?fallback*.4:String(item.label).length*7+16)),cw=dimension(cs.width,inner,vertical?lw:fallback-lw),width=vertical?Math.max(lw,cw):lw+cw,p=i.bordered?(i.size==='small'?12:24):0;
 const ly=y,cy=vertical?y+labelHeight+(i.bordered?0:16):y,lh=vertical?labelHeight:cellHeight;
 if(i.bordered){nodes.push(rect(x,ly,vertical?width:lw,lh,ls.backgroundColor||'#00000005',true));nodes.push(rect(vertical?x:x+lw,cy,vertical?width:cw,cellHeight,cs.backgroundColor||'#FFFFFF',true));}
 nodes.push(text(String(item.label)+(i.colon!==false&&!i.bordered&&!vertical?':':''),x+p,ly,(vertical?width:lw)-p*2,lh,ls.color||'#00000073',ls.fontWeight||'400'));
 const child=parse(item.children,null),cx=(vertical?x:x+lw)+p;if(child?.type)nodes.push({...child,x:cx,y:cy+(cellHeight-Number(child.height||22))/2,width:Math.min(Number(child.width)||cw-p*2,cw-p*2)});else nodes.push(text(item.children??'',cx,cy,(vertical?width:cw)-p*2,cellHeight,cs.color||'#000000E0',cs.fontWeight||'400'));
 x+=width+(i.bordered?0:16);
 }
 y+=cellHeight+(vertical?labelHeight+(i.bordered?0:16):0)+(i.bordered?0:16);
};
let used=0;for(const item of items){let span=Math.min(cols,Number(item.span)||1);if(used+span>cols){renderRow(group);group=[];used=0;}group.push(item);used+=span;if(used>=cols){renderRow(group);group=[];used=0;}}if(group.length)renderRow(group);
return nodes;
