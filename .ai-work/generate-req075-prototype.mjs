import { readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";

const outputPath = resolve(process.argv[2]);
const kitRoot = resolve(process.argv[3] || ".");
const libraryPath = resolve(kitRoot, "libraries/antd-6.lib.pen");
const sharedLibrary = "/Users/yanxianliang/.pen/libraries/antd-6.lib.pen";
const componentRoot = resolve(kitRoot, "canvas-components");
const componentUri = (name) => relative(dirname(outputPath), resolve(componentRoot, `${name}.js`)).split("\\").join("/");
const library = JSON.parse(await readFile(libraryPath, "utf8"));

let seq = 0;
const uid = (prefix = "n") => `${prefix}-${++seq}`;
const T = {
  primary: "$antd-colorPrimary",
  text: "$antd-colorText",
  secondary: "$antd-colorTextSecondary",
  tertiary: "$antd-colorTextTertiary",
  border: "$antd-colorBorder",
  split: "$antd-colorSplit",
  bg: "$antd-colorBgLayout",
  container: "$antd-colorBgContainer",
  success: "$antd-colorSuccess",
  warning: "$antd-colorWarning",
  error: "$antd-colorError",
  infoBg: "$antd-colorInfoBg",
};

const findNode = (node, predicate) => {
  if (predicate(node)) return node;
  for (const child of node.children || []) {
    const found = findNode(child, predicate);
    if (found) return found;
  }
};

const text = (content, options = {}) => ({
  type: "text",
  id: uid("text"),
  name: options.name || String(content).slice(0, 36),
  content,
  fill: options.fill || T.text,
  fontFamily: options.fontFamily || "Inter",
  fontSize: options.fontSize || 14,
  fontWeight: options.fontWeight || "400",
  lineHeight: options.lineHeight || 1.5,
  textGrowth: options.width ? (options.height ? "fixed-width-height" : "fixed-width") : "auto",
  ...(options.width ? { width: options.width } : {}),
  ...(options.height ? { height: options.height } : {}),
  ...(options.textAlign ? { textAlign: options.textAlign } : {}),
  ...(options.textAlignVertical ? { textAlignVertical: options.textAlignVertical } : {}),
});

const frame = (name, options = {}, children = []) => ({
  type: "frame",
  id: uid("frame"),
  name,
  layout: options.layout || "vertical",
  width: options.width ?? "fill_container",
  height: options.height ?? "fit_content",
  gap: options.gap ?? 0,
  padding: options.padding ?? 0,
  justifyContent: options.justifyContent,
  alignItems: options.alignItems,
  fill: options.fill,
  stroke: options.stroke,
  strokeWidth: options.strokeWidth,
  strokeAlignment: options.strokeAlignment,
  cornerRadius: options.cornerRadius,
  clip: options.clip,
  children,
});

const live = (name, width, height, inputs = {}, extra = {}) => ({
  type: "script",
  id: uid("antd"),
  name: `Antd/Live/${name}`,
  width,
  height,
  scriptUri: componentUri(name),
  inputs,
  metadata: {
    type: "antd-component",
    component: name,
    antdVersion: "6.6.4",
    source: "antd-6.lib.pen",
    manifest: `antd/${name}`,
    state: extra.state || "default",
    props: inputs,
    runtimeOnly: extra.runtimeOnly || [],
  },
});

const button = (label, width = 88, type = "default", extra = {}) => live("Button", width, extra.size === "large" ? 40 : 32, {
  children: label,
  type,
  color: extra.danger ? "danger" : type === "primary" ? "primary" : "default",
  variant: type === "primary" ? "solid" : type === "link" ? "link" : "outlined",
  disabled: !!extra.disabled,
  loading: !!extra.loading,
  danger: !!extra.danger,
  size: extra.size || "middle",
  icon: extra.icon || "",
});

const input = (placeholder, width = 220, value = "", extra = {}) => live("Input", width, 32, {
  placeholder,
  value,
  allowClear: true,
  disabled: !!extra.disabled,
  status: extra.status || "default",
  variant: "outlined",
});

const select = (placeholder, options, width = 180, value = "", extra = {}) => live("Select", width, extra.open ? 180 : 32, {
  placeholder,
  options: options.join("|"),
  value,
  mode: "default",
  status: extra.status || "default",
  disabled: !!extra.disabled,
  open: !!extra.open,
  allowClear: true,
  variant: "outlined",
});

const textarea = (placeholder, width, height, value = "", status = "default") => live("Input.TextArea", width, height, {
  placeholder,
  value,
  rows: 8,
  autoSize: false,
  allowClear: false,
  showCount: true,
  status,
  variant: "outlined",
});

const tag = (label, color = "blue", width = 72) => live("Tag", width, 24, { children: label, color });

const tabs = (items, activeKey, width) => live("Tabs", width, 48, {
  items: JSON.stringify(items.map(([key, label]) => ({ key, label, children: "" }))),
  activeKey,
  type: "line",
  size: "middle",
  tabPlacement: "top",
  centered: false,
  hideAdd: true,
});

const labelControl = (label, control, required = false, help = "") => frame(`Form.Item · ${label}`, { width: control.width, gap: 6 }, [
  text(`${label}${required ? " *" : ""}`, { fontSize: 13, fill: required ? T.text : T.secondary }),
  control,
  ...(help ? [text(help, { fontSize: 12, fill: T.tertiary, width: control.width })] : []),
]);

const section = (name, children, options = {}) => frame(name, {
  width: options.width || "fill_container",
  height: options.height || "fit_content",
  gap: options.gap ?? 16,
  padding: options.padding ?? 20,
  fill: options.fill || T.container,
  stroke: options.stroke || T.split,
  strokeWidth: options.strokeWidth ?? 1,
  strokeAlignment: "inner",
  cornerRadius: options.cornerRadius ?? 8,
  clip: options.clip,
  layout: options.layout || "vertical",
  justifyContent: options.justifyContent,
  alignItems: options.alignItems,
}, children);

const pageHeader = (title, description, actions = [], width = "fill_container") => frame("Page Header", {
  width,
  height: 54,
  layout: "horizontal",
  justifyContent: "space_between",
  alignItems: "center",
}, [
  frame("Page Title Group", { width: "fill_container", gap: 2 }, [
    text(title, { fontSize: 22, fontWeight: "600" }),
    text(description, { fontSize: 12, fill: T.secondary, width: "fill_container" }),
  ]),
  frame("Page Actions", { width: "fit_content", layout: "horizontal", gap: 8, alignItems: "center" }, actions),
]);

const actionNode = (labels, widths) => ({
  type: "frame",
  name: "Row Actions",
  width: widths || 220,
  height: 32,
  layout: "horizontal",
  gap: 2,
  alignItems: "center",
  children: labels.map((label) => ({
    type: "script",
    name: `Antd/Live/Button · ${label}`,
    scriptUri: componentUri("Button"),
    width: Math.max(44, label.length * 16 + 8),
    height: 32,
    inputs: { children: label, type: "link", color: label === "删除" || label === "停用" ? "danger" : "primary", variant: "link", danger: label === "删除" || label === "停用", size: "middle" },
  })),
});

const tagNode = (label, color) => ({
  type: "script",
  name: `Antd/Live/Tag · ${label}`,
  scriptUri: componentUri("Tag"),
  width: 72,
  height: 24,
  inputs: { children: label, color },
});

const dataTable = ({ columns, rows, width, height, statusMap = {}, actionLabels = [] , loading = false, emptyText = "暂无数据" }) => {
  const cols = columns.map((column) => ({ ...column }));
  const statusColumn = cols.find((column) => column.dataIndex === "status");
  if (statusColumn) statusColumn.render = rows.map((row) => {
    const config = statusMap[row.status] || [row.status, "default"];
    return tagNode(config[0], config[1]);
  });
  const actionColumn = cols.find((column) => column.dataIndex === "action");
  if (actionColumn) actionColumn.render = rows.map((_, index) => actionNode(actionLabels[index] || actionLabels[0] || ["详情"]));
  return live("Table", width, height, {
    columns: JSON.stringify(cols),
    dataSource: JSON.stringify(rows),
    bordered: false,
    size: "middle",
    showHeader: true,
    loading,
    pagination: false,
    virtual: false,
    rowSelection: "{}",
    scroll: JSON.stringify({ x: columns.reduce((sum, col) => sum + (col.width || 140), 0) }),
    locale: JSON.stringify({ emptyText }),
  }, { state: loading ? "loading" : rows.length ? "populated" : "empty" });
};

const pagination = (total = 56, width = 360) => live("Pagination", width, 32, {
  total,
  pageSize: 20,
  current: 1,
  showSizeChanger: true,
  showQuickJumper: false,
  showTotal: true,
  simple: false,
  disabled: false,
  size: "default",
});

const alert = (type, title, description, width, showIcon = true) => live("Alert", width, description ? 72 : 48, {
  title,
  message: title,
  description,
  type,
  showIcon,
  closable: false,
  banner: false,
  variant: "outlined",
});

const shellSource = findNode({ children: library.children }, (node) => node.id === "f4rW6H");
if (!shellSource) throw new Error("Admin App Shell template f4rW6H not found");

const replaceNodeById = (node, targetId, replacement) => {
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map((item) => item?.id === targetId ? structuredClone(replacement) : replaceNodeById(item, targetId, replacement));
  for (const [key, value] of Object.entries(node)) {
    if (!value || typeof value !== "object") continue;
    if (!Array.isArray(value) && value.id === targetId) node[key] = structuredClone(replacement);
    else node[key] = replaceNodeById(value, targetId, replacement);
  }
  return node;
};

const overridePayload = (node) => Object.values(node.descendants || {}).find((value) => value && value.type === "frame" && (value.width !== 0 || value.height !== 0));

const flattenInstanceOverrides = (node) => {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (let index = 0; index < node.length; index += 1) {
      const child = node[index];
      if (child && typeof child === "object" && child.descendants) {
        const payload = overridePayload(child);
        if (payload) {
          const replacement = structuredClone(payload);
          replacement.name = payload.name || child.name;
          if (child.width !== undefined && payload.width === undefined) replacement.width = child.width;
          if (child.height !== undefined && payload.height === undefined) replacement.height = child.height;
          node[index] = replacement;
          flattenInstanceOverrides(replacement);
          continue;
        }
      }
      flattenInstanceOverrides(child);
    }
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "id" || !value || typeof value !== "object") continue;
    if (key === "descendants") {
      delete node.descendants;
      continue;
    }
    flattenInstanceOverrides(value);
  }
};

