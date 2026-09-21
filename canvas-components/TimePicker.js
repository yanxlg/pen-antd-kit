/**
 * @schema 2.18
 * @input placeholder: string = "Select time"
 * @input value: string = ""
 * @input defaultValue: string = ""
 * @input format: string = "HH:mm:ss"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input use12Hours: boolean = false
 * @input hourStep: number = 1
 * @input minuteStep: number = 1
 * @input secondStep: number = 1
 * @input needConfirm: boolean = false
 * @input changeOnScroll: boolean = false
 * @input prefixIcon: string = ""
 * @input suffixIcon: string = "ClockCircleOutlined"
 * @input renderExtraFooter: string = ""
 * @input semanticStyle: enum("default", "object", "function") = "default"
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(80, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const pad = i.size === "small" ? 7 : 11;
const fs = i.size === "large" ? 16 : 14;
const primary = i.primaryColor || "#1677FF";
const disabled = !!i.disabled;
const semantic = i.semanticStyle || "default";
const statusColor = i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";
const borderColor = semantic === "function" ? "#722ED1" : statusColor;
const bg = disabled || i.variant === "filled" ? "#F5F5F5" : "#FFFFFF";
const textColor = disabled ? "#00000040" : "#000000E0";
const muted = disabled ? "#00000025" : semantic === "function" ? "#722ED1" : "#00000040";
const nodes = [];
const text = (content, x, y, width, color = textColor, fontSize = fs, weight = "normal", align = "left") => ({
  type: "text", name: "Text", content: String(content), x, y, width, height: h,
  textGrowth: "fixed-width-height", textAlign: align, textAlignVertical: "middle",
  fill: color, fontFamily: "Alibaba Sans", fontSize, fontWeight: weight, lineHeight: 1
});
const fieldText = (content, x, width, color) => ({
  type: "frame", name: "Input text clip", x, y: 0, width, height: h, layout: "none", clip: true,
  children: [{type: "text", name: "Input text", content: String(content), x: 0, y: (h - fs) / 2, fill: color, fontFamily: "Alibaba Sans", fontSize: fs, lineHeight: 1}]
});
const rect = (x, y, width, height, fill, radius = 6, stroke = "#00000000", strokeWidth = 0) => ({
  type: "rectangle", name: "Surface", x, y, width, height, fill, cornerRadius: radius,
  stroke, strokeWidth, strokeAlignment: "inner"
});
const path = (geometry, viewBox, x, y, size, color) => ({
  type: "path", name: "Icon", geometry, viewBox, x, y, width: size, height: size, fill: color
});
const clock = (x, y, color = muted) => path("M512 64C264.6 64 64 264.6 64 512S264.6 960 512 960S960 759.4 960 512S759.4 64 512 64ZM512 884C306.6 884 140 717.4 140 512S306.6 140 512 140S884 306.6 884 512S717.4 884 512 884ZM544.1 535.5V288H480V563.4C480 566 481.2 568.4 483.3 569.9L648.7 690.5L688.5 638.8L544.1 535.5Z", [64, 64, 896, 896], x, y, 14, color);
const smile = (x, y, color = muted) => path("M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64Zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372ZM336 384a48 48 0 1 0 96 0 48 48 0 0 0-96 0Zm256 0a48 48 0 1 0 96 0 48 48 0 0 0-96 0Zm90.2 198.5H638c-13.7 55.8-65 97.5-126 97.5s-112.3-41.7-126-97.5h-44.2C356 663 426.4 724 512 724s156-61 170.2-141.5Z", [64, 64, 896, 896], x, y, 14, color);
const compactRadius = () => {
  if (i.compactPlacement === "middle") return 0;
  if (i.compactPlacement === "start") return i.compactOrientation === "vertical" ? [6, 6, 0, 0] : [6, 0, 0, 6];
  if (i.compactPlacement === "end") return i.compactOrientation === "vertical" ? [0, 0, 6, 6] : [0, 6, 6, 0];
  return 6;
};
const raw = i.value || i.defaultValue || "";
const formatValue = (value) => {
  if (!value) return i.placeholder || "Select time";
  const parts = String(value).split(":");
  let hh = Number(parts[0] || 0), mm = parts[1] || "00", ss = parts[2] || "00";
  if (i.use12Hours) {
    const suffix = hh >= 12 ? "PM" : "AM";
    hh = hh % 12 || 12;
    if ((i.format || "").includes("ss")) return hh + ":" + mm + ":" + ss + " " + suffix;
    return hh + ":" + mm + " " + ((i.format || "").includes("A") ? suffix : suffix.toLowerCase());
  }
  const format = i.format || "HH:mm:ss";
  const hour = String(parts[0] || "00").padStart(2, "0");
  if (/s/.test(format)) return hour + ":" + mm + ":" + ss;
  if (/m/.test(format)) return hour + ":" + mm;
  return hour;
};

if (i.variant === "underlined") {
  nodes.push(rect(0, 0, W, h, bg, 0));
  nodes.push(rect(0, h - 1, W, 1, borderColor, 0));
} else {
  const stroke = i.variant === "borderless" || i.variant === "filled" ? "#00000000" : borderColor;
  nodes.push(rect(0, 0, W, h, bg, compactRadius(), stroke, stroke === "#00000000" ? 0 : 1));
}
let left = pad;
if (i.prefixIcon) {
  nodes.push(smile(left, (h - 14) / 2, semantic === "function" ? "#722ED1" : textColor));
  left += 20;
}
const rightSpace = i.suffixIcon === "none" ? pad : 30;
nodes.push(fieldText(formatValue(raw), left, Math.max(16, W - left - rightSpace), raw ? textColor : "#00000040"));
if (i.suffixIcon !== "none") nodes.push(i.suffixIcon === "SmileOutlined" ? smile(W - pad - 14, (h - 14) / 2) : clock(W - pad - 14, (h - 14) / 2));

if (i.open) {
  const format = i.format || "HH:mm:ss";
  const showHour = /[Hh]/.test(format);
  const showMinute = /m/.test(format);
  const showSecond = /s/.test(format);
  const precisionColumns = (showHour ? 1 : 0) + (showMinute ? 1 : 0) + (showSecond ? 1 : 0);
  const cols = Math.max(1, precisionColumns) + (i.use12Hours ? 1 : 0);
  const pw = Math.max(W, cols * 56);
  const footerH = i.needConfirm || i.renderExtraFooter ? 40 : 0;
  const ph = 224 + footerH;
  const colW = pw / cols;
  nodes.push({type: "rectangle", name: "Popup", x: 0, y: h + 4, width: pw, height: ph, cornerRadius: 8, fill: "#FFFFFF", stroke: "#F0F0F0", strokeWidth: 1, effect: {type: "shadow", shadowType: "outer", blur: 12, offset: {x: 0, y: 4}, color: "#0000001F"}});
  const range = (max, step, pad2 = 2) => { const a = []; for (let n = 0; n < max && a.length < 7; n += Math.max(1, step || 1)) a.push(String(n).padStart(pad2, "0")); return a; };
  const lists = [];
  if (showHour) lists.push(range(i.use12Hours ? 12 : 24, i.hourStep, 2));
  if (showMinute) lists.push(range(60, i.minuteStep, 2));
  if (showSecond) lists.push(range(60, i.secondStep, 2));
  if (!lists.length) lists.push(range(24, i.hourStep, 2));
  if (i.use12Hours) lists.push(["AM", "PM"]);
  for (let col = 0; col < lists.length; col++) {
    if (col > 0) nodes.push(rect(col * colW, h + 4, 1, 224, "#F0F0F0", 0));
    for (let row = 0; row < lists[col].length; row++) {
      const y = h + 8 + row * 30;
      if (row === 0) nodes.push(rect(col * colW + 4, y, colW - 8, 28, "#E6F4FF", 4));
      nodes.push(text(lists[col][row], col * colW + 12, y, colW - 24, row === 0 ? primary : "#000000E0", 12));
    }
  }
  if (footerH) {
    nodes.push(rect(0, h + 228, pw, 1, "#F0F0F0", 0));
    nodes.push(rect(pw - 45, h + 236, 33, 24, primary, 4));
    nodes.push(text(i.renderExtraFooter || "OK", pw - 45, h + 232, 33, "#FFFFFF", 12, "normal", "center"));
  }
}
return nodes;
