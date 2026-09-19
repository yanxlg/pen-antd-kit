/**
 * @schema 2.18
 * @input width: number = 200
 * @input height: number = 200
 * @input src: string = "images/ant.design/bd0fe172a01aaf60.png"
 * @input fallback: string = ""
 * @input preview: boolean = true
 * @input loading: enum("lazy", "eager") = "lazy"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(80,pencil.width||i.width||200),H=Math.max(60,pencil.height||i.height||200),src=i.src||i.fallback;
if(src)return [{type:'rectangle',name:'Image',x:0,y:0,width:W,height:H,cornerRadius:0,fill:{type:'image',enabled:true,url:src,mode:'fill'}}];
return [{type:'rectangle',name:'Image fallback',x:0,y:0,width:W,height:H,fill:'#FAFAFA',stroke:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner'},{type:'text',name:'Fallback label',content:'Image',x:0,y:H/2-10,width:W,height:20,textGrowth:'fixed-width-height',textAlign:'center',fontFamily:'Inter',fontSize:14,fill:'#00000040'}];
