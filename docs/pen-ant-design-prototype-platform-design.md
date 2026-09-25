# Pen Ant Design 标准原型生成平台设计方案

状态：方案评审稿  
目标设计环境：Pen（pen.dev/Pencil）  
适用范围：`pen-antd-kit`、Pen 产品原型生成、原型校验与交付  
目标读者：设计系统维护者、原型平台维护者、Agent/Skill 维护者、发布负责人

## 1. 决策摘要

本项目面向 Pen（pen.dev/Pencil）设计环境，采用厂商无关的 `CLI + Kit Release + Bootstrap Skill + Pen 官方 MCP` 架构。

- Pen `.pen` Library 是组件、Pattern 和页面模板 UI 的设计资产源。
- 页面模板只维护 UI，不维护对应页面代码。
- CLI 是所有 Agent、普通终端和 CI 共用的确定性执行入口。
- Bootstrap Skill 只负责触发和调用 CLI，不承载高频变化的组件知识与设计规范。
- Pen MCP 使用 Pen 官方提供的能力，本项目不建设或发布自有 Pen MCP Server。
- 高频变化的 Library、Registry、模板目录、Token 和规则作为不可变 Kit Release 发布。
- 新任务自动使用最新稳定 Kit；已有原型锁定生成版本，不被后台升级静默改写。

用户只需完成一次安装。日常资产升级由稳定渠道、缓存、完整性校验和自动回退机制处理。

## 2. 背景与问题

系统需要根据 Markdown 需求、原型 HTML 或 Pen 草图生成标准 Ant Design 原型，并对原型的组件、模板、布局、状态和交互完整性进行验证。

长期运营面临以下问题：

- 组件、模板、规范和 Ant Design 本身会持续升级。
- 使用者可能来自 Codex、Claude Code、Cursor、Gemini CLI 或普通终端环境。
- 不同 Agent 对 Skill、Rules、MCP 和插件的支持并不一致。
- 静默升级不能破坏已有原型的可复现性。
- 质量不能依赖单次模型生成效果或一份越来越长的 `SKILL.md`。

因此，运行核心必须独立于具体 Agent 厂商，并将设计资产、执行逻辑、工作流说明和发布渠道分离。

## 3. 目标与非目标

### 3.1 目标

- 为多种需求输入提供统一的标准原型生成流程。
- 保证标准控件来自 Ant Design Library，而不是任意手绘近似。
- 在 `.pen` 中维护完整的组件、Pattern 和模板 UI 资产。
- 让 Agent、原型维护者和 CI 使用同一套 CLI 与质量规则。
- 支持新任务无感获取稳定资产，同时保证历史任务可复现。
- 通过 PrototypePlan 保留输入理解、模板选择和原型生成决策，支持复现与审计。
- 允许公司规范和项目规范在官方规范之上扩展，升级时不覆盖定制内容。

### 3.2 非目标

- 不建设自有 Pen MCP Server。
- 不包含 Design to Code、UIAppSpec、React 生成或前端开发规范。
- 不为页面模板维护对应代码。
- 不承诺将任意自由绘制的 Pen 画布直接规范化；无法识别的部分必须进入人工确认。
- 不让所有资产每次运行都追随未验证的 `latest`。
- 不在后台静默修改已有 `.pen` 原型。

## 4. 核心设计原则

### 4.1 厂商无关

最低公共能力定义为：

```text
文件 + CLI + JSON Schema + 可选 MCP
```

Skill、Rules、Plugin 等都是宿主适配层，不是运行核心。

### 4.2 模板用于初始化

模板负责提供标准页面结构、默认状态和设计建议。模板被实例化后，后续修改以当前需求和原型内容为准，不要求继续保持与原始模板完全一致。

### 4.3 设计资产与执行逻辑分离

- Kit 保存 `.pen`、Registry、Token、状态矩阵和规则。
- Runtime 负责解析、校验、迁移和生成。
- Skill 负责让 Agent 知道何时调用以及如何交付。

### 4.4 不可变发布

