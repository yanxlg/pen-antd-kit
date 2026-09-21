# fintechgrowthui 设计证据与抽象边界

本文件记录规范的来源证据，不作为生成时必读内容。分析范围为 `fintechgrowthui` 的共享组件、AppConfig、PageManage、MiddleConfig、ErrorCode，以及仓库中的设计、交互和 App Shell 标准。

## 可提升为通用规范的稳定模式

- 宿主提供登录、全局头部和一级导航，子应用只承担业务内容画布；语言与方向跟随宿主。
- SearchForm 使用 24 栅格、自动折叠和末行右对齐操作；查询条件提交后才驱动数据，请求与重置回到第一页。
- TableCard 形成 16px/20px 内边距、8px 圆角、次级边框、标题 + 记录数 + 右侧行动的稳定结构。
- 管理列表普遍使用稳定 row key、横向滚动、固定尾部行动、10/20/50 分页和真实空状态。
- 权限过滤发生在 ActionGroup 折叠前；删除和启停用 Popconfirm，差异和历史详情用 Modal 或 Drawer。
- 编辑器普遍使用 Drawer，底部取消/主行动固定；提交期间锁定退出和重复提交；脏数据关闭时确认放弃。
- 表单错误贴近字段；接口错误由统一层处理，避免重复 toast；长值使用 ellipsis + 可访问完整值。
- 页面明确处理 loading、empty、失败、disabled、保存中和成功反馈。

## 仅作为构图起点的数值

目录 290px、抽屉 520/600/760px、审计抽屉 900px，以及若干表格列宽来自当前业务的信息密度。它们被整理为区间或基线，不是所有项目的固定 token。具体原型仍需由内容长度、宿主宽度和翻译验证决定。

## 未提升为设计规范的实现细节

- React hook、请求封装、`antd-style`、CSS-in-JS 和接口字段组装属于开发实现，不进入原型规范。
- 个别页面的硬编码色值、行高和临时布局不是事实源；原型优先使用当前 Kit token。
- 特定权限码、接口错误码、路由和服务字段只属于 fintechgrowthui，不推广为跨项目规则。

## 主要证据位置

- `docs/standards/design.md`
- `docs/standards/interaction-and-validation.md`
- `docs/modules/app-shell.md`
- `src/components/SearchForm/index.tsx`
- `src/components/TableCard/index.tsx`
- `src/pages/AppConfig/index.tsx` 与 `styles.ts`
- `src/pages/PageManage/index.tsx` 与 `components/EditDrawer.tsx`
- `src/pages/MiddleConfig/index.tsx`、`components/EditDrawer.tsx`、`components/HistoryDrawer.tsx`
- `src/pages/ErrorCode/index.tsx` 与 `components/EditDrawer.tsx`

