/**
 * @schema 2.18
 * @input value: string = "#1677FF"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input showText: boolean = true
 * @input disabled: boolean = false
 * @input allowClear: boolean = false
 * @input defaultFormat: enum("hex", "rgb", "hsb") = "hex"
 * @input destroyOnHidden: boolean = false
 * @input disabledAlpha: boolean = false
 * @input disabledFormat: boolean = false
 * @input format: enum("hex", "rgb", "hsb") = "hex"
 * @input open: boolean = false
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight", "left", "right", "bottom", "top", "leftTop", "leftBottom", "rightTop", "rightBottom") = "bottomLeft"
 * @input trigger: enum("click", "hover") = "click"
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(i.showText ? 80 : 24, pencil.width), H = Math.max(24, pencil.height);
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

  const swatch=Math.max(12,h-12);
  nodes.push(box(0,0,W,h,i.disabled?"#0000000A":"#FFFFFF",6,"#D9D9D9"));
  nodes.push(box(6,(h-swatch)/2,swatch,swatch,i.value||primary,4,"#0000001F"));
  if(i.showText)nodes.push(text(i.value||primary,swatch+12,(h-18)/2,W-swatch-18,i.disabled?"#00000040":"#000000E0",13));
return nodes;
