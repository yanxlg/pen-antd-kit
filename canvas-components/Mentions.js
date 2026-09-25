/**
 * @schema 2.18
 * @input placeholder: string = ""
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input disabled: boolean = false
 * @input readOnly: boolean = false
 * @input allowClear: boolean = false
 * @input clearIconType: enum("circle", "square") = "circle"
 * @input rows: number = 1
 * @input open: boolean = false
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 * @input borderRadius: number = 6
 * @input resizable: boolean = false
 */

const i = pencil.input;
const W = Math.max(60, Number(pencil.width) || 100);
const defaultH = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
let inputH = defaultH;
if (i.rows && i.rows > 1) {
  inputH = Math.max(defaultH, i.rows * 22 + 8);
} else if (!i.open && Number(pencil.height)) {
  inputH = Math.max(defaultH, Number(pencil.height));
} else if (i.open) {
  const hVal = Number(pencil.height) || defaultH;
  inputH = i.rows && i.rows > 1 ? Math.max(defaultH, i.rows * 22 + 8) : (hVal > 100 ? 62 : Math.max(defaultH, hVal));
}
const H = inputH;

const padX = i.size === "small" ? 7 : 11;
const padY = i.size === "small" ? 1 : i.size === "large" ? 7 : 4;
const fontSize = i.size === "large" ? 16 : 14;

const text = (content, x, y, width, height, color = "#000000E0", fs = 14, weight = "normal", align = "left") => ({
  type: "text",
  content: String(content),
  x,
  y,
  width,
  height: height || Math.max(16, fs + 4),
  textGrowth: "fixed-width",
  fill: color,
  fontFamily: "AlibabaSans",
  fontSize: fs,
  fontWeight: weight,
  lineHeight: 1.5714,
  textAlign: align,
});

const box = (x, y, width, height, fill = "#FFFFFF", radius = 6, stroke = "#D9D9D9", strokeWidth = 1, effect = undefined) => {
  const node = {
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
  };
  if (effect) node.effect = effect;
  return node;
};

const nodes = [];

// 聚焦与展开状态判定
const isFocused = (!!i.focused || !!i.open) && !i.disabled;
const primaryCol = i.primaryColor || "#1677FF";

// 边框与背景色定义
const customBorder = i.borderColor && String(i.borderColor).trim() !== "" ? String(i.borderColor).trim() : null;
const borderCol = customBorder || (
  i.status === "error" ? "#FF4D4F" :
  i.status === "warning" ? "#FAAD14" :
  isFocused ? primaryCol : "#D9D9D9"
);
let bgFill = "#FFFFFF";
let strokeCol = borderCol;

if (i.disabled) {
  bgFill = "#0000000A";
  strokeCol = i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : (customBorder || "#D9D9D9");
} else if (i.variant === "filled") {
  bgFill = i.status === "error" ? "#FFF2F0" : i.status === "warning" ? "#FFFBE6" : "#0000000A";
  strokeCol = customBorder || (i.status !== "default" ? borderCol : (isFocused ? primaryCol : "#00000000"));
} else if (i.variant === "borderless") {
  bgFill = "#00000000";
  strokeCol = customBorder || (isFocused ? primaryCol : "#00000000");
} else if (i.variant === "underlined") {
  bgFill = "#00000000";
  strokeCol = "#00000000";
}

const radius = i.borderRadius !== undefined && i.borderRadius !== null && i.borderRadius !== "" && !isNaN(Number(i.borderRadius))
  ? Number(i.borderRadius)
  : (i.variant === "underlined" ? 0 : 6);

const focusEffect = (isFocused && i.variant === "outlined" && !customBorder) ? {
  type: "shadow",
  shadowType: "outer",
  color: (i.status === "error" ? "#FF4D4F26" : i.status === "warning" ? "#FAAD1426" : "#1677FF26"),
  blur: 4,
  offset: { x: 0, y: 0 },
} : undefined;

// 主体框绘制
nodes.push(box(0, 0, W, H, bgFill, i.variant === "underlined" ? 0 : radius, strokeCol, 1, focusEffect));

// Underlined 变体仅画 1px 底线
if (i.variant === "underlined") {
  nodes.push(box(0, H - 1, W, 1, borderCol, 0, borderCol, 0));
}

// 右下角多行文本框 resize 手柄
if (i.resizable && !i.disabled) {
  nodes.push({
    type: "path",
    name: "resize-handle",
    x: W - 10,
    y: H - 10,
    width: 6,
    height: 6,
    viewBox: [0, 0, 6, 6],
    geometry: "M5 1 L1 5 M5 3 L3 5",
    stroke: "#00000045",
    strokeWidth: 1,
  });
}

