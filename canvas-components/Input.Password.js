/**
 * @schema 2.18
 * @input placeholder: string = "请输入密码"
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
    paths: ["M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64Zm127.978 274.82-.034.006c-.023.007-.042.018-.083.059L512 466.745l-127.86-127.86c-.042-.041-.06-.052-.084-.059a.118.118 0 0 0-.07 0c-.022.007-.041.018-.082.059l-45.02 45.019c-.04.04-.05.06-.058.083a.118.118 0 0 0 0 .07l.01.022a.268.268 0 0 0 .049.06L466.745 512l-127.86 127.862c-.041.04-.052.06-.059.083a.118.118 0 0 0 0 .07c.007.022.018.041.059.082l45.019 45.02c.04.04.06.05.083.058a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059L512 557.254l127.862 127.861c.04.041.06.052.083.059a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059l45.02-45.019c.04-.04.05-.06.058-.083a.118.118 0 0 0 0-.07l-.01-.022a.268.268 0 0 0-.049-.06L557.254 512l127.861-127.86c.041-.042.052-.06.059-.084a.118.118 0 0 0 0-.07c-.007-.022-.018-.041-.059-.082l-45.019-45.02c-.04-.04-.06-.05-.083-.058a.118.118 0 0 0-.07 0Z"]
  }
};

const i = pencil.input;
const W = Math.max(80, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
const pad = i.size === "small" ? 8 : i.size === "large" ? 16 : 12;
const fontSize = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const nodes = [];

const text = (content, x, y, width, color = "#000000E0", fSize = 14, weight = "normal", align = "left") => ({
  type: "text",
  content: String(content),
  x,
  y,
  width,
  height: Math.max(16, fSize + 4),
  fill: color,
  fontFamily: "Inter",
  fontSize: fSize,
  fontWeight: weight,
  textAlign: align,
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
const borderCol = i.borderColor || (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9");
const bgFill = i.disabled ? "#F5F5F5" : (i.variant === "filled" ? "#00000005" : "#FFFFFF");
const strokeCol = i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : borderCol;
const textCol = i.value ? (i.disabled ? disabledCol : "#000000E0") : "#00000040";
const textY = (h - (fontSize + 4)) / 2;

nodes.push(box(0, 0, W, h, bgFill, i.variant === "underlined" ? 0 : 6, strokeCol));
if (i.variant === "underlined") {
  nodes.push(box(0, h - 1, W, 1, borderCol, 0, borderCol, 0));
}

  const iconSize = i.size === "large" ? 16 : i.size === "small" ? 12 : 14;
  const iconY = Math.round((h - iconSize) / 2);
  const defaultIconCol = i.disabled ? "#00000040" : (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#000000E0");
  const prefixIconCol = i.prefixIconColor || defaultIconCol;
  const prefixTextCol = i.disabled ? "#00000040" : (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#000000E0");

let curX = pad;
if (i.prefixIcon) {
  icon(i.prefixIcon, curX, iconY, iconSize, prefixIconCol);
  curX += iconSize + 8;
} else if (i.prefix) {
  const pw = Math.max(16, String(i.prefix).length * 9);
  nodes.push(text(i.prefix, curX, textY, pw, prefixTextCol, fontSize));
  curX += pw + 4;
}

let rx = W - pad;

// 眼睛图标（默认显示）
if (i.visibilityToggle !== false) {
  rx -= 18;
  icon("EyeInvisibleOutlined", rx, Math.round((h - 14) / 2), 14, i.disabled ? "#00000040" : "#00000073");
}

// suffix
if (i.suffixIcon) {
  rx -= 20;
  icon(i.suffixIcon, rx, Math.round((h - 14) / 2), 14, i.suffixIconColor || defaultIconCol);
} else if (i.suffix) {
  const sw = Math.max(16, String(i.suffix).length * 8);
  rx -= sw + 4;
  nodes.push(text(i.suffix, rx, textY, sw, i.disabled ? "#00000040" : "#000000E0", fontSize, "normal", "right"));
}

// allowClear
if (i.allowClear && i.value && !i.disabled) {
  rx -= 18;
  icon("CloseCircleFilled", rx, Math.round((h - 12) / 2), 12, "#00000040");
}

const rawVal = i.value ? "•".repeat(Math.max(6, String(i.value).length)) : (i.placeholder || "请输入密码");
nodes.push(text(rawVal, curX, textY, Math.max(1, rx - curX), textCol, fontSize, "normal", "left"));

return nodes;
