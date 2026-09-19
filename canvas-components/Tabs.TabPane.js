/**
 * @schema 2.18
 * @input active: boolean = false
 * @input animated: boolean = false
 * @input closable: boolean = false
 * @input destroyInactiveTabPane: boolean = false
 * @input destroyOnHidden: boolean = false
 * @input disabled: boolean = false
 * @input forceRender: boolean = false
 * @input tabKey: string = ""
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

  const items = (i.items || "概览|详情|设置").split("|");
  const tw = Math.min(W / items.length, 90);
  items.forEach((it, n) => {
    const active = n === 0;
    nodes.push(text(it, n * tw + 8, 8, tw - 16, active ? primary : "#000000A6", 13, active ? "600" : "normal"));
    if (active) nodes.push({type:"rectangle", x:n * tw + 6, y:28, width:tw - 12, height:2, fill:primary});
  });
  nodes.push(box(0, 29, W, 1, "#F0F0F0"));
return nodes;
