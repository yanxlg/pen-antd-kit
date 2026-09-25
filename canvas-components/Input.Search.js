/**
 * @schema 2.18
 * @input placeholder: string = "input search text"
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input enterButton: string = ""
 * @input loading: boolean = false
 * @input disabled: boolean = false
 * @input allowClear: boolean = false
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input prefix: string = ""
 * @input suffixIcon: string = ""
 * @input suffixIconColor: string = ""
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 * @input color: string = ""
 */

const icons = {
  SearchOutlined: {
    viewBox: [64, 64, 896, 896],
    paths: ["M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"]
  },
  // 官方 LoadingOutlined：以 (512,512) 为圆心、半径 440~512 的 90° 圆弧 + 两端圆头（r=36）。
  // pen 的路径渲染不支持 `a`（椭圆弧）命令，故用等价的三次贝塞尔重绘（仅 M/C/Z）
  LoadingOutlined: {
    viewBox: [0, 0, 1024, 1024],
    paths: ["M512 72C755.01 72 952 268.99 952 512C952 531.88 968.12 548 988 548C1007.88 548 1024 531.88 1024 512C1024 229.23 794.77 0 512 0C492.12 0 476 16.12 476 36C476 55.88 492.12 72 512 72Z"]
  },
  AudioOutlined: {
    viewBox: [64, 64, 896, 896],
    paths: ["M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"]
  },
  CloseCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64Zm127.978 274.82-.034.006c-.023.007-.042.018-.083.059L512 466.745l-127.86-127.86c-.042-.041-.06-.052-.084-.059a.118.118 0 0 0-.07 0c-.022.007-.041.018-.082.059l-45.02 45.019c-.04.04-.05.06-.058.083a.118.118 0 0 0 0 .07l.01.022a.268.268 0 0 0 .049.06L466.745 512l-127.86 127.862c-.041.04-.052.06-.059.083a.118.118 0 0 0 0 .07c.007.022.018.041.059.082l45.019 45.02c.04.04.06.05.083.058a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059L512 557.254l127.862 127.861c.04.041.06.052.083.059a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059l45.02-45.019c.04-.04.05-.06.058-.083a.118.118 0 0 0 0-.07l-.01-.022a.268.268 0 0 0-.049-.06L557.254 512l127.861-127.86c.041-.042.052-.06.059-.084a.118.118 0 0 0 0-.07c-.007-.022-.018-.041-.059-.082l-45.019-45.02c-.04-.04-.06-.05-.083-.058a.118.118 0 0 0-.07 0Z"]
  }
};

const i = pencil.input;
const W = Math.max(80, pencil.width);
const h = i.size === "small" ? 24 : i.size === "large" ? 40 : 32;
// 官方内边距：middle/large 为 11px、small 为 7px；再各加 1px 描边。
const pad = i.size === "small" ? 8 : 12;
const fontSize = i.size === "small" ? 12 : i.size === "large" ? 16 : 14;
const lineH = i.size === "small" ? 20 : i.size === "large" ? 24 : 22;
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

const icon = (name, x, y, size, fill = "#00000073") => {
  const g = icons[name];
  if (!g) return;
  for (const path of g.paths) {
    nodes.push({ type: "path", name, x, y, width: size, height: size, viewBox: g.viewBox, geometry: path, fill });
  }
};

const hasButton = i.enterButton !== undefined && i.enterButton !== "" && i.enterButton !== "false";
const btnText = typeof i.enterButton === "string" && i.enterButton !== "true" ? i.enterButton : "";
// 官方按钮宽度（Button 水平 padding 15px + 1px 描边，内容盒）：
//   有 enterButton 文字 → 文字宽 + 32；enterButton={true} → 14/16 图标 + 32；无 enterButton → ant-btn-icon-only，width = height
const btnIconSize = i.size === "large" ? 16 : 14;
const btnTextW = Math.max(h, Math.round(btnText.length * fontSize * 0.5386));
// loading 时 Button 只是把 icon 换成 spinner（iconGap 8px），有文案时是 [spinner][gap][文案] 整体居中
const btnW = btnText
  ? btnTextW + 32 + (i.loading ? btnIconSize + 8 : 0)
  : (hasButton ? btnIconSize + 32 : h);

