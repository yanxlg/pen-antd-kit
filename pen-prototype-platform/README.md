# Pen Ant Design 原型平台

这是一个与现有工程隔离的参考实现，只覆盖“需求到 Pen 原型”的设计链路。它不修改现有构建脚本，也不包含设计到生产代码（D2C）的规则。

## 结论

采用 **薄 CLI + 版本化 Kit + 引导 Skill + Pen MCP**：

- CLI 负责版本解析、下载、校验、缓存、精确查询和发布打包。
- Kit 是可独立发布的版本单元，包含 `.pen` 组件库、模板 UI、组件索引、设计规范、规则、Schema 和完整 Skill。
- 各 AI 客户端只需安装一次很小的引导 Skill；每次使用时它解析当前 Kit 并读取版本化 Skill。
- Pen MCP 负责读取和操作 Pen 文档。是否能自动导入组件库，以运行时实际暴露的能力为准。
- 模板只在 `.pen` 中维护 UI。构建 Kit 时自动生成轻量 `templates.json` 索引，不维护模板代码。

这保留了 Skill 的渐进式加载：下载到磁盘不等于进入模型上下文。根 `SKILL.md` 只负责路由，按任务读取少量 reference；组件、模板和大型 `.pen` 文件由 CLI 精确查询。

## 目录职责

| 目录 | 职责 |
| --- | --- |
| `bin/`, `src/` | 无第三方运行时依赖的 CLI |
| `skills/antd-prototype/` | 随 Kit 升级的完整原型 Skill 与渐进式参考资料 |
| `rules/` | 不随具体输入变化的原型约束 |
| `standards/` | 可渐进读取的原型设计规范、版本清单和质量契约 |
| `schemas/` | 发布、模板索引和原型计划的数据契约 |
| `channels/` | 渠道指针；只决定当前应解析哪个 release |
| `releases/` | 本地开发 release 示例；生产环境应发布到制品服务 |
| `tests/` | 解析、路由、查询、预检和构建测试 |
| `publishing/` | GitHub Release 流程和 Actions 工作流模板 |

## `.pen` 自动导入发生在哪里

正确位置是：**Kit 下载校验之后、创建任何原型节点之前**。

```text
需求输入 → resolve/download → library prepare/import/verify → context route → 生成 → 视觉检查
```

`pen-antd library prepare` 会验证库文件和摘要，并根据 Pen 实际能力给出门禁结果：

- Pen 若暴露明确的 library import/register 能力，Skill 在此调用并校验库身份。
- 当前 Pen MCP 工具面没有这类能力时，返回 `manualActionRequired: true`，要求用户在 Pen Libraries 中做一次导入。

因此，目前可以自动完成“下载、校验、定位、判断”，但不能可靠地通过现有 MCP 自动注册为 Pen Library。不能通过修改 Pen 私有配置或数据库绕过这一点。将整个库复制进业务原型也不是等价替代，因为会破坏组件来源和文档体积。

未来 Pen 增加官方导入能力后，只需让能力探测报告对应能力；预检阶段和生成流程无需改变。

## 安装与使用

本地运行：

```sh
cd pen-prototype-platform
npm test
node bin/pen-antd.mjs resolve
node bin/pen-antd.mjs library prepare
node bin/pen-antd.mjs context resolve --input requirements.md --prompt "用户权限管理列表"
node bin/pen-antd.mjs template match 用户管理
node bin/pen-antd.mjs component inspect Button
```

安装为全局 CLI 时，可通过内部 npm registry、GitHub Package Registry 或普通 npm registry 发布这个目录，然后执行：

```sh
npm install -g <published-cli-package>
pen-antd skill install --target <agent-skills-root>
```

`skill install` 安装的是稳定引导层，不复制整套规范。后续更新通过 `pen-antd resolve` 切换 Kit；用户不需要重复安装 Skill。GitHub stable channel 可以直接使用 URL：

```sh
pen-antd resolve \
  --channel-file https://github.com/<owner>/<repo>/releases/latest/download/channel-stable.json
```

开发渠道默认直接解析当前仓库，便于在不打包的情况下试运行。正式渠道必须使用带 SHA-256 的 `tar.gz`。

## 发布产物与目标

| 产物 | 内容 | 发布目标 | 更新方式 |
| --- | --- | --- | --- |
| CLI npm 包 | 命令、下载器、校验器、查询器 | 企业 npm / GitHub Packages / npm | 仅协议或执行器变化时升级 |
| Kit `tar.gz` | library、模板 UI、registry、Skill、standards、rules、schemas | GitHub Release asset | 高频、不可变版本 |
| `release-<version>.json` | Kit 元数据、质量状态、摘要、制品地址 | 与 Kit 同域的静态地址 | 每个 Kit 一份 |
| channel JSON | `stable`/`beta` 指向的 release | CDN/静态配置地址 | 原子更新以发布或回滚 |
| 引导 Skill | 解析当前 Kit 并转交版本化 Skill | 每个客户端的 Skill 根目录 | 一次安装，极少变化 |
| `.pen` library | Kit 内唯一组件与模板 UI 来源 | 随 Kit 发布；在 Pen Libraries 注册 | 预检阶段导入/校验 |

生产发布顺序：

1. 从已验收的源仓库构建候选 Kit。
2. 跑自动测试和 Pen 视觉/引用验收。
3. 将 quality 标记为 `passed`，上传不可变 tarball 与 release manifest。
4. 原子更新目标 channel manifest。
5. 客户端下一次 `resolve` 校验摘要后切换；失败则不替换已有 Kit。

稳定渠道拒绝未标记为 `passed` 的 release。回滚只需让 channel 重新指向上一个 release。

## 构建 Kit

```sh
node bin/pen-antd.mjs kit build \
  --source-root .. \
  --output ./dist \
  --version 2026.09.20 \
  --quality candidate
```

构建器会复制当前 library、组件 registry 和 canvas 组件，加入本目录的 Skill/standards/rules/schemas，从 `.pen` 的模板画板生成 `registry/templates.json`，生成摘要并输出 release manifest。

## 设计规范与 GitHub 发布

规范入口是 `standards/index.md`，页面类型只加载对应的少量 Markdown；`standards/manifest.json` 管版本和文件清单，`standards/prototype-quality.json` 管稳定质量门禁。

```sh
npm run standards:validate
npm run release:github -- \
  --source-root .. \
  --output ./dist/github-release \
  --version 0.3.0 \
  --repo <owner>/<repo>
```

第二条命令默认 dry-run，不上传。完整的 tag、资产、Actions 和回滚流程见 `publishing/github-release.md`。

## 能力快照

为了在测试或未来 Pen 版本中启用自动导入，可以把 MCP 工具清单保存为 JSON，并传入：

```sh
pen-antd library prepare --capabilities-file pen-capabilities.json
```

只有明确出现受支持的 library import/register 能力才会返回自动策略；未知工具不会被猜测调用。
