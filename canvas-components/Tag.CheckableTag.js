/**
 * @schema 2.18
 * @input children: string = "Tag 1"
 * @input checked: boolean = false
 * @input disabled: boolean = false
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},label=String(i.children||'Tag 1'),W=Math.max(48,pencil.width),H=Math.max(24,pencil.height),checked=!!i.checked;
return [
 {type:'rectangle',name:'Checkable tag surface',x:0,y:0,width:W,height:H,cornerRadius:6,fill:checked?(i.primaryColor||'#1677FF'):'#00000000'},
 {type:'text',name:'Checkable tag label',content:label,x:7,y:0,width:W-14,height:H,textGrowth:'fixed-width-height',textAlign:'center',fontFamily:'Inter',fontSize:14,lineHeight:H/14,fill:i.disabled?'#00000040':checked?'#FFFFFF':'#000000E0'}
];
