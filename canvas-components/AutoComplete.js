/**
 * @schema 2.18
 * @input placeholder: string = "输入搜索关键词"
 * @input value: string = ""
 * @input options: string = "Ant Design|AntV|Ant Design Pro"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input animation: string = ""
 * @input autoClearSearchValue: boolean = false
 * @input backfill: boolean = false
 * @input bordered: boolean = false
 * @input choiceTransitionName: string = ""
 * @input defaultActiveFirstOption: boolean = false
 * @input defaultOpen: boolean = false
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input listHeight: number = 0
 * @input listItemHeight: number = 0
 * @input maxCount: number = 0
 * @input maxLength: number = 0
 * @input maxTagTextLength: number = 0
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight") = "bottomLeft"
 * @input searchValue: string = ""
 * @input showArrow: boolean = false
 * @input transitionName: string = ""
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input virtual: boolean = false
 * @input primaryColor: color = #1677FF
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

  nodes.push(box(0,0,W,h,i.disabled?"#0000000A":bgFill,6,strokeCol));
  nodes.push(text(i.value||i.placeholder||"input here",12,(h-18)/2,W-24,i.value?disabled:"#00000040",14));
  if(i.open){const opts=String(i.options||"Ant Design|AntV|Ant Design Pro").split("|");nodes.push(box(0,h+4,W,opts.length*32+8,"#fff",8,"#f0f0f0"));opts.forEach((o,n)=>{if(n===0)nodes.push(box(4,h+8+n*32,W-8,28,"#e6f4ff",4,"#e6f4ff"));nodes.push(text(o,12,h+12+n*32,W-24,n===0?primary:"#000000e0",13));});}
return nodes;
