import fs from "fs";

let btnIdCounter = 1;
function makeId(prefix = "ubtn") {
  return `${prefix}_${Date.now().toString(36)}_${(btnIdCounter++).toString(36)}`;
}

function createBtn(name, inputs, extra = {}) {
  const h = inputs.size === "small" ? 24 : (inputs.size === "large" ? 40 : 32);
  const isCircle = inputs.shape === "circle";
  const node = {
    type: "ref",
    ref: "antd-button-live-origin",
    id: makeId("ubtn"),
    name: name || `Btn · ${inputs.children || inputs.icon || "Button"}`,
    height: h,
    inputs: { ...inputs },
    ...extra
  };
  if (isCircle) {
    node.width = h;
  }
  return node;
}

function findNode(node, id) {
  if (!node) return null;
  if (node.id === id) return node;
  if (Array.isArray(node)) {
    for (const n of node) {
      const found = findNode(n, id);
      if (found) return found;
    }
  } else if (node.children) {
    for (const ch of node.children) {
      const found = findNode(ch, id);
      if (found) return found;
    }
  }
  return null;
}

function findByName(node, name) {
  if (!node) return null;
  if (node.name === name) return node;
  if (Array.isArray(node)) {
    for (const n of node) {
      const found = findByName(n, name);
      if (found) return found;
    }
  } else if (node.children) {
    for (const ch of node.children) {
      const found = findByName(ch, name);
      if (found) return found;
    }
  }
  return null;
}

