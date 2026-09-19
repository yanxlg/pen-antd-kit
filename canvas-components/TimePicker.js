/**
 * @schema 2.18
 * @input placeholder: string = "请选择时间"
 * @input value: string = "12:30:00"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input use12Hours: boolean = false
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
 * @input mode: enum("date", "time", "month", "week", "year", "quarter", "decade") = "date"
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input needConfirm: boolean = false
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
 * @input src: string = ""
 * @input transitionName: string = ""
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
  const raw=i.value||"",val=raw?(i.use12Hours?raw.replace(/^([0-9]{1,2}):([0-9]{2}).*$/,(_,hh,mm)=>{const h24=Number(hh),h12=h24%12||12;return h12+":"+mm+(h24>=12?" PM":" AM");}):raw):(i.placeholder||"Select time");
  nodes.push(text(val, pad, (h-18)/2, W - 32 - pad, i.value ? disabled : "#00000040", 14));
  nodes.push(text("◷", W - 24, (h-18)/2, 16, "#00000073", 14));
  if (i.open) {
    const pw=Math.max(W,i.use12Hours?260:220),ph=184,cols=i.use12Hours?4:3,colW=pw/cols;
    nodes.push({type:"rectangle", x:0, y:h+4, width:pw, height:ph, cornerRadius:8, fill:"#FFFFFF", stroke:"#F0F0F0", strokeWidth:1, effect:{type:"shadow",shadowType:"outer",blur:12,offset:{x:0,y:4},color:"#0000001F"}});
    const lists=[i.use12Hours?["01","02","03","04","05"]:["00","01","02","03","04"],["00","15","30","45"],["00","15","30","45"]];if(i.use12Hours)lists.push(["AM","PM"]);
    lists.forEach((list,col)=>{if(col>0)nodes.push(box(col*colW,h+4,1,ph,"#F0F0F0",0,"#F0F0F0",0));list.forEach((v,row)=>{const active=row===0;if(active)nodes.push(box(col*colW+4,h+10+row*30,colW-8,26,"#E6F4FF",4,"#E6F4FF",0));nodes.push(text(v,col*colW+12,h+15+row*30,colW-24,active?primary:"#000000E0",12));});});
  }
return nodes;
