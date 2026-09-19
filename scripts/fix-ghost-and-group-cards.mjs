import fs from 'fs';
import { getButtonExactSize } from './button-size-helper.mjs';

// 1. Build Card 6 (Ghost) Children
export function buildGhostCard() {
  const children = [];

  // Title & Desc
  children.push({
    type: "text",
    id: "H4bT6K",
    name: "Card 6 Title",
    x: 24,
    y: 20,
    fill: "#FFFFFFE0",
    content: "6. 幽灵按钮与深色背景 (Ghost Variants & Dark Background)",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600"
  });

  children.push({
    type: "text",
    id: "D4DrVw",
    name: "Card 6 Desc",
    x: 24,
    y: 46,
    fill: "#FFFFFF73",
    content: "幽灵按钮（ghost=true）将背景透明化，专用于深色/彩色底色。支持 Primary, Default, Dashed, Danger 等全系列在深色下的反白与彩色边框反色",
    fontFamily: "Inter",
    fontSize: 13
  });

  const columns = [
    { id: "z3y8kQ", name: "Col Header Primary Ghost", title: "Primary Ghost", type: "primary", color: "primary", variant: "solid", danger: false },
    { id: "e0khlr", name: "Col Header Default Ghost", title: "Default Ghost", type: "default", color: "default", variant: "outlined", danger: false },
    { id: "Vxryx", name: "Col Header Dashed Ghost", title: "Dashed Ghost", type: "dashed", color: "default", variant: "dashed", danger: false },
    { id: "PopyS", name: "Col Header Danger Solid Ghost", title: "Danger Solid Ghost", type: "primary", color: "danger", variant: "solid", danger: true },
    { id: "WZRbv", name: "Col Header Danger Dashed Ghost", title: "Danger Dashed Ghost", type: "dashed", color: "danger", variant: "dashed", danger: true }
  ];

  const colXList = [180, 450, 720, 990, 1260];

  // Column Headers
  columns.forEach((col, cIdx) => {
    children.push({
      type: "text",
      id: col.id,
      name: col.name,
      x: colXList[cIdx],
      y: 78,
      fill: "#FFFFFF8A",
      content: col.title,
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "600"
    });
  });

  const rows = [
    { headerId: "Q6ibbj", headerName: "Row Header Normal", title: "Normal", state: "normal", rowY: 115, rowHeaderY: 121 },
    { headerId: "n8WJOw", headerName: "Row Header Hover / Focus", title: "Hover / Focus", state: "hover_or_press", rowY: 175, rowHeaderY: 181, dividerY: 161 },
    { headerId: "vll8l", headerName: "Row Header Active", title: "Active", state: "active", rowY: 235, rowHeaderY: 241, dividerY: 221 },
    { headerId: "IDel3", headerName: "Row Header Disabled", title: "Disabled", state: "disabled", rowY: 295, rowHeaderY: 301, dividerY: 281 },
    { headerId: "sVUqW", headerName: "Row Header Loading", title: "Loading", state: "loading", rowY: 355, rowHeaderY: 361, dividerY: 341 }
  ];

  const buttonIds = [
    // Normal
    ["T7ieEB", "qfAYB", "V12ij0", "Tjx0T", "G7p2Yl"],
    // Hover
    ["INlJN", "h4F7lf", "OggvY", "XM2ij", "GMaxb"],
    // Active
    ["BHbop", "Cn0oX", "i0CTC", "L6rUpb", "r6TrN"],
    // Disabled
    ["M5XlIF", "d6nSH", "L8vnD7", "Rg9tN", "Go3JP"],
    // Loading
    ["bMH4G", "QIAF4", "RipVO", "d59Dj", "KSMtN"]
  ];

  rows.forEach((row, rIdx) => {
    // Divider line
    if (row.dividerY) {
      children.push({
        type: "rectangle",
        name: `Row Line ${row.title}`,
        x: 24,
        y: row.dividerY,
        width: 1616,
        height: 1,
        fill: "#FFFFFF14"
      });
    }

    // Row header
    children.push({
      type: "text",
      id: row.headerId,
      name: row.headerName,
      x: 24,
      y: row.rowHeaderY,
      fill: "#FFFFFF73",
      content: row.title,
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "normal"
    });

    // 5 buttons in row
    columns.forEach((col, cIdx) => {
      const btnId = buttonIds[rIdx][cIdx];
      const text = (cIdx === 0) ? "Primary" : (cIdx === 1) ? "Default" : (cIdx === 2) ? "Dashed" : (cIdx === 3) ? "Danger" : "Dashed";
      const isDisabled = row.state === "disabled";
      const isLoading = row.state === "loading";

      const inputs = {
        children: text,
        type: col.type,
        color: col.color,
        variant: col.variant,
        size: "middle",
        shape: "default",
        danger: col.danger,
        ghost: true,
        disabled: isDisabled,
        loading: isLoading,
        state: row.state
      };

      const size = getButtonExactSize(inputs);

      children.push({
        type: "ref",
        ref: "antd-button-live-origin",
        id: btnId,
        name: `Btn · ${col.title} · ${row.title}`,
        x: colXList[cIdx],
        y: row.rowY,
        width: size.width,
        height: size.height,
        inputs
      });
    });
  });

  return {
    id: "M47PxJ",
    name: "Card · Ghost Variants & Dark Mode",
    x: 32,
    y: 2560,
    width: 1664,
    height: 430,
    fill: "#001529",
    cornerRadius: 8,
    stroke: "#112a45",
    strokeWidth: 1,
    strokeAlignment: "inner",
    layout: "none",
    children
  };
}

