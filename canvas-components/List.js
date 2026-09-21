/**
 * @schema 2.18
 * @input items: string = "Ant Design Title 1|Ant Design Title 2|Ant Design Title 3"
 * @input bordered: boolean = false
 * @input itemLayout: enum("horizontal", "vertical") = "horizontal"
 * @input size: enum("small", "default", "large") = "default"
 * @input split: boolean = true
 * @input grid: boolean = false
 * @input loading: boolean = false
 */
const i=pencil.input||{},W=Math.max(280,pencil.width),H=Math.max(144,pencil.height),nodes=[],items=String(i.items||'').split('|').filter(Boolean),cols=i.grid?2:1,rows=Math.max(1,Math.ceil(items.length/cols)),cellW=W/cols,rowH=H/rows;
if(i.bordered)nodes.push({type:'rectangle',name:'List border',x:0,y:0,width:W,height:H,cornerRadius:8,fill:'#FFFFFF',stroke:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner'});
items.forEach((label,n)=>{
  const col=n%cols,row=Math.floor(n/cols),x=col*cellW,y=row*rowH,pad=i.size==='small'?12:i.size==='large'?20:16;
  if(i.split&&row>0)nodes.push({type:'rectangle',name:'Divider',x:x+pad,y,width:cellW-pad*2,height:1,fill:'#F0F0F0'});
  if(i.loading){
    nodes.push({type:'ellipse',name:'Loading avatar',x:x+pad,y:y+pad,width:40,height:40,fill:'#F0F0F0'});
    nodes.push({type:'rectangle',name:'Loading title',x:x+pad+56,y:y+pad+2,width:Math.max(32,cellW-pad*2-72),height:12,cornerRadius:6,fill:'#F0F0F0'});
    nodes.push({type:'rectangle',name:'Loading description',x:x+pad+56,y:y+pad+24,width:Math.max(24,(cellW-pad*2-72)*.72),height:10,cornerRadius:5,fill:'#F0F0F0'});
    return;
  }
  nodes.push({type:'ellipse',name:'Avatar',x:x+pad,y:y+pad,width:40,height:40,fill:'#BFBFBF'});
  nodes.push({type:'text',name:'Avatar label',content:String(n+1),x:x+pad,y:y+pad,width:40,height:40,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,textAlign:'center',textAlignVertical:'middle',fill:'#FFFFFF'});
  nodes.push({type:'text',name:'Title',content:label,x:x+pad+56,y:y+pad,width:cellW-pad*2-56,height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,fontWeight:'500',textAlignVertical:'middle',fill:'#000000E0'});
  nodes.push({type:'text',name:'Description',content:'Ant Design list item',x:x+pad+56,y:y+pad+26,width:cellW-pad*2-56,height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:13,textAlignVertical:'middle',fill:'#00000073'});
});
return nodes;
