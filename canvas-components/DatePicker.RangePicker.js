/**
 * @schema 2.18
 * @input placeholder: string = ""
 * @input value: string = ""
 * @input endValue: string = ""
 * @input disabled: boolean = false
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
 * @input picker: enum("date", "time", "month", "week", "year", "quarter") = "date"
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
 * @input hasFeedback: boolean = false
 * @input feedbackStatus: enum("none", "success", "warning", "error", "validating") = "none"
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
const isStatusError = i.status === "error" || (i.hasFeedback && i.feedbackStatus === "error");
const isStatusWarning = i.status === "warning" || (i.hasFeedback && i.feedbackStatus === "warning");
const borderCol = isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : "#D9D9D9";
const bgFill = i.variant === "filled" ? "#00000005" : "#FFFFFF";
const strokeCol = i.variant === "borderless" ? "#00000000" : borderCol;
const compactRadius=(r=6)=>i.compactPlacement==="middle"?0:i.compactPlacement==="start"?(i.compactOrientation==="vertical"?[r,r,0,0]:[r,0,0,r]):i.compactPlacement==="end"?(i.compactOrientation==="vertical"?[0,0,r,r]:[0,r,r,0]):r;
const iconPath=(geometry,viewBox,x,y,size=14,color="#00000040")=>({type:"path",x,y,width:size,height:size,viewBox,geometry,fill:color});

  nodes.push(box(0, 0, W, h, i.disabled ? "#F5F5F5" : bgFill, compactRadius(6), strokeCol));
  const defaultStartPlaceholder = i.showTime ? "Start date time" : (
    i.picker === "year" ? "Start year" :
    i.picker === "month" ? "Start month" :
    i.picker === "quarter" ? "Start quarter" :
    i.picker === "week" ? "Start week" :
    i.picker === "time" ? "Start time" : "Start date"
  );
  const defaultEndPlaceholder = i.showTime ? "End date time" : (
    i.picker === "year" ? "End year" :
    i.picker === "month" ? "End month" :
    i.picker === "quarter" ? "End quarter" :
    i.picker === "week" ? "End week" :
    i.picker === "time" ? "End time" : "End date"
  );
  const effFeedback = i.hasFeedback ? (i.feedbackStatus && i.feedbackStatus !== "none" ? i.feedbackStatus : (i.status === "error" ? "error" : i.status === "warning" ? "warning" : i.status === "validating" ? "validating" : (i.status === "success" ? "success" : "none"))) : "none";
  const startText = (i.value !== undefined && i.value !== "") ? i.value : (i.placeholder || defaultStartPlaceholder);
  const endText = (i.endValue !== undefined && i.endValue !== "") ? i.endValue : (i.endPlaceholder || defaultEndPlaceholder);
  const rightPad = effFeedback !== "none" ? 50 : 32;
  const itemW = (W - rightPad - 32) / 2;
  nodes.push(text(startText, pad, (h-18)/2, itemW, i.value ? disabled : "#00000040", 14));
  nodes.push(text("→", pad + itemW + 4, (h-18)/2, 20, "#00000040", 13, "normal", "center"));
  nodes.push(text(endText, pad + itemW + 28, (h-18)/2, itemW, i.endValue ? disabled : "#00000040", 14));
  nodes.push(iconPath("M880 184H712V120H640V184H384V120H312V184H144C126.3 184 112 198.3 112 216V880C112 897.7 126.3 912 144 912H880C897.7 912 912 897.7 912 880V216C912 198.3 897.7 184 880 184ZM840 840H184V460H840V840ZM184 392V256H312V304H384V256H640V304H712V256H840V392H184Z",[64,64,896,896],W-26,(h-14)/2,14));
  if (effFeedback !== "none") {
    const fbPath = effFeedback === "success" ? "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.5l-254.4 256c-3.1 3.1-7.2 4.7-11.3 4.7-4.1 0-8.2-1.6-11.3-4.7l-120.7-121.5c-6.2-6.3-6.2-16.4 0-22.6l22.6-22.6c6.3-6.2 16.4-6.2 22.6 0l96.8 97.4 231.8-233.3c6.2-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6z" :
                   effFeedback === "warning" ? "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4 3.6 8 8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" :
                   effFeedback === "error" ? "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" :
                   "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z";
    const fbVb = effFeedback === "validating" ? [0,0,1024,1024] : [64,64,896,896];
    const fbCol = effFeedback === "success" ? "#52C41A" :
                  effFeedback === "warning" ? "#FAAD14" :
                  effFeedback === "error" ? "#FF4D4F" : "#1677FF";
    nodes.push(iconPath(fbPath, fbVb, W - 46, (h-14)/2, 14, fbCol));
  }
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
