/**
 * @schema 2.18
 * @input bordered: boolean = false
 * @input changeOnBlur: boolean = false
 * @input changeOnScroll: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input defaultOpen: boolean = false
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input disabled: boolean = false
 * @input hideDisabledOptions: boolean = false
 * @input inputReadOnly: boolean = false
 * @input list: string = ""
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input mode: enum("date", "time", "month", "week", "year", "quarter", "decade") = "date"
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input needConfirm: boolean = false
 * @input open: boolean = false
 * @input order: boolean = false
 * @input placeholder: string = ""
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight") = "bottomLeft"
 * @input preserveInvalidOnBlur: boolean = false
 * @input showHour: boolean = false
 * @input showMillisecond: boolean = false
 * @input showMinute: boolean = false
 * @input showNow: boolean = false
 * @input showSecond: boolean = false
 * @input showToday: boolean = false
 * @input showWeek: boolean = false
 * @input size: enum("middle", "medium", "large", "small") = "middle"
 * @input src: string = ""
 * @input status: enum("", "error", "warning", "success", "validating") = ""
 * @input transitionName: string = ""
 * @input use12Hours: boolean = false
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

  nodes.push(box(0, 0, W, h, bgFill, 6, strokeCol));
  const val = i.value || i.placeholder || "请选择日期";
  nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  nodes.push(text("◷", W - 24, (h-18)/2, 16, "#00000040", 14));
  if (i.open) {
    const pw = Math.max(W, 260), ph = 200;
    nodes.push({type:"rectangle", x:0, y:h+4, width:pw, height:ph, cornerRadius:8, fill:"#FFFFFF", stroke:"#F0F0F0", strokeWidth:1, effect:{type:"shadow",shadowType:"outer",blur:12,offset:{x:0,y:4},color:"#0000001F"}});
    nodes.push(text("2026年 9月", 16, h+14, pw-32, "#000000E0", 14, "600"));
    for (let d = 1; d <= 21; d++) {
      const col = (d-1)%7, row = Math.floor((d-1)/7);
      const isToday = d === 16;
      const dx = 16 + col*32, dy = h + 42 + row*28;
      if (isToday) nodes.push({type:"rectangle", x:dx, y:dy, width:24, height:24, cornerRadius:4, fill:primary});
      nodes.push(text(String(d), dx+4, dy+3, 20, isToday?"#FFFFFF":"#000000A6", 12));
    }
  }
return nodes;
