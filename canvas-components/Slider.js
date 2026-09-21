/**
 * @schema 2.18
 * @input value: number = 40
 * @input values: string = ""
 * @input min: number = 0
 * @input max: number = 100
 * @input step: number = 1
 * @input stepNull: boolean = false
 * @input disabled: boolean = false
 * @input disabledHandles: string = ""
 * @input range: boolean = false
 * @input marks: boolean = false
 * @input markValues: string = "0,26,37,100"
 * @input markLabels: string = "0°C,26°C,37°C,100°C"
 * @input dots: boolean = false
 * @input included: boolean = true
 * @input orientation: enum("horizontal", "vertical") = "horizontal"
 * @input reverse: boolean = false
 * @input vertical: boolean = false
 * @input tooltipOpen: boolean = false
 * @input tooltipHidden: boolean = false
 * @input tooltipSuffix: string = ""
 * @input draggableTrack: boolean = false
 * @input editable: boolean = false
 * @input semanticStyle: enum("default", "object", "function", "multiple") = "default"
 * @input keyboard: boolean = true
 * @input ariaRequired: boolean = false
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(12, pencil.width);
const H = Math.max(12, pencil.height);
const min = Number(i.min ?? 0);
const max = Number(i.max ?? 100);
const span = Math.max(0.000001, max - min);
const vertical = i.vertical || i.orientation === "vertical";
const reverse = !!i.reverse;
const primary = i.semanticStyle === "function" ? "#722ED1" : (i.primaryColor || "#1677FF");
const disabledAll = !!i.disabled;
const railColor = "#0000000A";
const trackColor = disabledAll ? "#BFBFBF" : "#91CAFF";
const nodes = [];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const parseNumbers = (raw) => String(raw || "").split(/[|,\s]+/).map(Number).filter(Number.isFinite);
const disabledIndexes = new Set(parseNumbers(i.disabledHandles).map(Math.floor));
let values = i.range ? parseNumbers(i.values) : [Number(i.value ?? min)];
if (!values.length) values = i.range ? [min + span * 0.2, Number(i.value ?? min + span * 0.5)] : [Number(i.value ?? min)];
values = values.map(v => clamp(v, min, max)).sort((a, b) => a - b);
const ratios = values.map(v => (v - min) / span);
const physicalRatio = (r) => vertical ? (reverse ? r : 1 - r) : (reverse ? 1 - r : r);
const positions = ratios.map(physicalRatio);
const edge = 5;
const length = Math.max(1, (vertical ? H : W) - edge * 2);
const coordinate = (p) => edge + p * length;
const rect = (x, y, width, height, fill, radius = 2) => ({type: "rectangle", name: "Slider surface", x, y, width, height, fill, cornerRadius: radius});
const circle = (x, y, size, fill, stroke = "#00000000", strokeWidth = 0) => ({type: "ellipse", name: "Slider point", x, y, width: size, height: size, fill, stroke, strokeWidth, strokeAlignment: "inner"});
const label = (content, x, y, width, color = "#00000073", align = "center", fontSize = 12) => ({type: "text", name: "Slider label", content: String(content), x, y, width, height: 18, textGrowth: "fixed-width-height", textAlign: align, textAlignVertical: "middle", fill: color, fontFamily: "Alibaba Sans", fontSize, lineHeight: 1});
const gradient = i.semanticStyle === "object"
  ? {type: "gradient", gradientType: "linear", rotation: 0, colors: [{color: "#91CAFF", position: 0}, {color: "#1677FF", position: 1}]}
  : i.semanticStyle === "function"
    ? {type: "gradient", gradientType: "linear", rotation: 0, colors: [{color: "#722CC0", position: 0}, {color: "#722ED1", position: 1}]}
    : i.semanticStyle === "multiple"
      ? {type: "gradient", gradientType: "linear", rotation: 90, colors: [{color: "#87D068", position: 0}, {color: "#FFCCC7", position: 1}]}
      : trackColor;

if (vertical) nodes.push(rect((W - 4) / 2, edge, 4, length, railColor));
else nodes.push(rect(edge, (H - 4) / 2, length, 4, railColor));

if (i.included !== false) {
  let p1, p2;
  if (i.range) {
    p1 = Math.min(...positions);
    p2 = Math.max(...positions);
  } else {
    const minPhysical = physicalRatio(0);
    p1 = Math.min(minPhysical, positions[0]);
    p2 = Math.max(minPhysical, positions[0]);
  }
  const start = coordinate(p1);
  const end = coordinate(p2);
  if (vertical) nodes.push(rect((W - 4) / 2, start, 4, Math.max(1, end - start), gradient));
  else nodes.push(rect(start, (H - 4) / 2, Math.max(1, end - start), 4, gradient));
}

const markValues = i.marks ? parseNumbers(i.markValues) : [];
const markLabels = String(i.markLabels || "").split(/[|,]+/);
for (let idx = 0; idx < markValues.length; idx++) {
  const value = clamp(markValues[idx], min, max);
  const p = physicalRatio((value - min) / span);
  const pos = coordinate(p);
  const active = i.included !== false && (i.range ? p >= Math.min(...positions) && p <= Math.max(...positions) : reverse ? p >= positions[0] : vertical ? p >= positions[0] : p <= positions[0]);
  const dotColor = active && !disabledAll ? primary : "#D9D9D9";
  if (vertical) {
    nodes.push(circle((W - 8) / 2, pos - 4, 8, "#FFFFFF", dotColor, 2));
    nodes.push(label(markLabels[idx] || value, W + 8, pos - 9, 52, idx === markValues.length - 1 ? "#FF5500" : "#00000073", "left"));
  } else {
    nodes.push(circle(pos - 4, (H - 8) / 2, 8, "#FFFFFF", dotColor, 2));
    nodes.push(label(markLabels[idx] || value, pos - 28, H + 6, 56, idx === markValues.length - 1 ? "#FF5500" : "#00000073"));
  }
}

for (let idx = 0; idx < positions.length; idx++) {
  const pos = coordinate(positions[idx]);
  const handleDisabled = disabledAll || disabledIndexes.has(idx);
  const stroke = handleDisabled ? "#BFBFBF" : primary;
  if (vertical) nodes.push(circle((W - 10) / 2, pos - 5, 10, handleDisabled ? "#F5F5F5" : "#FFFFFF", stroke, 2));
  else nodes.push(circle(pos - 5, (H - 10) / 2, 10, handleDisabled ? "#F5F5F5" : "#FFFFFF", stroke, 2));
}

if (i.tooltipOpen && !i.tooltipHidden && positions.length) {
  const value = values[values.length - 1];
  const content = String(value) + String(i.tooltipSuffix || "");
  const bubbleW = Math.max(30, 12 + content.length * 7);
  const pos = coordinate(positions[positions.length - 1]);
  if (vertical) {
    nodes.push(rect(W + 12, pos - 12, bubbleW, 24, "#000000E0", 6));
    nodes.push(label(content, W + 12, pos - 9, bubbleW, "#FFFFFF"));
  } else {
    nodes.push(rect(pos - bubbleW / 2, -30, bubbleW, 24, "#000000E0", 6));
    nodes.push(label(content, pos - bubbleW / 2, -27, bubbleW, "#FFFFFF"));
  }
}
return nodes;
