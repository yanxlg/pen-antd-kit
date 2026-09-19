/**
 * @schema 2.18
 * @input items: string = "Create a services site|Solve initial network problems|Technical testing|Network problems being solved"
 * @input mode: enum("left", "alternate", "right") = "left"
 * @input orientation: enum("vertical", "horizontal") = "vertical"
 * @input reverse: boolean = false
 * @input variant: enum("outlined", "filled") = "outlined"
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});

let items;try{items=JSON.parse(i.items)}catch{items=String(i.items||'Create a services site|Technical testing|Network problems being solved').split('|')}items=items.map(o=>typeof o==='object'?o:{children:o});if(i.reverse)items.reverse();const horizontal=i.orientation==='horizontal',step=horizontal?W/items.length:Math.max(48,H/items.length);
items.forEach((o,n)=>{const right=i.mode==='right'||i.mode==='alternate'&&n%2===1,cx=horizontal?n*step+6:i.mode==='alternate'?W/2:i.mode==='right'?W-6:6,cy=horizontal?10:n*step+10,color=({green:'#52C41A',red:'#FF4D4F',gray:'#00000040',blue:'#1677FF'})[o.color]||o.color||'#1677FF';if(n<items.length-1)nodes.push(box(cx,cy+5,horizontal?step:1,horizontal?1:step-10,'#F0F0F0'));nodes.push({type:'ellipse',name:'Timeline dot',x:cx-5,y:cy-5,width:10,height:10,fill:i.variant==='filled'?color:'#FFFFFF',stroke:color,strokeWidth:2});nodes.push(text(o.children||o.title||'',horizontal?n*step:right?0:cx+18,horizontal?30:cy-10,horizontal?step-20:i.mode==='alternate'?W/2-24:W-24,22,14,'#000000E0','400',horizontal?'left':right?'right':'left'));});

return nodes;
