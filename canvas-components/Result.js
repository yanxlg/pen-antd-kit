/**
 * @schema 2.18
 * @input status: enum("success", "info", "warning", "error", "403", "404", "500") = "info"
 * @input title: string = "Successfully Purchased Cloud Server ECS!"
 * @input subTitle: string = "Order number: 2017182818828182881"
 * @input icon: string = ""
 * @input extra: string = ""
 * @input children: string = ""
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{type:name,name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

const numeric=['403','404','500'].includes(i.status),kinds={success:['CheckCircleFilled','#52C41A'],info:['ExclamationCircleFilled','#1677FF'],warning:['WarningFilled','#FAAD14'],error:['CloseCircleFilled','#FF4D4F']},c=kinds[i.status]||kinds.info,top=48,imgH=numeric?295:72;
if(numeric)nodes.push({type:'rectangle',name:'Official result illustration',x:(W-250)/2,y:top,width:250,height:295,fill:{type:'image',url:'/Users/yanxianliang/overseas/pen-antd-kit/libraries/images/antd-result-'+i.status+'.png',mode:'fit'}});else if(i.icon)child(i.icon,(W-72)/2,top,72,72);else nodes.push(icon(c[0],(W-72)/2,top,72,c[1]));let y=top+imgH+24;nodes.push(text(i.title,24,y,W-48,32,24,'#000000E0','400','center'));y+=40;nodes.push({...text(i.subTitle,32,y,W-64,44,14,'#00000073','400','center'),textAlignVertical:'top'});y+=52;if(i.extra)child(i.extra,24,y,W-48,40);if(i.children)child(i.children,40,y+64,W-80,Math.max(40,H-y-88));

return nodes;
