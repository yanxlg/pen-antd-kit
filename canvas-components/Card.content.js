/**
 * @schema 2.18
 * @input title: string = "Card title"
 * @input extra: string = "More"
 * @input children: string = "Card content"
 * @input bordered: boolean = true
 * @input size: enum("default", "small") = "default"
 * @input hoverable: boolean = false
 * @input loading: boolean = false
 * @input variant: enum("outlined", "borderless") = "outlined"
 * @input cover: boolean = false
 * @input actions: boolean = false
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(180,pencil.width),H=Math.max(96,pencil.height),nodes=[],small=i.size==='small',header=i.title?(small?38:56):0,cover=i.cover?Math.min(160,H*.45):0,actions=i.actions?48:0;
const txt=(content,x,y,width,height,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',textAlign:align,fontFamily:'Inter',fontSize:size,fontWeight:weight,lineHeight:1.57,fill:color});
nodes.push({type:'rectangle',name:'Card surface',x:0,y:0,width:W,height:H,cornerRadius:8,fill:'#FFF',stroke:i.bordered&&i.variant!=='borderless'?'#F0F0F0':'#00000000',strokeWidth:1,strokeAlignment:'inner',effect:i.hoverable?{type:'shadow',shadowType:'outer',color:'#00000014',blur:12,offset:{x:0,y:4}}:undefined});
if(cover)nodes.push({type:'rectangle',name:'Card cover',x:0,y:0,width:W,height:cover,cornerRadius:[8,8,0,0],fill:{type:'image',enabled:true,url:'images/ant.design/bd0fe172a01aaf60.png',mode:'fill'}});
if(i.title){const y=cover;nodes.push(txt(i.title,16,y,Math.max(60,W-96),header,small?14:16,'#000000E0','600'));if(i.extra)nodes.push(txt(i.extra,W-76,y,60,header,13,i.primaryColor||'#1677FF','400','right'));nodes.push({type:'rectangle',name:'Header divider',x:0,y:y+header-1,width:W,height:1,fill:'#F0F0F0'});}
const bodyY=cover+header,bodyH=H-bodyY-actions;
if(i.loading){for(let n=0;n<3;n++)nodes.push({type:'rectangle',name:'Skeleton line',x:16,y:bodyY+18+n*22,width:W-32-(n===2?80:0),height:10,cornerRadius:5,fill:'#F0F0F0'});}else {let child;try{child=JSON.parse(i.children)}catch{}if(child&&typeof child==='object'&&child.type)nodes.push({...child,x:small?12:24,y:bodyY+(small?12:24),width:W-(small?24:48),height:Math.max(22,bodyH-(small?24:48))});else nodes.push(txt(i.children||'Card content',small?12:24,bodyY+(small?12:24),W-(small?24:48),Math.max(22,bodyH-(small?24:48)),14,'#000000E0','400'));}
if(actions){nodes.push({type:'rectangle',name:'Actions divider',x:0,y:H-actions,width:W,height:1,fill:'#F0F0F0'});['Like','Edit','More'].forEach((a,n)=>nodes.push(txt(a,n*W/3,H-actions,W/3,actions,13,'#00000073','400','center')));}
return nodes;
