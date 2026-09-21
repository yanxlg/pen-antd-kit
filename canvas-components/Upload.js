/**
 * @schema 2.18
 * @input children: string = "Click to Upload"
 * @input accept: string = ""
 * @input action: string = ""
 * @input directory: boolean = false
 * @input disabled: boolean = false
 * @input listType: enum("text", "picture", "picture-card", "picture-circle") = "text"
 * @input maxCount: number = 0
 * @input multiple: boolean = false
 * @input openFileDialogOnClick: boolean = true
 * @input pastable: boolean = false
 * @input showUploadList: boolean = true
 */

const i = pencil.input || {};
const W = Number(pencil.width) || 320;
const H = Number(pencil.height) || 160;
const muted = i.disabled ? "#00000040" : "#00000073";
const textColor = i.disabled ? "#00000040" : "#000000E0";
const bg = i.disabled ? "#00000005" : "#FFFFFF";
const text = (content, x, y, width, height, fontSize = 14, color = textColor, align = "center") => ({
  type: "text", content, x, y, width, height, textGrowth: "fixed-width-height",
  fontFamily: "Inter", fontSize, lineHeight: 1.4, textAlign: align, textAlignVertical: "middle", fill: color,
});
const uploadPath = {
  type: "path", name: "Upload icon", viewBox: [64, 64, 896, 896],
  geometry: "M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163c-3.2-4.1-9.4-4.1-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z",
  fill: muted,
};

const buttonWidth = Math.min(W, Math.max(108, String(i.children || "Click to Upload").length * 8 + 46));
return [
  {type: "rectangle", x: 0, y: 0, width: buttonWidth, height: 32, fill: bg, stroke: "#D9D9D9", strokeWidth: 1, cornerRadius: 6},
  {...uploadPath, x: 12, y: 9, width: 14, height: 14},
  text(i.children || "Click to Upload", 32, 0, buttonWidth - 40, 32, 14, textColor, "left"),
];
