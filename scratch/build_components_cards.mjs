import fs from "fs";

const defaultItems = JSON.stringify([
  { key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" }
]);

const iconItems = JSON.stringify([
  { key: "1", label: "Tab 1", icon: "AppleOutlined", children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", icon: "AndroidOutlined", children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" }
]);

const disabledItems = JSON.stringify([
  { key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", disabled: true, children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" }
]);

const editableItems = JSON.stringify([
  { key: "1", label: "Tab 1", closable: true, children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", closable: true, children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", closable: false, children: "Content of Tab Pane 3" }
]);

function makeCard(title, inputs, height = 84) {
  return {
    type: "frame",
    name: `Tabs · ${title}`,
    width: 820,
    cornerRadius: 8,
    stroke: "#F0F0F0",
    strokeWidth: 1,
    fill: "#FFFFFF",
    layout: "vertical",
    gap: 16,
    padding: 24,
    children: [
      {
        type: "text",
        name: "State",
        fill: "#000000E0",
        textGrowth: "fixed-width",
        width: "fill_container",
        content: title,
        lineHeight: 1.5714,
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: "600"
      },
      {
        type: "ref",
        ref: "acxPC",
        name: `Tabs · ${title}`,
        width: "fill_container",
        height: height,
        inputs: {
          items: defaultItems,
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top",
          ...inputs
        }
      }
    ]
  };
}

const cards = [
  // Row 1 (Card 1 is xStGa, so Card 2 is here)
  makeCard("Line", { type: "line" }),

  // Row 2
  makeCard("Card", { type: "card" }),
  makeCard("Editable card", { type: "editable-card", items: editableItems }),

  // Row 3 (Line Sizes)
  makeCard("Line · Small", { type: "line", size: "small" }, 74),
  makeCard("Line · Large", { type: "line", size: "large" }, 94),

  // Row 4 (Card Sizes)
  makeCard("Card · Small", { type: "card", size: "small" }, 74),
  makeCard("Card · Large", { type: "card", size: "large" }, 94),

  // Row 5 (Editable Card Sizes)
  makeCard("Editable card · Small", { type: "editable-card", size: "small", items: editableItems }, 74),
  makeCard("Editable card · Large", { type: "editable-card", size: "large", items: editableItems }, 94),

  // Row 6 (Centered)
  makeCard("Centered", { type: "line", centered: true }),
  makeCard("Card · Centered", { type: "card", centered: true }),

  // Row 7 (Item Variants)
  makeCard("With Icon", { type: "line", items: iconItems }),
  makeCard("With Disabled Item", { type: "line", items: disabledItems }),

  // Row 8 (Extra Content & Indicator)
  makeCard("Extra Content", {
    type: "line",
    extraEnd: JSON.stringify({
      type: "ref",
      ref: "DQZzq",
      name: "Button",
      width: 70,
      height: 32,
      inputs: { children: "Action", type: "primary" }
    }),
    extraEndWidth: 70
  }),
  makeCard("Custom Indicator", { type: "line", indicatorSize: 24, indicatorAlign: "center" }),

  // Row 9 (Hide Add & TabPane)
  makeCard("Editable card · Hide Add", { type: "editable-card", hideAdd: true, items: editableItems }),
  {
    type: "frame",
    name: "Tabs.TabPane",
    width: 820,
    cornerRadius: 8,
    stroke: "#F0F0F0",
    strokeWidth: 1,
    fill: "#FFFFFF",
    layout: "vertical",
    gap: 16,
    padding: 24,
    children: [
      {
        type: "text",
        name: "State",
        fill: "#000000E0",
        textGrowth: "fixed-width",
        width: "fill_container",
        content: "Tabs.TabPane",
        lineHeight: 1.5714,
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: "600"
      }
    ]
  },

  // Row 10 (Bottom Placement)
  makeCard("Placement Bottom", { type: "line", tabPlacement: "bottom" }),
  makeCard("Card · Bottom", { type: "card", tabPlacement: "bottom" }),

  // Row 11 (Start / Left Placement)
  makeCard("Placement Start", { type: "line", tabPlacement: "start" }, 146),
  makeCard("Card · Start", { type: "card", tabPlacement: "start" }, 146),

  // Row 12 (End / Right Placement)
  makeCard("Placement End", { type: "line", tabPlacement: "end" }, 146),
  makeCard("Card · End", { type: "card", tabPlacement: "end" }, 146)
];

fs.writeFileSync("scratch/components_cards.json", JSON.stringify(cards, null, 2));
console.log("Wrote", cards.length, "cards to scratch/components_cards.json");
