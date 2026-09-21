/**
 * @schema 2.18
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input componentSize: enum("small", "middle", "large") = "middle"
 * @input componentDisabled: boolean = false
 * @input variant: enum("outlined", "filled", "borderless") = "outlined"
 * @input primaryColor: color = #1677FF
 * @input children: string = "Configured content"
 */
const i=pencil.input||{},W=Math.max(240,pencil.width),H=Math.max(80,pencil.height),nodes=[];
const primary=i.primaryColor||'#1677FF',rtl=i.direction==='rtl';
nodes.push({type:'rectangle',name:'Provider surface',x:0,y:0,width:W,height:H,cornerRadius:8,fill:'#FFFFFF',stroke:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner'});
nodes.push({type:'rectangle',name:'Theme accent',x:0,y:0,width:4,height:H,cornerRadius:[8,0,0,8],fill:primary});
nodes.push({type:'text',name:'Configured content',content:String(i.children||'Configured content'),x:16,y:14,width:W-32,height:24,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,fontWeight:'500',textAlign:rtl?'right':'left',textAlignVertical:'middle',fill:i.componentDisabled?'#00000040':'#000000E0'});
nodes.push({type:'text',name:'Provider settings',content:`${i.direction||'ltr'} / ${i.componentSize||'middle'} / ${i.variant||'outlined'}`,x:16,y:44,width:W-32,height:20,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:12,textAlign:rtl?'right':'left',textAlignVertical:'middle',fill:'#00000073'});
return nodes;
