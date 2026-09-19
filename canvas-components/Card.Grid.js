/**
 * @schema 2.18
 * @input children: string = "Content"
 * @input hoverable: boolean = true
 */
const i=pencil.input||{},W=Math.max(96,pencil.width),H=Math.max(64,pencil.height);
return [
 {type:'rectangle',name:'Grid surface',x:0,y:0,width:W,height:H,fill:'#FFFFFF',stroke:'#F0F0F0',strokeWidth:1,strokeAlignment:'inner',effect:i.hoverable?{type:'shadow',shadowType:'outer',color:'#00000014',blur:8,offset:{x:0,y:2}}:undefined},
 {type:'text',name:'Grid content',content:String(i.children||'Content'),x:16,y:0,width:W-32,height:H,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:H/14,fill:'#000000E0'}
];
