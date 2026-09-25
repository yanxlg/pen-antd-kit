/**
 * @schema 2.18
 * @input compact: boolean = false
 * @input size: enum("default", "large", "small") = "default"
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input || {};
const W = Math.max(80, pencil.width || 320);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const fs = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const r = i.size === "small" ? 4 : i.size === "large" ? 8 : 6;
const isCompact = i.compact !== false;

const nodes = [];

const text = (content, x, y, width, color = "#000000E0", fontSize = 14, weight = "normal", align = "left", height = Math.max(16, fontSize + 4)) => ({
  type: "text",
  content: String(content),
  x,
  y,
  width,
  height,
  fill: color,
  fontFamily: "Inter",
  fontSize,
  fontWeight: weight,
  textAlign: align,
  lineHeight: height / fontSize,
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

if (isCompact) {
  // 紧凑模式：双输入框无缝并排连接（例如区号 0571 + 电话 26888888）
  const w1 = Math.round(W * 0.3);
  const w2 = W - w1 + 1;
  const textY = Math.round((h - 22) / 2);

  // 左侧子项
  nodes.push(box(0, 0, w1, h, "#FFFFFF", [r, 0, 0, r], "#D9D9D9", 1));
  nodes.push(text("0571", 11, textY, w1 - 22, "#000000E0", fs, "normal", "left", 22));

  // 右侧子项
  nodes.push(box(w1 - 1, 0, w2, h, "#FFFFFF", [0, r, r, 0], "#D9D9D9", 1));
  nodes.push(text("26888888", w1 + 11, textY, w2 - 22, "#000000E0", fs, "normal", "left", 22));
} else {
  // 普通模式：支持两两并排展示
  const gap = 8;
  const itemW = Math.max(20, (W - gap) / 2);
  const textY = Math.round((h - 22) / 2);

  nodes.push(box(0, 0, itemW, h, "#FFFFFF", r, "#D9D9D9", 1));
  nodes.push(text("Input 1", 11, textY, itemW - 22, "#000000E0", fs, "normal", "left", 22));

  nodes.push(box(itemW + gap, 0, itemW, h, "#FFFFFF", r, "#D9D9D9", 1));
  nodes.push(text("Input 2", itemW + gap + 11, textY, itemW - 22, "#000000E0", fs, "normal", "left", 22));
}

return nodes;
