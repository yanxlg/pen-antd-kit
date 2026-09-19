/**
 * @schema 2.18
 * @input value: number = 40
 * @input min: number = 0
 * @input max: number = 100
 * @input disabled: boolean = false
 * @input range: boolean = false
 * @input marks: boolean = false
 * @input ariaRequired: boolean = false
 * @input dots: boolean = false
 * @input included: boolean = false
 * @input keyboard: boolean = false
 * @input orientation: enum("horizontal", "vertical") = "horizontal"
 * @input reverse: boolean = false
 * @input vertical: boolean = false
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

  const min=Number(i.min??0),max=Number(i.max??100),value=Number(i.value??40),ratio=Math.max(0,Math.min(1,(value-min)/Math.max(1,max-min))),start=i.range?0.2:0,end=i.range?Math.max(start,ratio):ratio,track=i.disabled?"#BFBFBF":primary;
  nodes.push(box(0,(H-4)/2,W,4,"#F5F5F5",2));
  nodes.push(box(W*start,(H-4)/2,W*(end-start),4,track,2));
  if(i.range)nodes.push(circle(W*start-7,(H-14)/2,14,"#FFFFFF",track));
  nodes.push(circle(W*end-7,(H-14)/2,14,"#FFFFFF",track));
  if(i.marks){[0,.25,.5,.75,1].forEach((p,n)=>{nodes.push(circle(W*p-2,(H-4)/2,4,n/4<=end?track:"#D9D9D9"));nodes.push(text(String(Math.round(min+(max-min)*p)),W*p-10,H/2+9,24,"#00000073",10));});}
return nodes;