已经发布的 Release 不允许被覆盖。修复问题必须发布新版本，并通过渠道指针切换。

### 4.5 新任务升级，旧任务锁定

新任务使用当前 `stable`；已有任务读取自身 Manifest 中的精确版本。只有通过兼容性检查和质量验证后，旧任务才能迁移。

### 4.6 自动化质量门禁

所有进入 `stable` 的 Kit 必须通过结构、组件、状态、视觉和真实任务评测。发布成功不能仅由构建命令退出码决定。

## 5. 总体架构

```text
Markdown / HTML / Pen 草图
             │
             ▼
      Agent 或普通用户
             │
      Bootstrap Skill（可选）
             │
             ▼
        pen-antd Launcher
             │
      解析 stable / lock
             │
       ┌─────┴─────────┐
       ▼               ▼
  Runtime Release    Kit Release
  解析/校验/生成      Library/Registry/Rules
       │               │
       └──────┬────────┘
              ▼
        Pen 官方 MCP
              │
              ▼
        工程化 `.pen` 原型
              │
              ▼
        校验报告与交付说明
```

Pen MCP 只承担打开文档、加载 Library、创建和修改节点、读取 metadata、截图与导出等 Pen 操作。版本解析、资源下载、模板搜索、规范判断、质量检查和迁移由 CLI 负责。

## 6. 资产模型

### 6.1 Component

Ant Design 原子组件及其子组件，例如 Button、Table、Form、Drawer。每个组件具有稳定组件 ID、版本、Props、状态和 Token 信息。

### 6.2 Pattern

可复用的局部业务组合，例如：

- 查询筛选区
- 页面操作栏
- 查询表格
- 描述详情区
- 分步表单
- 危险操作确认

Pattern 使用 Component instance 组合，不复制组件实现。

### 6.3 Template

完整页面初始结构，例如：

- 用户管理
- Dashboard
- 设置页
- 登录与注册
- 分步申请
- 结果页

模板仅维护 UI、状态和语义 metadata。

模板可以从真实页面导入以获得布局、尺寸、内容和视觉基线。组件化不得重构或重新设计页面：导入后的层级、间距、对齐、宽高、文案和状态必须保持不变，只在原位置把 App Shell、Layout、Menu、Breadcrumb、Tabs、Form、输入控件、Button、Table、Pagination、Drawer、Modal 等标准控件替换为 Library 中对应的 Component instance。承载原页面结构的 `div`、`section`、`aside`、`nav` 等布局容器可以保留为 Frame；无法映射为标准组件的业务结构和文字可以保留为 Frame/Text。

浮层模板以完整正常页面作为容器和底层页面，并在同一页面中展示 `open: true` 的 Drawer 或 Modal；必须保留半透明 Mask 和真实打开状态，不能只展示孤立的弹窗或右侧面板。底层页面优先复用对应页面模板实例，表单、描述列表、状态标签、数据表格和操作按钮继续在原位置使用独立组件实例。

每个模板的可见标题必须追加实际画布分辨率，格式为 `Template Name · WIDTH × HEIGHT`；模板节点同时通过 metadata 的 `resolution.width`、`resolution.height` 或等价的机器可读 context 保存相同尺寸。内置桌面模板统一为 `1920×1080`；原型页面根节点固定宽度 `1920`、最小高度 `1080`，内容超出时仅增高。不得创建或交付窄屏页面／响应式状态。后续原型生成按 metadata、context、标题的顺序校验该分辨率，不得按画布缩放后的视觉大小推断分辨率。

Drawer、Modal 等浮层页面的头部、正文和底部操作区必须完整落在模板分辨率定义的视口内。内容超出视口时只裁切或滚动正文区域，底部操作区保持可见，不得通过裁掉底部区域来适配分辨率。

模板中的 Ant Design 组件默认使用官方默认尺寸，即不显式设置 `size`。只有需求明确要求紧凑、大尺寸或指定组件尺寸时，才设置对应的 `size`；不得为了塞入现有布局而擅自改成 `small`。

