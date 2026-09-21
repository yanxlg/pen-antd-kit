/**
 * @schema 2.18
 * @input placeholder: string = "请选择地区"
 * @input value: string = "浙江 / 杭州 / 西湖"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input multiple: boolean = false
 * @input options: string = "Zhejiang|Hangzhou|West Lake"
 * @input allowClear: boolean = true
 * @input animation: string = ""
 * @input autoClearSearchValue: boolean = false
 * @input bordered: boolean = false
 * @input changeOnSelect: boolean = false
 * @input choiceTransitionName: string = ""
 * @input defaultOpen: boolean = false
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input expandTrigger: enum("click", "hover") = "click"
 * @input loading: boolean = false
 * @input maxCount: number = 0
 * @input maxLength: number = 0
 * @input maxTagTextLength: number = 0
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight") = "bottomLeft"
 * @input popupPrefixCls: string = ""
 * @input searchValue: string = ""
 * @input showArrow: boolean = false
 * @input showCheckedStrategy: enum("SHOW_PARENT", "SHOW_CHILD") = "SHOW_PARENT"
 * @input transitionName: string = ""
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input primaryColor: color = #1677FF
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
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
const compactRadius=(r=6)=>i.compactPlacement==="middle"?0:i.compactPlacement==="start"?(i.compactOrientation==="vertical"?[r,r,0,0]:[r,0,0,r]):i.compactPlacement==="end"?(i.compactOrientation==="vertical"?[0,0,r,r]:[0,r,r,0]):r;
const iconPath=(geometry,viewBox,x,y,size=14,color="#00000040")=>({type:"path",x,y,width:size,height:size,viewBox,geometry,fill:color});

  nodes.push(box(0, 0, W, h, i.disabled ? "#0000000A" : bgFill, compactRadius(6), strokeCol));
  if (i.multiple) {
    nodes.push(box(6, (h-22)/2, 48, 22, "#F5F5F5", 4, "#D9D9D9"));
    nodes.push(text("标签", 10, (h-16)/2, 36, "#000000D9", 11));
  } else {
    const val = i.value || (i.placeholder ?? "请选择");
    nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  }
  nodes.push(iconPath("M884 256H809L512 654.2L215 256H140L486.1 754.8C498.9 772.4 525.1 772.4 537.8 754.8Z",[64,64,896,896],W-24,(h-12)/2,12));
  if (i.open) {
    const pw=Math.max(360,W),ph=132,colW=pw/3,labels=(i.options||"Zhejiang|Hangzhou|West Lake").split("|");
    nodes.push({type:"rectangle",x:0,y:h+4,width:pw,height:ph,cornerRadius:6,fill:"#FFFFFF",stroke:"#F0F0F0",strokeWidth:1,effect:{type:"shadow",shadowType:"outer",blur:8,offset:{x:0,y:4},color:"#00000015"}});
    for(let col=0;col<3;col++){if(col>0)nodes.push(box(col*colW,h+4,1,ph,"#F0F0F0",0,"#F0F0F0",0));for(let row=0;row<3;row++){const active=row===0,label=row===0?(labels[col]||["Zhejiang","Hangzhou","West Lake"][col]):["Jiangsu","Ningbo","Xihu"][col]+" "+(row+1);if(active)nodes.push(box(col*colW+4,h+8+row*32,colW-8,28,"#E6F4FF",4,"#E6F4FF",0));nodes.push(text(label,col*colW+12,h+12+row*32,colW-30,active?primary:"#000000E0",13));if(col<2)nodes.push(text("›",(col+1)*colW-20,h+12+row*32,12,"#00000073",14));}}
  }
return nodes;
