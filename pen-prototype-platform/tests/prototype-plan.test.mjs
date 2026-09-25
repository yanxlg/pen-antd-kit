import assert from "node:assert/strict";
import test from "node:test";
import { fixturePlan, kitFixture } from "./kit-fixture.mjs";
import { renderPlanDigest, validatePlan } from "../src/prototype-plan.mjs";

test("a plan that binds catalog templates and declares every module passes", async () => {
  const kitRoot = await kitFixture();
  const result = await validatePlan({ plan: fixturePlan(), kitRoot, library: "import" });

  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.summary.modules, 3);
  assert.deepEqual(result.summary.byKind, { page: 1, drawer: 1, modal: 1 });
  assert.deepEqual(result.summary.templates.sort(), ["admin-app-shell", "drawer-form", "split-tabs"]);
  assert.deepEqual(result.summary.custom, ["config.publish-confirm"]);

  const page = result.modules.find((module) => module.id === "config.list");
  assert.equal(page.template.frameId, "FRAME_SHELL");
  assert.equal(page.nested.pattern, "split-tabs");
  assert.equal(page.slot.id, "SLOT_BODY");
  assert.ok(page.slot.path, "the imported shell slot path is available to MCP Replace");
  assert.equal(page.frameName, "Page · 配置列表");
});

test("digest records template bindings, structures and validation state", async () => {
  const kitRoot = await kitFixture();
  const plan = fixturePlan();
  const digest = renderPlanDigest(plan, await validatePlan({ plan, kitRoot }));

  assert.match(digest, /## config\.edit-drawer · drawer · 编辑配置/);
  assert.match(digest, /template: drawer-form \(board BOARD_DRAWER, frame FRAME_DRAWER, 1600x900\)/);
  assert.match(digest, /nested: split-tabs \(frame FRAME_SPLIT\) into slot 页面内容容器占位 · 可替换/);
  assert.match(digest, /custom — Kit 目录暂无弹窗模板/);
  assert.match(digest, /## validation: passed/);
});

test("unknown templates, mismatched kinds and missing slots are rejected", async () => {
  const kitRoot = await kitFixture();

  const unknown = await validatePlan({
    plan: fixturePlan({ modules: [{ ...fixturePlan().modules[1], template: "does-not-exist" }] }),
    kitRoot,
  });
  assert.equal(unknown.ok, false);
  assert.ok(unknown.errors.some((error) => error.code === "TEMPLATE_UNKNOWN"));

  const mismatched = await validatePlan({
    plan: fixturePlan({ modules: [{ ...fixturePlan().modules[1], template: "split-tabs" }] }),
    kitRoot,
  });
  assert.equal(mismatched.ok, false);
  assert.ok(mismatched.errors.some((error) => error.code === "TEMPLATE_KIND"));

  const missingSlot = await validatePlan({
    plan: fixturePlan({
      modules: [{
        ...fixturePlan().modules[0],
        template: { outer: "admin-app-shell", inner: "split-tabs", slot: "不存在的槽位" },
      }],
    }),
    kitRoot,
  });
  assert.equal(missingSlot.ok, false);
  assert.ok(missingSlot.errors.some((error) => error.code === "TEMPLATE_SLOT"));
});

test("structure roles, components and custom reasons are enforced", async () => {
  const kitRoot = await kitFixture();
  const result = await validatePlan({
    plan: fixturePlan({
      modules: [
        {
          id: "config.list",
          kind: "page",
          title: "配置列表",
          goal: "按模块定位配置项",
          template: "split-tabs",
          structure: [{ role: "header" }],
          components: ["Table", "NotAComponent"],
        },
        { id: "config.publish-confirm", kind: "modal", title: "发布确认", goal: "确认发布", custom: true, structure: [{ role: "overlay" }] },
      ],
    }),
    kitRoot,
  });

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "COMPONENT_UNKNOWN"));
  assert.ok(result.errors.some((error) => error.code === "CUSTOM_REASON"));
});

test("unknown module kinds and structure roles are rejected", async () => {
  const kitRoot = await kitFixture();
  const result = await validatePlan({
    plan: fixturePlan({
      modules: [{
        id: "config.list",
        kind: "wizard",
        title: "配置列表",
        goal: "按模块定位配置项",
        template: "split-tabs",
        structure: [{ role: "floating-toolbar" }],
      }],
    }),
    kitRoot,
  });

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "MODULE_KIND"));
  assert.ok(result.errors.some((error) => error.code === "MODULE_STRUCTURE_ROLE"));
});