// 文本内容渲染（open 时若无值则默认展示触发符 @，否则展示 value 或 placeholder）
const hasValue = i.value !== undefined && i.value !== null && String(i.value) !== "";
const hasPlaceholder = i.placeholder !== undefined && i.placeholder !== null && String(i.placeholder) !== "";

if (hasValue || hasPlaceholder || i.open) {
  const displayContent = hasValue ? String(i.value) : (i.open ? "@" : String(i.placeholder));
  const isActualValue = hasValue || i.open;
  const textCol = isActualValue ? (i.disabled ? "#00000040" : "#000000E0") : "#00000040";
  const clearReserved = i.allowClear && hasValue && !i.disabled ? 22 : 0;
  const contentH = Math.max(20, H - padY * 2);
  nodes.push(text(displayContent, padX + 1, padY + 1, Math.max(10, W - (padX + 1) * 2 - clearReserved), contentH, textCol, fontSize, "normal", "left"));
}

// 清除按钮渲染（始终纵向居中）
if (i.allowClear && hasValue && !i.disabled) {
  const iconSize = 12;
  const iconY = Math.round((H - iconSize) / 2);
  const isSquare = i.clearIconType === "square";
  const geometry = isSquare
    ? "M880 112c17.7 0 32 14.3 32 32v736c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32zM639.98 338.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
    : "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64Zm127.978 274.82-.034.006c-.023.007-.042.018-.083.059L512 466.745l-127.86-127.86c-.042-.041-.06-.052-.084-.059a.118.118 0 0 0-.07 0c-.022.007-.041.018-.082.059l-45.02 45.019c-.04.04-.05.06-.058.083a.118.118 0 0 0 0 .07l.01.022a.268.268 0 0 0 .049.06L466.745 512l-127.86 127.862c-.041.04-.052.06-.059.083a.118.118 0 0 0 0 .07c.007.022.018.041.059.082l45.019 45.02c.04.04.06.05.083.058a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059L512 557.254l127.862 127.861c.04.041.06.052.083.059a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059l45.02-45.019c.04-.04.05-.06.058-.083a.118.118 0 0 0 0-.07l-.01-.022a.268.268 0 0 0-.049-.06L557.254 512l127.861-127.86c.041-.042.052-.06.059-.084a.118.118 0 0 0 0-.07c-.007-.022-.018-.041-.059-.082l-45.019-45.02c-.04-.04-.06-.05-.083-.058a.118.118 0 0 0-.07 0Z";

  nodes.push({
    type: "path",
    name: "clear-icon",
    x: W - 22,
    y: iconY,
    width: iconSize,
    height: iconSize,
    viewBox: [64, 64, 896, 896],
    geometry,
    fill: "#00000040",
  });
}

// 展开下拉浮层（对齐 Ant Design 官方规范与光标下方定位）
if (i.open) {
  const dropW = 112;
  const dropH = 96;
  const dropX = 12;
  // 多行输入框在光标 @ 下方悬浮（y=28），单行输入框在框体下方（y=H+4）
  const dropY = H >= 50 ? 28 : (H + 4);

  // 下拉面板
  nodes.push({
    type: "rectangle",
    name: "mentions-dropdown",
    x: dropX,
    y: dropY,
    width: dropW,
    height: dropH,
    cornerRadius: 8,
    fill: "#FFFFFF",
    stroke: "#0000000F",
    strokeWidth: 1,
    strokeAlignment: "inner",
    effect: {
      type: "shadow",
      shadowType: "outer",
      color: "#00000018",
      blur: 16,
      offset: { x: 0, y: 6 },
    },
  });

  const rawOpts = i.options ? String(i.options).split("|") : ["afc163", "zombieJ", "yesmeck"];
  const opts = rawOpts.map(s => s.trim()).filter(Boolean);

  // 高亮第一项（圆角胶囊背景）
  nodes.push({
    type: "rectangle",
    name: "option-active-bg",
    x: dropX + 4,
    y: dropY + 4,
    width: dropW - 8,
    height: 28,
    cornerRadius: 4,
    fill: "#0000000A",
  });

  // 渲染各项文本
  opts.slice(0, 3).forEach((opt, n) => {
    nodes.push(text(
      opt,
      dropX + 12,
      dropY + 4 + n * 28 + 4,
      dropW - 24,
      20,
      "#000000E0",
      14,
      "normal",
      "left"
    ));
  });
}

return nodes;