const cloneShell = (name, x, y, width, height, content, options = {}) => {
  const prepared = structuredClone(shellSource);
  replaceNodeById(prepared, "N0FHv", { ...structuredClone(content), id: "N0FHv", name: `${name} · Page Body`, width: "fill_container", height: "fill_container" });
  flattenInstanceOverrides(prepared);
  const remap = new Map();
  const clone = (node) => {
    const next = { ...node, id: uid("tpl") };
    remap.set(node.id, next.id);
    if (next.ref) next.ref = `antd:${next.ref}`;
    if (next.scriptUri) next.scriptUri = componentUri(next.scriptUri.split("/").at(-1).replace(/\.js$/, ""));
    if (node.id === "vGuzS") next.content = options.compact ? "客群" : "客群管理平台";
    if (node.id === "rBKE8") next.content = "运营用户";
    if (node.id === "Y8crz") next.enabled = !options.compact;
    if (node.id === "Gn0rZ" && options.compact) next.width = 80;
    if (node.id === "x6d5Og" && options.compact) next.width = 80;
    if (node.id === "y2xIX") {
      next.inputs = {
        ...next.inputs,
        items: JSON.stringify([
          { key: "audience-list", label: "客群列表", icon: "TeamOutlined" },
          { key: "audience-builder", label: "客群圈选器", icon: "FilterOutlined" }
        ]),
        selectedKeys: JSON.stringify([options.selectedKey || "audience-list"]),
        inlineCollapsed: !!options.compact,
      };
    }
    if (node.id === "Db9uo") next.inputs = { ...(next.inputs || {}), value: "TACO", options: "TACO|KUESKI|PAKORA", disabled: false };
    if (node.id === "xfNTc") next.inputs = { ...(next.inputs || {}), items: JSON.stringify([{ title: "客群管理" }, { title: options.crumb || name }]) };
    if (next.children) next.children = next.children.map(clone);
    return next;
  };
  const root = clone(prepared);
  root.name = name;
  root.x = x;
  root.y = y;
  root.width = width;
  root.height = height;
  root.clip = true;
  root.reusable = false;
  root.placeholder = false;
  root.metadata = { type: "prototype-screen", requirement: "REQ075", template: "Frame · Admin App Shell", source: "antd-6.lib.pen", viewport: `${width}x${height}` };
  return root;
};

