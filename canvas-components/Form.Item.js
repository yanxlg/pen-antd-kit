/**
 * @schema 2.18
 * @input colon: boolean = false
 * @input fieldId: string = ""
 * @input htmlFor: string = ""
 * @input isList: boolean = false
 * @input isListField: boolean = false
 * @input labelAlign: enum("left", "right") = "left"
 * @input layout: enum("horizontal", "vertical") = "horizontal"
 * @input noStyle: boolean = false
 * @input preserve: boolean = false
 * @input status: enum("", "error", "warning", "success", "validating") = ""
 * @input trigger: string = ""
 * @input validateDebounce: number = 0
 * @input validateStatus: enum("", "error", "warning", "success", "validating") = ""
 * @input valuePropName: string = ""
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

  const fields = (i.fields || "用户名|密码").split("|");
  fields.forEach((f, idx) => {
    const fy = idx * 56;
    nodes.push(text(f + " *", 0, fy, 80, "#000000D9", 13));
    nodes.push(box(0, fy + 22, W, 32, "#FFFFFF", 6, "#D9D9D9"));
    nodes.push(text("请输入" + f, 10, fy + 28, W-20, "#00000040", 12));
  });
return nodes;
