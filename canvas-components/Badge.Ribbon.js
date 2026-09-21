/**
 * @schema 2.18
 * @input children: string = ""
 * @input text: string = "Hippies"
 * @input color: color = #FF4D4F
 * @input styles: string = "{}"
 * @input placement: enum("start", "end") = "end"
 */
const i=pencil.input||{},W=Math.max(120,pencil.width),H=Math.max(64,pencil.height),start=i.placement==='start',nodes=[];
let child=null;if(i.children){try{child=JSON.parse(i.children)}catch{child=null}}if(child)nodes.push({...child,name:child.name||'Ribbon child',x:0,y:0,width:W,height:H});else nodes.push({type:'rectangle',name:'Card surface',x:0,y:0,width:W,height:H,cornerRadius:8,fill:'#FFFFFF',stroke:'#F0F0F0',strokeWidth:1,strokeAlignment:'inner'});
let styles={};try{styles=JSON.parse(i.styles||'{}')}catch{};const ribbonW=String(i.text||'Hippies')==='Hippies'?66:Math.max(66,String(i.text||'Hippies').length*8.2+16),x=start?-8:W-ribbonW+8;
nodes.push({type:'rectangle',name:'Ribbon surface',x,y:8,width:ribbonW,height:22,cornerRadius:start?[0,4,4,0]:[4,0,0,4],fill:i.color||'#FF4D4F'});
nodes.push({type:'text',name:'Ribbon text',content:String(i.text||'Hippies'),x:x+8,y:8,width:ribbonW-16,height:22,textGrowth:'fixed-width-height',textAlign:'center',fontFamily:'Inter',fontSize:14,fontWeight:styles.indicator?.fontWeight||'400',textAlignVertical:'middle',lineHeight:22/14,fill:'#FFFFFF'});
nodes.push({type:'path',name:'Ribbon fold',x:start?x:x+ribbonW-8,y:30,width:8,height:6,geometry:start?'M 0 0 L 8 0 L 8 6 Z':'M 0 0 L 8 0 L 0 6 Z',viewBox:[0,0,8,6],fill:i.color||'#1677FF',opacity:.65});
return nodes;
