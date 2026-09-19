/**
 * @schema 2.18
 * @input title: string = "Card title"
 * @input description: string = "This is the description"
 * @input avatar: boolean = true
 */
const i=pencil.input||{},W=Math.max(180,pencil.width),H=Math.max(64,pencil.height),left=i.avatar?56:0,nodes=[];
if(i.avatar)nodes.push({type:'ref',name:'avatar · Avatar',ref:'GcQcz',x:0,y:0,width:40,height:40,inputs:{size:'large',text:'U',color:'gray'}});
nodes.push({type:'text',name:'Meta title',content:String(i.title||'Card title'),x:left,y:0,width:W-left,height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:16,fontWeight:'600',fill:'#000000E0'});
nodes.push({type:'text',name:'Meta description',content:String(i.description||'This is the description'),x:left,y:28,width:W-left,height:Math.max(20,H-28),textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,fill:'#00000073'});
return nodes;
