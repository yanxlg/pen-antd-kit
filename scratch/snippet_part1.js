const oldChildren = Get("Yom1X", {depth: 1}).children || [];
for (const c of oldChildren) {
  Delete(c.id);
}
Update("Yom1X", {
  layout: "vertical",
  gap: 16,
  padding: 0
});

const modeLabel = (badge, desc) => ({
  type: "frame",
  name: "Mode Label",
  layout: "horizontal",
  alignItems: "center",
  gap: 8,
  children: [
    {
      type: "frame",
      name: "Tag",
      padding: [2, 8],
      cornerRadius: 4,
      fill: "#F0F5FF",
      stroke: "#ADC6FF",
      strokeWidth: 1,
      strokeAlignment: "inner",
      children: [
        {
          type: "text",
          name: "Tag text",
          content: badge,
          fontSize: 12,
          fontFamily: "Inter",
          fill: "#1677FF",
          fontWeight: "500"
        }
      ]
    },
    {
      type: "text",
      name: "Desc",
      content: desc,
      fontSize: 13,
      fontFamily: "Inter",
      fill: "#8C8C8C"
    }
  ]
});

const tabInst = (name, inputs, w = "fill_container", h = 84) => ({
  type: "ref",
  ref: "acxPC",
  name,
  width: w,
  height: h,
  inputs
});

const defaultItems = [
  { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
  { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' }
];

const makeCard = (title, desc, preview) => ({
  type: "frame",
  name: ,
  width: "fill_container",
  layout: "vertical",
  cornerRadius: 8,
  stroke: "#0505050F",
  strokeWidth: 1,
  fill: "#FFFFFF",
  children: [
    {
      type: "frame",
      name: "Preview",
      width: "fill_container",
      layout: "vertical",
      padding: 24,
      gap: 20,
      children: preview
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
          layoutPosition: "absolute",
          x: 0,
          y: 0,
          width: 1646,
          height: 1,
          fill: "#F0F0F0"
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
              content: title,
              fontFamily: "AlibabaSans",
              fontSize: 14,
              fontWeight: "500",
              fill: "#000000E0",
              lineHeight: 1,
              textAlignVertical: "middle"
            }
          ]
        },
        {
          type: "frame",
          name: "Description",
          width: "fill_container",
          layout: "vertical",
          padding: [18, 24, 18, 24],
          children: [
            {
              type: "text",
              name: "Text",
              content: desc,
              fontFamily: "AlibabaSans",
              fontSize: 14,
              fontWeight: "normal",
              fill: "#000000E0",
              lineHeight: 1.5714
            }
          ]
        }
      ]
    }
  ]
});

const cards1 = [
  // 1. 基本
  makeCard("基本", "默认选中第一项。", [
    tabInst("Tabs · 基本", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      centered: false,
      hideAdd: true
    })
  ]),

  // 2. 禁用
  makeCard("禁用", "禁用某一项。", [
    tabInst("Tabs · 禁用", {
      items: JSON.stringify([
        { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
        { key: '2', label: 'Tab 2', disabled: true, children: 'Content of Tab Pane 2' },
        { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' }
      ]),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      centered: false,
      hideAdd: true
    })
  ]),

  // 3. 居中
  makeCard("居中", "标签居中展示。", [
    tabInst("Tabs · 居中", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      centered: true,
      hideAdd: true
    })
  ]),

  // 4. 图标
  makeCard("图标", "有图标的标签。icon 也支持第三方图标库的裸 <svg> 元素，会自动与文字居中对齐。", [
    tabInst("Tabs · 图标", {
      items: JSON.stringify([
        { key: '1', label: 'Tab 1', icon: 'AppleOutlined', children: 'Content of Tab Pane 1' },
        { key: '2', label: 'Tab 2', icon: 'AndroidOutlined', children: 'Content of Tab Pane 2' },
        { key: '3', label: 'Tab 3', icon: 'HeartOutlined', children: 'Content of Tab Pane 3' }
      ]),
      activeKey: "2",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      centered: false,
      hideAdd: true
    })
  ]),

  // 5. 指示条
  makeCard("指示条", "设置 indicator 属性，自定义指示条宽度和对齐方式。", [
    modeLabel('indicator={{ align: "center", size: 24 }}', "居中对齐指示条 · 固定宽度 24px"),
    tabInst("Tabs · 指示条 居中", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      indicatorAlign: "center",
      indicatorSize: 24
    }),
    modeLabel('indicator={{ align: "start" }}', "左对齐指示条"),
    tabInst("Tabs · 指示条 靠左", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      indicatorAlign: "start"
    })
  ]),

  // 6. 滑动
  makeCard("滑动", "可以左右、上下滑动，容纳更多标签。", [
    modeLabel("30 项大容量页签", "页签超出容器宽度时自动支持左右滑动与省略溢出菜单"),
    tabInst("Tabs · 滑动", {
      items: JSON.stringify(Array.from({ length: 30 }, (_, k) => ({
        key: String(k + 1),
        label: ,
        children: 
      }))),
      activeKey: "2",
      type: "line",
      size: "middle",
      tabPlacement: "top"
    })
  ]),

  // 7. 附加内容
  makeCard("附加内容", "可以在页签两边添加附加操作。", [
    modeLabel("tabBarExtraContent", "在页签栏右侧配置附加操作按钮"),
    tabInst("Tabs · 附加内容", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top",
      extraEnd: JSON.stringify({
        type: "script",
        name: "Button",
        scriptUri: "../canvas-components/Button.js",
        inputs: { children: "Extra Action", type: "default" }
      }),
      extraEndWidth: 100
    })
  ]),

  // 8. 大小
  makeCard("大小", "大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。", [
    modeLabel('size="small"', "小号页签 · 紧凑卡片与线框 · 适合 Modal 弹窗"),
    tabInst("Tabs · Small Line", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "small",
      tabPlacement: "top"
    }, "fill_container", 76),
    tabInst("Tabs · Small Card", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "card",
      size: "small",
      tabPlacement: "top"
    }, "fill_container", 70),

    modeLabel('size="middle"', "中号页签 · 标准尺寸 (默认) · 页面主流布局"),
    tabInst("Tabs · Middle Line", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "middle",
      tabPlacement: "top"
    }, "fill_container", 84),
    tabInst("Tabs · Middle Card", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "card",
      size: "middle",
      tabPlacement: "top"
    }, "fill_container", 78),

    modeLabel('size="large"', "大号页签 · 大字号与大边距 · 适合页头顶栏"),
    tabInst("Tabs · Large Line", {
      items: JSON.stringify(defaultItems),
      activeKey: "1",
      type: "line",
      size: "large",
      tabPlacement: "top"
    }, "fill_container", 94)
  ])
];

for (const card of cards1) {
  Insert("Yom1X", card);
}
Print("Inserted part 1. Yom1X children:", Get("Yom1X", {depth: 1}).children.length);