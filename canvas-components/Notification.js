/**
 * @schema 2.18
 * @input message: string = "Notification Title"
 * @input description: string = "This is the content of the notification."
 * @input type: enum("info", "success", "warning", "error") = "info"
 * @input showProgress: boolean = false
 * @input pauseOnHover: boolean = true
 * @input placement: enum("topRight", "topLeft", "bottomRight", "bottomLeft", "top", "bottom") = "topRight"
 * @input actions: string = ""
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{type:name,name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

const kinds={info:['InfoCircleOutlined','#1677FF'],success:['CheckCircleOutlined','#52C41A'],warning:['ExclamationCircleOutlined','#FAAD14'],error:['CloseCircleOutlined','#FF4D4F']},c=kinds[i.type]||kinds.info;
nodes.push({...box(0,0,W,H,'#FFFFFF',8),effect:{type:'shadow',shadowType:'outer',blur:24,offset:{x:0,y:6},color:'#0000001F'}});nodes.push(icon(c[0],24,24,24,c[1]));nodes.push(text(i.message,60,20,W-108,28,16,'#000000E0','600'));nodes.push({...text(i.description,60,56,W-84,H-72),textAlignVertical:'top'});nodes.push(icon('CloseOutlined',W-34,20,14,'#00000073'));if(i.showProgress)nodes.push(box(8,H-3,W-16,2,c[1],1));if(i.actions)child(i.actions,W-164,H-48,140,32);

return nodes;
