/**
 * @schema 2.18
 * @input title: string = "Prompt text"
 * @input color: color = #000000D9
 * @input placement: enum("top", "topLeft", "topRight", "bottom", "bottomLeft", "bottomRight", "left", "leftTop", "leftBottom", "right", "rightTop", "rightBottom") = "top"
 * @input open: boolean = false
 * @input defaultOpen: boolean = false
 * @input arrow: boolean = true
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[],parse=(s,d)=>{try{return JSON.parse(s)}catch{return d}};if((!i.open&&!i.defaultOpen)||!i.title)return nodes;const st=parse(i.styles,{}),body=st.container||{},bg=body.background||i.color||'#000000D9',child=parse(i.title,null),p=i.placement||'top',a=i.arrow?8:0,left=p.startsWith('left'),right=p.startsWith('right'),bottom=p.startsWith('bottom'),vertical=!left&&!right,bx=right?a:0,by=bottom?a:0,bw=W-(vertical?0:a),bh=H-(vertical?a:0);
nodes.push({type:'rectangle',name:'Tooltip surface',x:bx,y:by,width:bw,height:bh,cornerRadius:body.borderRadius??6,fill:bg,effect:{type:'shadow',shadowType:'outer',color:'#0000001F',blur:12,offset:{x:0,y:3}}});
if(child?.type)nodes.push({...child,name:child.name||'Tooltip content',x:bx+8,y:by+6,width:bw-16,height:bh-12});else nodes.push({type:'text',name:'Tooltip title',content:i.title??'',x:bx+8,y:by+6,width:bw-16,height:Math.max(22,bh-12),textGrowth:'fixed-width-height',fontFamily:body.fontFamily||'Alibaba Sans',fontSize:body.fontSize||14,lineHeight:22/14,fill:body.color||'#FFFFFF'});
if(a){let x,y,w,h,geometry,viewBox;if(vertical){w=16;h=8;x=p.endsWith('Left')?12:p.endsWith('Right')?bw-28:(bw-16)/2;y=bottom?0:bh;viewBox=[0,0,16,8];geometry=bottom?'M8 0 L16 8 L0 8 Z':'M0 0 L16 0 L8 8 Z';}else{w=8;h=16;x=right?0:bw;y=p.endsWith('Top')?8:p.endsWith('Bottom')?bh-24:(bh-16)/2;viewBox=[0,0,8,16];geometry=right?'M8 0 L8 16 L0 8 Z':'M0 0 L8 8 L0 16 Z';}nodes.push({type:'path',name:'Tooltip arrow',x,y,width:w,height:h,viewBox,geometry,fill:bg});}return nodes;
