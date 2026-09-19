/**
 * @schema 2.18
 * @input bordered: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input disabled: boolean = false
 * @input htmlSize: number = 0
 * @input inputPrefixCls: string = ""
 * @input list: string = ""
 * @input loading: boolean = false
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input placeholder: string = ""
 * @input size: enum("middle", "medium", "large", "small") = "middle"
 * @input src: string = ""
 * @input status: enum("", "error", "warning", "success", "validating") = ""
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
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

  const fieldW = Math.max(1, pencil.width);
  const fieldH = i.multiline ? H : h;
  if (i.otp) {
    const count=6,gap=8,bw=(fieldW-gap*(count-1))/count;
    for(let n=0;n<count;n++){nodes.push(box(n*(bw+gap),0,bw,h,i.disabled?"#0000000A":bgFill,6,strokeCol));if(i.value)nodes.push(text(String(i.value)[n]||"",n*(bw+gap),7,bw,disabled,14,"normal","center"));}
    return nodes;
  }
  nodes.push(box(0, 0, fieldW, fieldH, i.disabled ? "#0000000A" : bgFill, 6, strokeCol));
  let curX = pad;
  if (i.prefix) {
    nodes.push(text(i.prefix, curX, (h-18)/2, 20, "#00000040", 13));
    curX += 20;
  }
  const raw = i.value !== undefined && i.value !== "" ? i.value : (i.placeholder ?? (i.prefix ? "" : "请输入内容"));
  const val = i.password && i.value ? "•".repeat(Math.max(6,String(i.value).length)) : raw;
  const col = i.value ? disabled : "#00000040";
  const center = i.textAlign === "center";
  const suffixSpace=i.search?44:(i.allowClear?32:pad);
  nodes.push(text(val, center ? 0 : curX, i.multiline?10:(h-18)/2, center ? fieldW : fieldW - curX - suffixSpace, col, 14, "normal", center ? "center" : "left"));
  if (i.allowClear && i.value && !i.search) nodes.push(text("✕", fieldW - 24, (h-18)/2, 16, "#00000040", 12));
  if(i.search){nodes.push(box(fieldW-40,0,40,h,primary,[0,6,6,0],primary));nodes.push(text("⌕",fieldW-40,6,40,"#fff",16,"normal","center"));}
return nodes;
