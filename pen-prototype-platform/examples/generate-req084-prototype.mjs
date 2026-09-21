import { mkdir, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { randomUUID } from "node:crypto";

const outputPath = resolve(process.argv[2] || "./APP配置运营管理_标准原型.pen");
const libraryPath = resolve(process.argv[3] || "../libraries/antd-6.lib.pen");
const libraryUri = relative(dirname(outputPath), libraryPath).split("\\").join("/");
const componentScriptsUri = relative(dirname(outputPath), resolve(dirname(libraryPath), "../canvas-components")).split("\\").join("/");

let sequence = 0;
const id = (prefix) => `${prefix}-${++sequence}`;
const C = {
  primary: "#1677FF",
  primarySoft: "#E6F4FF",
  text: "#1F2937",
  secondary: "#667085",
  tertiary: "#98A2B3",
  border: "#E4E7EC",
  borderSoft: "#F0F2F5",
  bg: "#F5F7FA",
  white: "#FFFFFF",
  success: "#12B76A",
  warning: "#F79009",
  error: "#F04438",
  code: "#101828",
};

const text = (content, x, y, options = {}) => ({
  type: "text",
  id: id("text"),
  name: options.name || content.slice(0, 24),
  x,
  y,
  width: options.width,
  height: options.height,
  content,
  fill: options.fill || C.text,
  fontFamily: options.fontFamily || "Arial",
  fontSize: options.fontSize || 14,
  fontWeight: options.fontWeight || "normal",
  lineHeight: options.lineHeight || 1.5,
  textAlign: options.textAlign,
  textGrowth: options.width ? "fixed-width" : "auto",
});

const frame = (name, x, y, width, height, options = {}) => ({
  type: "frame",
  id: id("frame"),
  name,
  x,
  y,
  width,
  height,
  fill: options.fill,
  stroke: options.stroke,
  strokeWidth: options.strokeWidth,
  cornerRadius: options.cornerRadius,
  clip: options.clip,
  layout: options.layout || "none",
  gap: options.gap,
  padding: options.padding,
  alignItems: options.alignItems,
  justifyContent: options.justifyContent,
  opacity: options.opacity,
  children: options.children || [],
});

const line = (x, y, width, color = C.border) => frame("Divider", x, y, width, 1, { fill: color });

const ref = (componentId, name, x, y, width, height, inputs = {}) => ({
  type: "ref",
  id: id("antd"),
  ref: `antd:${componentId}`,
  name: `Ant Design / ${name}`,
  x,
  y,
  width,
  height,
  inputs,
  metadata: {
    source: "antd-6.lib.pen",
    component: name,
    requirement: "REQ-084",
  },
});

const scriptComponent = (name, x, y, width, height, inputs = {}) => ({
  type: "script",
  id: id("antd-script"),
  name: `Ant Design / ${name}`,
  x,
  y,
  width,
  height,
  scriptUri: `${componentScriptsUri}/${name}.js`,
  inputs,
  metadata: {
    source: "antd-6.lib.pen / canvas-components",
    component: name,
    requirement: "REQ-084",
  },
});

const button = (label, x, y, width = 88, type = "default", disabled = false, danger = false) =>
  ref("DQZzq", "Button", x, y, width, 32, {
    children: label,
    type,
    color: danger ? "danger" : type === "primary" ? "primary" : "default",
    variant: type === "primary" ? "solid" : "outlined",
    disabled,
    danger,
  });

const input = (placeholder, x, y, width = 220, value = "") =>
  scriptComponent("Input", x, y, width, 32, { placeholder, value, allowClear: true, variant: "outlined", status: "default", disabled: false });

const select = (placeholder, options, x, y, width = 180, value = "") =>
  scriptComponent("Select", x, y, width, 32, { placeholder, options: options.join("|"), value, mode: "default", status: "default", disabled: false, open: false, allowClear: true });

const tag = (label, color, x, y, width = 64) =>
  scriptComponent("Tag", x, y, width, 22, { children: label, color });

const tableColumnWeights = {
  app: 0.8,
  page: 1,
  pages: 1.15,
  code: 1.25,
  name: 1.2,
  desc: 1.55,
  source: 0.95,
  sourceId: 1.65,
  module: 1,
  type: 0.75,
  status: 0.75,
  owner: 0.7,
  time: 1,
  action: 1.45,
};

// The scripted Table component currently contains an unqualified internal
// Pagination ref, so it cannot resolve when consumed from another .pen file.
// Keep the Ant Design table contract and visual metrics as local primitives;
// all interactive controls around it remain direct library component refs.
const table = (columns, data, x, y, width, height) => {
  const headerHeight = 44;
  const rowHeight = 52;
  const horizontalPadding = 12;
  const weights = columns.map((column) => tableColumnWeights[column.dataIndex] || 1);
  const weightTotal = weights.reduce((sum, value) => sum + value, 0);
  const widths = weights.map((weight) => Math.floor((weight / weightTotal) * width));
  widths[widths.length - 1] += width - widths.reduce((sum, value) => sum + value, 0);

  const makeRow = (row, rowIndex) => {
    let columnX = 0;
    const children = [];
    columns.forEach((column, columnIndex) => {
      const cellWidth = widths[columnIndex];
      const value = String(row[column.dataIndex] ?? "—");
      const isStatus = column.dataIndex === "status";
      const isAction = column.dataIndex === "action";
      children.push(text(value, columnX + horizontalPadding, 15, {
        width: Math.max(20, cellWidth - horizontalPadding * 2),
        height: 22,
        fontSize: 12,
        fill: isAction ? C.primary : isStatus && value.startsWith("●") ? C.success : isStatus ? C.secondary : C.text,
      }));
      columnX += cellWidth;
    });
    return frame(`Table row ${rowIndex + 1}`, 0, headerHeight + rowIndex * rowHeight, width, rowHeight, {
      fill: C.white,
      stroke: C.borderSoft,
      strokeWidth: 1,
      clip: true,
      children,
    });
  };

  let headerX = 0;
  const headerChildren = [];
  columns.forEach((column, columnIndex) => {
    const cellWidth = widths[columnIndex];
    headerChildren.push(text(column.title, headerX + horizontalPadding, 12, {
      width: Math.max(20, cellWidth - horizontalPadding * 2),
      height: 22,
      fontSize: 12,
      fontWeight: "700",
    }));
    headerX += cellWidth;
  });

  const result = frame("Ant Design / Table", x, y, width, height, {
    fill: C.white,
    stroke: C.border,
    strokeWidth: 1,
    cornerRadius: 6,
    clip: true,
    children: [
      frame("Table header", 0, 0, width, headerHeight, {
        fill: "#FAFAFA",
        stroke: C.borderSoft,
        strokeWidth: 1,
        children: headerChildren,
      }),
      ...data.map(makeRow),
    ],
  });
  result.metadata = {
    type: "antd-pattern",
    component: "Table",
    source: "antd-6.lib.pen",
    requirement: "REQ-084",
    fallbackReason: "external scripted Table contains an unqualified Pagination dependency",
  };
  return result;
};

const alertPalette = {
  info: { bg: "#E6F4FF", border: "#91CAFF", icon: C.primary, symbol: "i" },
  success: { bg: "#F6FFED", border: "#B7EB8F", icon: C.success, symbol: "✓" },
  warning: { bg: "#FFFBE6", border: "#FFE58F", icon: C.warning, symbol: "!" },
  error: { bg: "#FFF2F0", border: "#FFCCC7", icon: C.error, symbol: "×" },
};

const alertBox = (title, description, type, x, y, width, height) => {
  const palette = alertPalette[type] || alertPalette.info;
  const result = frame("Ant Design / Alert", x, y, width, height, {
    fill: palette.bg,
    stroke: palette.border,
    strokeWidth: 1,
    cornerRadius: 8,
    children: [
      frame("Alert icon", 16, description ? 17 : 13, 18, 18, { fill: palette.icon, cornerRadius: 9 }),
      text(palette.symbol, 22, description ? 17 : 13, { fontSize: 12, fontWeight: "700", fill: C.white }),
      text(title, 46, description ? 10 : 13, { width: width - 62, height: 22, fontSize: 13, fontWeight: "700" }),
      ...(description ? [text(description, 46, 34, { width: width - 62, height: 22, fontSize: 12, fill: C.secondary })] : []),
    ],
  });
  result.metadata = { type: "antd-pattern", component: "Alert", source: "antd-6.lib.pen", requirement: "REQ-084" };
  return result;
};

const modalBox = (title, body, x, y, width, height) => {
  const result = frame("Ant Design / Modal", x, y, width, height, {
    fill: C.white,
    stroke: C.border,
    strokeWidth: 1,
    cornerRadius: 10,
    clip: true,
    children: [
      text(title, 24, 20, { fontSize: 18, fontWeight: "700" }),
      text("×", width - 42, 16, { fontSize: 22, fill: C.secondary }),
      line(0, 64, width),
      text(body, 24, 84, { width: width - 48, height: height - 176, fontSize: 13, lineHeight: 1.55 }),
      frame("Modal footer", 0, height - 72, width, 72, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
      button("返回编辑", width - 226, height - 52, 96),
      button("确认发布", width - 118, height - 52, 94, "primary"),
    ],
  });
  result.metadata = { type: "antd-pattern", component: "Modal", source: "antd-6.lib.pen", requirement: "REQ-084" };
  return result;
};

const emptyState = (x, y, width, height) => {
  const result = frame("Ant Design / Empty", x, y, width, height, {
    fill: C.white,
    children: [
      frame("Empty illustration", Math.floor(width / 2) - 34, 22, 68, 52, { fill: "#F0F2F5", stroke: "#D9D9D9", strokeWidth: 1, cornerRadius: 8 }),
      frame("Empty line", Math.floor(width / 2) - 22, 42, 44, 4, { fill: "#BFBFBF", cornerRadius: 2 }),
      text("暂无数据", 0, 92, { width, height: 24, textAlign: "center", fontSize: 14, fill: C.secondary }),
      text("调整筛选条件或新建配置", 0, 122, { width, height: 22, textAlign: "center", fontSize: 12, fill: C.tertiary }),
    ],
  });
  result.metadata = { type: "antd-pattern", component: "Empty", source: "antd-6.lib.pen", requirement: "REQ-084" };
  return result;
};

const pager = (x, y, total, pageSize = 10) => frame("Pagination", x, y, 360, 32, {
  fill: C.white,
  children: [
    text(`共 ${total} 项`, 0, 7, { fontSize: 13, fill: C.secondary }),
    text("‹", 92, 5, { fontSize: 16, fill: C.secondary }),
    frame("Current page", 122, 0, 32, 32, { fill: C.white, stroke: C.primary, strokeWidth: 1, cornerRadius: 6 }),
    text("1", 134, 7, { fontSize: 13, fill: C.primary }),
    text("›", 178, 5, { fontSize: 16, fill: C.secondary }),
    text(`${pageSize} 条/页  ▾`, 226, 7, { fontSize: 13, fill: C.secondary }),
  ],
});

const tab = (items, activeKey, x, y, width = 720) =>
  scriptComponent("Tabs", x, y, width, 52, {
    items: JSON.stringify(items.map(([key, label]) => ({ key, label, children: "" }))),
    activeKey,
    type: "line",
    tabPlacement: "top",
    centered: false,
    hideAdd: true,
    styles: "{}",
  });

const menuItems = [
  { key: "app", label: "APP配置" },
  { key: "error", label: "错误码管理" },
  { key: "middle", label: "中台配置管理" },
  { key: "page", label: "页面管理" },
];

const shell = (name, x, y, selectedKey, title, subtitle = "PAKORA · APP 运营管理") => {
  const screen = frame(name, x, y, 1440, 900, {
    fill: C.bg,
    stroke: C.border,
    strokeWidth: 1,
    cornerRadius: 12,
    clip: true,
  });
  screen.metadata = { type: "prototype-screen", requirement: "REQ-084", viewport: "1440x900" };
  screen.children.push(
    frame("Global Header", 0, 0, 1440, 64, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
    text("S", 24, 16, { fontSize: 20, fontWeight: "700", fill: C.primary }),
    text("APP运营管理", 56, 18, { fontSize: 18, fontWeight: "700" }),
    text("PAKORA", 1186, 21, { fontSize: 13, fill: C.secondary }),
    frame("Avatar", 1270, 14, 36, 36, { fill: C.primarySoft, cornerRadius: 18 }),
    text("WH", 1278, 21, { fontSize: 12, fontWeight: "700", fill: C.primary }),
    text("王慧  ▾", 1316, 21, { fontSize: 13, fill: C.secondary }),
    frame("Sidebar", 0, 64, 208, 836, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
    scriptComponent("Menu", 0, 84, 208, 232, {
      items: JSON.stringify(menuItems),
      selectedKeys: JSON.stringify([selectedKey]),
      openKeys: "[]",
      mode: "inline",
      theme: "light",
      inlineCollapsed: false,
    }),
    text(title, 240, 92, { fontSize: 24, fontWeight: "700" }),
    text(subtitle, 240, 132, { fontSize: 13, fill: C.secondary }),
  );
  return screen;
};

const note = (screen, content, x = 240, y = 850, width = 1148) => {
  screen.children.push(
    frame("Prototype Annotation", x, y, width, 32, { fill: "#FFFAEB", stroke: "#FEDF89", strokeWidth: 1, cornerRadius: 6 }),
    text(`原型说明：${content}`, x + 12, y + 7, { fontSize: 12, fill: "#7A2E0E", width: width - 24 }),
  );
};

const cover = frame("00 · 交付说明与流程", 0, 0, 1440, 900, {
  fill: "#0B1220",
  cornerRadius: 12,
  clip: true,
  children: [
    text("REQ-084", 72, 64, { fontSize: 14, fontWeight: "700", fill: "#84ADFF" }),
    text("APP 配置运营管理", 72, 112, { fontSize: 42, fontWeight: "700", fill: C.white }),
    text("Pen 标准原型 · Ant Design 6.6.4", 72, 178, { fontSize: 18, fill: "#98A2B3" }),
    frame("Scope", 72, 256, 560, 430, { fill: "#121B2E", stroke: "#25324A", strokeWidth: 1, cornerRadius: 16 }),
    text("本次覆盖", 104, 288, { fontSize: 20, fontWeight: "700", fill: C.white }),
    text("01  APP配置：目录、BFF / 中台 / 错误码 Tab", 104, 342, { fontSize: 16, fill: "#D0D5DD" }),
    text("02  配置编辑：默认 JSON、规则、条件组和优先级", 104, 388, { fontSize: 16, fill: "#D0D5DD" }),
    text("03  发布保护：字段 diff、发布中、失败暂存", 104, 434, { fontSize: 16, fill: "#D0D5DD" }),
    text("04  错误码：双语 Toast / 弹窗与按钮动作", 104, 480, { fontSize: 16, fill: "#D0D5DD" }),
    text("05  中台配置与页面主数据维护", 104, 526, { fontSize: 16, fill: "#D0D5DD" }),
    text("06  加载、空、异常、无权限状态规范", 104, 572, { fontSize: 16, fill: "#D0D5DD" }),
    frame("Flow", 688, 256, 680, 430, { fill: "#121B2E", stroke: "#25324A", strokeWidth: 1, cornerRadius: 16 }),
    text("核心任务流", 720, 288, { fontSize: 20, fontWeight: "700", fill: C.white }),
    frame("Step 1", 728, 360, 164, 92, { fill: "#172554", stroke: "#2E90FA", strokeWidth: 1, cornerRadius: 10 }),
    text("定位配置", 760, 382, { fontSize: 16, fontWeight: "700", fill: C.white }),
    text("模块 / 页面 / 筛选", 748, 412, { fontSize: 12, fill: "#B2CCFF" }),
    text("→", 910, 386, { fontSize: 28, fill: "#84ADFF" }),
    frame("Step 2", 958, 360, 164, 92, { fill: "#172554", stroke: "#2E90FA", strokeWidth: 1, cornerRadius: 10 }),
    text("编辑并校验", 988, 382, { fontSize: 16, fontWeight: "700", fill: C.white }),
    text("JSON / 规则条件", 982, 412, { fontSize: 12, fill: "#B2CCFF" }),
    text("→", 1140, 386, { fontSize: 28, fill: "#84ADFF" }),
    frame("Step 3", 1188, 360, 148, 92, { fill: "#053321", stroke: C.success, strokeWidth: 1, cornerRadius: 10 }),
    text("确认发布", 1218, 382, { fontSize: 16, fontWeight: "700", fill: C.white }),
    text("diff / 异步结果", 1206, 412, { fontSize: 12, fill: "#A6F4C5" }),
    text("组件来源", 720, 510, { fontSize: 14, fontWeight: "700", fill: "#D0D5DD" }),
    text("所有标准控件通过文档 imports 引用 antd-6.lib.pen；业务布局与注释保留为本地节点。", 720, 544, { fontSize: 14, fill: "#98A2B3", width: 580 }),
    text("输入：产品需求 MD + 可交互 HTML · 输出：独立 .pen 文件", 72, 780, { fontSize: 14, fill: "#667085" }),
  ],
});

const appList = shell("01 · APP配置 / BFF列表", 1520, 0, "app", "APP配置", "PAKORA · 启动 / 隐私授权页");
appList.children.push(
  frame("Directory", 240, 168, 218, 650, { fill: C.white, stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  text("配置目录", 260, 192, { fontSize: 16, fontWeight: "700" }),
  text("8 个模块", 376, 194, { fontSize: 12, fill: C.tertiary }),
  input("搜索页面或模块", 258, 226, 182),
  frame("Selected module", 252, 276, 194, 36, { fill: C.primarySoft, cornerRadius: 6 }),
  text("•  启动", 268, 284, { fontWeight: "700", fill: C.primary }),
  text("1", 422, 284, { fill: C.secondary }),
  text("•  首页                                      7", 268, 330, { fill: C.secondary }),
  text("•  注册登录                               6", 268, 370, { fill: C.secondary }),
  text("•  申请流程                              14", 268, 410, { fill: C.secondary }),
  text("•  借款流程                               6", 268, 450, { fill: C.secondary }),
  text("•  还款流程                               5", 268, 490, { fill: C.secondary }),
  text("•  我的账户                               1", 268, 530, { fill: C.secondary }),
  text("•  评价引导                               1", 268, 570, { fill: C.secondary }),
  frame("Main card", 474, 168, 918, 650, { fill: C.white, stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  tab([["bff", "BFF配置"], ["middle", "中台配置"], ["error", "错误码"]], "bff", 494, 184, 520),
  button("新建配置", 1264, 186, 104, "primary"),
  frame("Filters", 494, 248, 874, 72, { fill: "#FAFAFA", stroke: C.borderSoft, strokeWidth: 1, cornerRadius: 6 }),
  select("全部页面", ["全部页面", "隐私授权页", "隐私重授权页"], 510, 268, 160),
  input("配置名称 / 配置编码", 682, 268, 238),
  select("全部状态", ["全部状态", "启用", "停用", "发布中"], 932, 268, 142),
  button("查询", 1086, 268, 72, "primary"),
  button("重置", 1170, 268, 72),
  table(
    [
      { title: "页面", dataIndex: "page" },
      { title: "配置编码", dataIndex: "code" },
      { title: "配置名称", dataIndex: "name" },
      { title: "状态", dataIndex: "status" },
      { title: "配置描述", dataIndex: "desc" },
      { title: "更新人", dataIndex: "owner" },
      { title: "更新时间", dataIndex: "time" },
      { title: "操作", dataIndex: "action" },
    ],
    [
      { key: "1", page: "隐私授权页", code: "APP_CFG_0001", name: "退出挽留弹窗", status: "● 启用", desc: "拒绝隐私授权时的退出确认", owner: "王慧", time: "09-09 14:20", action: "编辑  停用  历史" },
      { key: "2", page: "隐私重授权页", code: "APP_CFG_0002", name: "隐私政策版本", status: "● 发布中", desc: "重授权弹窗版本控制", owner: "李敏", time: "09-09 13:18", action: "查看  历史" },
      { key: "3", page: "隐私授权页", code: "APP_CFG_0003", name: "协议地址", status: "○ 停用", desc: "隐私政策与用户协议入口", owner: "王慧", time: "09-08 17:42", action: "编辑  启用  历史" },
    ],
    494,
    340,
    874,
    350,
  ),
  pager(1000, 748, 3, 50),
);
note(appList, "切换模块时保留 Tab；发布中行禁用编辑和启停，并保留查看与历史入口。", 474, 836, 918);

const editDrawer = shell("02 · 编辑配置 / 规则构建", 3040, 0, "app", "APP配置", "PAKORA · 申请流程 / 个人信息页");
editDrawer.children.push(
  frame("Dimmed content", 208, 64, 792, 836, { fill: "#0B1220", opacity: 0.16 }),
  frame("Drawer", 820, 64, 620, 836, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
  text("编辑配置", 852, 92, { fontSize: 20, fontWeight: "700" }),
  text("×", 1392, 88, { fontSize: 24, fill: C.secondary }),
  line(820, 132, 620),
  text("页面", 852, 156, { fontSize: 12, fill: C.secondary }),
  text("个人信息页", 852, 178, { fontWeight: "700" }),
  text("配置编码", 1050, 156, { fontSize: 12, fill: C.secondary }),
  text("APP_KYC_PROFILE_FIELDS", 1050, 178, { fontWeight: "700" }),
  text("配置名称 *", 852, 216, { fontSize: 12, fill: C.secondary }),
  input("请输入配置名称", 852, 238, 552, "页面与字段配置"),
  text("配置描述 *", 852, 282, { fontSize: 12, fill: C.secondary }),
  input("请输入配置描述", 852, 304, 552, "KYC 个人信息字段顺序与页面提示"),
  frame("Default config", 852, 358, 552, 132, { fill: "#FAFAFA", stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  text("默认配置", 870, 374, { fontWeight: "700" }),
  text("适用于全部用户及版本", 1180, 376, { fontSize: 12, fill: C.secondary }),
  text('{ "fields": ["maritalStatus", "education", "email"],\n  "tip": "Providing true information..." }', 870, 410, { fontFamily: "Menlo", fontSize: 12, fill: "#D0D5DD", width: 500 }),
  frame("Code background", 862, 402, 530, 72, { fill: C.code, cornerRadius: 6 }),
  text('{ "fields": ["maritalStatus", "education", "email"],\n  "tip": "Providing true information..." }', 874, 412, { fontFamily: "Menlo", fontSize: 11, fill: "#D0D5DD", width: 500 }),
  frame("Rule card", 852, 506, 552, 242, { fill: C.white, stroke: "#B2CCFF", strokeWidth: 1, cornerRadius: 8 }),
  text("规则配置 1 *", 870, 524, { fontWeight: "700" }),
  text("执行优先级 *", 1168, 524, { fontSize: 12, fill: C.secondary }),
  input("1", 1272, 518, 112, "1"),
  text("条件组 1", 870, 566, { fontSize: 12, fontWeight: "700", fill: C.secondary }),
  select("类型", ["公参", "实时特征", "离线特征"], 870, 590, 102, "公参"),
  select("参数", ["appVersion", "os", "uid"], 982, 590, 112, "appVersion"),
  select("函数", ["无", "截取"], 1104, 590, 84, "无"),
  select("运算符", [">=", "=", "in"], 1198, 590, 82, ">="),
  input("匹配值", 1290, 590, 94, "1.3.0"),
  text("AND", 870, 638, { fontSize: 12, fontWeight: "700", fill: C.primary }),
  select("类型", ["公参", "实时特征"], 916, 632, 102, "公参"),
  select("参数", ["os", "appVersion"], 1028, 632, 112, "os"),
  select("运算符", ["=", "in"], 1150, 632, 82, "="),
  input("匹配值", 1242, 632, 142, "Android"),
  button("＋ 添加条件", 870, 680, 112),
  button("＋ 添加条件组", 992, 680, 130),
  text("JSON 配置", 870, 724, { fontSize: 12, fill: C.secondary }),
  text("格式化", 1328, 724, { fontSize: 12, fill: C.primary }),
  frame("Drawer footer", 820, 812, 620, 88, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
  button("取消", 1194, 838, 88),
  button("发布", 1294, 838, 110, "primary"),
  alertBox("未发布变更会按操作人与配置项暂存", "", "info", 240, 170, 540, 48),
  text("交互要点", 240, 254, { fontSize: 18, fontWeight: "700" }),
  text("• 优先级必须为不重复正整数，数值越小越先匹配\n• 条件组内与条件组间均支持 AND / OR\n• JSON 格式化同时执行可解析性校验\n• 有未发布变更时关闭抽屉必须二次确认", 240, 298, { width: 500, fontSize: 14, fill: C.secondary, lineHeight: 1.8 }),
);

const publish = shell("03 · 发布确认 / Diff", 0, 980, "app", "APP配置", "PAKORA · 发布前最终确认");
publish.children.push(
  frame("Dimmed page", 208, 64, 1232, 836, { fill: "#0B1220", opacity: 0.22 }),
  modalBox(
    "确认发布",
    "个人信息页 / 页面与字段配置\n\n配置描述\n− KYC 个人信息字段配置\n+ KYC 个人信息字段顺序与页面提示\n\n规则配置 1 · 执行优先级\n− 2\n+ 1\n\n规则条件\n− Android >= 1.2.0\n+ appVersion >= 1.3.0 AND os = Android\n\n默认配置 JSON\n− fields: 9 items\n+ fields: 11 items\n\n仅展示发生变化的字段；确认后进入异步发布状态。",
    388,
    166,
    872,
    560,
  ),
  alertBox("并发保护：若配置已被他人更新，本次发布将被阻止且保留输入", "", "warning", 388, 748, 872, 48),
);
note(publish, "发布失败不生成历史记录；关闭确认框后返回原编辑位置并保留全部输入。", 388, 816, 872);

const errorList = shell("04 · 错误码管理 / 列表", 1520, 980, "error", "错误码管理", "PAKORA · APP 级错误码主数据");
errorList.children.push(
  frame("Content", 240, 168, 1152, 650, { fill: C.white, stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  button("新建错误码", 264, 192, 118, "primary"),
  button("操作记录", 394, 192, 104),
  frame("Filters", 264, 244, 1104, 72, { fill: "#FAFAFA", stroke: C.borderSoft, strokeWidth: 1, cornerRadius: 6 }),
  select("全部页面", ["全部页面", "OTP页", "身份证页", "银行卡页"], 280, 264, 170),
  input("错误码 / 错误描述", 462, 264, 222),
  select("全部状态", ["全部状态", "启用", "停用"], 696, 264, 150),
  select("全部呈现形式", ["全部呈现形式", "Toast", "弹窗"], 858, 264, 170),
  button("查询", 1040, 264, 72, "primary"),
  button("重置", 1124, 264, 72),
  table(
    [
      { title: "错误码", dataIndex: "code" },
      { title: "错误描述", dataIndex: "desc" },
      { title: "关联页面", dataIndex: "pages" },
      { title: "呈现形式", dataIndex: "type" },
      { title: "状态", dataIndex: "status" },
      { title: "更新人", dataIndex: "owner" },
      { title: "更新时间", dataIndex: "time" },
      { title: "操作", dataIndex: "action" },
    ],
    [
      { key: "1", code: "E1001", desc: "验证码错误", pages: "OTP页", type: "Toast", status: "● 启用", owner: "王慧", time: "09-08 16:32", action: "编辑  停用  历史" },
      { key: "2", code: "E2103", desc: "OCR识别失败", pages: "身份证页", type: "弹窗", status: "● 启用", owner: "赵宇", time: "09-08 15:10", action: "编辑  停用  历史" },
      { key: "3", code: "E3102", desc: "账户核验失败", pages: "银行卡页", type: "弹窗", status: "○ 停用", owner: "王慧", time: "09-07 18:05", action: "编辑  启用  历史" },
      { key: "4", code: "E2108", desc: "相机权限未开启", pages: "身份证页、活体页", type: "弹窗", status: "● 启用", owner: "赵宇", time: "09-07 14:40", action: "编辑  停用  历史" },
    ],
    264,
    340,
    1104,
    386,
  ),
  pager(1004, 756, 36, 10),
);
note(errorList, "错误码编码创建后不可修改；仅独立菜单允许编辑、启停和查看历史。", 240, 836, 1152);

const errorEdit = shell("05 · 编辑错误码 / 双语弹窗", 3040, 980, "error", "错误码管理", "E2103 · OCR识别失败");
errorEdit.children.push(
  frame("Dimmed content", 208, 64, 772, 836, { fill: "#0B1220", opacity: 0.16 }),
  frame("Drawer", 800, 64, 640, 836, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
  text("编辑错误码", 832, 92, { fontSize: 20, fontWeight: "700" }),
  text("×", 1390, 88, { fontSize: 24, fill: C.secondary }),
  line(800, 132, 640),
  text("错误码", 832, 154, { fontSize: 12, fill: C.secondary }),
  input("错误码", 832, 176, 270, "E2103"),
  text("错误描述 *", 1118, 154, { fontSize: 12, fill: C.secondary }),
  input("错误描述", 1118, 176, 286, "OCR识别失败"),
  text("关联页面 *", 832, 224, { fontSize: 12, fill: C.secondary }),
  select("请选择关联页面", ["身份证页", "活体页", "银行卡页"], 832, 246, 572, "身份证页"),
  text("呈现形式 *", 832, 294, { fontSize: 12, fill: C.secondary }),
  select("呈现形式", ["Toast", "弹窗"], 832, 316, 180, "弹窗"),
  tab([["en", "English"], ["ur", "اردو"]], "en", 832, 370, 360),
  text("弹窗标题 *", 832, 430, { fontSize: 12, fill: C.secondary }),
  input("请输入弹窗标题", 832, 452, 572, "Unable to read your CNIC"),
  text("弹窗文案 *", 832, 500, { fontSize: 12, fill: C.secondary }),
  frame("Textarea", 832, 522, 572, 72, { fill: C.white, stroke: "#D0D5DD", strokeWidth: 1, cornerRadius: 6 }),
  text("Please make sure the photo is clear and the whole card is visible, then retake it.", 844, 534, { width: 544, fontSize: 13, fill: C.text }),
  text("按钮配置（1–3 个）*", 832, 618, { fontSize: 12, fill: C.secondary }),
  select("按钮类型", ["主按钮", "次按钮"], 832, 642, 112, "次按钮"),
  input("按钮文案", 954, 642, 158, "Cancel"),
  select("按钮动作", ["关闭弹窗", "重新拍照", "跳转链接"], 1122, 642, 188, "关闭弹窗"),
  button("删除", 1320, 642, 84, "default", false, true),
  select("按钮类型", ["主按钮", "次按钮"], 832, 686, 112, "主按钮"),
  input("按钮文案", 954, 686, 158, "Retake photo"),
  select("按钮动作", ["重新拍照", "关闭弹窗"], 1122, 686, 188, "重新拍照"),
  button("删除", 1320, 686, 84, "default", false, true),
  button("＋ 添加按钮", 832, 734, 118),
  frame("Drawer footer", 800, 812, 640, 88, { fill: C.white, stroke: C.border, strokeWidth: 1 }),
  button("取消", 1184, 838, 88),
  button("发布", 1284, 838, 120, "primary"),
  alertBox("Urdu 文案使用 RTL 方向", "切换语言只改变标题、正文和按钮文案；按钮数量、类型和动作共用。", "info", 240, 172, 520, 64),
  text("校验规则", 240, 280, { fontSize: 18, fontWeight: "700" }),
  text("• 两种语言均必填\n• 弹窗按钮数量限制 1–3 个\n• 选择“跳转链接”后 URL 必填\n• 停用错误码发布时主按钮变为“发布并启用”", 240, 322, { width: 500, fill: C.secondary, lineHeight: 1.9 }),
);

const middleList = shell("06 · 中台配置管理", 0, 1960, "middle", "中台配置管理", "PAKORA · ConfPlus 与 O端运营页面引用");
middleList.children.push(
  frame("Content", 240, 168, 1152, 650, { fill: C.white, stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  button("新建中台配置", 264, 192, 136, "primary"),
  button("操作记录", 412, 192, 104),
  frame("Filters", 264, 244, 1104, 72, { fill: "#FAFAFA", stroke: C.borderSoft, strokeWidth: 1, cornerRadius: 6 }),
  input("配置名称 / 编码 / URL", 280, 264, 300),
  select("全部来源", ["全部来源", "ConfPlus", "O端运营页面"], 592, 264, 180),
  button("查询", 784, 264, 72, "primary"),
  button("重置", 868, 264, 72),
  table(
    [
      { title: "配置名称", dataIndex: "name" },
      { title: "配置来源", dataIndex: "source" },
      { title: "来源标识", dataIndex: "sourceId" },
      { title: "关联模块", dataIndex: "module" },
      { title: "关联页面", dataIndex: "page" },
      { title: "更新人", dataIndex: "owner" },
      { title: "更新时间", dataIndex: "time" },
      { title: "操作", dataIndex: "action" },
    ],
    [
      { key: "1", name: "金融产品配置", source: "ConfPlus", sourceId: "loan-core / LOAN_PRODUCT_PK", module: "借款流程", page: "借款页", owner: "中台同步", time: "09-08 14:20", action: "查看↗  编辑  删除" },
      { key: "2", name: "还款路由配置", source: "ConfPlus", sourceId: "repayment / REPAY_ROUTE_PK", module: "还款流程", page: "待还页", owner: "中台同步", time: "09-08 11:10", action: "查看↗  编辑  删除" },
      { key: "3", name: "客服运营页", source: "O端运营页面", sourceId: "https://ops.example.com/service", module: "我的账户", page: "客户服务", owner: "王慧", time: "09-07 19:05", action: "查看↗  编辑  删除" },
    ],
    264,
    340,
    1104,
    350,
  ),
  pager(1004, 748, 3, 10),
);
note(middleList, "ConfPlus 选择编码后自动锁定名称；被当前生效或未发布 BFF 配置引用时禁止删除。", 240, 836, 1152);

const pageList = shell("07 · 页面管理", 1520, 1960, "page", "页面管理", "PAKORA · 页面主数据与启停");
pageList.children.push(
  frame("Content", 240, 168, 1152, 650, { fill: C.white, stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  button("新建页面", 264, 192, 110, "primary"),
  button("操作记录", 386, 192, 104),
  frame("Filters", 264, 244, 1104, 72, { fill: "#FAFAFA", stroke: C.borderSoft, strokeWidth: 1, cornerRadius: 6 }),
  input("页面名称 / 页面编码", 280, 264, 260),
  select("所属模块", ["全部模块", "启动", "申请流程", "借款流程"], 552, 264, 170),
  select("全部状态", ["全部状态", "启用", "停用"], 734, 264, 150),
  button("查询", 896, 264, 72, "primary"),
  button("重置", 980, 264, 72),
  table(
    [
      { title: "APP", dataIndex: "app" },
      { title: "页面名称", dataIndex: "name" },
      { title: "页面编码", dataIndex: "code" },
      { title: "所属模块", dataIndex: "module" },
      { title: "状态", dataIndex: "status" },
      { title: "操作人", dataIndex: "owner" },
      { title: "操作时间", dataIndex: "time" },
      { title: "操作", dataIndex: "action" },
    ],
    [
      { key: "1", app: "PAKORA", name: "隐私授权页", code: "PRIVACY_AUTH", module: "启动", status: "● 启用", owner: "王慧", time: "09-09 11:35", action: "编辑  停用" },
      { key: "2", app: "PAKORA", name: "个人信息页", code: "KYC_PROFILE", module: "申请流程", status: "● 启用", owner: "李敏", time: "09-09 10:18", action: "编辑  停用" },
      { key: "3", app: "PAKORA", name: "身份证页", code: "KYC_CNIC", module: "申请流程", status: "● 启用", owner: "赵宇", time: "09-08 17:42", action: "编辑  停用" },
      { key: "4", app: "PAKORA", name: "旧版借款结果页", code: "LOAN_RESULT_V1", module: "借款流程", status: "○ 停用", owner: "王慧", time: "09-07 16:20", action: "编辑  启用" },
    ],
    264,
    340,
    1104,
    386,
  ),
  pager(1004, 756, 43, 10),
);
note(pageList, "页面编码同 APP 内唯一且创建后不可修改；存在有效配置或埋点引用时停用会被服务端阻止。", 240, 836, 1152);

const states = shell("08 · 状态与异常规范", 3040, 1960, "app", "状态与异常", "共用反馈与恢复行为");
states.children.push(
  frame("Grid", 240, 168, 1152, 650, { fill: C.white, stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  text("即时反馈", 268, 196, { fontSize: 18, fontWeight: "700" }),
  alertBox("配置已发布", "", "success", 268, 236, 520, 48),
  alertBox("发布失败，请检查网络后重试", "输入已保留，列表标记“未发布变更”。", "error", 268, 300, 520, 64),
  alertBox("配置已被其他人更新，请刷新后重新编辑", "当前输入保留，不自动覆盖他人版本。", "warning", 268, 380, 520, 64),
  text("列表状态", 828, 196, { fontSize: 18, fontWeight: "700" }),
  frame("State card", 828, 236, 532, 208, { fill: "#FAFAFA", stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  tag("启用", "success", 852, 262, 62),
  text("正常可编辑、停用、查看历史", 934, 262, { fontSize: 13, fill: C.secondary }),
  tag("停用", "default", 852, 308, 62),
  text("编辑主按钮显示“发布并启用”", 934, 308, { fontSize: 13, fill: C.secondary }),
  tag("发布中", "processing", 852, 354, 74),
  text("编辑与启停禁用；查看和历史仍可用", 946, 354, { fontSize: 13, fill: C.secondary }),
  tag("未发布变更", "warning", 852, 400, 102),
  text("再次进入恢复暂存内容", 974, 400, { fontSize: 13, fill: C.secondary }),
  text("空状态与权限", 268, 486, { fontSize: 18, fontWeight: "700" }),
  emptyState(268, 526, 360, 180),
  frame("Permission", 660, 526, 700, 180, { fill: "#FAFAFA", stroke: C.border, strokeWidth: 1, cornerRadius: 8 }),
  text("无 appsource 权限", 692, 558, { fontSize: 18, fontWeight: "700" }),
  text("当前账号没有 PAKORA 的访问权限。请联系管理员配置数据权限后重试。", 692, 600, { width: 520, fontSize: 14, fill: C.secondary }),
  button("返回首页", 692, 654, 104, "primary"),
);
note(states, "除整页无权限外，即时结果使用页面顶部居中 Toast，3 秒后消失且不打断当前操作。", 240, 836, 1152);

const document = {
  version: "2.18",
  imports: { antd: libraryUri },
  themes: { mode: ["light", "dark"], density: ["regular", "compact"] },
  variables: {
    "prototype.colorPrimary": { type: "color", value: C.primary },
    "prototype.colorBgLayout": { type: "color", value: C.bg },
    "prototype.colorText": { type: "color", value: C.text },
    "prototype.colorBorder": { type: "color", value: C.border },
    "prototype.spacing": { type: "number", value: 16 },
  },
  children: [cover, appList, editDrawer, publish, errorList, errorEdit, middleList, pageList, states],
  fileToken: randomUUID(),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(document, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({ outputPath, libraryUri, screens: document.children.length }, null, 2)}\n`);