表格的操作列必须固定在右侧，列配置统一使用 `fixed: "right"`；横向滚动时操作入口应始终可见。

模板说明区统一使用英文，并按 Title、Description、Use when、Includes、Frame 的顺序左对齐。Sticky Note 放在目标 Frame 右侧并尽量靠近目标，每条只描述一个功能，采用“短标题 + 一句说明”的紧凑结构；必须覆盖模板的主要功能区域。若 Sticky Note 存在固定最小高度，不通过缩小 `height` 强行压缩，而应使用两列排列，并保证相邻行至少保留 20px 间距。关联线使用水平和垂直线段组成的直角折线，不使用斜线，也不得穿过说明文字或相邻 Note。

模板根节点至少包含：

```json
{
  "assetType": "template",
  "templateId": "page.user-management",
  "category": "management",
  "capabilities": [
    "filter-form",
    "data-table",
    "pagination",
    "create-drawer"
  ],
  "states": [
    "default",
    "loading",
    "empty",
    "error",
    "permission-denied"
  ]
}
```

### 6.4 PrototypePlan

PrototypePlan 是需求理解到 Pen 原型之间的可复现生成计划，包括：

- 输入来源及其摘要
- 页面与页面间关系
- 模板或 Pattern 选择
- 组件树和稳定节点 ID
- Props、Slot 和布局语义
- 表单字段和表格列
- 用户动作和交互状态
- 权限、空态、异常态和加载态
- 响应式目标
- Token 引用
- 需要人工确认的歧义和自由绘制内容

PrototypePlan 用于驱动 Pen 原型生成、增量修改和质量检查，不承担后续代码开发契约。

## 7. 完整产物清单

### 7.1 平台源产物

| 产物 | 推荐路径/名称 | 主要内容 | 是否运行时必需 |
| --- | --- | --- | --- |
| Canonical Pen Library | `libraries/antd-6.lib.pen` | Components、Patterns、Templates & Pages、Token 展示 | 是 |
| Canvas Runtime | `canvas-components/*.js` | Pen Live Script 组件实现 | 是 |
| Component Registry | `registry/components.json` | 组件身份、分类、来源、基础契约 | 是 |
| Props Registry | `registry/props.antd-<version>.json` | 精确 Props、类型、默认值、废弃信息 | 是 |
| Inspector Registry | `registry/inspector.antd-<version>.json` | Pen Inspector 控件协议 | 是 |
| State Matrix | `registry/state-matrix.antd-<version>.json` | 组件关键状态和验证案例 | 是 |
| Template Registry | `registry/templates.json` | 从 `.pen` 自动提取的模板目录与能力标签 | 是 |
| Token Registry | `registry/tokens.json` | 全局、语义和组件 Token | 是 |
| Ruleset | `rules/*.json` 或 `rules/*.md` | 组件选择、布局、状态、交付和质量规则 | 是 |
| Schema | `schemas/*.schema.json` | Manifest、Registry、PrototypePlan 等格式 | 是 |
| Bootstrap Skill | `skills/antd-prototype/SKILL.md` | 稳定触发说明和 CLI 入口 | Agent 使用时必需 |
| Host Adapters | `integrations/<client>/` | 不同 Agent 的路径、工具名和配置适配 | 按客户端需要 |
| Launcher | `pen-antd` | Release 解析、下载、校验、缓存、切换和回退 | 是 |
| Runtime | `runtime/<version>/` | 输入解析、模板选择、生成、校验、迁移、Spec 提取 | 是 |
| Evals | `evals/` | 真实需求、期望结果和评分标准 | 发布门禁必需 |
| Visual Baselines | `visual-baselines/` | 组件、Pattern、模板截图基线 | 发布门禁必需 |
| Release Manifest | `release.json` | Release 版本、兼容性、文件哈希和质量状态 | 是 |
| Channel Manifest | `channels/stable.json`、`canary.json` | 渠道当前指向的 Release | 是 |
| Changelog | `CHANGELOG.md` 或 Release Notes | 当前变化、迁移影响和已知问题 | 运维必需 |

