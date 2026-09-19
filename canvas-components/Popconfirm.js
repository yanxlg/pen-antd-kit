/**
 * @schema 2.18
 * @input title: string = "Delete the task"
 * @input description: string = "Are you sure to delete this task?"
 * @input open: boolean = true
 * @input showCancel: boolean = true
 * @input okText: string = "Yes"
 * @input cancelText: string = "No"
 * @input placement: enum("top", "bottom", "left", "right") = "top"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

if(!i.open)return nodes;nodes.push({...box(0,0,W,H,'#FFFFFF',8),effect:{type:'shadow',shadowType:'outer',blur:16,offset:{x:0,y:4},color:'#00000026'}});nodes.push(icon('ExclamationCircleFilled',12,16,14,'#FAAD14'));nodes.push(text(i.title,34,12,W-46,22,14,'#000000E0','600'));if(i.description)nodes.push({...text(i.description,34,40,W-46,H-78),textAlignVertical:'top'});if(i.showCancel)nodes.push(button(i.cancelText||'No',W-120,H-36,48,false,'small'));nodes.push(button(i.okText||'Yes',W-64,H-36,52,true,'small'));

return nodes;