const listColumns = [
  { title: "客群 ID", dataIndex: "id", width: 88 },
  { title: "客群 Key", dataIndex: "key", width: 210 },
  { title: "客群名称", dataIndex: "name", width: 160 },
  { title: "类型", dataIndex: "type", width: 88 },
  { title: "场景", dataIndex: "scene", width: 88 },
  { title: "状态", dataIndex: "status", width: 96 },
  { title: "更新时间", dataIndex: "updated", width: 138 },
  { title: "负责人", dataIndex: "owner", width: 88 },
  { title: "操作", dataIndex: "action", width: 252, fixed: "right" },
];
const listRows = [
  { key: "1", id: "1001", key: "GRP_REGULAR_ACTIVE_USER_20260901", name: "墨西哥活跃用户", type: "常规", scene: "促活", status: "启用", updated: "2026-09-23 09:20", owner: "Ana" },
  { key: "2", id: "1002", key: "GRP_ONETIME_RECALL_20260918", name: "沉默用户召回", type: "一次性", scene: "召回", status: "圈选中", updated: "2026-09-23 09:12", owner: "Luis" },
  { key: "3", id: "1003", key: "GRP_REGULAR_FIRST_LOAN_20260920", name: "首借转化人群", type: "常规", scene: "转化", status: "初始化", updated: "2026-09-22 18:05", owner: "Maya" },
  { key: "4", id: "1004", key: "GRP_ONETIME_OVERDUE_20260921", name: "逾期提醒名单", type: "一次性", scene: "提醒", status: "圈选失败", updated: "2026-09-22 16:45", owner: "Diego" },
  { key: "5", id: "1005", key: "GRP_REGULAR_REPAY_20260901", name: "还款日前用户", type: "常规", scene: "提醒", status: "停用", updated: "2026-09-21 11:30", owner: "Ana" },
];
const statusMap = { "启用": ["启用", "success"], "圈选中": ["圈选中", "processing"], "初始化": ["初始化", "default"], "圈选失败": ["圈选失败", "error"], "停用": ["停用", "warning"], "成功": ["成功", "success"], "失败": ["失败", "error"] };

const listContent = frame("客群列表内容", { width: "fill_container", height: "fill_container", gap: 14 }, [
  pageHeader("客群列表", "统一浏览、筛选与管理常规 / 一次性客群；当前 App 上下文：TACO", [button("新建客群", 112, "primary", { icon: "PlusOutlined" })]),
  section("查询区", [
    frame("Filters Row", { layout: "horizontal", gap: 10, alignItems: "center" }, [
      select("市场", ["全部市场", "MX", "VN"], 126, "MX"),
      select("业务场景", ["全部场景", "获客", "转化", "促活", "召回", "提醒"], 142),
      select("客群类型", ["全部类型", "常规", "一次性"], 132),
      select("客群状态", ["全部状态", "初始化", "圈选中", "圈选失败", "启用", "停用"], 142),
      input("客群 ID / Key / 名称", 238),
      button("查询", 72, "primary"),
      button("重置", 72),
    ]),
  ], { padding: 14 }),
  frame("List Toolbar", { layout: "horizontal", justifyContent: "space_between", alignItems: "center", height: 40 }, [
    live("Segmented", 196, 32, { options: "全部客群|我负责的", value: "全部客群", block: false, disabled: false, size: "middle", vertical: false }),
    text("56 个客群 · 数据按市场隔离", { fontSize: 12, fill: T.secondary }),
  ]),
  dataTable({
    columns: listColumns,
    rows: listRows,
    width: 1137,
    height: 322,
    statusMap,
    actionLabels: [
      ["详情", "编辑", "停用", "导出名单"],
      ["详情", "导出名单"],
      ["详情", "编辑", "删除"],
      ["详情", "编辑", "重新圈选"],
      ["详情", "启用"],
    ],
  }),
  frame("Pagination Row", { layout: "horizontal", justifyContent: "end", alignItems: "center" }, [pagination(56, 380)]),
]);

