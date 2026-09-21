/**
 * @schema 2.18
 * @input label: string = "Menu item"
 * @input icon: string = ""
 * @input selected: boolean = false
 * @input theme: enum("light", "dark") = "light"
 * @input danger: boolean = false
 * @input disabled: boolean = false
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(40, pencil.height);
const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left") => ({type:"text", content:String(content), x, y, width, height:Math.max(16,fontSize+4), fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align});
const box = (x, y, width, height, fill="#FFFFFF", radius=6, stroke="#D9D9D9", strokeWidth=1) => ({type:"rectangle", x, y, width, height, cornerRadius:radius, fill, stroke, strokeWidth, strokeAlignment:"inner"});
const nodes = [];
const primary = i.danger ? "#FF4D4F" : (i.primaryColor || "#1677FF");
const isDark = i.theme === "dark";
const active = !!i.selected;
const itemHeight = 40;
const marginInline = 4;
const iconSize = 14;
const hasIcon = !!i.icon;
const color = i.disabled ? "#00000040" : i.danger ? "#FF4D4F" : active ? (isDark ? "#FFFFFF" : primary) : (isDark ? "#FFFFFFA6" : "#000000E0");
nodes.push(box(0, 0, W, H, isDark ? "#001529" : "#FFFFFF", 0, isDark ? "#001529" : "#F0F0F0"));
if (active) nodes.push(box(marginInline, 0, W - marginInline * 2, itemHeight, isDark ? primary : "#E6F4FF", 8, "#00000000"));
if (hasIcon) nodes.push({type:"script", name:"Icon", scriptUri:"../canvas-components/Icon.js", inputs:{name:i.icon,fontSize:iconSize,color}, x:28, y:13, width:iconSize, height:iconSize});
nodes.push(text(i.label || "Menu item", hasIcon ? 52 : 28, 9, Math.max(1, W - (hasIcon ? 68 : 44)), color, 14));
return nodes;
