/**
 * @schema 2.18
 * @input width: number = 200
 * @input height: number = 200
 * @input src: string = "images/ant.design/c1f5bcc0f96aaa3c.png"
 * @input alt: string = ""
 * @input fallback: string = ""
 * @input preview: string = "true"
 * @input placeholder: string = ""
 * @input styles: string = "{}"
 * @input loading: enum("lazy", "eager") = "lazy"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),parse=(v,d)=>{try{return JSON.parse(v)}catch{return d}},styles=parse(i.styles,{}),root=styles.root||{},img=styles.image||{},pad=Number(root.padding)||0,nodes=[],src=i.src==='error'?i.fallback:i.src;
if(root.borderColor)nodes.push({type:'rectangle',x:0,y:0,width:W,height:H,cornerRadius:root.borderRadius||0,fill:'#FFFFFF',stroke:root.borderColor,strokeWidth:Number(root.borderWidth)||1});
if(src)nodes.push({type:'rectangle',name:i.alt||'Image',x:pad,y:pad,width:W-pad*2,height:H-pad*2,cornerRadius:Number(img.borderRadius)||0,fill:img.filter==='grayscale(50%)'?[{type:'image',enabled:true,url:src,mode:'stretch'},{type:'color',blendMode:'saturation',color:'#FFFFFF80'}]:{type:'image',enabled:true,url:src,mode:img.objectFit==='contain'?'fit':'stretch'}});
else {const ph=parse(i.placeholder,null);if(ph?.type)nodes.push({...ph,x:0,y:0,width:W,height:H});else nodes.push({type:'rectangle',x:0,y:0,width:W,height:H,fill:'#F5F5F5',cornerRadius:root.borderRadius||0});}
return nodes;