const disabledCol = "#00000040";
const primary = i.primaryColor || "#1677FF";
const borderCol = i.borderColor || (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9");
const isTransparentBorder = i.variant === "borderless" || i.variant === "underlined" || i.variant === "filled";
const bgFill = i.disabled ? "#F5F5F5" : (i.variant === "filled" ? "#0000000A" : (i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : "#FFFFFF"));
const strokeCol = isTransparentBorder ? "#00000000" : borderCol;
const customCol = i.color || "";
const textCol = i.value ? (i.disabled ? disabledCol : customCol || "#000000E0") : "#00000040";
const prefixTextCol = i.disabled ? disabledCol : customCol || "#000000E0";
const textY = (h - lineH) / 2;

// 按钮样式规则（官方 Search.tsx: color/variant 由 enterButton + variant 共同决定）：
// ┌──────────────────────────┬────────────────────────────────────────────────────────────┐
// │ enterButton / variant    │ button style                                               │
// ├──────────────────────────┼────────────────────────────────────────────────────────────┤
// │ false + outlined         │ color=default, variant=outlined  白底 D9D9D9边 深色icon     │
// │ false + filled/bl/ul     │ color=default, variant=text      rgba(0,0,0,0.04)底 无边     │
// │ true  + outlined         │ color=primary, variant=solid     primary底 无边 白icon       │
// │ true  + filled/bl/ul     │ color=primary, variant=text      rgba(0,0,0,0.04)底 无边 primary icon │
// └──────────────────────────┴────────────────────────────────────────────────────────────┘
const isSolid = hasButton && !isTransparentBorder;      // primary solid btn
const isPrimaryText = hasButton && isTransparentBorder; // primary text btn
const isOutlinedBtn = !hasButton && !isTransparentBorder; // default outlined btn
// isTextDefault = !hasButton && isTransparentBorder   -- default text btn (implicit)

const baseR = i.size === "large" ? 8 : (i.size === "small" ? 4 : 6);
const placement = i.compactPlacement || "none";
const outerStart = placement === "start" || placement === "none";
const outerEnd = placement === "end" || placement === "none";
let inputRadius = [outerStart ? baseR : 0, 0, 0, outerStart ? baseR : 0];
let btnRadius = [0, outerEnd ? baseR : 0, outerEnd ? baseR : 0, 0];
if (i.variant === "underlined") {
  inputRadius = 0;
  btnRadius = 0;
}

// 输入框与按钮的重叠：outlined 按钮有 D9D9D9 边框，需要 -1px 消除双边框；solid/text 按钮无边框不需要
const overlap = isOutlinedBtn ? 1 : 0;
const inputW = Math.max(1, W - btnW + overlap);
const btnX = inputW - overlap;
const finalBtnW = btnW;

// 输入框本体
nodes.push(box(0, 0, inputW, h, bgFill, inputRadius, strokeCol));
if (i.variant === "underlined") {
  nodes.push(box(0, h - 1, W, 1, borderCol, 0, borderCol, 0));
}

let curX = pad;
if (i.prefix) {
  nodes.push(text(i.prefix, curX, textY, 20, prefixTextCol, fontSize, "normal", "left", lineH));
  curX += 20;
}

// 右侧搜索按钮（尾部 padding 11px + 1px 描边 = 距右边缘 12px）
let rx = inputW - 12;

// 搜索内部右侧图标逻辑（放 suffixIcon 或 clear）；large 尺寸图标 16px
if (i.suffixIcon) {
  rx -= btnIconSize;
  icon(i.suffixIcon, rx, Math.round((h - btnIconSize) / 2), btnIconSize, i.suffixIconColor || (i.disabled ? disabledCol : "#000000E0"));
  rx -= 4;
}
if (i.allowClear && i.value && !i.disabled) {
  rx -= 12;
  icon("CloseCircleFilled", rx, Math.round((h - 12) / 2), 12, "#00000040");
}

const rawVal = i.value !== undefined && i.value !== "" ? i.value : (i.placeholder || "input search text");
nodes.push(text(rawVal, curX, textY, Math.max(1, rx - curX), textCol, fontSize, "normal", "left", lineH));

// 右侧搜索按钮颜色
const btnBg = i.disabled
  ? (isSolid ? "#0000000A" : bgFill)
  : isSolid ? primary : bgFill;
const btnBorder = isOutlinedBtn ? borderCol : "#00000000";
const btnIconCol = isSolid
  ? (i.disabled ? disabledCol : "#FFFFFF")
  : isPrimaryText
    ? (i.disabled ? disabledCol : primary)
    : (i.disabled ? disabledCol : customCol || "#000000E0");

const btnNodeStart = nodes.length;
nodes.push(box(btnX, 0, finalBtnW, h, btnBg, btnRadius, btnBorder));
if (i.loading) {
  // spinner 占据 icon 位，文案保留；整体（spinner + 8px + 文案）在按钮内居中
  const gap = btnText ? 8 : 0;
  const groupW = btnIconSize + gap + (btnText ? btnTextW : 0);
  const gx = btnX + Math.round((finalBtnW - groupW) / 2);
  icon("LoadingOutlined", gx, Math.round((h - btnIconSize) / 2), btnIconSize, btnIconCol);
  if (btnText) {
    // 左对齐、x 已按「icon + gap + 文字」整体居中算好；用 auto 宽度避免贴着估宽换行
    nodes.push(text(btnText, gx + btnIconSize + gap, textY, btnTextW, btnIconCol, fontSize, "normal", "left", lineH));
  }
} else if (btnText) {
  nodes.push({ ...text(btnText, btnX, textY, finalBtnW, btnIconCol, fontSize, "normal", "center", lineH), textGrowth: "fixed-width" });
} else {
  icon("SearchOutlined", btnX + Math.round((finalBtnW - btnIconSize) / 2), Math.round((h - btnIconSize) / 2), btnIconSize, btnIconCol);
}
// 官方 .ant-btn-loading { opacity: 0.65 }，整枚按钮（底/描边/图标/文案）一起降不透明度
if (i.loading) {
  for (let k = btnNodeStart; k < nodes.length; k++) nodes[k].opacity = 0.65;
}

return nodes;
