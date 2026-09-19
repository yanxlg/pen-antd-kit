/**
 * @schema 2.18
 * @input label: string = "UserName"
 * @input children: string = "Zhou Maomao"
 * @input span: number = 1
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
nodes.push(text(i.label||'UserName',0,0,120,24,14,'#00000073'));nodes.push(text(i.children||'Zhou Maomao',132,0,W-132,24));
return nodes;
