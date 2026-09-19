/**
 * @schema 2.18
 * @input title: string = "Basic Modal"
 * @input children: string = "Some contents..."
 * @input open: boolean = true
 * @input width: number = 520
 * @input centered: boolean = false
 * @input closable: boolean = true
 * @input mask: boolean = true
 * @input okText: string = "OK"
 * @input cancelText: string = "Cancel"
 * @input confirmLoading: boolean = false
 * @input loading: boolean = false
 * @input footer: boolean = true
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

if(!i.open)return nodes;const w=Math.min(W,i.width||520),h=Math.min(H,260),x=(W-w)/2,y=i.centered?(H-h)/2:0;if(i.mask)nodes.push(box(0,0,W,H,'#00000073'));nodes.push({...box(x,y,w,h,'#FFFFFF',8),effect:{type:'shadow',shadowType:'outer',blur:24,offset:{x:0,y:6},color:'#00000026'}});nodes.push(text(i.title,x+24,y+16,w-72,24,16,'#000000E0','600'));if(i.closable)nodes.push(icon('CloseOutlined',x+w-34,y+22,14,'#00000073'));if(i.loading)nodes.push({type:'ref',name:'Skeleton',ref:'DAA17',x:x+24,y:y+64,width:w-48,height:120,inputs:{loading:true,avatar:false,rows:3}});else child(i.children,x+24,y+56,w-48,h-120);if(i.footer!==false){nodes.push(button(i.cancelText||'Cancel',x+w-176,y+h-52,80));const ok=button(i.okText||'OK',x+w-88,y+h-52,64,true);ok.inputs.loading=!!i.confirmLoading;nodes.push(ok);}

return nodes;
