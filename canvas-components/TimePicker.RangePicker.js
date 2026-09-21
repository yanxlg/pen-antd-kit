/**
 * @schema 2.18
 * @input bordered: boolean = false
 * @input changeOnBlur: boolean = false
 * @input changeOnScroll: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input defaultOpen: boolean = false
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input hideDisabledOptions: boolean = false
 * @input inputReadOnly: boolean = false
 * @input list: string = ""
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input needConfirm: boolean = false
 * @input open: boolean = false
 * @input order: boolean = false
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
 * @input status: enum("default", "error", "warning", "success", "validating") = "default"
 * @input transitionName: string = ""
 * @input use12Hours: boolean = false
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input primaryColor: color = #1677FF
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
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
const compactRadius=(r=6)=>i.compactPlacement==="middle"?0:i.compactPlacement==="start"?(i.compactOrientation==="vertical"?[r,r,0,0]:[r,0,0,r]):i.compactPlacement==="end"?(i.compactOrientation==="vertical"?[0,0,r,r]:[0,r,r,0]):r;
const iconPath=(geometry,viewBox,x,y,size=14,color="#00000040")=>({type:"path",x,y,width:size,height:size,viewBox,geometry,fill:color});

  nodes.push(box(0, 0, W, h, bgFill, compactRadius(6), strokeCol));
  const val = i.value || i.placeholder || "请选择日期";
  nodes.push(text(val||"Start",pad,(h-18)/2,(W-56)/2,i.value?disabled:"#00000040",14));
  nodes.push(text("→",W/2-10,(h-18)/2,20,"#00000040",13,"normal","center"));
  nodes.push(text(i.endValue||"End",W/2+14,(h-18)/2,(W-56)/2,"#00000040",14));
  nodes.push(iconPath("M512 64C264.6 64 64 264.6 64 512S264.6 960 512 960S960 759.4 960 512S759.4 64 512 64ZM512 884C306.6 884 140 717.4 140 512S306.6 140 512 140S884 306.6 884 512S717.4 884 512 884ZM544.1 535.5V288H480V563.4C480 566 481.2 568.4 483.3 569.9L648.7 690.5L688.5 638.8L544.1 535.5Z",[64,64,896,896],W-26,(h-14)/2,14));
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
