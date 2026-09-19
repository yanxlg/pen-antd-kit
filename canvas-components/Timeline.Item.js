/**
 * @schema 2.18
 * @input children: string = "Create a services site"
 * @input color: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
nodes.push({type:'ellipse',name:'Dot',x:0,y:6,width:10,height:10,fill:'#FFFFFF',stroke:i.color||'#1677FF',strokeWidth:2});nodes.push(text(i.children||'Create a services site',26,0,W-26,24));
return nodes;
