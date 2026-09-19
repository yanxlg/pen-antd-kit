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

// Ensure antd-button-live-origin inputs schema declares linearGradient and disabledBg
const origin = findNode(pen.children, "antd-button-live-origin");
if (origin) {
  origin.inputs = {
    ...origin.inputs,
    linearGradient: false,
    disabledBg: "",
    customFill: null,
    customStroke: null,
    customTextColor: null
  };
  console.log("Updated origin inputs schema!");
}

function createBtn(name, inputs, extra = {}) {
  const sizeObj = getButtonExactSize(inputs);
  const isBlock = Boolean(inputs.block);
  const node = {
    type: "ref",
    ref: "antd-button-live-origin",
    id: makeId("btn"),
    name: name || `Btn · ${inputs.children || inputs.icon || "Button"}`,
    width: isBlock ? "fill_container" : sizeObj.width,
    height: sizeObj.height,
    inputs: { ...inputs },
    ...extra
  };
  return node;
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

// ==========================================
// CARD 1: ecSyZ (Syntactic sugar / Type)
// ==========================================
const c1 = findNode(pen.children, "ecSyZ");
if (c1) {
  const preview = c1.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 8;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Primary Button", { children: "Primary Button", type: "primary" }),
      createBtn("Btn · Default Button", { children: "Default Button", type: "default" }),
      createBtn("Btn · Dashed Button", { children: "Dashed Button", type: "dashed" }),
      createBtn("Btn · Text Button", { children: "Text Button", type: "text" }),
      createBtn("Btn · Link Button", { children: "Link Button", type: "link" })
    ];
  }
}

// ==========================================
// CARD 2: amPdg (Icon)
// ==========================================
const c2 = findNode(pen.children, "amPdg");
if (c2) {
  const preview = c2.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 12;
    preview.children = [
      makeRow("row_icon_1", [
        createBtn("Btn · Search Circle Primary", { children: "", icon: "search", type: "primary", shape: "circle" }),
        createBtn("Btn · Text Circle Primary", { children: "A", type: "primary", shape: "circle" }),
        createBtn("Btn · Search Primary", { children: "Search", icon: "search", type: "primary" }),
        createBtn("Btn · Search Circle Default", { children: "", icon: "search", type: "default", shape: "circle" }),
        createBtn("Btn · Search Default", { children: "Search", icon: "search", type: "default" })
      ]),
      makeRow("row_icon_2", [
        createBtn("Btn · Search Circle Default 2", { children: "", icon: "search", type: "default", shape: "circle" }),
        createBtn("Btn · Search Circle Dashed", { children: "", icon: "search", type: "dashed", shape: "circle" }),
        createBtn("Btn · Search Dashed", { children: "Search", icon: "search", type: "dashed" }),
        createBtn("Btn · Search Link Circle", { children: "", icon: "search", type: "link", shape: "circle", href: "https://www.google.com" })
      ])
    ];
  }
}

// ==========================================
// CARD 3: B66IeN (Size - Flattened 3 sizes)
// ==========================================
const c3 = findNode(pen.children, "B66IeN");
if (c3) {
  const preview = c3.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 20;

    function makeSizeSection(size, label, h, fs, r) {
      return {
        type: "frame",
        id: makeId("sec_" + size),
        name: `Section · ${size}`,
        layout: "vertical",
        gap: 10,
        children: [
          {
            type: "text",
            id: makeId("tag"),
            content: `size="${size}" · ${label} (h=${h}px, fs=${fs}px, r=${r}px)`,
            fill: "#1677FF",
            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: "600"
          },
          makeRow(makeId("r1"), [
            createBtn(`Btn · Primary ${size}`, { children: "Primary", type: "primary", size }),
            createBtn(`Btn · Default ${size}`, { children: "Default", type: "default", size }),
            createBtn(`Btn · Dashed ${size}`, { children: "Dashed", type: "dashed", size }),
            createBtn(`Btn · Link ${size}`, { children: "Link", type: "link", size })
          ]),
          makeRow(makeId("r2"), [
            createBtn(`Btn · DL Icon ${size}`, { children: "", icon: "download", type: "primary", size }),
            createBtn(`Btn · DL Circle ${size}`, { children: "", icon: "download", type: "primary", shape: "circle", size }),
            createBtn(`Btn · DL Round Icon ${size}`, { children: "", icon: "download", type: "primary", shape: "round", size }, { width: h + 12 }),
            createBtn(`Btn · DL Round ${size}`, { children: "Download", icon: "download", type: "primary", shape: "round", size }),
            createBtn(`Btn · DL ${size}`, { children: "Download", icon: "download", type: "primary", size })
          ])
        ]
      };
    }

    preview.children = [
      makeSizeSection("large", "Large", 40, 16, 8),
      makeSizeSection("middle", "Middle (Default)", 32, 14, 6),
      makeSizeSection("small", "Small", 24, 14, 4)
    ];
  }
}

