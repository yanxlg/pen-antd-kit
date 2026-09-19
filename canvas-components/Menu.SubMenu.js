/**
 * @schema 2.18
 * @input disabled: boolean = false
 * @input theme: enum("dark", "light") = "dark"
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

  const items = (i.items || "首页|数据管理|系统设置").split("|");
  const isDark = i.theme === "dark";
  nodes.push(box(0, 0, W, H, isDark ? "#001529" : "#FFFFFF", 0, isDark ? "#001529" : "#F0F0F0"));
  items.forEach((it, n) => {
    const active = n === 0;
    const y = n * 38;
    if (active) nodes.push(box(0, y, W, 38, isDark ? primary : "#E6F4FF", 0, "#00000000"));
    nodes.push(text(it, 16, y + 10, W - 32, active ? (isDark ? "#FFFFFF" : primary) : (isDark ? "#FFFFFFBF" : "#000000E0"), 13, active ? "600" : "normal"));
  });
return nodes;
