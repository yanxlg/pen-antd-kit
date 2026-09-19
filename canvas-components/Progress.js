/**
 * @schema 2.18
 * @input percent: number = 0
 * @input type: enum("line", "circle", "dashboard") = "line"
 * @input status: enum("normal", "active", "success", "exception") = "normal"
 * @input showInfo: boolean = true
 * @input size: enum("small", "default") = "default"
 * @input strokeWidth: number = 0
 * @input strokeColor: color = #1677FF
 * @input trailColor: color = #0000000A
 * @input strokeLinecap: enum("round", "butt", "square") = "round"
 * @input gapDegree: number = 75
 * @input steps: number = 0
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

const pct=Math.max(0,Math.min(100,Number(i.percent)||0)),success=i.status==='success'||pct===100,fail=i.status==='exception',color=success?'#52C41A':fail?'#FF4D4F':i.strokeColor||'#1677FF',info=i.showInfo!==false;
if(i.type==='circle'||i.type==='dashboard'){const s=Math.min(W,H),thick=Number(i.strokeWidth)||6,gap=i.type==='dashboard'?(i.gapDegree||75):0,start=90+(i.type==='dashboard'?-gap/2:0),sweep=360-gap;nodes.push({type:'ellipse',name:'Progress rail',x:0,y:0,width:s,height:s,innerRadius:1-thick/50,startAngle:start,sweepAngle:sweep,fill:i.trailColor||'#0000000A'});if(pct>0)nodes.push({type:'ellipse',name:'Progress value',x:0,y:0,width:s,height:s,innerRadius:1-thick/50,startAngle:start,sweepAngle:sweep*pct/100,fill:color});if(info){if(success||fail)nodes.push(icon(success?'CheckOutlined':'CloseOutlined',s*.35,s*.35,s*.3,color));else nodes.push(text(pct+'%',0,0,s,s,Math.max(14,s*.2),'#000000E0','400','center'));}}
else{const barW=Math.max(0,W-(info?48:0)),h=Math.min(H,Number(i.strokeWidth)|| (i.size==='small'?6:8)),y=(H-h)/2,steps=Math.max(0,Math.floor(i.steps||0));if(steps){const gap=2,w=(barW-(steps-1)*gap)/steps;for(let n=0;n<steps;n++)nodes.push(box(n*(w+gap),y,w,h,n<Math.round(pct/100*steps)?color:i.trailColor||'#0000000A'));}else{nodes.push(box(0,y,barW,h,i.trailColor||'#0000000A',i.strokeLinecap==='round'?h/2:0));if(pct>0)nodes.push(box(0,y,barW*pct/100,h,color,i.strokeLinecap==='round'?h/2:0));}if(info){if(success||fail)nodes.push(icon(success?'CheckCircleFilled':'CloseCircleFilled',barW+8,(H-14)/2,14,color));else nodes.push(text(pct+'%',barW+8,0,40,H,i.size==='small'?12:14));}}

return nodes;
