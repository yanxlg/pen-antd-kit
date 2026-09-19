/**
 * @schema 2.18
 * @input options: string = "Daily|Weekly|Monthly"
 * @input value: string = "Daily"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input disabled: boolean = false
 * @input block: boolean = false
 * @input vertical: boolean = false
 * @input orientation: enum("horizontal", "vertical") = "horizontal"
 * @input shape: enum("default", "round") = "default"
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});

let opts;try{opts=JSON.parse(i.options)}catch{opts=String(i.options||'Daily|Weekly|Monthly').split('|')}opts=opts.map(o=>typeof o==='object'?o:{label:String(o),value:o});
const vertical=i.vertical||i.orientation==='vertical',h=i.size==='small'?24:i.size==='large'?40:32,r=i.shape==='round'?h/2:6,cellH=h-4,totalH=vertical?cellH*opts.length+4:h;
nodes.push(box(0,0,W,totalH,'#F5F5F5',r));
opts.forEach((o,n)=>{const cw=vertical?W-4:(W-4)/opts.length,x=vertical?2:2+n*cw,y=vertical?2+n*cellH:2,selected=String(o.value)===String(i.value??opts[0].value);if(selected)nodes.push(box(x,y,cw,cellH,'#FFFFFF',i.shape==='round'?cellH/2:4));nodes.push(text(o.label,x+8,y,cw-16,cellH,i.size==='large'?16:14,i.disabled||o.disabled?'#00000040':'#000000E0','400','center'));});

return nodes;
