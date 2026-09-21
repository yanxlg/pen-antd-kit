/**
 * @schema 2.18
 * @input checked: boolean = true
 * @input size: enum("default", "small") = "default"
 * @input loading: boolean = false
 * @input disabled: boolean = false
 * @input value: boolean = false
 * @input primaryColor: color = #1677FF
 * @input checkedChildren: string = ""
 * @input unCheckedChildren: string = ""
 */

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left") => ({type:"text", content:String(content), x, y, width, height:Math.max(16,fontSize+4), fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align});
const box = (x, y, width, height, fill="#FFFFFF", radius=6, stroke="#D9D9D9", strokeWidth=1) => ({type:"rectangle", x, y, width, height, cornerRadius:radius, fill, stroke, strokeWidth, strokeAlignment:"inner"});
const circle = (x, y, size, fill="#1677FF", stroke=undefined) => ({type:"ellipse", x, y, width:size, height:size, fill, stroke, strokeWidth:stroke?1:0});
const nodes = [];
const disabled = i.disabled ? "#00000040" : "#000000E0";
const primary = i.danger ? "#FF4D4F" : (i.primaryColor || "#1677FF");
const borderCol = i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";
const bgFill = i.variant === "filled" ? "#00000005" : "#FFFFFF";
const strokeCol = i.variant === "borderless" ? "#00000000" : borderCol;

// Navigation nested controls
const sh=i.size==='small'?16:22,dot=sh-4,label=i.checked?i.checkedChildren:i.unCheckedChildren;
const textMinWidth=label?Math.ceil(label.length*8+28):0;
const minSw=i.size==='small'?28:44;
const sw=Math.max(minSw,textMinWidth,pencil.width||0),y=(pencil.height-sh)/2;
nodes.push({type:'rectangle',name:'Switch track',x:0,y,width:sw,height:sh,cornerRadius:sh/2,fill:i.checked?primary:'#00000040',opacity:i.disabled?.65:1});
nodes.push({type:'ellipse',name:'Switch handle',x:i.checked?sw-dot-2:2,y:y+2,width:dot,height:dot,fill:'#fff'});
if(label){
  const labelW=sw-dot-10;
  const labelX=i.checked?7:dot+5;
  nodes.push({type:'text',name:'Switch label',content:label,x:labelX,y,width:labelW,height:sh,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:12,lineHeight:1,textAlign:'center',textAlignVertical:'middle',fill:'#fff'});
}
return nodes;
