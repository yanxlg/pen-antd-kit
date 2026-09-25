import { extname } from "node:path";

const patternRules = [
  { id: "list-page", terms: ["list", "table", "列表", "表格", "管理"] },
  { id: "detail-page", terms: ["detail", "profile", "详情", "档案"] },
  { id: "form-page", terms: ["form", "wizard", "表单", "申请", "创建", "编辑"] },
  { id: "dashboard", terms: ["dashboard", "metrics", "监控", "大盘", "看板"] },
  { id: "settings-page", terms: ["settings", "preference", "设置", "配置"] },
];

function inputKind(path) {
  const extension = extname(path || "").toLowerCase();
  if ([".md", ".mdx"].includes(extension)) return "markdown";
  if ([".html", ".htm"].includes(extension)) return "html";
  if (extension === ".pen") return "pen";
  return "requirements";
}

export function resolveContext({ input = "", prompt = "" }) {
  const kind = inputKind(input);
  const workflow = kind === "pen" ? "revise" : "create";
  const text = `${input} ${prompt}`.toLowerCase();
  const pattern = patternRules
    .map((rule) => ({ ...rule, score: rule.terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0) }))
    .sort((left, right) => right.score - left.score)[0];
  const patternId = pattern?.score > 0 ? pattern.id : "list-page";
  const standardByPattern = {
    "list-page": ["patterns/list-query.md"],
    "detail-page": ["patterns/forms-overlays.md"],
    "form-page": ["patterns/forms-overlays.md"],
    dashboard: [],
    "settings-page": ["patterns/list-query.md", "patterns/forms-overlays.md"],
  };
  const routedStandards = new Set(standardByPattern[patternId] || []);
  if (/list|table|列表|表格|清单|管理/.test(text)) routedStandards.add("patterns/list-query.md");
  if (/form|create|edit|detail|表单|创建|新建|编辑|详情|抽屉|弹窗/.test(text)) {
    routedStandards.add("patterns/forms-overlays.md");
  }

  return {
    workflow,
    inputKind: kind,
    pattern: patternId,
    mustRead: [
      "library-preflight.md",
      `workflows/${workflow}.md`,
      "workflows/decompose-modules.md",
      "workflows/select-templates.md",
      `inputs/${kind}.md`,
      `patterns/${patternId}.md`,
      "quality/states.md",
      "quality/visual-review.md",
      "pen-mcp-runtime.md",
    ],
    optionalRead: ["quality/layout.md", "handoff.md"],
    standardsRoot: "../standards",
    standardsMustRead: [
      "index.md",
      "patterns/module-decomposition.md",
      "patterns/template-composition.md",
      "foundations/environment-layout.md",
      ...routedStandards,
      "states/feedback-permissions.md",
      "quality/review-checklist.md",
    ],
  };
}