const basicInfo = (type) => section("基本信息", [
  frame("Basic Row 1", { layout: "horizontal", gap: 16 }, [
    labelControl("客群名称", input("请输入客群名称", 245, type === "常规" ? "墨西哥活跃用户" : "沉默用户召回"), true),
    labelControl("客群 Key", input("系统生成", 330, type === "常规" ? "GRP_REGULAR_ACTIVE_USER_20260923" : "GRP_ONETIME_RECALL_20260923"), true, "中间英文名可修改，需全局唯一"),
    labelControl("客群类型", select("客群类型", [type], 160, type, { disabled: true }), true),
  ]),
  frame("Basic Row 2", { layout: "horizontal", gap: 16 }, [
    labelControl("业务场景", select("请选择", ["获客", "转化", "促活", "召回", "提醒"], 200, type === "常规" ? "促活" : "召回"), true),
    labelControl("负责人", select("请选择", ["Ana", "Luis", "Maya", "Diego"], 200, type === "常规" ? "Ana" : "Luis"), true),
    ...(type === "常规" ? [
      labelControl("数据保存天数", select("请选择", ["3 天", "7 天", "30 天", "60 天", "180 天", "长期"], 190, "3 天"), true, "编辑后自下次刷新生效"),
      labelControl("每日截止时刻", live("TimePicker", 170, 32, { value: "18:00:00", format: "HH:mm:ss", status: "default", disabled: false, allowClear: true }), true),
    ] : [
      labelControl("有效期", live("DatePicker", 200, 32, { value: "2026-10-07", format: "YYYY-MM-DD", status: "default", disabled: false, allowClear: true }), true, "默认 14 天，过期自动停用"),
      labelControl("客群优先级", select("请选择", ["REGULAR_T1", "CRITICAL"], 190, "REGULAR_T1"), true, "当前仅预留，无调度效果"),
    ]),
  ]),
], { padding: 16, gap: 14 });

const sqlEditor = (type) => section("SQL 编辑", [
  frame("SQL Toolbar", { layout: "horizontal", justifyContent: "space_between", alignItems: "center" }, [
    frame("SQL Title", { width: "fit_content", gap: 2 }, [
      text(type === "常规" ? "SQL 编辑 · 动态 T+1" : "SQL 编辑 · SNAPSHOT", { fontSize: 16, fontWeight: "600" }),
      text("仅支持只读 SELECT；底表限 dwt / cdm；结果必须含 uid + app_source", { fontSize: 12, fill: T.secondary }),
    ]),
    frame("SQL Actions", { width: "fit_content", layout: "horizontal", gap: 8 }, [button("格式化", 82), button("校验", 82, "primary")]),
  ]),
  textarea("请输入 SQL", 1105, 176, type === "常规"
    ? "SELECT uid, app_source, register_date\nFROM cdm_mx_dim_customer_user_df\nWHERE register_date >= '2026-07-01'\n  AND app_source = 'TACO'\nLIMIT 1000"
    : "SELECT uid, app_source, mobile_masked\nFROM dwt_mx_user_activity_di\nWHERE last_active_date < '2026-08-01'\n  AND app_source = 'TACO'", "default"),
], { padding: 16, gap: 12 });

const previewColumns = [
  { title: "uid", dataIndex: "uid", width: 180 },
  { title: "app_source", dataIndex: "app", width: 150 },
  { title: "register_date", dataIndex: "date", width: 170 },
  { title: "mobile_masked", dataIndex: "mobile", width: 190 },
  { title: "last_active_date", dataIndex: "active", width: 180 },
];
const previewRows = [
  { key: "1", uid: "u_8f2a****91", app: "TACO", date: "2026-07-06", mobile: "+52 55****21", active: "2026-08-19" },
  { key: "2", uid: "u_17bd****62", app: "TACO", date: "2026-07-11", mobile: "+52 81****08", active: "2026-08-17" },
  { key: "3", uid: "u_93cf****44", app: "TACO", date: "2026-07-18", mobile: "+52 33****76", active: "2026-08-09" },
];

const sqlContent = (type) => frame(`${type}客群 SQL 内容`, { width: "fill_container", height: "fill_container", gap: 12 }, [
  pageHeader(type === "常规" ? "新建常规客群" : "新建一次性客群", type === "常规" ? "SQL 导入圈选 · 保存 SQL 后保持初始化，上线触发首刷" : "写 SQL 生成固定快照 · 一次性 SQL 禁止变量", [button("返回列表", 92)]),
  basicInfo(type),
  tabs([["sql", "SQL 编辑"], ["dimension", "维度圈选 · P1"]], "sql", 420),
  sqlEditor(type),
  alert("success", "校验通过", "语句合法；底表为 cdm/dwt；结果含 uid + app_source；app_source 与 TACO 上下文一致。", 1105),
  section("预跑结果", [
    frame("Preview Header", { layout: "horizontal", justifyContent: "space_between", alignItems: "center" }, [
      frame("Preview Summary", { width: "fit_content", layout: "horizontal", gap: 12, alignItems: "center" }, [text("命中规模", { fontSize: 13, fill: T.secondary }), text("12,340 人", { fontSize: 20, fontWeight: "600" }), tag("Top 100 · 已脱敏", "blue", 128)]),
      text("预跑样本不落成员表", { fontSize: 12, fill: T.tertiary }),
    ]),
    dataTable({ columns: previewColumns, rows: previewRows, width: 1105, height: 205 }),
  ], { padding: 14, gap: 10 }),
  frame("Sticky Footer", { layout: "horizontal", justifyContent: "end", alignItems: "center", gap: 8, padding: [8, 0, 0, 0] }, [
    button("取消", 80),
    button("提交并预跑", 116, "primary"),
    button("保存 SQL", 96, "default"),
    button("上线", 80, "primary"),
  ]),
]);

