/**
 * @schema 2.18
 * @input header: string = "Panel header"
 * @input children: string = "Panel content"
 * @input extra: string = ""
 * @input collapsible: enum("icon", "disabled", "header") = "header"
 * @input forceRender: boolean = false
 * @input showArrow: boolean = true
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(46,pencil.height),nodes=[{type:'rectangle',x:0,y:0,width:W,height:46,fill:'#00000005',cornerRadius:[8,8,0,0]}];
if(i.showArrow!==false)nodes.push({type:'ref',ref:'antd-icon-live-origin',x:16,y:17,width:12,height:12,inputs:{type:'DownOutlined',name:'DownOutlined',fontSize:12,color:i.collapsible==='disabled'?'#00000040':'#000000E0'}});
nodes.push({type:'text',content:i.header||'',x:i.showArrow===false?16:40,y:0,width:W-56,height:46,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,fill:'#000000E0',textAlignVertical:'middle'});
let child;try{child=JSON.parse(i.children)}catch{}
if(child?.type)nodes.push({...child,x:16,y:62,width:W-32});else nodes.push({type:'text',content:i.children||'',x:16,y:62,width:W-32,height:Math.max(22,H-78),textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,fill:'#000000E0'});
return nodes;