### 7.2 单次任务交付产物

| 产物 | 必选 | 职责 |
| --- | --- | --- |
| `prototype.pen` | 是 | 可继续编辑的工程化原型 |
| `prototype.manifest.json` | 是 | 锁定 Kit、Runtime、Antd、Schema 和生成来源 |
| `prototype-plan.json` | 是 | 记录输入理解、模板选择、页面结构、状态和生成决策 |
| `handoff.md` | 是 | 页面、组件、状态、交互、原型边界和已知限制说明 |
| `validation-report.json` | 是 | 结构、状态、Token、实例和兼容性结果 |
| `screenshots/` | 建议 | 关键页面和状态预览 |

## 8. 模块职责

| 模块 | 负责 | 不负责 |
| --- | --- | --- |
| Pen 官方 MCP | 操作文档、Library、节点、metadata、截图和导出 | 版本解析、资产发布、模板选择、规范判断 |
| Bootstrap Skill | 识别任务、调用 `pen-antd resolve`、读取返回工作流、要求最终校验 | 保存完整组件知识、下载资产、执行迁移 |
| Host Adapter | 把通用 Skill 安装到特定 Agent；适配工具名和目录 | 复制业务规范、实现生成逻辑 |
| Launcher | 检查渠道、下载 Runtime/Kit、校验完整性、缓存、切换和回退 | 设计页面、调用具体组件生成策略 |
| Runtime | 输入解析、模板匹配、生成计划、Registry 查询、校验、迁移和 Spec 提取 | 保存 Canonical Library |
| Kit Release | 提供某一时刻完整、兼容、通过验证的设计资产集合 | 动态执行逻辑 |
| Component Registry | 描述组件身份、Props、状态、Token 和来源 | 保存页面布局实例 |
| Template Registry | 描述模板 ID、能力、适用场景、节点位置和状态覆盖 | 执行模板实例化 |
| Ruleset | 描述当前设计和交付规范 | 执行 Pen 操作 |
| PrototypePlan | 记录需求理解、资产选择、页面结构和待确认项 | 替代最终 `.pen` 原型 |
| CI Pipeline | 构建、验证、发布 canary、灰度和晋级 stable | 修改用户历史原型 |
| 项目 Override | 承载公司或项目定制规则 | 修改官方 Release 内容 |

## 9. 维护角色职责

| 角色 | 主要职责 |
| --- | --- |
| 设计系统维护者 | Component、Pattern、Template、Token、视觉基线和设计规范 |
| 原型平台维护者 | Launcher、Runtime、Schema、生成器、校验器和运行时质量 |
| Agent 工作流维护者 | Bootstrap Skill、输入策略、工具编排和 Agent eval |
| Release Owner | 版本、兼容性、渠道晋级、回滚和变更记录 |
| 业务使用者 | 提供需求、确认歧义和验收原型，不承担平台升级 |

## 10. 发布目标

### 10.1 Git 仓库

保存所有源码和可评审规范：

```text
pen-antd-kit/
├── packages/
│   ├── launcher/
│   └── runtime/
├── skills/
├── integrations/
├── libraries/
├── canvas-components/
├── registry/
├── schemas/
├── rules/
├── scripts/
├── evals/
└── visual-baselines/
```

大型 `.pen` 可以使用 Git LFS。每次 `.pen` 变更必须同时生成可读 Registry 和截图报告，避免评审只依赖巨型 JSON diff。

### 10.2 私有 npm 或独立二进制发布

发布：

```text
@company/pen-antd
```

包含 Launcher、安装器和必要的宿主适配。公司没有私有 npm 时，可以使用 GitHub Packages、GitLab Package Registry、Artifactory 或 Nexus。需要覆盖无 Node 环境时，再发布 macOS、Windows 和 Linux 独立二进制。

### 10.3 对象存储或制品库

发布不可变 Runtime 和 Kit：

