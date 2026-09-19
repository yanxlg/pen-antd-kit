/**
 * @schema 2.18
 * @input title: string = "Active Users"
 * @input value: string = "112893"
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input precision: number = 0
 * @input decimalSeparator: string = "."
 * @input groupSeparator: string = ","
 * @input loading: boolean = false
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});

nodes.push(text(i.title||'',0,0,W,22,14,'#00000073'));if(i.loading){nodes.push(box(0,30,Math.min(W,160),24,'#F0F0F0',4));}else{const num=Number(String(i.value??0).replaceAll(',',''));let val=Number.isFinite(num)?num.toFixed(Math.max(0,Math.min(12,i.precision||0))):String(i.value);let parts=val.split('.');parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,i.groupSeparator??',');val=parts.join(i.decimalSeparator||'.');nodes.push(text((i.prefix||'')+val+(i.suffix||''),0,26,W,34,24));}

return nodes;
