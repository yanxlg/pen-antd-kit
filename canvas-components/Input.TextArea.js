/**
 * @schema 2.18
 * @input placeholder: string = ""
 * @input value: string = ""
 * @input rows: number = 4
 * @input autoSize: boolean = false
 * @input showCount: boolean = false
 * @input maxLength: number = 0
 * @input disabled: boolean = false
 * @input allowClear: boolean = false
 * @input resizable: boolean = true
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 * @input countColor: string = ""
 */

const i = pencil.input;
const W = Math.max(80, pencil.width);
// 官方几何：lineHeight 22、padding 4px 11px、border 1px → 高 = rows*22 + 10（rows=4 → 98）
const defaultH = Math.max(32, (Number(i.rows) || 4) * 22 + 10);
const H = Math.max(defaultH, pencil.height || defaultH);
const padX = 11;
const padY = 4;
const nodes = [];

const text = (content, x, y, width, height, color = "#000000E0", fontSize = 14, weight = "normal", align = "left") => ({
  type: "text",
  content: String(content),
  x,
  y,
  width,
  height: height || Math.max(16, fontSize + 4),
  textGrowth: "fixed-width",
  fill: color,
  fontFamily: "Inter",
  fontSize,
  fontWeight: weight,
  lineHeight: 1.5714,
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

const disabledCol = "#00000040";
const textCol = i.value ? (i.disabled ? disabledCol : "#000000E0") : "#00000040";
const borderCol = i.borderColor || (i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9");
const bgFill = i.disabled ? "#F5F5F5" : (i.variant === "filled" ? "#0000000A" : "#FFFFFF");
const strokeCol = i.variant === "borderless" || i.variant === "underlined" ? "#00000000" : borderCol;

// 主体框
nodes.push(box(0, 0, W, H, bgFill, i.variant === "underlined" ? 0 : 6, strokeCol));
if (i.variant === "underlined") {
  nodes.push(box(0, H - 1, W, 1, borderCol, 0, borderCol, 0));
}

// 文本内容（官方无默认 placeholder，占位为空就不渲染文字）
const val = i.value !== undefined && i.value !== "" ? i.value : String(i.placeholder || "");
if (val) {
  const contentH = Math.max(22, H - padY * 2);
  const clearReserved = i.allowClear && i.value && !i.disabled ? 20 : 0;
  // CSS content box starts after the 1px wrapper border and 4px/11px textarea padding.
  nodes.push(text(val, padX + 1, padY + 1, W - (padX + 1) * 2 - clearReserved, contentH, textCol, 14, "normal", "left"));
}

// 字数统计
if (i.showCount) {
  const currentLen = String(i.value || "").length;
  const max = Number(i.maxLength) || 0;
  const countStr = max > 0 ? `${currentLen} / ${max}` : String(currentLen);
  const countCol = max > 0 && currentLen > max ? "#FF4D4F" : (i.countColor || "#00000073");
  const countW = Math.max(30, countStr.length * 6.3);
  // antd 6 positions .ant-input-data-count outside the textarea: top equals
  // the inner textarea's bottom edge (wrapper height - 1), right aligned to the wrapper.
  nodes.push(text(countStr, W - countW, H - 1, countW, 22, countCol, 14, "normal", "right"));
}

// 右下角 resize 手柄。autoSize 和 style={{ resize: "none" }} 不显示。
if (!i.disabled && i.variant !== "borderless" && i.resizable !== false && !i.autoSize) {
  const dotCol = "#00000040";
  const points = [[4, 4], [7, 4], [4, 7], [10, 4], [7, 7], [4, 10]];
  for (const [right, bottom] of points) {
    nodes.push({
      type: "rectangle",
      name: "resize-handle",
      x: W - right,
      y: H - bottom,
      width: 1.5,
      height: 1.5,
      cornerRadius: 0,
      fill: dotCol,
      stroke: dotCol,
      strokeWidth: 0,
    });
  }
}

// 清除图标
if (i.allowClear && i.value && !i.disabled) {
  nodes.push({
    type: "path",
    name: "clear-btn",
    x: W - 22,
    y: padY + 2,
    width: 12,
    height: 12,
    viewBox: [64, 64, 896, 896],
    geometry: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64Zm127.978 274.82-.034.006c-.023.007-.042.018-.083.059L512 466.745l-127.86-127.86c-.042-.041-.06-.052-.084-.059a.118.118 0 0 0-.07 0c-.022.007-.041.018-.082.059l-45.02 45.019c-.04.04-.05.06-.058.083a.118.118 0 0 0 0 .07l.01.022a.268.268 0 0 0 .049.06L466.745 512l-127.86 127.862c-.041.04-.052.06-.059.083a.118.118 0 0 0 0 .07c.007.022.018.041.059.082l45.019 45.02c.04.04.06.05.083.058a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059L512 557.254l127.862 127.861c.04.041.06.052.083.059a.118.118 0 0 0 .07 0c.022-.007.041-.018.082-.059l45.02-45.019c.04-.04.05-.06.058-.083a.118.118 0 0 0 0-.07l-.01-.022a.268.268 0 0 0-.049-.06L557.254 512l127.861-127.86c.041-.042.052-.06.059-.084a.118.118 0 0 0 0-.07c-.007-.022-.018-.041-.059-.082l-45.019-45.02c-.04-.04-.06-.05-.083-.058a.118.118 0 0 0-.07 0Z",
    fill: "#00000040"
  });
}

return nodes;
