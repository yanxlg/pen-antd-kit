/**
 * @schema 2.18
 * @input length: number = 6
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input disabled: boolean = false
 * @input mask: string = ""
 * @input separator: string = ""
 * @input separatorAltColors: boolean = false
 * @input cellWidth: number = 0
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 */

const i = pencil.input;
const W = Math.max(80, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const fontSize = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const nodes = [];

const text = (content, x, y, width, color = "#000000E0", fSize = 14, weight = "normal", align = "center", height = Math.max(16, fSize + 4)) => ({
  type: "text",
  content: String(content),
  x,
  y,
  width,
  height,
  textGrowth: "fixed-width",
  textAlignVertical: "middle",
  fill: color,
  fontFamily: "Inter",
  fontSize: fSize,
  fontWeight: weight,
  textAlign: align,
  lineHeight: height / fSize,
});

const box = (x, y, width, height, fill = "#FFFFFF", radius = 6, stroke = "#D9D9D9", strokeWidth = 1) => ({
  type: "rectangle",
  x,
  y,
  width,
  height,
  cornerRadius: radius,
  fill,
  stroke,
  strokeWidth,
  strokeAlignment: "inner",
});

const disabledCol = "#00000040";
const textCol = i.disabled ? disabledCol : "#000000E0";
const borderCol = i.borderColor || (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9");
const bgFill = i.disabled ? "#0000000A" : (i.variant === "filled" ? "#00000005" : "#FFFFFF");
const strokeCol = i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : borderCol;

const count = Math.max(1, Number(i.length) || 6);
// 官方几何（antd 6 实测）：格子 26.5×32（含 paddingInline 4 + 边框 1）、columnGap 8；
// separator 仅在传入时渲染（/ 为 7×22，— 为 9.58×22），格子与分隔符之间同样隔 8px gap
const gap = 8;
const sep = i.separator ? String(i.separator) : "";
const sepW = sep ? (sep === "/" ? 7 : sep === "—" ? 9.58 : sep === "*" ? 6.45 : Math.max(7, sep.length * 7)) : 0;
const sepCount = sep ? count - 1 : 0;
const cellW = Number(i.cellWidth) > 0 ? Number(i.cellWidth) : i.size === "small" ? 24.5 : i.size === "large" ? 30.5 : 27;
// 根容器按内容宽（inline-flex），不跟随 pencil.width 拉伸
const totalW = count * cellW + sepCount * sepW + (count - 1 + sepCount) * gap;
const lineH = i.size === "small" ? 20 : i.size === "large" ? 24 : 22;
const textY = Math.round((h - lineH) / 2);

let curX = 0;
for (let n = 0; n < count; n++) {
  // 格子矩形
  nodes.push(box(curX, 0, cellW, h, bgFill, i.variant === "underlined" ? 0 : 6, strokeCol));
  if (i.variant === "underlined") {
    nodes.push(box(curX, h - 1, cellW, 1, borderCol, 0, borderCol, 0));
  }

  // 字符
  const charVal = i.value && String(i.value)[n] ? String(i.value)[n] : "";
  const displayChar = i.mask ? (charVal ? String(i.mask) : "") : charVal;
  if (displayChar) {
    nodes.push(text(displayChar, curX, textY, cellW, textCol, fontSize, "normal", "center", lineH));
  }

  curX += cellW;

  // 分隔符（官方 demo 自定义函数分隔符按 index 交替蓝/红）
  if (sep && n < count - 1) {
    curX += gap;
    const sepCol = i.separatorAltColors ? (n % 2 === 0 ? "#1677FF" : "#FF4D4F") : "#000000E0";
    nodes.push(text(sep, curX, Math.round((h - 22) / 2), sepW, sepCol, 14, "normal", "center", 22));
    curX += sepW + gap;
  } else if (n < count - 1) {
    curX += gap;
  }
}

return nodes;
