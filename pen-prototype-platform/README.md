# Pen Ant Design 原型平台

这是一个与现有工程隔离的参考实现，只覆盖“需求到 Pen 原型”的设计链路。它不修改现有构建脚本，也不包含设计到生产代码（D2C）的规则。

## 结论

采用 **薄 Skill + npx CLI + 执行时更新 references + Pen MCP**，所有资源都在 GitHub：

- 薄 Skill：每个 AI 客户端只安装一次，内容只有稳定入口协议，不承载组件知识。
- CLI：每次任务开始时由薄 Skill 通过 `npx` 触发，负责拉取并校验最新 references 包、精确查询、库预检和发布打包。`npx` 自动下载最新版本，用户不需要手动升级。
- Kit references：随 Kit 一起以不可变 `tar.gz` 发布在 GitHub Release，包含版本化工作流程、组件索引、设计规范、规则和 Schema；它们不是另一个客户端 Skill。
- Pen MCP 负责读取和操作 Pen 文档。是否能自动导入组件库，以运行时实际暴露的能力为准。
- 模板只在 `.pen` 中维护 UI。构建 Kit 时从模板画板自动生成 `registry/templates.json`：pattern、适用场景、包含功能、标注区域、可替换部分及其说明、结构骨架与用到的组件都来自模板自身，不维护模板代码，也不在规范里写死模板清单。
- 生成前先产出**模块计划**：输入（需求 / HTML / `.pen` 草图）拆成 `page / drawer / modal / panel` 模块，写清每个模块的结构、状态、组件与模板绑定，落到 `prototype-plan.json`。计划必须通过校验，生成只认计划，不认模型记忆。
- 读模板走 Kit 内的 `libraries/templates.pen`，正式组件来自 `libraries/antd-6.lib.pen`；设计画布的创建、修改和回读走 Pen MCP。Pen 不响应时，不能把文件生成的普通 Frame 当成交付原型。
- 组件来源默认是**导入公共库**：CLI 把当前 Kit 同步到 `~/.pen`，文档写 `imports: { antd: ~/.pen/libraries/antd-6.lib.pen }`，用 `antd:<组件id>` 引用实例，不再往文档里复制组件定义。

执行时更新的模型：

```text
薄 Skill 触发 → npx pen-antd references update（TTL 缓存，失败降级本地并警告）
→ 读取返回的 referencePath（Kit 内 references/guide.md）→ context resolve 路由所需资料 → 库预检 → Pen MCP 生成 → 校验
```

客户端只安装薄 Skill。Kit 的 `references/guide.md` 是由薄 Skill 动态读取的工作流程文档，不参与 Skill 自动发现。下载到磁盘不等于进入模型上下文；按任务读取少量 reference，组件、模板和大型 `.pen` 文件由 CLI 精确查询。

## 目录职责

| 目录 | 职责 |
| --- | --- |
| `bin/`, `src/` | 无第三方运行时依赖的 CLI（发布为 GitHub Packages 上的 npm 包） |
| `scripts/` | 发布脚本：`publish-github-release.mjs`（Kit）、`publish-cli.mjs`（CLI） |
| `references/` | 随 Kit 升级的原型工作流程入口与按需读取的参考资料；不是客户端 Skill |
| `evals/` | 薄 Skill 与 Kit references 的行为评测用例；不打进 Kit |
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
需求输入 → references update → context resolve → library prepare → 模块计划与模板绑定 → doc build（空文档 + imports）→ library status → MCP 实例化与填充 → 保存重开 → 结构和视觉检查
```

## 从输入到模块，再到 Frame

固定的执行顺序是：**输入 → 模块清单 → 模板绑定 → 生成 Frame → 回读校验**。

```sh
# 1. 分析输入，写出模块计划（人类评审对象 + 生成输入）
node bin/pen-antd.mjs plan validate --plan ../examples/plans/REQ-084.plan.json
node bin/pen-antd.mjs plan digest  --plan ../examples/plans/REQ-084.plan.json --out ../examples/plans/REQ-084.plan.md

