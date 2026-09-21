/**
 * @schema 2.18
 * @input startPlaceholder: string = "Start time"
 * @input endPlaceholder: string = "End time"
 * @input value: string = ""
 * @input endValue: string = ""
 * @input format: string = "HH:mm:ss"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input use12Hours: boolean = false
 * @input hourStep: number = 1
 * @input minuteStep: number = 1
 * @input secondStep: number = 1
 * @input prefixIcon: string = ""
 * @input suffixIcon: string = "ClockCircleOutlined"
 * @input semanticStyle: enum("default", "object", "function") = "default"
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(180, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const pad = i.size === "small" ? 7 : 11;
const fs = i.size === "large" ? 16 : 14;
const primary = i.primaryColor || "#1677FF";
const statusColor = i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";
const borderColor = i.semanticStyle === "function" ? "#722ED1" : statusColor;
const bg = i.disabled || i.variant === "filled" ? "#F5F5F5" : "#FFFFFF";
const textColor = i.disabled ? "#00000040" : "#000000E0";
const muted = i.disabled ? "#00000025" : i.semanticStyle === "function" ? "#722ED1" : "#00000040";
const nodes = [];
const text = (content, x, y, width, color = textColor, align = "left") => ({type: "text", name: "Text", content: String(content), x, y, width, height: h, textGrowth: "fixed-width-height", textAlign: align, textAlignVertical: "middle", fill: color, fontFamily: "Alibaba Sans", fontSize: fs, lineHeight: 1});
const fieldText = (content, x, width, color) => ({type: "frame", name: "Input text clip", x, y: 0, width, height: h, layout: "none", clip: true, children: [{type: "text", name: "Input text", content: String(content), x: 0, y: (h - fs) / 2, fill: color, fontFamily: "Alibaba Sans", fontSize: fs, lineHeight: 1}]});
const rect = (x, y, width, height, fill, radius = 6, stroke = "#00000000", strokeWidth = 0) => ({type: "rectangle", name: "Surface", x, y, width, height, fill, cornerRadius: radius, stroke, strokeWidth, strokeAlignment: "inner"});
const path = (geometry, viewBox, x, y, size, color) => ({type: "path", name: "Icon", geometry, viewBox, x, y, width: size, height: size, fill: color});
const clock = (x, y) => path("M512 64C264.6 64 64 264.6 64 512S264.6 960 512 960S960 759.4 960 512S759.4 64 512 64ZM512 884C306.6 884 140 717.4 140 512S306.6 140 512 140S884 306.6 884 512S717.4 884 512 884ZM544.1 535.5V288H480V563.4C480 566 481.2 568.4 483.3 569.9L648.7 690.5L688.5 638.8L544.1 535.5Z", [64, 64, 896, 896], x, y, 14, muted);
const smile = (x, y) => path("M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64Zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372ZM336 384a48 48 0 1 0 96 0 48 48 0 0 0-96 0Zm256 0a48 48 0 1 0 96 0 48 48 0 0 0-96 0Zm90.2 198.5H638c-13.7 55.8-65 97.5-126 97.5s-112.3-41.7-126-97.5h-44.2C356 663 426.4 724 512 724s156-61 170.2-141.5Z", [64, 64, 896, 896], x, y, 14, muted);
const compactRadius = () => i.compactPlacement === "middle" ? 0 : i.compactPlacement === "start" ? (i.compactOrientation === "vertical" ? [6,6,0,0] : [6,0,0,6]) : i.compactPlacement === "end" ? (i.compactOrientation === "vertical" ? [0,0,6,6] : [0,6,6,0]) : 6;
if (i.variant === "underlined") {
  nodes.push(rect(0, 0, W, h, bg, 0));
  nodes.push(rect(0, h - 1, W, 1, borderColor, 0));
} else {
  const stroke = i.variant === "borderless" || i.variant === "filled" ? "#00000000" : borderColor;
  nodes.push(rect(0, 0, W, h, bg, compactRadius(), stroke, stroke === "#00000000" ? 0 : 1));
}
let left = pad;
if (i.prefixIcon) { nodes.push(smile(left, (h - 14) / 2)); left += 20; }
const right = i.suffixIcon === "none" ? pad : 30;
const inner = W - left - right;
const arrowW = 28;
const fieldW = (inner - arrowW) / 2;
nodes.push(fieldText(i.value || i.startPlaceholder || "Start time", left, fieldW, i.value ? textColor : "#00000040"));
nodes.push(text("→", left + fieldW, 0, arrowW, muted, "center"));
nodes.push(fieldText(i.endValue || i.endPlaceholder || "End time", left + fieldW + arrowW, fieldW, i.endValue ? textColor : "#00000040"));
if (i.suffixIcon !== "none") nodes.push(i.suffixIcon === "SmileOutlined" ? smile(W - pad - 14, (h - 14) / 2) : clock(W - pad - 14, (h - 14) / 2));
if (i.open) {
  const format = i.format || "HH:mm:ss";
  const showHour = /[Hh]/.test(format);
  const showMinute = /m/.test(format);
  const showSecond = /s/.test(format);
  const precisionColumns = (showHour ? 1 : 0) + (showMinute ? 1 : 0) + (showSecond ? 1 : 0);
  const cols = Math.max(1, precisionColumns) + (i.use12Hours ? 1 : 0);
  const panelW = Math.max(W, cols * 112);
  const panelH = 256;
  nodes.push({type: "rectangle", name: "Range time popup", x: 0, y: h + 4, width: panelW, height: panelH, cornerRadius: 8, fill: "#FFFFFF", stroke: "#F0F0F0", strokeWidth: 1, effect: {type: "shadow", shadowType: "outer", blur: 12, offset: {x: 0, y: 4}, color: "#0000001F"}});
  nodes.push(rect(panelW / 2, h + 4, 1, panelH, "#F0F0F0", 0));
  for (let side = 0; side < 2; side++) {
    const ox = side * panelW / 2;
    nodes.push(text(side === 0 ? "Start time" : "End time", ox + 12, h + 8, panelW / 2 - 24, "#000000E0"));
    const range = (max, step) => { const a = []; for (let n = 0; n < max && a.length < 6; n += Math.max(1, step || 1)) a.push(String(n).padStart(2, "0")); return a; };
    const lists = [];
    if (showHour) lists.push(range(i.use12Hours ? 12 : 24, i.hourStep));
    if (showMinute) lists.push(range(60, i.minuteStep));
    if (showSecond) lists.push(range(60, i.secondStep));
    if (!lists.length) lists.push(range(24, i.hourStep));
    if (i.use12Hours) lists.push(["AM", "PM"]);
    const colW = panelW / 2 / cols;
    for (let col = 0; col < lists.length; col++) {
      if (col > 0) nodes.push(rect(ox + col * colW, h + 36, 1, 220, "#F0F0F0", 0));
      for (let row = 0; row < lists[col].length; row++) {
        const y = h + 38 + row * 30;
        if (row === 0) nodes.push(rect(ox + col * colW + 4, y, colW - 8, 28, "#E6F4FF", 4));
        nodes.push(text(lists[col][row], ox + col * colW + 12, y, colW - 24, row === 0 ? primary : "#000000E0"));
      }
    }
  }
}
return nodes;
