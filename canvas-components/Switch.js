/**
 * @schema 2.18
 * @input checked: boolean = true
 * @input size: enum("medium", "small") = "medium"
 * @input loading: boolean = false
 * @input disabled: boolean = false
 * @input value: boolean = false
 * @input primaryColor: color = #1677FF
 * @input trackColor: string = ""
 * @input checkedChildren: string = ""
 * @input unCheckedChildren: string = ""
 * @input checkedIcon: enum("", "CheckOutlined") = ""
 * @input unCheckedIcon: enum("", "CloseOutlined") = ""
 * @input customTrackHeight: number = 0
 * @input customHandleSize: number = 0
 * @input customHandleOffsetX: number = 0
 */

const i = pencil.input || {};
const checked = i.checked === undefined ? !!i.value : !!i.checked;
const small = i.size === "small";
const standardTrackHeight = small ? 16 : 22;
const trackHeight = Number(i.customTrackHeight) > 0 ? Number(i.customTrackHeight) : standardTrackHeight;
const standardHandleSize = small ? 12 : 18;
const handleSize = Number(i.customHandleSize) > 0 ? Number(i.customHandleSize) : standardHandleSize;
const minWidth = small ? 28 : 44;
const activeText = checked ? (i.checkedChildren || "") : (i.unCheckedChildren || "");
const activeIcon = checked ? i.checkedIcon : i.unCheckedIcon;
const contentWidth = activeIcon ? 45 : activeText ? Math.ceil(String(activeText).length * 8 + 28) : 0;
const requestedWidth = Number(pencil.width) || 0;
const width = requestedWidth > 0 ? Math.max(minWidth, requestedWidth) : Math.max(minWidth, contentWidth);
const canvasHeight = Number(pencil.height) || trackHeight;
const trackY = (canvasHeight - trackHeight) / 2;
const handleY = trackY + (trackHeight - handleSize) / 2;
const handleOffsetX = Number(i.customHandleOffsetX) || 0;
const handleX = checked ? width - handleSize - 2 + handleOffsetX : 2;
const primary = i.primaryColor || "#1677FF";
const trackFill = i.trackColor || (checked ? primary : "#00000040");
const rootOpacity = i.disabled || i.loading ? 0.65 : 1;
const nodes = [];

nodes.push({
  type: "rectangle", name: "Switch track", x: 0, y: trackY,
  width, height: trackHeight, cornerRadius: trackHeight / 2,
  fill: trackFill, opacity: rootOpacity,
});
nodes.push({
  type: "ellipse", name: "Switch handle", x: handleX, y: handleY,
  width: handleSize, height: handleSize, fill: "#FFFFFF", opacity: rootOpacity,
  effect: {type: "shadow", shadowType: "outer", offset: {x: 0, y: 2}, blur: 4, color: "#00230B33"},
});

if (i.loading) {
  const loadingSize = small ? 7 : 9;
  nodes.push({
    type: "path", name: "Switch loading indicator",
    x: handleX + (handleSize - loadingSize) / 2,
    y: handleY + (handleSize - loadingSize) / 2,
    width: loadingSize, height: loadingSize,
    viewBox: [0, 0, 1024, 1024],
    geometry: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z",
    fill: checked ? primary : "#00000073", opacity: rootOpacity,
  });
}

const labelWidth = Math.max(0, width - handleSize - 10);
const labelX = checked ? 7 : handleSize + 5;
if (activeText) {
  nodes.push({
    type: "text", name: "Switch label", content: String(activeText),
    x: labelX, y: trackY, width: labelWidth, height: trackHeight,
    textGrowth: "fixed-width-height", fontFamily: "Inter", fontSize: 12,
    lineHeight: 1, textAlign: "center", textAlignVertical: "middle",
    fill: "#FFFFFF", opacity: rootOpacity,
  });
} else if (activeIcon) {
  const iconSize = 12;
  const iconX = labelX + Math.max(0, (labelWidth - iconSize) / 2);
  const iconY = trackY + (trackHeight - iconSize) / 2;
  const checkPath = "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z";
  const closePath = "M799.86 166.31 857.69 224.2 569.93 512l287.7 287.7-57.77 57.99L512 569.93 224.21 857.69l-57.9-57.9L454.07 512 166.31 224.21l57.9-57.9L512 454.07l287.86-287.76z";
  nodes.push({
    type: "path", name: "Switch label icon", x: iconX, y: iconY,
    width: iconSize, height: iconSize, viewBox: [64, 64, 896, 896],
    geometry: activeIcon === "CloseOutlined" ? closePath : checkPath,
    fill: "#FFFFFF", opacity: rootOpacity,
  });
}

return nodes;
