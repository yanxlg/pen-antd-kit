# GitHub 发布流程

## 发布单元

Git 仓库维护可审查的源文件；GitHub Release 发布不可变 Kit。一个 Kit 同时包含 Ant Design `.pen` library、模板 UI、registry、Skill、设计规范和 Schema，避免不同版本被客户端混装。

stable channel 使用固定地址：

```text
https://github.com/<owner>/<repo>/releases/latest/download/channel-stable.json
```

客户端每次原型任务开始时解析该地址。发现新版本后下载 tarball、校验 SHA-256、解压到版本目录，再原子切换 `current.json`；下载或校验失败时继续使用上一个版本。CLI 和引导 Skill 不需要随规范更新而重装。

当前下载器适用于可直接访问的 GitHub Release。私有仓库需要另行接入组织认证或把 Release 资产同步到带鉴权的制品服务，不能把长期 token 写进 channel 文件。

## 产物

| 产物 | GitHub 目标 | 职责 |
| --- | --- | --- |
| Git tag `kit-v<version>` | Git refs | 唯一、可审计的发布触发点 |
| `pen-antd-kit-<version>.tar.gz` | Release asset | 完整不可变 Kit |
| `release-<version>.json` | Release asset | 版本、质量状态、library/standards 版本和 tarball 摘要 |
| `channel-stable.json` | latest Release asset | 固定入口，指向本次 release manifest |
| Release notes | GitHub Release | 本次 Kit 与规范版本摘要 |

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

## 客户端更新

```sh
pen-antd resolve \
  --channel-file https://github.com/yanxlg/pen-antd-kit/releases/latest/download/channel-stable.json
```

若希望每次调用都自动检查，可由安装器或团队包装命令在原型任务入口执行 `resolve`。缓存按 Kit 版本保存，重复解析不会重复下载同一版本。
