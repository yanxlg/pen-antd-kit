/**
 * @schema 2.18
 * @input value: string = "#1677FF"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input showText: boolean = true
 * @input disabled: boolean = false
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input allowClear: boolean = false
 * @input defaultFormat: enum("hex", "rgb", "hsb") = "hex"
 * @input destroyOnHidden: boolean = false
 * @input disabledAlpha: boolean = false
 * @input disabledFormat: boolean = false
 * @input format: enum("hex", "rgb", "hsb") = "hex"
 * @input open: boolean = false
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight", "left", "right", "bottom", "top", "leftTop", "leftBottom", "rightTop", "rightBottom") = "bottomLeft"
 * @input trigger: enum("click", "hover") = "click"
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

  const controlW=Math.max(1,pencil.width),swatch=h-8,swatchX=4,swatchY=4,swatchRadius=i.size==="small"?2:i.size==="large"?6:4;
  nodes.push(box(0,0,controlW,h,i.disabled?"#0000000A":"#FFFFFF",compactRadius(6),"#D9D9D9"));
  if(i.value) nodes.push(box(swatchX,swatchY,swatch,swatch,i.value,swatchRadius,"#00000000",0));
  else {
    nodes.push(box(swatchX,swatchY,swatch,swatch,"#00000000",swatchRadius,"#0505050F"));
    const inset=2,lineSize=swatch-inset*2;
    nodes.push({type:"path",x:swatchX+inset,y:swatchY+inset,width:lineSize,height:lineSize,viewBox:[0,0,lineSize,lineSize],geometry:`M0 ${lineSize} L${lineSize} 0`,fill:"transparent",stroke:"#F5222D",strokeWidth:2});
  }
  if(i.showText){const value=/^#[0-9a-f]+$/i.test(i.value||"")?i.value.toUpperCase():(i.value||"");nodes.push(text(value,swatchX+swatch+8,(h-18)/2,Math.max(0,controlW-swatchX-swatch-12),i.disabled?"#00000040":"#000000E0",14));}
return nodes;