```text
https://assets.company.net/pen-antd/
├── channels/
│   ├── stable.json
│   └── canary.json
├── runtimes/
│   └── 1.4.2/
│       ├── runtime.tgz
│       └── checksums.json
└── kits/
    └── 1.8.1/
        ├── release.json
        ├── kit.tgz
        └── checksums.json
```

可选实现包括 OSS、S3、Artifactory、Nexus 或内部制品平台。对象必须支持不可变版本路径、访问控制和快速回滚渠道指针。

### 10.4 Skill 安装目标

Skill 不单独作为平台核心发布。`pen-antd setup --client <name>` 将同一份 Bootstrap Skill 安装或同步到宿主要求的位置。

```bash
pen-antd setup --client auto
pen-antd setup --client codex
pen-antd setup --client claude
pen-antd setup --client cursor
pen-antd setup --client generic
```

不支持 Skill 的环境仍可直接调用 CLI。

### 10.5 CI 和视觉测试平台

保存：

- 构建日志
- 结构验证报告
- 视觉差异报告
- Agent eval 结果
- 发布审批记录

这些产物用于追溯，不进入用户运行时 Kit；`release.json` 只记录对应 Build ID 和最终质量状态。

### 10.6 用户项目

用户生成的原型、PrototypePlan、Manifest、验证报告和截图发布到用户项目自身的仓库或制品空间，不上传到平台公共资产仓库。

## 11. 版本模型

| 版本 | 含义 | 变更频率 |
| --- | --- | --- |
| `launcherVersion` | 下载、校验、缓存与切换协议 | 极低 |
| `runtimeVersion` | 解析、生成、校验和迁移逻辑 | 中 |
| `kitVersion` | Library、Registry、模板、Token 和 Ruleset 集合 | 高 |
| `bootstrapVersion` | 稳定 Skill 入口协议 | 极低 |
| `schemaVersion` | Manifest、Registry、PrototypePlan 的破坏性格式版本 | 极低 |
| `antdVersion` | 目标 Ant Design 版本 | 按上游发布 |

初期不单独维护每个模板版本。模板随 Kit 整体发布，使用稳定 `templateId`。当模板需要独立团队和独立发布周期时，再引入 `templateVersion`。

任务 Manifest 示例：

```json
{
  "schemaVersion": 1,
  "generatedBy": {
    "launcherVersion": "1.0.0",
    "runtimeVersion": "1.4.2",
    "kitVersion": "1.8.1",
    "bootstrapVersion": "1.0.0",
    "antdVersion": "6.6.4"
  },
  "source": {
    "type": "markdown",
    "templateId": "page.user-management"
  }
}
```

## 12. Bootstrap 与升级设计

### 12.1 一次安装

```bash
npx @company/pen-antd setup --client auto
```

安装内容：

- 稳定 Launcher
- 极薄 Bootstrap Skill
- 对应宿主 Adapter
- 本地配置与缓存目录

### 12.2 Bootstrap Skill

Bootstrap Skill 只描述稳定协议：

1. 执行 `pen-antd resolve --format json`。
2. 读取命令返回的工作流、规则、Library 和 Registry 路径。
3. 通过 Pen MCP 执行原型操作。
4. 完成前执行 `pen-antd validate`。

组件新增、模板调整、Token 更新、状态补充和质量规则变化不需要修改 Bootstrap Skill。

### 12.3 日常解析流程

```text
检查本地 channel TTL
    │
    ├──未过期：使用本地缓存
    │
    └──已过期：读取 stable.json
                    │
                    ├──版本已缓存：直接使用
                    └──版本未缓存：下载 → 校验 → 自测 → 原子切换
```

失败时使用 Last Known Good，不阻塞用户。

### 12.4 本地布局

```text
~/.pen-antd/
├── config.json
├── runtimes/
│   ├── 1.4.1/
│   └── 1.4.2/
├── kits/
│   ├── 1.8.0/
│   └── 1.8.1/
├── integrations/
├── overrides/
└── current.json
```

### 12.5 Skill 同步

