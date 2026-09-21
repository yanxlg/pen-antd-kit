// Generator for all 13 official Steps usage cards matching ant.design official demos
export function getStepsUsageCards() {
  const stepsInst = (name, inputs, w = "fill_container", h = 86) => ({
    type: "ref",
    ref: "p8qrv",
    name,
    width: w,
    height: h,
    inputs: {
      items: "[]",
      current: 0,
      size: "middle",
      orientation: "horizontal",
      titlePlacement: "horizontal",
      type: "default",
      variant: "filled",
      ...inputs
    }
  });

  const divider = (text = "", placement = "center") => ({
    id: undefined,
    type: "ref",
    ref: "xi5QX",
    name: text ? `Divider · ${text}` : "Divider",
    width: "fill_container",
    height: text ? 24 : 1,
    inputs: {
      children: text,
      titlePlacement: placement,
      orientation: "horizontal",
      plain: true
    }
  });

  const makeCard = (title, desc, previewChildren, previewGap = 20) => ({
    type: "frame",
    name: `Card · ${title}`,
    width: "fill_container",
    fill: "#FFFFFF",
    cornerRadius: 8,
    stroke: "#0505050F",
    strokeWidth: 1,
    layout: "vertical",
    children: [
      {
        type: "frame",
        name: "Preview",
        width: "fill_container",
        layout: "vertical",
        gap: previewGap,
        padding: 24,
        children: previewChildren
      },
      {
        type: "frame",
        name: "Meta",
        width: "fill_container",
        layout: "vertical",
        children: [
          {
            type: "rectangle",
            name: "Divider",
            fill: "#F0F0F0",
            width: 1646,
            height: 1,
            layoutPosition: "absolute",
            x: 0,
            y: 0
          },
          {
            type: "frame",
            name: "Title Frame",
            layoutPosition: "absolute",
            x: 16,
            y: -15,
            height: 30,
            fill: "#FFFFFF",
            cornerRadius: [6, 6, 0, 0],
            padding: [1, 8],
            alignItems: "center",
            children: [
              {
                type: "text",
                name: "Title",
                fill: "#000000E0",
                content: title,
                lineHeight: 1,
                textAlignVertical: "middle",
                fontFamily: "AlibabaSans",
                fontSize: 14,
                fontWeight: "500"
              }
            ]
          },
          {
            type: "frame",
            name: "Description",
            width: "fill_container",
            layout: "vertical",
            padding: [18, 24],
            children: [
              {
                type: "text",
                name: "Text",
                fill: "#000000E0",
                content: desc,
                lineHeight: 1.5714,
                fontFamily: "AlibabaSans",
                fontSize: 14,
                fontWeight: "normal"
              }
            ]
          }
        ]
      }
    ]
  });

  const basicItems = JSON.stringify([
    { title: "Finished", content: "This is a content." },
    { title: "In Progress", content: "This is a content.", subTitle: "Left 00:00:08" },
    { title: "Waiting", content: "This is a content." }
  ]);

  const simpleItems = JSON.stringify([
    { title: "Finished", content: "This is a content" },
    { title: "In Process", content: "This is a content" },
    { title: "Waiting", content: "This is a content" }
  ]);

  // Card 0: Basic
  const card0 = makeCard(
    "Basic",
    "The most basic step bar. Use the variant property to set different styles and size to control the size.",
    [
      stepsInst("Steps · Default Filled", { items: basicItems, current: 1, variant: "filled", size: "middle" }, "fill_container", 86),
      stepsInst("Steps · Default Outlined", { items: basicItems, current: 1, variant: "outlined", size: "middle" }, "fill_container", 86),
      stepsInst("Steps · Small Filled", { items: basicItems, current: 1, variant: "filled", size: "small" }, "fill_container", 60),
      stepsInst("Steps · Small Outlined", { items: basicItems, current: 1, variant: "outlined", size: "small" }, "fill_container", 60)
    ],
    24
  );

  // Card 1: Error status
  const card1 = makeCard(
    "Error status",
    "By using status of Steps, you can specify the state for current step.",
    [
      stepsInst("Steps · Error status", { items: simpleItems, current: 1, status: "error" }, "fill_container", 86)
    ]
  );

  // Card 2: Vertical
  const card2 = makeCard(
    "Vertical",
    "A simple step bar in the vertical orientation.",
    [
      {
        type: "frame",
        name: "Columns",
        width: "fill_container",
        layout: "horizontal",
        gap: 48,
        children: [
          {
            type: "frame",
            name: "Col Middle",
            width: 780,
            layout: "vertical",
            children: [
              stepsInst("Steps · Vertical Middle", { items: basicItems, current: 1, orientation: "vertical", size: "middle" }, "fill_container", 240)
            ]
          },
          {
            type: "frame",
            name: "Col Small",
            width: 780,
            layout: "vertical",
            children: [
              stepsInst("Steps · Vertical Small", { items: basicItems, current: 1, orientation: "vertical", size: "small" }, "fill_container", 240)
            ]
          }
        ]
      }
    ]
  );

  // Card 3: Clickable
  const card3 = makeCard(
    "Clickable",
    "Setting onChange makes Steps clickable.",
    [
      stepsInst("Steps · Clickable Horizontal", { items: basicItems, current: 0 }, "fill_container", 86),
      divider(),
      stepsInst("Steps · Clickable Vertical", { items: basicItems, current: 0, orientation: "vertical" }, "fill_container", 240)
    ],
    20
  );

  // Card 4: Panel Steps
  const panelItems = JSON.stringify([
    { title: "Step 1", subTitle: "00:00", content: "This is a content." },
    { title: "Step 2", content: "This is a content.", status: "error" },
    { title: "Step 3", content: "This is a content." }
  ]);
  const card4 = makeCard(
    "Panel Steps",
    "Panel style steps.",
    [
      stepsInst("Steps · Panel Default", { items: panelItems, type: "panel", current: 0, size: "middle" }, "fill_container", 74),
      stepsInst("Steps · Panel Small Outlined", { items: panelItems, type: "panel", current: 0, size: "small", variant: "outlined" }, "fill_container", 60)
    ],
    20
  );

  // Card 5: With icon
  const iconItems = JSON.stringify([
    { title: "Login", status: "finish", icon: "UserOutlined" },
    { title: "Verification", status: "finish", icon: "SolutionOutlined" },
    { title: "Pay", status: "process", icon: "LoadingOutlined" },
    { title: "Done", status: "wait", icon: "SmileOutlined" }
  ]);
  const card5 = makeCard(
    "With icon",
    "You can use your own custom icons by setting the property icon for items.",
    [
      stepsInst("Steps · With Icon", { items: iconItems, current: 2 }, "fill_container", 86)
    ]
  );

  // Card 6: Title Placement and Progress
  const card6 = makeCard(
    "Title Placement and Progress",
    "Use titlePlacement to set the label position and display the progress through percent.",
    [
      stepsInst("Steps · Title Placement", { items: basicItems, current: 1, titlePlacement: "vertical" }, "fill_container", 120),
      stepsInst("Steps · Title Placement Percent 60", { items: basicItems, current: 1, percent: 60, titlePlacement: "vertical" }, "fill_container", 120),
      stepsInst("Steps · Title Placement Percent 80 Small", { items: basicItems, current: 1, percent: 80, size: "small", titlePlacement: "vertical" }, "fill_container", 100)
    ],
    24
  );

  // Card 7: Max Count
  const maxCountItems = JSON.stringify([
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
    { title: "Step 4" },
    { title: "Step 5" },
    { title: "Step 6" },
    { title: "Step 7" }
  ]);
  const card7 = makeCard(
    "Max Count",
    "Use maxCount to limit visible steps. Hidden ranges are collapsed into ellipsis steps.",
    [
      {
        type: "text",
        name: "Label",
        content: "Number of Steps",
        fontSize: 16,
        fontWeight: "600",
        fill: "#000000E0",
        fontFamily: "Inter"
      },
      stepsInst("Steps · Max Count 5", { items: maxCountItems, current: 3, maxCount: 5 }, "fill_container", 86),
      {
        type: "frame",
        name: "Controls",
        layout: "horizontal",
        gap: 8,
        alignItems: "center",
        children: [
          {
            type: "ref",
            ref: "DQZzq",
            name: "Button Prev",
            width: 32,
            height: 32,
            inputs: { children: "", icon: "LeftOutlined", size: "middle", type: "default" }
          },
          {
            type: "ref",
            ref: "SiWnx",
            name: "InputNumber Count",
            width: 120,
            height: 32,
            inputs: { value: 7, size: "middle" }
          },
          {
            type: "ref",
            ref: "DQZzq",
            name: "Button Next",
            width: 32,
            height: 32,
            inputs: { children: "", icon: "RightOutlined", size: "middle", type: "default" }
          }
        ]
      }
    ],
    16
  );

  // Card 8: Dot Style
  const card8 = makeCard(
    "Dot Style",
    "Steps with progress dot style.",
    [
      stepsInst("Steps · Dot Filled", { items: basicItems, type: "dot", current: 1, variant: "filled" }, "fill_container", 86),
      stepsInst("Steps · Dot Outlined", { items: basicItems, type: "dot", current: 1, variant: "outlined" }, "fill_container", 86),
      divider(),
      {
        type: "frame",
        name: "Columns",
        width: "fill_container",
        layout: "horizontal",
        gap: 48,
        children: [
          {
            type: "frame",
            name: "Col Filled",
            width: 780,
            layout: "vertical",
            children: [
              stepsInst("Steps · Vertical Dot Filled", { items: basicItems, type: "dot", orientation: "vertical", current: 1, variant: "filled" }, "fill_container", 240)
            ]
          },
          {
            type: "frame",
            name: "Col Outlined",
            width: 780,
            layout: "vertical",
            children: [
              stepsInst("Steps · Vertical Dot Outlined", { items: basicItems, type: "dot", orientation: "vertical", current: 1, variant: "outlined" }, "fill_container", 240)
            ]
          }
        ]
      }
    ],
    20
  );

  // Card 9: Navigation Steps
  const navItems1 = JSON.stringify([
    { title: "Step 1", subTitle: "00:00:05", status: "finish", content: "This is a content." },
    { title: "Step 2", subTitle: "00:01:02", status: "process", content: "This is a content." },
    { title: "Step 3", subTitle: "waiting for longlong time", status: "wait", content: "This is a content." }
  ]);
  const navItems2 = JSON.stringify([
    { status: "finish", title: "Step 1" },
    { status: "process", title: "Step 2" },
    { status: "wait", title: "Step 3" },
    { status: "wait", title: "Step 4" }
  ]);
  const navItems3 = JSON.stringify([
    { status: "finish", title: "finish 1" },
    { status: "finish", title: "finish 2" },
    { status: "process", title: "current process" },
    { status: "wait", title: "wait", disabled: true }
  ]);
  const card9 = makeCard(
    "Navigation Steps",
    "Navigation steps.",
    [
      stepsInst("Steps · Nav Small 1", { items: navItems1, type: "navigation", size: "small", current: 0 }, "fill_container", 52),
      stepsInst("Steps · Nav Middle", { items: navItems2, type: "navigation", size: "middle", current: 0 }, "fill_container", 60),
      stepsInst("Steps · Nav Small 2", { items: navItems3, type: "navigation", size: "small", current: 0 }, "fill_container", 52)
    ],
    24
  );

  // Card 10: Inline Steps
  const inlineListItems = [
    { title: "Ant Design Title 1", current: 0, status: "process" },
    { title: "Ant Design Title 2", current: 1, status: "error" },
    { title: "Ant Design Title 3", current: 2, status: "finish" },
    { title: "Ant Design Title 4", current: 1, status: "process" }
  ];
  const inlineStepsData = JSON.stringify([
    { title: "Step 1", content: "This is Step 1" },
    { title: "Step 2", content: "This is Step 2" },
    { title: "Step 3", content: "This is Step 3" }
  ]);

  const card10 = makeCard(
    "Inline Steps",
    "Inline type steps, suitable for displaying the process and current state of the object in the list content scene.",
    [
      {
        type: "frame",
        name: "List",
        width: "fill_container",
        layout: "vertical",
        gap: 16,
        children: inlineListItems.map((item, idx) => ({
          type: "frame",
          name: `List Item ${idx + 1}`,
          width: "fill_container",
          layout: "vertical",
          gap: 12,
          padding: [0, 0, 16, 0],
          stroke: "#F0F0F0",
          strokeWidth: idx < 3 ? 1 : 0,
          children: [
            {
              type: "frame",
              name: "Meta",
              width: "fill_container",
              layout: "horizontal",
              gap: 16,
              alignItems: "center",
              children: [
                {
                  type: "ref",
                  ref: "GcQcz",
                  name: "Avatar",
                  width: 32,
                  height: 32,
                  inputs: { text: String(idx + 1), color: "blue", size: "default" }
                },
                {
                  type: "frame",
                  name: "Text Wrapper",
                  width: "fill_container",
                  layout: "vertical",
                  gap: 4,
                  children: [
                    {
                      type: "text",
                      name: "Title",
                      content: item.title,
                      fontSize: 14,
                      fontWeight: "500",
                      fill: "#1677FF",
                      fontFamily: "Inter"
                    },
                    {
                      type: "text",
                      name: "Description",
                      content: "Ant Design, a design language for background applications, is refined by Ant UED Team",
                      fontSize: 14,
                      fontWeight: "normal",
                      fill: "#00000073",
                      fontFamily: "Inter"
                    }
                  ]
                }
              ]
            },
            stepsInst(`Steps · Inline ${idx + 1}`, { items: inlineStepsData, type: "inline", current: item.current, status: item.status }, "fill_container", 40)
          ]
        }))
      }
    ],
    20
  );

  // Card 11: Inline Style Combination
  const inline5Items = JSON.stringify([
    { title: "Step 1", subTitle: "Sub Title", content: "This is Step 1" },
    { title: "Step 2", subTitle: "Sub Title", content: "This is Step 2" },
    { title: "Step 3", subTitle: "Sub Title", content: "This is Step 3" },
    { title: "Step 4", subTitle: "Sub Title", content: "This is Step 4" },
    { title: "Step 5", subTitle: "Sub Title", content: "This is Step 5" }
  ]);
  const inline3Items = JSON.stringify([
    { title: "Step 3", subTitle: "Sub Title", content: "This is Step 3" },
    { title: "Step 4", subTitle: "Sub Title", content: "This is Step 4" },
    { title: "Step 5", subTitle: "Sub Title", content: "This is Step 5" }
  ]);

  const card11 = makeCard(
    "Inline Style Combination",
    "Inline step bar modifies the style and aligns through offset.",
    [
      stepsInst("Steps · Inline 5 Items", { items: inline5Items, type: "inline", current: 1 }, "fill_container", 40),
      stepsInst("Steps · Inline Finished", { items: inline5Items, type: "inline", current: 4, status: "finish" }, "fill_container", 40),
      stepsInst("Steps · Inline Offset", { items: inline3Items, type: "inline", current: 1, initial: 2 }, "fill_container", 40)
    ],
    20
  );

  // Card 12: Custom semantic dom styling
  const semanticItems = JSON.stringify([
    { title: "Finished", content: "This is a content." },
    { title: "In Progress", content: "This is a content." },
    { title: "Waiting", content: "This is a content." }
  ]);

  const card12 = makeCard(
    "Custom semantic dom styling",
    "You can customize the semantic dom style of Steps by passing objects/functions through classNames and styles.",
    [
      {
        type: "frame",
        name: "Semantic Steps 1 Wrapper",
        width: "fill_container",
        cornerRadius: 8,
        stroke: "#D9D9D9",
        strokeWidth: 2,
        strokeAlignment: "inner",
        strokeStyle: "dashed",
        padding: 16,
        layout: "vertical",
        children: [
          stepsInst("Steps · Semantic Style (stylesObject)", { items: semanticItems, current: 1 }, "fill_container", 86)
        ]
      },
      {
        type: "frame",
        name: "Semantic Steps 2 Wrapper",
        width: "fill_container",
        cornerRadius: 8,
        stroke: "#1890FF",
        strokeWidth: 2,
        strokeAlignment: "inner",
        strokeStyle: "dashed",
        padding: 16,
        layout: "vertical",
        children: [
          stepsInst("Steps · Semantic Style (stylesFn)", { items: semanticItems, current: 1, type: "navigation" }, "fill_container", 60)
        ]
      }
    ],
    20
  );

  return [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12];
}
