/**
 * @schema 2.11
 * @input title: string = "Tooltip"
 * @input open: boolean = true
 * @input color: color = #000000D9
 * @input arrow: boolean = false
 */
const i=pencil.input||{},w=pencil.width||112,h=pencil.height||32;
if(i.open===false)return [];
const nodes=[{type:'rectangle',name:'Tooltip surface',width:w,height:h,cornerRadius:6,fill:i.color||'#000000D9'},
{type:'text',name:'title',context:'prop:title',content:i.title||'',x:8,y:(h-22)/2,width:w-16,height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:22/14,textAlign:'center',fill:'#FFFFFF'}];
if(i.arrow)nodes.push({type:'polygon',name:'Arrow',polygonCount:3,rotation:180,x:w/2+6,y:h+6,width:12,height:6,fill:i.color||'#000000D9'});
return nodes;
