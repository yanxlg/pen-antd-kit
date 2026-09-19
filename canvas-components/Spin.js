/**
 * @schema 2.18
 * @input size: enum("small", "default", "large") = "default"
 * @input spinning: boolean = true
 * @input tip: string = ""
 * @input fullscreen: boolean = false
 * @input children: string = ""
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

child(i.children,0,0,W,H);if(i.spinning===false)return nodes;if(i.children||i.fullscreen)nodes.push(box(0,0,W,H,i.fullscreen?'#00000073':'#FFFFFFA6'));const s=i.size==='small'?14:i.size==='large'?32:20,x=(W-s)/2,y=(H-s-(i.tip?28:0))/2,r=s*.28;[[0,0,.35],[s-r,0,.6],[s-r,s-r,1],[0,s-r,.8]].forEach(([dx,dy,o])=>nodes.push({type:'ellipse',name:'Spin dot',x:x+dx,y:y+dy,width:r,height:r,fill:'#1677FF',opacity:o}));if(i.tip)nodes.push(text(i.tip,0,y+s+8,W,22,14,'#1677FF','400','center'));

return nodes;
