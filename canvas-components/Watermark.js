/**
 * @schema 2.18
 * @input content: string = "Ant Design"
 * @input children: string = ""
 * @input image: string = ""
 * @input rotate: number = -22
 * @input font: string = "{}"
 * @input gap: string = "[100,100]"
 * @input offset: string = "[50,50]"
 * @input width: number = 120
 * @input height: number = 64
 * @input zIndex: number = 9
 * @input inherit: boolean = true
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{type:name,name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

child(i.children,0,0,W,H);let font={},gap=[100,100],offset=[50,50];try{font=JSON.parse(i.font||'{}');gap=JSON.parse(i.gap||'[100,100]');offset=JSON.parse(i.offset||'[50,50]')}catch{}const iw=i.width||120,ih=i.height||64,gx=iw+gap[0],gy=ih+gap[1];for(let y=offset[1];y+ih<H;y+=gy)for(let x=offset[0];x+iw<W;x+=gx){if(i.image)nodes.push({type:'rectangle',name:'Watermark image',x,y,width:iw,height:ih,rotation:i.rotate??-22,fill:{type:'image',url:i.image,mode:'fit'},opacity:.15});else nodes.push({...text(i.content,x,y,iw,ih,font.fontSize||16,font.color||'#00000026','400','center'),rotation:i.rotate??-22});}

return nodes;
