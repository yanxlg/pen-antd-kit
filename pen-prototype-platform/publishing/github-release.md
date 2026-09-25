# GitHub 发布流程

## 发布单元

GitHub 承载全部发布资源，共两个发布单元：

- **Kit Release**：不可变 Kit，包含 Ant Design `.pen` library、模板 UI、registry、版本化 references、设计规范、规则和 Schema，避免不同版本被客户端混装。Kit 不包含可独立安装的 Skill；客户端只安装薄 Skill。
- **CLI 包**：`@pen-kit/antd`，发布到公共 npm（`registry.npmjs.org`），供 `npx` 直接拉取执行。需要走 GitHub Packages 时传 `--registry https://npm.pkg.github.com/`。

两者互不依赖：references 更新不需要重新发布 CLI，CLI 升级不需要重新打 Kit。

stable channel 使用固定地址：

```text
https://github.com/<owner>/<repo>/releases/latest/download/channel-stable.json
```

客户端每次原型任务开始时调用 `references update` 解析该地址。发现新版本后下载 tarball、校验 SHA-256、解压到版本目录，再原子切换 `current.json`；下载或校验失败时降级到上一个本地版本并标记 `stale`。日常 references 更新不要求重装薄 Skill，CLI 由 `npx` 自动取最新版本。首次切换到 `referencePath` 协议时，已安装旧版薄 Skill 的客户端需重新安装一次入口文件。

当前下载器适用于可直接访问的 GitHub Release。私有仓库需要另行接入组织认证或把 Release 资产同步到带鉴权的制品服务，不能把长期 token 写进 channel 文件。

## 产物

| 产物 | GitHub 目标 | 职责 | 触发 |
| --- | --- | --- | --- |
| Git tag `kit-v<version>` | Git refs | 唯一、可审计的 Kit 发布触发点 | `publishing/github-actions/publish-kit.yml` |
| `pen-antd-kit-<version>.tar.gz` | Release asset | 完整不可变 Kit，含 references | 同上 |
| `release-<version>.json` | Release asset | 版本、质量状态、library/standards 版本和 tarball 摘要 | 同上 |
| `channel-stable.json` | latest Release asset | 固定入口，指向本次 release manifest | 同上 |
| Release notes | GitHub Release | 本次 Kit 与规范版本摘要 | 同上 |
| Git tag `cli-v<version>` | Git refs | CLI 版本发布触发点 | `publishing/github-actions/publish-cli.yml` |
| `@pen-kit/antd` | 公共 npm | CLI 命令，供 `npx` 拉取 | 同上 |

## CLI 发布

```sh
cd pen-prototype-platform
npm run release:cli                 # dry-run，列出将发布的文件
npm run release:cli -- --execute    # 上传到公共 npm
```

脚本会校验 scope 包名、SemVer 版本、`bin` 声明和 `publishConfig.access=public`；在 CI 中还会校验 `cli-v<version>` tag 与 `package.json` 版本一致。

### 鉴权：本地首发 + OIDC 持续发布

Trusted Publishing 只能配在已存在的包上，因此新包必须先本地发一次：

```sh
npm login
npm run release:cli -- --execute --otp 123456   # 开启写操作 2FA 时需要
```

之后在 npmjs.com → 包 Settings → Trusted publishing 登记 GitHub Actions：`yanxlg` / `pen-antd-kit` / `publish-prototype-cli.yml`，Allowed actions 选 `npm publish`。CI 随即改为 OIDC 鉴权：workflow 声明 `permissions.id-token: write`，npm CLI 自动用 OIDC token 换取发布凭据，**不再需要 `NPM_TOKEN` secret**。前提是 npm CLI >= 11.5.1 且 Node >= 22.14.0（模板已固定 node 24 并在发布前 `npm install -g npm@latest`）。

可选加固：包 Settings → Publishing access → 「Require two-factor authentication and disallow tokens」，关闭 token 发布通道，OIDC 不受影响。

公共 npm 上的包客户端 `npx` 可直接拉取，无需 `.npmrc`；若改用 GitHub Packages，客户端才需要配置该 scope 的 registry 与 PAT。

## 发布前门禁

1. 规范变更同步更新 `standards/manifest.json` 和 `standards/CHANGELOG.md`。
2. 合并前运行 `npm test`、`npm run standards:validate` 和 Pen 视觉/引用验收。
3. 只有通过验收的提交创建 `kit-v<version>` tag。
4. 将 `standards/manifest.json` 的 status 提升为 `passed` 后才能执行上传；`--execute` 生成 `quality.status=passed`，稳定解析器拒绝 candidate。
5. 已发布 tag 和资产不覆盖。修复使用新版本；回滚将旧版本重新发布为 latest 或恢复此前的 channel 资产。

## 本地预演

默认只构建和输出发布计划，不调用 GitHub：

```sh
cd pen-prototype-platform
npm run release:github -- \
  --source-root .. \
  --output ./dist/github-release \
  --version 0.1.0 \
  --repo yanxlg/pen-antd-kit
```

检查生成的 tarball、release manifest 和 channel 文件。确认对应 tag 已存在后才执行上传：

```sh
npm run release:github -- \
  --source-root .. \
  --output ./dist/github-release \
  --version 0.1.0 \
  --repo yanxlg/pen-antd-kit \
  --execute
```

`--execute` 需要已安装并登录的 GitHub CLI，且会校验 tag。发布脚本不会创建 tag、提交代码或覆盖已有 Release。

## 自动发布

`publishing/github-actions/publish-kit.yml` 是工作流模板。由于当前实现刻意隔离在 `pen-prototype-platform/`，模板不会自动生效；正式启用时由仓库维护者审查后复制到仓库根目录 `.github/workflows/publish-prototype-kit.yml`。推送 `kit-v*` tag 后，工作流执行测试、规范校验和 Release 上传。

`publishing/github-actions/publish-cli.yml` 同理，推送 `cli-v*` tag 后执行测试并通过 OIDC 发布到公共 npm（`permissions.id-token: write`，无 secret 依赖）。启用时复制为 `.github/workflows/publish-prototype-cli.yml`——文件名必须与 npm 上登记的 Trusted Publisher 一致。

## 客户端更新

薄 Skill 在每次原型任务开始时执行（npx 自动取最新 CLI）：

```sh
npx -y @pen-kit/antd@latest references update
```

默认解析 `https://github.com/yanxlg/pen-antd-kit/releases/latest/download/channel-stable.json`，可用 `--repo` 或 `PEN_ANTD_REPO` 覆盖。TTL（默认 60 分钟）内的重复调用直接返回本地结果；`--force` 或 `--ttl 0` 强制联网检查。缓存按 Kit 版本保存，重复解析不会重复下载同一版本。
