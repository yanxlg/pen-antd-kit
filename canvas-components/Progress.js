/**
 * @schema 2.18
 * @input percent: number = 0
 * @input type: enum("line", "circle", "dashboard") = "line"
 * @input status: enum("normal", "active", "success", "exception") = "normal"
 * @input showInfo: boolean = true
 * @input size: enum("small", "default") = "default"
 * @input strokeWidth: number = 0
 * @input strokeColor: string = "#1677FF"
 * @input trailColor: color = #0000000A
 * @input strokeLinecap: enum("round", "butt", "square") = "round"
 * @input gapDegree: number = 75
 * @input steps: number = 0
 * @input format: string = ""
 * @input success: string = "{}"
 * @input percentPosition: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

const pct=Math.max(0,Math.min(100,Number(i.percent)||0)),success=i.status==='success'||pct===100,fail=i.status==='exception',color=i.strokeColor&&i.strokeColor!=='#1677FF'?i.strokeColor:success?'#52C41A':fail?'#FF4D4F':'#1677FF',info=i.showInfo!==false;let successPart={},pos={};try{successPart=JSON.parse(i.success||'{}');pos=JSON.parse(i.percentPosition||'{}')}catch{}const label=i.format||pct+'%';let paint=color;try{const stops=JSON.parse(color);if(Array.isArray(stops))paint={type:'gradient',gradientType:'linear',rotation:90,colors:stops}}catch{}
if(i.type==='circle'||i.type==='dashboard'){const s=Math.min(W,H),thick=Number(i.strokeWidth)||6,gap=i.type==='dashboard'?(i.gapDegree||75):0,start=90+(i.type==='dashboard'?-gap/2:0),sweep=360-gap;nodes.push({type:'ellipse',name:'Progress rail',x:0,y:0,width:s,height:s,innerRadius:1-thick/50,startAngle:start,sweepAngle:sweep,fill:i.trailColor||'#0000000A'});if(pct>0&&!i.steps)nodes.push({type:'ellipse',name:'Progress value',x:0,y:0,width:s,height:s,innerRadius:1-thick/50,startAngle:start,sweepAngle:sweep*pct/100,fill:paint});if(i.steps){nodes.pop();for(let k=0;k<i.steps;k++)nodes.push({type:'ellipse',name:'Progress step',x:0,y:0,width:s,height:s,innerRadius:1-thick/50,startAngle:start+k*sweep/i.steps,sweepAngle:Math.max(1,sweep/i.steps-2),fill:k<i.steps*pct/100?paint:i.trailColor||'#0000000A'});}if(successPart.percent)nodes.push({type:'ellipse',name:'Success segment',x:0,y:0,width:s,height:s,innerRadius:1-thick/50,startAngle:start,sweepAngle:sweep*Math.min(pct,successPart.percent)/100,fill:successPart.strokeColor||'#52C41A'});if(info){if(i.format)nodes.push(text(label,0,0,s,s,Math.max(14,s*.2),'#000000E0','400','center'));else if(success||fail)nodes.push(icon(success?'CheckOutlined':'CloseOutlined',s*.35,s*.35,s*.3,color));else nodes.push(text(pct+'%',0,0,s,s,Math.max(14,s*.2),'#000000E0','400','center'));}}
else{const inner=pos.type==='inner',barW=Math.max(0,W-(info&&!inner?48:0)),h=Math.min(H,Number(i.strokeWidth)|| (i.size==='small'?6:8)),y=(H-h)/2,steps=Math.max(0,Math.floor(i.steps||0));if(steps){const gap=2,w=(barW-(steps-1)*gap)/steps;for(let n=0;n<steps;n++)nodes.push(box(n*(w+gap),y,w,h,n<Math.round(pct/100*steps)?paint:i.trailColor||'#0000000A'));}else{nodes.push(box(0,y,barW,h,i.trailColor||'#0000000A',i.strokeLinecap==='round'?h/2:0));if(pct>0)nodes.push(box(0,y,barW*pct/100,h,paint,i.strokeLinecap==='round'?h/2:0));}if(successPart.percent)nodes.push(box(0,y,barW*Math.min(pct,successPart.percent)/100,h,successPart.strokeColor||'#52C41A',i.strokeLinecap==='round'?h/2:0));if(info){if(inner){nodes.push(text(label,0,0,barW,H,12,pct>20?'#FFFFFF':'#000000E0','400',pos.align==='start'?'left':pos.align==='end'?'right':'center'));}else if(success||fail)nodes.push(icon(success?'CheckCircleFilled':'CloseCircleFilled',barW+8,(H-14)/2,14,color));else nodes.push(text(pct+'%',barW+8,0,40,H,i.size==='small'?12:14));}}

return nodes;