CLI 为托管 Skill 写入内容哈希：

```json
{
  "managedBy": "pen-antd",
  "bootstrapVersion": "1.0.0",
  "contentHash": "sha256:..."
}
```

- 本地文件未修改：可以安全原子更新。
- 本地文件被修改：不覆盖；保留原文件，并提示将定制迁移到 `overrides/`。
- 企业和项目规则只能放在 Override，不直接编辑托管 Skill。

## 13. 渠道与兼容策略

### 13.1 渠道

| 渠道 | 用途 | 使用者 |
| --- | --- | --- |
| `canary` | 新资产、Runtime 和规则灰度 | 维护团队、试点项目 |
| `stable` | 默认生产渠道 | 普通用户 |
| `legacy` | 保持旧 Schema 或旧 Antd 兼容 | 历史项目 |

### 13.2 升级规则

| 变更 | 新任务 | 已有任务 |
| --- | --- | --- |
| 新增模板/组件 | 自动使用 | 不变 |
| 文档和标签修正 | 自动使用 | 可安全读取 |
| 非破坏性视觉修复 | 自动使用 | 默认不改写，可选择迁移 |
| Props 语义变化 | 通过兼容层后使用 | 需要迁移检查 |
| 删除/重命名稳定 ID | 新 Major 或迁移规则 | 不自动升级 |
| Schema Major | 新渠道或显式迁移 | 锁定旧版 |
| Antd Major | 新 Kit 系列 | 不自动升级 |

### 13.3 Release Manifest

```json
{
  "kitVersion": "1.8.1",
  "antdVersion": "6.6.4",
  "schemaVersion": 1,
  "runtime": "^1.4.0",
  "bootstrap": ">=1.0.0",
  "files": {
    "library": {
      "path": "libraries/antd-6.lib.pen",
      "sha256": "..."
    }
  },
  "quality": {
    "status": "passed",
    "buildId": "build-2841"
  }
}
```

## 14. 质量保证体系

### 14.1 资产级门禁

- Component、Pattern、Template ID 唯一且稳定。
- 标准组件不存在手绘替代。
- 模板中的标准控件均为 Library instance。
- 组件引用无断链。
- Token 引用合法。
- Template Registry 与 `.pen` 实际节点一致。
- Canvas Runtime、Props Registry 和 Inspector Registry 版本一致。

### 14.2 结构级门禁

- 表单字段具有 label、类型和绑定。
- Table 具有 columns、rowKey 和分页策略。
- Modal、Drawer 等浮层具有触发和关闭关系。
- 数据页面覆盖 loading、empty、error 和 permission 状态。
- 页面具有明确布局语义和必要的响应式规则。
- 不存在孤立交互或无法追溯到 Registry 的标准节点。

### 14.3 视觉门禁

- 每个组件关键 Props 和状态截图回归。
- 每个 Pattern 截图回归。
- 每个模板默认与异常状态截图回归。
- 桌面和规定响应式宽度截图回归。
- 视觉变化必须由维护者批准后才能晋级 `stable`。

### 14.4 真实任务评测

至少覆盖：

- 用户管理列表
- 订单详情
- 分步申请
- 设置页
- Dashboard
- 从 Markdown 生成
- 从 HTML 还原信息结构
- 从自由 Pen 草图规范化
- 修改已有工程原型
- 使用同一 PrototypePlan 重建原型

评测输入理解、组件选择、模板匹配、状态完整性、Token 使用、视觉质量、可编辑性和交付说明。

### 14.5 原型交付门禁

- PrototypePlan Schema 校验通过。
- 最终原型与 PrototypePlan 的页面、组件和状态一致。
- `prototype.manifest.json` 记录完整版本信息。
- `validation-report.json` 不包含阻断级错误。
- 关键页面和状态截图齐全。
- 未支持行为和待确认项被明确记录，而不是生成伪交互。

## 15. 发布流程