// 2. Build Card 7 (Compact Groups) Children
export function buildCompactCard() {
  const children = [];

  // Title & Desc
  children.push({
    type: "text",
    id: "u2kVE",
    name: "Card 7 Title",
    x: 24,
    y: 20,
    fill: "#000000E0",
    content: "7. 按钮组合与紧凑排列 (Button Combinations & Space.Compact)",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600"
  });

  children.push({
    type: "text",
    id: "xrMyR",
    name: "Card 7 Desc",
    x: 24,
    y: 46,
    fill: "#00000073",
    content: "展示 Space.Compact / Button.Group 下相邻按钮边框贴合（-1px 重合无双边框）、内外圆角协同以及拆分按钮、分段切换与动作栏场景",
    fontFamily: "Inter",
    fontSize: 13
  });

  // Helper to add a group of compact buttons
  function addCompactGroup(startX, y, buttons) {
    let curX = startX;
    buttons.forEach(btn => {
      const size = getButtonExactSize(btn.inputs);
      children.push({
        type: "ref",
        ref: "antd-button-live-origin",
        id: btn.id,
        name: btn.name,
        x: curX,
        y: y,
        width: size.width,
        height: size.height,
        inputs: btn.inputs
      });
      curX += size.width - 1; // overlap by 1px
    });
    return curX;
  }

  // Section 1
  children.push({
    type: "text",
    id: "f3FHZ",
    name: "Sec 1 Subtitle",
    x: 24,
    y: 88,
    fill: "#595959",
    content: "基础紧凑组合 · 动作命令组与拆分按钮",
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600"
  });

  // Group 1: Copy / Paste / Cut
  addCompactGroup(24, 116, [
    { id: "AnM8m", name: "Btn · Compact Copy", inputs: { children: "复制 Copy", type: "default", compactPlacement: "start", size: "middle" } },
    { id: "Kb0xe", name: "Btn · Compact Paste", inputs: { children: "粘贴 Paste", type: "default", compactPlacement: "middle", size: "middle" } },
    { id: "JSzMp", name: "Btn · Compact Cut", inputs: { children: "剪切 Cut", type: "default", compactPlacement: "end", size: "middle" } }
  ]);

  // Group 2: Align Left / Center / Right
  addCompactGroup(330, 116, [
    { id: "YSBXz", name: "Btn · Compact Align Left", inputs: { children: "靠左", icon: "align-left", type: "default", compactPlacement: "start", size: "middle" } },
    { id: "u137c", name: "Btn · Compact Align Center", inputs: { children: "居中", icon: "align-center", type: "default", compactPlacement: "middle", size: "middle" } },
    { id: "eSCFq", name: "Btn · Compact Align Right", inputs: { children: "靠右", icon: "align-right", type: "default", compactPlacement: "end", size: "middle" } }
  ]);

  // Group 3: Split Button (Submit + Chevron)
  addCompactGroup(620, 116, [
    { id: "kOMSu", name: "Btn · Split Submit", inputs: { children: "保存并提交", type: "primary", compactPlacement: "start", size: "middle" } },
    { id: "bB7qc", name: "Btn · Split Arrow", inputs: { children: "", icon: "chevron-down", type: "primary", compactPlacement: "end", size: "middle" } }
  ]);

  // Group 4: Sync + Danger Delete
  addCompactGroup(790, 116, [
    { id: "YUmwl", name: "Btn · Compact Sync", inputs: { children: "批量同步", type: "default", compactPlacement: "start", size: "middle" } },
    { id: "AsF9S", name: "Btn · Compact Delete Danger", inputs: { children: "全部删除", type: "primary", color: "danger", danger: true, compactPlacement: "end", size: "middle" } }
  ]);

  // Section 2
  children.push({
    type: "text",
    id: "JL6DE",
    name: "Sec 2 Subtitle",
    x: 24,
    y: 178,
    fill: "#595959",
    content: "视图切换与分页步骤组合 (View Switch & Stepper)",
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600"
  });

  // Group 5: View Day / Week / Month / Year
  addCompactGroup(24, 206, [
    { id: "N9wpl", name: "Btn · View Day", inputs: { children: "日视图", type: "primary", compactPlacement: "start", size: "middle" } },
    { id: "lTKFE", name: "Btn · View Week", inputs: { children: "周视图", type: "default", compactPlacement: "middle", size: "middle" } },
    { id: "ySzaR", name: "Btn · View Month", inputs: { children: "月视图", type: "default", compactPlacement: "middle", size: "middle" } },
    { id: "WFuTF", name: "Btn · View Year", inputs: { children: "年视图", type: "default", compactPlacement: "end", size: "middle" } }
  ]);

  // Group 6: Prev / Current / Next Step
  addCompactGroup(350, 206, [
    { id: "ZBjdQ", name: "Btn · Prev Step", inputs: { children: "< 上一步", type: "default", compactPlacement: "start", size: "middle" } },
    { id: "huH9o", name: "Btn · Current Step", inputs: { children: "第 2 / 5 步", type: "default", compactPlacement: "middle", size: "middle" } },
    { id: "WOd8a", name: "Btn · Next Step", inputs: { children: "下一步 >", type: "default", compactPlacement: "end", size: "middle" } }
  ]);

  // Group 7: Search Input Mock + Query
  addCompactGroup(660, 206, [
    { id: "EhIXQ", name: "Btn · Search Input Mock", inputs: { children: "输入搜索关键词...", type: "default", compactPlacement: "start", size: "middle" } },
    { id: "pxsMi", name: "Btn · Search Exec", inputs: { children: "查询", icon: "search", type: "primary", compactPlacement: "end", size: "middle" } }
  ]);

  // Section 3
  children.push({
    type: "text",
    id: "vV6Dw",
    name: "Sec 3 Subtitle",
    x: 24,
    y: 268,
    fill: "#595959",
    content: "跨尺寸规格组合 · 大尺寸计数器 (Large 40px) 与小尺寸工具栏 (Small 24px)",
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600"
  });

  // Group 8: Large Stepper
  addCompactGroup(24, 296, [
    { id: "eJa8f", name: "Btn · Large Plus", inputs: { children: "增加数量 +", type: "default", compactPlacement: "start", size: "large" } },
    { id: "q8Ab1", name: "Btn · Large Count", inputs: { children: "当前: 1,000", type: "default", compactPlacement: "middle", size: "large" } },
    { id: "N1Jot6", name: "Btn · Large Minus", inputs: { children: "减少数量 -", type: "default", compactPlacement: "end", size: "large" } }
  ]);

  // Group 9: Small Toolbar
  addCompactGroup(400, 304, [
    { id: "j8erS4", name: "Btn · Small Filter", inputs: { children: "筛选", icon: "filter", type: "default", compactPlacement: "start", size: "small" } },
    { id: "ifxYr", name: "Btn · Small Refresh", inputs: { children: "刷新", icon: "refresh-cw", type: "default", compactPlacement: "middle", size: "small" } },
    { id: "xvCJq", name: "Btn · Small More", inputs: { children: "更多", icon: "more-horizontal", type: "default", compactPlacement: "end", size: "small" } }
  ]);

  // Group 10: Buy Now + Cart
  addCompactGroup(630, 296, [
    { id: "zCVdz", name: "Btn · Large Buy Now", inputs: { children: "立即购买", type: "primary", compactPlacement: "start", size: "large" } },
    { id: "sW7EK", name: "Btn · Large Cart", inputs: { children: "加入购物车", type: "default", compactPlacement: "end", size: "large" } }
  ]);

  return {
    id: "alhEe",
    name: "Card · Button Combinations & Space.Compact",
    x: 32,
    y: 3014,
    width: 1664,
    height: 370,
    fill: "#FFFFFF",
    cornerRadius: 8,
    stroke: "#0505050f",
    strokeWidth: 1,
    strokeAlignment: "inner",
    layout: "none",
    children
  };
}

console.log("Both card builders ready.");
