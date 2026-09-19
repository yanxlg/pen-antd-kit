import fs from "fs";
import { getButtonExactSize } from "../scripts/button-size-helper.mjs";

const penPath = "./libraries/antd-6.lib.pen";
const pen = JSON.parse(fs.readFileSync(penPath, "utf8"));

function makeId(prefix = "u") {
  return prefix + "_" + Math.random().toString(36).substr(2, 6);
}

function findNode(nodes, id) {
  if (!nodes) return null;
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const res = findNode(n.children, id);
      if (res) return res;
    }
  }
  return null;
}

function createBtn(name, inputs, extra = {}) {
  const sizeObj = getButtonExactSize(inputs);
  const isBlock = Boolean(inputs.block);
  return {
    type: "ref",
    ref: "antd-button-live-origin",
    id: makeId("btn"),
    name: name || `Btn · ${inputs.children || inputs.icon || "Button"}`,
    width: isBlock ? "fill_container" : sizeObj.width,
    height: sizeObj.height,
    inputs: { ...inputs },
    ...extra
  };
}

function makeRow(id, children, extra = {}) {
  return {
    type: "frame",
    id: id || makeId("row"),
    name: "Row",
    layout: "horizontal",
    gap: 8,
    alignItems: "center",
    children: children,
    ...extra
  };
}

function createCard(id, titleZh, titleEn, descZh, previewChildren, previewExtra = {}) {
  const previewFrame = {
    type: "frame",
    id: makeId("prev"),
    name: "section",
    context: "section",
    width: "fill_container",
    fill: "#ffffff",
    cornerRadius: [8, 8, 0, 0],
    stroke: "#0505050f",
    strokeWidth: { bottom: 1 },
    strokeAlignment: "inner",
    layout: previewExtra.layout || "horizontal",
    padding: [42, 24, 51, 24],
    gap: previewExtra.gap !== undefined ? previewExtra.gap : 8,
    alignItems: previewExtra.alignItems || "center",
    children: previewChildren
  };

  const descFrame = {
    type: "frame",
    id: makeId("desc_wrap"),
    name: "section",
    context: "section",
    width: "fill_container",
    layout: "vertical",
    padding: [18, 24, 18, 24],
    gap: 6,
    children: [
      {
        type: "text",
        id: makeId("title"),
        name: "title",
        content: titleZh + (titleEn ? ` ${titleEn}` : ""),
        fill: "#000000E0",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600"
      },
      {
        type: "text",
        id: makeId("desc"),
        name: "description",
        content: descZh,
        fill: "#00000073",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: "normal"
      }
    ]
  };

  return {
    type: "frame",
    id: id || makeId("card"),
    name: "section",
    context: "section",
    width: "fill_container",
    fill: "#ffffff",
    cornerRadius: 8,
    stroke: "#0505050f",
    strokeWidth: 1,
    strokeAlignment: "inner",
    layout: "vertical",
    padding: 0,
    children: [previewFrame, descFrame]
  };
}

const f = findNode(pen.children, "f7N34f");
if (!f) {
  console.error("f7N34f not found!");
  process.exit(1);
}

// 1. Fix f7N34f layout & gap
f.layout = "horizontal";
f.gap = 16;
f.alignItems = "start";
delete f.padding;

const col1 = f.children[0];
const col2 = f.children[1];

// 2. Clear column padding and set gap to 16
col1.layout = "vertical";
col1.gap = 16;
col1.width = "fill_container";
delete col1.padding;

col2.layout = "vertical";
col2.gap = 16;
col2.width = "fill_container";
delete col2.padding;

// Ensure all existing cards have padding: 0
for (const c of [...col1.children, ...col2.children]) {
  c.layout = "vertical";
  c.padding = 0;
}

// 3. Check if new cards already exist
let cardChineseSpace = findNode(pen.children, "card_chinese_space");
if (!cardChineseSpace) {
  cardChineseSpace = createCard(
    "card_chinese_space",
    "移除两个汉字之间的空格",
    "Two Chinese Characters Space",
    "我们默认在两个汉字之间添加空格，可以通过设置 autoInsertSpace 为 false 关闭。",
    [
      createBtn("Btn · 确定 无空格", { children: "确定", type: "primary", autoInsertSpace: false }),
      createBtn("Btn · 确定 默认空格", { children: "确定", type: "primary", autoInsertSpace: true })
    ]
  );
  col1.children.push(cardChineseSpace);
  console.log("Added Card: chinese-space to Col 1");
}

let cardLegacyGroup = findNode(pen.children, "card_legacy_group");
if (!cardLegacyGroup) {
  function makeCompactRow(size) {
    const isSmall = size === "small";
    const isLarge = size === "large";
    const h = isSmall ? 24 : (isLarge ? 40 : 32);
    return {
      type: "frame",
      id: makeId("grp_" + size),
      name: `Group · ${size}`,
      layout: "horizontal",
      gap: 0,
      alignItems: "center",
      children: [
        createBtn("Btn · Button 1", { children: "Button 1", type: "primary", size, compactPlacement: "start" }),
        createBtn("Btn · Button 2", { children: "Button 2", type: "primary", size, compactPlacement: "middle" }),
        createBtn("Btn · DL Disabled", { children: "", icon: "download", type: "primary", size, disabled: true, compactPlacement: "middle" }),
        createBtn("Btn · DL Normal", { children: "", icon: "download", type: "primary", size, compactPlacement: "end" })
      ]
    };
  }

  cardLegacyGroup = createCard(
    "card_legacy_group",
    "按钮组合",
    "Button.Group",
    "按钮组合使用 Button.Group 容器（5.x/6.x 推荐使用 Space.Compact 代替）。",
    [
      makeCompactRow("small"),
      makeCompactRow("middle"),
      makeCompactRow("large")
    ],
    { layout: "vertical", gap: 12, alignItems: "start" }
  );
  col2.children.push(cardLegacyGroup);
  console.log("Added Card: legacy-group to Col 2");
}

let cardChineseLoading = findNode(pen.children, "card_chinese_loading");
if (!cardChineseLoading) {
  cardChineseLoading = createCard(
    "card_chinese_loading",
    "汉字与加载中状态",
    "Chinese Characters Loading",
    "包含两个汉字的按钮在加载动画状态下的自适应间距与微距控制。",
    [
      createBtn("Btn · 确定 加载中", { children: "确定", type: "primary", loading: true }),
      createBtn("Btn · 按钮 加载中", { children: "按钮", type: "default", loading: true })
    ]
  );
  col2.children.push(cardChineseLoading);
  console.log("Added Card: chinese-chars-loading to Col 2");
}

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2), "utf8");
console.log(`Grid synchronized: Col 1 has ${col1.children.length} cards, Col 2 has ${col2.children.length} cards.`);
