/**
 * @schema 2.18
 * @input children: string = "https://"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input disabled: boolean = false
 * @input variant: enum("outlined", "filled", "borderless") = "outlined"
 * @input status: enum("default", "error", "warning") = "default"
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 */

const i = pencil.input || {};
const W = Math.max(0, pencil.width);
const H = Math.max(0, pencil.height);
const nodes = [];

const r = i.size === "small" ? 4 : i.size === "large" ? 8 : 6;
const fs = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const hPad = 12;
const orientation = i.compactOrientation === "vertical" ? "vertical" : "horizontal";
const placement = i.compactPlacement || "none";

let radius = r;
if (placement === "middle") radius = 0;
else if (placement === "start") radius = orientation === "vertical" ? [r, r, 0, 0] : [r, 0, 0, r];
else if (placement === "end") radius = orientation === "vertical" ? [0, 0, r, r] : [0, r, r, 0];

const isFilled = i.variant === "filled";
const isBorderless = i.variant === "borderless";
const statusColor = i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";

nodes.push({
  type: "rectangle",
  name: "Addon surface",
  x: 0,
  y: 0,
  width: W,
  height: H,
  cornerRadius: radius,
  fill: isBorderless ? "#00000000" : "#0000000A",
  stroke: isBorderless || isFilled ? "#00000000" : statusColor,
  strokeWidth: 1,
  strokeAlignment: "inner",
});

const textH = Math.round(fs * 1.5714);
nodes.push({
  type: "text",
  name: "children",
  content: String(i.children === undefined || i.children === null ? "" : i.children),
  x: hPad,
  y: Math.round((H - textH) / 2),
  width: Math.max(0, W - hPad * 2),
  height: textH,
  textGrowth: "fixed-width-height",
  fontFamily: "Inter",
  fontSize: fs,
  lineHeight: 1.5714,
  fill: i.disabled ? "#00000040" : "#000000E0",
});

return nodes;
