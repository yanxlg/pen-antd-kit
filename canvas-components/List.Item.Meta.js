/**
 * @schema 2.18
 * @input title: string = "Ant Design Title"
 * @input description: string = "Ant Design, a design language for enterprise applications."
 * @input avatar: boolean = true
 */
const i=pencil.input||{},W=Math.max(200,pencil.width),H=Math.max(64,pencil.height),nodes=[],left=i.avatar===false?0:56;
nodes.push({type:'rectangle',name:'Meta surface',x:0,y:0,width:W,height:H,fill:'#FFFFFF'});
if(i.avatar!==false){
  nodes.push({type:'ellipse',name:'Avatar',x:0,y:4,width:40,height:40,fill:'#BFBFBF'});
  nodes.push({type:'text',name:'Avatar label',content:'A',x:0,y:4,width:40,height:40,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:16,textAlign:'center',textAlignVertical:'middle',fill:'#FFFFFF'});
}
nodes.push({type:'text',name:'Title',content:String(i.title||'Ant Design Title'),x:left,y:0,width:W-left,height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,fontWeight:'500',textAlignVertical:'middle',fill:'#000000E0'});
nodes.push({type:'text',name:'Description',content:String(i.description||''),x:left,y:26,width:W-left,height:H-26,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:1.5,fill:'#00000073'});
return nodes;
