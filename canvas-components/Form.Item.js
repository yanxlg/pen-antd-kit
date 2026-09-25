/**
 * @schema 2.18
 * @input label: string = "Field Label"
 * @input required: boolean = false
 * @input colon: boolean = true
 * @input layout: enum("horizontal", "vertical") = "horizontal"
 * @input labelAlign: enum("right", "left") = "right"
 * @input labelWidth: number = 88
 * @input wrapperOffset: number = 0
 * @input validateStatus: enum("", "error", "warning", "success", "validating") = ""
 * @input help: string = ""
 * @input extra: string = ""
 * @input size: enum("middle", "small", "large") = "middle"
 * @input disabled: boolean = false
 * @input children: string = ""
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input || {};
const W = Math.max(80, pencil.width || 320);
const H = Math.max(24, pencil.height || 32);

const isSmall = i.size === "small";
const isLarge = i.size === "large";
const controlH = isSmall ? 24 : isLarge ? 40 : 32;
const fontSize = isSmall ? 12 : 14;
const textColor = i.disabled ? "#00000040" : "#000000E0";
const isVertical = i.layout === "vertical";

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

let cx = 0, cy = 0, cw = W, ch = controlH;
const hasLabel = Boolean(i.label && String(i.label).trim().length > 0);
const labelText = hasLabel ? String(i.label).trim() : "";
const labelW = Math.min(W * 0.45, Math.max(40, Number(i.labelWidth) || 88));

if (hasLabel) {
  if (isVertical) {
    const labelH = 22;
    let lx = 0;
    if (i.required) {
      nodes.push(text("*", 0, 0, 10, labelH, "#FF4D4F", fontSize, "normal", "left"));
      lx = 10;
    }
    const colonStr = i.colon ? " :" : "";
    nodes.push(text(labelText + colonStr, lx, 0, W - lx, labelH, textColor, fontSize, "normal", "left"));
    
    cx = 0;
    cy = labelH + 4;
    cw = W;
    ch = controlH;
  } else {
    const align = i.labelAlign || "right";
    const colonStr = (i.colon !== false) ? " :" : "";
    const fullLabel = labelText + colonStr;
    const labelH = controlH;
    
    if (align === "right") {
      const estTextW = Math.min(labelW - 16, Math.ceil(labelText.length * 8.5) + (i.colon !== false ? 10 : 0));
      const textX = Math.max(12, labelW - 8 - estTextW);
      if (i.required) {
        nodes.push(text("*", textX - 10, 0, 8, labelH, "#FF4D4F", fontSize, "bold", "center"));
      }
      nodes.push(text(fullLabel, textX, 0, labelW - textX, labelH, textColor, fontSize, "normal", "left"));
    } else {
      let lx = 0;
      if (i.required) {
        nodes.push(text("*", 0, 0, 10, labelH, "#FF4D4F", fontSize, "bold", "left"));
        lx = 10;
      }
      nodes.push(text(fullLabel, lx, 0, labelW - lx, labelH, textColor, fontSize, "normal", "left"));
    }
    
    cx = labelW + 8;
    cy = 0;
    cw = Math.max(40, W - cx);
    ch = controlH;
  }
} else {
  const offset = Number(i.wrapperOffset) || 0;
  cx = offset;
  cy = 0;
  cw = Math.max(40, W - cx);
  ch = controlH;
}

let parsedChild = null;
if (i.children) {
  if (typeof i.children === "object") {
    parsedChild = i.children;
  } else if (typeof i.children === "string") {
    try {
      parsedChild = JSON.parse(i.children);
    } catch {
      if (/^[a-zA-Z0-9_-]{4,8}$/.test(i.children.trim())) {
        parsedChild = { type: "ref", ref: i.children.trim() };
      }
    }
  }
}

function placeChild(node, x, y, width, height) {
  const c = JSON.parse(JSON.stringify(node));
  c.x = Math.round(x);
  c.y = Math.round(y);
  if (!c.width || c.width === "fill_container" || typeof c.width !== "number" || c.width > width) {
    c.width = Math.round(width);
  }
  if (!c.height || typeof c.height !== "number") {
    c.height = Math.round(height);
  }
  if (!c.inputs) c.inputs = {};
  if (i.validateStatus && !c.inputs.status) {
    c.inputs.status = i.validateStatus;
  }
  if (i.disabled && c.inputs.disabled === undefined) {
    c.inputs.disabled = true;
  }
  return c;
}

if (parsedChild) {
  if (Array.isArray(parsedChild)) {
    let curX = cx;
    for (const item of parsedChild) {
      const itemW = (typeof item.width === 'number' && item.width > 0) ? item.width : 88;
      nodes.push(placeChild(item, curX, cy, itemW, ch));
      curX += itemW + 8;
    }
  } else if (typeof parsedChild === "object" && (parsedChild.type || parsedChild.ref)) {
    nodes.push(placeChild(parsedChild, cx, cy, cw, ch));
  } else {
    nodes.push(text(String(i.children), cx, cy, cw, ch, textColor, fontSize, "normal", "left"));
  }
} else {
  const statusBorder = i.validateStatus === "error" ? "#FF4D4F" : i.validateStatus === "warning" ? "#FAAD14" : "#D9D9D9";
  nodes.push(box(cx, cy, cw, ch, i.disabled ? "#0000000A" : "#FFFFFF", 6, statusBorder));
  nodes.push(text("Please input...", cx + 12, cy, cw - 24, ch, "#00000040", fontSize, "normal", "left"));
}

const helpText = i.help || (i.validateStatus === "error" ? "Please enter a valid value" : (i.extra || ""));
if (helpText) {
  const helpColor = i.validateStatus === "error" ? "#FF4D4F" : i.validateStatus === "warning" ? "#FAAD14" : "#00000073";
  const hy = cy + ch + 4;
  nodes.push(text(helpText, cx, hy, cw, 18, helpColor, 12, "normal", "left"));
}

return nodes;
