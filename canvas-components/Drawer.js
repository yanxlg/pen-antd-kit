/**
 * @schema 2.18
 * @input title: string = "Basic Drawer"
 * @input children: string = "Some contents..."
 * @input open: boolean = true
 * @input placement: enum("left", "right", "top", "bottom") = "right"
 * @input width: number = 378
 * @input height: number = 256
 * @input mask: boolean = true
 * @input closable: boolean = true
 * @input loading: boolean = false
 * @input showPageContext: boolean = true
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

if(!i.open)return nodes;if(i.showPageContext!==false){nodes.push({...box(0,0,W,H,'#FAFAFA'),name:'Page canvas'});nodes.push({...box(0,0,W,56,'#F5F5F5'),name:'Page header'});nodes.push({...box(24,80,Math.max(0,W-48),Math.max(0,H-104),'#F7F7F7',8),name:'Page content surface'});nodes.push({...box(48,104,Math.max(0,W-96),12,'#E8E8E8',6),name:'Page content line'});nodes.push({...box(48,132,Math.max(0,(W-112)*.68),12,'#E8E8E8',6),name:'Page content line'});}const horizontal=i.placement==='left'||i.placement==='right',dw=horizontal?Math.min(W,i.width||378):W,dh=horizontal?H:Math.min(H,i.height||256),x=i.placement==='right'?W-dw:0,y=i.placement==='bottom'?H-dh:0;if(i.mask)nodes.push({...box(0,0,W,H,'#00000073'),name:'Mask'});nodes.push({...box(x,y,dw,dh),name:'Drawer panel'});if(i.closable)nodes.push(icon('CloseOutlined',x+24,y+22,14,'#00000073'));nodes.push(text(i.title,x+(i.closable?56:24),y+16,dw-80,24,16,'#000000E0','600'));nodes.push(box(x,y+55,dw,1,'#F0F0F0'));if(i.loading)nodes.push({type:'ref',ref:'DAA17',name:'Skeleton',x:x+24,y:y+80,width:dw-48,height:120,inputs:{avatar:false,paragraph:JSON.stringify({rows:3}),loading:true}});else child(i.children,x+24,y+80,dw-48,dh-104);

return nodes;
