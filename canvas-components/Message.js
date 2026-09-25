/**
 * @schema 2.18
 * @input content: string = "This is a message"
 * @input type: enum("info", "success", "warning", "error", "loading") = "info"
 * @input duration: number = 3
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{type:name,name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

const kinds={info:['InfoCircleFilled','#1677FF'],success:['CheckCircleFilled','#52C41A'],warning:['ExclamationCircleFilled','#FAAD14'],error:['CloseCircleFilled','#FF4D4F'],loading:['LoadingOutlined','#1677FF']},c=kinds[i.type]||kinds.info;
nodes.push({...box(0,0,W,H,'#FFFFFF',8),effect:{type:'shadow',shadowType:'outer',blur:16,offset:{x:0,y:6},color:'#0000001F'}});nodes.push(icon(c[0],12,(H-16)/2,16,c[1]));nodes.push(text(i.content,36,8,W-48,H-16));

return nodes;
