/**
 * @schema 2.18
 * @input children: string = "Dropdown"
 * @input type: enum("default", "primary", "dashed", "text", "link") = "default"
 * @input danger: boolean = false
 * @input disabled: boolean = false
 * @input size: enum("small", "middle", "large") = "middle"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(96,pencil.width),H=i.size==='small'?24:i.size==='large'?40:32,split=Math.max(32,Math.min(40,H)),primary=i.primaryColor||'#1677FF',isPrimary=i.type==='primary',danger=!!i.danger;
const bg=isPrimary?(danger?'#FF4D4F':primary):'#FFFFFF',border=danger?'#FF4D4F':isPrimary?primary:'#D9D9D9',color=i.disabled?'#00000040':isPrimary?'#FFFFFF':danger?'#FF4D4F':'#000000E0';
return [
 {type:'rectangle',name:'Main button surface',x:0,y:0,width:W-split+1,height:H,cornerRadius:[6,0,0,6],fill:bg,stroke:border,strokeWidth:1,strokeAlignment:'inner'},
 {type:'text',name:'Button label',content:String(i.children||'Dropdown'),x:12,y:0,width:W-split-23,height:H,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,textAlign:'center',lineHeight:H/14,fill:color},
 {type:'rectangle',name:'Menu button surface',x:W-split,y:0,width:split,height:H,cornerRadius:[0,6,6,0],fill:bg,stroke:border,strokeWidth:1,strokeAlignment:'inner'},
 {type:'path',name:'Down icon',x:W-split/2-5,y:H/2-2,width:10,height:6,geometry:'M 1 1 L 5 5 L 9 1',stroke:color,strokeWidth:1.5,fill:'#00000000'}
];