// ==========================================
// CARD 4: dYwZb (Loading)
// ==========================================
const c4 = findNode(pen.children, "dYwZb");
if (c4) {
  const preview = c4.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 12;
    preview.children = [
      makeRow("row_loading_1", [
        createBtn("Btn · Loading Primary", { children: "Loading", type: "primary", loading: true }),
        createBtn("Btn · Loading Small", { children: "Loading", type: "primary", size: "small", loading: true }),
        createBtn("Btn · Loading Circle", { children: "", type: "primary", shape: "circle", loading: true }),
        createBtn("Btn · Loading Icon", { children: "Loading Icon", type: "primary", loading: true })
      ]),
      makeRow("row_loading_2", [
        createBtn("Btn · Icon Start", { children: "Icon Start", icon: "power", type: "primary" }),
        createBtn("Btn · Icon End", { children: "Icon End", icon: "power", iconPosition: "end", type: "primary" }),
        createBtn("Btn · Icon Replace", { children: "Icon Replace", icon: "power", type: "primary" }),
        createBtn("Btn · Icon Only", { children: "", icon: "power", type: "primary", shape: "default" }, { width: 32 }),
        createBtn("Btn · Loading Icon Power", { children: "Loading Icon", icon: "sync", type: "primary" })
      ])
    ];
  }
}

// ==========================================
// CARD 5: v4Pii3 (Ghost Button)
// ==========================================
const c5 = findNode(pen.children, "v4Pii3");
if (c5) {
  const preview = c5.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.children = [
      {
        type: "frame",
        id: "ghost_bg_wrap",
        name: "Ghost Wrapper",
        fill: "#bec8c8",
        cornerRadius: 6,
        padding: 16,
        layout: "horizontal",
        gap: 8,
        alignItems: "center",
        children: [
          createBtn("Btn · Primary Ghost", { children: "Primary", type: "primary", ghost: true }),
          createBtn("Btn · Default Ghost", { children: "Default", type: "default", ghost: true }),
          createBtn("Btn · Dashed Ghost", { children: "Dashed", type: "dashed", ghost: true }),
          createBtn("Btn · Danger Ghost", { children: "Danger", type: "primary", danger: true, ghost: true })
        ]
      }
    ];
  }
}

// ==========================================
// CARD 6: S9apJ (Block Button)
// ==========================================
const c6 = findNode(pen.children, "S9apJ");
if (c6) {
  const preview = c6.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 8;
    preview.width = "fill_container";
    preview.children = [
      createBtn("Btn · Primary Block", { children: "Primary", type: "primary", block: true }),
      createBtn("Btn · Default Block", { children: "Default", type: "default", block: true }),
      createBtn("Btn · Dashed Block", { children: "Dashed", type: "dashed", block: true }),
      createBtn("Btn · Disabled Block", { children: "disabled", type: "default", disabled: true, block: true }),
      createBtn("Btn · Text Block", { children: "text", type: "text", block: true }),
      createBtn("Btn · Link Block", { children: "Link", type: "link", block: true })
    ];
  }
}

// ==========================================
// CARD 7: RbSSB (Custom Wave)
// ==========================================
const c7 = findNode(pen.children, "RbSSB");
if (c7) {
  const preview = c7.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 16;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Disabled Wave", { children: "Disabled", type: "primary", disabled: true }),
      createBtn("Btn · Default Wave", { children: "Default", type: "primary" }),
      createBtn("Btn · Inset Wave", { children: "Inset", type: "primary" }),
      createBtn("Btn · Shake Wave", { children: "Shake", type: "primary" }),
      createBtn("Btn · Happy Work Wave", { children: "Happy Work", type: "primary" })
    ];
  }
}

// ==========================================
// CARD 8: XK6gC (Custom semantic dom styling)
// ==========================================
const c8 = findNode(pen.children, "XK6gC");
if (c8) {
  const preview = c8.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 8;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Object Styling", { children: "Object", type: "default" }),
      createBtn("Btn · Function Styling", { children: "Function", type: "primary", color: "default" })
    ];
  }
}

