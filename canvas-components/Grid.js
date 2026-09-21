/**
 * @schema 2.18
 * @input columns: number = 4
 * @input gutter: number = 8
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(240,pencil.width),H=Math.max(40,pencil.height),nodes=[];
const count=Math.max(1,Math.min(12,Math.round(Number(i.columns)||4))),gap=Math.max(0,Number(i.gutter)||0),cell=(W-gap*(count-1))/count,color=i.primaryColor||'#1677FF';
for(let n=0;n<count;n++){
  const x=n*(cell+gap);
  nodes.push({type:'rectangle',name:`Col ${n+1}`,x,y:0,width:cell,height:H,cornerRadius:4,fill:color});
  nodes.push({type:'text',name:`Span ${n+1}`,content:String(Math.round(24/count)),x,y:0,width:cell,height:H,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:12,textAlign:'center',textAlignVertical:'middle',fill:'#FFFFFF'});
}
return nodes;
