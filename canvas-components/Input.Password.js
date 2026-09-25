/**
 * @schema 2.18
 * @input placeholder: string = "input password"
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input visibilityToggle: boolean = true
 * @input disabled: boolean = false
 * @input allowClear: boolean = false
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input prefix: string = ""
 * @input prefixIcon: string = ""
 * @input suffix: string = ""
 * @input suffixIcon: string = ""
 * @input suffixIconColor: string = ""
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 * @input hasFeedback: boolean = false
 * @input feedbackStatus: enum("none", "success", "warning", "error", "validating") = "none"
 */

const icons = {
  EyeInvisibleOutlined: {
    viewBox: [64, 64, 896, 896],
    paths: ["M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z","M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"]
  },
  LockOutlined: {
    viewBox: [64, 64, 896, 896],
    paths: ["M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"]
  },
  CloseCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"]
  },
  CheckCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.5l-254.4 256c-3.1 3.1-7.2 4.7-11.3 4.7-4.1 0-8.2-1.6-11.3-4.7l-120.7-121.5c-6.2-6.3-6.2-16.4 0-22.6l22.6-22.6c6.3-6.2 16.4-6.2 22.6 0l96.8 97.4 231.8-233.3c6.2-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6z"]
  },
  ExclamationCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4 3.6 8 8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"]
  },
  LoadingOutlined: {
    viewBox: [0, 0, 1024, 1024],
    paths: ["M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"]
  }
};

const i = pencil.input;
const W = Math.max(80, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const fontSize = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const nodes = [];

const text = (content, x, y, width, color = "#000000E0", fSize = 14, weight = "normal", align = "left", height = Math.max(16, fSize + 4)) => ({
  type: "text",
  content: String(content),
  x,
  y,
  width,
  height,
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

const icon = (name, x, y, size, fill = "#00000040") => {
  const g = icons[name];
  if (!g) return;
  for (const path of g.paths) {
    nodes.push({ type: "path", name, x, y, width: size, height: size, viewBox: g.viewBox, geometry: path, fill });
  }
};

const disabledCol = "#00000040";
const isStatusError = i.status === "error" || (i.hasFeedback && i.feedbackStatus === "error");
const isStatusWarning = i.status === "warning" || (i.hasFeedback && i.feedbackStatus === "warning");
const borderCol = i.borderColor || (isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : "#D9D9D9");
const bgFill = i.disabled ? "#F5F5F5" : (i.variant === "filled" ? "#00000005" : "#FFFFFF");
const strokeCol = i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : borderCol;
const textCol = i.value ? (i.disabled ? disabledCol : "#000000E0") : "#00000040";
const lineH = i.size === "small" ? 20 : i.size === "large" ? 24 : 22;
const textY = (h - lineH) / 2;

nodes.push(box(0, 0, W, h, bgFill, i.variant === "underlined" ? 0 : 6, strokeCol));
if (i.variant === "underlined") {
  nodes.push(box(0, h - 1, W, 1, borderCol, 0, borderCol, 0));
}

const iconSize = i.size === "large" ? 16 : i.size === "small" ? 12 : 14;
const iconY = Math.round((h - iconSize) / 2);
const defaultIconCol = i.disabled ? "#00000040" : (isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : "#000000E0");
const prefixIconCol = i.prefixIconColor || defaultIconCol;
const prefixTextCol = i.disabled ? "#00000040" : (isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : "#000000E0");

let curX = pad;
if (i.prefixIcon) {
  icon(i.prefixIcon, curX, iconY, iconSize, prefixIconCol);
  curX += iconSize + 8;
} else if (i.prefix) {
  const pw = Math.max(16, String(i.prefix).length * 9);
  nodes.push(text(i.prefix, curX, textY, pw, prefixTextCol, fontSize, "normal", "left", lineH));
  curX += pw + 4;
}

let rx = W - pad;
const effFeedback = i.hasFeedback ? (i.feedbackStatus && i.feedbackStatus !== "none" ? i.feedbackStatus : (i.status === "error" ? "error" : i.status === "warning" ? "warning" : i.status === "validating" ? "validating" : (i.status === "success" ? "success" : "none"))) : "none";
if (effFeedback !== "none") {
  const fbIcon = effFeedback === "success" ? "CheckCircleFilled" :
                 effFeedback === "warning" ? "ExclamationCircleFilled" :
                 effFeedback === "error" ? "CloseCircleFilled" :
                 effFeedback === "validating" ? "LoadingOutlined" : null;
  const fbCol = effFeedback === "success" ? "#52C41A" :
                effFeedback === "warning" ? "#FAAD14" :
                effFeedback === "error" ? "#FF4D4F" :
                effFeedback === "validating" ? "#1677FF" : "#00000040";
  if (fbIcon) {
    rx -= iconSize;
    icon(fbIcon, rx, iconY, iconSize, fbCol);
    rx -= 8;
  }
}

// 官网 Input.Password 的视觉顺序是 input → eye → custom suffix。
// 从右向左分配坐标，先放最右侧的 custom suffix，再放 eye。
if (i.suffixIcon) {
  rx -= iconSize;
  icon(i.suffixIcon, rx, iconY, iconSize, i.suffixIconColor || defaultIconCol);
  rx -= 8;
} else if (i.suffix) {
  const sw = Math.max(16, String(i.suffix).length * 8);
  rx -= sw;
  nodes.push(text(i.suffix, rx, textY, sw, i.disabled ? "#00000040" : "#000000E0", fontSize, "normal", "right", lineH));
  rx -= 8;
}

if (i.visibilityToggle !== false) {
  rx -= iconSize;
  icon("EyeInvisibleOutlined", rx, iconY, iconSize, i.disabled ? "#00000040" : "#00000073");
}

// allowClear
if (i.allowClear && i.value && !i.disabled) {
  rx -= 20;
  icon("CloseCircleFilled", rx, Math.round((h - 12) / 2), 12, "#00000040");
}

const rawVal = i.value ? "•".repeat(Math.max(6, String(i.value).length)) : (i.placeholder || "input password");
nodes.push(text(rawVal, curX, textY, Math.max(1, rx - curX - 4), textCol, fontSize, "normal", "left", lineH));

return nodes;
