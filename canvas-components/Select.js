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

  nodes.push(box(0, 0, W, h, i.disabled ? "#0000000A" : bgFill, 6, strokeCol));
  if (i.mode === "multiple" || i.mode === "tags") {
    nodes.push(box(6, (h-22)/2, 48, 22, "#F5F5F5", 4, "#D9D9D9"));
    nodes.push(text("标签", 10, (h-16)/2, 36, "#000000D9", 11));
  } else {
    const val = i.value || i.placeholder || "请选择";
    nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  }
  nodes.push(text(i.open ? "⌃" : "⌄", W - 22, (h-18)/2, 16, "#00000073", 14));
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
