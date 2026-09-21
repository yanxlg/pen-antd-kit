/**
 * @schema 2.18
 * @input children: string = "Dropdown"
 * @input type: enum("default", "primary", "dashed", "text", "link") = "default"
 * @input danger: boolean = false
 * @input disabled: boolean = false
 * @input size: enum("small", "middle", "large") = "middle"
 * @input icon: enum("DownOutlined", "EllipsisOutlined", "UserOutlined", "LoadingOutlined") = "DownOutlined"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(80,pencil.width),H=i.size==='small'?24:i.size==='large'?40:32,split=i.size==='small'?24:Math.max(32,Math.min(40,H)),primary=i.primaryColor||'#1677FF',isPrimary=i.type==='primary',danger=!!i.danger;
const bg=isPrimary?(danger?'#FF4D4F':primary):'#FFFFFF',border=danger?'#FF4D4F':isPrimary?primary:'#D9D9D9',color=i.disabled?'#00000040':isPrimary?'#FFFFFF':danger?'#FF4D4F':'#000000E0';
const iconX=W-split/2,iconY=H/2,iconName=i.icon||'DownOutlined';
const iconNodes=iconName==='EllipsisOutlined'?[[-5,0],[0,0],[5,0]].map(([dx,dy])=>({type:'ellipse',name:'Ellipsis dot',x:iconX+dx-1,y:iconY+dy-1,width:2,height:2,fill:color})):
 iconName==='UserOutlined'?[{type:'ellipse',name:'User head',x:iconX-3,y:iconY-6,width:6,height:6,fill:'#00000000',stroke:color,strokeWidth:1.3},{type:'path',name:'User shoulders',x:iconX-6,y:iconY+1,width:12,height:6,geometry:'M 1 6 C 1 1 11 1 11 6',stroke:color,strokeWidth:1.3,fill:'#00000000'}]:
 iconName==='LoadingOutlined'?[{type:'ellipse',name:'Loading track',x:iconX-6,y:iconY-6,width:12,height:12,fill:'#00000000',stroke:i.disabled?'#00000020':'#00000018',strokeWidth:1.5},{type:'path',name:'Loading arc',x:iconX-6,y:iconY-6,width:12,height:12,geometry:'M 6 0 A 6 6 0 0 1 12 6',stroke:color,strokeWidth:1.5,fill:'#00000000'}]:
 [{type:'path',name:'Down icon',x:iconX-5,y:iconY-3,width:10,height:6,geometry:'M 1 1 L 5 5 L 9 1',stroke:color,strokeWidth:1.5,fill:'#00000000'}];
return [
 {type:'rectangle',name:'Main button surface',x:0,y:0,width:W-split+1,height:H,cornerRadius:[6,0,0,6],fill:bg,stroke:border,strokeWidth:1,strokeAlignment:'inner'},
 {type:'text',name:'Button label',content:String(i.children||'Dropdown'),x:4,y:0,width:Math.max(1,W-split-8),height:H,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:i.size==='small'?12:14,textAlign:'center',textAlignVertical:'middle',lineHeight:1,fill:color},
 {type:'rectangle',name:'Menu button surface',x:W-split,y:0,width:split,height:H,cornerRadius:[0,6,6,0],fill:bg,stroke:border,strokeWidth:1,strokeAlignment:'inner'},
 ...iconNodes
];