const detailTabs = [["overview", "概览"], ["members", "成员"], ["selection", "圈选记录"], ["refresh", "刷新记录"], ["application", "应用记录"]];
const detailHeader = (active) => [
  pageHeader("客群详情", "GRP_REGULAR_ACTIVE_USER_20260901 · 常规客群", [tag("启用", "success", 72)]),
  tabs(detailTabs, active, 660),
];
const descriptionItems = JSON.stringify([
  { label: "客群 ID", children: "1001" },
  { label: "客群名称", children: "墨西哥活跃用户" },
  { label: "业务场景", children: "促活" },
  { label: "刷新模式", children: "T+1 动态刷新" },
  { label: "数据保存", children: "3 天" },
  { label: "每日截止", children: "18:00:00" },
  { label: "负责人", children: "Ana" },
  { label: "存储表", children: "fintech_data.cust_group_1001_di" },
  { label: "App 上下文", children: "TACO" },
]);

const overviewContent = frame("详情概览内容", { width: "fill_container", height: "fill_container", gap: 14 }, [
  ...detailHeader("overview"),
  section("基本信息", [live("Descriptions", 1105, 190, { title: "基本信息", items: descriptionItems, bordered: true, size: "middle", colon: true, layout: "horizontal", column: 3, styles: "{}" })], { padding: 16 }),
  section("SQL 与运行信息", [
    frame("SQL Meta", { layout: "horizontal", justifyContent: "space_between", alignItems: "center" }, [
      frame("SQL Meta Text", { width: "fit_content", gap: 4 }, [text("最近成功圈选：2026-09-23 08:16:42", { fontSize: 13 }), text("当前成员数：12,340 · 下次 T+1 刷新：2026-09-24 02:00", { fontSize: 12, fill: T.secondary })]),
      tag("只读", "default", 64),
    ]),
    textarea("SQL", 1105, 144, "SELECT uid, app_source FROM cdm_mx_dim_customer_user_df\nWHERE register_date >= '2026-07-01' AND app_source = 'TACO'", "default"),
  ], { padding: 16, gap: 12 }),
]);

const memberColumns = [
  { title: "uid", dataIndex: "uid", width: 220 },
  { title: "手机号（脱敏）", dataIndex: "mobile", width: 210 },
  { title: "app_source", dataIndex: "app", width: 150 },
  { title: "入群时间", dataIndex: "joined", width: 190 },
  { title: "分区日期", dataIndex: "partition", width: 150 },
];
const memberRows = [
  { key: "1", uid: "u_8f2a****91", mobile: "+52 55****21", app: "TACO", joined: "2026-09-23 08:16", partition: "2026-09-23" },
  { key: "2", uid: "u_17bd****62", mobile: "+52 81****08", app: "TACO", joined: "2026-09-23 08:16", partition: "2026-09-23" },
  { key: "3", uid: "u_93cf****44", mobile: "+52 33****76", app: "TACO", joined: "2026-09-23 08:16", partition: "2026-09-23" },
  { key: "4", uid: "u_428a****05", mobile: "+52 55****38", app: "TACO", joined: "2026-09-23 08:16", partition: "2026-09-23" },
];
const membersContent = frame("详情成员内容", { width: "fill_container", height: "fill_container", gap: 14 }, [
  ...detailHeader("members"),
  section("成员列表", [
    frame("Member Toolbar", { layout: "horizontal", justifyContent: "space_between", alignItems: "center" }, [text("当前成员 12,340 · 敏感字段已脱敏", { fontSize: 13, fill: T.secondary }), input("搜索 uid", 220)]),
    dataTable({ columns: memberColumns, rows: memberRows, width: 1105, height: 250 }),
    frame("Member Pagination", { layout: "horizontal", justifyContent: "end" }, [pagination(12340, 380)]),
  ], { padding: 16, gap: 12 }),
]);

const recordPage = (active, title, columns, rows, summary) => frame(`${title}内容`, { width: "fill_container", height: "fill_container", gap: 14 }, [
  ...detailHeader(active),
  alert("info", summary, "记录仅用于查看；详情页不提供编辑操作。", 1105),
  section(title, [
    dataTable({ columns, rows, width: 1105, height: 290, statusMap, actionLabels: rows.map((row) => row.status === "失败" ? ["查看原因", "重新圈选"] : ["查看详情"]) }),
    frame(`${title} Pagination`, { layout: "horizontal", justifyContent: "end" }, [pagination(rows.length * 4, 360)]),
  ], { padding: 16, gap: 12 }),
]);

const selectionColumns = [
  { title: "圈选时间", dataIndex: "time", width: 190 },
  { title: "触发方式", dataIndex: "trigger", width: 150 },
  { title: "状态", dataIndex: "status", width: 120 },
  { title: "成员数", dataIndex: "count", width: 120 },
  { title: "耗时", dataIndex: "duration", width: 110 },
  { title: "失败原因", dataIndex: "reason", width: 240 },
  { title: "操作", dataIndex: "action", width: 220, fixed: "right" },
];
const selectionRows = [
  { key: "1", time: "2026-09-23 08:15", trigger: "上线", status: "成功", count: "12,340", duration: "1m 42s", reason: "—" },
  { key: "2", time: "2026-09-22 08:12", trigger: "手动圈选", status: "失败", count: "—", duration: "38s", reason: "上游分区未就绪" },
  { key: "3", time: "2026-09-21 17:40", trigger: "重新圈选", status: "成功", count: "12,108", duration: "1m 36s", reason: "—" },
];
const refreshColumns = [
  { title: "刷新日期", dataIndex: "date", width: 160 },
  { title: "状态", dataIndex: "status", width: 120 },
  { title: "成员数", dataIndex: "count", width: 140 },
  { title: "开始时间", dataIndex: "start", width: 190 },
  { title: "完成时间", dataIndex: "end", width: 190 },
  { title: "截止时刻", dataIndex: "deadline", width: 140 },
];
const refreshRows = [
  { key: "1", date: "2026-09-23", status: "成功", count: "12,340", start: "2026-09-23 02:00", end: "2026-09-23 02:04", deadline: "18:00:00" },
  { key: "2", date: "2026-09-22", status: "成功", count: "12,108", start: "2026-09-22 02:00", end: "2026-09-22 02:04", deadline: "18:00:00" },
  { key: "3", date: "2026-09-21", status: "失败", count: "0", start: "2026-09-21 02:00", end: "2026-09-21 02:01", deadline: "18:00:00" },
];
const applicationColumns = [
  { title: "调用时间", dataIndex: "time", width: 190 },
  { title: "调用方", dataIndex: "caller", width: 180 },
  { title: "消费方式", dataIndex: "method", width: 180 },
  { title: "请求规模", dataIndex: "request", width: 130 },
  { title: "结果", dataIndex: "status", width: 120 },
  { title: "耗时", dataIndex: "duration", width: 120 },
];
const applicationRows = [
  { key: "1", time: "2026-09-23 10:22", caller: "营销流程引擎", method: "批量命中判断", request: "500 UID", status: "成功", duration: "182ms" },
  { key: "2", time: "2026-09-23 09:48", caller: "触达服务", method: "分页拉成员", request: "1,000 条", status: "成功", duration: "420ms" },
  { key: "3", time: "2026-09-22 17:06", caller: "营销流程引擎", method: "查询元信息", request: "1 客群", status: "成功", duration: "68ms" },
];

