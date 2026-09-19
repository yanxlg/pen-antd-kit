/**
 * @schema 2.18
 * @input layout: enum("vertical", "horizontal", "inline") = "vertical"
 * @input fields: string = "用户名|密码|电子邮箱"
 * @input disabled: boolean = false
 * @input required: boolean = false
 * @input status: enum("", "error", "warning") = ""
 * @input acceptCharset: string = ""
 * @input action: string = ""
 * @input clearOnDestroy: boolean = false
 * @input colon: boolean = false
 * @input color: string = ""
 * @input encType: string = ""
 * @input labelAlign: enum("left", "right") = "left"
 * @input labelWrap: boolean = false
 * @input method: string = ""
 * @input name: string = ""
 * @input noValidate: boolean = false
 * @input preserve: boolean = false
 * @input size: enum("middle", "medium", "large", "small") = "middle"
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

  const fields=(i.fields||"Username|Password").split("|"),error=i.status==="error",border=error?"#FF4D4F":"#D9D9D9",mark=i.required?" *":"";
  fields.forEach((f,idx)=>{
    if(i.layout==="horizontal"){
      const fy=idx*44,labelW=88;nodes.push(text(f+mark,0,fy+7,labelW,i.disabled?"#00000040":"#000000D9",13,"normal","right"));nodes.push(box(labelW+8,fy,W-labelW-8,32,i.disabled?"#0000000A":"#FFFFFF",6,border));nodes.push(text("Please input "+f,labelW+18,fy+7,W-labelW-28,"#00000040",12));
    }else if(i.layout==="inline"){
      const cell=W/fields.length,x=idx*cell;nodes.push(box(x,0,cell-8,32,i.disabled?"#0000000A":"#FFFFFF",6,border));nodes.push(text(f+mark,x+10,7,cell-28,"#00000040",12));
    }else{
      const fy=idx*60;nodes.push(text(f+mark,0,fy,120,i.disabled?"#00000040":"#000000D9",13));nodes.push(box(0,fy+22,W,32,i.disabled?"#0000000A":"#FFFFFF",6,border));nodes.push(text("Please input "+f,10,fy+29,W-20,"#00000040",12));if(error&&idx===0)nodes.push(text("Please enter a valid value",0,fy+55,W,"#FF4D4F",11));
    }
  });
return nodes;
