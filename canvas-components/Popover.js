/**
 * @schema 2.18
 * @input title: string = "Title"
 * @input content: string = "Content"
 * @input open: boolean = false
 * @input defaultOpen: boolean = false
 * @input arrow: boolean = true
 * @input trigger: enum("hover", "click", "focus") = "hover"
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight", "left", "right", "bottom", "top", "leftTop", "leftBottom", "rightTop", "rightBottom") = "top"
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[],parse=(s,d)=>{try{return JSON.parse(s)}catch{return d}};if(!i.open&&!i.defaultOpen)return nodes;const st=parse(i.styles,{}),body=st.container||{},bg=body.background||'#FFFFFF',p=i.placement||'top',a=i.arrow?6:0,left=p.startsWith('left'),right=p.startsWith('right'),bottom=p.startsWith('bottom'),bx=right?a:0,by=bottom?a:0,bw=W-(left||right?a:0),bh=H-(!left&&!right?a:0);
nodes.push({type:'rectangle',x:bx,y:by,width:bw,height:bh,cornerRadius:8,fill:bg,effect:{type:'shadow',shadowType:'outer',color:'#00000026',blur:16,offset:{x:0,y:5}}});
const add=(value,y,h,weight)=>{const child=parse(value,null);nodes.push(child?.type?{...child,x:bx+12,y,width:bw-24,height:h}:{type:'text',content:value??'',x:bx+12,y,width:bw-24,height:h,textGrowth:'fixed-width-height',fontFamily:body.fontFamily||'Alibaba Sans',fontSize:body.fontSize||14,fontWeight:weight,lineHeight:1.57,fill:body.color||'#000000E0'});};if(i.title)add(i.title,by+12,22,'600');add(i.content,by+(i.title?42:12),Math.max(22,bh-(i.title?54:24)),'400');if(a)nodes.push({type:'rectangle',x:left?W-9:right?3:W/2-4,y:bottom?3:left||right?H/2-4:H-9,width:8,height:8,rotation:45,fill:bg});return nodes;