const statesContent = frame("列表状态检查内容", { width: "fill_container", height: "fill_container", gap: 14 }, [
  pageHeader("客群列表 · 关键状态", "数据驱动页面必须具备加载、空、失败和无权限恢复路径"),
  frame("State Row 1", { layout: "horizontal", gap: 14, height: 280 }, [
    section("State · Loading", [text("加载中", { fontSize: 16, fontWeight: "600" }), live("Spin", 520, 170, { size: "large", spinning: true, tip: "正在加载客群数据…", fullscreen: false, children: "" }, { state: "loading" })], { width: "fill_container", height: "fill_container" }),
    section("State · Empty", [text("查询空", { fontSize: 16, fontWeight: "600" }), live("Empty", 520, 180, { description: "未找到符合条件的客群", image: "simple", children: JSON.stringify({ type: "script", name: "Antd/Live/Button", scriptUri: componentUri("Button"), width: 104, height: 32, inputs: { children: "清空筛选", type: "default" } }), styles: "{}" }, { state: "empty" })], { width: "fill_container", height: "fill_container" }),
  ]),
  frame("State Row 2", { layout: "horizontal", gap: 14, height: 230 }, [
    section("State · Error", [text("请求失败", { fontSize: 16, fontWeight: "600" }), alert("error", "客群列表加载失败", "请检查网络后重试；筛选条件已保留。", 520), frame("Retry Action", { layout: "horizontal", justifyContent: "end" }, [button("重试", 80, "primary")])], { width: "fill_container", height: "fill_container" }),
    section("State · Permission", [text("无权限", { fontSize: 16, fontWeight: "600" }), live("Result", 520, 160, { status: "403", title: "暂无市场数据权限", subTitle: "请联系管理员开通 MX 市场的数据权限。", extra: JSON.stringify({ type: "script", name: "Antd/Live/Button", scriptUri: componentUri("Button"), width: 112, height: 32, inputs: { children: "返回客群列表", type: "primary" } }) }, { state: "permission" })], { width: "fill_container", height: "fill_container" }),
  ]),
]);

const compactColumns = [
  { title: "客群名称", dataIndex: "name", width: 190 },
  { title: "类型", dataIndex: "type", width: 90 },
  { title: "状态", dataIndex: "status", width: 110 },
  { title: "负责人", dataIndex: "owner", width: 100 },
  { title: "操作", dataIndex: "action", width: 160, fixed: "right" },
];
const compactContent = frame("窄视口列表内容", { width: "fill_container", height: "fill_container", gap: 12 }, [
  pageHeader("客群列表", "760px 窄视口 · 导航折叠", [button("新建", 72, "primary")]),
  section("Compact Filters", [input("关键字", 516), frame("Compact Filter Row", { layout: "horizontal", gap: 8 }, [select("类型", ["全部", "常规", "一次性"], 160), select("状态", ["全部", "启用", "停用"], 160), button("查询", 72, "primary")])], { padding: 12, gap: 8 }),
  alert("info", "表格保留关键列", "次要列在窄视口隐藏；操作列保持右侧可达。", 516),
  dataTable({ columns: compactColumns, rows: listRows.slice(0, 4), width: 516, height: 260, statusMap, actionLabels: [["详情", "更多"]] }),
]);

const cover = frame("00 · 原型说明", { width: 1440, height: 900, fill: "#0B1220", padding: 64, gap: 28, clip: true }, [
  text("REQ075 · P0", { fontSize: 14, fontWeight: "600", fill: "#84ADFF" }),
  text("海外客群管理平台", { fontSize: 40, fontWeight: "700", fill: "#FFFFFF" }),
  text("Ant Design 6.6.4 · 运营后台高保真原型", { fontSize: 18, fill: "#98A2B3" }),
  frame("Cover Columns", { layout: "horizontal", gap: 28, height: 500 }, [
    frame("Scope", { width: "fill_container", height: "fill_container", fill: "#121B2E", stroke: "#25324A", strokeWidth: 1, cornerRadius: 14, padding: 28, gap: 16 }, [
      text("P0 覆盖", { fontSize: 20, fontWeight: "600", fill: "#FFFFFF" }),
      ...["客群列表与角色操作", "常规客群 SQL 圈选", "一次性客群 SNAPSHOT 建群", "客群详情与 5 个查看 Tab", "SQL 预跑进行中 / 成功 / 失败", "加载 / 空 / 错误 / 无权限", "760px 窄视口检查"].map((item, index) => text(`${String(index + 1).padStart(2, "0")}  ${item}`, { fontSize: 15, fill: "#D0D5DD" })),
    ]),
    frame("Rules", { width: "fill_container", height: "fill_container", fill: "#121B2E", stroke: "#25324A", strokeWidth: 1, cornerRadius: 14, padding: 28, gap: 16 }, [
      text("关键约束", { fontSize: 20, fontWeight: "600", fill: "#FFFFFF" }),
      ...["App 来源由入口带入，固定展示 TACO", "P0 去核验、去版本、去圈选进度弹窗", "预跑成功后才可保存 SQL / 上线", "正式圈选以 toast 返回列表并写圈选记录", "停用 / 导出仅管理员；删除仅初始化态", "敏感数据全部脱敏展示", "P1 维度圈选与观测页不在本文件"].map((item) => text(`•  ${item}`, { fontSize: 15, fill: "#D0D5DD", width: "fill_container" })),
    ]),
  ]),
  text("模板：antd-6.lib / Frame · Admin App Shell　组件：Antd/Live/*　业务示例数据：合成", { fontSize: 13, fill: "#667085", width: "fill_container" }),
]);
cover.x = 0; cover.y = 0; cover.metadata = { type: "handoff-cover", requirement: "REQ075", scope: "P0" };

