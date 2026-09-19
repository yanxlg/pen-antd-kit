/**
 * @schema 2.18
 * @input children: string = "Radio"
 * @input checked: boolean = false
 * @input disabled: boolean = false
 * @input buttonStyle: enum("outline", "solid") = "outline"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},primary=i.primaryColor||'#1677FF',selected=!!i.checked,solid=i.buttonStyle==='solid';
const color=i.disabled?'#00000040':selected?(solid?'#FFFFFF':primary):'#000000E0';
const fill=selected&&solid?primary:'#FFFFFF',stroke=selected?primary:'#D9D9D9';
const radius=i.compactPlacement==='start'?[6,0,0,6]:i.compactPlacement==='middle'?0:i.compactPlacement==='end'?[0,6,6,0]:6;
return [
 {type:'rectangle',name:'Radio button surface',x:0,y:0,width:pencil.width,height:pencil.height,fill,stroke,strokeWidth:1,strokeAlignment:'inner',cornerRadius:radius},
 {type:'text',name:'children',content:i.children||'Radio',x:8,y:0,width:Math.max(1,pencil.width-16),height:pencil.height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:1.5714,textAlign:'center',textAlignVertical:'middle',fill:color}
];
