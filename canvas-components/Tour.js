/**
 * @schema 2.18
 * @input title: string = "新功能引导"
 * @input description: string = "点击此处可以切换深浅色主题模式与紧凑排版。"
 * @input current: number = 1
 * @input total: number = 3
 * @input defaultCurrent: number = 0
 * @input defaultOpen: boolean = false
 * @input disabledInteraction: boolean = false
 * @input keyboard: boolean = false
 * @input open: boolean = false
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight", "center", "left", "right", "bottom", "top", "leftTop", "leftBottom", "rightTop", "rightBottom") = "bottomLeft"
 * @input type: enum("default", "primary") = "default"
 * @input zIndex: number = 0
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

  nodes.push(box(0, 0, W, H, i.type==="primary"?primary:"#FFFFFF", 8, "#E8E8E8", 1));
  nodes.push(text((i.title||"新功能引导"), 12, 12, W-24, i.type==="primary"?"#FFFFFF":"#000000E0", 14, "600"));
  nodes.push(text(i.description||"点击此处可以快速开始项目。", 12, 36, W-24, i.type==="primary"?"#FFFFFF":"#000000A6", 12));
  nodes.push(text((i.current||1) + "/" + (i.total||3), 12, H - 24, 40, "#00000073", 11));
  nodes.push(box(W - 64, H - 28, 52, 22, primary, 4, primary));
  nodes.push(text(i.current>=i.total?"Finish":"Next", W - 56, H - 24, 40, "#FFFFFF", 11));
return nodes;