const modalChildren = (kind) => {
  if (kind === "basic") return JSON.stringify({ type: "frame", name: "Basic Info Form", width: 472, height: 126, layout: "vertical", gap: 10, children: [
    { type: "script", name: "Antd/Live/Input", scriptUri: componentUri("Input"), width: 472, height: 32, inputs: { placeholder: "客群名称", value: "沉默用户召回", allowClear: true, status: "default" } },
    { type: "script", name: "Antd/Live/Input", scriptUri: componentUri("Input"), width: 472, height: 32, inputs: { placeholder: "自动英文名", value: "RECALL", allowClear: true, status: "default" } },
    { type: "frame", name: "Select Row", width: 472, height: 32, layout: "horizontal", gap: 8, children: [
      { type: "script", name: "Antd/Live/Select · Type", scriptUri: componentUri("Select"), width: 148, height: 32, inputs: { placeholder: "类型", options: "一次性", value: "一次性", disabled: true } },
      { type: "script", name: "Antd/Live/Select · Scene", scriptUri: componentUri("Select"), width: 154, height: 32, inputs: { placeholder: "业务场景", options: "召回|提醒|促活", value: "召回" } },
      { type: "script", name: "Antd/Live/Select · Owner", scriptUri: componentUri("Select"), width: 154, height: 32, inputs: { placeholder: "负责人", options: "Ana|Luis|Maya", value: "Luis" } }
    ] }
  ] });
  if (kind === "running") return JSON.stringify({ type: "script", name: "Antd/Live/Spin", scriptUri: componentUri("Spin"), width: 472, height: 120, inputs: { size: "large", spinning: true, tip: "正在预跑 SQL，请稍候…", fullscreen: false, children: "" } });
  if (kind === "success") return JSON.stringify({ type: "script", name: "Antd/Live/Alert", scriptUri: componentUri("Alert"), width: 472, height: 92, inputs: { title: "预跑成功 · 命中 12,340 人", description: "已生成 Top100 脱敏样本，可返回页面保存 SQL 或上线。", type: "success", showIcon: true, variant: "outlined" } });
  return JSON.stringify({ type: "script", name: "Antd/Live/Alert", scriptUri: componentUri("Alert"), width: 472, height: 92, inputs: { title: "预跑失败", description: "第 4 行：app_source 与当前 TACO 上下文不一致，请修正后重试。", type: "error", showIcon: true, variant: "outlined" } });
};

const modalFrame = (name, x, y, kind, inputs = {}) => {
  const root = frame(name, { width: 680, height: 480, fill: T.bg, clip: true }, [
    live("Modal", 680, 480, {
      title: inputs.title,
      children: modalChildren(kind),
      open: true,
      width: 520,
      centered: true,
      closable: true,
      mask: true,
      okText: inputs.okText || "确定",
      cancelText: inputs.cancelText || "取消",
      confirmLoading: !!inputs.confirmLoading,
      loading: false,
      footer: inputs.footer !== false,
      showPageContext: true,
    }, { state: kind }),
  ]);
  root.x = x; root.y = y; root.placeholder = false; root.metadata = { type: "prototype-state", component: "Modal", requirement: "REQ075", state: kind };
  return root;
};

const notes = frame("99 · Handoff Notes", { width: 1440, height: 900, fill: T.bg, padding: 48, gap: 20, clip: true }, [
  text("实现交接说明", { fontSize: 28, fontWeight: "600" }),
  alert("info", "组件与模板契约", "页面外壳来自 antd-6.lib 的 Admin App Shell；交互控件均为 Antd/Live Script 实例。", 1344),
  section("React 结构建议", [
    text("AudienceLayout → AudienceListPage / RegularAudienceSqlPage / OneTimeAudienceSqlPage / AudienceDetailPage", { fontSize: 15, fontWeight: "600", width: "fill_container" }),
    text("AudienceDetailPage → OverviewTab / MembersTab / SelectionRecordsTab / RefreshRecordsTab / ApplicationRecordsTab", { fontSize: 14, width: "fill_container" }),
    text("PrerunModal → running / success / error；BasicInfoModal → invalid / submitting", { fontSize: 14, width: "fill_container" }),
  ]),
  section("关键 Props", [
    text("Table: columns / dataSource / scroll.x / loading / locale.emptyText；操作列 fixed: right", { width: "fill_container" }),
    text("Form controls: status / disabled / value；Button: type / danger / loading / disabled", { width: "fill_container" }),
    text("Modal: open / confirmLoading / footer；Tabs: activeKey；Tag: color；Pagination: total / pageSize", { width: "fill_container" }),
  ]),
  section("Runtime-only", [
    text("SQL 校验与预跑请求、保存 / 上线、toast、路由跳转、下载导出、权限鉴权、焦点返回、定时刷新均为 runtime-only。", { width: "fill_container" }),
    text("原型只定义有限视觉状态；服务端错误码、真实数据量、下载地址和审计落库由实现层提供。", { width: "fill_container", fill: T.secondary }),
  ]),
  section("不支持 / 未交付", [
    text("P1：维度圈选、AI 翻译/优化、数据观测；P2：画像、标签、分析型客群；均未在本原型中伪装实现。", { width: "fill_container" }),
  ]),
]);
notes.x = 7600; notes.y = 2100; notes.metadata = { type: "handoff-note", requirement: "REQ075", antdVersion: "6.6.4" };

