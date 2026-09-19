/**
 * @schema 2.18
 * @input items: string = "This is panel header 1|This is panel header 2|This is panel header 3"
 * @input activeKey: number = 1
 * @input accordion: boolean = false
 * @input bordered: boolean = true
 * @input collapsible: enum("icon", "disabled", "header") = "header"
 * @input expandIconPlacement: enum("end", "start") = "start"
 * @input ghost: boolean = false
 * @input size: enum("middle", "large", "small") = "middle"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(220,pencil.width),H=Math.max(120,pencil.height),items=(i.items||'Panel 1|Panel 2|Panel 3').split('|'),nodes=[],hh=i.size==='large'?48:i.size==='small'?32:40,active=Math.max(-1,Math.min(items.length-1,Number(i.activeKey??1)-1)),body=Math.max(48,H-hh*items.length);
nodes.push({type:'rectangle',name:'Collapse surface',x:0,y:0,width:W,height:H,cornerRadius:i.ghost?0:8,fill:i.ghost?'#00000000':'#FAFAFA',stroke:i.bordered&&!i.ghost?'#D9D9D9':'#00000000',strokeWidth:1,strokeAlignment:'inner'});
let y=0;items.forEach((label,n)=>{const open=n===active;nodes.push({type:'rectangle',name:'Panel header',x:0,y,width:W,height:hh,fill:i.ghost?'#00000000':'#FAFAFA',stroke:'#F0F0F0',strokeWidth:{bottom:1},strokeAlignment:'inner'});const icon=i.expandIconPlacement==='end'?W-28:12;nodes.push({type:'text',name:'Expand icon',content:open?'⌄':'›',x:icon,y,width:20,height:hh,textGrowth:'fixed-width-height',textAlign:'center',fontFamily:'Inter',fontSize:15,fill:i.collapsible==='disabled'?'#00000040':'#000000E0'});nodes.push({type:'text',name:'Panel title',content:label,x:i.expandIconPlacement==='end'?16:40,y,width:W-56,height:hh,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:hh/14,fill:i.collapsible==='disabled'?'#00000040':'#000000E0'});y+=hh;if(open){nodes.push({type:'rectangle',name:'Panel content',x:0,y,width:W,height:body,fill:'#FFF'});nodes.push({type:'text',name:'Panel content text',content:'A dog is a type of domesticated animal. Known for its loyalty and faithfulness.',x:16,y:y+14,width:W-32,height:body-24,textGrowth:'fixed-width',fontFamily:'Inter',fontSize:14,lineHeight:1.57,fill:'#000000E0'});y+=body;}});
return nodes;
