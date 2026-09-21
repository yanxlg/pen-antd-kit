/**
 * @schema 2.18
 * @input placeholder: string = "请选择"
 * @input value: string = ""
 * @input options: string = "杭州|上海|北京|深圳"
 * @input mode: enum("default", "multiple", "tags") = "default"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input allowClear: boolean = true
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
 * @input maxLength: number = 0
 * @input maxTagTextLength: number = 0
 * @input optionLabelProp: string = ""
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight") = "bottomLeft"
 * @input searchValue: string = ""
 * @input showArrow: boolean = false
 * @input transitionName: string = ""
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input virtual: boolean = false
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

  nodes.push(box(0, 0, W, h, i.disabled ? "#0000000A" : bgFill, compactRadius(6), strokeCol));
  if (i.mode === "multiple" || i.mode === "tags" || i.multiple) {
    const tagLabel=String(i.value||i.placeholder||"Zhejiang").split("|")[0];
    const tagWidth=Math.min(W-42,Math.max(56,tagLabel.length*8+30));
    nodes.push(box(4, (h-24)/2, tagWidth, 24, "#F5F5F5", 4, "#D9D9D9"));
    nodes.push(text(tagLabel, 12, (h-18)/2, tagWidth-28, i.disabled?"#00000040":"#000000E0", 14));
    nodes.push(iconPath("M799.86 166.31L857.69 224.15L569.93 512L857.69 799.7L799.86 857.69L512 569.93L224.3 857.69L166.31 799.86L454.07 512L166.31 224.15L224.14 166.31L512 454.07Z",[64,64,896,896],tagWidth-14,(h-10)/2,10,"#00000073"));
  } else {
    const val = i.value || i.placeholder || "请选择";
    nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  }
  nodes.push(iconPath("M884 256H809L512 654.2L215 256H140L486.1 754.8C498.9 772.4 525.1 772.4 537.8 754.8Z",[64,64,896,896],W-24,(h-12)/2,12,"#00000040"));
  if (i.open) {
    const opts = (i.options || "选项一|选项二|选项三").split("|");
    nodes.push({type:"rectangle", x:0, y:h+4, width:W, height:opts.length*32+8, cornerRadius:6, fill:"#FFFFFF", stroke:"#F0F0F0", strokeWidth:1, effect:{type:"shadow",shadowType:"outer",blur:8,offset:{x:0,y:4},color:"#00000015"}});
    opts.forEach((o, n) => {
      const active = n === 0;
      if (active) nodes.push({type:"rectangle", x:4, y:h+8+n*32, width:W-8, height:28, cornerRadius:4, fill:"#E6F4FF"});
      nodes.push(text(o, 12, h+12+n*32, W-24, active ? primary : "#000000E0", 13));
    });
  }
return nodes;
