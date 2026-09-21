/**
 * @schema 2.18
 * @input placeholder: string = "请输入内容"
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input disabled: boolean = false
 * @input allowClear: boolean = true
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
 */
const icons={"UserOutlined":{"viewBox":[64,64,896,896],"paths":["M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"]},"InfoCircleOutlined":{"viewBox":[64,64,896,896],"paths":["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z","M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"]},"LockOutlined":{"viewBox":[64,64,896,896],"paths":["M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"]},"ClockCircleOutlined":{"viewBox":[64,64,896,896],"paths":["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z","M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"]},"AudioOutlined":{"viewBox":[64,64,896,896],"paths":["M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"]},"EyeInvisibleOutlined":{"viewBox":[64,64,896,896],"paths":["M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z","M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"]},"CloseCircleFilled":{"viewBox":[64,64,896,896],"paths":["M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64Zm127.978 274.82-.034.006c-.023.007-.042.018-.083.059L512 466.745l-127.86-127.86c-.042-.041-.06-.052-.084-.059a.118.118 0 0 0-.07 0c-.022.007-.041.018-.082.059l-45.02 45.019c-.04.04-.05.06-.058.083a.118.118 0 0 0 0 .07l.01.022a.268.268 0 0 0 .049.06L466.745 512l-127.86 127.862c-.041.04-.052.06-.059.083a.118.118 0 0 0 0 .07c.007.022.018.041.059.082l45.019 45.02c.04.04.06.05.083.058a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059L512 557.254l127.862 127.861c.04.041.06.052.083.059a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059l45.02-45.019c.04-.04.05-.06.058-.083a.118.118 0 0 0 0-.07l-.01-.022a.268.268 0 0 0-.049-.06L557.254 512l127.861-127.86c.041-.042.052-.06.059-.084a.118.118 0 0 0 0-.07c-.007-.022-.018-.041-.059-.082l-45.019-45.02c-.04-.04-.06-.05-.083-.058a.118.118 0 0 0-.07 0Z"]},"SearchOutlined":{"viewBox":[64,64,896,896],"paths":["M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"]}};

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const nodes = [];
const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left") => ({type:"text", content:String(content), x, y, width, height:Math.max(16,fontSize+4), fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align});
const box = (x, y, width, height, fill="#FFFFFF", radius=6, stroke="#D9D9D9", strokeWidth=1) => ({type:"rectangle", x, y, width, height, cornerRadius:radius, fill, stroke, strokeWidth, strokeAlignment:"inner"});
const circle = (x, y, size, fill="#1677FF", stroke=undefined) => ({type:"ellipse", x, y, width:size, height:size, fill, stroke, strokeWidth:stroke?1:0});
const icon = (name, x, y, size, fill="#00000040") => { const g = icons[name]; if (!g) return; for (const path of g.paths) nodes.push({type:"path", name, x, y, width:size, height:size, viewBox:g.viewBox, geometry:path, fill}); };
const runeLen = (s) => { try { return Array.from(String(s)).length; } catch(e) { return String(s).length; } };
const disabled = i.disabled ? "#00000040" : "#000000E0";
const primary = i.danger ? "#FF4D4F" : (i.primaryColor || "#1677FF");
const borderCol = i.borderColor || (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9");
const bgFill = i.variant === "filled" ? "#0000000A" : "#FFFFFF";
const strokeCol = i.variant === "borderless" || i.variant === "underlined" || i.variant === "filled" ? "#00000000" : borderCol;
const compactRadius = (radius=6) => {
  const placement = i.compactPlacement || "none";
  if (placement === "none") return radius;
  if (placement === "middle") return 0;
  if (i.compactOrientation === "vertical") return placement === "start" ? [radius,radius,0,0] : [0,0,radius,radius];
  return placement === "start" ? [radius,0,0,radius] : [0,radius,radius,0];
};

  const fieldW = Math.max(1, pencil.width);
  const fieldH = i.multiline ? H : h;
  const countValue = i.countStrategy === "runes" ? runeLen(i.value || "") : String(i.value || "").length;
  const countMax = Number(i.countMax || i.maxLength || 0);
  const countText = i.showCount ? (countMax > 0 ? countValue + " / " + countMax : String(countValue)) : "";
  const countCol = countMax > 0 && countValue > countMax ? "#FF4D4F" : "#00000073";
  if (i.otp) {
    const count = Math.max(1, Number(i.otpLength) || 6), gap = 8;
    const sep = i.otpSeparator ? String(i.otpSeparator) : "";
    const sepW = sep ? 16 : 0, sepGap = sep ? 4 : 0;
    const bw = Math.max(8, (fieldW - gap * (count - 1) - (sepW + sepGap * 2) * (count - 1)) / count);
    for (let n=0;n<count;n++){
      const bx = n * (bw + gap + sepW + sepGap * 2);
      nodes.push(box(bx, 0, bw, h, i.disabled ? "#0000000A" : bgFill, 6, strokeCol));
      const ch = i.value ? String(i.value)[n] : (i.otpMask ? String(i.otpMask) : "");
      if (ch) nodes.push(text(ch, bx, 7, bw, disabled, 14, "normal", "center"));
      if (sep && n < count - 1) nodes.push(text(sep, bx + bw + sepGap, 7, sepW, "#00000040", 14, "normal", "center"));
    }
    return nodes;
  }
  const addonL = i.addonBefore ? Math.max(32, String(i.addonBefore).length * 8 + 24) : 0;
  const addonR = i.addonAfter ? Math.max(32, String(i.addonAfter).length * 8 + 24) : 0;
  const btnW = i.search ? (i.searchText ? Math.max(48, String(i.searchText).length * 8 + 28) : 40) : 0;
  const fldX = addonL;
  const fldW = Math.max(1, fieldW - addonL - addonR - btnW);
  const fieldFill = i.disabled && i.variant !== "underlined" ? "#F5F5F5" : bgFill;
  const boxH = i.multiline && countText ? Math.max(24, fieldH - 22) : fieldH;
  const addonCol = i.disabled ? "#00000040" : "#000000E0";
  if (addonL) {
    nodes.push(box(0, 0, addonL, boxH, "#FAFAFA", [6,0,0,6], strokeCol));
    nodes.push(text(i.addonBefore, 12, (h-18)/2, addonL - 24, addonCol, 14));
  }
  if (addonR) {
    nodes.push(box(fldX + fldW + btnW, 0, addonR, boxH, "#FAFAFA", [0,6,6,0], strokeCol));
    nodes.push(text(i.addonAfter, fldX + fldW + btnW + 12, (h-18)/2, addonR - 24, addonCol, 14));
  }
  const baseR = i.size === "large" ? 8 : (i.size === "small" ? 4 : 6);
  const fldRadius = i.variant === "underlined" ? 0 : (addonL || addonR || btnW ? 0 : compactRadius(baseR));
  nodes.push(box(fldX, 0, fldW, boxH, fieldFill, fldRadius, strokeCol));
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
    const pw = Math.max(16, String(i.prefix).length * 9);
    nodes.push(text(i.prefix, curX, (h - 18) / 2, pw, prefixTextCol, 14));
    curX += pw + 4;
  }
  const raw = i.value !== undefined && i.value !== "" ? i.value : (i.placeholder ?? (i.prefix ? "" : "请输入内容"));
  const val = i.password && i.value ? "•".repeat(Math.max(6,String(i.value).length)) : raw;
  const col = i.value ? disabled : "#00000040";
  const center = i.textAlign === "center";
  const suffixValue = i.suffix ? String(i.suffix) : "";
  const suffixWidth = suffixValue ? Math.max(16, suffixValue.length * 7) : 0;
  const clearVisible = i.allowClear && i.value && !i.search;
  const suffixIconCol = i.suffixIconColor || defaultIconCol;
  // 右侧装饰自右向左排布：字数 → 后缀文本 → 后缀图标 → 密码眼睛 → 清除（对齐 antd suffix 区顺序）
  let rx = fldX + fldW - pad;
  if (countText && !i.multiline) {
    const cw = Math.max(24, countText.length * 7);
    rx -= cw + (suffixValue || i.suffixIcon ? 8 : 0);
    nodes.push(text(countText, rx, (h-18)/2, cw, countCol, 14, "normal", "right"));
  }
  if (suffixValue) {
    rx -= suffixWidth + 8;
    nodes.push(text(suffixValue, rx, (h-18)/2, suffixWidth, i.disabled ? "#00000040" : "#000000E0", 14, "normal", "right"));
  }
  if (i.suffixIcon) {
    rx -= iconSize + 4;
    icon(i.suffixIcon, rx, iconY, iconSize, suffixIconCol);
  }
  if (i.password) {
    rx -= 18;
    icon("EyeInvisibleOutlined", rx, Math.round((h-16)/2), 16, i.disabled ? "#00000040" : "#00000073");
  }
  if (clearVisible) {
    rx -= 18;
    icon("CloseCircleFilled", rx, Math.round((h-12)/2), 12, "#00000040");
  }
  nodes.push(text(val, center ? fldX : curX, i.multiline?10:(h-18)/2, Math.max(1, center ? fldW : rx - curX), col, 14, "normal", center ? "center" : "left"));
  if (i.multiline && countText) {
    const cw = Math.max(24, countText.length * 7);
    nodes.push(text(countText, fldX + fldW - pad - cw, fieldH - 20, cw, countCol, 14, "normal", "right"));
  }
  if (i.search) {
    nodes.push(box(fldX + fldW, 0, btnW, h, primary, [0,6,6,0], primary));
    if (i.searchText) {
      nodes.push(text(i.searchText, fldX + fldW, (h-18)/2, btnW, "#FFFFFF", 14, "normal", "center"));
    } else {
      icon("SearchOutlined", fldX + fldW + 13, Math.round((h-14)/2), 14, "#FFFFFF");
    }
  }
return nodes;
