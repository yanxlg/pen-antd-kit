/**
 * @schema 2.18
 * @input placeholder: string = ""
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input disabled: boolean = false
 * @input allowClear: boolean = false
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input addonBefore: string = ""
 * @input addonAfter: string = ""
 * @input prefixIcon: string = ""
 * @input suffixIcon: string = ""
 * @input suffixIconColor: string = ""
 * @input multiline: boolean = false
 * @input search: boolean = false
 * @input searchText: string = ""
 * @input password: boolean = false
 * @input showCount: boolean = false
 * @input countMax: number = 0
 * @input countStrategy: enum("length", "runes") = "length"
 * @input otp: boolean = false
 * @input otpLength: number = 6
 * @input otpSeparator: string = ""
 * @input otpMask: string = ""
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input bordered: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input htmlSize: number = 0
 * @input list: string = ""
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input src: string = ""
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 * @input countColor: string = ""
 * @input hasFeedback: boolean = false
 * @input feedbackStatus: enum("none", "success", "warning", "error", "validating") = "none"
 */
const icons = {
  "UserOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"] },
  "InfoCircleOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z", "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"] },
  "LockOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"] },
  "ClockCircleOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z", "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"] },
  "AudioOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"] },
  "EyeInvisibleOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z", "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"] },
  "CloseCircleFilled": { "viewBox": [64, 64, 896, 896], "paths": ["M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"] },
  "CheckCircleFilled": { "viewBox": [64, 64, 896, 896], "paths": ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.5l-254.4 256c-3.1 3.1-7.2 4.7-11.3 4.7-4.1 0-8.2-1.6-11.3-4.7l-120.7-121.5c-6.2-6.3-6.2-16.4 0-22.6l22.6-22.6c6.3-6.2 16.4-6.2 22.6 0l96.8 97.4 231.8-233.3c6.2-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6z"] },
  "ExclamationCircleFilled": { "viewBox": [64, 64, 896, 896], "paths": ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4 3.6 8 8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"] },
  "SmileOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"] },
  "LoadingOutlined": { "viewBox": [0, 0, 1024, 1024], "paths": ["M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"] },
  "SearchOutlined": { "viewBox": [64, 64, 896, 896], "paths": ["M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"] }
};

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const lineH = i.size === "small" ? 20 : i.size === "large" ? 24 : 22;
const fontSize = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const nodes = [];
const text = (content, x, y, width, color = "#000000E0", fontSize = 14, weight = "normal", align = "left", height = Math.max(16, fontSize + 4)) => ({ type: "text", content: String(content), x, y, width, height, fill: color, fontFamily: "Inter", fontSize, fontWeight: weight, ...(align === "center" ? { textGrowth: "fixed-width-height", textAlignVertical: "middle" } : align === "right" ? { textGrowth: "fixed-width" } : (i.multiline ? { textGrowth: "fixed-width" } : {})), textAlign: align, textAlignVertical: i.multiline ? "top" : "middle", lineHeight: i.multiline ? 1.5714 : height / fontSize });
const box = (x, y, width, height, fill = "#FFFFFF", radius = 6, stroke = "#D9D9D9", strokeWidth = 1) => ({ type: "rectangle", x, y, width, height, cornerRadius: radius, fill, stroke, strokeWidth, strokeAlignment: "inner" });
const circle = (x, y, size, fill = "#1677FF", stroke = undefined) => ({ type: "ellipse", x, y, width: size, height: size, fill, stroke, strokeWidth: stroke ? 1 : 0 });
const icon = (name, x, y, size, fill = "#00000040") => { const g = icons[name]; if (!g) return; for (const path of g.paths) nodes.push({ type: "path", name, x, y, width: size, height: size, viewBox: g.viewBox, geometry: path, fill }); };
const runeLen = (s) => { try { return Array.from(String(s)).length; } catch (e) { return String(s).length; } };
const disabled = i.disabled ? "#00000040" : "#000000E0";
const primary = i.danger ? "#FF4D4F" : (i.primaryColor || "#1677FF");
const countValue = i.countStrategy === "runes" ? runeLen(i.value || "") : String(i.value || "").length;
const countMax = Number(i.countMax || i.maxLength || 0);
const countExceeded = i.showCount && countMax > 0 && countValue > countMax;
// count.max overflow only colors the value and count in antd; it does not put
// the affix wrapper into error status or change its border color.
const isStatusError = !i.disabled && (i.status === "error" || (i.hasFeedback && i.feedbackStatus === "error"));
const isStatusWarning = !i.disabled && (i.status === "warning" || (i.hasFeedback && i.feedbackStatus === "warning"));
const isFocused = Boolean(i.focused && !i.disabled);
const isHovered = Boolean(i.hovered && !i.disabled);

