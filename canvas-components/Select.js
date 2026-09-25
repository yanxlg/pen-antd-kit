/**
 * @schema 2.18
 * @input placeholder: string = ""
 * @input value: string = ""
 * @input options: string = "杭州|上海|北京|深圳"
 * @input mode: enum("default", "multiple", "tags") = "default"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input allowClear: boolean = true
 * @input hovered: boolean = false
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input animation: string = ""
 * @input autoClearSearchValue: boolean = false
 * @input bordered: boolean = false
 * @input choiceTransitionName: string = ""
 * @input defaultActiveFirstOption: boolean = false
 * @input defaultOpen: boolean = false
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input labelInValue: boolean = false
 * @input listHeight: number = 0
 * @input listItemHeight: number = 0
 * @input loading: boolean = false
 * @input maxCount: number = 0
 * @input maxTagCount: number = 0
 * @input maxLength: number = 0
 * @input maxTagTextLength: number = 0
 * @input optionLabelProp: string = ""
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight") = "bottomLeft"
 * @input searchValue: string = ""
 * @input showArrow: boolean = false
 * @input prefix: string = ""
 * @input suffixIcon: string = ""
 * @input transitionName: string = ""
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input virtual: boolean = false
 * @input primaryColor: color = #1677FF
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

  if(i.variant === "underlined"){
    nodes.push(box(0,0,W,h,i.disabled?"#0000000A":"#FFFFFF",0,"#00000000",0));
    nodes.push(box(0,h-1,W,1,strokeCol,0,strokeCol,0));
  }else nodes.push(box(0, 0, W, h, i.disabled ? "#0000000A" : bgFill, compactRadius(6), strokeCol));
  if (i.mode === "multiple" || i.mode === "tags" || i.multiple) {
    const labels = String(i.value || "").split("|").filter(Boolean);
    if (labels.length === 0) {
      if (i.placeholder) nodes.push(text(i.placeholder, pad, (h-18)/2, W - 32 - pad, "#00000040", 14));
    } else {
      const visibleCount = i.maxTagCount > 0 ? Math.min(labels.length, i.maxTagCount) : labels.length;
      let tagX = 4;
      for (let index = 0; index < visibleCount; index++) {
        const label = labels[index];
        const remaining = W - tagX - 34;
        if (remaining < 52) break;
        const tagWidth = Math.min(remaining, Math.max(52, label.length * 8 + 30));
        nodes.push(box(tagX, (h-24)/2, tagWidth, 24, "#F5F5F5", 4, "#D9D9D9"));
        nodes.push(text(label, tagX + 8, (h-18)/2, tagWidth - 28, i.disabled ? "#00000040" : "#000000E0", 14));
        nodes.push(iconPath("M799.86 166.31L857.69 224.15L569.93 512L857.69 799.7L799.86 857.69L512 569.93L224.3 857.69L166.31 799.86L454.07 512L166.31 224.15L224.14 166.31L512 454.07Z", [64,64,896,896], tagX + tagWidth - 14, (h-10)/2, 10, "#00000073"));
        tagX += tagWidth + 4;
      }
      const hiddenCount = labels.length - visibleCount;
      if (hiddenCount > 0 && W - tagX > 46) {
        nodes.push(box(tagX, (h-24)/2, 42, 24, "#F5F5F5", 4, "#D9D9D9"));
        nodes.push(text(`+ ${hiddenCount}`, tagX + 7, (h-18)/2, 30, i.disabled ? "#00000040" : "#000000E0", 13));
      }
    }
  } else {
    const val = (i.value !== undefined && i.value !== "") ? i.value : (i.placeholder || "");
    const prefix=String(i.prefix||""),prefixWidth=prefix?Math.min(64,Math.max(28,prefix.length*8)):0;
    if(prefix) nodes.push(text(prefix,pad,(h-18)/2,prefixWidth,disabled,14));
    const valueX=pad+(prefix?prefixWidth+4:0);
    const effFeedback = i.hasFeedback ? (i.feedbackStatus && i.feedbackStatus !== "none" ? i.feedbackStatus : (i.status === "error" ? "error" : i.status === "warning" ? "warning" : i.status === "validating" ? "validating" : (i.status === "success" ? "success" : "none"))) : "none";
    const rightPad = effFeedback !== "none" ? 50 : 32;
    if(val) nodes.push(text(val, valueX, (h-18)/2, W - rightPad - valueX, i.value ? disabled : "#00000040", 14));
    if (effFeedback !== "none") {
      const fbPath = effFeedback === "success" ? "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.5l-254.4 256c-3.1 3.1-7.2 4.7-11.3 4.7-4.1 0-8.2-1.6-11.3-4.7l-120.7-121.5c-6.2-6.3-6.2-16.4 0-22.6l22.6-22.6c6.3-6.2 16.4-6.2 22.6 0l96.8 97.4 231.8-233.3c6.2-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6z" :
                     effFeedback === "warning" ? "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4 3.6 8 8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" :
                     effFeedback === "error" ? "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" :
                     "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z";
      const fbVb = effFeedback === "validating" ? [0,0,1024,1024] : [64,64,896,896];
      const fbCol = effFeedback === "success" ? "#52C41A" :
                    effFeedback === "warning" ? "#FAAD14" :
                    effFeedback === "error" ? "#FF4D4F" : "#1677FF";
      nodes.push(iconPath(fbPath, fbVb, W - 44, (h-14)/2, 14, fbCol));
    }
  }
  const showClear = !!(i.allowClear && i.value && i.hovered && !i.disabled && i.mode !== "multiple" && i.mode !== "tags");
  if(showClear){
    nodes.push(circle(W-25,(h-14)/2,14,"#00000040"));
    nodes.push(iconPath("M799.86 166.31L857.69 224.15L569.93 512L857.69 799.7L799.86 857.69L512 569.93L224.3 857.69L166.31 799.86L454.07 512L166.31 224.15L224.14 166.31L512 454.07Z",[64,64,896,896],W-22,(h-8)/2,8,"#FFFFFF"));
  }
  else if(i.loading) nodes.push({type:"ref",ref:"antd-icon-live-origin",name:"Icon.LoadingOutlined",x:W-26,y:(h-14)/2,width:14,height:14,inputs:{type:"LoadingOutlined",name:"LoadingOutlined",fontSize:14,color:"#00000040"}});
  else if(i.suffixIcon) nodes.push({type:"ref",ref:"antd-icon-live-origin",name:`Icon.${i.suffixIcon}`,x:W-26,y:(h-14)/2,width:14,height:14,inputs:{type:i.suffixIcon,name:i.suffixIcon,fontSize:14,color:"#00000073"}});
  else nodes.push(iconPath("M884 256H809L512 654.2L215 256H140L486.1 754.8C498.9 772.4 525.1 772.4 537.8 754.8Z",[64,64,896,896],W-24,(h-12)/2,12,"#00000040"));
  if (i.open) {
    const opts = (i.options || "选项一|选项二|选项三").split("|");
    nodes.push({type:"rectangle", x:0, y:h+4, width:W, height:opts.length*32+8, cornerRadius:6, fill:"#FFFFFF", stroke:"#F0F0F0", strokeWidth:1, effect:{type:"shadow",shadowType:"outer",blur:8,offset:{x:0,y:4},color:"#00000015"}});
    opts.forEach((o, n) => {
      const active = i.value ? o === i.value : n === 0;
      if (active) nodes.push({type:"rectangle", x:4, y:h+8+n*32, width:W-8, height:28, cornerRadius:4, fill:"#E6F4FF"});
      nodes.push(text(o, 12, h+12+n*32, W-24, "#000000E0", 13, active ? "600" : "normal"));
    });
  }
return nodes;