// ==========================================
// CARD 9: a0YriD (Color & Variant)
// ==========================================
const c9 = findNode(pen.children, "a0YriD");
if (c9) {
  const preview = c9.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 12;
    const colors = ["default", "primary", "danger", "pink", "purple", "cyan"];
    const variants = ["solid", "outlined", "dashed", "filled", "text", "link"];
    preview.children = colors.map((col, rIdx) => {
      return makeRow(`row_cv_${rIdx}`, variants.map((v) => {
        const label = v.charAt(0).toUpperCase() + v.slice(1);
        return createBtn(`Btn · ${col} ${label}`, {
          children: label,
          color: col,
          variant: v,
          type: (v === "solid" && col === "primary") ? "primary" : undefined
        });
      }));
    });
  }
}

// ==========================================
// CARD 10: YQZdm (Icon Placement - Flattened start/end)
// ==========================================
const c10 = findNode(pen.children, "YQZdm");
if (c10) {
  const preview = c10.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 16;

    function makePlacementGroup(pos, label) {
      return {
        type: "frame",
        id: makeId("grp_" + pos),
        name: `Group · ${pos}`,
        layout: "vertical",
        gap: 8,
        children: [
          {
            type: "text",
            id: makeId("tag"),
            content: `iconPlacement="${pos}" · ${label}`,
            fill: "#1677FF",
            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: "600"
          },
          makeRow(makeId("r1"), [
            createBtn("Btn · Search Circle Primary", { children: "", icon: "search", type: "primary", shape: "circle" }),
            createBtn("Btn · Text Circle Primary", { children: "A", type: "primary", shape: "circle" }),
            createBtn("Btn · Search Primary", { children: "Search", icon: "search", type: "primary", iconPlacement: pos }),
            createBtn("Btn · Search Circle Default", { children: "", icon: "search", type: "default", shape: "circle" }),
            createBtn("Btn · Search Default", { children: "Search", icon: "search", type: "default", iconPlacement: pos })
          ]),
          makeRow(makeId("r2"), [
            createBtn("Btn · Search Circle Default 2", { children: "", icon: "search", type: "default", shape: "circle" }),
            createBtn("Btn · Search Text", { children: "Search", icon: "search", type: "text", iconPlacement: pos }),
            createBtn("Btn · Search Circle Dashed", { children: "", icon: "search", type: "dashed", shape: "circle" }),
            createBtn("Btn · Search Dashed", { children: "Search", icon: "search", type: "dashed", iconPlacement: pos }),
            createBtn("Btn · Search Link Circle", { children: "", icon: "search", type: "link", shape: "circle", href: "https://www.google.com" }),
            createBtn("Btn · Loading Primary", { children: "Loading", type: "primary", loading: true, iconPlacement: pos })
          ])
        ]
      };
    }

    preview.children = [
      makePlacementGroup("start", "图标位于文字之前（默认）"),
      makePlacementGroup("end", "图标位于文字之后")
    ];
  }
}

