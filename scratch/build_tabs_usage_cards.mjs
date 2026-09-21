export function getTabsCards() {
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

  const button = (children, type = "default", w = 85, h = 32) => ({
    type: "ref",
    ref: "DQZzq",
    name: "Button",
    width: w,
    height: h,
    inputs: {
      children,
      type
    }
  });

  const defaultItems = [
    { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' }
  ];

  const cards = [
    // 1. 基本
    {
      title: "基本",
      desc: "默认选中第一项。",
      preview: [
        tabInst("Tabs · 基本", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top",
          centered: false,
          hideAdd: true
        })
      ]
    },

    // 2. 禁用
    {
      title: "禁用",
      desc: "禁用某一项。",
      preview: [
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
      ]
    },

    // 3. 居中
    {
      title: "居中",
      desc: "标签居中展示。",
      preview: [
        tabInst("Tabs · 居中", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top",
          centered: true,
          hideAdd: true
        })
      ]
    },

    // 4. 图标
    {
      title: "图标",
      desc: "有图标的标签。icon 也支持第三方图标库的裸 <svg> 元素，会自动与文字居中对齐。",
      preview: [
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
      ]
    },

    // 5. 指示条
    {
      title: "指示条",
      desc: "设置 indicator 属性，自定义指示条宽度和对齐方式。",
      preview: [
        modeLabel('indicator={{ align: "center", size: 24 }}', "居中对齐指示条 · 固定宽度 24px"),
        tabInst("Tabs · 指示条", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top",
          indicatorAlign: "center",
          indicatorSize: 24
        })
      ]
    },

    // 6. 滑动
    {
      title: "滑动",
      desc: "可以左右、上下滑动，容纳更多标签。",
      preview: [
        modeLabel("30 项大容量页签", "页签超出容器宽度时自动支持左右滑动与省略溢出菜单"),
        tabInst("Tabs · 滑动", {
          items: JSON.stringify(Array.from({ length: 30 }, (_, k) => ({
            key: String(k + 1),
            label: `Tab-${k}`,
            children: `Content of tab ${k}`
          }))),
          activeKey: "2",
          type: "line",
          size: "middle",
          tabPlacement: "top"
        })
      ]
    },

    // 7. 附加内容
    {
      title: "附加内容",
      desc: "可以在页签两边添加附加操作。",
      preview: [
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
      ]
    },

    // 8. 大小 (Flattened)
    {
      title: "大小",
      desc: "大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。",
      preview: [
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

        modeLabel('size="large"', "大号页签 · 大字号与大边距 · 适合页头顶栏"),
        tabInst("Tabs · Large Line", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "large",
          tabPlacement: "top"
        }, "fill_container", 94)
      ]
    },

    // 9. 位置 (Flattened)
    {
      title: "位置",
      desc: "有四个位置，tabPlacement=\"start|end|top|bottom\"。在移动端下，start|end 会自动切换成 top。",
      preview: [
        modeLabel('tabPlacement="start"', "左侧纵向排布 · 导航与内容并列"),
        tabInst("Tabs · Start", {
          items: JSON.stringify([
            { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
            { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
            { key: '3', label: 'Tab 3', children: 'Content of Tab 3' }
          ]),
          activeKey: "1",
          type: "line",
          tabPlacement: "start"
        }, "fill_container", 146),

        modeLabel('tabPlacement="top"', "常规顶部横向排布"),
        tabInst("Tabs · Top", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          tabPlacement: "top"
        }, "fill_container", 84),

        modeLabel('tabPlacement="bottom"', "底部页签栏排布"),
        tabInst("Tabs · Bottom", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          tabPlacement: "bottom"
        }, "fill_container", 84)
      ]
    },

    // 10. 自定义折叠菜单搜索
    {
      title: "自定义折叠菜单搜索",
      desc: "通过 popupRender 属性自定义 Tabs 更多下拉菜单，支持搜索和键盘导航。",
      preview: [
        modeLabel("popupRender", "多页签溢出折叠时，在弹出框中集成搜索过滤功能"),
        tabInst("Tabs · 折叠搜索", {
          items: JSON.stringify(Array.from({ length: 20 }, (_, k) => ({
            key: String(k + 1),
            label: `Tab-${k}`,
            children: `Content of tab ${k}`
          }))),
          activeKey: "2",
          type: "line",
          size: "middle",
          tabPlacement: "top"
        })
      ]
    },

    // 11. 卡片式页签
    {
      title: "卡片式页签",
      desc: "另一种样式的页签，不提供对应的垂直样式。",
      preview: [
        tabInst("Tabs · 卡片式", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "card",
          size: "middle",
          tabPlacement: "top",
          hideAdd: true
        }, "fill_container", 78)
      ]
    },

    // 12. 新增和关闭页签
    {
      title: "新增和关闭页签",
      desc: "只有卡片样式的页签支持新增和关闭选项。使用 closable={false} 禁止关闭。",
      preview: [
        tabInst("Tabs · 可编辑卡片", {
          items: JSON.stringify([
            { key: '1', label: 'Tab 1', closable: true, children: 'Content of Tab 1' },
            { key: '2', label: 'Tab 2', closable: true, children: 'Content of Tab 2' },
            { key: '3', label: 'Tab 3', closable: false, children: 'Content of Tab 3 (禁止关闭)' }
          ]),
          activeKey: "1",
          type: "editable-card",
          size: "middle",
          tabPlacement: "top",
          hideAdd: false
        }, "fill_container", 78)
      ]
    },

    // 13. 自定义新增页签触发器
    {
      title: "自定义新增页签触发器",
      desc: "隐藏默认的页签增加图标，给自定义触发器绑定事件。",
      preview: [
        {
          type: "frame",
          name: "Add Trigger Toolbar",
          layout: "horizontal",
          alignItems: "center",
          gap: 12,
          children: [
            button("+ ADD", "default", 80, 32)
          ]
        },
        tabInst("Tabs · 自定义新增", {
          items: JSON.stringify([
            { key: '1', label: 'Tab 1', closable: true, children: 'Content of Tab Pane 1' },
            { key: '2', label: 'Tab 2', closable: true, children: 'Content of Tab Pane 2' }
          ]),
          activeKey: "1",
          type: "editable-card",
          size: "middle",
          tabPlacement: "top",
          hideAdd: true
        }, "fill_container", 78)
      ]
    },

    // 14. 自定义页签头
    {
      title: "自定义页签头",
      desc: "使用 react-sticky-box 和 renderTabBar 实现吸顶效果。",
      preview: [
        modeLabel("renderTabBar", "集成 Sticky 容器实现页签头在页面滚动时吸顶常驻"),
        tabInst("Tabs · 自定义页签头", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top"
        })
      ]
    },

    // 15. 可拖拽标签
    {
      title: "可拖拽标签",
      desc: "使用 dnd-kit 实现标签可拖拽。",
      preview: [
        modeLabel("dnd-kit 集成", "支持通过拖拽手势重排页签项的前后顺序"),
        tabInst("Tabs · 可拖拽标签", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top"
        })
      ]
    },

    // 16. 自定义语义结构的样式和类
    {
      title: "自定义语义结构的样式和类",
      desc: "通过 classNames 和 styles 传入对象/函数可以自定义 Tabs 的语义化结构样式。",
      preview: [
        modeLabel("styles.root & classNames", "配置虚线外框与内边距样式定制"),
        tabInst("Tabs · 语义化样式", {
          items: JSON.stringify(defaultItems),
          activeKey: "1",
          type: "line",
          size: "middle",
          tabPlacement: "top",
          styles: JSON.stringify({
            root: {
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#1677FF",
              padding: 16
            }
          })
        }, "fill_container", 120)
      ]
    }
  ];

  return cards;
}
