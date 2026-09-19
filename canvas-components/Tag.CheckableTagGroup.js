/**
 * @schema 2.18
 * @input disabled: boolean = false
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

  const tw = Math.max(52, (i.label||"Tag").length*10 + 20);
  const tagBg = i.color === "success" ? "#F6FFED" : i.color === "error" ? "#FFF2F0" : i.color === "warning" ? "#FFFBE6" : i.color === "processing" ? "#E6F4FF" : "#FAFAFA";
  const tagBorder = i.color === "success" ? "#B7EB8F" : i.color === "error" ? "#FFCCC7" : i.color === "warning" ? "#FFE58F" : i.color === "processing" ? "#91CAFF" : "#D9D9D9";
  const tagCol = i.color === "success" ? "#52C41A" : i.color === "error" ? "#FF4D4F" : i.color === "warning" ? "#FAAD14" : i.color === "processing" ? primary : "#000000E0";
  nodes.push({type:"rectangle", x:0, y:2, width:tw, height:24, cornerRadius:4, fill:tagBg, stroke:i.bordered?tagBorder:"#00000000", strokeWidth:1});
  nodes.push(text(i.label||"标签", 8, 6, tw - (i.closable?22:16), tagCol, 12));
  if (i.closable) nodes.push(text("✕", tw - 16, 7, 10, "#00000073", 10));
return nodes;