```text
合并源码和资产变更
        │
        ▼
生成 Registry / Template Index / Rules Bundle
        │
        ▼
静态、结构、实例、Token 校验
        │
        ▼
组件、Pattern、模板视觉回归
        │
        ▼
真实任务 Eval 与原型交付验证
        │
        ▼
生成不可变 Runtime/Kit Release + 哈希
        │
        ▼
更新 canary.json
        │
        ▼
灰度观察和人工抽检
        │
        ▼
更新 stable.json
```

任何门禁失败都不得更新 `stable.json`。回滚只需要把渠道指针恢复到上一通过版本，不覆盖已发布对象。

## 16. CLI 边界与建议命令

```bash
# 一次安装与宿主适配
pen-antd setup --client auto

# 解析当前兼容版本和本地路径
pen-antd resolve --format json

# 环境与 Pen MCP 能力检查
pen-antd doctor

# 资产发现
pen-antd component list
pen-antd template list
pen-antd template match requirement.md

# 原型流程
pen-antd plan requirement.md --output prototype-plan.json
pen-antd generate prototype-plan.json --output prototype.pen
pen-antd inspect requirement.md
pen-antd validate prototype.pen
pen-antd diff prototype-plan.json prototype.pen

# 版本与运维
pen-antd update --channel stable
pen-antd migrate prototype.pen --dry-run
pen-antd rollback
```

CLI 命令输出应支持 JSON，供不同 Agent 和 CI 稳定消费。

## 17. 推荐实施阶段

### 阶段 1：资产治理

- 整理 `.pen` 中 Components、Patterns、Templates。
- 为模板与组件补充稳定 ID 和 metadata。
- 自动生成 Template Registry。
- 建立结构和视觉质量门禁。

### 阶段 2：发布与升级

- 实现 Kit Release、哈希和 `stable/canary`。
- 实现 Launcher、缓存、原子切换和回退。
- 将 Bootstrap Skill 收敛为稳定入口。
- 提供至少两种 Agent 的安装 Adapter，并保留 generic 模式。

### 阶段 3：多输入原型生成

- 定义 PrototypePlan Schema。
- 建立 Markdown、HTML 和 Pen 草图输入适配。
- 补齐组件 Props、Slot、布局、状态和交互 metadata。
- 支持 PrototypePlan 驱动的新建、增量修改和重建。

### 阶段 4：规模化质量与运营

- 扩充真实任务 Eval 和视觉基线。
- 建立失败分类、版本观测和回滚演练。
- 完善公司与项目 Override 治理。
- 验证多个 Agent 宿主和普通终端的一致交付结果。

## 18. 验收标准

平台方案落地完成应满足：

1. 用户只需执行一次安装命令。
2. 至少一个非 OpenAI Agent 和普通终端可以使用同一 CLI。
3. 新 Kit 可以通过 `canary` 晋级 `stable`，无需重新安装 Skill。
4. 断网时可以继续使用 Last Known Good。
5. 已有原型可以依据 Manifest 精确恢复所需版本。
6. `.pen` 中组件、Pattern 和模板均能被 Registry 索引。
7. 模板不依赖对应页面代码，也能被 Skill 正确发现和选用。
8. 发布失败不会改变 stable 用户当前可用版本。
9. 任一生成原型都有 Manifest、验证报告和交付说明。
10. 同一 PrototypePlan 可以在锁定版本下重建结构一致的原型。

## 19. 最终边界

平台的长期稳定边界如下：

```text
.pen Library     = 设计资产源
Registry         = 机器可读目录和组件契约
Ruleset          = 当前设计与交付规范
PrototypePlan    = 需求理解到 Pen 原型的生成计划
Runtime          = 确定性执行逻辑
Launcher         = 无感升级、缓存与回退
Bootstrap Skill  = Agent 触发入口
Host Adapter     = 客户端兼容层
Pen MCP          = 官方 Pen 操作通道
CI               = stable 发布质量门禁
```

任何具体 Agent 平台的 Plugin、Skill 或 Rules 都只能作为可替换的接入层，不能成为 Library、Runtime 或发布体系的唯一载体。
