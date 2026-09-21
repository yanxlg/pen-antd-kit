/**
 * @schema 2.18
 * @input value: number = 3
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input min: number = 0
 * @input max: number = 100
 * @input controls: boolean = true
 * @input mode: enum("input", "spinner") = "input"
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input placeholder: string = ""
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input bordered: boolean = false
 * @input changeOnBlur: boolean = false
 * @input changeOnWheel: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input decimalSeparator: string = ""
 * @input keyboard: boolean = false
 * @input list: string = ""
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input precision: number = 0
 * @input src: string = ""
 * @input stringMode: boolean = false
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left") => ({type:"text", content:String(content), x, y, width, height:Math.max(16,fontSize+4), fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align, textAlignVertical:"middle", textGrowth:"fixed-width-height"});
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

  const inputSize=i.size==='small'||i.size==='large'?i.size:'middle';
  const inputH=inputSize==='small'?24:inputSize==='large'?40:32;
  const inputPad=inputSize==='small'?8:12;
  const inputRadius=inputSize==='small'?4:inputSize==='large'?8:6;
  const inputFont=inputSize==='large'?16:14;
  const inputBorder=i.disabled?'#D9D9D9':i.status==='error'?'#FF4D4F':i.status==='warning'?'#FAAD14':'#D9D9D9';
  const inputFill=i.disabled?'#0000000A':i.variant==='filled'?'#00000005':'#FFFFFF';
  const inputStroke=i.variant==='borderless'||i.variant==='filled'?'#00000000':inputBorder;
  nodes.push(box(0,0,W,inputH,inputFill,compactRadius(inputRadius),inputStroke));
  if(i.variant==='underlined')nodes.push({type:'rectangle',x:0,y:inputH-1,width:W,height:1,fill:inputBorder});
  if(i.mode==='spinner'&&!i.disabled){
    const actionW=inputH;
    nodes.push({type:'rectangle',x:actionW,y:0,width:1,height:inputH,fill:'#D9D9D9'});
    nodes.push({type:'rectangle',x:W-actionW-1,y:0,width:1,height:inputH,fill:'#D9D9D9'});
    const val=Number(i.value??0);
    const minDisabled=i.min!==undefined&&i.min!==null&&val<=Number(i.min);
    const maxDisabled=i.max!==undefined&&i.max!==null&&val>=Number(i.max);
    nodes.push(text('−',0,(inputH-(inputFont+4))/2,actionW,minDisabled?'#00000040':'#000000E0',inputFont,'normal','center'));
    nodes.push(text('+',W-actionW,(inputH-(inputFont+4))/2,actionW,maxDisabled?'#00000040':'#000000E0',inputFont,'normal','center'));
    nodes.push(text(String(i.value??i.placeholder??''),actionW,(inputH-(inputFont+4))/2,W-actionW*2,disabled,inputFont,'normal','center'));
  }else{
    let textX=inputPad,textRight=W-inputPad;
    if(i.prefix){nodes.push(text(i.prefix,textX,(inputH-(inputFont+4))/2,20,disabled,inputFont));textX+=24;}
    if(i.suffix){nodes.push(text(i.suffix,W-inputPad-24,(inputH-(inputFont+4))/2,24,disabled,inputFont,'normal','right'));textRight-=28;}
    const raw=i.value!==undefined&&i.value!==null?i.value:i.placeholder;
    nodes.push(text(String(raw??''),textX,(inputH-(inputFont+4))/2,Math.max(1,textRight-textX),raw===''||raw===undefined?'#00000040':disabled,inputFont));
  }
return nodes;
