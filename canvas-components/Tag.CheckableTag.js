/**
 * @schema 2.18
 * @input children: string = "Tag 1"
 * @input checked: boolean = false
 * @input disabled: boolean = false
 * @input icon: string = ""
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height);let styles={};try{styles=JSON.parse(i.styles||'{}')}catch{}const s=styles.root||{};
const fg=s.color||(i.disabled?'#00000040':i.checked?'#FFFFFF':'#000000E0'),size=s.fontSize||12,lineHeight=s.lineHeight||20,left=i.icon?7+size+7:7,children=[];
if(i.icon)children.push({type:'ref',ref:'antd-icon-live-origin',name:'icon',x:7,y:(H-size)/2,width:size,height:size,inputs:{type:i.icon,name:i.icon,fontSize:size,color:fg}});
children.push({type:'text',name:'children',content:String(i.children??''),x:left,y:-1.5,width:Math.max(1,W-left-7),height:H,textGrowth:'fixed-width-height',textAlignVertical:'middle',fontFamily:'AlibabaSans',fontSize:size,lineHeight:lineHeight/size,fill:fg});
return [{type:'frame',name:'Checkable tag root',x:0,y:0,width:W,height:H,layout:'none',cornerRadius:s.borderRadius??4,fill:s.backgroundColor||(i.checked?'#1677FF':'#00000000'),stroke:s.borderColor||'#00000000',strokeWidth:s.borderWidth||0,strokeAlignment:'inner',children}];