export function migrate(penFilePath, outFilePath) {
  const pen = JSON.parse(fs.readFileSync(penFilePath, "utf8"));

  // ==========================================
  // CARD 1: ecSyZ (Syntactic sugar / Types)
  // ==========================================
  const c1 = findNode(pen.children, "ecSyZ");
  if (c1) {
    const row = findNode(c1, "nVQRr");
    if (row) {
      row.children = [
        createBtn("Btn · Primary", { children: "Primary Button", type: "primary" }),
        createBtn("Btn · Default", { children: "Default Button", type: "default" }),
        createBtn("Btn · Dashed", { children: "Dashed Button", type: "dashed" }),
        createBtn("Btn · Text", { children: "Text Button", type: "text" }),
        createBtn("Btn · Link", { children: "Link Button", type: "link" })
      ];
    }
  }

  // ==========================================
  // CARD 2: amPdg (Icon)
  // ==========================================
  const c2 = findNode(pen.children, "amPdg");
  if (c2) {
    const r1 = findNode(c2, "J0CA2H");
    const r2 = findNode(c2, "M4wjlM");
    if (r1) {
      r1.children = [
        createBtn("Btn · Search Circle Primary", { children: "", icon: "search", type: "primary", shape: "circle" }),
        createBtn("Btn · Text Circle Primary", { children: "A", type: "primary", shape: "circle" }),
        createBtn("Btn · Search Primary", { children: "Search", icon: "search", type: "primary" }),
        createBtn("Btn · Search Circle Default", { children: "", icon: "search", type: "default", shape: "circle" }),
        createBtn("Btn · Search Default", { children: "Search", icon: "search", type: "default" })
      ];
    }
    if (r2) {
      r2.children = [
        createBtn("Btn · Search Circle Default 2", { children: "", icon: "search", type: "default", shape: "circle" }),
        createBtn("Btn · Search Default 2", { children: "Search", icon: "search", type: "default" }),
        createBtn("Btn · Search Circle Dashed", { children: "", icon: "search", type: "dashed", shape: "circle" }),
        createBtn("Btn · Search Dashed", { children: "Search", icon: "search", type: "dashed" }),
        createBtn("Btn · Search Link Circle", { children: "", icon: "search", type: "link", shape: "circle", href: "https://google.com" })
      ];
    }
  }

  // ==========================================
  // CARD 3: B66IeN (Size)
  // ==========================================
  const c3 = findNode(pen.children, "B66IeN");
  if (c3) {
    const gLarge = findByName(c3, "size=large");
    const gMid = findByName(c3, "size=middle");
    const gSmall = findByName(c3, "size=small");

    function replaceSizeGroup(grp, sz) {
      if (!grp) return;
      const r1 = findByName(grp, "Row 1 - Variants");
      const r2 = findByName(grp, "Row 2 - Icons & Shapes");
      if (r1) {
        r1.children = [
          createBtn(`Btn · Primary ${sz}`, { children: "Primary", type: "primary", size: sz }),
          createBtn(`Btn · Default ${sz}`, { children: "Default", type: "default", size: sz }),
          createBtn(`Btn · Dashed ${sz}`, { children: "Dashed", type: "dashed", size: sz }),
          createBtn(`Btn · Link ${sz}`, { children: "Link", type: "link", size: sz })
        ];
      }
      if (r2) {
        r2.children = [
          createBtn(`Btn · Download Icon ${sz}`, { children: "", icon: "download", type: "primary", shape: "circle", size: sz }),
          createBtn(`Btn · Download Circle ${sz}`, { children: "", icon: "download", type: "primary", shape: "circle", size: sz }),
          createBtn(`Btn · Download Round ${sz}`, { children: "Download", icon: "download", type: "primary", shape: "round", size: sz }),
          createBtn(`Btn · Download ${sz}`, { children: "Download", icon: "download", type: "primary", size: sz })
        ];
      }
    }

    replaceSizeGroup(gLarge, "large");
    replaceSizeGroup(gMid, "middle");
    replaceSizeGroup(gSmall, "small");
  }

  // ==========================================
  // CARD 4: dYwZb (Loading)
  // ==========================================
  const c4 = findNode(pen.children, "dYwZb");
  if (c4) {
    const r1 = findNode(c4, "js3BR");
    const r2 = findNode(c4, "bZ1CX");
    if (r1) {
      r1.children = [
        createBtn("Btn · Loading Primary", { children: "Loading", type: "primary", loading: true }),
        createBtn("Btn · Loading Small", { children: "Loading", type: "primary", size: "small", loading: true }),
        createBtn("Btn · Loading Circle", { children: "", type: "primary", shape: "circle", loading: true }),
        createBtn("Btn · Loading Icon Power", { children: "Loading Icon", icon: "power", type: "primary", loading: true })
      ];
    }
    if (r2) {
      r2.children = [
        createBtn("Btn · Icon Start", { children: "Icon Start", icon: "power", type: "primary", iconPlacement: "start" }),
        createBtn("Btn · Icon End", { children: "Icon End", icon: "power", type: "primary", iconPlacement: "end" }),
        createBtn("Btn · Icon Replace Loading", { children: "Icon Replace", icon: "power", type: "primary", loading: true }),
        createBtn("Btn · Loading Circle 2", { children: "", type: "primary", shape: "circle", loading: true }),
        createBtn("Btn · Loading Icon Power 2", { children: "Loading Icon", icon: "power", type: "primary", loading: true })
      ];
    }
  }

  // ==========================================
  // CARD 5: v4Pii3 (Ghost Button)
  // ==========================================
  const c5 = findNode(pen.children, "v4Pii3");
  if (c5) {
    const wrapper = findNode(c5, "G4mgIX");
    if (wrapper) {
      wrapper.children = [
        createBtn("Btn · Ghost Primary", { children: "Primary", type: "primary", ghost: true }),
        createBtn("Btn · Ghost Default", { children: "Default", type: "default", ghost: true }),
        createBtn("Btn · Ghost Dashed", { children: "Dashed", type: "dashed", ghost: true }),
        createBtn("Btn · Ghost Danger", { children: "Danger", type: "primary", danger: true, ghost: true })
      ];
    }
  }

  // ==========================================
  // CARD 6: S9apJ (Block Button)
  // ==========================================
  const c6 = findNode(pen.children, "S9apJ");
  if (c6) {
    const col = findNode(c6, "ICTbQ");
    if (col) {
      col.children = [
        createBtn("Btn · Block Primary", { children: "Primary", type: "primary", block: true }, { width: "fill_container" }),
        createBtn("Btn · Block Default", { children: "Default", type: "default", block: true }, { width: "fill_container" }),
        createBtn("Btn · Block Dashed", { children: "Dashed", type: "dashed", block: true }, { width: "fill_container" }),
        createBtn("Btn · Block Disabled", { children: "disabled", type: "default", disabled: true, block: true }, { width: "fill_container" }),
        createBtn("Btn · Block Text", { children: "text", type: "text", block: true }, { width: "fill_container" }),
        createBtn("Btn · Block Link", { children: "Link", type: "link", block: true }, { width: "fill_container" })
      ];
    }
  }

  // ==========================================
  // CARD 7: RbSSB (Custom Wave)
  // ==========================================
  const c7 = findNode(pen.children, "RbSSB");
  if (c7) {
    const row = findNode(c7, "DxDGl");
    if (row) {
      row.children = [
        createBtn("Btn · Wave Disabled", { children: "Disabled", type: "primary" }),
        createBtn("Btn · Wave Default", { children: "Default", type: "primary" }),
        createBtn("Btn · Wave Inset", { children: "Inset", type: "primary" }),
        createBtn("Btn · Wave Shake", { children: "Shake", type: "primary" }),
        createBtn("Btn · Wave Happy Work", { children: "Happy Work", type: "primary" })
      ];
    }
  }

  // ==========================================
  // CARD 8: XK6gC (Custom semantic dom styling)
  // ==========================================
  const c8 = findNode(pen.children, "XK6gC");
  if (c8) {
    const row = findNode(c8, "NK9uX");
    if (row) {
      row.children = [
        createBtn("Btn · Semantic Object", { children: "Object", type: "default" }),
        createBtn("Btn · Semantic Function", {
          children: "Function",
          type: "default",
          customFill: "#171717",
          customTextColor: "#FFFFFF",
          customStroke: "#D9D9D9"
        })
      ];
    }
  }

  // ==========================================
  // CARD 9: a0YriD (Color & Variant)
  // ==========================================
  const c9 = findNode(pen.children, "a0YriD");
  if (c9) {
    const rowIds = ["DQpJb", "Sb9rj", "EjOik", "jcBX9", "Psm94", "AaiqH"];
    const colors = ["default", "primary", "danger", "pink", "purple", "cyan"];
    const variants = ["solid", "outlined", "dashed", "filled", "text", "link"];
    const varLabels = ["Solid", "Outlined", "Dashed", "Filled", "Text", "Link"];

    rowIds.forEach((rId, rIdx) => {
      const row = findNode(c9, rId);
      if (row) {
        const clr = colors[rIdx];
        row.children = variants.map((v, vIdx) => {
          return createBtn(`Btn · ${clr} ${v}`, {
            children: varLabels[vIdx],
            color: clr,
            variant: v
          });
        });
      }
    });
  }

  // ==========================================
  // CARD 10: YQZdm (Icon Placement)
  // ==========================================
  const c10 = findNode(pen.children, "YQZdm");
  if (c10) {
    const gStart = findByName(c10, "iconPlacement=start");
    const gEnd = findByName(c10, "iconPlacement=end");

    function replacePlacementGroup(grp, placement) {
      if (!grp) return;
      const r1 = findByName(grp, "Row 1");
      const r2 = findByName(grp, "Row 2");
      if (r1) {
        r1.children = [
          createBtn(`Btn · Search Circle ${placement}`, { children: "", icon: "search", type: "primary", shape: "circle", iconPlacement: placement }),
          createBtn(`Btn · A Circle ${placement}`, { children: "A", type: "primary", shape: "circle" }),
          createBtn(`Btn · Search Primary ${placement}`, { children: "Search", icon: "search", type: "primary", iconPlacement: placement }),
          createBtn(`Btn · Search Circle Default ${placement}`, { children: "", icon: "search", type: "default", shape: "circle", iconPlacement: placement }),
          createBtn(`Btn · Search Default ${placement}`, { children: "Search", icon: "search", type: "default", iconPlacement: placement })
        ];
      }
      if (r2) {
        r2.children = [
          createBtn(`Btn · Search Circle Dashed ${placement}`, { children: "", icon: "search", type: "dashed", shape: "circle", iconPlacement: placement }),
          createBtn(`Btn · Search Dashed ${placement}`, { children: "Search", icon: "search", type: "dashed", iconPlacement: placement }),
          createBtn(`Btn · Search Circle Text ${placement}`, { children: "", icon: "search", type: "text", shape: "circle", iconPlacement: placement }),
          createBtn(`Btn · Search Text ${placement}`, { children: "Search", icon: "search", type: "text", iconPlacement: placement }),
          createBtn(`Btn · Search Link ${placement}`, { children: "Search", icon: "search", type: "link", iconPlacement: placement }),
          createBtn(`Btn · Loading ${placement}`, { children: "Loading", type: "primary", loading: true, iconPlacement: placement })
        ];
      }
    }

    replacePlacementGroup(gStart, "start");
    replacePlacementGroup(gEnd, "end");
  }

  // ==========================================
  // CARD 11: DVEtn (Disabled)
  // ==========================================
  const c11 = findNode(pen.children, "DVEtn");
  if (c11) {
    const col = findNode(c11, "V6Gwf");
    if (col && col.children) {
      const rowConfigs = [
        { type: "primary", text: "Primary" },
        { type: "default", text: "Default" },
        { type: "dashed", text: "Dashed" },
        { type: "text", text: "Text" },
        { type: "link", text: "Link" },
        { type: "primary", text: "Href Primary", href: "https://ant.design" },
        { type: "default", danger: true, text: "Danger Default" },
        { type: "text", danger: true, text: "Danger Text" },
        { type: "link", danger: true, text: "Danger Link" }
      ];

      for (let i = 0; i < Math.min(rowConfigs.length, col.children.length); i++) {
        const row = col.children[i];
        const cfg = rowConfigs[i];
        row.children = [
          createBtn(`Btn · ${cfg.text}`, { children: cfg.text, type: cfg.type, danger: cfg.danger, href: cfg.href }),
          createBtn(`Btn · ${cfg.text} (disabled)`, { children: `${cfg.text}(disabled)`, type: cfg.type, danger: cfg.danger, disabled: true, href: cfg.href })
        ];
      }

      const ghostDiv = findNode(col, "dGxHb");
      if (ghostDiv) {
        ghostDiv.children = [
          createBtn("Btn · Ghost", { children: "Ghost", type: "default", ghost: true }),
          createBtn("Btn · Ghost (disabled)", { children: "Ghost(disabled)", type: "default", ghost: true, disabled: true })
        ];
      }
    }
  }

  // ==========================================
  // CARD 12: p9ga4 (Multiple Buttons)
  // ==========================================
  const c12 = findNode(pen.children, "p9ga4");
  if (c12) {
    const row = findNode(c12, "xd4Mt");
    if (row) {
      row.children = [
        createBtn("Btn · Primary", { children: "primary", type: "primary" }),
        createBtn("Btn · Secondary", { children: "secondary", type: "default" }),
        createBtn("Btn · Actions Dropdown", { children: "Actions", type: "default", icon: "down", iconPlacement: "end" }),
        createBtn("Btn · More Ellipsis", { children: "", type: "default", icon: "ellipsis" }, { width: 32 })
      ];
    }
  }

  // ==========================================
  // CARD 13: ema6A (Danger Buttons)
  // ==========================================
  const c13 = findNode(pen.children, "ema6A");
  if (c13) {
    const row = findNode(c13, "lKfUy");
    if (row) {
      row.children = [
        createBtn("Btn · Danger Primary", { children: "Primary", type: "primary", danger: true }),
        createBtn("Btn · Danger Default", { children: "Default", type: "default", danger: true }),
        createBtn("Btn · Danger Dashed", { children: "Dashed", type: "dashed", danger: true }),
        createBtn("Btn · Danger Text", { children: "Text", type: "text", danger: true }),
        createBtn("Btn · Danger Link", { children: "Link", type: "link", danger: true })
      ];
    }
  }

  // ==========================================
  // CARD 14: CodtW (Gradient Button)
  // ==========================================
  const c14 = findNode(pen.children, "CodtW");
  if (c14) {
    const row = findNode(c14, "JAn9e");
    if (row) {
      row.children = [
        createBtn("Btn · Gradient", {
          children: "Gradient Button",
          type: "primary",
          size: "large",
          icon: "smile",
          customFill: {
            type: "gradient",
            gradientType: "linear",
            enabled: true,
            rotation: -135,
            size: { height: 1 },
            colors: [
              { color: "#6253e1", position: 0 },
              { color: "#04befe", position: 1 }
            ]
          }
        }),
        createBtn("Btn · Normal Large", { children: "Button", type: "default", size: "large" })
      ];
    }
  }

  // ==========================================
  // CARD 15: nFhIx (Custom disabled backgroundColor)
  // ==========================================
  const c15 = findNode(pen.children, "nFhIx");
  if (c15) {
    const row = findNode(c15, "hAy6y");
    if (row) {
      row.children = [
        createBtn("Btn · Custom Disabled 1", { children: "Primary Button", type: "primary", disabled: true, customFill: "#0000000a" }),
        createBtn("Btn · Custom Disabled 2", { children: "Default Button", type: "default", disabled: true, customFill: "#0000001a" }),
        createBtn("Btn · Custom Disabled 3", { children: "Dashed Button", type: "dashed", disabled: true, customFill: "#00000066" })
      ];
    }
  }

  fs.writeFileSync(outFilePath, JSON.stringify(pen, null, 2), "utf8");
  console.log("Migration finished successfully! Written to:", outFilePath);
}

const inputFile = process.argv[2] || "./libraries/antd-6.lib.pen";
const outputFile = process.argv[3] || "./libraries/antd-6.lib.pen";
migrate(inputFile, outputFile);
