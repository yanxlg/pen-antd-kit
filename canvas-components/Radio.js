/**
 * @schema 2.18
 * @input children: string = "选项一"
 * @input checked: boolean = true
 * @input disabled: boolean = false
 * @input name: string = ""
 * @input skipGroup: boolean = false
 * @input type: string = ""
 * @input primaryColor: color = #1677FF
 * @input optionType: enum("default", "button") = "default"
 * @input buttonStyle: enum("outline", "solid") = "outline"
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
if(i.optionType==='button'){
 const selected=!!i.checked,solid=i.buttonStyle==='solid',color=i.disabled?'#00000040':selected?(solid?'#fff':primary):'#000000e0';
 nodes.push({type:'rectangle',x:0,y:0,width:pencil.width,height:pencil.height,fill:selected&&solid?primary:'#fff',stroke:selected?primary:'#d9d9d9',strokeWidth:1});
 nodes.push({type:'text',name:'Radio label',content:i.children||'',x:0,y:0,width:pencil.width,height:pencil.height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:1.5714,textAlign:'center',textAlignVertical:'middle',fill:color});
 return nodes;
}
  const s = 16;
  const isChecked = i.checked;
  nodes.push({type:"ellipse", x:0, y:(h-s)/2, width:s, height:s, fill:"#FFFFFF", stroke:i.disabled?"#00000040":(isChecked?primary:"#D9D9D9"), strokeWidth:1});
  if (isChecked) nodes.push({type:"ellipse", x:4, y:(h-s)/2+4, width:8, height:8, fill:primary});
  nodes.push(text(i.children||"单选框", s+8, (h-18)/2, W-s-8, disabled));
return nodes;
