/**
 * @schema 2.18
 * @input sources: string = "[\"images/ant.design/bd0fe172a01aaf60.png\",\"images/ant.design/bd0fe172a01aaf60.png\"]"
 * @input preview: boolean = true
 */
const i=pencil.input||{};
let sources;try{sources=JSON.parse(i.sources)}catch{sources=[]}if(!Array.isArray(sources)||!sources.length)sources=['images/ant.design/bd0fe172a01aaf60.png','images/ant.design/bd0fe172a01aaf60.png'];
const gap=8,count=Math.min(4,sources.length),itemW=Math.max(80,Math.min(160,(pencil.width-gap*(count-1))/count)),itemH=Math.min(pencil.height,Math.max(80,itemW));
return sources.slice(0,count).map((src,index)=>({type:'ref',name:'Image',ref:'tTT7M',x:index*(itemW+gap),y:0,width:itemW,height:itemH,inputs:{src,preview:i.preview!==false}}));
