import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

// A miniature Kit: two page templates, one shell template whose content slot is
// an instance override, one drawer template, and two components. Enough to
// exercise catalog parsing, plan validation and frame building without the
// multi-megabyte production library.

const boardText = (id, name, content) => ({ type: "text", id, name, content });

const shellBoard = {
  id: "BOARD_SHELL",
  type: "frame",
  name: "App Shell · 后台应用模板",
  children: [
    boardText("sh1", "Description · 模板描述", "Shared shell for standalone admin apps."),
    boardText("sh2", "适用场景内容", "A full host shell is required"),
    { id: "shn", type: "note", name: "Note · Brand Area" },
    {
      id: "FRAME_SHELL",
      type: "frame",
      name: "Frame · Admin App Shell",
      width: 1440,
      height: 900,
      context: "prototype-template; pattern=admin-app-shell; viewport=desktop; resolution=1440x900",
      children: [
        {
          type: "ref",
          id: "SHELL_CONTENT_REF",
          ref: "C_LAYOUT",
          name: "Layout.Content · Page Content",
          width: "fill_container",
          height: "fill_container",
          descendants: {
            LAYOUT_INNER: {
              id: "CONTENT_PADDING",
              type: "frame",
              name: "Content Padding · Fixed 16px",
              width: "fill_container",
              height: "fill_container",
              layout: "vertical",
              padding: 16,
              children: [
                {
                  id: "SLOT_BODY",
                  type: "frame",
                  name: "页面内容容器占位 · 可替换",
                  width: "fill_container",
                  height: "fill_container",
                  context: "生成页面时替换此容器；保留外层 16px 内容间距。",
                },
              ],
            },
          },
        },
      ],
    },
  ],
};

const splitBoard = {
  id: "BOARD_SPLIT",
  type: "frame",
  name: "Split Tabs Page · 左右分栏多 Tab 模板",
  children: [
    boardText("sp1", "Description · 模板描述", "Catalog, tabs, filters and table."),
    boardText("sp2", "适用场景内容", "A persistent catalog drives multiple workspaces"),
    { id: "spn", type: "note", name: "Note · Module Catalog" },
    {
      id: "FRAME_SPLIT",
      type: "frame",
      name: "Frame · Split Tabs",
      width: 1200,
      height: 800,
      context: "prototype-template; pattern=split-tabs; viewport=desktop; resolution=1200x800",
      children: [
        { id: "SPLIT_ASIDE", type: "frame", name: "aside", width: 290 },
        { type: "ref", id: "SPLIT_TABLE", ref: "C_TABLE", name: "Table · Configs" },
      ],
    },
  ],
};

const drawerBoard = {
  id: "BOARD_DRAWER",
  type: "frame",
  name: "Drawer Form · 抽屉表单模板",
  children: [
    boardText("dr1", "Description · 模板描述", "Create or edit a record in context."),
    boardText("dr2", "适用场景内容", "Creating or editing a complex record in context"),
    {
      id: "FRAME_DRAWER",
      type: "frame",
      name: "Frame · Drawer Form",
      width: 1600,
      height: 900,
      context: "prototype-template; pattern=drawer-form; viewport=desktop; resolution=1600x900",
      children: [
        { id: "DRAWER_MASK", type: "frame", name: "mask", width: 1600, height: 900 },
        { id: "DRAWER_BODY", type: "frame", name: "Drawer · Form", width: 760, height: 900 },
      ],
    },
  ],
};

const templates = {
  version: "2.18",
  children: [{
    id: "layer-templates-pages",
    type: "frame",
    name: "Templates & Pages",
    children: [shellBoard, splitBoard, drawerBoard],
  }],
};

const library = {
  version: "2.18",
  themes: { mode: ["light", "dark"], density: ["regular", "compact"] },
  variables: { "antd-colorText": { type: "color", value: "#000000E0" } },
  children: [
    { id: "C_TABLE", type: "script", name: "Table", reusable: true, scriptUri: "../canvas-components/Table.js" },
    { id: "C_ORIGIN", type: "script", name: "IconOrigin" },
    { id: "C_LAYOUT", type: "script", name: "Layout", reusable: true },
  ],
};

const components = {
  library: "antd",
  version: "6",
  components: {
    Table: { name: "Table", category: "Data Display" },
    Layout: { name: "Layout", category: "Layout" },
  },
};

export async function kitFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "pen-kit-"));
  await mkdir(resolve(root, "libraries"), { recursive: true });
  await mkdir(resolve(root, "registry"), { recursive: true });
  await writeFile(resolve(root, "libraries/antd-6.lib.pen"), JSON.stringify(library));
  await writeFile(resolve(root, "libraries/templates.pen"), JSON.stringify(templates));
  await writeFile(resolve(root, "registry/components.json"), JSON.stringify(components));
  await mkdir(resolve(root, "canvas-components"), { recursive: true });
  await writeFile(resolve(root, "canvas-components/Table.js"), "export const table = { ref: 'C_ORIGIN' };\n");
  return root;
}

export function fixturePlan(overrides = {}) {
  return {
    version: 1,
    title: "Fixture plan",
    source: "fixture requirement",
    assumptions: ["fixture"],
    modules: [
      {
        id: "config.list",
        kind: "page",
        title: "配置列表",
        goal: "按模块定位配置项",
        requirementRefs: ["F-01"],
        template: { outer: "admin-app-shell", inner: "split-tabs", slot: "页面内容容器占位" },
        structure: [
          { role: "shell", label: "App Shell" },
          { role: "table", label: "配置列表" },
        ],
        components: ["Table"],
        states: ["default", "empty"],
      },
      {
        id: "config.edit-drawer",
        kind: "drawer",
        title: "编辑配置",
        goal: "在同一抽屉维护配置",
        template: "drawer-form",
        structure: [{ role: "overlay" }, { role: "form" }],
      },
      {
        id: "config.publish-confirm",
        kind: "modal",
        title: "发布确认",
        goal: "确认发布变更",
        custom: true,
        customReason: "Kit 目录暂无弹窗模板",
        structure: [{ role: "overlay" }, { role: "content" }, { role: "footer" }],
      },
    ],
    ...overrides,
  };
}
