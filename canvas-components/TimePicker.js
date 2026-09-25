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
 * @input hasFeedback: boolean = false
 * @input feedbackStatus: enum("none", "success", "warning", "error", "validating") = "none"
 */

const i = pencil.input;
const W = Math.max(80, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const pad = i.size === "small" ? 7 : 11;
const fs = i.size === "large" ? 16 : 14;
const primary = i.primaryColor || "#1677FF";
const disabled = !!i.disabled;
const semantic = i.semanticStyle || "default";
const isStatusError = i.status === "error" || (i.hasFeedback && i.feedbackStatus === "error");
const isStatusWarning = i.status === "warning" || (i.hasFeedback && i.feedbackStatus === "warning");
const statusColor = isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : "#D9D9D9";
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
const effFeedback = i.hasFeedback ? (i.feedbackStatus && i.feedbackStatus !== "none" ? i.feedbackStatus : (i.status === "error" ? "error" : i.status === "warning" ? "warning" : i.status === "validating" ? "validating" : (i.status === "success" ? "success" : "none"))) : "none";
const rightSpace = (i.suffixIcon === "none" ? pad : 30) + (effFeedback !== "none" ? 20 : 0);
nodes.push(fieldText(formatValue(raw), left, Math.max(16, W - left - rightSpace), raw ? textColor : "#00000040"));
if (i.suffixIcon !== "none") nodes.push(i.suffixIcon === "SmileOutlined" ? smile(W - pad - 14, (h - 14) / 2) : clock(W - pad - 14, (h - 14) / 2));
if (effFeedback !== "none") {
  const fbPath = effFeedback === "success" ? "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.5l-254.4 256c-3.1 3.1-7.2 4.7-11.3 4.7-4.1 0-8.2-1.6-11.3-4.7l-120.7-121.5c-6.2-6.3-6.2-16.4 0-22.6l22.6-22.6c6.3-6.2 16.4-6.2 22.6 0l96.8 97.4 231.8-233.3c6.2-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6z" :
                 effFeedback === "warning" ? "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4 3.6 8 8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" :
                 effFeedback === "error" ? "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" :
                 "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z";
  const fbVb = effFeedback === "validating" ? [0,0,1024,1024] : [64,64,896,896];
  const fbCol = effFeedback === "success" ? "#52C41A" :
                effFeedback === "warning" ? "#FAAD14" :
                effFeedback === "error" ? "#FF4D4F" : "#1677FF";
  nodes.push(path(fbPath, fbVb, W - pad - 34, (h-14)/2, 14, fbCol));
}

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
