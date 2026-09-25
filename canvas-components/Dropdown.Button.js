/**
 * @schema 2.18
 * @input children: string = "Dropdown"
 * @input type: enum("default", "primary", "dashed", "text", "link") = "default"
 * @input danger: boolean = false
 * @input disabled: boolean = false
 * @input loading: boolean = false
 * @input size: enum("small", "middle", "large") = "middle"
 * @input icon: enum("DownOutlined", "EllipsisOutlined", "UserOutlined", "LoadingOutlined") = "DownOutlined"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(64,pencil.width),H=i.size==='small'?24:i.size==='large'?40:32,split=H,primary=i.primaryColor||'#1677FF',isPrimary=i.type==='primary',danger=!!i.danger,loading=!!i.loading;
const bg=isPrimary?(danger?'#FF4D4F':primary):'#FFFFFF',border=danger?'#FF4D4F':isPrimary?primary:'#D9D9D9',color=i.disabled?'#00000040':isPrimary?'#FFFFFF':danger?'#FF4D4F':'#000000E0';
const iconX=W-split/2,iconY=H/2,iconName=i.icon||'DownOutlined',iconSize=i.size==='small'?12:i.size==='large'?16:14,radius=i.size==='small'?4:i.size==='large'?8:6,fontSize=i.size==='large'?16:14;
const iconNodes=[{type:'script',name:iconName,scriptUri:'../canvas-components/Icon.js',x:iconX-iconSize/2,y:iconY-iconSize/2,width:iconSize,height:iconSize,inputs:{type:iconName,name:iconName,fontSize:iconSize,color}}];
const label=String(i.children||'Dropdown'),mainW=W-split+1,labelW=Math.min(mainW-16,Math.max(1,label.length*(i.size==='small'?7.5:8))),loadingGroupW=iconSize+8+labelW,loadingX=(mainW-loadingGroupW)/2;
return [
 {type:'rectangle',name:'Main button surface',x:0,y:0,width:W-split+1,height:H,cornerRadius:[radius,0,0,radius],fill:bg,stroke:border,strokeWidth:1,strokeAlignment:'inner'},
 ...(loading?[{type:'script',name:'LoadingOutlined',scriptUri:'../canvas-components/Icon.js',x:loadingX,y:(H-iconSize)/2,width:iconSize,height:iconSize,inputs:{type:'LoadingOutlined',name:'LoadingOutlined',fontSize:iconSize,color}}]:[]),
 {type:'text',name:'Button label',content:label,x:loading?loadingX+iconSize+8:4,y:0,width:loading?labelW:Math.max(1,W-split-8),height:H,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize,textAlign:loading?'left':'center',textAlignVertical:'middle',lineHeight:1,fill:color},
 {type:'rectangle',name:'Menu button surface',x:W-split,y:0,width:split,height:H,cornerRadius:[0,radius,radius,0],fill:bg,stroke:border,strokeWidth:1,strokeAlignment:'inner'},
 ...iconNodes
];
