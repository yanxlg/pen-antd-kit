/**
 * @schema 2.18
 * @input placeholder: string = "请输入内容"
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input disabled: boolean = false
 * @input allowClear: boolean = true
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input multiline: boolean = false
 * @input search: boolean = false
 * @input password: boolean = false
 * @input otp: boolean = false
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input bordered: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input htmlSize: number = 0
 * @input list: string = ""
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input src: string = ""
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
const strokeCol = i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : borderCol;
const compactRadius = (radius=6) => {
  const placement = i.compactPlacement || "none";
  if (placement === "none") return radius;
  if (placement === "middle") return 0;
  if (i.compactOrientation === "vertical") return placement === "start" ? [radius,radius,0,0] : [0,0,radius,radius];
  return placement === "start" ? [radius,0,0,radius] : [0,radius,radius,0];
};
const iconPath = (geometry, viewBox, x, y, size=14, color="#00000040") => ({
  type:"path", x, y, width:size, height:size, viewBox, geometry, fill:color
});

  const fieldW = Math.max(1, pencil.width);
  const fieldH = i.multiline ? H : h;
  if (i.otp) {
    const count=6,gap=8,bw=(fieldW-gap*(count-1))/count;
    for(let n=0;n<count;n++){nodes.push(box(n*(bw+gap),0,bw,h,i.disabled?"#0000000A":bgFill,6,strokeCol));if(i.value)nodes.push(text(String(i.value)[n]||"",n*(bw+gap),7,bw,disabled,14,"normal","center"));}
    return nodes;
  }
  const fieldFill = i.disabled && i.variant !== "underlined" ? "#F5F5F5" : bgFill;
  nodes.push(box(0, 0, fieldW, fieldH, fieldFill, i.variant === "underlined" ? 0 : compactRadius(6), strokeCol));
  if (i.variant === "underlined") {
    nodes.push(box(0, fieldH - 1, fieldW, 1, borderCol, 0, borderCol, 0));
  }
  let curX = pad;
  if (i.prefix) {
    nodes.push(text(i.prefix, curX, (h-18)/2, 20, "#00000040", 13));
    curX += 20;
  }
  const raw = i.value !== undefined && i.value !== "" ? i.value : (i.placeholder ?? (i.prefix ? "" : "请输入内容"));
  const val = i.password && i.value ? "•".repeat(Math.max(6,String(i.value).length)) : raw;
  const col = i.value ? disabled : "#00000040";
  const center = i.textAlign === "center";
  const suffixValue = i.suffix ? String(i.suffix) : "";
  const suffixWidth = suffixValue ? Math.max(16, suffixValue.length * 7) : 0;
  const suffixRight = i.search ? 40 + pad : pad;
  const clearVisible = i.allowClear && i.value && !i.search;
  const suffixSpace = suffixRight + suffixWidth + (suffixValue ? 8 : 0) + (clearVisible ? 20 : 0);
  nodes.push(text(val, center ? 0 : curX, i.multiline?10:(h-18)/2, center ? fieldW : fieldW - curX - suffixSpace, col, 14, "normal", center ? "center" : "left"));
  if (clearVisible) {
    const clearX = fieldW - suffixRight - suffixWidth - (suffixValue ? 8 : 0) - 16;
    nodes.push(text("✕", clearX, (h-18)/2, 16, "#00000040", 12, "normal", "center"));
  }
  if (suffixValue) {
    nodes.push(text(suffixValue, fieldW - suffixRight - suffixWidth, (h-18)/2, suffixWidth, i.disabled ? "#00000040" : "#00000073", 14, "normal", "right"));
  }
  if(i.search){nodes.push(box(fieldW-40,0,40,h,primary,[0,6,6,0],primary));nodes.push(text("⌕",fieldW-40,6,40,"#fff",16,"normal","center"));}
return nodes;
