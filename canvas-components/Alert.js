/**
 * @schema 2.18
 * @input title: string = "Success Text"
 * @input message: string = ""
 * @input description: string = ""
 * @input type: enum("success", "info", "warning", "error") = "success"
 * @input showIcon: boolean = false
 * @input closable: boolean = false
 * @input banner: boolean = false
 * @input variant: enum("outlined", "filled") = "outlined"
 * @input action: string = ""
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

const palettes={success:['#F6FFED','#B7EB8F','#52C41A','CheckCircle'],info:['#E6F4FF','#91CAFF','#1677FF','InfoCircle'],warning:['#FFFBE6','#FFE58F','#FAAD14','ExclamationCircle'],error:['#FFF2F0','#FFCCC7','#FF4D4F','CloseCircle']},c=palettes[i.type]||palettes.info,desc=!!i.description,sz=desc?24:14,pad=desc?20:12,hasIcon=i.showIcon||i.banner,x=pad+(hasIcon?sz+12:0),actionW=i.action?120:0;
nodes.push(box(0,0,W,H,c[0],i.banner?0:8,i.variant==='filled'||i.banner?'#00000000':c[1]));if(hasIcon)nodes.push(icon(c[3]+(desc?'Outlined':'Filled'),pad,desc?20:(H-sz)/2,sz,c[2]));
nodes.push(text(i.title||i.message,x,desc?12:0,W-x-pad-(i.closable?20:0)-actionW,desc?28:H,desc?16:14));if(desc)nodes.push({...text(i.description,x,42,W-x-pad-actionW,H-50),textAlignVertical:'top'});if(i.closable)nodes.push(icon('CloseOutlined',W-24,desc?16:(H-12)/2,12,'#00000073'));if(i.action)child(i.action,W-actionW-28,(H-32)/2,actionW,32);

return nodes;
