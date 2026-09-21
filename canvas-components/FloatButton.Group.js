/**
 * @schema 2.18
 * @input open: boolean = true
 * @input placement: enum("top", "right", "bottom", "left") = "top"
 * @input shape: enum("circle", "square") = "circle"
 * @input trigger: enum("click", "hover") = "click"
 * @input type: enum("default", "primary") = "primary"
 * @input disabled: boolean = false
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(40,pencil.height),nodes=[];
const size=40,gap=8,r=i.shape==='square'?8:20,primary=i.primaryColor||'#1677FF';
const surface=(x,y,fill,stroke)=>({type:'rectangle',name:'FloatButton',x,y,width:size,height:size,cornerRadius:r,fill,stroke,strokeWidth:1,strokeAlignment:'inner',effect:[{type:'shadow',shadowType:'outer',color:'#0000001F',offset:{x:0,y:3},blur:6,spread:-4}]});
const glyph=(x,y,kind,color)=>({type:'text',name:kind,content:kind,x,y,width:size,height:size,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:18,fontWeight:'500',textAlign:'center',textAlignVertical:'middle',fill:color});
const count=i.open===false?1:3,vertical=i.placement==='top'||i.placement==='bottom';
for(let n=0;n<count;n++){
  const reverse=i.placement==='top'||i.placement==='left',slot=reverse?count-1-n:n;
  const x=vertical?Math.max(0,(W-size)/2):slot*(size+gap),y=vertical?slot*(size+gap):Math.max(0,(H-size)/2);
  const main=n===count-1,fill=i.disabled?'#F5F5F5':main&&i.type==='primary'?primary:'#FFFFFF',color=i.disabled?'#00000040':main&&i.type==='primary'?'#FFFFFF':'#1677FF';
  nodes.push(surface(x,y,fill,main&&i.type==='primary'?primary:'#D9D9D9'));
  nodes.push(glyph(x,y,main?'＋':n===0?'?':'i',color));
}
return nodes;
