/**
 * @schema 2.18
 * @input title: string = "Countdown"
 * @input value: string = "01:30:00"
 * @input format: string = "HH:mm:ss"
 * @input type: enum("countdown", "countup") = "countdown"
 * @input loading: boolean = false
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
nodes.push(text(i.title||'Countdown',0,0,W,22,14,'#00000073'));if(i.loading)nodes.push(box(0,30,160,24,'#F0F0F0',4));else nodes.push(text(i.value||'01:30:00',0,26,W,34,24));
return nodes;
