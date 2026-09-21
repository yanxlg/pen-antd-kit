# Pen Ant Design 原型平台

这是一个与现有工程隔离的参考实现，只覆盖“需求到 Pen 原型”的设计链路。它不修改现有构建脚本，也不包含设计到生产代码（D2C）的规则。

## 结论

采用 **薄 Skill + npx CLI + 执行时更新 references + Pen MCP**，所有资源都在 GitHub：

- 薄 Skill：每个 AI 客户端只安装一次，内容只有稳定入口协议，不承载组件知识。
- CLI：每次任务开始时由薄 Skill 通过 `npx` 触发，负责拉取并校验最新 references 包、精确查询、库预检和发布打包。`npx` 自动下载最新版本，用户不需要手动升级。
- references 包：随 Kit 一起以不可变 `tar.gz` 发布在 GitHub Release，包含完整 Skill、组件索引、设计规范、规则和 Schema。
- Pen MCP 负责读取和操作 Pen 文档。是否能自动导入组件库，以运行时实际暴露的能力为准。
- 模板只在 `.pen` 中维护 UI。构建 Kit 时自动生成轻量 `templates.json` 索引，不维护模板代码。

执行时更新的模型：

```text
Skill 触发 → npx pen-antd references update（TTL 缓存，失败降级本地并警告）
→ 读取返回的 skillPath → context resolve 路由该读哪些 reference → 库预检 → Pen MCP 生成 → 校验
```

这保留了 Skill 的渐进式加载：下载到磁盘不等于进入模型上下文。版本化 `SKILL.md` 只负责路由，按任务读取少量 reference；组件、模板和大型 `.pen` 文件由 CLI 精确查询。

## 目录职责

| 目录 | 职责 |
| --- | --- |
| `bin/`, `src/` | 无第三方运行时依赖的 CLI（发布为 GitHub Packages 上的 npm 包） |
| `scripts/` | 发布脚本：`publish-github-release.mjs`（Kit）、`publish-cli.mjs`（CLI） |
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

AI 客户端零安装：把薄 Skill 装进客户端 Skill 目录即可，任务开始时由 `npx` 拉取 CLI：

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
node bin/pen-antd.mjs context resolve --input requirements.md --prompt "用户权限管理列表"
node bin/pen-antd.mjs template match 用户管理
node bin/pen-antd.mjs component inspect Button
```

`references update` 的语义：

- 默认从 GitHub Release 的 `channel-stable.json` 解析最新 Kit，下载、校验 SHA-256、原子装配到 `~/.pen-antd/kits/<version>/`，并返回 `kitRoot` 与 `skillPath`。
- `--ttl` 分钟内的重复调用直接命中缓存返回（默认 60，`--ttl 0` 强制检查，`--force` 跳过缓存）。
- 拉取失败时降级到本地已有 Kit，返回 `"stale": true` 和 warning，不阻塞任务；没有任何本地 Kit 时才报错。
- `--source` 指定本地 Kit 目录（需含 `release.json`），`--channel-file` 指定本地或远程渠道文件，`--repo owner/repo` 覆盖默认仓库（`PEN_ANTD_REPO` 也可）。

`skill install` 只写入薄引导层，不复制整套规范。规范更新走 references 包，用户不需要重装 Skill。

## 发布产物与目标

| 产物 | 内容 | 发布目标 | 更新方式 |
| --- | --- | --- | --- |
| CLI npm 包 `@pen-kit/antd` | 命令、下载器、校验器、查询器 | 公共 npm（`registry.npmjs.org`） | 仅协议或执行器变化时升级 |
| Kit `tar.gz` | library、模板 UI、registry、Skill、standards、rules、schemas | GitHub Release asset | 高频、不可变版本 |
| `release-<version>.json` | Kit 元数据、质量状态、摘要、制品地址 | 与 Kit 同域的静态地址 | 每个 Kit 一份 |
| channel JSON | `stable` 指向的 release | GitHub Release asset | 原子更新以发布或回滚 |
| 薄引导 Skill | 触发 `npx ... references update` 并转交版本化 Skill | 每个客户端的 Skill 根目录 | 一次安装，极少变化 |
| `.pen` library | Kit 内唯一组件与模板 UI 来源 | 随 Kit 发布；在 Pen Libraries 注册 | 预检阶段导入/校验 |

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
