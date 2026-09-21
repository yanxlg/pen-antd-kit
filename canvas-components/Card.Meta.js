/**
 * @schema 2.18
 * @input title: string = "Card title"
 * @input description: string = "This is the description"
 * @input avatar: string = ""
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(180,pencil.width),H=Math.max(1,pencil.height),left=i.avatar?48:0,nodes=[];
if(i.avatar){let avatar;try{avatar=JSON.parse(i.avatar)}catch{}nodes.push({type:'script',name:'Avatar',scriptUri:'../canvas-components/Avatar.js',x:0,y:0,width:32,height:32,inputs:avatar?.inputs||{text:'U',size:'default'}});}
nodes.push({type:'text',name:'Meta title',content:String(i.title||'Card title'),x:left,y:0,width:W-left,height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:16,fontWeight:'600',fill:'#000000E0'});
nodes.push({type:'text',name:'Meta description',content:String(i.description||'This is the description'),x:left,y:33,width:W-left,height:Math.max(20,H-33),textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,fill:'#00000073'});
return nodes;