# 2. 用模板生成页面 / 抽屉 / 弹窗 Frame（输出到需求文档同目录、同名 .pen）
node bin/pen-antd.mjs plan target --plan ../examples/plans/REQ-084.plan.json
node bin/pen-antd.mjs doc build --plan ../examples/plans/REQ-084.plan.json --open
```

`plan validate` 会对着当前 Kit 校验：模块 id 与 kind、结构 role、模板是否存在、kind 与模板类别是否匹配、嵌套槽位是否存在、组件名是否在 registry 中。校验不通过时 `doc build` 直接拒绝执行。

输出文件由需求文档决定：`<需求文档目录>/<需求文档名>.pen`。同名文件已存在时：本 plan 上次生成的原地重建；其它文件返回 `OUTPUT_EXISTS` 并给出三个选项（替换 `--on-conflict replace`、自动重命名 `--on-conflict rename` 追加 `-2`/`-3`、自定义 `--name`/`--path`），由用户选。

`doc build` 先把当前 Kit 的组件库同步到 `~/.pen`，只对文档做空容器与 `imports` 引导；模板结构随后经 MCP 复制为可编辑的普通 Frame，内部可复用控件继续引用 `antd:<组件id>`。内层模板内容进入外层的业务内容区。生成脚本按 kind 分区排布模块，并经 MCP 创建 `Plan Notes`。没有模板的 `custom` 模块先成为说明结构的占位 Frame，交付前必须填充并验证。生成后按返回的节点 id 回读根 Frame、内容区与内部控件引用；名称或元数据写着模板不等于使用了模板。

导入模式的实测规则（Pen 1.2.13，细节见 `references/pen-mcp-runtime.md`）：`imports` 必须指向绝对路径；只有 `reusable` 条目可导入；被导入组件内部引用的依赖必须可解析；保存后要重开验证组件引用和 import。App Shell 是可编辑的模板 Frame，内部控件继续导入。

`pen-antd library prepare` 校验库文件与摘要。`pen-antd doc new --path <file>` 负责让文档本身可用：

- 创建文档，把本次任务需要的组件闭包（请求的组件 + 其脚本内部解析的图标/空状态等依赖）写进画布局外的 `Library Sources` frame，**保留原 id**，脚本组件内部的 `ref` 才能继续解析。
- 用 `open -a Pen <file>` 打开文档（macOS）。`--no-open` 可跳过。
- 幂等：重复执行只补缺失的组件。

`pen-antd library status --path <file>` 检查这些 id 是否在文档里，`libraryReady: false` 时不允许创建节点，重跑 `doc new` 即可修复。

公共库目录由 `pen-antd library shared` 维护（默认 `~/.pen`，可用 `--home` 或 `PEN_HOME` 覆盖），本机所有项目的原型文档共用同一份，Kit 升级后下次生成自动同步。`--library embed` 仍然保留旧的"文档自带组件源"方式：它把闭包复制进 `Library Sources` Frame（id 保持不变），适合需要按实例覆盖内部属性的模板；两种模式的区别与取舍见 `references/pen-mcp-runtime.md`。

## 安装与使用

客户端只需安装一次薄 Skill；之后每次任务由 `npx` 获取 CLI 和当前 Kit：

```sh
pen-antd skill install --target <agent-skills-root>
npx -y @pen-kit/antd@latest references update
```

也可以全局安装以获得稳定的 `pen-antd` 命令：

```sh
npm install -g @pen-kit/antd
```

本地开发（不打包、直接指向当前仓库）：

```sh
cd pen-prototype-platform
npm test
node bin/pen-antd.mjs references update --channel-file channels/development.json
node bin/pen-antd.mjs references update --source <kit-root>        # 已构建的 Kit 目录
node bin/pen-antd.mjs library prepare
node bin/pen-antd.mjs doc new --path ../examples/prototypes/user-management.pen
node bin/pen-antd.mjs library status --path ../examples/prototypes/user-management.pen
node bin/pen-antd.mjs doc open --path ../examples/prototypes/user-management.pen
node bin/pen-antd.mjs context resolve --input requirements.md --prompt "用户权限管理列表"
node bin/pen-antd.mjs template describe --all --depth 2               # 先读全量模板目录
node bin/pen-antd.mjs template match 用户管理                          # 再按需求取候选
node bin/pen-antd.mjs template describe --id <id> --depth 3            # 读候选的结构与可替换项
node bin/pen-antd.mjs doc new --path x.pen --template admin-app-shell   # 按 pattern/id/name 注入
node bin/pen-antd.mjs component inspect Button
node bin/pen-antd.mjs doc build --plan ../examples/plans/REQ-084.plan.json --path x.pen   # 按计划生成模块 Frame
node bin/pen-antd.mjs pen tools                                       # 列出 Pen MCP 工具
node bin/pen-antd.mjs pen call --tool get_style --args '{}'            # 通过 CLI 调 Pen MCP
node bin/pen-antd.mjs pen call --tool execute --args-file args.json    # 在画布上执行 execute 片段
```

Pen MCP 的连接方式是 Pen 自带的服务 + `--app desktop`。报 `transport not connected to app: <name>` 时先检查 app 名；调用约 60s 后报目标文件错误时先检查活动文档、保存并重开目标窗口，再按已知 id 查询是否已落地。仍不能恢复才重启 Pen。页面节点较多时用浅层读取和单页截图，细节见 `references/pen-mcp-runtime.md`。

公共库目录是 `~/.pen`（`--home` 或 `PEN_HOME` 可覆盖），里面是**指向当前 Kit 的符号链接**，不是拷贝：

```text
~/.pen/libraries          → <kit>/libraries            # 库文件 + 它相对自己引用的 fonts/、images/
~/.pen/canvas-components  → <kit>/canvas-components    # scriptUri 指向 ../canvas-components/
~/.pen/library.json                                    # 别名、版本、SHA-256、link/copy 模式
```

库内部用相对路径引用资源（`fonts/ant.design/*.woff2`、`images/**`、`../canvas-components/*.js`），所以公共目录必须保持 Kit 的目录结构；把这几个目录拍平复制到公共根会出现「Failed to load font」这类只影响渲染、不影响解构的报错。

`references update` 的语义：

- 默认从 GitHub Release 的 `channel-stable.json` 解析最新 Kit，下载、校验 SHA-256、原子装配到 `~/.pen-antd/kits/<version>/`，并返回 `kitRoot` 与 `referencePath`。
- `--ttl` 分钟内的重复调用直接命中缓存返回（默认 60，`--ttl 0` 强制检查，`--force` 跳过缓存）。
- 拉取失败时降级到本地已有 Kit，返回 `"stale": true` 和 warning，不阻塞任务；没有任何本地 Kit 时才报错。
- `--source` 指定本地 Kit 目录（需含 `release.json`），`--channel-file` 指定本地或远程渠道文件，`--repo owner/repo` 覆盖默认仓库（`PEN_ANTD_REPO` 也可）。

`skill install` 只写入薄引导层，不复制整套规范。日常规范更新走 references 包，用户不需要重装 Skill。本次从 `skillPath` 切换到 `referencePath` 属于薄 Skill 入口协议变更：已安装旧版薄 Skill 的客户端需在新版 CLI 发布后重新运行一次 `skill install`，此后 Kit references 更新仍无需重装。

## 发布产物与目标

| 产物 | 内容 | 发布目标 | 更新方式 |
| --- | --- | --- | --- |
| CLI npm 包 `@pen-kit/antd` | 命令、下载器、校验器、查询器 | 公共 npm（`registry.npmjs.org`） | 仅协议或执行器变化时升级 |
| Kit `tar.gz` | library、模板 UI、registry、references、standards、rules、schemas | GitHub Release asset | 高频、不可变版本 |
| `release-<version>.json` | Kit 元数据、质量状态、摘要、制品地址 | 与 Kit 同域的静态地址 | 每个 Kit 一份 |
| channel JSON | `stable` 指向的 release | GitHub Release asset | 原子更新以发布或回滚 |
| 薄引导 Skill | 触发 `npx ... references update` 并读取 Kit 工作流程入口 | 每个客户端的 Skill 根目录 | 一次安装，极少变化 |
| `.lib.pen` 组件库 | 正式可复用组件来源 | 随 Kit 发布；由原型文档导入 | 预检阶段导入/校验 |
| `.pen` 模板文件 | App Shell 与页面、抽屉模板的可编辑参考 | 随 Kit 发布；构建时读取 | 复制普通 Frame 结构 |

生产发布顺序：

1. 从已验收的源仓库构建候选 Kit。
2. 跑自动测试和 Pen 视觉/引用验收。
3. 将 quality 标记为 `passed`，上传不可变 tarball 与 release manifest。
4. 原子更新目标 channel manifest。
5. 客户端下一次 `references update` 校验摘要后切换；失败则降级到本地 Kit 并标记 stale。

稳定渠道拒绝未标记为 `passed` 的 release。回滚只需让 channel 重新指向上一个 release。

## 发布命令

```sh
# Kit（references 资源包）：默认 dry-run，--execute 上传 GitHub Release
npm run release:github -- --source-root .. --output ./dist/github-release --version 0.3.0 --repo yanxlg/pen-antd-kit

# CLI：默认 dry-run，--execute 发布到 GitHub Packages
npm run release:cli
npm run release:cli -- --execute

# CI 模板：推送 kit-v* 发 Kit，推送 cli-v* 发 CLI
# publishing/github-actions/publish-kit.yml
# publishing/github-actions/publish-cli.yml
```

CLI 发布在公共 npm，客户端 `npx` 免配置。发布侧鉴权分两步走的：**首次本地发，之后交给 OIDC**。

**第一步：本地首发。** Trusted Publishing 只能配在已存在的包上，新包必须先手动发一次：

```sh
npm login
npm run release:cli -- --execute --otp 123456   # 账号开启写操作 2FA 时需要
```

**第二步：登记 Trusted Publisher。** npmjs.com → 包 → Settings → Trusted publishing → GitHub Actions：

| 字段 | 值 |
| --- | --- |
| Organization or user | `yanxlg` |
| Repository | `pen-antd-kit` |
| Workflow filename | `publish-prototype-cli.yml` |
| Allowed actions | `npm publish` |

之后推 `cli-v*` tag 即走 OIDC 发布，**不需要任何 npm token，也不需要 GitHub secret**。OIDC 要求 npm CLI >= 11.5.1 且 Node >= 22.14.0，workflow 已固定 node 24 并在发布前升级 npm。配置生效后可在包 Settings → Publishing access 选「Require two-factor authentication and disallow tokens」，彻底关掉 token 发布通道。

`publish-cli.mjs` 会校验 scope 包名、SemVer 版本、`bin` 声明和 `publishConfig.access=public`。要使用 GitHub Packages 或企业 registry，传 `--registry https://npm.pkg.github.com/` 即可，CLI 代码无需改动。

## 构建 Kit

```sh
node bin/pen-antd.mjs kit build \
  --source-root .. \
  --output ./dist \
  --version 0.1.0 \   # Kit 版本必须是 SemVer，构建器会校验
  --quality candidate
```

构建器会复制组件库、独立模板文件、组件 registry 和 canvas 组件，加入本目录的 Skill/standards/rules/schemas，从模板文件的画板生成 `registry/templates.json`，生成摘要并输出 release manifest。

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
