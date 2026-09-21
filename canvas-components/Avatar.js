/**
 * @schema 2.18
 * @input text: string = "A"
 * @input icon: string = ""
 * @input src: string = ""
 * @input alt: string = ""
 * @input shape: enum("circle", "square") = "circle"
 * @input size: enum("small", "default", "large") = "default"
 * @input customSize: number = 0
 * @input color: enum("blue", "gray", "green", "purple", "orange") = "gray"
 * @input backgroundColor: color = #00000000
 * @input textColor: color = #FFFFFF
 * @input gap: number = 4
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input || {};
const presetSize = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const s = Number(i.customSize) > 0 ? Number(i.customSize) : presetSize;
const radius = i.shape === "square" ? Math.max(4, Math.round(s * 0.12)) : s / 2;
const colors = {
  blue: i.primaryColor || "#1677FF",
  gray: "#BFBFBF",
  green: "#87D068",
  purple: "#722ED1",
  orange: "#F56A00",
};
const background = i.backgroundColor && i.backgroundColor !== "#00000000"
  ? i.backgroundColor
  : (colors[i.color] || colors.gray);
const nodes = [];

if (i.src) {
  nodes.push({
    type: "rectangle",
    name: "Avatar image",
    x: 0,
    y: 0,
    width: s,
    height: s,
    cornerRadius: radius,
    fill: {type: "image", enabled: true, url: i.src, mode: "fill"},
    stroke: "#FFFFFF",
    strokeWidth: 1,
    strokeAlignment: "inner",
  });
} else {
  nodes.push({
    type: "rectangle",
    name: "Avatar surface",
    x: 0,
    y: 0,
    width: s,
    height: s,
    cornerRadius: radius,
    fill: background,
    stroke: "#FFFFFF",
    strokeWidth: 1,
    strokeAlignment: "inner",
  });

  if (i.icon) {
    nodes.push({type:'ref',ref:'antd-icon-live-origin',name:'icon · Icon',x:s*.2,y:s*.2,width:s*.6,height:s*.6,inputs:{name:(/Outlined|Filled|TwoTone$/.test(i.icon)?i.icon:'UserOutlined'),fontSize:s*.6,color:i.textColor||'#FFFFFF'}});
  } else {
    const raw = String(i.text ?? "A");
    const gap = Math.max(0, Number(i.gap ?? 4));
    const maxWidth = Math.max(8, s - gap * 2);
    const estimated = Math.max(1, raw.length) * s * 0.5;
    const fontSize = Math.max(10, Math.min(s * 0.5, s * 0.5 * maxWidth / estimated));
    nodes.push({
      type: "text",
      name: "Avatar text",
      content: raw,
      x: gap,
      y: Math.max(0, (s - fontSize * 1.2) / 2),
      width: Math.max(1, s - gap * 2),
      height: fontSize * 1.2,
      textGrowth: "fixed-width-height",
      textAlign: "center",
      fill: i.textColor || "#FFFFFF",
      fontFamily: "Inter",
      fontSize,
      fontWeight: "400",
      lineHeight: 1,
    });
  }
}

return nodes;