const defaultBg = i.disabled ? "#0000000A" : (
  i.variant === "filled" ? (
    isFocused ? "#FFFFFF" :
      isStatusError ? "#FFF2F0" :
        isStatusWarning ? "#FFFBE6" :
          isHovered ? "#0000000F" : "#0000000A"
  ) : (i.variant === "borderless" || i.variant === "underlined") ? "#00000000" : "#FFFFFF"
);
const bgFill = i.backgroundColor || defaultBg;

const defaultBorder = i.variant === "filled" ? (
  isFocused ? (isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : primary) : "#00000000"
) : (i.variant === "borderless" || i.variant === "underlined") ? "#00000000" : "#D9D9D9";

const borderCol = i.borderColor || (
  i.disabled ? (i.variant === "filled" || i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : "#D9D9D9") :
    isStatusError ? "#FF4D4F" :
      isStatusWarning ? "#FAAD14" :
        isFocused ? primary :
          isHovered ? "#4096FF" : defaultBorder
);

const strokeCol = i.disabled ? (i.variant === "filled" || i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : "#D9D9D9") : (
  (i.variant === "borderless" || i.variant === "underlined") ? "#00000000" :
    (i.variant === "filled" && !i.borderColor && !isFocused) ? "#00000000" :
      borderCol
);
const compactRadius = (radius = 6) => {
  const placement = i.compactPlacement || "none";
  if (placement === "none") return radius;
  if (placement === "middle") return 0;
  if (i.compactOrientation === "vertical") return placement === "start" ? [radius, radius, 0, 0] : [0, 0, radius, radius];
  return placement === "start" ? [radius, 0, 0, radius] : [0, radius, radius, 0];
};

