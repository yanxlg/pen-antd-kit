/**
 * @schema 2.18
 * @input children: string = "List item content"
 * @input split: boolean = true
 */
const i=pencil.input||{},W=Math.max(160,pencil.width),H=Math.max(40,pencil.height),nodes=[];
nodes.push({type:'rectangle',name:'Item surface',x:0,y:0,width:W,height:H,fill:'#FFFFFF'});
nodes.push({type:'text',name:'List item content',content:String(i.children||'List item content'),x:16,y:0,width:W-32,height:H-(i.split===false?0:1),textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,textAlignVertical:'middle',fill:'#000000E0'});
if(i.split!==false)nodes.push({type:'rectangle',name:'Divider',x:16,y:H-1,width:W-32,height:1,fill:'#F0F0F0'});
return nodes;