// ==========================================
// CARD 11: DVEtn (Disabled)
// ==========================================
const c11 = findNode(pen.children, "DVEtn");
if (c11) {
  const preview = c11.children[0];
  if (preview) {
    preview.layout = "vertical";
    preview.gap = 10;
    preview.children = [
      makeRow("row_dis_1", [
        createBtn("Btn · Primary", { children: "Primary", type: "primary" }),
        createBtn("Btn · Primary Disabled", { children: "Primary(disabled)", type: "primary", disabled: true })
      ]),
      makeRow("row_dis_2", [
        createBtn("Btn · Default", { children: "Default", type: "default" }),
        createBtn("Btn · Default Disabled", { children: "Default(disabled)", type: "default", disabled: true })
      ]),
      makeRow("row_dis_3", [
        createBtn("Btn · Dashed", { children: "Dashed", type: "dashed" }),
        createBtn("Btn · Dashed Disabled", { children: "Dashed(disabled)", type: "dashed", disabled: true })
      ]),
      makeRow("row_dis_4", [
        createBtn("Btn · Text", { children: "Text", type: "text" }),
        createBtn("Btn · Text Disabled", { children: "Text(disabled)", type: "text", disabled: true })
      ]),
      makeRow("row_dis_5", [
        createBtn("Btn · Link", { children: "Link", type: "link" }),
        createBtn("Btn · Link Disabled", { children: "Link(disabled)", type: "link", disabled: true })
      ]),
      makeRow("row_dis_6", [
        createBtn("Btn · Href Primary", { children: "Href Primary", type: "primary", href: "https://ant.design/index-cn" }),
        createBtn("Btn · Href Primary Disabled", { children: "Href Primary(disabled)", type: "primary", href: "https://ant.design/index-cn", disabled: true })
      ]),
      makeRow("row_dis_7", [
        createBtn("Btn · Danger Default", { children: "Danger Default", danger: true }),
        createBtn("Btn · Danger Default Disabled", { children: "Danger Default(disabled)", danger: true, disabled: true })
      ]),
      makeRow("row_dis_8", [
        createBtn("Btn · Danger Text", { children: "Danger Text", danger: true, type: "text" }),
        createBtn("Btn · Danger Text Disabled", { children: "Danger Text(disabled)", danger: true, type: "text", disabled: true })
      ]),
      makeRow("row_dis_9", [
        createBtn("Btn · Danger Link", { children: "Danger Link", danger: true, type: "link" }),
        createBtn("Btn · Danger Link Disabled", { children: "Danger Link(disabled)", danger: true, type: "link", disabled: true })
      ]),
      {
        type: "frame",
        id: "dis_ghost_wrapper",
        name: "Ghost Wrapper",
        fill: "#bec8c8",
        cornerRadius: 6,
        padding: [8, 12],
        layout: "horizontal",
        gap: 8,
        alignItems: "center",
        children: [
          createBtn("Btn · Ghost", { children: "Ghost", ghost: true }),
          createBtn("Btn · Ghost Disabled", { children: "Ghost(disabled)", ghost: true, disabled: true })
        ]
      }
    ];
  }
}

// ==========================================
// CARD 12: p9ga4 (Multiple Buttons)
// ==========================================
const c12 = findNode(pen.children, "p9ga4");
if (c12) {
  const preview = c12.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 8;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Primary", { children: "primary", type: "primary" }),
      createBtn("Btn · Secondary", { children: "secondary", type: "default" }),
      {
        type: "frame",
        id: makeId("compact_actions"),
        name: "Space.Compact · Actions",
        layout: "horizontal",
        gap: 0,
        alignItems: "center",
        children: [
          createBtn("Btn · Actions", { children: "Actions", type: "default", compactPlacement: "start" }),
          createBtn("Btn · Dropdown Ellipsis", { children: "", icon: "ellipsis", type: "default", compactPlacement: "end" }, { width: 32 })
        ]
      }
    ];
  }
}

// ==========================================
// CARD 13: ema6A (Danger Buttons)
// ==========================================
const c13 = findNode(pen.children, "ema6A");
if (c13) {
  const preview = c13.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 8;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Primary Danger", { children: "Primary", type: "primary", danger: true }),
      createBtn("Btn · Default Danger", { children: "Default", danger: true }),
      createBtn("Btn · Dashed Danger", { children: "Dashed", type: "dashed", danger: true }),
      createBtn("Btn · Text Danger", { children: "Text", type: "text", danger: true }),
      createBtn("Btn · Link Danger", { children: "Link", type: "link", danger: true })
    ];
  }
}

// ==========================================
// CARD 14: CodtW (Gradient Button)
// ==========================================
const c14 = findNode(pen.children, "CodtW");
if (c14) {
  const preview = c14.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 8;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Gradient Large", {
        children: "Gradient Button",
        type: "primary",
        size: "large",
        icon: "ant-design",
        linearGradient: true
      }),
      createBtn("Btn · Normal Large", {
        children: "Button",
        type: "default",
        size: "large"
      })
    ];
  }
}

// ==========================================
// CARD 15: nFhIx (Custom disabled backgroundColor)
// ==========================================
const c15 = findNode(pen.children, "nFhIx");
if (c15) {
  const preview = c15.children[0];
  if (preview) {
    preview.layout = "horizontal";
    preview.gap = 8;
    preview.alignItems = "center";
    preview.children = [
      createBtn("Btn · Primary Disabled", { children: "Primary Button", type: "primary", disabled: true }),
      createBtn("Btn · Default Custom Disabled", { children: "Default Button", type: "default", disabled: true, disabledBg: "#0000001A" }),
      createBtn("Btn · Dashed Custom Disabled", { children: "Dashed Button", type: "dashed", disabled: true, disabledBg: "#00000066" })
    ];
  }
}

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log("Rebuild complete! Written to " + penPath);