const fieldW = Math.max(1, pencil.width);
const fieldH = i.multiline ? H : h;
const countText = i.showCount ? (countMax > 0 ? countValue + " / " + countMax : String(countValue)) : "";
const countCol = countExceeded ? "#FF4D4F" : (i.countColor || "#00000073");
if (i.otp) {
  const count = Math.max(1, Number(i.otpLength) || 6), gap = 8;
  const sep = i.otpSeparator ? String(i.otpSeparator) : "";
  const sepW = sep ? 16 : 0, sepGap = sep ? 4 : 0;
  const bw = Math.max(8, (fieldW - gap * (count - 1) - (sepW + sepGap * 2) * (count - 1)) / count);
  for (let n = 0; n < count; n++) {
    const bx = n * (bw + gap + sepW + sepGap * 2);
    nodes.push(box(bx, 0, bw, h, i.disabled ? "#0000000A" : bgFill, 6, strokeCol));
    const ch = i.value ? String(i.value)[n] : (i.otpMask ? String(i.otpMask) : "");
    if (ch) nodes.push(text(ch, bx, 7, bw, disabled, 14, "normal", "center"));
    if (sep && n < count - 1) nodes.push(text(sep, bx + bw + sepGap, 7, sepW, "#00000040", 14, "normal", "center"));
  }
  return nodes;
}
const measureText = (str, fs = 14) => {
  let w = 0;
  for (const ch of String(str)) {
    if (ch >= '\u4e00' && ch <= '\u9fa5') w += fs;
    else if (/[MW]/.test(ch)) w += fs * 0.88;
    else if (/[A-Z]/.test(ch)) w += fs * 0.72;
    else if (/[mw]/.test(ch)) w += fs * 0.82;
    else if (/[ijl!.,:;'|]/.test(ch)) w += fs * 0.28;
    else if (/[ftr()/\-\s]/.test(ch)) w += fs * 0.38;
    else if (/[a-z0-9]/.test(ch)) w += fs * 0.56;
    else w += fs * 0.5;
  }
  return Math.ceil(w);
};

const baseR = i.size === "large" ? 8 : (i.size === "small" ? 4 : 6);
// 对齐 Ant Design 官方 token：paddingInline 为 11px（small 为 7px）
const addonPad = i.size === "small" ? 7 : 11;
const addonFontSize = fontSize;
const addonL = i.addonBefore ? measureText(i.addonBefore, addonFontSize) + addonPad * 2 : 0;
const addonR = i.addonAfter ? measureText(i.addonAfter, addonFontSize) + addonPad * 2 : 0;
const btnW = i.search ? (i.searchText ? Math.max(48, measureText(i.searchText, fontSize) + pad * 2) : h) : 0;
const fldX = addonL > 0 ? addonL - 1 : 0;
const rightOverlap = (addonR > 0 ? 1 : 0) + (btnW > 0 ? 1 : 0);
const fldW = Math.max(1, fieldW - fldX - addonR - btnW + rightOverlap);
const fieldFill = i.disabled && i.variant !== "underlined" ? "#F5F5F5" : bgFill;
const boxH = i.multiline && countText ? Math.max(24, fieldH - 22) : fieldH;
const addonCol = i.disabled ? "#00000040" : "#000000E0";
if (addonL) {
  nodes.push(box(0, 0, addonL, boxH, "#FAFAFA", [baseR, 0, 0, baseR], strokeCol));
  nodes.push(text(i.addonBefore, 0, (h - lineH) / 2, addonL, addonCol, addonFontSize, "normal", "center", lineH));
}
let fldRadius = compactRadius(baseR);
if (i.variant === "underlined") {
  fldRadius = 0;
} else if (addonL && (addonR || btnW)) {
  fldRadius = 0;
} else if (addonL) {
  fldRadius = [0, baseR, baseR, 0];
} else if (addonR || btnW) {
  fldRadius = [baseR, 0, 0, baseR];
}
nodes.push(box(fldX, 0, fldW, boxH, fieldFill, fldRadius, strokeCol));
if (addonR) {
  const rX = fldX + fldW - 1;
  nodes.push(box(rX, 0, addonR, boxH, "#FAFAFA", [0, baseR, baseR, 0], strokeCol));
  nodes.push(text(i.addonAfter, rX, (h - lineH) / 2, addonR, addonCol, addonFontSize, "normal", "center", lineH));
}
if (i.variant === "underlined") {
  nodes.push(box(fldX, boxH - 1, fldW, 1, borderCol, 0, borderCol, 0));
}
const iconSize = i.size === "large" ? 16 : i.size === "small" ? 12 : 14;
const iconY = Math.round((h - iconSize) / 2);
const defaultIconCol = i.disabled ? "#00000040" : (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#000000E0");
const prefixIconCol = i.prefixIconColor || defaultIconCol;
const prefixTextCol = i.disabled ? "#00000040" : (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#000000E0");

let curX = fldX + pad;
if (i.prefixIcon) {
  icon(i.prefixIcon, curX, iconY, iconSize, prefixIconCol);
  curX += iconSize + 8;
} else if (i.prefix) {
  const pw = Math.max(16, measureText(i.prefix, 14) + 4);
  nodes.push(text(i.prefix, curX, (h - lineH) / 2, pw, prefixTextCol, 14, "normal", "left", lineH));
  curX += pw + 4;
}
const raw = (i.value !== undefined && i.value !== "") ? i.value : (i.placeholder || "");
const val = i.password && i.value ? "•".repeat(Math.max(6, String(i.value).length)) : raw;
const statusTextCol = isStatusError ? "#FF4D4F" : isStatusWarning ? "#FAAD14" : null;
const isStatusTextColored = (i.variant === "filled" || i.variant === "borderless") && Boolean(statusTextCol);
const col = !i.value ? "#00000040" : (i.disabled ? "#00000040" : countExceeded ? "#FF4D4F" : isStatusTextColored ? statusTextCol : "#000000E0");
const center = i.textAlign === "center";
const suffixValue = i.suffix ? String(i.suffix) : "";
const suffixWidth = suffixValue ? Math.max(16, measureText(suffixValue, 14) + 6) : 0;
const clearVisible = i.allowClear && i.value && !i.search;
const suffixIconCol = i.suffixIconColor || defaultIconCol;
// 右侧装饰区自右向左排布（对齐 antd 官方 flex 顺序：输入框内容 → 清除图标 → 眼睛 → 计数器 → 后缀图标 → 后缀文本 → 反馈图标）
let rx = fldX + fldW - pad;
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
    const ix = rx - iconSize;
    icon(fbIcon, ix, iconY, iconSize, fbCol);
    rx = ix - 8;
  }
}
if (suffixValue) {
  const sx = rx - suffixWidth;
  nodes.push(text(suffixValue, sx, (h - lineH) / 2, suffixWidth, i.disabled ? "#00000040" : "#000000E0", fontSize, "normal", "right", lineH));
  rx = sx - 8;
}
if (i.suffixIcon) {
  const ix = rx - iconSize;
  icon(i.suffixIcon, ix, iconY, iconSize, suffixIconCol);
  rx = ix - 8;
}
if (countText && !i.multiline) {
  const cw = Math.max(24, countText.length * 7);
  const cx = rx - cw;
  nodes.push(text(countText, cx, (h - lineH) / 2, cw, countCol, fontSize, "normal", "right", lineH));
  rx = cx - 8;
}
if (i.password) {
  const px = rx - 16;
  icon("EyeInvisibleOutlined", px, Math.round((h - 16) / 2), 16, i.disabled ? "#00000040" : "#00000073");
  rx = px - 8;
}
if (clearVisible) {
  const clx = rx - 12;
  icon("CloseCircleFilled", clx, Math.round((h - 12) / 2), 12, "#00000040");
  rx = clx - 8;
}
const valueY = i.multiline ? 10 : (h - lineH) / 2;
const rightLimit = (rx === fldX + fldW - pad) ? rx : rx + 4;
const valueWidth = Math.max(1, center ? fldW : rightLimit - curX);
if (!center && !i.multiline && String(val).startsWith("🔥")) {
  const flameCount = String(val).match(/^🔥+/u)[0].length / 2;
  const flameWidth = flameCount * 16;
  for (let n = 0; n < flameCount; n++) {
    nodes.push({
      type: "rectangle", x: curX + n * 16, y: Math.round((h - 16) / 2) + 1, width: 16, height: 16,
      fill: { type: "image", url: "/Users/yanxianliang/overseas/pen-antd-kit/libraries/images/input-fire-emoji.png", mode: "fit" }
    });
  }
  const rest = String(val).slice(flameCount * 2);
  if (rest) nodes.push(text(rest, curX + flameWidth, valueY, Math.max(1, valueWidth - flameWidth), col, 14, "normal", "left", lineH));
} else if (val !== undefined && val !== "") {
  nodes.push(text(val, center ? fldX : curX, valueY, valueWidth, col, 14, "normal", center ? "center" : "left", i.multiline ? Math.max(18, fieldH - 20) : lineH));
}
if (i.multiline && countText) {
  const cw = Math.max(24, countText.length * 7);
  nodes.push(text(countText, fldX + fldW - pad - cw, fieldH - 20, cw, countCol, 14, "normal", "right"));
}
if (i.search) {
  const sX = fldX + fldW - 1;
  nodes.push(box(sX, 0, btnW, h, primary, [0, baseR, baseR, 0], primary));
  if (i.searchText) {
    nodes.push(text(i.searchText, sX, (h - lineH) / 2, btnW, "#FFFFFF", fontSize, "normal", "center", lineH));
  } else {
    icon("SearchOutlined", sX + Math.round((btnW - 14) / 2), Math.round((h - 14) / 2), 14, "#FFFFFF");
  }
}
return nodes;