const anchorIds = ["antd-icon-live-origin", "DQZzq", "DAA17", "b0w4Mx", "puR2r", "Y9L6l"];
const anchors = anchorIds.map((anchorId) => {
  const node = findNode({ children: library.children }, (candidate) => candidate.id === anchorId);
  if (!node) throw new Error(`Required library anchor not found: ${anchorId}`);
  const copy = structuredClone(node);
  copy.x = 0;
  copy.y = 0;
  if (copy.scriptUri) copy.scriptUri = componentUri(copy.scriptUri.split("/").at(-1).replace(/\.js$/, ""));
  return copy;
});
const anchorFrame = {
  type: "frame",
  id: "library-anchors",
  name: "Library Anchors · antd-6.lib",
  x: -40000,
  y: 0,
  width: 400,
  height: 400,
  layout: "vertical",
  gap: 16,
  children: anchors,
  metadata: { type: "library-anchors", source: "antd-6.lib.pen", antdVersion: "6.6.4" },
};

const children = [
  anchorFrame,
  cover,
  cloneShell("01 · 客群列表", 1520, 0, 1440, 900, listContent, { selectedKey: "audience-list", crumb: "客群列表" }),
  cloneShell("02 · 常规客群 SQL 圈选", 3040, 0, 1440, 1120, sqlContent("常规"), { selectedKey: "audience-builder", crumb: "新建常规客群" }),
  cloneShell("03 · 一次性客群建群", 4560, 0, 1440, 1120, sqlContent("一次性"), { selectedKey: "audience-builder", crumb: "新建一次性客群" }),
  cloneShell("04 · 客群详情 / 概览", 0, 1220, 1440, 900, overviewContent, { selectedKey: "audience-list", crumb: "客群详情" }),
  cloneShell("05 · 客群详情 / 成员", 1520, 1220, 1440, 900, membersContent, { selectedKey: "audience-list", crumb: "成员" }),
  cloneShell("06 · 客群详情 / 圈选记录", 3040, 1220, 1440, 900, recordPage("selection", "圈选记录", selectionColumns, selectionRows, "记录每次上线、重新圈选和手动圈选"), { selectedKey: "audience-list", crumb: "圈选记录" }),
  cloneShell("07 · 客群详情 / 刷新记录", 4560, 1220, 1440, 900, recordPage("refresh", "刷新记录", refreshColumns, refreshRows, "常规客群 T+1 刷新记录；0 人结果合法但会告警"), { selectedKey: "audience-list", crumb: "刷新记录" }),
  cloneShell("08 · 客群详情 / 应用记录", 6080, 1220, 1440, 900, recordPage("application", "应用记录", applicationColumns, applicationRows, "仅启用客群可被营销活动与触达系统消费"), { selectedKey: "audience-list", crumb: "应用记录" }),
  cloneShell("09 · 客群列表 / 状态检查", 6080, 0, 1440, 900, statesContent, { selectedKey: "audience-list", crumb: "关键状态" }),
  cloneShell("10 · 客群列表 / 760px", 0, 2200, 760, 900, compactContent, { selectedKey: "audience-list", crumb: "客群列表", compact: true }),
  modalFrame("11 · 新建客群基本信息", 840, 2200, "basic", { title: "新建一次性客群 · 基本信息", okText: "确认并继续" }),
  modalFrame("12 · SQL 预跑进行中", 1600, 2200, "running", { title: "SQL 预跑", footer: false }),
  modalFrame("13 · SQL 预跑成功", 2360, 2200, "success", { title: "SQL 预跑", okText: "返回并继续" }),
  modalFrame("14 · SQL 预跑失败", 3120, 2200, "error", { title: "SQL 预跑", okText: "返回修改" }),
  notes,
];

const doc = {
  version: "2.18",
  themes: { mode: ["light", "dark"], density: ["regular", "compact"] },
  imports: { antd: sharedLibrary },
  variables: {
    "antd-colorPrimary": { type: "color", value: "#1677FF" },
    "antd-colorText": { type: "color", value: "#000000E0" },
    "antd-colorTextSecondary": { type: "color", value: "#000000A6" },
    "antd-colorTextTertiary": { type: "color", value: "#00000073" },
    "antd-colorBorder": { type: "color", value: "#D9D9D9" },
    "antd-colorSplit": { type: "color", value: "#F0F0F0" },
    "antd-colorBgLayout": { type: "color", value: "#F5F5F5" },
    "antd-colorBgContainer": { type: "color", value: "#FFFFFF" },
    "antd-colorSuccess": { type: "color", value: "#52C41A" },
    "antd-colorWarning": { type: "color", value: "#FAAD14" },
    "antd-colorError": { type: "color", value: "#FF4D4F" },
    "antd-colorInfoBg": { type: "color", value: "#E6F4FF" }
  },
  children,
};

await writeFile(outputPath, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ ok: true, outputPath, screens: children.filter((node) => node.x > -10000).length, nodes: seq, imports: doc.imports }, null, 2));
