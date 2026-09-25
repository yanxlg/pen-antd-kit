/**
 * @schema 2.18
 * @input layout: enum("horizontal", "vertical", "inline") = "horizontal"
 * @input size: enum("middle", "small", "large") = "middle"
 * @input disabled: boolean = false
 * @input colon: boolean = true
 * @input labelAlign: enum("right", "left") = "right"
 * @input labelWidth: number = 88
 * @input variant: enum("outlined", "borderless", "filled") = "outlined"
 * @input children: string = ""
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input || {};
const W = Math.max(80, pencil.width || 360);
const H = Math.max(24, pencil.height || 132);

const nodes = [];

const text = (content, x, y, width, height, color = "#000000E0", fs = 14, weight = "normal", align = "left") => ({
  type: "text",
  name: String(content),
  content: String(content),
  x: Math.round(x),
  y: Math.round(y),
  width: Math.max(1, Math.round(width)),
  height: Math.max(1, Math.round(height)),
  textGrowth: "fixed-width-height",
  fontFamily: "Inter",
  fontSize: fs,
  fontWeight: weight,
  lineHeight: 1.5714,
  textAlign: align,
  textAlignVertical: "middle",
  fill: color
});

const box = (x, y, width, height, fill = "#FFFFFF", radius = 6, stroke = "#D9D9D9", strokeWidth = 1) => ({
  type: "rectangle",
  x: Math.round(x),
  y: Math.round(y),
  width: Math.max(1, Math.round(width)),
  height: Math.max(1, Math.round(height)),
  cornerRadius: radius,
  fill,
  stroke,
  strokeWidth,
  strokeAlignment: "inner"
});

let parsedChildren = null;
if (i.children) {
  if (typeof i.children === "object") {
    parsedChildren = i.children;
  } else if (typeof i.children === "string") {
    try {
      parsedChildren = JSON.parse(i.children);
    } catch {
      if (/^[a-zA-Z0-9_-]{4,8}$/.test(i.children.trim())) {
        parsedChildren = [{ type: "ref", ref: i.children.trim() }];
      }
    }
  }
}

if (parsedChildren) {
  const items = Array.isArray(parsedChildren) ? parsedChildren : [parsedChildren];
  const isInline = i.layout === "inline";
  let curX = 0, curY = 0;
  const gapY = 24, gapX = 16;
  const controlH = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;

  for (const item of items) {
    const c = JSON.parse(JSON.stringify(item));
    if (!c.inputs) c.inputs = {};
    if (c.inputs.layout === undefined) c.inputs.layout = i.layout;
    if (c.inputs.size === undefined) c.inputs.size = i.size;
    if (c.inputs.disabled === undefined && i.disabled) c.inputs.disabled = i.disabled;
    if (c.inputs.colon === undefined) c.inputs.colon = i.colon;
    if (c.inputs.labelAlign === undefined) c.inputs.labelAlign = i.labelAlign;
    if (c.inputs.labelWidth === undefined) c.inputs.labelWidth = i.labelWidth;

    if (isInline) {
      const itemW = typeof c.width === "number" && c.width > 0 ? c.width : 200;
      c.x = curX;
      c.y = 0;
      c.width = itemW;
      c.height = c.height || controlH;
      nodes.push(c);
      curX += itemW + gapX;
    } else {
      const itemH = typeof c.height === "number" && c.height > 0 ? c.height : (i.layout === "vertical" ? 56 : controlH);
      c.x = 0;
      c.y = curY;
      c.width = W;
      c.height = itemH;
      nodes.push(c);
      curY += itemH + gapY;
    }
  }
} else {
  // Default Demo fallback
  const isHoriz = i.layout === "horizontal";
  const isInline = i.layout === "inline";
  const fields = ["Username", "Password"];
  const controlH = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
  const labelW = Number(i.labelWidth) || 88;

  fields.forEach((f, idx) => {
    if (isHoriz) {
      const fy = idx * (controlH + 16);
      nodes.push(text(f + (i.colon !== false ? " :" : ""), 0, fy, labelW, controlH, i.disabled ? "#00000040" : "#000000E0", 14, "normal", i.labelAlign || "right"));
      nodes.push(box(labelW + 8, fy, W - labelW - 8, controlH, i.disabled ? "#0000000A" : "#FFFFFF", 6, "#D9D9D9"));
      nodes.push(text("Please input " + f.toLowerCase(), labelW + 20, fy, W - labelW - 32, controlH, "#00000040", 14, "normal", "left"));
    } else if (isInline) {
      const cellW = (W - 16) / 2;
      const fx = idx * (cellW + 16);
      nodes.push(box(fx, 0, cellW, controlH, i.disabled ? "#0000000A" : "#FFFFFF", 6, "#D9D9D9"));
      nodes.push(text(f, fx + 12, 0, cellW - 24, controlH, "#00000040", 14, "normal", "left"));
    } else {
      const fy = idx * (controlH + 32);
      nodes.push(text(f, 0, fy, W, 22, i.disabled ? "#00000040" : "#000000E0", 14, "normal", "left"));
      nodes.push(box(0, fy + 26, W, controlH, i.disabled ? "#0000000A" : "#FFFFFF", 6, "#D9D9D9"));
      nodes.push(text("Please input " + f.toLowerCase(), 12, fy + 26, W - 24, controlH, "#00000040", 14, "normal", "left"));
    }
  });
}

return nodes;
