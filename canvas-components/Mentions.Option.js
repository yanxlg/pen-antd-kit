/**
 * @schema 2.18
 * @input value: string = "afc163"
 * @input label: string = "afc163"
 * @input active: boolean = false
 * @input disabled: boolean = false
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(60, Number(pencil.width) || 120);
const H = Math.max(24, Number(pencil.height) || 32);

const nodes = [];
const active = !!i.active;
const disabled = !!i.disabled;
const textCol = disabled ? "#00000040" : "#000000E0";
const bgFill = active ? "#0000000A" : "#FFFFFF";

nodes.push({
  type: "rectangle",
  name: "option-item-bg",
  x: 0,
  y: 0,
  width: W,
  height: H,
  cornerRadius: 4,
  fill: bgFill,
  stroke: "#00000000",
  strokeWidth: 0,
});

const labelText = i.label || i.value || "afc163";
nodes.push({
  type: "text",
  name: "option-label",
  content: String(labelText),
  x: 12,
  y: Math.round((H - 20) / 2),
  width: Math.max(10, W - 24),
  height: 20,
  textGrowth: "fixed-width",
  fill: textCol,
  fontFamily: "AlibabaSans",
  fontSize: 14,
  fontWeight: "normal",
  lineHeight: 1.5714,
  textAlign: "left",
});

return nodes;
