/**
 * @schema 2.18
 * @input children: string = "记住账号"
 * @input checked: boolean = true
 * @input indeterminate: boolean = false
 * @input disabled: boolean = false
 * @input value: string = ""
 * @input name: string = ""
 * @input skipGroup: boolean = false
 * @input type: string = ""
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(16, pencil.width), H = Math.max(24, pencil.height);
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

  const s = 16;
  const isChecked = !!i.checked;
  const isMixed = !!i.indeterminate;
  const controlY = (pencil.height-s)/2;
  const activeFill = i.disabled ? "#F5F5F5" : primary;
  const activeMark = i.disabled ? "#BFBFBF" : "#FFFFFF";
  nodes.push({
    type:"rectangle", x:0, y:controlY, width:s, height:s, cornerRadius:4,
    fill:isChecked ? activeFill : "#FFFFFF",
    stroke:i.disabled ? "#D9D9D9" : (isChecked ? primary : "#D9D9D9"),
    strokeWidth:1,
  });
  if (isMixed) {
    nodes.push({type:"rectangle", x:4, y:controlY+4, width:8, height:8, cornerRadius:1, fill:i.disabled?"#BFBFBF":primary});
  } else if (isChecked) {
    nodes.push({
      type:"path", x:3, y:controlY+4, width:10, height:8,
      viewBox:[0,0,10,8],
      geometry:"M0 3.5 L1.4 2.1 L3.8 4.5 L8.6 0 L10 1.4 L3.8 7.3 Z",
      fill:activeMark,
    });
  }
  if(i.children)nodes.push(text(i.children, s+8, (pencil.height-18)/2, W-s-8, disabled));
return nodes;
