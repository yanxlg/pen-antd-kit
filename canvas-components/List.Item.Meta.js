/**
 * @schema 2.18
 * @input title: string = "Ant Design Title"
 * @input description: string = "Ant Design, a design language for background applications."
 * @input avatar: boolean = true
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const left=i.avatar===false?0:56;if(i.avatar!==false)nodes.push({type:'ref',ref:'GcQcz',name:'avatar · Avatar',x:0,y:0,width:40,height:40,inputs:{size:'large',text:'A',color:'gray'}});nodes.push(text(i.title||'Ant Design Title',left,0,W-left,22,14,'#000000E0','500'));nodes.push({...text(i.description||'',left,28,W-left,44,14,'#00000073'),lineHeight:1.57});
return nodes;
