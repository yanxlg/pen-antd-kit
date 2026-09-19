/**
 * @schema 2.18
 * @input value: number = 3
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input min: number = 0
 * @input max: number = 100
 * @input controls: boolean = true
 * @input mode: enum("input", "spinner") = "input"
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input placeholder: string = ""
 * @input precision: number = 0
 * @input stringMode: boolean = false
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const size = i.size === "small" || i.size === "large" ? i.size : "middle";
const pad = size === "small" ? 8 : 12;
const h = size === "small" ? 24 : size === "large" ? 40 : 32;
const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left") => ({type:"text", content:String(content), x, y, width, height:Math.max(16,fontSize+4), fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align});
const box = (x, y, width, height, fill="#FFFFFF", radius=6, stroke="#D9D9D9", strokeWidth=1) => ({type:"rectangle", x, y, width, height, cornerRadius:radius, fill, stroke, strokeWidth, strokeAlignment:"inner"});
const circle = (x, y, size, fill="#1677FF", stroke=undefined) => ({type:"ellipse", x, y, width:size, height:size, fill, stroke, strokeWidth:stroke?1:0});
const nodes = [];
const disabled = i.disabled ? "#00000040" : "#000000E0";
const primary = i.danger ? "#FF4D4F" : (i.primaryColor || "#1677FF");
const borderCol = i.disabled ? "#D9D9D9" : i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";
const bgFill = i.variant === "filled" ? "#00000005" : "#FFFFFF";
const strokeCol = i.variant === "borderless" ? "#00000000" : borderCol;

  const radius = size === "small" ? 4 : size === "large" ? 8 : 6;
  const fill = i.disabled ? "#0000000A" : bgFill;
  const stroke = i.variant === "borderless" || i.variant === "filled" ? "#00000000" : strokeCol;
  nodes.push(box(0, 0, W, h, fill, radius, stroke));
  if (i.variant === "underlined") nodes.push({type:"rectangle",x:0,y:h-1,width:W,height:1,fill:borderCol});

  const fontSize = size === "large" ? 16 : 14;
  if (i.mode === "spinner" && !i.disabled) {
    const actionW = h;
    nodes.push({type:"rectangle",x:actionW,y:0,width:1,height:h,fill:"#D9D9D9"});
    nodes.push({type:"rectangle",x:W-actionW-1,y:0,width:1,height:h,fill:"#D9D9D9"});
    nodes.push(text("−",0,(h-(fontSize+4))/2,actionW,"#000000E0",fontSize,"normal","center"));
    nodes.push(text("+",W-actionW,(h-(fontSize+4))/2,actionW,"#000000E0",fontSize,"normal","center"));
    nodes.push(text(String(i.value ?? i.placeholder ?? ""),actionW,(h-(fontSize+4))/2,W-actionW*2,disabled,fontSize,"normal","center"));
  } else {
    let textX = pad;
    let textRight = W - pad;
    if (i.prefix) {
      nodes.push(text(i.prefix,textX,(h-(fontSize+4))/2,20,disabled,fontSize));
      textX += 24;
    }
    if (i.suffix) {
      nodes.push(text(i.suffix,W-pad-24,(h-(fontSize+4))/2,24,disabled,fontSize,"normal","right"));
      textRight -= 28;
    }
    const raw = i.value !== undefined && i.value !== null ? i.value : i.placeholder;
    const valueColor = raw === "" || raw === undefined ? "#00000040" : disabled;
    nodes.push(text(String(raw ?? ""),textX,(h-(fontSize+4))/2,Math.max(1,textRight-textX),valueColor,fontSize));
  }
return nodes;
