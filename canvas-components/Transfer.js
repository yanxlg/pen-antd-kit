/**
 * @schema 2.18
 * @input titles: string = "可选项|已选项"
 * @input showSearch: boolean = true
 * @input oneWay: boolean = false
 * @input disabled: boolean = false
 * @input color: string = ""
 * @input showSelectAll: boolean = false
 * @input status: enum("", "error", "warning", "success", "validating") = ""
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

  const titles=String(i.titles||"Source|Target").split("|"),gap=56,pw=(W-gap)/2,rightX=pw+gap,itemY=i.showSearch?82:48,alpha=i.disabled?0.45:1;
  nodes.push({...box(0,0,pw,H,"#FFFFFF",6,"#D9D9D9"),opacity:alpha});
  nodes.push(text("☐  3 items",12,12,pw-100,"#000000A6",12));
  nodes.push(text(titles[0]||"Source",pw-74,12,62,"#000000A6",12));
  nodes.push(box(0,39,pw,1,"#F0F0F0",0,"#F0F0F0",0));
  if(i.showSearch){nodes.push(box(10,48,pw-20,26,"#FFFFFF",4,"#D9D9D9"));nodes.push(text("Search here",20,53,pw-50,"#00000040",12));}
  ["Content 1","Content 2","Content 3"].forEach((u,idx)=>nodes.push(text("☐  "+u,12,itemY+idx*30,pw-24,"#000000E0",12)));
  nodes.push({...box(rightX,0,pw,H,"#FFFFFF",6,"#D9D9D9"),opacity:alpha});
  nodes.push(text("☐  1 item",rightX+12,12,pw-100,"#000000A6",12));
  nodes.push(text(titles[1]||"Target",rightX+pw-74,12,62,"#000000A6",12));
  nodes.push(box(rightX,39,pw,1,"#F0F0F0",0,"#F0F0F0",0));
  if(i.showSearch){nodes.push(box(rightX+10,48,pw-20,26,"#FFFFFF",4,"#D9D9D9"));nodes.push(text("Search here",rightX+20,53,pw-50,"#00000040",12));}
  nodes.push(text("☑  Content 1",rightX+12,itemY,pw-24,"#000000E0",12));
  const bx=pw+(gap-28)/2,by=H/2-(i.oneWay?12:30);
  nodes.push(box(bx,by,28,24,i.disabled?"#0000000A":primary,4,i.disabled?"#D9D9D9":primary));
  nodes.push(text("→",bx+7,by+2,16,i.disabled?"#00000040":"#FFFFFF",14));
  if(!i.oneWay){nodes.push(box(bx,by+36,28,24,"#FFFFFF",4,"#D9D9D9"));nodes.push(text("←",bx+7,by+38,16,"#00000040",14));}
return nodes;
