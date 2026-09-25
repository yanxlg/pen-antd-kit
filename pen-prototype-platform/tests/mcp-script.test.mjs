import assert from "node:assert/strict";
import test from "node:test";
import { parseCreatedIds, renderInstancesScript, renderTemplateVerificationScript, runInstancesScript } from "../src/mcp-script.mjs";

const modules = [
  {
    id: "app-config.workspace",
    kind: "page",
    frameName: "Page · APP配置",
    template: "admin-app-shell",
    templateFrameId: "f4rW6H",
    templateNode: {
      id: "mod-app-config-workspace-1",
      type: "frame",
      name: "Page · APP配置",
      context: "module; id=app-config.workspace; template=admin-app-shell",
      x: 0,
      y: 0,
      width: 1440,
      height: 900,
      children: [{ id: "menu-1", type: "ref", ref: "antd:MENU" }, { id: "body-1", type: "frame", name: "Page Body" }],
    },
    innerFrameId: "l0UmSc",
    slotPath: "NDomC/TnhDk/CqDbZ/S2IEyj/N0FHv",
    x: 0,
    y: 0,
    width: 1440,
    height: 900,
    context: "module; id=app-config.workspace; kind=page; template=admin-app-shell; nested=split-tabs",
  },
  {
    id: "app-config.publish-confirm",
    kind: "modal",
    frameName: "Modal · 发布确认",
    placeholderLines: ["modal · Modal · 发布确认", "goal: 确认发布"],
    x: 4400,
    y: 2420,
    width: 720,
    height: 260,
    context: "module; id=app-config.publish-confirm; kind=modal; template=custom",
  },
];

test("the instantiate script builds one Frame per module through MCP", () => {
  const script = renderInstancesScript({ modules, planTitle: "REQ-084" });

  assert.match(script, /Insert\(document, \{"type":"frame","name":"Page · APP配置"/);
  assert.doesNotMatch(script, /mod-app-config-workspace-1/);
  assert.match(script, /Insert\(frameId, \{"type":"ref","ref":"antd:MENU","name":"ref"\}\)/);
  assert.match(script, /Insert\(frameId, \{"type":"frame","name":"Page Body"\}\)/);
  assert.doesNotMatch(script, /"ref":"antd:f4rW6H"/);
  assert.match(script, /Update\(frameId, \{placeholder:false\}\)/);
  assert.match(script, /Insert\(document, \{type:"frame",name:"Modal · 发布确认"/);
  assert.match(script, /created = \[\]/);
  assert.match(script, /created\.push\(frameId\)/);
});

test("the script clears the ids recorded by the previous run before recreating them", () => {
  const script = renderInstancesScript({ modules, planTitle: "REQ-084", previousIds: ["abc", "def"] });

  assert.ok(script.indexOf("Delete(id)") < script.indexOf("Insert(document"), "cleanup runs before creation");
  assert.match(script, /const previous = \["abc","def"\]/);
  assert.match(script, /Print\('created-ids:' \+ JSON.stringify\(created\)\)/);
});

test("created ids can be read back from the execute output", () => {
  assert.deepEqual(parseCreatedIds("created-ids:[\"a1\",\"b2\"]\ninstances: done"), ["a1", "b2"]);
  assert.deepEqual(parseCreatedIds("no marker here"), []);
});

test("an empty plan still renders a valid snippet", () => {
  const script = renderInstancesScript({ modules: [], planTitle: "empty" });
  assert.match(script, /Print\("instances: 0 modules from empty"\)/);
  assert.equal(script.includes("Copy("), false);
});

test("verification checks copied template Frames and imported child refs", () => {
  const script = renderTemplateVerificationScript({ modules, ids: ["shell-1", "modal-1"] });
  assert.match(script, /Get\(check\.id, \{depth:0\}\)/);
  assert.match(script, /node\?\.type !== "frame"/);
  assert.match(script, /Missing imported component/);
  assert.match(script, /antd:MENU/);
  assert.doesNotMatch(script, /antd:f4rW6H/);
  assert.throws(() => renderTemplateVerificationScript({ modules, ids: [] }), /created id/);
});

test("MCP generation verifies template identity and rejects tool errors", async () => {
  const calls = [];
  const result = await runInstancesScript({
    target: "/tmp/prototype.pen",
    modules: [modules[0]],
    planTitle: "REQ-084",
    callPenTool: async ({ args }) => {
      calls.push(args.input);
      return { text: calls.length === 1 ? 'OK\ncreated-ids:["shell-1"]' : 'OK\nverified-template-ids:["shell-1"]' };
    },
  });
  assert.deepEqual(result.createdIds, ["shell-1"]);
  assert.deepEqual(result.errors, []);
  assert.equal(calls.length, 2);
  assert.match(calls[1], /Template Frame mismatch/);

  const failed = await runInstancesScript({
    target: "/tmp/prototype.pen",
    modules: [modules[0]],
    callPenTool: async () => ({ text: "tool call error", isError: true }),
  });
  assert.equal(failed.createdIds.length, 0);
  assert.match(failed.errors[0], /tool call error/);
});
