/**
 * @schema 2.18
 * @input items: string = "Create a services site|Solve initial network problems|Technical testing|Network problems being solved"
 * @input mode: enum("start", "alternate", "end") = "start"
 * @input orientation: enum("vertical", "horizontal") = "vertical"
 * @input reverse: boolean = false
 * @input variant: enum("outlined", "filled") = "outlined"
 * @input titleSpan: string = "50%"
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),parse=(v,d)=>{try{return typeof v==='string'?JSON.parse(v):v??d}catch{return d}},styles=parse(i.styles,{}),root=styles.root||{},nodes=[],horizontal=i.orientation==='horizontal';
let items=parse(i.items,null);if(!Array.isArray(items))items=String(i.items||'').split('|').map(content=>({content}));if(i.reverse)items=[...items].reverse();const titleMode=items.some(o=>o.title),padding=typeof root.padding==='number'?root.padding:0,span=String(i.titleSpan||'50%'),offset=span.endsWith('px')?parseFloat(span):span.endsWith('%')?W*parseFloat(span)/100:W*Number(span)/24,axis=i.mode==='alternate'?W/2:titleMode?(i.mode==='end'?W-offset:offset):i.mode==='end'?W-5-padding:5+padding;
const box=(x,y,w,h,fill)=>({type:'rectangle',x,y,width:w,height:h,fill}),text=(s,x,y,w,h,align='left',opacity=1)=>({type:'text',content:String(s??''),x,y,width:Math.max(1,w),height:Math.max(1,h),textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,lineHeight:1.57,textAlign:align,fill:'#000000E0',opacity});
if(root.borderColor)nodes.push({...box(0,0,W,H,'#FFFFFF'),stroke:root.borderColor,strokeWidth:1,cornerRadius:4});
let y=padding;
items.forEach((o,n)=>{const step=Number(o.styles?.root?.height)||48,side=i.mode==='end'||i.mode==='alternate'&&n%2===1,cw=(W-padding*2)/items.length,cx=horizontal?padding+(n+.5)*cw:axis,cy=horizontal?(i.mode==='alternate'?H/2:i.mode==='end'?H-padding-5:padding+5):y+12,color=styles.itemIcon?.borderColor||({green:'#52C41A',red:'#FF4D4F',gray:'#00000040',blue:'#1677FF'})[o.color]||o.color||'#1677FF';
 if(n<items.length-1){if(!horizontal&&o.styles?.rail?.borderStyle==='dashed'){for(let dy=8;dy<step-6;dy+=7)nodes.push(box(cx-1,cy+dy,2,4,'#F0F0F0'));}else nodes.push(box(horizontal?cx+6:cx-1,cy+(horizontal?-1:6),horizontal?cw-12:2,horizontal?2:step-12,'#F0F0F0'));}
 const icon=parse(o.icon,null);if(o.loading)nodes.push({type:'ref',ref:'antd-icon-live-origin',x:cx-7,y:cy-7,width:14,height:14,inputs:{name:'LoadingOutlined',fontSize:14,color}});else if(icon?.type)nodes.push({...icon,x:cx-Number(icon.width||16)/2,y:cy-Number(icon.height||16)/2});else nodes.push({type:'ellipse',x:cx-5,y:cy-5,width:10,height:10,fill:i.variant==='filled'?color:'#FFFFFF',stroke:color,strokeWidth:2});
 const content=o.content??o.children??'',opacity=o.styles?.content?.opacity??1;
 if(horizontal){const top=side?cy-34-(o.title?22:0):cy+17;if(o.title)nodes.push(text(o.title,padding+n*cw,top,cw,22,'center'));nodes.push(text(content,padding+n*cw,top+(o.title?22:0),cw,22,'center',opacity));}
 else {const left=side?padding:cx+20,tw=side?cx-20-padding:W-cx-20-padding;if(o.title){nodes.push(text(o.title,side?cx+20:padding,y,side?W-cx-20:cx-20,22));}nodes.push(text(content,left,y,tw,Math.max(22,step-20),side?'right':'left',opacity));}
 y+=step;
});
return nodes;
